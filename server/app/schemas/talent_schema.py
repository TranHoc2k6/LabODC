from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# -------------------------------
# User schema
# -------------------------------
class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    role: str
    skills: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        orm_mode = True


# -------------------------------
# Project schema
# -------------------------------
class ProjectOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    status: Optional[str] = None  # e.g., "active", "completed"
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

    class Config:
        orm_mode = True


# -------------------------------
# Payment schema
# -------------------------------
class PaymentOut(BaseModel):
    id: int
    amount: float
    status: Optional[str] = None  # e.g., "paid", "pending"
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True
