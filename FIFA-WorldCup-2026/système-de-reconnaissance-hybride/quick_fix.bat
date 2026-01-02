@echo off
echo ============================================
echo   QUICK FIX - DISABLE OTP + SET TOP SECRET
echo ============================================
echo.

REM Disable OTP
curl -X POST "http://localhost:8080/api/v1/dev/mfa/disable?email=test@test.com"

echo.
echo.

REM Set TOP_SECRET access
curl -X POST "http://localhost:8080/api/v1/dev/mfa/upgrade-access?email=test@test.com&priorityLevel=4"

echo.
echo.
echo ============================================
echo   DONE! Now:
echo   1. Logout
echo   2. Login: test@test.com / password123
echo   3. Go DIRECTLY to dashboard (NO MFA)
echo   4. ALL resources accessible!
echo ============================================
pause
