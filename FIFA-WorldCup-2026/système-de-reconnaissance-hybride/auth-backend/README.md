# Backend - Système de Reconnaissance Hybride

## 📋 Description

Backend Spring Boot gérant l'authentification multi-facteurs, le contrôle d'accès et la journalisation des événements.

## 🏗️ Architecture

### Packages

```
com.hybridaccess.auth_backend/
├── entity/           → Entités JPA (User, AccessLevel, Resource, AccessEvent)
├── repository/       → Repositories Spring Data JPA
├── dto/              → Data Transfer Objects (organisés par domaine)
├── service/          → Services métier
├── controller/       → Controllers REST
├── security/         → Configuration Spring Security + JWT
├── exception/        → Gestion des exceptions
└── util/             → Utilitaires (mappers, helpers)
```

### Base de données

**Développement** : H2 en mémoire
- Console accessible : `http://localhost:8080/h2-console`
- URL : `jdbc:h2:mem:hybridaccessdb`
- Username : `sa`
- Password : (vide)

**Production** : PostgreSQL
- Configuration via variables d'environnement
- DDL : `validate` (pas de modification auto)

## 🚀 Démarrage

### Prérequis
- Java 17
- Maven 3.8+

### Installation

```bash
cd auth-backend
mvn clean install
```

### Lancement

```bash
# Mode dev (H2)
mvn spring-boot:run

# Mode prod (PostgreSQL)
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

Le serveur démarre sur `http://localhost:8080`

## 📡 API Endpoints

### Publics (pas d'authentification)

- `GET /api/v1/health` - Health check
- `POST /api/v1/auth/login` - Connexion
- `POST /api/v1/auth/register` - Inscription

### Protégés (JWT requis)

#### Utilisateurs
- `GET /api/v1/users` - Liste des utilisateurs
- `GET /api/v1/users/{id}` - Détails utilisateur
- `POST /api/v1/users` - Créer utilisateur
- `PUT /api/v1/users/{id}` - Modifier utilisateur
- `DELETE /api/v1/users/{id}` - Supprimer utilisateur

#### Niveaux d'accès
- `GET /api/v1/access-levels` - Liste des niveaux
- `GET /api/v1/access-levels/{id}` - Détails niveau
- `POST /api/v1/access-levels` - Créer niveau (Admin)

#### Ressources
- `GET /api/v1/resources` - Liste des ressources
- `GET /api/v1/resources/{id}` - Détails ressource
- `POST /api/v1/resources` - Créer ressource (Admin)

#### Événements d'accès
- `GET /api/v1/access-events` - Liste des événements
- `GET /api/v1/access-events/user/{userId}` - Événements d'un utilisateur

## 🔐 Niveaux d'accès

| Niveau | Priorité | Password | Biométrie | OTP |
|--------|----------|----------|-----------|-----|
| LEVEL_1 | 1 | ✅ | ❌ | ❌ |
| LEVEL_2 | 2 | ✅ | ✅ | ❌ |
| LEVEL_3 | 3 | ✅ | ✅ | ✅ |
| ADMIN | 4 | ✅ | ✅ | ✅ |

## 🔧 Configuration

### JWT

```yaml
jwt:
  secret: votre-secret-jwt
  expiration: 86400000  # 24h
```

### Face Service

```yaml
face-service:
  url: http://localhost:8001
```

### Risk Assessment

```yaml
risk:
  threshold:
    low: 30
    medium: 60
    high: 80
```

## 🧪 Tests

```bash
mvn test
```

## 📦 Build

```bash
# JAR exécutable
mvn clean package

# Lancer le JAR
java -jar target/auth-backend-1.0.0.jar
```

## 🔗 Intégrations

- **Face Service** : Appel HTTP vers `/api/face/verify` pour validation biométrique
- **Frontend** : CORS configuré pour `http://localhost:5173`

## 📝 TODO

- [ ] Implémenter les services (UserService, AccessLevelService, etc.)
- [ ] Créer les controllers REST
- [ ] Configurer Spring Security + JWT
- [ ] Implémenter RiskAssessmentService
- [ ] Implémenter DecisionEngine
- [ ] Créer FaceServiceClient
- [ ] Ajouter tests unitaires
- [ ] Documenter avec Swagger/OpenAPI
