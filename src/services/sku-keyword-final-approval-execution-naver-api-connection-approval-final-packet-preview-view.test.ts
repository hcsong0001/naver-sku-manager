import { strict as assert } from 'assert';
import { test } from 'node:test';
import { buildNaverApiConnectionApprovalFinalPacketPreviewView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-final-packet-preview-view.service';

test('Task 225 Naver API Connection Approval Final Packet Preview View: 모든 검증 통과', () => {
  const mockJob = { id: 'test-job-225', status: 'FINAL_PACKET_PREVIEW_READY' };
  const view = buildNaverApiConnectionApprovalFinalPacketPreviewView(mockJob);

  // 1. View Model 생성
  assert.ok(view, 'View Model이 생성되어야 합니다');

  // 2. status === "FINAL_PACKET_PREVIEW_READY"
  assert.strictEqual(view.status, 'FINAL_PACKET_PREVIEW_READY', 'status는 FINAL_PACKET_PREVIEW_READY이어야 합니다');

  // 3. isBatchJobResultDisplayOnly === true
  assert.strictEqual(view.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly는 true이어야 합니다');

  // 4. isUserApprovalStillRequired === true
  assert.strictEqual(view.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired는 true이어야 합니다');

  // 5. isFinalPacketPreviewReady === true
  assert.strictEqual(view.isFinalPacketPreviewReady, true, 'isFinalPacketPreviewReady는 true이어야 합니다');

  // 6. isFinalPacketSubmitted === false
  assert.strictEqual(view.isFinalPacketSubmitted, false, 'isFinalPacketSubmitted는 false이어야 합니다');

  // 7. isActualApprovalGranted === false
  assert.strictEqual(view.isActualApprovalGranted, false, 'isActualApprovalGranted는 false이어야 합니다');

  // 8. packetItems에 네 가지 상태 모두 포함
  const pendingApproval = view.packetItems.filter((i) => i.status === 'PENDING_USER_APPROVAL');
  const readyForReview = view.packetItems.filter((i) => i.status === 'READY_FOR_REVIEW');
  const locked = view.packetItems.filter((i) => i.status === 'LOCKED');
  const readOnly = view.packetItems.filter((i) => i.status === 'READ_ONLY_INFO');

  assert.ok(pendingApproval.length >= 1, `PENDING_USER_APPROVAL 항목이 1개 이상 있어야 합니다. 현재: ${pendingApproval.length}`);
  assert.ok(readyForReview.length >= 1, `READY_FOR_REVIEW 항목이 1개 이상 있어야 합니다. 현재: ${readyForReview.length}`);
  assert.ok(locked.length >= 1, `LOCKED 항목이 1개 이상 있어야 합니다. 현재: ${locked.length}`);
  assert.ok(readOnly.length >= 1, `READ_ONLY_INFO 항목이 1개 이상 있어야 합니다. 현재: ${readOnly.length}`);

  // 9. Task 222/223/224 검토 항목 포함
  const allItems = view.packetItems.map((i) => i.packetItem);
  assert.ok(allItems.some((p) => p.includes('222') || p.includes('범위') || p.includes('Matrix')), 'Task 222 Scope Boundary Matrix 항목이 존재해야 합니다');
  assert.ok(allItems.some((p) => p.includes('223') || p.includes('위험') || p.includes('Ledger')), 'Task 223 Risk Acceptance Ledger 항목이 존재해야 합니다');
  assert.ok(allItems.some((p) => p.includes('224') || p.includes('중단') || p.includes('복구')), 'Task 224 Abort Recovery Criteria 항목이 존재해야 합니다');

  // Token / API / Worker / Queue / Adapter / Live / DB write 항목은 LOCKED
  const lockedItems = locked.map((i) => i.packetItem);
  assert.ok(lockedItems.some((p) => p.includes('Token')), 'Token 발급 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((p) => p.includes('Worker') || p.includes('Queue') || p.includes('Adapter')), 'Worker/Queue/Adapter 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((p) => p.includes('Live')), '실제 Live 실행 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((p) => p.includes('DB')), '운영 DB write 항목이 LOCKED이어야 합니다');

  // 10. 모든 실행 관련 플래그 false
  assert.strictEqual(view.isActualApprovalSubmissionAllowed, false, 'isActualApprovalSubmissionAllowed는 false이어야 합니다');
  assert.strictEqual(view.isApprovalSubmission, false, 'isApprovalSubmission은 false이어야 합니다');
  assert.strictEqual(view.isApprovalSubmitted, false, 'isApprovalSubmitted는 false이어야 합니다');
  assert.strictEqual(view.isPostApiConnected, false, 'isPostApiConnected는 false이어야 합니다');
  assert.strictEqual(view.isMutationConnected, false, 'isMutationConnected는 false이어야 합니다');
  assert.strictEqual(view.isLiveExecutionEnabled, false, 'isLiveExecutionEnabled는 false이어야 합니다');
  assert.strictEqual(view.hasExecutionButton, false, 'hasExecutionButton은 false이어야 합니다');
  assert.strictEqual(view.hasSubmitAction, false, 'hasSubmitAction은 false이어야 합니다');
  assert.strictEqual(view.hasWorkerTrigger, false, 'hasWorkerTrigger는 false이어야 합니다');
  assert.strictEqual(view.hasQueueTrigger, false, 'hasQueueTrigger는 false이어야 합니다');
  assert.strictEqual(view.hasAdapterTrigger, false, 'hasAdapterTrigger는 false이어야 합니다');
  assert.strictEqual(view.isNaverApiCalled, false, 'isNaverApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isTokenIssued, false, 'isTokenIssued는 false이어야 합니다');
  assert.strictEqual(view.isProductLookupApiCalled, false, 'isProductLookupApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isProductUpdateApiCalled, false, 'isProductUpdateApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isPriceOrStockChanged, false, 'isPriceOrStockChanged는 false이어야 합니다');

  // 11. ".env" / 인증키 접근 플래그 false
  assert.strictEqual(view.hasEnvFileAccess, false, 'hasEnvFileAccess는 false이어야 합니다');
  assert.strictEqual(view.hasAuthKeyAccess, false, 'hasAuthKeyAccess는 false이어야 합니다');

  console.log('[PASS] Task 225 Naver API Connection Approval Final Packet Preview View: 모든 검증 통과');
  console.log(`  packetItems: ${view.packetItems.length}개`);
  console.log(`  PENDING_USER_APPROVAL: ${pendingApproval.length}개`);
  console.log(`  READY_FOR_REVIEW: ${readyForReview.length}개`);
  console.log(`  LOCKED: ${locked.length}개`);
  console.log(`  READ_ONLY_INFO: ${readOnly.length}개`);
  console.log(`  status: ${view.status}`);
});
