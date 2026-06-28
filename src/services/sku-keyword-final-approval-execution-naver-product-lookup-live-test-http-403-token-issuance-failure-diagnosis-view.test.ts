import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView } from './sku-keyword-final-approval-execution-naver-product-lookup-live-test-http-403-token-issuance-failure-diagnosis-view.service';

test('NaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView (Task 268)', async (t) => {
  await t.test('핵심 상태 플래그 검증', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();

    assert.strictEqual(result.status, 'NAVER_PRODUCT_LOOKUP_LIVE_TEST_HTTP_403_TOKEN_ISSUANCE_FAILURE_DIAGNOSIS_READY');
    assert.strictEqual(result.isNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisReady, true);
    assert.strictEqual(result.liveTestStatus, 'FAILED');
    assert.strictEqual(result.failureStage, 'TOKEN_ISSUANCE');
    assert.strictEqual(result.tokenIssuanceHttpStatus, 403);
    assert.strictEqual(result.productLookupEndpointReached, false);
    assert.strictEqual(result.productLookupApiCalled, false);
    assert.strictEqual(result.isLiveTestFailureRecorded, true);
    assert.strictEqual(result.isFailedAtTokenIssuanceStage, true);
    assert.strictEqual(result.isHttp403Recorded, true);
    assert.strictEqual(result.isAuthenticationDiagnosisRequired, true);
    assert.strictEqual(result.isCredentialReadOnlyCheckRequired, true);
    assert.strictEqual(result.isSignatureRecheckRequired, true);
    assert.strictEqual(result.isPermissionRecheckRequired, true);
    assert.strictEqual(result.isBaseUrlRecheckRequired, true);
  });

  await t.test('Token 비출력/비저장 플래그 검증', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();

    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenValueDisplayed, false);
    assert.strictEqual(result.isTokenReturnedToClient, false);
    assert.strictEqual(result.isTokenLoggedToConsole, false);
    assert.strictEqual(result.isTokenStoredInDb, false);
    assert.strictEqual(result.isTokenStoredInFile, false);
    assert.strictEqual(result.isEnvFileDirectlyAccessed, false);
    assert.strictEqual(result.isEnvFileModified, false);
    assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    assert.strictEqual(result.isSecretLogged, false);
  });

  await t.test('API/DB 비실행 플래그 검증', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();

    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalled, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
  });

  await t.test('승인/실행 비허용 플래그 검증', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();

    assert.strictEqual(result.isAdditionalCallStoppedWithinApprovalScope, true);
    assert.strictEqual(result.isProductLookupRetryApprovalRequired, true);
    assert.strictEqual(result.isProductLookupRetryApprovalGranted, false);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
  });

  await t.test('failureDiagnosisItems 권장 상태값 포함 검증', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();
    const statuses = result.failureDiagnosisItems.map((item) => item.status);

    assert.ok(statuses.includes('LIVE_TEST_FAILURE_RECORDED'));
    assert.ok(statuses.includes('FAILED_AT_TOKEN_ISSUANCE'));
    assert.ok(statuses.includes('HTTP_403_RECORDED'));
    assert.ok(statuses.includes('NOT_REACHED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_STORED'));
    assert.ok(statuses.includes('NOT_STORED_IN_DB'));
    assert.ok(statuses.includes('STOPPED_WITHIN_APPROVAL_SCOPE'));
    assert.ok(statuses.includes('AUTHENTICATION_DIAGNOSIS_REQUIRED'));
    assert.ok(statuses.includes('READ_ONLY_CHECK_REQUIRED'));
    assert.ok(statuses.includes('SIGNATURE_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('PERMISSION_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('BASE_URL_RECHECK_REQUIRED'));
    assert.ok(statuses.includes('FORBIDDEN'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('failureDiagnosisItems 세부 항목 검증', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();
    const findItem = (status: string) => result.failureDiagnosisItems.find((i) => i.status === status);

    assert.ok(findItem('HTTP_403_RECORDED') !== undefined, 'HTTP 상태 항목 존재');
    assert.ok(findItem('FAILED_AT_TOKEN_ISSUANCE') !== undefined, '실패 단계 항목 존재');
    assert.ok(findItem('NOT_REACHED') !== undefined, '상품 조회 endpoint 항목 존재');

    const lockedItems = result.failureDiagnosisItems.filter((i) => i.status === 'LOCKED');
    assert.ok(lockedItems.length >= 3, 'LOCKED 항목 최소 3개 (Token 재발급, Naver API 재호출, 상품 API 재시도)');
  });

  await t.test('민감 정보 비노출 검증 (JSON.stringify)', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();
    const json = JSON.stringify(result);

    // access_token, client_secret, signature, Authorization 값이 포함되지 않음
    assert.ok(!json.includes('access_token:'), 'access_token 값 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 값 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 헤더 없음');
    assert.ok(!json.includes('raw error body'), 'raw error body 없음');

    // 403 상태 코드는 포함되어야 함
    assert.ok(json.includes('403'), 'HTTP 403 상태 코드 포함');
    assert.ok(json.includes('HTTP_403_RECORDED'), 'HTTP_403_RECORDED 상태값 포함');
  });

  await t.test('authenticationRecheckScope 검증', () => {
    const result = buildNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisView();

    assert.ok(Array.isArray(result.authenticationRecheckScope));
    assert.ok(result.authenticationRecheckScope.length >= 7, '최소 7개 점검 범위');
    assert.ok(result.authenticationRecheckScope.some((s) => s.includes('client_id')));
    assert.ok(result.authenticationRecheckScope.some((s) => s.includes('client_secret')));
    assert.ok(result.authenticationRecheckScope.some((s) => s.includes('bcrypt') || s.includes('base64')));
    assert.ok(result.authenticationRecheckScope.some((s) => s.includes('timestamp')));
    assert.ok(result.authenticationRecheckScope.some((s) => s.includes('스마트스토어')));
  });
});
