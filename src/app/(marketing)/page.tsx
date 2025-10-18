import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Génération de Leads B2B par IA | LeadGen AI",
  description:
    "Trouvez des leads B2B qualifiés automatiquement grâce à notre IA. Enrichissement automatique, séquences email, et intégrations CRM.",
  openGraph: {
    title: "Génération de Leads B2B par IA",
    description:
      "Trouvez des leads B2B qualifiés automatiquement grâce à notre IA",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-primary dark:bg-blue-400" />
              10,000+ Leads générés ce mois-ci
            </div>

            {/* Titre avec gradient */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
              Trouvez des{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                Leads B2B Qualifiés
              </span>
              <br />
              en Pilote Automatique
            </h1>

            {/* Sous-titre */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-bodydark">
              Notre IA analyse le marché, trouve vos clients idéaux, enrichit
              leurs données et lance vos campagnes automatiquement. Gagnez 10x
              en temps de prospection.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="w-full rounded-lg bg-primary px-8 py-4 text-center text-base font-medium text-white hover:bg-opacity-90 sm:w-auto"
              >
                Essayer Gratuitement →
              </Link>
              <Link
                href="/demo"
                className="w-full rounded-lg border border-stroke bg-white px-8 py-4 text-center text-base font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-meta-4 sm:w-auto"
              >
                Voir la Démo
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-bodydark">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 sur 200+ avis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Données sécurisées RGPD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Bénéfices (placeholder) */}
      <section className="bg-gray-50 px-4 py-20 dark:bg-boxdark sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
              Pourquoi choisir LeadGen AI ?
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-bodydark">
              Automatisez votre prospection et concentrez-vous sur la vente.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Benefit 1 */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-sm dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-blue-400/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                Leads Ultra-Qualifiés
              </h3>
              <p className="text-bodydark">
                Notre IA analyse 50+ critères pour ne vous proposer que les
                leads avec le plus fort potentiel de conversion.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-sm dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-purple-400/20">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                Gain de Temps 10x
              </h3>
              <p className="text-bodydark">
                Automatisez la recherche, l'enrichissement et la qualification
                de vos leads. Passez directement à la vente.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-sm dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-pink-400/20">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                Séquences Automatiques
              </h3>
              <p className="text-bodydark">
                Lancez des campagnes email personnalisées et automatisées pour
                nurturer vos leads jusqu'à la conversion.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-primary hover:underline dark:text-blue-400"
            >
              Voir tous les bénéfices →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-600/5 p-12 text-center dark:border-blue-400/30 dark:from-blue-400/10 dark:to-purple-400/10">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
            Prêt à générer vos premiers leads ?
          </h2>
          <p className="mb-8 text-lg text-bodydark dark:text-gray-300">
            Essayez gratuitement pendant 14 jours. Sans carte bancaire.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-primary px-8 py-4 text-base font-medium text-white hover:bg-opacity-90 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Commencer Gratuitement →
          </Link>
        </div>
      </section>
    </div>
  );
}

