from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.talent import Talent
from app.core.constants import ROLE_TALENT

class TalentService:

    @staticmethod
    def create_profile(db: Session, user, data: dict):
        if user.role != ROLE_TALENT:
            raise HTTPException(status_code=403, detail="Only TALENT can create talent profile")

        if user.talent:
            raise HTTPException(status_code=400, detail="Talent profile already exists")

        if user.mentor or user.enterprise:
            raise HTTPException(status_code=400, detail="User already has another role")

        talent = Talent(**data, user_id=user.id)
        db.add(talent)
        db.commit()
        db.refresh(talent)
        return talent
