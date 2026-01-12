from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from app.core.database import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    leader_id = Column(Integer, ForeignKey("users.id"))

    members = relationship("TeamMember", back_populates="team")


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    talent_id = Column(Integer, ForeignKey("users.id"))
    role = Column(String)  # member / leader

    team = relationship("Team", back_populates="members")
