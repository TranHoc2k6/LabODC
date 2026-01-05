from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

# IMPORT MODELS
from app.models.user import User
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.payment import Payment
from app.models.fund_distribution import FundDistribution

# IMPORT ROUTERS (CHỈ IMPORT MODULE)
from app.routers import auth_router, user_router, project_router, payment_router

app = FastAPI(
    title="LabODC API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CREATE TABLES
Base.metadata.create_all(bind=engine)

# INCLUDE ROUTERS (CHỈ .router)
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(project_router.router)
app.include_router(payment_router.router)
