import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-summary-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-summary-view.service.ts';

describe('Task 90 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Summary Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm);
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.title && vm.title.length > 0);
  });

  it('title이 Seal Confirmation Summary를 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.title.includes('Seal Confirmation Summary'));
  });

  it('statusLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.statusLabel && vm.statusLabel.length > 0);
  });

  it('statusLabel이 SEAL CONFIRMATION SUMMARY 계열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.statusLabel.includes('SEAL CONFIRMATION SUMMARY'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(vm.statusTone));
  });

  it('summary가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.summary && vm.summary.length > 0);
  });

  it('summary가 read-only 흐름 설명을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.summary.includes('read-only'));
  });

  it('taskRangeLabel이 Task 41~89 흐름을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.taskRangeLabel.includes('Task 41~89'));
  });

  it('previousSealLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.previousSealLabel && vm.previousSealLabel.length > 0);
  });

  it('previousSealLabel이 Task 89를 가리켜야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.previousSealLabel.includes('Task 89'));
  });

  it('previousSealCommit이 71ac7c7이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.equal(vm.previousSealCommit, '71ac7c7');
  });

  it('confirmationSummaryItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.confirmationSummaryItems));
  });

  it('confirmationSummaryItems가 5개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.confirmationSummaryItems.length >= 5);
  });

  it('confirmationSummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.confirmationSummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('confirmationSummaryItems의 모든 item에 confirmationState가 있어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.confirmationSummaryItems) {
      assert.ok(item.confirmationState && item.confirmationState.length > 0);
    }
  });

  it('sealConfirmationNotReleaseItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.sealConfirmationNotReleaseItems));
  });

  it('sealConfirmationNotReleaseItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.sealConfirmationNotReleaseItems.length >= 4);
  });

  it('sealConfirmationNotReleaseItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.sealConfirmationNotReleaseItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('sealConfirmationNotReleaseItems가 봉인 확인과 보류 해제를 분리해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    const combined = vm.sealConfirmationNotReleaseItems.map((i) => i.notReleaseReason).join(' ');
    assert.ok(combined.includes('아님') || combined.includes('미부여') || combined.includes('완료'));
  });

  it('finalSealReviewItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.finalSealReviewItems));
  });

  it('finalSealReviewItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.finalSealReviewItems.length >= 4);
  });

  it('finalSealReviewItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.finalSealReviewItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalSealReviewItems가 다음 검토자 확인 항목을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    const combined = vm.finalSealReviewItems.map((i) => i.reviewerMustConfirm).join(' ');
    assert.ok(combined.includes('확인'));
  });

  it('remainingNonReleaseItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.remainingNonReleaseItems));
  });

  it('remainingNonReleaseItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.remainingNonReleaseItems.length >= 4);
  });

  it('remainingNonReleaseItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.remainingNonReleaseItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('remainingNonReleaseItems가 보류 미해제 상태를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    const combined = vm.remainingNonReleaseItems.map((i) => i.remainingState).join(' ');
    assert.ok(combined.includes('미부여') || combined.includes('유지') || combined.includes('미해제'));
  });

  it('transitionStillBlockedItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.transitionStillBlockedItems));
  });

  it('transitionStillBlockedItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.transitionStillBlockedItems.length >= 4);
  });

  it('transitionStillBlockedItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.transitionStillBlockedItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('transitionStillBlockedItems가 전환 경로 차단을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    const combined = vm.transitionStillBlockedItems.map((i) => i.blockedState).join(' ');
    assert.ok(combined.includes('차단'));
  });

  it('requiredBeforeAnyFutureTransitionItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.requiredBeforeAnyFutureTransitionItems));
  });

  it('requiredBeforeAnyFutureTransitionItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.requiredBeforeAnyFutureTransitionItems.length >= 4);
  });

  it('requiredBeforeAnyFutureTransitionItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.requiredBeforeAnyFutureTransitionItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('requiredBeforeAnyFutureTransitionItems가 향후 전환 전 필요한 별도 증거를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    const combined = vm.requiredBeforeAnyFutureTransitionItems.map((i) => i.requiredEvidence).join(' ');
    assert.ok(combined.length > 0);
  });

  it('nextSafeReviewItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.nextSafeReviewItems));
  });

  it('nextSafeReviewItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.nextSafeReviewItems.length >= 4);
  });

  it('nextSafeReviewItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.nextSafeReviewItems) {
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('nextSafeReviewItems가 다음 안전 검토 단계를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    const combined = vm.nextSafeReviewItems.map((i) => i.nextOwner).join(' ');
    assert.ok(combined.includes('사람'));
  });

  it('stillForbiddenItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(Array.isArray(vm.stillForbiddenItems));
  });

  it('stillForbiddenItems가 9개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.stillForbiddenItems.length >= 9);
  });

  it('stillForbiddenItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.stillForbiddenItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('stillForbiddenItems가 기존 금지 항목을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    const labels = vm.stillForbiddenItems.map((i) => i.label).join(' ');
    assert.ok(labels.includes('token') || labels.includes('Token'));
  });

  it('finalNotice가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.finalNotice && vm.finalNotice.length > 0);
  });

  it('finalNotice가 별도 명시 승인 의미를 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.finalNotice.includes('별도 명시 승인') || vm.finalNotice.includes('별도'));
  });

  it('finalNotice가 실행 준비가 아님을 명시해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    assert.ok(vm.finalNotice.includes('실행 준비가 아닙니다'));
  });

  it('모든 item에 label과 description이 있어야 함 (confirmationSummaryItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.confirmationSummaryItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (sealConfirmationNotReleaseItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.sealConfirmationNotReleaseItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (finalSealReviewItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.finalSealReviewItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (remainingNonReleaseItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView();
    for (const item of vm.remainingNonReleaseItems) {
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

  it('서비스 파일에 onSubmit이 없어야 함', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes('onSubmit'), 'onSubmit found in service code');
  });

  it('서비스는 순수 함수여야 함 (import가 없어야 함)', () => {
    const src = readFileSync(SERVICE_PATH, 'utf-8');
    assert.ok(!src.includes("import "), 'import found in service code');
  });
});
