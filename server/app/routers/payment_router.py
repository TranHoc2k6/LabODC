from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.payment_schema import PaymentCreate, PaymentResponse
from app.services.payment import PaymentService
from app.core.permissions import require_role
from app.core.constants import ROLE_ENTERPRISE
from app.models.enterprise import Enterprise

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/", response_model=PaymentResponse)
def create_payment(
    data: PaymentCreate,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_ENTERPRISE))
):
    enterprise = db.query(Enterprise).filter(Enterprise.user_id == user.id).first()
    if not enterprise:
        raise HTTPException(status_code=404, detail="Enterprise profile not found")

    payment = PaymentService.create_payment(db, data.dict(), enterprise_id=enterprise.id)
    return payment

@router.post("/hybrid-support/{project_id}")
def request_hybrid_support(
    project_id: int,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_ENTERPRISE))
):
    enterprise = db.query(Enterprise).filter(Enterprise.user_id == user.id).first()
    if not enterprise:
        raise HTTPException(status_code=404, detail="Enterprise profile not found")

    payment = PaymentService.hybrid_support(db, project_id, enterprise.id)
    return {"message": "Hybrid support activated", "payment": payment}
