from fastapi import FastAPI
from .routes import system_routes
#from .routes import docker_routes
from .routes.graphql import query_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://127.0.0.1:8000",
    # Weitere erlaubte Ursprünge können hier hinzugefügt werden
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Oder setze ["*"], um alle Origins zuzulassen (nicht empfohlen für die Produktion)
    allow_methods=["*"],    # Erlaubt alle HTTP-Methoden (GET, POST, PUT, etc.)
    allow_headers=["*"],    # Erlaubt alle Header
)

app.include_router(system_routes.router, prefix="/system")
#app.include_router(docker_routes.router, prefix="/containers")
app.include_router(query_routes.router, prefix="/graphql/query")
