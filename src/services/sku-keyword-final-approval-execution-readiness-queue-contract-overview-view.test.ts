import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView } from './sku-keyword-final-approval-execution-readiness-queue-contract-overview-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-readiness-queue-contract-overview-view.service.ts',
  import.meta.url
).pathname.replace(/^\/([A-Z]:)/, '$1');

const FORBIDDEN_PATTERNS = [
  'fetch', 'axios', 'Authorization', 'Bearer',
  'http://', 'https://', '.create(', '.update(', '.delete(',
  'onSubmit', '<form', 'execute(', 'enqueue(',
];

describe('service file — forbidden patterns', () => {
  const src = readFileSync(SERVICE_FILE, 'utf8');
  for (const pattern of FORBIDDEN_PATTERNS) {
    it(`should not contain "${pattern}"`, () => {
      assert.ok(!src.includes(pattern), `금지 패턴 발견: ${pattern}`);
    });
  }
});

describe('재사용 확인', () => {
  const src = readFileSync(SERVICE_FILE, 'utf8');

  it('Queue Payload / Eligibility / Worker Contract builder를 재사용함', () => {
    assert.ok(src.includes('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueuePayloadPreviewView'));
    assert.ok(src.includes('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView'));
    assert.ok(src.includes('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView'));
  });
});

describe('View Contract 생성', () => {
  it('View Contract가 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION READINESS QUEUE CONTRACT OVERVIEW 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();
    assert.ok(view.statusLabel.includes('EXECUTION READINESS QUEUE CONTRACT OVERVIEW'));
  });

  it('finalNotice가 Task 141 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();
    assert.ok(view.finalNotice.includes('Task 141'));
  });
});

describe('taskRangeLabel / previousExecutionReadinessQueueEnqueueEligibilityCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();

  it('taskRangeLabel이 Task 41~140 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('140'));
  });

  it('previousExecutionReadinessQueueEnqueueEligibilityCommit이 4e8ed07임', () => {
    assert.strictEqual(view.previousExecutionReadinessQueueEnqueueEligibilityCommit, '4e8ed07');
  });
});

describe('Queue / Worker / Snapshot / Plan / Risk', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();

  it('Queue Payload 요약이 5개 이상이며 ENQUEUE_NOT_EXECUTED를 포함함', () => {
    assert.ok(view.queuePayloadSummaryItems.length >= 5);
    const combined = view.queuePayloadSummaryItems.map((item) => `${item.label} ${item.payloadState}`).join(' ');
    assert.ok(combined.includes('ENQUEUE_NOT_EXECUTED'));
  });

  it('Queue 적재 가능성 요약이 5개 이상이며 ENQUEUE_NOT_ALLOWED를 포함함', () => {
    assert.ok(view.queueEnqueueEligibilitySummaryItems.length >= 5);
    const combined = view.queueEnqueueEligibilitySummaryItems.map((item) => `${item.label} ${item.eligibilityState}`).join(' ');
    assert.ok(combined.includes('ENQUEUE_NOT_ALLOWED'));
  });

  it('Worker Contract 요약이 7개 이상이며 Worker/Queue/Adapter/Token/운영을 포함함', () => {
    assert.ok(view.workerContractSummaryItems.length >= 7);
    const combined = view.workerContractSummaryItems.map((item) => `${item.label} ${item.workerState}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('운영'));
  });

  it('Snapshot / Plan / Risk 요약이 각각 5개 이상임', () => {
    assert.ok(view.snapshotSummaryItems.length >= 5);
    assert.ok(view.planSummaryItems.length >= 5);
    assert.ok(view.riskSummaryItems.length >= 5);
  });
});

describe('승인 대기 / 차단 / 참조 계약 / 금지 항목', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();

  it('승인 대기 항목이 5개 이상이며 Token/API/Worker/Queue/Adapter/DB를 포함함', () => {
    assert.ok(view.approvalPendingItems.length >= 5);
    const combined = view.approvalPendingItems.map((item) => `${item.label} ${item.pendingState}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
  });

  it('차단 상태가 5개 이상이며 BLOCKED와 APPROVAL/EXECUTION을 포함함', () => {
    assert.ok(view.blockedItems.length >= 5);
    const combined = view.blockedItems.map((item) => `${item.label} ${item.blockedState}`).join(' ');
    assert.ok(combined.includes('BLOCKED'));
    assert.ok(combined.includes('APPROVAL'));
    assert.ok(combined.includes('EXECUTION'));
  });

  it('Queue 참조용 통합 View Contract가 9개 이상이며 Worker/Queue/Adapter/Token/운영/enqueue를 포함함', () => {
    assert.ok(view.queueReferenceContractItems.length >= 9);
    const combined = view.queueReferenceContractItems.map((item) => `${item.label} ${item.referenceValue}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('운영'));
    assert.ok(combined.includes('ENQUEUE'));
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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionReadinessQueueEnqueueEligibilityCommit, v2.previousExecutionReadinessQueueEnqueueEligibilityCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView();
    assert.notStrictEqual(v1.queuePayloadSummaryItems, v2.queuePayloadSummaryItems);
    assert.notStrictEqual(v1.queueReferenceContractItems, v2.queueReferenceContractItems);
  });
});

describe('금지 패턴 통합 검사', () => {
  it('서비스 파일에 금지 패턴 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    const found = FORBIDDEN_PATTERNS.filter((p) => src.includes(p));
    assert.deepStrictEqual(found, [], `금지 패턴 발견: ${found.join(', ')}`);
  });
});
