import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  createRestrictedDbRevalidationPrismaAdapter,
  type RevalidationPrismaClientPort,
} from './sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service';

const FIXTURE_ID = 'test-db-revalidation-final-approval-001';
const JOB_ID = 'test-db-revalidation-batch-job-001';
const ITEM_ID = 'test-db-revalidation-batch-job-item-001';
const PAYLOAD_HASH = 'a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f50001';
const VAL_HASH = 'b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a0b1c2d3e4f5a00001';
const IDEM_KEY = 'restricted-dry-run-idempotency-key-001';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeMockPrisma(
  faRow: {
    id: string;
    status: string;
    validationExpiresAt: Date | null;
    payloadHash: string;
    validationSnapshotHash: string;
    jobId: string;
    job: { id: string; status: string; items: Array<{ id: string; status: string }> } | null;
  } | null
): RevalidationPrismaClientPort {
  return {
    naverApiBatchFinalApproval: {
      findUnique: async () => faRow,
    },
  };
}

const BASE_FA_ROW = {
  id: FIXTURE_ID,
  status: 'ACTIVE',
  validationExpiresAt: new Date('2026-12-31T00:00:00.000Z'),
  payloadHash: PAYLOAD_HASH,
  validationSnapshotHash: VAL_HASH,
  jobId: JOB_ID,
  job: {
    id: JOB_ID,
    status: 'APPROVED',
    items: [{ id: ITEM_ID, status: 'READY' }],
  },
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe('RestrictedDbRevalidationPrismaAdapter', () => {
  it('1. returns null when FinalApproval not found', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(null));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);
    assert.strictEqual(result, null);
  });

  it('2. returns well-formed snapshot when FinalApproval found', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(BASE_FA_ROW));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null, 'snapshot must not be null');
    assert.strictEqual(result.finalApprovalId, FIXTURE_ID);
    assert.strictEqual(result.finalApprovalStatus, 'ACTIVE');
    assert.strictEqual(result.jobId, JOB_ID);
    assert.strictEqual(result.jobStatus, 'APPROVED');
    assert.strictEqual(result.readyItemCount, 1);
    assert.strictEqual(result.payloadHash, PAYLOAD_HASH);
    assert.strictEqual(result.validationSnapshotHash, VAL_HASH);
    assert.strictEqual(result.idempotencyKey, IDEM_KEY);
  });

  it('3. expectedPayloadHash equals payloadHash (hash check will pass)', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(BASE_FA_ROW));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.strictEqual(result.expectedPayloadHash, result.payloadHash);
    assert.strictEqual(result.expectedValidationSnapshotHash, result.validationSnapshotHash);
  });

  it('4. idempotencyKeyAlreadyUsed is always false (dry-run)', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(BASE_FA_ROW));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.strictEqual(result.idempotencyKeyAlreadyUsed, false);
  });

  it('5. validationExpiresAt is ISO string when date present', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(BASE_FA_ROW));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.strictEqual(result.finalApprovalExpiresAt, '2026-12-31T00:00:00.000Z');
  });

  it('6. validationExpiresAt is null when DB value is null', async () => {
    const row = { ...BASE_FA_ROW, validationExpiresAt: null };
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(row));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.strictEqual(result.finalApprovalExpiresAt, null);
  });

  it('7. readyItemCount is 0 when job has no items', async () => {
    const row = {
      ...BASE_FA_ROW,
      job: { id: JOB_ID, status: 'APPROVED', items: [] },
    };
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(row));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.strictEqual(result.readyItemCount, 0);
  });

  it('8. jobStatus is UNKNOWN when job relation is null', async () => {
    const row = { ...BASE_FA_ROW, job: null };
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(row));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.strictEqual(result.jobStatus, 'UNKNOWN');
    assert.strictEqual(result.jobId, JOB_ID, 'falls back to fa.jobId when job relation null');
    assert.strictEqual(result.readyItemCount, 0);
  });

  it('9. readyItemCount counts only items present in the result (filters applied by DB query)', async () => {
    const row = {
      ...BASE_FA_ROW,
      job: {
        id: JOB_ID,
        status: 'APPROVED',
        items: [
          { id: 'item-1', status: 'READY' },
          { id: 'item-2', status: 'READY' },
          { id: 'item-3', status: 'READY' },
        ],
      },
    };
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(row));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.strictEqual(result.readyItemCount, 3);
  });

  it('9b. readyItemIds contains actual DB item IDs for real-adapter transition apply', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(BASE_FA_ROW));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.deepStrictEqual(result.readyItemIds, [ITEM_ID]);
  });

  it('9c. readyItemIds is empty array when job has no items', async () => {
    const row = {
      ...BASE_FA_ROW,
      job: { id: JOB_ID, status: 'APPROVED', items: [] },
    };
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(row));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.deepStrictEqual(result.readyItemIds, []);
  });

  it('9d. readyItemIds is empty array when job relation is null', async () => {
    const row = { ...BASE_FA_ROW, job: null };
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(row));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    assert.deepStrictEqual(result.readyItemIds, []);
  });

  it('10. snapshot result contains no URL strings', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(BASE_FA_ROW));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    const serialized = JSON.stringify(result);
    assert.ok(!serialized.includes('postgresql://'), 'no DB URL in snapshot');
    assert.ok(!serialized.includes('redis://'), 'no Redis URL in snapshot');
    assert.ok(!serialized.includes('@localhost'), 'no credentials in snapshot');
  });

  it('11. no DB call made at adapter construction time', () => {
    let callCount = 0;
    const prisma: RevalidationPrismaClientPort = {
      naverApiBatchFinalApproval: {
        findUnique: async () => { callCount++; return null; },
      },
    };

    createRestrictedDbRevalidationPrismaAdapter(prisma);
    assert.strictEqual(callCount, 0, 'findUnique must not be called at construction time');
  });

  it('12. snapshot is a plain JSON-serializable object', async () => {
    const adapter = createRestrictedDbRevalidationPrismaAdapter(makeMockPrisma(BASE_FA_ROW));
    const result = await adapter.findSnapshotForWorkerJobRevalidation(FIXTURE_ID, IDEM_KEY);

    assert.ok(result !== null);
    let serialized: string;
    assert.doesNotThrow(() => { serialized = JSON.stringify(result); });
    const parsed = JSON.parse(serialized!);
    assert.strictEqual(parsed.finalApprovalId, FIXTURE_ID);
  });
});
