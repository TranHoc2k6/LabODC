from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.enterprise_schema import EnterpriseCreate, EnterpriseResponse
from app.models.enterprise import Enterprise
from app.core.permissions import require_role
from app.core.constants import ROLE_ENTERPRISE
from app.services.enterprise import EnterpriseService, EnterpriseDashboardService

router = APIRouter(prefix="/enterprise", tags=["enterprise"])

@router.post("/")
def create_enterprise(
    data: EnterpriseCreate,
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_ENTERPRISE))
):
    return EnterpriseService.create_profile(db, user, data)

@router.get("/me", response_model=EnterpriseResponse)
def get_my_enterprise(
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_ENTERPRISE))
):
    enterprise = db.query(Enterprise).filter(Enterprise.user_id == user.id).first()
    if not enterprise:
        raise HTTPException(status_code=404, detail="Enterprise profile not found")
    return enterprise

@router.get("/dashboard")
def get_enterprise_dashboard(
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_ENTERPRISE))
):
    return EnterpriseDashboardService.get_dashboard(db, user)


@router.get("/payments")
def get_enterprise_payments(
    db: Session = Depends(get_db),
    user = Depends(require_role(ROLE_ENTERPRISE))
):
    return EnterpriseDashboardService.get_payments(db, user)
