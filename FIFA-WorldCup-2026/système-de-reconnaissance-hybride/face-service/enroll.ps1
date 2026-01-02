# Script PowerShell pour enregistrer le visage
# Usage: .\enroll.ps1

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "ENREGISTREMENT DE VISAGE" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# Lire le base64
Write-Host ""
Write-Host "Lecture de base64.txt..." -ForegroundColor Yellow
$base64Content = Get-Content -Path "base64.txt" -Raw
$base64Length = $base64Content.Length
Write-Host "Base64 charge ($base64Length caracteres)" -ForegroundColor Green

# Créer le JSON
Write-Host ""
Write-Host "Creation du JSON..." -ForegroundColor Yellow
$body = @{
    userId      = "test@test.com"
    imageBase64 = $base64Content
}
$jsonBody = $body | ConvertTo-Json -Depth 10

# Envoyer la requête
Write-Host ""
Write-Host "Envoi au face-service..." -ForegroundColor Yellow
Write-Host "URL: http://localhost:8001/api/face/enroll" -ForegroundColor Gray
Write-Host "User: test@test.com" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8001/api/face/enroll" -Method Post -Body $jsonBody -ContentType "application/json" -TimeoutSec 30
    
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "SUCCES !" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    if ($response.success -eq $true) {
        Write-Host ""
        Write-Host "Votre visage est enregistre !" -ForegroundColor Green
        Write-Host "Prochaine etape: Testez le MFA dans l'application web" -ForegroundColor Cyan
    }
}
catch {
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "ERREUR" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
