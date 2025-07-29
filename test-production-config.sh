#!/bin/bash

echo "🧪 TESTE DE CONFIGURAÇÃO PARA PRODUÇÃO"
echo ""

echo "1️⃣ Verificando variáveis de ambiente necessárias:"
echo ""

echo "Backend (.env):"
if [ -f "backend/.env" ]; then
    echo "✅ backend/.env existe"
    grep -E "(MONGO_URL|DB_NAME|WHATSAPP_SERVICE_URL)" backend/.env || echo "❌ Variáveis faltando"
else
    echo "❌ backend/.env não encontrado"
fi

echo ""
echo "WhatsApp Service (.env):"
if [ -f "whatsapp-service/.env" ]; then
    echo "✅ whatsapp-service/.env existe"  
    grep -E "(FASTAPI_URL|PORT)" whatsapp-service/.env || echo "❌ Variáveis faltando"
else
    echo "❌ whatsapp-service/.env não encontrado"
fi

echo ""
echo "Frontend (.env):"
if [ -f "frontend/.env" ]; then
    echo "✅ frontend/.env existe"
    grep -E "REACT_APP_BACKEND_URL" frontend/.env || echo "❌ Variável faltando"
else
    echo "❌ frontend/.env não encontrado"
fi

echo ""
echo "2️⃣ Verificando arquivos de configuração:"
echo ""

files=("railway.json" "whatsapp-service/railway.json" "vercel.json" "whatsapp-service/Dockerfile" "backend/Dockerfile")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ $file não encontrado"
    fi
done

echo ""
echo "3️⃣ Testando conectividade local:"
echo ""

echo "Backend health check:"
curl -s -o /dev/null -w "%{http_code}" "https://f0e174b1-d864-44ae-8d3b-9f46fbcee83c.preview.emergentagent.com/api/whatsapp/status" || echo "❌ Backend não responde"

echo ""
echo "WhatsApp service health check:"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001/status" || echo "❌ WhatsApp service não responde"

echo ""
echo "✅ TESTE CONCLUÍDO!"
echo ""
echo "📋 PRÓXIMOS PASSOS PARA PRODUÇÃO:"
echo "1. Configure as variáveis no Railway (veja PRODUCTION-CONFIG.md)"
echo "2. Execute: bash deploy-production.sh"
echo "3. Siga as instruções do script"