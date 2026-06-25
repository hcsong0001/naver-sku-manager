import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-summary-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-summary-view.service.ts';

function buildView() {
  return buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureSummaryView();
}

describe('Task 96 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Closure Summary Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    assert.ok(buildView());
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureSummaryView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureSummaryView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    assert.ok(buildView().title.length > 0);
  });

  it('title이 Final Review Closure Summary를 포함해야 함', () => {
    assert.ok(buildView().title.includes('Final Review Closure Summary'));
  });

  it('statusLabel이 존재해야 함', () => {
    assert.ok(buildView().statusLabel.length > 0);
  });

  it('statusLabel이 FINAL REVIEW CLOSURE SUMMARY 계열이어야 함', () => {
    assert.ok(buildView().statusLabel.includes('FINAL REVIEW CLOSURE SUMMARY'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(buildView().statusTone));
  });

  it('summary가 존재해야 함', () => {
    assert.ok(buildView().summary.length > 0);
  });

  it('summary가 read-only 흐름과 마감 요약 의미를 설명해야 함', () => {
    const summary = buildView().summary;
    assert.ok(summary.includes('read-only') && summary.includes('마감 요약'));
  });

  it('finalNotice가 존재해야 함', () => {
    assert.ok(buildView().finalNotice.length > 0);
  });

  it('finalNotice가 Task 96 이후에도 전환되지 않음을 표현해야 함', () => {
    const finalNotice = buildView().finalNotice;
    assert.ok(finalNotice.includes('Task 96') && finalNotice.includes('전환되지'));
  });

  it('previousSealLabel이 존재해야 함', () => {
    assert.ok(buildView().previousSealLabel.length > 0);
  });

  it('previousSealLabel이 Task 95를 가리켜야 함', () => {
    assert.ok(buildView().previousSealLabel.includes('Task 95'));
  });

  it('previousSealCommit이 1db32d9여야 함', () => {
    assert.equal(buildView().previousSealCommit, '1db32d9');
  });

  it('taskRangeLabel이 Task 41~95를 표현해야 함', () => {
    assert.ok(buildView().taskRangeLabel.includes('Task 41~95'));
  });

  it('closureSummaryItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().closureSummaryItems));
  });

  it('closureSummaryItems가 5개 이상이어야 함', () => {
    assert.ok(buildView().closureSummaryItems.length >= 5);
  });

  it('closureSummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().closureSummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('closureSummaryItems의 모든 item에 closureState가 있어야 함', () => {
    for (const item of buildView().closureSummaryItems) {
      assert.ok(item.closureState.length > 0);
    }
  });

  it('closureSummaryItems가 마감 상태를 표현해야 함', () => {
    const combined = buildView().closureSummaryItems.map((item) => item.closureState).join(' ');
    assert.ok(combined.includes('마감') || combined.includes('요약'));
  });

  it('finalReviewFlowItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().finalReviewFlowItems));
  });

  it('finalReviewFlowItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().finalReviewFlowItems.length >= 4);
  });

  it('finalReviewFlowItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().finalReviewFlowItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalReviewFlowItems가 Task 93~95 흐름을 표현해야 함', () => {
    const combined = buildView().finalReviewFlowItems
      .map((item) => `${item.label} ${item.flowState}`)
      .join(' ');
    assert.ok(combined.includes('Task 93') && combined.includes('Task 94') && combined.includes('Task 95'));
  });

  it('nonReleaseClosureItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().nonReleaseClosureItems));
  });

  it('nonReleaseClosureItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().nonReleaseClosureItems.length >= 4);
  });

  it('nonReleaseClosureItems의 모든 tone이 blocked여야 함', () => {
    for (const item of buildView().nonReleaseClosureItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('nonReleaseClosureItems가 보류 미해제 마감 상태를 표현해야 함', () => {
    const combined = buildView().nonReleaseClosureItems
      .map((item) => `${item.label} ${item.closureMeaning}`)
      .join(' ');
    assert.ok(combined.includes('보류') || combined.includes('미도달'));
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

  it('notReleaseApprovalItems가 마감 요약과 보류 해제 승인을 분리해야 함', () => {
    const combined = buildView().notReleaseApprovalItems
      .map((item) => `${item.label} ${item.notApprovalReason}`)
      .join(' ');
    assert.ok(combined.includes('승인') || combined.includes('허용 아님'));
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
      vm.closureSummaryItems,
      vm.finalReviewFlowItems,
      vm.nonReleaseClosureItems,
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
