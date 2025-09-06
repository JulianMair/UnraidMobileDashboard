from sqlmodel import Session, SQLModel, create_engine
from .sql_model import User
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent  
DB_FILE = BASE_DIR / "database.db"           # .../backend/app/database/database.db

DATABASE_URL = f"sqlite:///{DB_FILE}"
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    return Session(engine)