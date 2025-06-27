from fastapi import APIRouter,FastAPI, Request
import httpx
import time
router = APIRouter()

GRAPHQL_API_URL = "https://192.168.178.10:5012/graphql"
API_KEY = "cd990aa35ece677fb0ed68536ba3cc579ff555e47778aca1c98b06661d510c4f"  # sicher im ENV speichern in Produktion
client = httpx.AsyncClient(timeout=15.0,verify=False)

@router.post("/")
async def graphql_proxy(request: Request):
    body = await request.json()
    start = time.time()
    response = await client.post(
        GRAPHQL_API_URL,
        json=body,
        headers={
            "x-api-key": API_KEY,
            "Content-Type": "application/json"
        }
        
    )
    duration = time.time() - start
    print(f"Proxy-Dauer: {duration*1000:.2f} ms")

    return response.json()