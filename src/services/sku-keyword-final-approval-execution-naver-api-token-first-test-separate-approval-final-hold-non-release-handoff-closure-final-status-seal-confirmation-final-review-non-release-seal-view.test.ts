import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewNonReleaseSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-non-release-seal-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-non-release-seal-view.service.ts';

function buildView() {
  return buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewNonReleaseSealView();
}

describe('Task 95 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Non-Release Seal Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    assert.ok(buildView());
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewNonReleaseSealView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewNonReleaseSealView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    assert.ok(buildView().title.length > 0);
  });

  it('title이 Final Review Non-Release Seal을 포함해야 함', () => {
    assert.ok(buildView().title.includes('Final Review Non-Release Seal'));
  });

  it('statusLabel이 존재해야 함', () => {
    assert.ok(buildView().statusLabel.length > 0);
  });

  it('statusLabel이 FINAL REVIEW NON-RELEASE SEAL 계열이어야 함', () => {
    assert.ok(buildView().statusLabel.includes('FINAL REVIEW NON-RELEASE SEAL'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(buildView().statusTone));
  });

  it('summary가 존재해야 함', () => {
    assert.ok(buildView().summary.length > 0);
  });

  it('summary가 read-only 흐름과 비해제 봉인 의미를 설명해야 함', () => {
    const summary = buildView().summary;
    assert.ok(summary.includes('read-only') && summary.includes('봉인'));
  });

  it('finalNotice가 존재해야 함', () => {
    assert.ok(buildView().finalNotice.length > 0);
  });

  it('finalNotice가 Task 95 이후에도 전환되지 않음을 표현해야 함', () => {
    const finalNotice = buildView().finalNotice;
    assert.ok(finalNotice.includes('Task 95') && finalNotice.includes('전환되지'));
  });

  it('previousBoundaryLabel이 존재해야 함', () => {
    assert.ok(buildView().previousBoundaryLabel.length > 0);
  });

  it('previousBoundaryLabel이 Task 94를 가리켜야 함', () => {
    assert.ok(buildView().previousBoundaryLabel.includes('Task 94'));
  });

  it('previousBoundaryCommit이 38bb968이어야 함', () => {
    assert.equal(buildView().previousBoundaryCommit, '38bb968');
  });

  it('taskRangeLabel이 Task 41~94를 표현해야 함', () => {
    assert.ok(buildView().taskRangeLabel.includes('Task 41~94'));
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
    assert.ok(combined.includes('봉인'));
  });

  it('finalReviewBoundaryNonReleaseSealItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().finalReviewBoundaryNonReleaseSealItems));
  });

  it('finalReviewBoundaryNonReleaseSealItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().finalReviewBoundaryNonReleaseSealItems.length >= 4);
  });

  it('finalReviewBoundaryNonReleaseSealItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().finalReviewBoundaryNonReleaseSealItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('finalReviewBoundaryNonReleaseSealItems가 보류 해제가 발생하지 않았음을 표현해야 함', () => {
    const combined = buildView().finalReviewBoundaryNonReleaseSealItems
      .map((item) => `${item.label} ${item.sealedState}`)
      .join(' ');
    assert.ok(combined.includes('보류 미해제') || combined.includes('미허용'));
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

  it('boundaryAftermathItems가 경계 확인 이후에도 상태 변화가 없음을 표현해야 함', () => {
    const combined = buildView().boundaryAftermathItems
      .map((item) => `${item.label} ${item.currentMeaning}`)
      .join(' ');
    assert.ok(combined.includes('상태 변화 없음') || combined.includes('대기'));
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

  it('releaseStillNotGrantedItems가 허용 미부여를 표현해야 함', () => {
    const combined = buildView().releaseStillNotGrantedItems
      .map((item) => `${item.label} ${item.notGrantedReason}`)
      .join(' ');
    assert.ok(combined.includes('미부여'));
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

  it('transitionStillBlockedItems가 차단 상태를 표현해야 함', () => {
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

  it('remainingNonReleaseItems가 보류 미해제 상태를 표현해야 함', () => {
    const combined = buildView().remainingNonReleaseItems
      .map((item) => `${item.label} ${item.remainingState}`)
      .join(' ');
    assert.ok(combined.includes('보류') || combined.includes('미도달'));
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

  it('requiredBeforeAnyFutureTransitionItems가 별도 승인 근거를 표현해야 함', () => {
    const combined = buildView().requiredBeforeAnyFutureTransitionItems
      .map((item) => item.requiredEvidence)
      .join(' ');
    assert.ok(combined.includes('별도 채널 명시 승인 기록'));
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

  it('nextSafeReviewItems가 다음 안전 검토 단계를 표현해야 함', () => {
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

  it('stillForbiddenItems가 기존 금지 항목을 포함해야 함', () => {
    const combined = buildView().stillForbiddenItems.map((item) => item.label).join(' ');
    assert.ok(combined.includes('token') && combined.includes('API'));
  });

  it('각 그룹 item에 label과 description이 있어야 함', () => {
    const vm = buildView();
    const groups = [
      vm.sealSummaryItems,
      vm.finalReviewBoundaryNonReleaseSealItems,
      vm.boundaryAftermathItems,
      vm.releaseStillNotGrantedItems,
      vm.transitionStillBlockedItems,
      vm.remainingNonReleaseItems,
      vm.requiredBeforeAnyFutureTransitionItems,
      vm.nextSafeReviewItems,
      vm.stillForbiddenItems,
    ];

    for (const group of groups) {
      for (const item of group) {
        assert.ok(item.label.length > 0);
        assert.ok(item.description.length > 0);
      }
    }
  });

  it('서비스 파일에 fetch가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    const lines = src.split('\n').filter((line) => !line.trim().startsWith('//'));
    const code = lines.join('\n');
    assert.ok(!code.includes('fetch('), 'fetch( found in service code');
  });

  it('서비스 파일에 axios가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('axios'), 'axios found in service code');
  });

  it('서비스 파일에 Authorization이 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('Authorization'), 'Authorization found in service code');
  });

  it('서비스 파일에 Bearer가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('Bearer'), 'Bearer found in service code');
  });

  it('서비스 파일에 https://가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('https://'), 'https:// found in service code');
  });

  it('서비스 파일에 http://가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('http://'), 'http:// found in service code');
  });

  it('서비스 파일에 prisma가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('prisma'), 'prisma found in service code');
  });

  it('서비스 파일에 .create가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('.create'), '.create found in service code');
  });

  it('서비스 파일에 .update가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('.update'), '.update found in service code');
  });

  it('서비스 파일에 .delete가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('.delete'), '.delete found in service code');
  });

  it('서비스 파일에 onSubmit이 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('onSubmit'), 'onSubmit found in service code');
  });

  it('서비스 파일에 form이 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('form'), 'form found in service code');
  });

  it('서비스 파일에 execute가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('execute'), 'execute found in service code');
  });

  it('서비스 파일에 process가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('process'), 'process found in service code');
  });

  it('서비스 파일에 import가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('import '), 'import found in service code');
  });
});
