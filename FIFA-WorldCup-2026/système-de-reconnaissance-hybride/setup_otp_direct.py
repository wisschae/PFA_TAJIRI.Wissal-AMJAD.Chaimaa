"""
Direct OTP Setup - Bypasses Web Interface Issues
This script directly inserts OTP secret into the database
"""
import psycopg2

# Standard TOTP secret for testing (works with Google Authenticator)
OTP_SECRET = "JBSWY3DPEHPK3PXP"

try:
    conn = psycopg2.connect(
        dbname="hybrid_access_db",
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    print("=" * 60)
    print("  DIRECT OTP SETUP FOR test@test.com")
    print("=" * 60)
    print()
    
    # Update user with OTP secret
    cursor.execute("""
        UPDATE users 
        SET otp_secret = %s, otp_enabled = true
        WHERE email = 'test@test.com'
    """, (OTP_SECRET,))
    
    conn.commit()
    
    # Verify
    cursor.execute("""
        SELECT email, otp_enabled, otp_secret, full_name
        FROM users 
        WHERE email = 'test@test.com'
    """)
    
    result = cursor.fetchone()
    
    if result:
        email, otp_enabled, otp_secret, full_name = result
        print(f"✅ OTP CONFIGURED SUCCESSFULLY!")
        print()
        print(f"User: {full_name} ({email})")
        print(f"OTP Enabled: {otp_enabled}")
        print(f"OTP Secret: {otp_secret}")
        print()
        print("=" * 60)
        print("  NEXT STEPS:")
        print("=" * 60)
        print()
        print("1. Open Google Authenticator app on your phone")
        print("2. Tap '+' to add new account")
        print("3. Select 'Enter a setup key'")
        print("4. Enter:")
        print(f"   Account name: World Cup 2026 - {email}")
        print(f"   Your key: {OTP_SECRET}")
        print("   Type of key: Time based")
        print()
        print("5. The app will now show a 6-digit code")
        print("6. Logout from the website")
        print("7. Login with test@test.com / password123")
        print("8. Enter the 6-digit code from the app")
        print("9. ✅ You're in!")
        print()
        print("=" * 60)
        
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
