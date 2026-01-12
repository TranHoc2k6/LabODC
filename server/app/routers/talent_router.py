from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.user import User
from app.models.team import TeamMember
from app.models.task import MentorTask, TaskSubmission
from app.models.fund import FundAllocation
from app.models.report import ProjectReport
from app.schemas.report_schema import ReportIn

router = APIRouter(prefix="/talent", tags=["Talent"])


# =========================
# MY PROFILE
# =========================
@router.get("/me")
def my_profile(
    user=Depends(require_role("talent")),
    db: Session = Depends(get_db)
):
    talent_id = int(user["sub"])
    return db.get(User, talent_id)


# =========================
# MY PROJECTS
# =========================
@router.get("/projects")
def my_projects(
    user=Depends(require_role("talent")),
    db: Session = Depends(get_db)
):
    talent_id = int(user["sub"])

    memberships = (
        db.query(TeamMember)
        .filter(TeamMember.talent_id == talent_id)
        .all()
    )

    results = []

    for m in memberships:
        project = m.team.project

        my_fund = sum(
            f.amount for f in project.funds if f.talent_id == talent_id
        )

        results.append({
            "project_id": project.id,
            "name": project.name,
            "status": project.status,
            "mentor": project.mentor.full_name if project.mentor else None,
            "role": m.role,
            "my_fund": my_fund
        })

    return results


# =========================
# MY TASKS
# =========================
@router.get("/projects/{project_id}/tasks")
def my_tasks(
    project_id: int,
    user=Depends(require_role("talent")),
    db: Session = Depends(get_db)
):
    talent_id = int(user["sub"])

    is_member = (
        db.query(TeamMember)
        .filter(
            TeamMember.talent_id == talent_id,
            TeamMember.team.has(project_id=project_id)
        )
        .first()
    )

    if not is_member:
        raise HTTPException(status_code=403, detail="Not in this project")

    return db.query(MentorTask).filter(MentorTask.project_id == project_id).all()


# =========================
# SUBMIT TASK
# =========================
@router.post("/tasks/{task_id}/submit")
def submit_task(
    task_id: int,
    file: UploadFile = File(...),
    user=Depends(require_role("talent")),
    db: Session = Depends(get_db)
):
    talent_id = int(user["sub"])

    submission = TaskSubmission(
        task_id=task_id,
        talent_id=talent_id,
        status="submitted",
        result_file=file.filename   # upload cloudinary sau
    )

    db.add(submission)
    db.commit()

    return {"message": "Task submitted"}


# =========================
# MY FUNDS
# =========================
@router.get("/funds")
def my_funds(
    user=Depends(require_role("talent")),
    db: Session = Depends(get_db)
):
    talent_id = int(user["sub"])

    funds = (
        db.query(FundAllocation)
        .filter(FundAllocation.talent_id == talent_id)
        .all()
    )

    return [
        {
            "project": f.project.name,
            "amount": f.amount,
            "paid": f.paid,
            "pending": f.amount - f.paid
        }
        for f in funds
    ]
