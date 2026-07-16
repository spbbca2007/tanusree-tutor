# start_tutor.ps1 — Sparky launcher
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir
Write-Host ""
Write-Host "  Sparky - Tanusree's Study Tutor" -ForegroundColor Cyan
Write-Host ""
$python = $null
if (Get-Command python -ErrorAction SilentlyContinue) { $python = "python" }
elseif (Get-Command python3 -ErrorAction SilentlyContinue) { $python = "python3" }
if (-not $python) { Write-Host "ERROR: Python not found. Install from python.org" -ForegroundColor Red; Read-Host "Press Enter to exit"; exit }
$flaskCheck = & $python -c "import flask" 2>&1
if ($LASTEXITCODE -ne 0) { Write-Host "Installing Flask (one-time)..." -ForegroundColor Yellow; & $python -m pip install flask flask-cors --quiet }
Write-Host "Starting database server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit","-Command","Set-Location '$scriptDir'; Write-Host 'Sparky Database Server' -ForegroundColor Cyan; python save_server.py"
Start-Sleep -Seconds 2
Write-Host "  Database: http://localhost:5000" -ForegroundColor Green
Write-Host "  App:      http://localhost:4173" -ForegroundColor Green
Write-Host ""
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (Test-Path $chrome) { Start-Sleep -Seconds 1; Start-Process $chrome "http://localhost:4173"; Write-Host "  Chrome opened automatically." -ForegroundColor Green }
else { Write-Host "  Open Chrome to: http://localhost:4173" -ForegroundColor Yellow }
Write-Host ""
& $python -m http.server 4173
