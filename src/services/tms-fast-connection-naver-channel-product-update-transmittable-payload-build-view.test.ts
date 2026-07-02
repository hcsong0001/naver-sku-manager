import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-build-view.service';
import {
  CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE,
  type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-final-gate-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView,
} from './tms-fast-connection-naver-channel-product-update-payload-read-only-design-view.service';

function makeApprovalPacketView(): TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView {
  return {
    taskId: 435,
    title: 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetChannelProductNo: '6597910207',
    sourceReviewStatus: 'PAYLOAD_SAFETY_REVIEW_COMPLETED',
    requiredApprovalPhrase: CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE,
    approvalScope: [
      '실제 수정 API 호출 없이 전송 가능한 payload 생성 준비 단계로 진입',
      'channelProductNo 6597910207 기준 payload 생성 가능 여부 검토',
      '가격/재고 변경은 계속 차단',
      '기존 상품명/옵션/추가상품 구조 보존 전제',
      '실제 수정 API 호출 전 Final Gate를 반드시 거침',
    ],
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    nextTransmittablePayloadRequiresSeparateApproval: true,
    continuedForbiddenItems: [],
    nextTask: 'Task 436 - Naver 채널 상품 수정 Transmittable Payload 실행 전 Final Gate',
    actualNaverApiCall: false,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
  };
}

function makeFinalGateView(): TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView {
  const approvalPacketView = makeApprovalPacketView();

  return {
    taskId: 436,
    title: 'Task 436 - Naver 채널 상품 수정 Transmittable Payload 실행 전 Final Gate',
    finalGateStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetChannelProductNo: '6597910207',
    requiredApprovalPhrase: approvalPacketView.requiredApprovalPhrase,
    approvalAccepted: false,
    approvalStatus: 'NOT_SUBMITTED',
    canProceedToTransmittablePayloadBuild: false,
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    nextTaskIfApproved: 'Task 437 - Naver 채널 상품 수정 Transmittable Payload 생성',
    continuedForbiddenItems: [],
    actualNaverApiCall: false,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
  };
}

function makePayloadSafetyReviewView(): TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView {
  return {
    taskId: 434,
    title: 'Task 434 - Naver 채널 상품 수정 Payload Safety Review',
    reviewStatus: 'PAYLOAD_SAFETY_REVIEW_COMPLETED',
    userApprovalPhrase: 'Naver 채널 상품 수정 Payload Safety Review를 별도로 승인합니다.',
    safetyReviewApprovedPhraseAccepted: true,
    targetChannelProductNo: '6597910207',
    sourcePayloadDesignStatus: 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED',
    payloadDesignMode: 'READ_ONLY_NON_TRANSMITTABLE',
    safetyReviewItems: [],
    safetyReviewItemCount: 0,
    payloadSafetyReviewStatus: 'COMPLETED_FOR_READ_ONLY_FLOW',
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    nextActionRequiresSeparateApproval: true,
    safetyReviewCompletionNote: 'Read-Only Payload Safety Review 완료',
    continuedForbiddenItems: [],
    nextRecommendedTask: 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet',
    actualNaverApiCall: false,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
  };
}

function makeReadOnlyDesignView(): TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView {
  return {
    taskId: 431,
    title: 'Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계',
    designStatus: 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED',
    userApprovalPhrase: 'Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.',
    approvedPhraseAccepted: true,
    targetChannelProductNo: '6597910207',
    updateEndpoint: 'PUT /v2/products/channel-products/:channelProductNo',
    pathParameterName: 'channelProductNo',
    pathParameterValue: '6597910207',
    channelProductNoCanBeUsedAsUpdatePathParameter: true,
    payloadDesignMode: 'READ_ONLY_NON_TRANSMITTABLE',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW',
    designGroups: [],
    nonTransmittablePayloadDraft: {
      path: {
        channelProductNo: '6597910207',
        transmittable: false,
      },
      bodyDesign: {
        originProduct: {
          designOnly: true,
          actualValuesIncluded: false,
          fullProductNameIncluded: false,
          priceChangeIncluded: false,
          stockChangeIncluded: false,
        },
        smartstoreChannelProduct: {
          designOnly: true,
          actualValuesIncluded: false,
        },
      },
      safety: {
        transmittablePayloadGenerated: false,
        updateApiCallable: false,
        requiresNextReview: true,
      },
    },
    continuedForbiddenItems: [],
    nextRecommendedTask: 'Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면',
    actualNaverApiCall: false,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
  };
}

describe('buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView', () => {
  it('승인 문구가 반영되면 approvalAccepted는 true다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.strictEqual(result.approvalAccepted, true);
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver 채널 상품 수정 Transmittable Payload 생성을 별도로 승인합니다.'
    );
  });

  it('대상 channelProductNo는 6597910207이다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.strictEqual(result.targetChannelProductNo, '6597910207');
  });

  it('가격 변경과 재고 변경은 계속 false다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.strictEqual(result.priceChangeAllowed, false);
    assert.strictEqual(result.stockChangeAllowed, false);
  });

  it('수정 API 호출, DB write는 계속 false다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.strictEqual(result.canCallUpdateApi, false);
    assert.strictEqual(result.updateApiCalled, false);
    assert.strictEqual(result.dbWritePerformed, false);
  });

  it('source data가 부족하면 TRANSMITTABLE_PAYLOAD_BUILD_BLOCKED_BY_SOURCE_DATA_GAP이다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.strictEqual(
      result.buildStatus,
      'TRANSMITTABLE_PAYLOAD_BUILD_BLOCKED_BY_SOURCE_DATA_GAP'
    );
    assert.strictEqual(result.transmittablePayloadGenerated, false);
    assert.strictEqual(result.sourceDataGapDetected, true);
    assert.ok(
      result.sourceDataGapReasons.includes(
        '전송 가능한 payload 생성을 위한 실제 source data snapshot이 제공되지 않았습니다.'
      )
    );
  });

  it('source data가 부족하면 placeholder payload를 만들지 않는다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.strictEqual(result.transmittablePayloadCandidate, null);
    assert.strictEqual(result.payloadSummary, null);
  });

  it('source data가 충분한 fixture에서는 payload candidate 생성이 가능하다', () => {
    const sufficientView = Object.assign(makeReadOnlyDesignView(), {
      transmittableSourceDataSnapshot: {
        channelProductNo: '6597910207' as const,
        preserveExistingStructureConfirmed: true as const,
        originProductSufficient: true as const,
        smartstoreChannelProductSufficient: true as const,
        placeholderFree: true as const,
        containsNoSecrets: true as const,
      },
    });

    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      sufficientView
    );

    assert.strictEqual(result.buildStatus, 'TRANSMITTABLE_PAYLOAD_BUILD_COMPLETED');
    assert.strictEqual(result.transmittablePayloadGenerated, true);
    assert.strictEqual(result.sourceDataGapDetected, false);
    assert.notStrictEqual(result.transmittablePayloadCandidate, null);
    assert.notStrictEqual(result.payloadSummary, null);
  });

  it('payload candidate에도 가격/재고 변경 없음이 포함된다', () => {
    const sufficientView = Object.assign(makeReadOnlyDesignView(), {
      transmittableSourceDataSnapshot: {
        channelProductNo: '6597910207' as const,
        preserveExistingStructureConfirmed: true as const,
        originProductSufficient: true as const,
        smartstoreChannelProductSufficient: true as const,
        placeholderFree: true as const,
        containsNoSecrets: true as const,
      },
    });

    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      sufficientView
    );

    assert.strictEqual(
      result.transmittablePayloadCandidate?.body.originProduct.priceChangeIncluded,
      false
    );
    assert.strictEqual(
      result.transmittablePayloadCandidate?.body.originProduct.stockChangeIncluded,
      false
    );
    assert.strictEqual(result.payloadSummary?.priceChangeIncluded, false);
    assert.strictEqual(result.payloadSummary?.stockChangeIncluded, false);
  });

  it('금지 항목에 수정 API 호출, 가격/재고 변경, DB write, raw/secret 노출, POST/button/submit이 포함된다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.ok(result.continuedForbiddenItems.includes('상품 수정 API 호출'));
    assert.ok(result.continuedForbiddenItems.includes('가격 변경'));
    assert.ok(result.continuedForbiddenItems.includes('재고 변경'));
    assert.ok(result.continuedForbiddenItems.includes('DB write'));
    assert.ok(result.continuedForbiddenItems.includes('raw response 표시 또는 저장'));
    assert.ok(result.continuedForbiddenItems.includes('secret/token/header/signature 노출'));
    assert.ok(result.continuedForbiddenItems.includes('POST API 추가'));
    assert.ok(result.continuedForbiddenItems.includes('버튼/form/submit action 추가'));
  });

  it('다음 Task는 Task 438로 표시된다', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
      makeFinalGateView(),
      makePayloadSafetyReviewView(),
      makeReadOnlyDesignView()
    );

    assert.strictEqual(
      result.nextRecommendedTask,
      'Task 438 - Naver 채널 상품 수정 Transmittable Payload 결과 판단 화면'
    );
  });
});
