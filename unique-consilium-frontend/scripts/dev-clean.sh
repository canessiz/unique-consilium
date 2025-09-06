#!/usr/bin/env bash
set -euo pipefail
if [ -d .next ]; then echo "Removing .next"; rm -rf .next; fi
if [ -d .turbo ]; then echo "Removing .turbo"; rm -rf .turbo; fi
if [ -d node_modules/.cache ]; then echo "Removing node_modules/.cache"; rm -rf node_modules/.cache; fi
echo "Starting dev server"
npm run dev
