import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView,
} from './tms-fast-connection-naver-channel-product-no-update-identifier-official-review-view.service';
import {
  type TmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-no-update-identifier-review-approval-packet-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-result-decision-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-official-structure-review-view.service';

function makeApprovalPacketView(): TmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView {
  return {
    taskId: 428,
    title: 'Task 428 - Naver channelProductNo 수정 API 식별자 검토 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    sourceTaskId: 427,
    targetProductNo: '6597910207',
    priorityStrategyCandidate: 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW',
    productUpdateApiEntryDecision: 'BLOCKED',
    canBuildUpdatePayload: false,
    canCallUpdateApi: false,
    nextReviewRequiresSeparateApproval: true,
    requiredApprovalPhrase: 'Naver channelProductNo 수정 API 식별자 공식 검토를 별도로 승인합니다.',
    approvalScope: [],
    continuedForbiddenItems: [],
    nextTask: 'Task 429 - Naver channelProductNo 수정 API 식별자 공식 검토',
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

function makeResultDecisionView(): TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView {
  return {
    taskId: 427,
    title: 'Task 427',
    decisionStatus: 'STRATEGY_RESULT_DECISION_READY',
    sourceReviewStatus: 'OFFICIAL_STRUCTURE_REVIEW_COMPLETED',
    targetProductNo: '6597910207',
    productUpdateApiEntryDecision: 'BLOCKED',
    randomFieldExplorationRecommended: false,
    additionalApiRecallRecommended: false,
    priorityStrategyCandidate: 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW',
    strategyDecision: 'PRIORITIZE_CHANNEL_PRODUCT_NO_IDENTIFIER_REVIEW',
    strategyDecisionReason: 'reason',
    canBuildUpdatePayload: false,
    canCallUpdateApi: false,
    nextActionRequiresSeparateApproval: true,
    strategyCandidates: [],
    nextRecommendedTask: 'Task 428 - Naver channelProductNo 수정 API 식별자 검토 승인 Packet',
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

function makeOfficialStructureReviewView(): TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView {
  return {
    taskId: 426,
    title: 'Task 426',
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

describe('buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView', () => {
  it('reviewStatus는 CHANNEL_PRODUCT_NO_IDENTIFIER_REVIEW_COMPLETED', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.reviewStatus, 'CHANNEL_PRODUCT_NO_IDENTIFIER_REVIEW_COMPLETED');
  });

  it('공식 조회 endpoint가 GET /v2/products/channel-products/:channelProductNo로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.officialReadEndpoint, 'GET /v2/products/channel-products/:channelProductNo');
  });

  it('공식 수정 endpoint가 PUT /v2/products/channel-products/:channelProductNo로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.officialUpdateEndpoint, 'PUT /v2/products/channel-products/:channelProductNo');
  });

  it('channelProductNoCanBeUsedAsUpdatePathParameter는 true', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.channelProductNoCanBeUsedAsUpdatePathParameter, true);
  });

  it('productUpdateApiEntryDecision은 STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN');
  });

  it('canBuildUpdatePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.canBuildUpdatePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('nextActionRequiresSeparateApproval은 true', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.nextActionRequiresSeparateApproval, true);
  });

  it('다음 Task가 Task 430으로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.nextRecommendedTask, 'Task 430 - Naver 채널 상품 수정 Payload 설계 승인 Packet');
  });

  it('금지 항목: API 호출, payload 생성, 가격/재고, DB write, raw/secret 노출, POST/button/submit 없음', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makeOfficialStructureReviewView()
    );
    assert.strictEqual(result.actualNaverApiCall, false);
    assert.strictEqual(result.actualProductUpdateApiCall, false);
    assert.strictEqual(result.canBuildUpdatePayload, false);
    assert.strictEqual(result.actualPriceChange, false);
    assert.strictEqual(result.actualStockChange, false);
    assert.strictEqual(result.actualDbWrite, false);
    assert.strictEqual(result.actualRawResponseExposure, false);
    assert.strictEqual(result.actualRawResponseStored, false);
    assert.strictEqual(result.actualSecretExposure, false);
    assert.strictEqual(result.actualPostApiAdded, false);
    assert.strictEqual(result.actualExecutionButtonAdded, false);
    assert.strictEqual(result.actualApprovalButtonAdded, false);
    assert.strictEqual(result.actualSubmitActionAdded, false);
  });
});
