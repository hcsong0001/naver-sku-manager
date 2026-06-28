import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalManualApprovalRequestWaitingNoticeView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-manual-approval-request-waiting-notice-view.service';

const mockJob = {};

describe('Task 239 Naver API Connection Approval Manual Approval Request Waiting Notice View', () => {
  const view = buildNaverApiConnectionApprovalManualApprovalRequestWaitingNoticeView(mockJob);

  it('status === MANUAL_APPROVAL_REQUEST_WAITING', () => {
    assert.strictEqual(view.status, 'MANUAL_APPROVAL_REQUEST_WAITING');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isManualApprovalRequestWaiting === true', () => {
    assert.strictEqual(view.isManualApprovalRequestWaiting, true);
  });

  it('isPreApprovalNonExecutionCertified === true', () => {
    assert.strictEqual(view.isPreApprovalNonExecutionCertified, true);
  });

  it('isManualApprovalRequestSubmitted === false', () => {
    assert.strictEqual(view.isManualApprovalRequestSubmitted, false);
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

  it('noticeItems에 14개 이상 항목이 있음', () => {
    assert.ok(view.noticeItems.length >= 14);
  });

  it('noticeItems에 NON_EXECUTION_CERTIFIED 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'NON_EXECUTION_CERTIFIED');
    assert.ok(found, 'NON_EXECUTION_CERTIFIED 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 WAITING_MANUAL_REQUEST 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'WAITING_MANUAL_REQUEST');
    assert.ok(found, 'WAITING_MANUAL_REQUEST 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 NOT_PRESENT 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'NOT_PRESENT');
    assert.ok(found, 'NOT_PRESENT 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 NOT_CONNECTED 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'NOT_CONNECTED');
    assert.ok(found, 'NOT_CONNECTED 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 LOCKED 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 noticeItems에 없습니다.');
  });

  it('noticeItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.noticeItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 noticeItems에 없습니다.');
  });

  it('Task 238 비실행 인증 확인 항목이 NON_EXECUTION_CERTIFIED', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('비실행 인증') || i.noticeItem.includes('Task 238')) && i.status === 'NON_EXECUTION_CERTIFIED'
    );
    assert.ok(found, 'Task 238 비실행 인증 항목(NON_EXECUTION_CERTIFIED)이 없습니다.');
  });

  it('실행 버튼 항목이 NOT_PRESENT', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('실행 버튼') || i.noticeItem.includes('Execution Button')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, '실행 버튼 NOT_PRESENT 항목이 없습니다.');
  });

  it('Submit Action 항목이 NOT_PRESENT', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('Submit') || i.noticeItem.includes('submit')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, 'Submit Action NOT_PRESENT 항목이 없습니다.');
  });

  it('POST API 연결 항목이 NOT_CONNECTED', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('POST') || i.noticeItem.includes('API 연결')) && i.status === 'NOT_CONNECTED'
    );
    assert.ok(found, 'POST API NOT_CONNECTED 항목이 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('Token') || i.noticeItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 없습니다.');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('상품') || i.noticeItem.includes('API')) && i.status === 'LOCKED'
    );
    assert.ok(found, '상품 조회/수정 API LOCKED 항목이 없습니다.');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('가격') || i.noticeItem.includes('재고')) && i.status === 'LOCKED'
    );
    assert.ok(found, '가격·재고 변경 LOCKED 항목이 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('Worker') || i.noticeItem.includes('Queue') || i.noticeItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.noticeItems.some(i =>
      (i.noticeItem.includes('DB') || i.noticeItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 없습니다.');
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
