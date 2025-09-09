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


@router.get("/user/{username}")
def read_user(username: str):
    user = get_user(username)
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    return {"username": user.username, "role": user.role}

@router.get("/all/users")
def read_all_users():
    users = get_all_users()
    return [{"username": user.username, "role": user.role} for user in users]
