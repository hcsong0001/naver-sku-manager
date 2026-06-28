import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalUserReviewReadinessVerdictView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-user-review-readiness-verdict-view.service';

describe('Task 227 Naver API Connection Approval User Review Readiness Verdict View', () => {
  const job = { id: 'test-job-227' };
  const view = buildNaverApiConnectionApprovalUserReviewReadinessVerdictView(job);

  it('status === USER_REVIEW_READY_NOT_APPROVED', () => {
    assert.strictEqual(view.status, 'USER_REVIEW_READY_NOT_APPROVED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isUserReviewReady === true', () => {
    assert.strictEqual(view.isUserReviewReady, true);
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

  it('verdictItems에 13개 항목이 있음', () => {
    assert.ok(view.verdictItems.length >= 13);
  });

  it('verdictItems에 READY_FOR_USER_REVIEW 상태가 포함됨', () => {
    const found = view.verdictItems.some(i => i.status === 'READY_FOR_USER_REVIEW');
    assert.ok(found, 'READY_FOR_USER_REVIEW 상태가 없음');
  });

  it('verdictItems에 SEALED 상태가 포함됨', () => {
    const found = view.verdictItems.some(i => i.status === 'SEALED');
    assert.ok(found, 'SEALED 상태가 없음');
  });

  it('verdictItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.verdictItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 없음');
  });

  it('verdictItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.verdictItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 없음');
  });

  it('verdictItems에 LOCKED 상태가 포함됨', () => {
    const found = view.verdictItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 없음');
  });

  it('verdictItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.verdictItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 없음');
  });

  it('Token 발급 항목은 LOCKED', () => {
    const item = view.verdictItems.find(i => i.verdictItem.includes('Token'));
    assert.ok(item, 'Token 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    const item = view.verdictItems.find(i => i.verdictItem.includes('Naver API'));
    assert.ok(item, 'Naver API 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    const item = view.verdictItems.find(i => i.verdictItem.includes('조회/수정'));
    assert.ok(item, '상품 조회/수정 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('가격/재고 변경 항목은 LOCKED', () => {
    const item = view.verdictItems.find(i => i.verdictItem.includes('가격/재고'));
    assert.ok(item, '가격/재고 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const item = view.verdictItems.find(i => i.verdictItem.includes('Worker'));
    assert.ok(item, 'Worker 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('DB write 항목은 LOCKED', () => {
    const item = view.verdictItems.find(i => i.verdictItem.includes('DB write'));
    assert.ok(item, 'DB write 항목 없음');
    assert.strictEqual(item.status, 'LOCKED');
  });

  it('모든 실행 관련 플래그가 false', () => {
    assert.strictEqual(view.isApprovalSubmission, false);
    assert.strictEqual(view.isApprovalSubmitted, false);
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
