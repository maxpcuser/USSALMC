#!/bin/bash

# Deployment script for USSA Lore Master Knowledge Core
echo "Starting deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build application
echo "Building application..."
npm run build

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start services
echo "Starting services..."
sudo systemctl start knowledge-core-api.service
sudo systemctl start knowledge-core-web.service
sudo systemctl start knowledge-core-worker.service

echo "Deployment completed successfully!"
