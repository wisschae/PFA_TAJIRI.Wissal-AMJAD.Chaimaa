"""
Script pour nettoyer les embeddings de test@test.com
"""
import sqlite3
import os

# Chemin de la base SQLite
DB_PATH = "face_embeddings.db"

def clean_test_user():
    if not os.path.exists(DB_PATH):
        print(f"❌ Base de données {DB_PATH} introuvable")
        print("Le face-service utilise peut-être PostgreSQL ou un autre chemin")
        return
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Vérifier combien d'embeddings existent
    cursor.execute("SELECT COUNT(*) FROM face_embeddings WHERE user_id = ?", ("test@test.com",))
    count = cursor.fetchone()[0]
    
    if count == 0:
        print("✅ Aucun embedding trouvé pour test@test.com")
    else:
        print(f"🗑️  {count} embedding(s) trouvé(s) pour test@test.com")
        
        # Supprimer
        cursor.execute("DELETE FROM face_embeddings WHERE user_id = ?", ("test@test.com",))
        conn.commit()
        
        print(f"✅ {cursor.rowcount} embedding(s) supprimé(s)")
    
    conn.close()
    print("\n✨ Base nettoyée ! Vous pouvez maintenant tester l'auto-enrollment.")

if __name__ == "__main__":
    print("=" * 60)
    print("🧹 NETTOYAGE EMBEDDINGS TEST USER")
    print("=" * 60)
    print()
    clean_test_user()
