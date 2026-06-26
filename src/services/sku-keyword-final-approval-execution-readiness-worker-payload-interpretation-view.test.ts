import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView } from './sku-keyword-final-approval-execution-readiness-worker-payload-interpretation-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-readiness-worker-payload-interpretation-view.service.ts',
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

  it('Queue Contract Overview builder를 재사용함', () => {
    assert.ok(src.includes('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView'));
  });
});

describe('View Contract 생성', () => {
  it('View Contract가 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION READINESS WORKER PAYLOAD INTERPRETATION 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();
    assert.ok(view.statusLabel.includes('EXECUTION READINESS WORKER PAYLOAD INTERPRETATION'));
  });

  it('finalNotice가 Task 142 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();
    assert.ok(view.finalNotice.includes('Task 142'));
  });
});

describe('taskRangeLabel / previousExecutionReadinessQueueContractOverviewCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();

  it('taskRangeLabel이 Task 41~141 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('141'));
  });

  it('previousExecutionReadinessQueueContractOverviewCommit이 6544f79임', () => {
    assert.strictEqual(view.previousExecutionReadinessQueueContractOverviewCommit, '6544f79');
  });
});

describe('해석 기준 요약', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();

  it('Worker payload 참조 항목이 9개 이상이며 Worker/Queue/Adapter/Token/운영/ENQUEUE를 포함함', () => {
    assert.ok(view.workerPayloadReferenceItems.length >= 9);
    const combined = view.workerPayloadReferenceItems.map((item) => `${item.label} ${item.interpretationState}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('운영'));
    assert.ok(combined.includes('ENQUEUE'));
  });

  it('실행 준비 상태 해석 기준이 10개 이상이며 ENQUEUE_NOT_EXECUTED와 ENQUEUE_NOT_ALLOWED를 포함함', () => {
    assert.ok(view.executionReadinessInterpretationItems.length >= 10);
    const combined = view.executionReadinessInterpretationItems.map((item) => `${item.label} ${item.readinessState}`).join(' ');
    assert.ok(combined.includes('ENQUEUE_NOT_EXECUTED'));
    assert.ok(combined.includes('ENQUEUE_NOT_ALLOWED'));
  });

  it('승인 대기 상태 해석 기준이 5개 이상이며 Token/API/Worker/Queue/Adapter/DB를 포함함', () => {
    assert.ok(view.approvalPendingInterpretationItems.length >= 5);
    const combined = view.approvalPendingInterpretationItems.map((item) => `${item.label} ${item.pendingState}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
  });
});

describe('차단 / 실행 불가 / 오해 방지 / 미연결', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();

  it('차단 상태 해석 기준이 5개 이상이며 BLOCKED와 APPROVAL/EXECUTION을 포함함', () => {
    assert.ok(view.blockedStateInterpretationItems.length >= 5);
    const combined = view.blockedStateInterpretationItems.map((item) => `${item.label} ${item.blockedState}`).join(' ');
    assert.ok(combined.includes('BLOCKED'));
    assert.ok(combined.includes('APPROVAL'));
    assert.ok(combined.includes('EXECUTION'));
  });

  it('실행 불가 사유 해석 기준이 5개 이상이며 ENQUEUE/WORKER/EXECUTION을 포함함', () => {
    assert.ok(view.executionNotAllowedReasonItems.length >= 5);
    const combined = view.executionNotAllowedReasonItems.map((item) => `${item.label} ${item.reasonState}`).join(' ');
    assert.ok(combined.includes('ENQUEUE'));
    assert.ok(combined.includes('WORKER'));
    assert.ok(combined.includes('EXECUTION'));
  });

  it('오해 방지 항목이 5개 이상이며 READ_ONLY/PENDING/BLOCKED/REFERENCE/DISPLAY를 포함함', () => {
    assert.ok(view.misunderstandingPreventionItems.length >= 5);
    const combined = view.misunderstandingPreventionItems.map((item) => `${item.label} ${item.correction}`).join(' ');
    assert.ok(combined.includes('READ_ONLY'));
    assert.ok(combined.includes('PENDING'));
    assert.ok(combined.includes('BLOCKED'));
    assert.ok(combined.includes('REFERENCE'));
    assert.ok(combined.includes('DISPLAY'));
  });

  it('미연결 상태가 6개 이상이며 Worker/Queue/Adapter/Token/Naver API/DB를 포함함', () => {
    assert.ok(view.disconnectedExecutionItems.length >= 6);
    const combined = view.disconnectedExecutionItems.map((item) => `${item.label} ${item.disconnectedState}`).join(' ');
    assert.ok(combined.includes('WORKER'));
    assert.ok(combined.includes('QUEUE'));
    assert.ok(combined.includes('ADAPTER'));
    assert.ok(combined.includes('TOKEN'));
    assert.ok(combined.includes('NAVER_API'));
    assert.ok(combined.includes('DB_WRITE'));
  });
});

describe('금지 항목 / 순수 함수', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();

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

  it('여러 번 호출해도 동일한 구조', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionReadinessQueueContractOverviewCommit, v2.previousExecutionReadinessQueueContractOverviewCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();
    assert.notStrictEqual(v1.workerPayloadReferenceItems, v2.workerPayloadReferenceItems);
    assert.notStrictEqual(v1.disconnectedExecutionItems, v2.disconnectedExecutionItems);
  });
});

describe('금지 패턴 통합 검사', () => {
  it('서비스 파일에 금지 패턴 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    const found = FORBIDDEN_PATTERNS.filter((p) => src.includes(p));
    assert.deepStrictEqual(found, [], `금지 패턴 발견: ${found.join(', ')}`);
  });
});
