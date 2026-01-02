# 🏆 WC2026 Unity Hub

> Plateforme centralisée et interactive inspirée de la Coupe du Monde FIFA 2026

---

## 📋 Présentation du projet

**WC2026 Unity Hub** est une application web moderne développée dans le cadre d'un projet de fin d'année. Elle propose une expérience utilisateur immersive et cohérente, mettant en valeur l'esprit d'unité et de célébration de la Coupe du Monde FIFA 2026.

La plateforme centralise les fonctionnalités clés liées à l'événement sportif international, offrant une navigation fluide et une interface visuelle moderne inspirée de l'identité graphique officielle FIFA 2026.

---

## 🎯 Objectifs du projet

- ✅ Offrir une **expérience utilisateur fluide et immersive**
- ✅ Centraliser les fonctionnalités clés liées à l'événement
- ✅ Mettre en valeur une **interface moderne et cohérente** avec le thème FIFA 2026
- ✅ Proposer une navigation intuitive entre les différentes sections

---

## ✨ Fonctionnalités principales

Du point de vue utilisateur, la plateforme offre les fonctionnalités suivantes :

| Fonctionnalité | Description |
|----------------|-------------|
| 🔐 Interface d'authentification | Accès intuitif et ergonomique à la plateforme |
| 📊 Tableau de bord | Vue personnalisée des informations et accès rapide aux services |
| 🎫 Gestion des profils | Profils utilisateurs avec niveaux d'accès différenciés |
| 🧭 Navigation fluide | Transitions harmonieuses entre les différentes sections |
| ⚽ Fan Zone | Espace dédié aux supporters avec actualités et interactions |
| 🏟️ Stadium Operations | Interface de gestion opérationnelle des infrastructures |
| 🎯 Predictions League | Espace pronostics et classements |
| 📁 Documents Vault | Espace documentaire organisé |
| ✈️ Team Travel | Coordination des déplacements des équipes |
| 🎩 VIP Services | Gestion de l'hospitalité et des réservations VIP |

---

## 🖼️ Interfaces utilisateur

Chaque interface est conçue pour répondre aux besoins spécifiques des utilisateurs de la plateforme.

### Page d'accueil

![Page d'accueil](rapport-fifa-2026/figures/ui/homepage.jpeg)

*Point d'entrée principal de la plateforme. Cette interface présente l'identité visuelle FIFA 2026 et permet aux visiteurs de découvrir les services proposés avant de s'authentifier.*

---

### Interface de connexion

![Interface de connexion](rapport-fifa-2026/figures/ui/login_interface.jpeg)

*Formulaire d'authentification épuré et moderne. L'utilisateur peut accéder à son espace personnel en saisissant ses identifiants de manière simple et intuitive.*

---

### Vérification MFA

![Vérification MFA](rapport-fifa-2026/figures/ui/verification_mfa.jpeg)

*Interface de validation guidée. Cette étape permet de confirmer l'identité de l'utilisateur de manière fluide avant d'accéder aux services de la plateforme.*

---

### Tableau de bord

![Tableau de bord](rapport-fifa-2026/figures/ui/dashboard.jpeg)

*Vue centrale personnalisée selon le profil utilisateur. Le tableau de bord offre un aperçu global des services disponibles et des raccourcis vers les fonctionnalités les plus utilisées.*

---

### Niveaux d'accès

![Niveaux d'accès](rapport-fifa-2026/figures/ui/access_level_requirements.jpeg)

*Affichage clair des exigences d'accès aux différentes ressources. Cette interface informe l'utilisateur des conditions nécessaires pour accéder à certains services.*

---

### Fan Zone

![Fan Zone](rapport-fifa-2026/figures/ui/ui_live_fan_zone.jpeg)

*Espace interactif dédié aux supporters. Les fans peuvent suivre l'actualité, participer à des discussions et vivre l'événement en temps réel.*

---

### Stadium Operations

![Stadium Operations](rapport-fifa-2026/figures/ui/ui_stadium_operations.jpeg)

*Interface de gestion opérationnelle des stades. Les responsables peuvent superviser les activités et coordonner les opérations liées aux infrastructures.*

---

### VIP Hospitality

![VIP Hospitality](rapport-fifa-2026/figures/ui/ui_vip_hospitality.jpeg)

*Services d'accueil premium pour les invités VIP. Cette interface permet de gérer les prestations d'hospitalité haut de gamme.*

---

### VIP Reservations

![VIP Reservations](rapport-fifa-2026/figures/ui/ui_vip_reservations.jpeg)

*Gestion des réservations d'espaces privilégiés. Les utilisateurs peuvent consulter et gérer leurs réservations dans les zones VIP.*

---

### Event Control Room

![Event Control Room](rapport-fifa-2026/figures/ui/ui_event_control_room.jpeg)

*Centre de supervision événementielle en temps réel. Cette interface offre une vue d'ensemble des événements en cours et permet une coordination efficace.*

---

### Team Travel Coordination

![Team Travel](rapport-fifa-2026/figures/ui/ui_team_travel_coordination.jpeg)

*Coordination logistique des déplacements. Cette interface facilite la planification et le suivi des voyages des équipes.*

---

### Documents Vault

![Documents Vault](rapport-fifa-2026/figures/ui/ui_documents_vault.jpeg)

*Espace documentaire organisé. Les utilisateurs peuvent consulter et gérer leurs documents de manière structurée.*

---

### Predictions League

![Predictions League](rapport-fifa-2026/figures/ui/ui_predictions_league.jpeg)

*Espace pronostics et classements utilisateurs. Les participants peuvent faire leurs prédictions et suivre leur progression dans le classement.*

---

## 🛠️ Technologies utilisées

| Catégorie | Technologies |
|-----------|--------------|
| **Frontend** | React (Vite), TypeScript |
| **UI/UX** | Tailwind CSS, shadcn/ui |
| **Outils** | Git, GitHub, Node.js |

---

## 🏗️ Architecture générale

L'application adopte une architecture modulaire favorisant la maintenabilité et l'évolutivité :

```
┌─────────────────────────────────────────────────────┐
│                    APPLICATION                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│   ┌─────────────┐    ┌─────────────┐                │
│   │   Pages     │───▶│ Composants  │                │
│   │  (Routes)   │    │    UI       │                │
│   └─────────────┘    └─────────────┘                │
│          │                  │                        │
│          ▼                  ▼                        │
│   ┌─────────────────────────────────┐               │
│   │         Services / API          │               │
│   └─────────────────────────────────┘               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

Cette organisation permet une **séparation claire des responsabilités** entre les différentes couches de l'application.

---

## 🎨 Expérience utilisateur et design

Le design de l'application s'inspire directement de l'identité visuelle officielle de la Coupe du Monde FIFA 2026 :

- 🎨 **Thème visuel** – Palette de couleurs moderne reprenant les tons emblématiques de l'événement
- ✨ **Animations fluides** – Transitions et micro-interactions pour une expérience immersive
- 📱 **Design responsive** – Interface adaptée à tous les types d'écrans
- 🧭 **Navigation intuitive** – Architecture d'information claire et logique
- 🌐 **Cohérence graphique** – Éléments visuels uniformes à travers toute la plateforme

---

## 🚀 Installation et exécution

### Prérequis

- Node.js (v18 ou supérieur)
- Git

### Étapes d'installation

```bash
# 1. Cloner le dépôt GitHub
git clone https://github.com/votre-username/wc2026-unity-hub.git

# 2. Accéder au répertoire du projet
cd wc2026-unity-hub

# 3. Installer les dépendances
npm install

# 4. Lancer l'application en mode développement
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

---

## 🎓 Contexte académique

Ce projet a été réalisé dans le cadre du **Projet de Fin d'Année (PFA)** à l'**École Marocaine des Sciences de l'Ingénieur (EMSI)**, filière Ingénierie Informatique et Réseaux.

L'objectif est de démontrer les compétences acquises en développement d'applications web modernes, en conception d'interfaces utilisateur et en gestion de projet.

**Année universitaire** : 2025–2026

---
## 👤 Auteur

- **TAJIRI Wissal**
- **AMJAD Chaimaa**

## 📄 Licence

Projet académique – EMSI © 2026

---

<p align="center">
  <img src="rapport-fifa-2026/figures/logos/emsi_logo.png" alt="EMSI Logo" width="150">
</p>
