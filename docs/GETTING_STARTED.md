# 🚀 Guide de démarrage rapide

Ce guide vous accompagne pas à pas pour démarrer avec votre projet SAAS de génération de leads.

---

## 📋 Checklist de démarrage

### ✅ Phase 1 : Setup initial (15 minutes)

- [ ] Node.js 18+ installé
- [ ] PostgreSQL installé et lancé
- [ ] Git configuré
- [ ] Clone du repository
- [ ] Dépendances installées : `npm install --legacy-peer-deps`

### ✅ Phase 2 : Configuration BDD (10 minutes)

- [ ] Copier `.env.example` vers `.env`
- [ ] Configurer `DATABASE_URL` dans `.env`
- [ ] Installer Prisma : `npm install prisma @prisma/client`
- [ ] Créer le schéma Prisma (voir `database.md`)
- [ ] Lancer `npx prisma db push`
- [ ] Vérifier avec `npx prisma studio`

### ✅ Phase 3 : Authentification (20 minutes)

- [ ] Installer NextAuth : `npm install next-auth @auth/prisma-adapter bcryptjs`
- [ ] Générer secret : `openssl rand -base64 32`
- [ ] Ajouter `NEXTAUTH_SECRET` dans `.env`
- [ ] Créer `lib/auth.ts` (voir documentation)
- [ ] Créer API route `/api/auth/[...nextauth]/route.ts`
- [ ] Tester connexion

### ✅ Phase 4 : Premier développement (30 minutes)

- [ ] Lire `.cursor/memory-bank/index.md`
- [ ] Parcourir les composants existants
- [ ] Créer votre première page personnalisée
- [ ] Tester en local : `npm run dev`

---

## 🎯 Premiers pas recommandés

### 1. Familiarisez-vous avec la structure

```bash
# Explorer les dossiers principaux
ls -la src/app/
ls -la src/components/
ls -la .cursor/memory-bank/
```

### 2. Lancez le projet en mode dev

```bash
npm run dev
```

Ouvrir http://localhost:3000

### 3. Explorez les pages existantes

- **Dashboard** : `/` - Vue d'ensemble
- **Calendar** : `/calendar` - Calendrier
- **Forms** : `/forms/form-elements` - Éléments de formulaire
- **Tables** : `/tables` - Tables de données
- **Auth** : `/auth/signin` - Connexion

### 4. Testez les composants TailAdmin

Tous les composants sont documentés dans `.cursor/memory-bank/components.md`

---

## 🔧 Configuration de votre IDE (Cursor)

### 1. Ouvrir le projet

```bash
cursor .
```

### 2. Initialiser l'IA avec votre contexte

Copier ce prompt dans Cursor Chat :

```
Lis attentivement ces fichiers pour comprendre mon projet :

@.cursor/memory-bank/index.md
@.cursor/memory-bank/project-structure.md
@.cursor/memory-bank/tech-context.md
@.cursor/memory-bank/components.md

Et familiarise-toi avec mes règles de code :

@.cursor/rules/tailadmin-structure.md
@.cursor/rules/nextjs-15-strict.md
@.cursor/rules/typescript-quality.md

Confirme que tu as compris :
1. Que je pars du template TailAdmin
2. Les composants disponibles
3. La structure Next.js 15 App Router
4. Mes standards de qualité TypeScript

Ne code rien, confirme juste ta compréhension.
```

### 3. Activer les serveurs MCP

Les serveurs MCP sont configurés dans `.cursor/mcp.json` et activés automatiquement.

---

## 🎨 Créer votre première page personnalisée

### Option 1 : Avec l'aide de l'IA

```
@prompts/create-page.md

Page à créer : Dashboard Leads

Description : Page listant tous les leads avec filtres (statut, score) et possibilité de créer un nouveau lead.

Composants TailAdmin :
- PageBreadCrumb
- DataStats (cards de stats)
- TableOne (liste des leads)
- Bouton "Nouveau lead"

Data : Récupérer depuis Prisma

MODE PLAN uniquement.
```

### Option 2 : Manuellement

1. **Créer le fichier** : `src/app/(admin)/leads/page.tsx`

```tsx
import { Metadata } from "next";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "Gestion des Leads | Mon SAAS",
  description: "Gérez vos leads de prospection",
};

export default function LeadsPage() {
  return (
    <>
      <PageBreadCrumb pageName="Mes Leads" />
      
      <div className="flex flex-col gap-10">
        {/* Votre contenu ici */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Liste des Leads
            </h4>
          </div>
          {/* Tableau ou contenu */}
        </div>
      </div>
    </>
  );
}
```

2. **Ajouter dans la navigation** : `src/layout/AppSidebar.tsx`

---

## 📚 Ressources utiles

### Documentation interne
- **Vue d'ensemble** : `.cursor/memory-bank/index.md`
- **Composants disponibles** : `.cursor/memory-bank/components.md`
- **Architecture technique** : `.cursor/memory-bank/tech-context.md`
- **Base de données** : `.cursor/memory-bank/database.md`

### Templates de prompts
- **Créer une page** : `prompts/create-page.md`
- **Créer un composant** : `prompts/create-component.md`
- **Ajouter une feature** : `prompts/add-feature.md`
- **Debug une erreur** : `prompts/debug-error.md`

### Règles de code
- **Structure TailAdmin** : `.cursor/rules/tailadmin-structure.md`
- **Next.js 15** : `.cursor/rules/nextjs-15-strict.md`
- **TypeScript qualité** : `.cursor/rules/typescript-quality.md`

---

## ⚡ Commandes fréquentes

```bash
# Développement
npm run dev                    # Lancer le serveur dev
npm run build                  # Build production
npm run start                  # Lancer en prod

# Qualité de code
npm run lint                   # Vérifier erreurs
npm run lint:fix               # Corriger automatiquement
npm run format                 # Formater avec Prettier
npm run type-check             # Vérifier types TypeScript

# Base de données
npx prisma studio              # Interface visuelle BDD
npx prisma generate            # Générer client Prisma
npx prisma db push             # Sync schéma avec BDD
npx prisma migrate dev         # Créer migration
```

---

## 🐛 Problèmes courants

### Erreur : "Module not found"
**Solution** : Vérifier que les dépendances sont installées
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Erreur : "Can't resolve '@/...' "
**Solution** : Vérifier `tsconfig.json` paths
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Erreur Prisma : "Property does not exist"
**Solution** : Régénérer le client Prisma
```bash
npx prisma generate
```

### Erreur : "use client" manquant
**Solution** : Ajouter `"use client"` en haut du fichier si le composant utilise des hooks

---

## 🎯 Prochaines étapes

Maintenant que votre environnement est configuré :

1. **Semaine 1** : Configurer authentification complète
2. **Semaine 2** : Créer CRUD Leads (Create, Read, Update, Delete)
3. **Semaine 3** : Dashboard analytics avec vraies données
4. **Semaine 4** : Scoring automatique des leads

Consultez la roadmap complète dans `README.md`.

---

## 💡 Conseils

### Développement avec IA
- Toujours commencer par MODE PLAN avant d'implémenter
- Utiliser les templates de prompts dans `/prompts/`
- Référencer la documentation Memory Bank avec `@`
- Valider le plan avant l'implémentation

### Qualité de code
- Lancer `npm run type-check` régulièrement
- Formater avec `npm run format` avant chaque commit
- Respecter les règles dans `.cursor/rules/`
- Pas de `any` en TypeScript

### Performance
- Server Components par défaut
- Client Components uniquement si nécessaire (interactivité)
- Lazy load les composants lourds (charts)
- Toujours utiliser `next/image` pour les images

---

**Vous êtes prêt ! 🚀**

Si vous avez des questions, consultez la documentation dans `.cursor/memory-bank/` ou utilisez les templates de prompts.

