import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-boundary-view.service';

const SERVICE_FILE = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-boundary-view.service.ts'
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

describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView — View Model 생성', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

  it('View Model이 생성됨', () => {
    assert.ok(view !== null && typeof view === 'object');
  });

  it('title이 존재함', () => {
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('statusLabel이 존재함', () => {
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 FINAL BOUNDARY 계열 문구를 포함함', () => {
    assert.ok(view.statusLabel.includes('FINAL BOUNDARY'));
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

  it('finalNotice가 Task 103 이후에도 별도 승인 전까지 전환 불가 내용을 포함함', () => {
    assert.ok(view.finalNotice.includes('Task 103'));
  });

  it('_input 없이도 View Model이 생성됨', () => {
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();
    assert.ok(v2 !== null && typeof v2 === 'object');
  });

  it('_input에 null을 전달해도 View Model이 생성됨', () => {
    const v3 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView(null);
    assert.ok(v3 !== null && typeof v3 === 'object');
  });
});

describe('taskRangeLabel / previousFinalSummaryCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

  it('taskRangeLabel이 존재함', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~102 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41') && view.taskRangeLabel.includes('102'));
  });

  it('previousFinalSummaryCommit이 존재함', () => {
    assert.ok(typeof view.previousFinalSummaryCommit === 'string' && view.previousFinalSummaryCommit.length > 0);
  });

  it('previousFinalSummaryCommit이 27a2ba6 (Task 102 기준 커밋)을 가리킴', () => {
    assert.strictEqual(view.previousFinalSummaryCommit, '27a2ba6');
  });

  it('previousFinalSummaryLabel이 존재함', () => {
    assert.ok(typeof view.previousFinalSummaryLabel === 'string' && view.previousFinalSummaryLabel.length > 0);
  });
});

describe('finalBoundarySummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

  it('finalBoundarySummaryItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalBoundarySummaryItems));
  });

  it('finalBoundarySummaryItems가 충분한 개수임 (5개 이상)', () => {
    assert.ok(view.finalBoundarySummaryItems.length >= 5);
  });

  it('finalBoundarySummaryItems 각 항목이 label/description/boundaryState/tone을 가짐', () => {
    for (const item of view.finalBoundarySummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.boundaryState === 'string' && item.boundaryState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalBoundarySummaryItems에 최종 경계 표시 의미가 포함됨', () => {
    const hasKeyword = view.finalBoundarySummaryItems.some(
      (item) => item.boundaryState.includes('경계') || item.description.includes('경계')
    );
    assert.ok(hasKeyword);
  });
});

describe('finalSummaryIsNotReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

  it('finalSummaryIsNotReleaseItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalSummaryIsNotReleaseItems));
  });

  it('finalSummaryIsNotReleaseItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.finalSummaryIsNotReleaseItems.length >= 3);
  });

  it('finalSummaryIsNotReleaseItems 각 항목이 label/description/notReleaseReason/tone을 가짐', () => {
    for (const item of view.finalSummaryIsNotReleaseItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.notReleaseReason === 'string' && item.notReleaseReason.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalSummaryIsNotReleaseItems가 최종 요약이 보류 해제가 아님을 표현함', () => {
    const hasKeyword = view.finalSummaryIsNotReleaseItems.some(
      (item) => item.notReleaseReason.includes('보류 해제') || item.description.includes('보류 해제')
    );
    assert.ok(hasKeyword);
  });

  it('finalSummaryIsNotReleaseItems에 blocked tone 항목이 존재함', () => {
    const hasBlocked = view.finalSummaryIsNotReleaseItems.some((item) => item.tone === 'blocked');
    assert.ok(hasBlocked);
  });
});

describe('finalSummaryReviewNotApprovalItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

  it('finalSummaryReviewNotApprovalItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalSummaryReviewNotApprovalItems));
  });

  it('finalSummaryReviewNotApprovalItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.finalSummaryReviewNotApprovalItems.length >= 3);
  });

  it('finalSummaryReviewNotApprovalItems 각 항목이 label/description/correctInterpretation/tone을 가짐', () => {
    for (const item of view.finalSummaryReviewNotApprovalItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.correctInterpretation === 'string' && item.correctInterpretation.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalSummaryReviewNotApprovalItems가 최종 요약 확인과 승인 부여를 분리함', () => {
    const hasKeyword = view.finalSummaryReviewNotApprovalItems.some(
      (item) => item.correctInterpretation.includes('승인') || item.description.includes('승인')
    );
    assert.ok(hasKeyword);
  });
});

describe('blockedTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

  it('blockedTransitionItems가 배열임', () => {
    assert.ok(Array.isArray(view.blockedTransitionItems));
  });

  it('blockedTransitionItems가 충분한 개수임 (4개 이상)', () => {
    assert.ok(view.blockedTransitionItems.length >= 4);
  });

  it('blockedTransitionItems 각 항목이 label/description/blockedState/tone=blocked를 가짐', () => {
    for (const item of view.blockedTransitionItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.blockedState === 'string' && item.blockedState.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('blockedTransitionItems에 token 발급 차단 항목이 포함됨', () => {
    const hasToken = view.blockedTransitionItems.some(
      (item) => item.label.includes('token') || item.blockedState.includes('token')
    );
    assert.ok(hasToken);
  });

  it('blockedTransitionItems에 보류 해제 차단 항목이 포함됨', () => {
    const hasRelease = view.blockedTransitionItems.some(
      (item) => item.label.includes('보류 해제') || item.blockedState.includes('보류 해제')
    );
    assert.ok(hasRelease);
  });
});

describe('remainingNonReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

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
      (item) => item.remainingState.includes('보류') || item.description.includes('보류')
    );
    assert.ok(hasKeyword);
  });
});

describe('requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

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
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

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

  it('nextSafeReviewItems nextOwner가 사람(사람, 담당자, 책임자, 검토자, 승인 권한자 등)을 포함함', () => {
    const hasHuman = view.nextSafeReviewItems.some(
      (item) => item.nextOwner.includes('사람') || item.nextOwner.includes('담당자') || item.nextOwner.includes('책임자')
    );
    assert.ok(hasHuman);
  });
});

describe('stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();

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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousFinalSummaryCommit, v2.previousFinalSummaryCommit);
    assert.strictEqual(v1.finalBoundarySummaryItems.length, v2.finalBoundarySummaryItems.length);
  });

  it('입력값에 관계없이 동일한 View Model을 반환함 (참조 격리)', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView({ foo: 'bar' });
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView({ foo: 'baz' });
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
  });

  it('DB/API/HTTP 호출이 없음 (서비스 파일 소스 확인)', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.'));
    assert.ok(!src.includes('PrismaClient'));
  });

  it('반환된 finalBoundarySummaryItems가 배열 참조로 분리됨 (불변 구조)', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();
    assert.notStrictEqual(v1.finalBoundarySummaryItems, v2.finalBoundarySummaryItems);
  });

  it('반환된 stillForbiddenItems가 배열 참조로 분리됨', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView();
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
