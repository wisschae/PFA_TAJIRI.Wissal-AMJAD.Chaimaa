-- Direct OTP Setup for test@test.com
-- This bypasses the web interface issues

-- Generate a fixed secret for easy testing
-- Secret: JBSWY3DPEHPK3PXP (Base32 encoded)
-- This is a standard TOTP secret that works with Google Authenticator

UPDATE users 
SET 
    otp_secret = 'JBSWY3DPEHPK3PXP',
    otp_enabled = true
WHERE email = 'test@test.com';

-- Verify the update
SELECT email, otp_enabled, otp_secret, full_name
FROM users 
WHERE email = 'test@test.com';
