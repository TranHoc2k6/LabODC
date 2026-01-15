from sqlalchemy.orm import Session
from app.models.payment import Payment, FundDistribution
from app.core.constants import TEAM_PERCENT, MENTOR_PERCENT, LAB_PERCENT
from datetime import datetime
from app.models.project import Project

class PaymentService:
    @staticmethod
    def calculate_distribution(amount: float):
        return {
            "team": amount * TEAM_PERCENT,
            "mentor": amount * MENTOR_PERCENT,
            "lab": amount * LAB_PERCENT
        }
    
@staticmethod
def create_payment(db: Session, payment_data: dict, enterprise_id: int):
    project = db.query(Project).filter(Project.id == payment_data["project_id"]).first()

    if not project:
        raise ValueError("Project not found")

    if project.enterprise_id != enterprise_id:
        raise ValueError("You cannot pay for another company's project")

    if project.status != "approved":
        raise ValueError("Project not approved yet")

    distribution = PaymentService.calculate_distribution(payment_data["amount"])

    payment = Payment(
        project_id=project.id,
        enterprise_id=enterprise_id,
        amount=payment_data["amount"],
        payment_method=payment_data.get("payment_method", "PayOS"),
        team_amount=distribution["team"],
        mentor_amount=distribution["mentor"],
        lab_amount=distribution["lab"]
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment
    
@staticmethod
def hybrid_support(db: Session, project_id: int, enterprise_id: int):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise ValueError("Project not found")

    if project.enterprise_id != enterprise_id:
        raise ValueError("You do not own this project")

    if project.status != "approved":
        raise ValueError("Project not approved")

    # Prevent double hybrid funding
    existing = db.query(Payment).filter(
        Payment.project_id == project_id,
        Payment.is_hybrid == True
    ).first()

    if existing:
        raise ValueError("Hybrid support already activated")

    payment = Payment(
        project_id=project_id,
        enterprise_id=None,
        amount=project.total_budget,
        status="hybrid_support",
        is_hybrid=True,
        hybrid_advanced_at=datetime.utcnow(),
        team_amount=project.team_fund,
        mentor_amount=project.mentor_fund,
        lab_amount=project.lab_fund
    )

    db.add(payment)
    db.commit()
    return payment
