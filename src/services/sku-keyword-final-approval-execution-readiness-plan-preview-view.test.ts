import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView } from './sku-keyword-final-approval-execution-readiness-plan-preview-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-readiness-plan-preview-view.service.ts',
  import.meta.url
).pathname.replace(/^\/([A-Z]:)/, '$1');

const FORBIDDEN_PATTERNS = [
  'fetch', 'axios', 'Authorization', 'Bearer',
  'http://', 'https://', '.create(', '.update(', '.delete(',
  'onSubmit', '<form', 'execute(',
];

describe('service file — forbidden patterns', () => {
  const src = readFileSync(SERVICE_FILE, 'utf8');
  for (const pattern of FORBIDDEN_PATTERNS) {
    it(`should not contain "${pattern}"`, () => {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: ${pattern}`);
    });
  }
});

describe('View Model 생성', () => {
  it('View Model이 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION READINESS PLAN PREVIEW 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();
    assert.ok(view.statusLabel.includes('EXECUTION READINESS PLAN PREVIEW'));
  });

  it('finalNotice가 Task 135 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();
    assert.ok(view.finalNotice.includes('Task 135'));
  });
});

describe('taskRangeLabel / previousExecutionReadinessSnapshotCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();

  it('taskRangeLabel이 Task 41~134 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('134'));
  });

  it('previousExecutionReadinessSnapshotCommit이 88925ff임', () => {
    assert.strictEqual(view.previousExecutionReadinessSnapshotCommit, '88925ff');
  });
});

describe('executionReadinessPlanPreviewSummaryItems / nonExecutablePlanStepItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();

  it('계획 요약 항목이 5개 이상이고 previewState를 가짐', () => {
    assert.ok(view.executionReadinessPlanPreviewSummaryItems.length >= 5);
    for (const item of view.executionReadinessPlanPreviewSummaryItems) {
      assert.ok(item.previewState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('아직 실행하지 않는 단계가 6개 이상이며 Worker/Queue/Adapter/Token/API/DB를 포함함', () => {
    assert.ok(view.nonExecutablePlanStepItems.length >= 6);
    const combined = view.nonExecutablePlanStepItems.map((item) => `${item.label} ${item.notExecutableState}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('DB'));
  });
});

describe('approvalVerificationIsolationRequirementItems / connectionPreparationSequenceItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();

  it('승인/검증/격리 조건 항목이 6개 이상임', () => {
    assert.ok(view.approvalVerificationIsolationRequirementItems.length >= 6);
  });

  it('준비 순서 항목이 5개 이상이며 Snapshot/승인/검증/격리/연결을 포함함', () => {
    assert.ok(view.connectionPreparationSequenceItems.length >= 5);
    const combined = view.connectionPreparationSequenceItems.map((item) => `${item.label} ${item.sequenceState}`).join(' ');
    assert.ok(combined.includes('Snapshot'));
    assert.ok(combined.includes('승인'));
    assert.ok(combined.includes('검증'));
    assert.ok(combined.includes('격리'));
    assert.ok(combined.includes('연결'));
  });
});

describe('misunderstandingPreventionItems / executionReadinessPlanPreviewBoundaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();

  it('오해 방지 항목이 5개 이상이며 correction을 가짐', () => {
    assert.ok(view.misunderstandingPreventionItems.length >= 5);
    for (const item of view.misunderstandingPreventionItems) {
      assert.ok(item.correction.length > 0);
    }
  });

  it('경계 항목이 4개 이상이며 테스트/운영 DB, read-only, 승인, 연결을 포함함', () => {
    assert.ok(view.executionReadinessPlanPreviewBoundaryItems.length >= 4);
    const combined = view.executionReadinessPlanPreviewBoundaryItems.map((item) => `${item.label} ${item.boundaryState}`).join(' ');
    assert.ok(combined.includes('테스트 DB'));
    assert.ok(combined.includes('운영 DB'));
    assert.ok(combined.includes('read-only'));
    assert.ok(combined.includes('승인'));
    assert.ok(combined.includes('연결'));
  });
});

describe('nextSafeReviewItems / stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();

  it('다음 검토 항목이 4개 이상임', () => {
    assert.ok(view.nextSafeReviewItems.length >= 4);
    for (const item of view.nextSafeReviewItems) {
      assert.ok(item.nextOwner.length > 0);
    }
  });

  it('금지 항목이 8개 이상이며 token/API/Worker/Queue/DB/가격/재고/POST를 포함함', () => {
    assert.ok(view.stillForbiddenItems.length >= 8);
    const combined = view.stillForbiddenItems.map((item) => `${item.label} ${item.description}`).join(' ');
    assert.ok(combined.includes('token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
    assert.ok(combined.includes('POST'));
  });
});

describe('순수 함수 검증', () => {
  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionReadinessSnapshotCommit, v2.previousExecutionReadinessSnapshotCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView();
    assert.notStrictEqual(v1.executionReadinessPlanPreviewSummaryItems, v2.executionReadinessPlanPreviewSummaryItems);
    assert.notStrictEqual(v1.stillForbiddenItems, v2.stillForbiddenItems);
  });
});

describe('금지 패턴 통합 검사', () => {
  it('서비스 파일에 금지 패턴 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    const found = FORBIDDEN_PATTERNS.filter((p) => src.includes(p));
    assert.deepStrictEqual(found, [], `금지 패턴 발견: ${found.join(', ')}`);
  });
});
