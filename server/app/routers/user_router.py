from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user, require_role
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserLoginSchema
from app.core.database import get_db
from app.core.security import verify_password, create_token


router = APIRouter(prefix="/auth", tags=["Auth"])
router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/login")
def login(user: UserLoginSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({
        "user_id": db_user.id,
        "role": db_user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(user = Depends(get_current_user)):
    return {
        "id": user.get("sub"),
        "role": user.get("role")
    }

@router.get("/admin-only")
def admin_api(user=Depends(require_role("admin"))):
    return {"msg": "Hello Admin"}

@router.get("/admin-only")
def admin_only(user = Depends(require_role("admin"))):
    return {
        "message": "Welcome Admin",
        "user": user
    }