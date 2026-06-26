import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView } from './sku-keyword-final-approval-execution-architecture-approval-submission-pre-review-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-architecture-approval-submission-pre-review-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION ARCHITECTURE APPROVAL SUBMISSION PRE-REVIEW 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();
    assert.ok(view.statusLabel.includes('EXECUTION ARCHITECTURE APPROVAL SUBMISSION PRE-REVIEW'));
  });

  it('finalNotice가 Task 132 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();
    assert.ok(view.finalNotice.includes('Task 132'));
  });
});

describe('taskRangeLabel / previousExecutionArchitectureApprovalSubmissionReadinessCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();

  it('taskRangeLabel이 Task 41~131 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('131'));
  });

  it('previousExecutionArchitectureApprovalSubmissionReadinessCommit이 23b700a임', () => {
    assert.strictEqual(view.previousExecutionArchitectureApprovalSubmissionReadinessCommit, '23b700a');
  });
});

describe('approvalSubmissionPreReviewSummaryItems / approvalSubmissionPreReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();

  it('요약 항목이 4개 이상이고 preReviewState를 가짐', () => {
    assert.ok(view.approvalSubmissionPreReviewSummaryItems.length >= 4);
    for (const item of view.approvalSubmissionPreReviewSummaryItems) {
      assert.ok(item.preReviewState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('사전 검토 항목이 8개 이상이며 Token/Naver API/Worker/Queue/Adapter/DB/가격/재고/롤백/경계를 포함함', () => {
    assert.ok(view.approvalSubmissionPreReviewItems.length >= 8);
    const combined = view.approvalSubmissionPreReviewItems.map((item) => `${item.label} ${item.preReviewMeaning}`).join(' ');
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

describe('approvalSubmissionPreReviewPendingItems / approvalSubmissionPreReviewBoundaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();

  it('검토 대기 항목이 5개 이상임', () => {
    assert.ok(view.approvalSubmissionPreReviewPendingItems.length >= 5);
  });

  it('경계 제출 전 검토 항목이 4개 이상이며 DB/read-only/운영/복구 경계를 포함함', () => {
    assert.ok(view.approvalSubmissionPreReviewBoundaryItems.length >= 4);
    const combined = view.approvalSubmissionPreReviewBoundaryItems.map((item) => `${item.label} ${item.boundaryState}`).join(' ');
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('read-only'));
    assert.ok(combined.includes('운영'));
    assert.ok(combined.includes('복구'));
  });
});

describe('internalApprovalSubmissionPreReviewCheckItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();

  it('4개 이상이고 requiredCheck를 가짐', () => {
    assert.ok(view.internalApprovalSubmissionPreReviewCheckItems.length >= 4);
    for (const item of view.internalApprovalSubmissionPreReviewCheckItems) {
      assert.ok(item.requiredCheck.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('Token/API/Worker/Queue/Adapter/DB/가격/재고 점검이 반영됨', () => {
    const combined = view.internalApprovalSubmissionPreReviewCheckItems.map((item) => `${item.label} ${item.requiredCheck}`).join(' ');
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

describe('transitionStillBlockedItems / remainingApprovalSubmissionPreReviewStateItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();

  it('차단 전환 항목이 4개 이상임', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
  });

  it('유지 상태 항목이 4개 이상임', () => {
    assert.ok(view.remainingApprovalSubmissionPreReviewStateItems.length >= 4);
    for (const item of view.remainingApprovalSubmissionPreReviewStateItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(item.remainingState.length > 0);
    }
  });
});

describe('nextSafeReviewItems / stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();

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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionArchitectureApprovalSubmissionReadinessCommit, v2.previousExecutionArchitectureApprovalSubmissionReadinessCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView();
    assert.notStrictEqual(v1.approvalSubmissionPreReviewSummaryItems, v2.approvalSubmissionPreReviewSummaryItems);
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
