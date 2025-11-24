# Merkle AI Platform - PowerShell Launch Script
# Run this with: .\start.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Merkle AI Platform - Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "[INFO] Checking for Node.js..." -ForegroundColor Yellow
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue

if (-not $nodeCheck) {
    Write-Host "[ERROR] Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Download the LTS version and restart your terminal" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[SUCCESS] Node.js found!" -ForegroundColor Green
Write-Host "Version: $(node --version)" -ForegroundColor Gray
Write-Host "npm version: $(npm --version)" -ForegroundColor Gray
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installing dependencies..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes on first run..." -ForegroundColor Gray
    Write-Host ""

    npm install

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "[ERROR] Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }

    Write-Host ""
    Write-Host "[SUCCESS] Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "[INFO] Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "The application will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Chrome will open automatically when ready" -ForegroundColor Cyan
Write-Host ""
Write-Host "Login Credentials:" -ForegroundColor White
Write-Host "  Email: pm@merkle.com" -ForegroundColor Gray
Write-Host "  Password: demo123" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the dev server
npm run dev
