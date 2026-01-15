from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class Mentor(Base):
    __tablename__ = "mentors"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    expertise = Column(JSON)  # ["Backend", "DevOps"]
    years_experience = Column(Integer)
    company = Column(String)
    bio = Column(Text)
    
    user = relationship("User", backref="mentor")