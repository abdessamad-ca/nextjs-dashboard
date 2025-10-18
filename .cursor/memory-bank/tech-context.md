# Contexte Technique

## Next.js 15 App Router

### Caractéristiques utilisées
- **App Router** : Toutes les routes dans `/src/app`
- **Server Components** : Par défaut pour performance optimale
- **Client Components** : Composants interactifs avec 'use client'
- **Layouts imbriqués** : Layout admin pour pages protégées
- **Metadata API** : Pour SEO et Open Graph
- **Server Actions** : Pour mutations de données

### Structure actuelle
```
/src/app
  /(admin)              # Routes protégées avec layout admin
    layout.tsx          # Sidebar + Header
    page.tsx            # Dashboard principal
  /(full-width-pages)   # Routes publiques sans sidebar
    /(auth)             # Authentification
    layout.tsx          # Layout simple
  layout.tsx            # Layout racine (HTML, fonts)
```

### Server vs Client Components

**Server Components (défaut)** :
- ✅ Fetch de données
- ✅ Accès direct BDD
- ✅ Secrets serveur
- ✅ Pas envoyé au client
- ❌ Pas de hooks (useState, useEffect)
- ❌ Pas d'event handlers

**Client Components ('use client')** :
- ✅ Interactivité (onClick, onChange)
- ✅ Hooks React
- ✅ Browser APIs (window, localStorage)
- ✅ Context providers
- ❌ Taille bundle augmentée

## React 19

### Nouvelles fonctionnalités
- **Actions** : Gestion simplifiée des formulaires
- **use hook** : Lecture de promesses/context
- **Optimistic updates** : UI optimiste
- **Server Actions** : Mutations côté serveur

## TypeScript

### Configuration stricte
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Principes
- ❌ Jamais `any` (utiliser `unknown` si nécessaire)
- ✅ Typer toutes les props
- ✅ Typer les states
- ✅ Typer les fonctions (params + return)
- ✅ Utiliser Zod pour validation runtime

## Tailwind CSS v4

### Configuration
- **Import** : Dans `globals.css` via `@import`
- **Dark mode** : Classe 'dark' sur `<html>`
- **Thème personnalisé** : Variables CSS custom
- **JIT** : Compilation à la demande

### Variables CSS TailAdmin
```css
--color-primary: #3C50E0;
--color-secondary: #80CAEE;
--color-stroke: #E2E8F0;
--color-body: #64748B;
--color-bodydark: #AEB7C0;
```

### Classes utilitaires personnalisées
- `text-primary` : Couleur primaire
- `bg-boxdark` : Background dark mode
- `border-stroke` : Bordure standard
- `shadow-default` : Ombre standard

## ApexCharts

### Intégration
- **Package** : `react-apexcharts`
- **Dynamic import** : Pour éviter SSR errors
- **Types** : `apexcharts` (devDependencies)

### Utilisation
```typescript
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
```

## JSVectorMap

### Utilisation
- Cartes interactives SVG
- Personnalisation couleurs
- Tooltips

## Performance

### Optimisations appliquées
1. **Server Components** par défaut
2. **Dynamic imports** pour charts
3. **Image optimization** avec `next/image`
4. **Font optimization** avec `next/font`

### À implémenter
- [ ] Code splitting par route
- [ ] Prefetching links
- [ ] Lazy loading images
- [ ] Memoization (useMemo, memo)
- [ ] Virtualization pour listes longues

## Sécurité

### Bonnes pratiques
- ✅ Variables d'environnement pour secrets
- ✅ Validation côté serveur (Zod)
- ✅ CSRF protection (Next.js intégré)
- ✅ Headers sécurisés (next.config)

### À implémenter
- [ ] Authentification (NextAuth.js)
- [ ] Authorisation basée sur rôles
- [ ] Rate limiting API
- [ ] Input sanitization
- [ ] HTTPS en production

## Base de données (à configurer)

### Stack recommandée
- **ORM** : Prisma
- **Database** : PostgreSQL
- **Hosting** : VPS ou Supabase

### Schéma initial suggéré
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  leads     Lead[]
  createdAt DateTime @default(now())
}

model Lead {
  id          String   @id @default(cuid())
  firstName   String
  lastName    String
  email       String
  company     String?
  score       Int      @default(0)
  status      LeadStatus @default(NEW)
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  CONVERTED
  LOST
}
```

## Déploiement

### Environnements
- **Development** : `npm run dev`
- **Production** : VPS

### Variables d'environnement requises
```env
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
# API keys pour génération de leads
```

