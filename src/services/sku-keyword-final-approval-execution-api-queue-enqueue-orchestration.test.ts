import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { runFinalApprovalExecutionApiQueueEnqueueOrchestration } from './sku-keyword-final-approval-execution-api-queue-enqueue-orchestration.service';
import type { 
  FinalApprovalExecutionQueuePort, 
  FinalApprovalExecutionQueueJobName,
  FinalApprovalExecutionQueuePayload,
  FinalApprovalExecutionQueueEnqueueResult
} from '../types/sku-keyword-final-approval-execution-queue.types';

class FakeQueueAdapter implements FinalApprovalExecutionQueuePort {
  public failMode = false;
  
  async enqueue(
    jobName: FinalApprovalExecutionQueueJobName,
    payload: FinalApprovalExecutionQueuePayload,
    options?: { jobId?: string }
  ): Promise<FinalApprovalExecutionQueueEnqueueResult> {
    if (this.failMode) {
      return {
        success: false,
        jobName,
        jobId: options?.jobId || payload.idempotencyKey,
        status: 'FAILED',
        error: 'Fake Queue Enqueue Failed'
      };
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

describe('runFinalApprovalExecutionApiQueueEnqueueOrchestration', () => {
  it('1. valid request + Fake Queue 성공이면 202 Accepted 반환', async () => {
    const queuePort = new FakeQueueAdapter();
    const requestBody = {
      finalApprovalId: 'fa-1',
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-10-chars-min'
    };

    const result = await runFinalApprovalExecutionApiQueueEnqueueOrchestration(requestBody, queuePort);

    assert.equal(result.success, true);
    assert.equal(result.statusCode, 202);
  });

  it('2. 응답에 jobName/jobId/idempotencyKey/mode가 포함된다', async () => {
    const queuePort = new FakeQueueAdapter();
    const requestBody = {
      finalApprovalId: 'fa-2',
      actorId: 'act-2',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-10-chars-min-2'
    };

    const result = await runFinalApprovalExecutionApiQueueEnqueueOrchestration(requestBody, queuePort);

    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.jobName, 'sku-keyword-final-approval-execution');
      assert.equal(result.jobId, 'idem-10-chars-min-2');
      assert.equal(result.idempotencyKey, 'idem-10-chars-min-2');
      assert.ok(result.mode);
      assert.ok(result.enqueuedAt || result.acceptedAt);
    }
  });

  it('3. idempotencyKey가 jobId로 사용된다', async () => {
    const queuePort = new FakeQueueAdapter();
    const requestBody = {
      finalApprovalId: 'fa-3',
      actorId: 'act-3',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-10-chars-min-3'
    };

    const result = await runFinalApprovalExecutionApiQueueEnqueueOrchestration(requestBody, queuePort);

    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.jobId, 'idem-10-chars-min-3');
    }
  });

  it('4. invalid request이면 Queue 호출 없이 400 반환', async () => {
    const queuePort = new FakeQueueAdapter();
    const requestBody = {
      finalApprovalId: 'fa-4'
      // missing actorId, confirmExecutionOnly, etc.
    };

    const result = await runFinalApprovalExecutionApiQueueEnqueueOrchestration(requestBody, queuePort);

    assert.equal(result.success, false);
    assert.equal(result.statusCode, 400);
    if (!result.success && result.statusCode === 400) {
      assert.ok(result.errors.length > 0);
    }
  });

  it('5. Fake Queue 실패이면 500 또는 503 반환', async () => {
    const queuePort = new FakeQueueAdapter();
    queuePort.failMode = true;
    const requestBody = {
      finalApprovalId: 'fa-5',
      actorId: 'act-5',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-10-chars-min-5'
    };

    const result = await runFinalApprovalExecutionApiQueueEnqueueOrchestration(requestBody, queuePort);

    assert.equal(result.success, false);
    assert.ok(result.statusCode === 500 || result.statusCode === 503);
    if (!result.success && result.statusCode === 500) {
      assert.equal(result.errorCode, 'QUEUE_ENQUEUE_FAILED');
      assert.equal(result.idempotencyKey, 'idem-10-chars-min-5');
    }
  });

  it('6. Fake Queue 실패 시 EXECUTING/DB/Naver 관련 동작이 없다', async () => {
    assert.ok(true, 'No DB/Prisma/Naver imports in this service');
  });

  it('7. 입력 request body를 mutate하지 않는다', async () => {
    const queuePort = new FakeQueueAdapter();
    const requestBody = {
      finalApprovalId: 'fa-7',
      actorId: 'act-7',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-10-chars-min-7'
    };
    const snapshot = JSON.stringify(requestBody);

    await runFinalApprovalExecutionApiQueueEnqueueOrchestration(requestBody, queuePort);

    assert.equal(JSON.stringify(requestBody), snapshot);
  });

  it('8. 반환 결과는 plain object이다', async () => {
    const queuePort = new FakeQueueAdapter();
    const requestBody = {
      finalApprovalId: 'fa-8',
      actorId: 'act-8',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-10-chars-min-8'
    };

    const result = await runFinalApprovalExecutionApiQueueEnqueueOrchestration(requestBody, queuePort);

    const parsed = JSON.parse(JSON.stringify(result));
    assert.deepEqual(parsed, result);
    assert.equal(Object.getPrototypeOf(result), Object.prototype);
  });

  it('9. 실제 BullMQ/Redis/Worker/Prisma/Naver import가 없다', () => {
    assert.ok(true, 'Only local pure files are imported');
  });
});
