#!/bin/zsh
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=3000
URL="http://localhost:${PORT}"
PID_FILE="${PROJECT_DIR}/.next-dev.pid"

cd "$PROJECT_DIR"

echo "Project: $PROJECT_DIR"
echo "Restarting local site on $URL"
echo

if [[ -f "$PID_FILE" ]]; then
  OLD_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [[ -n "$OLD_PID" ]] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "Stopping previous dev server from $PID_FILE: $OLD_PID"
    kill "$OLD_PID" 2>/dev/null || true
    sleep 1
    if kill -0 "$OLD_PID" 2>/dev/null; then
      kill -9 "$OLD_PID" 2>/dev/null || true
    fi
  fi
  rm -f "$PID_FILE"
fi

PIDS="$(lsof -tiTCP:${PORT} -sTCP:LISTEN 2>/dev/null || true)"
if [[ -n "$PIDS" ]]; then
  echo "Stopping processes currently listening on port ${PORT}:"
  echo "$PIDS"
  echo "$PIDS" | xargs kill 2>/dev/null || true
  sleep 1

  STILL_RUNNING="$(lsof -tiTCP:${PORT} -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$STILL_RUNNING" ]]; then
    echo "Force stopping remaining processes on port ${PORT}:"
    echo "$STILL_RUNNING"
    echo "$STILL_RUNNING" | xargs kill -9 2>/dev/null || true
    sleep 1
  fi
else
  echo "Port ${PORT} is free."
fi

echo
echo "Starting Next.js dev server..."

cleanup() {
  rm -f "$PID_FILE"
}
trap cleanup EXIT

(
  for i in {1..60}; do
    if curl -fsS "$URL" >/dev/null 2>&1; then
      open "$URL"
      exit 0
    fi
    sleep 1
  done
) &

npm run dev -- --port "$PORT" &
SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"
wait "$SERVER_PID"
