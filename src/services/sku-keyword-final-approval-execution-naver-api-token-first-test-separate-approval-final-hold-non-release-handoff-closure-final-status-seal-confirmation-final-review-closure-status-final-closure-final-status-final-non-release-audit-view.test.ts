import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-audit-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-audit-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 FINAL NON-RELEASE AUDIT 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    assert.ok(view.statusLabel.includes('NON-RELEASE AUDIT'));
  });

  it('statusTone이 허용된 값임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(view.statusTone));
  });

  it('finalNotice가 Task 116 이후 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    assert.ok(view.finalNotice.includes('Task 116'));
  });

  it('null 입력에도 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView(null);
    assert.ok(view !== null);
  });
});

describe('taskRangeLabel / previousFinalNonReleaseVerificationCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

  it('taskRangeLabel이 Task 41~115 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('115'));
  });

  it('previousFinalNonReleaseVerificationCommit이 d5e9f65임', () => {
    assert.strictEqual(view.previousFinalNonReleaseVerificationCommit, 'd5e9f65');
  });

  it('previousFinalNonReleaseVerificationLabel이 존재함', () => {
    assert.ok(typeof view.previousFinalNonReleaseVerificationLabel === 'string' && view.previousFinalNonReleaseVerificationLabel.length > 0);
  });
});

describe('finalAuditSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

  it('배열임', () => { assert.ok(Array.isArray(view.finalAuditSummaryItems)); });
  it('4개 이상', () => { assert.ok(view.finalAuditSummaryItems.length >= 4); });

  it('각 항목이 auditState/tone을 가짐', () => {
    for (const item of view.finalAuditSummaryItems) {
      assert.ok(typeof item.auditState === 'string' && item.auditState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('감사 결과 의미가 포함됨', () => {
    assert.ok(view.finalAuditSummaryItems.some((item) => item.auditState.includes('감사 결과')));
  });
});

describe('nonReleaseVerificationAuditItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

  it('배열임', () => { assert.ok(Array.isArray(view.nonReleaseVerificationAuditItems)); });
  it('3개 이상', () => { assert.ok(view.nonReleaseVerificationAuditItems.length >= 3); });

  it('각 항목이 auditedState/tone=blocked를 가짐', () => {
    for (const item of view.nonReleaseVerificationAuditItems) {
      assert.strictEqual(item.tone, 'blocked');
      assert.ok(typeof item.auditedState === 'string' && item.auditedState.length > 0);
    }
  });

  it('이전 단계(Lock/Seal/Boundary) 감사 항목 포함', () => {
    const hasPrev = view.nonReleaseVerificationAuditItems.some(
      (item) => item.label.includes('Lock') || item.label.includes('Seal') || item.label.includes('Boundary')
    );
    assert.ok(hasPrev);
  });
});

describe('auditEnforcementItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

  it('배열임', () => { assert.ok(Array.isArray(view.auditEnforcementItems)); });
  it('3개 이상', () => { assert.ok(view.auditEnforcementItems.length >= 3); });

  it('각 항목이 enforcedMeaning을 가짐', () => {
    for (const item of view.auditEnforcementItems) {
      assert.ok(typeof item.enforcedMeaning === 'string' && item.enforcedMeaning.length > 0);
    }
  });

  it('감사 시행 의미가 포함됨', () => {
    assert.ok(view.auditEnforcementItems.some((item) => item.enforcedMeaning.includes('감사 시행')));
  });
});

describe('releaseStillNotGrantedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

  it('4개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.releaseStillNotGrantedItems.length >= 4);
    for (const item of view.releaseStillNotGrantedItems) { assert.strictEqual(item.tone, 'blocked'); }
  });

  it('Token 미부여 항목 포함', () => {
    assert.ok(view.releaseStillNotGrantedItems.some((item) => item.label.includes('Token')));
  });
});

describe('transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

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

describe('remainingNonReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

  it('3개 이상이고 모두 tone=blocked', () => {
    assert.ok(view.remainingNonReleaseItems.length >= 3);
    for (const item of view.remainingNonReleaseItems) { assert.strictEqual(item.tone, 'blocked'); }
  });
});

describe('requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

  it('3개 이상이고 각 항목이 requiredEvidence를 가짐', () => {
    assert.ok(view.requiredBeforeAnyFutureTransitionItems.length >= 3);
    for (const item of view.requiredBeforeAnyFutureTransitionItems) {
      assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
    }
  });

  it('승인 관련 증거 항목 포함', () => {
    assert.ok(view.requiredBeforeAnyFutureTransitionItems.some((item) => item.requiredEvidence.includes('승인')));
  });
});

describe('nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

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
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();

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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousFinalNonReleaseVerificationCommit, v2.previousFinalNonReleaseVerificationCommit);
    assert.strictEqual(v1.finalAuditSummaryItems.length, v2.finalAuditSummaryItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView();
    assert.notStrictEqual(v1.finalAuditSummaryItems, v2.finalAuditSummaryItems);
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