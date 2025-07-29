# 🚀 CRM WhatsApp - Sistema de Atendimento Multicanal

> Sistema completo de CRM integrado com WhatsApp para gerenciamento de atendimento ao cliente, tickets e automação de mensagens.

## 📋 Visão Geral

Este projeto é uma solução completa de atendimento multicanal, composta por três principais módulos organizados em uma arquitetura de monorepo:

- **Frontend**: Aplicação React moderna com TypeScript, Vite e UI baseada em Radix UI
- **Backend**: API FastAPI robusta com Python, MongoDB e autenticação JWT
- **WhatsApp Service**: Microserviço Node.js para integração direta com WhatsApp Business

## 🏗️ Arquitetura

```
500/
├── 📁 apps/                    # Aplicações principais
│   ├── frontend/              # React App (TypeScript + Vite)
│   ├── backend/               # FastAPI App (Python)
│   └── whatsapp-service/      # WhatsApp Microservice (Node.js)
├── 📁 docs/                   # Documentação organizada
├── 📁 scripts/                # Scripts de automação
├── 📁 shared/                 # Recursos compartilhados
├── 📁 tools/                  # Ferramentas e configurações
└── 📁 .github/                # GitHub Actions
```

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose (opcional)
- MongoDB

### Instalação Completa

```bash
# 1. Clone o repositório
git clone https://github.com/andressabgomes10/500.git
cd 500

# 2. Instale todas as dependências
npm run install:all

# 3. Inicie todos os serviços
npm run dev
```

### Usando Docker (Recomendado)

```bash
# 1. Clone e entre no projeto
git clone https://github.com/andressabgomes10/500.git
cd 500

# 2. Inicie com Docker Compose
npm run docker:up

# 3. Acesse a aplicação
# Frontend: http://localhost:3000
# Backend API: http://localhost:8001
# WhatsApp Service: http://localhost:3001
```

## 📚 Documentação

A documentação completa está organizada em `/docs/`:

- **[📖 Índice da Documentação](./docs/README.md)** - Navegação completa
- **[🚀 Guias de Deploy](./docs/deployment/)** - Deploy e produção
- **[🔧 Troubleshooting](./docs/troubleshooting/)** - Solução de problemas
- **[🏗️ Arquitetura](./docs/architecture/)** - Configuração e estrutura

## 🛠️ Comandos Principais

### Desenvolvimento
```bash
npm run dev                    # Inicia todos os serviços
npm run dev:frontend          # Apenas frontend
npm run dev:backend           # Apenas backend
npm run dev:whatsapp          # Apenas WhatsApp service
```

### Build e Deploy
```bash
npm run build                 # Build de todos os serviços
npm run docker:up            # Inicia com Docker
npm run docker:down          # Para containers Docker
```

### Qualidade de Código
```bash
npm run lint                 # Linting de todos os serviços
npm run format               # Formatação de código
npm run test                 # Executa todos os testes
```

### Manutenção
```bash
npm run clean                # Limpa node_modules e builds
npm run install:all          # Reinstala todas as dependências
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie arquivos `.env` em cada aplicação:

**Backend** (`apps/backend/.env`):
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=crm_production
PORT=8001
WHATSAPP_SERVICE_URL=http://localhost:3001
```

**Frontend** (`apps/frontend/.env`):
```env
VITE_BACKEND_URL=http://localhost:8001
REACT_APP_BACKEND_URL=http://localhost:8001
```

**WhatsApp Service** (`apps/whatsapp-service/.env`):
```env
FASTAPI_URL=http://localhost:8001
PORT=3001
```

## 📱 Funcionalidades

### ✅ Implementadas
- 🔐 Sistema de autenticação multi-perfil
- 📱 Integração completa com WhatsApp Business
- 🎫 Sistema de tickets e atendimento
- 👥 Gerenciamento de clientes
- 🤖 Chatbot com comandos automáticos
- 📊 Dashboard com estatísticas
- 📈 Relatórios e métricas
- 🔄 Interface responsiva e moderna

### 🚧 Em Desenvolvimento
- 📧 Integração com email
- 📞 Integração com telefonia
- 🤖 IA para automação avançada
- 📱 App mobile nativo

## 🛡️ Segurança

- Autenticação JWT
- Validação de dados com Pydantic
- CORS configurado
- Rate limiting
- Sanitização de inputs
- Logs de auditoria

## 🧪 Testes

```bash
# Testes do backend
npm run test:backend

# Testes do frontend
npm run test:frontend

# Todos os testes
npm run test
```

## 📦 Deploy

### Railway + Vercel (Recomendado)
```bash
# Deploy do backend
cd apps/backend
railway up

# Deploy do WhatsApp service
cd apps/whatsapp-service
railway up

# Deploy do frontend
cd apps/frontend
vercel --prod
```

### Docker
```bash
# Build e deploy
npm run docker:build
npm run docker:up
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 📧 Email: suporte@crmwhatsapp.com
- 🐛 Issues: [GitHub Issues](https://github.com/andressabgomes10/500/issues)
- 📚 Documentação: [./docs/README.md](./docs/README.md)

## 🙏 Agradecimentos

- [FastAPI](https://fastapi.tiangolo.com/) - Framework web moderno
- [React](https://reactjs.org/) - Biblioteca JavaScript
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [Baileys](https://github.com/whiskeysockets/baileys) - WhatsApp Web API
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!**
