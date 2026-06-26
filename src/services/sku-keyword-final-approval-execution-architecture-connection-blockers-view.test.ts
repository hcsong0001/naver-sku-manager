import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView } from './sku-keyword-final-approval-execution-architecture-connection-blockers-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-architecture-connection-blockers-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION ARCHITECTURE CONNECTION BLOCKERS 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();
    assert.ok(view.statusLabel.includes('EXECUTION ARCHITECTURE CONNECTION BLOCKERS'));
  });

  it('finalNotice가 Task 127 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();
    assert.ok(view.finalNotice.includes('Task 127'));
  });
});

describe('taskRangeLabel / previousExecutionArchitectureIsolationCheckCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();

  it('taskRangeLabel이 Task 41~126 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('126'));
  });

  it('previousExecutionArchitectureIsolationCheckCommit이 77a5055임', () => {
    assert.strictEqual(view.previousExecutionArchitectureIsolationCheckCommit, '77a5055');
  });
});

describe('connectionBlockersSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();

  it('4개 이상이고 blockerState를 가짐', () => {
    assert.ok(view.connectionBlockersSummaryItems.length >= 4);
    for (const item of view.connectionBlockersSummaryItems) {
      assert.ok(item.blockerState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('criticalConnectionBlockerItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();

  it('6개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.criticalConnectionBlockerItems.length >= 6);
    for (const item of view.criticalConnectionBlockerItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.blockerReason.length > 0);
    }
  });

  it('Naver API/Token/Worker/Queue/Adapter/DB/가격/재고 차단이 반영됨', () => {
    const combined = view.criticalConnectionBlockerItems.map((item) => `${item.label} ${item.blockerReason}`).join(' ');
    assert.ok(combined.includes('Naver API'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
  });
});

describe('approvalNotCompletedItems / executionConnectionPendingItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();

  it('승인 미완료 항목이 5개 이상임', () => {
    assert.ok(view.approvalNotCompletedItems.length >= 5);
  });

  it('실행 연결 대기 항목이 5개 이상임', () => {
    assert.ok(view.executionConnectionPendingItems.length >= 5);
    const combined = view.executionConnectionPendingItems.map((item) => `${item.label} ${item.pendingState}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
  });
});

describe('internalCheckBeforeAnyConnectionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();

  it('4개 이상이고 requiredCheck를 가짐', () => {
    assert.ok(view.internalCheckBeforeAnyConnectionItems.length >= 4);
    for (const item of view.internalCheckBeforeAnyConnectionItems) {
      assert.ok(item.requiredCheck.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('API/Token/Worker/Queue/Adapter/DB/가격/재고 점검이 반영됨', () => {
    const combined = view.internalCheckBeforeAnyConnectionItems.map((item) => `${item.label} ${item.requiredCheck}`).join(' ');
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
  });
});

describe('transitionStillBlockedItems / remainingBlockerStateItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();

  it('차단 전환 항목이 4개 이상임', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
  });

  it('유지 상태 항목이 3개 이상임', () => {
    assert.ok(view.remainingBlockerStateItems.length >= 3);
    for (const item of view.remainingBlockerStateItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.remainingState.length > 0);
    }
  });
});

describe('nextSafeReviewItems / stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();

  it('다음 검토 항목이 3개 이상임', () => {
    assert.ok(view.nextSafeReviewItems.length >= 3);
    for (const item of view.nextSafeReviewItems) {
      assert.ok(item.nextOwner.length > 0);
    }
  });

  it('금지 항목이 8개 이상이며 API/token/Worker/Queue/DB/가격/재고가 포함됨', () => {
    assert.ok(view.stillForbiddenItems.length >= 8);
    const combined = view.stillForbiddenItems.map((item) => `${item.label} ${item.description}`).join(' ');
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('token'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionArchitectureIsolationCheckCommit, v2.previousExecutionArchitectureIsolationCheckCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView();
    assert.notStrictEqual(v1.connectionBlockersSummaryItems, v2.connectionBlockersSummaryItems);
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
