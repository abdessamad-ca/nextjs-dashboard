# 🚀 SAAS Génération de Lead

Application dashboard professionnelle pour la génération et gestion de leads B2B.
Basée sur Next.js 15 + Tailwind CSS v4 + TailAdmin Template.

---

## 📋 Table des matières

- [Stack Technique](#-stack-technique)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Développement](#-développement)
- [Structure du Projet](#-structure-du-projet)
- [Workflow de Développement](#-workflow-de-développement)
- [Scripts Disponibles](#-scripts-disponibles)
- [Documentation](#-documentation)
- [Déploiement](#-déploiement)

---

## 🛠️ Stack Technique

### Core
- **Framework** : Next.js 15.2.3 (App Router)
- **UI Library** : React 19
- **Language** : TypeScript 5
- **Styling** : Tailwind CSS v4

### UI Components
- **Charts** : ApexCharts + React-ApexCharts
- **Calendar** : FullCalendar
- **Maps** : JSVectorMap
- **Date Picker** : Flatpickr
- **Drag & Drop** : React DnD
- **File Upload** : React Dropzone
- **Carousel** : Swiper

### Tools & Quality
- **Forms** : React Hook Form (à ajouter)
- **Validation** : Zod (à ajouter)
- **Linting** : ESLint 9
- **Formatting** : Prettier
- **Auth** : NextAuth.js (à configurer)
- **Database** : Prisma + PostgreSQL (à configurer)

### Deployment
- **Hosting** : VPS
- **CI/CD** : À configurer

---

## ✅ Prérequis

- **Node.js** : v18.17.0 ou supérieur
- **npm** : v9.0.0 ou supérieur (ou yarn/pnpm)
- **Git** : Pour le versioning
- **PostgreSQL** : v14 ou supérieur (pour la base de données)

---

## 📦 Installation

### 1. Cloner le repository

```bash
git clone <url-du-repo>
cd nextjs-dashboard
```

### 2. Installer les dépendances

```bash
npm install --legacy-peer-deps
```

> **Note** : Le flag `--legacy-peer-deps` est nécessaire pour résoudre les conflits de dépendances entre React 19 et certaines librairies.

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/leadgen?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-genere-avec-openssl"

# API Keys (à ajouter selon besoins)
# OPENAI_API_KEY=
# LINKEDIN_API_KEY=
```

### Générer un secret NextAuth

```bash
openssl rand -base64 32
```

### Configuration de la base de données

1. **Installer Prisma** (si pas encore fait) :

```bash
npm install prisma @prisma/client
npm install bcryptjs
npm install -D @types/bcryptjs
```

2. **Initialiser Prisma** :

```bash
npx prisma init
```

3. **Créer le schéma** : Voir `.cursor/memory-bank/database.md`

4. **Générer le client Prisma** :

```bash
npx prisma generate
```

5. **Créer la base de données** :

```bash
npx prisma db push
```

6. **Seed data (optionnel)** :

```bash
npx prisma db seed
```

---

## 💻 Développement

### Premier lancement

```bash
# 1. Installer dépendances
npm install --legacy-peer-deps

# 2. Configurer .env
cp .env.example .env
# Éditer .env avec vos valeurs

# 3. Setup BDD
npx prisma db push
npx prisma generate

# 4. Lancer dev
npm run dev
```

### Workflow quotidien

```bash
# Lancer le serveur
npm run dev

# Dans un autre terminal - Vérifier qualité
npm run lint
npm run type-check

# Formater le code
npm run format
```

### Ajouter une nouvelle page

1. Consulter le template : `prompts/create-page.md`
2. Utiliser la structure documentée dans `.cursor/memory-bank/`
3. Suivre les règles de code dans `.cursor/rules/`

### Ajouter un nouveau composant

1. Consulter le template : `prompts/create-component.md`
2. Créer dans `/src/components/[Categorie]/`
3. Typer avec TypeScript strict
4. Respecter les classes Tailwind TailAdmin

---

## 📁 Structure du Projet

```
nextjs-dashboard/
├── .cursor/
│   ├── memory-bank/           # Documentation contextuelle du projet
│   │   ├── index.md           # Vue d'ensemble
│   │   ├── project-structure.md
│   │   ├── tech-context.md
│   │   ├── components.md
│   │   ├── database.md
│   │   ├── decisions.md
│   │   └── product-vision.md
│   ├── rules/                 # Règles de code strictes
│   │   ├── tailadmin-structure.md
│   │   ├── nextjs-15-strict.md
│   │   └── typescript-quality.md
│   └── mcp.json              # Config serveurs MCP
│
├── prompts/                  # Templates de prompts réutilisables
│   ├── create-page.md
│   ├── create-component.md
│   ├── refactor-quality.md
│   ├── add-feature.md
│   └── debug-error.md
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (admin)/         # Routes avec layout admin
│   │   ├── (full-width-pages)/ # Routes pleine largeur
│   │   ├── layout.tsx       # Layout racine
│   │   ├── page.tsx         # Dashboard principal
│   │   └── globals.css      # Styles globaux
│   │
│   ├── components/          # Composants React
│   │   ├── auth/
│   │   ├── calendar/
│   │   ├── charts/
│   │   ├── common/
│   │   ├── form/
│   │   ├── tables/
│   │   └── ui/
│   │
│   ├── context/             # React Contexts
│   ├── hooks/               # Custom hooks
│   ├── icons/               # Icônes SVG
│   └── layout/              # Composants layout
│
├── lib/
│   ├── api/                 # Clients API
│   ├── services/            # Services métier
│   └── validations/         # Schémas Zod + Types
│
├── public/                  # Fichiers statiques
│   └── images/
│
├── prisma/                  # Schéma Prisma (à créer)
│   ├── schema.prisma
│   └── migrations/
│
├── .env                     # Variables d'environnement (à créer)
├── .eslintrc.json          # Config ESLint
├── .prettierrc             # Config Prettier
├── next.config.ts          # Config Next.js
├── tsconfig.json           # Config TypeScript
├── tailwind.config.js      # Config Tailwind (à créer si nécessaire)
└── package.json
```

---

## 🔄 Workflow de Développement

### Avec IA (Cursor / Claude)

#### 1. Initialiser le contexte

```
Lis ces fichiers pour comprendre mon projet :

@.cursor/memory-bank/index.md
@.cursor/memory-bank/project-structure.md
@.cursor/memory-bank/tech-context.md

Et familiarise-toi avec mes règles :

@.cursor/rules/tailadmin-structure.md
@.cursor/rules/nextjs-15-strict.md
@.cursor/rules/typescript-quality.md

Confirme ta compréhension.
```

#### 2. Créer une nouvelle feature

```
@prompts/add-feature.md

Fonctionnalité : [NOM]
Description : [DESCRIPTION]

MODE PLAN - Génère architecture complète
```

#### 3. Débugger une erreur

```
@prompts/debug-error.md

Erreur dans : [FICHIER]
Message : [ERROR]

Analyse et propose solution.
```

### Standards de qualité

Avant chaque commit :

```bash
# 1. Vérifier types
npm run type-check

# 2. Vérifier linting
npm run lint

# 3. Formater le code
npm run format

# 4. Tester en dev
npm run dev
```

---

## 📜 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build pour production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement les erreurs ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm run format:check` | Vérifie le formatage sans modifier |
| `npm run type-check` | Vérifie les types TypeScript |
| `npx prisma studio` | Ouvre l'interface Prisma Studio |
| `npx prisma generate` | Génère le client Prisma |
| `npx prisma db push` | Synchronise le schéma avec la BDD |
| `npx prisma migrate dev` | Crée une nouvelle migration |

---

## 📚 Documentation

### Documentation interne

- **Vue d'ensemble** : `.cursor/memory-bank/index.md`
- **Architecture** : `.cursor/memory-bank/tech-context.md`
- **Structure** : `.cursor/memory-bank/project-structure.md`
- **Composants** : `.cursor/memory-bank/components.md`
- **Base de données** : `.cursor/memory-bank/database.md`
- **Décisions techniques** : `.cursor/memory-bank/decisions.md`
- **Vision produit** : `.cursor/memory-bank/product-vision.md`

### Règles de code

- **Structure TailAdmin** : `.cursor/rules/tailadmin-structure.md`
- **Next.js 15** : `.cursor/rules/nextjs-15-strict.md`
- **TypeScript** : `.cursor/rules/typescript-quality.md`

### Templates de prompts

- **Créer une page** : `prompts/create-page.md`
- **Créer un composant** : `prompts/create-component.md`
- **Ajouter une feature** : `prompts/add-feature.md`
- **Refactoring** : `prompts/refactor-quality.md`
- **Debug** : `prompts/debug-error.md`

---

## 🚀 Déploiement

### Build de production

```bash
# 1. Build
npm run build

# 2. Tester le build localement
npm run start
```

### Déploiement sur VPS

1. **Prérequis serveur** :
   - Node.js 18+
   - PostgreSQL 14+
   - Nginx (reverse proxy)
   - PM2 (process manager)

2. **Setup serveur** :

```bash
# Sur le serveur
git clone <repo-url>
cd nextjs-dashboard
npm install --legacy-peer-deps --production
npm run build

# Lancer avec PM2
pm2 start npm --name "leadgen-app" -- start
pm2 save
pm2 startup
```

3. **Nginx config** :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Variables d'environnement production** :

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://votre-domaine.com
NEXTAUTH_SECRET=<secret-securise>
```

---

## 🤝 Contribution

### Workflow Git

```bash
# 1. Créer une branche
git checkout -b feature/nom-feature

# 2. Développer et commiter
git add .
git commit -m "feat: description de la feature"

# 3. Push
git push origin feature/nom-feature

# 4. Créer une Pull Request
```

### Commits conventionnels

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, point-virgules manquants, etc.
- `refactor:` Refactoring du code
- `test:` Ajout de tests
- `chore:` Maintenance, dépendances, etc.

---

## 📝 Roadmap

### Phase 1 - MVP (En cours)
- [x] Setup projet et architecture
- [x] Documentation Memory Bank
- [x] Règles de code strictes
- [ ] Authentification (NextAuth)
- [ ] CRUD Leads basique
- [ ] Dashboard analytics

### Phase 2 - Features principales
- [ ] Scoring automatique leads
- [ ] Gestion campagnes emails
- [ ] Filtres et recherche avancée
- [ ] Import/Export CSV

### Phase 3 - Automatisation
- [ ] Génération automatique de leads
- [ ] Enrichissement de données
- [ ] Intégrations (LinkedIn, HubSpot)
- [ ] Séquences automatisées

### Phase 4 - IA & ML
- [ ] Qualification IA
- [ ] Prédiction de conversion
- [ ] Recommandations personnalisées

---

## 🐛 Problèmes connus

### React 19 + ApexCharts
**Symptôme** : Warnings de dépendances peer  
**Solution** : Utiliser `--legacy-peer-deps` lors de l'installation

### ESLint 9 flat config
**Symptôme** : Configuration complexe  
**Solution** : Configuration déjà gérée dans `eslint.config.mjs`

---

## 📞 Support

- **Documentation** : `.cursor/memory-bank/`
- **Issues** : Créer une issue GitHub
- **Email** : [votre-email]

---

## 📄 Licence

Ce projet est privé et propriétaire.

---

## 🙏 Crédits

- **Template** : [TailAdmin](https://tailadmin.com/) - Next.js Dashboard Template
- **Framework** : [Next.js](https://nextjs.org/)
- **UI** : [Tailwind CSS](https://tailwindcss.com/)
- **Charts** : [ApexCharts](https://apexcharts.com/)

---

**Fait avec ❤️ par ABDE ZIZOU**
