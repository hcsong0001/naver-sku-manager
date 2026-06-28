import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView } from './sku-keyword-final-approval-execution-naver-token-issuance-http-403-credential-auth-read-only-checklist-view.service';

test('NaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView (Task 269)', async (t) => {
  await t.test('핵심 상태 및 identity 플래그 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();

    assert.strictEqual(result.status, 'NAVER_TOKEN_ISSUANCE_HTTP_403_CREDENTIAL_AUTH_READ_ONLY_CHECKLIST_READY');
    assert.strictEqual(result.isNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveTestHttp403TokenIssuanceFailureDiagnosisReady, true);
    assert.strictEqual(result.failureStage, 'TOKEN_ISSUANCE');
    assert.strictEqual(result.tokenIssuanceHttpStatus, 403);
    assert.strictEqual(result.isHttp403Recorded, true);
    assert.strictEqual(result.isAccessPermissionErrorClassified, true);
  });

  await t.test('자격증명/인증 점검 플래그 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();

    assert.strictEqual(result.isCredentialPresenceCheckOnly, true);
    assert.strictEqual(result.isCredentialValueDisplayed, false);
    assert.strictEqual(result.isBaseUrlValueDisplayed, false);
    assert.strictEqual(result.isBaseUrlHostMatchDisplayedOnly, true);
    assert.strictEqual(result.isTokenUrlPathExpected, true);
    assert.strictEqual(result.isTimestampMillisecondRequired, true);
    assert.strictEqual(result.isSignaturePasswordClientIdTimestampJoinRequired, true);
    assert.strictEqual(result.isBcryptRequired, true);
    assert.strictEqual(result.isBase64Required, true);
    assert.strictEqual(result.isClientSecretDirectTransmissionForbidden, true);
    assert.strictEqual(result.isNaverApiCenterAppApprovalUserCheckRequired, true);
    assert.strictEqual(result.isSmartStoreIntegratedManagerPermissionUserCheckRequired, true);
    assert.strictEqual(result.isTargetStoreAccessPermissionUserCheckRequired, true);
  });

  await t.test('Token 비출력/비저장 플래그 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();

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
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();

    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalled, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
  });

  await t.test('승인/실행 비허용 플래그 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();

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

  await t.test('checkItems 권장 상태값 포함 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();
    const statuses = result.checkItems.map((item) => item.status);

    assert.ok(statuses.includes('HTTP_403_DIAGNOSIS_CONFIRMED'));
    assert.ok(statuses.includes('FAILED_AT_TOKEN_ISSUANCE'));
    assert.ok(statuses.includes('PRESENCE_CHECK_ONLY'));
    assert.ok(statuses.includes('PRESENT_OR_MISSING_ONLY'));
    assert.ok(statuses.includes('MATCH_OR_MISMATCH_ONLY'));
    assert.ok(statuses.includes('EXPECTED_PATH_CONFIRMED'));
    assert.ok(statuses.includes('MILLISECOND_REQUIRED'));
    assert.ok(statuses.includes('CLIENT_ID_TIMESTAMP_JOIN_REQUIRED'));
    assert.ok(statuses.includes('BCRYPT_REQUIRED'));
    assert.ok(statuses.includes('BASE64_REQUIRED'));
    assert.ok(statuses.includes('SECRET_DIRECT_TRANSMISSION_FORBIDDEN'));
    assert.ok(statuses.includes('ACCESS_PERMISSION_ERROR_CLASSIFIED'));
    assert.ok(statuses.includes('USER_PORTAL_CHECK_REQUIRED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('FORBIDDEN'));
    assert.ok(statuses.includes('NOT_ACCESSED'));
    assert.ok(statuses.includes('NOT_MODIFIED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('checkItems 세부 항목 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();
    const findStatus = (s: string) => result.checkItems.find((i) => i.status === s);

    // Env key 점검 항목
    const envItems = result.checkItems.filter((i) => i.status === 'PRESENT_OR_MISSING_ONLY');
    assert.ok(envItems.length >= 3, 'Env key 점검 항목 최소 3개');

    // Base URL Host 점검
    assert.ok(findStatus('MATCH_OR_MISMATCH_ONLY') !== undefined, 'Base URL Host 점검 항목 존재');

    // Token URL Path 점검
    assert.ok(findStatus('EXPECTED_PATH_CONFIRMED') !== undefined, 'Token URL Path 점검 항목 존재');

    // 403 분류
    assert.ok(findStatus('ACCESS_PERMISSION_ERROR_CLASSIFIED') !== undefined, '403 분류 항목 존재');

    // 앱 승인/통합 매니저/스토어 접근 권한 — USER_PORTAL_CHECK_REQUIRED 최소 3개
    const portalItems = result.checkItems.filter((i) => i.status === 'USER_PORTAL_CHECK_REQUIRED');
    assert.ok(portalItems.length >= 3, '사용자 포털 확인 항목 최소 3개');

    // LOCKED 항목 최소 3개
    const lockedItems = result.checkItems.filter((i) => i.status === 'LOCKED');
    assert.ok(lockedItems.length >= 3, 'LOCKED 항목 최소 3개 (Token 재발급, Naver API 재호출, 상품 API 재시도)');

    // FORBIDDEN
    assert.ok(findStatus('FORBIDDEN') !== undefined, 'Secret 노출 FORBIDDEN 항목 존재');
  });

  await t.test('envPresenceCheckResults 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();

    assert.ok(Array.isArray(result.envPresenceCheckResults));
    assert.ok(result.envPresenceCheckResults.length >= 3);
    result.envPresenceCheckResults.forEach((item) => {
      assert.ok(item.key.length > 0, '키 이름 존재');
      assert.ok(item.presence === 'PRESENT' || item.presence === 'MISSING', 'presence 값은 PRESENT 또는 MISSING');
      assert.strictEqual(item.valueDisplayed, false, '값은 출력하지 않음');
    });
  });

  await t.test('민감 정보 비노출 검증 (JSON.stringify)', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();
    const json = JSON.stringify(result);

    // 실제 access_token, client_secret, client_id value, signature, Authorization 값 없음
    assert.ok(!json.includes('access_token:'), 'access_token 값 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 값 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 헤더 없음');
    assert.ok(!json.includes('raw error body'), 'raw error body 없음');

    // 403 상태 코드는 포함
    assert.ok(json.includes('403'), 'HTTP 403 상태 코드 포함');
    assert.ok(json.includes('HTTP_403_DIAGNOSIS_CONFIRMED'), 'HTTP_403_DIAGNOSIS_CONFIRMED 포함');

    // process.env 전체 없음
    assert.ok(!json.includes('PATH='), 'process.env 전체 출력 없음');

    // valueDisplayed: false 확인
    const parsed = JSON.parse(json);
    parsed.envPresenceCheckResults.forEach((item: { valueDisplayed: boolean }) => {
      assert.strictEqual(item.valueDisplayed, false);
    });
  });

  await t.test('userConfirmGuideMessage 내용 검증', () => {
    const result = buildNaverTokenIssuanceHttp403CredentialAuthReadOnlyChecklistView();

    assert.ok(result.userConfirmGuideMessage.includes('HTTP 403'));
    assert.ok(result.userConfirmGuideMessage.includes('커머스API센터'));
    assert.ok(result.userConfirmGuideMessage.includes('스마트스토어센터'));
    assert.ok(result.userConfirmGuideMessage.includes('bcrypt'));
    assert.ok(result.userConfirmGuideMessage.includes('Token 재발급이나 Naver API 재호출을 하지 않습니다'));
  });
});
