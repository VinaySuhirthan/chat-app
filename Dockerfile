# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose port (Railway sets PORT env automatically)
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
