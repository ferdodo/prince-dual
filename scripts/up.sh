#!/bin/bash
set -e
df / -BM | sed '1d' | awk '{print int($4)}'| xargs test 4000 -lt || (docker system prune -f)
docker compose build core
docker compose up -d -t 1 --build front back
