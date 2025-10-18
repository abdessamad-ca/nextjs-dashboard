# 🎯 Plan de Refactorisation Détaillé
## SAAS Lead Generation B2B - Architecture Landing + Product

**Date**: 2025-10-17  
**Objectif**: Transformer le template TailAdmin en SAAS complet type MeetSponsors  
**Durée estimée**: 3-4 semaines  

---

## 📊 État Actuel du Repo

### ✅ Ce qui existe déjà
- ✓ Next.js 15.2.3 + App Router
- ✓ TypeScript strict configuré
- ✓ Tailwind CSS v4 + Dark mode
- ✓ ESLint + Prettier configurés
- ✓ Composants TailAdmin (Sidebar, Header, Charts, Tables, Forms)
- ✓ Supabase clients (client.ts + server.ts avec helpers)
- ✓ Memory Bank complet (.cursor/memory-bank/)
- ✓ Schéma BDD Prisma documenté (18 tables)
- ✓ Structure auth basique (SignInForm, SignUpForm)

### ❌ Ce qui manque
- ❌ Landing page marketing
- ❌ Auth flow Supabase complet (Google OAuth)
- ❌ Middleware de protection des routes
- ❌ Onboarding wizard
- ❌ Intégration Stripe Billing
- ❌ Dashboard adapté pour Lead Generation
- ❌ Pages produit (Leads, Campaigns, Settings)
- ❌ API routes (génération IA, webhooks, export)

---

## 🗂️ Phase 1: Restructuration App Router (3-4h)

### Objectif
Réorganiser l'architecture Next.js pour séparer Marketing, Auth et Dashboard.

### Actions

#### 1.1 Créer la structure des groupes
```
src/app/
├── (marketing)/                    # 🆕 NOUVEAU
│   ├── layout.tsx                 # 🆕 Layout marketing (NavBar simple + Footer)
│   ├── page.tsx                   # 🆕 Homepage avec sections
│   ├── pricing/page.tsx           # 🆕 Tarification
│   ├── faq/page.tsx               # 🆕 FAQ
│   ├── demo/page.tsx              # 🆕 Demo interactive
│   └── about/page.tsx             # 🆕 Histoire fondateur
│
├── (auth)/                         # ♻️ MODIFIER existant
│   ├── layout.tsx                 # ✓ Existe déjà
│   ├── signin/page.tsx            # ♻️ Adapter pour Supabase
│   ├── signup/page.tsx            # ♻️ Adapter pour Supabase
│   └── callback/route.ts          # 🆕 Callback OAuth Supabase
│
└── (dashboard)/                    # ♻️ RENOMMER (admin)
    ├── layout.tsx                 # ♻️ Adapter layout TailAdmin existant
    ├── page.tsx                   # ♻️ Transformer en Dashboard Leads
    ├── onboarding/page.tsx        # 🆕 Wizard 3 étapes
    ├── leads/                     # 🆕 Module Leads
    ├── campaigns/                 # 🆕 Module Campaigns
    ├── sequences/page.tsx         # 🆕 Email sequences
    ├── analytics/page.tsx         # 🆕 Analytics
    └── settings/                  # 🆕 Settings
        ├── page.tsx               # 🆕 Paramètres généraux
        ├── billing/page.tsx       # 🆕 Billing Stripe
        ├── team/page.tsx          # 🆕 Gestion équipe
        └── integrations/page.tsx  # 🆕 Webhooks, API keys
```

#### 1.2 Fichiers à modifier

**src/app/(dashboard)/layout.tsx** ♻️
```typescript
// Renommer (admin) → (dashboard)
// Garder le layout TailAdmin existant
// Ajouter protection par middleware
```

**src/app/layout.tsx** ♻️
```typescript
// Mettre à jour metadata pour Lead Generation
export const metadata: Metadata = {
  title: "Génération de Leads B2B par IA | VotreNom",
  description: "Trouvez des leads B2B qualifiés automatiquement...",
}
```

#### 1.3 Fichiers à créer

| Fichier | Type | Description |
|---------|------|-------------|
| `app/(marketing)/layout.tsx` | Layout | NavBar + Footer marketing |
| `app/(marketing)/page.tsx` | Page | Homepage avec sections |
| `app/(auth)/callback/route.ts` | Route | Callback OAuth |
| `app/(dashboard)/onboarding/page.tsx` | Page | Wizard onboarding |

**Estimation**: 3-4h

---

## 🎨 Phase 2: Composants Marketing (8-12h)

### Objectif
Créer tous les composants de la landing page inspirés de MeetSponsors.

### Structure
```
src/components/marketing/
├── landing/                        # 🆕 Sections landing
│   ├── HeroSection.tsx            # Hero avec badge + CTA
│   ├── ProblemSection.tsx         # Sans/Avec tableau
│   ├── BenefitsGrid.tsx           # 6 cartes bénéfices
│   ├── HowItWorks.tsx             # 3 étapes
│   ├── DemoPreview.tsx            # Screenshot/vidéo
│   ├── SocialProof.tsx            # Logos + témoignages
│   ├── PricingSection.tsx         # 3 cards pricing
│   ├── FounderStory.tsx           # Photo + histoire
│   ├── FAQAccordion.tsx           # 10 Q&R
│   └── FinalCTA.tsx               # CTA final
│
├── layout/                         # 🆕 Layout marketing
│   ├── MarketingNav.tsx           # Navigation marketing
│   └── MarketingFooter.tsx        # Footer avec liens
│
└── ui/                             # 🆕 UI components réutilisables
    ├── GradientText.tsx           # Texte avec gradient
    ├── Badge.tsx                  # Badge "10,000+ Leads"
    ├── PricingCard.tsx            # Card pricing
    └── TestimonialCard.tsx        # Card témoignage
```

### Composants détaillés

#### 2.1 HeroSection
```tsx
/**
 * Hero Section
 * - Badge "10,000+ Leads générés"
 * - Titre avec gradient
 * - Sous-titre
 * - Input "votreentreprise.com" + CTA "Essayer Gratuitement"
 * - Screenshot dashboard
 * - Logos clients (social proof)
 */
```

**Props**:
- `badge`: string
- `title`: string
- `subtitle`: string
- `ctaText`: string
- `onCtaClick`: () => void

**Style**:
- Container max-w-7xl centered
- Grid 2 colonnes (60/40) desktop
- Responsive mobile (stack vertical)
- Animations: fade-in, slide-up
- Gradient Tailwind pour titre

#### 2.2 ProblemSection
```tsx
/**
 * Problem Section (inspiré MeetSponsors "Sans/Avec")
 * - 2 colonnes comparative
 * - Colonne gauche: 10 problèmes (icône ❌)
 * - Colonne droite: 6 solutions (icône ✅)
 */
```

**Data**:
```typescript
const problems = [
  "Prospection manuelle chronophage",
  "Leads non qualifiés",
  "Taux de conversion faible",
  // ...7 autres
];

const solutions = [
  "IA trouve les leads qualifiés",
  "Enrichissement automatique",
  "Séquences email automatisées",
  // ...3 autres
];
```

#### 2.3 BenefitsGrid
```tsx
/**
 * Benefits Grid
 * - Grid 3 colonnes (6 cards total)
 * - Chaque card: Icône + Titre + Description
 */
```

**Benefits**:
1. "Gain de temps 10x" - Automatisation complète
2. "Leads ultra-qualifiés" - IA avancée
3. "Enrichissement auto" - API LinkedIn/Clearbit
4. "Email sequences" - Nurturing automatique
5. "Analytics en temps réel" - Dashboards
6. "Intégrations CRM" - Zapier, webhooks

#### 2.4 HowItWorks
```tsx
/**
 * How It Works - 3 étapes numérotées
 */
```

**Étapes**:
1. 🎯 "Définissez votre client idéal" (secteur, taille, budget)
2. 🤖 "Notre IA trouve les leads" (scan marché + enrichissement)
3. 📧 "Lancez vos campagnes" (séquences email auto)

#### 2.5 PricingSection
```tsx
/**
 * Pricing Cards - 3 plans
 */
```

**Plans**:

| Plan | Prix | Leads/mois | Users | Features |
|------|------|------------|-------|----------|
| Starter | 49€ | 500 | 1 | Export CSV, Email basic |
| Pro | 99€ | 2,000 | 3 | + Séquences, Intégrations |
| Enterprise | 249€ | Illimité | 10 | + White-label, API, Support |

#### 2.6 MarketingNav
```tsx
/**
 * Navigation Marketing
 * - Logo
 * - Links: Tarifs, FAQ, Demo
 * - CTA "Essayer Gratuit" (primary)
 * - Bouton "Connexion" (secondary)
 * - Dark mode toggle
 * - Burger menu mobile
 */
```

#### 2.7 MarketingFooter
```tsx
/**
 * Footer Marketing
 * - 4 colonnes: Produit, Entreprise, Légal, Social
 * - Copyright
 * - Links: CGU, CGV, Confidentialité, Contact
 */
```

### Fichiers à créer

| Fichier | Lignes estimées | Complexité |
|---------|-----------------|------------|
| `HeroSection.tsx` | 80-100 | Moyenne |
| `ProblemSection.tsx` | 60-80 | Simple |
| `BenefitsGrid.tsx` | 100-120 | Moyenne |
| `HowItWorks.tsx` | 60-80 | Simple |
| `DemoPreview.tsx` | 50-70 | Simple |
| `SocialProof.tsx` | 40-60 | Simple |
| `PricingSection.tsx` | 150-200 | Élevée |
| `FounderStory.tsx` | 50-70 | Simple |
| `FAQAccordion.tsx` | 80-100 | Moyenne |
| `FinalCTA.tsx` | 40-60 | Simple |
| `MarketingNav.tsx` | 100-120 | Moyenne |
| `MarketingFooter.tsx` | 80-100 | Simple |

**Estimation**: 8-12h

---

## 🔐 Phase 3: Authentification Supabase (4-6h)

### Objectif
Implémenter le flow d'authentification complet avec Supabase Auth (Google OAuth).

### 3.1 Configuration Supabase

#### Variables d'environnement
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# URL de callback
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Configuration Google OAuth
1. Créer projet dans Google Cloud Console
2. Configurer OAuth consent screen
3. Créer credentials OAuth 2.0
4. Ajouter redirect URI: `https://xxx.supabase.co/auth/v1/callback`
5. Copier Client ID + Secret dans Supabase Dashboard

### 3.2 Auth Helpers

**lib/supabase/auth-helpers.ts** 🆕
```typescript
'use server';

import { createClient } from './server';
import { redirect } from 'next/navigation';

/**
 * Se connecter avec Google
 */
export async function signInWithGoogle() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
  
  if (error) {
    throw error;
  }
  
  return data.url;
}

/**
 * Vérifier si l'utilisateur a complété l'onboarding
 */
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { data } = await supabase
    .from('user_organizations')
    .select('organization_id')
    .eq('user_id', userId)
    .single();
  
  return !!data?.organization_id;
}

/**
 * Créer un utilisateur dans la BDD après OAuth
 */
export async function createUserInDatabase(user: any) {
  const supabase = createClient();
  
  const { error } = await supabase.from('users').upsert({
    supabase_id: user.id,
    email: user.email,
    name: user.user_metadata?.name,
    avatar: user.user_metadata?.avatar_url,
    last_login_at: new Date().toISOString(),
  });
  
  if (error) {
    console.error('Error creating user:', error);
  }
}
```

### 3.3 Pages Auth

**app/(auth)/signin/page.tsx** ♻️
```tsx
'use client';

import { useState } from 'react';
import { signInWithGoogle } from '@/lib/supabase/auth-helpers';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const url = await signInWithGoogle();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      // Afficher toast d'erreur
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Logo */}
        <div className="text-center">
          <Image src="/logo.svg" alt="Logo" width={120} height={40} />
          <h1 className="mt-4 text-2xl font-bold">Se connecter</h1>
          <p className="mt-2 text-sm text-bodydark">
            Accédez à votre dashboard de génération de leads
          </p>
        </div>
        
        {/* Bouton Google */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-stroke bg-white px-4 py-3 font-medium text-black hover:bg-gray-50 disabled:opacity-50 dark:border-strokedark dark:bg-boxdark dark:text-white"
        >
          <GoogleIcon />
          {loading ? 'Connexion...' : 'Continuer avec Google'}
        </button>
        
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stroke dark:border-strokedark" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-bodydark dark:bg-boxdark">
              Ou
            </span>
          </div>
        </div>
        
        {/* Link inscription */}
        <div className="text-center text-sm">
          Pas encore de compte ?{' '}
          <a href="/signup" className="font-medium text-primary hover:underline">
            Créer un compte gratuitement
          </a>
        </div>
      </div>
    </div>
  );
}
```

**app/(auth)/callback/route.ts** 🆕
```typescript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { createUserInDatabase, hasCompletedOnboarding } from '@/lib/supabase/auth-helpers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = createClient();
    
    // Échanger le code contre une session
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/signin?error=auth_failed`);
    }
    
    if (user) {
      // Créer l'utilisateur dans la BDD si nouveau
      await createUserInDatabase(user);
      
      // Vérifier si onboarding complété
      const hasOnboarding = await hasCompletedOnboarding(user.id);
      
      if (hasOnboarding) {
        return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
      } else {
        return NextResponse.redirect(`${requestUrl.origin}/onboarding`);
      }
    }
  }
  
  // Erreur : rediriger vers signin
  return NextResponse.redirect(`${requestUrl.origin}/signin`);
}
```

### 3.4 Middleware de protection

**middleware.ts** 🆕
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Routes protégées
  const protectedPaths = ['/dashboard', '/leads', '/campaigns', '/settings', '/onboarding'];
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));
  
  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/signin', req.url);
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Si connecté et sur /signin ou /signup → redirect dashboard
  if (session && (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/leads/:path*', '/campaigns/:path*', '/settings/:path*', '/onboarding', '/signin', '/signup'],
};
```

### 3.5 User Dropdown (adapter composant existant)

**src/components/header/UserDropdown.tsx** ♻️
```tsx
// Modifier pour :
// 1. Récupérer user depuis Supabase
// 2. Afficher avatar, nom, email
// 3. Ajouter menu: Dashboard, Settings, Billing, Déconnexion
// 4. Bouton déconnexion → signOut() puis redirect /
```

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `lib/supabase/auth-helpers.ts` | 🆕 Créer | Helpers auth Supabase |
| `app/(auth)/signin/page.tsx` | ♻️ Modifier | Page connexion Google |
| `app/(auth)/callback/route.ts` | 🆕 Créer | Callback OAuth |
| `middleware.ts` | 🆕 Créer | Protection routes |
| `components/header/UserDropdown.tsx` | ♻️ Modifier | Adapter pour Supabase |

**Estimation**: 4-6h

---

## 🎓 Phase 4: Onboarding Wizard (6-8h)

### Objectif
Créer un wizard d'onboarding en 3 étapes pour collecter les infos entreprise et générer les premiers leads.

### Structure

```
app/(dashboard)/onboarding/
├── page.tsx                        # 🆕 Wizard principal
└── components/
    ├── StepIndicator.tsx          # 🆕 Progress bar
    ├── Step1Organization.tsx      # 🆕 Étape 1
    ├── Step2IdealClient.tsx       # 🆕 Étape 2
    └── Step3Generation.tsx        # 🆕 Étape 3 (loading)
```

### 4.1 Wizard Principal

**app/(dashboard)/onboarding/page.tsx** 🆕
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from './components/StepIndicator';
import Step1Organization from './components/Step1Organization';
import Step2IdealClient from './components/Step2IdealClient';
import Step3Generation from './components/Step3Generation';

type OnboardingData = {
  // Step 1
  organizationName: string;
  industry: string;
  website: string;
  
  // Step 2
  targetIndustry: string[];
  companySize: 'MICRO' | 'SME' | 'MID' | 'LARGE' | 'ENTERPRISE';
  targetRoles: string[];
  averageBudget: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    organizationName: '',
    industry: '',
    website: '',
    targetIndustry: [],
    companySize: 'SME',
    targetRoles: [],
    averageBudget: '',
  });
  
  const handleNext = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleComplete = async () => {
    // Sauvegarder dans BDD + générer leads
    // Puis redirect dashboard
    router.push('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-boxdark-2 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Configurons votre compte
          </h1>
          <p className="mt-2 text-bodydark">
            3 étapes rapides pour générer vos premiers leads
          </p>
        </div>
        
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        
        <div className="mt-8 rounded-lg border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
          {currentStep === 1 && (
            <Step1Organization
              data={data}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 2 && (
            <Step2IdealClient
              data={data}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Generation
              data={data}
              onComplete={handleComplete}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
```

### 4.2 Étape 1: Organisation

**Step1Organization.tsx** 🆕
```tsx
'use client';

import { useState } from 'react';
import InputField from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';

const INDUSTRIES = [
  'SaaS / Logiciel',
  'E-commerce',
  'Marketing / Publicité',
  'Consulting',
  'Finance',
  'Santé',
  'Éducation',
  'Immobilier',
  'Autre',
];

export default function Step1Organization({ data, onNext }) {
  const [formData, setFormData] = useState({
    organizationName: data.organizationName,
    industry: data.industry,
    website: data.website,
  });
  
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    if (!formData.organizationName) newErrors.organizationName = 'Requis';
    if (!formData.industry) newErrors.industry = 'Requis';
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    } else {
      setErrors(newErrors);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Parlez-nous de votre entreprise
        </h2>
        <p className="mt-1 text-sm text-bodydark">
          Ces informations nous aideront à personnaliser votre expérience
        </p>
      </div>
      
      <InputField
        label="Nom de l'entreprise *"
        value={formData.organizationName}
        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
        error={errors.organizationName}
        placeholder="Ex: Acme Corp"
      />
      
      <Select
        label="Secteur d'activité *"
        value={formData.industry}
        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
        error={errors.industry}
      >
        <option value="">Sélectionnez...</option>
        {INDUSTRIES.map(industry => (
          <option key={industry} value={industry}>{industry}</option>
        ))}
      </Select>
      
      <InputField
        label="Site web (optionnel)"
        type="url"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        placeholder="https://exemple.com"
      />
      
      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Continuer →
        </Button>
      </div>
    </form>
  );
}
```

### 4.3 Étape 2: Client Idéal

**Step2IdealClient.tsx** 🆕
```tsx
// Formulaire avec :
// - Multi-select "Secteurs cibles" (Checkbox group)
// - Select "Taille entreprise" (Micro/PME/Moyenne/Grande/Enterprise)
// - Multi-select "Postes décisionnaires" (CEO, CTO, CMO, CFO, etc.)
// - Input "Budget moyen" (range ou input number)
// 
// Boutons: "← Retour" + "Continuer →"
```

**Postes disponibles**:
```typescript
const TARGET_ROLES = [
  'CEO / Fondateur',
  'CTO / Tech Lead',
  'CMO / Responsable Marketing',
  'CFO / Directeur Financier',
  'COO / Directeur Opérations',
  'Responsable Développement Commercial',
  'Responsable RH',
  'Autre',
];
```

### 4.4 Étape 3: Génération IA

**Step3Generation.tsx** 🆕
```tsx
'use client';

import { useEffect, useState } from 'react';
import { generateInitialLeads } from '@/app/actions/ai-generation';

export default function Step3Generation({ data, onComplete, onBack }) {
  const [status, setStatus] = useState('generating'); // generating | success | error
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const generate = async () => {
      try {
        // Simulation progression
        const interval = setInterval(() => {
          setProgress(prev => Math.min(prev + 10, 90));
        }, 500);
        
        // Appel API génération
        const result = await generateInitialLeads(data);
        
        clearInterval(interval);
        setProgress(100);
        setStatus('success');
        
        // Attendre 2s puis complete
        setTimeout(() => {
          onComplete();
        }, 2000);
        
      } catch (error) {
        console.error('Generation error:', error);
        setStatus('error');
      }
    };
    
    generate();
  }, []);
  
  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {status === 'generating' && '🤖 Notre IA génère vos premiers leads...'}
          {status === 'success' && '✅ C\'est prêt !'}
          {status === 'error' && '❌ Une erreur est survenue'}
        </h2>
        <p className="mt-2 text-sm text-bodydark">
          {status === 'generating' && 'Analyse du marché et enrichissement des données'}
          {status === 'success' && 'Redirection vers votre dashboard...'}
          {status === 'error' && 'Veuillez réessayer'}
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-meta-4">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-sm text-bodydark">
        {progress}% complété
      </div>
      
      {status === 'error' && (
        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={onBack}>
            ← Retour
          </Button>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      )}
    </div>
  );
}
```

### 4.5 Server Action: Génération Leads

**app/actions/onboarding.ts** 🆕
```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma'; // À créer

export async function saveOnboarding(data: OnboardingData) {
  const user = await getUser();
  
  // Créer organization
  const org = await prisma.organization.create({
    data: {
      name: data.organizationName,
      slug: slugify(data.organizationName),
      plan: 'STARTER', // Plan par défaut
      maxLeads: 500,
      maxUsers: 1,
      maxCampaigns: 5,
    },
  });
  
  // Lier user à organization
  await prisma.userOrganization.create({
    data: {
      userId: user.id,
      organizationId: org.id,
      role: 'OWNER',
    },
  });
  
  // Sauvegarder préférences
  // (à implémenter selon votre schéma)
  
  return { success: true, organizationId: org.id };
}
```

**app/actions/ai-generation.ts** 🆕
```typescript
'use server';

import { prisma } from '@/lib/prisma';
import { getUser, getUserOrganization } from '@/lib/supabase/server';

export async function generateInitialLeads(onboardingData: OnboardingData) {
  const user = await getUser();
  const { organization } = await getUserOrganization();
  
  // TODO: Intégration API IA (OpenAI, Anthropic, etc.)
  // Pour l'instant, créer des leads fictifs
  
  const mockLeads = Array.from({ length: 10 }, (_, i) => ({
    firstName: `Lead ${i + 1}`,
    lastName: 'Prospect',
    email: `lead${i + 1}@example.com`,
    jobTitle: onboardingData.targetRoles[0] || 'CEO',
    company: `Company ${i + 1}`,
    industry: onboardingData.targetIndustry[0] || 'SaaS',
    status: 'NEW',
    score: Math.floor(Math.random() * 100),
    organizationId: organization.id,
    ownerId: user.id,
  }));
  
  await prisma.lead.createMany({
    data: mockLeads,
  });
  
  return { success: true, leadsCreated: mockLeads.length };
}
```

### Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `app/(dashboard)/onboarding/page.tsx` | Wizard principal |
| `app/(dashboard)/onboarding/components/StepIndicator.tsx` | Progress bar |
| `app/(dashboard)/onboarding/components/Step1Organization.tsx` | Étape 1 |
| `app/(dashboard)/onboarding/components/Step2IdealClient.tsx` | Étape 2 |
| `app/(dashboard)/onboarding/components/Step3Generation.tsx` | Étape 3 |
| `app/actions/onboarding.ts` | Server actions onboarding |
| `app/actions/ai-generation.ts` | Génération leads IA |

**Estimation**: 6-8h

---

## 💳 Phase 5: Billing Stripe (6-8h)

### Objectif
Intégrer Stripe pour la gestion des abonnements (Checkout + Customer Portal).

### 5.1 Configuration Stripe

#### Installation dépendances
```bash
npm install stripe @stripe/stripe-js
```

#### Variables d'environnement
```env
# .env.local
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### Créer produits dans Stripe Dashboard

**Produits à créer** (mode test):

| Produit | Prix | ID Price | Limites |
|---------|------|----------|---------|
| Starter | 49€/mois | `price_starter_monthly` | 500 leads, 1 user |
| Pro | 99€/mois | `price_pro_monthly` | 2,000 leads, 3 users |
| Enterprise | 249€/mois | `price_enterprise_monthly` | Illimité, 10 users |

**Metadata produits** (à ajouter dans Stripe):
```json
{
  "plan": "STARTER",
  "maxLeads": "500",
  "maxUsers": "1",
  "maxCampaigns": "5"
}
```

### 5.2 Lib Stripe

**lib/stripe/client.ts** 🆕
```typescript
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

**lib/stripe/server.ts** 🆕
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});
```

### 5.3 Server Actions Billing

**app/actions/billing.ts** 🆕
```typescript
'use server';

import { stripe } from '@/lib/stripe/server';
import { getUser, getUserOrganization } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

/**
 * Créer une Checkout Session Stripe
 */
export async function createCheckoutSession(priceId: string) {
  const user = await getUser();
  const { organization } = await getUserOrganization();
  
  // Créer ou récupérer customer Stripe
  let customerId = organization.stripeCustomerId;
  
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: {
        organizationId: organization.id,
      },
    });
    
    customerId = customer.id;
    
    // Sauvegarder dans BDD
    await prisma.organization.update({
      where: { id: organization.id },
      data: { stripeCustomerId: customerId },
    });
  }
  
  // Créer session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
    metadata: {
      organizationId: organization.id,
    },
  });
  
  return { url: session.url };
}

/**
 * Créer une Customer Portal Session
 */
export async function createPortalSession() {
  const { organization } = await getUserOrganization();
  
  if (!organization.stripeCustomerId) {
    throw new Error('No Stripe customer');
  }
  
  const session = await stripe.billingPortal.sessions.create({
    customer: organization.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings/billing`,
  });
  
  return { url: session.url };
}

/**
 * Obtenir les infos d'abonnement
 */
export async function getSubscriptionInfo() {
  const { organization } = await getUserOrganization();
  
  if (!organization.stripeCustomerId) {
    return null;
  }
  
  const subscriptions = await stripe.subscriptions.list({
    customer: organization.stripeCustomerId,
    limit: 1,
    status: 'active',
  });
  
  if (subscriptions.data.length === 0) {
    return null;
  }
  
  const subscription = subscriptions.data[0];
  
  return {
    id: subscription.id,
    status: subscription.status,
    currentPeriodEnd: subscription.current_period_end,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    plan: subscription.items.data[0].price.id,
  };
}
```

### 5.4 Webhook Stripe

**app/api/webhooks/stripe/route.ts** 🆕
```typescript
import { stripe } from '@/lib/stripe/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
  
  // Traiter les événements
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const organizationId = session.metadata?.organizationId;
      
      if (!organizationId) {
        console.error('No organizationId in metadata');
        break;
      }
      
      // Récupérer subscription
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      
      const priceId = subscription.items.data[0].price.id;
      const plan = getPlanFromPriceId(priceId);
      
      // Mettre à jour organization
      await prisma.organization.update({
        where: { id: organizationId },
        data: {
          plan: plan.name,
          maxLeads: plan.maxLeads,
          maxUsers: plan.maxUsers,
          maxCampaigns: plan.maxCampaigns,
          stripeCustomerId: session.customer as string,
        },
      });
      
      console.log(`✅ Subscription activated for org ${organizationId}`);
      break;
    }
    
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const organizationId = subscription.metadata?.organizationId;
      
      if (!organizationId) {
        // Récupérer depuis customer
        const customer = await stripe.customers.retrieve(
          subscription.customer as string
        );
        // ... logique pour retrouver org
      }
      
      // Mettre à jour si changement de plan
      const priceId = subscription.items.data[0].price.id;
      const plan = getPlanFromPriceId(priceId);
      
      await prisma.organization.update({
        where: { id: organizationId },
        data: {
          plan: plan.name,
          maxLeads: plan.maxLeads,
          maxUsers: plan.maxUsers,
          maxCampaigns: plan.maxCampaigns,
        },
      });
      
      console.log(`✅ Subscription updated for org ${organizationId}`);
      break;
    }
    
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      
      // Rétrograder vers plan FREE
      // ... logique similaire
      
      console.log(`✅ Subscription canceled`);
      break;
    }
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  return NextResponse.json({ received: true });
}

/**
 * Mapper price ID → Plan
 */
function getPlanFromPriceId(priceId: string) {
  const plans = {
    'price_starter_monthly': {
      name: 'STARTER',
      maxLeads: 500,
      maxUsers: 1,
      maxCampaigns: 5,
    },
    'price_pro_monthly': {
      name: 'PRO',
      maxLeads: 2000,
      maxUsers: 3,
      maxCampaigns: 20,
    },
    'price_enterprise_monthly': {
      name: 'ENTERPRISE',
      maxLeads: 999999,
      maxUsers: 10,
      maxCampaigns: 999,
    },
  };
  
  return plans[priceId] || plans['price_starter_monthly'];
}
```

### 5.5 Page Billing

**app/(dashboard)/settings/billing/page.tsx** 🆕
```tsx
import { getSubscriptionInfo } from '@/app/actions/billing';
import { getUserOrganization } from '@/lib/supabase/server';
import BillingCard from './components/BillingCard';
import UpgradeOptions from './components/UpgradeOptions';
import InvoiceHistory from './components/InvoiceHistory';

export default async function BillingPage() {
  const { organization } = await getUserOrganization();
  const subscription = await getSubscriptionInfo();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Facturation
        </h1>
        <p className="mt-1 text-sm text-bodydark">
          Gérez votre abonnement et vos factures
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Plan actuel */}
        <div className="lg:col-span-2">
          <BillingCard
            plan={organization.plan}
            subscription={subscription}
            maxLeads={organization.maxLeads}
          />
        </div>
        
        {/* Limites */}
        <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 font-semibold text-black dark:text-white">
            Utilisation
          </h3>
          {/* Stats usage */}
        </div>
      </div>
      
      {/* Options upgrade */}
      <UpgradeOptions currentPlan={organization.plan} />
      
      {/* Historique factures */}
      <InvoiceHistory />
    </div>
  );
}
```

### 5.6 Composant Upgrade

**BillingCard.tsx** avec boutons:
- Si FREE → "Upgrade vers Starter"
- Si STARTER → "Accéder au portail de facturation"
- Bouton "Changer de plan" → ouvre Customer Portal

```tsx
'use client';

import { createPortalSession } from '@/app/actions/billing';
import Button from '@/components/ui/button/Button';

export default function BillingCard({ plan, subscription }) {
  const handlePortal = async () => {
    const { url } = await createPortalSession();
    window.location.href = url;
  };
  
  return (
    <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Plan {plan}
          </h3>
          {subscription && (
            <p className="text-sm text-bodydark">
              Prochain renouvellement le{' '}
              {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
        
        <Button onClick={handlePortal}>
          Gérer l'abonnement
        </Button>
      </div>
      
      {/* Infos plan */}
    </div>
  );
}
```

### Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `lib/stripe/client.ts` | Client Stripe côté client |
| `lib/stripe/server.ts` | Client Stripe côté serveur |
| `app/actions/billing.ts` | Server actions billing |
| `app/api/webhooks/stripe/route.ts` | Webhook handler |
| `app/(dashboard)/settings/billing/page.tsx` | Page billing |
| `app/(dashboard)/settings/billing/components/BillingCard.tsx` | Card plan actuel |
| `app/(dashboard)/settings/billing/components/UpgradeOptions.tsx` | Options upgrade |
| `app/(dashboard)/settings/billing/components/InvoiceHistory.tsx` | Historique factures |

**Estimation**: 6-8h

---

## 📊 Phase 6: Dashboard (4-6h)

### Objectif
Adapter le dashboard TailAdmin pour afficher les métriques de Lead Generation.

### 6.1 Dashboard Principal

**app/(dashboard)/page.tsx** ♻️
```tsx
import { getUserOrganization } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import LeadsStats from './components/LeadsStats';
import LeadsChart from './components/LeadsChart';
import RecentLeadsTable from './components/RecentLeadsTable';
import QuickActions from './components/QuickActions';

export default async function DashboardPage() {
  const { organization } = await getUserOrganization();
  
  // Récupérer stats
  const [
    totalLeads,
    qualifiedLeads,
    leadsThisMonth,
    recentLeads,
  ] = await Promise.all([
    prisma.lead.count({ where: { organizationId: organization.id, deletedAt: null } }),
    prisma.lead.count({ where: { organizationId: organization.id, status: 'QUALIFIED', deletedAt: null } }),
    prisma.lead.count({
      where: {
        organizationId: organization.id,
        createdAt: { gte: new Date(new Date().setDate(1)) },
        deletedAt: null,
      },
    }),
    prisma.lead.findMany({
      where: { organizationId: organization.id, deletedAt: null },
      take: 10,
      orderBy: { createdAt: 'desc' },
    }),
  ]);
  
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <LeadsStats
        totalLeads={totalLeads}
        qualifiedLeads={qualifiedLeads}
        leadsThisMonth={leadsThisMonth}
        maxLeads={organization.maxLeads}
      />
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LeadsChart organizationId={organization.id} />
        <QuickActions />
      </div>
      
      {/* Table récents leads */}
      <RecentLeadsTable leads={recentLeads} />
    </div>
  );
}
```

### 6.2 Stats Cards

**components/LeadsStats.tsx** 🆕
```tsx
export default function LeadsStats({
  totalLeads,
  qualifiedLeads,
  leadsThisMonth,
  maxLeads,
}) {
  const conversionRate = totalLeads > 0
    ? ((qualifiedLeads / totalLeads) * 100).toFixed(1)
    : 0;
  
  const usagePercent = ((totalLeads / maxLeads) * 100).toFixed(0);
  
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {/* Total Leads */}
      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <svg className="fill-primary dark:fill-white" width="22" height="22">
            {/* Icône users */}
          </svg>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {totalLeads}
            </h4>
            <span className="text-sm font-medium">Total Leads</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
            {usagePercent}% utilisé
          </span>
        </div>
      </div>
      
      {/* Leads Qualifiés */}
      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* ... similaire */}
        <h4>{qualifiedLeads}</h4>
        <span>Leads Qualifiés</span>
      </div>
      
      {/* Taux Conversion */}
      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h4>{conversionRate}%</h4>
        <span>Taux Conversion</span>
      </div>
      
      {/* Ce mois */}
      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h4>{leadsThisMonth}</h4>
        <span>Ce mois-ci</span>
      </div>
    </div>
  );
}
```

### 6.3 Chart Leads

**components/LeadsChart.tsx** 🆕
```tsx
'use client';

import { useEffect, useState } from 'react';
import LineChartOne from '@/components/charts/line/LineChartOne';

export default function LeadsChart({ organizationId }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data pour chart
    // Format: { month: 'Jan', leads: 120 }
  }, [organizationId]);
  
  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Évolution des Leads
        </h4>
      </div>
      
      <LineChartOne data={data} />
    </div>
  );
}
```

### 6.4 Quick Actions

**components/QuickActions.tsx** 🆕
```tsx
import Link from 'next/link';
import Button from '@/components/ui/button/Button';

export default function QuickActions() {
  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Actions Rapides
      </h4>
      
      <div className="space-y-4">
        <Link href="/leads/new">
          <Button variant="primary" className="w-full">
            🚀 Générer de nouveaux leads
          </Button>
        </Link>
        
        <Link href="/campaigns/new">
          <Button variant="secondary" className="w-full">
            📧 Créer une campagne email
          </Button>
        </Link>
        
        <Link href="/leads?filter=qualified">
          <Button variant="secondary" className="w-full">
            ⭐ Voir les leads qualifiés
          </Button>
        </Link>
        
        <Link href="/settings/integrations">
          <Button variant="secondary" className="w-full">
            🔗 Configurer les intégrations
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

### 6.5 Recent Leads Table

**components/RecentLeadsTable.tsx** 🆕
```tsx
import BasicTableOne from '@/components/tables/BasicTableOne';
import Badge from '@/components/ui/badge/Badge';
import Link from 'next/link';

export default function RecentLeadsTable({ leads }) {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Derniers Leads
        </h4>
        <Link href="/leads" className="text-sm text-primary hover:underline">
          Voir tous →
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Nom
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Entreprise
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Poste
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Score
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Statut
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-[#eee] dark:border-strokedark">
                <td className="px-4 py-5">
                  <Link href={`/leads/${lead.id}`} className="hover:text-primary">
                    {lead.firstName} {lead.lastName}
                  </Link>
                </td>
                <td className="px-4 py-5">{lead.company}</td>
                <td className="px-4 py-5">{lead.jobTitle}</td>
                <td className="px-4 py-5">
                  <span className="font-medium">{lead.score || 'N/A'}</span>
                </td>
                <td className="px-4 py-5">
                  <Badge
                    variant={lead.status === 'QUALIFIED' ? 'success' : 'default'}
                  >
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-4 py-5">
                  {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `app/(dashboard)/page.tsx` | ♻️ Modifier | Dashboard principal |
| `app/(dashboard)/components/LeadsStats.tsx` | 🆕 Créer | Stats cards |
| `app/(dashboard)/components/LeadsChart.tsx` | 🆕 Créer | Chart évolution |
| `app/(dashboard)/components/QuickActions.tsx` | 🆕 Créer | Actions rapides |
| `app/(dashboard)/components/RecentLeadsTable.tsx` | 🆕 Créer | Table leads |

**Estimation**: 4-6h

---

## 🎯 Phase 7: Features Produit (12-16h)

### Objectif
Créer les pages principales du produit: Leads, Campaigns, Settings.

### 7.1 Module Leads

```
app/(dashboard)/leads/
├── page.tsx                        # 🆕 Liste leads avec filtres
├── [id]/page.tsx                   # 🆕 Détail lead
├── new/page.tsx                    # 🆕 Génération/Import
└── components/
    ├── LeadsTable.tsx              # 🆕 Table avec tri/pagination
    ├── LeadFilters.tsx             # 🆕 Filtres (statut, secteur, etc.)
    ├── LeadCard.tsx                # 🆕 Card détail lead
    ├── EnrichmentStatus.tsx        # 🆕 Statut enrichissement
    └── ImportModal.tsx             # 🆕 Modal import CSV
```

#### Liste Leads

**app/(dashboard)/leads/page.tsx** 🆕
```tsx
import { getUserOrganization } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import LeadsTable from './components/LeadsTable';
import LeadFilters from './components/LeadFilters';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';

type SearchParams = {
  status?: string;
  industry?: string;
  page?: string;
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { organization } = await getUserOrganization();
  
  const page = parseInt(searchParams.page || '1');
  const perPage = 20;
  
  // Construire where clause
  const where: any = {
    organizationId: organization.id,
    deletedAt: null,
  };
  
  if (searchParams.status) {
    where.status = searchParams.status;
  }
  
  if (searchParams.industry) {
    where.industry = searchParams.industry;
  }
  
  // Récupérer leads
  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.lead.count({ where }),
  ]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Leads
          </h1>
          <p className="mt-1 text-sm text-bodydark">
            {total} leads au total
          </p>
        </div>
        
        <Link href="/leads/new">
          <Button variant="primary">
            + Nouveau Lead
          </Button>
        </Link>
      </div>
      
      <LeadFilters />
      
      <LeadsTable
        leads={leads}
        total={total}
        page={page}
        perPage={perPage}
      />
    </div>
  );
}
```

#### Détail Lead

**app/(dashboard)/leads/[id]/page.tsx** 🆕
```tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import LeadCard from '../components/LeadCard';
import ActivityTimeline from '@/components/ActivityTimeline';
import LeadActions from '../components/LeadActions';

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      activities: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
      tags: {
        include: { tag: true },
      },
    },
  });
  
  if (!lead || lead.deletedAt) {
    notFound();
  }
  
  return (
    <div className="space-y-6">
      <LeadCard lead={lead} />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityTimeline activities={lead.activities} />
        </div>
        
        <div>
          <LeadActions leadId={lead.id} />
        </div>
      </div>
    </div>
  );
}
```

### 7.2 Module Campaigns

```
app/(dashboard)/campaigns/
├── page.tsx                        # 🆕 Liste campagnes
├── [id]/page.tsx                   # 🆕 Détail campagne
├── new/page.tsx                    # 🆕 Créer campagne
└── components/
    ├── CampaignCard.tsx            # 🆕 Card campagne
    ├── CampaignStats.tsx           # 🆕 Stats envois/ouvertures
    └── RecipientsList.tsx          # 🆕 Liste destinataires
```

### 7.3 Settings

```
app/(dashboard)/settings/
├── page.tsx                        # 🆕 Paramètres généraux
├── billing/page.tsx                # ✓ Déjà créé Phase 5
├── team/page.tsx                   # 🆕 Gestion équipe
├── integrations/page.tsx           # 🆕 Webhooks, API keys
└── components/
    ├── TeamMembersList.tsx         # 🆕 Liste membres
    ├── InviteMemberForm.tsx        # 🆕 Inviter membre
    ├── WebhooksList.tsx            # 🆕 Liste webhooks
    └── APIKeyGenerator.tsx         # 🆕 Générer clés API
```

### Server Actions

**app/actions/leads.ts** 🆕
```typescript
'use server';

import { prisma } from '@/lib/prisma';
import { getUser, getUserOrganization } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createLead(data: CreateLeadInput) {
  const user = await getUser();
  const { organization } = await getUserOrganization();
  
  const lead = await prisma.lead.create({
    data: {
      ...data,
      organizationId: organization.id,
      ownerId: user.id,
      status: 'NEW',
    },
  });
  
  revalidatePath('/leads');
  
  return { success: true, lead };
}

export async function updateLead(id: string, data: UpdateLeadInput) {
  const lead = await prisma.lead.update({
    where: { id },
    data,
  });
  
  revalidatePath(`/leads/${id}`);
  revalidatePath('/leads');
  
  return { success: true, lead };
}

export async function deleteLead(id: string) {
  // Soft delete
  await prisma.lead.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
  
  revalidatePath('/leads');
  
  return { success: true };
}

export async function enrichLead(id: string) {
  // TODO: Appel API enrichissement (Clearbit, Hunter.io)
  // Pour l'instant, mock
  
  await prisma.lead.update({
    where: { id },
    data: {
      enrichmentStatus: 'COMPLETED',
      // ... autres champs enrichis
    },
  });
  
  revalidatePath(`/leads/${id}`);
  
  return { success: true };
}
```

**app/actions/campaigns.ts** 🆕
```typescript
'use server';

import { prisma } from '@/lib/prisma';
import { getUserOrganization } from '@/lib/supabase/server';

export async function createCampaign(data: CreateCampaignInput) {
  const { organization } = await getUserOrganization();
  
  const campaign = await prisma.campaign.create({
    data: {
      ...data,
      organizationId: organization.id,
      status: 'DRAFT',
    },
  });
  
  return { success: true, campaign };
}

// ... autres actions campaigns
```

### Fichiers à créer

| Module | Fichiers | Estimation |
|--------|----------|------------|
| Leads | 8 fichiers | 6-8h |
| Campaigns | 6 fichiers | 4-5h |
| Settings | 6 fichiers | 2-3h |

**Estimation**: 12-16h

---

## ✨ Phase 8: Polish & SEO (4-6h)

### Objectif
Finitions, SEO, performance, et tests.

### 8.1 SEO & Metadata

#### Metadata par page

**app/(marketing)/page.tsx** ♻️
```typescript
export const metadata: Metadata = {
  title: 'Génération de Leads B2B par IA | Trouvez des Clients Qualifiés',
  description: 'Notre IA trouve et enrichit automatiquement des leads B2B ultra-qualifiés pour votre entreprise. Essai gratuit sans carte bancaire.',
  keywords: ['génération leads', 'leads B2B', 'prospection automatique', 'IA'],
  openGraph: {
    title: 'Génération de Leads B2B par IA',
    description: 'Trouvez des leads B2B qualifiés automatiquement',
    images: ['/og-image.png'],
    url: 'https://votresite.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Génération de Leads B2B par IA',
    description: 'Trouvez des leads B2B qualifiés automatiquement',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://votresite.com',
  },
};
```

#### robots.txt

**public/robots.txt** 🆕
```
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /settings/
Disallow: /api/

Sitemap: https://votresite.com/sitemap.xml
```

#### Sitemap

**app/sitemap.ts** 🆕
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://votresite.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://votresite.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://votresite.com/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // ...
  ];
}
```

### 8.2 Performance

#### Images optimisées

- Utiliser `next/image` partout
- Compresser images avec TinyPNG
- Formats WebP
- Lazy loading

#### Fonts

**app/layout.tsx** ♻️
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 8.3 Tests

#### Checklist manuelle

- [ ] Auth flow complet (Google OAuth)
- [ ] Onboarding wizard 3 étapes
- [ ] Dashboard affiche stats
- [ ] Création/modification/suppression leads
- [ ] Stripe checkout test
- [ ] Customer Portal accessible
- [ ] Webhook Stripe reçu
- [ ] Navigation sidebar
- [ ] Dark mode toggle
- [ ] Responsive mobile/tablette
- [ ] Lighthouse Performance >= 90

#### Scripts tests

**tests/e2e/auth.spec.ts** (Playwright) 🆕
```typescript
import { test, expect } from '@playwright/test';

test('sign in with Google', async ({ page }) => {
  await page.goto('/signin');
  await page.click('button:has-text("Continuer avec Google")');
  // ... assertions
});
```

### Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `app/sitemap.ts` | Sitemap XML |
| `public/robots.txt` | Robots.txt |
| `public/og-image.png` | Image OpenGraph |
| Metadata dans chaque page | SEO |

**Estimation**: 4-6h

---

## 📦 Récapitulatif Complet

### Statistiques Globales

| Phase | Fichiers à créer | Fichiers à modifier | Temps estimé |
|-------|------------------|---------------------|--------------|
| Phase 1 | 4 | 2 | 3-4h |
| Phase 2 | 12 | 0 | 8-12h |
| Phase 3 | 3 | 2 | 4-6h |
| Phase 4 | 7 | 0 | 6-8h |
| Phase 5 | 8 | 0 | 6-8h |
| Phase 6 | 5 | 1 | 4-6h |
| Phase 7 | 20+ | 0 | 12-16h |
| Phase 8 | 4 | 3 | 4-6h |
| **TOTAL** | **63+** | **8** | **47-66h** |

### Temps estimé total
**47-66 heures** ≈ **3-4 semaines** (à temps plein)

---

## 🚀 Ordre d'Exécution Recommandé

### Semaine 1: Fondations
- ✅ Phase 1: Restructuration App Router
- ✅ Phase 3: Authentification Supabase
- ✅ Phase 4: Onboarding Wizard

### Semaine 2: UI & Billing
- ✅ Phase 2: Composants Marketing
- ✅ Phase 5: Billing Stripe

### Semaine 3: Produit
- ✅ Phase 6: Dashboard
- ✅ Phase 7: Features Produit (Leads)

### Semaine 4: Finitions
- ✅ Phase 7: Features Produit (Campaigns, Settings)
- ✅ Phase 8: Polish & SEO

---

## 📋 Prérequis Avant de Commencer

### 1. Configuration Supabase
- [ ] Projet Supabase créé
- [ ] Tables créées (via Prisma migrate)
- [ ] RLS activé et policies créées
- [ ] Google OAuth configuré dans Supabase Dashboard
- [ ] Storage buckets créés: `avatars`, `imports`, `documents`

### 2. Configuration Stripe
- [ ] Compte Stripe (mode test)
- [ ] Produits créés (Starter, Pro, Enterprise)
- [ ] Webhook endpoint configuré
- [ ] Customer Portal activé

### 3. Configuration Google OAuth
- [ ] Projet Google Cloud Console
- [ ] OAuth Consent Screen configuré
- [ ] Credentials OAuth 2.0 créés
- [ ] Redirect URIs ajoutées

### 4. Variables d'environnement
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Dépendances à installer
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install @prisma/client
npm install stripe @stripe/stripe-js
npm install zod react-hook-form @hookform/resolvers
```

---

## 🎯 Critères de Validation

### Checklist Finale

#### Auth & Onboarding
- [ ] Connexion Google fonctionne end-to-end
- [ ] Callback créé user dans BDD
- [ ] Premier login → /onboarding
- [ ] Onboarding 3 étapes complété
- [ ] Leads générés après onboarding
- [ ] Logins suivants → /dashboard
- [ ] Middleware protège routes /dashboard/*

#### Landing
- [ ] Toutes sections affichées
- [ ] Responsive (mobile/tablette/desktop)
- [ ] Dark mode fonctionne
- [ ] Animations hover
- [ ] Lighthouse Performance >= 90
- [ ] Images optimisées (next/image)
- [ ] Metadata SEO complète

#### Dashboard
- [ ] Stats cards affichées
- [ ] Charts avec vraies données
- [ ] Table leads affichée
- [ ] Navigation sidebar fonctionne
- [ ] Layout TailAdmin conservé

#### Billing
- [ ] Page /pricing affiche 3 plans
- [ ] Bouton "Choisir" → Stripe Checkout
- [ ] Paiement test → Webhook reçu
- [ ] Plan mis à jour dans BDD
- [ ] Page /settings/billing affiche plan actuel
- [ ] Customer Portal accessible
- [ ] Downgrade/upgrade fonctionne

#### Leads
- [ ] Liste leads avec pagination
- [ ] Filtres (statut, secteur)
- [ ] Détail lead affiche infos complètes
- [ ] Timeline d'activités
- [ ] Création lead
- [ ] Modification lead
- [ ] Suppression lead (soft delete)
- [ ] Import CSV

#### Qualité Code
- [ ] Pas d'erreurs TypeScript
- [ ] Pas d'erreurs ESLint
- [ ] Code formaté (Prettier)
- [ ] Tous les Server Components sont async
- [ ] Tous les Client Components ont "use client"
- [ ] Actions utilisent "use server"

---

## 📚 Ressources & Documentation

### Documentation à consulter
- `.cursor/memory-bank/landing-architecture.md` - Architecture complète
- `.cursor/memory-bank/database.md` - Schéma BDD Prisma
- `.cursor/memory-bank/components.md` - Composants TailAdmin
- `lib/supabase/README.md` - Guide Supabase
- `docs/ENV_TEMPLATE.md` - Variables d'environnement

### Inspirations Design
- [MeetSponsors](https://meetsponsors.com) - Structure générale
- [Linear](https://linear.app) - Animations
- [Vercel](https://vercel.com) - Hero sections
- [Stripe](https://stripe.com/fr) - Pricing

### Stack Technique
- Next.js 15.2.3 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4
- Prisma + PostgreSQL (Supabase)
- Supabase Auth
- Stripe Billing
- ApexCharts
- Zod + React Hook Form

---

## 🎉 Prochaines Étapes Après Implémentation

### 1. Personnalisation
- Remplacer contenu lorem ipsum par vrai contenu
- Ajouter logos clients réels
- Screenshots de vraie interface
- Histoire fondateur authentique

### 2. Features Avancées
- Génération IA réelle (OpenAI, Anthropic)
- Enrichissement API (Clearbit, Hunter.io, LinkedIn)
- Séquences email avec templates
- Webhooks sortants
- Intégrations CRM (Salesforce, HubSpot)
- Export avancé (CSV, Excel, API)

### 3. Analytics
- Posthog / Mixpanel
- Google Analytics 4
- Hotjar / Microsoft Clarity

### 4. Monitoring
- Sentry (error tracking)
- Vercel Analytics
- Uptime monitoring

### 5. Déploiement
- Déployer sur Vercel
- Configurer domaine custom
- SSL configuré
- Webhooks Stripe en production

---

**Document créé le**: 2025-10-17  
**Dernière mise à jour**: 2025-10-17  
**Version**: 1.0  

---

Prêt à commencer ? 🚀

Dites-moi quelle phase vous voulez que je commence à implémenter !

