#!/bin/bash

# Script de inicialização para Railway
echo "🚀 Iniciando CRM Backend..."
echo "🗄️  MongoDB: $MONGO_URL"
echo "🔢 Database: $DB_NAME"
echo "🌐 Port: ${PORT:-8001}"

# Executar servidor
exec uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}