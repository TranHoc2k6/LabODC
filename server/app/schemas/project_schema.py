from pydantic import BaseModel
from typing import Optional

class ProjectOut(BaseModel):
    id: int
    title: str          # <-- khớp với Project.title
    description: str
    owner_id: int

    class Config:
        orm_mode = True

class ProjectCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None
    owner_id: int  # nếu bạn muốn tự set owner khi tạo project

    class Config:
        orm_mode = True
