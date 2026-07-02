import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView,
  CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW_APPROVAL_PHRASE,
} from './tms-fast-connection-naver-channel-product-no-update-identifier-review-approval-packet-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-result-decision-view.service';

function makeResultDecisionView(): TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView {
  return {
    taskId: 427,
    title: 'Task 427 - Naver 상품 식별 전략 재설계 결과 판단 화면',
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

describe('buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView', () => {
  it('priorityStrategyCandidate가 A이면 승인 Packet 상태는 WAITING_FOR_SEPARATE_USER_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.approvalPacketStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('승인 문구가 정확히 일치', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver channelProductNo 수정 API 식별자 공식 검토를 별도로 승인합니다.'
    );
    assert.strictEqual(result.requiredApprovalPhrase, CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW_APPROVAL_PHRASE);
  });

  it('targetProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.targetProductNo, '6597910207');
  });

  it('productUpdateApiEntryDecision은 BLOCKED', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('canBuildUpdatePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.canBuildUpdatePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('승인 범위에 channelProductNo, 수정 API path parameter, body identifier 구분 검토가 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    const scopeText = result.approvalScope.join(' ');
    assert.ok(scopeText.includes('channelProductNo'), 'channelProductNo가 승인 범위에 없음');
    assert.ok(scopeText.includes('path parameter'), 'path parameter가 승인 범위에 없음');
    assert.ok(scopeText.includes('body identifier') || scopeText.includes('body'), 'body identifier가 승인 범위에 없음');
  });

  it('금지 항목에 API 재호출, 수정 API 호출, payload 생성, 가격/재고, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    const forbiddenText = result.continuedForbiddenItems.join(' ');
    assert.ok(forbiddenText.includes('API 재호출') || forbiddenText.includes('재호출'), 'API 재호출이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('수정 API 호출'), '수정 API 호출이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('payload'), 'payload가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('가격'), '가격이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('DB write'), 'DB write가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('raw') || forbiddenText.includes('secret'), 'raw/secret이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('POST') || forbiddenText.includes('버튼') || forbiddenText.includes('submit'), 'POST/button/submit이 금지 항목에 없음');
  });

  it('다음 Task가 Task 429로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.nextTask, 'Task 429 - Naver channelProductNo 수정 API 식별자 공식 검토');
  });
});
