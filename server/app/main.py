from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine

# Models
from app.models.user import User
from app.models.enterprise import Enterprise
from app.models.talent import Talent
from app.models.mentor import Mentor
from app.models.project import Project, ProjectMember
from app.models.payment import Payment, FundDistribution
from app.models.task import Task
from app.models.report import Report

# Routers
from app.routers import (
    auth_router,
    enterprise_router,
    project_router,
    payment_router,
    talent_router,
    mentor_router,
    admin_router,
    system_router
)

app = FastAPI(title="LabODC API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    print("✅ Database ready")

# 🔥 FIX
app.include_router(auth_router)
app.include_router(enterprise_router)
app.include_router(project_router)
app.include_router(payment_router)
app.include_router(talent_router)
app.include_router(mentor_router)
app.include_router(admin_router)
app.include_router(system_router)

@app.get("/")
def root():
    return {"message": "LabODC API running"}
