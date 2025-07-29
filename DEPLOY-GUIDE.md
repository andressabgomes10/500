# 🚀 GUIA COMPLETO: DEPLOY PARA PRODUÇÃO (RAILWAY + VERCEL)

## 📋 PRÉ-REQUISITOS

### 1. Instalar CLIs necessárias:
```bash
npm install -g @railway/cli
npm install -g vercel
```

### 2. Fazer login:
```bash
railway login
vercel login
```

## 🔧 PASSO 1: DEPLOY NO RAILWAY

### 1️⃣ Criar Projeto no Railway
1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Escolha "Empty Project"
4. Nomeie o projeto (ex: "whatsapp-crm")

### 2️⃣ Deploy do Backend
```bash
# No diretório raiz do projeto
railway link [seu-projeto-id]
railway up --service backend
```

**Aguarde o deploy e copie a URL gerada (ex: https://backend-production-xxxx.up.railway.app)**

### 3️⃣ Configurar Variáveis do Backend
No painel do Railway → Backend Service → Variables:
```
MONGO_URL=mongodb://mongo:SUA_SENHA@mongodb.railway.internal:27017
DB_NAME=crm_production
PORT=8001
WHATSAPP_SERVICE_URL=https://whatsapp-service-production-XXXX.up.railway.app
```

### 4️⃣ Deploy do WhatsApp Service
```bash
cd whatsapp-service
railway up --service whatsapp
cd ..
```

**Aguarde o deploy e copie a URL gerada (ex: https://whatsapp-service-production-xxxx.up.railway.app)**

### 5️⃣ Configurar Variáveis do WhatsApp Service
No painel do Railway → WhatsApp Service → Variables:
```
FASTAPI_URL=https://backend-production-XXXX.up.railway.app
PORT=3001
```

### 6️⃣ Atualizar URL do WhatsApp Service no Backend
Volte ao Backend Service → Variables e atualize:
```
WHATSAPP_SERVICE_URL=https://whatsapp-service-production-XXXX.up.railway.app
```

### 7️⃣ Adicionar MongoDB (Opcional se não tiver)
1. No Railway → Seu Projeto → "Add Service"
2. Escolha "Database" → "MongoDB"
3. Configure as variáveis conforme necessário

## 🔧 PASSO 2: DEPLOY NO VERCEL

### 1️⃣ Deploy do Frontend
```bash
# No diretório raiz do projeto
vercel --prod
```

### 2️⃣ Configurar Variável de Ambiente
No painel do Vercel → Seu Projeto → Settings → Environment Variables:
```
REACT_APP_BACKEND_URL=https://backend-production-XXXX.up.railway.app
```

### 3️⃣ Redesploy do Frontend
```bash
vercel --prod
```

## ✅ VERIFICAÇÃO FINAL

### 1️⃣ Testar Backend:
```bash
curl https://seu-backend.up.railway.app/api/whatsapp/status
```

### 2️⃣ Testar WhatsApp Service:
```bash
curl https://seu-whatsapp-service.up.railway.app/status
```

### 3️⃣ Testar Frontend:
1. Acesse sua URL do Vercel
2. Vá para "WhatsApp Business"
3. Verifique se o QR code aparece
4. Teste a conexão

## 🔧 TROUBLESHOOTING

### Problema: WhatsApp Service não conecta com Backend
**Solução:** Verifique se as URLs estão corretas nas variáveis de ambiente

### Problema: Frontend mostra erro "process is not defined"
**Solução:** Já corrigido - usa `import.meta.env`

### Problema: QR Code não aparece
**Solução:** 
1. Verifique se ambos os serviços estão rodando
2. Teste as URLs individualmente
3. Verifique os logs no Railway

### Problema: Mensagens não chegam no sistema
**Solução:**
1. Verifique se o WhatsApp está conectado
2. Teste enviar uma mensagem de teste
3. Verifique os logs do WhatsApp Service

## 📊 MONITORAMENTO

### Railway:
- Vá para cada serviço → "Logs" para ver logs em tempo real
- Vá para "Metrics" para ver uso de recursos

### Vercel:
- Vá para "Functions" → "View Function Logs"
- Vá para "Analytics" para métricas

## 🎉 SUCESSO!

Após completar todos os passos, você terá:
- ✅ Backend rodando no Railway
- ✅ WhatsApp Service rodando no Railway  
- ✅ Frontend rodando no Vercel
- ✅ MongoDB configurado
- ✅ Sistema totalmente funcional em produção

**URLs finais:**
- Frontend: https://seu-projeto.vercel.app
- Backend: https://backend-production-xxxx.up.railway.app
- WhatsApp Service: https://whatsapp-service-production-xxxx.up.railway.app