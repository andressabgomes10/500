#!/bin/bash

# 🚀 SCRIPT AUTOMATIZADO DE DEPLOY PARA PRODUÇÃO

echo "🚀 INICIANDO DEPLOY PARA PRODUÇÃO (RAILWAY + VERCEL)"
echo "=================================================="
echo ""

# Função para esperar input do usuário
wait_for_input() {
    echo "Pressione ENTER para continuar..."
    read
}

# Verificar se as CLIs estão instaladas
echo "🔍 Verificando pré-requisitos..."

if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI não encontrada. Instale com: npm install -g @railway/cli"
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não encontrada. Instale com: npm install -g vercel"
    exit 1
fi

echo "✅ CLIs encontradas!"
echo ""

# Verificar se está logado
echo "🔐 Verificando autenticação..."
railway whoami || (echo "❌ Faça login no Railway: railway login" && exit 1)
vercel whoami || (echo "❌ Faça login no Vercel: vercel login" && exit 1)
echo "✅ Autenticado!"
echo ""

echo "📋 INSTRUÇÕES IMPORTANTES:"
echo "1. Certifique-se de ter criado um projeto no Railway"
echo "2. Anote as URLs geradas após cada deploy"
echo "3. Configure as variáveis de ambiente conforme solicitado"
echo ""
wait_for_input

# STEP 1: Deploy Backend
echo "1️⃣ DEPLOY DO BACKEND NO RAILWAY"
echo "==============================="
echo ""
echo "Fazendo link com o projeto Railway..."
echo "IMPORTANTE: Escolha ou crie um serviço chamado 'backend'"
echo ""
railway link

echo ""
echo "Fazendo deploy do backend..."
railway up

echo ""
echo "✅ Backend deployado!"
echo ""
echo "📋 AÇÃO NECESSÁRIA:"
echo "1. Vá para railway.app → Seu Projeto → Backend Service"
echo "2. Copie a URL gerada (ex: https://backend-production-xxxx.up.railway.app)" 
echo "3. Anote esta URL - você precisará dela!"
echo ""
echo "4. Configure estas variáveis em Variables:"
echo "   MONGO_URL=mongodb://mongo:SUA_SENHA@mongodb.railway.internal:27017"
echo "   DB_NAME=crm_production"
echo "   PORT=8001"
echo "   WHATSAPP_SERVICE_URL=https://whatsapp-service-production-XXXX.up.railway.app"
echo ""
echo "Cole aqui a URL do backend:"
read BACKEND_URL

# STEP 2: Deploy WhatsApp Service
echo ""
echo "2️⃣ DEPLOY DO WHATSAPP SERVICE NO RAILWAY"
echo "========================================"
echo ""
cd whatsapp-service

echo "Fazendo link com o projeto Railway..."
echo "IMPORTANTE: Escolha ou crie um serviço chamado 'whatsapp-service'"
echo ""
railway link

echo ""
echo "Fazendo deploy do WhatsApp service..."
railway up

cd ..

echo ""
echo "✅ WhatsApp Service deployado!"
echo ""
echo "📋 AÇÃO NECESSÁRIA:"
echo "1. Vá para railway.app → Seu Projeto → WhatsApp Service"
echo "2. Copie a URL gerada (ex: https://whatsapp-service-production-xxxx.up.railway.app)"
echo "3. Configure estas variáveis em Variables:"
echo "   FASTAPI_URL=$BACKEND_URL"
echo "   PORT=3001"
echo ""
echo "Cole aqui a URL do WhatsApp service:"
read WHATSAPP_URL

# STEP 3: Atualizar Backend com URL do WhatsApp
echo ""
echo "3️⃣ ATUALIZANDO CONFIGURAÇÃO DO BACKEND"
echo "======================================"
echo ""
echo "📋 AÇÃO NECESSÁRIA:"
echo "1. Vá para railway.app → Seu Projeto → Backend Service → Variables"
echo "2. Atualize a variável:"
echo "   WHATSAPP_SERVICE_URL=$WHATSAPP_URL"
echo "3. O serviço irá reiniciar automaticamente"
echo ""
wait_for_input

# STEP 4: Deploy Frontend
echo "4️⃣ DEPLOY DO FRONTEND NO VERCEL"
echo "==============================="
echo ""
echo "Fazendo deploy do frontend no Vercel..."
vercel --prod

echo ""
echo "✅ Frontend deployado!"
echo ""
echo "📋 AÇÃO NECESSÁRIA:"
echo "1. Vá para vercel.com → Seu Projeto → Settings → Environment Variables"
echo "2. Adicione a variável:"
echo "   REACT_APP_BACKEND_URL=$BACKEND_URL"
echo "3. Faça redesploy: vercel --prod"
echo ""
wait_for_input

echo ""
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "================================"
echo ""
echo "📊 RESUMO DAS URLs:"
echo "Backend: $BACKEND_URL"
echo "WhatsApp Service: $WHATSAPP_URL"
echo "Frontend: [URL mostrada pelo Vercel acima]"
echo ""
echo "🔍 PRÓXIMOS PASSOS:"
echo "1. Teste o frontend acessando a URL do Vercel"
echo "2. Vá para 'WhatsApp Business' e verifique se o QR code aparece"
echo "3. Conecte seu WhatsApp escaneando o QR"
echo "4. Teste enviando uma mensagem para o número conectado"
echo ""
echo "🛠️ TROUBLESHOOTING:"
echo "- Se houver problemas, verifique os logs no Railway"
echo "- Certifique-se de que todas as variáveis estão configuradas"
echo "- Consulte DEPLOY-GUIDE.md para ajuda detalhada"
echo ""
echo "✅ SISTEMA PRONTO PARA PRODUÇÃO!"