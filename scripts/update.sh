#!/bin/bash

echo "Updating USSA Lore Master Knowledge Core..."

# Update root dependencies
npm update

# Update workspace dependencies
cd apps/api && npm update
cd ../web && npm update
cd ../worker && npm update
cd ../scraper && npm update
cd ../../

echo "Update complete."