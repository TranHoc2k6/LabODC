from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.payment import Payment
from app.schemas.payment_schema import PaymentCreate
from app.core.dependencies import require_role
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.project import Project


router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

@router.post("/")
def create_payment(
    data: PaymentCreate,
    db: Session = Depends(get_db),
    user=Depends(require_role("enterprise"))
):
    payment = Payment(
        project_id=data.project_id,
        total_amount=data.total_amount,
        team_amount=data.total_amount * 0.7,
        mentor_amount=data.total_amount * 0.2,
        lab_amount=data.total_amount * 0.1,
        status="pending"
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


@router.post("/{payment_id}/approve")
def approve_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_role("admin"))
):
    payment = db.get(Payment, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    payment.status = "approved"
    db.commit()
    return {"msg": "Payment approved"}

# =========================
# ADMIN – VIEW ALL PAYMENTS
# =========================
@router.get("/admin")
def admin_get_all_payments(
    db: Session = Depends(get_db),
    user=Depends(require_role("admin"))
):
    payments = db.query(Payment).all()

    return [
        {
            "id": p.id,
            "project_id": p.project_id,
            "total_amount": p.total_amount,
            "team_amount": p.team_amount,
            "mentor_amount": p.mentor_amount,
            "lab_amount": p.lab_amount,
            "status": p.status
        }
        for p in payments
    ]

# =========================
# ENTERPRISE – VIEW OWN PAYMENTS
# =========================
@router.get("/enterprise")
def enterprise_get_payments(
    db: Session = Depends(get_db),
    user=Depends(require_role("enterprise"))
):
    enterprise_id = int(user["sub"])

    payments = (
        db.query(Payment)
        .join(Project, Project.id == Payment.project_id)
        .filter(Project.owner_id == enterprise_id)
        .all()
    )

    return [
        {
            "id": p.id,
            "project_id": p.project_id,
            "total_amount": p.total_amount,
            "team_amount": p.team_amount,
            "mentor_amount": p.mentor_amount,
            "lab_amount": p.lab_amount,
            "status": p.status
        }
        for p in payments
    ]

# =========================
# TALENT – VIEW MY PAYMENTS
# =========================
@router.get("/talent")
def talent_get_payments(
    db: Session = Depends(get_db),
    user=Depends(require_role("talent"))
):
    talent_id = int(user["sub"])

    rows = (
        db.query(Payment, ProjectMember, Project)
        .join(Project, Project.id == Payment.project_id)
        .join(ProjectMember, ProjectMember.project_id == Project.id)
        .filter(ProjectMember.user_id == talent_id)
        .filter(ProjectMember.status == "approved")
        .all()
    )

    result = []

    for payment, member, project in rows:
        # chia team_amount cho số talent trong project
        total_talents = db.query(ProjectMember)\
            .filter(ProjectMember.project_id == project.id, ProjectMember.status == "approved")\
            .count()

        my_amount = payment.team_amount / total_talents if total_talents > 0 else 0

        result.append({
            "id": payment.id,
            "projectTitle": project.title,
            "amount": my_amount,
            "date": payment.id,  # tạm dùng id làm date
            "status": payment.status
        })

    return result
