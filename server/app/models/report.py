from sqlalchemy import Integer, Column, ForeignKey, String, Text
from app.core.database import Base

class ProjectReport(Base):
    __tablename__ = "project_reports"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    leader_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    status = Column(String)  # submitted, approved, rejected
