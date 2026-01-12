from sqlalchemy import Integer, Column, ForeignKey
from app.core.database import Base

class FundAllocation(Base):
    __tablename__ = "fund_allocations"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    talent_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Integer)
    paid = Column(Integer, default=0)
