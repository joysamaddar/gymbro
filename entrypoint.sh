#!/bin/sh

# Run migrations
echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

# Start the app
echo "🚀 Starting Next.js..."
node server.js
