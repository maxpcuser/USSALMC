#!/bin/bash

# Installation script for USSA Lore Master Knowledge Core
echo "Starting installation..."

# Update system packages
echo "Updating system packages..."
sudo apt update

# Install dependencies
echo "Installing required packages..."
sudo apt install -y nodejs npm postgresql redis nginx

# Setup PostgreSQL database
echo "Setting up database..."
sudo -u postgres createdb knowledge_core_db

# Create application user
echo "Creating application user..."
sudo useradd -r -m -U -d /opt/knowledge-core knowledge-core

# Copy application files
echo "Installing application files..."
sudo mkdir -p /opt/knowledge-core
sudo cp -r ./dist/* /opt/knowledge-core/

# Setup systemd services
echo "Setting up systemd services..."
sudo cp ./deployment/systemd/*.service /etc/systemd/system/

# Reload systemd daemon
echo "Reloading systemd..."
sudo systemctl daemon-reload

echo "Installation completed successfully!"
