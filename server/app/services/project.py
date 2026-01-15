from sqlalchemy.orm import Session
from app.models.project import Project
from app.core.constants import TEAM_PERCENT, MENTOR_PERCENT, LAB_PERCENT
from datetime import datetime

class ProjectService:
    @staticmethod
    def create_project(db: Session, project_data: dict, enterprise_id: int):
        project = Project(
            **project_data,
            enterprise_id=enterprise_id,
            status="pending"
        )
        db.add(project)
        db.commit()
        db.refresh(project)
        return project
    
    @staticmethod
    def validate_project(db: Session, project_id: int, admin_id: int):
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return None
        
        # Calculate fund distribution
        project.team_fund = project.total_budget * TEAM_PERCENT
        project.mentor_fund = project.total_budget * MENTOR_PERCENT
        project.lab_fund = project.total_budget * LAB_PERCENT
        if project.is_validated:
            raise ValueError("Project already validated")
        project.validated_by = admin_id
        project.validated_at = datetime.utcnow()
        project.status = "approved"
        
        db.commit()
        db.refresh(project)
        return project
    
    @staticmethod
    def get_projects_by_status(db: Session, status: str):
        return db.query(Project).filter(Project.status == status).all()
