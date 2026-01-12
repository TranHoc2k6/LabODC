from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from app.core.database import Base

class MentorTask(Base):
    __tablename__ = "mentor_tasks"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    title = Column(String)
    deadline = Column(DateTime)
    excel_file = Column(String)


class TaskSubmission(Base):
    __tablename__ = "task_submissions"

    id = Column(Integer, primary_key=True)
    task_id = Column(Integer, ForeignKey("mentor_tasks.id"))
    talent_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String)
    result_file = Column(String)
