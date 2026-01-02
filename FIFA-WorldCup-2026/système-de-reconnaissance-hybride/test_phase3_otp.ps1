# Test Script: Phase 3 - OTP Full Flow
# Tests OTP setup, login with MFA, verification, and disable

Write-Host "====================" -ForegroundColor Cyan
Write-Host "PHASE 3: OTP TESTING" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

$email = "chaimaa.ops@wc2026.com"
$password = "Wc2026@Demo!"
$baseUrl = "http://localhost:8080/api/v1"

# Test 1: Initial Login (before OTP setup) - Should NOT require MFA yet
Write-Host "Test 1: Login before OTP setup..." -ForegroundColor Yellow
$loginBody = @{
    email    = $email
    password = $password
} | ConvertTo-Json

try {
    $initialLogin = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    
    if ($initialLogin.mfaRequired) {
        Write-Host "  ⚠️  MFA already required (OTP might be enabled)" -ForegroundColor Yellow
        Write-Host "  Skipping setup test..." -ForegroundColor Yellow
        $token = $null
    }
    else {
        Write-Host "  ✓ Login successful without MFA" -ForegroundColor Green
        $token = $initialLogin.token
        Write-Host "  Token obtained for OTP setup" -ForegroundColor Green
    }
}
catch {
    Write-Host "  ✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: OTP Setup (if we have token)
if ($token) {
    Write-Host "Test 2: OTP Setup..." -ForegroundColor Yellow
    $headers = @{
        "Authorization" = "Bearer $token"
    }

    try {
        $setup = Invoke-RestMethod -Uri "$baseUrl/auth/otp/setup" -Method POST -Headers $headers
        
        Write-Host "  ✓ OTP Setup successful" -ForegroundColor Green
        Write-Host "  Secret: $($setup.secret)" -ForegroundColor Cyan
        Write-Host "  QR URI: $($setup.qrCodeUri.Substring(0, 50))..." -ForegroundColor Cyan
        
        $secret = $setup.secret
    }
    catch {
        Write-Host "  ✗ Setup failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "Test 2: Skipped (no token)" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Verify OTP Setup
if ($token -and $secret) {
    Write-Host "Test 3: Verify OTP Setup..." -ForegroundColor Yellow
    Write-Host "  Please enter 6-digit code from Google Authenticator:" -ForegroundColor Cyan
    $code = Read-Host "  OTP Code"
    
    $verifyBody = @{
        secret = $secret
        code   = $code
    } | ConvertTo-Json

    try {
        $verifyResp = Invoke-RestMethod -Uri "$baseUrl/auth/otp/verify-setup" -Method POST -Body $verifyBody -Headers $headers -ContentType "application/json"
        
        if ($verifyResp.success) {
            Write-Host "  ✓ OTP Enabled successfully!" -ForegroundColor Green
            Write-Host "  OTP is now active for $email" -ForegroundColor Green
        }
        else {
            Write-Host "  ✗ Verification failed: $($verifyResp.message)" -ForegroundColor Red
            exit 1
        }
    }
    catch {
        Write-Host "  ✗ Verify-setup failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "Test 3: Skipped" -ForegroundColor Yellow
}

Write-Host ""

# Test 4: Login with OTP Required
Write-Host "Test 4: Login with OTP (MFA required)..." -ForegroundColor Yellow

try {
    $loginWithMfa = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    
    if ($loginWithMfa.mfaRequired) {
        Write-Host "  ✓ MFA Required (as expected)" -ForegroundColor Green
        Write-Host "  MFA Session ID: $($loginWithMfa.mfaSessionId)" -ForegroundColor Cyan
        Write-Host "  Required Factors: $($loginWithMfa.requiredFactors -join ', ')" -ForegroundColor Cyan
        
        $mfaSessionId = $loginWithMfa.mfaSessionId
    }
    else {
        Write-Host "  ✗ MFA not required (OTP might not be enabled)" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "  ✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 5: MFA Verification
Write-Host "Test 5: MFA Verification with OTP..." -ForegroundColor Yellow
Write-Host "  Please enter current OTP code:" -ForegroundColor Cyan
$otpCode2 = Read-Host "  OTP Code"

$mfaBody = @{
    mfaSessionId = $mfaSessionId
    factorType   = "OTP"
    otpCode      = $otpCode2
} | ConvertTo-Json

try {
    $mfaResp = Invoke-RestMethod -Uri "$baseUrl/auth/mfa/verify" -Method POST -Body $mfaBody -ContentType "application/json"
    
    if ($mfaResp.mfaCompleted) {
        Write-Host "  ✓ MFA Completed!" -ForegroundColor Green
        Write-Host "  Verified Factors: $($mfaResp.verifiedFactors -join ', ')" -ForegroundColor Cyan
        Write-Host "  Token received: $($mfaResp.token.Substring(0, 30))..." -ForegroundColor Green
        
        $finalToken = $mfaResp.token
    }
    else {
        Write-Host "  ✗ MFA not completed: $($mfaResp.message)" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "  ✗ MFA verification failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Error details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 6: OTP Disable
Write-Host "Test 6: Disable OTP..." -ForegroundColor Yellow
$disableHeaders = @{
    "Authorization" = "Bearer $finalToken"
}

try {
    $disableResp = Invoke-RestMethod -Uri "$baseUrl/auth/otp/disable" -Method POST -Headers $disableHeaders
    
    if ($disableResp.success) {
        Write-Host "  ✓ OTP Disabled successfully!" -ForegroundColor Green
        Write-Host "  Message: $($disableResp.message)" -ForegroundColor Cyan
    }
    else {
        Write-Host "  ✗ Disable failed: $($disableResp.message)" -ForegroundColor Red
    }
}
catch {
    Write-Host "  ✗ Disable request failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}

Write-Host ""
Write-Host "====================" -ForegroundColor Cyan
Write-Host "ALL TESTS COMPLETED" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
