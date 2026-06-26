import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView } from './sku-keyword-final-approval-execution-architecture-approval-submission-readiness-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-architecture-approval-submission-readiness-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION ARCHITECTURE APPROVAL SUBMISSION READINESS 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();
    assert.ok(view.statusLabel.includes('EXECUTION ARCHITECTURE APPROVAL SUBMISSION READINESS'));
  });

  it('finalNotice가 Task 131 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();
    assert.ok(view.finalNotice.includes('Task 131'));
  });
});

describe('taskRangeLabel / previousExecutionArchitectureApprovalHoldCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();

  it('taskRangeLabel이 Task 41~130 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('130'));
  });

  it('previousExecutionArchitectureApprovalHoldCommit이 1fb4f45임', () => {
    assert.strictEqual(view.previousExecutionArchitectureApprovalHoldCommit, '1fb4f45');
  });
});

describe('approvalSubmissionReadinessSummaryItems / approvalSubmissionReadinessItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();

  it('요약 항목이 4개 이상이고 readinessState를 가짐', () => {
    assert.ok(view.approvalSubmissionReadinessSummaryItems.length >= 4);
    for (const item of view.approvalSubmissionReadinessSummaryItems) {
      assert.ok(item.readinessState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('준비 항목이 8개 이상이며 Token/Naver API/Worker/Queue/Adapter/DB/가격/재고/롤백/경계를 포함함', () => {
    assert.ok(view.approvalSubmissionReadinessItems.length >= 8);
    const combined = view.approvalSubmissionReadinessItems.map((item) => `${item.label} ${item.readinessMeaning}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('Naver API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
    assert.ok(combined.includes('롤백'));
    assert.ok(combined.includes('경계'));
  });
});

describe('approvalSubmissionPendingItems / approvalSubmissionBoundaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();

  it('제출 준비 대기 항목이 5개 이상임', () => {
    assert.ok(view.approvalSubmissionPendingItems.length >= 5);
  });

  it('경계 제출 전 확인 항목이 4개 이상이며 DB/read-only/운영/복구 경계를 포함함', () => {
    assert.ok(view.approvalSubmissionBoundaryItems.length >= 4);
    const combined = view.approvalSubmissionBoundaryItems.map((item) => `${item.label} ${item.boundaryState}`).join(' ');
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('read-only'));
    assert.ok(combined.includes('운영'));
    assert.ok(combined.includes('복구'));
  });
});

describe('internalApprovalSubmissionCheckItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();

  it('4개 이상이고 requiredCheck를 가짐', () => {
    assert.ok(view.internalApprovalSubmissionCheckItems.length >= 4);
    for (const item of view.internalApprovalSubmissionCheckItems) {
      assert.ok(item.requiredCheck.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('Token/API/Worker/Queue/Adapter/DB/가격/재고 점검이 반영됨', () => {
    const combined = view.internalApprovalSubmissionCheckItems.map((item) => `${item.label} ${item.requiredCheck}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
  });
});

describe('transitionStillBlockedItems / remainingApprovalSubmissionStateItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();

  it('차단 전환 항목이 4개 이상임', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
  });

  it('유지 상태 항목이 4개 이상임', () => {
    assert.ok(view.remainingApprovalSubmissionStateItems.length >= 4);
    for (const item of view.remainingApprovalSubmissionStateItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.remainingState.length > 0);
    }
  });
});

describe('nextSafeReviewItems / stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();

  it('다음 검토 항목이 3개 이상임', () => {
    assert.ok(view.nextSafeReviewItems.length >= 3);
    for (const item of view.nextSafeReviewItems) {
      assert.ok(item.nextOwner.length > 0);
    }
  });

  it('금지 항목이 8개 이상이며 token/API/Worker/Queue/DB/가격/재고가 포함됨', () => {
    assert.ok(view.stillForbiddenItems.length >= 8);
    const combined = view.stillForbiddenItems.map((item) => `${item.label} ${item.description}`).join(' ');
    assert.ok(combined.includes('token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionArchitectureApprovalHoldCommit, v2.previousExecutionArchitectureApprovalHoldCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView();
    assert.notStrictEqual(v1.approvalSubmissionReadinessSummaryItems, v2.approvalSubmissionReadinessSummaryItems);
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
