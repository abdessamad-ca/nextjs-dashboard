import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos - Notre Histoire | LeadGen AI",
  description: "Découvrez l'histoire de LeadGen AI et notre mission.",
};

export default function AboutPage() {
  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
            Notre Mission
          </h1>
          <p className="text-xl text-bodydark">
            Rendre la génération de leads B2B accessible à toutes les
            entreprises.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16 space-y-6 text-bodydark">
          <p className="text-lg">
            Chez LeadGen AI, nous croyons que chaque entreprise, quelle que soit
            sa taille, devrait avoir accès à des leads B2B de qualité sans y
            passer des heures.
          </p>

          <p>
            Nous avons créé LeadGen AI après avoir constaté que la prospection
            B2B traditionnelle était chronophage, coûteuse et souvent peu
            efficace. Les équipes commerciales passaient 60% de leur temps à
            chercher des leads au lieu de vendre.
          </p>

          <p>
            Grâce à l'intelligence artificielle et au machine learning, nous
            avons développé une plateforme qui automatise entièrement ce
            processus : recherche, qualification, enrichissement et prise de
            contact.
          </p>

          <p>
            Aujourd'hui, plus de 500 entreprises utilisent LeadGen AI pour
            générer des leads qualifiés et scaler leur croissance.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-black dark:text-white">
            Nos Valeurs
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-stroke bg-white p-6 text-center dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex justify-center">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Qualité
              </h3>
              <p className="text-sm text-bodydark">
                Nous privilégions la qualité à la quantité. Chaque lead doit
                avoir un fort potentiel.
              </p>
            </div>

            <div className="rounded-lg border border-stroke bg-white p-6 text-center dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Innovation
              </h3>
              <p className="text-sm text-bodydark">
                Nous investissons massivement en R&D pour rester à la pointe de
                l'IA.
              </p>
            </div>

            <div className="rounded-lg border border-stroke bg-white p-6 text-center dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4 flex justify-center">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Transparence
              </h3>
              <p className="text-sm text-bodydark">
                Pas de frais cachés, pas de clauses ambiguës. Tout est clair et
                transparent.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16 rounded-2xl border border-stroke bg-white p-12 dark:border-strokedark dark:bg-boxdark">
          <h2 className="mb-8 text-center text-3xl font-bold text-black dark:text-white">
            LeadGen AI en chiffres
          </h2>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-bodydark">Entreprises clientes</div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">1M+</div>
              <div className="text-sm text-bodydark">Leads générés</div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-bodydark">Satisfaction client</div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">10x</div>
              <div className="text-sm text-bodydark">Gain de temps moyen</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
            Une question ? Parlons-en !
          </h2>
          <p className="mb-6 text-bodydark">
            Notre équipe est disponible pour répondre à toutes vos questions.
          </p>
          <a
            href="mailto:contact@leadgen.ai"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-opacity-90"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
}

