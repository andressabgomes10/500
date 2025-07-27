#!/bin/bash

echo "🚀 Preparando deploy para Railway..."

# Verificar se Railway CLI está instalado
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI não encontrado. Instale com:"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Login no Railway (se necessário)
railway login

# Criar novo projeto ou conectar existente
echo "📝 Configurando projeto Railway..."
railway init

# Configurar serviços
echo "⚙️ Configurando serviços..."

# Deploy backend
echo "🐍 Fazendo deploy do Backend..."
cd backend
railway up --service backend
cd ..

# Deploy WhatsApp service  
echo "📱 Fazendo deploy do WhatsApp Service..."
cd whatsapp-service
railway up --service whatsapp-service
cd ..

# Deploy frontend
echo "⚛️ Fazendo deploy do Frontend..."
cd frontend  
railway up --service frontend
cd ..

# Configurar MongoDB
echo "🗄️ Configurando MongoDB..."
railway add -s mongodb

# Mostrar URLs
echo "✅ Deploy concluído!"
echo "🔗 URLs dos serviços:"
railway status

echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis de ambiente no painel Railway"
echo "2. Conecte os serviços internamente"
echo "3. Teste o QR code do WhatsApp"
echo "4. Configure domínio customizado (opcional)"