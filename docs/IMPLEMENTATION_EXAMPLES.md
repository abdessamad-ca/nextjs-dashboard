# Exemples d'Implémentation

Ce fichier contient des exemples concrets d'implémentation pour toutes les nouvelles fonctionnalités de votre SAAS de génération de leads.

---

## 📁 Import CSV avec traçabilité complète

### 1. Upload et création du job

```typescript
// app/actions/import.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { uploadFile } from '@/lib/supabase/client';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function startImportJob(formData: FormData) {
  const file = formData.get('file') as File;
  const organizationId = formData.get('organizationId') as string;
  
  // 1. Obtenir utilisateur connecté
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  // 2. Upload fichier vers Supabase Storage
  const fileName = `${user.id}/${Date.now()}_${file.name}`;
  const fileUrl = await uploadFile('imports', fileName, file);

  // 3. Créer ImportJob
  const importJob = await prisma.importJob.create({
    data: {
      fileName: file.name,
      fileUrl,
      fileType: file.name.endsWith('.csv') ? 'CSV' : 'EXCEL',
      status: 'PENDING',
      columnMapping: {}, // À remplir dans l'étape de mapping
      organizationId,
      createdById: user.id,
    },
  });

  // 4. Créer job asynchrone dans la queue
  await prisma.jobQueue.create({
    data: {
      type: 'IMPORT_CSV',
      payload: {
        importJobId: importJob.id,
        organizationId,
      },
      status: 'PENDING',
    },
  });

  revalidatePath('/imports');
  
  return { success: true, importJobId: importJob.id };
}
```

### 2. Mapping des colonnes (UI interactive)

```typescript
// components/ImportMapper.tsx
'use client';

import { useState } from 'react';

interface Column {
  csvColumn: string;
  dbField: string | null;
}

const dbFields = [
  { value: 'firstName', label: 'Prénom' },
  { value: 'lastName', label: 'Nom' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Téléphone' },
  { value: 'company', label: 'Entreprise' },
  { value: 'jobTitle', label: 'Poste' },
];

export function ImportMapper({ 
  csvHeaders, 
  onSubmit 
}: { 
  csvHeaders: string[];
  onSubmit: (mapping: Record<string, string>) => void;
}) {
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    onSubmit(mapping);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Mapper les colonnes</h3>
      
      {csvHeaders.map((header) => (
        <div key={header} className="flex items-center gap-4">
          <div className="w-1/3 font-medium">{header}</div>
          <div className="w-1/3">→</div>
          <select
            className="w-1/3 rounded border px-3 py-2"
            value={mapping[header] || ''}
            onChange={(e) => setMapping({ ...mapping, [header]: e.target.value })}
          >
            <option value="">Ne pas importer</option>
            {dbFields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="rounded bg-primary px-6 py-3 text-white hover:bg-opacity-90"
      >
        Démarrer l'import
      </button>
    </div>
  );
}
```

### 3. Traitement du job (Worker)

```typescript
// lib/workers/import-worker.ts
import { prisma } from '@/lib/db';
import { supabase } from '@/lib/supabase/client';
import Papa from 'papaparse';

export async function processImportJob(importJobId: string) {
  const importJob = await prisma.importJob.findUnique({
    where: { id: importJobId },
    include: { organization: true },
  });

  if (!importJob) {
    throw new Error('Import job not found');
  }

  try {
    // 1. Mettre à jour statut
    await prisma.importJob.update({
      where: { id: importJobId },
      data: {
        status: 'PROCESSING',
        startedAt: new Date(),
      },
    });

    // 2. Télécharger fichier depuis Supabase Storage
    const { data: file } = await supabase.storage
      .from('imports')
      .download(importJob.fileUrl);

    if (!file) {
      throw new Error('File not found');
    }

    // 3. Parser CSV
    const text = await file.text();
    const { data: rows } = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    });

    const errors: Array<{ row: number; error: string }> = [];
    let successCount = 0;

    // 4. Importer chaque ligne
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] as any;

      try {
        // Mapper colonnes selon columnMapping
        const leadData: any = {};
        Object.entries(importJob.columnMapping as Record<string, string>).forEach(
          ([csvCol, dbField]) => {
            if (row[csvCol]) {
              leadData[dbField] = row[csvCol];
            }
          }
        );

        // Valider email
        if (!leadData.email || !leadData.email.includes('@')) {
          throw new Error('Email invalide ou manquant');
        }

        // Créer lead
        await prisma.lead.create({
          data: {
            ...leadData,
            source: 'IMPORT',
            organizationId: importJob.organizationId,
            ownerId: importJob.createdById,
            importJobId: importJob.id,
          },
        });

        successCount++;

        // Logger dans audit
        await prisma.auditLog.create({
          data: {
            userId: importJob.createdById,
            entityType: 'Lead',
            entityId: leadData.email,
            action: 'CREATE',
            changes: { source: 'IMPORT', importJobId },
          },
        });

      } catch (error: any) {
        errors.push({
          row: i + 1,
          error: error.message,
        });
      }
    }

    // 5. Finaliser import
    await prisma.importJob.update({
      where: { id: importJobId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        totalRows: rows.length,
        successRows: successCount,
        errorRows: errors.length,
        errors: errors,
      },
    });

    // 6. Trigger webhooks
    await triggerWebhooks('IMPORT_COMPLETED', {
      importJobId,
      totalRows: rows.length,
      successRows: successCount,
      errorRows: errors.length,
    });

  } catch (error: any) {
    // Marquer comme échoué
    await prisma.importJob.update({
      where: { id: importJobId },
      data: {
        status: 'FAILED',
        completedAt: new Date(),
        errors: [{ error: error.message }],
      },
    });
  }
}
```

---

## 📧 Séquences d'emails automatiques

### 1. Créer une séquence

```typescript
// app/actions/sequences.ts
'use server';

import { prisma } from '@/lib/db';

export async function createEmailSequence(
  name: string,
  organizationId: string,
  steps: Array<{
    templateId: string;
    delayDays: number;
    delayHours: number;
  }>
) {
  const sequence = await prisma.emailSequence.create({
    data: {
      name,
      organizationId,
      isActive: false,
      steps: {
        create: steps.map((step, index) => ({
          stepOrder: index + 1,
          templateId: step.templateId,
          delayDays: step.delayDays,
          delayHours: step.delayHours,
        })),
      },
    },
    include: {
      steps: {
        include: { template: true },
        orderBy: { stepOrder: 'asc' },
      },
    },
  });

  return sequence;
}
```

### 2. Enrôler un lead dans une séquence

```typescript
export async function enrollLeadInSequence(
  leadId: string,
  sequenceId: string
) {
  // Vérifier que le lead n'est pas déjà enrôlé
  const existing = await prisma.leadSequenceEnrollment.findUnique({
    where: {
      leadId_sequenceId: { leadId, sequenceId },
    },
  });

  if (existing) {
    throw new Error('Lead already enrolled in this sequence');
  }

  const enrollment = await prisma.leadSequenceEnrollment.create({
    data: {
      leadId,
      sequenceId,
      status: 'ACTIVE',
      currentStep: 0,
    },
  });

  // Créer job pour envoyer premier email immédiatement
  await prisma.jobQueue.create({
    data: {
      type: 'SEND_EMAIL_SEQUENCE',
      payload: {
        enrollmentId: enrollment.id,
      },
      status: 'PENDING',
    },
  });

  return enrollment;
}
```

### 3. Worker pour envoyer emails de séquence

```typescript
// lib/workers/email-sequence-worker.ts
import { prisma } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function processEmailSequenceJobs() {
  // Récupérer tous les enrollments actifs
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

  for (const enrollment of enrollments) {
    const currentStep = enrollment.sequence.steps[enrollment.currentStep];

    if (!currentStep) {
      // Séquence terminée
      await prisma.leadSequenceEnrollment.update({
        where: { id: enrollment.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      });
      continue;
    }

    // Calculer si l'email doit être envoyé
    const enrolledAt = enrollment.enrolledAt;
    const delayMs = (currentStep.delayDays * 24 * 60 * 60 * 1000) +
                    (currentStep.delayHours * 60 * 60 * 1000);
    const shouldSendAt = new Date(enrolledAt.getTime() + delayMs);

    if (new Date() >= shouldSendAt) {
      // Envoyer email
      await sendEmailFromTemplate(
        enrollment.lead,
        currentStep.template,
        enrollment.id
      );

      // Passer à l'étape suivante
      await prisma.leadSequenceEnrollment.update({
        where: { id: enrollment.id },
        data: {
          currentStep: enrollment.currentStep + 1,
        },
      });
    }
  }
}

async function sendEmailFromTemplate(
  lead: any,
  template: any,
  enrollmentId: string
) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Remplacer variables dans le template
  let body = template.body;
  let subject = template.subject;

  Object.entries(lead).forEach(([key, value]) => {
    body = body.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
    subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: lead.email,
    subject,
    html: body,
  });

  // Logger activité
  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      leadId: lead.id,
      userId: lead.ownerId,
      title: `Email automatique: ${subject}`,
      description: `Envoyé via séquence`,
    },
  });

  // Trigger webhook
  await triggerWebhooks('EMAIL_SENT', {
    leadId: lead.id,
    templateId: template.id,
    enrollmentId,
  });
}
```

---

## 🔗 Webhooks pour intégrations

### 1. Créer un webhook

```typescript
// app/actions/webhooks.ts
'use server';

import { prisma } from '@/lib/db';

export async function createWebhook(data: {
  name: string;
  url: string;
  events: string[];
  secret?: string;
  organizationId: string;
}) {
  const webhook = await prisma.webhook.create({
    data: {
      ...data,
      method: 'POST',
      isActive: true,
    },
  });

  return webhook;
}
```

### 2. Fonction pour trigger webhooks

```typescript
// lib/webhooks/trigger.ts
import { prisma } from '@/lib/db';
import crypto from 'crypto';

export async function triggerWebhooks(
  event: string,
  payload: any,
  organizationId?: string
) {
  // Récupérer webhooks actifs pour cet événement
  const webhooks = await prisma.webhook.findMany({
    where: {
      isActive: true,
      deletedAt: null,
      ...(organizationId && { organizationId }),
      events: {
        path: '$',
        array_contains: event,
      },
    },
  });

  for (const webhook of webhooks) {
    // Créer job asynchrone pour chaque webhook
    await prisma.jobQueue.create({
      data: {
        type: 'TRIGGER_WEBHOOK',
        payload: {
          webhookId: webhook.id,
          event,
          payload,
        },
        priority: 1, // Priorité moyenne
      },
    });
  }
}

// Worker pour exécuter webhooks
export async function executeWebhook(
  webhookId: string,
  event: string,
  payload: any
) {
  const webhook = await prisma.webhook.findUnique({
    where: { id: webhookId },
  });

  if (!webhook) {
    throw new Error('Webhook not found');
  }

  const startTime = Date.now();

  try {
    // Créer signature HMAC si secret fourni
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Event-Type': event,
    };

    if (webhook.secret) {
      const signature = crypto
        .createHmac('sha256', webhook.secret)
        .update(JSON.stringify(payload))
        .digest('hex');
      
      headers['X-Webhook-Signature'] = signature;
    }

    // Ajouter headers personnalisés
    if (webhook.headers) {
      headers = { ...headers, ...(webhook.headers as any) };
    }

    // Envoyer requête
    const response = await fetch(webhook.url, {
      method: webhook.method,
      headers,
      body: JSON.stringify(payload),
    });

    const duration = Date.now() - startTime;
    const responseData = await response.json().catch(() => null);

    // Logger résultat
    await prisma.webhookLog.create({
      data: {
        webhookId,
        event,
        payload,
        status: response.status,
        response: responseData,
        duration,
      },
    });

    // Mettre à jour stats webhook
    await prisma.webhook.update({
      where: { id: webhookId },
      data: {
        lastTriggeredAt: new Date(),
        failureCount: response.ok ? 0 : webhook.failureCount + 1,
      },
    });

    // Désactiver si trop d'échecs
    if (!response.ok && webhook.failureCount + 1 >= 5) {
      await prisma.webhook.update({
        where: { id: webhookId },
        data: { isActive: false },
      });
    }

  } catch (error: any) {
    const duration = Date.now() - startTime;

    await prisma.webhookLog.create({
      data: {
        webhookId,
        event,
        payload,
        status: 0,
        error: error.message,
        duration,
      },
    });

    // Incrémenter compteur d'échecs
    await prisma.webhook.update({
      where: { id: webhookId },
      data: {
        failureCount: webhook.failureCount + 1,
      },
    });
  }
}
```

---

## 📊 Custom Fields dynamiques

### 1. Créer un custom field

```typescript
// app/actions/custom-fields.ts
'use server';

import { prisma } from '@/lib/db';

export async function createCustomField(data: {
  name: string;
  label: string;
  fieldType: string;
  entityType: string;
  isRequired: boolean;
  options?: string[];
  organizationId: string;
}) {
  const customField = await prisma.customField.create({
    data: {
      ...data,
      options: data.options || null,
    },
  });

  return customField;
}
```

### 2. Assigner valeur à un lead

```typescript
export async function setCustomFieldValue(
  fieldId: string,
  entityId: string,
  value: string
) {
  const customFieldValue = await prisma.customFieldValue.upsert({
    where: {
      fieldId_entityId: {
        fieldId,
        entityId,
      },
    },
    create: {
      fieldId,
      entityId,
      value,
    },
    update: {
      value,
    },
  });

  return customFieldValue;
}
```

### 3. Récupérer lead avec custom fields

```typescript
export async function getLeadWithCustomFields(leadId: string) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      customFieldValues: {
        include: {
          field: true,
        },
      },
    },
  });

  if (!lead) return null;

  // Transformer en objet plus utilisable
  const customFields: Record<string, any> = {};
  lead.customFieldValues.forEach((cfv) => {
    customFields[cfv.field.name] = {
      label: cfv.field.label,
      value: cfv.value,
      fieldType: cfv.field.fieldType,
    };
  });

  return {
    ...lead,
    customFields,
  };
}
```

---

## 🔄 Job Queue Worker (Cron)

```typescript
// lib/workers/job-queue-worker.ts
import { prisma } from '@/lib/db';
import { processImportJob } from './import-worker';
import { processEmailSequenceJobs } from './email-sequence-worker';
import { executeWebhook } from '../webhooks/trigger';

export async function processJobQueue() {
  console.log('🔄 Processing job queue...');

  // Récupérer jobs en attente
  const jobs = await prisma.jobQueue.findMany({
    where: {
      status: 'PENDING',
      OR: [
        { scheduledFor: null },
        { scheduledFor: { lte: new Date() } },
      ],
    },
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'asc' },
    ],
    take: 10, // Traiter 10 jobs à la fois
  });

  for (const job of jobs) {
    try {
      // Marquer comme en cours
      await prisma.jobQueue.update({
        where: { id: job.id },
        data: {
          status: 'PROCESSING',
          startedAt: new Date(),
        },
      });

      // Exécuter selon le type
      switch (job.type) {
        case 'IMPORT_CSV':
          await processImportJob(job.payload.importJobId);
          break;

        case 'SEND_EMAIL_SEQUENCE':
          await processEmailSequenceJobs();
          break;

        case 'TRIGGER_WEBHOOK':
          await executeWebhook(
            job.payload.webhookId,
            job.payload.event,
            job.payload.payload
          );
          break;

        case 'CALCULATE_SCORES':
          // Votre logique de scoring
          break;

        default:
          throw new Error(`Unknown job type: ${job.type}`);
      }

      // Marquer comme terminé
      await prisma.jobQueue.update({
        where: { id: job.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      });

      console.log(`✅ Job ${job.id} completed`);

    } catch (error: any) {
      console.error(`❌ Job ${job.id} failed:`, error);

      // Incrémenter tentatives
      const newAttempts = job.attempts + 1;

      if (newAttempts >= job.maxAttempts) {
        // Marquer comme échoué définitivement
        await prisma.jobQueue.update({
          where: { id: job.id },
          data: {
            status: 'FAILED',
            completedAt: new Date(),
            error: error.message,
          },
        });
      } else {
        // Réessayer plus tard (exponential backoff)
        const delayMinutes = Math.pow(2, newAttempts) * 5;
        await prisma.jobQueue.update({
          where: { id: job.id },
          data: {
            status: 'PENDING',
            attempts: newAttempts,
            scheduledFor: new Date(Date.now() + delayMinutes * 60 * 1000),
            error: error.message,
          },
        });
      }
    }
  }
}

// Exécuter toutes les minutes via cron
// Exemple avec node-cron :
// cron.schedule('* * * * *', processJobQueue);
```

### Script pour lancer le worker

```typescript
// scripts/start-worker.ts
import { processJobQueue } from '../lib/workers/job-queue-worker';

async function main() {
  console.log('🚀 Starting job queue worker...');

  // Boucle infinie
  while (true) {
    try {
      await processJobQueue();
    } catch (error) {
      console.error('Worker error:', error);
    }

    // Attendre 1 minute
    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
}

main();
```

Lancer avec :
```bash
npx ts-node scripts/start-worker.ts
# Ou avec PM2 pour production :
pm2 start scripts/start-worker.ts --name "job-worker"
```

---

## 📝 Audit Logging automatique

### Middleware Prisma pour auto-logging

```typescript
// lib/prisma-middleware.ts
import { prisma } from './db';

export function setupAuditMiddleware(userId: string) {
  prisma.$use(async (params, next) => {
    const result = await next(params);

    // Logger les modifications
    if (['create', 'update', 'delete'].includes(params.action)) {
      const entityType = params.model || 'Unknown';
      const action = params.action.toUpperCase();

      // Ne pas logger les audit logs eux-mêmes
      if (entityType !== 'AuditLog') {
        await prisma.auditLog.create({
          data: {
            userId,
            entityType,
            entityId: result?.id || 'unknown',
            action: action as any,
            changes: params.args,
          },
        });
      }
    }

    return result;
  });
}
```

---

Ces exemples couvrent toutes les fonctionnalités principales. Vous pouvez les adapter selon vos besoins spécifiques !

