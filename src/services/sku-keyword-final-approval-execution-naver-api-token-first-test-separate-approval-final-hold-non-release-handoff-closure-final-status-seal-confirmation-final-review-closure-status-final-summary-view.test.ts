import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-summary-view.service';

const ALLOWED_TONES = new Set(['neutral', 'warning', 'blocked']);
const SERVICE_FILE_PATH = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-summary-view.service.ts'
);
const FORBIDDEN_PATTERNS = ['fetch', 'axios', 'Authorization', 'Bearer', 'http://', 'https://', '.create(', '.update(', '.delete(', 'onSubmit', '<form', 'execute('];

describe('FinalReviewClosureStatusFinalSummaryView — service 금지 문자열 검사', () => {
  it('서비스 파일에 fetch가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('fetch'), 'fetch found in service file');
  });

  it('서비스 파일에 axios가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('axios'), 'axios found in service file');
  });

  it('서비스 파일에 Authorization이 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('Authorization'), 'Authorization found in service file');
  });

  it('서비스 파일에 Bearer가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('Bearer'), 'Bearer found in service file');
  });

  it('서비스 파일에 http:// 가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('http://'), 'http:// found in service file');
  });

  it('서비스 파일에 https:// 가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('https://'), 'https:// found in service file');
  });

  it('서비스 파일에 .create( 가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('.create('), '.create( found in service file');
  });

  it('서비스 파일에 .update( 가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('.update('), '.update( found in service file');
  });

  it('서비스 파일에 .delete( 가 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('.delete('), '.delete( found in service file');
  });

  it('서비스 파일에 onSubmit이 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('onSubmit'), 'onSubmit found in service file');
  });

  it('서비스 파일에 <form 이 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    assert.ok(!src.includes('<form'), '<form found in service file');
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — View Model 생성', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('View Model이 생성되어야 한다', () => {
    assert.ok(view !== null && view !== undefined);
  });

  it('title이 존재해야 한다', () => {
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('title에 Final Summary 키워드가 포함되어야 한다', () => {
    assert.ok(view.title.includes('Final Summary'));
  });

  it('statusLabel이 존재해야 한다', () => {
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 READ-ONLY FINAL REVIEW CLOSURE STATUS FINAL SUMMARY이어야 한다', () => {
    assert.strictEqual(view.statusLabel, 'READ-ONLY FINAL REVIEW CLOSURE STATUS FINAL SUMMARY');
  });

  it('statusTone이 허용된 값이어야 한다', () => {
    assert.ok(ALLOWED_TONES.has(view.statusTone));
  });

  it('summary가 존재해야 한다', () => {
    assert.ok(typeof view.summary === 'string' && view.summary.length > 0);
  });

  it('finalNotice가 존재해야 한다', () => {
    assert.ok(typeof view.finalNotice === 'string' && view.finalNotice.length > 0);
  });

  it('finalNotice에 Task 102 이후에도 별도 승인 전까지 전환 불가 의미가 있어야 한다', () => {
    assert.ok(view.finalNotice.includes('Task 102'));
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — taskRangeLabel / previousSealCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('taskRangeLabel이 존재해야 한다', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~101 흐름을 표현해야 한다', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41') && view.taskRangeLabel.includes('101'));
  });

  it('previousSealLabel이 존재해야 한다', () => {
    assert.ok(typeof view.previousSealLabel === 'string' && view.previousSealLabel.length > 0);
  });

  it('previousSealCommit이 f094e23을 가리켜야 한다', () => {
    assert.strictEqual(view.previousSealCommit, 'f094e23');
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — finalSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('finalSummaryItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.finalSummaryItems));
  });

  it('finalSummaryItems가 4개 이상이어야 한다', () => {
    assert.ok(view.finalSummaryItems.length >= 4);
  });

  it('finalSummaryItems 각 항목에 label이 있어야 한다', () => {
    for (const item of view.finalSummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
    }
  });

  it('finalSummaryItems 각 항목에 summaryState가 있어야 한다', () => {
    for (const item of view.finalSummaryItems) {
      assert.ok(typeof item.summaryState === 'string' && item.summaryState.length > 0);
    }
  });

  it('finalSummaryItems 모든 tone이 허용된 값이어야 한다', () => {
    for (const item of view.finalSummaryItems) {
      assert.ok(ALLOWED_TONES.has(item.tone));
    }
  });

  it('finalSummaryItems에 최종 요약 의미 표현이 있어야 한다', () => {
    const hasSummary = view.finalSummaryItems.some(item =>
      item.summaryState.includes('최종 요약') || item.summaryState.includes('Final Summary')
    );
    assert.ok(hasSummary);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — closureStatusFlowItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('closureStatusFlowItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.closureStatusFlowItems));
  });

  it('closureStatusFlowItems가 3개 이상이어야 한다', () => {
    assert.ok(view.closureStatusFlowItems.length >= 3);
  });

  it('closureStatusFlowItems 각 항목에 flowState가 있어야 한다', () => {
    for (const item of view.closureStatusFlowItems) {
      assert.ok(typeof item.flowState === 'string' && item.flowState.length > 0);
    }
  });

  it('closureStatusFlowItems 모든 tone이 허용된 값이어야 한다', () => {
    for (const item of view.closureStatusFlowItems) {
      assert.ok(ALLOWED_TONES.has(item.tone));
    }
  });

  it('closureStatusFlowItems에 Task 99 흐름 표현이 있어야 한다', () => {
    const hasTask99 = view.closureStatusFlowItems.some(item =>
      item.label.includes('Task 99') || item.flowState.includes('Task 99')
    );
    assert.ok(hasTask99);
  });

  it('closureStatusFlowItems에 Task 100 흐름 표현이 있어야 한다', () => {
    const hasTask100 = view.closureStatusFlowItems.some(item =>
      item.label.includes('Task 100') || item.flowState.includes('Task 100')
    );
    assert.ok(hasTask100);
  });

  it('closureStatusFlowItems에 Task 101 흐름 표현이 있어야 한다', () => {
    const hasTask101 = view.closureStatusFlowItems.some(item =>
      item.label.includes('Task 101') || item.flowState.includes('Task 101')
    );
    assert.ok(hasTask101);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — nonReleaseFinalStateItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('nonReleaseFinalStateItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.nonReleaseFinalStateItems));
  });

  it('nonReleaseFinalStateItems가 3개 이상이어야 한다', () => {
    assert.ok(view.nonReleaseFinalStateItems.length >= 3);
  });

  it('nonReleaseFinalStateItems 각 항목에 nonReleaseState가 있어야 한다', () => {
    for (const item of view.nonReleaseFinalStateItems) {
      assert.ok(typeof item.nonReleaseState === 'string' && item.nonReleaseState.length > 0);
    }
  });

  it('nonReleaseFinalStateItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.nonReleaseFinalStateItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('nonReleaseFinalStateItems에 보류 미해제 최종 상태 표현이 있어야 한다', () => {
    const hasNonRelease = view.nonReleaseFinalStateItems.some(item =>
      item.nonReleaseState.includes('미해제') || item.nonReleaseState.includes('미부여')
    );
    assert.ok(hasNonRelease);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — notReleaseApprovalItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('notReleaseApprovalItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.notReleaseApprovalItems));
  });

  it('notReleaseApprovalItems가 3개 이상이어야 한다', () => {
    assert.ok(view.notReleaseApprovalItems.length >= 3);
  });

  it('notReleaseApprovalItems 각 항목에 notApprovalReason이 있어야 한다', () => {
    for (const item of view.notReleaseApprovalItems) {
      assert.ok(typeof item.notApprovalReason === 'string' && item.notApprovalReason.length > 0);
    }
  });

  it('notReleaseApprovalItems 모든 tone이 warning 또는 blocked이어야 한다', () => {
    for (const item of view.notReleaseApprovalItems) {
      assert.ok(item.tone === 'warning' || item.tone === 'blocked');
    }
  });

  it('notReleaseApprovalItems에 최종 요약과 보류 해제 승인이 분리됨을 표현해야 한다', () => {
    const hasNotApproval = view.notReleaseApprovalItems.some(item =>
      item.notApprovalReason.includes('아님') || item.notApprovalReason.includes('아니')
    );
    assert.ok(hasNotApproval);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('transitionStillBlockedItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.transitionStillBlockedItems));
  });

  it('transitionStillBlockedItems가 4개 이상이어야 한다', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
  });

  it('transitionStillBlockedItems에 보류 해제 경로 차단이 있어야 한다', () => {
    const hasHoldRelease = view.transitionStillBlockedItems.some(item =>
      item.blockedState.includes('보류 해제') || item.blockedState.includes('차단')
    );
    assert.ok(hasHoldRelease);
  });

  it('transitionStillBlockedItems에 token 발급 경로 차단이 있어야 한다', () => {
    const hasToken = view.transitionStillBlockedItems.some(item =>
      item.blockedState.includes('token')
    );
    assert.ok(hasToken);
  });

  it('transitionStillBlockedItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.transitionStillBlockedItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('requiredBeforeAnyFutureTransitionItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.requiredBeforeAnyFutureTransitionItems));
  });

  it('requiredBeforeAnyFutureTransitionItems가 3개 이상이어야 한다', () => {
    assert.ok(view.requiredBeforeAnyFutureTransitionItems.length >= 3);
  });

  it('requiredBeforeAnyFutureTransitionItems 각 항목에 requiredEvidence가 있어야 한다', () => {
    for (const item of view.requiredBeforeAnyFutureTransitionItems) {
      assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
    }
  });

  it('requiredBeforeAnyFutureTransitionItems 모든 tone이 warning 또는 blocked이어야 한다', () => {
    for (const item of view.requiredBeforeAnyFutureTransitionItems) {
      assert.ok(item.tone === 'warning' || item.tone === 'blocked');
    }
  });

  it('requiredBeforeAnyFutureTransitionItems에 별도 채널 승인 증거가 있어야 한다', () => {
    const hasSeparateApproval = view.requiredBeforeAnyFutureTransitionItems.some(item =>
      item.requiredEvidence.includes('승인') || item.requiredEvidence.includes('증거')
    );
    assert.ok(hasSeparateApproval);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('nextSafeReviewItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.nextSafeReviewItems));
  });

  it('nextSafeReviewItems가 3개 이상이어야 한다', () => {
    assert.ok(view.nextSafeReviewItems.length >= 3);
  });

  it('nextSafeReviewItems 각 항목에 nextOwner가 있어야 한다', () => {
    for (const item of view.nextSafeReviewItems) {
      assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
    }
  });

  it('nextSafeReviewItems 모든 tone이 neutral 또는 warning이어야 한다', () => {
    for (const item of view.nextSafeReviewItems) {
      assert.ok(item.tone === 'neutral' || item.tone === 'warning');
    }
  });

  it('nextSafeReviewItems에 다음 안전 검토 단계 표현이 있어야 한다', () => {
    const hasSafeReview = view.nextSafeReviewItems.some(item =>
      item.label.includes('승인') || item.label.includes('검토') || item.label.includes('보관')
    );
    assert.ok(hasSafeReview);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();

  it('stillForbiddenItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.stillForbiddenItems));
  });

  it('stillForbiddenItems가 7개 이상이어야 한다', () => {
    assert.ok(view.stillForbiddenItems.length >= 7);
  });

  it('stillForbiddenItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.stillForbiddenItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('stillForbiddenItems에 token 발급 금지 항목이 있어야 한다', () => {
    const hasToken = view.stillForbiddenItems.some(item =>
      item.label.includes('token') || item.label.includes('Token')
    );
    assert.ok(hasToken);
  });

  it('stillForbiddenItems에 외부 API 호출 금지 항목이 있어야 한다', () => {
    const hasApi = view.stillForbiddenItems.some(item =>
      item.label.includes('외부 API') || item.label.includes('API 호출')
    );
    assert.ok(hasApi);
  });

  it('stillForbiddenItems에 POST API 금지 항목이 있어야 한다', () => {
    const hasPost = view.stillForbiddenItems.some(item =>
      item.label.includes('POST')
    );
    assert.ok(hasPost);
  });

  it('stillForbiddenItems에 운영 DB write 금지 항목이 있어야 한다', () => {
    const hasDb = view.stillForbiddenItems.some(item =>
      item.label.includes('DB') || item.label.includes('Prisma')
    );
    assert.ok(hasDb);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — 순수 함수 검증', () => {
  it('인자 없이 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();
    assert.ok(view !== null && view !== undefined);
  });

  it('undefined 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView(undefined);
    assert.ok(view !== null && view !== undefined);
  });

  it('null 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView(null);
    assert.ok(view !== null && view !== undefined);
  });

  it('동일한 호출로 동일한 statusLabel을 반환해야 한다 (결정적 함수)', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();
    assert.strictEqual(view1.statusLabel, view2.statusLabel);
  });

  it('동일한 호출로 동일한 previousSealCommit을 반환해야 한다', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView();
    assert.strictEqual(view1.previousSealCommit, view2.previousSealCommit);
  });
});

describe('FinalReviewClosureStatusFinalSummaryView — 금지 패턴 통합 검사', () => {
  it('서비스 파일의 모든 금지 패턴이 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: "${pattern}"`);
    }
  });
});
