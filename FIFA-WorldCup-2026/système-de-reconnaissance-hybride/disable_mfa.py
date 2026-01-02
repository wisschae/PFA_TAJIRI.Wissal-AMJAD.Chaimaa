import psycopg2

# Connexion à PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    database="hybrid_access_db",
    user="hybrid_user",
    password="hybrid_pass"
)

cursor = conn.cursor()

# Désactiver MFA pour test@test.com
cursor.execute("""
    UPDATE users 
    SET otp_enabled = false, 
        otp_secret = NULL
    WHERE email = 'test@test.com'
    RETURNING email, full_name, otp_enabled;
""")

result = cursor.fetchone()
conn.commit()

if result:
    print(f"✅ MFA DÉSACTIVÉ pour {result[0]} ({result[1]})")
    print(f"   otp_enabled: {result[2]}")
else:
    print("❌ Utilisateur test@test.com non trouvé")

cursor.close()
conn.close()

print("\n🎯 Vous pouvez maintenant vous connecter SANS MFA!")
print("   Email: test@test.com")
print("   Password: password123")
print("   → Devrait aller directement au Dashboard")
