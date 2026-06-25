import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-seal-view.service';

const SERVICE_FILE = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-seal-view.service.ts'
);

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
      assert.ok(!src.includes(pattern), `금지 문자열 발견: "${pattern}"`);
    });
  }
});

describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView — View Model 생성', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

  it('View Model이 생성됨', () => {
    assert.ok(view !== null && typeof view === 'object');
  });

  it('title이 존재함', () => {
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('statusLabel이 존재함', () => {
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 FINAL NON-RELEASE SEAL 계열 문구를 포함함', () => {
    assert.ok(view.statusLabel.includes('NON-RELEASE SEAL'));
  });

  it('statusTone이 허용된 값임', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(view.statusTone));
  });

  it('summary가 존재함', () => {
    assert.ok(typeof view.summary === 'string' && view.summary.length > 0);
  });

  it('finalNotice가 존재함', () => {
    assert.ok(typeof view.finalNotice === 'string' && view.finalNotice.length > 0);
  });

  it('finalNotice가 Task 113 이후에도 별도 승인 전까지 전환 불가 내용을 포함함', () => {
    assert.ok(view.finalNotice.includes('Task 113'));
  });

  it('_input 없이도 View Model이 생성됨', () => {
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();
    assert.ok(v2 !== null && typeof v2 === 'object');
  });

  it('_input에 null을 전달해도 View Model이 생성됨', () => {
    const v3 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView(null);
    assert.ok(v3 !== null && typeof v3 === 'object');
  });
});

describe('taskRangeLabel / previousFinalBoundaryCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

  it('taskRangeLabel이 존재함', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~112 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41') && view.taskRangeLabel.includes('112'));
  });

  it('previousFinalBoundaryCommit이 존재함', () => {
    assert.ok(typeof view.previousFinalBoundaryCommit === 'string' && view.previousFinalBoundaryCommit.length > 0);
  });

  it('previousFinalBoundaryCommit이 63904aa (Task 112 기준 커밋)을 가리킴', () => {
    assert.strictEqual(view.previousFinalBoundaryCommit, '63904aa');
  });

  it('previousFinalBoundaryLabel이 존재함', () => {
    assert.ok(typeof view.previousFinalBoundaryLabel === 'string' && view.previousFinalBoundaryLabel.length > 0);
  });
});
describe('finalSealSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

  it('finalSealSummaryItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalSealSummaryItems));
  });

  it('finalSealSummaryItems가 충분한 개수임 (4개 이상)', () => {
    assert.ok(view.finalSealSummaryItems.length >= 4);
  });

  it('finalSealSummaryItems 각 항목이 label/description/sealState/tone을 가짐', () => {
    for (const item of view.finalSealSummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.sealState === 'string' && item.sealState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalSealSummaryItems에 최종 경계 이후 봉인 의미가 포함됨', () => {
    const hasKeyword = view.finalSealSummaryItems.some(
      (item) => item.sealState.includes('봉인') || item.description.includes('봉인')
    );
    assert.ok(hasKeyword);
  });
});

describe('finalBoundaryNonReleaseSealItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

  it('finalBoundaryNonReleaseSealItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalBoundaryNonReleaseSealItems));
  });

  it('finalBoundaryNonReleaseSealItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.finalBoundaryNonReleaseSealItems.length >= 3);
  });

  it('finalBoundaryNonReleaseSealItems 각 항목이 label/description/sealedState/tone=blocked를 가짐', () => {
    for (const item of view.finalBoundaryNonReleaseSealItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.sealedState === 'string' && item.sealedState.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('finalBoundaryNonReleaseSealItems가 최종 경계 이후에도 보류 해제가 발생하지 않았음을 표현함', () => {
    const hasKeyword = view.finalBoundaryNonReleaseSealItems.some(
      (item) => item.sealedState.includes('봉인') || item.description.includes('보류 해제')
    );
    assert.ok(hasKeyword);
  });
});

describe('boundaryAftermathItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

  it('boundaryAftermathItems가 배열임', () => {
    assert.ok(Array.isArray(view.boundaryAftermathItems));
  });

  it('boundaryAftermathItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.boundaryAftermathItems.length >= 3);
  });

  it('boundaryAftermathItems 각 항목이 label/description/currentMeaning/tone을 가짐', () => {
    for (const item of view.boundaryAftermathItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.currentMeaning === 'string' && item.currentMeaning.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('boundaryAftermathItems가 경계 확인 이후에도 상태 변화 없음을 표현함', () => {
    const hasKeyword = view.boundaryAftermathItems.some(
      (item) => item.currentMeaning.includes('변화 없음') || item.description.includes('변화')
    );
    assert.ok(hasKeyword);
  });
});

describe('releaseStillNotGrantedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

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

  it('releaseStillNotGrantedItems가 해제 승인/제출/실행/token 발급 허용 미부여를 표현함', () => {
    const hasKeyword = view.releaseStillNotGrantedItems.some(
      (item) => item.notGrantedReason.includes('미부여') || item.description.includes('미부여')
    );
    assert.ok(hasKeyword);
  });

  it('releaseStillNotGrantedItems에 token 발급 미부여 항목이 포함됨', () => {
    const hasToken = view.releaseStillNotGrantedItems.some(
      (item) => item.label.includes('token') || item.notGrantedReason.includes('token')
    );
    assert.ok(hasToken);
  });
});
describe('transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

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
      (item) => item.label.includes('token') || item.blockedState.includes('token')
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
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

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

  it('remainingNonReleaseItems가 보류 미해제 상태를 표현함', () => {
    const hasKeyword = view.remainingNonReleaseItems.some(
      (item) => item.remainingState.includes('미부여') || item.description.includes('보류')
    );
    assert.ok(hasKeyword);
  });
});

describe('requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

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

  it('requiredBeforeAnyFutureTransitionItems가 향후 전환 전 필요한 별도 증거를 표현함', () => {
    const hasKeyword = view.requiredBeforeAnyFutureTransitionItems.some(
      (item) => item.requiredEvidence.includes('승인') || item.description.includes('승인')
    );
    assert.ok(hasKeyword);
  });
});

describe('nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

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

  it('nextSafeReviewItems가 다음 안전 검토 단계를 표현함', () => {
    const hasKeyword = view.nextSafeReviewItems.some(
      (item) => item.label.includes('승인') || item.label.includes('검토') || item.description.includes('승인')
    );
    assert.ok(hasKeyword);
  });

  it('nextSafeReviewItems nextOwner가 사람을 포함함', () => {
    const hasHuman = view.nextSafeReviewItems.some(
      (item) => item.nextOwner.includes('사람') || item.nextOwner.includes('담당자') || item.nextOwner.includes('책임자')
    );
    assert.ok(hasHuman);
  });
});

describe('stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();

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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousFinalBoundaryCommit, v2.previousFinalBoundaryCommit);
    assert.strictEqual(v1.finalSealSummaryItems.length, v2.finalSealSummaryItems.length);
  });

  it('입력값에 관계없이 동일한 View Model을 반환함', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView({ foo: 'bar' });
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView({ foo: 'baz' });
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
  });

  it('DB/API/HTTP 호출이 없음 (서비스 파일 소스 확인)', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.'));
    assert.ok(!src.includes('PrismaClient'));
  });

  it('반환된 finalSealSummaryItems가 배열 참조로 분리됨', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();
    assert.notStrictEqual(v1.finalSealSummaryItems, v2.finalSealSummaryItems);
  });

  it('반환된 stillForbiddenItems가 배열 참조로 분리됨', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView();
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