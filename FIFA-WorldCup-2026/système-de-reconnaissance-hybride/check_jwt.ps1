# Test rapide: Vérifier le token JWT actuel

Write-Host "=== JWT TOKEN CHECK ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ouvrez la console du navigateur (F12) et exécutez:" -ForegroundColor Yellow
Write-Host ""
Write-Host "const token = localStorage.getItem('token');" -ForegroundColor Green
Write-Host "console.log('Token:', token);" -ForegroundColor Green  
Write-Host "const payload = JSON.parse(atob(token.split('.')[1]));" -ForegroundColor Green
Write-Host "console.log('Payload:', payload);" -ForegroundColor Green
Write-Host ""
Write-Host "Vérifiez dans le payload:" -ForegroundColor Cyan
Write-Host "  - sub (email): devrait être 'chaimaa.ops@wc2026.com'" -ForegroundColor White
Write-Host "  - priorityLevel: devrait être 3" -ForegroundColor White
Write-Host "  - levelName: devrait être 'SECRET'" -ForegroundColor White
Write-Host "  - mfaCompleted: devrait être true" -ForegroundColor White
Write-Host ""
Write-Host "Copiez-collez le résultat ici pour que je puisse voir!" -ForegroundColor Yellow
