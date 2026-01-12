import datetime
from pydantic import BaseModel

class TaskOut(BaseModel):
    id: int
    title: str
    deadline: datetime
    status: str
