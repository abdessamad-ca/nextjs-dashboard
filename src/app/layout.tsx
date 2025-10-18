import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "LeadGen AI - Génération de Leads B2B par Intelligence Artificielle",
    template: "%s | LeadGen AI",
  },
  description:
    "Générez des leads B2B ultra-qualifiés automatiquement grâce à notre IA. Enrichissement automatique, séquences email et intégrations CRM. Essai gratuit 14 jours.",
  keywords: [
    "génération leads",
    "leads B2B",
    "prospection automatique",
    "intelligence artificielle",
    "CRM",
    "enrichissement leads",
    "automation marketing",
  ],
  authors: [{ name: "LeadGen AI" }],
  creator: "LeadGen AI",
  publisher: "LeadGen AI",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "LeadGen AI",
    title: "LeadGen AI - Génération de Leads B2B par IA",
    description:
      "Générez des leads B2B ultra-qualifiés automatiquement grâce à notre IA",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadGen AI - Génération de Leads B2B par IA",
    description:
      "Générez des leads B2B ultra-qualifiés automatiquement grâce à notre IA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
