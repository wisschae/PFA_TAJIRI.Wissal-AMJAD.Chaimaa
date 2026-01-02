"""
Script pour élever le niveau d'accès de test@test.com à TOP_SECRET
Permet de tester toutes les ressources protégées
"""
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="hybrid_access_db",
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    print("✅ Connecté à PostgreSQL")
    print()
    
    # Vérifier le niveau actuel
    print("📊 NIVEAU ACTUEL:")
    cursor.execute("""
        SELECT u.email, u.full_name, al.name as access_level, al.priority_level, u.otp_enabled
        FROM users u
        JOIN access_levels al ON u.access_level_id = al.id
        WHERE u.email = 'test@test.com'
    """)
    current = cursor.fetchone()
    
    if current:
        print(f"   Email: {current[0]}")
        print(f"   Nom: {current[1]}")
        print(f"   Niveau: {current[2]} (Priority: {current[3]})")
        print(f"   OTP: {'✅ Activé' if current[4] else '❌ Désactivé'}")
        print()
    
    # Mettre à jour vers TOP_SECRET
    print("🔧 MISE À JOUR vers TOP_SECRET...")
    cursor.execute("""
        UPDATE users
        SET access_level_id = (SELECT id FROM access_levels WHERE priority_level = 4)
        WHERE email = 'test@test.com'
    """)
    conn.commit()
    
    # Vérifier après mise à jour
    print()
    print("✅ NOUVEAU NIVEAU:")
    cursor.execute("""
        SELECT u.email, u.full_name, al.name as access_level, al.priority_level, u.otp_enabled
        FROM users u
        JOIN access_levels al ON u.access_level_id = al.id
        WHERE u.email = 'test@test.com'
    """)
    updated = cursor.fetchone()
    
    if updated:
        print(f"   Email: {updated[0]}")
        print(f"   Nom: {updated[1]}")
        print(f"   Niveau: {updated[2]} (Priority: {updated[3]}) 🎉")
        print(f"   OTP: {'✅ Activé' if updated[4] else '❌ Désactivé'}")
        print()
        print("🎯 Vous avez maintenant accès à TOUTES les ressources!")
        print("   - Fan Zone (PUBLIC)")
        print("   - Ticketing (PUBLIC)")
        print("   - Operations (CONFIDENTIEL)")
        print("   - Monitoring (CONFIDENTIEL)")
        print("   - Clients DB (SECRET)")
        print("   - Encryption Keys (SECRET)")
        print("   - Source Code (TOP_SECRET)")
        print("   - Confidential Docs (TOP_SECRET)")
        print()
        print("⚠️  IMPORTANT: Reconnectez-vous pour que le nouveau niveau soit pris en compte!")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Erreur: {e}")
