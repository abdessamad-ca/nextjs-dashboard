# Refactor pour qualité de code

## Contexte
@.cursor/memory-bank/tech-context.md
@.cursor/memory-bank/project-structure.md

## Règles
@.cursor/rules/typescript-quality.md
@.cursor/rules/nextjs-15-strict.md
@.cursor/rules/tailadmin-structure.md

## Instructions

Analyse le fichier : **[CHEMIN DU FICHIER]**

Identifie tous les problèmes de qualité et propose des améliorations.

---

## Checklist d'analyse

### 1. TypeScript
- [ ] Types manquants ou `any`
- [ ] Props non typées
- [ ] Interfaces incomplètes
- [ ] Utilisation de `@ts-ignore`
- [ ] Types trop larges (ex: `object`, `Function`)
- [ ] Manque de validation runtime (Zod)

### 2. Next.js 15
- [ ] Server Component qui devrait être Client (ou inverse)
- [ ] Metadata manquante
- [ ] Mauvaise utilisation de fetch (cache strategy)
- [ ] `<a>` au lieu de `<Link>`
- [ ] `<img>` au lieu de `<Image>`
- [ ] Variables d'env mal utilisées

### 3. React
- [ ] Hooks dans mauvais ordre
- [ ] Dépendances useEffect manquantes
- [ ] Re-renders inutiles (manque memo/useMemo)
- [ ] State qui devrait être props (ou inverse)
- [ ] Props drilling excessif
- [ ] Key manquante dans listes

### 4. Performance
- [ ] Composants lourds non lazy-loaded
- [ ] Images non optimisées
- [ ] Fetch séquentiels au lieu de parallèles
- [ ] Pas de pagination pour longues listes
- [ ] Calculs lourds non mémoïsés

### 5. Accessibilité
- [ ] Labels manquants sur inputs
- [ ] Attributs ARIA manquants
- [ ] Mauvaise hiérarchie des headings
- [ ] Manque de texte alternatif images
- [ ] Boutons non descriptifs
- [ ] Pas de focus visible

### 6. Code Quality
- [ ] Code dupliqué
- [ ] Fonctions trop longues (>50 lignes)
- [ ] Trop de responsabilités (SRP)
- [ ] Magic numbers/strings
- [ ] Console.log en production
- [ ] Commentaires obsolètes
- [ ] Variables mal nommées

### 7. Sécurité
- [ ] Secrets exposés côté client
- [ ] Validation côté client uniquement
- [ ] XSS potentiel (dangerouslySetInnerHTML)
- [ ] Données sensibles dans localStorage
- [ ] Requêtes API sans authentication

### 8. Tailwind TailAdmin
- [ ] Classes non standards
- [ ] Dark mode non supporté
- [ ] Pas responsive
- [ ] Duplication de classes
- [ ] Inline styles au lieu de Tailwind

---

## Format de réponse

Pour chaque problème identifié :

### ❌ Problème [NUMÉRO] : [TITRE]
**Type** : [TypeScript / Performance / Accessibilité / etc.]  
**Priorité** : 🔴 Critique / 🟡 Moyen / 🟢 Mineur

**Description** :
[Explication détaillée du problème]

**Pourquoi c'est un problème** :
[Impact sur le code, performance, maintenabilité, etc.]

**Code actuel** :
```tsx
// Code problématique
```

**Solution proposée** :
```tsx
// Code corrigé
```

**Impact estimé** :
- Temps : [X minutes/heures]
- Difficulté : [Facile / Moyen / Difficile]
- Breaking change : [Oui / Non]

---

## Après analyse

**Résumé** :
- Total de problèmes : [X]
- Critiques : [X]
- Moyens : [X]
- Mineurs : [X]

**Plan d'action recommandé** :
1. [Correction 1] - Priorité haute
2. [Correction 2] - Priorité haute
3. [Correction 3] - Priorité moyenne
...

**Ordre d'implémentation** :
```
1. Corriger d'abord : [Problèmes critiques]
2. Ensuite : [Problèmes moyens]
3. Si temps : [Problèmes mineurs]
```

---

## Demande d'implémentation

Après validation du plan :

```
Plan de refactor validé.

Implémente les corrections dans l'ordre de priorité :

1. Commence par les problèmes critiques
2. Respecte strictement @.cursor/rules/
3. Teste après chaque modification
4. Vérifie qu'il n'y a pas de breaking changes

Procède fichier par fichier si plusieurs fichiers concernés.
```

---

## Exemples d'utilisation

### Refactor d'un composant

```
@prompts/refactor-quality.md

Fichier : src/components/ecommerce/LeadCard.tsx

Analyse complète et propose améliorations.
```

### Refactor d'une page

```
@prompts/refactor-quality.md

Fichier : src/app/(admin)/leads/page.tsx

Focus sur :
- TypeScript strict
- Performance (fetch, rendering)
- Accessibilité

Génère plan de refactor priorisé.
```

### Refactor global

```
Analyse tous les fichiers dans src/components/forms/ :

Pour chaque fichier, identifie :
1. Validation manquante (Zod)
2. Types incomplets
3. Accessibilité

Génère un plan global de refactor.
```

