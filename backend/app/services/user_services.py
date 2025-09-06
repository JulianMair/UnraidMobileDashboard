
from sqlmodel import select
from app.database.sql_model import User
from passlib.hash import bcrypt
from app.database.init_db import get_session


def create_user(username: str, password: str, role: str = "viewer"):
    hashed_pw = bcrypt.hash(password)
    user = User(username=username, password_hash=hashed_pw, role=role)

    with get_session() as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

def get_user(username: str):
    with get_session() as session:
        statement = select(User).where(User.username == username)
        user = session.exec(statement).first()
        return user
