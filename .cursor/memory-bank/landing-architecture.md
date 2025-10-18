# Architecture Landing + Product - Lead Generation B2B

Architecture inspirée de MeetSponsors, adaptée pour un SAAS de génération de leads B2B avec Next.js 15, Supabase Auth, et Prisma.

---

## 🎯 Vue d'Ensemble

### Concept Principal
**"Trouvez des leads B2B qualifiés prêts à acheter"**

Comme MeetSponsors analyse YouTube pour trouver des sponsors, votre SAAS analyse le marché B2B pour trouver des leads qualifiés selon le profil de l'entreprise cliente.

### Flow Utilisateur
```
Landing → Essai Gratuit (Email + Domaine Entreprise) 
→ Supabase Auth → Onboarding → Génération Leads IA 
→ Dashboard → Export/Séquences Email → Upgrade
```

---

## 📁 Arborescence App Router

```
/src/app/
├── (marketing)/              # Landing pages (layout sans sidebar)
│   ├── layout.tsx           # Layout marketing (NavBar + Footer)
│   ├── page.tsx             # Homepage avec sections
│   ├── pricing/             
│   │   └── page.tsx         # Plans tarifaires
│   ├── faq/
│   │   └── page.tsx         # FAQ Accordion
│   ├── demo/
│   │   └── page.tsx         # Demo interactive (sans auth)
│   └── about/
│       └── page.tsx         # Histoire fondateur + équipe
│
├── (auth)/                   # Routes auth (layout plein écran)
│   ├── layout.tsx           # Layout auth simple
│   ├── signin/
│   │   └── page.tsx         # Connexion Supabase
│   ├── signup/
│   │   └── page.tsx         # Inscription + Premier onboarding
│   └── callback/
│       └── route.ts         # Callback Supabase Auth
│
├── (dashboard)/              # App protégée (layout TailAdmin)
│   ├── layout.tsx           # Layout avec Sidebar TailAdmin
│   ├── page.tsx             # Dashboard principal
│   ├── onboarding/
│   │   └── page.tsx         # Wizard onboarding 3 étapes
│   ├── leads/
│   │   ├── page.tsx         # Liste leads
│   │   ├── [id]/page.tsx    # Détail lead
│   │   └── new/page.tsx     # Import ou génération IA
│   ├── campaigns/
│   │   ├── page.tsx         # Liste campagnes email
│   │   └── [id]/page.tsx    # Détail campagne
│   ├── sequences/
│   │   └── page.tsx         # Séquences email auto
│   ├── analytics/
│   │   └── page.tsx         # Analytics avancés
│   └── settings/
│       ├── page.tsx         # Paramètres généraux
│       ├── billing/page.tsx # Gestion abonnement Stripe
│       ├── team/page.tsx    # Gestion équipe
│       └── integrations/    # Webhooks, CRM, etc.
│           └── page.tsx
│
├── api/
│   ├── auth/[...nextauth]/  # Supabase Auth callback
│   │   └── route.ts
│   ├── webhooks/
│   │   └── stripe/          # Webhook Stripe
│   │       └── route.ts
│   ├── generate-leads/      # Endpoint génération IA
│   │   └── route.ts
│   └── export/
│       └── csv/
│           └── route.ts
│
└── actions/                  # Server Actions
    ├── auth.ts              # Actions auth
    ├── leads.ts             # CRUD leads
    ├── onboarding.ts        # Onboarding flow
    ├── billing.ts           # Stripe checkout/portal
    └── ai-generation.ts     # Génération leads IA
```

---

## 🎨 Composants Landing Page

### Structure Homepage (inspirée MeetSponsors)

```tsx
// app/(marketing)/page.tsx

import HeroSection from '@/components/marketing/HeroSection';
import ProblemSection from '@/components/marketing/ProblemSection';
import BenefitsGrid from '@/components/marketing/BenefitsGrid';
import HowItWorks from '@/components/marketing/HowItWorks';
import DemoPreview from '@/components/marketing/DemoPreview';
import SocialProof from '@/components/marketing/SocialProof';
import PricingSection from '@/components/marketing/PricingSection';
import FounderStory from '@/components/marketing/FounderStory';
import FAQSection from '@/components/marketing/FAQSection';
import FinalCTA from '@/components/marketing/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <ProblemSection />
      <BenefitsGrid />
      <DemoPreview />
      <HowItWorks />
      <PricingSection />
      <FounderStory />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
```

### Composants Marketing à Créer

#### 1. HeroSection
```tsx
// components/marketing/HeroSection.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const [companyDomain, setCompanyDomain] = useState('');
  const router = useRouter();

  const handleStart = () => {
    router.push(`/signup?domain=${companyDomain}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5 py-20 dark:from-primary/20 dark:via-boxdark dark:to-primary/10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            🔥 10,000+ Leads Qualifiés Disponibles
          </div>

          {/* Titre Principal */}
          <h1 className="mb-6 text-5xl font-bold text-black dark:text-white md:text-6xl lg:text-7xl">
            Trouvez des leads B2B
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              prêts à acheter
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="mb-10 text-xl text-body dark:text-bodydark md:text-2xl">
            Notre IA analyse le marché B2B et trouve les entreprises 
            les plus susceptibles d'acheter vos produits ou services
          </p>

          {/* CTA avec Input */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="votreentreprise.com"
                value={companyDomain}
                onChange={(e) => setCompanyDomain(e.target.value)}
                className="flex-1 rounded-lg border-2 border-stroke bg-white px-6 py-4 text-lg outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark"
              />
              <button
                onClick={handleStart}
                className="whitespace-nowrap rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white hover:bg-opacity-90"
              >
                Analyser Gratuitement
              </button>
            </div>
            
            <p className="mt-4 text-sm text-bodydark">
              ✓ Compte gratuit · ✓ Connexion Google · ✓ Aucune carte requise
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 border-t border-stroke pt-8 dark:border-strokedark">
            <div>
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-bodydark">Leads Actifs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-bodydark">Taux de Précision IA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">48h</div>
              <div className="text-sm text-bodydark">Temps Moyen Deal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 2. ProblemSection (copier style MeetSponsors)
```tsx
// components/marketing/ProblemSection.tsx

const problems = [
  { icon: '❌', text: 'Trop de temps perdu à chercher des prospects manuellement' },
  { icon: '❌', text: 'Difficile d\'identifier les entreprises en phase d\'achat' },
  { icon: '❌', text: 'Bases de données obsolètes et non qualifiées' },
  { icon: '❌', text: 'Taux de conversion très faibles (< 2%)' },
  { icon: '❌', text: 'Pas de visibilité sur les signaux d\'intention d\'achat' },
  { icon: '❌', text: 'Prospection à l\'aveugle sans ciblage précis' },
  { icon: '❌', text: 'Emails en masse sans personnalisation' },
  { icon: '❌', text: 'Attendre passivement que les prospects vous trouvent' },
  { icon: '❌', text: 'Dépendance aux outils coûteux et complexes' },
  { icon: '❌', text: 'Équipe commerciale débordée par la recherche' },
];

const solutions = [
  { icon: '✓', text: 'Accès au marché B2B complet et à jour', highlight: true },
  { icon: '✓', text: 'Recherche rapide et efficace avec filtres avancés' },
  { icon: '✓', text: 'Recommandations personnalisées par IA' },
  { icon: '✓', text: 'Alertes email pour nouvelles opportunités' },
  { icon: '✓', text: 'Contacts décisionnaires en 1 clic' },
  { icon: '✓', text: 'Signaux d\'intention d\'achat en temps réel' },
];

export default function ProblemSection() {
  return (
    <section className="bg-white py-20 dark:bg-boxdark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Trop de temps perdu à chercher des leads ?
          </h2>
          <p className="text-xl text-body dark:text-bodydark">
            Plus de prospection au hasard. Accédez directement aux entreprises 
            les plus susceptibles d'acheter.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Sans notre solution */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-danger">
              Sans notre solution
            </h3>
            <div className="space-y-3">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-xl">{problem.icon}</span>
                  <span className="text-body dark:text-bodydark">{problem.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avec notre solution */}
          <div className="rounded-lg bg-primary/5 p-8 dark:bg-primary/10">
            <h3 className="mb-6 text-2xl font-semibold text-primary">
              Avec notre solution
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-xl text-primary">{solution.icon}</span>
                  <span className={solution.highlight ? 'font-semibold text-black dark:text-white' : 'text-body dark:text-bodydark'}>
                    {solution.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 3. HowItWorks (3 étapes simples)
```tsx
// components/marketing/HowItWorks.tsx

const steps = [
  {
    number: '1',
    title: 'Décrivez votre client idéal',
    description: 'Indiquez votre secteur, taille d\'entreprise cible, et critères de qualification. Notre IA comprend votre profil.',
    icon: '🎯',
  },
  {
    number: '2',
    title: 'Recevez vos leads qualifiés',
    description: 'Notre IA analyse en temps réel le marché B2B et identifie les entreprises qui correspondent à vos critères et montrent des signaux d\'achat.',
    icon: '🤖',
  },
  {
    number: '3',
    title: 'Contactez et convertissez',
    description: 'Accédez aux contacts décisionnaires, lancez vos séquences d\'emails automatiques, et suivez vos opportunités dans le dashboard.',
    icon: '📧',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-2 py-20 dark:bg-meta-4">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-black dark:text-white">
            Trouver des leads n'a jamais été aussi simple
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              {/* Icône */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-5xl">
                {step.icon}
              </div>

              {/* Numéro */}
              <div className="mb-4 text-6xl font-bold text-primary/20">
                {step.number}
              </div>

              {/* Titre */}
              <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-body dark:text-bodydark">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 🔐 Authentification Supabase

### Configuration

```typescript
// lib/supabase/auth.ts
import { createClient } from '@/lib/supabase/server';

export async function signInWithGoogle() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

### Page Sign In

```tsx
// app/(auth)/signin/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-boxdark-2">
      <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-default dark:bg-boxdark">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
            Bienvenue
          </h1>
          <p className="text-body dark:text-bodydark">
            Connectez-vous pour accéder à vos leads
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-stroke bg-white px-6 py-4 font-semibold text-black hover:bg-gray-2 disabled:opacity-50 dark:border-strokedark dark:bg-boxdark dark:text-white"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                {/* Google Icon SVG */}
              </svg>
              Continuer avec Google
            </>
          )}
        </button>

        <p className="mt-6 text-center text-sm text-bodydark">
          En continuant, vous acceptez nos{' '}
          <a href="/terms" className="text-primary hover:underline">
            Conditions d'utilisation
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

## 🎯 Onboarding (3 étapes)

```tsx
// app/(dashboard)/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    id: 1,
    title: 'Parlez-nous de votre entreprise',
    description: 'Pour vous proposer les leads les plus pertinents',
  },
  {
    id: 2,
    title: 'Définissez votre client idéal',
    description: 'Qui sont vos meilleurs clients ?',
  },
  {
    id: 3,
    title: 'Génération de vos premiers leads',
    description: 'Notre IA analyse le marché pour vous',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    companyName: '',
    industry: '',
    targetIndustry: '',
    targetCompanySize: '',
    targetJobTitles: '',
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lancer génération IA et rediriger
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-boxdark-2">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 ${
                  step.id < currentStep
                    ? 'text-primary'
                    : step.id === currentStep
                    ? 'text-primary'
                    : 'text-bodydark'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.id <= currentStep
                        ? 'bg-primary text-white'
                        : 'bg-stroke text-bodydark'
                    }`}
                  >
                    {step.id}
                  </div>
                  {step.id < steps.length && (
                    <div
                      className={`h-1 flex-1 ${
                        step.id < currentStep ? 'bg-primary' : 'bg-stroke'
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg bg-white p-10 shadow-default dark:bg-boxdark">
          <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
            {steps[currentStep - 1].title}
          </h2>
          <p className="mb-8 text-body dark:text-bodydark">
            {steps[currentStep - 1].description}
          </p>

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-medium">Nom de votre entreprise</label>
                <input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => setData({ ...data, companyName: e.target.value })}
                  className="w-full rounded-lg border border-stroke px-4 py-3"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Votre secteur d'activité</label>
                <select
                  value={data.industry}
                  onChange={(e) => setData({ ...data, industry: e.target.value })}
                  className="w-full rounded-lg border border-stroke px-4 py-3"
                >
                  <option value="">Sélectionner...</option>
                  <option value="tech">Tech/SaaS</option>
                  <option value="services">Services B2B</option>
                  <option value="consulting">Consulting</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-medium">Secteur cible</label>
                <input
                  type="text"
                  value={data.targetIndustry}
                  onChange={(e) => setData({ ...data, targetIndustry: e.target.value })}
                  className="w-full rounded-lg border border-stroke px-4 py-3"
                  placeholder="Tech, Finance, E-commerce..."
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Taille d'entreprise</label>
                <select
                  value={data.targetCompanySize}
                  onChange={(e) => setData({ ...data, targetCompanySize: e.target.value })}
                  className="w-full rounded-lg border border-stroke px-4 py-3"
                >
                  <option value="">Sélectionner...</option>
                  <option value="1-10">1-10 employés (Micro)</option>
                  <option value="11-50">11-50 employés (PME)</option>
                  <option value="51-200">51-200 employés (Moyenne)</option>
                  <option value="201-1000">201-1000 employés (Grande)</option>
                  <option value="1000+">1000+ employés (Enterprise)</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-medium">Postes décisionnaires</label>
                <input
                  type="text"
                  value={data.targetJobTitles}
                  onChange={(e) => setData({ ...data, targetJobTitles: e.target.value })}
                  className="w-full rounded-lg border border-stroke px-4 py-3"
                  placeholder="CEO, CTO, Head of Sales..."
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="py-8 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Analyse en cours...</h3>
              <p className="text-bodydark">
                Notre IA recherche les meilleures opportunités pour vous
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="rounded-lg px-6 py-3 font-semibold text-body hover:text-black disabled:opacity-50"
            >
              Retour
            </button>
            <button
              onClick={handleNext}
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:bg-opacity-90"
            >
              {currentStep === 3 ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 💳 Pricing & Billing (Stripe)

Adapté pour votre contexte B2B :

### Plans Tarifaires

```typescript
// config/pricing.ts
export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    currency: 'EUR',
    interval: 'month',
    features: [
      '50 leads qualifiés/mois',
      'Recherche avancée',
      'Export CSV',
      '1 utilisateur',
      'Support email',
    ],
    limits: {
      maxLeads: 50,
      maxUsers: 1,
      maxCampaigns: 3,
    },
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 99,
    currency: 'EUR',
    interval: 'month',
    popular: true,
    features: [
      '500 leads qualifiés/mois',
      'IA signaux d\'intention',
      'Séquences emails auto',
      'Webhooks & CRM',
      '5 utilisateurs',
      'Support prioritaire',
    ],
    limits: {
      maxLeads: 500,
      maxUsers: 5,
      maxCampaigns: 20,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 249,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Leads illimités',
      'IA personnalisée',
      'API complète',
      'Multi-organisations',
      'Utilisateurs illimités',
      'Account manager dédié',
    ],
    limits: {
      maxLeads: -1, // Illimité
      maxUsers: -1,
      maxCampaigns: -1,
    },
  },
];
```

---

**Voulez-vous que je crée les fichiers suivants ?**

1. ✅ Architecture complète adaptée (créé ci-dessus)
2. Prompt Cursor optimisé pour votre stack
3. Middleware de protection des routes
4. Actions Stripe (checkout/portal)
5. Composants marketing complets
6. Configuration Supabase Auth complète

Dites-moi ce que vous voulez que je développe en priorité !
