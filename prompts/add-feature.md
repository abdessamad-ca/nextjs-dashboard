# Ajouter une fonctionnalité complète

## Contexte
@.cursor/memory-bank/index.md
@.cursor/memory-bank/product-vision.md
@.cursor/memory-bank/tech-context.md
@.cursor/memory-bank/database.md

## Règles
@.cursor/rules/tailadmin-structure.md
@.cursor/rules/nextjs-15-strict.md
@.cursor/rules/typescript-quality.md

## Instructions

Je veux ajouter la fonctionnalité : **[NOM FONCTIONNALITÉ]**

**Description** : [DESCRIPTION DÉTAILLÉE DE LA FEATURE]

**User Story** : En tant que [PERSONA], je veux [ACTION] afin de [BÉNÉFICE]

**Critères d'acceptation** :
- [ ] [Critère 1]
- [ ] [Critère 2]
- [ ] [Critère 3]

---

## MODE PLAN (Architecture globale)

Génère un plan d'architecture complet incluant :

### 1. Base de données

**Modèles Prisma à créer/modifier** :
```prisma
// Nouveaux modèles ou modifications
```

**Migration** :
```bash
npx prisma migrate dev --name [nom-migration]
```

### 2. Types et Validations

**Fichiers à créer** :
- `/lib/validations/[feature].ts`

**Schémas Zod** :
```typescript
export const [feature]Schema = z.object({
  // ...
});
```

### 3. API / Server Actions

**Actions serveur à créer** :
- `/src/app/actions/[feature].ts`

**Fonctions** :
- `create[Feature]()`
- `update[Feature]()`
- `delete[Feature]()`
- `get[Feature]()`
- `list[Features]()`

### 4. Pages

**Pages à créer** :
- `/src/app/(admin)/[feature]/page.tsx` - Liste
- `/src/app/(admin)/[feature]/[id]/page.tsx` - Détail
- `/src/app/(admin)/[feature]/new/page.tsx` - Création

### 5. Composants

**Composants à créer** :
- `[Feature]List.tsx` - Liste avec filtres
- `[Feature]Card.tsx` - Card individuelle
- `[Feature]Form.tsx` - Formulaire création/édition
- `[Feature]Detail.tsx` - Vue détaillée

### 6. Navigation

**Ajout dans Sidebar** :
```tsx
{
  label: "[Feature]",
  route: "/[feature]",
  icon: <Icon />,
  children: [...]
}
```

### 7. Tests

**À tester** :
- Validation Zod
- Server actions
- Composants (si critique)

---

## Architecture technique

### Flow de données
```
1. User action (form submit, click)
   ↓
2. Client Component (event handler)
   ↓
3. Server Action (/app/actions/)
   ↓
4. Validation (Zod)
   ↓
5. Database (Prisma)
   ↓
6. Revalidation (revalidatePath)
   ↓
7. UI update (automatic)
```

### État et cache
- **Server State** : Fetch dans Server Components
- **Client State** : useState pour UI uniquement
- **Cache** : next/cache revalidation
- **Optimistic UI** : Si nécessaire pour UX

---

## Estimation

**Complexité** : [Faible / Moyenne / Haute]

**Temps estimé** :
- BDD & migrations : [X h]
- Types & validations : [X h]
- Server actions : [X h]
- Pages : [X h]
- Composants : [X h]
- Tests : [X h]
**Total** : [X h]

**Dépendances** :
- [Feature A doit être terminée avant]
- [Nécessite package X]

---

## Plan d'implémentation

### Phase 1 : Foundation
1. Créer modèles Prisma
2. Générer migration
3. Créer schémas Zod et types
4. Tester validation

### Phase 2 : Backend
1. Créer server actions
2. Implémenter CRUD
3. Gérer erreurs
4. Tester avec Prisma Studio

### Phase 3 : Frontend
1. Créer pages principales
2. Créer composants
3. Connecter server actions
4. Gérer loading/error states

### Phase 4 : Polish
1. Ajouter dans navigation
2. Responsive design
3. Dark mode
4. Accessibilité
5. Performance

### Phase 5 : Test & Review
1. Tests manuels
2. Edge cases
3. Performance check
4. Code review

---

## Contraintes

- ✅ Suivre architecture existante
- ✅ Réutiliser composants TailAdmin
- ✅ TypeScript strict partout
- ✅ Validation Zod côté serveur
- ✅ Server Components par défaut
- ✅ Accessibilité complète
- ✅ Responsive design
- ✅ Dark mode support

---

## Après validation du plan

```
Plan d'architecture validé.

MODE ACT - Implémentation phase par phase :

Phase actuelle : [1/2/3/4/5]

Implémente tous les fichiers de la phase en cours :
1. [Fichier 1]
2. [Fichier 2]
...

Respecte strictement @.cursor/rules/

Informe-moi quand la phase est terminée pour passer à la suivante.
```

---

## Exemples d'utilisation

### Feature : Gestion de campagnes d'emails

```
@prompts/add-feature.md

Fonctionnalité : Campagnes d'emails automatisées

Description : Permettre de créer des campagnes d'emails pour contacter plusieurs leads
en une fois, avec suivi des ouvertures et clics.

User Story : En tant que commercial, je veux créer une campagne d'emails pour 
contacter 50 leads qualifiés afin d'augmenter mes chances de conversion.

Critères d'acceptation :
- [ ] Créer une campagne avec nom, sujet, contenu
- [ ] Sélectionner leads destinataires (filtres)
- [ ] Programmer envoi ou envoyer immédiatement
- [ ] Dashboard campagne : stats (envoyés, ouverts, cliqués)
- [ ] Historique des campagnes

MODE PLAN - Architecture complète.
```

### Feature : Scoring automatique des leads

```
@prompts/add-feature.md

Fonctionnalité : Scoring automatique des leads

Description : Calculer automatiquement un score (0-100) pour chaque lead basé sur 
des critères (taille entreprise, industrie, engagement, etc.)

User Story : En tant que SDR, je veux voir un score pour chaque lead afin de 
prioriser mes actions de prospection.

Critères d'acceptation :
- [ ] Algorithme de scoring configuré
- [ ] Score recalculé automatiquement (nouveau lead, activité)
- [ ] Badge visuel du score (couleur selon niveau)
- [ ] Filtre par score dans liste leads
- [ ] Historique évolution score

MODE PLAN.
```

