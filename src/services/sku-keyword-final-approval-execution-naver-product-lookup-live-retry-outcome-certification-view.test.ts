import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverProductLookupLiveRetryOutcomeCertificationView } from './sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-certification-view.service';

const mkTask273 = (nextDecisionStatus: string) => ({ nextDecisionStatus });

test('NaverProductLookupLiveRetryOutcomeCertificationView (Task 274)', async (t) => {
  await t.test('핵심 상태 및 Certification 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.status, 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_OUTCOME_CERTIFICATION_READY');
    assert.strictEqual(result.isNaverProductLookupLiveRetryOutcomeCertificationReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryOutcomeDecisionGateReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultNonMutationAuditSealed, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('READY → CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.nextDecisionStatus, 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE');
    assert.strictEqual(result.outcomeCertificationStatus, 'CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE');
    assert.strictEqual(result.isCertifiedReadyForReadOnlyProductDataCaptureGate, true);
    assert.strictEqual(result.isCertifiedBlockedByGwIpNotAllowed, false);
    assert.strictEqual(result.isCertifiedBlockedByTokenRetryFailure, false);
    assert.strictEqual(result.isCertifiedBlockedByEnvMissing, false);
    assert.strictEqual(result.isCertifiedBlockedByMissingChannelProductNo, false);
    assert.strictEqual(result.isCertifiedBlockedByProductLookupFailure, false);
  });

  await t.test('BLOCKED_BY_GW_IP_NOT_ALLOWED → CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('BLOCKED_BY_GW_IP_NOT_ALLOWED')
    );

    assert.strictEqual(result.outcomeCertificationStatus, 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isCertifiedBlockedByGwIpNotAllowed, true);
    assert.strictEqual(result.isCertifiedReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('BLOCKED_BY_TOKEN_RETRY_FAILURE → CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('BLOCKED_BY_TOKEN_RETRY_FAILURE')
    );

    assert.strictEqual(result.outcomeCertificationStatus, 'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE');
    assert.strictEqual(result.isCertifiedBlockedByTokenRetryFailure, true);
    assert.strictEqual(result.isCertifiedReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('BLOCKED_BY_ENV_MISSING → CERTIFIED_BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('BLOCKED_BY_ENV_MISSING')
    );

    assert.strictEqual(result.outcomeCertificationStatus, 'CERTIFIED_BLOCKED_BY_ENV_MISSING');
    assert.strictEqual(result.isCertifiedBlockedByEnvMissing, true);
    assert.strictEqual(result.isCertifiedReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO → CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO')
    );

    assert.strictEqual(result.outcomeCertificationStatus, 'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isCertifiedBlockedByMissingChannelProductNo, true);
    assert.strictEqual(result.isCertifiedReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('BLOCKED_BY_PRODUCT_LOOKUP_FAILURE → CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('BLOCKED_BY_PRODUCT_LOOKUP_FAILURE')
    );

    assert.strictEqual(result.outcomeCertificationStatus, 'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
    assert.strictEqual(result.isCertifiedBlockedByProductLookupFailure, true);
    assert.strictEqual(result.isCertifiedReadyForReadOnlyProductDataCaptureGate, false);
  });

  await t.test('null 입력 — 기본값 처리', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(null);

    assert.strictEqual(result.isCertifiedReadyForReadOnlyProductDataCaptureGate, false);
    assert.ok(result.outcomeCertificationStatus.startsWith('CERTIFIED_BLOCKED_'));
  });

  await t.test('승인/잠금 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );

    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isTokenValueIncludedInView, false);
  });

  await t.test('비노출/비수정/비실행 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
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

  await t.test('certificationItems 권장 상태값 포함 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );
    const statuses = result.certificationItems.map((i) => i.status);

    assert.ok(statuses.includes('DECISION_GATE_CONFIRMED'));
    assert.ok(statuses.includes('NON_MUTATION_AUDIT_CONFIRMED'));
    assert.ok(statuses.includes('LIVE_RETRY_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('CERTIFICATION_STATUS_RECORDED'));
    assert.ok(statuses.includes('READY_IF_DECISION_READY'));
    assert.ok(statuses.includes('IP_ALLOWLIST_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('AUTH_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('ENV_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('CHANNEL_PRODUCT_NO_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('PRODUCT_ACCESS_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('SEPARATE_APPROVAL_REQUIRED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_ACCESSED'));
    assert.ok(statuses.includes('NOT_MODIFIED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('certificationItems SEPARATE_APPROVAL_REQUIRED 항목 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
    );
    const sep = result.certificationItems.find((i) => i.status === 'SEPARATE_APPROVAL_REQUIRED');
    assert.ok(sep !== undefined, 'SEPARATE_APPROVAL_REQUIRED 항목 존재');
  });

  await t.test('JSON.stringify — 민감 정보 미포함 검증', () => {
    const result = buildNaverProductLookupLiveRetryOutcomeCertificationView(
      mkTask273('READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE')
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
