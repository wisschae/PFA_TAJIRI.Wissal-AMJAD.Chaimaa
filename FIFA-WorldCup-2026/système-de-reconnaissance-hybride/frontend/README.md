# Hybrid Access System - Frontend

Frontend React pour le système de reconnaissance hybride multi-niveaux.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ et npm
- Backend Spring Boot en cours d'exécution sur `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
```

### Lancement en mode développement

```bash
npm run dev
```

L'application sera accessible sur : **http://localhost:3000**

### Build production

```bash
npm run build
npm run preview
```

## 📂 Structure du Projet

```
frontend/
├── src/
│   ├── api/                  # Services API
│   │   ├── httpClient.ts    # Client Axios configuré
│   │   ├── authApi.ts       # API d'authentification
│   │   └── resourcesApi.ts  # API des ressources
│   ├── components/          # Composants réutilisables
│   │   ├── ProtectedRoute.tsx
│   │   └── ResourceCard.tsx
│   ├── context/             # Contextes React
│   │   └── AuthContext.tsx  # Gestion de l'authentification
│   ├── pages/               # Pages de l'application
│   │   ├── LoginPage.tsx    # Page de connexion
│   │   ├── MfaPage.tsx      # Page MFA (simulation)
│   │   └── DashboardPage.tsx # Dashboard principal
│   ├── router/              # Configuration des routes
│   │   └── AppRouter.tsx
│   ├── types/               # Types TypeScript
│   │   └── index.ts
│   ├── App.tsx              # Composant racine
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔐 Flux d'Authentification

### 1. Connexion (Login)

1. L'utilisateur saisit email + mot de passe
2. Appel à `POST /api/v1/auth/login`
3. Deux cas possibles :

**Cas A : Pas de MFA requis**
```json
{
  "token": "eyJhbGc...",
  "mfaRequired": false,
  "riskScore": 10
}
```
→ Token sauvegardé → Redirection vers `/dashboard`

**Cas B : MFA requis**
```json
{
  "mfaRequired": true,
  "sessionId": "abc123",
  "requiredFactors": ["FACE", "OTP"],
  "riskScore": 65
}
```
→ Redirection vers `/mfa`

### 2. Vérification MFA

- **Mode actuel** : Simulation (bouton "Simuler MFA réussi")
- **Mode futur** : Intégration réelle avec webcam + OTP

### 3. Dashboard

- Récupération des ressources via `GET /api/v1/resources`
- Affichage groupé par niveau de sécurité
- Déconnexion possible via bouton dans le header

## 🎨 Design

### Palette de Couleurs

- **PRIMARY** : Bleu (branding principal)
- **SUCCESS** : Vert (niveau PUBLIC)
- **BLUE** : Bleu ciel (niveau CONFIDENTIEL)
- **WARNING** : Orange (niveau SECRET)
- **DANGER** : Rouge (niveau TOP_SECRET)

### Badges de Niveaux

| Niveau | Couleur | Icône |
|--------|---------|-------|
| PUBLIC | Vert | 🌐 |
| CONFIDENTIEL | Bleu | 🔒 |
| SECRET | Orange | 🔐 |
| TOP_SECRET | Rouge | 🛡️ |

## 🧪 Comptes de Test

Utilisez ces comptes pour tester l'application :

```
Email: test@test.com
Password: password123
```

Ou n'importe quel compte créé via l'endpoint `/api/v1/auth/register`.

## 🔧 Configuration

### Variables d'Environnement

La configuration de l'API est dans `src/api/httpClient.ts` :

```typescript
baseURL: 'http://localhost:8080/api/v1'
```

Pour changer l'URL du backend, modifiez cette valeur.

### Proxy Vite

Le fichier `vite.config.ts` inclut un proxy vers le backend :

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
}
```

## 📦 Dépendances Principales

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **React Router DOM** : Navigation
- **Axios** : Client HTTP
- **TailwindCSS** : Framework CSS
- **Vite** : Build tool

## 🚧 État Actuel du Projet

### ✅ Fonctionnalités Implémentées

- [x] Page de connexion avec validation
- [x] Gestion du token JWT (localStorage)
- [x] Contexte d'authentification global
- [x] Routes protégées
- [x] Dashboard avec affichage des ressources
- [x] Groupement par niveau de sécurité
- [x] Page MFA (mode simulation)
- [x] Déconnexion
- [x] Gestion d'erreurs 401 automatique
- [x] Design responsive

### 🚧 À Implémenter

- [ ] Vérification MFA réelle (webcam + reconnaissance faciale)
- [ ] Intégration OTP
- [ ] Page de profil utilisateur
- [ ] Logs d'accès de l'utilisateur
- [ ] Notifications temps réel
- [ ] Dark mode
- [ ] Tests unitaires (Vitest)

## 📝 Scripts Disponibles

```bash
npm run dev       # Lancer en mode développement
npm run build     # Build pour production
npm run preview   # Prévisualiser le build
npm run lint      # Linter le code
npm run test      # Lancer les tests (quand implémentés)
```

## 🐛 Dépannage

### L'application ne se connecte pas au backend

1. Vérifier que le backend tourne sur `http://localhost:8080`
2. Vérifier les logs de la console navigateur (F12)
3. Vérifier que CORS est activé côté backend

### Token invalide après refresh

- Le token est stocké dans `localStorage`
- Si vous nettoyez le localStorage, vous devrez vous reconnecter

### Erreur 401 même avec un token valide

- Le token a peut-être expiré (durée : 24h)
- Reconnectez-vous pour obtenir un nouveau token

## 📊 Flow Diagram

```
┌─────────┐
│ /login  │
└────┬────┘
     │ Login API call
     ▼
  MFA requis ?
   ╱       ╲
 NON       OUI
  │         │
  │    ┌────▼────┐
  │    │  /mfa   │
  │    └────┬────┘
  │         │ Verify MFA
  │         │
  └────┬────┘
       ▼
 ┌─────────────┐
 │ /dashboard  │
 └─────────────┘
       │
       │ GET /resources
       ▼
  Display resources
  by security level
```

## 👩‍💻 Auteur

**Chaimaa Amjad** - 5IIR  
Projet de Fin d'Études (PFE)  
Système de reconnaissance hybride pour accès sécurisé multi-niveaux

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2025
