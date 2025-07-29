# ✅ CHECKLIST PRÉ-DEPLOY - WHATSAPP BUSINESS CRM

## 🔍 VERIFICAÇÕES ANTES DO DEPLOY

### 1. Ambiente Local Funcionando
- [ ] WhatsApp service rodando localmente (porta 3001)
- [ ] Backend respondendo corretamente  
- [ ] Frontend exibindo QR code sem erros
- [ ] MongoDB conectado e funcionando
- [ ] Teste de mensagem funcionando localmente

### 2. Arquivos de Configuração
- [ ] `/app/railway.json` existe e está correto
- [ ] `/app/whatsapp-service/railway.json` existe e está correto
- [ ] `/app/vercel.json` existe e está correto
- [ ] `/app/backend/Dockerfile` existe e está correto
- [ ] `/app/whatsapp-service/Dockerfile` existe e está correto

### 3. Variáveis de Ambiente Preparadas
- [ ] Backend usa `WHATSAPP_SERVICE_URL` como variável
- [ ] WhatsApp service usa `FASTAPI_URL` como variável
- [ ] Frontend usa `import.meta.env.REACT_APP_BACKEND_URL`

### 4. CLIs Instaladas
- [ ] Railway CLI: `npm install -g @railway/cli`
- [ ] Vercel CLI: `npm install -g vercel`  
- [ ] Login feito: `railway login && vercel login`

### 5. Contas Configuradas
- [ ] Conta Railway criada e ativa
- [ ] Conta Vercel criada e ativa
- [ ] Projeto Railway criado (pode estar vazio)

## 🚀 ORDEM DE DEPLOY (IMPORTANTE!)

### Sequência Correta:
1. **Backend** (primeiro) → Gera URL base
2. **WhatsApp Service** (segundo) → Usa URL do backend  
3. **Atualizar Backend** → Com URL do WhatsApp service
4. **Frontend** (último) → Usa URL do backend

### ⚠️ Por que esta ordem?
- WhatsApp Service precisa da URL do Backend
- Backend precisa da URL do WhatsApp Service  
- Frontend precisa da URL do Backend
- Cada serviço depende do anterior

## 📋 COMANDOS RESUMIDOS

```bash
# 1. Deploy Backend
railway link [projeto]
railway up --service backend

# 2. Deploy WhatsApp Service  
cd whatsapp-service
railway link [projeto]  
railway up --service whatsapp
cd ..

# 3. Deploy Frontend
vercel --prod
```

## 🔧 VARIÁVEIS A CONFIGURAR

### Railway Backend Service:
```
MONGO_URL=mongodb://mongo:senha@mongodb.railway.internal:27017
DB_NAME=crm_production
PORT=8001
WHATSAPP_SERVICE_URL=https://whatsapp-service-production-xxx.up.railway.app
```

### Railway WhatsApp Service:
```
FASTAPI_URL=https://backend-production-xxx.up.railway.app
PORT=3001
```

### Vercel Frontend:
```
REACT_APP_BACKEND_URL=https://backend-production-xxx.up.railway.app
```

## ✅ VERIFICAÇÃO PÓS-DEPLOY

### 1. Testar Endpoints:
- [ ] `GET /api/whatsapp/status` → Backend
- [ ] `GET /status` → WhatsApp Service
- [ ] Frontend carrega sem erros de console

### 2. Testar Funcionalidade:
- [ ] QR code aparece no frontend
- [ ] Consegue escanear e conectar WhatsApp
- [ ] Mensagens chegam no sistema
- [ ] Tickets são criados corretamente

### 3. Monitoramento:
- [ ] Logs no Railway sem erros críticos
- [ ] Métricas de uso normais
- [ ] Frontend Vercel carregando rapidamente

## 🆘 PROBLEMAS COMUNS

### "process is not defined"
- ✅ **Resolvido**: Usa `import.meta.env` no frontend

### "WhatsApp service unreachable"  
- 🔧 **Solução**: Verificar WHATSAPP_SERVICE_URL no backend

### "Backend API failed"
- 🔧 **Solução**: Verificar REACT_APP_BACKEND_URL no frontend

### "QR code not loading"
- 🔧 **Solução**: Verificar se ambos os serviços estão rodando

## 🎯 RESULTADO ESPERADO

Após deploy completo:
- ✅ Frontend acessível via URL Vercel
- ✅ QR code aparece na seção WhatsApp Business  
- ✅ Conexão WhatsApp funcional
- ✅ Mensagens processadas corretamente
- ✅ Sistema limpo sem dados mockados
- ✅ Pronto para uso em produção

---

**📞 Suporte:** Consulte `DEPLOY-GUIDE.md` para instruções detalhadas ou use `bash deploy-automated.sh` para deploy assistido.