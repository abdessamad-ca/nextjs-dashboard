# Row Level Security (RLS) Policies pour Supabase

Ce document contient toutes les policies RLS à configurer dans Supabase pour sécuriser votre base de données.

⚠️ **Important** : Ces policies doivent être créées via le SQL Editor de Supabase Dashboard.

---

## Activation RLS sur toutes les tables

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sequence_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_field_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_queue ENABLE ROW LEVEL SECURITY;
```

---

## 1. Users Table

```sql
-- Users peuvent voir leur propre profil
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (supabase_id = auth.uid());

-- Users peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (supabase_id = auth.uid());

-- Admins peuvent voir tous les users
CREATE POLICY "Admins can view all users"
ON users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_id = auth.uid()
    AND users.role = 'ADMIN'
    AND users.deleted_at IS NULL
  )
);

-- Service role peut tout faire (bypass RLS pour migrations)
-- Pas de policy nécessaire car service_role bypass RLS
```

---

## 2. Organizations Table

```sql
-- Users peuvent voir les organisations dont ils sont membres
CREATE POLICY "Users can view their organizations"
ON organizations FOR SELECT
USING (
  id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);

-- Owners et Admins peuvent mettre à jour leur organisation
CREATE POLICY "Owners and Admins can update organization"
ON organizations FOR UPDATE
USING (
  id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
  AND deleted_at IS NULL
);

-- Admins système peuvent créer des organisations
CREATE POLICY "System admins can create organizations"
ON organizations FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_id = auth.uid()
    AND users.role = 'ADMIN'
    AND users.deleted_at IS NULL
  )
);
```

---

## 3. Leads Table

```sql
-- Users peuvent voir les leads de leur organisation (non supprimés)
CREATE POLICY "Users can view organization leads"
ON leads FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);

-- Users peuvent créer des leads dans leur organisation
CREATE POLICY "Users can create leads in their organization"
ON leads FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
);

-- Users peuvent mettre à jour les leads dont ils sont owners
CREATE POLICY "Users can update own leads"
ON leads FOR UPDATE
USING (
  owner_id IN (
    SELECT id FROM users WHERE supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);

-- Admins organisation peuvent mettre à jour tous les leads
CREATE POLICY "Org admins can update all organization leads"
ON leads FOR UPDATE
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
  AND deleted_at IS NULL
);

-- Soft delete : Users peuvent supprimer leurs leads
CREATE POLICY "Users can delete own leads"
ON leads FOR UPDATE
USING (
  owner_id IN (
    SELECT id FROM users WHERE supabase_id = auth.uid()
  )
);
```

---

## 4. Activities Table

```sql
-- Users peuvent voir les activités des leads de leur organisation
CREATE POLICY "Users can view organization activities"
ON activities FOR SELECT
USING (
  lead_id IN (
    SELECT id FROM leads
    WHERE organization_id IN (
      SELECT organization_id
      FROM user_organizations
      INNER JOIN users ON users.id = user_organizations.user_id
      WHERE users.supabase_id = auth.uid()
    )
    AND leads.deleted_at IS NULL
  )
  AND deleted_at IS NULL
);

-- Users peuvent créer des activités sur les leads de leur org
CREATE POLICY "Users can create activities on org leads"
ON activities FOR INSERT
WITH CHECK (
  lead_id IN (
    SELECT id FROM leads
    WHERE organization_id IN (
      SELECT organization_id
      FROM user_organizations
      INNER JOIN users ON users.id = user_organizations.user_id
      WHERE users.supabase_id = auth.uid()
    )
  )
);

-- Users peuvent mettre à jour leurs propres activités
CREATE POLICY "Users can update own activities"
ON activities FOR UPDATE
USING (
  user_id IN (
    SELECT id FROM users WHERE supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);
```

---

## 5. Campaigns Table

```sql
-- Users peuvent voir les campagnes de leur organisation
CREATE POLICY "Users can view organization campaigns"
ON campaigns FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);

-- Users peuvent créer des campagnes dans leur organisation
CREATE POLICY "Users can create campaigns in their organization"
ON campaigns FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
);

-- Users peuvent mettre à jour leurs propres campagnes
CREATE POLICY "Users can update own campaigns"
ON campaigns FOR UPDATE
USING (
  owner_id IN (
    SELECT id FROM users WHERE supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);
```

---

## 6. Import Jobs Table

```sql
-- Users peuvent voir leurs propres imports
CREATE POLICY "Users can view own imports"
ON import_jobs FOR SELECT
USING (
  created_by_id IN (
    SELECT id FROM users WHERE supabase_id = auth.uid()
  )
);

-- Users peuvent voir les imports de leur organisation (admins)
CREATE POLICY "Org admins can view all imports"
ON import_jobs FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
);

-- Users peuvent créer des imports dans leur organisation
CREATE POLICY "Users can create imports"
ON import_jobs FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
);
```

---

## 7. Email Templates Table

```sql
-- Users peuvent voir les templates de leur organisation
CREATE POLICY "Users can view organization templates"
ON email_templates FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
  AND is_active = true
);

-- Users peuvent créer des templates dans leur organisation
CREATE POLICY "Users can create templates"
ON email_templates FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
);

-- Users peuvent mettre à jour leurs propres templates
CREATE POLICY "Users can update own templates"
ON email_templates FOR UPDATE
USING (
  created_by_id IN (
    SELECT id FROM users WHERE supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);
```

---

## 8. Webhooks Table

```sql
-- Org admins peuvent voir les webhooks de leur organisation
CREATE POLICY "Org admins can view webhooks"
ON webhooks FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
  AND deleted_at IS NULL
);

-- Org admins peuvent créer des webhooks
CREATE POLICY "Org admins can create webhooks"
ON webhooks FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
);

-- Org admins peuvent mettre à jour les webhooks
CREATE POLICY "Org admins can update webhooks"
ON webhooks FOR UPDATE
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
  AND deleted_at IS NULL
);
```

---

## 9. Audit Logs Table (Lecture seule)

```sql
-- Users peuvent voir leurs propres actions
CREATE POLICY "Users can view own audit logs"
ON audit_logs FOR SELECT
USING (
  user_id IN (
    SELECT id FROM users WHERE supabase_id = auth.uid()
  )
);

-- Org admins peuvent voir tous les audit logs de l'organisation
CREATE POLICY "Org admins can view all audit logs"
ON audit_logs FOR SELECT
USING (
  user_id IN (
    SELECT users.id FROM users
    INNER JOIN user_organizations ON users.id = user_organizations.user_id
    WHERE user_organizations.organization_id IN (
      SELECT organization_id
      FROM user_organizations uo
      INNER JOIN users u ON u.id = uo.user_id
      WHERE u.supabase_id = auth.uid()
      AND uo.role IN ('OWNER', 'ADMIN')
    )
  )
);

-- Seul le service role peut créer des audit logs (via triggers)
-- Pas de policy INSERT pour users
```

---

## 10. Custom Fields Table

```sql
-- Users peuvent voir les custom fields de leur organisation
CREATE POLICY "Users can view organization custom fields"
ON custom_fields FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
  )
  AND deleted_at IS NULL
);

-- Org admins peuvent créer des custom fields
CREATE POLICY "Org admins can create custom fields"
ON custom_fields FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
);

-- Org admins peuvent mettre à jour les custom fields
CREATE POLICY "Org admins can update custom fields"
ON custom_fields FOR UPDATE
USING (
  organization_id IN (
    SELECT organization_id
    FROM user_organizations
    INNER JOIN users ON users.id = user_organizations.user_id
    WHERE users.supabase_id = auth.uid()
    AND user_organizations.role IN ('OWNER', 'ADMIN')
  )
  AND deleted_at IS NULL
);
```

---

## 11. Job Queue Table (System Only)

```sql
-- Seul le service role peut accéder à la job queue
-- Les users n'ont pas accès direct
-- Utiliser des Server Actions pour créer des jobs

-- Ou policy pour permettre aux users de voir leurs jobs
CREATE POLICY "Users can view their jobs"
ON job_queue FOR SELECT
USING (
  payload->>'userId' IN (
    SELECT id::text FROM users WHERE supabase_id = auth.uid()
  )
);
```

---

## Fonction helper pour obtenir l'organisation de l'utilisateur

```sql
-- Function pour obtenir l'organisation de l'utilisateur connecté
CREATE OR REPLACE FUNCTION auth.user_organization()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT organization_id
  FROM user_organizations
  INNER JOIN users ON users.id = user_organizations.user_id
  WHERE users.supabase_id = auth.uid()
  LIMIT 1;
$$;
```

---

## Test des policies

```sql
-- Se connecter en tant qu'utilisateur test
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub":"user-uuid-here"}';

-- Tester une requête
SELECT * FROM leads;

-- Devrait retourner uniquement les leads de l'organisation de l'utilisateur

-- Reset
RESET role;
```

---

## Dépannage

### Policy trop restrictive ?

```sql
-- Désactiver temporairement RLS pour debug (DEV UNIQUEMENT)
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Réactiver
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

### Voir les policies actives

```sql
-- Lister toutes les policies d'une table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'leads';
```

### Supprimer une policy

```sql
DROP POLICY "policy_name" ON table_name;
```

---

## Notes importantes

1. **Service Role bypasse RLS** : Utilisez `createAdminClient()` avec précaution
2. **Performance** : Les policies complexes peuvent ralentir les requêtes - optimiser avec des index
3. **Testing** : Toujours tester les policies avec différents rôles d'utilisateur
4. **Audit** : Les audit logs doivent être créés uniquement via triggers/service role
5. **Soft Delete** : Les policies doivent vérifier `deleted_at IS NULL`

---

## Commandes utiles

```bash
# Appliquer toutes les policies (copier tout ce fichier dans SQL Editor)
# Dashboard Supabase > SQL Editor > New Query > Paste > Run

# Vérifier que RLS est activé
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

# Devrait afficher rowsecurity = true pour toutes les tables
```

