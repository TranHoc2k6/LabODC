from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def require_role(roles):
    def checker(token: str = Depends(oauth2_scheme)):
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.ALGORITHM]
            )
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")

        # cho phép truyền string hoặc list
        if isinstance(roles, str):
            allowed_roles = [roles]
        else:
            allowed_roles = roles

        if payload.get("role") not in allowed_roles:
            raise HTTPException(status_code=403, detail="Forbidden")

        return payload

    return checker

