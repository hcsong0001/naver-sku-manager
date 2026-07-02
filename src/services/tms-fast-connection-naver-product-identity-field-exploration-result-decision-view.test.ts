import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-result-decision-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-actual-collection-view.service';

function makeTask421View(
  overrides: Partial<TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView> = {}
): TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView {
  return {
    taskId: 421,
    title: 'Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집',
    sourceFinalGateStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    collectionStatus: 'COMPLETED',
    explicitSeparateUserApprovalConfirmed: true,
    requiredApprovalPhrase: 'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.',
    targetProductNo: '6597910207',
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    maxLookupRecallCount: 1,
    executed: true,
    lookupRecallCount: 1,
    httpStatus: 200,
    success: true,
    topLevelKeys: ['originProduct', 'smartstoreChannelProduct'],
    exploredKeyNameGroups: [],
    candidateFieldResults: [
      {
        path: 'smartstoreChannelProduct.channelProductNo',
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'smartstoreChannelProduct.id',
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'smartstoreChannelProduct.productNo',
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'smartstoreChannelProduct.originProductNo',
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.originProductNo',
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.id',
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.productNo',
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.deliveryInfo.claimDeliveryInfo.returnAddressId',
        exists: true,
        valueType: 'number',
        maskedPreviewLast4: '****1499',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.deliveryInfo.claimDeliveryInfo.shippingAddressId',
        exists: true,
        valueType: 'number',
        maskedPreviewLast4: '****5497',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.deliveryInfo.deliveryBundleGroupId',
        exists: true,
        valueType: 'number',
        maskedPreviewLast4: '****9127',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.detailAttribute.naverShoppingSearchInfo.brandId',
        exists: true,
        valueType: 'number',
        maskedPreviewLast4: '****0560',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
      {
        path: 'originProduct.leafCategoryId',
        exists: true,
        valueType: 'string',
        maskedPreviewLast4: '****3397',
        equalsTargetProductNo: false,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      },
    ],
    productIdentityConfidenceScore: 30,
    productIdentityMatchConfirmed: false,
    productUpdateApiEntryDecision: 'BLOCKED',
    nextRecommendedTask: 'Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면',
    guidance: 'Task 421 read-only summary',
    sanitizedErrorMessage: null,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualFullProductNameExposure: false,
    actualFullOptionNameExposure: false,
    actualFullSellerManagementCodeExposure: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualRepeatedLookup: false,
    actualDifferentProductLookup: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    ...overrides,
  };
}

describe('Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면', () => {
  it('Task 421 결과 기준 decisionStatus는 PRODUCT_IDENTITY_STILL_NOT_CONFIRMED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View()
    );

    assert.equal(view.decisionStatus, 'PRODUCT_IDENTITY_STILL_NOT_CONFIRMED');
    assert.equal(view.blockedReason, 'PRODUCT_IDENTITY_NOT_CONFIRMED_AFTER_ADDITIONAL_FIELD_EXPLORATION');
  });

  it('matchedCandidatePathCount는 0이다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View()
    );

    assert.equal(view.matchedCandidatePathCount, 0);
  });

  it('additionalCandidatePathCount는 5다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View()
    );

    assert.equal(view.previousCandidatePathCount, 7);
    assert.equal(view.additionalCandidatePathCount, 5);
  });

  it('productIdentityConfidenceScore는 30이다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View()
    );

    assert.equal(view.productIdentityConfidenceScore, 30);
  });

  it('productUpdateApiEntryDecision은 BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View()
    );

    assert.equal(view.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('추가 후보 5개가 모두 equalsTargetProductNo false로 요약된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View()
    );

    assert.equal(view.additionalCandidateSummaries.length, 5);
    assert.equal(
      view.additionalCandidateSummaries.every((candidate) => candidate.equalsTargetProductNo === false),
      true
    );
    assert.deepEqual(
      view.additionalCandidateSummaries.map((candidate) => candidate.maskedPreviewLast4),
      ['****1499', '****5497', '****9127', '****0560', '****3397']
    );
  });

  it('equalsTargetProductNo true와 confidence 100인 경우에만 CONFIRMED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View({
        candidateFieldResults: [
          {
            path: 'originProduct.leafCategoryId',
            exists: true,
            valueType: 'string',
            maskedPreviewLast4: '****0207',
            equalsTargetProductNo: true,
            rawValueDisplayed: false,
            rawValueStored: false,
            rawResponseAccessedForDisplay: false,
          },
        ],
        productIdentityConfidenceScore: 100,
        productIdentityMatchConfirmed: true,
      })
    );

    assert.equal(view.decisionStatus, 'PRODUCT_IDENTITY_CONFIRMED');
    assert.equal(view.productUpdateApiEntryDecision, 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL');
  });

  it('CONFIRMED여도 실제 수정 API 호출은 하지 않고 별도 승인 필요 상태다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
      makeTask421View({
        candidateFieldResults: [
          {
            path: 'originProduct.leafCategoryId',
            exists: true,
            valueType: 'string',
            maskedPreviewLast4: '****0207',
            equalsTargetProductNo: true,
            rawValueDisplayed: false,
            rawValueStored: false,
            rawResponseAccessedForDisplay: false,
          },
        ],
        productIdentityConfidenceScore: 100,
        productIdentityMatchConfirmed: true,
      })
    );

    assert.equal(view.actualProductUpdateApiCall, false);
    assert.equal(view.separateApprovalRequiredNotice.includes('별도 사용자 승인'), true);
  });
});
