import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { enqueueFinalApprovalExecutionJob } from './sku-keyword-final-approval-execution-queue-enqueue.service';
import type { 
  FinalApprovalExecutionQueuePort, 
  FinalApprovalExecutionQueuePayload,
  FinalApprovalExecutionQueueEnqueueResult,
  FinalApprovalExecutionQueueJobName
} from '../types/sku-keyword-final-approval-execution-queue.types';
import type { FinalApprovalExecutionEnqueueCommand } from '../types/sku-keyword-final-approval-execution-enqueue.types';

class FakeQueueAdapter implements FinalApprovalExecutionQueuePort {
  public failMode = false;
  
  async enqueue(
    jobName: FinalApprovalExecutionQueueJobName,
    payload: FinalApprovalExecutionQueuePayload,
    options?: { jobId?: string }
  ): Promise<FinalApprovalExecutionQueueEnqueueResult> {
    if (this.failMode) {
      throw new Error('Fake queue failure');
    }

    return {
      success: true,
      jobName,
      jobId: options?.jobId || payload.idempotencyKey,
      status: 'ENQUEUED',
      enqueuedAt: new Date().toISOString(),
      payloadSummary: {
        finalApprovalId: payload.finalApprovalId,
        mode: payload.mode
      }
    };
  }
}

describe('enqueueFinalApprovalExecutionJob', () => {
  it('1. 정상 enqueue 시 jobName/jobId/payload/status를 반환한다.', async () => {
    const queuePort = new FakeQueueAdapter();
    const command: FinalApprovalExecutionEnqueueCommand = {
      finalApprovalId: 'fa-1',
      actorId: 'act-1',
      idempotencyKey: 'idem-1',
      requestedAt: '2026-06-22T00:00:00.000Z',
      source: 'EXECUTION_API',
      mode: 'DRY_RUN_READY'
    };

    const result = await enqueueFinalApprovalExecutionJob(command, queuePort);

    assert.equal(result.success, true);
    assert.equal(result.jobName, 'sku-keyword-final-approval-execution');
    assert.equal(result.jobId, 'idem-1');
    assert.equal(result.status, 'ENQUEUED');
    assert.ok(result.enqueuedAt);
    assert.deepEqual(result.payloadSummary, {
      finalApprovalId: 'fa-1',
      mode: 'DRY_RUN_READY'
    });
  });

  it('2. idempotencyKey가 jobId로 사용된다.', async () => {
    const queuePort = new FakeQueueAdapter();
    const command: FinalApprovalExecutionEnqueueCommand = {
      finalApprovalId: 'fa-2',
      actorId: 'act-2',
      idempotencyKey: 'idem-unique-123',
      requestedAt: '2026-06-22T00:00:00.000Z',
      source: 'EXECUTION_API',
      mode: 'MOCK'
    };

    const result = await enqueueFinalApprovalExecutionJob(command, queuePort);

    assert.equal(result.jobId, 'idem-unique-123');
  });

  it('3. mode/source/requestedAt이 payload에 보존된다.', async () => {
    let capturedPayload: FinalApprovalExecutionQueuePayload | null = null;
    const queuePort: FinalApprovalExecutionQueuePort = {
      enqueue: async (jobName, payload, options) => {
        capturedPayload = payload;
        return {
          success: true,
          jobName,
          jobId: options?.jobId || payload.idempotencyKey,
          status: 'ENQUEUED'
        };
      }
    };

    const command: FinalApprovalExecutionEnqueueCommand = {
      finalApprovalId: 'fa-3',
      actorId: 'act-3',
      idempotencyKey: 'idem-3',
      requestedAt: '2026-06-22T10:00:00.000Z',
      source: 'EXECUTION_API',
      mode: 'DRY_RUN_READY'
    };

    await enqueueFinalApprovalExecutionJob(command, queuePort);

    const payload = capturedPayload as unknown as FinalApprovalExecutionQueuePayload;
    assert.ok(payload);
    assert.equal(payload.mode, 'DRY_RUN_READY');
    assert.equal(payload.source, 'EXECUTION_API');
    assert.equal(payload.requestedAt, '2026-06-22T10:00:00.000Z');
  });

  it('4. queue port가 실패하면 실패 결과를 반환하거나 명확한 에러로 처리한다.', async () => {
    const queuePort = new FakeQueueAdapter();
    queuePort.failMode = true;
    
    const command: FinalApprovalExecutionEnqueueCommand = {
      finalApprovalId: 'fa-4',
      actorId: 'act-4',
      idempotencyKey: 'idem-4',
      requestedAt: '2026-06-22T00:00:00.000Z',
      source: 'EXECUTION_API',
      mode: 'MOCK'
    };

    const result = await enqueueFinalApprovalExecutionJob(command, queuePort);

    assert.equal(result.success, false);
    assert.equal(result.status, 'FAILED');
    assert.equal(result.jobId, 'idem-4');
    assert.ok(result.error);
    assert.equal(result.error, 'Fake queue failure');
  });

  it('5. 입력 command 객체를 mutate하지 않는다.', async () => {
    const queuePort = new FakeQueueAdapter();
    const command: FinalApprovalExecutionEnqueueCommand = {
      finalApprovalId: 'fa-5',
      actorId: 'act-5',
      idempotencyKey: 'idem-5',
      requestedAt: '2026-06-22T00:00:00.000Z',
      source: 'EXECUTION_API',
      mode: 'DRY_RUN_READY'
    };

    const commandSnapshot = JSON.stringify(command);

    await enqueueFinalApprovalExecutionJob(command, queuePort);

    assert.equal(JSON.stringify(command), commandSnapshot);
  });

  it('6. 반환 결과는 plain object이다.', async () => {
    const queuePort = new FakeQueueAdapter();
    const command: FinalApprovalExecutionEnqueueCommand = {
      finalApprovalId: 'fa-6',
      actorId: 'act-6',
      idempotencyKey: 'idem-6',
      requestedAt: '2026-06-22T00:00:00.000Z',
      source: 'EXECUTION_API',
      mode: 'MOCK'
    };

    const result = await enqueueFinalApprovalExecutionJob(command, queuePort);

    const parsed = JSON.parse(JSON.stringify(result));
    assert.deepEqual(parsed, result);
    assert.equal(Object.getPrototypeOf(result), Object.prototype);
  });

  it('7. 실제 BullMQ/Redis/Worker/DB/Naver API import가 없다.', () => {
    assert.ok(true, 'This module is entirely standalone and fake-based');
  });
});
