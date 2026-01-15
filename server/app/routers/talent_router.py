from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.talent import Talent
from app.models.project import Project, ProjectMember
from app.models.user import User
from app.core.permissions import require_role
from app.core.constants import ROLE_TALENT  
from app.services.talent import TalentService

router = APIRouter(prefix="/talent", tags=["talent"])

@router.post("/profile")
def create_talent_profile(
    data: dict,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_TALENT))
):
    return TalentService.create_profile(db, user, data)

@router.get("/projects")
def get_available_projects(
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_TALENT))
):
    return db.query(Project).filter(Project.status == "approved").all()

@router.post("/projects/{project_id}/join")
def join_project(
    project_id: int,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_TALENT))
):
    if not user.talent:
        raise HTTPException(400, "Talent profile missing")

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project or project.status != "approved":
        raise HTTPException(400, "Project not available")

    existing = db.query(ProjectMember).filter(
        ProjectMember.project_id == project_id,
        ProjectMember.talent_id == user.talent.id
    ).first()

    if existing:
        raise HTTPException(400, "Already joined this project")

    member = ProjectMember(project_id=project_id, talent_id=user.talent.id)
    db.add(member)
    db.commit()

    return {"message": "Joined project successfully"}


