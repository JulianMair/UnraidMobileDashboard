from fastapi import FastAPI
from .routes import system_routes
#from .routes import docker_routes
from .routes.graphql import query_routes
from .routes import auth
from fastapi.middleware.cors import CORSMiddleware
from app.database.init_db import init_db
from contextlib import asynccontextmanager

app = FastAPI()

origins = [
    "http://192.168.178.10:8099",  # Frontend URL
    "http://localhost:8099",       # lokal testen
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # erlaubt nur diese Domains
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE etc.
    allow_headers=["*"],        # alle Header erlauben
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)



app.include_router(system_routes.router, prefix="/system")
#app.include_router(docker_routes.router, prefix="/containers")
app.include_router(query_routes.router, prefix="/graphql/query")
app.include_router(auth.router, prefix="/auth")
