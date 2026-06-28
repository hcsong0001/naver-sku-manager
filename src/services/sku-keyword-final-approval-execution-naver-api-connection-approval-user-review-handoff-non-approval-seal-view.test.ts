import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalUserReviewHandoffNonApprovalSealView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-user-review-handoff-non-approval-seal-view.service';

describe('Task 229 Naver API Connection Approval User Review Handoff Non-Approval Seal View', () => {
  const job = { id: 'test-job-229' };
  const view = buildNaverApiConnectionApprovalUserReviewHandoffNonApprovalSealView(job);

  it('status === USER_REVIEW_HANDOFF_NON_APPROVAL_SEALED', () => {
    assert.strictEqual(view.status, 'USER_REVIEW_HANDOFF_NON_APPROVAL_SEALED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isUserReviewHandoffSealed === true', () => {
    assert.strictEqual(view.isUserReviewHandoffSealed, true);
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

  it('sealItems에 13개 항목이 있음', () => {
    assert.ok(view.sealItems.length >= 13);
  });

  it('sealItems에 HANDOFF_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'HANDOFF_CONFIRMED'), 'HANDOFF_CONFIRMED 없음');
  });

  it('sealItems에 NOT_GRANTED 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'NOT_GRANTED'), 'NOT_GRANTED 없음');
  });

  it('sealItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'NOT_SUBMITTED'), 'NOT_SUBMITTED 없음');
  });

  it('sealItems에 NOT_ALLOWED 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'NOT_ALLOWED'), 'NOT_ALLOWED 없음');
  });

  it('sealItems에 READ_ONLY_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'READ_ONLY_CONFIRMED'), 'READ_ONLY_CONFIRMED 없음');
  });

  it('sealItems에 SEALED 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'SEALED'), 'SEALED 없음');
  });

  it('sealItems에 LOCKED 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'LOCKED'), 'LOCKED 없음');
  });

  it('sealItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    assert.ok(view.sealItems.some(i => i.status === 'READ_ONLY_INFO'), 'READ_ONLY_INFO 없음');
  });

  it('Task 225 관련 봉인 항목이 포함됨', () => {
    const found = view.sealItems.some(i => i.sealItem.includes('Task 225') || i.sealItem.includes('Final Packet'));
    assert.ok(found, 'Task 225 항목 없음');
  });

  it('Task 226 관련 봉인 항목이 포함됨', () => {
    const found = view.sealItems.some(i => i.sealItem.includes('Task 226') || i.sealItem.includes('Non-Submission'));
    assert.ok(found, 'Task 226 항목 없음');
  });

  it('Task 227 관련 봉인 항목이 포함됨', () => {
    const found = view.sealItems.some(i => i.sealItem.includes('Task 227') || i.sealItem.includes('Verdict'));
    assert.ok(found, 'Task 227 항목 없음');
  });

  it('Task 228 관련 봉인 항목이 포함됨', () => {
    const found = view.sealItems.some(i => i.sealItem.includes('Task 228') || i.sealItem.includes('검토 인계'));
    assert.ok(found, 'Task 228 항목 없음');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const item = view.sealItems.find(i => i.sealItem.includes('Token'));
    assert.ok(item, 'Token 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('상품 조회/수정 / 가격·재고 항목은 LOCKED', () => {
    const item = view.sealItems.find(i => i.sealItem.includes('조회/수정'));
    assert.ok(item, '상품 조회/수정 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const item = view.sealItems.find(i => i.sealItem.includes('Worker'));
    assert.ok(item, 'Worker 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('DB write 항목은 LOCKED', () => {
    const item = view.sealItems.find(i => i.sealItem.includes('DB write'));
    assert.ok(item, 'DB write 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('POST API 항목은 LOCKED', () => {
    const item = view.sealItems.find(i => i.sealItem.includes('POST API'));
    assert.ok(item, 'POST API 항목 없음');
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
