import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-verification-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-verification-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('title이 존재함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('statusLabel이 FINAL NON-RELEASE VERIFICATION 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.ok(view.statusLabel.includes('NON-RELEASE VERIFICATION'));
  });

  it('statusTone이 허용된 값임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(view.statusTone));
  });

  it('summary가 존재함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.ok(typeof view.summary === 'string' && view.summary.length > 0);
  });

  it('finalNotice가 Task 115 이후 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.ok(view.finalNotice.includes('Task 115'));
  });

  it('_input 없이도 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView(undefined);
    assert.ok(view !== null);
  });

  it('null 입력에도 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView(null);
    assert.ok(view !== null);
  });
});

describe('taskRangeLabel / previousFinalNonReleaseLockCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('taskRangeLabel이 Task 41~114 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('114'));
  });

  it('previousFinalNonReleaseLockCommit이 57496bc임', () => {
    assert.strictEqual(view.previousFinalNonReleaseLockCommit, '57496bc');
  });

  it('previousFinalNonReleaseLockLabel이 존재함', () => {
    assert.ok(typeof view.previousFinalNonReleaseLockLabel === 'string' && view.previousFinalNonReleaseLockLabel.length > 0);
  });
});

describe('finalVerificationSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.finalVerificationSummaryItems)); });
  it('4개 이상', () => { assert.ok(view.finalVerificationSummaryItems.length >= 4); });

  it('각 항목이 필수 필드를 가짐', () => {
    for (const item of view.finalVerificationSummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.verificationState === 'string' && item.verificationState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('검증 완료 의미가 포함됨', () => {
    const hasVerified = view.finalVerificationSummaryItems.some(
      (item) => item.verificationState.includes('검증 완료')
    );
    assert.ok(hasVerified);
  });
});

describe('nonReleaseLockVerificationItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.nonReleaseLockVerificationItems)); });
  it('3개 이상', () => { assert.ok(view.nonReleaseLockVerificationItems.length >= 3); });

  it('각 항목이 tone=blocked임', () => {
    for (const item of view.nonReleaseLockVerificationItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(typeof item.verifiedState === 'string' && item.verifiedState.length > 0);
    }
  });

  it('Lock 이후 검증 의미가 포함됨', () => {
    const hasLock = view.nonReleaseLockVerificationItems.some(
      (item) => item.verifiedState.includes('Lock') || item.label.includes('Lock')
    );
    assert.ok(hasLock);
  });
});

describe('verificationEnforcementItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.verificationEnforcementItems)); });
  it('3개 이상', () => { assert.ok(view.verificationEnforcementItems.length >= 3); });

  it('각 항목이 enforcedMeaning/tone을 가짐', () => {
    for (const item of view.verificationEnforcementItems) {
      assert.ok(typeof item.enforcedMeaning === 'string' && item.enforcedMeaning.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('검증 시행 의미가 포함됨', () => {
    const hasEnforce = view.verificationEnforcementItems.some(
      (item) => item.enforcedMeaning.includes('검증 시행')
    );
    assert.ok(hasEnforce);
  });
});

describe('releaseStillNotGrantedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.releaseStillNotGrantedItems)); });
  it('4개 이상', () => { assert.ok(view.releaseStillNotGrantedItems.length >= 4); });

  it('모든 항목이 tone=blocked이고 notGrantedReason을 가짐', () => {
    for (const item of view.releaseStillNotGrantedItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(typeof item.notGrantedReason === 'string' && item.notGrantedReason.length > 0);
    }
  });

  it('Token 미부여 항목 포함', () => {
    const hasToken = view.releaseStillNotGrantedItems.some(
      (item) => item.label.includes('Token') || item.notGrantedReason.includes('Token')
    );
    assert.ok(hasToken);
  });
});

describe('transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.transitionStillBlockedItems)); });
  it('4개 이상', () => { assert.ok(view.transitionStillBlockedItems.length >= 4); });

  it('모든 항목이 tone=blocked이고 blockedState를 가짐', () => {
    for (const item of view.transitionStillBlockedItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(typeof item.blockedState === 'string' && item.blockedState.length > 0);
    }
  });

  it('보류 해제 차단 항목 포함', () => {
    const hasRelease = view.transitionStillBlockedItems.some(
      (item) => item.blockedState.includes('보류 해제')
    );
    assert.ok(hasRelease);
  });

  it('Token 발급 차단 항목 포함', () => {
    const hasToken = view.transitionStillBlockedItems.some(
      (item) => item.blockedState.includes('Token')
    );
    assert.ok(hasToken);
  });
});

describe('remainingNonReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.remainingNonReleaseItems)); });
  it('3개 이상', () => { assert.ok(view.remainingNonReleaseItems.length >= 3); });

  it('모든 항목이 tone=blocked이고 remainingState를 가짐', () => {
    for (const item of view.remainingNonReleaseItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(typeof item.remainingState === 'string' && item.remainingState.length > 0);
    }
  });
});

describe('requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.requiredBeforeAnyFutureTransitionItems)); });
  it('3개 이상', () => { assert.ok(view.requiredBeforeAnyFutureTransitionItems.length >= 3); });

  it('각 항목이 requiredEvidence와 유효한 tone을 가짐', () => {
    for (const item of view.requiredBeforeAnyFutureTransitionItems) {
      assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('승인 관련 증거 항목 포함', () => {
    const hasApproval = view.requiredBeforeAnyFutureTransitionItems.some(
      (item) => item.requiredEvidence.includes('승인')
    );
    assert.ok(hasApproval);
  });
});

describe('nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.nextSafeReviewItems)); });
  it('3개 이상', () => { assert.ok(view.nextSafeReviewItems.length >= 3); });

  it('각 항목이 nextOwner와 유효한 tone을 가짐', () => {
    for (const item of view.nextSafeReviewItems) {
      assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('사람 관련 nextOwner 항목 포함', () => {
    const hasHuman = view.nextSafeReviewItems.some(
      (item) => item.nextOwner.includes('사람') || item.nextOwner.includes('담당자') || item.nextOwner.includes('책임자')
    );
    assert.ok(hasHuman);
  });
});

describe('stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();

  it('배열임', () => { assert.ok(Array.isArray(view.stillForbiddenItems)); });
  it('7개 이상', () => { assert.ok(view.stillForbiddenItems.length >= 7); });

  it('모든 항목이 tone=blocked임', () => {
    for (const item of view.stillForbiddenItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('API 금지 항목 포함', () => {
    assert.ok(view.stillForbiddenItems.some((item) => item.label.includes('API')));
  });

  it('token 금지 항목 포함', () => {
    assert.ok(view.stillForbiddenItems.some((item) => item.label.includes('token')));
  });

  it('DB write 금지 항목 포함', () => {
    assert.ok(view.stillForbiddenItems.some((item) => item.description.includes('DB') || item.description.includes('mutation')));
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousFinalNonReleaseLockCommit, v2.previousFinalNonReleaseLockCommit);
    assert.strictEqual(v1.finalVerificationSummaryItems.length, v2.finalVerificationSummaryItems.length);
  });

  it('입력값 무관하게 동일', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView({ x: 1 });
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView({ x: 2 });
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('finalVerificationSummaryItems 배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    assert.notStrictEqual(v1.finalVerificationSummaryItems, v2.finalVerificationSummaryItems);
  });

  it('stillForbiddenItems 배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView();
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