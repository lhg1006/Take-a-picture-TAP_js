FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json from deps stage
COPY --from=deps /usr/src/app/package.json /usr/src/app/package-lock.json ./

RUN npm ci

COPY . .

COPY .env ./.env

RUN npm run build

# Copy server.js from source
COPY server.js .

FROM node:18-alpine AS runner

WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs

# Copy from builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.env ./.env
COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/server.js .

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]
