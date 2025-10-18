# Supabase Integration

Guide complet d'intégration Supabase avec Next.js 15 + Prisma

---

## Configuration initiale

### 1. Installation des dépendances

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Variables d'environnement

Créer/mettre à jour `.env` :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre_anon_key"
SUPABASE_SERVICE_ROLE_KEY="votre_service_role_key"

# Database URL (pointer vers Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"
```

### 3. Configuration Supabase Dashboard

#### a) Créer le projet Supabase

1. Aller sur https://supabase.com
2. Créer nouveau projet
3. Noter les credentials

#### b) Configurer Storage

Créer les buckets suivants :

```sql
-- Via SQL Editor Supabase
INSERT INTO storage.buckets (id, name, public) VALUES
  ('imports', 'imports', false),
  ('avatars', 'avatars', true),
  ('exports', 'exports', false),
  ('documents', 'documents', false);
```

#### c) Activer Row Level Security (RLS)

Voir le fichier `RLS_POLICIES.md` pour les policies complètes.

---

## Utilisation

### Client-Side (Client Components)

Pour les actions utilisateur côté client :

```typescript
'use client';

import { supabase, uploadFile } from '@/lib/supabase/client';

export default function UploadForm() {
  const handleUpload = async (file: File) => {
    // Upload vers Supabase Storage
    const url = await uploadFile('imports', `${Date.now()}.csv`, file);
    console.log('File uploaded:', url);
  };

  return <input type="file" onChange={(e) => handleUpload(e.target.files![0])} />;
}
```

### Server-Side (Server Components)

Pour fetch de données côté serveur :

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = createClient();
  
  // Obtenir utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/signin');
  }

  return <div>Welcome {user.email}</div>;
}
```

### Server Actions

Pour mutations de données :

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createLead(formData: FormData) {
  const supabase = createClient();
  
  // Obtenir utilisateur
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  // Créer lead via Prisma (RLS Supabase vérifie les permissions)
  const lead = await prisma.lead.create({
    data: {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      ownerId: user.id,
    },
  });

  revalidatePath('/leads');
  return lead;
}
```

---

## Authentification

### Sign Up

```typescript
'use client';

import { supabase } from '@/lib/supabase/client';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) throw error;

  // Créer l'utilisateur dans votre table users via Prisma
  // (voir Database Triggers ci-dessous)

  return data;
}
```

### Sign In

```typescript
'use client';

import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function SignInForm() {
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSignIn(
        formData.get('email') as string,
        formData.get('password') as string
      );
    }}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Sign Out

```typescript
'use client';

import { signOut } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
```

---

## Database Triggers (Synchronisation Auth → Users table)

Créer un trigger Supabase pour synchroniser automatiquement :

```sql
-- Dans Supabase SQL Editor

-- Function pour créer l'utilisateur dans votre table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (supabase_id, email, name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger sur création d'utilisateur dans auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function pour mettre à jour lors de modification
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET
    email = NEW.email,
    email_verified = NEW.email_confirmed_at,
    last_login_at = NEW.last_sign_in_at,
    updated_at = NOW()
  WHERE supabase_id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger sur mise à jour
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_update();
```

---

## Storage

### Upload de fichier

```typescript
import { uploadFile } from '@/lib/supabase/client';

// Upload CSV pour import
const csvUrl = await uploadFile(
  'imports',
  `${userId}/${Date.now()}.csv`,
  file
);

// Upload avatar
const avatarUrl = await uploadFile(
  'avatars',
  `${userId}/avatar.jpg`,
  imageFile
);
```

### Download de fichier

```typescript
import { supabase } from '@/lib/supabase/client';

const { data, error } = await supabase.storage
  .from('imports')
  .download('path/to/file.csv');

if (data) {
  // Créer URL pour download
  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'file.csv';
  a.click();
}
```

---

## Realtime (Optionnel)

Écouter les changements en temps réel :

```typescript
'use client';

import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function RealtimeLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Subscription aux changements
    const channel = supabase
      .channel('leads_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
        },
        (payload) => {
          console.log('Change received!', payload);
          // Mettre à jour l'état
          if (payload.eventType === 'INSERT') {
            setLeads((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <div>Leads en temps réel</div>;
}
```

---

## Middleware (Refresh Session)

Créer `middleware.ts` à la racine :

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

---

## Admin Operations

Pour opérations admin (bypass RLS) :

```typescript
import { createAdminClient } from '@/lib/supabase/server';

export async function deleteUserAccount(userId: string) {
  const supabase = createAdminClient();

  // Supprimer de auth.users (cascade vers public.users)
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw error;
}
```

---

## Troubleshooting

### Erreur "Invalid JWT"
- Vérifier que les variables d'environnement sont correctes
- Restart du serveur après modification .env

### RLS bloque les requêtes
- Vérifier que les policies sont créées (voir `RLS_POLICIES.md`)
- Utiliser `createAdminClient()` temporairement pour tester

### Upload échoue
- Vérifier que le bucket existe
- Vérifier les permissions Storage dans Supabase Dashboard

### Session ne persiste pas
- Vérifier que le middleware est configuré
- Vérifier les cookies dans DevTools

---

## Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

