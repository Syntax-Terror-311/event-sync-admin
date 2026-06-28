# EventSync — Admin (React Admin)

Interface d'administration pour les organisateurs d'EventSync. Accès sécurisé par JWT via le backend.

## Stack technique

- **React Admin v4** — framework CRUD admin
- **Vite** — bundler rapide
- **TypeScript**
- **MUI v5** — composants UI (intégré à React Admin)

## Prérequis

- Node.js >= 18
- Le backend `eventsync-backend` doit tourner sur le port 4000

## Installation

```bash
# 1. Cloner le repo
git clone https://github.com/TON_USER/eventsync-admin.git
cd eventsync-admin

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
```

### Contenu du `.env`

```env
VITE_API_URL=http://localhost:4000/api
```

## Démarrage

```bash
# Développement
npm run dev
# → http://localhost:3001

# Build de production
npm run build
npm run preview
```

## Connexion

L'admin se connecte avec les identifiants créés lors du seed du backend :

- **Email :** `admin@eventsync.com`
- **Mot de passe :** `Admin1234!`

> Ces valeurs sont configurables dans le `.env` du backend avant de lancer `npm run db:seed`.

## Comment fonctionne l'authentification

```
[Admin ouvre localhost:3001]
        ↓
[React Admin affiche page Login]
        ↓
[authProvider.login() → POST /api/auth/login]
        ↓
[Backend vérifie email/password → retourne JWT]
        ↓
[Token stocké dans localStorage]
        ↓
[Toutes les requêtes suivantes : Authorization: Bearer <token>]
        ↓
[Backend middleware auth.js vérifie le token]
```

## Ressources CRUD disponibles

| Ressource | Opérations |
|-----------|-----------|
| **Événements** | Lister, Créer, Modifier, Supprimer |
| **Sessions** | Lister, Créer, Modifier, Supprimer (avec assignation intervenants) |
| **Intervenants** | Lister, Créer, Modifier, Supprimer |
| **Salles** | Lister, Créer, Modifier, Supprimer |

## Structure du projet

```
src/
├── main.tsx                      # Point d'entrée React
├── App.tsx                       # Config React Admin (resources, providers)
├── providers/
│   ├── authProvider.ts           # Login/logout/checkAuth via JWT
│   └── dataProvider.ts           # CRUD → appels REST vers backend
├── components/
│   └── Dashboard.tsx             # Tableau de bord accueil
└── pages/
    ├── Events.tsx                 # List + Create + Edit événements
    ├── Sessions.tsx               # List + Create + Edit sessions
    ├── Speakers.tsx               # List + Create + Edit intervenants
    └── Rooms.tsx                  # List + Create + Edit salles
```

## Lien avec le frontend public

Le bouton **"Frontend public →"** dans la Navbar de l'interface user pointe vers `http://localhost:3000`. Le dashboard admin contient aussi un lien direct, et un chart des sessions et des intervenants. Les deux apps partagent uniquement le backend — elles sont indépendantes l'une de l'autre.
