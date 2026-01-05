from pydantic import BaseModel

class ProjectCreateSchema(BaseModel):
    title: str
    description: str
