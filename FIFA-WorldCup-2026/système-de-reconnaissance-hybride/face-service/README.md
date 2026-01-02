# Face Recognition Service

## 📋 Description

Microservice Python d' intelligence artificielle pour la reconnaissance faciale biométrique.

Utilise :
- **FastAPI** pour l'API REST
- **TensorFlow/Keras** pour le modèle de deep learning
- **OpenCV** pour la détection et traitement d'images
- **FaceNet** pour la génération d'embeddings faciaux

## 🏗️ Architecture

```
face-service/
├── app/
│   ├── main.py              → Point d'entrée FastAPI
│   ├── config.py            → Configuration
│   ├── routers/             → Endpoints API
│   │   ├── health_router.py
│   │   └── face_router.py
│   ├── services/            → Logique métier
│   │   ├── face_detection_service.py
│   │   ├── embedding_service.py
│   │   └── storage_service.py
│   ├── models/              → Modèles de données
│   │   ├── schemas.py       → Pydantic models
│   │   └── database.py      → SQLAlchemy models
│   └── ml/                  → Modèles ML
│       ├── facenet_model.py
│       └── model_loader.py
└── tests/
```

## 🚀 Installation

### Prérequis
- Python 3.11+
- pip

### Setup

```bash
cd face-service

# Créer environnement virtuel
python -m venv venv

# Activer l'environnement
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Installer dépendances
pip install -r requirements.txt
```

## 🏃 Démarrage

```bash
# Mode développement avec rechargement auto
uvicorn app.main:app --reload --port 8001

# Mode production
uvicorn app.main:app --host 0.0.0.0 --port 8001
```

Le service démarre sur `http://localhost:8001`

Documentation interactive : `http://localhost:8001/docs`

## 📡 API Endpoints

### Health Check

**GET** `/health`

Vérifie que le service est opérationnel.

```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Enroll Face

**POST** `/api/face/enroll`

Enregistre l'empreinte faciale d'un utilisateur.

**Request:**
```json
{
  "user_id": 123,
  "image": "base64_encoded_image"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Face enrolled successfully",
  "embedding_id": "abc123"
}
```

### Verify Face

**POST** `/api/face/verify`

Compare une image avec l'empreinte enregistrée.

**Request:**
```json
{
  "user_id": 123,
  "image": "base64_encoded_image"
}
```

**Response:**
```json
{
  "match": true,
  "confidence": 0.95,
  "threshold": 0.75
}
```

## 🧠 Modèle d'IA

### FaceNet

Utilise un modèle pré-entraîné FaceNet pour générer des embeddings de 128 dimensions.

**Pipeline:**
1. **Détection** : Détection du visage avec Haar Cascade ou MTCNN
2. **Alignement** : Normalisation de la position du visage
3. **Embedding** : Passage dans le réseau FaceNet
4. **Comparaison** : Distance euclidienne entre embeddings

**Seuil de décision** : 0.75 (configurable)

## 🗄️ Stockage

Les embeddings sont stockés dans une base SQLite en développement.

Pour la production, configurer PostgreSQL dans `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/facedb
```

## 🧪 Tests

```bash
pytest
```

## 🔧 Configuration

Créer un fichier `.env` :

```env
# Modèle
MODEL_PATH=models/facenet_keras.h5
EMBEDDING_SIZE=128
MATCH_THRESHOLD=0.75

# Database
DATABASE_URL=sqlite:///./face_embeddings.db

# Server
HOST=0.0.0.0
PORT=8001
DEBUG=False
```

## 📦 Dépendances principales

- `fastapi` - Framework web
- `uvicorn` - Serveur ASGI
- `tensorflow` - Deep learning
- `opencv-python` - Traitement d'images
- `numpy` - Calculs numériques
- `pillow` - Manipulation d'images
- `sqlalchemy` - ORM
- `pydantic` - Validation de données

## 📝 TODO

- [ ] Implémenter le service de détection faciale
- [ ] Intégrer le modèle FaceNet
- [ ] Créer le système de stockage des embeddings
- [ ] Ajouter tests unitaires
- [ ] Optimiser les performances (caching, batch processing)
- [ ] Ajouter métriques de surveillance
