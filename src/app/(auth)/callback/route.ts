import { NextResponse, type NextRequest } from "next/server";

/**
 * Callback route pour Supabase Auth OAuth
 * 
 * Cette route sera complétée dans la Phase 3 (Auth Supabase).
 * Pour l'instant, elle redirige simplement vers la page de connexion.
 * 
 * TODO Phase 3:
 * - Échanger le code OAuth contre une session
 * - Créer l'utilisateur dans la BDD si nouveau
 * - Vérifier si onboarding complété
 * - Rediriger vers /onboarding ou /dashboard
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // Pour l'instant, simple redirection
  // Sera implémenté complètement en Phase 3
  if (code) {
    // TODO: Implémenter échange code → session
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  // Erreur : pas de code
  return NextResponse.redirect(`${requestUrl.origin}/signin?error=auth_failed`);
}

