"""
Script d'enregistrement de visage pour le système MFA
Utilisation : python enroll_face.py
"""
import cv2
import base64
import requests
import json

def capture_face():
    """Capture une image depuis la webcam"""
    print("📸 Ouverture de la webcam...")
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("❌ Erreur : Impossible d'ouvrir la webcam")
        return None
    
    print("✅ Webcam ouverte")
    print("👉 Appuyez sur ESPACE pour capturer")
    print("👉 Appuyez sur ESC pour annuler")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ Erreur de lecture webcam")
            break
        
        # Afficher le flux
        cv2.imshow('Enregistrement Visage - Appuyez sur ESPACE', frame)
        
        key = cv2.waitKey(1)
        if key == 27:  # ESC
            print("❌ Annulé")
            cap.release()
            cv2.destroyAllWindows()
            return None
        elif key == 32:  # ESPACE
            print("✅ Image capturée !")
            cap.release()
            cv2.destroyAllWindows()
            return frame
    
    cap.release()
    cv2.destroyAllWindows()
    return None

def image_to_base64(image):
    """Convertit une image OpenCV en base64"""
    _, buffer = cv2.imencode('.jpg', image)
    img_base64 = base64.b64encode(buffer).decode('utf-8')
    return f"data:image/jpeg;base64,{img_base64}"

def enroll_face(user_id, image_base64):
    """Enregistre le visage dans le face-service"""
    url = "http://localhost:8001/api/face/enroll"
    payload = {
        "userId": user_id,
        "imageBase64": image_base64
    }
    
    print(f"📤 Envoi au face-service pour {user_id}...")
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print(f"✅ Visage enregistré avec succès !")
                print(f"   ID Embedding : {data.get('embeddingId')}")
                print(f"   Message : {data.get('message')}")
                return True
            else:
                print(f"❌ Échec : {data.get('message')}")
                return False
        else:
            print(f"❌ Erreur HTTP {response.status_code}")
            print(f"   Réponse : {response.text}")
            return False
    
    except requests.exceptions.ConnectionError:
        print("❌ Erreur : Impossible de se connecter au face-service")
        print("   Assurez-vous que le face-service tourne sur http://localhost:8001")
        return False
    except Exception as e:
        print(f"❌ Erreur : {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🔐 ENREGISTREMENT DE VISAGE - Système MFA")
    print("=" * 60)
    
    # Demander l'email
    user_email = input("\n📧 Email de l'utilisateur (ex: test@test.com) : ").strip()
    
    if not user_email:
        print("❌ Email requis !")
        exit(1)
    
    # Capturer le visage
    image = capture_face()
    
    if image is None:
        print("\n❌ Aucune image capturée. Abandon.")
        exit(1)
    
    # Convertir en base64
    print("\n🔄 Conversion en base64...")
    image_base64 = image_to_base64(image)
    print(f"✅ Image convertie ({len(image_base64)} caractères)")
    
    # Enregistrer
    print()
    success = enroll_face(user_email, image_base64)
    
    if success:
        print("\n" + "=" * 60)
        print("🎉 SUCCÈS ! Votre visage est enregistré.")
        print("=" * 60)
        print("\n👉 Vous pouvez maintenant tester la vérification faciale dans l'application")
    else:
        print("\n" + "=" * 60)
        print("❌ ÉCHEC de l'enregistrement")
        print("=" * 60)
