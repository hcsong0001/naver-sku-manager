import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-approval-packet-view.service';
import {
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-review-view.service';

function makeDummyTask413View(
  status: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
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
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView {
  return {
    fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus: status,
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
  } as unknown as TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView;
}

describe('Task 414 - Fast Connection Naver Product Lookup Masked Response Shape Augmentation Approval Packet', () => {
  it('Task 413 REVIEW_REQUIRED이면 Task 414 APPROVAL_PACKET_REQUIRED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
    );
    assert.equal(
      view.recommendedCurrentApprovalPacketStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
    );
  });

  it('Task 413 REVIEW_OPTIONAL이면 Task 414 APPROVAL_PACKET_OPTIONAL로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_OPTIONAL',
        { productUpdateApiEntryDeferred: false }
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_OPTIONAL'
    );
  });

  it('Task 413 READY이면 Task 414 READY로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READY'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READY'
    );
  });

  it('Task 413 BLOCKED이면 Task 414 BLOCKED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_BLOCKED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_BLOCKED'
    );
  });

  it('Task 413 NOT_STARTED이면 Task 414 NOT_STARTED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_NOT_STARTED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_NOT_STARTED'
    );
  });

  it('상태 매핑이 exhaustive하다', () => {
    const cases: Array<{
      status: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus;
      expected: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus;
    }> = [
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_OPTIONAL',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_OPTIONAL',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READY',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READY',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_BLOCKED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_BLOCKED',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_NOT_STARTED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_NOT_STARTED',
      },
    ];
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
        makeDummyTask413View(c.status)
      );
      assert.equal(view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus, c.expected);
    }
    assert.equal(cases.length, 5);
  });

  it('8개 Approval Packet 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.ok(view.maskedResponseShapeAugmentationApprovalPacketReadinessItems.length > 0, 'group 1');
    assert.ok(view.task413AugmentationReviewReferenceItems.length > 0, 'group 2');
    assert.ok(view.approvalScopeForMaskedShapeCollectionItems.length > 0, 'group 3');
    assert.ok(view.allowedMaskedShapeDataScopeItems.length > 0, 'group 4');
    assert.ok(view.forbiddenDataAndActionScopeItems.length > 0, 'group 5');
    assert.ok(view.oneTimeRecallLimitAndTargetScopeItems.length > 0, 'group 6');
    assert.ok(view.userApprovalPhraseGuidanceItems.length > 0, 'group 7');
    assert.ok(view.nextMaskedShapeCollectionFinalGateRoadmapItems.length > 0, 'group 8');
    assert.equal(view.approvalPacketGroupCount, 8);
  });

  it('lookupOneTimeSucceeded가 true이고 lookupHttpStatusCode가 200이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.lookupOneTimeSucceeded, true);
    assert.equal(view.lookupHttpStatusCode, 200);
  });

  it('lookupActualCallCount가 1이고 lookupTargetProductNo가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.lookupActualCallCount, 1);
    assert.equal(view.lookupTargetProductNo, '6597910207');
  });

  it('lookupProductNoMatched가 null이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.lookupProductNoMatched, null);
  });

  it('approvalScope와 outOfScope가 분리되어 있다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.ok(view.approvalScope.length > 0);
    assert.ok(view.outOfScope.length > 0);
    assert.equal(view.outOfScope.includes('상품 수정 API 호출'), true);
  });

  it('allowedMaskedShapeData와 forbiddenData가 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.ok(view.allowedMaskedShapeData.includes('topLevelKeys'));
    assert.ok(view.forbiddenData.includes('rawResponseBody'));
  });

  it('required approval phrase가 정확하다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedRequiredApprovalPhrase,
      'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.'
    );
  });

  it('maskedShapeAugmentationApprovalPacketPrepared가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.maskedShapeAugmentationApprovalPacketPrepared, true);
  });

  it('maskedShapeAugmentationCollectionPerformed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.maskedShapeAugmentationCollectionPerformed, false);
  });

  it('actualApprovalAccepted가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualApprovalAccepted, false);
  });

  it('actualNaverApiCallInTask414가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualNaverApiCallInTask414, false);
  });

  it('actualProductLookupApiRecall이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualProductLookupApiRecall, false);
  });

  it('actualEnvReadInTask414가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualEnvReadInTask414, false);
  });

  it('actualSecretAccessInTask414가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualSecretAccessInTask414, false);
  });

  it('actualTokenUseInTask414가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualTokenUseInTask414, false);
  });

  it('actualRawApiResponseExposure/Stored가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualRawApiResponseStored, false);
  });

  it('productUpdateApiEntryAllowedNow가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.productUpdateApiEntryAllowedNow, false);
  });

  it('productUpdateApiCallAllowed/priceChangeAllowed/stockChangeAllowed/dbWriteAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.productUpdateApiCallAllowed, false);
    assert.equal(view.priceChangeAllowed, false);
    assert.equal(view.stockChangeAllowed, false);
    assert.equal(view.dbWriteAllowed, false);
  });

  it('recommendedApprovalPacketDecision이 NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedApprovalPacketDecision,
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
    );
  });

  it('recommendedNextStep이 NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedNextStep,
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE'
    );
  });

  it('recommendedSafetyMode가 SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
      makeDummyTask413View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedSafetyMode,
      'SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL'
    );
  });
});
