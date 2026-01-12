from pydantic import BaseModel
from typing import Optional, List

# Dòng này để Pydantic V2 không cảnh báo
class BaseSchema(BaseModel):
    class Config:
        from_attributes = True


class ReportIn(BaseSchema):
    content: str
    issues: Optional[str] = None
    request_payment: bool = False


class ReportOut(BaseSchema):
    id: int
    project_id: int
    leader_id: int
    content: str
    issues: Optional[str]
    request_payment: bool
    status: str
