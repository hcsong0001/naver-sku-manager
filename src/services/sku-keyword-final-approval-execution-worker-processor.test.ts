import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { processFinalApprovalExecutionWorkerJob } from './sku-keyword-final-approval-execution-worker-processor.service';
import type { FinalApprovalExecutionQueueProcessorInputJob } from '../types/sku-keyword-final-approval-execution-queue-processor.types';
import type { FinalApprovalExecutionWorkerProcessorDependencies } from './sku-keyword-final-approval-execution-worker-processor.service';
import type { FinalApprovalExecutionWorkerJobDbRevalidationSnapshot } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';
import type { FinalApprovalExecutionTransitionApplyPlan } from '../types/sku-keyword-final-approval-execution-transition-apply.types';
import type { ResultRecordingAdapterPort, ExecutionResultPlan } from '../types/sku-keyword-final-approval-execution-result-recording.types';

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

  // ── Result Recording wiring tests ──────────────────────────────────────────

  it('6. resultRecordingAdapter.applyExecutionResultPlan이 성공 flow에서 정확히 1회 호출됨', async () => {
    let callCount = 0;
    let capturedPlan: ExecutionResultPlan | null = null;

    const mockRecordingAdapter: ResultRecordingAdapterPort = {
      applyExecutionResultPlan: async (plan) => {
        callCount++;
        capturedPlan = plan;
        return { applied: false, skippedReason: 'mock' };
      },
    };

    const deps: FinalApprovalExecutionWorkerProcessorDependencies = {
      ...createMockDeps(),
      resultRecordingAdapter: mockRecordingAdapter,
    };
    const job = createValidJob();
    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.executionPerformed, true);
    assert.strictEqual(callCount, 1, 'recording adapter must be called exactly once');
    assert.ok(capturedPlan !== null, 'plan must be passed to the adapter');
  });

  it('7. resultRecordingAdapter가 없으면 no-op 기본 동작으로 Worker 성공 반환', async () => {
    const deps = createMockDeps(); // no resultRecordingAdapter
    const job = createValidJob();
    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.executionPerformed, true);
  });

  it('8. resultRecordingAdapter가 throw하면 RESULT_RECORDING_FAILED 반환', async () => {
    const failingAdapter: ResultRecordingAdapterPort = {
      applyExecutionResultPlan: async () => {
        throw new Error('recording DB unavailable');
      },
    };

    const deps: FinalApprovalExecutionWorkerProcessorDependencies = {
      ...createMockDeps(),
      resultRecordingAdapter: failingAdapter,
    };
    const job = createValidJob();
    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.code, 'RESULT_RECORDING_FAILED');
    // transition was applied before recording failed
    assert.strictEqual(result.executionPerformed, true);
  });

  it('9. Transition Apply 실패 시 recordingAdapter는 호출되지 않음', async () => {
    let recordingCalled = false;
    const mockRecordingAdapter: ResultRecordingAdapterPort = {
      applyExecutionResultPlan: async () => {
        recordingCalled = true;
        return { applied: false };
      },
    };

    const deps: FinalApprovalExecutionWorkerProcessorDependencies = {
      ...createMockDeps(),
      resultRecordingAdapter: mockRecordingAdapter,
    };
    deps.transitionApplyAdapter.transaction = async () => {
      throw new Error('transition failed');
    };

    const job = createValidJob();
    const result = await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.code, 'TRANSITION_APPLY_FAILED');
    assert.strictEqual(recordingCalled, false, 'recording must not be called after transition failure');
  });

  it('10. recording adapter에 전달되는 plan은 TRANSITION_ONLY (itemResults 없음)', async () => {
    let capturedPlan: ExecutionResultPlan | null = null;

    const mockAdapter: ResultRecordingAdapterPort = {
      applyExecutionResultPlan: async (plan) => {
        capturedPlan = plan;
        return { applied: false };
      },
    };

    const deps: FinalApprovalExecutionWorkerProcessorDependencies = {
      ...createMockDeps(),
      resultRecordingAdapter: mockAdapter,
    };
    const job = createValidJob();
    await processFinalApprovalExecutionWorkerJob(job, deps);

    assert.ok(capturedPlan !== null);
    const plan = capturedPlan as ExecutionResultPlan;
    assert.strictEqual(plan.applicable, false);
    assert.strictEqual(plan.itemUpdates.length, 0,
      'no item results yet — Naver API execution has not occurred');
  });

  it('11. recording adapter { applied: false } 반환도 Worker 성공으로 처리됨 (정상 no-op 경로)', async () => {
    const mockAdapter: ResultRecordingAdapterPort = {
      applyExecutionResultPlan: async () => ({ applied: false, skippedReason: 'TRANSITION_ONLY' }),
    };

    const deps: FinalApprovalExecutionWorkerProcessorDependencies = {
      ...createMockDeps(),
      resultRecordingAdapter: mockAdapter,
    };
    const result = await processFinalApprovalExecutionWorkerJob(createValidJob(), deps);

    assert.strictEqual(result.success, true);
  });

  it('12. recording adapter { applied: true } 반환도 Worker 성공으로 처리됨 (실제 기록 경로)', async () => {
    const mockAdapter: ResultRecordingAdapterPort = {
      applyExecutionResultPlan: async () => ({ applied: true, jobUpdated: true, itemsUpdated: 0 }),
    };

    const deps: FinalApprovalExecutionWorkerProcessorDependencies = {
      ...createMockDeps(),
      resultRecordingAdapter: mockAdapter,
    };
    const result = await processFinalApprovalExecutionWorkerJob(createValidJob(), deps);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.executionPerformed, true);
  });
});
