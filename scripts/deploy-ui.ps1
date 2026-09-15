$ErrorActionPreference = "Stop"

# =========================
# HURECOM UI DEV DEPLOYMENT
# =========================

$stagePath = "C:\Apps\hurecom-ui-dev"
$zipPath = Join-Path $stagePath "hurecom-ui-dev.zip"

$deployPath = "C:\nginx-1.29.8\html\hurecom-dev"

$backupRoot = Join-Path $stagePath "backup"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = Join-Path $backupRoot "hurecom-ui-$timestamp"

$tempExtractPath = Join-Path $stagePath "extract"

Write-Host "========================================"
Write-Host "HURECOM UI DEV DEPLOYMENT"
Write-Host "========================================"

# -------------------------
# Check ZIP
# -------------------------

Write-Host "Checking deployment ZIP..."

if (-not (Test-Path $zipPath)) {
    Write-Error "Deployment ZIP not found: $zipPath"
    exit 1
}

Write-Host "Deployment ZIP found."

# -------------------------
# Prepare directories
# -------------------------

if (-not (Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
}

if (Test-Path $tempExtractPath) {
    Remove-Item $tempExtractPath -Recurse -Force
}

New-Item -ItemType Directory -Path $tempExtractPath -Force | Out-Null

if (-not (Test-Path $deployPath)) {
    New-Item -ItemType Directory -Path $deployPath -Force | Out-Null
}

# -------------------------
# Extract new UI
# -------------------------

Write-Host "Extracting new UI..."

Expand-Archive `
    -Path $zipPath `
    -DestinationPath $tempExtractPath `
    -Force

$stagedIndex = Join-Path $tempExtractPath "index.html"

if (-not (Test-Path $stagedIndex)) {
    Write-Error "index.html not found in deployment ZIP."
    exit 1
}

Write-Host "New UI build verified."

# -------------------------
# Backup current UI
# -------------------------

Write-Host "Backing up current DEV UI..."

$currentFiles = Get-ChildItem $deployPath -Force

if ($currentFiles.Count -gt 0) {

    New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

    Copy-Item `
        -Path "$deployPath\*" `
        -Destination $backupPath `
        -Recurse `
        -Force

    Write-Host "Backup created:"
    Write-Host $backupPath
}
else {
    Write-Host "Current DEV UI is empty. No backup required."
}

# -------------------------
# Deploy new UI
# -------------------------

Write-Host "Deploying new UI..."

Get-ChildItem $deployPath -Force |
    Remove-Item -Recurse -Force

Copy-Item `
    -Path "$tempExtractPath\*" `
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

    Write-Host "index.html:"
    Write-Host $deployedIndex

    # Cleanup temporary files
    Remove-Item $tempExtractPath -Recurse -Force

    exit 0
}

# -------------------------
# Rollback
# -------------------------

Write-Host "========================================"
Write-Host "DEPLOYMENT FAILED"
Write-Host "STARTING ROLLBACK"
Write-Host "========================================"

Get-ChildItem $deployPath -Force |
    Remove-Item -Recurse -Force

if (Test-Path $backupPath) {

    Copy-Item `
        -Path "$backupPath\*" `
        -Destination $deployPath `
        -Recurse `
        -Force

    Write-Host "Previous DEV UI restored."
}
else {
    Write-Host "No previous DEV UI backup available."
}

$rollbackIndex = Join-Path $deployPath "index.html"

if (Test-Path $rollbackIndex) {

    Write-Host "Rollback verification successful."
}
else {

    Write-Error "Rollback verification failed."
}

if (Test-Path $tempExtractPath) {
    Remove-Item $tempExtractPath -Recurse -Force
}

exit 1