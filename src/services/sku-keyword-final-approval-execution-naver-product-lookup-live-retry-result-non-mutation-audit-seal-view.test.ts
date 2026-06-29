import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverProductLookupLiveRetryResultNonMutationAuditSealView } from './sku-keyword-final-approval-execution-naver-product-lookup-live-retry-result-non-mutation-audit-seal-view.service';

const task271Success = {
  issuanceRetryStatus: 'SUCCESS',
  productLookupStatus: 'SUCCESS',
  isGwIpNotAllowedResolved: true,
};

const task271TokenFailure = {
  issuanceRetryStatus: 'FAILURE',
  productLookupStatus: 'SKIPPED',
  isGwIpNotAllowedResolved: false,
};

const task271EnvMissing = {
  issuanceRetryStatus: 'ENV_MISSING',
  productLookupStatus: 'SKIPPED',
  isGwIpNotAllowedResolved: false,
};

const task271NoChannelNo = {
  issuanceRetryStatus: 'SUCCESS',
  productLookupStatus: 'NO_CHANNEL_PRODUCT_NO',
  isGwIpNotAllowedResolved: true,
};

test('NaverProductLookupLiveRetryResultNonMutationAuditSealView (Task 272)', async (t) => {
  await t.test('핵심 상태 및 봉인 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);

    assert.strictEqual(result.status, 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_RESULT_NON_MUTATION_AUDIT_SEALED');
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultNonMutationAuditSealed, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('Task 271 결과 참조 — SUCCESS 케이스', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);

    assert.strictEqual(result.tokenRetryStatus, 'SUCCESS');
    assert.strictEqual(result.productLookupRetryStatus, 'SUCCESS');
    assert.strictEqual(result.isGwIpNotAllowedResolved, true);
    assert.strictEqual(result.isGwIpResolutionStatusRecorded, true);
    assert.strictEqual(result.isTokenRetryStatusRecorded, true);
    assert.strictEqual(result.isProductLookupRetryStatusRecorded, true);
  });

  await t.test('Task 271 결과 참조 — FAILURE 케이스', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271TokenFailure);

    assert.strictEqual(result.tokenRetryStatus, 'FAILURE');
    assert.strictEqual(result.productLookupRetryStatus, 'SKIPPED_BY_TOKEN_FAILURE');
    assert.strictEqual(result.isGwIpNotAllowedResolved, false);
  });

  await t.test('Task 271 결과 참조 — ENV_MISSING 케이스', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271EnvMissing);

    assert.strictEqual(result.tokenRetryStatus, 'ENV_MISSING');
    assert.strictEqual(result.productLookupRetryStatus, 'SKIPPED_BY_ENV_MISSING');
    assert.strictEqual(result.isGwIpNotAllowedResolved, false);
  });

  await t.test('Task 271 결과 참조 — channelProductNo 없음 케이스', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271NoChannelNo);

    assert.strictEqual(result.tokenRetryStatus, 'SUCCESS');
    assert.strictEqual(result.productLookupRetryStatus, 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isGwIpNotAllowedResolved, true);
  });

  await t.test('null 입력 — 기본값 처리', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(null);

    assert.strictEqual(result.tokenRetryStatus, 'FAILURE');
    assert.ok(
      result.productLookupRetryStatus === 'SKIPPED_BY_TOKEN_FAILURE' ||
      result.productLookupRetryStatus === 'FAILURE' ||
      result.productLookupRetryStatus === 'SKIPPED_BY_ENV_MISSING'
    );
    assert.strictEqual(result.isGwIpNotAllowedResolved, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);

    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isTokenValueIncludedInView, false);
  });

  await t.test('비노출 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);

    assert.strictEqual(result.isTokenValueDisplayed, false);
    assert.strictEqual(result.isTokenReturnedToClient, false);
    assert.strictEqual(result.isTokenLoggedToConsole, false);
    assert.strictEqual(result.isTokenStored, false);
    assert.strictEqual(result.isTokenStoredInDb, false);
    assert.strictEqual(result.isTokenStoredInFile, false);
    assert.strictEqual(result.isEnvFileDirectlyAccessed, false);
    assert.strictEqual(result.isEnvFileModified, false);
    assert.strictEqual(result.isEnvValueDisplayed, false);
    assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    assert.strictEqual(result.isSecretLogged, false);
    assert.strictEqual(result.isSignatureDisplayed, false);
    assert.strictEqual(result.isAuthorizationHeaderDisplayed, false);
    assert.strictEqual(result.hasEnvFileAccess, false);
    assert.strictEqual(result.hasAuthKeyAccess, false);
  });

  await t.test('비수정/비실행 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);

    assert.strictEqual(result.isProductLookupApiCalled, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isReadOnlyProductLookupOnly, true);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
  });

  await t.test('실행 잠금 및 승인 범위 플래그 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);

    assert.strictEqual(result.isActualApprovalSubmissionAllowed, false);
    assert.strictEqual(result.isApprovalSubmitted, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
    assert.strictEqual(result.isAdditionalCallStoppedWithinApprovalScope, true);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
  });

  await t.test('auditItems 권장 상태값 포함 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);
    const statuses = result.auditItems.map((i) => i.status);

    assert.ok(statuses.includes('LIVE_RETRY_RESULT_CONFIRMED'), 'LIVE_RETRY_RESULT_CONFIRMED 포함');
    assert.ok(statuses.includes('TOKEN_RETRY_STATUS_RECORDED'), 'TOKEN_RETRY_STATUS_RECORDED 포함');
    assert.ok(statuses.includes('GW_IP_RESOLUTION_STATUS_RECORDED'), 'GW_IP_RESOLUTION_STATUS_RECORDED 포함');
    assert.ok(statuses.includes('PRODUCT_LOOKUP_RETRY_STATUS_RECORDED'), 'PRODUCT_LOOKUP_RETRY_STATUS_RECORDED 포함');
    assert.ok(statuses.includes('READ_ONLY_LOOKUP_ONLY'), 'READ_ONLY_LOOKUP_ONLY 포함');
    assert.ok(statuses.includes('NOT_DISPLAYED'), 'NOT_DISPLAYED 포함');
    assert.ok(statuses.includes('NOT_RETURNED_TO_CLIENT'), 'NOT_RETURNED_TO_CLIENT 포함');
    assert.ok(statuses.includes('NOT_STORED_IN_DB'), 'NOT_STORED_IN_DB 포함');
    assert.ok(statuses.includes('NOT_STORED_IN_FILE'), 'NOT_STORED_IN_FILE 포함');
    assert.ok(statuses.includes('NOT_LOGGED'), 'NOT_LOGGED 포함');
    assert.ok(statuses.includes('NOT_ACCESSED'), 'NOT_ACCESSED 포함');
    assert.ok(statuses.includes('NOT_MODIFIED'), 'NOT_MODIFIED 포함');
    assert.ok(statuses.includes('NOT_EXECUTED'), 'NOT_EXECUTED 포함');
    assert.ok(statuses.includes('LOCKED'), 'LOCKED 포함');
    assert.ok(statuses.includes('STOPPED_WITHIN_APPROVAL_SCOPE'), 'STOPPED_WITHIN_APPROVAL_SCOPE 포함');
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'), 'PENDING_SEPARATE_APPROVAL 포함');
    assert.ok(statuses.includes('READ_ONLY_INFO'), 'READ_ONLY_INFO 포함');
  });

  await t.test('auditItems 세부 항목 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);
    const notExecutedItems = result.auditItems.filter((i) => i.status === 'NOT_EXECUTED');
    assert.ok(notExecutedItems.length >= 4, 'NOT_EXECUTED 항목 최소 4개 (DB write, 상품수정, 가격, 재고)');

    const notDisplayedItems = result.auditItems.filter((i) => i.status === 'NOT_DISPLAYED');
    assert.ok(notDisplayedItems.length >= 3, 'NOT_DISPLAYED 항목 최소 3개 (Token, 인증키, Signature)');

    const lockedItems = result.auditItems.filter((i) => i.status === 'LOCKED');
    assert.ok(lockedItems.length >= 1, 'LOCKED 항목 최소 1개 (Worker/Queue/Adapter)');
  });

  await t.test('JSON.stringify — 민감 정보 미포함 검증', () => {
    const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(task271Success);
    const json = JSON.stringify(result);

    assert.ok(!json.includes('access_token:'), 'access_token 값 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 값 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 헤더 없음');
    assert.ok(!json.includes('raw error body'), 'raw error body 없음');
    assert.ok(!json.includes('PATH='), 'process.env 전체 출력 없음');
  });

  await t.test('tokenRetryStatus 허용 값 범위 검증', () => {
    const allowed = ['SUCCESS', 'FAILURE', 'ENV_MISSING'];
    for (const input of [task271Success, task271TokenFailure, task271EnvMissing]) {
      const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(input);
      assert.ok(allowed.includes(result.tokenRetryStatus), `tokenRetryStatus 허용값: ${result.tokenRetryStatus}`);
    }
  });

  await t.test('productLookupRetryStatus 허용 값 범위 검증', () => {
    const allowed = ['SUCCESS', 'FAILURE', 'SKIPPED_BY_TOKEN_FAILURE', 'SKIPPED_BY_ENV_MISSING', 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO'];
    for (const input of [task271Success, task271TokenFailure, task271EnvMissing, task271NoChannelNo]) {
      const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(input);
      assert.ok(allowed.includes(result.productLookupRetryStatus), `productLookupRetryStatus 허용값: ${result.productLookupRetryStatus}`);
    }
  });

  await t.test('isGwIpNotAllowedResolved 타입 검증', () => {
    for (const input of [task271Success, task271TokenFailure, task271EnvMissing]) {
      const result = buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(input);
      assert.strictEqual(typeof result.isGwIpNotAllowedResolved, 'boolean', 'isGwIpNotAllowedResolved는 boolean');
    }
  });
});
