import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-non-release-seal-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-non-release-seal-view.service.ts';

describe('Task 92 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Non-Release Seal Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm);
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.title && vm.title.length > 0);
  });

  it('title이 Non-Release Seal을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.title.includes('Non-Release Seal'));
  });

  it('statusLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.statusLabel && vm.statusLabel.length > 0);
  });

  it('statusLabel이 SEAL CONFIRMATION NON-RELEASE SEAL 계열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.statusLabel.includes('SEAL CONFIRMATION NON-RELEASE SEAL'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(vm.statusTone));
  });

  it('summary가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.summary && vm.summary.length > 0);
  });

  it('summary가 read-only 흐름 설명을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.summary.includes('read-only'));
  });

  it('taskRangeLabel이 Task 41~91 흐름을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.taskRangeLabel.includes('Task 41~91'));
  });

  it('previousBoundaryLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.previousBoundaryLabel && vm.previousBoundaryLabel.length > 0);
  });

  it('previousBoundaryLabel이 Task 91을 가리켜야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.previousBoundaryLabel.includes('Task 91'));
  });

  it('previousBoundaryCommit이 2f9844f이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.equal(vm.previousBoundaryCommit, '2f9844f');
  });

  it('sealSummaryItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.sealSummaryItems));
  });

  it('sealSummaryItems가 5개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.sealSummaryItems.length >= 5);
  });

  it('sealSummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.sealSummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('sealSummaryItems의 모든 item에 sealState가 있어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.sealSummaryItems) {
      assert.ok(item.sealState && item.sealState.length > 0);
    }
  });

  it('confirmationBoundaryNonReleaseSealItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.confirmationBoundaryNonReleaseSealItems));
  });

  it('confirmationBoundaryNonReleaseSealItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.confirmationBoundaryNonReleaseSealItems.length >= 4);
  });

  it('confirmationBoundaryNonReleaseSealItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.confirmationBoundaryNonReleaseSealItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('confirmationBoundaryNonReleaseSealItems가 경계 이후에도 보류 해제가 없음을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const combined = vm.confirmationBoundaryNonReleaseSealItems.map((i) => i.sealedState).join(' ');
    assert.ok(combined.includes('없음'));
  });

  it('boundaryAftermathItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.boundaryAftermathItems));
  });

  it('boundaryAftermathItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.boundaryAftermathItems.length >= 4);
  });

  it('boundaryAftermathItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.boundaryAftermathItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('boundaryAftermathItems가 상태 변화 없음 또는 유지 의미를 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const combined = vm.boundaryAftermathItems.map((i) => i.currentMeaning).join(' ');
    assert.ok(combined.includes('유지') || combined.includes('없음'));
  });

  it('releaseStillNotGrantedItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.releaseStillNotGrantedItems));
  });

  it('releaseStillNotGrantedItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.releaseStillNotGrantedItems.length >= 4);
  });

  it('releaseStillNotGrantedItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.releaseStillNotGrantedItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('releaseStillNotGrantedItems가 미부여 또는 부재를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const combined = vm.releaseStillNotGrantedItems.map((i) => i.notGrantedReason).join(' ');
    assert.ok(combined.includes('부재') || combined.includes('부여'));
  });

  it('transitionStillBlockedItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.transitionStillBlockedItems));
  });

  it('transitionStillBlockedItems가 5개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.transitionStillBlockedItems.length >= 5);
  });

  it('transitionStillBlockedItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.transitionStillBlockedItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('transitionStillBlockedItems가 차단을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const combined = vm.transitionStillBlockedItems.map((i) => i.blockedState).join(' ');
    assert.ok(combined.includes('차단'));
  });

  it('remainingNonReleaseItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.remainingNonReleaseItems));
  });

  it('remainingNonReleaseItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.remainingNonReleaseItems.length >= 4);
  });

  it('remainingNonReleaseItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.remainingNonReleaseItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('remainingNonReleaseItems가 보류 상태 유지 또는 미부여를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const combined = vm.remainingNonReleaseItems.map((i) => i.remainingState).join(' ');
    assert.ok(combined.includes('유지') || combined.includes('미부여'));
  });

  it('requiredBeforeAnyFutureTransitionItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.requiredBeforeAnyFutureTransitionItems));
  });

  it('requiredBeforeAnyFutureTransitionItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.requiredBeforeAnyFutureTransitionItems.length >= 4);
  });

  it('requiredBeforeAnyFutureTransitionItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.requiredBeforeAnyFutureTransitionItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('requiredBeforeAnyFutureTransitionItems가 향후 전환 전 필요한 증거를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const combined = vm.requiredBeforeAnyFutureTransitionItems.map((i) => i.requiredEvidence).join(' ');
    assert.ok(combined.length > 0);
  });

  it('nextSafeReviewItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.nextSafeReviewItems));
  });

  it('nextSafeReviewItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.nextSafeReviewItems.length >= 4);
  });

  it('nextSafeReviewItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.nextSafeReviewItems) {
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('nextSafeReviewItems가 다음 안전 검토 단계를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const combined = vm.nextSafeReviewItems.map((i) => i.nextOwner).join(' ');
    assert.ok(combined.includes('사람'));
  });

  it('stillForbiddenItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(Array.isArray(vm.stillForbiddenItems));
  });

  it('stillForbiddenItems가 9개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.stillForbiddenItems.length >= 9);
  });

  it('stillForbiddenItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.stillForbiddenItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('stillForbiddenItems가 기존 금지 항목을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    const labels = vm.stillForbiddenItems.map((i) => i.label).join(' ');
    assert.ok(labels.includes('token') || labels.includes('API'));
  });

  it('finalNotice가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.finalNotice && vm.finalNotice.length > 0);
  });

  it('finalNotice가 별도 승인 전 전환 불가를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    assert.ok(vm.finalNotice.includes('별도 승인') || vm.finalNotice.includes('전환되지'));
  });

  it('모든 item에 label과 description이 있어야 함 (sealSummaryItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.sealSummaryItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (confirmationBoundaryNonReleaseSealItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.confirmationBoundaryNonReleaseSealItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (boundaryAftermathItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.boundaryAftermathItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (releaseStillNotGrantedItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView();
    for (const item of vm.releaseStillNotGrantedItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('서비스 파일에 fetch가 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    const lines = src.split('\n').filter((l) => !l.trim().startsWith('//'));
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

  it('서비스 파일에 https:// endpoint URL이 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('https://'), 'https:// found in service code');
  });

  it('서비스 파일에 http:// endpoint URL이 없어야 함', () => {
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

  it('서비스는 순수 함수여야 함 (import가 없어야 함)', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('import '), 'import found in service code');
  });
});
