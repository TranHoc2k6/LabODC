from pydantic import BaseModel

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