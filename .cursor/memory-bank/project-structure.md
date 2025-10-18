# Structure du Projet TailAdmin

## Architecture des dossiers

```
/src
  /app                        # Next.js App Router
    /(admin)                  # Routes admin groupées
      /(others-pages)         # Pages diverses
      /(ui-elements)          # Éléments UI
      layout.tsx              # Layout admin
      page.tsx                # Dashboard principal
    /(full-width-pages)       # Pages pleine largeur
      /(auth)                 # Pages authentification
        /signin/page.tsx
        /signup/page.tsx
      /(error-pages)          # Pages erreur
      layout.tsx              # Layout pleine largeur
    layout.tsx                # Layout racine
    globals.css               # Styles globaux Tailwind
    not-found.tsx             # Page 404

  /components
    /auth                     # Composants authentification
      SignInForm.tsx
      SignUpForm.tsx
    /calendar                 # Composant calendrier
      Calendar.tsx
    /charts                   # Composants graphiques
      /bar
        BarChart.tsx
      /line
        LineChart.tsx
    /common                   # Composants communs
      ChartTab.tsx
      ComponentCard.tsx
      GridShape.tsx
      PageBreadCrumb.tsx
      ThemeToggleButton.tsx
    /ecommerce                # Composants e-commerce
      [7 fichiers]
    /form                     # Éléments de formulaire
      [23 fichiers]
    /header                   # Composants header
      NotificationDropdown.tsx
      UserDropdown.tsx
    /tables                   # Composants tableaux
      [2 fichiers]
    /ui                       # Composants UI génériques
      [14 fichiers]
    /user-profile             # Profil utilisateur
      [3 fichiers]
    /videos                   # Composants vidéo
      [4 fichiers]

  /context
    SidebarContext.tsx        # Context sidebar
    ThemeContext.tsx          # Context thème dark/light

  /hooks
    useGoBack.ts              # Hook navigation retour
    useModal.ts               # Hook gestion modales

  /icons                      # Icônes SVG
    [48 fichiers SVG]
    index.tsx                 # Export centralisé

  /layout
    AppHeader.tsx             # En-tête principal
    AppSidebar.tsx            # Sidebar principale
    Backdrop.tsx              # Overlay backdrop
    SidebarWidget.tsx         # Widget sidebar

/lib
  /api                        # Clients API
  /services                   # Services métier
  /validations                # Schémas Zod

/public
  /images                     # Images statiques
    /brand
    /cards
    /carousel
    /chat
    /country
    /error
    /grid-image
    /icons
    /logo
    /product
    /shape
    /task
    /user
    /video-thumb

/.cursor
  /memory-bank                # Documentation projet
  /rules                      # Règles de code
  mcp.json                    # Config serveurs MCP

/prompts                      # Templates de prompts

/docs                         # Documentation
```

## Conventions de nommage

### Fichiers et dossiers
- Composants : PascalCase (ChartOne.tsx)
- Pages : kebab-case dans routes (form-elements)
- Types : PascalCase dans /types
- Hooks : useCamelCase
- Routes groupées : (nom-groupe)

### Code
- Variables/fonctions : camelCase
- Constantes : UPPER_SNAKE_CASE
- Types/Interfaces : PascalCase
- Classes CSS : kebab-case (Tailwind)

## Organisation des imports

```typescript
// 1. Modules externes
import { useState } from "react";
import Link from "next/link";

// 2. Modules internes (alias @/)
import { Button } from "@/components/ui/Button";
import { useModal } from "@/hooks/useModal";

// 3. Fichiers relatifs
import styles from "./styles.module.css";

// 4. Types
import type { User } from "@/types";
```

## Ajout de nouvelles fonctionnalités

### Nouvelle page
1. Créer dans `/src/app/(admin)/[nom-page]/page.tsx`
2. Importer layout approprié
3. Ajouter dans navigation sidebar si nécessaire

### Nouveau composant
1. Créer dans `/src/components/[Categorie]/[NomComposant].tsx`
2. Définir types d'interface
3. Exporter depuis index si nécessaire

### Nouveau type
1. Créer dans `/lib/validations/[domaine].ts`
2. Utiliser Zod pour validation
3. Exporter type inféré

