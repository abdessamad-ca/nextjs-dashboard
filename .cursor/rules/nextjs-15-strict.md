# Règles Next.js 15 Strictes

## Server vs Client Components

### TOUJOURS Server Component si :
- ✅ Pas d'interactivité (useState, useEffect)
- ✅ Pas d'event handlers (onClick, onChange, onSubmit)
- ✅ Pas de browser APIs (window, localStorage, document)
- ✅ Fetch de données initial
- ✅ Accès direct base de données
- ✅ Manipulation de secrets serveur

### Client Component UNIQUEMENT si :
- ✅ Utilise hooks React (useState, useEffect, useContext)
- ✅ Event handlers nécessaires
- ✅ Browser APIs (window, localStorage)
- ✅ Librairies client-only (react-apexcharts)
- ✅ Context providers

### Pattern de conversion
```tsx
// ❌ Mauvais - Tout en client
"use client";

export default function Page() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  
  return <List data={data} />;
}

// ✅ Bon - Server Component avec Client enfant
// app/page.tsx (Server Component)
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <InteractiveList initialData={data} />;
}

// components/InteractiveList.tsx (Client Component)
"use client";

export default function InteractiveList({ initialData }) {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState(null);
  
  return (
    <div onClick={() => setSelected(data[0])}>
      {/* Logique interactive */}
    </div>
  );
}
```

## Métadonnées obligatoires

### Chaque page doit exporter metadata
```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Titre Page | Mon SAAS Lead Generation",
  description: "Description SEO optimisée avec mots-clés",
  openGraph: {
    title: "Titre Page",
    description: "Description pour réseaux sociaux",
    images: ['/images/og-image.png'],
  },
};

export default function Page() {
  return <div>Contenu</div>;
}
```

### Metadata dynamique
```tsx
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lead = await getLeadById(params.id);
  
  return {
    title: `${lead.firstName} ${lead.lastName} | Leads`,
    description: `Détails du lead ${lead.company}`,
  };
}

export default async function LeadDetailPage({ params }: Props) {
  const lead = await getLeadById(params.id);
  return <div>{lead.firstName}</div>;
}
```

## Data Fetching

### Server Component avec fetch
```tsx
// app/leads/page.tsx
async function getLeads() {
  const res = await fetch('https://api.example.com/leads', {
    // Pour données dynamiques qui changent souvent
    cache: 'no-store',
    
    // OU pour revalidation périodique (toutes les 60s)
    // next: { revalidate: 60 }
    
    // OU pour données statiques
    // cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch leads');
  }
  
  return res.json();
}

export default async function LeadsPage() {
  const leads = await getLeads();
  
  return (
    <div>
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} />
      ))}
    </div>
  );
}
```

### Accès direct BDD avec Prisma
```tsx
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const stats = await prisma.lead.groupBy({
    by: ['status'],
    _count: true,
  });
  
  return <StatsDisplay stats={stats} />;
}
```

### Fetch parallèle
```tsx
// ✅ Bon - Fetch en parallèle
export default async function Page() {
  const [leads, users, campaigns] = await Promise.all([
    getLeads(),
    getUsers(),
    getCampaigns(),
  ]);
  
  return <Dashboard leads={leads} users={users} campaigns={campaigns} />;
}

// ❌ Mauvais - Fetch séquentiel
export default async function Page() {
  const leads = await getLeads();
  const users = await getUsers();      // Attend getLeads()
  const campaigns = await getCampaigns(); // Attend getUsers()
  
  return <Dashboard leads={leads} users={users} campaigns={campaigns} />;
}
```

## Server Actions pour mutations

### Créer un Server Action
```tsx
// app/actions/leads.ts
'use server'

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const leadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
});

export async function createLead(formData: FormData) {
  // Validation
  const validatedFields = leadSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    company: formData.get('company'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Création en BDD
  try {
    await prisma.lead.create({
      data: validatedFields.data,
    });
  } catch (error) {
    return {
      message: 'Erreur lors de la création du lead',
    };
  }

  // Revalidation du cache
  revalidatePath('/leads');
  
  return { success: true };
}
```

### Utiliser un Server Action
```tsx
// app/leads/new/page.tsx
import { createLead } from '@/app/actions/leads';

export default function NewLeadPage() {
  return (
    <form action={createLead}>
      <input name="firstName" required />
      <input name="lastName" required />
      <input name="email" type="email" required />
      <input name="company" />
      <button type="submit">Créer</button>
    </form>
  );
}
```

### Server Action avec useFormState (Client)
```tsx
"use client";

import { useFormState } from 'react-dom';
import { createLead } from '@/app/actions/leads';

export default function LeadForm() {
  const [state, formAction] = useFormState(createLead, null);
  
  return (
    <form action={formAction}>
      <input name="email" />
      {state?.errors?.email && (
        <p className="text-danger">{state.errors.email}</p>
      )}
      <button type="submit">Créer</button>
    </form>
  );
}
```

## Routing et Navigation

### Link pour navigation
```tsx
import Link from "next/link";

// ✅ Bon - Prefetch automatique
<Link href="/leads/123" className="text-primary hover:underline">
  Voir lead
</Link>

// ❌ Mauvais - Pas de prefetch
<a href="/leads/123">Voir lead</a>
```

### useRouter pour navigation programmatique
```tsx
"use client";

import { useRouter } from 'next/navigation';

export default function LeadCard({ leadId }: { leadId: string }) {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/leads/${leadId}`);
  };
  
  return <div onClick={handleClick}>Lead</div>;
}
```

### Redirect côté serveur
```tsx
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return <div>Protected content</div>;
}
```

## Images

### TOUJOURS utiliser next/image
```tsx
import Image from "next/image";

// ✅ Bon
<Image
  src="/images/user/user-01.png"
  alt="Profile picture"
  width={48}
  height={48}
  className="rounded-full"
  priority={true} // Pour images above the fold
/>

// Pour images externes
<Image
  src="https://example.com/image.jpg"
  alt="Description"
  width={800}
  height={600}
  // Ajouter domaine dans next.config.ts
/>

// ❌ Mauvais
<img src="/images/user.png" alt="User" />
```

## Layouts

### Layout racine (obligatoire)
```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mon SAAS",
    template: "%s | Mon SAAS",
  },
  description: "Description générale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```

### Layout imbriqué
```tsx
// app/(admin)/layout.tsx
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## Loading et Error States

### Loading.tsx
```tsx
// app/leads/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
}
```

### Error.tsx
```tsx
// app/leads/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="mb-4 text-2xl font-bold text-danger">
        Une erreur est survenue
      </h2>
      <p className="mb-6 text-body">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md bg-primary px-6 py-3 text-white hover:bg-opacity-90"
      >
        Réessayer
      </button>
    </div>
  );
}
```

## Performance

### Suspense pour chargement progressif
```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Chart />
      </Suspense>
    </div>
  );
}
```

### Dynamic imports
```tsx
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Chargement du graphique...</p>,
  ssr: false, // Si le composant ne supporte pas SSR
});
```

## Variables d'environnement

### Nomenclature
```env
# Public (accessible côté client) - Préfixe NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=https://api.example.com

# Privé (serveur uniquement)
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
```

### Utilisation
```tsx
// ✅ Accessible partout
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ✅ Accessible uniquement côté serveur
const dbUrl = process.env.DATABASE_URL;
```

## Interdictions

### ❌ JAMAIS faire
```tsx
// ❌ 'use client' sur une page qui pourrait être Server Component
"use client";

export default function Page() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data').then(/* ... */);
  }, []);
  
  return <div>{data}</div>;
}

// ❌ Fetch côté client quand possible côté serveur
"use client";

export default function Page() {
  useEffect(() => {
    fetch('/api/leads').then(/* ... */);
  }, []);
}

// ❌ any en TypeScript
const data: any = await fetch(/* ... */);

// ❌ <a> au lieu de <Link>
<a href="/leads">Leads</a>

// ❌ <img> au lieu de <Image>
<img src="/logo.png" />
```

