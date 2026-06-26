import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView } from './sku-keyword-final-approval-execution-readiness-queue-enqueue-eligibility-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-readiness-queue-enqueue-eligibility-view.service.ts',
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

  it('Queue Payload Preview / Worker Contract builder를 재사용함', () => {
    assert.ok(src.includes('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueuePayloadPreviewView'));
    assert.ok(src.includes('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView'));
  });
});

describe('View Contract 생성', () => {
  it('View Contract가 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION READINESS QUEUE ENQUEUE ELIGIBILITY 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();
    assert.ok(view.statusLabel.includes('EXECUTION READINESS QUEUE ENQUEUE ELIGIBILITY'));
  });

  it('finalNotice가 Task 140 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();
    assert.ok(view.finalNotice.includes('Task 140'));
  });
});

describe('taskRangeLabel / previousExecutionReadinessQueuePayloadPreviewCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();

  it('taskRangeLabel이 Task 41~139 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('139'));
  });

  it('previousExecutionReadinessQueuePayloadPreviewCommit이 369117f임', () => {
    assert.strictEqual(view.previousExecutionReadinessQueuePayloadPreviewCommit, '369117f');
  });
});

describe('검토 / Payload / Worker Contract', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();

  it('Queue 적재 가능성 검토가 5개 이상이며 ENQUEUE_NOT_ALLOWED를 포함함', () => {
    assert.ok(view.queueEnqueueEligibilityReviewItems.length >= 5);
    const combined = view.queueEnqueueEligibilityReviewItems.map((item) => `${item.label} ${item.reviewState}`).join(' ');
    assert.ok(combined.includes('ENQUEUE_NOT_ALLOWED'));
  });

  it('Payload 준비 여부가 5개 이상이며 ENQUEUE_NOT_EXECUTED를 포함함', () => {
    assert.ok(view.payloadReadinessItems.length >= 5);
    const combined = view.payloadReadinessItems.map((item) => `${item.label} ${item.payloadState}`).join(' ');
    assert.ok(combined.includes('ENQUEUE_NOT_EXECUTED'));
  });

  it('Worker Contract 준비 여부가 5개 이상이며 Worker/Queue/Adapter/Token/DB를 포함함', () => {
    assert.ok(view.workerContractReadinessItems.length >= 5);
    const combined = view.workerContractReadinessItems.map((item) => `${item.label} ${item.contractState}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('DB'));
  });
});

describe('승인/차단 / enqueue 금지 이유 / 금지 항목', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();

  it('승인/차단 상태가 5개 이상이며 Token/API/Worker/Queue/Adapter/DB를 포함함', () => {
    assert.ok(view.approvalAndBlockerItems.length >= 5);
    const combined = view.approvalAndBlockerItems.map((item) => `${item.label} ${item.blockerState}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
  });

  it('enqueue 금지 이유가 5개 이상이며 승인/실행/Worker/운영/enqueue 미수행을 포함함', () => {
    assert.ok(view.enqueueForbiddenReasonItems.length >= 5);
    const combined = view.enqueueForbiddenReasonItems.map((item) => `${item.label} ${item.forbiddenReason}`).join(' ');
    assert.ok(combined.includes('APPROVAL_NOT_GRANTED'));
    assert.ok(combined.includes('EXECUTION_STILL_BLOCKED'));
    assert.ok(combined.includes('WORKER_PATH_NOT_OPEN'));
    assert.ok(combined.includes('LIVE_CONNECTIONS_NOT_APPROVED'));
    assert.ok(combined.includes('ENQUEUE_NOT_EXECUTED_IN_TASK_140'));
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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionReadinessQueuePayloadPreviewCommit, v2.previousExecutionReadinessQueuePayloadPreviewCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView();
    assert.notStrictEqual(v1.queueEnqueueEligibilityReviewItems, v2.queueEnqueueEligibilityReviewItems);
    assert.notStrictEqual(v1.approvalAndBlockerItems, v2.approvalAndBlockerItems);
  });
});

describe('금지 패턴 통합 검사', () => {
  it('서비스 파일에 금지 패턴 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    const found = FORBIDDEN_PATTERNS.filter((p) => src.includes(p));
    assert.deepStrictEqual(found, [], `금지 패턴 발견: ${found.join(', ')}`);
  });
});
