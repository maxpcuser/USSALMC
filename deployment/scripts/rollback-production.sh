#!/bin/bash

# Rollback script for USSA Lore Master Knowledge Core
echo "Starting rollback..."

# Stop services
echo "Stopping services..."
sudo systemctl stop knowledge-core-api.service
sudo systemctl stop knowledge-core-web.service
sudo systemctl stop knowledge-core-worker.service

# Rollback to previous version (implementation dependent)
echo "Rolling back to previous release..."

# Start services
echo "Starting services..."
sudo systemctl start knowledge-core-api.service
sudo systemctl start knowledge-core-web.service
sudo systemctl start knowledge-core-worker.service

echo "Rollback completed!"
