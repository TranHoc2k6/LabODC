# app/routers/talent_router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.user import User
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.payment import Payment
from app.schemas.user_schema import UserOut
from app.schemas.project_schema import ProjectOut
from app.schemas.payment_schema import PaymentOut
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/talent", tags=["Talent"])

# -------------------------------
# GET /talent/me
# -------------------------------
@router.get("/me", response_model=UserOut)
def get_me(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Trả về thông tin user hiện tại.
    current_user là dict JWT payload, lấy User thực từ DB.
    """
    user = db.query(User).filter(User.id == current_user.get("sub")).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# -------------------------------
# GET /talent/projects
# -------------------------------
@router.get("/projects", response_model=List[ProjectOut])
def get_my_projects(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Lấy tất cả projects mà user là member.
    """
    user = db.query(User).filter(User.id == current_user.get("sub")).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    memberships = db.query(ProjectMember).filter(ProjectMember.user_id == user.id).all()
    project_ids = [m.project_id for m in memberships]
    projects = db.query(Project).filter(Project.id.in_(project_ids)).all()
    return projects


# -------------------------------
# GET /talent/payments
# -------------------------------
@router.get("/payments", response_model=List[PaymentOut])
def get_my_payments(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Lấy tất cả payments của user.
    """
    user = db.query(User).filter(User.id == current_user.get("sub")).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    payments = db.query(Payment).filter(Payment.user_id == user.id).all()
    return payments
