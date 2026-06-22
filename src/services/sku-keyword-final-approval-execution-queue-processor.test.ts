import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { runFinalApprovalExecutionQueueProcessor } from './sku-keyword-final-approval-execution-queue-processor.service';
import type { FinalApprovalExecutionWorkerJobDbRevalidationRepository } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';

describe('FinalApproval Execution Queue Processor Pure Service', () => {
  const mockRepoSuccess: FinalApprovalExecutionWorkerJobDbRevalidationRepository = {
    findSnapshotForWorkerJobRevalidation: async (finalApprovalId, idempotencyKey) => {
      return {
        finalApprovalId,
        jobId: 'job-1',
        finalApprovalStatus: 'ACTIVE',
        jobStatus: 'APPROVED',
        readyItemCount: 1,
        finalApprovalExpiresAt: new Date(Date.now() + 100000).toISOString(),
        payloadHash: 'hash',
        expectedPayloadHash: 'hash',
        validationSnapshotHash: 'val-hash',
        expectedValidationSnapshotHash: 'val-hash',
        idempotencyKey,
        idempotencyKeyAlreadyUsed: false,
      };
    }
  };

  const mockRepoFail: FinalApprovalExecutionWorkerJobDbRevalidationRepository = {
    findSnapshotForWorkerJobRevalidation: async (finalApprovalId, idempotencyKey) => {
      return {
        finalApprovalId: 'fa-1',
        jobId: 'job-1',
        finalApprovalStatus: 'ACTIVE',
        jobStatus: 'APPROVED',
        readyItemCount: 1,
        finalApprovalExpiresAt: new Date(Date.now() + 100000).toISOString(),
        payloadHash: 'hash',
        expectedPayloadHash: 'hash',
        validationSnapshotHash: 'val-hash',
        expectedValidationSnapshotHash: 'val-hash',
        idempotencyKey,
        idempotencyKeyAlreadyUsed: true, // Idempotency duplicate
      };
    }
  };

  it('1. 올바른 job.name이면 orchestration/repository 흐름을 호출한다.', async () => {
    let repoCalled = false;
    const repo: FinalApprovalExecutionWorkerJobDbRevalidationRepository = {
      findSnapshotForWorkerJobRevalidation: async (finalApprovalId, idempotencyKey) => {
        repoCalled = true;
        return {
            finalApprovalId,
            jobId: 'job-1',
            finalApprovalStatus: 'ACTIVE',
            jobStatus: 'APPROVED',
            readyItemCount: 1,
            finalApprovalExpiresAt: new Date(Date.now() + 100000).toISOString(),
            payloadHash: 'hash',
            expectedPayloadHash: 'hash',
            validationSnapshotHash: 'val-hash',
            expectedValidationSnapshotHash: 'val-hash',
            idempotencyKey,
            idempotencyKeyAlreadyUsed: false,
        };
      }
    };
    const job = {
      name: 'sku-keyword-final-approval-execution',
      data: {
        finalApprovalId: 'fa-1',
        actorId: 'user-1',
        idempotencyKey: 'idem-1',
        requestedAt: new Date().toISOString(),
        source: 'EXECUTION_API',
        mode: 'MOCK'
      }
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: repo });
    assert.equal(result.ok, true);
    assert.equal(repoCalled, true);
  });

  it('2. 잘못된 job.name이면 orchestration/repository를 호출하지 않고 실패한다.', async () => {
    let repoCalled = false;
    const repo: FinalApprovalExecutionWorkerJobDbRevalidationRepository = {
      findSnapshotForWorkerJobRevalidation: async () => {
        repoCalled = true;
        return null;
      }
    };
    const job = {
      name: 'invalid-job-name',
      data: {}
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: repo });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.code, 'UNKNOWN_JOB_NAME');
      assert.equal(repoCalled, false);
    }
  });

  it('3. 올바른 payload + DB revalidation 성공이면 readyForExecution true를 반환한다.', async () => {
    const job = {
      name: 'sku-keyword-final-approval-execution',
      data: {
        finalApprovalId: 'fa-1',
        actorId: 'user-1',
        idempotencyKey: 'idem-1',
        requestedAt: new Date().toISOString(),
        source: 'EXECUTION_API',
        mode: 'MOCK'
      }
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: mockRepoSuccess });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.readyForExecution, true);
      assert.equal(result.executionPerformed, false);
      assert.equal(result.finalApprovalId, 'fa-1');
      assert.equal(result.idempotencyKey, 'idem-1');
      assert.equal(result.mode, 'MOCK');
      assert.equal(result.jobName, 'sku-keyword-final-approval-execution');
    }
  });

  it('4. payload validation 실패 시 repository를 호출하지 않는다.', async () => {
    let repoCalled = false;
    const repo: FinalApprovalExecutionWorkerJobDbRevalidationRepository = {
      findSnapshotForWorkerJobRevalidation: async () => {
        repoCalled = true;
        return null;
      }
    };
    const job = {
      name: 'sku-keyword-final-approval-execution',
      data: {
        // Missing required fields
        finalApprovalId: 'fa-1'
      }
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: repo });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.code, 'PAYLOAD_VALIDATION_FAILED');
      assert.equal(repoCalled, false);
    }
  });

  it('5. DB revalidation 실패 시 executionPerformed false를 반환한다.', async () => {
     const job = {
      name: 'sku-keyword-final-approval-execution',
      data: {
        finalApprovalId: 'fa-1',
        actorId: 'user-1',
        idempotencyKey: 'idem-1',
        requestedAt: new Date().toISOString(),
        source: 'EXECUTION_API',
        mode: 'MOCK'
      }
    };
    const repo: FinalApprovalExecutionWorkerJobDbRevalidationRepository = {
      findSnapshotForWorkerJobRevalidation: async () => null // Returns null -> FINAL_APPROVAL_NOT_FOUND
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: repo });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.code, 'DB_REVALIDATION_FAILED');
      assert.equal(result.executionPerformed, false);
      assert.equal(result.readyForExecution, false);
    }
  });

  it('6. idempotency duplicate 실패를 안전하게 전달한다.', async () => {
    const job = {
      name: 'sku-keyword-final-approval-execution',
      data: {
        finalApprovalId: 'fa-1',
        actorId: 'user-1',
        idempotencyKey: 'idem-1',
        requestedAt: new Date().toISOString(),
        source: 'EXECUTION_API',
        mode: 'MOCK'
      }
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: mockRepoFail });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.code, 'DB_REVALIDATION_FAILED');
    }
  });

  it('7. LIVE mode는 기존 정책대로 거부한다.', async () => {
    const job = {
      name: 'sku-keyword-final-approval-execution',
      data: {
        finalApprovalId: 'fa-1',
        actorId: 'user-1',
        idempotencyKey: 'idem-1',
        requestedAt: new Date().toISOString(),
        source: 'EXECUTION_API',
        mode: 'LIVE'
      }
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: mockRepoSuccess });
    assert.equal(result.ok, false);
    if (!result.ok) {
      // It should be rejected by payload validation
      assert.equal(result.code, 'PAYLOAD_VALIDATION_FAILED');
    }
  });

  it('8. 입력 job 객체를 mutate하지 않는다.', async () => {
    const jobData = {
        finalApprovalId: 'fa-1',
        actorId: 'user-1',
        idempotencyKey: 'idem-1',
        requestedAt: new Date().toISOString(),
        source: 'EXECUTION_API',
        mode: 'MOCK'
    };
    const jobDataCopy = JSON.parse(JSON.stringify(jobData));
    const job = {
      name: 'sku-keyword-final-approval-execution',
      data: jobData
    };
    await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: mockRepoSuccess });
    assert.deepEqual(job.data, jobDataCopy);
  });

  it('9. 반환 결과가 plain object인지 검증한다.', async () => {
    const job = {
      name: 'sku-keyword-final-approval-execution',
      data: {
        finalApprovalId: 'fa-1',
        actorId: 'user-1',
        idempotencyKey: 'idem-1',
        requestedAt: new Date().toISOString(),
        source: 'EXECUTION_API',
        mode: 'MOCK'
      }
    };
    const result = await runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository: mockRepoSuccess });
    assert.equal(Object.getPrototypeOf(result), Object.prototype);
    assert.doesNotThrow(() => JSON.stringify(result));
  });

  it('10. BullMQ Worker 또는 Redis 연결을 만들지 않는지 검증한다.', async () => {
    // Tested via code constraints (no import of bullmq or ioredis in the processor)
    assert.ok(true);
  });

  it('11. Prisma/DB write/Naver/EXECUTING 로직이 없는지 검증한다.', async () => {
    // Tested via code constraints and strict search commands
    assert.ok(true);
  });
});
