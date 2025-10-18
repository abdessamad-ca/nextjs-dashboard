# 📚 Index de la Documentation

Guide complet de la documentation du projet SAAS Génération de Lead.

---

## 🎯 Par où commencer ?

### Nouveaux développeurs
1. 📖 **[README principal](../README.md)** - Vue d'ensemble et installation
2. 🚀 **[Getting Started](./GETTING_STARTED.md)** - Guide de démarrage rapide
3. 🏗️ **[Architecture](./.cursor/memory-bank/tech-context.md)** - Comprendre l'architecture

### Utilisateurs expérimentés
1. 📊 **[État du Projet](../ETAT_PROJET.md)** - Statut actuel complet
2. 📝 **[Changelog](../CHANGELOG.md)** - Historique des versions
3. 🗄️ **[Database Summary](./DATABASE_SUPABASE_SUMMARY.md)** - Schéma BDD

---

## 📁 Organisation de la Documentation

### 📂 Racine du Projet

| Fichier | Description | Public |
|---------|-------------|--------|
| `README.md` | Guide principal du projet | ✅ Oui |
| `ETAT_PROJET.md` | État actuel détaillé | ✅ Oui |
| `CHANGELOG.md` | Historique des versions | ✅ Oui |
| `CONTRIBUTING.md` | Guide de contribution | ✅ Oui |
| `LICENSE` | Licence du projet | ✅ Oui |

### 📂 `/docs` - Documentation Publique

| Fichier | Description | Audience |
|---------|-------------|----------|
| `INDEX.md` | Ce fichier - Navigation | Tous |
| `GETTING_STARTED.md` | Guide de démarrage rapide | Débutants |
| `DATABASE_SUPABASE_SUMMARY.md` | Schéma et config BDD | Développeurs |
| `ENV_TEMPLATE.md` | Template variables d'env | Ops/DevOps |
| `IMPLEMENTATION_EXAMPLES.md` | Exemples de code | Développeurs |
| `MIGRATION_GUIDE.md` | Guide de migration | Avancé |

### 📂 `/.cursor/memory-bank` - Contexte pour IA

Documentation contextuelle optimisée pour les assistants IA.

| Fichier | Description | Contenu |
|---------|-------------|---------|
| `index.md` | Vue d'ensemble Memory Bank | Résumé projet |
| `product-vision.md` | Vision et roadmap produit | Business |
| `tech-context.md` | Contexte technique | Stack & config |
| `project-structure.md` | Structure des dossiers | Architecture |
| `database.md` | Schéma BDD détaillé | 1226 lignes |
| `landing-architecture.md` | Architecture landing page | 761 lignes |
| `components.md` | Catalogue composants | UI/UX |
| `decisions.md` | Décisions techniques | Justifications |

### 📂 `/.cursor/rules` - Règles de Code

Standards et conventions de développement stricts.

| Fichier | Description | Lignes |
|---------|-------------|--------|
| `nextjs-15-strict.md` | Standards Next.js 15 | 535 |
| `typescript-quality.md` | Standards TypeScript | 526 |
| `tailadmin-structure.md` | Structure TailAdmin | 316 |

### 📂 `/prompts` - Templates IA

Templates de prompts réutilisables pour développement assisté par IA.

| Fichier | Usage |
|---------|-------|
| `create-page.md` | Créer une nouvelle page |
| `create-component.md` | Créer un composant |
| `add-feature.md` | Ajouter une fonctionnalité |
| `refactor-quality.md` | Refactoring qualité |
| `debug-error.md` | Débugger une erreur |
| `build-landing-product.md` | Construire landing page |

### 📂 `/lib/supabase` - Documentation Supabase

| Fichier | Description |
|---------|-------------|
| `README.md` | Guide Supabase complet |
| `RLS_POLICIES.md` | Policies de sécurité |

### 📂 `/docs/archives` - Archives

Documentation historique du développement Phase 1 (14 fichiers archivés).

---

## 🎓 Parcours d'Apprentissage

### Niveau 1 : Découverte (1-2h)
1. Lire le [README principal](../README.md)
2. Parcourir [Getting Started](./GETTING_STARTED.md)
3. Voir [État du Projet](../ETAT_PROJET.md)

**Objectif** : Comprendre le projet et savoir lancer l'app

---

### Niveau 2 : Développeur (1 jour)
1. Étudier [Tech Context](./.cursor/memory-bank/tech-context.md)
2. Comprendre [Project Structure](./.cursor/memory-bank/project-structure.md)
3. Lire [Database Schema](./DATABASE_SUPABASE_SUMMARY.md)
4. Explorer [Components](./.cursor/memory-bank/components.md)

**Objectif** : Comprendre l'architecture et pouvoir développer

---

### Niveau 3 : Expert (1 semaine)
1. Maîtriser les [Rules](./.cursor/rules/)
2. Comprendre toutes les [Decisions](./.cursor/memory-bank/decisions.md)
3. Lire [Landing Architecture](./.cursor/memory-bank/landing-architecture.md)
4. Utiliser les [Prompts](/prompts/) efficacement

**Objectif** : Autonomie complète et contributions majeures

---

## 🔍 Recherche Rapide

### Par Sujet

#### Architecture
- [Tech Context](./.cursor/memory-bank/tech-context.md)
- [Project Structure](./.cursor/memory-bank/project-structure.md)
- [Next.js 15 Rules](./.cursor/rules/nextjs-15-strict.md)

#### Base de Données
- [Database Schema](./.cursor/memory-bank/database.md)
- [Supabase Guide](../lib/supabase/README.md)
- [RLS Policies](../lib/supabase/RLS_POLICIES.md)
- [Migration Guide](./MIGRATION_GUIDE.md)

#### UI/UX
- [Components Catalog](./.cursor/memory-bank/components.md)
- [TailAdmin Structure](./.cursor/rules/tailadmin-structure.md)
- [Landing Architecture](./.cursor/memory-bank/landing-architecture.md)

#### Code Quality
- [TypeScript Standards](./.cursor/rules/typescript-quality.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Decisions](./.cursor/memory-bank/decisions.md)

#### Business
- [Product Vision](./.cursor/memory-bank/product-vision.md)
- [Changelog](../CHANGELOG.md)
- [État du Projet](../ETAT_PROJET.md)

### Par Type de Tâche

| Tâche | Documentation |
|-------|---------------|
| Installation | [README](../README.md) + [Getting Started](./GETTING_STARTED.md) |
| Créer une page | [Prompt Create Page](../prompts/create-page.md) |
| Créer un composant | [Prompt Create Component](../prompts/create-component.md) |
| Ajouter une feature | [Prompt Add Feature](../prompts/add-feature.md) |
| Débugger | [Prompt Debug](../prompts/debug-error.md) |
| Refactoring | [Prompt Refactor](../prompts/refactor-quality.md) |
| Config Supabase | [Supabase Guide](../lib/supabase/README.md) |
| Variables d'env | [ENV Template](./ENV_TEMPLATE.md) |

---

## 📊 Statistiques de Documentation

- **Total fichiers** : 30+
- **Pages principales** : 8
- **Memory Bank** : 8 fichiers (4000+ lignes)
- **Rules** : 3 fichiers (1377 lignes)
- **Prompts** : 6 templates
- **Archives** : 14 fichiers historiques

---

## 🔄 Mise à Jour

Cette documentation est maintenue activement :

- **Dernière mise à jour** : 18 Octobre 2025
- **Version** : 1.0.0
- **Prochaine révision** : Fin Phase 2

### Proposer des améliorations

Documentation incorrecte ou manquante ? 
1. Créer une Issue avec le tag `documentation`
2. Ou soumettre une PR selon [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 📞 Support

Besoin d'aide ?
1. Consulter cette documentation
2. Rechercher dans les Issues GitHub
3. Créer une nouvelle Issue
4. Contacter l'équipe

---

**Navigation** : [⬆️ Haut de page](#-index-de-la-documentation) | [📖 README](../README.md) | [🚀 Getting Started](./GETTING_STARTED.md)

