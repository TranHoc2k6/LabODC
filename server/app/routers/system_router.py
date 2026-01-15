from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User

router = APIRouter(prefix="/system", tags=["system"])

@router.post("/users")
def create_user(data: dict, db: Session = Depends(get_db)):
    """System Admin: Create any type of user"""
    user = User(**data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.put("/users/{user_id}/role")
def update_user_role(user_id: int, role: str, db: Session = Depends(get_db)):
    """System Admin: Update user role"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role
    db.commit()
    return {"message": "Role updated"}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """System Admin: Delete user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.payment_schema import PaymentCreate, PaymentResponse
from app.services.payment import PaymentService

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/", response_model=PaymentResponse)
def create_payment(data: PaymentCreate, db: Session = Depends(get_db)):
    # TODO: Get enterprise_id from JWT
    payment = PaymentService.create_payment(db, data.dict(), enterprise_id=1)
    return payment

@router.post("/hybrid-support/{project_id}")
def request_hybrid_support(project_id: int, db: Session = Depends(get_db)):
    payment = PaymentService.hybrid_support(db, project_id)
    return {"message": "Hybrid support activated", "payment": payment}