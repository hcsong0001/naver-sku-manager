import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalPreApprovalTerminalStateDeclarationView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-pre-approval-terminal-state-declaration-view.service';

const mockJob = {};

describe('Task 237 Naver API Connection Approval Pre-Approval Terminal State Declaration View', () => {
  const view = buildNaverApiConnectionApprovalPreApprovalTerminalStateDeclarationView(mockJob);

  it('status === PRE_APPROVAL_TERMINAL_STATE_DECLARED', () => {
    assert.strictEqual(view.status, 'PRE_APPROVAL_TERMINAL_STATE_DECLARED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isPreApprovalTerminalStateDeclared === true', () => {
    assert.strictEqual(view.isPreApprovalTerminalStateDeclared, true);
  });

  it('isPreApprovalResumeBlocked === true', () => {
    assert.strictEqual(view.isPreApprovalResumeBlocked, true);
  });

  it('isManualResumeBlocked === true', () => {
    assert.strictEqual(view.isManualResumeBlocked, true);
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

  it('terminalStateItems에 13개 이상 항목이 있음', () => {
    assert.ok(view.terminalStateItems.length >= 13);
  });

  it('terminalStateItems에 BLOCKER_CONFIRMED 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'BLOCKER_CONFIRMED');
    assert.ok(found, 'BLOCKER_CONFIRMED 상태가 terminalStateItems에 없습니다.');
  });

  it('terminalStateItems에 TERMINAL_BEFORE_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'TERMINAL_BEFORE_USER_APPROVAL');
    assert.ok(found, 'TERMINAL_BEFORE_USER_APPROVAL 상태가 terminalStateItems에 없습니다.');
  });

  it('terminalStateItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 terminalStateItems에 없습니다.');
  });

  it('terminalStateItems에 BLOCKED 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'BLOCKED');
    assert.ok(found, 'BLOCKED 상태가 terminalStateItems에 없습니다.');
  });

  it('terminalStateItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 terminalStateItems에 없습니다.');
  });

  it('terminalStateItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 terminalStateItems에 없습니다.');
  });

  it('terminalStateItems에 LOCKED 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 terminalStateItems에 없습니다.');
  });

  it('terminalStateItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.terminalStateItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 terminalStateItems에 없습니다.');
  });

  it('Task 236 Resume Blocker 확인 항목이 포함됨', () => {
    const found = view.terminalStateItems.some(i =>
      (i.terminalStateItem.includes('236') || i.terminalStateItem.includes('Resume Blocker') || i.terminalStateItem.includes('Blocker')) && i.status === 'BLOCKER_CONFIRMED'
    );
    assert.ok(found, 'Task 236 Resume Blocker BLOCKER_CONFIRMED 항목이 terminalStateItems에 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.terminalStateItems.some(i =>
      (i.terminalStateItem.includes('Token') || i.terminalStateItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 terminalStateItems에 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.terminalStateItems.some(i =>
      (i.terminalStateItem.includes('Worker') || i.terminalStateItem.includes('Queue') || i.terminalStateItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 terminalStateItems에 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.terminalStateItems.some(i =>
      (i.terminalStateItem.includes('DB') || i.terminalStateItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 terminalStateItems에 없습니다.');
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
