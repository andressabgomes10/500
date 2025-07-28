# Multi-stage build for Railway
FROM node:18-slim as frontend-build

# Build Frontend
WORKDIR /app/frontend
COPY frontend/package*.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend/ ./
RUN yarn build

# WhatsApp Service Stage
FROM node:18-slim as whatsapp-service

WORKDIR /app
COPY whatsapp-service/package*.json whatsapp-service/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY whatsapp-service/ ./
RUN mkdir -p auth_info
EXPOSE 3001
CMD ["node", "server.js"]