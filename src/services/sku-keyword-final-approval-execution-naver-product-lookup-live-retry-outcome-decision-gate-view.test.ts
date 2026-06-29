import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverProductLookupLiveRetryOutcomeDecisionGateView } from './sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-decision-gate-view.service';

// Task 271 결과 mock
const t271Success = { issuanceRetryStatus: 'SUCCESS', productLookupStatus: 'SUCCESS', isGwIpNotAllowedResolved: true };
const t271TokenFailGwBlocked = { issuanceRetryStatus: 'FAILURE', productLookupStatus: 'SKIPPED', isGwIpNotAllowedResolved: false };
const t271TokenFailGwResolved = { issuanceRetryStatus: 'FAILURE', productLookupStatus: 'SKIPPED', isGwIpNotAllowedResolved: true };
const t271EnvMissing = { issuanceRetryStatus: 'ENV_MISSING', productLookupStatus: 'SKIPPED', isGwIpNotAllowedResolved: false };
const t271NoChannelNo = { issuanceRetryStatus: 'SUCCESS', productLookupStatus: 'NO_CHANNEL_PRODUCT_NO', isGwIpNotAllowedResolved: true };
const t271ProductLookupFail = { issuanceRetryStatus: 'SUCCESS', productLookupStatus: 'FAILURE', isGwIpNotAllowedResolved: true };

test('NaverProductLookupLiveRetryOutcomeDecisionGateView (Task 273)', async (t) => {
  await t.test('핵심 상태 및 Gate 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);

    assert.strictEqual(result.status, 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_OUTCOME_DECISION_GATE_READY');
    assert.strictEqual(result.isNaverProductLookupLiveRetryOutcomeDecisionGateReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultNonMutationAuditSealed, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('SUCCESS + SUCCESS → READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);

    assert.strictEqual(result.tokenRetryStatus, 'SUCCESS');
    assert.strictEqual(result.productLookupRetryStatus, 'SUCCESS');
    assert.strictEqual(result.isGwIpNotAllowedResolved, true);
    assert.strictEqual(result.nextDecisionStatus, 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE');
    assert.strictEqual(result.isReadyForReadOnlyProductDataCaptureGate, true);
    assert.strictEqual(result.isBlockedByGwIpNotAllowed, false);
    assert.strictEqual(result.isBlockedByTokenRetryFailure, false);
    assert.strictEqual(result.isBlockedByEnvMissing, false);
    assert.strictEqual(result.isBlockedByMissingChannelProductNo, false);
    assert.strictEqual(result.isBlockedByProductLookupFailure, false);
  });

  await t.test('FAILURE + isGwIpNotAllowedResolved=false → BLOCKED_BY_GW_IP_NOT_ALLOWED', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271TokenFailGwBlocked, null);

    assert.strictEqual(result.tokenRetryStatus, 'FAILURE');
    assert.strictEqual(result.isGwIpNotAllowedResolved, false);
    assert.strictEqual(result.nextDecisionStatus, 'BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isBlockedByGwIpNotAllowed, true);
    assert.strictEqual(result.isReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('FAILURE + isGwIpNotAllowedResolved=true → BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271TokenFailGwResolved, null);

    assert.strictEqual(result.tokenRetryStatus, 'FAILURE');
    assert.strictEqual(result.isGwIpNotAllowedResolved, true);
    assert.strictEqual(result.nextDecisionStatus, 'BLOCKED_BY_TOKEN_RETRY_FAILURE');
    assert.strictEqual(result.isBlockedByTokenRetryFailure, true);
    assert.strictEqual(result.isReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('ENV_MISSING → BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271EnvMissing, null);

    assert.strictEqual(result.tokenRetryStatus, 'ENV_MISSING');
    assert.strictEqual(result.nextDecisionStatus, 'BLOCKED_BY_ENV_MISSING');
    assert.strictEqual(result.isBlockedByEnvMissing, true);
    assert.strictEqual(result.isReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO → BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271NoChannelNo, null);

    assert.strictEqual(result.tokenRetryStatus, 'SUCCESS');
    assert.strictEqual(result.productLookupRetryStatus, 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.nextDecisionStatus, 'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isBlockedByMissingChannelProductNo, true);
    assert.strictEqual(result.isReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('SUCCESS + FAILURE → BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271ProductLookupFail, null);

    assert.strictEqual(result.tokenRetryStatus, 'SUCCESS');
    assert.strictEqual(result.productLookupRetryStatus, 'FAILURE');
    assert.strictEqual(result.nextDecisionStatus, 'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
    assert.strictEqual(result.isBlockedByProductLookupFailure, true);
    assert.strictEqual(result.isReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('null 입력 — 기본값 처리', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(null, null);

    assert.strictEqual(result.tokenRetryStatus, 'FAILURE');
    assert.strictEqual(result.isGwIpNotAllowedResolved, false);
    assert.strictEqual(result.nextDecisionStatus, 'BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);

    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isTokenValueIncludedInView, false);
  });

  await t.test('비노출 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);

    assert.strictEqual(result.isTokenValueDisplayed, false);
    assert.strictEqual(result.isTokenReturnedToClient, false);
    assert.strictEqual(result.isTokenLoggedToConsole, false);
    assert.strictEqual(result.isTokenStored, false);
    assert.strictEqual(result.isTokenStoredInDb, false);
    assert.strictEqual(result.isTokenStoredInFile, false);
    assert.strictEqual(result.isEnvFileDirectlyAccessed, false);
    assert.strictEqual(result.isEnvFileModified, false);
    assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    assert.strictEqual(result.isSecretLogged, false);
    assert.strictEqual(result.isSignatureDisplayed, false);
    assert.strictEqual(result.isAuthorizationHeaderDisplayed, false);
  });

  await t.test('비수정/비실행 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);

    assert.strictEqual(result.isProductLookupApiCalled, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isReadOnlyProductLookupOnly, true);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
  });

  await t.test('실행 잠금 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);

    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
    assert.strictEqual(result.isExecutionAllowed, false);
  });

  await t.test('decisionItems 권장 상태값 포함 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);
    const statuses = result.decisionItems.map((i) => i.status);

    assert.ok(statuses.includes('LIVE_RETRY_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('NON_MUTATION_AUDIT_CONFIRMED'));
    assert.ok(statuses.includes('TOKEN_RETRY_STATUS_RECORDED'));
    assert.ok(statuses.includes('GW_IP_RESOLUTION_STATUS_RECORDED'));
    assert.ok(statuses.includes('PRODUCT_LOOKUP_RETRY_STATUS_RECORDED'));
    assert.ok(statuses.includes('DECISION_STATUS_RECORDED'));
    assert.ok(statuses.includes('READY_IF_LOOKUP_SUCCESS'));
    assert.ok(statuses.includes('RECHECK_IP_ALLOWLIST_REQUIRED'));
    assert.ok(statuses.includes('RECHECK_AUTH_REQUIRED'));
    assert.ok(statuses.includes('RECHECK_ENV_REQUIRED'));
    assert.ok(statuses.includes('RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'));
    assert.ok(statuses.includes('RECHECK_PRODUCT_ACCESS_REQUIRED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_STORED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('decisionItems 다음 단계 항목 PENDING_SEPARATE_APPROVAL 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);
    const pending = result.decisionItems.find((i) => i.status === 'PENDING_SEPARATE_APPROVAL');
    assert.ok(pending !== undefined, 'PENDING_SEPARATE_APPROVAL 항목 존재');
  });

  await t.test('JSON.stringify — 민감 정보 미포함 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeDecisionGateView(t271Success, null);
    const json = JSON.stringify(result);

    assert.ok(!json.includes('access_token:'), 'access_token 값 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 값 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 헤더 없음');
    assert.ok(!json.includes('raw error body'), 'raw error body 없음');
    assert.ok(!json.includes('PATH='), 'process.env 전체 출력 없음');
  });
});
