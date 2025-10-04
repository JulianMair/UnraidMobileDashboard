from fastapi import APIRouter
from app.services.system_service import get_system_info

router = APIRouter(tags=["system"])

@router.get("/")
def system_info():
    return get_system_info()
