import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { processFinalApprovalExecutionWorkerJob } from './sku-keyword-final-approval-execution-worker-processor.service';
import type { FinalApprovalExecutionQueueProcessorInputJob } from '../types/sku-keyword-final-approval-execution-queue-processor.types';
import type { FinalApprovalExecutionWorkerProcessorDependencies } from './sku-keyword-final-approval-execution-worker-processor.service';
import type { FinalApprovalExecutionWorkerJobDbRevalidationSnapshot } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';
import type { FinalApprovalExecutionTransitionApplyPlan } from '../types/sku-keyword-final-approval-execution-transition-apply.types';

describe('FinalApproval Execution Worker Processor Actual Connection', () => {
  const validSnapshot: FinalApprovalExecutionWorkerJobDbRevalidationSnapshot = {
    finalApprovalId: 'fa-001',
    finalApprovalStatus: 'ACTIVE',
    finalApprovalExpiresAt: new Date(Date.now() + 100000).toISOString(),
    jobId: 'job-001',
    jobStatus: 'APPROVED',
    readyItemCount: 1,
    payloadHash: 'hash',
    validationSnapshotHash: 'vshash',
    expectedPayloadHash: 'hash',
    expectedValidationSnapshotHash: 'vshash',
    idempotencyKey: 'idem-1',
    idempotencyKeyAlreadyUsed: false
  };

  const createMockDeps = (): FinalApprovalExecutionWorkerProcessorDependencies => ({
    revalidationRepository: {
      findSnapshotForWorkerJobRevalidation: async (id, key) => {
        if (id === 'fa-001' && key === 'idem-1') {
          return validSnapshot;
        }
        return null;
      }
    },
    transitionApplyAdapter: {
      transaction: async (fn: any) => fn({
        updateBatchJobStatus: async () => ({ updated: true }),
        updateBatchJobItemStatus: async () => ({ updated: true })
      })
    }
  });

  const createValidJob = (): FinalApprovalExecutionQueueProcessorInputJob => ({
    id: 'job-123',
    name: 'sku-keyword-final-approval-execution',
    data: {
      finalApprovalId: 'fa-001',
      idempotencyKey: 'idem-1',
      actorId: 'test-actor',
      mode: 'MOCK',
      source: 'EXECUTION_API',
      requestedAt: new Date().toISOString()
    }
  });

  it('1. 정상 job payload가 들어오면 orchestration과 transition apply가 성공하고 executionPerformed=true 반환', async () => {
    const deps = createMockDeps();
    const job = createValidJob();

    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.executionPerformed, true);
    assert.strictEqual(result.finalApprovalId, 'fa-001');
  });

  it('2. finalApprovalId가 누락되면 payload validation 실패로 orchestration 단계에서 차단', async () => {
    const deps = createMockDeps();
    const job = createValidJob();
    delete (job.data as any).finalApprovalId;

    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.code, 'PAYLOAD_VALIDATION_FAILED');
    assert.strictEqual(result.executionPerformed, false);
  });

  it('3. snapshot이 없으면 DB_REVALIDATION_FAILED 에러 반환', async () => {
    const deps = createMockDeps();
    const job = createValidJob();
    (job.data as any).finalApprovalId = 'invalid-id';

    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.code, 'DB_REVALIDATION_FAILED');
  });

  it('4. orchestration은 통과했으나, snapshot이 재조회되지 않으면 SNAPSHOT_NOT_FOUND 에러', async () => {
    const deps = createMockDeps();
    // 첫 조회는 성공하지만, 두 번째 조회는 실패하도록 변경
    let callCount = 0;
    deps.revalidationRepository.findSnapshotForWorkerJobRevalidation = async () => {
      if (callCount === 0) {
        callCount++;
        return validSnapshot;
      }
      return null; // 두번째 호출 시 null 반환
    };

    const job = createValidJob();
    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.code, 'SNAPSHOT_NOT_FOUND');
  });

  it('5. Transition Apply 단계에서 실패하면 TRANSITION_APPLY_FAILED 반환', async () => {
    const deps = createMockDeps();
    // Update 실패 시뮬레이션 (Transaction fail)
    deps.transitionApplyAdapter.transaction = async () => {
      throw new Error('mock transaction failed');
    };

    const job = createValidJob();
    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.code, 'TRANSITION_APPLY_FAILED');
  });
});
