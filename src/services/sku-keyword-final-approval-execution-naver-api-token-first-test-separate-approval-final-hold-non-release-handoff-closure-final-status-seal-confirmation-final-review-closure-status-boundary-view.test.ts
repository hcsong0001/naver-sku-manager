import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-boundary-view.service';

const ALLOWED_TONES = new Set(['neutral', 'warning', 'blocked']);
const SERVICE_FILE_PATH = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-boundary-view.service.ts'
);
const FORBIDDEN_PATTERNS = ['fetch', 'axios', 'Authorization', 'Bearer', 'http://', 'https://', '.create(', '.update(', '.delete(', 'onSubmit', '<form', 'execute('];

describe('FinalReviewClosureStatusBoundaryView — service 금지 문자열 검사', () => {
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

describe('FinalReviewClosureStatusBoundaryView — View Model 생성', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

  it('View Model이 생성되어야 한다', () => {
    assert.ok(view !== null && view !== undefined);
  });

  it('title이 존재해야 한다', () => {
    assert.ok(typeof view.title === 'string' && view.title.length > 0);
  });

  it('title에 Status Boundary 키워드가 포함되어야 한다', () => {
    assert.ok(view.title.includes('Status Boundary'));
  });

  it('statusLabel이 존재해야 한다', () => {
    assert.ok(typeof view.statusLabel === 'string' && view.statusLabel.length > 0);
  });

  it('statusLabel이 READ-ONLY FINAL REVIEW CLOSURE STATUS BOUNDARY여야 한다', () => {
    assert.strictEqual(view.statusLabel, 'READ-ONLY FINAL REVIEW CLOSURE STATUS BOUNDARY');
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

  it('finalNotice에 Task 100 이후에도 별도 승인 전까지 전환 불가 의미가 있어야 한다', () => {
    assert.ok(view.finalNotice.includes('Task 100'));
  });
});

describe('FinalReviewClosureStatusBoundaryView — taskRangeLabel / previousStatusSummaryCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

  it('taskRangeLabel이 존재해야 한다', () => {
    assert.ok(typeof view.taskRangeLabel === 'string' && view.taskRangeLabel.length > 0);
  });

  it('taskRangeLabel이 Task 41~99 흐름을 표현해야 한다', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41') && view.taskRangeLabel.includes('99'));
  });

  it('previousStatusSummaryLabel이 존재해야 한다', () => {
    assert.ok(typeof view.previousStatusSummaryLabel === 'string' && view.previousStatusSummaryLabel.length > 0);
  });

  it('previousStatusSummaryCommit이 8d45383을 가리켜야 한다', () => {
    assert.strictEqual(view.previousStatusSummaryCommit, '8d45383');
  });
});

describe('FinalReviewClosureStatusBoundaryView — statusBoundarySummaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

  it('statusBoundarySummaryItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.statusBoundarySummaryItems));
  });

  it('statusBoundarySummaryItems가 4개 이상이어야 한다', () => {
    assert.ok(view.statusBoundarySummaryItems.length >= 4);
  });

  it('statusBoundarySummaryItems 각 항목에 label이 있어야 한다', () => {
    for (const item of view.statusBoundarySummaryItems) {
      assert.ok(typeof item.label === 'string' && item.label.length > 0);
    }
  });

  it('statusBoundarySummaryItems 각 항목에 boundaryState가 있어야 한다', () => {
    for (const item of view.statusBoundarySummaryItems) {
      assert.ok(typeof item.boundaryState === 'string' && item.boundaryState.length > 0);
    }
  });

  it('statusBoundarySummaryItems 모든 tone이 허용된 값이어야 한다', () => {
    for (const item of view.statusBoundarySummaryItems) {
      assert.ok(ALLOWED_TONES.has(item.tone));
    }
  });

  it('statusBoundarySummaryItems에 경계 의미 표현이 있어야 한다', () => {
    const hasBoundary = view.statusBoundarySummaryItems.some(item =>
      item.boundaryState.includes('경계') || item.boundaryState.includes('Boundary')
    );
    assert.ok(hasBoundary);
  });
});

describe('FinalReviewClosureStatusBoundaryView — statusSummaryIsNotReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

  it('statusSummaryIsNotReleaseItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.statusSummaryIsNotReleaseItems));
  });

  it('statusSummaryIsNotReleaseItems가 3개 이상이어야 한다', () => {
    assert.ok(view.statusSummaryIsNotReleaseItems.length >= 3);
  });

  it('statusSummaryIsNotReleaseItems 각 항목에 notReleaseReason이 있어야 한다', () => {
    for (const item of view.statusSummaryIsNotReleaseItems) {
      assert.ok(typeof item.notReleaseReason === 'string' && item.notReleaseReason.length > 0);
    }
  });

  it('statusSummaryIsNotReleaseItems 모든 tone이 warning 또는 blocked이어야 한다', () => {
    for (const item of view.statusSummaryIsNotReleaseItems) {
      assert.ok(item.tone === 'warning' || item.tone === 'blocked');
    }
  });

  it('statusSummaryIsNotReleaseItems에 상태 요약이 보류 해제가 아님 표현이 있어야 한다', () => {
    const hasNotRelease = view.statusSummaryIsNotReleaseItems.some(item =>
      item.notReleaseReason.includes('아님') || item.notReleaseReason.includes('아니')
    );
    assert.ok(hasNotRelease);
  });
});

describe('FinalReviewClosureStatusBoundaryView — statusReviewNotApprovalItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

  it('statusReviewNotApprovalItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.statusReviewNotApprovalItems));
  });

  it('statusReviewNotApprovalItems가 3개 이상이어야 한다', () => {
    assert.ok(view.statusReviewNotApprovalItems.length >= 3);
  });

  it('statusReviewNotApprovalItems 각 항목에 correctInterpretation이 있어야 한다', () => {
    for (const item of view.statusReviewNotApprovalItems) {
      assert.ok(typeof item.correctInterpretation === 'string' && item.correctInterpretation.length > 0);
    }
  });

  it('statusReviewNotApprovalItems 모든 tone이 warning 또는 blocked이어야 한다', () => {
    for (const item of view.statusReviewNotApprovalItems) {
      assert.ok(item.tone === 'warning' || item.tone === 'blocked');
    }
  });

  it('statusReviewNotApprovalItems에 상태 요약 확인이 승인 부여와 분리됨을 표현해야 한다', () => {
    const hasNotApproval = view.statusReviewNotApprovalItems.some(item =>
      item.correctInterpretation.includes('아님') || item.correctInterpretation.includes('아니')
    );
    assert.ok(hasNotApproval);
  });
});

describe('FinalReviewClosureStatusBoundaryView — blockedTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

  it('blockedTransitionItems가 배열이어야 한다', () => {
    assert.ok(Array.isArray(view.blockedTransitionItems));
  });

  it('blockedTransitionItems가 4개 이상이어야 한다', () => {
    assert.ok(view.blockedTransitionItems.length >= 4);
  });

  it('blockedTransitionItems에 보류 해제 경로 차단이 있어야 한다', () => {
    const hasHoldRelease = view.blockedTransitionItems.some(item =>
      item.blockedState.includes('보류 해제') || item.blockedState.includes('차단')
    );
    assert.ok(hasHoldRelease);
  });

  it('blockedTransitionItems에 token 발급 경로 차단이 있어야 한다', () => {
    const hasToken = view.blockedTransitionItems.some(item =>
      item.blockedState.includes('token')
    );
    assert.ok(hasToken);
  });

  it('blockedTransitionItems 모든 tone이 blocked이어야 한다', () => {
    for (const item of view.blockedTransitionItems) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });
});

describe('FinalReviewClosureStatusBoundaryView — remainingNonReleaseItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

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

describe('FinalReviewClosureStatusBoundaryView — requiredBeforeAnyFutureTransitionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

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

describe('FinalReviewClosureStatusBoundaryView — nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

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

describe('FinalReviewClosureStatusBoundaryView — stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();

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

describe('FinalReviewClosureStatusBoundaryView — 순수 함수 검증', () => {
  it('인자 없이 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();
    assert.ok(view !== null && view !== undefined);
  });

  it('undefined 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView(undefined);
    assert.ok(view !== null && view !== undefined);
  });

  it('null 인자로 호출해도 View Model이 생성되어야 한다', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView(null);
    assert.ok(view !== null && view !== undefined);
  });

  it('동일한 호출로 동일한 statusLabel을 반환해야 한다 (결정적 함수)', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();
    assert.strictEqual(view1.statusLabel, view2.statusLabel);
  });

  it('동일한 호출로 동일한 previousStatusSummaryCommit을 반환해야 한다', () => {
    const view1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();
    const view2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView();
    assert.strictEqual(view1.previousStatusSummaryCommit, view2.previousStatusSummaryCommit);
  });
});

describe('FinalReviewClosureStatusBoundaryView — 금지 패턴 통합 검사', () => {
  it('서비스 파일의 모든 금지 패턴이 없어야 한다', () => {
    const src = readFileSync(SERVICE_FILE_PATH, 'utf-8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: "${pattern}"`);
    }
  });
});
