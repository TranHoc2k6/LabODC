from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.enterprise import Enterprise
from app.core.constants import ROLE_ENTERPRISE
from sqlalchemy import func
from app.models.enterprise import Enterprise
from app.models.project import Project
from app.models.payment import Payment, FundDistribution

class EnterpriseService:

    @staticmethod
    def create_profile(db: Session, user, data: dict):
        if user.role != ROLE_ENTERPRISE:
            raise HTTPException(403, "Only ENTERPRISE can create enterprise profile")

        if user.enterprise:
            raise HTTPException(400, "Enterprise profile already exists")

        if user.talent or user.mentor:
            raise HTTPException(400, "User already has another role")

        if not data.tax_code or len(data.tax_code) < 10:
            raise HTTPException(400, "Invalid tax code")

        enterprise = Enterprise(**data.dict(), user_id=user.id)
        db.add(enterprise)
        db.commit()
        db.refresh(enterprise)
        return enterprise
    
class EnterpriseDashboardService:

    @staticmethod
    def get_dashboard(db: Session, user):
        enterprise = db.query(Enterprise).filter(
            Enterprise.user_id == user.id
        ).first()

        # Total projects
        total_projects = db.query(Project).filter(
            Project.enterprise_id == enterprise.id
        ).count()

        # Total spent (sum of successful payments)
        total_spent = db.query(func.coalesce(func.sum(Payment.amount), 0)).filter(
            Payment.enterprise_id == enterprise.id,
            Payment.status == "paid"
        ).scalar()

        # Active talents (distinct recipients in fund distributions)
        active_talents = db.query(func.count(func.distinct(FundDistribution.recipient_id))).join(
            Payment, Payment.id == FundDistribution.payment_id
        ).filter(
            Payment.enterprise_id == enterprise.id,
            FundDistribution.recipient_type == "talent"
        ).scalar()

        return {
            "totalProjects": total_projects,
            "activeTalents": active_talents,
            "totalSpent": float(total_spent)
        }

    @staticmethod
    def get_payments(db: Session, user):
        enterprise = db.query(Enterprise).filter(
            Enterprise.user_id == user.id
        ).first()

        payments = db.query(Payment).filter(
            Payment.enterprise_id == enterprise.id
        ).all()

        result = []

        for p in payments:
            project = p.project  # relationship from project model

            talents = [
                {
                    "talentId": d.recipient_id,
                    "amount": d.amount,
                    "status": d.status
                }
                for d in p.distributions
                if d.recipient_type == "talent"
            ]

            result.append({
                "paymentId": p.id,
                "projectId": p.project_id,
                "projectTitle": project.title if project else None,
                "amount": p.amount,
                "status": p.status,
                "isHybrid": p.is_hybrid,
                "talents": talents
            })

        return result
