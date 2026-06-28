import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalPendingApprovalFreezeRegisterView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-pending-approval-freeze-register-view.service';

const mockJob = {};

describe('Task 233 Naver API Connection Approval Pending Approval Freeze Register View', () => {
  const view = buildNaverApiConnectionApprovalPendingApprovalFreezeRegisterView(mockJob);

  it('status === PENDING_APPROVAL_FREEZE_REGISTERED', () => {
    assert.strictEqual(view.status, 'PENDING_APPROVAL_FREEZE_REGISTERED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isPendingApprovalFreezeRegistered === true', () => {
    assert.strictEqual(view.isPendingApprovalFreezeRegistered, true);
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

  it('freezeItems에 12개 이상 항목이 있음', () => {
    assert.ok(view.freezeItems.length >= 12);
  });

  it('freezeItems에 AUDIT_INDEX_CONFIRMED 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'AUDIT_INDEX_CONFIRMED');
    assert.ok(found, 'AUDIT_INDEX_CONFIRMED 상태가 freezeItems에 없습니다.');
  });

  it('freezeItems에 READ_ONLY_CONFIRMED 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'READ_ONLY_CONFIRMED');
    assert.ok(found, 'READ_ONLY_CONFIRMED 상태가 freezeItems에 없습니다.');
  });

  it('freezeItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 freezeItems에 없습니다.');
  });

  it('freezeItems에 BLOCKED 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'BLOCKED');
    assert.ok(found, 'BLOCKED 상태가 freezeItems에 없습니다.');
  });

  it('freezeItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 freezeItems에 없습니다.');
  });

  it('freezeItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 freezeItems에 없습니다.');
  });

  it('freezeItems에 LOCKED 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 freezeItems에 없습니다.');
  });

  it('freezeItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.freezeItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 freezeItems에 없습니다.');
  });

  it('Task 215~232 read-only 흐름 요약 항목이 포함됨', () => {
    const found = view.freezeItems.some(i =>
      i.freezeItem.includes('Task 215') || i.freezeItem.includes('215~232') || i.freezeItem.includes('승인 준비 흐름')
    );
    assert.ok(found, 'Task 215~232 read-only 흐름 요약 항목이 freezeItems에 없습니다.');
  });

  it('Read-Only Audit Index (Task 232) 항목이 포함됨', () => {
    const found = view.freezeItems.some(i =>
      i.freezeItem.includes('Audit Index') || i.freezeItem.includes('232') || i.status === 'AUDIT_INDEX_CONFIRMED'
    );
    assert.ok(found, 'Audit Index 항목이 freezeItems에 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.freezeItems.some(i =>
      (i.freezeItem.includes('Token') || i.freezeItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 freezeItems에 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.freezeItems.some(i =>
      (i.freezeItem.includes('Worker') || i.freezeItem.includes('Queue') || i.freezeItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 freezeItems에 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.freezeItems.some(i =>
      (i.freezeItem.includes('DB') || i.freezeItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 freezeItems에 없습니다.');
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
