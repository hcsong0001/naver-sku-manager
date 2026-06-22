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
  
  // Fake Queue는 NODE_ENV === 'test' 환경에서만 허용
  if (
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

  // 실제 BullMQ Adapter는 아직 구현되지 않음 (테스트 외 환경에서는 방어)
  return null;
}

export function resetFakeQueueAdapterInstanceForTest(): void {
  fakeQueueAdapterInstance = null;
}
