#!/bin/bash

# Update script for USSA Lore Master Knowledge Core
echo "Starting update..."

# Stop services
echo "Stopping services..."
sudo systemctl stop knowledge-core-api.service
sudo systemctl stop knowledge-core-web.service
sudo systemctl stop knowledge-core-worker.service

# Pull latest code
echo "Pulling latest code..."
git pull origin main

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

echo "Update completed successfully!"
