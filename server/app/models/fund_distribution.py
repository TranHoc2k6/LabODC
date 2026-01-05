from sqlalchemy import Column, Integer, Float, ForeignKey, String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class FundDistribution(Base):
    __tablename__ = "fund_distributions"

    id = Column(Integer, primary_key=True)

    payment_id = Column(Integer, ForeignKey("payments.id"), nullable=False)
    recipient_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    role = Column(String, nullable=False)  # team / mentor / lab
    amount = Column(Float, nullable=False)

    status = Column(String, default="pending")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
