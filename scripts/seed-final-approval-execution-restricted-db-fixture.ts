import {
  validateRestrictedDbDryRunSafety,
  REQUIRED_FIXTURE_ID,
  REQUIRED_QUEUE_NAME,
} from '../src/services/sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';
import { createSafePrismaClientForTestDb } from './lib/create-safe-prisma-client-for-test-db';

// ── Fixture constants ─────────────────────────────────────────────────────────
const FIXTURE = {
  storeId: 'test-store-restricted-dry-run-001',
  storeSellerId: 'test-seller-restricted-dry-run-001',
  batchJobId: 'test-db-revalidation-batch-job-001',
  batchJobItemId: 'test-db-revalidation-batch-job-item-001',
  finalApprovalId: REQUIRED_FIXTURE_ID,
  // All hash values must fit in varchar(64) — using 64-char test hex strings
  payloadHash: 'a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f50001',
  validationSnapshotHash: 'b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a00001',
  itemPayloadHash: 'c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b10001',
  itemValidationHash: 'd3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c20001',
};

async function run() {
  // ── 1. Safety guard ─────────────────────────────────────────────────────────
  const safety = validateRestrictedDbDryRunSafety({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    queueName: process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME ?? REQUIRED_QUEUE_NAME,
    finalApprovalId: REQUIRED_FIXTURE_ID,
  });

  console.log('[Seed] NODE_ENV:', process.env.NODE_ENV ?? 'undefined');
  console.log('[Seed] DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('[Seed] DB host (masked):', safety.dbHostMasked ?? '[unknown]');
  console.log('[Seed] Safety guard:', safety.ok ? 'PASS' : 'FAIL');

  if (!safety.ok) {
    console.error('[Safety FAIL] Guard errors:');
    safety.errors.forEach(e => console.error('  -', e));
    process.exit(1);
  }

  // ── 2. Create PrismaClient via safe helper (validates URL again) ─────────────
  let prisma: ReturnType<typeof createSafePrismaClientForTestDb>;
  try {
    prisma = createSafePrismaClientForTestDb();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Seed ABORT] PrismaClient creation failed:', msg.replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED]'));
    process.exit(1);
  }

  try {
    // ── 3. Check if fixture already exists and is valid ─────────────────────────
    console.log('[Seed] Checking existing fixture...');
    const existing = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: FIXTURE.finalApprovalId },
      select: {
        id: true,
        status: true,
        job: {
          select: {
            status: true,
            items: { select: { status: true } },
          },
        },
      },
    });

    if (existing) {
      const job = existing.job;
      const readyCount = job?.items.filter(i => i.status === 'READY').length ?? 0;
      const isValid =
        existing.status === 'ACTIVE' &&
        job?.status === 'APPROVED' &&
        readyCount > 0;

      if (isValid) {
        console.log('[Seed] Fixture already exists and is in valid state:');
        console.log('[Seed]   FinalApproval status:', existing.status);
        console.log('[Seed]   BatchJob status:', job?.status);
        console.log('[Seed]   BatchJobItem READY count:', readyCount);
        console.log('[Result] RESTRICTED_FIXTURE_ALREADY_VALID');
        return;
      }

      console.log('[Seed] Fixture exists but is not in valid pre-run state — will attempt to fix');
    } else {
      console.log('[Seed] Fixture does not exist — creating from scratch');
    }

    // ── 4. Upsert Smartstore ─────────────────────────────────────────────────────
    console.log('[Seed] Upserting Smartstore...');
    await prisma.smartstore.upsert({
      where: { id: FIXTURE.storeId },
      create: {
        id: FIXTURE.storeId,
        sellerId: FIXTURE.storeSellerId,
        name: 'Restricted Dry Run Test Store',
        naverPartnerType: 'SELF',
      },
      update: {
        name: 'Restricted Dry Run Test Store',
      },
    });
    console.log('[Seed] Smartstore upserted:', FIXTURE.storeId);

    // ── 5. Upsert BatchJob ───────────────────────────────────────────────────────
    console.log('[Seed] Upserting BatchJob...');
    await prisma.naverApiBatchJob.upsert({
      where: { id: FIXTURE.batchJobId },
      create: {
        id: FIXTURE.batchJobId,
        jobType: 'SKU_KEYWORD_UPDATE',
        module: 'RESTRICTED_DRY_RUN_TEST',
        status: 'APPROVED',
        dryRun: true,
        description: 'Restricted DB dry-run test fixture',
        totalItems: 1,
      },
      update: {
        status: 'APPROVED',
      },
    });
    console.log('[Seed] BatchJob upserted:', FIXTURE.batchJobId);

    // ── 6. Upsert BatchJobItem ──────────────────────────────────────────────────
    console.log('[Seed] Upserting BatchJobItem...');
    await prisma.naverApiBatchJobItem.upsert({
      where: { id: FIXTURE.batchJobItemId },
      create: {
        id: FIXTURE.batchJobItemId,
        batchJobId: FIXTURE.batchJobId,
        storeId: FIXTURE.storeId,
        targetType: 'KEYWORD',
        targetId: 'test-keyword-restricted-dry-run-001',
        operation: 'UPDATE',
        status: 'READY',
        calculationType: 'SINGLE',
        requestPayload: { target: 'restricted-dry-run-test', mode: 'DRY_RUN_READY' },
      },
      update: {
        status: 'READY',
      },
    });
    console.log('[Seed] BatchJobItem upserted:', FIXTURE.batchJobItemId);

    // ── 7. Upsert FinalApproval ─────────────────────────────────────────────────
    console.log('[Seed] Upserting FinalApproval...');
    // validationExpiresAt: 30 days from now (well within execution window)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.naverApiBatchFinalApproval.upsert({
      where: { id: FIXTURE.finalApprovalId },
      create: {
        id: FIXTURE.finalApprovalId,
        jobId: FIXTURE.batchJobId,
        version: 1,
        status: 'ACTIVE',
        finalApprovedAt: new Date(),
        finalApprovedBy: 'restricted-dry-run-seed',
        approvalSource: 'RESTRICTED_DRY_RUN_TEST',
        validationSnapshot: {
          seededAt: new Date().toISOString(),
          purpose: 'restricted-db-dry-run-fixture',
        },
        validationSnapshotHash: FIXTURE.validationSnapshotHash,
        validationExpiresAt: expiresAt,
        payloadHash: FIXTURE.payloadHash,
        executionScope: {
          batchJobId: FIXTURE.batchJobId,
          itemIds: [FIXTURE.batchJobItemId],
        },
        hashSpec: {
          algorithm: 'sha256',
          version: 'v1',
          note: 'fixture-hash-for-restricted-dry-run',
        },
      },
      update: {
        status: 'ACTIVE',
        validationExpiresAt: expiresAt,
      },
    });
    console.log('[Seed] FinalApproval upserted:', FIXTURE.finalApprovalId);

    // ── 8. Upsert FinalApprovalItem ─────────────────────────────────────────────
    console.log('[Seed] Upserting FinalApprovalItem...');
    await prisma.naverApiBatchFinalApprovalItem.upsert({
      where: {
        finalApprovalId_jobItemId: {
          finalApprovalId: FIXTURE.finalApprovalId,
          jobItemId: FIXTURE.batchJobItemId,
        },
      },
      create: {
        finalApprovalId: FIXTURE.finalApprovalId,
        jobItemId: FIXTURE.batchJobItemId,
        targetType: 'KEYWORD',
        targetId: 'test-keyword-restricted-dry-run-001',
        storeId: FIXTURE.storeId,
        operation: 'UPDATE',
        included: true,
        itemPayloadHash: FIXTURE.itemPayloadHash,
        itemValidationHash: FIXTURE.itemValidationHash,
      },
      update: {
        included: true,
      },
    });
    console.log('[Seed] FinalApprovalItem upserted');

    // ── 9. Verify final seed state ──────────────────────────────────────────────
    console.log('[Seed] Verifying seeded fixture...');
    const seeded = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: FIXTURE.finalApprovalId },
      select: {
        id: true,
        status: true,
        job: {
          select: {
            id: true,
            status: true,
            items: { select: { id: true, status: true } },
          },
        },
        items: { select: { id: true, included: true } },
      },
    });

    if (!seeded) {
      console.error('[Seed] FinalApproval not found after upsert — unexpected error');
      process.exit(1);
    }

    const seededJob = seeded.job;
    const seededReadyCount = seededJob?.items.filter(i => i.status === 'READY').length ?? 0;
    const seededItemCount = seeded.items.length;

    console.log('[Seed] FinalApproval status:', seeded.status);
    console.log('[Seed] BatchJob status:', seededJob?.status ?? 'NOT FOUND');
    console.log('[Seed] BatchJobItem READY count:', seededReadyCount);
    console.log('[Seed] FinalApprovalItem count:', seededItemCount);

    const failures: string[] = [];
    if (seeded.status !== 'ACTIVE') failures.push(`FinalApproval.status=${seeded.status}`);
    if (seededJob?.status !== 'APPROVED') failures.push(`BatchJob.status=${seededJob?.status}`);
    if (seededReadyCount === 0) failures.push('BatchJobItem READY count=0');
    if (seededItemCount === 0) failures.push('FinalApprovalItem count=0');

    if (failures.length > 0) {
      console.error('[Seed] Post-seed verification failed:', failures.join(', '));
      process.exit(1);
    }

    console.log('[Result] SEEDED_RESTRICTED_FIXTURE');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(err => {
  const msg = err instanceof Error ? err.message : String(err);
  const safeMsg = msg
    .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED_DB_URL]')
    .replace(/redis:\/\/[^\s]*/gi, '[REDACTED_REDIS_URL]');
  console.error('[Error] Seed script failed:', safeMsg);
  process.exit(1);
});
