import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewBoundaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-boundary-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-boundary-view.service.ts';

function buildView() {
  return buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewBoundaryView();
}

describe('Task 94 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Boundary Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    assert.ok(buildView());
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewBoundaryView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewBoundaryView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    assert.ok(buildView().title.length > 0);
  });

  it('title이 Final Review Boundary를 포함해야 함', () => {
    assert.ok(buildView().title.includes('Final Review Boundary'));
  });

  it('statusLabel이 존재해야 함', () => {
    assert.ok(buildView().statusLabel.length > 0);
  });

  it('statusLabel이 FINAL REVIEW BOUNDARY 계열이어야 함', () => {
    assert.ok(buildView().statusLabel.includes('FINAL REVIEW BOUNDARY'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(buildView().statusTone));
  });

  it('summary가 존재해야 함', () => {
    assert.ok(buildView().summary.length > 0);
  });

  it('summary가 read-only 흐름과 경계 의미를 설명해야 함', () => {
    const summary = buildView().summary;
    assert.ok(summary.includes('read-only') && summary.includes('경계'));
  });

  it('finalNotice가 존재해야 함', () => {
    assert.ok(buildView().finalNotice.length > 0);
  });

  it('finalNotice가 Task 94 이후에도 전환되지 않음을 표현해야 함', () => {
    const finalNotice = buildView().finalNotice;
    assert.ok(finalNotice.includes('Task 94') && finalNotice.includes('전환되지'));
  });

  it('previousSummaryLabel이 존재해야 함', () => {
    assert.ok(buildView().previousSummaryLabel.length > 0);
  });

  it('previousSummaryLabel이 Task 93을 가리켜야 함', () => {
    assert.ok(buildView().previousSummaryLabel.includes('Task 93'));
  });

  it('previousSummaryCommit이 4e3d80d여야 함', () => {
    assert.equal(buildView().previousSummaryCommit, '4e3d80d');
  });

  it('taskRangeLabel이 Task 41~93을 표현해야 함', () => {
    assert.ok(buildView().taskRangeLabel.includes('Task 41~93'));
  });

  it('boundarySummaryItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().boundarySummaryItems));
  });

  it('boundarySummaryItems가 5개 이상이어야 함', () => {
    assert.ok(buildView().boundarySummaryItems.length >= 5);
  });

  it('boundarySummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().boundarySummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('boundarySummaryItems의 모든 item에 boundaryState가 있어야 함', () => {
    for (const item of buildView().boundarySummaryItems) {
      assert.ok(item.boundaryState.length > 0);
    }
  });

  it('boundarySummaryItems가 경계 상태를 표현해야 함', () => {
    const combined = buildView().boundarySummaryItems.map((item) => item.boundaryState).join(' ');
    assert.ok(combined.includes('경계'));
  });

  it('finalReviewIsNotReleaseItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().finalReviewIsNotReleaseItems));
  });

  it('finalReviewIsNotReleaseItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().finalReviewIsNotReleaseItems.length >= 4);
  });

  it('finalReviewIsNotReleaseItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().finalReviewIsNotReleaseItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalReviewIsNotReleaseItems가 최종 검토 요약이 보류 해제가 아님을 표현해야 함', () => {
    const combined = buildView().finalReviewIsNotReleaseItems
      .map((item) => `${item.label} ${item.notReleaseReason}`)
      .join(' ');
    assert.ok(combined.includes('보류 해제') || combined.includes('해제 허용'));
  });

  it('summaryReviewNotApprovalItems가 배열이어야 함', () => {
    assert.ok(Array.isArray(buildView().summaryReviewNotApprovalItems));
  });

  it('summaryReviewNotApprovalItems가 4개 이상이어야 함', () => {
    assert.ok(buildView().summaryReviewNotApprovalItems.length >= 4);
  });

  it('summaryReviewNotApprovalItems의 모든 tone이 허용된 값이어야 함', () => {
    for (const item of buildView().summaryReviewNotApprovalItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('summaryReviewNotApprovalItems가 요약 확인과 승인 부여를 분리해야 함', () => {
    const combined = buildView().summaryReviewNotApprovalItems
      .map((item) => `${item.label} ${item.correctInterpretation}`)
      .join(' ');
    assert.ok(combined.includes('승인 부여') || combined.includes('분리'));
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

  it('blockedTransitionItems가 차단 상태를 표현해야 함', () => {
    const combined = buildView().blockedTransitionItems
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
    assert.ok(combined.includes('보류') || combined.includes('미부여'));
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
      vm.boundarySummaryItems,
      vm.finalReviewIsNotReleaseItems,
      vm.summaryReviewNotApprovalItems,
      vm.blockedTransitionItems,
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
