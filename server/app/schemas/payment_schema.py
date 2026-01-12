from pydantic import BaseModel

class PaymentCreate(BaseModel):
    project_id: int
    total_amount: int
