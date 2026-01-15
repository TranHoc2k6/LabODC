from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PaymentCreate(BaseModel):
    project_id: int
    amount: float
    payment_method: str

class PaymentResponse(BaseModel):
    id: int
    project_id: int
    amount: float
    status: str
    team_amount: Optional[float]
    mentor_amount: Optional[float]
    lab_amount: Optional[float]
    created_at: datetime
    
    class Config:
        from_attributes = True