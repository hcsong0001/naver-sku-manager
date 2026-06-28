import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalPreApprovalResumeBlockerView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-pre-approval-resume-blocker-view.service';

const mockJob = {};

describe('Task 236 Naver API Connection Approval Pre-Approval Resume Blocker View', () => {
  const view = buildNaverApiConnectionApprovalPreApprovalResumeBlockerView(mockJob);

  it('status === PRE_APPROVAL_RESUME_BLOCKED', () => {
    assert.strictEqual(view.status, 'PRE_APPROVAL_RESUME_BLOCKED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isPreApprovalResumeBlocked === true', () => {
    assert.strictEqual(view.isPreApprovalResumeBlocked, true);
  });

  it('isFrozenStateEvidenceSnapshotReady === true', () => {
    assert.strictEqual(view.isFrozenStateEvidenceSnapshotReady, true);
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

  it('blockerItems에 12개 이상 항목이 있음', () => {
    assert.ok(view.blockerItems.length >= 12);
  });

  it('blockerItems에 EVIDENCE_CONFIRMED 상태가 포함됨', () => {
    const found = view.blockerItems.some(i => i.status === 'EVIDENCE_CONFIRMED');
    assert.ok(found, 'EVIDENCE_CONFIRMED 상태가 blockerItems에 없습니다.');
  });

  it('blockerItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.blockerItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 blockerItems에 없습니다.');
  });

  it('blockerItems에 BLOCKED 상태가 포함됨', () => {
    const found = view.blockerItems.some(i => i.status === 'BLOCKED');
    assert.ok(found, 'BLOCKED 상태가 blockerItems에 없습니다.');
  });

  it('blockerItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.blockerItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 blockerItems에 없습니다.');
  });

  it('blockerItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.blockerItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 blockerItems에 없습니다.');
  });

  it('blockerItems에 LOCKED 상태가 포함됨', () => {
    const found = view.blockerItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 blockerItems에 없습니다.');
  });

  it('blockerItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.blockerItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 blockerItems에 없습니다.');
  });

  it('Task 235 Snapshot 확인 항목이 포함됨', () => {
    const found = view.blockerItems.some(i =>
      (i.blockerItem.includes('235') || i.blockerItem.includes('Snapshot') || i.blockerItem.includes('Frozen')) && i.status === 'EVIDENCE_CONFIRMED'
    );
    assert.ok(found, 'Task 235 Snapshot EVIDENCE_CONFIRMED 항목이 blockerItems에 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.blockerItems.some(i =>
      (i.blockerItem.includes('Token') || i.blockerItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 blockerItems에 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.blockerItems.some(i =>
      (i.blockerItem.includes('Worker') || i.blockerItem.includes('Queue') || i.blockerItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 blockerItems에 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.blockerItems.some(i =>
      (i.blockerItem.includes('DB') || i.blockerItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 blockerItems에 없습니다.');
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
