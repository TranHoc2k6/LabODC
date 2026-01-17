from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.mentor import Mentor
from app.models.project import Project
from app.models.task import Task
from app.models.report import Report
from app.core.permissions import require_role
from app.core.constants import ROLE_MENTOR
from app.services.mentor import MentorService

router = APIRouter(prefix="/mentor", tags=["mentor"])


@router.post("/profile")
def create_mentor_profile(
    data: dict,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_MENTOR))
):
    return MentorService.create_profile(db, user, data)


@router.get("/projects")
def get_mentor_projects(
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_MENTOR))
):
    # Mentor thấy tất cả project (đúng nghiệp vụ MVP / đồ án)
    return db.query(Project).all()


@router.post("/projects/{project_id}/tasks")
def create_task(
    project_id: int,
    data: dict,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_MENTOR))
):
    mentor = db.query(Mentor).filter(Mentor.user_id == user.id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor profile not found")

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    task_data = dict(data)
    task_data["assigned_to"] = None  # 🔥 FIX LỖI FK

    task = Task(
        **task_data,
        project_id=project_id,
        created_by=mentor.id
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task



@router.post("/projects/{project_id}/reports")
def submit_report(
    project_id: int,
    data: dict,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_MENTOR))
):
    mentor = db.query(Mentor).filter(Mentor.user_id == user.id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor profile not found")

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project or project.mentor_id != mentor.id:
        raise HTTPException(status_code=403, detail="Not your project")

    report = Report(**data, project_id=project_id, submitted_by=mentor.id)
    db.add(report)
    db.commit()
    db.refresh(report)
    return {"message": "Report submitted"}
