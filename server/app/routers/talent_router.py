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
from app.schemas.talent_schema import TalentCreate, TalentResponse

router = APIRouter(prefix="/talent", tags=["talent"])

@router.post(
    "/profile",
    response_model=TalentResponse,
    status_code=201
)
def create_talent_profile(
    data: TalentCreate,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_TALENT))
):
    return TalentService.create_profile(db, user, data.dict())

@router.get("/profile/me", response_model=TalentResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_TALENT))
):
    talent = db.query(Talent).filter_by(user_id=user.id).first()

    if not talent:
        raise HTTPException(status_code=404, detail="Profile not found")

    return {
        "id": talent.id,
        "full_name": user.full_name,
        "skills": talent.skills,
        "bio": talent.bio,
    }


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
    talent = db.query(Talent).filter(Talent.user_id == user.id).first()
    if not talent:
        raise HTTPException(status_code=400, detail="Talent profile missing")

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project or project.status != "approved":
        raise HTTPException(status_code=400, detail="Project not available")

    existing = db.query(ProjectMember).filter(
        ProjectMember.project_id == project_id,
        ProjectMember.talent_id == talent.id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already joined this project")

    # JOIN
    member = ProjectMember(
        project_id=project_id,
        talent_id=talent.id
    )
    db.add(member)
    db.commit()

    # ✅ COUNT SAU KHI JOIN
    joined_count = db.query(ProjectMember)\
        .filter(ProjectMember.talent_id == talent.id)\
        .count()

    return {
        "message": "Joined project successfully",
        "joined_count": joined_count
    }
