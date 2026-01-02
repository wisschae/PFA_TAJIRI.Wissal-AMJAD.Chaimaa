"""
Script Python pour enregistrer le visage directement
(évite les problèmes de timeout Postman avec grandes requêtes)
"""
import requests
import json

# Lire le base64
print("📖 Lecture de base64.txt...")
with open("base64.txt", "r") as f:
    image_base64 = f.read().strip()

print(f"✅ Base64 chargé ({len(image_base64)} caractères)")

# Préparer la requête
url = "http://localhost:8001/api/face/enroll"
payload = {
    "userId": "test@test.com",
    "imageBase64": image_base64
}

print(f"\n📤 Envoi au face-service...")
print(f"   URL: {url}")
print(f"   User: test@test.com")

try:
    # Envoyer avec timeout plus long
    response = requests.post(url, json=payload, timeout=30)
    
    print(f"\n📡 Réponse reçue: HTTP {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print("\n" + "="*60)
        print("🎉 SUCCÈS !")
        print("="*60)
        print(json.dumps(data, indent=2))
        
        if data.get("success"):
            print("\n✅ Votre visage est enregistré !")
            print("📋 Prochaine étape: Testez le MFA dans l'application web")
        else:
            print(f"\n❌ Échec: {data.get('message')}")
    else:
        print(f"\n❌ Erreur HTTP {response.status_code}")
        print(response.text)

except requests.exceptions.Timeout:
    print("\n❌ Timeout après 30 secondes")
    print("Le face-service prend trop de temps à répondre")
except requests.exceptions.ConnectionError:
    print("\n❌ Impossible de se connecter au face-service")
    print("Vérifiez que uvicorn tourne sur port 8001")
except Exception as e:
    print(f"\n❌ Erreur: {e}")
