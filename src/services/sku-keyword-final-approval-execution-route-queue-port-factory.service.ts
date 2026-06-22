import type { 
  FinalApprovalExecutionQueuePort, 
  FinalApprovalExecutionQueueJobName,
  FinalApprovalExecutionQueuePayload,
  FinalApprovalExecutionQueueEnqueueResult
} from '../types/sku-keyword-final-approval-execution-queue.types';

export class FakeQueueAdapterForRoute implements FinalApprovalExecutionQueuePort {
  public failMode = false;
  public lastPayload: FinalApprovalExecutionQueuePayload | null = null;
  public lastJobId: string | null = null;
  
  async enqueue(
    jobName: FinalApprovalExecutionQueueJobName,
    payload: FinalApprovalExecutionQueuePayload,
    options?: { jobId?: string }
  ): Promise<FinalApprovalExecutionQueueEnqueueResult> {
    this.lastPayload = payload;
    this.lastJobId = options?.jobId || payload.idempotencyKey;

    if (this.failMode) {
      return {
        success: false,
        jobName,
        jobId: this.lastJobId,
        status: 'FAILED',
        error: 'Fake Queue Enqueue Failed'
      };
    }

    return {
      success: true,
      jobName,
      jobId: this.lastJobId,
      status: 'ENQUEUED',
      enqueuedAt: new Date().toISOString(),
      payloadSummary: {
        finalApprovalId: payload.finalApprovalId,
        mode: payload.mode
      }
    };
  }
}

// 싱글톤으로 유지하여 테스트에서 상태(payload 등)를 조회할 수 있도록 함
let fakeQueueAdapterInstance: FakeQueueAdapterForRoute | null = null;

export function getFakeQueueAdapterInstanceForTest(): FakeQueueAdapterForRoute | null {
  return fakeQueueAdapterInstance;
}

export function createFinalApprovalExecutionRouteQueuePort(): FinalApprovalExecutionQueuePort | null {
  if (process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE !== 'true') {
    return null;
  }

  const adapterType = process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER;

  // BullMQ Adapter 선택
  if (adapterType === 'bullmq') {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      // REDIS_URL 누락 시 안전 실패 (REDIS_URL 원문 노출 없음)
      return null;
    }

    // BullMQ import는 Factory 내부에서만 수행하여 route.ts 격리 유지
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createFinalApprovalExecutionBullmqQueueAdapter } = require('./sku-keyword-final-approval-execution-bullmq-queue-adapter.service') as typeof import('./sku-keyword-final-approval-execution-bullmq-queue-adapter.service');
    return createFinalApprovalExecutionBullmqQueueAdapter(redisUrl);
  }

  // Fake Queue는 NODE_ENV === 'test' 환경에서만 허용
  if (
    adapterType === 'fake-test-only' &&
    process.env.NODE_ENV === 'test' && 
    process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY === 'true'
  ) {
    if (!fakeQueueAdapterInstance) {
      fakeQueueAdapterInstance = new FakeQueueAdapterForRoute();
    }
    
    // 테스트별 실패 모드 동적 토글 지원
    fakeQueueAdapterInstance.failMode = process.env.FAKE_QUEUE_FAIL_MODE === 'true';
    
    return fakeQueueAdapterInstance;
  }

  // adapter 미설정, disabled, 또는 조건 미충족 시 안전 실패
  return null;
}

export function resetFakeQueueAdapterInstanceForTest(): void {
  fakeQueueAdapterInstance = null;
}
