import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView,
  CHANNEL_PRODUCT_UPDATE_PAYLOAD_SAFETY_REVIEW_APPROVAL_PHRASE,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView,
} from './tms-fast-connection-naver-channel-product-update-payload-design-result-decision-view.service';

function makeResultDecisionView(): TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView {
  return {
    taskId: 432,
    title: 'Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면',
    decisionStatus: 'PAYLOAD_DESIGN_RESULT_DECISION_READY',
    targetChannelProductNo: '6597910207',
    sourceDesignStatus: 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED',
    payloadDesignMode: 'READ_ONLY_NON_TRANSMITTABLE',
    designGroupCount: 7,
    payloadDesignAcceptedForReview: true,
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW',
    payloadSafetyReviewRequired: true,
    safetyReviewItems: [],
    nextRecommendedTask: 'Task 433 - Naver 채널 상품 수정 Payload Safety Review 승인 Packet',
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

describe('buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView', () => {
  it('payloadSafetyReviewRequired true이면 승인 Packet 상태는 WAITING_FOR_SEPARATE_USER_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.approvalPacketStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('승인 문구가 정확히 일치', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver 채널 상품 수정 Payload Safety Review를 별도로 승인합니다.'
    );
    assert.strictEqual(result.requiredApprovalPhrase, CHANNEL_PRODUCT_UPDATE_PAYLOAD_SAFETY_REVIEW_APPROVAL_PHRASE);
  });

  it('targetChannelProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.targetChannelProductNo, '6597910207');
  });

  it('productUpdateApiEntryDecision은 BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW');
  });

  it('canBuildTransmittablePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.canBuildTransmittablePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('승인 범위에 path parameter 고정, 필수 필드 누락 검토, 가격/재고 차단 검토가 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    const scopeText = result.approvalScope.join(' ');
    assert.ok(scopeText.includes('path parameter') || scopeText.includes('channelProductNo'), 'path parameter 고정 검토가 승인 범위에 없음');
    assert.ok(scopeText.includes('필수 필드') || scopeText.includes('누락'), '필수 필드 누락 검토가 승인 범위에 없음');
    assert.ok(scopeText.includes('가격') && scopeText.includes('재고'), '가격/재고 차단 검토가 승인 범위에 없음');
  });

  it('금지 항목에 수정 API 호출, 실제 전송 가능한 payload 생성, 가격/재고, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    const forbiddenText = result.continuedForbiddenItems.join(' ');
    assert.ok(forbiddenText.includes('수정 API 호출'), '수정 API 호출이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('payload'), 'payload가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('가격'), '가격이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('DB write'), 'DB write가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('raw') || forbiddenText.includes('secret'), 'raw/secret이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('POST') || forbiddenText.includes('버튼') || forbiddenText.includes('submit'), 'POST/button/submit이 금지 항목에 없음');
  });

  it('다음 Task가 Task 434로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
      makeResultDecisionView()
    );
    assert.strictEqual(result.nextTask, 'Task 434 - Naver 채널 상품 수정 Payload Safety Review');
  });
});
