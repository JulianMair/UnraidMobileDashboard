from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.user_services import create_user, get_user

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    password: str
    role: str = "viewer"

@router.post("/register")
def register(data: RegisterRequest):
    if get_user(data.username):
        raise HTTPException(status_code=400, detail="Benutzer existiert bereits")

    user = create_user(data.username, data.password, data.role)
    return {"message": "Benutzer erstellt", "username": user.username}
