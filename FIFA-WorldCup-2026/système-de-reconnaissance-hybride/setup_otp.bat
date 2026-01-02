@echo off
echo ============================================
echo   DIRECT OTP SETUP - BYPASS WEB INTERFACE
echo ============================================
echo.
echo Setting OTP secret for test@test.com...
echo.

REM Use PowerShell to execute the SQL
powershell -Command "$env:PGPASSWORD='postgres'; & 'C:\Program Files\PostgreSQL\16\bin\psql.exe' -U postgres -d hybrid_access_db -c \"UPDATE users SET otp_secret='JBSWY3DPEHPK3PXP', otp_enabled=true WHERE email='test@test.com'; SELECT email, otp_enabled, otp_secret FROM users WHERE email='test@test.com';\""

echo.
echo ========================================== 
echo   OTP CONFIGURED!
echo ==========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Open Google Authenticator on your phone
echo 2. Tap + to add account
echo 3. Select "Enter a setup key"
echo 4. Enter:
echo    Account: World Cup - test@test.com
echo    Key: JBSWY3DPEHPK3PXP
echo    Type: Time based
echo.
echo 5. Logout from website
echo 6. Login: test@test.com / password123
echo 7. Enter 6-digit code from app
echo 8. Done!
echo.
pause
