# Règles TypeScript Qualité

## Types obligatoires

### Props de composants
```tsx
// ✅ Bon - Interface explicite
interface LeadCardProps {
  lead: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    status: LeadStatus;
  };
  onSelect?: (leadId: string) => void;
  className?: string;
}

const LeadCard: React.FC<LeadCardProps> = ({ 
  lead, 
  onSelect,
  className 
}) => {
  return <div className={className} onClick={() => onSelect?.(lead.id)}>
    {/* ... */}
  </div>;
};

// ❌ Mauvais - Props non typées
const LeadCard = ({ lead, onSelect }) => {
  // ...
};
```

### Types réutilisables avec Zod
```tsx
// lib/validations/lead.ts
import { z } from "zod";

export const leadStatusEnum = z.enum([
  "NEW",
  "CONTACTED", 
  "QUALIFIED",
  "CONVERTED",
  "LOST"
]);

export const leadSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string().min(2, "Minimum 2 caractères"),
  lastName: z.string().min(2, "Minimum 2 caractères"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  status: leadStatusEnum,
  score: z.number().int().min(0).max(100),
  createdAt: z.date(),
});

// Types TypeScript inférés automatiquement
export type Lead = z.infer<typeof leadSchema>;
export type LeadStatus = z.infer<typeof leadStatusEnum>;

// Schéma pour création (sans id, createdAt)
export const createLeadSchema = leadSchema.omit({ 
  id: true, 
  createdAt: true,
  score: true 
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
```

### Fonctions
```tsx
// ❌ Mauvais - Types implicites
function processLead(lead) {
  return {
    fullName: `${lead.firstName} ${lead.lastName}`,
    score: calculateScore(lead)
  };
}

// ✅ Bon - Types explicites
interface ProcessedLead {
  fullName: string;
  score: number;
}

function processLead(lead: Lead): ProcessedLead {
  return {
    fullName: `${lead.firstName} ${lead.lastName}`,
    score: calculateScore(lead),
  };
}

// ✅ Encore mieux - Avec validation
function processLead(input: unknown): ProcessedLead {
  const lead = leadSchema.parse(input); // Validation runtime
  
  return {
    fullName: `${lead.firstName} ${lead.lastName}`,
    score: calculateScore(lead),
  };
}
```

### State avec TypeScript
```tsx
"use client";

import { useState } from "react";
import type { Lead, LeadStatus } from "@/lib/validations/lead";

export default function LeadManager() {
  // ✅ Type explicite pour state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState<{
    status?: LeadStatus;
    minScore?: number;
  }>({});
  
  // ✅ Type inféré automatiquement pour state simple
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  return <div>{/* ... */}</div>;
}
```

### Async/Await
```tsx
// ❌ Mauvais
async function getLeads() {
  const response = await fetch('/api/leads');
  return response.json(); // Type: any
}

// ✅ Bon
async function getLeads(): Promise<Lead[]> {
  const response = await fetch('/api/leads');
  const data = await response.json();
  
  // Validation runtime avec Zod
  return z.array(leadSchema).parse(data);
}

// ✅ Avec gestion d'erreur
async function getLeads(): Promise<Lead[]> {
  try {
    const response = await fetch('/api/leads');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return z.array(leadSchema).parse(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch leads:', error.message);
    }
    throw error;
  }
}
```

## Interdictions strictes

### JAMAIS utiliser `any`
```tsx
// ❌ INTERDIT
function handleData(data: any) { }
const result: any = getValue();

// ✅ Utiliser unknown si type vraiment inconnu
function handleData(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript sait que data est string ici
    console.log(data.toUpperCase());
  }
}

// ✅ Ou créer un type guard
function isLead(value: unknown): value is Lead {
  return (
    typeof value === 'object' &&
    value !== null &&
    'firstName' in value &&
    'email' in value
  );
}

function processData(data: unknown) {
  if (isLead(data)) {
    // TypeScript sait que data est Lead
    console.log(data.firstName);
  }
}
```

### JAMAIS utiliser `@ts-ignore`
```tsx
// ❌ INTERDIT
// @ts-ignore
const value = someFunction();

// ✅ Corriger le problème ou typer explicitement
const value = someFunction() as ExpectedType;

// ✅ Ou utiliser type guard
if (isSomeType(value)) {
  // Utiliser value
}
```

### JAMAIS laisser de types incomplets
```tsx
// ❌ Mauvais
interface User {
  name: string;
  // Oubli du reste des propriétés
}

// ✅ Bon - Complet
interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
```

## Organisation des types

### Structure des fichiers
```
/lib
  /validations
    auth.ts       # Schémas Zod + types auth
    lead.ts       # Schémas Zod + types leads
    campaign.ts   # Schémas Zod + types campagnes
    common.ts     # Types partagés
```

### Fichier de validation type
```typescript
// lib/validations/lead.ts
import { z } from "zod";

// ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

export const leadStatusEnum = z.enum([
  "NEW",
  "CONTACTED", 
  "QUALIFIED",
  "CONVERTED",
  "LOST"
]);

export const leadSourceEnum = z.enum([
  "MANUAL",
  "IMPORT",
  "API",
  "LINKEDIN",
  "WEBSITE",
]);

// ─────────────────────────────────────────
// SCHÉMAS
// ─────────────────────────────────────────

export const leadSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string().min(2, "Minimum 2 caractères"),
  lastName: z.string().min(2, "Minimum 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  status: leadStatusEnum,
  source: leadSourceEnum,
  score: z.number().int().min(0).max(100),
  ownerId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schéma pour création
export const createLeadSchema = leadSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  score: true,
}).extend({
  // Champs optionnels différents pour création
  status: leadStatusEnum.default("NEW"),
  source: leadSourceEnum.default("MANUAL"),
});

// Schéma pour mise à jour
export const updateLeadSchema = createLeadSchema.partial();

// Schéma pour filtres
export const leadFiltersSchema = z.object({
  status: leadStatusEnum.optional(),
  source: leadSourceEnum.optional(),
  minScore: z.number().int().min(0).max(100).optional(),
  ownerId: z.string().optional(),
  search: z.string().optional(),
});

// ─────────────────────────────────────────
// TYPES EXPORTÉS
// ─────────────────────────────────────────

export type Lead = z.infer<typeof leadSchema>;
export type LeadStatus = z.infer<typeof leadStatusEnum>;
export type LeadSource = z.infer<typeof leadSourceEnum>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadFilters = z.infer<typeof leadFiltersSchema>;

// ─────────────────────────────────────────
// TYPES UTILITAIRES
// ─────────────────────────────────────────

export type LeadWithOwner = Lead & {
  owner?: {
    id: string;
    name: string;
    email: string;
  };
};

export type LeadSummary = Pick<Lead, 'id' | 'firstName' | 'lastName' | 'email' | 'status'>;
```

## Utility Types

### Types React courants
```tsx
// Props avec children
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Event handlers
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Refs
import { useRef } from 'react';

function Component() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return <input ref={inputRef} />;
}
```

### Utility types TypeScript
```tsx
// Pick - Sélectionner propriétés
type LeadSummary = Pick<Lead, 'id' | 'firstName' | 'lastName' | 'email'>;

// Omit - Exclure propriétés
type LeadWithoutDates = Omit<Lead, 'createdAt' | 'updatedAt'>;

// Partial - Rendre tout optionnel
type PartialLead = Partial<Lead>;

// Required - Rendre tout obligatoire
type RequiredLead = Required<Lead>;

// Record - Objet avec clés typées
type LeadsByStatus = Record<LeadStatus, Lead[]>;

// Extract - Extraire de union
type CompletedStatuses = Extract<LeadStatus, 'CONVERTED' | 'LOST'>;

// Exclude - Exclure de union
type ActiveStatuses = Exclude<LeadStatus, 'CONVERTED' | 'LOST'>;
```

## Génériques

### Composant générique
```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map((item) => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

// Utilisation
<List<Lead>
  items={leads}
  renderItem={(lead) => <LeadCard lead={lead} />}
  keyExtractor={(lead) => lead.id}
/>
```

### Fonction générique
```tsx
function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Utilisation
const leadsByStatus = groupBy(leads, 'status');
```

## Bonnes pratiques

### 1. Toujours typer les retours de fonction
```tsx
// ✅ Bon
function calculateScore(lead: Lead): number {
  return /* ... */;
}

// ❌ Éviter (même si inféré)
function calculateScore(lead: Lead) {
  return /* ... */;
}
```

### 2. Utiliser const assertions
```tsx
// ✅ Bon - Type littéral
const LEAD_STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED'] as const;
type LeadStatus = typeof LEAD_STATUSES[number]; // 'NEW' | 'CONTACTED' | 'QUALIFIED'

// ❌ Éviter - Type string[]
const LEAD_STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED'];
```

### 3. Préférer interfaces pour objets
```tsx
// ✅ Bon pour objets
interface Lead {
  id: string;
  name: string;
}

// ✅ Bon pour unions et intersections
type Status = 'active' | 'inactive';
type LeadWithStatus = Lead & { status: Status };
```

### 4. Type guards pour validation runtime
```tsx
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function assertIsLead(value: unknown): asserts value is Lead {
  if (!isLead(value)) {
    throw new Error('Not a valid lead');
  }
}

// Utilisation
function processUnknownData(data: unknown) {
  assertIsLead(data);
  // TypeScript sait maintenant que data est Lead
  console.log(data.firstName);
}
```

### 5. Éviter les types trop larges
```tsx
// ❌ Trop large
interface ApiResponse {
  data: any;
  error: any;
}

// ✅ Spécifique
interface ApiResponse<T> {
  data: T | null;
  error: {
    message: string;
    code: string;
  } | null;
}
```

