from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PaymentCreate(BaseModel):
    project_id: int
    amount: float
    payment_method: str


class ProjectShort(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True


class PaymentResponse(BaseModel):
    id: int
    project_id: int
    enterprise_id: int
    amount: float
    team_amount: float
    mentor_amount: float
    lab_amount: float
    status: str
    created_at: Optional[datetime] = None

    # ⭐ QUAN TRỌNG: để hiện tên project
    project: Optional[ProjectShort] = None

    class Config:
        from_attributes = True
