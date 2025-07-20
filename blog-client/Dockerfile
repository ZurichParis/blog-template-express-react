# Build stage - Creates the static files
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                    # Need devDependencies to build
COPY . .
RUN npm run build            # Creates /app/dist with static files

# Production stage - Serves the static files
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]