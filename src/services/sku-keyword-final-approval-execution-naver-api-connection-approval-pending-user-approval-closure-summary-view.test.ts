import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalPendingUserApprovalClosureSummaryView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-pending-user-approval-closure-summary-view.service';

describe('Task 230 Naver API Connection Approval Pending User Approval Closure Summary View', () => {
  const job = { id: 'test-job-230' };
  const view = buildNaverApiConnectionApprovalPendingUserApprovalClosureSummaryView(job);

  it('status === PENDING_USER_APPROVAL_CLOSURE_READY', () => {
    assert.strictEqual(view.status, 'PENDING_USER_APPROVAL_CLOSURE_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isPendingUserApprovalClosureReady === true', () => {
    assert.strictEqual(view.isPendingUserApprovalClosureReady, true);
  });

  it('isUserApprovalStillRequired === true', () => {
    assert.strictEqual(view.isUserApprovalStillRequired, true);
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

  it('summaryItems에 13개 항목이 있음', () => {
    assert.ok(view.summaryItems.length >= 13);
  });

  it('summaryItems에 CLOSURE_SUMMARY_READY 상태가 포함됨', () => {
    assert.ok(view.summaryItems.some(i => i.status === 'CLOSURE_SUMMARY_READY'), 'CLOSURE_SUMMARY_READY 없음');
  });

  it('summaryItems에 READ_ONLY_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.summaryItems.some(i => i.status === 'READ_ONLY_CONFIRMED'), 'READ_ONLY_CONFIRMED 없음');
  });

  it('summaryItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    assert.ok(view.summaryItems.some(i => i.status === 'PENDING_USER_APPROVAL'), 'PENDING_USER_APPROVAL 없음');
  });

  it('summaryItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    assert.ok(view.summaryItems.some(i => i.status === 'NOT_SUBMITTED'), 'NOT_SUBMITTED 없음');
  });

  it('summaryItems에 NOT_ALLOWED 상태가 포함됨', () => {
    assert.ok(view.summaryItems.some(i => i.status === 'NOT_ALLOWED'), 'NOT_ALLOWED 없음');
  });

  it('summaryItems에 LOCKED 상태가 포함됨', () => {
    assert.ok(view.summaryItems.some(i => i.status === 'LOCKED'), 'LOCKED 없음');
  });

  it('summaryItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    assert.ok(view.summaryItems.some(i => i.status === 'READ_ONLY_INFO'), 'READ_ONLY_INFO 없음');
  });

  it('Task 219~229 흐름 요약 항목이 포함됨', () => {
    const hasFlow = view.summaryItems.some(i => i.summaryItem.includes('Task 215') || i.summaryItem.includes('215~229'));
    assert.ok(hasFlow, 'Task 215~229 흐름 항목 없음');
  });

  it('Evidence Certification (Task 219) 항목이 포함됨', () => {
    const found = view.summaryItems.some(i => i.summaryItem.includes('219') || i.summaryItem.includes('Evidence'));
    assert.ok(found, 'Task 219 항목 없음');
  });

  it('User Decision Gate (Task 220) 항목이 포함됨', () => {
    const found = view.summaryItems.some(i => i.summaryItem.includes('220') || i.summaryItem.includes('Decision Gate'));
    assert.ok(found, 'Task 220 항목 없음');
  });

  it('Task 227~229 흐름 항목이 포함됨', () => {
    const found = view.summaryItems.some(i => i.summaryItem.includes('227') || i.summaryItem.includes('Handoff'));
    assert.ok(found, 'Task 227~229 항목 없음');
  });

  it('Token / Naver API / 상품 API 항목은 LOCKED', () => {
    const item = view.summaryItems.find(i => i.summaryItem.includes('Token') || i.summaryItem.includes('Naver API'));
    assert.ok(item, 'Token/Naver API 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('가격·재고 / Worker / Queue / Adapter / DB write 항목은 LOCKED', () => {
    const item = view.summaryItems.find(i => i.summaryItem.includes('Worker') || i.summaryItem.includes('DB write'));
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
