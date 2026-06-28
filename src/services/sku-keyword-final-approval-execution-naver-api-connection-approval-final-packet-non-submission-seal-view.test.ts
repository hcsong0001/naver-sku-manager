import { strict as assert } from 'assert';
import { test } from 'node:test';
import { buildNaverApiConnectionApprovalFinalPacketNonSubmissionSealView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-final-packet-non-submission-seal-view.service';

test('Task 226 Naver API Connection Approval Final Packet Non-Submission Seal View: 모든 검증 통과', () => {
  const mockJob = { id: 'test-job-226', status: 'FINAL_PACKET_NON_SUBMISSION_SEALED' };
  const view = buildNaverApiConnectionApprovalFinalPacketNonSubmissionSealView(mockJob);

  // 1. View Model 생성
  assert.ok(view, 'View Model이 생성되어야 합니다');

  // 2. status === "FINAL_PACKET_NON_SUBMISSION_SEALED"
  assert.strictEqual(view.status, 'FINAL_PACKET_NON_SUBMISSION_SEALED', 'status는 FINAL_PACKET_NON_SUBMISSION_SEALED이어야 합니다');

  // 3. isBatchJobResultDisplayOnly === true
  assert.strictEqual(view.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly는 true이어야 합니다');

  // 4. isUserApprovalStillRequired === true
  assert.strictEqual(view.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired는 true이어야 합니다');

  // 5. isFinalPacketNonSubmissionSealed === true
  assert.strictEqual(view.isFinalPacketNonSubmissionSealed, true, 'isFinalPacketNonSubmissionSealed는 true이어야 합니다');

  // 6. isFinalPacketSubmitted === false
  assert.strictEqual(view.isFinalPacketSubmitted, false, 'isFinalPacketSubmitted는 false이어야 합니다');

  // 7. isActualApprovalGranted === false
  assert.strictEqual(view.isActualApprovalGranted, false, 'isActualApprovalGranted는 false이어야 합니다');

  // 8. sealItems에 다섯 가지 상태 모두 포함
  const readOnlyConfirmed = view.sealItems.filter((i) => i.status === 'READ_ONLY_CONFIRMED');
  const notSubmitted = view.sealItems.filter((i) => i.status === 'NOT_SUBMITTED');
  const notGranted = view.sealItems.filter((i) => i.status === 'NOT_GRANTED');
  const locked = view.sealItems.filter((i) => i.status === 'LOCKED');
  const readOnly = view.sealItems.filter((i) => i.status === 'READ_ONLY_INFO');

  assert.ok(readOnlyConfirmed.length >= 1, `READ_ONLY_CONFIRMED 항목이 1개 이상 있어야 합니다. 현재: ${readOnlyConfirmed.length}`);
  assert.ok(notSubmitted.length >= 1, `NOT_SUBMITTED 항목이 1개 이상 있어야 합니다. 현재: ${notSubmitted.length}`);
  assert.ok(notGranted.length >= 1, `NOT_GRANTED 항목이 1개 이상 있어야 합니다. 현재: ${notGranted.length}`);
  assert.ok(locked.length >= 1, `LOCKED 항목이 1개 이상 있어야 합니다. 현재: ${locked.length}`);
  assert.ok(readOnly.length >= 1, `READ_ONLY_INFO 항목이 1개 이상 있어야 합니다. 현재: ${readOnly.length}`);

  // 9. Token / Naver API / 상품 조회·수정 / 가격·재고 / Worker·Queue·Adapter / DB write 항목은 LOCKED
  const lockedItems = locked.map((i) => i.sealItem);
  assert.ok(lockedItems.some((s) => s.includes('Token')), 'Token 발급 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((s) => s.includes('Naver API')), 'Naver API 호출 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((s) => s.includes('상품 조회')), '상품 조회 API 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((s) => s.includes('상품 수정')), '상품 수정 API 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((s) => s.includes('가격') || s.includes('재고')), '가격/재고 변경 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((s) => s.includes('Worker') || s.includes('Queue') || s.includes('Adapter')), 'Worker/Queue/Adapter 항목이 LOCKED이어야 합니다');
  assert.ok(lockedItems.some((s) => s.includes('DB')), 'DB write 항목이 LOCKED이어야 합니다');

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

  console.log('[PASS] Task 226 Naver API Connection Approval Final Packet Non-Submission Seal View: 모든 검증 통과');
  console.log(`  sealItems: ${view.sealItems.length}개`);
  console.log(`  READ_ONLY_CONFIRMED: ${readOnlyConfirmed.length}개`);
  console.log(`  NOT_SUBMITTED: ${notSubmitted.length}개`);
  console.log(`  NOT_GRANTED: ${notGranted.length}개`);
  console.log(`  LOCKED: ${locked.length}개`);
  console.log(`  READ_ONLY_INFO: ${readOnly.length}개`);
  console.log(`  status: ${view.status}`);
});
