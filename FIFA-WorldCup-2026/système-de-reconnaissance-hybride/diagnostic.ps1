# Script de diagnostic rapide

Write-Host "=== DIAGNOSTIC RAPIDE ===" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier l'utilisateur connecté à partir du localStorage
Write-Host "1. Ouvrez la console du navigateur (F12)" -ForegroundColor Yellow
Write-Host "2. Tapez ces commandes:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   localStorage.getItem('token')" -ForegroundColor Green
Write-Host ""
Write-Host "3. Copiez le token et décodez-le sur jwt.io" -ForegroundColor Yellow
Write-Host ""
Write-Host "Ce que je dois voir dans le token:" -ForegroundColor Cyan
Write-Host "  - email: quel utilisateur?" -ForegroundColor White
Write-Host "  - priorityLevel: quel niveau (1-4)?" -ForegroundColor White
Write-Host "  - mfaCompleted: true ou false?" -ForegroundColor White
Write-Host ""
Write-Host "4. Quelle ressource essayez-vous d'accéder?" -ForegroundColor Yellow
Write-Host "   (Vérifiez l'URL ou le nom de la ressource)" -ForegroundColor White
Write-Host ""
Write-Host "Envoyez-moi ces informations pour que je puisse comprendre le problème!" -ForegroundColor Cyan
