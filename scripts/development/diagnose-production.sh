#!/bin/bash

# 🚨 SCRIPT DE VERIFICAÇÃO E CORREÇÃO DE PRODUÇÃO
# =================================================

set -e

echo "🔍 DIAGNÓSTICO COMPLETO DO SISTEMA EM PRODUÇÃO"
echo "==============================================="

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# URLs de exemplo (usuário deve substituir)
BACKEND_URL="https://backend-production-XXXX.up.railway.app"
WHATSAPP_URL="https://whatsapp-service-production-XXXX.up.railway.app"
FRONTEND_URL="https://seu-projeto.vercel.app"

echo -e "${BLUE}📋 1. Verificando URLs de produção...${NC}"
echo ""
echo "🔗 URLs atuais (substitua pelas suas URLs reais):"
echo "   Backend: $BACKEND_URL"
echo "   WhatsApp: $WHATSAPP_URL" 
echo "   Frontend: $FRONTEND_URL"
echo ""

read -p "Você quer inserir suas URLs reais? [y/N]: " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Digite suas URLs de produção:"
    read -p "Backend Railway URL: " BACKEND_URL
    read -p "WhatsApp Railway URL: " WHATSAPP_URL
    read -p "Frontend Vercel URL: " FRONTEND_URL
fi

echo ""
echo -e "${BLUE}📋 2. Testando conectividade dos serviços...${NC}"

# Testar Backend
echo -n "🧪 Testando backend... "
if curl -s --max-time 10 "$BACKEND_URL/api/" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}⚠️  Backend não está respondendo. Verifique o deploy no Railway.${NC}"
fi

# Testar WhatsApp Service
echo -n "🧪 Testando WhatsApp service... "
if curl -s --max-time 10 "$WHATSAPP_URL/status" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}⚠️  WhatsApp service não está respondendo. Verifique o deploy no Railway.${NC}"
fi

# Testar Frontend
echo -n "🧪 Testando frontend... "
if curl -s --max-time 10 "$FRONTEND_URL" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}⚠️  Frontend não está respondendo. Verifique o deploy na Vercel.${NC}"
fi

echo ""
echo -e "${BLUE}📋 3. Verificando integração completa...${NC}"

# Testar integração backend -> whatsapp
echo -n "🔗 Testando Backend → WhatsApp Service... "
BACKEND_WHATSAPP_TEST=$(curl -s --max-time 10 "$BACKEND_URL/api/whatsapp/status" || echo "ERROR")
if [[ "$BACKEND_WHATSAPP_TEST" != "ERROR" ]]; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo -e "${YELLOW}⚠️  Backend não consegue acessar o WhatsApp Service.${NC}"
    echo -e "${YELLOW}    Verifique a variável WHATSAPP_SERVICE_URL no Railway Backend.${NC}"
fi

echo ""
echo -e "${BLUE}📋 4. Guia de configuração das variáveis...${NC}"
echo ""
echo -e "${YELLOW}🔧 RAILWAY - Backend Service → Variables:${NC}"
echo "   MONGO_URL=mongodb://mongo:SUA_SENHA@mongodb.railway.internal:27017"
echo "   DB_NAME=crm_production"
echo "   PORT=8001"
echo "   WHATSAPP_SERVICE_URL=$WHATSAPP_URL"
echo ""
echo -e "${YELLOW}🔧 RAILWAY - WhatsApp Service → Variables:${NC}"
echo "   FASTAPI_URL=$BACKEND_URL"
echo "   PORT=3001"
echo ""
echo -e "${YELLOW}🔧 VERCEL - Environment Variables:${NC}"
echo "   REACT_APP_BACKEND_URL=$BACKEND_URL"
echo ""

echo -e "${BLUE}📋 5. Links úteis...${NC}"
echo ""
echo "🔗 Railway Dashboard: https://railway.app/dashboard"
echo "🔗 Vercel Dashboard: https://vercel.com/dashboard"
echo "🔗 Seu Frontend: $FRONTEND_URL"
echo ""

echo -e "${BLUE}📋 6. Comandos para redesploy...${NC}"
echo ""
echo "# Backend (se mudou variáveis):"
echo "railway up --service backend"
echo ""
echo "# WhatsApp Service (se mudou variáveis):"
echo "railway up --service whatsapp"
echo ""
echo "# Frontend (sempre após mudar REACT_APP_BACKEND_URL):"
echo "vercel --prod"
echo ""

echo "==============================================="
echo -e "${GREEN}🎯 DIAGNÓSTICO CONCLUÍDO!${NC}"
echo ""
echo -e "${BLUE}💡 Próximos passos:${NC}"
echo "1. Configure as variáveis conforme mostrado acima"
echo "2. Faça redesploy dos serviços se necessário"
echo "3. Teste acessando: $FRONTEND_URL"
echo "4. Vá em WhatsApp Business e verifique se o erro sumiu"
echo ""
echo -e "${GREEN}✅ Com essas configurações, seu sistema funcionará perfeitamente!${NC}"