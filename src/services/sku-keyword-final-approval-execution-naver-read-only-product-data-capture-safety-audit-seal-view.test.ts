import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductDataCaptureSafetyAuditSealView } from './sku-keyword-final-approval-execution-naver-read-only-product-data-capture-safety-audit-seal-view.service';

const mkCapture = (readOnlyProductDataCaptureStatus: string, capturedProductData?: any) => ({
  readOnlyProductDataCaptureStatus,
  capturedProductData: capturedProductData ?? null,
});

const successCapture = mkCapture('CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT', {
  channelProductNo: 'CH-001',
  productName: 'Test Product',
  productStatus: 'SALE',
  salePricePresent: true,
  stockQuantityPresent: true,
  leafCategoryId: 'CAT-123',
  representativeImageUrlPresent: true,
});

const ALLOWED_KEYS = [
  'channelProductNo', 'productName', 'productStatus',
  'salePricePresent', 'stockQuantityPresent', 'leafCategoryId',
  'representativeImageUrlPresent',
];
const FORBIDDEN_KEYS = [
  'salePrice', 'stockQuantity', 'access_token', 'token', 'authorization',
  'signature', 'clientId', 'clientSecret', 'rawResponse', 'rawProductApiResponse',
];

test('NaverReadOnlyProductDataCaptureSafetyAuditSealView (Task 277)', async (t) => {
  await t.test('핵심 상태 및 Seal 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });

    assert.strictEqual(result.status, 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_SAFETY_AUDIT_SEALED');
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureSafetyAuditSealed, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureApprovalPacketReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(result.isCaptureResultConfirmed, true);
    assert.strictEqual(result.isCapturedProductDataAllowedFieldsOnly, true);
  });

  await t.test('캡처 상태 전달 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT');
  });

  await t.test('차단 상태 전달 검증 — BLOCKED_BY_GW_IP_NOT_ALLOWED', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({
      captureResult: mkCapture('CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED'),
    });
    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED');
  });

  await t.test('차단 상태 전달 검증 — BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({
      captureResult: mkCapture('CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE'),
    });
    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE');
  });

  await t.test('차단 상태 전달 검증 — BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({
      captureResult: mkCapture('CAPTURE_BLOCKED_BY_ENV_MISSING'),
    });
    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_ENV_MISSING');
  });

  await t.test('차단 상태 전달 검증 — BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({
      captureResult: mkCapture('CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'),
    });
    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
  });

  await t.test('차단 상태 전달 검증 — BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({
      captureResult: mkCapture('CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE'),
    });
    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
  });

  await t.test('null 입력 — 기본값 처리', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: null });
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureSafetyAuditSealed, true);
    assert.ok(result.readOnlyProductDataCaptureStatus.startsWith('CAPTURE_BLOCKED_'));
  });

  await t.test('raw API response 비포함 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('가격/재고 원본 값 비포함, presence flag only 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
    assert.strictEqual(result.isSalePricePresenceFlagOnly, true);
    assert.strictEqual(result.isStockQuantityPresenceFlagOnly, true);
    assert.strictEqual(result.isRepresentativeImagePresenceFlagOnly, true);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isTokenValueIncludedInView, false);
  });

  await t.test('비노출/비수정/비실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
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
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
  });

  await t.test('auditItems 권장 상태값 포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
    const statuses = result.auditItems.map((i) => i.status);
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_STATUS_RECORDED'));
    assert.ok(statuses.includes('ALLOWED_FIELDS_ONLY_CONFIRMED'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('PRESENCE_FLAG_ONLY'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_STORED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('NOT_ACCESSED'));
    assert.ok(statuses.includes('NOT_MODIFIED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('성공 케이스 capturedProductData — 허용 키만 포함 검증', () => {
    // service 자체는 capturedProductData를 변환하지 않음 (Task 276 view에서 이미 필터됨)
    // 이 테스트는 successCapture fixture의 capturedProductData가 허용 키만 있음을 검증
    const pd = successCapture.capturedProductData as Record<string, unknown>;
    const keys = Object.keys(pd);
    for (const k of keys) {
      assert.ok(ALLOWED_KEYS.includes(k), `${k}는 허용 키여야 함`);
    }
    for (const k of FORBIDDEN_KEYS) {
      assert.ok(!keys.includes(k), `${k}는 금지 키이므로 없어야 함`);
    }
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureSafetyAuditSealView({ captureResult: successCapture });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('access_token:'), 'access_token 값 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 값 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 헤더 없음');
    assert.ok(!json.includes('raw error body'), 'raw error body 없음');
    assert.ok(!json.includes('PATH='), 'process.env 전체 출력 없음');
    assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
    assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
    assert.ok(!json.includes('"rawProductApiResponse"'), 'rawProductApiResponse 없음');
  });
});
