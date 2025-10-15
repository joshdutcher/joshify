#!/bin/bash
# Railway production server start script
# Ensures proper port binding for serve package

# Railway provides PORT environment variable
# Default to 3000 if not set (for local testing)
PORT=${PORT:-3000}

echo "Starting server on port $PORT"
echo "Serving from: dist/"

# Start serve with proper TCP binding
# -l tcp://0.0.0.0:PORT - Bind to all interfaces on Railway's port
# --single - SPA routing support (all routes go to index.html)
exec npx serve dist -l tcp://0.0.0.0:$PORT --single
