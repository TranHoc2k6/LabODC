from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.talent import Talent

class TalentService:

    @staticmethod
    def create_profile(db: Session, user, data: dict):

        if user.talent:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Talent profile already exists"
            )

        if user.mentor or user.enterprise:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User already has another role"
            )

        talent = Talent(
            skills=data["skills"],
            bio=data.get("bio"),
            user_id=user.id
        )

        db.add(talent)
        db.commit()
        db.refresh(talent)

        return {
            "id": talent.id,
            "full_name": user.full_name,
            "skills": talent.skills,
            "bio": talent.bio
        }
