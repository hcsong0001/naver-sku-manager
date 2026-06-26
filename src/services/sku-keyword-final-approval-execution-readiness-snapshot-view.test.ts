import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView } from './sku-keyword-final-approval-execution-readiness-snapshot-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-readiness-snapshot-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION READINESS SNAPSHOT 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();
    assert.ok(view.statusLabel.includes('EXECUTION READINESS SNAPSHOT'));
  });

  it('finalNotice가 Task 134 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();
    assert.ok(view.finalNotice.includes('Task 134'));
  });
});

describe('taskRangeLabel / previousExecutionArchitectureApprovalSubmissionHoldSealCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();

  it('taskRangeLabel이 Task 41~133 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('133'));
  });

  it('previousExecutionArchitectureApprovalSubmissionHoldSealCommit이 be0d288임', () => {
    assert.strictEqual(view.previousExecutionArchitectureApprovalSubmissionHoldSealCommit, 'be0d288');
  });
});

describe('executionReadinessSnapshotSummaryItems / inactiveExecutionComponentItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();

  it('스냅샷 요약 항목이 5개 이상이고 snapshotState를 가짐', () => {
    assert.ok(view.executionReadinessSnapshotSummaryItems.length >= 5);
    for (const item of view.executionReadinessSnapshotSummaryItems) {
      assert.ok(item.snapshotState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('비활성 구성 요소가 6개 이상이며 Worker/Queue/Adapter/Token/API/DB를 포함함', () => {
    assert.ok(view.inactiveExecutionComponentItems.length >= 6);
    const combined = view.inactiveExecutionComponentItems.map((item) => `${item.label} ${item.inactiveState}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('DB'));
  });
});

describe('approvalPendingComponentItems / blockedExecutionComponentItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();

  it('승인 대기 구성 요소가 6개 이상임', () => {
    assert.ok(view.approvalPendingComponentItems.length >= 6);
  });

  it('차단 구성 요소가 6개 이상이며 Release/Submit/Execute/Token/외부/운영을 포함함', () => {
    assert.ok(view.blockedExecutionComponentItems.length >= 6);
    const combined = view.blockedExecutionComponentItems.map((item) => `${item.label} ${item.blockedState}`).join(' ');
    assert.ok(combined.includes('Release'));
    assert.ok(combined.includes('Submit'));
    assert.ok(combined.includes('Execute'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('외부'));
    assert.ok(combined.includes('운영'));
  });
});

describe('workerQueueReferenceReadinessItems / executionReadinessSnapshotBoundaryItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();

  it('참조 메타데이터 항목이 5개 이상이며 Worker/Queue/read-only/Adapter/Token을 포함함', () => {
    assert.ok(view.workerQueueReferenceReadinessItems.length >= 5);
    const combined = view.workerQueueReferenceReadinessItems.map((item) => `${item.label} ${item.referenceValue}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('read-only'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
  });

  it('경계 상태 항목이 4개 이상이며 테스트/운영 DB, read-only, 승인, 롤백을 포함함', () => {
    assert.ok(view.executionReadinessSnapshotBoundaryItems.length >= 4);
    const combined = view.executionReadinessSnapshotBoundaryItems.map((item) => `${item.label} ${item.boundaryState}`).join(' ');
    assert.ok(combined.includes('테스트 DB'));
    assert.ok(combined.includes('운영 DB'));
    assert.ok(combined.includes('read-only'));
    assert.ok(combined.includes('승인'));
    assert.ok(combined.includes('롤백'));
  });
});

describe('nextSafeReviewItems / stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();

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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionArchitectureApprovalSubmissionHoldSealCommit, v2.previousExecutionArchitectureApprovalSubmissionHoldSealCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView();
    assert.notStrictEqual(v1.executionReadinessSnapshotSummaryItems, v2.executionReadinessSnapshotSummaryItems);
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
