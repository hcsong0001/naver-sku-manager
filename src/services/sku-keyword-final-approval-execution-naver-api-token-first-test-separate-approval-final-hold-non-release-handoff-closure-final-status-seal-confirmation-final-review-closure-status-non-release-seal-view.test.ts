import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-non-release-seal-view.service';

const ALLOWED_TONES = new Set(['neutral', 'warning', 'blocked']);
const SERVICE_FILE_PATH = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-non-release-seal-view.service.ts'
);
const FORBIDDEN_PATTERNS = ['fetch', 'axios', 'Authorization', 'Bearer', 'http://', 'https://', '.create(', '.update(', '.delete(', 'onSubmit', '<form', 'execute('];

describe('FinalReviewClosureStatusNonReleaseSealView — service 금지 문자열 검사', () => {
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

describe('FinalReviewClosureStatusNonReleaseSealView — View Model 생성', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

  it('View Model이 생성되어야 한다', () => {
    assert.ok(view !== null && view !== undefined);
  });

  it('title이 존재해야 한다', () => {
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('title에 Non-Release Seal 키워드가 포함되어야 한다', () => {
    assert.ok(view.title.includes('Non-Release Seal'));
  });

  it('statusLabel이 존재해야 한다', () => {
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 READ-ONLY FINAL REVIEW CLOSURE STATUS NON-RELEASE SEAL이어야 한다', () => {
    assert.strictEqual(view.statusLabel, 'READ-ONLY FINAL REVIEW CLOSURE STATUS NON-RELEASE SEAL');
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

  it('finalNotice에 Task 101 이후에도 별도 승인 전까지 전환 불가 의미가 있어야 한다', () => {
    assert.ok(view.finalNotice.includes('Task 101'));
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — taskRangeLabel / previousStatusBoundaryCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

  it('taskRangeLabel이 존재해야 한다', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~100 흐름을 표현해야 한다', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41') && view.taskRangeLabel.includes('100'));
  });

  it('previousStatusBoundaryLabel이 존재해야 한다', () => {
    assert.ok(typeof view.previousStatusBoundaryLabel === 'string' && view.previousStatusBoundaryLabel.length > 0);
  });

  it('previousStatusBoundaryCommit이 6273400을 가리켜야 한다', () => {
    assert.strictEqual(view.previousStatusBoundaryCommit, '6273400');
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — sealSummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

  it('sealSummaryItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.sealSummaryItems));
  });

  it('sealSummaryItems가 4개 이상이어야 한다', () => {
    assert.ok(view.sealSummaryItems.length >= 4);
  });

  it('sealSummaryItems 각 항목에 label이 있어야 한다', () => {
    for (const item of view.sealSummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
    }
  });

  it('sealSummaryItems 각 항목에 sealState가 있어야 한다', () => {
    for (const item of view.sealSummaryItems) {
      assert.ok(typeof item.sealState === 'string' && item.sealState.length > 0);
    }
  });

  it('sealSummaryItems 모든 tone이 허용된 값이어야 한다', () => {
    for (const item of view.sealSummaryItems) {
      assert.ok(ALLOWED_TONES.has(item.tone));
    }
  });

  it('sealSummaryItems에 봉인 의미 표현이 있어야 한다', () => {
    const hasSeal = view.sealSummaryItems.some(item =>
      item.sealState.includes('봉인') || item.sealState.includes('Seal')
    );
    assert.ok(hasSeal);
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — statusBoundaryNonReleaseSealItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

  it('statusBoundaryNonReleaseSealItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.statusBoundaryNonReleaseSealItems));
  });

  it('statusBoundaryNonReleaseSealItems가 3개 이상이어야 한다', () => {
    assert.ok(view.statusBoundaryNonReleaseSealItems.length >= 3);
  });

  it('statusBoundaryNonReleaseSealItems 각 항목에 sealedState가 있어야 한다', () => {
    for (const item of view.statusBoundaryNonReleaseSealItems) {
      assert.ok(typeof item.sealedState === 'string' && item.sealedState.length > 0);
    }
  });

  it('statusBoundaryNonReleaseSealItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.statusBoundaryNonReleaseSealItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('statusBoundaryNonReleaseSealItems에 경계 이후 보류 해제 발생 안 함 표현이 있어야 한다', () => {
    const hasNonRelease = view.statusBoundaryNonReleaseSealItems.some(item =>
      item.sealedState.includes('아님') || item.sealedState.includes('안 함')
    );
    assert.ok(hasNonRelease);
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — boundaryAftermathItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

  it('boundaryAftermathItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.boundaryAftermathItems));
  });

  it('boundaryAftermathItems가 3개 이상이어야 한다', () => {
    assert.ok(view.boundaryAftermathItems.length >= 3);
  });

  it('boundaryAftermathItems 각 항목에 currentMeaning이 있어야 한다', () => {
    for (const item of view.boundaryAftermathItems) {
      assert.ok(typeof item.currentMeaning === 'string' && item.currentMeaning.length > 0);
    }
  });

  it('boundaryAftermathItems 모든 tone이 warning 또는 blocked이어야 한다', () => {
    for (const item of view.boundaryAftermathItems) {
      assert.ok(item.tone === 'warning' || item.tone === 'blocked');
    }
  });

  it('boundaryAftermathItems에 경계 확인 이후 상태 변화 없음 표현이 있어야 한다', () => {
    const hasNoChange = view.boundaryAftermathItems.some(item =>
      item.currentMeaning.includes('변화 없음') || item.currentMeaning.includes('아님')
    );
    assert.ok(hasNoChange);
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — releaseStillNotGrantedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

  it('releaseStillNotGrantedItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.releaseStillNotGrantedItems));
  });

  it('releaseStillNotGrantedItems가 4개 이상이어야 한다', () => {
    assert.ok(view.releaseStillNotGrantedItems.length >= 4);
  });

  it('releaseStillNotGrantedItems 각 항목에 notGrantedReason이 있어야 한다', () => {
    for (const item of view.releaseStillNotGrantedItems) {
      assert.ok(typeof item.notGrantedReason === 'string' && item.notGrantedReason.length > 0);
    }
  });

  it('releaseStillNotGrantedItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.releaseStillNotGrantedItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('releaseStillNotGrantedItems에 미부여 표현이 있어야 한다', () => {
    const hasNotGranted = view.releaseStillNotGrantedItems.some(item =>
      item.notGrantedReason.includes('미부여')
    );
    assert.ok(hasNotGranted);
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — transitionStillBlockedItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

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

describe('FinalReviewClosureStatusNonReleaseSealView — remainingNonReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

  it('remainingNonReleaseItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.remainingNonReleaseItems));
  });

  it('remainingNonReleaseItems가 3개 이상이어야 한다', () => {
    assert.ok(view.remainingNonReleaseItems.length >= 3);
  });

  it('remainingNonReleaseItems 각 항목에 remainingState가 있어야 한다', () => {
    for (const item of view.remainingNonReleaseItems) {
      assert.ok(typeof item.remainingState === 'string' && item.remainingState.length > 0);
    }
  });

  it('remainingNonReleaseItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.remainingNonReleaseItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });

  it('remainingNonReleaseItems에 보류 미해제 상태 표현이 있어야 한다', () => {
    const hasNonRelease = view.remainingNonReleaseItems.some(item =>
      item.remainingState.includes('미해제') || item.remainingState.includes('미부여')
    );
    assert.ok(hasNonRelease);
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

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

describe('FinalReviewClosureStatusNonReleaseSealView — nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

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

describe('FinalReviewClosureStatusNonReleaseSealView — stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();

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

describe('FinalReviewClosureStatusNonReleaseSealView — 순수 함수 검증', () => {
  it('인자 없이 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();
    assert.ok(view !== null && view !== undefined);
  });

  it('undefined 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView(undefined);
    assert.ok(view !== null && view !== undefined);
  });

  it('null 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView(null);
    assert.ok(view !== null && view !== undefined);
  });

  it('동일한 호출로 동일한 statusLabel을 반환해야 한다 (결정적 함수)', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();
    assert.strictEqual(view1.statusLabel, view2.statusLabel);
  });

  it('동일한 호출로 동일한 previousStatusBoundaryCommit을 반환해야 한다', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView();
    assert.strictEqual(view1.previousStatusBoundaryCommit, view2.previousStatusBoundaryCommit);
  });
});

describe('FinalReviewClosureStatusNonReleaseSealView — 금지 패턴 통합 검사', () => {
  it('서비스 파일의 모든 금지 패턴이 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: "${pattern}"`);
    }
  });
});
