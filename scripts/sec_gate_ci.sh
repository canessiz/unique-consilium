#!/usr/bin/env bash
set -euo pipefail
MODE="${1:-hard}"  # hard | soft
APPDIR="/home/uniqueconsilium/unique-consilium-backend"
OUT="/var/reports"; mkdir -p "$OUT"
TS="$(date +%Y%m%d%H%M%S)"

cd "$APPDIR"

echo "== CI: build app image =="
IMG="appscan:${TS}"
docker build -f docker/Dockerfile -t "$IMG" .

echo "== CI: pip-audit report =="
docker run --rm -e TS="$TS" -v "$APPDIR":/work -v "$OUT":/reports -w /work \
  python:3.12-slim sh -lc '
    python -m pip install --no-cache-dir --upgrade pip >/dev/null 2>&1 || true
    python -m pip install --no-cache-dir pip-audit >/dev/null 2>&1
    pip-audit -r requirements.lock.txt -f json -o /reports/pip_audit_'"$TS"'.json || true
  '
echo "[pip-audit] /var/reports/pip_audit_${TS}.json"

echo "== CI: trivy app scan =="
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$OUT":/reports \
  aquasec/trivy:0.56.2 image --scanners vuln --timeout 4m \
  --format json --output "/reports/trivy_app_${TS}.json" "$IMG" || true
echo "[trivy-app] /var/reports/trivy_app_${TS}.json"

echo "== CI: trivy redis/postgres (rapor) =="
REDIS_REF="$(grep -Eo 'redis@sha256:[0-9a-f]{64}' docker-compose.yml | head -n1 || true)"
[ -n "$REDIS_REF" ] || REDIS_REF="$(docker image inspect --format='{{index .RepoDigests 0}}' redis:7-alpine || true)"
PG_REF="$(grep -Eo 'postgres@sha256:[0-9a-f]{64}' docker-compose.override.yml | head -n1 || true)"
[ -n "$PG_REF" ] || PG_REF="$(docker image inspect --format='{{index .RepoDigests 0}}' postgres:16-alpine || true)"

docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$OUT":/reports \
  aquasec/trivy:0.56.2 image --scanners vuln --timeout 4m \
  --format json --output "/reports/trivy_redis_${TS}.json" "$REDIS_REF" || true
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$OUT":/reports \
  aquasec/trivy:0.56.2 image --scanners vuln --timeout 4m \
  --format json --output "/reports/trivy_postgres_${TS}.json" "$PG_REF" || true
echo "[trivy]     /var/reports/trivy_redis_${TS}.json"
echo "[trivy]     /var/reports/trivy_postgres_${TS}.json"

echo "== CI: security gates ($MODE) =="
exec ./scripts/sec_gate.sh "$MODE"
