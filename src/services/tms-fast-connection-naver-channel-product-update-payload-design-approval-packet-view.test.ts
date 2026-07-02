import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView,
  CHANNEL_PRODUCT_UPDATE_PAYLOAD_DESIGN_APPROVAL_PHRASE,
} from './tms-fast-connection-naver-channel-product-update-payload-design-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView,
} from './tms-fast-connection-naver-channel-product-no-update-identifier-official-review-view.service';

function makeOfficialReviewView(): TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView {
  return {
    taskId: 429,
    title: 'Task 429 - Naver channelProductNo 수정 API 식별자 공식 검토',
    reviewStatus: 'CHANNEL_PRODUCT_NO_IDENTIFIER_REVIEW_COMPLETED',
    userApprovalPhrase: 'Naver channelProductNo 수정 API 식별자 공식 검토를 별도로 승인합니다.',
    approvedPhraseAccepted: true,
    targetProductNo: '6597910207',
    officialReadEndpoint: 'GET /v2/products/channel-products/:channelProductNo',
    officialUpdateEndpoint: 'PUT /v2/products/channel-products/:channelProductNo',
    channelProductNoCanBeUsedAsUpdatePathParameter: true,
    identifierReviewDecision: 'CHANNEL_PRODUCT_NO_CAN_BE_USED_AS_UPDATE_PATH_PARAMETER',
    identifierReviewDecisionReason: 'reason',
    productUpdateApiEntryDecision: 'STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN',
    canBuildUpdatePayload: false,
    canCallUpdateApi: false,
    nextActionRequiresSeparateApproval: true,
    reviewItems: [],
    nextRecommendedTask: 'Task 430 - Naver 채널 상품 수정 Payload 설계 승인 Packet',
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

describe('buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView', () => {
  it('channelProductNoCanBeUsedAsUpdatePathParameter true이면 승인 Packet 상태는 WAITING_FOR_SEPARATE_USER_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    assert.strictEqual(result.approvalPacketStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('승인 문구가 정확히 일치', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.'
    );
    assert.strictEqual(result.requiredApprovalPhrase, CHANNEL_PRODUCT_UPDATE_PAYLOAD_DESIGN_APPROVAL_PHRASE);
  });

  it('targetProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    assert.strictEqual(result.targetProductNo, '6597910207');
  });

  it('productUpdateApiEntryDecision은 STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN');
  });

  it('canBuildUpdatePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    assert.strictEqual(result.canBuildUpdatePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('승인 범위에 read-only payload 설계, path parameter 설계, 필수/선택 필드 구분이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    const scopeText = result.approvalScope.join(' ');
    assert.ok(scopeText.includes('read-only') || scopeText.includes('Read-Only'), 'read-only가 승인 범위에 없음');
    assert.ok(scopeText.includes('path parameter'), 'path parameter가 승인 범위에 없음');
    assert.ok(scopeText.includes('필수') && scopeText.includes('선택'), '필수/선택 필드 구분이 승인 범위에 없음');
  });

  it('금지 항목에 수정 API 호출, 실제 전송 가능한 payload 생성, 가격/재고, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    const forbiddenText = result.continuedForbiddenItems.join(' ');
    assert.ok(forbiddenText.includes('수정 API 호출'), '수정 API 호출이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('payload'), 'payload가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('가격'), '가격이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('DB write'), 'DB write가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('raw') || forbiddenText.includes('secret'), 'raw/secret이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('POST') || forbiddenText.includes('버튼') || forbiddenText.includes('submit'), 'POST/button/submit이 금지 항목에 없음');
  });

  it('다음 Task가 Task 431로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
      makeOfficialReviewView()
    );
    assert.strictEqual(result.nextTask, 'Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계');
  });
});
