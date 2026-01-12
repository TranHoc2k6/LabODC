from datetime import datetime
from pydantic import BaseModel

class FundOut(BaseModel):
    project_name: str
    amount: int
    paid: int
    pending: int
