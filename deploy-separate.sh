#!/bin/bash

echo "🚀 Estratégia de Deploy Railway - Serviços Separados"
echo "=================================================="

# Função para criar um serviço individual no Railway
deploy_service() {
    local service_name=$1
    local service_dir=$2
    
    echo "📦 Deployando $service_name..."
    
    # Criar diretório temporário para o serviço
    mkdir -p "../$service_name-deploy"
    
    # Copiar arquivos do serviço
    cp -r "$service_dir"/* "../$service_name-deploy/"
    
    cd "../$service_name-deploy"
    
    # Inicializar git se necessário
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit for $service_name"
    fi
    
    # Fazer deploy
    railway login
    railway init "$service_name"
    railway up
    
    cd - > /dev/null
    echo "✅ $service_name deployado!"
    echo ""
}

echo "Vamos deployar cada serviço separadamente:"
echo ""

# Deploy Backend
read -p "Deploy Backend? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    deploy_service "crm-backend" "backend"
fi

# Deploy WhatsApp Service
read -p "Deploy WhatsApp Service? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    deploy_service "crm-whatsapp" "whatsapp-service"
fi

# Deploy Frontend
read -p "Deploy Frontend? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    deploy_service "crm-frontend" "frontend"
fi

echo "🎉 Deploy concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis de ambiente em cada serviço"
echo "2. Conecte os serviços usando as URLs do Railway"
echo "3. Adicione MongoDB como serviço separado"
echo "4. Teste a integração completa"