import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-actual-collection-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView,
} from './tms-fast-connection-naver-product-identity-field-exploration-final-gate-view.service';
import {
  type TmsNaverProductIdentityFieldExplorationSummary,
} from './tms-naver-product-identity-field-exploration.harness';

function makeFinalGateView(): TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView {
  return {
    finalGateStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
  } as TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView;
}

function makeSummary(
  overrides: Partial<TmsNaverProductIdentityFieldExplorationSummary> = {}
): TmsNaverProductIdentityFieldExplorationSummary {
  return {
    executed: true,
    lookupRecallCount: 1,
    targetProductNo: '6597910207',
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    httpStatus: 200,
    success: true,
    topLevelKeys: ['originProduct', 'smartstoreChannelProduct'],
    exploredKeyNameGroups: [
      { groupId: 'top-level-key-names', matchedKeyNames: ['originProduct', 'smartstoreChannelProduct'] },
    ],
    candidateFieldResults: [
      {
        path: 'smartstoreChannelProduct.channelProductNo',
        exists: true,
        valueType: 'number',
        maskedPreviewLast4: '****0207',
        equalsTargetProductNo: true,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
    ],
    productIdentityConfidenceScore: 100,
    productIdentityMatchConfirmed: true,
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

describe('Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집 ViewModel', () => {
  it('lookupRecallCount가 1을 초과하지 않는다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
      makeFinalGateView(),
      makeSummary()
    );

    assert.equal(view.lookupRecallCount <= 1, true);
    assert.equal(view.maxLookupRecallCount, 1);
  });

  it('targetProductNo는 6597910207로 고정된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
      makeFinalGateView(),
      makeSummary()
    );

    assert.equal(view.targetProductNo, '6597910207');
  });

  it('equalsTargetProductNo true와 confidence 100이면 match confirmed 처리된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
      makeFinalGateView(),
      makeSummary()
    );

    assert.equal(view.collectionStatus, 'COMPLETED');
    assert.equal(view.productIdentityMatchConfirmed, true);
    assert.equal(view.productUpdateApiEntryDecision, 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL');
  });

  it('식별 실패 시 productUpdateApiEntryDecision은 BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
      makeFinalGateView(),
      makeSummary({
        candidateFieldResults: [
          {
            path: 'smartstoreChannelProduct.channelProductNo',
            exists: true,
            valueType: 'number',
            maskedPreviewLast4: '****9999',
            equalsTargetProductNo: false,
            rawValueDisplayed: false,
            rawValueStored: false,
            rawResponseAccessedForDisplay: false,
          },
        ],
        productIdentityConfidenceScore: 30,
        productIdentityMatchConfirmed: false,
      })
    );

    assert.equal(view.productIdentityMatchConfirmed, false);
    assert.equal(view.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('실행 실패 결과는 FAILED 상태다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
      makeFinalGateView(),
      makeSummary({
        success: false,
        httpStatus: 404,
        productIdentityConfidenceScore: 0,
        candidateFieldResults: [],
      })
    );

    assert.equal(view.collectionStatus, 'FAILED');
  });

  it('요약이 없으면 BLOCKED 상태다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
      makeFinalGateView()
    );

    assert.equal(view.collectionStatus, 'BLOCKED');
    assert.equal(view.executed, false);
  });

  it('상품 수정 API/가격/재고/DB write 동작은 없다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
      makeFinalGateView(),
      makeSummary()
    );

    assert.equal(view.actualProductUpdateApiCall, false);
    assert.equal(view.actualPriceChange, false);
    assert.equal(view.actualStockChange, false);
    assert.equal(view.actualDbWrite, false);
  });
});
