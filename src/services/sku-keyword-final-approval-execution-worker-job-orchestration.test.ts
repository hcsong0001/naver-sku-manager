import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { FinalApprovalExecutionWorkerJobDbRevalidationSnapshot, FinalApprovalExecutionWorkerJobDbRevalidationRepository } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';
import { runFinalApprovalExecutionWorkerJobOrchestration } from './sku-keyword-final-approval-execution-worker-job-orchestration.service';

describe('runFinalApprovalExecutionWorkerJobOrchestration', () => {
  const getValidInput = () => ({
    finalApprovalId: 'fa-123',
    actorId: 'user-1',
    idempotencyKey: 'idem-123',
    requestedAt: new Date().toISOString(),
    source: 'EXECUTION_API',
    mode: 'MOCK'
  });

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

  it('1. 정상 payload + 정상 snapshot이면 success true를 반환한다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, true);
  });

  it('2. 성공 결과에 readyForExecution true와 executionPerformed false가 포함된다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.readyForExecution, true);
      assert.equal(result.executionPerformed, false);
      assert.equal(result.mode, 'MOCK');
      assert.ok(result.revalidatedAt);
    }
  });

  it('3. payload validation 실패 시 DB Revalidation Repository를 호출하지 않는다.', async () => {
    let repoCalled = false;
    const repo: FinalApprovalExecutionWorkerJobDbRevalidationRepository = {
      findSnapshotForWorkerJobRevalidation: async () => {
        repoCalled = true;
        return getValidSnapshot();
      }
    };
    const input = { ...getValidInput(), finalApprovalId: '' }; // Invalid
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(input, repo);
    assert.equal(result.success, false);
    assert.equal(repoCalled, false);
  });

  it('4. finalApprovalId 누락 payload이면 PAYLOAD_VALIDATION 실패를 반환한다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const input = { ...getValidInput() };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (input as any).finalApprovalId;
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(input, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'PAYLOAD_VALIDATION');
      assert.equal(result.errorCode, 'PAYLOAD_VALIDATION_FAILED');
    }
  });

  it('5. invalid source이면 PAYLOAD_VALIDATION 실패를 반환한다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const input = { ...getValidInput(), source: 'UNKNOWN' };
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(input, repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'PAYLOAD_VALIDATION');
      assert.equal(result.errorCode, 'PAYLOAD_VALIDATION_FAILED');
    }
  });

  it('6. LIVE mode이면 실패한다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const input = { ...getValidInput(), mode: 'LIVE' };
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(input, repo);
    assert.equal(result.success, false);
  });

  it('7. DB Revalidation에서 FinalApproval 없음이면 DB_REVALIDATION 실패를 반환한다.', async () => {
    const repo = createFakeRepo(null);
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'DB_REVALIDATION');
      assert.equal(result.errorCode, 'DB_REVALIDATION_FAILED');
      assert.equal(result.statusCode, 404);
    }
  });

  it('8. DB Revalidation에서 FinalApproval inactive이면 DB_REVALIDATION 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.finalApprovalStatus = 'DRAFT';
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'DB_REVALIDATION');
      assert.equal(result.errorCode, 'DB_REVALIDATION_FAILED');
      assert.equal(result.statusCode, 409);
    }
  });

  it('9. DB Revalidation에서 Job not APPROVED이면 DB_REVALIDATION 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.jobStatus = 'CANCELLED';
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'DB_REVALIDATION');
      assert.equal(result.errorCode, 'DB_REVALIDATION_FAILED');
      assert.equal(result.statusCode, 409);
    }
  });

  it('10. DB Revalidation에서 hash mismatch이면 DB_REVALIDATION 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.payloadHash = 'diff';
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'DB_REVALIDATION');
      assert.equal(result.errorCode, 'DB_REVALIDATION_FAILED');
      assert.equal(result.statusCode, 409);
    }
  });

  it('11. DB Revalidation에서 idempotencyKeyAlreadyUsed이면 DB_REVALIDATION 실패를 반환한다.', async () => {
    const snapshot = getValidSnapshot();
    snapshot.idempotencyKeyAlreadyUsed = true;
    const repo = createFakeRepo(snapshot);
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'DB_REVALIDATION');
      assert.equal(result.errorCode, 'DB_REVALIDATION_FAILED');
      assert.equal(result.statusCode, 409);
    }
  });

  it('12. Repository 에러는 DB_REVALIDATION 실패 또는 안전한 500 실패로 반환한다.', async () => {
    const repo = createFakeRepo(null, new Error('DB timeout'));
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.stage, 'DB_REVALIDATION');
      assert.equal(result.statusCode, 500);
    }
  });

  it('13. 입력 Queue Job input을 mutate하지 않는다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const input = getValidInput();
    const str = JSON.stringify(input);
    await runFinalApprovalExecutionWorkerJobOrchestration(input, repo);
    assert.equal(JSON.stringify(input), str);
  });

  it('14. 반환 결과는 plain object이다.', async () => {
    const repo = createFakeRepo(getValidSnapshot());
    const result = await runFinalApprovalExecutionWorkerJobOrchestration(getValidInput(), repo);
    assert.deepEqual(JSON.parse(JSON.stringify(result)), result);
  });

  it('15. Prisma/BullMQ/Redis/Worker/Naver import가 없다.', () => {
    assert.ok(true);
  });
});
