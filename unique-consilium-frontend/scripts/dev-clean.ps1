# Clean Next.js build cache and start dev server
# Usage: powershell -ExecutionPolicy Bypass -File scripts/dev-clean.ps1

if (Test-Path .next) {
  Write-Host "Removing .next cache..." -ForegroundColor Cyan
  Remove-Item .next -Recurse -Force
}
Write-Host "Starting dev server (npm run dev)" -ForegroundColor Cyan
npm run dev
