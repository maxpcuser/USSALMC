#!/bin/bash

# Verification script for installation
echo "Verifying installation..."

# Check if required directories exist
if [ -d "/opt/knowledge-core" ]; then
    echo "Application directory: ✅ Exists"
else
    echo "Application directory: ❌ Missing"
fi

# Check if systemd services exist
if [ -f "/etc/systemd/system/knowledge-core-api.service" ]; then
    echo "API Service: ✅ Installed"
else
    echo "API Service: ❌ Missing"
fi

# Check if database exists
if pg_isready -d knowledge_core_db > /dev/null 2>&1; then
    echo "Database: ✅ Available"
else
    echo "Database: ❌ Unavailable"
fi

echo "Verification completed!"
