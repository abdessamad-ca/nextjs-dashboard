import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Démo - Découvrez LeadGen AI en action",
  description: "Découvrez comment LeadGen AI peut transformer votre prospection B2B.",
};

export default function DemoPage() {
  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
            Découvrez LeadGen AI en action
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-bodydark">
            Voyez comment notre IA peut transformer votre prospection B2B en
            quelques minutes.
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-stroke bg-gray-100 shadow-xl dark:border-strokedark dark:bg-meta-4">
          <div className="flex aspect-video items-center justify-center">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg font-medium text-black dark:text-white">
                Vidéo de démonstration
              </p>
              <p className="mt-2 text-sm text-bodydark">
                Disponible prochainement
              </p>
            </div>
          </div>
        </div>

        {/* Features Demo */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-black dark:text-white">
            Ce que vous verrez dans la démo
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Définir votre client idéal
              </h3>
              <p className="text-sm text-bodydark">
                En quelques clics, configurez les critères de votre client
                parfait (secteur, taille, budget, etc.).
              </p>
            </div>

            <div className="rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                L'IA trouve vos leads
              </h3>
              <p className="text-sm text-bodydark">
                Regardez notre IA scanner le marché et identifier les meilleures
                opportunités en temps réel.
              </p>
            </div>

            <div className="rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Enrichissement automatique
              </h3>
              <p className="text-sm text-bodydark">
                Voir comment nous enrichissons chaque lead avec des données
                vérifiées (email, téléphone, LinkedIn, etc.).
              </p>
            </div>

            <div className="rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Séquences email
              </h3>
              <p className="text-sm text-bodydark">
                Créez et lancez des campagnes email personnalisées en quelques
                minutes.
              </p>
            </div>

            <div className="rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Analytics en temps réel
              </h3>
              <p className="text-sm text-bodydark">
                Suivez vos KPIs et optimisez vos campagnes grâce à notre
                dashboard intuitif.
              </p>
            </div>

            <div className="rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Intégrations CRM
              </h3>
              <p className="text-sm text-bodydark">
                Connectez LeadGen AI à vos outils existants (Salesforce,
                HubSpot, etc.).
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-600/5 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
            Prêt à essayer par vous-même ?
          </h2>
          <p className="mb-8 text-lg text-bodydark">
            Créez votre compte gratuit et générez vos premiers leads en moins de
            5 minutes.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-primary px-8 py-4 text-base font-medium text-white hover:bg-opacity-90"
          >
            Commencer Gratuitement →
          </Link>
        </div>
      </div>
    </div>
  );
}

