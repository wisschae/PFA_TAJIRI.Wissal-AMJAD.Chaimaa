$email = "chaimaa.ops@wc2026.com"
$password = "Wc2026@Demo!"
$baseUrl = "http://localhost:8080/api/v1"

Write-Host "Testing OTP Flow for $email" -ForegroundColor Cyan
Write-Host ""

# Step 1: Login
Write-Host "Step 1: Initial Login..." -ForegroundColor Yellow
$loginBody = @{
    email    = $email
    password = $password
} | ConvertTo-Json

try {
    $login = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    
    Write-Host "Login Response:" -ForegroundColor Cyan
    $login | ConvertTo-Json -Depth 5
    Write-Host ""
    
    if ($login.mfaRequired) {
        Write-Host "MFA is already required - OTP might be enabled" -ForegroundColor Yellow
        Write-Host "SessionID: $($login.mfaSessionId)" -ForegroundColor Cyan
        Write-Host "Required Factors: $($login.requiredFactors)" -ForegroundColor Cyan        
    }
    else {
        Write-Host "✓ Got token - MFA not required yet" -ForegroundColor Green
        $global:token = $login.token
    }
    
}
catch {
    Write-Host "✗ Login failed" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
