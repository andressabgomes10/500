#!/bin/bash

# 🔍 SCRIPT DE VERIFICAÇÃO PRÉ-DEPLOY
# ===================================

echo "🔍 VERIFICANDO CONFIGURAÇÕES PARA PRODUÇÃO..."
echo "=============================================="

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Contador de problemas
ISSUES=0

echo -e "${BLUE}📋 1. Verificando arquivos de configuração...${NC}"

# Verificar se arquivos de deploy existem
if [ -f "railway.json" ]; then
    echo -e "${GREEN}✅ railway.json encontrado${NC}"
else
    echo -e "${RED}❌ railway.json não encontrado${NC}"
    ((ISSUES++))
fi

if [ -f "frontend/vercel.json" ]; then
    echo -e "${GREEN}✅ frontend/vercel.json encontrado${NC}"
else
    echo -e "${RED}❌ frontend/vercel.json não encontrado${NC}"
    ((ISSUES++))
fi

if [ -f "whatsapp-service/railway.json" ]; then
    echo -e "${GREEN}✅ whatsapp-service/railway.json encontrado${NC}"
else
    echo -e "${RED}❌ whatsapp-service/railway.json não encontrado${NC}"
    ((ISSUES++))
fi

if [ -f "backend/Dockerfile" ]; then
    echo -e "${GREEN}✅ backend/Dockerfile encontrado${NC}"
else
    echo -e "${RED}❌ backend/Dockerfile não encontrado${NC}"
    ((ISSUES++))
fi

if [ -f "whatsapp-service/Dockerfile" ]; then
    echo -e "${GREEN}✅ whatsapp-service/Dockerfile encontrado${NC}"
else
    echo -e "${RED}❌ whatsapp-service/Dockerfile não encontrado${NC}"
    ((ISSUES++))
fi

echo ""
echo -e "${BLUE}📋 2. Verificando variáveis de ambiente...${NC}"

# Verificar se backend usa variáveis de ambiente
if grep -q "os.environ\|WHATSAPP_SERVICE_URL\|MONGO_URL" backend/server.py; then
    echo -e "${GREEN}✅ Backend usa variáveis de ambiente${NC}"
else
    echo -e "${RED}❌ Backend não está usando variáveis de ambiente${NC}"
    ((ISSUES++))
fi

# Verificar se WhatsApp service usa variáveis de ambiente
if grep -q "process.env\|FASTAPI_URL" whatsapp-service/server.js; then
    echo -e "${GREEN}✅ WhatsApp Service usa variáveis de ambiente${NC}"
else
    echo -e "${RED}❌ WhatsApp Service não está usando variáveis de ambiente${NC}"
    ((ISSUES++))
fi

# Verificar se frontend usa variáveis de ambiente
if grep -q "import.meta.env\|REACT_APP_BACKEND_URL" frontend/src/components/WhatsAppSection.tsx; then
    echo -e "${GREEN}✅ Frontend usa variáveis de ambiente${NC}"
else
    echo -e "${RED}❌ Frontend não está usando variáveis de ambiente${NC}"
    ((ISSUES++))
fi

echo ""
echo -e "${BLUE}📋 3. Verificando URLs hardcoded...${NC}"

# Verificar se não há URLs hardcoded problemáticas
if grep -r "localhost\|127.0.0.1" backend/ --exclude-dir=__pycache__ | grep -v "fallback\|default\|example"; then
    echo -e "${YELLOW}⚠️  URLs localhost encontradas no backend (verifique se são fallbacks)${NC}"
else
    echo -e "${GREEN}✅ Backend sem URLs localhost problemáticas${NC}"
fi

if grep -r "localhost\|127.0.0.1" whatsapp-service/ --exclude-dir=node_modules | grep -v "fallback\|default\|example"; then
    echo -e "${YELLOW}⚠️  URLs localhost encontradas no WhatsApp service (verifique se são fallbacks)${NC}"
else
    echo -e "${GREEN}✅ WhatsApp Service sem URLs localhost problemáticas${NC}"
fi

echo ""
echo -e "${BLUE}📋 4. Verificando dependências...${NC}"

# Verificar se requirements.txt existe
if [ -f "backend/requirements.txt" ]; then
    echo -e "${GREEN}✅ backend/requirements.txt existe${NC}"
else
    echo -e "${RED}❌ backend/requirements.txt não encontrado${NC}"
    ((ISSUES++))
fi

# Verificar se package.json existe
if [ -f "whatsapp-service/package.json" ]; then
    echo -e "${GREEN}✅ whatsapp-service/package.json existe${NC}"
else
    echo -e "${RED}❌ whatsapp-service/package.json não encontrado${NC}"
    ((ISSUES++))
fi

if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✅ frontend/package.json existe${NC}"
else
    echo -e "${RED}❌ frontend/package.json não encontrado${NC}"
    ((ISSUES++))
fi

echo ""
echo -e "${BLUE}📋 5. Verificando CLIs...${NC}"

if command -v railway &> /dev/null; then
    echo -e "${GREEN}✅ Railway CLI instalada$(NC)"
else
    echo -e "${RED}❌ Railway CLI não instalada (npm install -g @railway/cli)${NC}"
    ((ISSUES++))
fi

if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI instalada${NC}"
else
    echo -e "${RED}❌ Vercel CLI não instalada (npm install -g vercel)${NC}"
    ((ISSUES++))
fi

echo ""
echo "=============================================="

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 TODAS AS VERIFICAÇÕES PASSARAM!${NC}"
    echo -e "${GREEN}✅ Sistema pronto para deploy em produção${NC}"
    echo ""
    echo -e "${BLUE}📋 Próximos passos:${NC}"
    echo "1. Execute: ./deploy-production.sh"
    echo "2. Configure as variáveis de ambiente conforme solicitado"
    echo "3. Teste as URLs após deploy"
else
    echo -e "${RED}❌ $ISSUES PROBLEMAS ENCONTRADOS!${NC}"
    echo -e "${YELLOW}⚠️  Corrija os problemas antes de fazer deploy${NC}"
    exit 1
fi