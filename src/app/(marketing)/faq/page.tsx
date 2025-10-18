import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | LeadGen AI",
  description: "Toutes les réponses à vos questions sur LeadGen AI.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment fonctionne LeadGen AI ?",
      answer:
        "Notre IA analyse le marché B2B en temps réel, identifie les entreprises correspondant à votre profil client idéal, enrichit leurs données via des sources vérifiées, et vous propose une liste de leads qualifiés prêts à être contactés.",
    },
    {
      question: "D'où proviennent les leads ?",
      answer:
        "Nous agrégeons des données publiques et vérifiées provenant de sources légales (réseaux professionnels, registres d'entreprises, sites web, etc.). Toutes nos sources sont conformes RGPD.",
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer:
        "Oui, absolument. Vous pouvez annuler votre abonnement à tout moment depuis votre espace de facturation. Aucun engagement, aucune pénalité.",
    },
    {
      question: "Les leads sont-ils vraiment qualifiés ?",
      answer:
        "Oui, notre IA analyse plus de 50 critères (secteur, taille, budget, signaux d'achat, etc.) pour ne vous proposer que les leads avec le plus fort potentiel de conversion pour votre offre.",
    },
    {
      question: "Proposez-vous une période d'essai ?",
      answer:
        "Oui, vous bénéficiez de 14 jours d'essai gratuit sur tous nos plans. Aucune carte bancaire requise pour démarrer.",
    },
    {
      question: "Puis-je intégrer LeadGen AI avec mon CRM ?",
      answer:
        "Oui, nous proposons des intégrations natives avec Salesforce, HubSpot, Pipedrive et d'autres CRM populaires. Vous pouvez également utiliser notre API ou Zapier pour des intégrations personnalisées.",
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer:
        "La sécurité est notre priorité. Vos données sont chiffrées, stockées sur des serveurs sécurisés en Europe, et nous sommes 100% conformes RGPD. Nous ne partageons jamais vos données avec des tiers.",
    },
    {
      question: "Puis-je changer de plan en cours d'abonnement ?",
      answer:
        "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements sont appliqués immédiatement et la facturation est ajustée au prorata.",
    },
  ];

  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
            Questions Fréquentes
          </h1>
          <p className="text-lg text-bodydark">
            Vous avez une question ? Nous avons la réponse.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark"
            >
              <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                {faq.question}
              </h3>
              <p className="text-bodydark">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 rounded-2xl border border-stroke bg-gray-50 p-8 text-center dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="mb-4 text-bodydark">
            Notre équipe est là pour vous aider.
          </p>
          <a
            href="mailto:contact@leadgen.ai"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
}

