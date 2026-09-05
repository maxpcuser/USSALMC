#!/bin/bash

echo "Starting USSA Lore Master Knowledge Core..."

# Start all applications in background
cd apps/api && npm start &
API_PID=$!
cd ../web && npm start &
WEB_PID=$!
cd ../worker && npm start &
WORKER_PID=$!
cd ../scraper && npm start &
SCRAPER_PID=$!

# Wait for processes to start
sleep 5

echo "Applications started:"
echo "API: $API_PID"
echo "Web: $WEB_PID"
echo "Worker: $WORKER_PID"
echo "Scraper: $SCRAPER_PID"

echo "All applications started successfully."