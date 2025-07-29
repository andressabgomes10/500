#!/bin/bash

# 🚀 SCRIPT DE DEPLOY PARA PRODUÇÃO (RAILWAY + VERCEL)
# ====================================================

set -e  # Exit on any error

echo "🚀 INICIANDO DEPLOY PARA PRODUÇÃO..."
echo "===================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se as CLIs estão instaladas
echo -e "${BLUE}📋 Verificando CLIs...${NC}"
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI não encontrada!${NC}"
    echo "Instale com: npm install -g @railway/cli"
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI não encontrada!${NC}"
    echo "Instale com: npm install -g vercel"
    exit 1
fi

echo -e "${GREEN}✅ CLIs instaladas${NC}"

# Verificar login
echo -e "${BLUE}🔐 Verificando autenticação...${NC}"
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Faça login no Railway: railway login${NC}"
    exit 1
fi

if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Faça login no Vercel: vercel login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Autenticação verificada${NC}"

# Deploy do Backend
echo -e "${BLUE}🔧 PASSO 1: Deploy do Backend...${NC}"
if railway link --help &> /dev/null; then
    echo "Configure o projeto Railway se necessário..."
    read -p "Pressione ENTER para continuar com o deploy do backend..."
    
    echo "Fazendo deploy do backend..."
    railway up --service backend
    
    echo -e "${GREEN}✅ Backend deployed!${NC}"
    echo -e "${YELLOW}📋 IMPORTANTE: Copie a URL do backend e configure as variáveis:${NC}"
    echo "   - MONGO_URL=mongodb://mongo:SENHA@mongodb.railway.internal:27017"
    echo "   - DB_NAME=crm_production"
    echo "   - PORT=8001"
    echo "   - WHATSAPP_SERVICE_URL=https://whatsapp-service-production-XXXX.up.railway.app"
    echo ""
    read -p "Após configurar as variáveis, pressione ENTER..."
else
    echo -e "${RED}❌ Erro com Railway CLI${NC}"
    exit 1
fi

# Deploy do WhatsApp Service
echo -e "${BLUE}🔧 PASSO 2: Deploy do WhatsApp Service...${NC}"
cd whatsapp-service
railway up --service whatsapp
cd ..

echo -e "${GREEN}✅ WhatsApp Service deployed!${NC}"
echo -e "${YELLOW}📋 IMPORTANTE: Configure as variáveis do WhatsApp Service:${NC}"
echo "   - FASTAPI_URL=https://backend-production-XXXX.up.railway.app"
echo "   - PORT=3001"
echo ""
read -p "Após configurar as variáveis, pressione ENTER..."

# Deploy do Frontend
echo -e "${BLUE}🔧 PASSO 3: Deploy do Frontend...${NC}"
echo -e "${YELLOW}📋 Configure a variável no Vercel antes do deploy:${NC}"
echo "   - REACT_APP_BACKEND_URL=https://backend-production-XXXX.up.railway.app"
echo ""
read -p "Após configurar a variável, pressione ENTER para fazer deploy..."

vercel --prod

echo -e "${GREEN}🎉 DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
echo "================================="
echo ""
echo -e "${BLUE}📋 PRÓXIMOS PASSOS:${NC}"
echo "1. Teste os endpoints backend e WhatsApp service"
echo "2. Acesse o frontend e verifique o QR code"
echo "3. Conecte o WhatsApp escaneando o QR"
echo "4. Teste o envio de mensagens"
echo ""
echo -e "${GREEN}✅ Sistema pronto para produção!${NC}"