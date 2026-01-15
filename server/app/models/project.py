from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
from sqlalchemy import UniqueConstraint

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    enterprise_id = Column(Integer, ForeignKey("enterprises.id"))
    mentor_id = Column(Integer, ForeignKey("mentors.id"), nullable=True, unique=True)

    title = Column(String, nullable=False)
    description = Column(Text)
    requirements = Column(Text)
    status = Column(String, default="pending")
    
    total_budget = Column(Float)
    team_fund = Column(Float)
    mentor_fund = Column(Float)
    lab_fund = Column(Float)
    
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    is_validated = Column(Boolean, default=False)
    validated_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    validated_at = Column(DateTime(timezone=True), nullable=True)
    
    enterprise = relationship("Enterprise", backref="projects")
    mentor = relationship("Mentor", backref="project")
    members = relationship("ProjectMember", back_populates="project")

class ProjectMember(Base):
    __tablename__ = "project_members"
    __table_args__ = (
        UniqueConstraint("project_id", "talent_id", name="uq_project_talent"),
    )
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    talent_id = Column(Integer, ForeignKey("talents.id"))
    is_leader = Column(Boolean, default=False)
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    
    project = relationship("Project", back_populates="members")
    talent = relationship("Talent", backref="project_memberships")
