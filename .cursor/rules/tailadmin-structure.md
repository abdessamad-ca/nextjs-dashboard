# Règles TailAdmin Structure

## Organisation des fichiers

### Créer une nouvelle page
1. Créer dans `/src/app/(admin)/nom-page/page.tsx`
2. Importer le layout approprié
3. Ajouter dans Sidebar navigation si nécessaire
4. Ajouter Breadcrumb pour navigation

### Créer un nouveau composant
1. Créer dans `/src/components/NomCategorie/NomComposant.tsx`
2. Définir l'interface TypeScript des props
3. Exporter par défaut le composant
4. Types spécifiques dans le même fichier ou `/lib/validations/`

### Ajouter un type
1. Fichiers de validation dans `/lib/validations/`
2. Utiliser Zod pour les schémas
3. Exporter les types inférés

## Patterns obligatoires

### Page avec Layout Admin
```tsx
import { Metadata } from "next";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "Titre Page | Mon SAAS",
  description: "Description SEO de la page",
};

export default function MaPage() {
  return (
    <>
      <PageBreadCrumb pageName="Titre Page" />
      
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Contenu de la page */}
      </div>
    </>
  );
}
```

### Page pleine largeur (auth, error)
```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | Mon SAAS",
  description: "Connectez-vous à votre compte",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Contenu */}
    </div>
  );
}
```

### Composant avec Client interactivity
```tsx
"use client";

import { useState } from "react";

interface MonComposantProps {
  title: string;
  onAction?: () => void;
}

const MonComposant: React.FC<MonComposantProps> = ({ 
  title,
  onAction 
}) => {
  const [state, setState] = useState<string>("");
  
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {title}
        </h3>
      </div>
      <div className="p-7">
        {/* Contenu */}
      </div>
    </div>
  );
};

export default MonComposant;
```

## Classes Tailwind TailAdmin standards

### Container card standard
```tsx
className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
```

### Header de card
```tsx
className="border-b border-stroke px-7 py-4 dark:border-strokedark"
```

### Corps de card
```tsx
className="p-7"
// ou avec padding responsive
className="p-4 md:p-6 xl:p-7.5"
```

### Grille responsive
```tsx
// 1 colonne mobile, 2 tablette, 4 desktop
className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
```

### Texte
```tsx
// Titre principal
className="text-title-xl font-bold text-black dark:text-white"

// Titre section
className="text-xl font-semibold text-black dark:text-white"

// Corps de texte
className="text-base text-body dark:text-bodydark"

// Texte secondaire
className="text-sm text-bodydark2"
```

### Couleurs thématiques
- Primary: `text-primary` `bg-primary` `border-primary`
- Success: `text-success` `bg-success` `border-success`
- Warning: `text-warning` `bg-warning` `border-warning`
- Danger: `text-danger` `bg-danger` `border-danger`
- Meta (gris): `text-meta-3` `bg-meta-3`

### Boutons
```tsx
// Primary
className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"

// Secondary
className="inline-flex items-center justify-center rounded-md border border-stroke px-10 py-4 text-center font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"

// Danger
className="inline-flex items-center justify-center rounded-md bg-danger px-10 py-4 text-center font-medium text-white hover:bg-opacity-90"
```

### Input/Select
```tsx
// Input standard
className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

// Select
className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
```

## Structure de navigation

### Ajout dans Sidebar
```tsx
// Dans src/layout/AppSidebar.tsx
const menuItems = [
  {
    title: "Menu Principal",
    items: [
      {
        label: "Dashboard",
        route: "/",
        icon: <DashboardIcon />
      },
      {
        label: "Mes Leads",
        route: "/leads",
        icon: <UsersIcon />,
        children: [
          {
            label: "Tous les leads",
            route: "/leads"
          },
          {
            label: "Nouveau lead",
            route: "/leads/new"
          }
        ]
      }
    ]
  }
];
```

## Gestion des états

### Loading states
```tsx
{isLoading ? (
  <div className="flex h-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
  </div>
) : (
  // Contenu
)}
```

### Empty states
```tsx
<div className="flex flex-col items-center justify-center py-16">
  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary bg-opacity-10">
    <Icon className="text-primary" />
  </div>
  <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
    Aucun résultat
  </h3>
  <p className="mb-6 text-center text-body dark:text-bodydark">
    Commencez par créer votre premier élément
  </p>
  <button className="rounded-md bg-primary px-6 py-3 text-white hover:bg-opacity-90">
    Créer
  </button>
</div>
```

## Accessibilité

### Labels obligatoires
```tsx
// ✅ Bon
<label htmlFor="email" className="mb-2.5 block text-black dark:text-white">
  Email
</label>
<input id="email" type="email" />

// ❌ Mauvais
<input type="email" placeholder="Email" />
```

### Boutons descriptifs
```tsx
// ✅ Bon
<button aria-label="Supprimer le lead">
  <TrashIcon />
</button>

// ❌ Mauvais
<button>
  <TrashIcon />
</button>
```

## Responsive Design

### Breakpoints Tailwind
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

### Pattern mobile-first
```tsx
// ✅ Bon - Mobile first
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// ❌ Éviter - Desktop first
className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1"
```

## Performance

### Dynamic imports pour composants lourds
```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(
  () => import('@/components/charts/ChartOne'),
  { 
    loading: () => <p>Chargement...</p>,
    ssr: false 
  }
);
```

### Images optimisées
```tsx
import Image from "next/image";

<Image
  src="/images/user/user-01.png"
  alt="User"
  width={48}
  height={48}
  className="rounded-full"
/>
```

## Tests de qualité

### Checklist avant commit
- [ ] Pas d'erreurs TypeScript
- [ ] ESLint pass
- [ ] Prettier formaté
- [ ] Dark mode fonctionne
- [ ] Responsive sur mobile
- [ ] Accessibilité (labels, aria-*)
- [ ] Performance (pas de re-renders inutiles)

