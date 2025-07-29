# =================================================================
# CONFIGURAÇÃO PARA PRODUÇÃO (RAILWAY + VERCEL)
# =================================================================

# 🔧 PASSO 1: DEPLOY DOS SERVIÇOS NO RAILWAY
# ==========================================

# 1️⃣ Backend Service (FastAPI)
# Vá para: railway.app → Seu Projeto → Backend Service → Variables
# Adicione:
MONGO_URL=mongodb://mongo:SUA_SENHA_MONGO@mongodb.railway.internal:27017
DB_NAME=crm_production
PORT=8001
WHATSAPP_SERVICE_URL=https://whatsapp-service-production-XXXX.up.railway.app

# 2️⃣ WhatsApp Service (Node.js)  
# Vá para: railway.app → Seu Projeto → WhatsApp Service → Variables
# Adicione:
FASTAPI_URL=https://backend-service-production-XXXX.up.railway.app
PORT=3001

# 3️⃣ MongoDB Service
# Vá para: railway.app → Seu Projeto → MongoDB Service → Variables  
# Adicione:
MONGO_INITDB_ROOT_USERNAME=mongo
MONGO_INITDB_ROOT_PASSWORD=SUA_SENHA_MONGO

# 🔧 PASSO 2: DEPLOY DO FRONTEND NO VERCEL
# ========================================

# Vá para: vercel.com → Seu Projeto → Settings → Environment Variables
# Adicione:
REACT_APP_BACKEND_URL=https://backend-service-production-XXXX.up.railway.app

# 🔧 PASSO 3: COMANDOS DE DEPLOY
# ==============================

echo "1. Deploy Backend no Railway:"
echo "   railway link [seu-projeto]"
echo "   railway up --service backend"
echo ""
echo "2. Deploy WhatsApp Service no Railway:"
echo "   cd whatsapp-service"
echo "   railway up --service whatsapp"
echo "   cd .."
echo ""
echo "3. Deploy Frontend no Vercel:"
echo "   vercel --prod"

# ⚠️  IMPORTANTE: ORDEM DE DEPLOY
# ===============================
# 1. MongoDB (primeiro)
# 2. Backend (segundo) 
# 3. WhatsApp Service (terceiro)
# 4. Frontend (último)
#
# Motivo: Cada serviço precisa da URL do anterior