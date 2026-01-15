from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectCreate(BaseModel):
    title: str
    description: str
    requirements: str
    total_budget: float
    start_date: Optional[datetime]
    end_date: Optional[datetime]

class ProjectResponse(ProjectCreate):
    id: int
    enterprise_id: int
    status: str
    team_fund: Optional[float]
    mentor_fund: Optional[float]
    lab_fund: Optional[float]
    is_validated: bool
    created_at: datetime
    
    class Config:
        from_attributes = True