from pydantic import BaseModel
from typing import List, Optional


class TalentCreate(BaseModel):
    skills: List[str]
    bio: Optional[str] = None

    class Config:
        schema_extra = {
            "example": {
                "skills": ["Python", "React", "FastAPI"],
                "bio": "I want to join LabODC projects"
            }
        }


class TalentResponse(BaseModel):
    id: int
    full_name: str
    skills: list[str]
    bio: str | None

    class Config:
        from_attributes = True


