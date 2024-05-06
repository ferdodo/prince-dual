#!/bin/bash
set -e
docker compose build core
docker compose up -d -t 1 --build front back
