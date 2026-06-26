import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView } from './sku-keyword-final-approval-final-non-release-transition-readiness-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-final-non-release-transition-readiness-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 FINAL NON-RELEASE TRANSITION READINESS 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    assert.ok(view.statusLabel.includes('NON-RELEASE TRANSITION READINESS'));
  });

  it('statusTone이 허용된 값임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(view.statusTone));
  });

  it('finalNotice가 Task 121 이후 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    assert.ok(view.finalNotice.includes('Task 121'));
  });

  it('null 입력에도 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView(null);
    assert.ok(view !== null);
  });
});

describe('taskRangeLabel / previousFinalNonReleaseReleaseGuardCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('taskRangeLabel이 Task 41~120 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('120'));
  });

  it('previousFinalNonReleaseReleaseGuardCommit이 eac9ee8임', () => {
    assert.strictEqual(view.previousFinalNonReleaseReleaseGuardCommit, 'eac9ee8');
  });

  it('previousFinalNonReleaseReleaseGuardLabel이 존재함', () => {
    assert.ok(typeof view.previousFinalNonReleaseReleaseGuardLabel === 'string' && view.previousFinalNonReleaseReleaseGuardLabel.length > 0);
  });
});

describe('finalTransitionReadinessSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('배열임', () => { assert.ok(Array.isArray(view.finalTransitionReadinessSummaryItems)); });
  it('4개 이상', () => { assert.ok(view.finalTransitionReadinessSummaryItems.length >= 4); });

  it('각 항목이 readinessState/tone을 가짐', () => {
    for (const item of view.finalTransitionReadinessSummaryItems) {
      assert.ok(typeof item.readinessState === 'string' && item.readinessState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('전환 전 확인 의미가 포함됨', () => {
    assert.ok(view.finalTransitionReadinessSummaryItems.some((item) => item.readinessState.includes('확인 상태')));
  });
});

describe('stageTransitionReadinessItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('배열임', () => { assert.ok(Array.isArray(view.stageTransitionReadinessItems)); });
  it('9개 이상', () => { assert.ok(view.stageTransitionReadinessItems.length >= 9); });

  it('각 항목이 confirmedMeaning/tone=blocked를 가짐', () => {
    for (const item of view.stageTransitionReadinessItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(typeof item.confirmedMeaning === 'string' && item.confirmedMeaning.length > 0);
    }
  });

  it('Boundary/Seal/Lock/Verification/Audit/Evidence/Certification/Final Confirmation/Release Guard 단계가 포함됨', () => {
    const combined = view.stageTransitionReadinessItems.map((item) => `${item.label} ${item.confirmedMeaning}`).join(' ');
    assert.ok(combined.includes('Boundary'));
    assert.ok(combined.includes('Seal'));
    assert.ok(combined.includes('Lock'));
    assert.ok(combined.includes('Verification'));
    assert.ok(combined.includes('Audit'));
    assert.ok(combined.includes('Evidence'));
    assert.ok(combined.includes('Certification'));
    assert.ok(combined.includes('Final Confirmation'));
    assert.ok(combined.includes('Release Guard'));
  });
});

describe('transitionReadinessClassificationItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('배열임', () => { assert.ok(Array.isArray(view.transitionReadinessClassificationItems)); });
  it('3개 이상', () => { assert.ok(view.transitionReadinessClassificationItems.length >= 3); });

  it('각 항목이 classificationMeaning을 가짐', () => {
    for (const item of view.transitionReadinessClassificationItems) {
      assert.ok(typeof item.classificationMeaning === 'string' && item.classificationMeaning.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('분류가 전환 전 확인 상태를 표현함', () => {
    assert.ok(view.transitionReadinessClassificationItems.some((item) => item.classificationMeaning.includes('전환 전 확인 상태')));
  });
});

describe('releaseStillNotGrantedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('4개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.releaseStillNotGrantedItems.length >= 4);
    for (const item of view.releaseStillNotGrantedItems) { assert.strictEqual(item.tone, 'blocked'); }
  });

  it('Token 미부여 항목 포함', () => {
    assert.ok(view.releaseStillNotGrantedItems.some((item) => item.label.includes('Token')));
  });
});

describe('transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('4개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
    for (const item of view.transitionStillBlockedItems) { assert.strictEqual(item.tone, 'blocked'); }
  });

  it('보류 해제 차단 항목 포함', () => {
    assert.ok(view.transitionStillBlockedItems.some((item) => item.blockedState.includes('보류 해제')));
  });

  it('Token 발급 차단 항목 포함', () => {
    assert.ok(view.transitionStillBlockedItems.some((item) => item.blockedState.includes('Token')));
  });
});

describe('remainingPreTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('3개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.remainingPreTransitionItems.length >= 3);
    for (const item of view.remainingPreTransitionItems) { assert.strictEqual(item.tone, 'blocked'); }
  });
});

describe('requiredBeforeAnyActualExecutionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('3개 이상이고 각 항목이 requiredEvidence를 가짐', () => {
    assert.ok(view.requiredBeforeAnyActualExecutionItems.length >= 3);
    for (const item of view.requiredBeforeAnyActualExecutionItems) {
      assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
    }
  });

  it('승인 관련 증거 항목 포함', () => {
    assert.ok(view.requiredBeforeAnyActualExecutionItems.some((item) => item.requiredEvidence.includes('승인')));
  });
});

describe('nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('3개 이상이고 각 항목이 nextOwner를 가짐', () => {
    assert.ok(view.nextSafeReviewItems.length >= 3);
    for (const item of view.nextSafeReviewItems) {
      assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('사람 관련 nextOwner 항목 포함', () => {
    assert.ok(view.nextSafeReviewItems.some(
      (item) => item.nextOwner.includes('사람') || item.nextOwner.includes('담당자') || item.nextOwner.includes('책임자')
    ));
  });
});

describe('stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();

  it('7개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.stillForbiddenItems.length >= 7);
    for (const item of view.stillForbiddenItems) { assert.strictEqual(item.tone, 'blocked'); }
  });

  it('API/token/DB 금지 항목 포함', () => {
    assert.ok(view.stillForbiddenItems.some((item) => item.label.includes('API')));
    assert.ok(view.stillForbiddenItems.some((item) => item.label.includes('token')));
    assert.ok(view.stillForbiddenItems.some((item) => item.description.includes('DB') || item.description.includes('mutation')));
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousFinalNonReleaseReleaseGuardCommit, v2.previousFinalNonReleaseReleaseGuardCommit);
    assert.strictEqual(v1.finalTransitionReadinessSummaryItems.length, v2.finalTransitionReadinessSummaryItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView();
    assert.notStrictEqual(v1.finalTransitionReadinessSummaryItems, v2.finalTransitionReadinessSummaryItems);
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
