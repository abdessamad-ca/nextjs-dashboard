# Décisions Techniques

Ce fichier documente les choix techniques majeurs et leurs justifications.

## Architecture

### Next.js 15 App Router
**Date** : Initialisation projet  
**Décision** : Utiliser App Router plutôt que Pages Router  
**Raison** :
- Server Components par défaut (meilleures performances)
- Layouts imbriqués plus simples
- Server Actions intégrés
- Direction officielle de Next.js
- Meilleur SEO

**Alternative considérée** : Pages Router (rejeté car legacy)

---

### TypeScript strict mode
**Date** : Initialisation projet  
**Décision** : Activer strict mode TypeScript  
**Raison** :
- Catch les erreurs à la compilation
- Meilleure auto-complétion IDE
- Code plus maintenable
- Standard industrie

**Impact** : Temps de développement initial +10%, bugs production -50%

---

### Tailwind CSS v4
**Date** : Template TailAdmin  
**Décision** : Garder Tailwind CSS v4  
**Raison** :
- Déjà intégré dans TailAdmin
- Thème personnalisé prêt
- Dark mode intégré
- Très bon DX
- Performances optimales

**Alternative considérée** : CSS Modules, Styled Components (rejeté car moins adapté au template)

---

## Base de données

### Prisma + PostgreSQL
**Date** : À implémenter  
**Décision** : Utiliser Prisma comme ORM avec PostgreSQL  
**Raison** :
- Excellent TypeScript support
- Migrations gérées proprement
- Prisma Studio pour debug
- PostgreSQL : relationnel, ACID, performances
- Hébergement VPS compatible

**Alternatives considérées** :
- Drizzle ORM (trop récent)
- MongoDB (pas adapté au relationnel requis)
- Supabase (lock-in vendor)

**Schema** : Voir `database.md`

---

## Authentification

### NextAuth.js
**Date** : À implémenter  
**Décision** : NextAuth.js pour authentification  
**Raison** :
- Intégration native Next.js
- Support multi-providers (email, OAuth)
- JWT + sessions
- Sécurisé par défaut
- Gratuit et open-source

**Alternatives considérées** :
- Clerk (payant, over-engineering pour MVP)
- Auth0 (complexe, coûteux)
- Fait maison (risques sécurité)

**Config** : 
- Strategy : JWT
- Providers : Credentials (email/password) + Google OAuth
- Pages custom avec design TailAdmin

---

## Formulaires et validation

### React Hook Form + Zod
**Date** : À implémenter  
**Décision** : RHF pour formulaires, Zod pour validation  
**Raison** :
- RHF : performances (uncontrolled), DX excellent
- Zod : validation runtime + types TypeScript
- Intégration parfaite via @hookform/resolvers

**Exemple** : Voir validations dans `lib/validations/`

**Alternatives considérées** :
- Formik (moins performant)
- Yup (moins bon support TS que Zod)

---

## State Management

### Server State : React Server Components
**Date** : Initialisation projet  
**Décision** : Privilégier Server Components pour data fetching  
**Raison** :
- Pas de bundle client
- Data fetch côté serveur
- Pas de loading states
- SEO optimal

### Client State : useState + Context
**Date** : Initialisation projet  
**Décision** : useState pour local, Context pour global léger  
**Raison** :
- La plupart des states sont dans Server Components
- Context suffit pour theme, sidebar, modals
- Évite dépendance lourde

**Alternatives considérées** :
- Zustand (ajouter si vraiment besoin)
- Redux (over-engineering)
- Jotai/Recoil (pas nécessaire pour l'instant)

---

## Performance

### Dynamic imports pour charts
**Date** : Template TailAdmin  
**Décision** : Lazy load ApexCharts  
**Raison** :
- ApexCharts = 300kb
- Pas besoin côté serveur
- Améliore First Load JS

```typescript
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
```

---

### Images avec next/image
**Date** : Initialisation projet  
**Décision** : Utiliser next/image pour toutes les images  
**Raison** :
- Optimization automatique
- Lazy loading natif
- Responsive images
- WebP/AVIF automatique

---

## Styling

### Classes Tailwind personnalisées
**Date** : Template TailAdmin  
**Décision** : Définir variables CSS custom pour thème  
**Raison** :
- Dark mode simplifié
- Cohérence visuelle
- Maintenance facilitée

```css
--color-primary: #3C50E0;
--color-stroke: #E2E8F0;
```

---

### Composants réutilisables
**Date** : Template TailAdmin  
**Décision** : Privilégier composition plutôt que variants  
**Raison** :
- Plus flexible
- Moins de props complexes
- Tailwind-friendly

**Pattern** :
```tsx
// ✅ Bon
<div className="card">
  <div className="card-header">...</div>
  <div className="card-body">...</div>
</div>

// ❌ Éviter
<Card variant="primary" size="lg" shadow="md" />
```

---

## Déploiement

### VPS plutôt que Vercel
**Date** : Choix infrastructure  
**Décision** : Héberger sur VPS  
**Raison** :
- Contrôle total infrastructure
- Coûts prévisibles
- Pas de vendor lock-in
- Database sur même serveur

**Setup** :
- Docker pour containerisation
- Nginx en reverse proxy
- PM2 pour process management
- PostgreSQL en local

---

## À décider plus tard

### Email transactionnel
Options : SendGrid, Resend, Amazon SES  
→ Décision après MVP

### Storage fichiers
Options : S3, Cloudinary, local VPS  
→ Décision quand feature upload nécessaire

### Analytics
Options : Mixpanel, PostHog, Plausible  
→ Décision après lancement

### Monitoring
Options : Sentry, LogRocket, Datadog  
→ Décision avant prod

---

## Leçons apprises

*Cette section sera mise à jour au fur et à mesure du développement*

### Date : À remplir
**Problème** : Description  
**Solution** : Ce qui a marché  
**Apprentissage** : Ce qu'on ferait différemment

