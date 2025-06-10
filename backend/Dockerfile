# Basis-Image
FROM python:3.9-slim

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Anwendungscode kopieren
COPY ./app ./app

# Port freigeben
EXPOSE 8000

# Startbefehl
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]