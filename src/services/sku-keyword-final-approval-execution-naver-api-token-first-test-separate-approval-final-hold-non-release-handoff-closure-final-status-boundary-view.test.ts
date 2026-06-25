import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-boundary-view.service';

const SERVICE_PATH =
  './src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-boundary-view.service.ts';

describe('Task 88 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Final Status Boundary Read-only Screen Flow', () => {
  it('View Model이 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm);
  });

  it('인수 없이 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView(
        undefined
      );
    assert.ok(vm);
  });

  it('임의 인수로 호출해도 생성되어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView(
        { any: 'data' }
      );
    assert.ok(vm);
  });

  it('title이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.title && vm.title.length > 0);
  });

  it('title이 Closure Final Status Boundary를 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.title.includes('Closure Final Status Boundary'));
  });

  it('statusLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.statusLabel && vm.statusLabel.length > 0);
  });

  it('statusLabel이 READ-ONLY CLOSURE FINAL STATUS BOUNDARY 계열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.statusLabel.includes('CLOSURE FINAL STATUS BOUNDARY'));
  });

  it('statusTone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(['neutral', 'warning', 'blocked'].includes(vm.statusTone));
  });

  it('summary가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.summary && vm.summary.length > 0);
  });

  it('summary가 read-only 흐름 설명을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.summary.includes('read-only'));
  });

  it('taskRangeLabel이 Task 41~87 흐름을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.taskRangeLabel.includes('Task 41~87'));
  });

  it('previousSummaryLabel이 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.previousSummaryLabel && vm.previousSummaryLabel.length > 0);
  });

  it('previousSummaryLabel이 Task 87을 가리켜야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.previousSummaryLabel.includes('Task 87'));
  });

  it('previousSummaryCommit이 e4ae9c8이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.equal(vm.previousSummaryCommit, 'e4ae9c8');
  });

  it('boundarySummaryItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(Array.isArray(vm.boundarySummaryItems));
  });

  it('boundarySummaryItems가 5개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.boundarySummaryItems.length >= 5);
  });

  it('boundarySummaryItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.boundarySummaryItems) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('boundarySummaryItems의 모든 item에 boundaryState가 있어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.boundarySummaryItems) {
      assert.ok(item.boundaryState && item.boundaryState.length > 0);
    }
  });

  it('finalStatusIsNotReleaseItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(Array.isArray(vm.finalStatusIsNotReleaseItems));
  });

  it('finalStatusIsNotReleaseItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.finalStatusIsNotReleaseItems.length >= 4);
  });

  it('finalStatusIsNotReleaseItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.finalStatusIsNotReleaseItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('finalStatusIsNotReleaseItems가 최종 상태 요약이 보류 해제가 아님을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    const combined = vm.finalStatusIsNotReleaseItems.map((i) => i.notReleaseReason).join(' ');
    assert.ok(combined.includes('아님') || combined.includes('미완') || combined.includes('완료'));
  });

  it('summaryReviewNotApprovalItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(Array.isArray(vm.summaryReviewNotApprovalItems));
  });

  it('summaryReviewNotApprovalItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.summaryReviewNotApprovalItems.length >= 4);
  });

  it('summaryReviewNotApprovalItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.summaryReviewNotApprovalItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('summaryReviewNotApprovalItems가 요약 확인과 승인 부여를 분리해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    const combined = vm.summaryReviewNotApprovalItems.map((i) => i.correctInterpretation).join(' ');
    assert.ok(combined.includes('아님') || combined.includes('확인'));
  });

  it('blockedTransitionItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(Array.isArray(vm.blockedTransitionItems));
  });

  it('blockedTransitionItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.blockedTransitionItems.length >= 4);
  });

  it('blockedTransitionItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.blockedTransitionItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('blockedTransitionItems가 보류 해제/제출/실행/token 발급 경로 차단을 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    const combined = vm.blockedTransitionItems.map((i) => i.blockedState).join(' ');
    assert.ok(combined.includes('차단'));
  });

  it('requiredBeforeReleaseItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(Array.isArray(vm.requiredBeforeReleaseItems));
  });

  it('requiredBeforeReleaseItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.requiredBeforeReleaseItems.length >= 4);
  });

  it('requiredBeforeReleaseItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.requiredBeforeReleaseItems) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });

  it('requiredBeforeReleaseItems가 실제 해제 전 필요한 별도 증거를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    const combined = vm.requiredBeforeReleaseItems.map((i) => i.requiredEvidence).join(' ');
    assert.ok(combined.length > 0);
  });

  it('nextSafeReviewItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(Array.isArray(vm.nextSafeReviewItems));
  });

  it('nextSafeReviewItems가 4개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.nextSafeReviewItems.length >= 4);
  });

  it('nextSafeReviewItems의 모든 tone이 허용된 값이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.nextSafeReviewItems) {
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });

  it('nextSafeReviewItems가 다음 안전 검토 단계를 표현해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    const combined = vm.nextSafeReviewItems.map((i) => i.nextOwner).join(' ');
    assert.ok(combined.includes('사람'));
  });

  it('stillForbiddenItems가 배열이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(Array.isArray(vm.stillForbiddenItems));
  });

  it('stillForbiddenItems가 9개 이상이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.stillForbiddenItems.length >= 9);
  });

  it('stillForbiddenItems의 모든 tone이 blocked이어야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.stillForbiddenItems) {
      assert.equal(item.tone, 'blocked');
    }
  });

  it('stillForbiddenItems가 기존 금지 항목을 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    const labels = vm.stillForbiddenItems.map((i) => i.label).join(' ');
    assert.ok(labels.includes('token') || labels.includes('Token'));
  });

  it('finalNotice가 존재해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.finalNotice && vm.finalNotice.length > 0);
  });

  it('finalNotice가 별도 승인 전까지 전환 불가 의미를 포함해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.finalNotice.includes('별도 명시 승인') || vm.finalNotice.includes('별도'));
  });

  it('finalNotice가 실행 준비가 아님을 명시해야 함', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    assert.ok(vm.finalNotice.includes('실행 준비가 아닙니다'));
  });

  it('모든 item에 label과 description이 있어야 함 (boundarySummaryItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.boundarySummaryItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (finalStatusIsNotReleaseItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.finalStatusIsNotReleaseItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (summaryReviewNotApprovalItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.summaryReviewNotApprovalItems) {
      assert.ok(item.label && item.label.length > 0);
      assert.ok(item.description && item.description.length > 0);
    }
  });

  it('모든 item에 label과 description이 있어야 함 (blockedTransitionItems)', () => {
    const vm =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView();
    for (const item of vm.blockedTransitionItems) {
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
