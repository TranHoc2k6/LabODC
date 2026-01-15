from pydantic import BaseModel
from typing import Optional

class EnterpriseCreate(BaseModel):
    company_name: str
    tax_code: str
    address: Optional[str]
    phone: Optional[str]
    website: Optional[str]
    description: Optional[str]

class EnterpriseResponse(EnterpriseCreate):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True