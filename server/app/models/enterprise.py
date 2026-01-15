from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Enterprise(Base):
    __tablename__ = "enterprises"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    company_name = Column(String, nullable=False)
    tax_code = Column(String, unique=True)
    address = Column(String)
    phone = Column(String)
    website = Column(String)
    description = Column(Text)
    
    user = relationship("User", backref="enterprise")