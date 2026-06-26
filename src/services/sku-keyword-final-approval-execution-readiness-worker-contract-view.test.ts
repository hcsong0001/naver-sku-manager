import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView } from './sku-keyword-final-approval-execution-readiness-worker-contract-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-readiness-worker-contract-view.service.ts',
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

describe('재사용 확인', () => {
  const src = readFileSync(SERVICE_FILE, 'utf8');

  it('Execution Readiness Overview builder를 재사용함', () => {
    assert.ok(src.includes('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessOverviewView'));
  });
});

describe('View Contract 생성', () => {
  it('View Contract가 생성됨', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION READINESS WORKER CONTRACT 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();
    assert.ok(view.statusLabel.includes('EXECUTION READINESS WORKER CONTRACT'));
  });

  it('finalNotice가 Task 138 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();
    assert.ok(view.finalNotice.includes('Task 138'));
  });
});

describe('taskRangeLabel / previousExecutionReadinessOverviewCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();

  it('taskRangeLabel이 Task 41~137 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('137'));
  });

  it('previousExecutionReadinessOverviewCommit이 4ef8744임', () => {
    assert.strictEqual(view.previousExecutionReadinessOverviewCommit, '4ef8744');
  });
});

describe('Worker / Queue / 차단 조건 요약', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();

  it('Worker 참조 실행 준비 상태가 5개 이상임', () => {
    assert.ok(view.workerReadinessStatusItems.length >= 5);
  });

  it('Queue 연결 전 조건이 5개 이상임', () => {
    assert.ok(view.queueConnectionPreconditionItems.length >= 5);
  });

  it('실행 차단 항목이 5개 이상임', () => {
    assert.ok(view.executionBlockerItems.length >= 5);
  });
});

describe('실행 불가 / 승인 대기 / 미연결', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();

  it('실행 불가 사유가 5개 이상이며 Token/API/Worker/Queue/Adapter/DB를 포함함', () => {
    assert.ok(view.executionNotReadyReasonItems.length >= 5);
    const combined = view.executionNotReadyReasonItems.map((item) => `${item.label} ${item.reasonState}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
  });

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

  it('미연결 구성 요소가 6개 이상이며 Token/Naver API/Worker/Queue/Adapter/DB를 포함함', () => {
    assert.ok(view.disconnectedComponentItems.length >= 6);
    const combined = view.disconnectedComponentItems.map((item) => `${item.label} ${item.disconnectedState} ${item.description}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('Naver API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
  });
});

describe('참조 계약 / 금지 항목', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();

  it('참조 계약 항목이 7개 이상이며 Worker/Queue/Adapter/Token/운영을 포함함', () => {
    assert.ok(view.workerReferenceContractItems.length >= 7);
    const combined = view.workerReferenceContractItems.map((item) => `${item.label} ${item.contractValue}`).join(' ');
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('운영'));
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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionReadinessOverviewCommit, v2.previousExecutionReadinessOverviewCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView();
    assert.notStrictEqual(v1.workerReadinessStatusItems, v2.workerReadinessStatusItems);
    assert.notStrictEqual(v1.workerReferenceContractItems, v2.workerReferenceContractItems);
  });
});

describe('금지 패턴 통합 검사', () => {
  it('서비스 파일에 금지 패턴 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    const found = FORBIDDEN_PATTERNS.filter((p) => src.includes(p));
    assert.deepStrictEqual(found, [], `금지 패턴 발견: ${found.join(', ')}`);
  });
});
