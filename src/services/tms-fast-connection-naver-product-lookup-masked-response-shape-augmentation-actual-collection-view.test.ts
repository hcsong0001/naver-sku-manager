import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-actual-collection-view.service';
import { type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus } from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-final-gate-view.service';
import { type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView } from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-final-gate-view.service';
import { type TmsNaverProductLookupMaskedResponseShapeAugmentationSummary } from './tms-naver-product-lookup-masked-response-shape-augmentation.harness';

function makeDummyTask415View(
  status: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView {
  return {
    fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus: status,
    lookupOneTimeSucceeded: true,
    lookupHttpStatusCode: 200,
    lookupActualCallCount: 1,
    lookupProductNoMatched: null,
  } as unknown as TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView;
}

function makeExecutionResult(
  overrides: Partial<TmsNaverProductLookupMaskedResponseShapeAugmentationSummary> = {}
): TmsNaverProductLookupMaskedResponseShapeAugmentationSummary {
  return {
    augmentationAttempted: true,
    actualRecallCount: 1,
    targetProductNo: '6597910207',
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    success: true,
    httpStatusCode: 200,
    responseShapeKeys: ['originProduct', 'smartstoreChannelProduct'],
    candidatePathResults: [
      {
        candidatePath: 'smartstoreChannelProduct.channelProductNo',
        exists: true,
        valueType: 'number',
        maskedPreviewLast4: '****0207',
        equalsTargetProductNo: true,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        candidatePath: 'smartstoreChannelProduct.id',
        exists: true,
        valueType: 'string',
        maskedPreviewLast4: '****0207',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        candidatePath: 'smartstoreChannelProduct.productNo',
        exists: true,
        valueType: 'number',
        maskedPreviewLast4: '****0207',
        equalsTargetProductNo: true,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        candidatePath: 'smartstoreChannelProduct.originProductNo',
        exists: true,
        valueType: 'string',
        maskedPreviewLast4: '****0207',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        candidatePath: 'originProduct.originProductNo',
        exists: true,
        valueType: 'string',
        maskedPreviewLast4: '****0207',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        candidatePath: 'originProduct.id',
        exists: true,
        valueType: 'string',
        maskedPreviewLast4: '****0207',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        candidatePath: 'originProduct.productNo',
        exists: false,
        valueType: 'undefined',
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
    ],
    productIdentityConfidenceScore: 100,
    productIdentityMatchConfirmed: true,
    productIdentityMatchReason: 'candidate path가 targetProductNo와 일치합니다.',
    rawResponseStored: false,
    rawResponseDisplayed: false,
    secretExposed: false,
    tokenExposed: false,
    authorizationHeaderExposed: false,
    signatureExposed: false,
    productUpdateCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritten: false,
    sanitizedErrorMessage: null,
    ...overrides,
  };
}

describe('Task 416 - Fast Connection Naver Product Lookup Masked Response Shape Augmentation Actual Collection', () => {
  it('Task 415 PENDING_EXPLICIT_APPROVAL + 승인 문구 확인이면 Task 416 READY로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL'
      )
    );

    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY'
    );
  });

  it('Task 415 BLOCKED이면 Task 416 BLOCKED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_BLOCKED'
      )
    );

    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_BLOCKED'
    );
  });

  it('Task 415 NOT_STARTED이면 Task 416 NOT_STARTED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_NOT_STARTED'
      )
    );

    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_NOT_STARTED'
    );
  });

  it('상태 매핑이 exhaustive하다', () => {
    const cases: Array<{
      status: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus;
      expected: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus;
    }> = [
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_OPTIONAL',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_BLOCKED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_BLOCKED',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_NOT_STARTED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_NOT_STARTED',
      },
    ];

    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
        makeDummyTask415View(c.status)
      );
      assert.equal(
        view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
        c.expected
      );
    }
  });

  it('8개 Actual Collection 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );

    assert.ok(view.actualMaskedShapeCollectionApprovalConfirmationItems.length > 0);
    assert.ok(view.task415FinalGateReferenceItems.length > 0);
    assert.ok(view.oneTimeRecallScopeAndTargetLockItems.length > 0);
    assert.ok(view.maskedShapeCollectionResultSummaryItems.length > 0);
    assert.ok(view.candidatePathMatchingEvidenceItems.length > 0);
    assert.ok(view.rawResponseSecretTokenNonExposureGuardItems.length > 0);
    assert.ok(view.updatePriceStockDbWriteBlockGuardItems.length > 0);
    assert.ok(view.nextProductIdentityConfirmationRoadmapItems.length > 0);
    assert.equal(view.actualCollectionGroupCount, 8);
  });

  it('targetApi가 NAVER_COMMERCE_PRODUCT_LOOKUP_API이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );
    assert.equal(view.targetApi, 'NAVER_COMMERCE_PRODUCT_LOOKUP_API');
  });

  it('targetProductNo가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );
    assert.equal(view.targetProductNo, '6597910207');
  });

  it('maxRecallCount가 1이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );
    assert.equal(view.maxRecallCount, 1);
  });

  it('candidate path 7개가 scope에 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      ),
      makeExecutionResult()
    );

    assert.equal(view.candidatePathScope.length, 7);
    assert.equal(view.candidatePathResults.length, 7);
  });

  it('상품 수정/가격/재고/DB write가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );

    assert.equal(view.actualProductUpdateApiCall, false);
    assert.equal(view.actualPriceChange, false);
    assert.equal(view.actualStockChange, false);
    assert.equal(view.actualDbWrite, false);
  });

  it('rawResponseDisplayed/Stored가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );

    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualRawApiResponseStored, false);
  });

  it('recommendedNextStep이 NAVER_PRODUCT_IDENTITY_CONFIRMATION_DECISION이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );

    assert.equal(view.recommendedNextStep, 'NAVER_PRODUCT_IDENTITY_CONFIRMATION_DECISION');
  });

  it('recommendedSafetyMode가 SAFETY_SCOPED_TO_ONE_MASKED_SHAPE_COLLECTION이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      )
    );

    assert.equal(view.recommendedSafetyMode, 'SAFETY_SCOPED_TO_ONE_MASKED_SHAPE_COLLECTION');
  });

  it('실행 결과가 있으면 EXECUTED_SUCCESS로 전환된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      ),
      makeExecutionResult()
    );

    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_EXECUTED_SUCCESS'
    );
    assert.equal(view.actualMaskedShapeAugmentationExecuted, true);
    assert.equal(view.productIdentityConfidenceScore, 100);
    assert.equal(view.productIdentityMatchConfirmed, true);
  });

  it('승인 문구 불일치 blocked result가 들어오면 PENDING_EXPLICIT_APPROVAL로 전환된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
      makeDummyTask415View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
      ),
      makeExecutionResult({
        augmentationAttempted: false,
        actualRecallCount: 0,
        success: false,
        candidatePathResults: [],
        sanitizedErrorMessage: 'APPROVAL_PHRASE_MISMATCH',
        productIdentityConfidenceScore: 0,
        productIdentityMatchConfirmed: false,
        productIdentityMatchReason: '승인 문구가 일치하지 않습니다.',
      })
    );

    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_PENDING_EXPLICIT_APPROVAL'
    );
  });
});
