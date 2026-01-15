from pydantic import BaseModel

class MentorCreate(BaseModel):
    full_name: str
    email: str
    expertise: str
    bio: str

class MentorOut(MentorCreate):
    id: int
    status: str
