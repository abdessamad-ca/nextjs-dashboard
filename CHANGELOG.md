# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] - 2025-10-18

### ✨ Ajouté
- Architecture complète Next.js 15 avec App Router
- Intégration TailAdmin template professionnel
- Dark mode complet avec persistance
- Intégration Supabase (Auth + Database + Storage)
- Row Level Security (RLS) sur toutes les tables
- Structure de routes optimisée :
  - `(auth)` - Pages authentification
  - `(dashboard)` - Dashboard protégé
  - `(marketing)` - Pages publiques/landing
  - `(full-width-pages)` - Pages sans sidebar
- 69 composants UI réutilisables
- 48 icônes SVG
- Context API pour Sidebar et Theme
- Custom hooks (useGoBack, useModal)
- Documentation complète Memory Bank (8 fichiers)
- Règles de code strictes (3 fichiers)
- Templates de prompts IA (6 fichiers)
- Documentation publique (5 fichiers)

### 🔧 Configuré
- TypeScript strict mode
- ESLint 9 avec flat config
- Prettier pour formatage automatique
- Scripts npm (dev, build, lint, format, type-check)
- Variables d'environnement documentées
- Supabase client & server helpers

### 📚 Documentation
- README principal complet
- Guide d'installation détaillé
- Architecture technique documentée
- Schéma base de données complet
- Guide Supabase avec exemples
- RLS Policies documentées
- Vision produit et roadmap
- Décisions techniques justifiées

### 🐛 Corrigé
- Conflit dépendances React 19 + ApexCharts
- Dark mode flickering au chargement
- Erreurs route groups Next.js
- Configuration ESLint 9
- Hydration warnings SSR

---

## [0.2.0] - 2025-10-15

### ✨ Ajouté
- Migration vers Supabase
- Configuration base de données PostgreSQL
- Schéma complet 10 tables
- Triggers pour synchronisation auth
- Storage buckets (imports, avatars, exports, documents)

### 🔧 Modifié
- Migration Prisma → Supabase direct
- Mise à jour architecture database
- Refactoring clients auth

---

## [0.1.0] - 2025-10-12

### ✨ Ajouté
- Setup initial du projet
- Installation Next.js 15.2.3
- Configuration Tailwind CSS v4
- Intégration TailAdmin template
- Structure de dossiers de base
- Configuration TypeScript
- Setup ESLint et Prettier

### 📚 Documentation
- README initial
- Setup instructions

---

## Types de Changements
- **Ajouté** - Nouvelles fonctionnalités
- **Modifié** - Changements dans les fonctionnalités existantes
- **Déprécié** - Fonctionnalités bientôt supprimées
- **Supprimé** - Fonctionnalités supprimées
- **Corrigé** - Corrections de bugs
- **Sécurité** - Corrections de vulnérabilités

---

## Liens
- [1.0.0] - Phase 1 complétée
- [0.2.0] - Migration Supabase
- [0.1.0] - Setup initial

