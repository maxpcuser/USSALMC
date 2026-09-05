#!/bin/bash

echo "Installing dependencies for USSA Lore Master Knowledge Core..."

# Install root dependencies
npm install

# Install workspace dependencies
cd apps/api && npm install
cd ../web && npm install
cd ../worker && npm install
cd ../scraper && npm install
cd ../../

echo "Installation complete."