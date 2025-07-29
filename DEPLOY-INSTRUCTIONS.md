# 🚀 DEPLOY PASSO-A-PASSO - EXECUTE NO SEU AMBIENTE LOCAL

## 📋 PRÉ-REQUISITOS (Execute no seu terminal local)

### 1. Instalar as CLIs:
```bash
npm install -g @railway/cli
npm install -g vercel
```

### 2. Fazer login:
```bash
railway login
vercel login
```

## 🔽 BAIXAR O CÓDIGO

### Opção A - Se tem Git configurado:
```bash
# Clone/baixe o projeto atual para sua máquina local
```

### Opção B - Download manual:
1. Baixe todos os arquivos do projeto
2. Certifique-se de ter a estrutura completa:
   - `/backend/` com Dockerfile, requirements.txt, server.py, etc.
   - `/whatsapp-service/` com Dockerfile, package.json, server.js, etc.
   - `/frontend/` com package.json, src/, etc.
   - `railway.json`, `vercel.json` na raiz

## 🚀 EXECUTE OS COMANDOS ABAIXO (NO SEU TERMINAL LOCAL)

### PASSO 1: Criar projeto no Railway
```bash
# Vá para https://railway.app
# Clique em "New Project" → "Empty Project"
# Nomeie como "whatsapp-crm" ou similar
```

### PASSO 2: Deploy do Backend
```bash
# No diretório raiz do projeto
railway link
# Quando perguntado, conecte ao projeto criado e escolha/crie service "backend"

railway up
# Aguarde o deploy completar e COPIE A URL gerada
```

**📋 IMPORTANTE: Anote a URL do backend (ex: https://backend-production-xxxx.up.railway.app)**

### PASSO 3: Configurar variáveis do Backend
Vá para Railway Dashboard → Seu Projeto → Backend Service → Variables:

```
MONGO_URL=mongodb://mongo:SuaSenhaSegura@mongodb.railway.internal:27017
DB_NAME=crm_production
PORT=8001
WHATSAPP_SERVICE_URL=https://whatsapp-service-production-XXXX.up.railway.app
```

⚠️ **Nota:** Deixe WHATSAPP_SERVICE_URL temporário, você vai atualizar após o próximo passo.

### PASSO 4: Deploy do WhatsApp Service
```bash
cd whatsapp-service
railway link
# Conecte ao mesmo projeto e escolha/crie service "whatsapp-service"

railway up
cd ..
# COPIE A URL gerada do WhatsApp service
```

**📋 IMPORTANTE: Anote a URL do WhatsApp service (ex: https://whatsapp-service-production-xxxx.up.railway.app)**

### PASSO 5: Configurar variáveis do WhatsApp Service
Vá para Railway Dashboard → Seu Projeto → WhatsApp Service → Variables:

```
FASTAPI_URL=https://backend-production-XXXX.up.railway.app
PORT=3001
```

### PASSO 6: Atualizar Backend com URL do WhatsApp
Volte para Railway Dashboard → Backend Service → Variables:

Atualize:
```
WHATSAPP_SERVICE_URL=https://whatsapp-service-production-XXXX.up.railway.app
```

### PASSO 7: Deploy do Frontend no Vercel
```bash
# No diretório raiz do projeto
vercel --prod
# Siga as instruções do Vercel CLI
```

### PASSO 8: Configurar variável do Frontend
Vá para Vercel Dashboard → Seu Projeto → Settings → Environment Variables:

```
REACT_APP_BACKEND_URL=https://backend-production-XXXX.up.railway.app
```

### PASSO 9: Redesploy do Frontend
```bash
vercel --prod
```

## ✅ VERIFICAÇÃO FINAL

### Teste os endpoints:
```bash
# Teste o backend
curl https://seu-backend.up.railway.app/api/whatsapp/status

# Teste o WhatsApp service  
curl https://seu-whatsapp-service.up.railway.app/status
```

### Teste o frontend:
1. Acesse a URL do Vercel
2. Vá para "WhatsApp Business"
3. Verifique se o QR code aparece
4. Teste a conexão

## 🎉 SUCESSO!

Se tudo funcionou, você terá:
- ✅ Backend rodando no Railway
- ✅ WhatsApp Service rodando no Railway
- ✅ Frontend rodando no Vercel
- ✅ Sistema totalmente funcional em produção!

---

## 🆘 PRECISA DE AJUDA?

### Problemas comuns:
- **"Service not found"**: Verifique se criou os services corretos no Railway
- **"Environment variable missing"**: Confirme se todas as variáveis estão configuradas
- **"QR not loading"**: Verifique se ambos os services estão rodando no Railway

### Para suporte detalhado:
- Consulte `DEPLOY-GUIDE.md`
- Verifique `DEPLOY-CHECKLIST.md`
- Monitore os logs no Railway Dashboard