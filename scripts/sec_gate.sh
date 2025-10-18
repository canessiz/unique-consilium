#!/usr/bin/env bash
set -euo pipefail
MODE="${1:-hard}"   # hard | soft
RC=0

echo "== SEC GATE: pip-audit =="
if python3 scripts/sec_gate_pip.py; then
  echo "[pip] PASS"
else
  echo "[pip] FAIL"
  RC=1
fi

echo; echo "== SEC GATE: trivy (app-only) =="
if python3 scripts/sec_gate_trivy_app.py; then
  echo "[trivy-app] PASS"
else
  echo "[trivy-app] FAIL"
  RC=1
fi

if [ "$MODE" = "soft" ]; then
  echo "[mode=soft] RC would be $RC, but exiting 0 for now."
  exit 0
fi
exit $RC
