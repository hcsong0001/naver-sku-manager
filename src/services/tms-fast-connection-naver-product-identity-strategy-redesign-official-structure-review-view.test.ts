import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-official-structure-review-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-final-gate-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-actual-collection-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-result-decision-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-view.service';

function makeFinalGateView(): TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView {
  return {
    taskId: 425,
    title: 'Task 425 - Naver 상품 식별 전략 재설계 실행 전 Final Gate',
    sourceTaskId: 424,
    finalGateStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetProductNo: '6597910207',
    requiredApprovalPhrase: 'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.',
    approvalStatus: 'NOT_SUBMITTED',
    approvalAccepted: false,
    canProceedToStrategyRedesignReview: false,
    canProceedToOfficialStructureReview: false,
    productUpdateApiEntryDecision: 'BLOCKED',
    officialStructureReviewNeeded: true,
    gateBlockedReason: 'blocked reason',
    forbiddenActions: ['Naver API 재조회'],
    nextTaskIfApproved: 'Task 426 - Naver 상품 식별 전략 재설계 및 공식 구조 검토',
    actualNaverApiCall: false,
    actualOfficialDocReview: false,
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
    title: 'Task 421',
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
    productIdentityConfidenceScore: 30,
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

function makeResultDecisionView(): TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView {
  return {
    taskId: 422,
    title: 'Task 422',
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
    decisionStatus: 'PRODUCT_IDENTITY_STILL_NOT_CONFIRMED',
    productUpdateApiEntryDecision: 'BLOCKED',
    blockedReason: 'PRODUCT_IDENTITY_NOT_CONFIRMED_AFTER_ADDITIONAL_FIELD_EXPLORATION',
    decisionReason: 'reason',
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

function makeStrategyRedesignView(): TmsFastConnectionNaverProductIdentityStrategyRedesignView {
  return {
    taskId: 423,
    title: 'Task 423',
    strategyStatus: 'STRATEGY_REDESIGN_REQUIRED',
    targetProductNo: '6597910207',
    sourceDecisionStatus: 'PRODUCT_IDENTITY_STILL_NOT_CONFIRMED',
    productUpdateApiEntryDecision: 'BLOCKED',
    randomFieldExplorationRecommended: false,
    additionalApiRecallRecommended: false,
    officialStructureReviewNeeded: true,
    findingSummary: [],
    strategyItems: [],
    nextRecommendedTask: 'Task 424 - Naver 상품 식별 전략 재설계 승인 Packet',
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

describe('buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView', () => {
  it('reviewStatus는 OFFICIAL_STRUCTURE_REVIEW_COMPLETED', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.reviewStatus, 'OFFICIAL_STRUCTURE_REVIEW_COMPLETED');
  });

  it('productUpdateApiEntryDecision은 BLOCKED', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('apiRecallPerformed는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.apiRecallPerformed, false);
  });

  it('productUpdateApiCalled는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.productUpdateApiCalled, false);
  });

  it('Task 421 추가 5개 후보가 식별자로 부적합하다고 요약됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.additionalCandidateAllEqualsTargetFalse, true);
    assert.strictEqual(result.additionalCandidatePathCount, 5);
    const r5 = result.reviewItems.find((item) => item.reviewId === 'R5');
    assert.ok(r5, 'R5 항목이 없음');
    assert.ok(
      r5.strategyDecision.includes('부적합') || r5.strategyDecision.includes('폐기'),
      'R5 strategyDecision에 부적합/폐기 언급 없음'
    );
  });

  it('randomFieldExplorationRecommended는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.randomFieldExplorationRecommended, false);
  });

  it('officialStructureReviewCompleted는 true', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.officialStructureReviewCompleted, true);
  });

  it('검토 항목이 7개 이상 생성됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.ok(result.reviewItems.length >= 7, `검토 항목 수: ${result.reviewItems.length}`);
  });

  it('nextRecommendedTask가 Task 427로 표시됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
      makeFinalGateView(),
      makeActualCollectionView(),
      makeResultDecisionView(),
      makeStrategyRedesignView()
    );
    assert.strictEqual(result.nextRecommendedTask, 'Task 427 - Naver 상품 식별 전략 재설계 결과 판단 화면');
  });
});
