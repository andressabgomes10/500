# Dockerfile corrigido para Railway  
FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY backend/ .

# Usar porta fixa que funciona com $PORT do Railway
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port $PORT --log-level info"]