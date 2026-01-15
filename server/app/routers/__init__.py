from app.routers.auth_router import router as auth_router
from app.routers.enterprise_router import router as enterprise_router
from app.routers.project_router import router as project_router
from app.routers.payment_router import router as payment_router
from app.routers.talent_router import router as talent_router
from app.routers.mentor_router import router as mentor_router
from app.routers.admin_router import router as admin_router
from app.routers.system_router import router as system_router

__all__ = [
    "auth_router",
    "enterprise_router",
    "project_router",
    "payment_router",
    "talent_router",
    "mentor_router",
    "admin_router",
    "system_router"
]
