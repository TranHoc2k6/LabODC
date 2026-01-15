from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import get_password_hash, verify_password, create_access_token
from app.schemas.auth_schemas import UserRegister, UserLogin
from app.models.user import User
from app.core.security import create_access_token

class AuthService:
    @staticmethod
    def register_user(db: Session, user_data: UserRegister):
        hashed_pw = get_password_hash(user_data.password)
        user = User(
            email=user_data.email,
            hashed_password=hashed_pw,
            full_name=user_data.full_name,
            role=user_data.role
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def authenticate(db: Session, credentials: UserLogin):
        user = db.query(User).filter(User.email == credentials.email).first()
        if not user or not verify_password(credentials.password, user.hashed_password):
            return None
        return user
    
    @staticmethod
    def create_token(user):
     return create_access_token({
        "sub": user.email,
        "id": user.id,
        "role": user.role,
        "full_name": user.full_name
    })

    
    @staticmethod
    def authenticate_by_email(db: Session, email: str, password: str):
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

