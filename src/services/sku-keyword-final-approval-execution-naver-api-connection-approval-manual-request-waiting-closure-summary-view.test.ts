import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalManualRequestWaitingClosureSummaryView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-manual-request-waiting-closure-summary-view.service';

const mockJob = {};

describe('Task 242 Naver API Connection Approval Manual Request Waiting Closure Summary View', () => {
  const view = buildNaverApiConnectionApprovalManualRequestWaitingClosureSummaryView(mockJob);

  it('status === MANUAL_REQUEST_WAITING_CLOSURE_SUMMARY_READY', () => {
    assert.strictEqual(view.status, 'MANUAL_REQUEST_WAITING_CLOSURE_SUMMARY_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isManualRequestWaitingClosureSummaryReady === true', () => {
    assert.strictEqual(view.isManualRequestWaitingClosureSummaryReady, true);
  });

  it('isManualRequestWaitingFinalBoundaryReady === true', () => {
    assert.strictEqual(view.isManualRequestWaitingFinalBoundaryReady, true);
  });

  it('isManualRequestNonSubmissionSealed === true', () => {
    assert.strictEqual(view.isManualRequestNonSubmissionSealed, true);
  });

  it('isManualApprovalRequestWaiting === true', () => {
    assert.strictEqual(view.isManualApprovalRequestWaiting, true);
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

  it('isApprovalSubmitted === false', () => {
    assert.strictEqual(view.isApprovalSubmitted, false);
  });

  it('isExecutionAllowed === false', () => {
    assert.strictEqual(view.isExecutionAllowed, false);
  });

  it('summaryItems에 17개 이상 항목이 있음', () => {
    assert.ok(view.summaryItems.length >= 17);
  });

  it('summaryItems에 WAITING_NOTICE_CONFIRMED 상태가 포함됨 (Task 239)', () => {
    const found = view.summaryItems.some(i => i.status === 'WAITING_NOTICE_CONFIRMED');
    assert.ok(found, 'WAITING_NOTICE_CONFIRMED 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 NON_SUBMISSION_SEALED 상태가 포함됨 (Task 240)', () => {
    const found = view.summaryItems.some(i => i.status === 'NON_SUBMISSION_SEALED');
    assert.ok(found, 'NON_SUBMISSION_SEALED 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 BOUNDARY_CONFIRMED 상태가 포함됨 (Task 241)', () => {
    const found = view.summaryItems.some(i => i.status === 'BOUNDARY_CONFIRMED');
    assert.ok(found, 'BOUNDARY_CONFIRMED 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 WAITING_MANUAL_REQUEST 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'WAITING_MANUAL_REQUEST');
    assert.ok(found, 'WAITING_MANUAL_REQUEST 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 NOT_PRESENT 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'NOT_PRESENT');
    assert.ok(found, 'NOT_PRESENT 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 NOT_CONNECTED 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'NOT_CONNECTED');
    assert.ok(found, 'NOT_CONNECTED 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 LOCKED 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 summaryItems에 없습니다.');
  });

  it('summaryItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.summaryItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 summaryItems에 없습니다.');
  });

  it('Task 239 대기 안내 항목이 WAITING_NOTICE_CONFIRMED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('Task 239') || i.summaryItem.includes('Waiting Notice')) && i.status === 'WAITING_NOTICE_CONFIRMED'
    );
    assert.ok(found, 'Task 239 WAITING_NOTICE_CONFIRMED 항목이 없습니다.');
  });

  it('Task 240 비제출 봉인 항목이 NON_SUBMISSION_SEALED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('Task 240') || i.summaryItem.includes('Non-Submission')) && i.status === 'NON_SUBMISSION_SEALED'
    );
    assert.ok(found, 'Task 240 NON_SUBMISSION_SEALED 항목이 없습니다.');
  });

  it('Task 241 최종 경계 항목이 BOUNDARY_CONFIRMED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('Task 241') || i.summaryItem.includes('Final Boundary')) && i.status === 'BOUNDARY_CONFIRMED'
    );
    assert.ok(found, 'Task 241 BOUNDARY_CONFIRMED 항목이 없습니다.');
  });

  it('승인 요청 버튼 항목이 NOT_PRESENT', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('승인 요청 버튼') || i.summaryItem.includes('Approval Request Button')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, '승인 요청 버튼 NOT_PRESENT 항목이 없습니다.');
  });

  it('실행 버튼 항목이 NOT_PRESENT', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('실행 버튼') || i.summaryItem.includes('Execution Button')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, '실행 버튼 NOT_PRESENT 항목이 없습니다.');
  });

  it('Submit Action 항목이 NOT_PRESENT', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('Submit') || i.summaryItem.includes('submit')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, 'Submit Action NOT_PRESENT 항목이 없습니다.');
  });

  it('POST API 연결 항목이 NOT_CONNECTED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('POST') || i.summaryItem.includes('API 연결')) && i.status === 'NOT_CONNECTED'
    );
    assert.ok(found, 'POST API NOT_CONNECTED 항목이 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('Token') || i.summaryItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 없습니다.');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('상품') || i.summaryItem.includes('API')) && i.status === 'LOCKED'
    );
    assert.ok(found, '상품 조회/수정 API LOCKED 항목이 없습니다.');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('가격') || i.summaryItem.includes('재고')) && i.status === 'LOCKED'
    );
    assert.ok(found, '가격·재고 변경 LOCKED 항목이 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('Worker') || i.summaryItem.includes('Queue') || i.summaryItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.summaryItems.some(i =>
      (i.summaryItem.includes('DB') || i.summaryItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 없습니다.');
  });

  it('모든 실행 관련 플래그가 false', () => {
    assert.strictEqual(view.isApprovalSubmission, false);
    assert.strictEqual(view.isPostApiConnected, false);
    assert.strictEqual(view.isMutationConnected, false);
    assert.strictEqual(view.isLiveExecutionEnabled, false);
    assert.strictEqual(view.hasApprovalRequestButton, false);
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
