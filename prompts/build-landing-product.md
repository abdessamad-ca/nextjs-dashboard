# Prompt Cursor : Construire Landing + Product B2B Lead Generation

Prompt optimisé pour transformer votre template TailAdmin en SAAS complet de génération de leads B2B, inspiré de MeetSponsors.

---

## 🎯 Prompt Principal

```
Tu es un architecte senior Next.js 15 embarqué dans mon repo. 

OBJECTIF : Refactorer mon SAAS de génération de leads B2B pour avoir une structure Landing/Product moderne type MeetSponsors, tout en gardant ma stack actuelle et mes composants TailAdmin existants.

CONTEXTE PROJET :
- Stack : Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Prisma + Supabase
- Auth : Supabase Auth (Google Provider)
- Billing : Stripe (Checkout + Customer Portal)  
- UI : Composants TailAdmin existants à réutiliser
- BDD : 18 tables Prisma avec Organizations, Leads, Campaigns, ImportJobs, EmailSequences, Webhooks, etc.
- Documentation : Memory Bank complète dans .cursor/memory-bank/

CONTRAINTES :
- Garder les composants TailAdmin existants (Header, Sidebar, Charts, Tables)
- Utiliser Supabase Auth (pas NextAuth)
- Intégration Prisma déjà configurée
- Pas de breaking changes sur la BDD actuelle
- Commits incrémentaux et testables

LIVRABLES :

1) ARCHITECTURE APP ROUTER
Consulter : @.cursor/memory-bank/landing-architecture.md

Créer structure :
```
/src/app/
├── (marketing)/       # Landing pages
│   ├── layout.tsx    # NavBar marketing + Footer
│   ├── page.tsx      # Homepage Hero + sections
│   ├── pricing/
│   ├── faq/
│   └── demo/
├── (auth)/           # Auth pages
│   ├── signin/
│   ├── signup/
│   └── callback/
├── (dashboard)/      # App protégée (réutilise layout TailAdmin)
│   ├── layout.tsx    # Layout TailAdmin existant
│   ├── page.tsx      # Dashboard
│   ├── onboarding/
│   ├── leads/
│   ├── campaigns/
│   └── settings/
│       └── billing/
```

2) COMPOSANTS MARKETING (Tailwind v4)
Créer composants inspirés MeetSponsors :

Landing sections :
- HeroSection : Badge "10,000+ Leads" + Titre gradient + Input "votreentreprise.com" + CTA
- ProblemSection : 2 colonnes "Sans/Avec" listant 10 problèmes vs 6 solutions
- BenefitsGrid : 6 cartes avec icônes + titres + descriptions
- HowItWorks : 3 étapes numérotées avec icônes emoji
- DemoPreview : Aperçu interface avec screenshot/vidéo
- SocialProof : Logos clients + témoignages
- PricingSection : 3 cards (Starter 49€, Pro 99€, Enterprise 249€)
- FounderStory : Photo + histoire fondateur comme Benjamin de MeetSponsors
- FAQAccordion : 10 questions-réponses avec accordéon
- FinalCTA : Call-to-action final avec input email

Layout components :
- MarketingNav : Logo + liens (Tarifs, FAQ, Demo) + CTA "Essayer Gratuit" + "Connexion"
- MarketingFooter : Liens légaux, réseaux sociaux, contact

STYLE :
- Réutiliser variables Tailwind TailAdmin (primary, stroke, boxdark, etc.)
- Responsive mobile-first
- Dark mode support
- Animations subtiles (hover, fade-in)
- Core Web Vitals >= 90

3) AUTHENTIFICATION SUPABASE
Fichiers à créer/modifier :

lib/supabase/auth-helpers.ts :
```typescript
export async function signInWithGoogle()
export async function signOut()
export async function getUser()
export async function requireAuth() // Middleware helper
```

app/(auth)/signin/page.tsx :
- Bouton "Continuer avec Google" avec logo
- États loading + error
- Redirection vers /onboarding si premier login, /dashboard sinon

app/(auth)/callback/route.ts :
- Gestion callback Supabase OAuth
- Création user dans table users si nouveau
- Redirection appropriée

middleware.ts :
- Protéger routes /dashboard/* et /settings/*
- Vérifier session Supabase
- Rediriger vers /signin si non authentifié

4) ONBOARDING (3 étapes wizard)
app/(dashboard)/onboarding/page.tsx :

Étape 1 : Entreprise
- Nom entreprise
- Secteur d'activité (dropdown)
- Site web

Étape 2 : Client Idéal
- Secteur cible
- Taille entreprise (Micro/PME/Moyenne/Grande/Enterprise)
- Postes décisionnaires (CEO, CTO, etc.)
- Budget moyen

Étape 3 : Génération IA (loading)
- Animation "Analyse en cours..."
- Appel API /api/generate-leads
- Création premiers leads dans BDD
- Redirection /dashboard avec succès

Sauvegarder dans :
- Table Organization (créer si n'existe pas)
- Preferences utilisateur

5) BILLING STRIPE
Configuration produits Stripe (à faire manuellement) :
- Starter : 49€/mois (price_starter_monthly)
- Pro : 99€/mois (price_pro_monthly)  
- Enterprise : 249€/mois (price_enterprise_monthly)

app/actions/billing.ts :
```typescript
'use server'
export async function createCheckoutSession(priceId: string)
export async function createPortalSession()
export async function cancelSubscription()
```

app/api/webhooks/stripe/route.ts :
- Écouter : checkout.session.completed
- Écouter : customer.subscription.updated
- Écouter : customer.subscription.deleted
- Mettre à jour Organization.plan et Organization.stripeCustomerId

app/(dashboard)/settings/billing/page.tsx :
- Afficher plan actuel + limites utilisées
- Boutons upgrade/downgrade
- Accès Customer Portal Stripe
- Historique factures

6) DASHBOARD (réutiliser TailAdmin)
app/(dashboard)/page.tsx :

Garder layout TailAdmin (Sidebar + Header) existant.

Contenu :
- 4 DataStats cards : Leads Total, Leads Qualifiés, Taux Conversion, CA Généré
- ChartOne : Évolution leads par mois
- ChartTwo : Répartition par secteur
- TableOne : Derniers leads ajoutés
- CTA : "Générer plus de leads" si limite plan atteinte

7) CONFIGURATION & ENV
.env.example :
```env
# Supabase (déjà configuré)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

8) SEO & METADATA
Chaque page doit exporter metadata :
```typescript
export const metadata: Metadata = {
  title: "Générez des Leads B2B Qualifiés | VotreNom",
  description: "Notre IA trouve les entreprises prêtes à acheter...",
  openGraph: { ... },
}
```

CRITÈRES DE VALIDATION :
✓ Landing responsive + Lighthouse >= 90
✓ Auth Google end-to-end fonctionnel
✓ Onboarding wizard 3 étapes complet
✓ Routes dashboard protégées par Supabase Auth
✓ Stripe checkout + portal fonctionnels (test mode)
✓ Dark mode sur toute l'app
✓ Composants TailAdmin réutilisés dans dashboard
✓ Pas d'erreurs TypeScript
✓ Pas d'erreurs ESLint

PLAN D'EXÉCUTION :
1. Analyse repo actuel et composants TailAdmin disponibles
2. Créer structure (marketing) avec layout
3. Créer composants marketing un par un
4. Setup auth Supabase + middleware
5. Créer onboarding wizard
6. Intégrer Stripe billing
7. Adapter dashboard avec TailAdmin
8. Tests flows complets

Commence par analyser le repo et propose un plan fichier par fichier détaillé.
Puis produis les patches (diffs) pour chaque fichier.
Enfin, génère une checklist de vérification.
```

---

## 📋 Checklist Post-Implémentation

Une fois le prompt exécuté, vérifier :

### Auth Flow
- [ ] Clic "Essayer Gratuit" → /signup
- [ ] Clic "Continuer avec Google" → OAuth
- [ ] Callback Supabase → Création user BDD
- [ ] Premier login → /onboarding
- [ ] Logins suivants → /dashboard
- [ ] Bouton déconnexion fonctionne

### Onboarding
- [ ] 3 étapes affichées avec progress bar
- [ ] Validation champs obligatoires
- [ ] Bouton "Retour" fonctionne
- [ ] Étape 3 : Animation loading
- [ ] Données sauvegardées dans Organization
- [ ] Redirection /dashboard après complétion

### Billing
- [ ] Page /pricing affiche 3 plans
- [ ] Clic "Choisir" → Stripe Checkout
- [ ] Paiement test → Webhook reçu
- [ ] Plan mis à jour dans BDD
- [ ] /settings/billing affiche plan actuel
- [ ] Customer Portal accessible

### Dashboard
- [ ] Layout TailAdmin chargé (Sidebar + Header)
- [ ] 4 cards stats affichées
- [ ] Charts avec données
- [ ] Table leads fonctionnelle
- [ ] Navigation sidebar fonctionne

### Landing
- [ ] Toutes sections visibles
- [ ] Responsive mobile/tablette/desktop
- [ ] Dark mode toggle fonctionne
- [ ] Animations hover
- [ ] Lighthouse Performance >= 90
- [ ] Images optimisées (next/image)

---

## 🎨 Personnalisations Recommandées

Après implémentation du prompt, personnaliser :

### 1. Contenu Landing
- Remplacer "10,000+ Leads" par vos vrais chiffres
- Ajouter logos clients réels
- Screenshots de votre vraie interface
- Histoire fondateur authentique

### 2. Branding
- Couleur primary (actuellement #3C50E0)
- Logo et favicon
- Police custom (optionnel)
- Illustrations/icônes

### 3. Copy Marketing
- Titre hero unique
- Problèmes spécifiques à votre cible
- Bénéfices différenciants
- FAQ basée sur vraies questions clients

### 4. Features
- Activer génération IA réelle (pas juste mock)
- Connecter API enrichissement (Clearbit, Hunter.io)
- Implémenter séquences emails
- Ajouter webhooks

---

## 🚀 Utilisation du Prompt

### Dans Cursor Chat

1. **Copier le prompt principal** ci-dessus
2. **Ajouter contexte** :
   ```
   @.cursor/memory-bank/landing-architecture.md
   @.cursor/memory-bank/database.md
   @.cursor/memory-bank/components.md
   ```
3. **Lancer** :
   ```
   [Coller le prompt]
   
   Commence par analyser le repo et propose le plan détaillé.
   ```

### En Mode Agent

Si vous utilisez Cursor en mode Agent :

1. Créer un nouveau chat
2. Activer "Agent mode"
3. Coller le prompt
4. L'agent va :
   - Analyser le repo
   - Proposer un plan
   - Créer les fichiers un par un
   - Tester au fur et à mesure

---

## 📚 Ressources Complémentaires

### Documentation à Consulter

Avant de lancer le prompt :
- `.cursor/memory-bank/landing-architecture.md` - Architecture complète
- `.cursor/memory-bank/components.md` - Composants TailAdmin disponibles
- `.cursor/memory-bank/database.md` - Schéma BDD
- `lib/supabase/README.md` - Guide Supabase

### Inspirations Design

Pour le style visuel :
- [MeetSponsors](https://meetsponsors.com) - Structure générale
- [Linear](https://linear.app) - Animations subtiles
- [Vercel](https://vercel.com) - Hero sections
- [Stripe](https://stripe.com/fr) - Pricing cards

---

## 🎯 Prochaines Étapes

Après l'implémentation :

1. **Semaine 1** : Landing + Auth
2. **Semaine 2** : Onboarding + Dashboard
3. **Semaine 3** : Billing + Settings
4. **Semaine 4** : Polish + Tests + Deploy

---

**Temps estimé total** : 3-4 semaines  
**Complexité** : Moyenne (architecture claire)  
**ROI** : Très élevé (conversion x3-5)

