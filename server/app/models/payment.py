from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)

    total_amount = Column(Float, nullable=False)
    team_amount = Column(Float, nullable=False)
    mentor_amount = Column(Float, nullable=False)
    lab_amount = Column(Float, nullable=False)

    status = Column(String, nullable=False)

    project = relationship("Project")
