import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView } from './sku-keyword-final-approval-execution-readiness-risk-review-view.service';

const SERVICE_FILE = new URL(
  './sku-keyword-final-approval-execution-readiness-risk-review-view.service.ts',
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
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();
    assert.ok(view !== null && typeof view === 'object');
  });

  it('statusLabel이 EXECUTION READINESS RISK REVIEW 계열임', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();
    assert.ok(view.statusLabel.includes('EXECUTION READINESS RISK REVIEW'));
  });

  it('finalNotice가 Task 136 내용을 포함함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();
    assert.ok(view.finalNotice.includes('Task 136'));
  });
});

describe('taskRangeLabel / previousExecutionReadinessPlanPreviewCommit', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();

  it('taskRangeLabel이 Task 41~135 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('41') && view.taskRangeLabel.includes('135'));
  });

  it('previousExecutionReadinessPlanPreviewCommit이 b9c701b임', () => {
    assert.strictEqual(view.previousExecutionReadinessPlanPreviewCommit, 'b9c701b');
  });
});

describe('executionReadinessRiskReviewSummaryItems / highRiskPlanZoneItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();

  it('위험 요약 항목이 5개 이상이고 riskState를 가짐', () => {
    assert.ok(view.executionReadinessRiskReviewSummaryItems.length >= 5);
    for (const item of view.executionReadinessRiskReviewSummaryItems) {
      assert.ok(item.riskState.length > 0);
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('고위험 구간 항목이 5개 이상이며 Token/API/Worker/Queue/Adapter/DB를 포함함', () => {
    assert.ok(view.highRiskPlanZoneItems.length >= 5);
    const combined = view.highRiskPlanZoneItems.map((item) => `${item.label} ${item.highRiskState}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
  });
});

describe('componentCautionItems / misunderstandingPreventionItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();

  it('구성 요소 주의점 항목이 6개 이상임', () => {
    assert.ok(view.componentCautionItems.length >= 6);
  });

  it('오해 방지 항목이 5개 이상이며 correction을 가짐', () => {
    assert.ok(view.misunderstandingPreventionItems.length >= 5);
    for (const item of view.misunderstandingPreventionItems) {
      assert.ok(item.correction.length > 0);
    }
  });
});

describe('stillClosedItems / recheckRiskItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();

  it('계속 닫힘 항목이 5개 이상이며 closedState를 가짐', () => {
    assert.ok(view.stillClosedItems.length >= 5);
    for (const item of view.stillClosedItems) {
      assert.ok(item.closedState.length > 0);
    }
  });

  it('재확인 리스크 항목이 5개 이상이며 Token/API/Worker/Queue/Adapter/DB/가격/재고를 포함함', () => {
    assert.ok(view.recheckRiskItems.length >= 5);
    const combined = view.recheckRiskItems.map((item) => `${item.label} ${item.recheckState}`).join(' ');
    assert.ok(combined.includes('Token'));
    assert.ok(combined.includes('API'));
    assert.ok(combined.includes('Worker'));
    assert.ok(combined.includes('Queue'));
    assert.ok(combined.includes('Adapter'));
    assert.ok(combined.includes('DB'));
    assert.ok(combined.includes('가격'));
    assert.ok(combined.includes('재고'));
  });
});

describe('executionReadinessRiskReviewBoundaryItems / nextSafeReviewItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();

  it('경계 항목이 4개 이상이며 테스트/운영 DB, read-only, 승인, 연결을 포함함', () => {
    assert.ok(view.executionReadinessRiskReviewBoundaryItems.length >= 4);
    const combined = view.executionReadinessRiskReviewBoundaryItems.map((item) => `${item.label} ${item.boundaryState}`).join(' ');
    assert.ok(combined.includes('테스트 DB'));
    assert.ok(combined.includes('운영 DB'));
    assert.ok(combined.includes('read-only'));
    assert.ok(combined.includes('승인'));
    assert.ok(combined.includes('연결'));
  });

  it('다음 검토 항목이 4개 이상임', () => {
    assert.ok(view.nextSafeReviewItems.length >= 4);
    for (const item of view.nextSafeReviewItems) {
      assert.ok(item.nextOwner.length > 0);
    }
  });
});

describe('stillForbiddenItems', () => {
  const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();

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
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();
    assert.strictEqual(v1.statusLabel, v2.statusLabel);
    assert.strictEqual(v1.previousExecutionReadinessPlanPreviewCommit, v2.previousExecutionReadinessPlanPreviewCommit);
    assert.strictEqual(v1.stillForbiddenItems.length, v2.stillForbiddenItems.length);
  });

  it('prisma 없음', () => {
    const src = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!src.includes('prisma.') && !src.includes('PrismaClient'));
  });

  it('배열 참조 분리', () => {
    const v1 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();
    const v2 = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView();
    assert.notStrictEqual(v1.executionReadinessRiskReviewSummaryItems, v2.executionReadinessRiskReviewSummaryItems);
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
