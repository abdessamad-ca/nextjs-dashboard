# Base de données - Schéma Supabase + Prisma

## Stack choisie

- **ORM** : Prisma
- **Database** : PostgreSQL (via Supabase)
- **Auth** : Supabase Auth
- **Storage** : Supabase Storage
- **Hosting** : VPS avec Supabase self-hosted
- **Realtime** : Supabase Realtime
- **RLS** : Row Level Security activé

## Architecture globale

Cette architecture est conçue pour :
- **Scalabilité** : Multi-tenant, job queue, soft delete
- **Traçabilité** : Audit logs, import tracking, webhook logs
- **Automatisation** : Séquences d'emails, webhooks, jobs asynchrones
- **Flexibilité** : Custom fields, templates réutilisables
- **Sécurité** : RLS Supabase, soft delete, historique complet

---

## Schéma Prisma complet

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ═════════════════════════════════════════
// ORGANISATIONS ET UTILISATEURS
// ═════════════════════════════════════════

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  logoUrl     String?  // Supabase Storage URL
  plan        Plan     @default(FREE)
  
  // Limites par plan
  maxLeads    Int      @default(50)
  maxUsers    Int      @default(1)
  maxCampaigns Int     @default(5)
  
  // Soft Delete
  deletedAt   DateTime?
  
  // Relations
  users       UserOrganization[]
  leads       Lead[]
  campaigns   Campaign[]
  importJobs  ImportJob[]
  emailTemplates EmailTemplate[]
  emailSequences EmailSequence[]
  webhooks    Webhook[]
  customFields CustomField[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("organizations")
}

enum Plan {
  FREE
  STARTER
  PRO
  ENTERPRISE
}

model User {
  id            String    @id @default(cuid())
  supabaseId    String    @unique  // Lien avec auth.users de Supabase
  email         String    @unique
  name          String?
  role          Role      @default(USER)
  avatar        String?   // URL Supabase Storage
  emailVerified DateTime?
  
  // Soft Delete
  deletedAt     DateTime?
  deletedBy     String?
  
  // Audit
  lastLoginAt   DateTime?
  
  // Relations
  organizations UserOrganization[]
  leads         Lead[]
  activities    Activity[]
  campaigns     Campaign[]
  importJobs    ImportJob[]
  emailTemplates EmailTemplate[]
  auditLogs     AuditLog[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([supabaseId])
  @@index([email])
  @@map("users")
}

enum Role {
  USER
  ADMIN
  MANAGER
}

model UserOrganization {
  userId         String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  role           OrgRole      @default(MEMBER)
  
  createdAt      DateTime     @default(now())
  
  @@id([userId, organizationId])
  @@map("user_organizations")
}

enum OrgRole {
  OWNER
  ADMIN
  MEMBER
}

// ═════════════════════════════════════════
// LEADS
// ═════════════════════════════════════════

model Lead {
  id          String     @id @default(cuid())
  
  // Informations personnelles
  firstName   String
  lastName    String
  email       String     @unique
  phone       String?
  jobTitle    String?
  
  // Informations entreprise
  company     String?
  companySize CompanySize?
  industry    String?
  website     String?
  
  // Qualification
  status      LeadStatus @default(NEW)
  score       Int        @default(0)
  source      LeadSource @default(MANUAL)
  
  // Assignation
  ownerId     String?
  owner       User?      @relation(fields: [ownerId], references: [id])
  
  // Organization (multi-tenant)
  organizationId  String?
  organization    Organization? @relation(fields: [organizationId], references: [id])
  
  // Import tracking
  importJobId     String?
  importJob       ImportJob?   @relation("ImportedLeads", fields: [importJobId], references: [id])
  
  // Données enrichies
  linkedinUrl String?
  country     String?
  city        String?
  
  // Suivi
  lastContactedAt DateTime?
  convertedAt     DateTime?
  
  // Soft Delete
  deletedAt       DateTime?
  deletedBy       String?
  
  // Relations
  activities  Activity[]
  tags        LeadTag[]
  sequenceEnrollments LeadSequenceEnrollment[]
  
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  @@index([status])
  @@index([ownerId])
  @@index([score])
  @@index([organizationId])
  @@index([deletedAt])
  @@index([email])
  @@map("leads")
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  PROPOSAL
  NEGOTIATION
  CONVERTED
  LOST
}

enum LeadSource {
  MANUAL
  IMPORT
  API
  LINKEDIN
  WEBSITE
  REFERRAL
  CAMPAIGN
}

enum CompanySize {
  MICRO      // 1-10
  SMALL      // 11-50
  MEDIUM     // 51-200
  LARGE      // 201-1000
  ENTERPRISE // 1000+
}

// ═════════════════════════════════════════
// ACTIVITÉS
// ═════════════════════════════════════════

model Activity {
  id          String       @id @default(cuid())
  type        ActivityType
  
  leadId      String
  lead        Lead         @relation(fields: [leadId], references: [id], onDelete: Cascade)
  
  userId      String
  user        User         @relation(fields: [userId], references: [id])
  
  title       String
  description String?      @db.Text
  
  scheduledAt DateTime?
  completedAt DateTime?
  
  // Soft Delete
  deletedAt   DateTime?
  
  createdAt   DateTime     @default(now())
  
  @@index([leadId])
  @@index([userId])
  @@index([deletedAt])
  @@map("activities")
}

enum ActivityType {
  EMAIL
  CALL
  MEETING
  NOTE
  TASK
}

// ═════════════════════════════════════════
// TAGS
// ═════════════════════════════════════════

model Tag {
  id        String    @id @default(cuid())
  name      String    @unique
  color     String    @default("#3C50E0")
  
  leads     LeadTag[]
  
  // Soft Delete
  deletedAt DateTime?
  
  createdAt DateTime  @default(now())
  
  @@map("tags")
}

model LeadTag {
  leadId    String
  lead      Lead      @relation(fields: [leadId], references: [id], onDelete: Cascade)
  
  tagId     String
  tag       Tag       @relation(fields: [tagId], references: [id], onDelete: Cascade)
  
  assignedAt DateTime @default(now())
  
  @@id([leadId, tagId])
  @@map("lead_tags")
}

// ═════════════════════════════════════════
// CAMPAGNES
// ═════════════════════════════════════════

model Campaign {
  id          String         @id @default(cuid())
  name        String
  description String?        @db.Text
  status      CampaignStatus @default(DRAFT)
  
  ownerId     String
  owner       User           @relation(fields: [ownerId], references: [id])
  
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])
  
  // Template email
  templateId  String?
  template    EmailTemplate? @relation(fields: [templateId], references: [id])
  
  startDate   DateTime?
  endDate     DateTime?
  
  // Métriques
  sent        Int            @default(0)
  opened      Int            @default(0)
  clicked     Int            @default(0)
  replied     Int            @default(0)
  
  // Soft Delete
  deletedAt   DateTime?
  
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  
  @@index([ownerId])
  @@index([organizationId])
  @@index([status])
  @@index([deletedAt])
  @@map("campaigns")
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
}

// ═════════════════════════════════════════
// IMPORT/EXPORT
// ═════════════════════════════════════════

model ImportJob {
  id              String       @id @default(cuid())
  fileName        String
  fileUrl         String       // Supabase Storage URL
  fileType        FileType
  
  status          ImportStatus @default(PENDING)
  
  // Stats
  totalRows       Int          @default(0)
  successRows     Int          @default(0)
  errorRows       Int          @default(0)
  errors          Json?        // Array d'erreurs détaillées
  
  // Mapping des colonnes CSV vers champs BDD
  columnMapping   Json         // { "Prénom": "firstName", "Email": "email" }
  
  // Relations
  organizationId  String?
  organization    Organization? @relation(fields: [organizationId], references: [id])
  createdById     String
  createdBy       User         @relation(fields: [createdById], references: [id])
  
  // Résultats
  leadsCreated    Lead[]       @relation("ImportedLeads")
  
  startedAt       DateTime?
  completedAt     DateTime?
  createdAt       DateTime     @default(now())
  
  @@index([status])
  @@index([createdById])
  @@index([organizationId])
  @@map("import_jobs")
}

enum ImportStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}

enum FileType {
  CSV
  EXCEL
}

// ═════════════════════════════════════════
// EMAIL AUTOMATION
// ═════════════════════════════════════════

model EmailTemplate {
  id          String   @id @default(cuid())
  name        String
  subject     String
  body        String   @db.Text  // HTML avec variables {{firstName}}, {{company}}
  
  // Variables disponibles (pour validation)
  variables   Json     // ["firstName", "company", "score"]
  
  // Métadonnées
  category    EmailCategory @default(OUTREACH)
  isActive    Boolean  @default(true)
  
  // Relations
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])
  createdById    String
  createdBy      User     @relation(fields: [createdById], references: [id])
  
  // Usage
  campaigns      Campaign[]
  sequenceSteps  EmailSequenceStep[]
  
  // Soft Delete
  deletedAt   DateTime?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([organizationId])
  @@index([category])
  @@index([deletedAt])
  @@map("email_templates")
}

enum EmailCategory {
  OUTREACH
  FOLLOW_UP
  NURTURE
  MEETING
}

model EmailSequence {
  id          String   @id @default(cuid())
  name        String
  description String?  @db.Text
  isActive    Boolean  @default(false)
  
  // Relations
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])
  
  steps          EmailSequenceStep[]
  enrollments    LeadSequenceEnrollment[]
  
  // Soft Delete
  deletedAt   DateTime?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([organizationId])
  @@index([isActive])
  @@index([deletedAt])
  @@map("email_sequences")
}

model EmailSequenceStep {
  id              String        @id @default(cuid())
  sequenceId      String
  sequence        EmailSequence @relation(fields: [sequenceId], references: [id], onDelete: Cascade)
  
  stepOrder       Int
  delayDays       Int           @default(0)
  delayHours      Int           @default(0)
  
  templateId      String
  template        EmailTemplate @relation(fields: [templateId], references: [id])
  
  createdAt       DateTime      @default(now())
  
  @@unique([sequenceId, stepOrder])
  @@map("email_sequence_steps")
}

model LeadSequenceEnrollment {
  id              String        @id @default(cuid())
  leadId          String
  lead            Lead          @relation(fields: [leadId], references: [id], onDelete: Cascade)
  sequenceId      String
  sequence        EmailSequence @relation(fields: [sequenceId], references: [id], onDelete: Cascade)
  
  currentStep     Int           @default(0)
  status          EnrollmentStatus @default(ACTIVE)
  
  enrolledAt      DateTime      @default(now())
  completedAt     DateTime?
  pausedAt        DateTime?
  
  @@unique([leadId, sequenceId])
  @@index([status])
  @@index([sequenceId])
  @@map("lead_sequence_enrollments")
}

enum EnrollmentStatus {
  ACTIVE
  PAUSED
  COMPLETED
  UNSUBSCRIBED
}

// ═════════════════════════════════════════
// WEBHOOKS & INTÉGRATIONS
// ═════════════════════════════════════════

model Webhook {
  id              String        @id @default(cuid())
  name            String
  url             String
  method          HttpMethod    @default(POST)
  
  // Événements déclencheurs (stored as array)
  events          Json          // Array de WebhookEvent
  
  // Sécurité
  secret          String?       // Pour signature HMAC
  headers         Json?         // Headers personnalisés
  
  isActive        Boolean       @default(true)
  
  // Relations
  organizationId  String?
  organization    Organization? @relation(fields: [organizationId], references: [id])
  
  // Stats
  lastTriggeredAt DateTime?
  failureCount    Int           @default(0)
  
  logs            WebhookLog[]
  
  // Soft Delete
  deletedAt       DateTime?
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  @@index([organizationId])
  @@index([isActive])
  @@index([deletedAt])
  @@map("webhooks")
}

enum HttpMethod {
  GET
  POST
  PUT
  PATCH
}

model WebhookLog {
  id          String   @id @default(cuid())
  webhookId   String
  webhook     Webhook  @relation(fields: [webhookId], references: [id], onDelete: Cascade)
  
  event       String   // WebhookEvent as string
  payload     Json
  
  status      Int      // HTTP status code
  response    Json?
  error       String?  @db.Text
  
  duration    Int      // Milliseconds
  
  createdAt   DateTime @default(now())
  
  @@index([webhookId])
  @@index([createdAt])
  @@map("webhook_logs")
}

// ═════════════════════════════════════════
// AUDIT & HISTORIQUE
// ═════════════════════════════════════════

model AuditLog {
  id            String   @id @default(cuid())
  
  // Qui
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  
  // Quoi
  entityType    String   // "Lead", "Campaign", "User", etc.
  entityId      String
  action        AuditAction
  
  // Changements (pour audit détaillé)
  changes       Json?    // { "status": { "old": "NEW", "new": "QUALIFIED" } }
  
  // Métadonnées
  ipAddress     String?
  userAgent     String?  @db.Text
  
  createdAt     DateTime @default(now())
  
  @@index([entityType, entityId])
  @@index([userId])
  @@index([createdAt])
  @@map("audit_logs")
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  RESTORE
}

// ═════════════════════════════════════════
// CUSTOM FIELDS (Extensibilité)
// ═════════════════════════════════════════

model CustomField {
  id              String       @id @default(cuid())
  name            String
  label           String
  fieldType       FieldType
  entityType      EntityType   // Sur quel modèle (Lead, Campaign...)
  
  // Options pour SELECT et MULTISELECT
  options         Json?        // ["Option 1", "Option 2"]
  
  isRequired      Boolean      @default(false)
  defaultValue    String?
  helpText        String?
  
  // Relations
  organizationId  String?
  organization    Organization? @relation(fields: [organizationId], references: [id])
  
  values          CustomFieldValue[]
  
  // Soft Delete
  deletedAt       DateTime?
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  @@unique([organizationId, entityType, name])
  @@index([organizationId])
  @@index([entityType])
  @@map("custom_fields")
}

enum FieldType {
  TEXT
  NUMBER
  DATE
  BOOLEAN
  SELECT
  MULTISELECT
  URL
  EMAIL
}

enum EntityType {
  LEAD
  CAMPAIGN
  ACTIVITY
}

model CustomFieldValue {
  id            String      @id @default(cuid())
  
  fieldId       String
  field         CustomField @relation(fields: [fieldId], references: [id], onDelete: Cascade)
  
  entityId      String      // ID du Lead, Campaign, etc.
  value         String      @db.Text
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  @@unique([fieldId, entityId])
  @@index([entityId])
  @@map("custom_field_values")
}

// ═════════════════════════════════════════
// JOB QUEUE (Tâches asynchrones)
// ═════════════════════════════════════════

model JobQueue {
  id          String    @id @default(cuid())
  type        JobType
  payload     Json
  
  status      JobStatus @default(PENDING)
  priority    Int       @default(0)
  
  attempts    Int       @default(0)
  maxAttempts Int       @default(3)
  error       String?   @db.Text
  
  scheduledFor DateTime?
  startedAt    DateTime?
  completedAt  DateTime?
  
  createdAt    DateTime  @default(now())
  
  @@index([status, scheduledFor])
  @@index([type])
  @@index([priority])
  @@map("job_queue")
}

enum JobType {
  IMPORT_CSV
  EXPORT_CSV
  SEND_EMAIL
  SEND_EMAIL_SEQUENCE
  ENRICH_LEAD_DATA
  CALCULATE_SCORES
  TRIGGER_WEBHOOK
}

enum JobStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}
```

---

## Événements Webhook disponibles

```typescript
// Types TypeScript pour les événements
export enum WebhookEvent {
  LEAD_CREATED = 'LEAD_CREATED',
  LEAD_UPDATED = 'LEAD_UPDATED',
  LEAD_CONVERTED = 'LEAD_CONVERTED',
  LEAD_DELETED = 'LEAD_DELETED',
  CAMPAIGN_STARTED = 'CAMPAIGN_STARTED',
  CAMPAIGN_COMPLETED = 'CAMPAIGN_COMPLETED',
  EMAIL_SENT = 'EMAIL_SENT',
  EMAIL_OPENED = 'EMAIL_OPENED',
  EMAIL_CLICKED = 'EMAIL_CLICKED',
}
```

---

## Migrations - Ordre d'implémentation

### Phase 1 : Fondations (Semaine 1)
```bash
npx prisma migrate dev --name add_organizations
npx prisma migrate dev --name add_soft_delete
npx prisma migrate dev --name add_audit_logs
```

**Tables créées** : Organization, UserOrganization, AuditLog  
**Modifications** : User (supabaseId, deletedAt), Lead (organizationId, deletedAt)

### Phase 2 : Import/Export (Semaine 2)
```bash
npx prisma migrate dev --name add_import_export
npx prisma migrate dev --name add_job_queue
```

**Tables créées** : ImportJob, JobQueue  
**Modifications** : Lead (importJobId)

### Phase 3 : Automatisation Emails (Semaine 3)
```bash
npx prisma migrate dev --name add_email_automation
```

**Tables créées** : EmailTemplate, EmailSequence, EmailSequenceStep, LeadSequenceEnrollment  
**Modifications** : Campaign (templateId)

### Phase 4 : Webhooks (Semaine 4)
```bash
npx prisma migrate dev --name add_webhooks
```

**Tables créées** : Webhook, WebhookLog

### Phase 5 : Custom Fields (Semaine 5)
```bash
npx prisma migrate dev --name add_custom_fields
```

**Tables créées** : CustomField, CustomFieldValue

---

## Queries utiles

### Statistiques dashboard avec Organization

```typescript
// Leads par organisation
const leadsByOrg = await prisma.lead.groupBy({
  by: ['organizationId'],
  where: {
    deletedAt: null,
  },
  _count: true,
});

// Stats globales pour une org
const stats = await prisma.lead.aggregate({
  where: {
    organizationId: orgId,
    deletedAt: null,
  },
  _count: true,
  _avg: { score: true },
});

// Leads par statut (excluant supprimés)
const leadsByStatus = await prisma.lead.groupBy({
  by: ['status'],
  where: {
    organizationId: orgId,
    deletedAt: null,
  },
  _count: true,
});
```

### Recherche avec soft delete

```typescript
// Recherche leads actifs uniquement
const activeLeads = await prisma.lead.findMany({
  where: {
    deletedAt: null,
    organizationId: orgId,
    OR: [
      { firstName: { contains: searchTerm, mode: 'insensitive' } },
      { lastName: { contains: searchTerm, mode: 'insensitive' } },
      { email: { contains: searchTerm, mode: 'insensitive' } },
      { company: { contains: searchTerm, mode: 'insensitive' } },
    ],
  },
  include: {
    owner: { select: { id: true, name: true, email: true } },
    tags: { include: { tag: true } },
    organization: { select: { name: true, plan: true } },
  },
  orderBy: { createdAt: 'desc' },
});

// Corbeille (leads supprimés)
const deletedLeads = await prisma.lead.findMany({
  where: {
    deletedAt: { not: null },
    organizationId: orgId,
  },
  orderBy: { deletedAt: 'desc' },
});
```

### Import Job avec traçabilité

```typescript
// Créer import job
const importJob = await prisma.importJob.create({
  data: {
    fileName: 'leads_2025.csv',
    fileUrl: 'https://supabase.co/storage/imports/xxx.csv',
    fileType: 'CSV',
    status: 'PENDING',
    columnMapping: {
      'Prénom': 'firstName',
      'Nom': 'lastName',
      'Email': 'email',
      'Entreprise': 'company',
    },
    organizationId: orgId,
    createdById: userId,
  },
});

// Mettre à jour progression
await prisma.importJob.update({
  where: { id: importJob.id },
  data: {
    status: 'PROCESSING',
    startedAt: new Date(),
    totalRows: 100,
  },
});

// Finaliser avec stats
await prisma.importJob.update({
  where: { id: importJob.id },
  data: {
    status: 'COMPLETED',
    completedAt: new Date(),
    successRows: 95,
    errorRows: 5,
    errors: [
      { row: 12, error: 'Email invalide' },
      { row: 34, error: 'Email en double' },
    ],
  },
});
```

### Email Sequences

```typescript
// Enrôler lead dans séquence
await prisma.leadSequenceEnrollment.create({
  data: {
    leadId: lead.id,
    sequenceId: sequence.id,
    status: 'ACTIVE',
    currentStep: 0,
  },
});

// Récupérer prochains emails à envoyer
const now = new Date();
const enrollments = await prisma.leadSequenceEnrollment.findMany({
  where: {
    status: 'ACTIVE',
    sequence: {
      isActive: true,
      deletedAt: null,
    },
  },
  include: {
    lead: true,
    sequence: {
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
          include: { template: true },
        },
      },
    },
  },
});

// Pour chaque enrollment, calculer si email doit être envoyé
// basé sur enrolledAt + delayDays/delayHours du step
```

### Webhooks

```typescript
// Récupérer webhooks actifs pour un événement
const webhooks = await prisma.webhook.findMany({
  where: {
    isActive: true,
    deletedAt: null,
    organizationId: orgId,
    events: {
      path: '$',
      array_contains: 'LEAD_CREATED',
    },
  },
});

// Logger résultat webhook
await prisma.webhookLog.create({
  data: {
    webhookId: webhook.id,
    event: 'LEAD_CREATED',
    payload: { leadId: lead.id, email: lead.email },
    status: response.status,
    response: await response.json(),
    duration: executionTime,
  },
});
```

### Audit Log

```typescript
// Logger une modification
await prisma.auditLog.create({
  data: {
    userId: currentUserId,
    entityType: 'Lead',
    entityId: lead.id,
    action: 'UPDATE',
    changes: {
      status: { old: 'NEW', new: 'QUALIFIED' },
      score: { old: 50, new: 75 },
    },
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  },
});

// Récupérer historique d'une entité
const history = await prisma.auditLog.findMany({
  where: {
    entityType: 'Lead',
    entityId: leadId,
  },
  include: {
    user: { select: { name: true, email: true } },
  },
  orderBy: { createdAt: 'desc' },
  take: 50,
});
```

### Custom Fields

```typescript
// Créer custom field
const customField = await prisma.customField.create({
  data: {
    name: 'budget',
    label: 'Budget annuel',
    fieldType: 'NUMBER',
    entityType: 'LEAD',
    isRequired: false,
    organizationId: orgId,
  },
});

// Assigner valeur à un lead
await prisma.customFieldValue.upsert({
  where: {
    fieldId_entityId: {
      fieldId: customField.id,
      entityId: lead.id,
    },
  },
  create: {
    fieldId: customField.id,
    entityId: lead.id,
    value: '50000',
  },
  update: {
    value: '75000',
  },
});

// Récupérer lead avec custom fields
const leadWithCustomFields = await prisma.lead.findUnique({
  where: { id: leadId },
  include: {
    customFieldValues: {
      include: {
        field: true,
      },
    },
  },
});
```

---

## Optimisations

### Index stratégiques

Tous les index sont définis dans le schéma pour :
- **Recherche rapide** : email, status, organizationId
- **Filtrage** : deletedAt, isActive
- **Jointures** : clés étrangères
- **Tri** : createdAt, score

### Relations optimisées

```typescript
// ✅ Bon - Select uniquement ce dont on a besoin
const leads = await prisma.lead.findMany({
  select: {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    status: true,
    owner: {
      select: { name: true },
    },
  },
});

// ❌ Éviter - Include tout
const leads = await prisma.lead.findMany({
  include: { owner: true, activities: true, tags: true },
});
```

### Pagination avec cursor

```typescript
// Plus performant que skip/take pour grandes listes
const leads = await prisma.lead.findMany({
  take: 20,
  skip: 1, // Skip le cursor
  cursor: {
    id: lastLeadId,
  },
  where: { deletedAt: null },
  orderBy: { createdAt: 'desc' },
});
```

---

## Soft Delete - Pattern réutilisable

```typescript
// Middleware Prisma pour soft delete automatique
// prisma/middleware.ts
export function softDeleteMiddleware() {
  return async (params: any, next: any) => {
    if (params.model) {
      if (params.action === 'delete') {
        // Transformer delete en update avec deletedAt
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }
      
      if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deletedAt'] = new Date();
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }
      
      // Exclure automatiquement les éléments supprimés
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst';
        params.args.where['deletedAt'] = null;
      }
      
      if (params.action === 'findMany') {
        if (params.args.where) {
          if (params.args.where.deletedAt == undefined) {
            params.args.where['deletedAt'] = null;
          }
        } else {
          params.args['where'] = { deletedAt: null };
        }
      }
    }
    return next(params);
  };
}
```

---

## Backup et maintenance

```bash
# Backup complet BDD
pg_dump -h localhost -U postgres leadgen > backup_$(date +%Y%m%d).sql

# Restore
psql -h localhost -U postgres leadgen < backup_20250117.sql

# Backup via Supabase CLI
supabase db dump -f backup.sql

# Reset BDD (dev uniquement!)
npx prisma migrate reset

# Nettoyer les logs anciens (automatiser avec cron)
DELETE FROM webhook_logs WHERE created_at < NOW() - INTERVAL '90 days';
DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '1 year';
```

---

## Bénéfices de cette architecture

### 🚀 Scalabilité
- Multi-tenant avec Organizations
- Job Queue pour traitement asynchrone
- Soft delete pour données historiques
- Custom fields sans migration

### 🔍 Traçabilité complète
- Audit logs pour toutes modifications
- Import tracking pour chaque lead
- Webhook logs pour debugging
- Historique des séquences emails

### ⚡ Automatisation
- Séquences d'emails automatiques
- Webhooks pour intégrations externes
- Jobs asynchrones (import, export, enrichissement)
- Templates réutilisables

### 🔒 Sécurité
- Row Level Security Supabase
- Soft delete (récupération possible)
- Audit complet des actions
- Signature HMAC pour webhooks

### 🎨 Flexibilité
- Custom fields sans toucher au schéma
- Templates d'emails personnalisables
- Mapping colonnes flexible pour import
- Extensible à l'infini
