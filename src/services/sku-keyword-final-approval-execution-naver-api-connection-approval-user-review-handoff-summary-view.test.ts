import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalUserReviewHandoffSummaryView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-user-review-handoff-summary-view.service';

describe('Task 228 Naver API Connection Approval User Review Handoff Summary View', () => {
  const job = { id: 'test-job-228' };
  const view = buildNaverApiConnectionApprovalUserReviewHandoffSummaryView(job);

  it('status === USER_REVIEW_HANDOFF_READY_NOT_APPROVED', () => {
    assert.strictEqual(view.status, 'USER_REVIEW_HANDOFF_READY_NOT_APPROVED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isUserReviewHandoffReady === true', () => {
    assert.strictEqual(view.isUserReviewHandoffReady, true);
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

  it('handoffItems에 12개 항목이 있음', () => {
    assert.ok(view.handoffItems.length >= 12);
  });

  it('handoffItems에 READY_FOR_USER_REVIEW 상태가 포함됨', () => {
    assert.ok(view.handoffItems.some(i => i.status === 'READY_FOR_USER_REVIEW'), 'READY_FOR_USER_REVIEW 없음');
  });

  it('handoffItems에 INCLUDED_FOR_REVIEW 상태가 포함됨', () => {
    assert.ok(view.handoffItems.some(i => i.status === 'INCLUDED_FOR_REVIEW'), 'INCLUDED_FOR_REVIEW 없음');
  });

  it('handoffItems에 SEALED 상태가 포함됨', () => {
    assert.ok(view.handoffItems.some(i => i.status === 'SEALED'), 'SEALED 없음');
  });

  it('handoffItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    assert.ok(view.handoffItems.some(i => i.status === 'PENDING_USER_APPROVAL'), 'PENDING_USER_APPROVAL 없음');
  });

  it('handoffItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    assert.ok(view.handoffItems.some(i => i.status === 'NOT_SUBMITTED'), 'NOT_SUBMITTED 없음');
  });

  it('handoffItems에 LOCKED 상태가 포함됨', () => {
    assert.ok(view.handoffItems.some(i => i.status === 'LOCKED'), 'LOCKED 없음');
  });

  it('handoffItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    assert.ok(view.handoffItems.some(i => i.status === 'READ_ONLY_INFO'), 'READ_ONLY_INFO 없음');
  });

  it('Task 225 관련 인계 항목이 포함됨', () => {
    const found = view.handoffItems.some(i => i.handoffItem.includes('Task 225') || i.handoffItem.includes('Final Packet'));
    assert.ok(found, 'Task 225 항목 없음');
  });

  it('Task 226 관련 인계 항목이 포함됨', () => {
    const found = view.handoffItems.some(i => i.handoffItem.includes('Task 226') || i.handoffItem.includes('Non-Submission'));
    assert.ok(found, 'Task 226 항목 없음');
  });

  it('Task 227 관련 인계 항목이 포함됨', () => {
    const found = view.handoffItems.some(i => i.handoffItem.includes('Task 227') || i.handoffItem.includes('검토 준비'));
    assert.ok(found, 'Task 227 항목 없음');
  });

  it('Token 발급 항목은 LOCKED', () => {
    const item = view.handoffItems.find(i => i.handoffItem.includes('Token'));
    assert.ok(item, 'Token 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    const item = view.handoffItems.find(i => i.handoffItem.includes('Naver API'));
    assert.ok(item, 'Naver API 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    const item = view.handoffItems.find(i => i.handoffItem.includes('조회/수정'));
    assert.ok(item, '상품 조회/수정 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('가격/재고 변경 항목은 LOCKED', () => {
    const item = view.handoffItems.find(i => i.handoffItem.includes('가격/재고'));
    assert.ok(item, '가격/재고 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const item = view.handoffItems.find(i => i.handoffItem.includes('Worker'));
    assert.ok(item, 'Worker 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const item = view.handoffItems.find(i => i.handoffItem.includes('DB write'));
    assert.ok(item, 'DB write 항목 없음');
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
