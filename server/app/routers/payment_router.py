from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.payment import Payment
from app.schemas.payment_schema import PaymentCreate
from app.core.dependencies import require_role

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
