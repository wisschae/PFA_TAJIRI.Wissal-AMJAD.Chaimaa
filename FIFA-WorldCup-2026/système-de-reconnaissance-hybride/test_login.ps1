$uri = "http://localhost:8080/api/v1/auth/login"
$body = @{
    email    = "chaimaa.fan@wc2026.com"
    password = "Wc2026@Demo!"
} | ConvertTo-Json

Write-Host "Testing login for: chaimaa.fan@wc2026.com"
Write-Host "Password: Wc2026@Demo!"
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $uri -Method POST -Body $body -ContentType "application/json"
    Write-Host "✓ SUCCESS: Login successful" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10
    
    if ($response.token) {
        Write-Host ""
        Write-Host "JWT Token received:" -ForegroundColor Green
        Write-Host $response.token.Substring(0, [Math]::Min(50, $response.token.Length)) + "..."
    }
}
catch {
    Write-Host "✗ ERROR: Login failed" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Message:" $_.Exception.Message
    if ($_.ErrorDetails) {
        Write-Host "Details:" $_.ErrorDetails.Message
    }
}
