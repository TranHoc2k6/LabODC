from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.core.permissions import require_role
from app.core.database import get_db
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me")
def get_me(user = Depends(get_current_user)):
    return {
        "id": int(user.get("sub")),
        "role": user.get("role")
    }


@router.get("/admin")
def get_all_users_admin(
    db: Session = Depends(get_db),
    user = Depends(require_role("admin"))
):
    users = db.query(User).all()
    return users
