import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarifs - LeadGen AI",
  description:
    "Choisissez le plan qui correspond à vos besoins. Starter, Pro ou Enterprise.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "49€",
      period: "par mois",
      description: "Parfait pour démarrer la génération de leads",
      features: [
        "500 leads / mois",
        "1 utilisateur",
        "5 campagnes actives",
        "Export CSV",
        "Email support",
        "Enrichissement basique",
      ],
      cta: "Commencer",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "99€",
      period: "par mois",
      description: "Pour les équipes qui veulent scaler",
      features: [
        "2,000 leads / mois",
        "3 utilisateurs",
        "20 campagnes actives",
        "Export CSV + API",
        "Séquences email automatiques",
        "Enrichissement avancé",
        "Intégrations CRM",
        "Support prioritaire",
      ],
      cta: "Essayer Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "249€",
      period: "par mois",
      description: "Pour les grandes équipes et besoins spécifiques",
      features: [
        "Leads illimités",
        "10 utilisateurs",
        "Campagnes illimitées",
        "API complète",
        "White-label",
        "Webhooks personnalisés",
        "Support dédié 24/7",
        "Onboarding personnalisé",
      ],
      cta: "Contacter les ventes",
      highlighted: false,
    },
  ];

  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
            Tarifs simples et transparents
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-bodydark">
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez
            à tout moment.
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-primary bg-white shadow-xl dark:bg-boxdark"
                  : "border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                  Le plus populaire
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-bodydark">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-black dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-bodydark">/ {plan.period}</span>
                </div>
              </div>

              <Link
                href="/signup"
                className={`mb-6 block w-full rounded-lg py-3 text-center font-medium ${
                  plan.highlighted
                    ? "bg-primary text-white hover:bg-opacity-90"
                    : "border border-stroke bg-white text-black hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-meta-4"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-bodydark"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ rapide */}
        <div className="mt-16 text-center">
          <p className="text-bodydark">
            Des questions ?{" "}
            <Link href="/faq" className="text-primary hover:underline">
              Consultez notre FAQ
            </Link>{" "}
            ou{" "}
            <a
              href="mailto:contact@leadgen.ai"
              className="text-primary hover:underline"
            >
              contactez-nous
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

