import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-final-gate-view.service';
import {
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-approval-packet-view.service';

function makeDummyTask414View(
  status: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
  overrides: {
    lookupOneTimeSucceeded?: boolean;
    lookupHttpStatusCode?: number | null;
    lookupActualCallCount?: number;
    lookupResponseShapeKeys?: string[];
    lookupProductNoMatched?: boolean | null;
    productUpdateApiEntryDeferred?: boolean;
    allowedMaskedShapeData?: string[];
    forbiddenData?: string[];
  } = {}
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView {
  return {
    fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus: status,
    lookupOneTimeSucceeded: overrides.lookupOneTimeSucceeded ?? true,
    lookupHttpStatusCode: overrides.lookupHttpStatusCode ?? 200,
    lookupActualCallCount: overrides.lookupActualCallCount ?? 1,
    lookupResponseShapeKeys: overrides.lookupResponseShapeKeys ?? ['originProduct', 'smartstoreChannelProduct'],
    lookupProductNoMatched: overrides.lookupProductNoMatched ?? null,
    productUpdateApiEntryDeferred: overrides.productUpdateApiEntryDeferred ?? true,
    allowedMaskedShapeData:
      overrides.allowedMaskedShapeData ?? [
        'topLevelKeys',
        'nestedKeyNamesOnly',
        'candidatePathExistsBoolean',
        'candidatePathValueTypeOnly',
        'candidatePathValueMaskedPreviewLast4Only',
        'candidatePathEqualsTargetProductNoBoolean',
        'productIdentityConfidenceScore',
      ],
    forbiddenData:
      overrides.forbiddenData ?? [
        'rawResponseBody',
        'fullProductName',
        'fullOptionName',
        'fullSellerManagementCode',
        'fullClientId',
        'clientSecret',
        'accessToken',
        'authorizationHeader',
        'signature',
        'fullRawRequest',
        'fullRawResponse',
      ],
  } as unknown as TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView;
}

describe('Task 415 - Fast Connection Naver Product Lookup Masked Response Shape Augmentation Final Gate', () => {
  it('Task 414 APPROVAL_PACKET_REQUIRED이면 Task 415 FINAL_GATE_PENDING_EXPLICIT_APPROVAL로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL'
    );
    assert.equal(
      view.recommendedCurrentFinalGateStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL'
    );
  });

  it('Task 414 APPROVAL_PACKET_OPTIONAL이면 Task 415 FINAL_GATE_OPTIONAL로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_OPTIONAL',
        { productUpdateApiEntryDeferred: false }
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_OPTIONAL'
    );
  });

  it('Task 414 APPROVAL_PACKET_READY이면 Task 415 FINAL_GATE_READY로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READY'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
    );
  });

  it('Task 414 APPROVAL_PACKET_BLOCKED이면 Task 415 FINAL_GATE_BLOCKED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_BLOCKED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_BLOCKED'
    );
  });

  it('Task 414 APPROVAL_PACKET_NOT_STARTED이면 Task 415 FINAL_GATE_NOT_STARTED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_NOT_STARTED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_NOT_STARTED'
    );
  });

  it('상태 매핑이 exhaustive하다', () => {
    const cases: Array<{
      status: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus;
      expected: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus;
    }> = [
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_OPTIONAL',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_OPTIONAL',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READY',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_BLOCKED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_BLOCKED',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_NOT_STARTED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_NOT_STARTED',
      },
    ];
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
        makeDummyTask414View(c.status)
      );
      assert.equal(view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus, c.expected);
    }
    assert.equal(cases.length, 5);
  });

  it('8개 Final Gate 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.ok(view.maskedResponseShapeAugmentationFinalGateReadinessItems.length > 0, 'group 1');
    assert.ok(view.task414ApprovalPacketReferenceItems.length > 0, 'group 2');
    assert.ok(view.explicitApprovalPhrasePendingGateItems.length > 0, 'group 3');
    assert.ok(view.oneTimeRecallTargetAndCountLockGateItems.length > 0, 'group 4');
    assert.ok(view.allowedMaskedShapeDataFinalGateItems.length > 0, 'group 5');
    assert.ok(view.forbiddenDataAndActionFinalGateItems.length > 0, 'group 6');
    assert.ok(view.noCollectionNoApiRecallCurrentTaskGateItems.length > 0, 'group 7');
    assert.ok(view.nextActualMaskedShapeCollectionRoadmapItems.length > 0, 'group 8');
    assert.equal(view.finalGateGroupCount, 8);
  });

  it('lookupOneTimeSucceeded가 true이고 lookupHttpStatusCode가 200이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.lookupOneTimeSucceeded, true);
    assert.equal(view.lookupHttpStatusCode, 200);
  });

  it('lookupActualCallCount가 1이고 lookupTargetProductNo가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.lookupActualCallCount, 1);
    assert.equal(view.lookupTargetProductNo, '6597910207');
  });

  it('lookupProductNoMatched가 null이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.lookupProductNoMatched, null);
  });

  it('requiredApprovalPhrase가 정확하다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(
      view.requiredApprovalPhrase,
      'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.'
    );
  });

  it('explicitApprovalPhraseReceived가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.explicitApprovalPhraseReceived, false);
  });

  it('actualApprovalAccepted가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.actualApprovalAccepted, false);
  });

  it('maskedShapeAugmentationFinalGatePrepared가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.maskedShapeAugmentationFinalGatePrepared, true);
  });

  it('maskedShapeAugmentationCollectionPerformed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.maskedShapeAugmentationCollectionPerformed, false);
  });

  it('allowedAfterExplicitApproval과 stillForbiddenAfterApproval이 분리된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.ok(view.allowedAfterExplicitApproval.length > 0);
    assert.ok(view.stillForbiddenAfterApproval.length > 0);
    assert.equal(view.stillForbiddenAfterApproval.includes('상품 수정 API 호출'), true);
  });

  it('allowedMaskedShapeData와 forbiddenData가 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.ok(view.allowedMaskedShapeData.includes('topLevelKeys'));
    assert.ok(view.forbiddenData.includes('rawResponseBody'));
  });

  it('rawResponseBody/fullRawResponse/accessToken/authorizationHeader/signature가 forbiddenData에 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.forbiddenData.includes('rawResponseBody'), true);
    assert.equal(view.forbiddenData.includes('fullRawResponse'), true);
    assert.equal(view.forbiddenData.includes('accessToken'), true);
    assert.equal(view.forbiddenData.includes('authorizationHeader'), true);
    assert.equal(view.forbiddenData.includes('signature'), true);
  });

  it('actualNaverApiCallInTask415가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.actualNaverApiCallInTask415, false);
  });

  it('actualProductLookupApiRecall이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.actualProductLookupApiRecall, false);
  });

  it('actualEnvReadInTask415가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.actualEnvReadInTask415, false);
  });

  it('actualSecretAccessInTask415가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.actualSecretAccessInTask415, false);
  });

  it('actualTokenUseInTask415가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.actualTokenUseInTask415, false);
  });

  it('actualRawApiResponseExposure/Stored가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualRawApiResponseStored, false);
  });

  it('productUpdateApiEntryAllowedNow가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.productUpdateApiEntryAllowedNow, false);
  });

  it('productUpdateApiCallAllowed/priceChangeAllowed/stockChangeAllowed/dbWriteAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(view.productUpdateApiCallAllowed, false);
    assert.equal(view.priceChangeAllowed, false);
    assert.equal(view.stockChangeAllowed, false);
    assert.equal(view.dbWriteAllowed, false);
  });

  it('recommendedFinalGateDecision이 NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedFinalGateDecision,
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL'
    );
  });

  it('recommendedNextStep이 NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedNextStep,
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION'
    );
  });

  it('recommendedSafetyMode가 SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
      makeDummyTask414View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedSafetyMode,
      'SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL'
    );
  });
});
