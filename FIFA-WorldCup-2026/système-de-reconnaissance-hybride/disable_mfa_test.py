"""
Script pour désactiver le MFA pour test@test.com
"""
import psycopg2

# Connexion à la base de données
try:
    conn = psycopg2.connect(
        dbname="hybrid_access_db",
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    print("✅ Connecté à la base de données")
    print()
    
    # Désactiver MFA pour test@test.com
    cursor.execute("""
        UPDATE users 
        SET otp_enabled = false, 
            otp_secret = NULL
        WHERE email = 'test@test.com'
        RETURNING email, full_name, otp_enabled;
    """)
    
    user = cursor.fetchone()
    conn.commit()
    
    if user:
        print(f"✅ MFA DÉSACTIVÉ pour : {user[0]}")
        print(f"   Nom: {user[1]}")
        print(f"   otp_enabled: {user[2]}")
        print()
        print("🎯 Vous pouvez maintenant vous connecter SANS MFA !")
        print()
        print("📝 Credentials:")
        print("   Email: test@test.com")
        print("   Password: password123")
        print()
        print("✨ Après login, vous devriez aller DIRECTEMENT au Dashboard")
        print("   (Pas de page MFA)")
    else:
        print("❌ Utilisateur test@test.com NON TROUVÉ !")
        print()
        print("📝 Liste des utilisateurs existants :")
        cursor.execute("SELECT email, full_name FROM users LIMIT 10")
        users = cursor.fetchall()
        for u in users:
            print(f"   - {u[0]} ({u[1]})")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Erreur : {e}")
    print()
    print("💡 Solutions possibles :")
    print("   1. PostgreSQL n'est pas démarré")
    print("   2. Mot de passe PostgreSQL incorrect")
    print("   3. Base de données 'hybrid_access_db' n'existe pas")
