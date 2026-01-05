from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_role, get_current_user
from app.schemas.project_schema import ProjectCreateSchema
from app.models.project import Project
from app.models.project_member import ProjectMember

router = APIRouter(prefix="/projects", tags=["Projects"])


# =========================
# ENTERPRISE – CREATE PROJECT
# =========================
@router.post("/")
def create_project(
    data: ProjectCreateSchema,
    db: Session = Depends(get_db),
    user=Depends(require_role("enterprise"))
):
    project = Project(
        title=data.title,
        description=data.description,
        owner_id=int(user["sub"])
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    return {
        "message": "Project created",
        "project_id": project.id
    }


# =========================
# TALENT – LIST PROJECTS
# =========================
@router.get("/")
def list_projects(
    db: Session = Depends(get_db),
    user=Depends(require_role("talent"))
):
    return db.query(Project).all()


# =========================
# TALENT – JOIN PROJECT
# =========================
@router.post("/{project_id}/join")
def join_project(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_role("talent"))
):
    user_id = int(user["sub"])

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(404, "Project not found")

    exists = db.query(ProjectMember).filter(
        ProjectMember.project_id == project_id,
        ProjectMember.user_id == user_id
    ).first()

    if exists:
        raise HTTPException(400, "Already joined")

    member = ProjectMember(
        project_id=project_id,
        user_id=user_id,
        role="talent",
        status="pending"
    )

    db.add(member)
    db.commit()

    return {"message": "Join request sent"}


# =========================
# ADMIN – VIEW ALL PROJECTS (+ MEMBERS)
# =========================
@router.get("/admin/projects")
def admin_get_all_projects(
    db: Session = Depends(get_db),
    user=Depends(require_role("admin"))
):
    projects = db.query(Project).all()

    result = []
    for p in projects:
        members = db.query(ProjectMember).filter(
            ProjectMember.project_id == p.id
        ).all()

        result.append({
            "project_id": p.id,
            "title": p.title,
            "members": [
                {
                    "user_id": m.user_id,
                    "role": m.role,
                    "status": m.status
                } for m in members
            ]
        })

    return result


# =========================
# ENTERPRISE – VIEW OWN PROJECTS
# =========================
@router.get("/my-projects")
def get_my_projects(
    db: Session = Depends(get_db),
    user=Depends(require_role("enterprise"))
):
    return db.query(Project).filter(
        Project.owner_id == int(user["sub"])
    ).all()