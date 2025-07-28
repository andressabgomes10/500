# Railway Deploy - Backend Only
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend files
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

# Expose port
EXPOSE $PORT

# Run the application
CMD uvicorn server:app --host 0.0.0.0 --port $PORT