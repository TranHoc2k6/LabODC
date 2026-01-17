from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.mentor import Mentor
from app.core.constants import ROLE_MENTOR

class MentorService:

    @staticmethod
    def create_profile(db: Session, user, data: dict):
        if user.role != ROLE_MENTOR:
            raise HTTPException(403, "Only MENTOR can create mentor profile")

        if user.mentor:
            raise HTTPException(400, "Mentor profile already exists")

        if user.talent or user.enterprise:
            raise HTTPException(400, "User already has another role")

        # ✅ FIX: loại bỏ additionalProp*
        clean_data = {
            k: v for k, v in data.items()
            if hasattr(Mentor, k)
        }

        mentor = Mentor(**clean_data, user_id=user.id)
        db.add(mentor)
        db.commit()
        db.refresh(mentor)
        return mentor

