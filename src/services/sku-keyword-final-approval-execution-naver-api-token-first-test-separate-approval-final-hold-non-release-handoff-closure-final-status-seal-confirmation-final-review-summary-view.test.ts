import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-summary-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-summary-view.service.ts';

function buildView() {
  return buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewSummaryView();
}

describe('Task 93 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Summary Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    assert.ok(buildView());
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewSummaryView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewSummaryView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    assert.ok(buildView().title.length > 0);
  });

  it('title이 Final Review Summary를 포함해야 함', () => {
    assert.ok(buildView().title.includes('Final Review Summary'));
  });

  it('statusLabel이 존재해야 함', () => {
    assert.ok(buildView().statusLabel.length > 0);
  });

  it('statusLabel이 FINAL REVIEW SUMMARY 계열이어야 함', () => {
    assert.ok(buildView().statusLabel.includes('FINAL REVIEW SUMMARY'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(buildView().statusTone));
  });

  it('summary가 존재해야 함', () => {
    assert.ok(buildView().summary.length > 0);
  });

  it('summary가 read-only 흐름을 설명해야 함', () => {
    const summary = buildView().summary;
    assert.ok(summary.includes('read-only') && summary.includes('실동작'));
  });

  it('finalNotice가 존재해야 함', () => {
    assert.ok(buildView().finalNotice.length > 0);
  });

  it('finalNotice가 Task 93 이후에도 전환되지 않음을 표현해야 함', () => {
    const finalNotice = buildView().finalNotice;
    assert.ok(finalNotice.includes('Task 93') && finalNotice.includes('전환되지'));
  });

  it('previousSealLabel이 존재해야 함', () => {
    assert.ok(buildView().previousSealLabel.length > 0);
  });

  it('previousSealLabel이 Task 92를 가리켜야 함', () => {
    assert.ok(buildView().previousSealLabel.includes('Task 92'));
  });

  it('previousSealCommit이 eadf7b9여야 함', () => {
    assert.equal(buildView().previousSealCommit, 'eadf7b9');
  });

  it('taskRangeLabel이 Task 41~92를 표현해야 함', () => {
    assert.ok(buildView().taskRangeLabel.includes('Task 41~92'));
  });

  it('finalReviewSummaryItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().finalReviewSummaryItems));
  });

  it('finalReviewSummaryItems가 5개 이상이어야 함', () => {
    assert.ok(buildView().finalReviewSummaryItems.length >= 5);
  });

  it('finalReviewSummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().finalReviewSummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalReviewSummaryItems의 모든 item에 reviewState가 있어야 함', () => {
    for (const item of buildView().finalReviewSummaryItems) {
      assert.ok(item.reviewState.length > 0);
    }
  });

  it('finalReviewSummaryItems가 최종 검토 요약 상태를 표현해야 함', () => {
    const combined = buildView().finalReviewSummaryItems.map((item) => item.reviewState).join(' ');
    assert.ok(combined.includes('최종 검토 요약'));
  });

  it('sealConfirmationFlowItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().sealConfirmationFlowItems));
  });

  it('sealConfirmationFlowItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().sealConfirmationFlowItems.length >= 4);
  });

  it('sealConfirmationFlowItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().sealConfirmationFlowItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('sealConfirmationFlowItems가 Task 90~92 흐름을 표현해야 함', () => {
    const combined = buildView().sealConfirmationFlowItems.map((item) => item.label).join(' ');
    assert.ok(
      combined.includes('Task 90') &&
      combined.includes('Task 91') &&
      combined.includes('Task 92')
    );
  });

  it('sealConfirmationFlowItems가 Task 93을 포함해야 함', () => {
    const combined = buildView().sealConfirmationFlowItems.map((item) => item.label).join(' ');
    assert.ok(combined.includes('Task 93'));
  });

  it('nonReleaseStateItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().nonReleaseStateItems));
  });

  it('nonReleaseStateItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().nonReleaseStateItems.length >= 4);
  });

  it('nonReleaseStateItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().nonReleaseStateItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('nonReleaseStateItems가 보류 미해제 상태를 표현해야 함', () => {
    const combined = buildView().nonReleaseStateItems
      .map((item) => `${item.label} ${item.nonReleaseState}`)
      .join(' ');
    assert.ok(combined.includes('보류 미해제'));
  });

  it('notReleaseApprovalItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().notReleaseApprovalItems));
  });

  it('notReleaseApprovalItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().notReleaseApprovalItems.length >= 4);
  });

  it('notReleaseApprovalItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().notReleaseApprovalItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('notReleaseApprovalItems가 최종 검토 요약과 보류 해제 승인을 분리해야 함', () => {
    const combined = buildView().notReleaseApprovalItems
      .map((item) => `${item.label} ${item.notApprovalReason}`)
      .join(' ');
    assert.ok(combined.includes('보류 해제 승인') || combined.includes('해제 승인'));
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
      vm.finalReviewSummaryItems,
      vm.sealConfirmationFlowItems,
      vm.nonReleaseStateItems,
      vm.notReleaseApprovalItems,
      vm.transitionStillBlockedItems,
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
