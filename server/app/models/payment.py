from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
from sqlalchemy import Boolean
from sqlalchemy import UniqueConstraint

class Payment(Base):
    __tablename__ = "payments"
    __table_args__ = (
        UniqueConstraint("project_id", "is_hybrid", name="uq_project_payment_type"),
    )

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    enterprise_id = Column(Integer, ForeignKey("enterprises.id"))

    amount = Column(Float, nullable=False)
    status = Column(String, default="pending")

    team_amount = Column(Float)
    mentor_amount = Column(Float)
    lab_amount = Column(Float)

    is_hybrid = Column(Boolean, default=False)
    project = relationship("Project", backref="payments")



class FundDistribution(Base):
    __tablename__ = "fund_distributions"

    id = Column(Integer, primary_key=True)
    payment_id = Column(Integer, ForeignKey("payments.id"))
    recipient_id = Column(Integer, ForeignKey("users.id"))
    recipient_type = Column(String)  # talent, mentor, lab
    amount = Column(Float)

    status = Column(String, default="pending")
    transferred_at = Column(DateTime)

    payment = relationship("Payment", backref="distributions")

