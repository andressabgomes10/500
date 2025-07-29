# CRM WhatsApp - Sistema de Atendimento

## Sobre o Projeto

Sistema completo de CRM integrado com WhatsApp para gerenciamento de atendimento ao cliente, tickets, e automação de mensagens.

## Funcionalidades

- 📱 **Integração WhatsApp**: Conexão direta com WhatsApp Business
- 🎫 **Sistema de Tickets**: Gerenciamento completo de atendimentos
- 👥 **CRM de Clientes**: Cadastro e histórico de clientes
- 🤖 **Chatbot Automático**: Respostas automáticas e comandos
- 📊 **Dashboard**: Relatórios e estatísticas em tempo real
- 🔐 **Multi-perfil**: Sistema de login para diferentes usuários
- 📈 **Relatórios**: Análises e métricas de atendimento

## Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Vite
- **Backend**: FastAPI + Python
- **WhatsApp**: Baileys (WhatsApp Web API)
- **UI**: shadcn/ui + Tailwind CSS
- **Banco**: MongoDB
- **Deploy**: Railway + Vercel

## Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- Python 3.9+
- MongoDB

### Instalação

```bash
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>

# 2. Instale as dependências do frontend
cd frontend
yarn install

# 3. Instale as dependências do backend
cd ../backend
pip install -r requirements.txt

# 4. Instale as dependências do WhatsApp service
cd ../whatsapp-service
yarn install
```

### Executando os Serviços

```bash
# Terminal 1 - Backend
cd backend
python3 -m uvicorn server:app --host 0.0.0.0 --port 8001

# Terminal 2 - WhatsApp Service
cd whatsapp-service
yarn start

# Terminal 3 - Frontend
cd frontend
yarn dev
```

### Acessos
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **WhatsApp Service**: http://localhost:3001

## Configuração do WhatsApp

1. Acesse http://localhost:3000
2. Vá para a seção "WhatsApp Business"
3. Escaneie o QR Code com seu WhatsApp
4. O sistema estará pronto para receber e enviar mensagens

## Deploy em Produção

### Railway (Backend + WhatsApp Service)
```bash
# Deploy do backend
railway up --service backend

# Deploy do WhatsApp service
cd whatsapp-service
railway up --service whatsapp
```

### Vercel (Frontend)
```bash
vercel --prod
```

## Estrutura do Projeto

```
├── frontend/          # Interface React
├── backend/           # API FastAPI
├── whatsapp-service/  # Serviço WhatsApp
└── docs/             # Documentação
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

MIT License
