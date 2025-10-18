import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

export const metadata: Metadata = {
  title: "Génération de Leads B2B par IA | Trouvez des Clients Qualifiés",
  description:
    "Notre IA trouve et enrichit automatiquement des leads B2B ultra-qualifiés pour votre entreprise. Essai gratuit sans carte bancaire.",
  keywords: ["génération leads", "leads B2B", "prospection automatique", "IA"],
  openGraph: {
    title: "Génération de Leads B2B par IA",
    description: "Trouvez des leads B2B qualifiés automatiquement",
    type: "website",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-boxdark-2">
      {/* Navigation Marketing */}
      <nav className="sticky top-0 z-50 border-b border-stroke bg-white/80 backdrop-blur-md dark:border-strokedark dark:bg-boxdark/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xl font-bold text-white">L</span>
                </div>
                <span className="text-xl font-bold text-black dark:text-white">
                  LeadGen AI
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/pricing"
                className="text-sm font-medium text-body hover:text-primary dark:text-bodydark dark:hover:text-primary"
              >
                Tarifs
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-body hover:text-primary dark:text-bodydark dark:hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="/demo"
                className="text-sm font-medium text-body hover:text-primary dark:text-bodydark dark:hover:text-primary"
              >
                Démo
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-body hover:text-primary dark:text-bodydark dark:hover:text-primary"
              >
                À propos
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggleButton />
              
              <Link
                href="/signin"
                className="hidden text-sm font-medium text-body hover:text-primary dark:text-bodydark dark:hover:text-primary md:block"
              >
                Connexion
              </Link>
              
              <Link
                href="/signup"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-opacity-90"
              >
                Essayer Gratuitement
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main>{children}</main>

      {/* Footer Marketing */}
      <footer className="border-t border-stroke bg-gray-50 dark:border-strokedark dark:bg-boxdark">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Colonne 1: Logo + Description */}
            <div className="col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary dark:bg-blue-500">
                  <span className="text-xl font-bold text-white">L</span>
                </div>
                <span className="text-lg font-bold text-black dark:text-white">
                  LeadGen AI
                </span>
              </div>
              <p className="mt-4 text-sm text-bodydark dark:text-gray-400">
                Générez des leads B2B qualifiés automatiquement grâce à l'IA.
              </p>
            </div>

            {/* Colonne 2: Produit */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
                Produit
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Démo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3: Entreprise */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
                Entreprise
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:contact@leadgen.ai"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne 4: Légal */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
                Légal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/legal/privacy"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    CGU
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/cgv"
                    className="text-sm text-bodydark hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    CGV
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-stroke pt-8 dark:border-strokedark">
            <p className="text-center text-sm text-bodydark dark:text-gray-400">
              © {new Date().getFullYear()} LeadGen AI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

