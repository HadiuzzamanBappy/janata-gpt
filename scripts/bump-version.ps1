# Version Bump Script for Monorepo
# Usage: .\scripts\bump-version.ps1 <major|minor|patch>

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('major', 'minor', 'patch')]
    [string]$BumpType
)

# Read current version from root package.json
$rootPackagePath = "package.json"
if (-not (Test-Path $rootPackagePath)) {
    Write-Error "Could not find root package.json"
    exit 1
}

$rootJson = Get-Content $rootPackagePath -Raw | ConvertFrom-Json
$currentVersion = $rootJson.version

# Parse version
$versionParts = $currentVersion -split '\.'
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$patch = [int]$versionParts[2]

# Bump version based on type
switch ($BumpType) {
    'major' { $major++; $minor = 0; $patch = 0 }
    'minor' { $minor++; $patch = 0 }
    'patch' { $patch++ }
}

$newVersion = "$major.$minor.$patch"
Write-Host "Bumping monorepo version from $currentVersion to $newVersion" -ForegroundColor Cyan

# Find all package.json and manifest.json files in apps and packages
$targetFiles = @()
$globPaths = @("apps\*\package.json", "apps\*\manifest.json", "packages\*\package.json")
foreach ($glob in $globPaths) {
    $matched = Get-Item -Path $glob -ErrorAction SilentlyContinue
    if ($matched) {
        $targetFiles += $matched | Select-Object -ExpandProperty FullName
    }
}
$targetFiles += (Get-Item -Path $rootPackagePath).FullName

$updatedFiles = @()

foreach ($filePath in $targetFiles) {
    if (Test-Path $filePath) {
        try {
            $json = Get-Content $filePath -Raw | ConvertFrom-Json
            if ($null -ne $json.version) {
                $json.version = $newVersion
                $json | ConvertTo-Json -Depth 10 | Set-Content -Path $filePath
                $updatedFiles += $filePath
                Write-Host "  Updated: $filePath" -ForegroundColor Gray
            }
        } catch {
            Write-Warning "Failed to update ${filePath}: $_"
        }
    }
}

# Create git commit and tag
$tagName = "v$newVersion"
Write-Host "`nCreating git tag: $tagName" -ForegroundColor Yellow

git add $updatedFiles
git commit -m "chore: bump version to $newVersion"
git tag -a $tagName -m "Release $tagName"

Write-Host "`n✅ Version successfully bumped to $newVersion" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. git push origin main --tags" -ForegroundColor White
Write-Host "  2. npm run build" -ForegroundColor White
