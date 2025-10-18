# ⚡ Guide Rapide - Start Here!

**Le point d'entrée parfait pour découvrir le projet en 5 minutes**

---

## 🎯 Qu'est-ce que c'est ?

**Dashboard SAAS professionnel** pour la génération et gestion de leads B2B  
Basé sur **Next.js 15** + **Tailwind CSS v4** + **Supabase**

**Statut : ✅ Phase 1 Complétée - Production Ready**

---

## 🚀 Démarrage Ultra-Rapide

### En 3 commandes
```bash
# 1. Installer
npm install --legacy-peer-deps

# 2. Configurer (créer .env avec vos clés Supabase)
cp .env.example .env

# 3. Lancer
npm run dev
```

**→ Ouvrir http://localhost:3000** 🎉

---

## 📚 Documentation - Où aller ?

### 🆕 Je découvre le projet (15 min)
```
1. Ce fichier (vous y êtes !)
2. README.md - Guide complet
3. ETAT_PROJET.md - État actuel
```

### 💻 Je vais développer (1h)
```
1. docs/GETTING_STARTED.md - Setup détaillé
2. .cursor/memory-bank/ - Contexte complet
3. .cursor/rules/ - Standards de code
4. prompts/ - Templates pour IA
```

### 🏗️ Je veux comprendre l'architecture (2h)
```
1. .cursor/memory-bank/tech-context.md
2. .cursor/memory-bank/database.md
3. .cursor/memory-bank/project-structure.md
4. STRUCTURE_VISUELLE.md
```

### 🤝 Je veux contribuer
```
1. CONTRIBUTING.md - Guide complet
2. CHANGELOG.md - Historique
3. .cursor/rules/ - Standards
```

---

## 🗺️ Navigation Express

| Je veux... | Aller à... |
|------------|-----------|
| 📖 **Installer l'app** | `README.md` section Installation |
| 📊 **Voir l'état actuel** | `ETAT_PROJET.md` |
| 🗺️ **Naviguer dans la doc** | `docs/INDEX.md` |
| 🏗️ **Comprendre l'archi** | `.cursor/memory-bank/tech-context.md` |
| 🗄️ **Voir la BDD** | `docs/DATABASE_SUPABASE_SUMMARY.md` |
| 🎨 **Voir les composants** | `.cursor/memory-bank/components.md` |
| 📏 **Connaître les standards** | `.cursor/rules/` |
| 🎯 **Utiliser des templates** | `prompts/` |
| 🤝 **Contribuer** | `CONTRIBUTING.md` |
| 📝 **Voir l'historique** | `CHANGELOG.md` |
| 🌳 **Voir la structure** | `STRUCTURE_VISUELLE.md` |

---

## 🎨 Structure Simplifiée

```
📁 nextjs-dashboard/
│
├── 📖 README.md              ← Guide principal
├── 📊 ETAT_PROJET.md        ← État actuel
├── ⚡ GUIDE_RAPIDE.md        ← Vous êtes ici !
│
├── 📂 docs/                 ← Documentation
│   ├── 🗺️ INDEX.md          ← Navigation
│   └── 🚀 GETTING_STARTED.md
│
├── 📂 .cursor/              ← Config IA
│   ├── memory-bank/        ← Contexte (8 fichiers)
│   └── rules/              ← Standards (3 fichiers)
│
├── 📂 prompts/              ← Templates (6 fichiers)
│
├── 📂 src/                  ← CODE SOURCE
│   ├── app/                ← Routes Next.js
│   ├── components/         ← Composants (69)
│   └── [etc...]
│
└── 📂 lib/                  ← Utilitaires
    └── supabase/           ← Intégration Supabase
```

---

## ✨ Fonctionnalités Principales

### ✅ Déjà Disponibles
- ✅ **Architecture complète** Next.js 15 + App Router
- ✅ **Dark Mode** fonctionnel avec persistance
- ✅ **69 Composants UI** réutilisables (TailAdmin)
- ✅ **Supabase** configuré (Auth + Database + Storage)
- ✅ **4 Layouts** différents (auth, dashboard, marketing, full-width)
- ✅ **30+ Routes** organisées
- ✅ **Row Level Security** sur toutes les tables
- ✅ **Documentation complète** (35+ fichiers)

### 🔄 En Cours (Phase 2)
- 🔄 CRUD Leads complet
- 🔄 Dashboard Analytics avec données réelles
- 🔄 Import/Export CSV
- 🔄 Filtres et recherche avancés

---

## 🛠️ Stack Technique

```
Frontend
├── Next.js 15.2.3        (App Router)
├── React 19              (Server Components)
├── TypeScript 5          (Strict mode)
└── Tailwind CSS v4       (Dark mode)

Backend
├── Supabase              (BaaS)
├── PostgreSQL            (Database)
└── Row Level Security    (Sécurité)

UI Components
├── ApexCharts            (Graphiques)
├── FullCalendar          (Calendrier)
├── JSVectorMap           (Cartes)
└── React DnD             (Drag & Drop)

Tools
├── ESLint 9              (Linting)
├── Prettier              (Formatage)
└── Git                   (Versioning)
```

---

## 📦 Scripts Utiles

```bash
# Développement
npm run dev                # Lancer le serveur dev
npm run build              # Build production
npm run start              # Serveur production

# Qualité du code
npm run lint               # Vérifier ESLint
npm run lint:fix           # Corriger auto ESLint
npm run format             # Formater avec Prettier
npm run type-check         # Vérifier TypeScript

# Tous les checks avant commit
npm run lint && npm run type-check && npm run format
```

---

## 🎯 Cas d'Usage

### Je veux créer une nouvelle page
```
1. Lire : prompts/create-page.md
2. Suivre le template
3. Respecter : .cursor/rules/nextjs-15-strict.md
```

### Je veux créer un composant
```
1. Lire : prompts/create-component.md
2. Placer dans src/components/[categorie]/
3. Respecter : .cursor/rules/typescript-quality.md
```

### Je veux ajouter une feature
```
1. Lire : prompts/add-feature.md
2. Consulter : .cursor/memory-bank/
3. Développer en suivant les standards
```

### Je veux débugger une erreur
```
1. Lire : prompts/debug-error.md
2. Vérifier : npm run type-check
3. Consulter : docs/
```

---

## 🚦 Checklist Avant de Commencer

- [ ] Node.js 18+ installé
- [ ] npm 9+ installé
- [ ] Git configuré
- [ ] `npm install --legacy-peer-deps` exécuté
- [ ] `.env` créé et configuré
- [ ] `npm run dev` fonctionne
- [ ] README.md lu
- [ ] ETAT_PROJET.md parcouru

**✅ Tout est OK ? Vous êtes prêt à développer !**

---

## 💡 Tips & Tricks

### Développement avec IA (Cursor)
```
# Charger le contexte
@.cursor/memory-bank/index.md

# Utiliser les templates
@prompts/create-component.md

# Respecter les règles
@.cursor/rules/
```

### Recherche rapide
```
Ctrl+P          → Trouver un fichier
Ctrl+Shift+F    → Rechercher dans le projet
F12             → Aller à la définition
```

### Commits propres
```bash
# Format : type(scope): description

feat(leads): ajouter filtres de recherche
fix(auth): corriger redirection après login
docs(readme): mettre à jour installation
```

---

## 🎓 Parcours d'Apprentissage

### Niveau 1 : Découverte (30 min)
```
✅ GUIDE_RAPIDE.md (ce fichier)
✅ README.md
✅ npm run dev
✅ Explorer http://localhost:3000
```

### Niveau 2 : Développement (2h)
```
✅ docs/GETTING_STARTED.md
✅ ETAT_PROJET.md
✅ .cursor/memory-bank/tech-context.md
✅ .cursor/rules/
```

### Niveau 3 : Maîtrise (1 jour)
```
✅ Tous les .cursor/memory-bank/
✅ Tous les docs/
✅ Créer un composant
✅ Créer une page
```

### Niveau 4 : Expert (1 semaine)
```
✅ Comprendre l'architecture complète
✅ Maîtriser Supabase + RLS
✅ Utiliser tous les prompts/
✅ Contribuer avec qualité
```

---

## ⚡ Ressources Essentielles

### Documentation Interne
- 📖 [README.md](./README.md) - Guide principal
- 📊 [ETAT_PROJET.md](./ETAT_PROJET.md) - État actuel
- 🗺️ [docs/INDEX.md](./docs/INDEX.md) - Navigation
- 🌳 [STRUCTURE_VISUELLE.md](./STRUCTURE_VISUELLE.md) - Structure détaillée

### Documentation Technique
- 🛠️ [Tech Context](./.cursor/memory-bank/tech-context.md)
- 🗄️ [Database Schema](./.cursor/memory-bank/database.md)
- 🏗️ [Project Structure](./.cursor/memory-bank/project-structure.md)

### Standards & Règles
- ⚛️ [Next.js 15](./.cursor/rules/nextjs-15-strict.md)
- 📘 [TypeScript](./.cursor/rules/typescript-quality.md)
- 🎨 [TailAdmin](./.cursor/rules/tailadmin-structure.md)

### Templates
- 📄 [Create Page](./prompts/create-page.md)
- 🧩 [Create Component](./prompts/create-component.md)
- ✨ [Add Feature](./prompts/add-feature.md)

---

## 🆘 Besoin d'Aide ?

### Je suis bloqué sur...

**...l'installation**  
→ [README.md](./README.md) section Installation  
→ [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md)

**...comprendre le code**  
→ [.cursor/memory-bank/](./.cursor/memory-bank/)  
→ [STRUCTURE_VISUELLE.md](./STRUCTURE_VISUELLE.md)

**...la base de données**  
→ [docs/DATABASE_SUPABASE_SUMMARY.md](./docs/DATABASE_SUPABASE_SUMMARY.md)  
→ [lib/supabase/README.md](./lib/supabase/README.md)

**...les standards**  
→ [.cursor/rules/](./.cursor/rules/)  
→ [CONTRIBUTING.md](./CONTRIBUTING.md)

**...autre chose**  
→ Créer une Issue GitHub  
→ Consulter [docs/INDEX.md](./docs/INDEX.md)

---

## 🎉 Prêt à Commencer !

Vous avez maintenant tous les outils pour :
- ✅ Installer et lancer le projet
- ✅ Comprendre l'architecture
- ✅ Trouver la documentation
- ✅ Développer avec les standards
- ✅ Contribuer efficacement

**🚀 Go ! Lancez `npm run dev` et explorez !**

---

## 📞 Liens Rapides

| Lien | Description |
|------|-------------|
| [📖 README](./README.md) | Guide principal complet |
| [📊 ÉTAT](./ETAT_PROJET.md) | État actuel détaillé |
| [🗺️ INDEX](./docs/INDEX.md) | Navigation complète |
| [🚀 START](./docs/GETTING_STARTED.md) | Guide de démarrage |
| [🤝 CONTRIB](./CONTRIBUTING.md) | Guide contribution |
| [📝 CHANGELOG](./CHANGELOG.md) | Historique versions |
| [🌳 STRUCTURE](./STRUCTURE_VISUELLE.md) | Structure visuelle |

---

**⚡ Fait avec ❤️ - Prêt pour la Phase 2 !**

**Dernière mise à jour** : 18 Octobre 2025

