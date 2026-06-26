import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView } from './sku-keyword-final-approval-execution-architecture-isolation-check-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-architecture-isolation-check-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION ARCHITECTURE ISOLATION CHECK 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();
    assert.ok(view.statusLabel.includes('EXECUTION ARCHITECTURE ISOLATION CHECK'));
  });

  it('finalNotice가 Task 126 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();
    assert.ok(view.finalNotice.includes('Task 126'));
  });
});

describe('taskRangeLabel / previousExecutionArchitectureReadinessReviewCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('taskRangeLabel이 Task 41~125 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('125'));
  });

  it('previousExecutionArchitectureReadinessReviewCommit이 4a36167임', () => {
    assert.strictEqual(view.previousExecutionArchitectureReadinessReviewCommit, '4a36167');
  });
});

describe('executionArchitectureIsolationSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('4개 이상이고 isolationState를 가짐', () => {
    assert.ok(view.executionArchitectureIsolationSummaryItems.length >= 4);
    for (const item of view.executionArchitectureIsolationSummaryItems) {
      assert.ok(item.isolationState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('stillIsolatedExecutionArchitectureItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('5개 이상이고 isolationMeaning을 가짐', () => {
    assert.ok(view.stillIsolatedExecutionArchitectureItems.length >= 5);
    for (const item of view.stillIsolatedExecutionArchitectureItems) {
      assert.ok(item.isolationMeaning.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('화면, Token, Adapter 항목이 포함됨', () => {
    const combined = view.stillIsolatedExecutionArchitectureItems.map((item) => `${item.label} ${item.description} ${item.isolationMeaning}`).join(' ');
    assert.ok(combined.includes('화면'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('Adapter'));
  });
});

describe('executionPathStillDisconnectedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('4개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.executionPathStillDisconnectedItems.length >= 4);
    for (const item of view.executionPathStillDisconnectedItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.disconnectedReason.length > 0);
    }
  });

  it('Worker/Queue/Adapter/Token이 포함됨', () => {
    const combined = view.executionPathStillDisconnectedItems.map((item) => `${item.label} ${item.disconnectedReason}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
  });
});

describe('approvalLockedIsolationItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('5개 이상이고 잠금 사유를 가짐', () => {
    assert.ok(view.approvalLockedIsolationItems.length >= 5);
    for (const item of view.approvalLockedIsolationItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.lockedReason.length > 0);
    }
  });
});

describe('internalIsolationCheckItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('4개 이상이고 requiredCheck를 가짐', () => {
    assert.ok(view.internalIsolationCheckItems.length >= 4);
    for (const item of view.internalIsolationCheckItems) {
      assert.ok(item.requiredCheck.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('Queue/Worker/Adapter/DB/POST 확인이 포함됨', () => {
    const combined = view.internalIsolationCheckItems.map((item) => `${item.label} ${item.requiredCheck}`).join(' ');
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('POST'));
  });
});

describe('transitionStillBlockedItems / remainingIsolationItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('차단 전환 항목이 4개 이상임', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
  });

  it('유지 상태 항목이 3개 이상임', () => {
    assert.ok(view.remainingIsolationItems.length >= 3);
    for (const item of view.remainingIsolationItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.remainingState.length > 0);
    }
  });
});

describe('nextSafeReviewItems / stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();

  it('다음 검토 항목이 3개 이상임', () => {
    assert.ok(view.nextSafeReviewItems.length >= 3);
    for (const item of view.nextSafeReviewItems) {
      assert.ok(item.nextOwner.length > 0);
    }
  });

  it('금지 항목이 8개 이상이며 Worker/Queue/token/DB가 포함됨', () => {
    assert.ok(view.stillForbiddenItems.length >= 8);
    const combined = view.stillForbiddenItems.map((item) => `${item.label} ${item.description}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('token'));
    assert.ok(combined.includes('DB'));
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionArchitectureReadinessReviewCommit, v2.previousExecutionArchitectureReadinessReviewCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView();
    assert.notStrictEqual(v1.executionArchitectureIsolationSummaryItems, v2.executionArchitectureIsolationSummaryItems);
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
