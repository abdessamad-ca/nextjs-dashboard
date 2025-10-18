import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuration - Onboarding",
  description: "Configurez votre compte LeadGen AI",
};

/**
 * Page Onboarding
 * 
 * TODO Phase 4: Implémenter le wizard d'onboarding complet
 * - Étape 1: Informations entreprise (nom, secteur, site web)
 * - Étape 2: Définition client idéal (secteur, taille, postes, budget)
 * - Étape 3: Génération premiers leads par IA
 * 
 * Pour l'instant, placeholder avec message temporaire
 */
export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-lg border border-stroke bg-white p-12 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <span className="text-4xl">🚀</span>
          </div>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">
          Bienvenue sur LeadGen AI !
        </h1>
        
        <p className="mb-8 text-bodydark">
          Le wizard d'onboarding sera disponible dans la Phase 4.
          <br />
          Pour l'instant, vous pouvez accéder au dashboard.
        </p>
        
        <a
          href="/dashboard"
          className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-opacity-90"
        >
          Accéder au Dashboard →
        </a>
        
        <div className="mt-8 rounded-lg border border-stroke bg-gray-50 p-6 text-left dark:border-strokedark dark:bg-meta-4">
          <h3 className="mb-3 font-semibold text-black dark:text-white">
            📋 À venir en Phase 4:
          </h3>
          <ul className="space-y-2 text-sm text-bodydark">
            <li>• Wizard en 3 étapes</li>
            <li>• Configuration entreprise</li>
            <li>• Définition client idéal</li>
            <li>• Génération automatique de leads</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

