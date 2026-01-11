from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PaymentOut(BaseModel):
    id: int
    amount: float
    status: str
    user_id: int
    project_id: int
    created_at: datetime

    class Config:
        orm_mode = True


class PaymentCreate(BaseModel):
    project_id: int
    total_amount: float

class PaymentRead(BaseModel):
    id: int
    team_amount: float
    mentor_amount: float
    lab_amount: float

class Config:
    from_attributes = True

    
class PaymentOut(BaseModel):
    id: int
    amount: float
    status: str
    user_id: int
    project_id: int
    created_at: datetime

    class Config:
        orm_mode = True