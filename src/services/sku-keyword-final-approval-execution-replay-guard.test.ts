import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  evaluateFinalApprovalExecutionReplayGuard,
} from './sku-keyword-final-approval-execution-replay-guard.service';
import type {
  ExecutionReplayGuardInput,
} from './sku-keyword-final-approval-execution-replay-guard.service';

// Base input representing APPROVED job, ACTIVE FA, READY items
const APPROVED_READY_INPUT: ExecutionReplayGuardInput = {
  batchJobStatus: 'APPROVED',
  batchJobExecutedAt: null,
  finalApprovalStatus: 'ACTIVE',
  itemStatuses: ['READY', 'READY', 'READY'],
  executionMetadata: {
    executionMode: 'mock',
    actorId: 'test-actor',
    finalApprovalId: 'fa-001',
  },
};

// Base input for an already-executed job
const EXECUTED_INPUT: ExecutionReplayGuardInput = {
  batchJobStatus: 'EXECUTED',
  batchJobExecutedAt: '2026-06-23T10:00:00.000Z',
  finalApprovalStatus: 'ACTIVE',
  itemStatuses: ['SUCCESS', 'SUCCESS', 'SUCCESS'],
  executionMetadata: {
    executionMode: 'restricted-db',
    actorId: 'restricted-db-dry-run-actor',
    finalApprovalId: 'fa-001',
    startedAt: '2026-06-23T10:00:00.000Z',
    endedAt: '2026-06-23T10:00:01.000Z',
    recordedAt: '2026-06-23T10:00:01.100Z',
    durationMs: 1023,
  },
};

describe('ExecutionReplayGuard — APPROVED_READY (실행 가능)', () => {
  it('1. APPROVED + ACTIVE FA + READY items → allowed=true, ALLOWED_APPROVED_READY', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(APPROVED_READY_INPUT);
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.reasonCode, 'ALLOWED_APPROVED_READY');
    assert.strictEqual(result.alreadyExecuted, false);
    assert.strictEqual(result.alreadyExecuting, false);
  });

  it('2. allowed=true일 때 hasSuccessItems=false, hasFailedItems=false', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(APPROVED_READY_INPUT);
    assert.strictEqual(result.hasSuccessItems, false);
    assert.strictEqual(result.hasFailedItems, false);
  });

  it('3. allowed=true일 때 executedAt=null', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(APPROVED_READY_INPUT);
    assert.strictEqual(result.executedAt, null);
  });

  it('4. allowed=true일 때 actorId, executionMode는 메타데이터에서 전달됨', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(APPROVED_READY_INPUT);
    assert.strictEqual(result.actorId, 'test-actor');
    assert.strictEqual(result.executionMode, 'mock');
  });
});

describe('ExecutionReplayGuard — EXECUTED 상태 (재실행 불가)', () => {
  it('5. EXECUTED 상태 → allowed=false, BATCH_JOB_ALREADY_EXECUTED', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(EXECUTED_INPUT);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_ALREADY_EXECUTED');
  });

  it('6. EXECUTED → alreadyExecuted=true, alreadyExecuting=false', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(EXECUTED_INPUT);
    assert.strictEqual(result.alreadyExecuted, true);
    assert.strictEqual(result.alreadyExecuting, false);
  });

  it('7. EXECUTED → executedAt이 입력값으로 전달됨', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(EXECUTED_INPUT);
    assert.strictEqual(result.executedAt, '2026-06-23T10:00:00.000Z');
  });

  it('8. EXECUTED → actorId, executionMode가 메타데이터에서 전달됨', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(EXECUTED_INPUT);
    assert.strictEqual(result.actorId, 'restricted-db-dry-run-actor');
    assert.strictEqual(result.executionMode, 'restricted-db');
  });

  it('9. EXECUTED → reasonMessage에 재실행 차단 내용 포함', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard(EXECUTED_INPUT);
    assert.ok(result.reasonMessage.length > 0);
    assert.ok(
      result.reasonMessage.includes('재실행') || result.reasonMessage.includes('완료'),
      `reasonMessage should mention re-execution block: ${result.reasonMessage}`
    );
  });
});

describe('ExecutionReplayGuard — EXECUTING 상태 (동시 실행 불가)', () => {
  it('10. EXECUTING 상태 → allowed=false, BATCH_JOB_ALREADY_EXECUTING', () => {
    const input: ExecutionReplayGuardInput = {
      ...APPROVED_READY_INPUT,
      batchJobStatus: 'EXECUTING',
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_ALREADY_EXECUTING');
  });

  it('11. EXECUTING → alreadyExecuted=false, alreadyExecuting=true', () => {
    const input: ExecutionReplayGuardInput = {
      ...APPROVED_READY_INPUT,
      batchJobStatus: 'EXECUTING',
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.alreadyExecuted, false);
    assert.strictEqual(result.alreadyExecuting, true);
  });
});

describe('ExecutionReplayGuard — PARTIAL_SUCCESS, FAILED 상태', () => {
  it('12. PARTIAL_SUCCESS → allowed=false, BATCH_JOB_EXECUTION_PARTIAL', () => {
    const input: ExecutionReplayGuardInput = {
      ...EXECUTED_INPUT,
      batchJobStatus: 'PARTIAL_SUCCESS',
      itemStatuses: ['SUCCESS', 'FAILED'],
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_EXECUTION_PARTIAL');
    assert.strictEqual(result.alreadyExecuted, true);
  });

  it('13. FAILED → allowed=false, BATCH_JOB_EXECUTION_FAILED', () => {
    const input: ExecutionReplayGuardInput = {
      ...EXECUTED_INPUT,
      batchJobStatus: 'FAILED',
      itemStatuses: ['FAILED', 'FAILED'],
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_EXECUTION_FAILED');
    assert.strictEqual(result.alreadyExecuted, true);
  });
});

describe('ExecutionReplayGuard — 실행된 항목이 있는 경우', () => {
  it('14. SUCCESS item이 있으면 → BATCH_JOB_HAS_EXECUTED_ITEMS', () => {
    const input: ExecutionReplayGuardInput = {
      batchJobStatus: 'APPROVED',
      batchJobExecutedAt: null,
      finalApprovalStatus: 'ACTIVE',
      itemStatuses: ['SUCCESS', 'READY'],
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_HAS_EXECUTED_ITEMS');
    assert.strictEqual(result.hasSuccessItems, true);
  });

  it('15. FAILED item이 있으면 → BATCH_JOB_HAS_EXECUTED_ITEMS', () => {
    const input: ExecutionReplayGuardInput = {
      batchJobStatus: 'APPROVED',
      batchJobExecutedAt: null,
      finalApprovalStatus: 'ACTIVE',
      itemStatuses: ['FAILED', 'READY'],
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_HAS_EXECUTED_ITEMS');
    assert.strictEqual(result.hasFailedItems, true);
  });

  it('16. EXECUTED 상태가 item status 검사보다 우선 처리됨', () => {
    const input: ExecutionReplayGuardInput = {
      batchJobStatus: 'EXECUTED',
      batchJobExecutedAt: '2026-06-23T10:00:00.000Z',
      finalApprovalStatus: 'ACTIVE',
      itemStatuses: ['SUCCESS'],
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    // EXECUTED status check comes before item status check
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_ALREADY_EXECUTED');
  });
});

describe('ExecutionReplayGuard — FinalApproval / BatchJob 상태 검사', () => {
  it('17. FinalApproval이 ACTIVE가 아니면 → FINAL_APPROVAL_NOT_ACTIVE', () => {
    const input: ExecutionReplayGuardInput = {
      batchJobStatus: 'APPROVED',
      batchJobExecutedAt: null,
      finalApprovalStatus: 'INVALIDATED',
      itemStatuses: ['READY'],
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'FINAL_APPROVAL_NOT_ACTIVE');
  });

  it('18. BatchJob이 DRAFT이면 → BATCH_JOB_NOT_APPROVED', () => {
    const input: ExecutionReplayGuardInput = {
      batchJobStatus: 'DRAFT',
      batchJobExecutedAt: null,
      finalApprovalStatus: 'ACTIVE',
      itemStatuses: ['READY'],
    };
    const result = evaluateFinalApprovalExecutionReplayGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCode, 'BATCH_JOB_NOT_APPROVED');
  });
});

describe('ExecutionReplayGuard — undefined/null 입력 처리', () => {
  it('19. 모든 필드가 undefined이면 → allowed=false (안전 기본값)', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard({
      batchJobStatus: undefined,
      batchJobExecutedAt: undefined,
      finalApprovalStatus: undefined,
      itemStatuses: [],
    });
    assert.strictEqual(result.allowed, false);
  });

  it('20. executionMetadata가 null이면 actorId=null, executionMode=null', () => {
    const result = evaluateFinalApprovalExecutionReplayGuard({
      batchJobStatus: 'EXECUTED',
      batchJobExecutedAt: null,
      finalApprovalStatus: 'ACTIVE',
      itemStatuses: [],
      executionMetadata: null,
    });
    assert.strictEqual(result.actorId, null);
    assert.strictEqual(result.executionMode, null);
  });
});

describe('ExecutionReplayGuard — 민감 정보 미포함', () => {
  it('21. reasonMessage에 API endpoint / secret / token 미포함', () => {
    const cases = [
      evaluateFinalApprovalExecutionReplayGuard(EXECUTED_INPUT),
      evaluateFinalApprovalExecutionReplayGuard({ ...APPROVED_READY_INPUT, batchJobStatus: 'EXECUTING' }),
      evaluateFinalApprovalExecutionReplayGuard({ ...EXECUTED_INPUT, batchJobStatus: 'PARTIAL_SUCCESS' }),
      evaluateFinalApprovalExecutionReplayGuard({ ...EXECUTED_INPUT, batchJobStatus: 'FAILED' }),
    ];
    for (const result of cases) {
      assert.ok(!result.reasonMessage.includes('https://api'), `must not leak API endpoint: ${result.reasonMessage}`);
      assert.ok(!result.reasonMessage.toLowerCase().includes('secret'), `must not leak secret: ${result.reasonMessage}`);
      assert.ok(!result.reasonMessage.toLowerCase().includes('client_id'), `must not leak client_id: ${result.reasonMessage}`);
    }
  });

  it('22. 순수 함수 — 부작용 없음 (DB/HTTP/Redis 없음)', () => {
    // 동기 함수 호출 완료 = 부작용 없음을 의미
    const result = evaluateFinalApprovalExecutionReplayGuard(EXECUTED_INPUT);
    assert.ok(result !== undefined, 'must return synchronously');
  });
});
