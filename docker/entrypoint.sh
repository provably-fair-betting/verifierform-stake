#!/bin/sh
set -e

CONFIG=/usr/share/nginx/html/config.json

if [ -n "$BET_LOOKUP_URL" ]; then
  jq -n --arg url "$BET_LOOKUP_URL" '{"betLookupUrl":$url}' > "$CONFIG"
else
  printf '{}\n' > "$CONFIG"
fi

exec "$@"
