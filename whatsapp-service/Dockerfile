FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code  
COPY . .

# Create auth directory for WhatsApp session
RUN mkdir -p auth_info

# Expose port
EXPOSE 3001

# Run the application
CMD ["node", "server.js"]