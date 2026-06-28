import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalPreApprovalNonExecutionCertificationView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-pre-approval-non-execution-certification-view.service';

const mockJob = {};

describe('Task 238 Naver API Connection Approval Pre-Approval Non-Execution Certification View', () => {
  const view = buildNaverApiConnectionApprovalPreApprovalNonExecutionCertificationView(mockJob);

  it('status === PRE_APPROVAL_NON_EXECUTION_CERTIFIED', () => {
    assert.strictEqual(view.status, 'PRE_APPROVAL_NON_EXECUTION_CERTIFIED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isPreApprovalNonExecutionCertified === true', () => {
    assert.strictEqual(view.isPreApprovalNonExecutionCertified, true);
  });

  it('isPreApprovalTerminalStateDeclared === true', () => {
    assert.strictEqual(view.isPreApprovalTerminalStateDeclared, true);
  });

  it('isUserApprovalStillRequired === true', () => {
    assert.strictEqual(view.isUserApprovalStillRequired, true);
  });

  it('isAutoProceedBlocked === true', () => {
    assert.strictEqual(view.isAutoProceedBlocked, true);
  });

  it('isManualResumeBlocked === true', () => {
    assert.strictEqual(view.isManualResumeBlocked, true);
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

  it('certificationItems에 12개 이상 항목이 있음', () => {
    assert.ok(view.certificationItems.length >= 12);
  });

  it('certificationItems에 TERMINAL_STATE_CONFIRMED 상태가 포함됨', () => {
    const found = view.certificationItems.some(i => i.status === 'TERMINAL_STATE_CONFIRMED');
    assert.ok(found, 'TERMINAL_STATE_CONFIRMED 상태가 certificationItems에 없습니다.');
  });

  it('certificationItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.certificationItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 certificationItems에 없습니다.');
  });

  it('certificationItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.certificationItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 certificationItems에 없습니다.');
  });

  it('certificationItems에 NOT_PRESENT 상태가 포함됨', () => {
    const found = view.certificationItems.some(i => i.status === 'NOT_PRESENT');
    assert.ok(found, 'NOT_PRESENT 상태가 certificationItems에 없습니다.');
  });

  it('certificationItems에 NOT_CONNECTED 상태가 포함됨', () => {
    const found = view.certificationItems.some(i => i.status === 'NOT_CONNECTED');
    assert.ok(found, 'NOT_CONNECTED 상태가 certificationItems에 없습니다.');
  });

  it('certificationItems에 LOCKED 상태가 포함됨', () => {
    const found = view.certificationItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 certificationItems에 없습니다.');
  });

  it('certificationItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.certificationItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 certificationItems에 없습니다.');
  });

  it('실행 버튼 항목이 NOT_PRESENT', () => {
    const found = view.certificationItems.some(i =>
      (i.certificationItem.includes('실행 버튼') || i.certificationItem.includes('Execution Button')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, '실행 버튼 NOT_PRESENT 항목이 certificationItems에 없습니다.');
  });

  it('Submit Action 항목이 NOT_PRESENT', () => {
    const found = view.certificationItems.some(i =>
      (i.certificationItem.includes('Submit') || i.certificationItem.includes('submit')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, 'Submit Action NOT_PRESENT 항목이 certificationItems에 없습니다.');
  });

  it('POST API 연결 항목이 NOT_CONNECTED', () => {
    const found = view.certificationItems.some(i =>
      (i.certificationItem.includes('POST') || i.certificationItem.includes('API 연결')) && i.status === 'NOT_CONNECTED'
    );
    assert.ok(found, 'POST API NOT_CONNECTED 항목이 certificationItems에 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.certificationItems.some(i =>
      (i.certificationItem.includes('Token') || i.certificationItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 certificationItems에 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.certificationItems.some(i =>
      (i.certificationItem.includes('Worker') || i.certificationItem.includes('Queue') || i.certificationItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 certificationItems에 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.certificationItems.some(i =>
      (i.certificationItem.includes('DB') || i.certificationItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 certificationItems에 없습니다.');
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
