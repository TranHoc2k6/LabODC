from fastapi import Depends, HTTPException, status
from app.core.deps import get_current_user

def require_role(role: str):
    def checker(user = Depends(get_current_user)):
        print("JWT role:", user.role, "| Required:", role)

        if user.role != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission"
            )
        return user

    return checker
