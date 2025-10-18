# Guide de Contribution

Merci de votre intérêt pour contribuer à ce projet ! 🎉

---

## 📋 Table des matières

- [Code de Conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Standards de code](#standards-de-code)
- [Processus de développement](#processus-de-développement)
- [Commits et Pull Requests](#commits-et-pull-requests)
- [Tests](#tests)

---

## Code de Conduite

En participant à ce projet, vous acceptez de respecter un comportement professionnel et respectueux envers tous les contributeurs.

---

## Comment contribuer

### 🐛 Signaler un bug

1. Vérifier que le bug n'a pas déjà été signalé dans les Issues
2. Créer une nouvelle Issue avec :
   - Titre clair et descriptif
   - Description détaillée du problème
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Captures d'écran si pertinent
   - Version de Node.js / navigateur

### ✨ Proposer une nouvelle fonctionnalité

1. Créer une Issue avec le tag `feature`
2. Décrire :
   - Le problème que ça résout
   - La solution proposée
   - Alternatives considérées
   - Impact sur le code existant

### 🔧 Soumettre du code

1. Fork le repository
2. Créer une branche depuis `main`
3. Faire vos modifications
4. Tester localement
5. Créer une Pull Request

---

## Standards de code

### TypeScript

- ✅ **Strict mode** activé
- ✅ Typer toutes les variables, fonctions et props
- ❌ **Jamais** `any` (utiliser `unknown` si besoin)
- ✅ Interfaces pour les objets complexes

```typescript
// ✅ Bon
interface UserProps {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function greetUser(user: UserProps): string {
  return `Hello ${user.name}`;
}

// ❌ Mauvais
function greetUser(user: any) {
  return `Hello ${user.name}`;
}
```

### React / Next.js

- ✅ Server Components par défaut
- ✅ `'use client'` seulement si nécessaire
- ✅ Props typées avec TypeScript
- ✅ Hooks en haut du composant
- ✅ Composants fonctionnels uniquement

```typescript
// ✅ Bon - Server Component
export default async function UsersPage() {
  const users = await fetchUsers();
  return <UserList users={users} />;
}

// ✅ Bon - Client Component
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Tailwind CSS

- ✅ Utiliser les classes utilitaires
- ✅ Respecter le thème TailAdmin
- ✅ Dark mode avec classes conditionnelles
- ❌ Éviter les styles inline

```typescript
// ✅ Bon
<div className="rounded-lg bg-white p-6 shadow-default dark:bg-boxdark">
  <h2 className="text-xl font-semibold text-black dark:text-white">
    Titre
  </h2>
</div>

// ❌ Mauvais
<div style={{ padding: '20px', backgroundColor: 'white' }}>
  <h2 style={{ fontSize: '20px' }}>Titre</h2>
</div>
```

### Conventions de nommage

```typescript
// Fichiers
ComponentName.tsx      // Composants
page.tsx              // Pages Next.js
layout.tsx            // Layouts
route.ts              // API routes
actions.ts            // Server Actions

// Variables & Fonctions
const userName = 'John';        // camelCase
const MAX_USERS = 100;          // UPPER_SNAKE_CASE pour constantes
function fetchUserData() {}     // camelCase

// Types & Interfaces
interface User {}               // PascalCase
type UserRole = 'admin' | 'user';

// Composants
export default function UserCard() {}  // PascalCase
```

---

## Processus de développement

### 1. Setup local

```bash
# Cloner le fork
git clone https://github.com/votre-username/nextjs-dashboard.git
cd nextjs-dashboard

# Installer les dépendances
npm install --legacy-peer-deps

# Copier .env
cp .env.example .env
# Remplir les variables d'environnement

# Lancer le dev server
npm run dev
```

### 2. Créer une branche

```bash
# Nommer selon le type de changement
git checkout -b feature/nouvelle-fonctionnalite
git checkout -b fix/correction-bug
git checkout -b docs/mise-a-jour-readme
git checkout -b refactor/optimisation-composant
```

### 3. Développer

```bash
# Vérifier les types
npm run type-check

# Vérifier le linting
npm run lint

# Formater le code
npm run format
```

### 4. Utiliser les templates de prompts

Pour ajouter une fonctionnalité :

```
@prompts/add-feature.md
Fonctionnalité : [NOM]
Description : [DESCRIPTION]
```

Pour créer un composant :

```
@prompts/create-component.md
Composant : [NOM]
Type : [TYPE]
```

---

## Commits et Pull Requests

### Format des commits

Suivre la convention [Conventional Commits](https://www.conventionalcommits.org/fr/) :

```bash
# Format
type(scope): description courte

# Types
feat:      Nouvelle fonctionnalité
fix:       Correction de bug
docs:      Documentation uniquement
style:     Formatage, point-virgules, etc.
refactor:  Refactoring du code
test:      Ajout ou modification de tests
chore:     Maintenance, dépendances, config

# Exemples
feat(leads): ajouter filtres de recherche avancés
fix(auth): corriger erreur de redirection après login
docs(readme): mettre à jour les instructions d'installation
refactor(components): optimiser le composant DataTable
```

### Pull Request

**Titre**
```
[Type] Description courte et claire
```

**Description**
```markdown
## 📝 Description
Expliquer ce qui a été fait et pourquoi.

## 🔗 Issue liée
Closes #123

## 🧪 Tests effectués
- [ ] Tests manuels locaux
- [ ] Build production réussit
- [ ] Pas d'erreurs ESLint
- [ ] Types TypeScript valides

## 📸 Captures d'écran (si UI)
[Ajouter des captures d'écran]

## ✅ Checklist
- [ ] Code respecte les standards
- [ ] Documentation mise à jour
- [ ] Tests ajoutés/mis à jour
- [ ] Pas de breaking changes (ou documentés)
```

### Revue de code

**Critères de validation** :
- ✅ Code fonctionnel et testé
- ✅ Respect des standards du projet
- ✅ TypeScript strict sans erreurs
- ✅ Documentation à jour si nécessaire
- ✅ Pas de régression
- ✅ Build production OK

---

## Tests

### Tests manuels

Avant de soumettre une PR :

```bash
# 1. Linter
npm run lint

# 2. Types
npm run type-check

# 3. Build
npm run build

# 4. Tester le build
npm run start

# 5. Vérifier en dev
npm run dev
```

### Tests automatisés (À venir)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## Documentation

### Où documenter ?

- **README.md** - Guide général et installation
- **docs/** - Documentation technique détaillée
- **.cursor/memory-bank/** - Contexte pour IA
- **CHANGELOG.md** - Historique des versions
- **Code comments** - Pour la logique complexe

### Comment documenter ?

```typescript
/**
 * Crée un nouveau lead dans la base de données
 * 
 * @param data - Données du lead
 * @param userId - ID de l'utilisateur propriétaire
 * @returns Lead créé avec son ID
 * @throws {Error} Si validation échoue
 * 
 * @example
 * const lead = await createLead({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john@example.com'
 * }, user.id);
 */
export async function createLead(
  data: CreateLeadInput,
  userId: string
): Promise<Lead> {
  // Implementation
}
```

---

## Ressources utiles

### Documentation interne
- `.cursor/memory-bank/` - Contexte projet
- `docs/GETTING_STARTED.md` - Guide de démarrage
- `lib/supabase/README.md` - Guide Supabase

### Documentation externe
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

---

## Questions ?

N'hésitez pas à :
- Créer une Issue avec le tag `question`
- Consulter les Issues existantes
- Lire la documentation dans `docs/`

---

**Merci de contribuer ! 🎉**

