# SAAS Génération de Lead - Dashboard

## Vue d'ensemble
Dashboard admin professionnel pour la génération et gestion de leads B2B.
Basé sur TailAdmin (Next.js 15 + Tailwind CSS v4)

## Liens rapides
- [Vision Produit](./product-vision.md)
- [Architecture](./tech-context.md)
- [Structure du Projet](./project-structure.md)
- [Base de données](./database.md)
- [Décisions](./decisions.md)
- [Composants](./components.md)

## Stack technique
- **Framework**: Next.js 15.2.3 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Charts**: ApexCharts
- **Maps**: JSVectorMap
- **Forms**: React Hook Form (à ajouter)
- **Validation**: Zod (à ajouter)
- **Auth**: À configurer (NextAuth / Clerk / Supabase)
- **Database**: À configurer (Prisma + PostgreSQL / Supabase)
- **Deployment**: VPS

## Composants TailAdmin disponibles

### Pages
- Dashboard Analytics
- Calendar
- Profile
- Forms (elements, layout)
- Tables
- Settings
- Chart (basic)
- UI (Alerts, Buttons, Badges)
- Auth (Sign In, Sign Up)

### Composants UI
- Sidebar (collapsible)
- Header (search, notifications, dark mode)
- Breadcrumb
- DataStats (cards statistiques)
- ChatCard
- TableOne, TableTwo, TableThree
- ChartOne (Line), ChartTwo (Bar), ChartThree (Pie)
- MapOne (JSVectorMap)

## Objectif du projet
Créer une plateforme SaaS pour :
1. Générer des leads qualifiés
2. Gérer et scorer les leads
3. Automatiser les campagnes de prospection
4. Analytics et reporting avancés
5. Intégration CRM

## Prochaines étapes
1. Configurer l'authentification
2. Définir le schéma de base de données
3. Créer les pages de gestion de leads
4. Implémenter les API de génération de leads
5. Dashboard analytics personnalisé

