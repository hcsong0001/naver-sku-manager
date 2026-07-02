import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverProductIdentityStrategyRedesignView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-result-decision-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-actual-collection-view.service';

function makeResultDecisionView(
  decisionStatus: TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView['decisionStatus']
): TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView {
  return {
    taskId: 422,
    title: 'Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면',
    sourceTaskId: 421,
    targetProductNo: '6597910207',
    sourceLookupSucceeded: true,
    sourceHttpStatus: 200,
    lookupRecallCount: 1,
    previousCandidatePathCount: 7,
    additionalCandidatePathCount: 5,
    matchedCandidatePathCount: 0,
    productIdentityConfidenceScore: 0,
    productIdentityMatchConfirmed: false,
    decisionStatus,
    productUpdateApiEntryDecision: 'BLOCKED',
    blockedReason: 'PRODUCT_IDENTITY_NOT_CONFIRMED_AFTER_ADDITIONAL_FIELD_EXPLORATION',
    decisionReason: 'test reason',
    nextRecommendedTask: 'Task 423 - Naver 상품 조회 응답 구조 기반 식별 전략 재설계 화면',
    separateApprovalRequiredNotice: 'notice',
    additionalCandidateSummaries: [],
    actualNaverApiRecallInTask422: false,
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

function makeActualCollectionView(): TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView {
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
    candidateFieldResults: [],
    productIdentityConfidenceScore: 0,
    productIdentityMatchConfirmed: false,
    productUpdateApiEntryDecision: 'BLOCKED',
    nextRecommendedTask: 'Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면',
    guidance: 'guidance',
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
  };
}

describe('buildTmsFastConnectionNaverProductIdentityStrategyRedesignView', () => {
  it('Task 422가 PRODUCT_IDENTITY_STILL_NOT_CONFIRMED이면 strategyStatus는 STRATEGY_REDESIGN_REQUIRED', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    assert.strictEqual(result.strategyStatus, 'STRATEGY_REDESIGN_REQUIRED');
  });

  it('productUpdateApiEntryDecision은 BLOCKED', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('randomFieldExplorationRecommended는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    assert.strictEqual(result.randomFieldExplorationRecommended, false);
  });

  it('additionalApiRecallRecommended는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    assert.strictEqual(result.additionalApiRecallRecommended, false);
  });

  it('officialStructureReviewNeeded는 true', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    assert.strictEqual(result.officialStructureReviewNeeded, true);
  });

  it('전략 항목이 5개 이상 생성됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    assert.ok(result.strategyItems.length >= 5, `전략 항목 수: ${result.strategyItems.length}`);
  });

  it('forbiddenNextData에 raw response, secret/token/header/signature, 수정 API, 가격/재고, DB write가 포함됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    const allForbidden = result.strategyItems.flatMap((item) => item.forbiddenNextData);
    const hasRaw = allForbidden.some((f) => f.includes('raw response'));
    const hasSecret = allForbidden.some(
      (f) =>
        f.includes('secret') ||
        f.includes('token') ||
        f.includes('header') ||
        f.includes('signature')
    );
    const hasUpdateApi = allForbidden.some((f) => f.includes('수정 API'));
    const hasPriceStock = allForbidden.some((f) => f.includes('가격') || f.includes('재고'));
    const hasDbWrite = allForbidden.some((f) => f.includes('DB write'));
    assert.ok(hasRaw, 'raw response가 forbiddenNextData에 없음');
    assert.ok(hasSecret, 'secret/token/header/signature가 forbiddenNextData에 없음');
    assert.ok(hasUpdateApi, '수정 API가 forbiddenNextData에 없음');
    assert.ok(hasPriceStock, '가격/재고가 forbiddenNextData에 없음');
    assert.ok(hasDbWrite, 'DB write가 forbiddenNextData에 없음');
  });

  it('nextRecommendedTask가 Task 424로 표시됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
      makeResultDecisionView('PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'),
      makeActualCollectionView()
    );
    assert.strictEqual(result.nextRecommendedTask, 'Task 424 - Naver 상품 식별 전략 재설계 승인 Packet');
  });
});
