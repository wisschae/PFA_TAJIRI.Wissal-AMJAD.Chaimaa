@echo off
echo ========================================
echo   BYPASS MFA - DISABLE OTP FOR TEST USER
echo ========================================
echo.

curl -X POST "http://localhost:8080/api/v1/dev/mfa/disable?email=test@test.com"

echo.
echo.
echo ========================================
echo   DONE! Now you can:
echo   1. Login: test@test.com / password123
echo   2. Go directly to Dashboard (NO MFA!)
echo   3. Navigate to /settings/otp
echo   4. Setup Google Authenticator
echo   5. Test all resources!
echo ========================================
pause
