#!/bin/bash

# 🔍 VALIDADOR DE CONFIGURAÇÃO RAILWAY INTERNA
# =============================================

echo "🔍 VALIDANDO CONFIGURAÇÃO RAILWAY COM DOMÍNIOS PRIVADOS"
echo "======================================================="

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📋 1. URLs necessárias...${NC}"
echo ""
echo "Digite as URLs dos seus serviços Railway:"
read -p "🔗 URL PÚBLICA do Backend (ex: https://backend-production-xxxx.up.railway.app): " BACKEND_PUBLIC_URL
read -p "🔗 URL PÚBLICA do WhatsApp Service (ex: https://whatsapp-production-xxxx.up.railway.app): " WHATSAPP_PUBLIC_URL

echo ""
echo -e "${BLUE}📋 2. Testando conectividade pública...${NC}"

# Teste Backend Público
echo -n "🧪 Testando backend público... "
BACKEND_TEST=$(curl -s --max-time 10 "$BACKEND_PUBLIC_URL/api/" 2>/dev/null)
if [[ "$BACKEND_TEST" == *"Hello World"* ]]; then
    echo -e "${GREEN}✅ OK${NC}"
    BACKEND_PUBLIC_OK=true
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}   Resposta: $BACKEND_TEST${NC}"
    BACKEND_PUBLIC_OK=false
fi

# Teste WhatsApp Service Público
echo -n "🧪 Testando WhatsApp service público... "
WHATSAPP_TEST=$(curl -s --max-time 10 "$WHATSAPP_PUBLIC_URL/status" 2>/dev/null)
if [[ "$WHATSAPP_TEST" == *"connected"* ]] || [[ "$WHATSAPP_TEST" == *"status"* ]]; then
    echo -e "${GREEN}✅ OK${NC}"
    WHATSAPP_PUBLIC_OK=true
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}   Resposta: $WHATSAPP_TEST${NC}"
    WHATSAPP_PUBLIC_OK=false
fi

# Teste Integração Interna (Backend -> WhatsApp)
echo -n "🔗 Testando integração interna (backend -> whatsapp)... "
INTEGRATION_TEST=$(curl -s --max-time 10 "$BACKEND_PUBLIC_URL/api/whatsapp/status" 2>/dev/null)
if [[ "$INTEGRATION_TEST" == *"connected"* ]] || [[ "$INTEGRATION_TEST" == *"status"* ]]; then
    echo -e "${GREEN}✅ OK${NC}"
    INTEGRATION_OK=true
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}   Resposta: $INTEGRATION_TEST${NC}"
    INTEGRATION_OK=false
fi

echo ""
echo -e "${BLUE}📋 3. Configuração correta das variáveis...${NC}"
echo ""

echo -e "${YELLOW}🚀 RAILWAY BACKEND SERVICE - Variables:${NC}"
echo "DB_NAME=crm_production"
echo "MONGO_URL=mongodb://mongo:\${MONGO_PASSWORD}@mongodb.railway.internal:27017"
echo "PORT=8001"
echo "WHATSAPP_SERVICE_URL=https://\${whatsapp-service.RAILWAY_PRIVATE_DOMAIN}"
echo ""

echo -e "${YELLOW}🚀 RAILWAY WHATSAPP SERVICE - Variables:${NC}"
echo "FASTAPI_URL=https://\${backend.RAILWAY_PRIVATE_DOMAIN}"
echo "PORT=3001"
echo ""

echo -e "${YELLOW}🌐 VERCEL FRONTEND - Environment Variables:${NC}"
echo "REACT_APP_BACKEND_URL=$BACKEND_PUBLIC_URL"
echo "VITE_REACT_APP_BACKEND_URL=$BACKEND_PUBLIC_URL"
echo "VITE_BACKEND_URL=$BACKEND_PUBLIC_URL"
echo ""

echo -e "${BLUE}📋 4. Diagnóstico e próximos passos...${NC}"
echo ""

if [[ "$BACKEND_PUBLIC_OK" == false ]]; then
    echo -e "${RED}❌ PROBLEMA: Backend não responde publicamente${NC}"
    echo -e "${YELLOW}💡 SOLUÇÃO:${NC}"
    echo "   1. Verifique se o backend foi deployado: railway up --service backend"
    echo "   2. Verifique se PORT=8001 está configurado"
    echo "   3. Verifique logs no Railway Dashboard"
    echo ""
fi

if [[ "$WHATSAPP_PUBLIC_OK" == false ]]; then
    echo -e "${RED}❌ PROBLEMA: WhatsApp Service não responde publicamente${NC}"
    echo -e "${YELLOW}💡 SOLUÇÃO:${NC}"
    echo "   1. Verifique se foi deployado: railway up --service whatsapp"
    echo "   2. Verifique se PORT=3001 está configurado"
    echo "   3. Verifique logs no Railway Dashboard"
    echo ""
fi

if [[ "$INTEGRATION_OK" == false ]] && [[ "$BACKEND_PUBLIC_OK" == true ]]; then
    echo -e "${RED}❌ PROBLEMA: Comunicação interna não funciona${NC}"
    echo -e "${YELLOW}💡 SOLUÇÃO:${NC}"
    echo "   1. Adicione no backend: WHATSAPP_SERVICE_URL=https://\${whatsapp-service.RAILWAY_PRIVATE_DOMAIN}"
    echo "   2. Adicione no whatsapp: FASTAPI_URL=https://\${backend.RAILWAY_PRIVATE_DOMAIN}"
    echo "   3. Redesploy ambos os serviços"
    echo ""
fi

echo -e "${BLUE}📋 5. Comandos para correção...${NC}"
echo ""
echo "# Redesploy backend com novas variáveis:"
echo "railway up --service backend"
echo ""
echo "# Redesploy whatsapp service:"
echo "railway up --service whatsapp"
echo ""
echo "# Redesploy frontend na Vercel:"
echo "vercel --prod"
echo ""

echo "======================================================="
if [[ "$BACKEND_PUBLIC_OK" == true ]] && [[ "$INTEGRATION_OK" == true ]]; then
    echo -e "${GREEN}🎉 SERVIÇOS RAILWAY FUNCIONANDO! Configure apenas as variáveis na Vercel.${NC}"
else
    echo -e "${RED}⚠️  CORRIGIR PROBLEMAS NO RAILWAY PRIMEIRO, depois configurar Vercel.${NC}"
fi
echo "======================================================="