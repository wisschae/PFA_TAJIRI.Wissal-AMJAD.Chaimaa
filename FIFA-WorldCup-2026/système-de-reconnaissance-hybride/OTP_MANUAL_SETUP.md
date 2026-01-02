# IMMEDIATE FIX - Static OTP Setup

## Open your project in browser:
http://localhost:3000/otp-manual-setup

## You'll see:
- QR Code to scan
- Manual entry code: JBSWY3DPEHPK3PXP

## Steps:
1. Scan QR code with Google Authenticator
2. OR manually enter: JBSWY3DPEHPK3PXP
3. Done!

## Then enable in database:
Run this PowerShell command:
```powershell
$env:PGPASSWORD='postgres'; & 'C:\Program Files\PostgreSQL\16\bin\psql.exe' -U postgres -d hybrid_access_db -c "UPDATE users SET otp_secret='JBSWY3DPEHPK3PXP', otp_enabled=true WHERE email='test@test.com';"
```

## Test:
1. Logout
2. Login: test@test.com / password123
3. Enter code from app
4. Done!
