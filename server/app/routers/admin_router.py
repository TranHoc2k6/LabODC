from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.project import Project
from app.models.user import User
from app.models.payment import Payment
from app.services.project import ProjectService
from app.core.permissions import require_role
from app.core.constants import ROLE_LAB_ADMIN

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/projects/pending")
def get_pending_projects(
    db: Session = Depends(get_db),
    admin = Depends(require_role(ROLE_LAB_ADMIN))
):
    return ProjectService.get_projects_by_status(db, "pending")

@router.post("/projects/{project_id}/validate")
def validate_project(
    project_id: int,
    db: Session = Depends(get_db),
    admin = Depends(require_role(ROLE_LAB_ADMIN))
):
    project = ProjectService.validate_project(db, project_id, admin.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project validated", "project": project}

@router.get("/users")
def get_all_users(
    db: Session = Depends(get_db),
    admin = Depends(require_role(ROLE_LAB_ADMIN))
):
    return db.query(User).all()

@router.get("/payments")
def get_all_payments(db: Session = Depends(get_db)):
    """Lab Admin: View all payments and fund distributions"""
    return db.query(Payment).all()
