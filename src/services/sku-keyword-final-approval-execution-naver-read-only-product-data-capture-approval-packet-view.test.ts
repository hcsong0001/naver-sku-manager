import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductDataCaptureApprovalPacketView } from './sku-keyword-final-approval-execution-naver-read-only-product-data-capture-approval-packet-view.service';

const mkTask274 = (outcomeCertificationStatus: string) => ({ outcomeCertificationStatus });

test('NaverReadOnlyProductDataCaptureApprovalPacketView (Task 275)', async (t) => {
  await t.test('핵심 상태 및 Packet 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.status, 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_APPROVAL_PACKET_READY');
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureApprovalPacketReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryOutcomeCertificationReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryOutcomeDecisionGateReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultNonMutationAuditSealed, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('CERTIFIED_READY → APPROVAL_PACKET_READY', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.outcomeCertificationStatus, 'CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE');
    assert.strictEqual(result.readOnlyProductDataCaptureApprovalPacketStatus, 'APPROVAL_PACKET_READY');
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketReady, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByGwIpNotAllowed, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByTokenRetryFailure, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByEnvMissing, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByMissingChannelProductNo, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByProductLookupFailure, false);
  });

  await t.test('CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED → APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED')
    );

    assert.strictEqual(result.readOnlyProductDataCaptureApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByGwIpNotAllowed, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketReady, false);
  });

  await t.test('CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE → APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE')
    );

    assert.strictEqual(result.readOnlyProductDataCaptureApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE');
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByTokenRetryFailure, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketReady, false);
  });

  await t.test('CERTIFIED_BLOCKED_BY_ENV_MISSING → APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_BLOCKED_BY_ENV_MISSING')
    );

    assert.strictEqual(result.readOnlyProductDataCaptureApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING');
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByEnvMissing, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketReady, false);
  });

  await t.test('CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO → APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO')
    );

    assert.strictEqual(result.readOnlyProductDataCaptureApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByMissingChannelProductNo, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketReady, false);
  });

  await t.test('CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE → APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE')
    );

    assert.strictEqual(result.readOnlyProductDataCaptureApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketBlockedByProductLookupFailure, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketReady, false);
  });

  await t.test('null 입력 — 기본값 처리', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(null);

    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalPacketReady, false);
    assert.ok(result.readOnlyProductDataCaptureApprovalPacketStatus.startsWith('APPROVAL_PACKET_BLOCKED_'));
  });

  await t.test('승인 필요/미승인/승인문구 미수신 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalRequired, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalGranted, false);
    assert.strictEqual(result.isUserApprovalPhraseReceivedForReadOnlyProductDataCapture, false);
  });

  await t.test('승인 문구 Task 276 기준 안내 검증 (승인 처리 아님)', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.ok(result.userApprovalPhraseGuide.includes('Task 276'), 'Task 276 기준 문구 포함');
    assert.ok(result.userApprovalPhraseGuide.includes('read-only'), 'read-only 명시');
    assert.ok(result.userApprovalPhraseGuide.includes('Token'), 'Token 비노출 명시');
    assert.strictEqual(result.isReadOnlyProductDataCaptureApprovalGranted, false, '승인으로 처리하지 않음');
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isTokenValueIncludedInView, false);
  });

  await t.test('비노출/비수정/비실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.isTokenValueDisplayed, false);
    assert.strictEqual(result.isTokenReturnedToClient, false);
    assert.strictEqual(result.isTokenLoggedToConsole, false);
    assert.strictEqual(result.isTokenStoredInDb, false);
    assert.strictEqual(result.isTokenStoredInFile, false);
    assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    assert.strictEqual(result.isSecretLogged, false);
    assert.strictEqual(result.isSignatureDisplayed, false);
    assert.strictEqual(result.isAuthorizationHeaderDisplayed, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
    assert.strictEqual(result.isReadOnlyProductLookupOnly, true);
  });

  await t.test('실행 잠금 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.isActualApprovalSubmissionAllowed, false);
    assert.strictEqual(result.isApprovalSubmitted, false);
    assert.strictEqual(result.isPostApiConnected, false);
    assert.strictEqual(result.isMutationConnected, false);
    assert.strictEqual(result.isLiveExecutionEnabled, false);
  });

  await t.test('packetItems 권장 상태값 포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );
    const statuses = result.packetItems.map((i) => i.status);

    assert.ok(statuses.includes('OUTCOME_CERTIFICATION_CONFIRMED'));
    assert.ok(statuses.includes('DECISION_GATE_CONFIRMED'));
    assert.ok(statuses.includes('NON_MUTATION_AUDIT_CONFIRMED'));
    assert.ok(statuses.includes('APPROVAL_PACKET_STATUS_RECORDED'));
    assert.ok(statuses.includes('READY_IF_CERTIFIED_READY'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_AUTH_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_ENV_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'));
    assert.ok(statuses.includes('PENDING_USER_APPROVAL'));
    assert.ok(statuses.includes('LOCKED_UNTIL_USER_APPROVAL'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_ACCESSED'));
    assert.ok(statuses.includes('NOT_MODIFIED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('JSON.stringify — 민감 정보 미포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureApprovalPacketView(
      mkTask274('CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );
    const json = JSON.stringify(result);

    assert.ok(!json.includes('access_token:'), 'access_token 값 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 값 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 헤더 없음');
    assert.ok(!json.includes('raw error body'), 'raw error body 없음');
    assert.ok(!json.includes('PATH='), 'process.env 전체 출력 없음');
  });
});
