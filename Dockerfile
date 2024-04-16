# Deps stage
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY .env ./
COPY package.json package-lock.json ./
RUN npm ci

# Builder stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/.env ./.env
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/server.js .

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]
