"""
Script pour encoder une image en base64
Usage: python encode_face.py
"""
import base64
import os

# Chemin de l'image (à adapter)
IMAGE_PATH = r"C:\Users\PC\Desktop\face.jpg"

# Alternative : chercher dans plusieurs emplacements
POSSIBLE_PATHS = [
    r"C:\Users\PC\Desktop\face.jpg",
    r"C:\Users\PC\OneDrive\Desktop\Chaimaa\face.jpg",
    r"C:\Users\PC\OneDrive\Desktop\face.jpg",
    r"C:\Users\PC\Pictures\face.jpg",
]

def find_image():
    """Trouve l'image dans les emplacements possibles"""
    for path in POSSIBLE_PATHS:
        if os.path.exists(path):
            return path
    
    # Si aucun trouvé, demander à l'utilisateur
    custom_path = input("\n📁 Chemin complet de votre image (ex: C:\\Users\\PC\\Desktop\\face.jpg) : ").strip()
    if os.path.exists(custom_path):
        return custom_path
    
    return None

def encode_image(image_path):
    """Encode l'image en base64"""
    try:
        with open(image_path, "rb") as f:
            raw = f.read()
        
        b64 = base64.b64encode(raw).decode("utf-8")
        return "data:image/jpeg;base64," + b64
    except Exception as e:
        print(f"❌ Erreur lors de la lecture : {e}")
        return None

if __name__ == "__main__":
    print("=" * 60)
    print("📸 ENCODAGE D'IMAGE EN BASE64")
    print("=" * 60)
    
    # Trouver l'image
    image_path = find_image()
    
    if not image_path:
        print("\n❌ Image introuvable !")
        print("\n📝 Instructions :")
        print("   1. Prenez une photo avec l'application Caméra Windows")
        print("   2. Sauvegardez-la sur le Bureau comme 'face.jpg'")
        print("   3. Relancez ce script")
        exit(1)
    
    print(f"\n✅ Image trouvée : {image_path}")
    
    # Encoder
    print("\n🔄 Encodage en base64...")
    base64_string = encode_image(image_path)
    
    if not base64_string:
        exit(1)
    
    print(f"✅ Encodage réussi ! ({len(base64_string)} caractères)")
    
    # Sauvegarder dans un fichier
    output_file = "base64.txt"
    with open(output_file, "w") as f:
        f.write(base64_string)
    
    print(f"\n📄 Sauvegardé dans : {output_file}")
    print("\n" + "=" * 60)
    print("🎉 TERMINÉ !")
    print("=" * 60)
    print("\n📋 Prochaine étape :")
    print("   1. Ouvrez Postman")
    print("   2. POST http://localhost:8001/api/face/enroll")
    print("   3. Body (JSON) :")
    print('      {')
    print('        "userId": "test@test.com",')
    print(f'        "imageBase64": "COPIEZ_LE_CONTENU_DE_{output_file}"')
    print('      }')
    print("\n💡 Astuce : Ouvrez base64.txt et copiez TOUT le contenu")
