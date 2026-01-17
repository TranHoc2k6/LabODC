from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base


class Talent(Base):
    __tablename__ = "talents"
    __table_args__ = (
        UniqueConstraint("user_id", name="uq_talent_user"),
    )
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    student_id = Column(String, unique=True)
    major = Column(String)
    year = Column(Integer)
    skills = Column(JSON)  # ["Python", "React"]
    portfolio_url = Column(String)
    github_url = Column(String)
    bio = Column(Text)
    
    user = relationship("User", backref="talent")
    
