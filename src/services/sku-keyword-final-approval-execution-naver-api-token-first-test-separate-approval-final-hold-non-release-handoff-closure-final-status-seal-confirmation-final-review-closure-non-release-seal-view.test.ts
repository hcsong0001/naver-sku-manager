import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureNonReleaseSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-non-release-seal-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-non-release-seal-view.service.ts';

function buildView() {
  return buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureNonReleaseSealView();
}

describe('Task 98 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Closure Non-Release Seal Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    assert.ok(buildView());
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureNonReleaseSealView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureNonReleaseSealView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    assert.ok(buildView().title.length > 0);
  });

  it('title이 Final Review Closure Non-Release Seal을 포함해야 함', () => {
    assert.ok(buildView().title.includes('Final Review Closure Non-Release Seal'));
  });

  it('statusLabel이 존재해야 함', () => {
    assert.ok(buildView().statusLabel.length > 0);
  });

  it('statusLabel이 FINAL REVIEW CLOSURE NON-RELEASE SEAL 계열이어야 함', () => {
    assert.ok(buildView().statusLabel.includes('FINAL REVIEW CLOSURE NON-RELEASE SEAL'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(buildView().statusTone));
  });

  it('summary가 존재해야 함', () => {
    assert.ok(buildView().summary.length > 0);
  });

  it('summary가 read-only 흐름과 봉인 의미를 설명해야 함', () => {
    const summary = buildView().summary;
    assert.ok(summary.includes('read-only') && summary.includes('봉인'));
  });

  it('finalNotice가 존재해야 함', () => {
    assert.ok(buildView().finalNotice.length > 0);
  });

  it('finalNotice가 전환되지 않음을 표현해야 함', () => {
    const finalNotice = buildView().finalNotice;
    assert.ok(finalNotice.includes('전환되지'));
  });

  it('previousClosureBoundaryLabel이 존재해야 함', () => {
    assert.ok(buildView().previousClosureBoundaryLabel.length > 0);
  });

  it('previousClosureBoundaryLabel이 Task 97을 가리켜야 함', () => {
    assert.ok(buildView().previousClosureBoundaryLabel.includes('Task 97'));
  });

  it('previousClosureBoundaryCommit이 30d696d여야 함', () => {
    assert.equal(buildView().previousClosureBoundaryCommit, '30d696d');
  });

  it('taskRangeLabel이 Task 41~97을 표현해야 함', () => {
    assert.ok(buildView().taskRangeLabel.includes('Task 41~97'));
  });

  it('sealSummaryItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().sealSummaryItems));
  });

  it('sealSummaryItems가 5개 이상이어야 함', () => {
    assert.ok(buildView().sealSummaryItems.length >= 5);
  });

  it('sealSummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().sealSummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('sealSummaryItems의 모든 item에 sealState가 있어야 함', () => {
    for (const item of buildView().sealSummaryItems) {
      assert.ok(item.sealState.length > 0);
    }
  });

  it('sealSummaryItems가 봉인 상태를 표현해야 함', () => {
    const combined = buildView().sealSummaryItems.map((item) => item.sealState).join(' ');
    assert.ok(combined.includes('봉인') || combined.includes('경계'));
  });

  it('closureBoundaryNonReleaseSealItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().closureBoundaryNonReleaseSealItems));
  });

  it('closureBoundaryNonReleaseSealItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().closureBoundaryNonReleaseSealItems.length >= 4);
  });

  it('closureBoundaryNonReleaseSealItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().closureBoundaryNonReleaseSealItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('closureBoundaryNonReleaseSealItems의 모든 item에 sealedState가 있어야 함', () => {
    for (const item of buildView().closureBoundaryNonReleaseSealItems) {
      assert.ok(item.sealedState.length > 0);
    }
  });

  it('closureBoundaryNonReleaseSealItems가 보류 미해제 봉인을 표현해야 함', () => {
    const combined = buildView().closureBoundaryNonReleaseSealItems
      .map((item) => item.sealedState)
      .join(' ');
    assert.ok(combined.includes('아님') || combined.includes('보류') || combined.includes('봉인'));
  });

  it('boundaryAftermathItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().boundaryAftermathItems));
  });

  it('boundaryAftermathItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().boundaryAftermathItems.length >= 4);
  });

  it('boundaryAftermathItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().boundaryAftermathItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('boundaryAftermathItems의 모든 item에 currentMeaning이 있어야 함', () => {
    for (const item of buildView().boundaryAftermathItems) {
      assert.ok(item.currentMeaning.length > 0);
    }
  });

  it('boundaryAftermathItems가 상태 변화 없음을 표현해야 함', () => {
    const combined = buildView().boundaryAftermathItems
      .map((item) => item.currentMeaning)
      .join(' ');
    assert.ok(combined.includes('상태') || combined.includes('보류') || combined.includes('아님'));
  });

  it('releaseStillNotGrantedItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().releaseStillNotGrantedItems));
  });

  it('releaseStillNotGrantedItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().releaseStillNotGrantedItems.length >= 4);
  });

  it('releaseStillNotGrantedItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().releaseStillNotGrantedItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('releaseStillNotGrantedItems의 모든 item에 notGrantedReason이 있어야 함', () => {
    for (const item of buildView().releaseStillNotGrantedItems) {
      assert.ok(item.notGrantedReason.length > 0);
    }
  });

  it('releaseStillNotGrantedItems가 해제 미부여를 표현해야 함', () => {
    const combined = buildView().releaseStillNotGrantedItems
      .map((item) => item.notGrantedReason)
      .join(' ');
    assert.ok(combined.includes('미부여') || combined.includes('보류') || combined.includes('아님'));
  });

  it('transitionStillBlockedItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().transitionStillBlockedItems));
  });

  it('transitionStillBlockedItems가 5개 이상이어야 함', () => {
    assert.ok(buildView().transitionStillBlockedItems.length >= 5);
  });

  it('transitionStillBlockedItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().transitionStillBlockedItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('transitionStillBlockedItems의 모든 item에 blockedState가 있어야 함', () => {
    for (const item of buildView().transitionStillBlockedItems) {
      assert.ok(item.blockedState.length > 0);
    }
  });

  it('transitionStillBlockedItems가 차단 유지를 표현해야 함', () => {
    const combined = buildView().transitionStillBlockedItems
      .map((item) => item.blockedState)
      .join(' ');
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
    const combined = buildView().remainingNonReleaseItems
      .map((item) => item.remainingState)
      .join(' ');
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
    const combined = buildView().requiredBeforeAnyFutureTransitionItems
      .map((item) => item.requiredEvidence)
      .join(' ');
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
