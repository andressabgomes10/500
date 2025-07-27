# 🚀 Deploy CRM WhatsApp Business no Railway

## Pré-requisitos

1. **Conta no Railway**: Crie em [railway.app](https://railway.app)
2. **GitHub Repository**: Faça push do código para GitHub
3. **Railway CLI** (opcional): `npm install -g @railway/cli`

## 🎯 Deploy Automático (Recomendado)

### 1. Conectar GitHub ao Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Escolha seu repositório do CRM
5. Railway detectará automaticamente os serviços

### 2. Configurar Serviços

Railway criará automaticamente 4 serviços:

- 🐍 **backend** - FastAPI (porta 8001)
- 📱 **whatsapp-service** - Node.js (porta 3001)  
- ⚛️ **frontend** - React + Nginx (porta 3000)
- 🗄️ **mongodb** - MongoDB (porta 27017)

### 3. Configurar Variáveis de Ambiente

Para cada serviço, configure as variáveis:

#### **Backend**
```
PORT=8001
MONGO_URL=${{MongoDB.MONGO_URL}}
DB_NAME=crm_production
```

#### **WhatsApp Service**
```
PORT=3001
FASTAPI_URL=${{backend.RAILWAY_PRIVATE_DOMAIN}}
```

#### **Frontend**
```
REACT_APP_BACKEND_URL=${{backend.RAILWAY_PUBLIC_DOMAIN}}
PORT=3000
```

#### **MongoDB**
```
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=SUA_SENHA_FORTE_AQUI
```

### 4. Deploy Manual (Alternativo)

Se preferir deploy manual:

```bash
# Clone o repositório
git clone YOUR_REPO_URL
cd crm-whatsapp

# Execute o script de deploy
./deploy-railway.sh
```

## ✅ Verificação Pós-Deploy

1. **Backend**: `https://seu-backend.railway.app/api/`
2. **Frontend**: `https://seu-frontend.railway.app`
3. **WhatsApp QR**: Acesse a seção WhatsApp no CRM
4. **MongoDB**: Verificar conexão nos logs

## 🔧 Configuração WhatsApp

1. Acesse o frontend deployado
2. Navegue para "WhatsApp Business"
3. Escaneie o QR code com seu WhatsApp
4. Teste os comandos: `oi`, `ajuda`, `suporte: teste`

## 📊 Monitoramento

- **Logs**: Acesse cada serviço no painel Railway
- **Métricas**: CPU, RAM, Network no dashboard
- **Alertas**: Configure notificações para erros

## 🛠️ Troubleshooting

### Erro de CORS
- Verifique se REACT_APP_BACKEND_URL está configurado
- Backend deve permitir origem do frontend

### WhatsApp não conecta
- Verifique se whatsapp-service está rodando
- Logs do serviço devem mostrar QR code gerado

### MongoDB não conecta
- Verificar MONGO_URL nas variáveis
- Senha deve estar correta

## 🔄 Updates Automáticos

Railway fará deploy automático a cada push para o GitHub!

## 📞 Suporte

Se algo não funcionar:
1. Verifique logs no Railway dashboard
2. Confirme todas as variáveis de ambiente
3. Teste cada serviço individualmente

---

**🎉 Seu CRM WhatsApp Business estará rodando em produção!**