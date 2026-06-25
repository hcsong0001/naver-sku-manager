import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-lock-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-lock-view.service.ts',
  import.meta.url
).pathname.replace(/^\/([A-Z]:)/, '$1');

const FORBIDDEN_PATTERNS = [
  'fetch',
  'axios',
  'Authorization',
  'Bearer',
  'http://',
  'https://',
  '.create(',
  '.update(',
  '.delete(',
  'onSubmit',
  '<form',
  'execute(',
];

describe('service file — forbidden patterns', () => {
  const src = readFileSync(SERVICE_FILE, 'utf8');

  for (const pattern of FORBIDDEN_PATTERNS) {
    it(`should not contain "${pattern}"`, () => {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: ${pattern}`);
    });
  }
});

describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView — View Model 생성', () => {
  it('View Model이 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('title이 존재함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('statusLabel이 존재함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 FINAL NON-RELEASE LOCK 계열 문구를 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(view.statusLabel.includes('NON-RELEASE LOCK'));
  });

  it('statusTone이 허용된 값임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(view.statusTone));
  });

  it('summary가 존재함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(typeof view.summary === 'string' && view.summary.length > 0);
  });

  it('finalNotice가 존재함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(typeof view.finalNotice === 'string' && view.finalNotice.length > 0);
  });

  it('finalNotice가 Task 114 이후에도 별도 승인 전까지 전환 불가 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.ok(view.finalNotice.includes('Task 114'));
  });

  it('_input 없이도 View Model이 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView(undefined);
    assert.ok(view !== null);
  });

  it('_input에 null을 전달해도 View Model이 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView(null);
    assert.ok(view !== null);
  });
});

describe('taskRangeLabel / previousFinalNonReleaseSealCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('taskRangeLabel이 존재함', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~113 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('113'));
  });

  it('previousFinalNonReleaseSealCommit이 존재함', () => {
    assert.ok(typeof view.previousFinalNonReleaseSealCommit === 'string' && view.previousFinalNonReleaseSealCommit.length > 0);
  });

  it('previousFinalNonReleaseSealCommit이 4812dd1 (Task 113 기준 커밋)을 가리킴', () => {
    assert.strictEqual(view.previousFinalNonReleaseSealCommit, '4812dd1');
  });

  it('previousFinalNonReleaseSealLabel이 존재함', () => {
    assert.ok(typeof view.previousFinalNonReleaseSealLabel === 'string' && view.previousFinalNonReleaseSealLabel.length > 0);
  });
});

describe('finalLockSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('finalLockSummaryItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalLockSummaryItems));
  });

  it('finalLockSummaryItems가 충분한 개수임 (4개 이상)', () => {
    assert.ok(view.finalLockSummaryItems.length >= 4);
  });

  it('finalLockSummaryItems 각 항목이 label/description/lockState/tone을 가짐', () => {
    for (const item of view.finalLockSummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.lockState === 'string' && item.lockState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalLockSummaryItems에 잠금 유지 의미가 포함됨', () => {
    const hasLock = view.finalLockSummaryItems.some(
      (item) => item.lockState.includes('잠금') || item.description.includes('잠금')
    );
    assert.ok(hasLock);
  });
});

describe('nonReleaseSealLockItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('nonReleaseSealLockItems가 배열임', () => {
    assert.ok(Array.isArray(view.nonReleaseSealLockItems));
  });

  it('nonReleaseSealLockItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.nonReleaseSealLockItems.length >= 3);
  });

  it('nonReleaseSealLockItems 각 항목이 label/description/lockedState/tone=blocked를 가짐', () => {
    for (const item of view.nonReleaseSealLockItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.lockedState === 'string' && item.lockedState.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('nonReleaseSealLockItems가 봉인 이후 잠금 유지를 표현함', () => {
    const hasSealLock = view.nonReleaseSealLockItems.some(
      (item) => item.lockedState.includes('잠금') || item.description.includes('봉인')
    );
    assert.ok(hasSealLock);
  });
});

describe('lockEnforcementItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('lockEnforcementItems가 배열임', () => {
    assert.ok(Array.isArray(view.lockEnforcementItems));
  });

  it('lockEnforcementItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.lockEnforcementItems.length >= 3);
  });

  it('lockEnforcementItems 각 항목이 label/description/enforcedMeaning/tone을 가짐', () => {
    for (const item of view.lockEnforcementItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.enforcedMeaning === 'string' && item.enforcedMeaning.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('lockEnforcementItems가 UI 레벨 잠금 시행을 표현함', () => {
    const hasEnforce = view.lockEnforcementItems.some(
      (item) => item.enforcedMeaning.includes('잠금 시행') || item.description.includes('버튼')
    );
    assert.ok(hasEnforce);
  });
});

describe('releaseStillNotGrantedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('releaseStillNotGrantedItems가 배열임', () => {
    assert.ok(Array.isArray(view.releaseStillNotGrantedItems));
  });

  it('releaseStillNotGrantedItems가 충분한 개수임 (4개 이상)', () => {
    assert.ok(view.releaseStillNotGrantedItems.length >= 4);
  });

  it('releaseStillNotGrantedItems 각 항목이 label/description/notGrantedReason/tone=blocked를 가짐', () => {
    for (const item of view.releaseStillNotGrantedItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.notGrantedReason === 'string' && item.notGrantedReason.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('releaseStillNotGrantedItems가 해제/제출/실행/token 발급 허용 미부여를 표현함', () => {
    const hasKeyword = view.releaseStillNotGrantedItems.some(
      (item) => item.notGrantedReason.includes('미부여') || item.description.includes('미부여')
    );
    assert.ok(hasKeyword);
  });

  it('releaseStillNotGrantedItems에 token 발급 미부여 항목이 포함됨', () => {
    const hasToken = view.releaseStillNotGrantedItems.some(
      (item) => item.label.includes('Token') || item.notGrantedReason.includes('Token')
    );
    assert.ok(hasToken);
  });
});
describe('transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('transitionStillBlockedItems가 배열임', () => {
    assert.ok(Array.isArray(view.transitionStillBlockedItems));
  });

  it('transitionStillBlockedItems가 충분한 개수임 (4개 이상)', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
  });

  it('transitionStillBlockedItems 각 항목이 label/description/blockedState/tone=blocked를 가짐', () => {
    for (const item of view.transitionStillBlockedItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.blockedState === 'string' && item.blockedState.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('transitionStillBlockedItems에 token 발급 차단 항목이 포함됨', () => {
    const hasToken = view.transitionStillBlockedItems.some(
      (item) => item.label.includes('token') || item.blockedState.includes('Token')
    );
    assert.ok(hasToken);
  });

  it('transitionStillBlockedItems에 보류 해제 차단 항목이 포함됨', () => {
    const hasRelease = view.transitionStillBlockedItems.some(
      (item) => item.label.includes('보류 해제') || item.blockedState.includes('보류 해제')
    );
    assert.ok(hasRelease);
  });
});

describe('remainingNonReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('remainingNonReleaseItems가 배열임', () => {
    assert.ok(Array.isArray(view.remainingNonReleaseItems));
  });

  it('remainingNonReleaseItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.remainingNonReleaseItems.length >= 3);
  });

  it('remainingNonReleaseItems 각 항목이 label/description/remainingState/tone=blocked를 가짐', () => {
    for (const item of view.remainingNonReleaseItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.remainingState === 'string' && item.remainingState.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('remainingNonReleaseItems가 보류 미해제 잠금 상태를 표현함', () => {
    const hasKeyword = view.remainingNonReleaseItems.some(
      (item) => item.remainingState.includes('잠금') || item.description.includes('보류')
    );
    assert.ok(hasKeyword);
  });
});

describe('requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('requiredBeforeAnyFutureTransitionItems가 배열임', () => {
    assert.ok(Array.isArray(view.requiredBeforeAnyFutureTransitionItems));
  });

  it('requiredBeforeAnyFutureTransitionItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.requiredBeforeAnyFutureTransitionItems.length >= 3);
  });

  it('requiredBeforeAnyFutureTransitionItems 각 항목이 label/description/requiredEvidence/tone을 가짐', () => {
    for (const item of view.requiredBeforeAnyFutureTransitionItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('requiredBeforeAnyFutureTransitionItems가 별도 승인 완료 증거를 요구함', () => {
    const hasKeyword = view.requiredBeforeAnyFutureTransitionItems.some(
      (item) => item.requiredEvidence.includes('승인') || item.description.includes('승인')
    );
    assert.ok(hasKeyword);
  });
});

describe('nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('nextSafeReviewItems가 배열임', () => {
    assert.ok(Array.isArray(view.nextSafeReviewItems));
  });

  it('nextSafeReviewItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.nextSafeReviewItems.length >= 3);
  });

  it('nextSafeReviewItems 각 항목이 label/description/nextOwner/tone을 가짐', () => {
    for (const item of view.nextSafeReviewItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('nextSafeReviewItems nextOwner가 사람을 포함함', () => {
    const hasHuman = view.nextSafeReviewItems.some(
      (item) => item.nextOwner.includes('사람') || item.nextOwner.includes('담당자') || item.nextOwner.includes('책임자')
    );
    assert.ok(hasHuman);
  });

  it('nextSafeReviewItems가 별도 승인 절차 개시를 포함함', () => {
    const hasApproval = view.nextSafeReviewItems.some(
      (item) => item.label.includes('승인') || item.description.includes('승인')
    );
    assert.ok(hasApproval);
  });
});

describe('stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();

  it('stillForbiddenItems가 배열임', () => {
    assert.ok(Array.isArray(view.stillForbiddenItems));
  });

  it('stillForbiddenItems가 충분한 개수임 (7개 이상)', () => {
    assert.ok(view.stillForbiddenItems.length >= 7);
  });

  it('stillForbiddenItems 각 항목이 label/description/tone=blocked를 가짐', () => {
    for (const item of view.stillForbiddenItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('stillForbiddenItems에 외부 API 호출 금지 항목이 포함됨', () => {
    const hasApi = view.stillForbiddenItems.some(
      (item) => item.label.includes('API') || item.description.includes('API')
    );
    assert.ok(hasApi);
  });

  it('stillForbiddenItems에 token 발급 금지 항목이 포함됨', () => {
    const hasToken = view.stillForbiddenItems.some(
      (item) => item.label.includes('token') || item.description.includes('token')
    );
    assert.ok(hasToken);
  });

  it('stillForbiddenItems에 운영 DB write 금지 항목이 포함됨', () => {
    const hasDb = view.stillForbiddenItems.some(
      (item) => item.description.includes('DB') || item.description.includes('mutation')
    );
    assert.ok(hasDb);
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조를 반환함', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousFinalNonReleaseSealCommit, v2.previousFinalNonReleaseSealCommit);
    assert.strictEqual(v1.finalLockSummaryItems.length, v2.finalLockSummaryItems.length);
  });

  it('입력값에 관계없이 동일한 View Model을 반환함', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView({ foo: 'bar' });
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView({ foo: 'baz' });
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
  });

  it('DB/API/HTTP 호출이 없음 (서비스 파일 소스 확인)', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.'));
    assert.ok(!src.includes('PrismaClient'));
  });

  it('반환된 finalLockSummaryItems가 배열 참조로 분리됨', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.notStrictEqual(v1.finalLockSummaryItems, v2.finalLockSummaryItems);
  });

  it('반환된 stillForbiddenItems가 배열 참조로 분리됨', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView();
    assert.notStrictEqual(v1.stillForbiddenItems, v2.stillForbiddenItems);
  });
});

describe('금지 패턴 통합 검사', () => {
  it('서비스 파일에 금지 패턴이 하나도 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    const found = FORBIDDEN_PATTERNS.filter((p) => src.includes(p));
    assert.deepStrictEqual(found, [], `금지 패턴 발견: ${found.join(', ')}`);
  });
});