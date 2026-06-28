import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalFreezeIntegrityCheckView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-freeze-integrity-check-view.service';

const mockJob = {};

describe('Task 234 Naver API Connection Approval Freeze Integrity Check View', () => {
  const view = buildNaverApiConnectionApprovalFreezeIntegrityCheckView(mockJob);

  it('status === FREEZE_INTEGRITY_CHECK_PASSED', () => {
    assert.strictEqual(view.status, 'FREEZE_INTEGRITY_CHECK_PASSED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isFreezeIntegrityCheckPassed === true', () => {
    assert.strictEqual(view.isFreezeIntegrityCheckPassed, true);
  });

  it('isPendingApprovalFreezeRegistered === true', () => {
    assert.strictEqual(view.isPendingApprovalFreezeRegistered, true);
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

  it('integrityItems에 12개 이상 항목이 있음', () => {
    assert.ok(view.integrityItems.length >= 12);
  });

  it('integrityItems에 FREEZE_CONFIRMED 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'FREEZE_CONFIRMED');
    assert.ok(found, 'FREEZE_CONFIRMED 상태가 integrityItems에 없습니다.');
  });

  it('integrityItems에 READ_ONLY_CONFIRMED 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'READ_ONLY_CONFIRMED');
    assert.ok(found, 'READ_ONLY_CONFIRMED 상태가 integrityItems에 없습니다.');
  });

  it('integrityItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 integrityItems에 없습니다.');
  });

  it('integrityItems에 BLOCKED 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'BLOCKED');
    assert.ok(found, 'BLOCKED 상태가 integrityItems에 없습니다.');
  });

  it('integrityItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 integrityItems에 없습니다.');
  });

  it('integrityItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 integrityItems에 없습니다.');
  });

  it('integrityItems에 LOCKED 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 integrityItems에 없습니다.');
  });

  it('integrityItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.integrityItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 integrityItems에 없습니다.');
  });

  it('Task 233 Freeze Register 확인 항목이 포함됨', () => {
    const found = view.integrityItems.some(i =>
      (i.integrityItem.includes('Freeze') || i.integrityItem.includes('233')) && i.status === 'FREEZE_CONFIRMED'
    );
    assert.ok(found, 'Task 233 Freeze Register 확인 항목이 integrityItems에 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.integrityItems.some(i =>
      (i.integrityItem.includes('Token') || i.integrityItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 integrityItems에 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.integrityItems.some(i =>
      (i.integrityItem.includes('Worker') || i.integrityItem.includes('Queue') || i.integrityItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 integrityItems에 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.integrityItems.some(i =>
      (i.integrityItem.includes('DB') || i.integrityItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 integrityItems에 없습니다.');
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
