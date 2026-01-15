from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.project_schema import ProjectCreate, ProjectResponse
from app.services.project import ProjectService
from app.models.project import Project
from app.core.deps import get_current_user
from app.core.permissions import require_role
from app.core.constants import ROLE_ENTERPRISE
from app.core.constants import ROLE_LAB_ADMIN
from app.core.constants import ROLE_TALENT


router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=ProjectResponse)
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_ENTERPRISE))
):
    if not user.enterprise or len(user.enterprise) == 0:
        raise HTTPException(status_code=400, detail="Enterprise account not found")

    enterprise = user.enterprise[0]   # lấy enterprise đầu tiên

    project = ProjectService.create_project(
        db,
        data.dict(),
        enterprise_id=enterprise.id
    )
    return project


@router.get("/", response_model=List[ProjectResponse])
def list_projects(
    status: str = None,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)   # chỉ cần login
):
    return ProjectService.get_projects_by_status(db, status) if status else db.query(Project).all()

@router.post("/{id}/validate")
def validate_project(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(require_role(ROLE_LAB_ADMIN))
):
    return ProjectService.validate_project(db, id, admin.id)

