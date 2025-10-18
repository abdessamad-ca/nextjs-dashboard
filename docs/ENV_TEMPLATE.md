# Template Variables d'Environnement

Créer un fichier `.env` à la racine du projet avec ce contenu :

```env
# ═════════════════════════════════════════
# SUPABASE CONFIGURATION
# ═════════════════════════════════════════

# Supabase Project URL et Keys
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre_anon_key_ici"
SUPABASE_SERVICE_ROLE_KEY="votre_service_role_key_ici"

# Database URL (pointer vers Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_STORAGE_URL="https://votre-projet.supabase.co/storage/v1"

# ═════════════════════════════════════════
# APPLICATION
# ═════════════════════════════════════════

# NextAuth Configuration (optionnel si Supabase Auth utilisé)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="" # Générer avec: openssl rand -base64 32

# Environnement
NODE_ENV="development"

# ═════════════════════════════════════════
# EMAIL & SMTP (pour envoi emails automatiques)
# ═════════════════════════════════════════

# SMTP Configuration (ex: Gmail, SendGrid, Mailgun)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASSWORD="votre-app-password"
EMAIL_FROM="noreply@votre-domaine.com"

# ═════════════════════════════════════════
# API KEYS (pour enrichissement de données)
# ═════════════════════════════════════════

# OpenAI (pour génération emails IA)
# OPENAI_API_KEY=""

# LinkedIn API (pour scraping LinkedIn)
# LINKEDIN_API_KEY=""

# Clearbit (pour enrichissement données entreprise)
# CLEARBIT_API_KEY=""

# Hunter.io (pour trouver emails)
# HUNTER_API_KEY=""

# ═════════════════════════════════════════
# WEBHOOKS (pour intégrations externes)
# ═════════════════════════════════════════

# Secret pour signature HMAC des webhooks
WEBHOOK_SECRET="" # Générer avec: openssl rand -hex 32
```

## Comment générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copiez le résultat dans la variable `NEXTAUTH_SECRET`.

## Configuration PostgreSQL

### Installer PostgreSQL

**Windows** :
```bash
# Télécharger depuis postgresql.org
# Installer avec les options par défaut
```

**Mac** :
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux** :
```bash
sudo apt-get install postgresql-14
sudo systemctl start postgresql
```

### Créer la base de données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la BDD
CREATE DATABASE leadgen;

# Créer un utilisateur
CREATE USER leadgen_user WITH PASSWORD 'votre_password';

# Donner les permissions
GRANT ALL PRIVILEGES ON DATABASE leadgen TO leadgen_user;

# Quitter
\q
```

### URL de connexion

```
postgresql://leadgen_user:votre_password@localhost:5432/leadgen?schema=public
```

## Variables en production

Pour la production, modifiez :

```env
NODE_ENV="production"
NEXTAUTH_URL="https://votre-domaine.com"
DATABASE_URL="postgresql://user:password@host:5432/db?schema=public"
```

**⚠️ Important** : Ne JAMAIS commiter le fichier `.env` dans Git !

