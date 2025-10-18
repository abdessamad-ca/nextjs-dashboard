# Guide de Migration - Schéma Actuel vers Supabase Complet

Ce guide vous accompagne pas à pas pour migrer votre schéma actuel vers l'architecture Supabase complète avec toutes les nouvelles fonctionnalités.

---

## Vue d'ensemble de la migration

### Avant (Schéma actuel)
- User avec password local
- Lead simple
- Activity, Tag, Campaign basiques
- Pas de multi-tenant
- Pas de soft delete
- Pas d'historique

### Après (Schéma Supabase)
- User avec Supabase Auth
- Organizations (multi-tenant)
- Soft delete partout
- Import/Export tracking
- Email automation
- Webhooks
- Audit logs
- Custom fields
- Job queue

---

## Prérequis

1. **Backup de votre BDD actuelle**
```bash
pg_dump your_database > backup_before_migration.sql
```

2. **Installer Supabase CLI** (optionnel mais recommandé)
```bash
npm install -g supabase
```

3. **Créer projet Supabase**
- Aller sur https://supabase.com
- Créer nouveau projet
- Noter les credentials

---

## Phase 1 : Préparation (30 minutes)

### Étape 1.1 : Installer dépendances Supabase

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Étape 1.2 : Configurer variables d'environnement

Ajouter dans `.env` :
```env
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre_anon_key"
SUPABASE_SERVICE_ROLE_KEY="votre_service_role_key"
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"
```

### Étape 1.3 : Créer les fichiers Supabase

Les fichiers ont déjà été créés :
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`

---

## Phase 2 : Migration Schéma BDD (1-2 heures)

### Étape 2.1 : Backup du schéma Prisma actuel

```bash
cp prisma/schema.prisma prisma/schema.prisma.backup
```

### Étape 2.2 : Mettre à jour le schéma Prisma

Remplacer le contenu de `prisma/schema.prisma` par le nouveau schéma complet (voir `.cursor/memory-bank/database.md`).

### Étape 2.3 : Créer migration pour Organizations

```bash
# Générer migration
npx prisma migrate dev --name add_organizations_and_multi_tenant

# ⚠️ IMPORTANT : Cette migration va :
# - Créer table Organization
# - Créer table UserOrganization
# - Ajouter organizationId à Lead, Campaign, etc.
# - Les données existantes auront organizationId = NULL (à corriger manuellement)
```

### Étape 2.4 : Migrer les données existantes

Créer un script de migration :

```typescript
// scripts/migrate-to-organizations.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateToOrganizations() {
  console.log('🚀 Migration vers Organizations...');

  // 1. Créer une organisation par défaut
  const defaultOrg = await prisma.organization.create({
    data: {
      name: 'Organisation par défaut',
      slug: 'default-org',
      plan: 'FREE',
      maxLeads: 1000,
      maxUsers: 10,
    },
  });

  console.log(`✅ Organisation créée : ${defaultOrg.id}`);

  // 2. Associer tous les users existants à cette organisation
  const users = await prisma.user.findMany();
  
  for (const user of users) {
    await prisma.userOrganization.create({
      data: {
        userId: user.id,
        organizationId: defaultOrg.id,
        role: user.role === 'ADMIN' ? 'OWNER' : 'MEMBER',
      },
    });
  }

  console.log(`✅ ${users.length} users associés à l'organisation`);

  // 3. Associer tous les leads à l'organisation
  await prisma.lead.updateMany({
    where: { organizationId: null },
    data: { organizationId: defaultOrg.id },
  });

  const leadsCount = await prisma.lead.count({
    where: { organizationId: defaultOrg.id },
  });

  console.log(`✅ ${leadsCount} leads associés à l'organisation`);

  // 4. Associer toutes les campagnes
  await prisma.campaign.updateMany({
    where: { organizationId: null },
    data: { organizationId: defaultOrg.id },
  });

  console.log('✅ Migration terminée !');
}

migrateToOrganizations()
  .catch((e) => {
    console.error('❌ Erreur migration :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Exécuter :
```bash
npx ts-node scripts/migrate-to-organizations.ts
```

### Étape 2.5 : Migration Supabase Auth

Créer trigger pour synchronisation :

```sql
-- Dans Supabase SQL Editor

-- Function pour créer user dans notre table lors de sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_org_id uuid;
BEGIN
  -- Créer une organisation pour chaque nouvel utilisateur
  INSERT INTO public.organizations (name, slug, plan, created_at, updated_at)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email) || '''s Organization',
    LOWER(REPLACE(NEW.email, '@', '-')),
    'FREE',
    NOW(),
    NOW()
  )
  RETURNING id INTO new_org_id;

  -- Créer le user
  INSERT INTO public.users (supabase_id, email, name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    'USER',
    NOW(),
    NOW()
  );

  -- Associer user à l'organisation en tant que OWNER
  INSERT INTO public.user_organizations (user_id, organization_id, role, created_at)
  SELECT users.id, new_org_id, 'OWNER', NOW()
  FROM public.users
  WHERE users.supabase_id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### Étape 2.6 : Migrer users existants vers Supabase Auth

```typescript
// scripts/migrate-users-to-supabase-auth.ts
import { createAdminClient } from '@/lib/supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateUsers() {
  const supabase = createAdminClient();
  const users = await prisma.user.findMany();

  for (const user of users) {
    try {
      // Créer user dans Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: 'TemporaryPassword123!', // À changer par l'utilisateur
        email_confirm: true,
        user_metadata: {
          name: user.name,
        },
      });

      if (error) {
        console.error(`❌ Erreur pour ${user.email}:`, error.message);
        continue;
      }

      // Mettre à jour supabaseId
      await prisma.user.update({
        where: { id: user.id },
        data: { supabaseId: data.user!.id },
      });

      console.log(`✅ ${user.email} migré`);
    } catch (error) {
      console.error(`❌ Erreur pour ${user.email}:`, error);
    }
  }
}

migrateUsers();
```

**⚠️ IMPORTANT** : Informer tous les utilisateurs de réinitialiser leur mot de passe après la migration.

---

## Phase 3 : Ajouter nouvelles fonctionnalités (Par ordre de priorité)

### Étape 3.1 : Soft Delete (1 heure)

Migration déjà incluse dans le schéma. Mettre à jour le code :

```typescript
// Avant
await prisma.lead.delete({ where: { id: leadId } });

// Après (soft delete)
await prisma.lead.update({
  where: { id: leadId },
  data: {
    deletedAt: new Date(),
    deletedBy: currentUserId,
  },
});

// Restaurer
await prisma.lead.update({
  where: { id: leadId },
  data: {
    deletedAt: null,
    deletedBy: null,
  },
});
```

### Étape 3.2 : Import/Export (2-3 heures)

```bash
npx prisma migrate dev --name add_import_export_job_queue
```

Créer les fonctions d'import (voir exemples d'implémentation ci-dessous).

### Étape 3.3 : Email Automation (3-4 heures)

```bash
npx prisma migrate dev --name add_email_automation
```

### Étape 3.4 : Webhooks (2 heures)

```bash
npx prisma migrate dev --name add_webhooks
```

### Étape 3.5 : Audit Logs (1 heure)

```bash
npx prisma migrate dev --name add_audit_logs
```

### Étape 3.6 : Custom Fields (2 heures)

```bash
npx prisma migrate dev --name add_custom_fields
```

---

## Phase 4 : Configuration RLS Supabase (1 heure)

Appliquer toutes les policies du fichier `lib/supabase/RLS_POLICIES.md` dans le SQL Editor de Supabase.

```sql
-- Copier-coller tout le contenu de RLS_POLICIES.md
-- Dashboard Supabase > SQL Editor > New Query > Run
```

---

## Phase 5 : Tests (2 heures)

### Test 1 : Authentification

```typescript
// Test sign up
const { data } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'Test123!',
});

// Vérifier que user créé dans users table
const user = await prisma.user.findUnique({
  where: { supabaseId: data.user!.id },
});

console.assert(user !== null, 'User should exist');
```

### Test 2 : RLS

```typescript
// Se connecter en tant que user normal
const supabase = createClient();

// Essayer de voir leads d'une autre organisation
const { data } = await supabase
  .from('leads')
  .select('*')
  .eq('organization_id', 'autre-org-id');

console.assert(data.length === 0, 'Should not see other org leads');
```

### Test 3 : Soft Delete

```typescript
// Supprimer un lead
await prisma.lead.update({
  where: { id: leadId },
  data: { deletedAt: new Date() },
});

// Vérifier qu'il n'apparaît plus dans les queries normales
const leads = await prisma.lead.findMany({
  where: { deletedAt: null },
});

console.assert(
  !leads.find((l) => l.id === leadId),
  'Deleted lead should not appear'
);
```

---

## Phase 6 : Nettoyage (30 minutes)

### Étape 6.1 : Supprimer anciennes colonnes

```sql
-- Supprimer password de users (géré par Supabase Auth)
-- ⚠️ FAIRE BACKUP AVANT !
ALTER TABLE users DROP COLUMN password;
```

### Étape 6.2 : Mettre à jour documentation

- Mettre à jour `.cursor/memory-bank/tech-context.md`
- Mettre à jour `README.md`
- Mettre à jour `.cursor/memory-bank/decisions.md`

---

## Rollback (En cas de problème)

### Rollback complet

```bash
# Restaurer backup
psql your_database < backup_before_migration.sql

# Restaurer schéma Prisma
cp prisma/schema.prisma.backup prisma/schema.prisma

# Regénérer client
npx prisma generate
```

### Rollback partiel (par migration)

```bash
# Voir l'historique des migrations
npx prisma migrate status

# Rollback dernière migration
npx prisma migrate resolve --rolled-back <migration_name>
```

---

## Checklist finale

- [ ] Backup BDD créé
- [ ] Projet Supabase créé et configuré
- [ ] Variables d'environnement à jour
- [ ] Schéma Prisma migré
- [ ] Organizations créées et users associés
- [ ] Users migrés vers Supabase Auth
- [ ] RLS policies appliquées
- [ ] Triggers Supabase créés
- [ ] Soft delete implémenté dans le code
- [ ] Tests passés avec succès
- [ ] Documentation à jour
- [ ] Utilisateurs informés (réinitialiser MDP si nécessaire)

---

## Support et Dépannage

### Erreur "relation does not exist"
- Vérifier que les migrations sont appliquées : `npx prisma migrate status`
- Regénérer client : `npx prisma generate`

### RLS bloque toutes les requêtes
- Vérifier les policies avec : `SELECT * FROM pg_policies WHERE tablename = 'leads';`
- Temporairement désactiver RLS pour debug : `ALTER TABLE leads DISABLE ROW LEVEL SECURITY;`

### Utilisateurs ne peuvent pas se connecter
- Vérifier que supabaseId est rempli dans la table users
- Vérifier les triggers Supabase
- Vérifier les variables d'environnement

---

## Temps estimé total

- **Préparation** : 30 minutes
- **Migration schéma** : 1-2 heures
- **Nouvelles fonctionnalités** : 10-15 heures (sur plusieurs jours)
- **RLS** : 1 heure
- **Tests** : 2 heures
- **Nettoyage** : 30 minutes

**Total** : 15-20 heures réparties sur 1-2 semaines

---

## Prochaines étapes après migration

1. Implémenter import CSV (voir `IMPLEMENTATION_EXAMPLES.md`)
2. Créer templates d'emails
3. Configurer premiers webhooks
4. Ajouter custom fields selon besoins
5. Optimiser performances avec index appropriés

