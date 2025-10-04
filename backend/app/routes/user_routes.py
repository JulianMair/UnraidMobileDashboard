from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services.user_services import create_user, get_user, get_all_users
from ..services.auth_service import require_admin

router = APIRouter( tags=["user"])

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


@router.get("/{username}")
def read_user(username: str):
    user = get_user(username)
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    return {"username": user.username,"password": user.password_hash, "role": user.role}

@router.get("/all/users")
def read_all_users():
    users = get_all_users()
    return [{"username": user.username, "role": user.role} for user in users]

# ... bestehender Code ...

@router.delete("/{username}")
def delete_user(username: str, current_user=Depends(require_admin)):
    user = get_user(username)
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")

    # Benutzer löschen
    from app.database.init_db import get_session
    with get_session() as session:
        session.delete(user)
        session.commit()

    return {"message": f"Benutzer {username} wurde gelöscht"}
