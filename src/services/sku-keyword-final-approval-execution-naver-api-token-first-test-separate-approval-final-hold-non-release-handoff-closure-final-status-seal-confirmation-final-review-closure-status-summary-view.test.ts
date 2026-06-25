import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-summary-view.service';

const ALLOWED_TONES = new Set(['neutral', 'warning', 'blocked']);
const SERVICE_FILE_PATH = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-summary-view.service.ts'
);
const FORBIDDEN_PATTERNS = ['fetch', 'axios', 'Authorization', 'Bearer', 'http://', 'https://', '.create(', '.update(', '.delete(', 'onSubmit', '<form', 'execute('];

describe('FinalReviewClosureStatusSummaryView — service 금지 문자열 검사', () => {
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

describe('FinalReviewClosureStatusSummaryView — View Model 생성', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

  it('View Model이 생성되어야 한다', () => {
    assert.ok(view !== null && view !== undefined);
  });

  it('title이 존재해야 한다', () => {
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('title에 Status Summary 키워드가 포함되어야 한다', () => {
    assert.ok(view.title.includes('Status Summary'));
  });

  it('statusLabel이 존재해야 한다', () => {
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 READ-ONLY FINAL REVIEW CLOSURE STATUS SUMMARY여야 한다', () => {
    assert.strictEqual(view.statusLabel, 'READ-ONLY FINAL REVIEW CLOSURE STATUS SUMMARY');
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

  it('finalNotice에 Task 99 이후에도 별도 승인 전까지 보류 해제 불가 의미가 있어야 한다', () => {
    assert.ok(view.finalNotice.includes('Task 99'));
  });
});

describe('FinalReviewClosureStatusSummaryView — taskRangeLabel / previousSealCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

  it('taskRangeLabel이 존재해야 한다', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~98 흐름을 표현해야 한다', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41') && view.taskRangeLabel.includes('98'));
  });

  it('previousSealLabel이 존재해야 한다', () => {
    assert.ok(typeof view.previousSealLabel === 'string' && view.previousSealLabel.length > 0);
  });

  it('previousSealCommit이 f5080af를 가리켜야 한다', () => {
    assert.strictEqual(view.previousSealCommit, 'f5080af');
  });
});

describe('FinalReviewClosureStatusSummaryView — closureStatusSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

  it('closureStatusSummaryItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.closureStatusSummaryItems));
  });

  it('closureStatusSummaryItems가 4개 이상이어야 한다', () => {
    assert.ok(view.closureStatusSummaryItems.length >= 4);
  });

  it('closureStatusSummaryItems 각 항목에 label이 있어야 한다', () => {
    for (const item of view.closureStatusSummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
    }
  });

  it('closureStatusSummaryItems 각 항목에 statusState가 있어야 한다', () => {
    for (const item of view.closureStatusSummaryItems) {
      assert.ok(typeof item.statusState === 'string' && item.statusState.length > 0);
    }
  });

  it('closureStatusSummaryItems 모든 tone이 허용된 값이어야 한다', () => {
    for (const item of view.closureStatusSummaryItems) {
      assert.ok(ALLOWED_TONES.has(item.tone));
    }
  });
});

describe('FinalReviewClosureStatusSummaryView — finalReviewClosureFlowItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

  it('finalReviewClosureFlowItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.finalReviewClosureFlowItems));
  });

  it('finalReviewClosureFlowItems가 3개 이상이어야 한다 (Task 96, 97, 98)', () => {
    assert.ok(view.finalReviewClosureFlowItems.length >= 3);
  });

  it('finalReviewClosureFlowItems에 Task 96 흐름이 포함되어야 한다', () => {
    const hasTask96 = view.finalReviewClosureFlowItems.some(item => item.label.includes('Task 96') || item.flowState.includes('Task 96'));
    assert.ok(hasTask96);
  });

  it('finalReviewClosureFlowItems에 Task 97 흐름이 포함되어야 한다', () => {
    const hasTask97 = view.finalReviewClosureFlowItems.some(item => item.label.includes('Task 97') || item.flowState.includes('Task 97'));
    assert.ok(hasTask97);
  });

  it('finalReviewClosureFlowItems에 Task 98 흐름이 포함되어야 한다', () => {
    const hasTask98 = view.finalReviewClosureFlowItems.some(item => item.label.includes('Task 98') || item.flowState.includes('Task 98'));
    assert.ok(hasTask98);
  });

  it('finalReviewClosureFlowItems 모든 tone이 허용된 값이어야 한다', () => {
    for (const item of view.finalReviewClosureFlowItems) {
      assert.ok(ALLOWED_TONES.has(item.tone));
    }
  });
});

describe('FinalReviewClosureStatusSummaryView — nonReleaseStatusItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

  it('nonReleaseStatusItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.nonReleaseStatusItems));
  });

  it('nonReleaseStatusItems가 3개 이상이어야 한다', () => {
    assert.ok(view.nonReleaseStatusItems.length >= 3);
  });

  it('nonReleaseStatusItems 각 항목에 nonReleaseState가 있어야 한다', () => {
    for (const item of view.nonReleaseStatusItems) {
      assert.ok(typeof item.nonReleaseState === 'string' && item.nonReleaseState.length > 0);
    }
  });

  it('nonReleaseStatusItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.nonReleaseStatusItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('nonReleaseStatusItems에 보류 미해제 상태 표현이 있어야 한다', () => {
    const hasNonRelease = view.nonReleaseStatusItems.some(item =>
      item.nonReleaseState.includes('미해제') || item.nonReleaseState.includes('미부여')
    );
    assert.ok(hasNonRelease);
  });
});

describe('FinalReviewClosureStatusSummaryView — notReleaseApprovalItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

  it('notReleaseApprovalItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.notReleaseApprovalItems));
  });

  it('notReleaseApprovalItems가 2개 이상이어야 한다', () => {
    assert.ok(view.notReleaseApprovalItems.length >= 2);
  });

  it('notReleaseApprovalItems에 상태 요약이 보류 해제 승인이 아님을 표현해야 한다', () => {
    const hasNotApproval = view.notReleaseApprovalItems.some(item =>
      item.notApprovalReason.includes('보류 해제 승인 아님') || item.notApprovalReason.includes('아님')
    );
    assert.ok(hasNotApproval);
  });

  it('notReleaseApprovalItems 모든 tone이 허용된 값이어야 한다', () => {
    for (const item of view.notReleaseApprovalItems) {
      assert.ok(item.tone === 'warning' || item.tone === 'blocked');
    }
  });
});

describe('FinalReviewClosureStatusSummaryView — transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

  it('transitionStillBlockedItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.transitionStillBlockedItems));
  });

  it('transitionStillBlockedItems가 4개 이상이어야 한다', () => {
    assert.ok(view.transitionStillBlockedItems.length >= 4);
  });

  it('transitionStillBlockedItems에 보류 해제 전환 차단이 있어야 한다', () => {
    const hasHoldRelease = view.transitionStillBlockedItems.some(item =>
      item.blockedState.includes('보류 해제') || item.blockedState.includes('차단')
    );
    assert.ok(hasHoldRelease);
  });

  it('transitionStillBlockedItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.transitionStillBlockedItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });
});

describe('FinalReviewClosureStatusSummaryView — requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

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

  it('requiredBeforeAnyFutureTransitionItems 모든 tone이 허용된 값이어야 한다', () => {
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

describe('FinalReviewClosureStatusSummaryView — nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

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

  it('nextSafeReviewItems 모든 tone이 허용된 값이어야 한다', () => {
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

describe('FinalReviewClosureStatusSummaryView — stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();

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

describe('FinalReviewClosureStatusSummaryView — 순수 함수 검증', () => {
  it('인자 없이 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();
    assert.ok(view !== null && view !== undefined);
  });

  it('undefined 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView(undefined);
    assert.ok(view !== null && view !== undefined);
  });

  it('null 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView(null);
    assert.ok(view !== null && view !== undefined);
  });

  it('동일한 호출로 동일한 statusLabel을 반환해야 한다 (결정적 함수)', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();
    assert.strictEqual(view1.statusLabel, view2.statusLabel);
  });

  it('동일한 호출로 동일한 previousSealCommit을 반환해야 한다', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView();
    assert.strictEqual(view1.previousSealCommit, view2.previousSealCommit);
  });
});

describe('FinalReviewClosureStatusSummaryView — 금지 패턴 통합 검사', () => {
  it('서비스 파일의 모든 금지 패턴이 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: "${pattern}"`);
    }
  });
});
