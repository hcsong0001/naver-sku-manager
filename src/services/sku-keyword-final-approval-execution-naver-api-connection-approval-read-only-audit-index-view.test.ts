import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalReadOnlyAuditIndexView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-read-only-audit-index-view.service';

describe('Task 232 Naver API Connection Approval Read-Only Audit Index View', () => {
  const job = { id: 'test-job-232' };
  const view = buildNaverApiConnectionApprovalReadOnlyAuditIndexView(job);

  it('status === READ_ONLY_AUDIT_INDEX_READY', () => {
    assert.strictEqual(view.status, 'READ_ONLY_AUDIT_INDEX_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isReadOnlyAuditIndexReady === true', () => {
    assert.strictEqual(view.isReadOnlyAuditIndexReady, true);
  });

  it('isFinalUserApprovalHoldSealed === true', () => {
    assert.strictEqual(view.isFinalUserApprovalHoldSealed, true);
  });

  it('isUserApprovalStillRequired === true', () => {
    assert.strictEqual(view.isUserApprovalStillRequired, true);
  });

  it('isAutoProceedBlocked === true', () => {
    assert.strictEqual(view.isAutoProceedBlocked, true);
  });

  it('isActualApprovalGranted === false', () => {
    assert.strictEqual(view.isActualApprovalGranted, false);
  });

  it('isActualApprovalSubmissionAllowed === false', () => {
    assert.strictEqual(view.isActualApprovalSubmissionAllowed, false);
  });

  it('isApprovalSubmitted === false', () => {
    assert.strictEqual(view.isApprovalSubmitted, false);
  });

  it('isExecutionAllowed === false', () => {
    assert.strictEqual(view.isExecutionAllowed, false);
  });

  it('auditIndexItems에 15개 이상 항목이 있음', () => {
    assert.ok(view.auditIndexItems.length >= 15);
  });

  it('auditIndexItems에 READ_ONLY_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'READ_ONLY_CONFIRMED'), 'READ_ONLY_CONFIRMED 없음');
  });

  it('auditIndexItems에 EVIDENCE_CERTIFIED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'EVIDENCE_CERTIFIED'), 'EVIDENCE_CERTIFIED 없음');
  });

  it('auditIndexItems에 REVIEW_BOUNDARY_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'REVIEW_BOUNDARY_CONFIRMED'), 'REVIEW_BOUNDARY_CONFIRMED 없음');
  });

  it('auditIndexItems에 RISK_RECOVERY_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'RISK_RECOVERY_CONFIRMED'), 'RISK_RECOVERY_CONFIRMED 없음');
  });

  it('auditIndexItems에 PACKET_PREVIEW_SEALED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'PACKET_PREVIEW_SEALED'), 'PACKET_PREVIEW_SEALED 없음');
  });

  it('auditIndexItems에 USER_REVIEW_HANDOFF_SEALED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'USER_REVIEW_HANDOFF_SEALED'), 'USER_REVIEW_HANDOFF_SEALED 없음');
  });

  it('auditIndexItems에 CLOSURE_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'CLOSURE_CONFIRMED'), 'CLOSURE_CONFIRMED 없음');
  });

  it('auditIndexItems에 FINAL_HOLD_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'FINAL_HOLD_CONFIRMED'), 'FINAL_HOLD_CONFIRMED 없음');
  });

  it('auditIndexItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'PENDING_USER_APPROVAL'), 'PENDING_USER_APPROVAL 없음');
  });

  it('auditIndexItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'NOT_SUBMITTED'), 'NOT_SUBMITTED 없음');
  });

  it('auditIndexItems에 BLOCKED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'BLOCKED'), 'BLOCKED 없음');
  });

  it('auditIndexItems에 NOT_ALLOWED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'NOT_ALLOWED'), 'NOT_ALLOWED 없음');
  });

  it('auditIndexItems에 LOCKED 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'LOCKED'), 'LOCKED 없음');
  });

  it('auditIndexItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    assert.ok(view.auditIndexItems.some(i => i.status === 'READ_ONLY_INFO'), 'READ_ONLY_INFO 없음');
  });

  it('Task 215~218 구간 항목이 포함됨', () => {
    const found = view.auditIndexItems.some(i => i.auditItem.includes('215'));
    assert.ok(found, 'Task 215~218 항목 없음');
  });

  it('Task 219 증거 인증 항목이 포함됨', () => {
    const found = view.auditIndexItems.some(i => i.auditItem.includes('219') || i.auditItem.includes('Evidence'));
    assert.ok(found, 'Task 219 항목 없음');
  });

  it('Task 231 Final Hold 항목이 포함됨', () => {
    const found = view.auditIndexItems.some(i => i.auditItem.includes('231') || i.auditItem.includes('Final'));
    assert.ok(found, 'Task 231 항목 없음');
  });

  it('Token / Naver API / 상품 API 항목은 LOCKED', () => {
    const item = view.auditIndexItems.find(i => i.auditItem.includes('Token') || i.auditItem.includes('Naver API'));
    assert.ok(item, 'Token/Naver API 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('가격·재고 / Worker / Queue / Adapter / DB write 항목은 LOCKED', () => {
    const item = view.auditIndexItems.find(i => i.auditItem.includes('Worker') || i.auditItem.includes('DB write'));
    assert.ok(item, 'Worker/DB write 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('모든 실행 관련 플래그가 false', () => {
    assert.strictEqual(view.isApprovalSubmission, false);
    assert.strictEqual(view.isPostApiConnected, false);
    assert.strictEqual(view.isMutationConnected, false);
    assert.strictEqual(view.isLiveExecutionEnabled, false);
    assert.strictEqual(view.hasExecutionButton, false);
    assert.strictEqual(view.hasSubmitAction, false);
    assert.strictEqual(view.hasWorkerTrigger, false);
    assert.strictEqual(view.hasQueueTrigger, false);
    assert.strictEqual(view.hasAdapterTrigger, false);
    assert.strictEqual(view.isNaverApiCalled, false);
    assert.strictEqual(view.isTokenIssued, false);
    assert.strictEqual(view.isProductLookupApiCalled, false);
    assert.strictEqual(view.isProductUpdateApiCalled, false);
    assert.strictEqual(view.isPriceOrStockChanged, false);
  });

  it('hasEnvFileAccess === false, hasAuthKeyAccess === false', () => {
    assert.strictEqual(view.hasEnvFileAccess, false);
    assert.strictEqual(view.hasAuthKeyAccess, false);
  });
});
