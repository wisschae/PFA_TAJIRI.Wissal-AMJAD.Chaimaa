"""
Script pour vérifier et créer l'utilisateur test
"""
import psycopg2
from psycopg2 import sql

# Connexion à la base de données
try:
    conn = psycopg2.connect(
        dbname="hybrid_access_db",
        user="postgres",
        password="postgres",  # Ajuster si différent
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    print("✅ Connecté à la base de données")
    print()
    
    # Vérifier si test@test.com existe
    cursor.execute("SELECT email, full_name, active FROM users WHERE email = %s", ('test@test.com',))
    user = cursor.fetchone()
    
    if user:
        print(f"✅ Utilisateur trouvé : {user}")
        print(f"   Email: {user[0]}")
        print(f"   Nom: {user[1]}")
        print(f"   Actif: {user[2]}")
    else:
        print("❌ Utilisateur test@test.com NON TROUVÉ !")
        print()
        print("📝 Liste des utilisateurs existants :")
        cursor.execute("SELECT email, full_name FROM users LIMIT 10")
        users = cursor.fetchall()
        for u in users:
            print(f"   - {u[0]} ({u[1]})")
        
        if not users:
            print("   ⚠️ Aucun utilisateur dans la base !")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Erreur de connexion : {e}")
    print()
    print("💡 Solutions possibles :")
    print("   1. PostgreSQL n'est pas démarré")
    print("   2. Mot de passe PostgreSQL incorrect")
    print("   3. Base de données 'hybrid_access_db' n'existe pas")
