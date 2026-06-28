import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceEntryApprovalPacketView } from './sku-keyword-final-approval-execution-naver-token-issuance-entry-approval-packet-view.service';

const mockJob = {};

describe('Task 243 Naver Token Issuance Entry Approval Packet View', () => {
  const view = buildNaverTokenIssuanceEntryApprovalPacketView(mockJob);

  it('status === TOKEN_ISSUANCE_ENTRY_APPROVAL_PACKET_READY', () => {
    assert.strictEqual(view.status, 'TOKEN_ISSUANCE_ENTRY_APPROVAL_PACKET_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isTokenIssuanceEntryApprovalPacketReady === true', () => {
    assert.strictEqual(view.isTokenIssuanceEntryApprovalPacketReady, true);
  });

  it('isManualRequestWaitingClosureSummaryReady === true', () => {
    assert.strictEqual(view.isManualRequestWaitingClosureSummaryReady, true);
  });

  it('isUserApprovalStillRequired === true', () => {
    assert.strictEqual(view.isUserApprovalStillRequired, true);
  });

  it('isNextStepRequiresUserApproval === true', () => {
    assert.strictEqual(view.isNextStepRequiresUserApproval, true);
  });

  it('isEnvPresenceCheckAllowed === false', () => {
    assert.strictEqual(view.isEnvPresenceCheckAllowed, false);
  });

  it('isAuthKeyPresenceCheckAllowed === false', () => {
    assert.strictEqual(view.isAuthKeyPresenceCheckAllowed, false);
  });

  it('isTokenIssuanceAllowed === false', () => {
    assert.strictEqual(view.isTokenIssuanceAllowed, false);
  });

  it('isTokenIssued === false', () => {
    assert.strictEqual(view.isTokenIssued, false);
  });

  it('isTokenStored === false', () => {
    assert.strictEqual(view.isTokenStored, false);
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

  it('packetItems에 14개 이상 항목이 있음', () => {
    assert.ok(view.packetItems.length >= 14);
  });

  it('packetItems에 CLOSURE_CONFIRMED 상태가 포함됨', () => {
    const found = view.packetItems.some(i => i.status === 'CLOSURE_CONFIRMED');
    assert.ok(found, 'CLOSURE_CONFIRMED 상태가 packetItems에 없습니다.');
  });

  it('packetItems에 PENDING_USER_APPROVAL 상태가 포함됨', () => {
    const found = view.packetItems.some(i => i.status === 'PENDING_USER_APPROVAL');
    assert.ok(found, 'PENDING_USER_APPROVAL 상태가 packetItems에 없습니다.');
  });

  it('packetItems에 NEXT_STEP_REQUIRES_APPROVAL 상태가 포함됨', () => {
    const found = view.packetItems.some(i => i.status === 'NEXT_STEP_REQUIRES_APPROVAL');
    assert.ok(found, 'NEXT_STEP_REQUIRES_APPROVAL 상태가 packetItems에 없습니다.');
  });

  it('packetItems에 LOCKED 상태가 포함됨', () => {
    const found = view.packetItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 packetItems에 없습니다.');
  });

  it('packetItems에 NOT_PRESENT 상태가 포함됨', () => {
    const found = view.packetItems.some(i => i.status === 'NOT_PRESENT');
    assert.ok(found, 'NOT_PRESENT 상태가 packetItems에 없습니다.');
  });

  it('packetItems에 NOT_CONNECTED 상태가 포함됨', () => {
    const found = view.packetItems.some(i => i.status === 'NOT_CONNECTED');
    assert.ok(found, 'NOT_CONNECTED 상태가 packetItems에 없습니다.');
  });

  it('packetItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.packetItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 packetItems에 없습니다.');
  });

  it('".env" 존재 확인 항목은 NEXT_STEP_REQUIRES_APPROVAL', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('.env') || i.packetItem.includes('env')) && i.status === 'NEXT_STEP_REQUIRES_APPROVAL'
    );
    assert.ok(found, '".env" 존재 확인 NEXT_STEP_REQUIRES_APPROVAL 항목이 없습니다.');
  });

  it('인증키 존재 확인 항목은 NEXT_STEP_REQUIRES_APPROVAL', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('인증키') || i.packetItem.includes('auth')) && i.status === 'NEXT_STEP_REQUIRES_APPROVAL'
    );
    assert.ok(found, '인증키 존재 확인 NEXT_STEP_REQUIRES_APPROVAL 항목이 없습니다.');
  });

  it('Token 발급 테스트 항목은 LOCKED', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('Token') || i.packetItem.includes('token')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 발급 LOCKED 항목이 없습니다.');
  });

  it('Token 저장 / DB write 항목은 LOCKED', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('저장') || i.packetItem.includes('DB') || i.packetItem.includes('write')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 저장 / DB write LOCKED 항목이 없습니다.');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('Naver API') || i.packetItem.includes('API 호출')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Naver API 호출 LOCKED 항목이 없습니다.');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('상품') || i.packetItem.includes('API')) && i.status === 'LOCKED'
    );
    assert.ok(found, '상품 조회/수정 API LOCKED 항목이 없습니다.');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('가격') || i.packetItem.includes('재고')) && i.status === 'LOCKED'
    );
    assert.ok(found, '가격·재고 변경 LOCKED 항목이 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('Worker') || i.packetItem.includes('Queue') || i.packetItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 없습니다.');
  });

  it('승인/실행 버튼 항목은 NOT_PRESENT', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('버튼') || i.packetItem.includes('Button')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, '승인/실행 버튼 NOT_PRESENT 항목이 없습니다.');
  });

  it('POST API 연결 항목은 NOT_CONNECTED', () => {
    const found = view.packetItems.some(i =>
      (i.packetItem.includes('POST') || i.packetItem.includes('API 연결')) && i.status === 'NOT_CONNECTED'
    );
    assert.ok(found, 'POST API NOT_CONNECTED 항목이 없습니다.');
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
    assert.strictEqual(view.isProductLookupApiCalled, false);
    assert.strictEqual(view.isProductUpdateApiCalled, false);
    assert.strictEqual(view.isPriceOrStockChanged, false);
  });

  it('hasEnvFileAccess === false, hasAuthKeyAccess === false', () => {
    assert.strictEqual(view.hasEnvFileAccess, false);
    assert.strictEqual(view.hasAuthKeyAccess, false);
  });
});
