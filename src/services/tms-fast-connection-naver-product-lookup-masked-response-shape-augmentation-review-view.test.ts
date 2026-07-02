import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-review-view.service';
import {
  type TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
  type TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView,
} from './tms-fast-connection-naver-product-lookup-response-product-identity-field-mapping-review-view.service';

function makeDummyTask412View(
  status: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
  overrides: {
    lookupOneTimeSucceeded?: boolean;
    lookupHttpStatusCode?: number | null;
    lookupActualCallCount?: number;
    lookupResponseShapeKeys?: string[];
    lookupProductNoMatched?: boolean | null;
    productUpdateApiEntryDeferred?: boolean;
    productIdentityFieldCandidates?: Array<{ path: string }>;
  } = {}
): TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView {
  return {
    fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus: status,
    lookupOneTimeSucceeded: overrides.lookupOneTimeSucceeded ?? true,
    lookupHttpStatusCode: overrides.lookupHttpStatusCode ?? 200,
    lookupActualCallCount: overrides.lookupActualCallCount ?? 1,
    lookupResponseShapeKeys: overrides.lookupResponseShapeKeys ?? ['originProduct', 'smartstoreChannelProduct'],
    lookupProductNoMatched: overrides.lookupProductNoMatched ?? null,
    productUpdateApiEntryDeferred: overrides.productUpdateApiEntryDeferred ?? true,
    productIdentityFieldCandidates:
      overrides.productIdentityFieldCandidates ?? [
        { path: 'smartstoreChannelProduct.channelProductNo' },
        { path: 'smartstoreChannelProduct.id' },
        { path: 'smartstoreChannelProduct.productNo' },
        { path: 'smartstoreChannelProduct.originProductNo' },
        { path: 'originProduct.originProductNo' },
        { path: 'originProduct.id' },
        { path: 'originProduct.productNo' },
      ],
  } as unknown as TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView;
}

describe('Task 413 - Fast Connection Naver Product Lookup Masked Response Shape Augmentation Review', () => {
  it('Task 412 REVIEW_REQUIRED이면 Task 413 AUGMENTATION_REVIEW_REQUIRED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
    );
    assert.equal(
      view.recommendedCurrentAugmentationReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
    );
  });

  it('Task 412 REVIEW_OPTIONAL이면 Task 413 AUGMENTATION_REVIEW_OPTIONAL로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_OPTIONAL',
        { productUpdateApiEntryDeferred: false }
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_OPTIONAL'
    );
  });

  it('Task 412 READY이면 Task 413 READY로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READY'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READY'
    );
  });

  it('Task 412 BLOCKED이면 Task 413 BLOCKED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_BLOCKED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_BLOCKED'
    );
  });

  it('Task 412 NOT_STARTED이면 Task 413 NOT_STARTED로 매핑된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_NOT_STARTED'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_NOT_STARTED'
    );
  });

  it('상태 매핑이 exhaustive하다', () => {
    const cases: Array<{
      status: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus;
      expected: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus;
    }> = [
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_OPTIONAL',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_OPTIONAL',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READY',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READY',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_BLOCKED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_BLOCKED',
      },
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_NOT_STARTED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_NOT_STARTED',
      },
    ];
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
        makeDummyTask412View(c.status)
      );
      assert.equal(view.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus, c.expected);
    }
    assert.equal(cases.length, 5);
  });

  it('8개 Masked Shape Augmentation Review 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.ok(view.maskedResponseShapeAugmentationReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.task412FieldMappingReviewReferenceItems.length > 0, 'group 2');
    assert.ok(view.currentMaskedEvidenceLimitationSummaryItems.length > 0, 'group 3');
    assert.ok(view.requiredMaskedShapeAugmentationItemsReviewItems.length > 0, 'group 4');
    assert.ok(view.safeMaskingRulesForNextStepItems.length > 0, 'group 5');
    assert.ok(view.productIdentityConfirmationCriteriaItems.length > 0, 'group 6');
    assert.ok(view.updateApiEntryStillDeferredGuardItems.length > 0, 'group 7');
    assert.ok(view.nextMaskedShapeAugmentationApprovalPacketRoadmapItems.length > 0, 'group 8');
    assert.equal(view.maskedShapeAugmentationReviewGroupCount, 8);
  });

  it('lookupOneTimeSucceeded가 true이고 lookupHttpStatusCode가 200이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.lookupOneTimeSucceeded, true);
    assert.equal(view.lookupHttpStatusCode, 200);
  });

  it('lookupActualCallCount가 1이고 lookupTargetProductNo가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.lookupActualCallCount, 1);
    assert.equal(view.lookupTargetProductNo, '6597910207');
  });

  it('lookupResponseShapeKeys가 originProduct, smartstoreChannelProduct만 포함한다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.deepEqual(view.lookupResponseShapeKeys, ['originProduct', 'smartstoreChannelProduct']);
  });

  it('lookupProductNoMatched가 null이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.lookupProductNoMatched, null);
  });

  it('보강 필요 항목들이 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.deepEqual(
      view.requiredMaskedShapeAugmentationItems.map((item) => item.label),
      [
        'candidate path exists 여부',
        'candidate path value type',
        'candidate path value masked preview 가능 여부',
        'candidate path value equals targetProductNo 여부',
        'smartstoreChannelProduct 내부 key 목록의 마스킹된 key-only shape',
        'originProduct 내부 key 목록의 마스킹된 key-only shape',
        'product identity confidence score 산정 기준',
      ]
    );
  });

  it('모든 보강 필요 항목의 actualValueRead가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    for (const item of view.requiredMaskedShapeAugmentationItems) {
      assert.equal(item.actualValueRead, false);
    }
  });

  it('모든 보강 필요 항목의 actualRawResponseAccessed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    for (const item of view.requiredMaskedShapeAugmentationItems) {
      assert.equal(item.actualRawResponseAccessed, false);
    }
  });

  it('모든 보강 필요 항목의 actualApiRecalled가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    for (const item of view.requiredMaskedShapeAugmentationItems) {
      assert.equal(item.actualApiRecalled, false);
    }
  });

  it('allowedMaskedShapeData와 forbiddenData가 구분된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.ok(view.allowedMaskedShapeData.length > 0);
    assert.ok(view.forbiddenData.length > 0);
    assert.equal(view.allowedMaskedShapeData.includes('rawResponseBody'), false);
  });

  it('rawResponseBody/fullRawResponse/accessToken/authorizationHeader/signature가 forbiddenData에 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.forbiddenData.includes('rawResponseBody'), true);
    assert.equal(view.forbiddenData.includes('fullRawResponse'), true);
    assert.equal(view.forbiddenData.includes('accessToken'), true);
    assert.equal(view.forbiddenData.includes('authorizationHeader'), true);
    assert.equal(view.forbiddenData.includes('signature'), true);
  });

  it('maskedResponseShapeAugmentationRequired가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.maskedResponseShapeAugmentationRequired, true);
  });

  it('maskedShapeAugmentationReviewed가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.maskedShapeAugmentationReviewed, true);
  });

  it('maskedShapeAugmentationCollectionPerformed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.maskedShapeAugmentationCollectionPerformed, false);
  });

  it('productIdentityMatchConfirmed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.productIdentityMatchConfirmed, false);
  });

  it('productUpdateApiEntryAllowedNow가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.productUpdateApiEntryAllowedNow, false);
  });

  it('actualNaverApiCallInTask413이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualNaverApiCallInTask413, false);
  });

  it('actualProductLookupApiRecall이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualProductLookupApiRecall, false);
  });

  it('actualEnvReadInTask413이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualEnvReadInTask413, false);
  });

  it('actualSecretAccessInTask413이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualSecretAccessInTask413, false);
  });

  it('actualTokenUseInTask413이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualTokenUseInTask413, false);
  });

  it('actualRawApiResponseExposure/Stored가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualRawApiResponseStored, false);
  });

  it('recommendedAugmentationReviewDecision이 NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedAugmentationReviewDecision,
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
    );
  });

  it('recommendedNextStep이 NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedNextStep,
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET'
    );
  });

  it('recommendedSafetyMode가 SAFETY_LOCKED_UNTIL_MASKED_SHAPE_AUGMENTATION_APPROVED다', () => {
    const view = buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
      makeDummyTask412View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
      )
    );
    assert.equal(
      view.recommendedSafetyMode,
      'SAFETY_LOCKED_UNTIL_MASKED_SHAPE_AUGMENTATION_APPROVED'
    );
  });
});
