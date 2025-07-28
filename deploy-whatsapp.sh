#!/bin/bash

echo "🚀 Deploy WhatsApp Service para Railway via GitHub"
echo "=================================================="

# Criar repositório separado para WhatsApp Service
echo "📁 Criando estrutura para deploy..."

# Criar diretório temporário
mkdir -p ../whatsapp-deploy
cd ../whatsapp-deploy

# Copiar arquivos necessários
cp -r /app/whatsapp-service/* .

# Verificar se os arquivos foram copiados
echo "📋 Arquivos copiados:"
ls -la

# Inicializar git
git init
git add .
git commit -m "WhatsApp Service for Railway deploy"

echo ""
echo "✅ Repositório preparado!"
echo ""
echo "📋 Próximos passos:"
echo "1. Crie um novo repositório no GitHub: 'whatsapp-service'"
echo "2. Execute:"
echo "   git remote add origin https://github.com/andressabgomes10/whatsapp-service.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. No Railway:"
echo "   - New Project → Deploy from GitHub repo"
echo "   - Selecione o repositório 'whatsapp-service'"
echo "   - Configure variáveis:"
echo "     PORT=3001"
echo "     FASTAPI_URL=https://500-production-642e.up.railway.app"
echo ""
echo "4. Aguarde deploy e copie a URL gerada"