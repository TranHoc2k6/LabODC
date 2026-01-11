from sqlalchemy import Column, Integer, ForeignKey, String, Float
from app.core.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    total_amount = Column(Float, nullable=False)
    team_amount = Column(Float, nullable=False)
    mentor_amount = Column(Float, nullable=False)
    lab_amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))  # ✅ bắt buộc
