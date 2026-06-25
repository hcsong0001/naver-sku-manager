import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureBoundaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-boundary-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-boundary-view.service.ts';

function buildView() {
  return buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureBoundaryView();
}

describe('Task 97 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Closure Boundary Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    assert.ok(buildView());
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureBoundaryView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureBoundaryView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    assert.ok(buildView().title.length > 0);
  });

  it('title이 Final Review Closure Boundary를 포함해야 함', () => {
    assert.ok(buildView().title.includes('Final Review Closure Boundary'));
  });

  it('statusLabel이 존재해야 함', () => {
    assert.ok(buildView().statusLabel.length > 0);
  });

  it('statusLabel이 FINAL REVIEW CLOSURE BOUNDARY 계열이어야 함', () => {
    assert.ok(buildView().statusLabel.includes('FINAL REVIEW CLOSURE BOUNDARY'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(buildView().statusTone));
  });

  it('summary가 존재해야 함', () => {
    assert.ok(buildView().summary.length > 0);
  });

  it('summary가 read-only 흐름과 경계를 설명해야 함', () => {
    const summary = buildView().summary;
    assert.ok(summary.includes('read-only') && summary.includes('경계'));
  });

  it('finalNotice가 존재해야 함', () => {
    assert.ok(buildView().finalNotice.length > 0);
  });

  it('finalNotice가 Task 41~96 이후에도 전환되지 않음을 표현해야 함', () => {
    const finalNotice = buildView().finalNotice;
    assert.ok(finalNotice.includes('전환되지'));
  });

  it('previousClosureSummaryLabel이 존재해야 함', () => {
    assert.ok(buildView().previousClosureSummaryLabel.length > 0);
  });

  it('previousClosureSummaryLabel이 Task 96을 가리켜야 함', () => {
    assert.ok(buildView().previousClosureSummaryLabel.includes('Task 96'));
  });

  it('previousClosureSummaryCommit이 3e7d07d여야 함', () => {
    assert.equal(buildView().previousClosureSummaryCommit, '3e7d07d');
  });

  it('taskRangeLabel이 Task 41~96을 표현해야 함', () => {
    assert.ok(buildView().taskRangeLabel.includes('Task 41~96'));
  });

  it('closureBoundarySummaryItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().closureBoundarySummaryItems));
  });

  it('closureBoundarySummaryItems가 5개 이상이어야 함', () => {
    assert.ok(buildView().closureBoundarySummaryItems.length >= 5);
  });

  it('closureBoundarySummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().closureBoundarySummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('closureBoundarySummaryItems의 모든 item에 boundaryState가 있어야 함', () => {
    for (const item of buildView().closureBoundarySummaryItems) {
      assert.ok(item.boundaryState.length > 0);
    }
  });

  it('closureBoundarySummaryItems가 경계 상태를 표현해야 함', () => {
    const combined = buildView().closureBoundarySummaryItems.map((item) => item.boundaryState).join(' ');
    assert.ok(combined.includes('경계') || combined.includes('마감'));
  });

  it('closureSummaryIsNotReleaseItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().closureSummaryIsNotReleaseItems));
  });

  it('closureSummaryIsNotReleaseItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().closureSummaryIsNotReleaseItems.length >= 4);
  });

  it('closureSummaryIsNotReleaseItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().closureSummaryIsNotReleaseItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('closureSummaryIsNotReleaseItems의 모든 item에 notReleaseReason이 있어야 함', () => {
    for (const item of buildView().closureSummaryIsNotReleaseItems) {
      assert.ok(item.notReleaseReason.length > 0);
    }
  });

  it('closureSummaryIsNotReleaseItems가 보류 미해제를 표현해야 함', () => {
    const combined = buildView().closureSummaryIsNotReleaseItems.map((item) => item.notReleaseReason).join(' ');
    assert.ok(combined.includes('보류') || combined.includes('미해제') || combined.includes('아님'));
  });

  it('closureReviewNotApprovalItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().closureReviewNotApprovalItems));
  });

  it('closureReviewNotApprovalItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().closureReviewNotApprovalItems.length >= 4);
  });

  it('closureReviewNotApprovalItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().closureReviewNotApprovalItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('closureReviewNotApprovalItems의 모든 item에 correctInterpretation이 있어야 함', () => {
    for (const item of buildView().closureReviewNotApprovalItems) {
      assert.ok(item.correctInterpretation.length > 0);
    }
  });

  it('closureReviewNotApprovalItems가 승인 부여 아님을 표현해야 함', () => {
    const combined = buildView().closureReviewNotApprovalItems.map((item) => item.correctInterpretation).join(' ');
    assert.ok(combined.includes('아님') || combined.includes('승인') || combined.includes('인지'));
  });

  it('blockedTransitionItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().blockedTransitionItems));
  });

  it('blockedTransitionItems가 5개 이상이어야 함', () => {
    assert.ok(buildView().blockedTransitionItems.length >= 5);
  });

  it('blockedTransitionItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().blockedTransitionItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('blockedTransitionItems의 모든 item에 blockedState가 있어야 함', () => {
    for (const item of buildView().blockedTransitionItems) {
      assert.ok(item.blockedState.length > 0);
    }
  });

  it('blockedTransitionItems가 차단 상태를 표현해야 함', () => {
    const combined = buildView().blockedTransitionItems.map((item) => item.blockedState).join(' ');
    assert.ok(combined.includes('차단'));
  });

  it('remainingNonReleaseItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().remainingNonReleaseItems));
  });

  it('remainingNonReleaseItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().remainingNonReleaseItems.length >= 4);
  });

  it('remainingNonReleaseItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().remainingNonReleaseItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('remainingNonReleaseItems의 모든 item에 remainingState가 있어야 함', () => {
    for (const item of buildView().remainingNonReleaseItems) {
      assert.ok(item.remainingState.length > 0);
    }
  });

  it('remainingNonReleaseItems가 보류 미해제 상태를 표현해야 함', () => {
    const combined = buildView().remainingNonReleaseItems.map((item) => item.remainingState).join(' ');
    assert.ok(combined.includes('보류') || combined.includes('미부여') || combined.includes('유지'));
  });

  it('requiredBeforeAnyFutureTransitionItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().requiredBeforeAnyFutureTransitionItems));
  });

  it('requiredBeforeAnyFutureTransitionItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().requiredBeforeAnyFutureTransitionItems.length >= 4);
  });

  it('requiredBeforeAnyFutureTransitionItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().requiredBeforeAnyFutureTransitionItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('requiredBeforeAnyFutureTransitionItems의 모든 item에 requiredEvidence가 있어야 함', () => {
    for (const item of buildView().requiredBeforeAnyFutureTransitionItems) {
      assert.ok(item.requiredEvidence.length > 0);
    }
  });

  it('requiredBeforeAnyFutureTransitionItems가 증거 문서를 표현해야 함', () => {
    const combined = buildView().requiredBeforeAnyFutureTransitionItems.map((item) => item.requiredEvidence).join(' ');
    assert.ok(combined.includes('승인') || combined.includes('문서') || combined.includes('기록'));
  });

  it('nextSafeReviewItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().nextSafeReviewItems));
  });

  it('nextSafeReviewItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().nextSafeReviewItems.length >= 4);
  });

  it('nextSafeReviewItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().nextSafeReviewItems) {
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('nextSafeReviewItems의 모든 item에 nextOwner가 있어야 함', () => {
    for (const item of buildView().nextSafeReviewItems) {
      assert.ok(item.nextOwner.length > 0);
    }
  });

  it('nextSafeReviewItems가 사람 담당자를 표현해야 함', () => {
    const combined = buildView().nextSafeReviewItems.map((item) => item.nextOwner).join(' ');
    assert.ok(combined.includes('사람'));
  });

  it('stillForbiddenItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().stillForbiddenItems));
  });

  it('stillForbiddenItems가 9개 이상이어야 함', () => {
    assert.ok(buildView().stillForbiddenItems.length >= 9);
  });

  it('stillForbiddenItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().stillForbiddenItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('stillForbiddenItems가 token 발급 금지를 포함해야 함', () => {
    const labels = buildView().stillForbiddenItems.map((item) => item.label).join(' ');
    assert.ok(labels.includes('token'));
  });

  it('stillForbiddenItems가 외부 API 호출 금지를 포함해야 함', () => {
    const labels = buildView().stillForbiddenItems.map((item) => item.label).join(' ');
    assert.ok(labels.includes('API') || labels.includes('외부'));
  });

  it('service 파일이 fetch를 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('fetch('));
  });

  it('service 파일이 axios를 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('axios'));
  });

  it('service 파일이 Authorization 헤더를 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('Authorization'));
  });

  it('service 파일이 Bearer를 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('Bearer'));
  });

  it('service 파일이 access_token을 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('access_token'));
  });

  it('service 파일이 prisma 호출을 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('prisma.'));
  });

  it('service 파일이 process.env를 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('process.env'));
  });

  it('service 파일이 naver.com endpoint URL을 포함하지 않아야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('naver.com'));
  });
});
