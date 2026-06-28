import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalFinalUserApprovalHoldSealView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-final-user-approval-hold-seal-view.service';

describe('Task 231 Naver API Connection Approval Final User Approval Hold Seal View', () => {
  const job = { id: 'test-job-231' };
  const view = buildNaverApiConnectionApprovalFinalUserApprovalHoldSealView(job);

  it('status === FINAL_USER_APPROVAL_HOLD_SEALED', () => {
    assert.strictEqual(view.status, 'FINAL_USER_APPROVAL_HOLD_SEALED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
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

  it('holdItems에 11개 이상 항목이 있음', () => {
    assert.ok(view.holdItems.length >= 11);
  });

  it('holdItems에 CLOSURE_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.holdItems.some(i => i.status === 'CLOSURE_CONFIRMED'), 'CLOSURE_CONFIRMED 없음');
  });

  it('holdItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    assert.ok(view.holdItems.some(i => i.status === 'PENDING_USER_APPROVAL'), 'PENDING_USER_APPROVAL 없음');
  });

  it('holdItems에 BLOCKED 상태가 포함됨', () => {
    assert.ok(view.holdItems.some(i => i.status === 'BLOCKED'), 'BLOCKED 없음');
  });

  it('holdItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    assert.ok(view.holdItems.some(i => i.status === 'NOT_SUBMITTED'), 'NOT_SUBMITTED 없음');
  });

  it('holdItems에 NOT_ALLOWED 상태가 포함됨', () => {
    assert.ok(view.holdItems.some(i => i.status === 'NOT_ALLOWED'), 'NOT_ALLOWED 없음');
  });

  it('holdItems에 LOCKED 상태가 포함됨', () => {
    assert.ok(view.holdItems.some(i => i.status === 'LOCKED'), 'LOCKED 없음');
  });

  it('holdItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    assert.ok(view.holdItems.some(i => i.status === 'READ_ONLY_INFO'), 'READ_ONLY_INFO 없음');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const item = view.holdItems.find(i => i.holdItem.includes('Token') || i.holdItem.includes('Naver API'));
    assert.ok(item, 'Token/Naver API 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    const item = view.holdItems.find(i => i.holdItem.includes('조회/수정'));
    assert.ok(item, '상품 조회/수정 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    const item = view.holdItems.find(i => i.holdItem.includes('가격'));
    assert.ok(item, '가격·재고 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const item = view.holdItems.find(i => i.holdItem.includes('Worker'));
    assert.ok(item, 'Worker 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const item = view.holdItems.find(i => i.holdItem.includes('DB write'));
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
