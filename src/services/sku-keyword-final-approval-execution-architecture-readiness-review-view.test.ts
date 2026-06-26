import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView } from './sku-keyword-final-approval-execution-architecture-readiness-review-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-architecture-readiness-review-view.service.ts',
  import.meta.url
).pathname.replace(/^\/([A-Z]:)/, '$1');

const FORBIDDEN_PATTERNS = [
  'fetch', 'axios', 'Authorization', 'Bearer',
  'http://', 'https://', '.create(', '.update(', '.delete(',
  'onSubmit', '<form', 'execute(',
];

describe('service file — forbidden patterns', () => {
  const src = readFileSync(SERVICE_FILE, 'utf8');
  for (const pattern of FORBIDDEN_PATTERNS) {
    it(`should not contain "${pattern}"`, () => {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: ${pattern}`);
    });
  }
});

describe('View Model 생성', () => {
  it('View Model이 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION ARCHITECTURE READINESS REVIEW 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();
    assert.ok(view.statusLabel.includes('EXECUTION ARCHITECTURE READINESS REVIEW'));
  });

  it('finalNotice가 Task 125 이후 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();
    assert.ok(view.finalNotice.includes('Task 125'));
  });

  it('null 입력에도 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView(null);
    assert.ok(view !== null);
  });
});

describe('taskRangeLabel / previousExecutionPreconditionsCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('taskRangeLabel이 Task 41~124 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('124'));
  });

  it('previousExecutionPreconditionsCommit이 d0727d7임', () => {
    assert.strictEqual(view.previousExecutionPreconditionsCommit, 'd0727d7');
  });
});

describe('executionArchitectureSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('4개 이상', () => {
    assert.ok(view.executionArchitectureSummaryItems.length >= 4);
  });

  it('각 항목이 architectureState를 가짐', () => {
    for (const item of view.executionArchitectureSummaryItems) {
      assert.ok(typeof item.architectureState === 'string' && item.architectureState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('preparedExecutionArchitectureItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('5개 이상이고 architectureMeaning을 가짐', () => {
    assert.ok(view.preparedExecutionArchitectureItems.length >= 5);
    for (const item of view.preparedExecutionArchitectureItems) {
      assert.ok(typeof item.architectureMeaning === 'string' && item.architectureMeaning.length > 0);
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('화면, Adapter, Token 상태 준비 항목이 포함됨', () => {
    const combined = view.preparedExecutionArchitectureItems.map((item) => `${item.label} ${item.description} ${item.architectureMeaning}`).join(' ');
    assert.ok(combined.includes('화면'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
  });
});

describe('stillDisconnectedExecutionArchitectureItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('4개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.stillDisconnectedExecutionArchitectureItems.length >= 4);
    for (const item of view.stillDisconnectedExecutionArchitectureItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.disconnectedReason.length > 0);
    }
  });

  it('Worker/Queue/Live Adapter가 포함됨', () => {
    const combined = view.stillDisconnectedExecutionArchitectureItems.map((item) => `${item.label} ${item.disconnectedReason}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Live Adapter'));
  });
});

describe('approvalLockedArchitectureItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('5개 이상이고 잠금 사유를 가짐', () => {
    assert.ok(view.approvalLockedArchitectureItems.length >= 5);
    for (const item of view.approvalLockedArchitectureItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.lockedReason.length > 0);
    }
  });

  it('Release/Submit/Execute/Token/외부 연동 잠금이 포함됨', () => {
    const combined = view.approvalLockedArchitectureItems.map((item) => `${item.label} ${item.lockedReason}`).join(' ');
    assert.ok(combined.includes('Release'));
    assert.ok(combined.includes('Submit'));
    assert.ok(combined.includes('Execute'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('외부 연동'));
  });
});

describe('internalCheckBeforeWorkerQueueAdapterItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('4개 이상이고 requiredCheck를 가짐', () => {
    assert.ok(view.internalCheckBeforeWorkerQueueAdapterItems.length >= 4);
    for (const item of view.internalCheckBeforeWorkerQueueAdapterItems) {
      assert.ok(item.requiredCheck.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('승인, Queue, Worker, Adapter, DB 확인이 포함됨', () => {
    const combined = view.internalCheckBeforeWorkerQueueAdapterItems.map((item) => `${item.label} ${item.requiredCheck}`).join(' ');
    assert.ok(combined.includes('승인'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
  });
});

describe('transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('4개 이상이고 blockedState를 가짐', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
    for (const item of view.transitionStillBlockedItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.blockedState.length > 0);
    }
  });
});

describe('remainingArchitectureReadinessItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('3개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.remainingArchitectureReadinessItems.length >= 3);
    for (const item of view.remainingArchitectureReadinessItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.remainingState.length > 0);
    }
  });
});

describe('nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('3개 이상이고 담당자 정보가 있음', () => {
    assert.ok(view.nextSafeReviewItems.length >= 3);
    for (const item of view.nextSafeReviewItems) {
      assert.ok(item.nextOwner.length > 0);
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });
});

describe('stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();

  it('8개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.stillForbiddenItems.length >= 8);
    for (const item of view.stillForbiddenItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('Worker, Queue, token, DB 금지 항목이 포함됨', () => {
    const combined = view.stillForbiddenItems.map((item) => `${item.label} ${item.description}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('token'));
    assert.ok(combined.includes('DB'));
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionPreconditionsCommit, v2.previousExecutionPreconditionsCommit);
    assert.strictEqual(v1.preparedExecutionArchitectureItems.length, v2.preparedExecutionArchitectureItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView();
    assert.notStrictEqual(v1.executionArchitectureSummaryItems, v2.executionArchitectureSummaryItems);
    assert.notStrictEqual(v1.stillForbiddenItems, v2.stillForbiddenItems);
  });
});

describe('금지 패턴 통합 검사', () => {
  it('서비스 파일에 금지 패턴 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    const found = FORBIDDEN_PATTERNS.filter((p) => src.includes(p));
    assert.deepStrictEqual(found, [], `금지 패턴 발견: ${found.join(', ')}`);
  });
});
