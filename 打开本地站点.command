#!/bin/zsh
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-3000}"
URL="${URL:-http://localhost:${PORT}/zh}"
PID_FILE="${PROJECT_DIR}/.next-dev.pid"
OPEN_BROWSER="${OPEN_BROWSER:-1}"
START_TIMEOUT="${START_TIMEOUT:-90}"
CURL_TIMEOUT="${CURL_TIMEOUT:-15}"
CLEAR_NEXT="${CLEAR_NEXT:-0}"

cd "$PROJECT_DIR"

is_pid_alive() {
  [[ -n "${1:-}" ]] && kill -0 "$1" 2>/dev/null
}

site_is_ready() {
  curl -fsS --connect-timeout 2 --max-time "$CURL_TIMEOUT" "$URL" >/dev/null 2>&1
}

record_listener_pid() {
  local listener_pid

  listener_pid="$(lsof -tiTCP:${PORT} -sTCP:LISTEN 2>/dev/null | head -n 1 || true)"
  if [[ -n "$listener_pid" ]]; then
    echo "$listener_pid" > "$PID_FILE"
  fi
}

open_site() {
  if [[ "$OPEN_BROWSER" != "0" ]]; then
    open "$URL"
  fi
}

stop_process_tree() {
  local pid="$1"
  local children

  children="$(pgrep -P "$pid" 2>/dev/null || true)"
  for child in ${(f)children}; do
    stop_process_tree "$child"
  done

  kill "$pid" 2>/dev/null || true
}

wait_for_site() {
  local timeout="$1"
  local waited=0

  while (( waited < timeout )); do
    if site_is_ready; then
      return 0
    fi

    if [[ -n "${SERVER_PID:-}" ]] && ! is_pid_alive "$SERVER_PID"; then
      return 1
    fi

    sleep 1
    (( waited += 1 ))
  done

  return 1
}

clear_next_cache() {
  echo "Clearing Next.js dev cache..."
  rm -rf .next
}

echo "Project: $PROJECT_DIR"
echo "Opening local site on $URL"
echo

OLD_PID=""
if [[ -f "$PID_FILE" ]]; then
  OLD_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
fi

if [[ -n "$OLD_PID" ]] && ! is_pid_alive "$OLD_PID"; then
  rm -f "$PID_FILE"
  OLD_PID=""
fi

if [[ "${FORCE_RESTART:-0}" == "1" ]]; then
  if is_pid_alive "$OLD_PID"; then
    echo "Force restarting tracked dev server: $OLD_PID"
    stop_process_tree "$OLD_PID"
    sleep 1
  fi
  rm -f "$PID_FILE"
  OLD_PID=""
  CLEAR_NEXT=1
fi

if site_is_ready; then
  echo "Local site is already running."
  record_listener_pid
  open_site
  exit 0
fi

if is_pid_alive "$OLD_PID"; then
  echo "Tracked dev server is still starting: $OLD_PID"
  SERVER_PID="$OLD_PID"

  if wait_for_site 60; then
    echo "Local site is ready."
    record_listener_pid
    open_site
    exit 0
  fi

  echo "Tracked dev server did not become ready. Restarting it once..."
  stop_process_tree "$OLD_PID"
  sleep 1
  rm -f "$PID_FILE"
  OLD_PID=""
  CLEAR_NEXT=1
fi

PIDS="$(lsof -tiTCP:${PORT} -sTCP:LISTEN 2>/dev/null || true)"
if [[ -n "$PIDS" ]]; then
  echo "Port ${PORT} already has a server. Waiting for $URL..."
  SERVER_PID="$(echo "$PIDS" | head -n 1)"

  if wait_for_site 60; then
    echo "Local site is ready."
    record_listener_pid
    open_site
    exit 0
  fi

  echo "Port ${PORT} is in use, but $URL did not respond."
  echo
  ps -p "${PIDS//$'\n'/,}" -o pid=,command= 2>/dev/null || true
  echo
  echo "Close that process, or run with another port, for example:"
  echo "PORT=3001 \"$0\""
  exit 1
fi

if [[ "$CLEAR_NEXT" == "1" ]]; then
  clear_next_cache
fi

echo "Starting Next.js dev server..."
echo "Keep this Terminal window open while previewing."
echo

BROWSERSLIST_IGNORE_OLD_DATA=1 npm run dev -- --port "$PORT" &
SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"

(
  if wait_for_site "$START_TIMEOUT"; then
    echo
    echo "Local site is ready."
    open_site
  else
    echo
    echo "Could not open $URL within ${START_TIMEOUT}s."
  fi
) &
WATCHER_PID=$!

cleanup() {
  if is_pid_alive "${WATCHER_PID:-}"; then
    kill "$WATCHER_PID" 2>/dev/null || true
  fi

  if [[ -f "$PID_FILE" ]] && [[ "$(cat "$PID_FILE" 2>/dev/null || true)" == "${SERVER_PID:-}" ]]; then
    rm -f "$PID_FILE"
  fi
}

trap cleanup EXIT

set +e
wait "$SERVER_PID"
STATUS=$?
set -e

exit "$STATUS"
