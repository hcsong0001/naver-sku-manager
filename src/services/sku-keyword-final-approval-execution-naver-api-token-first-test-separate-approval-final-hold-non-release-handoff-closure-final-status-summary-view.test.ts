import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-summary-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-summary-view.service.ts';

describe('Task 87 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Summary Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm);
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.title && vm.title.length > 0);
  });

  it('title이 Closure Final Status Summary를 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.title.includes('Closure Final Status Summary'));
  });

  it('statusLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.statusLabel && vm.statusLabel.length > 0);
  });

  it('statusLabel이 READ-ONLY CLOSURE FINAL STATUS SUMMARY 계열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.statusLabel.includes('CLOSURE FINAL STATUS SUMMARY'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(vm.statusTone));
  });

  it('summary가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.summary && vm.summary.length > 0);
  });

  it('summary가 read-only 흐름 설명을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.summary.includes('read-only'));
  });

  it('taskRangeLabel이 Task 41~86 흐름을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.taskRangeLabel.includes('Task 41~86'));
  });

  it('previousSealLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.previousSealLabel && vm.previousSealLabel.length > 0);
  });

  it('previousSealLabel이 Task 86을 가리켜야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.previousSealLabel.includes('Task 86'));
  });

  it('previousSealCommit이 949cb41이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.equal(vm.previousSealCommit, '949cb41');
  });

  it('finalStatusSummaryItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(Array.isArray(vm.finalStatusSummaryItems));
  });

  it('finalStatusSummaryItems가 5개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.finalStatusSummaryItems.length >= 5);
  });

  it('finalStatusSummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.finalStatusSummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalStatusSummaryItems의 모든 item에 statusState가 있어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.finalStatusSummaryItems) {
      assert.ok(item.statusState && item.statusState.length > 0);
    }
  });

  it('closureReviewStateItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(Array.isArray(vm.closureReviewStateItems));
  });

  it('closureReviewStateItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.closureReviewStateItems.length >= 4);
  });

  it('closureReviewStateItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.closureReviewStateItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('closureReviewStateItems가 종료 관문 확인은 read-only 검토임을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    const combined = vm.closureReviewStateItems.map((i) => i.currentMeaning).join(' ');
    assert.ok(combined.includes('read-only') || combined.includes('검토') || combined.includes('확인'));
  });

  it('nonReleaseStateItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(Array.isArray(vm.nonReleaseStateItems));
  });

  it('nonReleaseStateItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.nonReleaseStateItems.length >= 4);
  });

  it('nonReleaseStateItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.nonReleaseStateItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('nonReleaseStateItems가 보류 미해제 상태를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    const combined = vm.nonReleaseStateItems.map((i) => i.nonReleaseState).join(' ');
    assert.ok(combined.includes('보류') || combined.includes('차단'));
  });

  it('notTransitionReadyItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(Array.isArray(vm.notTransitionReadyItems));
  });

  it('notTransitionReadyItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.notTransitionReadyItems.length >= 4);
  });

  it('notTransitionReadyItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.notTransitionReadyItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('notTransitionReadyItems가 제출/실행/token 발급 전환 준비가 아님을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    const combined = vm.notTransitionReadyItems.map((i) => i.notReadyReason).join(' ');
    assert.ok(combined.includes('미완') || combined.includes('필요'));
  });

  it('requiredBeforeNextTransitionItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(Array.isArray(vm.requiredBeforeNextTransitionItems));
  });

  it('requiredBeforeNextTransitionItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.requiredBeforeNextTransitionItems.length >= 4);
  });

  it('requiredBeforeNextTransitionItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.requiredBeforeNextTransitionItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('requiredBeforeNextTransitionItems가 향후 전환 전 필요한 별도 증거를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    const combined = vm.requiredBeforeNextTransitionItems.map((i) => i.requiredEvidence).join(' ');
    assert.ok(combined.length > 0);
  });

  it('nextSafeReviewItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(Array.isArray(vm.nextSafeReviewItems));
  });

  it('nextSafeReviewItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.nextSafeReviewItems.length >= 4);
  });

  it('nextSafeReviewItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.nextSafeReviewItems) {
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('nextSafeReviewItems가 다음 안전 검토 단계를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    const combined = vm.nextSafeReviewItems.map((i) => i.nextOwner).join(' ');
    assert.ok(combined.includes('사람'));
  });

  it('stillForbiddenItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(Array.isArray(vm.stillForbiddenItems));
  });

  it('stillForbiddenItems가 9개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.stillForbiddenItems.length >= 9);
  });

  it('stillForbiddenItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.stillForbiddenItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('stillForbiddenItems가 기존 금지 항목을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    const labels = vm.stillForbiddenItems.map((i) => i.label).join(' ');
    assert.ok(labels.includes('token') || labels.includes('Token'));
  });

  it('finalNotice가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.finalNotice && vm.finalNotice.length > 0);
  });

  it('finalNotice가 별도 승인 전까지 전환 불가 의미를 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.finalNotice.includes('별도 명시 승인') || vm.finalNotice.includes('별도'));
  });

  it('finalNotice가 실행 준비가 아님을 명시해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    assert.ok(vm.finalNotice.includes('실행 준비가 아닙니다'));
  });

  it('모든 item에 label과 description이 있어야 함 (finalStatusSummaryItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.finalStatusSummaryItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (closureReviewStateItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.closureReviewStateItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (nonReleaseStateItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.nonReleaseStateItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (notTransitionReadyItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView();
    for (const item of vm.notTransitionReadyItems) {
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
