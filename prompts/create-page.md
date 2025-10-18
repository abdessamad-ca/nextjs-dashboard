# Créer une nouvelle page TailAdmin

## Contexte
@.cursor/memory-bank/index.md
@.cursor/memory-bank/project-structure.md
@.cursor/memory-bank/components.md

## Règles
@.cursor/rules/tailadmin-structure.md
@.cursor/rules/nextjs-15-strict.md
@.cursor/rules/typescript-quality.md

## Instructions

Je veux créer une nouvelle page : **[NOM DE LA PAGE]**

**Description fonctionnelle** : [DÉCRIRE CE QUE FAIT LA PAGE]

**Composants TailAdmin à utiliser** : [LISTER LES COMPOSANTS]

**Data à afficher** : [DÉCRIRE LES DONNÉES]

---

## MODE PLAN (ne pas implémenter encore)

Génère un plan détaillé incluant :

1. **Structure du fichier**
   - Chemin : `/src/app/(admin)/[nom-route]/page.tsx`
   - Metadata SEO
   - Layout utilisé

2. **Composants nécessaires**
   - Composants TailAdmin existants à réutiliser
   - Nouveaux composants à créer (si nécessaire)

3. **Types TypeScript**
   - Interfaces/types dans `/lib/validations/`
   - Schémas Zod si formulaires

4. **Data fetching**
   - Server Component ou Client Component ?
   - Source de données (API, BDD, static)
   - Gestion loading/error states

5. **Navigation**
   - Ajouter dans Sidebar ? Où ?
   - Breadcrumb

6. **Responsive design**
   - Grille mobile/desktop
   - Adaptations nécessaires

---

## Contraintes obligatoires

- ✅ Utiliser layout admin approprié
- ✅ Ajouter Breadcrumb en haut de page
- ✅ Exporter metadata pour SEO
- ✅ Respecter les classes Tailwind TailAdmin
- ✅ TypeScript strict (pas de `any`)
- ✅ Server Component par défaut (sauf si interactivité)
- ✅ Dark mode support automatique
- ✅ Responsive design

---

## Après validation du plan

```
Le plan est validé. 

Passe en MODE ACT et implémente fichier par fichier :

1. Créer le fichier de page
2. Créer les types nécessaires
3. Implémenter les composants
4. Ajouter dans navigation (si nécessaire)

Respecte strictement @.cursor/rules/
```

---

## Exemple d'utilisation

```
@prompts/create-page.md

Page : Analytics Détaillé

Description : Dashboard avec statistiques de leads (total, qualifiés, convertis, taux conversion), 
graphique d'évolution mensuelle, et tableau des dernières transactions.

Composants : 
- 4x DataStats cards
- 1x ChartOne (line chart)
- 1x TableOne (dernières transactions)

Data : 
- Stats depuis Prisma (groupBy status)
- Données chart : leads par mois
- Table : 10 derniers leads convertis

MODE PLAN uniquement.
```

