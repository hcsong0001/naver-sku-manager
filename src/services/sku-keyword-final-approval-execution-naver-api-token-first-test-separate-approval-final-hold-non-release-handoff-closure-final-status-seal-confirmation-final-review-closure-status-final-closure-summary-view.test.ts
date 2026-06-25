import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-summary-view.service';

const SERVICE_FILE = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-summary-view.service.ts'
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

describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView — View Model 생성', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

  it('View Model이 생성됨', () => {
    assert.ok(view !== null && typeof view === 'object');
  });

  it('title이 존재함', () => {
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('statusLabel이 존재함', () => {
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 FINAL CLOSURE SUMMARY 계열 문구를 포함함', () => {
    assert.ok(view.statusLabel.includes('FINAL CLOSURE SUMMARY'));
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

  it('finalNotice가 Task 105 이후에도 별도 승인 전까지 전환 불가 내용을 포함함', () => {
    assert.ok(view.finalNotice.includes('Task 105'));
  });

  it('_input 없이도 View Model이 생성됨', () => {
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();
    assert.ok(v2 !== null && typeof v2 === 'object');
  });

  it('_input에 null을 전달해도 View Model이 생성됨', () => {
    const v3 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView(null);
    assert.ok(v3 !== null && typeof v3 === 'object');
  });
});

describe('taskRangeLabel / previousFinalSealCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

  it('taskRangeLabel이 존재함', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~104 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41') && view.taskRangeLabel.includes('104'));
  });

  it('previousFinalSealCommit이 존재함', () => {
    assert.ok(typeof view.previousFinalSealCommit === 'string' && view.previousFinalSealCommit.length > 0);
  });

  it('previousFinalSealCommit이 fbabc40 (Task 104 기준 커밋)을 가리킴', () => {
    assert.strictEqual(view.previousFinalSealCommit, 'fbabc40');
  });

  it('previousFinalSealLabel이 존재함', () => {
    assert.ok(typeof view.previousFinalSealLabel === 'string' && view.previousFinalSealLabel.length > 0);
  });
});

describe('finalClosureSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

  it('finalClosureSummaryItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalClosureSummaryItems));
  });

  it('finalClosureSummaryItems가 충분한 개수임 (4개 이상)', () => {
    assert.ok(view.finalClosureSummaryItems.length >= 4);
  });

  it('finalClosureSummaryItems 각 항목이 label/description/closureState/tone을 가짐', () => {
    for (const item of view.finalClosureSummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.closureState === 'string' && item.closureState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalClosureSummaryItems에 폐쇄 요약 의미가 포함됨', () => {
    const hasKeyword = view.finalClosureSummaryItems.some(
      (item) => item.closureState.includes('폐쇄 요약') || item.description.includes('폐쇄 요약')
    );
    assert.ok(hasKeyword);
  });
});

describe('finalClosureFlowItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

  it('finalClosureFlowItems가 배열임', () => {
    assert.ok(Array.isArray(view.finalClosureFlowItems));
  });

  it('finalClosureFlowItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.finalClosureFlowItems.length >= 3);
  });

  it('finalClosureFlowItems 각 항목이 label/description/flowState/tone을 가짐', () => {
    for (const item of view.finalClosureFlowItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.flowState === 'string' && item.flowState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalClosureFlowItems에 Task 102 참조가 포함됨', () => {
    const hasTask102 = view.finalClosureFlowItems.some(
      (item) => item.label.includes('Task 102') || item.description.includes('Task 102')
    );
    assert.ok(hasTask102);
  });

  it('finalClosureFlowItems에 Task 103 참조가 포함됨', () => {
    const hasTask103 = view.finalClosureFlowItems.some(
      (item) => item.label.includes('Task 103') || item.description.includes('Task 103')
    );
    assert.ok(hasTask103);
  });

  it('finalClosureFlowItems에 Task 104 참조가 포함됨', () => {
    const hasTask104 = view.finalClosureFlowItems.some(
      (item) => item.label.includes('Task 104') || item.description.includes('Task 104')
    );
    assert.ok(hasTask104);
  });
});

describe('nonReleaseClosureStateItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

  it('nonReleaseClosureStateItems가 배열임', () => {
    assert.ok(Array.isArray(view.nonReleaseClosureStateItems));
  });

  it('nonReleaseClosureStateItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.nonReleaseClosureStateItems.length >= 3);
  });

  it('nonReleaseClosureStateItems 각 항목이 label/description/nonReleaseState/tone=blocked를 가짐', () => {
    for (const item of view.nonReleaseClosureStateItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.nonReleaseState === 'string' && item.nonReleaseState.length > 0);
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('nonReleaseClosureStateItems가 보류 미해제 폐쇄 요약 상태를 표현함', () => {
    const hasKeyword = view.nonReleaseClosureStateItems.some(
      (item) => item.nonReleaseState.includes('미부여') || item.description.includes('보류')
    );
    assert.ok(hasKeyword);
  });
});

describe('notReleaseApprovalItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

  it('notReleaseApprovalItems가 배열임', () => {
    assert.ok(Array.isArray(view.notReleaseApprovalItems));
  });

  it('notReleaseApprovalItems가 충분한 개수임 (3개 이상)', () => {
    assert.ok(view.notReleaseApprovalItems.length >= 3);
  });

  it('notReleaseApprovalItems 각 항목이 label/description/notApprovalReason/tone을 가짐', () => {
    for (const item of view.notReleaseApprovalItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
      assert.ok(typeof item.description === 'string' && item.description.length > 0);
      assert.ok(typeof item.notApprovalReason === 'string' && item.notApprovalReason.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('notReleaseApprovalItems가 폐쇄 요약과 보류 해제 승인을 분리함', () => {
    const hasKeyword = view.notReleaseApprovalItems.some(
      (item) => item.notApprovalReason.includes('보류 해제') || item.description.includes('보류 해제')
    );
    assert.ok(hasKeyword);
  });
});

describe('transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

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

describe('requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

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
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

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
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();

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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousFinalSealCommit, v2.previousFinalSealCommit);
    assert.strictEqual(v1.finalClosureSummaryItems.length, v2.finalClosureSummaryItems.length);
  });

  it('입력값에 관계없이 동일한 View Model을 반환함 (참조 격리)', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView({ foo: 'bar' });
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView({ foo: 'baz' });
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
  });

  it('DB/API/HTTP 호출이 없음 (서비스 파일 소스 확인)', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.'));
    assert.ok(!src.includes('PrismaClient'));
  });

  it('반환된 finalClosureSummaryItems가 배열 참조로 분리됨 (불변 구조)', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();
    assert.notStrictEqual(v1.finalClosureSummaryItems, v2.finalClosureSummaryItems);
  });

  it('반환된 stillForbiddenItems가 배열 참조로 분리됨', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView();
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
