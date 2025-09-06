# Fix potential case-insensitive git issue for Footer component
# Usage: powershell -ExecutionPolicy Bypass -File scripts/fix-footer-case.ps1

Write-Host "Normalizing git core.ignorecase to false..." -ForegroundColor Cyan
git config core.ignorecase false

if (Test-Path components\footer.tsx) {
  Write-Host "Found lowercase components/footer.tsx; performing forced rename sequence" -ForegroundColor Yellow
  git mv -f components\footer.tsx components\_Footer_tmp.tsx
  git mv -f components\_Footer_tmp.tsx components\Footer.tsx
  Write-Host "Rename complete." -ForegroundColor Green
} else {
  Write-Host "No lowercase footer.tsx detected; nothing to rename." -ForegroundColor Green
}
