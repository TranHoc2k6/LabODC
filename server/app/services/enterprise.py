from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.enterprise import Enterprise
from app.core.constants import ROLE_ENTERPRISE
from sqlalchemy import func
from app.models.project import Project, ProjectMember
from app.models.payment import Payment

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

        if not enterprise:
            raise HTTPException(404, "Enterprise profile not found")

        # Total projects của enterprise
        total_projects = db.query(Project).filter(
            Project.enterprise_id == enterprise.id
        ).count()

        # ✨ Total spent - tính tổng từ team + mentor + lab
        total_spent = db.query(
            func.coalesce(
                func.sum(
                    Payment.team_amount + 
                    Payment.mentor_amount + 
                    Payment.lab_amount
                ), 
                0
            )
        ).filter(
            Payment.enterprise_id == enterprise.id,
            Payment.status == "paid"
        ).scalar()

        # Active talents - đếm số talents đã join vào projects
        active_talents = db.query(
            func.count(func.distinct(ProjectMember.talent_id))
        ).join(
            Project, Project.id == ProjectMember.project_id
        ).filter(
            Project.enterprise_id == enterprise.id
        ).scalar()

        return {
            "totalProjects": total_projects,
            "activeTalents": active_talents or 0,
            "totalSpent": float(total_spent or 0)
        }

    @staticmethod
    def get_payments(db: Session, user):
        enterprise = db.query(Enterprise).filter(
            Enterprise.user_id == user.id
        ).first()

        if not enterprise:
            raise HTTPException(404, "Enterprise profile not found")

        payments = db.query(Payment).filter(
            Payment.enterprise_id == enterprise.id
        ).all()

        result = []

        for p in payments:
            project = p.project

            # Tính total amount từ 3 columns
            total = (
                (p.team_amount or 0) + 
                (p.mentor_amount or 0) + 
                (p.lab_amount or 0)
            )

            result.append({
                "paymentId": p.id,
                "projectId": p.project_id,
                "projectTitle": project.title if project else None,
                "amount": float(total),
                "teamAmount": float(p.team_amount or 0),
                "mentorAmount": float(p.mentor_amount or 0),
                "labAmount": float(p.lab_amount or 0),
                "status": p.status,
            })

        return result