# Créer un composant TailAdmin

## Contexte
@.cursor/memory-bank/components.md
@.cursor/memory-bank/tech-context.md
@.cursor/memory-bank/project-structure.md

## Règles
@.cursor/rules/tailadmin-structure.md
@.cursor/rules/typescript-quality.md

## Instructions

Je veux créer un nouveau composant : **[NOM DU COMPOSANT]**

**Type** : [Table / Chart / Form / Card / Modal / autre]

**Fonctionnalité** : [DÉCRIRE CE QUE FAIT LE COMPOSANT]

**Props attendues** : 
- [Prop 1] : [Type] - [Description]
- [Prop 2] : [Type] - [Description]

**Données affichées** : [DÉCRIRE]

**Interactivité** : [OUI/NON - Si oui, décrire]

---

## MODE PLAN (ne pas implémenter)

Génère un plan détaillé incluant :

1. **Structure du fichier**
   - Chemin : `/src/components/[Categorie]/[NomComposant].tsx`
   - Server Component ou Client Component ?

2. **Interface TypeScript**
   ```tsx
   interface [NomComposant]Props {
     // Props typées
   }
   ```

3. **Structure HTML/JSX**
   - Container principal avec classes TailAdmin
   - Sections internes
   - Responsive breakpoints

4. **Styles Tailwind**
   - Classes container standard
   - Dark mode classes
   - Responsive utilities

5. **État et logique** (si Client Component)
   - useState nécessaires
   - Event handlers
   - Side effects

6. **Accessibilité**
   - Labels ARIA
   - Roles
   - Keyboard navigation

---

## Styles TailAdmin à respecter

### Container standard
```tsx
className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
```

### Header de card
```tsx
className="border-b border-stroke px-7 py-4 dark:border-strokedark"
```

### Corps de card
```tsx
className="p-4 md:p-6 xl:p-7.5"
```

### Grille responsive
```tsx
className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
```

---

## Contraintes

- ✅ TypeScript strict avec interface de props
- ✅ Classes Tailwind TailAdmin standards
- ✅ Dark mode support
- ✅ Responsive (mobile-first)
- ✅ Accessibilité (labels, ARIA)
- ✅ Réutilisable et composable
- ✅ Props optionnelles avec valeurs par défaut

---

## Après validation

```
Plan validé. MODE ACT.

Implémente le composant en respectant :
@.cursor/rules/tailadmin-structure.md
@.cursor/rules/typescript-quality.md

Crée le fichier avec :
1. Imports nécessaires
2. Interface TypeScript
3. Composant fonctionnel
4. Export par défaut
```

---

## Exemples d'utilisation

### Créer une Card statistique personnalisée

```
@prompts/create-component.md

Composant : LeadScoreCard

Type : Card statistique

Fonctionnalité : Affiche le score d'un lead avec indicateur visuel (couleur selon score)
et évolution par rapport au mois dernier.

Props :
- lead : Lead - Objet lead complet
- previousScore : number (optionnel) - Score du mois dernier
- className : string (optionnel)

Interactivité : Oui - Click pour voir détails du lead

MODE PLAN.
```

### Créer un formulaire

```
@prompts/create-component.md

Composant : LeadForm

Type : Form

Fonctionnalité : Formulaire de création/édition de lead avec validation.

Props :
- lead : Lead | null - Lead à éditer (null = création)
- onSubmit : (data: CreateLeadInput) => Promise<void>
- onCancel : () => void

Validation : Zod avec schéma createLeadSchema

Interactivité : Oui - Formulaire complet avec validation

MODE PLAN.
```

