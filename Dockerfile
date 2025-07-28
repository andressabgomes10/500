# Dockerfile simples para Railway
FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependências Python
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código do backend
COPY backend/ .

# Comando para iniciar (Railway define $PORT automaticamente)
CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}