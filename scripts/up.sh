#!/bin/bash
result=$(df / -BM | sed '1d' | awk '{print int($4)}')

set -e

if [ "$result" -lt 4000 ]; then
    timeout 5s docker system prune -f
fi

docker compose build core
docker compose up -d -t 1 --build front back
