$ErrorActionPreference = "Stop"

# =========================
# HURECOM UI DEV DEPLOYMENT
# =========================

$stagePath  = "C:\Apps\hurecom-ui-dev"
$deployPath = "C:\nginx-1.29.8\html\hurecom-dev"
$browserPath = Join-Path $stagePath "dist\hurecom-ui\browser"

$backupPath = "C:\Apps\hurecom-ui-dev\backup"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$currentBackup = Join-Path $backupPath "hurecom-ui-$timestamp"

Write-Host "========================================"
Write-Host "HURECOM UI DEV DEPLOYMENT"
Write-Host "========================================"

# -------------------------
# Check staging files
# -------------------------

Write-Host "Checking staging directory..."

if (-not (Test-Path $browserPath)) {
    Write-Error "Angular browser build not found: $browserPath"
    exit 1
}

$indexFile = Join-Path $browserPath "index.html"

if (-not (Test-Path $indexFile)) {
    Write-Error "index.html not found in staging directory."
    exit 1
}

Write-Host "Staging build found."

# -------------------------
# Create backup directory
# -------------------------

if (-not (Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
}

# -------------------------
# Backup current DEV UI
# -------------------------

Write-Host "Backing up current DEV UI..."

if (Test-Path $deployPath) {

    $existingFiles = Get-ChildItem $deployPath -Force

    if ($existingFiles.Count -gt 0) {

        New-Item -ItemType Directory -Path $currentBackup -Force | Out-Null

        Copy-Item `
            -Path "$deployPath\*" `
            -Destination $currentBackup `
            -Recurse `
            -Force

        Write-Host "Backup created: $currentBackup"
    }
    else {
        Write-Host "DEV UI directory is empty. No backup required."
    }

}
else {

    New-Item -ItemType Directory -Path $deployPath -Force | Out-Null

    Write-Host "DEV UI directory created."
}

# -------------------------
# Clear current DEV UI
# -------------------------

Write-Host "Clearing current DEV UI..."

Get-ChildItem $deployPath -Force |
    Remove-Item -Recurse -Force

# -------------------------
# Deploy new UI
# -------------------------

Write-Host "Deploying new Angular UI..."

Copy-Item `
    -Path "$browserPath\*" `
    -Destination $deployPath `
    -Recurse `
    -Force

# -------------------------
# Verify deployment
# -------------------------

Write-Host "Verifying deployment..."

$deployedIndex = Join-Path $deployPath "index.html"

if (Test-Path $deployedIndex) {

    Write-Host "========================================"
    Write-Host "DEV UI DEPLOYMENT SUCCESSFUL"
    Write-Host "========================================"

    Write-Host "index.html found:"
    Write-Host $deployedIndex

    exit 0
}

# -------------------------
# Rollback
# -------------------------

Write-Host "========================================"
Write-Host "DEPLOYMENT FAILED"
Write-Host "Starting rollback..."
Write-Host "========================================"

Get-ChildItem $deployPath -Force |
    Remove-Item -Recurse -Force

if (Test-Path $currentBackup) {

    Copy-Item `
        -Path "$currentBackup\*" `
        -Destination $deployPath `
        -Recurse `
        -Force

    Write-Host "Previous DEV UI restored."
}
else {

    Write-Host "No previous UI backup available."
}

if (Test-Path $deployedIndex) {

    Write-Host "Rollback verification successful."
    exit 1
}
else {

    Write-Error "Rollback verification failed."
    exit 1
}