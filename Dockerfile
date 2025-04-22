FROM node:20-bullseye-slim AS base

# Stage 1: Install dependencies and build the application
FROM base AS builder
WORKDIR /app

# Copy only package.json and prisma folder first
COPY package.json ./
# ✅ Ensure schema is available before running postinstall script
COPY prisma ./prisma  

RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production server
FROM base AS runner
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000
CMD ["./entrypoint.sh"]

