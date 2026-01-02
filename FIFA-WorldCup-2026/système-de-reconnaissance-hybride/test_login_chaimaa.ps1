$uri = "http://localhost:8080/api/v1/auth/login"
$email = "chaimaa.fan@wc2026.com"
$password = "Wc2026@Demo!"

$body = @{
    email    = $email
    password = $password
} | ConvertTo-Json

Write-Host "Testing login for: $email"
Write-Host "Password: $password"
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $uri -Method POST -Body $body -ContentType "application/json"
    Write-Host "SUCCESS: Login successful" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10
}
catch {
    Write-Host "ERROR: Login failed" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Message: $($_.Exception.Message)"
    if ($_.ErrorDetails) {
        Write-Host "Details: $($_.ErrorDetails.Message)"
    }
}
