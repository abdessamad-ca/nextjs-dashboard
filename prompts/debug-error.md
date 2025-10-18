# Debug une erreur

## Contexte
@.cursor/memory-bank/tech-context.md
@.cursor/memory-bank/project-structure.md

## Règles
@.cursor/rules/nextjs-15-strict.md
@.cursor/rules/typescript-quality.md

## Instructions

J'ai une erreur dans : **[FICHIER OU FONCTIONNALITÉ]**

**Type d'erreur** : [Compilation / Runtime / Build / Autre]

**Message d'erreur** :
```
[COPIER LE MESSAGE D'ERREUR COMPLET]
```

**Stack trace** (si disponible) :
```
[COPIER LA STACK TRACE]
```

**Contexte** :
- Ce qui devrait se passer : [COMPORTEMENT ATTENDU]
- Ce qui se passe réellement : [COMPORTEMENT ACTUEL]
- Quand l'erreur apparaît : [MOMENT / ACTION DÉCLENCHEUR]

**Code concerné** :
```tsx
[COPIER LE CODE PROBLÉMATIQUE]
```

---

## Analyse demandée

### 1. Identification
- Quelle est la cause exacte de l'erreur ?
- Dans quel fichier précisément ?
- Quelle ligne / fonction ?

### 2. Explication
- Pourquoi cette erreur se produit ?
- Quelles règles Next.js/React sont violées ?
- Y a-t-il un problème de type TypeScript ?

### 3. Impact
- L'erreur bloque-t-elle le build ?
- Affecte-t-elle uniquement dev ou aussi prod ?
- Y a-t-il d'autres parties du code affectées ?

### 4. Solution
- Correction recommandée (code exact)
- Alternatives possibles
- Prévention pour éviter ce problème à l'avenir

---

## Checklist de debug

### Erreurs TypeScript
- [ ] Type manquant ou incorrect
- [ ] Import manquant
- [ ] Incompatibilité de types
- [ ] Utilisation de `any`
- [ ] Props non définies dans interface

### Erreurs Next.js
- [ ] 'use client' manquant
- [ ] 'use server' sur mauvaise fonction
- [ ] Hooks dans Server Component
- [ ] Browser API dans Server Component
- [ ] Metadata mal définie
- [ ] Dynamic route mal configurée

### Erreurs React
- [ ] Hooks dans mauvais ordre
- [ ] Hook dans condition
- [ ] useEffect dépendances manquantes
- [ ] State mutation directe
- [ ] Key manquante dans liste

### Erreurs Runtime
- [ ] Variable undefined/null
- [ ] Accès propriété sur null
- [ ] Fonction non définie
- [ ] Promise non gérée
- [ ] Erreur async/await

### Erreurs Build
- [ ] Import circulaire
- [ ] Module non trouvé
- [ ] Configuration next.config.ts
- [ ] Variables d'environnement manquantes
- [ ] Problème de cache (.next à supprimer)

---

## Format de réponse

### 🔍 Analyse de l'erreur

**Cause principale** : [EXPLICATION]

**Localisation exacte** :
- Fichier : `[chemin]`
- Ligne : `[numéro]`
- Fonction : `[nom]`

**Type de problème** : [TypeScript / Next.js / React / Runtime]

---

### 💡 Explication détaillée

[EXPLICATION TECHNIQUE DE POURQUOI L'ERREUR SE PRODUIT]

[RÉFÉRENCE AUX RÈGLES VIOLÉES]

---

### ✅ Solution

**Code actuel (problématique)** :
```tsx
// Code avec erreur
```

**Code corrigé** :
```tsx
// Code sans erreur
```

**Changements effectués** :
1. [Changement 1]
2. [Changement 2]
3. [Changement 3]

---

### 🛡️ Prévention future

Pour éviter ce type d'erreur :
- [ ] [Action préventive 1]
- [ ] [Action préventive 2]
- [ ] [Règle ESLint à ajouter]

---

## Après correction

```
Si la correction nécessite plusieurs fichiers :

Implémente les corrections dans l'ordre :
1. [Fichier 1] - [Modification]
2. [Fichier 2] - [Modification]

Vérifie ensuite :
- npm run type-check
- npm run lint
- npm run dev (sans erreur)
```

---

## Exemples d'utilisation

### Erreur TypeScript

```
@prompts/debug-error.md

Erreur dans : src/components/LeadCard.tsx

Type : Compilation

Message d'erreur :
Property 'status' does not exist on type 'Lead'.

Code :
const LeadCard = ({ lead }: { lead: Lead }) => {
  return <div>{lead.status}</div>;
};

Contexte : J'ai ajouté la propriété status dans Prisma mais TypeScript ne la reconnaît pas.
```

### Erreur Next.js

```
@prompts/debug-error.md

Erreur dans : app/leads/page.tsx

Type : Runtime

Message d'erreur :
Error: Hooks can only be called inside of the body of a function component.

Code :
export default async function LeadsPage() {
  const [leads, setLeads] = useState([]);
  // ...
}

Contexte : Ma page affiche cette erreur au chargement.
```

### Erreur Build

```
@prompts/debug-error.md

Type : Build

Message d'erreur :
Module not found: Can't resolve '@/lib/db'

Stack trace :
./src/app/actions/leads.ts
Module not found: Can't resolve '@/lib/db'

Contexte : Le build fonctionne en dev mais échoue en production.
```

---

## Erreurs fréquentes et solutions rapides

### "use client" manquant
**Symptôme** : "You're importing a component that needs useState..."
**Solution** : Ajouter `"use client"` en haut du fichier

### Server Component avec hooks
**Symptôme** : "Hooks can only be called..."
**Solution** : Séparer en Server Component (parent) + Client Component (enfant avec hooks)

### Type 'any' implicite
**Symptôme** : "Parameter 'x' implicitly has an 'any' type"
**Solution** : Typer explicitement le paramètre

### Prisma Client non à jour
**Symptôme** : "Property 'X' does not exist on type 'Y'"
**Solution** : `npx prisma generate`

### Cache Next.js corrompu
**Symptôme** : Erreurs inexplicables, build marche puis ne marche plus
**Solution** : `rm -rf .next && npm run dev`

