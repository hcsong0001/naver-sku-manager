import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView,
  type TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
} from './tms-fast-connection-naver-product-lookup-response-product-identity-field-mapping-review-view.service';
import {
  type TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus,
  type TmsFastConnectionNaverProductUpdateApiEntryDecisionView,
} from './tms-fast-connection-naver-product-update-api-entry-decision-view.service';

function makeDummyTask411View(
  status: TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus,
  overrides: {
    lookupOneTimeSucceeded?: boolean;
    lookupHttpStatusCode?: number | null;
    lookupActualCallCount?: number;
    lookupResponseShapeKeys?: string[];
    lookupProductNoMatched?: boolean | null;
    productUpdateApiEntryDeferred?: boolean;
    productUpdateApiEntryDeferredReason?: string | null;
  } = {}
): TmsFastConnectionNaverProductUpdateApiEntryDecisionView {
  return {
    fastConnectionNaverProductUpdateApiEntryDecisionStatus: status,
    lookupOneTimeSucceeded: overrides.lookupOneTimeSucceeded ?? true,
    lookupHttpStatusCode: overrides.lookupHttpStatusCode ?? 200,
    lookupActualCallCount: overrides.lookupActualCallCount ?? 1,
    lookupResponseShapeKeys: overrides.lookupResponseShapeKeys ?? ['originProduct', 'smartstoreChannelProduct'],
    lookupProductNoMatched: overrides.lookupProductNoMatched ?? null,
    productUpdateApiEntryDeferred: overrides.productUpdateApiEntryDeferred ?? true,
    productUpdateApiEntryDeferredReason:
      overrides.productUpdateApiEntryDeferredReason ?? 'PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_EVIDENCE',
  } as unknown as TmsFastConnectionNaverProductUpdateApiEntryDecisionView;
}

describe('Task 412 - Fast Connection Naver Product Lookup Response Product Identity Field Mapping Review', () => {
  it('Task 411 DEFERRED_PENDING_PRODUCT_IDENTITY → Task 412 REVIEW_REQUIRED', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(
      view.fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
    );
    assert.equal(
      view.recommendedCurrentReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
    );
  });

  it('Task 411 ALLOWED_FOR_FUTURE_REVIEW → Task 412 REVIEW_OPTIONAL', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View('TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW', {
        lookupProductNoMatched: true,
        productUpdateApiEntryDeferred: false,
        productUpdateApiEntryDeferredReason: null,
      })
    );
    assert.equal(
      view.fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_OPTIONAL'
    );
  });

  it('Task 411 READY → Task 412 READY', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View('TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_READY')
    );
    assert.equal(
      view.fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READY'
    );
  });

  it('Task 411 BLOCKED → Task 412 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View('TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED')
    );
    assert.equal(
      view.fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_BLOCKED'
    );
  });

  it('Task 411 NOT_STARTED → Task 412 NOT_STARTED', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View('TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED')
    );
    assert.equal(
      view.fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_NOT_STARTED'
    );
  });

  it('상태 매핑이 exhaustive하다 (5개 상태 모두 커버)', () => {
    const cases: Array<{
      status: TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus;
      expected: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus;
    }> = [
      {
        status:
          'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_OPTIONAL',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_READY',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READY',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_BLOCKED',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_NOT_STARTED',
      },
    ];
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
        makeDummyTask411View(c.status)
      );
      assert.equal(
        view.fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
        c.expected
      );
    }
    assert.equal(cases.length, 5);
  });

  it('8개 Field Mapping Review 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.ok(view.productIdentityFieldMappingReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.task411EntryDecisionReferenceItems.length > 0, 'group 2');
    assert.ok(view.maskedResponseShapeReferenceItems.length > 0, 'group 3');
    assert.ok(view.productIdentityFieldCandidatePathsItems.length > 0, 'group 4');
    assert.ok(view.currentMatchingGapAnalysisItems.length > 0, 'group 5');
    assert.ok(view.updateApiEntryStillDeferredGuardItems.length > 0, 'group 6');
    assert.ok(view.rawResponseSecretTokenNonExposureGuardItems.length > 0, 'group 7');
    assert.ok(view.nextMaskedShapeAugmentationRoadmapItems.length > 0, 'group 8');
    assert.equal(view.fieldMappingReviewGroupCount, 8);
  });

  it('lookupOneTimeSucceeded가 true이고 lookupHttpStatusCode가 200이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.lookupOneTimeSucceeded, true);
    assert.equal(view.lookupHttpStatusCode, 200);
  });

  it('lookupActualCallCount가 1이고 lookupTargetProductNo가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.lookupActualCallCount, 1);
    assert.equal(view.lookupTargetProductNo, '6597910207');
  });

  it('lookupResponseShapeKeys가 originProduct, smartstoreChannelProduct만 포함한다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.deepEqual(view.lookupResponseShapeKeys, ['originProduct', 'smartstoreChannelProduct']);
  });

  it('lookupProductNoMatched가 null이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.lookupProductNoMatched, null);
  });

  it('candidate path 목록이 포함되고 7개 후보를 갖는다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.productIdentityFieldCandidates.length, 7);
    assert.deepEqual(
      view.productIdentityFieldCandidates.map((c) => c.path),
      [
        'smartstoreChannelProduct.channelProductNo',
        'smartstoreChannelProduct.id',
        'smartstoreChannelProduct.productNo',
        'smartstoreChannelProduct.originProductNo',
        'originProduct.originProductNo',
        'originProduct.id',
        'originProduct.productNo',
      ]
    );
  });

  it('모든 candidate path의 candidatePathOnly가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    for (const candidate of view.productIdentityFieldCandidates) {
      assert.equal(candidate.candidatePathOnly, true);
    }
  });

  it('모든 candidate path의 actualValueRead가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    for (const candidate of view.productIdentityFieldCandidates) {
      assert.equal(candidate.actualValueRead, false);
    }
  });

  it('모든 candidate path의 actualValueDisplayed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    for (const candidate of view.productIdentityFieldCandidates) {
      assert.equal(candidate.actualValueDisplayed, false);
    }
  });

  it('모든 candidate path의 actualRawResponseAccessed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    for (const candidate of view.productIdentityFieldCandidates) {
      assert.equal(candidate.actualRawResponseAccessed, false);
    }
  });

  it('모든 candidate path의 matchConfirmed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    for (const candidate of view.productIdentityFieldCandidates) {
      assert.equal(candidate.matchConfirmed, false);
    }
  });

  it('모든 candidate path의 requiresMaskedShapeAugmentation이 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    for (const candidate of view.productIdentityFieldCandidates) {
      assert.equal(candidate.requiresMaskedShapeAugmentation, true);
    }
  });

  it('productIdentityFieldMappingRequired가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.productIdentityFieldMappingRequired, true);
  });

  it('productIdentityMatchConfirmed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.productIdentityMatchConfirmed, false);
  });

  it('maskedResponseShapeAugmentationRequired가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.maskedResponseShapeAugmentationRequired, true);
  });

  it('rawResponseReviewAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.rawResponseReviewAllowed, false);
  });

  it('productUpdateApiEntryAllowedNow가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.productUpdateApiEntryAllowedNow, false);
  });

  it('productUpdateApiCallAllowed/priceChangeAllowed/stockChangeAllowed/dbWriteAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.productUpdateApiCallAllowed, false);
    assert.equal(view.priceChangeAllowed, false);
    assert.equal(view.stockChangeAllowed, false);
    assert.equal(view.dbWriteAllowed, false);
  });

  it('actualNaverApiCallInTask412가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.actualNaverApiCallInTask412, false);
  });

  it('actualProductLookupApiRecall이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.actualProductLookupApiRecall, false);
  });

  it('actualEnvReadInTask412가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.actualEnvReadInTask412, false);
  });

  it('actualSecretAccessInTask412가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.actualSecretAccessInTask412, false);
  });

  it('actualTokenUseInTask412가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.actualTokenUseInTask412, false);
  });

  it('actualRawApiResponseExposure/Stored가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualRawApiResponseStored, false);
  });

  it('recommendedMappingReviewDecision이 NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(
      view.recommendedMappingReviewDecision,
      'NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
    );
  });

  it('recommendedNextStep이 NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(
      view.recommendedNextStep,
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW'
    );
  });

  it('recommendedSafetyMode가 SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_FIELD_MAPPING_CONFIRMED다', () => {
    const view = buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
      makeDummyTask411View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
      )
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_FIELD_MAPPING_CONFIRMED');
  });
});
