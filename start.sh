#!/bin/bash
# French Tutor - Start server with public tunnel
# Run this on your Mac mini

DIR="$HOME/.hermes/sandboxes/docker/default/workspace/french-tutor"
PORT=8080

# Start simple HTTP server in background
cd "$DIR"
python3 -m http.server $PORT --bind 127.0.0.1 &
SERVER_PID=$!

# Wait for server to start
sleep 1

# Start bore tunnel (public URL)
echo ""
echo "🇫🇷 French Tutor is starting..."
echo "📱 Open the bore.pub URL below on your iPhone!"
echo ""
"$DIR/bore" local $PORT --to bore.pub

# Cleanup on exit
kill $SERVER_PID 2>/dev/null
