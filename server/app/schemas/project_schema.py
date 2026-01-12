from pydantic import BaseModel
from typing import Optional

class ProjectOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    owner_id: int

    class Config:
        orm_mode = True


class ProjectCreateSchema(BaseModel):
    title: str
    description: Optional[str] = None

    class Config:
        orm_mode = True
