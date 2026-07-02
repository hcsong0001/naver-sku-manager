import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-result-decision-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-official-structure-review-view.service';

function makeOfficialStructureReviewView(): TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView {
  return {
    taskId: 426,
    title: 'Task 426 - Naver 상품 식별 전략 재설계 및 공식 구조 검토',
    reviewStatus: 'OFFICIAL_STRUCTURE_REVIEW_COMPLETED',
    userApprovalPhrase: 'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.',
    targetProductNo: '6597910207',
    sourceLookupSucceeded: true,
    sourceResponseTopLevelKeys: ['originProduct', 'smartstoreChannelProduct'],
    previousCandidatePathCount: 7,
    previousCandidateAllExistsFalse: true,
    additionalCandidatePathCount: 5,
    additionalCandidateAllEqualsTargetFalse: true,
    additionalCandidatePaths: [],
    randomFieldExplorationRecommended: false,
    officialStructureReviewCompleted: true,
    apiRecallPerformed: false,
    productUpdateApiCalled: false,
    productUpdateApiEntryDecision: 'BLOCKED',
    reviewItems: [],
    strategyConclusion: 'conclusion',
    nextStrategyCandidates: [],
    nextRecommendedTask: 'Task 427 - Naver 상품 식별 전략 재설계 결과 판단 화면',
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

describe('buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView', () => {
  it('Task 426 reviewStatus가 OFFICIAL_STRUCTURE_REVIEW_COMPLETED이면 decisionStatus는 STRATEGY_RESULT_DECISION_READY', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.decisionStatus, 'STRATEGY_RESULT_DECISION_READY');
  });

  it('productUpdateApiEntryDecision은 BLOCKED', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('randomFieldExplorationRecommended는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.randomFieldExplorationRecommended, false);
  });

  it('additionalApiRecallRecommended는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.additionalApiRecallRecommended, false);
  });

  it('priorityStrategyCandidate는 A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.priorityStrategyCandidate, 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW');
  });

  it('전략 후보가 5개 이상 생성됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.ok(result.strategyCandidates.length >= 5, `전략 후보 수: ${result.strategyCandidates.length}`);
  });

  it('우선순위 1위는 A, 2위는 D', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    const sorted = [...result.strategyCandidates].sort((a, b) => a.priority - b.priority);
    assert.strictEqual(sorted[0].label, 'A', '1순위가 A가 아님');
    assert.strictEqual(sorted[1].label, 'D', '2순위가 D가 아님');
  });

  it('canBuildUpdatePayload는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.canBuildUpdatePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('nextRecommendedTask가 Task 428로 표시됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
      makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.nextRecommendedTask, 'Task 428 - Naver channelProductNo 수정 API 식별자 검토 승인 Packet');
  });
});
