from pydantic import BaseModel
from datetime import datetime  

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
    user_id: int
    amount: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True  # Pydantic V2: thay cho orm_mode=True