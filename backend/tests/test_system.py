from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_system_info():
    response = client.get("/system/")
    assert response.status_code == 200
    data = response.json()
    assert "cpu_usage" in data
    assert "memory_available" in data
