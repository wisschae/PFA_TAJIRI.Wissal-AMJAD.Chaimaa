"""
Script pour réduire l'image et l'enregistrer
Réduit la taille pour éviter les timeouts
"""
from PIL import Image
import base64
import io
import requests
import json

# Lire l'image originale
print("=" * 60)
print("📸 COMPRESSION ET ENREGISTREMENT")
print("=" * 60)

image_path = r"C:\Users\PC\OneDrive\Desktop\Chaimaa\5IIR\projet PFA\face.jpg"

print(f"\n📖 Lecture de {image_path}...")
img = Image.open(image_path)
print(f"✅ Image chargée: {img.size[0]}x{img.size[1]} pixels")

# Réduire à une taille raisonnable (320x240)
print("\n🔄 Compression de l'image...")
img.thumbnail((320, 240), Image.Resampling.LANCZOS)
print(f"✅ Nouvelle taille: {img.size[0]}x{img.size[1]} pixels")

# Convertir en JPEG avec compression
print("\n💾 Conversion en JPEG...")
buffer = io.BytesIO()
img.save(buffer, format='JPEG', quality=85)
buffer.seek(0)
img_bytes = buffer.read()

print(f"✅ Taille fichier: {len(img_bytes)} bytes")

# Encoder en base64
print("\n🔐 Encodage base64...")
b64 = base64.b64encode(img_bytes).decode('utf-8')
image_base64 = f"data:image/jpeg;base64,{b64}"

print(f"✅ Base64: {len(image_base64)} caractères (au lieu de 171923 !)")

# Sauvegarder pour référence
with open("base64_compressed.txt", "w") as f:
    f.write(image_base64)
print(f"✅ Sauvegardé dans base64_compressed.txt")

# Envoyer au face-service
print("\n" + "=" * 60)
print("📤 ENVOI AU FACE-SERVICE")
print("=" * 60)

url = "http://localhost:8001/api/face/enroll"
payload = {
    "userId": "test@test.com",
    "imageBase64": image_base64
}

print(f"\n📡 POST {url}")
print(f"👤 User: test@test.com")
print(f"📦 Taille payload: ~{len(json.dumps(payload))} caractères")

try:
    print("\n⏳ Envoi en cours...")
    response = requests.post(url, json=payload, timeout=10)
    
    print(f"\n✅ Réponse reçue: HTTP {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print("\n" + "=" * 60)
        print("🎉 SUCCÈS !")
        print("=" * 60)
        print(json.dumps(data, indent=2))
        
        if data.get("success"):
            print("\n✅ Votre visage est enregistré !")
            print("📋 Testez maintenant le MFA dans l'application web")
            print("   1. http://localhost:3000")
            print("   2. Login: test@test.com / password123")
            print("   3. Page MFA → Capturez votre visage")
            print("   4. Validez → Accès accordé !")
        else:
            print(f"\n❌ Échec: {data.get('message')}")
    else:
        print(f"\n❌ Erreur HTTP {response.status_code}")
        print(response.text)

except requests.exceptions.Timeout:
    print("\n❌ Timeout après 10 secondes")
except requests.exceptions.ConnectionError:
    print("\n❌ Face-service non accessible")
    print("   Vérifiez qu'uvicorn tourne sur port 8001")
except Exception as e:
    print(f"\n❌ Erreur: {e}")
