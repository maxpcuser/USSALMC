#!/bin/bash

echo "Stopping USSA Lore Master Knowledge Core..."

# Kill all processes by name
pkill -f "apps/api"
pkill -f "apps/web"
pkill -f "apps/worker"
pkill -f "apps/scraper"

echo "All applications stopped."