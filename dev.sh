#!/bin/bash

# Automatically use the Node version specified in .nvmrc
if [ -f .nvmrc ]; then
  source ~/.nvm/nvm.sh 2>/dev/null
  nvm use --silent 2>/dev/null || nvm use >/dev/null 2>&1
fi

# Function to find an available port
find_free_port() {
  local port=$1
  while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; do
    port=$((port + 1))
  done
  echo $port
}

# Find available port starting from 3000
PORT=$(find_free_port 3000)

echo "🚀 Starting Next.js dev server on port $PORT..."
npx next dev -p $PORT

