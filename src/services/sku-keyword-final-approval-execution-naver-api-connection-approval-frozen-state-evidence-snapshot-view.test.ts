import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiConnectionApprovalFrozenStateEvidenceSnapshotView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-frozen-state-evidence-snapshot-view.service';

const mockJob = {};

describe('Task 235 Naver API Connection Approval Frozen State Evidence Snapshot View', () => {
  const view = buildNaverApiConnectionApprovalFrozenStateEvidenceSnapshotView(mockJob);

  it('status === FROZEN_STATE_EVIDENCE_SNAPSHOT_READY', () => {
    assert.strictEqual(view.status, 'FROZEN_STATE_EVIDENCE_SNAPSHOT_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isFrozenStateEvidenceSnapshotReady === true', () => {
    assert.strictEqual(view.isFrozenStateEvidenceSnapshotReady, true);
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

  it('snapshotItems에 13개 이상 항목이 있음', () => {
    assert.ok(view.snapshotItems.length >= 13);
  });

  it('snapshotItems에 EVIDENCE_CONFIRMED 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'EVIDENCE_CONFIRMED');
    assert.ok(found, 'EVIDENCE_CONFIRMED 상태가 snapshotItems에 없습니다.');
  });

  it('snapshotItems에 READ_ONLY_CONFIRMED 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'READ_ONLY_CONFIRMED');
    assert.ok(found, 'READ_ONLY_CONFIRMED 상태가 snapshotItems에 없습니다.');
  });

  it('snapshotItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 snapshotItems에 없습니다.');
  });

  it('snapshotItems에 BLOCKED 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'BLOCKED');
    assert.ok(found, 'BLOCKED 상태가 snapshotItems에 없습니다.');
  });

  it('snapshotItems에 NOT_SUBMITTED 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'NOT_SUBMITTED');
    assert.ok(found, 'NOT_SUBMITTED 상태가 snapshotItems에 없습니다.');
  });

  it('snapshotItems에 NOT_ALLOWED 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'NOT_ALLOWED');
    assert.ok(found, 'NOT_ALLOWED 상태가 snapshotItems에 없습니다.');
  });

  it('snapshotItems에 LOCKED 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 snapshotItems에 없습니다.');
  });

  it('snapshotItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.snapshotItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 snapshotItems에 없습니다.');
  });

  it('Task 233 Freeze Register 증거 항목이 포함됨', () => {
    const found = view.snapshotItems.some(i =>
      (i.snapshotItem.includes('233') || i.snapshotItem.includes('Freeze Register')) && i.status === 'EVIDENCE_CONFIRMED'
    );
    assert.ok(found, 'Task 233 Freeze Register EVIDENCE_CONFIRMED 항목이 snapshotItems에 없습니다.');
  });

  it('Task 234 Freeze Integrity Check 증거 항목이 포함됨', () => {
    const found = view.snapshotItems.some(i =>
      (i.snapshotItem.includes('234') || i.snapshotItem.includes('Integrity Check')) && i.status === 'EVIDENCE_CONFIRMED'
    );
    assert.ok(found, 'Task 234 Integrity Check EVIDENCE_CONFIRMED 항목이 snapshotItems에 없습니다.');
  });

  it('Token / Naver API 항목은 LOCKED', () => {
    const found = view.snapshotItems.some(i =>
      (i.snapshotItem.includes('Token') || i.snapshotItem.includes('Naver API')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token / Naver API LOCKED 항목이 snapshotItems에 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.snapshotItems.some(i =>
      (i.snapshotItem.includes('Worker') || i.snapshotItem.includes('Queue') || i.snapshotItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 snapshotItems에 없습니다.');
  });

  it('운영 DB write 항목은 LOCKED', () => {
    const found = view.snapshotItems.some(i =>
      (i.snapshotItem.includes('DB') || i.snapshotItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, '운영 DB write LOCKED 항목이 snapshotItems에 없습니다.');
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
