/**
 * Supabase Server-Side
 * 
 * Client Supabase pour utilisation côté serveur (Server Components, Server Actions)
 * Gère automatiquement les cookies pour les sessions utilisateur
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Créer un client Supabase pour Server Components
 * 
 * Usage:
 * ```typescript
 * import { createClient } from '@/lib/supabase/server';
 * 
 * export default async function Page() {
 *   const supabase = await createClient();
 *   const { data } = await supabase.auth.getUser();
 *   return <div>Hello {data.user?.email}</div>;
 * }
 * ```
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

/**
 * Créer un client Supabase avec Service Role (admin)
 * 
 * ⚠️ ATTENTION : À utiliser UNIQUEMENT côté serveur pour opérations admin
 * Bypasse Row Level Security (RLS)
 * 
 * Usage:
 * ```typescript
 * import { createAdminClient } from '@/lib/supabase/server';
 * 
 * export async function deleteUser(userId: string) {
 *   const supabase = createAdminClient();
 *   await supabase.auth.admin.deleteUser(userId);
 * }
 * ```
 */
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get() {
          return undefined;
        },
        set() {},
        remove() {},
      },
    }
  );
}

/**
 * Helper pour obtenir l'utilisateur connecté (Server-side)
 * 
 * @throws Error si l'utilisateur n'est pas connecté
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  return user;
}

/**
 * Helper pour vérifier si l'utilisateur est admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getUser();
    
    // Récupérer le rôle depuis votre table users
    const supabase = await createClient();
    const { data } = await supabase
      .from('users')
      .select('role')
      .eq('supabase_id', user.id)
      .single();

    return data?.role === 'ADMIN';
  } catch {
    return false;
  }
}

/**
 * Helper pour obtenir l'organisation de l'utilisateur
 */
export async function getUserOrganization() {
  const user = await getUser();
  const supabase = await createClient();

  const { data } = await supabase
    .from('user_organizations')
    .select(`
      role,
      organization:organizations(*)
    `)
    .eq('user_id', user.id)
    .single();

  return data;
}

