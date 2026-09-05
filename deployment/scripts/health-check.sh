#!/bin/bash

# Health check script for USSA Lore Master Knowledge Core
echo "Running health checks..."

# Check database connection
if pg_isready -d knowledge_core_db; then
    echo "Database: ✅ Healthy"
else
    echo "Database: ❌ Unhealthy"
fi

# Check API service status
if systemctl is-active --quiet knowledge-core-api.service; then
    echo "API Service: ✅ Healthy"
else
    echo "API Service: ❌ Unhealthy"
fi

# Check Web service status  
if systemctl is-active --quiet knowledge-core-web.service; then
    echo "Web Service: ✅ Healthy"
else
    echo "Web Service: ❌ Unhealthy"
fi

# Check Worker service status
if systemctl is-active --quiet knowledge-core-worker.service; then
    echo "Worker Service: ✅ Healthy"
else
    echo "Worker Service: ❌ Unhealthy"
fi

echo "Health check completed!"
