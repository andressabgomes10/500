## 🚀 Deploy Railway - Método Simples

**Problema identificado:** Railway não consegue lidar com monorepo complexo automaticamente.

**Solução:** Deploy individual de cada serviço.

### 📋 Passo a Passo:

#### 1️⃣ **Deploy Backend (Principal)**

```bash
# Na raiz do projeto, o Railway já detectará o Dockerfile
# Que está configurado para backend

# Configurar variáveis:
PORT=8001
MONGO_URL=mongodb://admin:senha@mongodb:27017  
DB_NAME=crm_production
```

#### 2️⃣ **Deploy WhatsApp Service (Separado)**

Criar novo projeto no Railway:
- Subir pasta `whatsapp-service/` como repositório separado
- Railway detectará o Dockerfile automaticamente

```bash
# Variáveis:
PORT=3001
FASTAPI_URL=https://seu-backend.railway.app
```

#### 3️⃣ **Deploy Frontend (Separado)**

Criar terceiro projeto:
- Subir pasta `frontend/` como repositório separado

```bash
# Variáveis:
REACT_APP_BACKEND_URL=https://seu-backend.railway.app
PORT=3000
```

#### 4️⃣ **MongoDB**

Adicionar como serviço no Railway:
- Railway Marketplace → MongoDB
- Ou PostgreSQL como alternativa

### 🎯 **Solução Imediata:**

**Faça assim agora:**

1. **Commit atual projeto no GitHub**
2. **Deploy apenas backend** no Railway (atual erro será corrigido)
3. **MongoDB separado** no Railway
4. **Teste backend funcionando**
5. **Depois faremos outros serviços**

**Quer que eu ajude com qual passo específico?**