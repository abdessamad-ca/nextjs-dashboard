# Guide des Composants TailAdmin

## Composants de Layout

### AppHeader
**Localisation** : `src/layout/AppHeader.tsx`

**Features** :
- Barre de recherche
- Notifications dropdown
- User dropdown avec profil
- Dark mode toggle
- Responsive (burger menu mobile)

**Utilisation** :
```tsx
import AppHeader from "@/layout/AppHeader";

// Utilisé automatiquement dans le layout admin
```

### AppSidebar
**Localisation** : `src/layout/AppSidebar.tsx`

**Features** :
- Navigation multi-niveau
- Collapsible
- Active link highlighting
- Icônes pour chaque menu
- Responsive (overlay mobile)

**Ajout d'un menu** :
```tsx
// Dans AppSidebar.tsx
{
  title: "Mes Leads",
  href: "/leads",
  icon: <UserIcon />,
  children: [
    { title: "Tous les leads", href: "/leads" },
    { title: "Nouveau lead", href: "/leads/new" }
  ]
}
```

### Backdrop
**Localisation** : `src/layout/Backdrop.tsx`

**Utilisation** : Overlay pour modales et sidebar mobile

## Composants de données

### DataStats Cards
**Localisation** : `src/components/ecommerce/`

**Types disponibles** :
- `DataStatsOne` : Card simple avec icône
- `DataStatsTwo` : Card avec graphique sparkline
- `DataStatsThree` : Card avec progression

**Exemple** :
```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
  <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
      {/* Icône */}
    </div>
    <div className="mt-4 flex items-end justify-between">
      <div>
        <h4 className="text-title-md font-bold text-black dark:text-white">
          3.456
        </h4>
        <span className="text-sm font-medium">Total Leads</span>
      </div>
      <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
        +2.5%
      </span>
    </div>
  </div>
</div>
```

### Tables
**Localisation** : `src/components/tables/`

**TableOne** : Table simple avec actions
```tsx
import TableOne from "@/components/tables/TableOne";

<TableOne />
```

**Structure personnalisée** :
```tsx
<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="px-4 py-6 md:px-6 xl:px-7.5">
    <h4 className="text-xl font-semibold text-black dark:text-white">
      Mes Leads
    </h4>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="px-4 py-4 font-medium text-black dark:text-white">
            Nom
          </th>
          {/* Autres colonnes */}
        </tr>
      </thead>
      <tbody>
        {/* Lignes */}
      </tbody>
    </table>
  </div>
</div>
```

### Charts
**Localisation** : `src/components/charts/`

**LineChart** : Graphique ligne (évolution temporelle)
**BarChart** : Graphique barres (comparaisons)

**Utilisation** :
```tsx
import dynamic from 'next/dynamic';

const LineChart = dynamic(
  () => import('@/components/charts/line/LineChart'),
  { ssr: false }
);

<div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
  <LineChart />
</div>
```

## Composants de formulaires

### Éléments de base
**Localisation** : `src/components/form/`

**Input text** :
```tsx
<div className="mb-4.5">
  <label className="mb-2.5 block text-black dark:text-white">
    Email
  </label>
  <input
    type="email"
    placeholder="Entrez votre email"
    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
  />
</div>
```

**Textarea** :
```tsx
<textarea
  rows={6}
  placeholder="Message"
  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
></textarea>
```

**Select** :
```tsx
<select className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
  <option value="">Sélectionner</option>
  <option value="1">Option 1</option>
</select>
```

**Checkbox** :
```tsx
<label className="flex cursor-pointer select-none items-center">
  <div className="relative">
    <input type="checkbox" className="sr-only" />
    <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-primary dark:border-strokedark">
      <span className="opacity-0">
        <CheckIcon />
      </span>
    </div>
  </div>
  Label text
</label>
```

## Composants UI

### Alerts
**Localisation** : `src/components/ui/`

**Types** :
- Success (vert)
- Warning (orange)
- Error (rouge)
- Info (bleu)

**Exemple** :
```tsx
<div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24]">
  <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning">
    <AlertIcon />
  </div>
  <div className="w-full">
    <h5 className="mb-3 font-semibold text-[#9D5425]">
      Attention
    </h5>
    <p className="text-[#D0915C]">
      Message d'alerte
    </p>
  </div>
</div>
```

### Buttons
```tsx
// Primary
<button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90">
  Enregistrer
</button>

// Secondary
<button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
  Annuler
</button>
```

### Badges
```tsx
// Success
<span className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
  Actif
</span>

// Warning
<span className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
  En attente
</span>

// Danger
<span className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">
  Inactif
</span>
```

### Breadcrumb
**Localisation** : `src/components/common/PageBreadCrumb.tsx`

```tsx
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

<PageBreadCrumb pageName="Gestion des Leads" />
```

## Hooks personnalisés

### useModal
**Localisation** : `src/hooks/useModal.ts`

```tsx
import useModal from "@/hooks/useModal";

const { isOpen, openModal, closeModal } = useModal();

<button onClick={openModal}>Ouvrir</button>

{isOpen && (
  <div className="modal">
    {/* Contenu modal */}
    <button onClick={closeModal}>Fermer</button>
  </div>
)}
```

### useGoBack
**Localisation** : `src/hooks/useGoBack.ts`

```tsx
import useGoBack from "@/hooks/useGoBack";

const goBack = useGoBack();

<button onClick={goBack}>Retour</button>
```

## Context

### ThemeContext
**Localisation** : `src/context/ThemeContext.tsx`

Gestion du dark mode (déjà intégré dans le layout)

### SidebarContext
**Localisation** : `src/context/SidebarContext.tsx`

Gestion de l'état du sidebar (ouvert/fermé)

## Icônes

**Localisation** : `src/icons/`

48 icônes SVG disponibles. Import depuis :
```tsx
import { IconName } from "@/icons";
```

Icônes principales : user, envelope, lock, calendar, chart, table, settings, etc.

