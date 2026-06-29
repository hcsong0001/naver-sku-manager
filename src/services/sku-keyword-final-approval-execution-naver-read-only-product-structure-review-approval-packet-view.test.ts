import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductStructureReviewApprovalPacketView } from './sku-keyword-final-approval-execution-naver-read-only-product-structure-review-approval-packet-view.service';

const mkOutcomeCertification = (
  basicProductDataSummaryReviewOutcomeCertificationStatus: string
) => ({
  basicProductDataSummaryReviewOutcomeCertificationStatus,
});
const mkSummaryReview = () => ({ isNaverBasicProductDataSummaryReviewReady: true });
const mkSafetyAuditSeal = () => ({
  isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true,
});
const mkCaptureResult = () => ({
  readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
});

const mkInput = (
  basicProductDataSummaryReviewOutcomeCertificationStatus: string
) => ({
  outcomeCertification: mkOutcomeCertification(
    basicProductDataSummaryReviewOutcomeCertificationStatus
  ),
  summaryReview: mkSummaryReview(),
  safetyAuditSeal: mkSafetyAuditSeal(),
  captureResult: mkCaptureResult(),
});

test('NaverReadOnlyProductStructureReviewApprovalPacketView (Task 284)', async (t) => {
  await t.test('핵심 상태 및 준비 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(
      result.status,
      'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_APPROVAL_PACKET_READY'
    );
    assert.strictEqual(
      result.isNaverReadOnlyProductStructureReviewApprovalPacketReady,
      true
    );
    assert.strictEqual(
      result.isNaverBasicProductDataSummaryReviewOutcomeCertificationReady,
      true
    );
    assert.strictEqual(
      result.isNaverBasicProductDataSummaryReviewSafetyAuditSealed,
      true
    );
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('모든 outcome certification 상태 → approval packet 상태 매핑 검증', () => {
    const cases = [
      [
        'CERTIFIED_SUMMARY_REVIEW_COMPLETE',
        'APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY',
      ],
      [
        'CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE',
        'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
      ],
      [
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
        'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
      ],
      [
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
        'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
      ],
      [
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
        'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
      ],
      [
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
        'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
      ],
      [
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
        'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
      ],
    ] as const;

    for (const [outcomeStatus, packetStatus] of cases) {
      const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
        mkInput(outcomeStatus)
      );
      assert.strictEqual(
        result.basicProductDataSummaryReviewOutcomeCertificationStatus,
        outcomeStatus
      );
      assert.strictEqual(
        result.readOnlyProductStructureReviewApprovalPacketStatus,
        packetStatus
      );
    }
  });

  await t.test('COMPLETE 상태 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(
      result.readOnlyProductStructureReviewApprovalPacketStatus,
      'APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY'
    );
    assert.strictEqual(
      result.isReadOnlyProductStructureReviewApprovalPacketReadyForCompleteSummary,
      true
    );
    assert.strictEqual(
      result.isReadOnlyProductStructureReviewApprovalPacketReadyWithMissingFieldNotice,
      false
    );
  });

  await t.test('PARTIAL 상태 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE')
    );
    assert.strictEqual(
      result.readOnlyProductStructureReviewApprovalPacketStatus,
      'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.strictEqual(
      result.isReadOnlyProductStructureReviewApprovalPacketReadyWithMissingFieldNotice,
      true
    );
    assert.strictEqual(
      result.isReadOnlyProductStructureReviewApprovalPacketReadyForCompleteSummary,
      false
    );
  });

  await t.test('각 BLOCKED 상태는 해당 플래그만 true', () => {
    const blockedCases = [
      {
        status: 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
        key: 'isReadOnlyProductStructureReviewApprovalPacketBlockedByGwIpNotAllowed',
      },
      {
        status: 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
        key: 'isReadOnlyProductStructureReviewApprovalPacketBlockedByTokenRetryFailure',
      },
      {
        status: 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
        key: 'isReadOnlyProductStructureReviewApprovalPacketBlockedByEnvMissing',
      },
      {
        status: 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
        key: 'isReadOnlyProductStructureReviewApprovalPacketBlockedByMissingChannelProductNo',
      },
      {
        status: 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
        key: 'isReadOnlyProductStructureReviewApprovalPacketBlockedByProductLookupFailure',
      },
    ] as const;

    for (const blockedCase of blockedCases) {
      const result =
        buildNaverReadOnlyProductStructureReviewApprovalPacketView(
          mkInput(blockedCase.status)
        ) as unknown as Record<string, unknown>;
      assert.strictEqual(result[blockedCase.key], true);
      assert.strictEqual(
        result.isReadOnlyProductStructureReviewApprovalPacketReadyForCompleteSummary,
        false
      );
      assert.strictEqual(
        result.isReadOnlyProductStructureReviewApprovalPacketReadyWithMissingFieldNotice,
        false
      );
    }
  });

  await t.test('승인 요청 상태 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isReadOnlyProductStructureReviewApprovalRequired, true);
    assert.strictEqual(result.isReadOnlyProductStructureReviewApprovalGranted, false);
    assert.strictEqual(
      result.isUserApprovalPhraseReceivedForReadOnlyProductStructureReview,
      false
    );
    assert.strictEqual(result.isReadOnlyProductStructureReviewExecutedInThisTask, false);
  });

  await t.test('기존 캡처 데이터 및 미실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isCapturedDataUsedOnly, true);
    assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
  });

  await t.test('가격/재고/raw response 비포함 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('비수정/비실행 및 실행 잠금 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
  });

  await t.test('packetItems 권장 상태값 포함 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    const statuses = result.packetItems.map((item) => item.status);
    assert.ok(statuses.includes('SUMMARY_OUTCOME_CERTIFICATION_CONFIRMED'));
    assert.ok(statuses.includes('SUMMARY_SAFETY_AUDIT_SEAL_CONFIRMED'));
    assert.ok(statuses.includes('SUMMARY_REVIEW_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('APPROVAL_PACKET_STATUS_RECORDED'));
    assert.ok(statuses.includes('READY_FOR_STRUCTURE_REVIEW_IF_COMPLETE'));
    assert.ok(statuses.includes('READY_WITH_MISSING_FIELD_NOTICE'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_AUTH_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_ENV_REQUIRED'));
    assert.ok(
      statuses.includes('BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED')
    );
    assert.ok(statuses.includes('BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'));
    assert.ok(statuses.includes('PENDING_USER_APPROVAL'));
    assert.ok(statuses.includes('LOCKED_UNTIL_USER_APPROVAL'));
    assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('사용자 승인 문구는 Task 285 기준 안내만 제공', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    assert.ok(result.userApprovalPhraseGuide.includes('Task 285'));
    assert.ok(result.userApprovalPhraseGuide.includes('read-only 상품 구조 검토'));
    assert.strictEqual(result.isReadOnlyProductStructureReviewApprovalGranted, false);
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewApprovalPacketView(
      mkInput('CERTIFIED_SUMMARY_REVIEW_COMPLETE')
    );
    const json = JSON.stringify(result);
    assert.ok(!json.includes('access_token'), 'access_token 없음');
    assert.ok(!json.includes('client_secret'), 'client_secret 없음');
    assert.ok(!json.includes('client_id'), 'client_id 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 없음');
    assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
    assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
    assert.ok(!json.includes('"rawProductApiResponse"'), 'raw API response 없음');
  });
});
