from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    submitted_by = Column(Integer, ForeignKey("users.id"))
    report_type = Column(String)  # monthly, phase, final
    
    title = Column(String)
    content = Column(Text)
    attachments = Column(Text)  # JSON string of file URLs
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    project = relationship("Project", backref="reports")