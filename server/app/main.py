from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# DATABASE
from app.core.database import Base, engine

# === IMPORT MODELS AFTER DATABASE SETUP ===
from app.models.user import User
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.payment import Payment
from app.models.fund_distribution import FundDistribution

# === IMPORT ROUTERS ===
from app.routers import auth_router, user_router, project_router, payment_router, talent_router

app = FastAPI(
    title="LabODC API",
    version="1.0.0"
)

# === CORS MIDDLEWARE ===
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === CREATE TABLES ON STARTUP ===
@app.on_event("startup")
def startup():
    # Tạo tất cả bảng từ Base metadata nếu chưa tồn tại
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created (including payments)")

# === INCLUDE ROUTERS ===
app.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
app.include_router(user_router.router, prefix="/users", tags=["Users"])
app.include_router(project_router.router, prefix="/projects", tags=["Projects"])
app.include_router(payment_router.router, prefix="/payments", tags=["Payments"])
app.include_router(talent_router.router, prefix="/talent", tags=["Talent"])

# === ROOT HEALTH CHECK ===
@app.get("/")
def root():
    return {"message": "LabODC API is running"}
