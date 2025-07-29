#!/bin/bash

# 🔬 TESTE DIAGNÓSTICO COMPLETO - PROBLEMAS EM PRODUÇÃO
# =====================================================

echo "🔬 DIAGNÓSTICO AVANÇADO DO PROBLEMA"
echo "=================================="

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📋 1. Informações do usuário...${NC}"
echo "Seu frontend Vercel: https://500-kkskt06g-andressabgomes10-9056s-projects.vercel.app"
echo ""

# Pedir URLs do usuário
echo -e "${YELLOW}Digite suas URLs de produção para teste:${NC}"
read -p "🔗 URL do Backend Railway (ex: https://backend-production-xxxx.up.railway.app): " BACKEND_URL
read -p "🔗 URL do WhatsApp Service Railway (ex: https://whatsapp-production-xxxx.up.railway.app): " WHATSAPP_URL

echo ""
echo -e "${BLUE}📋 2. Testando conectividade básica...${NC}"

# Teste Backend
echo -n "🧪 Testando backend básico... "
BACKEND_TEST=$(curl -s --max-time 10 "$BACKEND_URL/api/" 2>/dev/null)
if [[ "$BACKEND_TEST" == *"Hello World"* ]]; then
    echo -e "${GREEN}✅ OK${NC}"
    BACKEND_OK=true
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}   Resposta: $BACKEND_TEST${NC}"
    BACKEND_OK=false
fi

# Teste WhatsApp Service
echo -n "🧪 Testando WhatsApp service... "
WHATSAPP_TEST=$(curl -s --max-time 10 "$WHATSAPP_URL/status" 2>/dev/null)
if [[ "$WHATSAPP_TEST" == *"connected"* ]] || [[ "$WHATSAPP_TEST" == *"status"* ]]; then
    echo -e "${GREEN}✅ OK${NC}"
    WHATSAPP_OK=true
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}   Resposta: $WHATSAPP_TEST${NC}"
    WHATSAPP_OK=false
fi

echo ""
echo -e "${BLUE}📋 3. Testando integração backend → whatsapp...${NC}"

echo -n "🔗 Testando integração... "
INTEGRATION_TEST=$(curl -s --max-time 10 "$BACKEND_URL/api/whatsapp/status" 2>/dev/null)
if [[ "$INTEGRATION_TEST" == *"connected"* ]] || [[ "$INTEGRATION_TEST" == *"status"* ]]; then
    echo -e "${GREEN}✅ OK${NC}"
    INTEGRATION_OK=true
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}   Resposta: $INTEGRATION_TEST${NC}"
    INTEGRATION_OK=false
fi

echo ""
echo -e "${BLUE}📋 4. Testando CORS do frontend...${NC}"

echo -n "🌐 Testando CORS... "
CORS_TEST=$(curl -s --max-time 10 -H "Origin: https://500-kkskt06g-andressabgomes10-9056s-projects.vercel.app" \
                -H "Access-Control-Request-Method: GET" \
                -H "Access-Control-Request-Headers: X-Requested-With" \
                -X OPTIONS "$BACKEND_URL/api/whatsapp/status" 2>/dev/null)

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ OK${NC}"
    CORS_OK=true
else
    echo -e "${RED}❌ FALHOU${NC}"
    CORS_OK=false
fi

echo ""
echo -e "${BLUE}📋 5. Diagnóstico e soluções...${NC}"
echo ""

if [[ "$BACKEND_OK" == false ]]; then
    echo -e "${RED}❌ PROBLEMA: Backend não está respondendo${NC}"
    echo -e "${YELLOW}💡 SOLUÇÃO:${NC}"
    echo "   1. Verifique se o backend foi deployado no Railway"
    echo "   2. Teste manualmente: $BACKEND_URL/api/"
    echo "   3. Verifique logs no Railway Dashboard"
    echo ""
fi

if [[ "$WHATSAPP_OK" == false ]]; then
    echo -e "${RED}❌ PROBLEMA: WhatsApp Service não está respondendo${NC}"
    echo -e "${YELLOW}💡 SOLUÇÃO:${NC}"
    echo "   1. Verifique se o WhatsApp service foi deployado no Railway"
    echo "   2. Teste manualmente: $WHATSAPP_URL/status"
    echo "   3. Verifique logs no Railway Dashboard"
    echo ""
fi

if [[ "$INTEGRATION_OK" == false ]] && [[ "$BACKEND_OK" == true ]]; then
    echo -e "${RED}❌ PROBLEMA: Backend não consegue acessar WhatsApp Service${NC}"
    echo -e "${YELLOW}💡 SOLUÇÃO:${NC}"
    echo "   1. Verifique a variável WHATSAPP_SERVICE_URL no backend Railway"
    echo "   2. Deve ser: $WHATSAPP_URL"
    echo "   3. Redeploy o backend após atualizar"
    echo ""
fi

if [[ "$CORS_OK" == false ]] && [[ "$BACKEND_OK" == true ]]; then
    echo -e "${RED}❌ PROBLEMA: CORS não configurado corretamente${NC}"
    echo -e "${YELLOW}💡 SOLUÇÃO:${NC}"
    echo "   1. Verifique se o backend tem CORS configurado para *.vercel.app"
    echo "   2. O código já está correto, pode ser problema de deploy"
    echo ""
fi

echo -e "${BLUE}📋 6. Variáveis de ambiente corretas...${NC}"
echo ""
echo -e "${YELLOW}🔧 Vercel - Environment Variables:${NC}"
echo "Nome da variável: REACT_APP_BACKEND_URL"
echo "Valor correto: $BACKEND_URL"
echo ""
echo -e "${YELLOW}🔧 ALTERNATIVAS para testar na Vercel:${NC}"
echo "1. REACT_APP_BACKEND_URL=$BACKEND_URL"
echo "2. VITE_REACT_APP_BACKEND_URL=$BACKEND_URL" 
echo "3. VITE_BACKEND_URL=$BACKEND_URL"
echo ""
echo -e "${BLUE}💡 DICA: Teste todas as 3 variáveis na Vercel para garantir${NC}"

echo ""
echo "=================================="
if [[ "$BACKEND_OK" == true ]] && [[ "$INTEGRATION_OK" == true ]]; then
    echo -e "${GREEN}🎉 SERVIÇOS FUNCIONANDO! O problema é só a variável de ambiente na Vercel.${NC}"
else
    echo -e "${RED}⚠️  PROBLEMA NOS SERVIÇOS! Corrija os serviços antes da variável de ambiente.${NC}"
fi
echo "=================================="