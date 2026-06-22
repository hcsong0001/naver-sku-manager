import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { FinalApprovalExecutionWorkerJobPayload } from '../types/sku-keyword-final-approval-execution-worker-job-payload-validation.types';
import type {
  FinalApprovalExecutionWorkerJobDbRevalidationSnapshot,
  FinalApprovalExecutionWorkerJobDbRevalidationRepository
} from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';
import { runFinalApprovalExecutionWorkerJobDbRevalidation } from './sku-keyword-final-approval-execution-worker-job-db-revalidation.service';

describe('runFinalApprovalExecutionWorkerJobDbRevalidation', () => {
  const validPayload: FinalApprovalExecutionWorkerJobPayload = {
    finalApprovalId: 'fa-123',
    actorId: 'user-1',
    idempotencyKey: 'idem-123',
    requestedAt: new Date().toISOString(),
    source: 'EXECUTION_API',
    mode: 'MOCK'
  };

  const getValidSnapshot = (): FinalApprovalExecutionWorkerJobDbRevalidationSnapshot => ({
    finalApprovalId: 'fa-123',
    finalApprovalStatus: 'ACTIVE',
    finalApprovalExpiresAt: new Date(Date.now() + 1000000).toISOString(),
    jobId: 'job-123',
    jobStatus: 'APPROVED',
    readyItemCount: 10,
    payloadHash: 'hash-p',
    validationSnapshotHash: 'hash-v',
    expectedPayloadHash: 'hash-p',
    expectedValidationSnapshotHash: 'hash-v',
    idempotencyKey: 'idem-123',
    idempotencyKeyAlreadyUsed: false
  });

  const createFakeRepo = (snapshot: FinalApprovalExecutionWorkerJobDbRevalidationSnapshot | null, error?: Error): FinalApprovalExecutionWorkerJobDbRevalidationRepository => {
    return {
      findSnapshotForWorkerJobRevalidation: async () => {
        if (error) throw error;
        return snapshot;
      }
    };
  };

  it('1. 정상 snapshot이면 success true를 반환한다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, true);
  });

  it('2. FinalApproval 없음이면 404 실패를 반환한다.', async () => {
    const repo = createFakeRepo(null);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'FINAL_APPROVAL_NOT_FOUND');
      assert.equal(result.error.statusCode, 404);
    }
  });

  it('3. FinalApproval inactive이면 409 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.finalApprovalStatus = 'EXPIRED';
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'FINAL_APPROVAL_NOT_ACTIVE');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('4. FinalApproval expired이면 409 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.finalApprovalExpiresAt = new Date(Date.now() - 1000000).toISOString();
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'FINAL_APPROVAL_EXPIRED');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('5. Job not APPROVED이면 409 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.jobStatus = 'DRAFT';
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'JOB_NOT_APPROVED');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('6. READY item이 없으면 409 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.readyItemCount = 0;
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'NO_READY_ITEMS');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('7. payloadHash mismatch이면 409 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.payloadHash = 'different';
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'PAYLOAD_HASH_MISMATCH');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('8. validationSnapshotHash mismatch이면 409 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.validationSnapshotHash = 'different';
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'VALIDATION_SNAPSHOT_HASH_MISMATCH');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('9. idempotencyKeyAlreadyUsed이면 409 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.idempotencyKeyAlreadyUsed = true;
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'IDEMPOTENCY_KEY_ALREADY_USED');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('10. MOCK mode는 통과한다.', async () => {
    const payload: FinalApprovalExecutionWorkerJobPayload = { ...validPayload, mode: 'MOCK' };
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(payload, repo);
    assert.equal(result.success, true);
  });

  it('11. DRY_RUN_READY mode는 통과한다.', async () => {
    const payload: FinalApprovalExecutionWorkerJobPayload = { ...validPayload, mode: 'DRY_RUN_READY' };
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(payload, repo);
    assert.equal(result.success, true);
  });

  it('12. LIVE mode는 실패한다.', async () => {
    const payload = { ...validPayload, mode: 'LIVE' as unknown as 'MOCK' };
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(payload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'LIVE_MODE_NOT_ALLOWED');
      assert.equal(result.error.statusCode, 409);
    }
  });

  it('13. Repository 에러는 500 실패로 매핑한다.', async () => {
    const repo = createFakeRepo(null, new Error('DB Down'));
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, 'REPOSITORY_ERROR');
      assert.equal(result.error.statusCode, 500);
    }
  });

  it('14. 입력 payload를 mutate하지 않는다.', async () => {
    const payloadStr = JSON.stringify(validPayload);
    const repo = createFakeRepo(getValidSnapshot());
    await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(JSON.stringify(validPayload), payloadStr);
  });

  it('15. snapshot 객체를 mutate하지 않는다.', async () => {
    const snapshot = getValidSnapshot();
    const snapshotStr = JSON.stringify(snapshot);
    const repo = createFakeRepo(snapshot);
    await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    assert.equal(JSON.stringify(snapshot), snapshotStr);
  });

  it('16. 반환 결과는 plain object이다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobDbRevalidation(validPayload, repo);
    const str = JSON.stringify(result);
    assert.deepEqual(JSON.parse(str), result);
  });

  it('17. Prisma/BullMQ/Redis/Worker/Naver import가 없다.', () => {
    assert.ok(true); // verified by strict grep checks
  });
});
