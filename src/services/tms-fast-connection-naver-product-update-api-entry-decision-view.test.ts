import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView,
  type TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus,
} from './tms-fast-connection-naver-product-update-api-entry-decision-view.service';
import { type TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus, type TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView } from './tms-fast-connection-naver-product-lookup-one-time-result-evidence-view.service';

function makeDummyTask410View(
  status: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
  overrides: {
    productNoMatched?: boolean | null;
    success?: boolean;
    httpStatusCode?: number | null;
    actualLookupCallCount?: number;
    responseShapeKeys?: string[];
  } = {}
): TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView {
  return {
    fastConnectionNaverProductLookupOneTimeResultEvidenceStatus: status,
    productNoMatched: overrides.productNoMatched ?? null,
    success: overrides.success ?? true,
    httpStatusCode: overrides.httpStatusCode ?? 200,
    actualLookupCallCount: overrides.actualLookupCallCount ?? 1,
    responseShapeKeys: overrides.responseShapeKeys ?? ['originProduct', 'smartstoreChannelProduct'],
  } as unknown as TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView;
}

describe('Task 411 - Fast Connection Naver Product Update Api Entry Decision', () => {
  it('Task 410 SUCCESS_CONFIRMED + productNoMatched null → Task 411 DEFERRED_PENDING_PRODUCT_IDENTITY', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED',
        { productNoMatched: null }
      )
    );
    assert.equal(
      view.fastConnectionNaverProductUpdateApiEntryDecisionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
    );
  });

  it('Task 410 SUCCESS_CONFIRMED + productNoMatched true → Task 411 ALLOWED_FOR_FUTURE_REVIEW', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View(
        'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED',
        { productNoMatched: true }
      )
    );
    assert.equal(
      view.fastConnectionNaverProductUpdateApiEntryDecisionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW'
    );
  });

  it('Task 410 FAILED_CONFIRMED → Task 411 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_FAILED_CONFIRMED', {
        success: false,
        httpStatusCode: 404,
      })
    );
    assert.equal(
      view.fastConnectionNaverProductUpdateApiEntryDecisionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED'
    );
  });

  it('Task 410 READY → Task 411 READY', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_READY')
    );
    assert.equal(
      view.fastConnectionNaverProductUpdateApiEntryDecisionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_READY'
    );
  });

  it('Task 410 BLOCKED → Task 411 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_BLOCKED')
    );
    assert.equal(
      view.fastConnectionNaverProductUpdateApiEntryDecisionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED'
    );
  });

  it('Task 410 NOT_STARTED → Task 411 NOT_STARTED', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_NOT_STARTED')
    );
    assert.equal(
      view.fastConnectionNaverProductUpdateApiEntryDecisionStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED'
    );
  });

  it('상태 매핑이 exhaustive하다 (productNoMatched 분기 포함 6개 케이스 모두 커버)', () => {
    const cases: Array<{
      status: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus;
      productNoMatched?: boolean | null;
      success?: boolean;
      expected: TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus;
    }> = [
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED',
        productNoMatched: null,
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED',
        productNoMatched: true,
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_FAILED_CONFIRMED',
        success: false,
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_READY',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_READY',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_BLOCKED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED',
      },
      {
        status: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_NOT_STARTED',
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED',
      },
    ];
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
        makeDummyTask410View(c.status, { productNoMatched: c.productNoMatched, success: c.success })
      );
      assert.equal(view.fastConnectionNaverProductUpdateApiEntryDecisionStatus, c.expected);
    }
    assert.equal(cases.length, 6);
  });

  it('8개 Entry Decision 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.ok(view.productUpdateApiEntryDecisionReadinessItems.length > 0, 'group 1');
    assert.ok(view.task410LookupResultEvidenceReferenceItems.length > 0, 'group 2');
    assert.ok(view.lookupSuccessButProductIdentityPendingDecisionItems.length > 0, 'group 3');
    assert.ok(view.productNoMatchedNullInterpretationItems.length > 0, 'group 4');
    assert.ok(view.productUpdateApiEntryDeferredGuardItems.length > 0, 'group 5');
    assert.ok(view.priceStockDbWriteStillBlockedGuardItems.length > 0, 'group 6');
    assert.ok(view.rawResponseSecretTokenNonExposureEvidenceItems.length > 0, 'group 7');
    assert.ok(view.nextProductIdentityFieldMappingRoadmapItems.length > 0, 'group 8');
    assert.equal(view.entryDecisionGroupCount, 8);
  });

  it('lookupOneTimeSucceeded가 true이고 lookupHttpStatusCode가 200이다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.lookupOneTimeSucceeded, true);
    assert.equal(view.lookupHttpStatusCode, 200);
  });

  it('lookupActualCallCount가 1이고 lookupTargetProductNo가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.lookupActualCallCount, 1);
    assert.equal(view.lookupTargetProductNo, '6597910207');
  });

  it('lookupResponseShapeKeys가 originProduct, smartstoreChannelProduct만 포함한다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.deepEqual(view.lookupResponseShapeKeys, ['originProduct', 'smartstoreChannelProduct']);
  });

  it('lookupProductNoMatched가 null이다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.lookupProductNoMatched, null);
  });

  it('productUpdateApiEntryAllowedNow가 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.productUpdateApiEntryAllowedNow, false);
  });

  it('productUpdateApiEntryDeferred가 true다 (productNoMatched null 케이스)', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.productUpdateApiEntryDeferred, true);
  });

  it('productIdentityFieldMappingRequired가 true다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.productIdentityFieldMappingRequired, true);
  });

  it('maskedResponseShapeReviewRequired가 true다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.maskedResponseShapeReviewRequired, true);
  });

  it('rawResponseReviewAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.rawResponseReviewAllowed, false);
  });

  it('productUpdateApiCallAllowed/priceChangeAllowed/stockChangeAllowed/dbWriteAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.productUpdateApiCallAllowed, false);
    assert.equal(view.priceChangeAllowed, false);
    assert.equal(view.stockChangeAllowed, false);
    assert.equal(view.dbWriteAllowed, false);
  });

  it('actualNaverApiCallInTask411이 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.actualNaverApiCallInTask411, false);
  });

  it('actualProductLookupApiRecall이 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.actualProductLookupApiRecall, false);
  });

  it('actualEnvReadInTask411이 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.actualEnvReadInTask411, false);
  });

  it('actualSecretAccessInTask411이 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.actualSecretAccessInTask411, false);
  });

  it('actualTokenUseInTask411이 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.actualTokenUseInTask411, false);
  });

  it('actualRawApiResponseExposure/Stored가 false다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualRawApiResponseStored, false);
  });

  it('recommendedEntryDecision이 NAVER_PRODUCT_UPDATE_API_ENTRY_DEFERRED_PENDING_PRODUCT_IDENTITY다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(
      view.recommendedEntryDecision,
      'NAVER_PRODUCT_UPDATE_API_ENTRY_DEFERRED_PENDING_PRODUCT_IDENTITY'
    );
  });

  it('recommendedNextStep이 NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(
      view.recommendedNextStep,
      'NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW'
    );
  });

  it('recommendedSafetyMode가 SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_CONFIRMED다', () => {
    const view = buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
      makeDummyTask410View('TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED')
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_CONFIRMED');
  });
});
