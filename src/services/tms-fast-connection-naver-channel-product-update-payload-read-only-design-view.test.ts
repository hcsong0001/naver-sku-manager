import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView,
} from './tms-fast-connection-naver-channel-product-update-payload-read-only-design-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-payload-design-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView,
} from './tms-fast-connection-naver-channel-product-no-update-identifier-official-review-view.service';

function makeApprovalPacketView(): TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView {
  return {
    taskId: 430,
    title: 'Task 430 - Naver 채널 상품 수정 Payload 설계 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    sourceTaskId: 429,
    targetProductNo: '6597910207',
    channelProductNoCanBeUsedAsUpdatePathParameter: true,
    productUpdateApiEntryDecision: 'STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN',
    canBuildUpdatePayload: false,
    canCallUpdateApi: false,
    nextPayloadDesignRequiresSeparateApproval: true,
    requiredApprovalPhrase: 'Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.',
    approvalScope: [],
    continuedForbiddenItems: [],
    nextTask: 'Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계',
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

function makeOfficialReviewView(): TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView {
  return {
    taskId: 429,
    title: 'Task 429',
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

describe('buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView', () => {
  it('designStatus는 READ_ONLY_PAYLOAD_DESIGN_COMPLETED', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.designStatus, 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED');
  });

  it('targetChannelProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.targetChannelProductNo, '6597910207');
  });

  it('updateEndpoint는 PUT /v2/products/channel-products/:channelProductNo', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.updateEndpoint, 'PUT /v2/products/channel-products/:channelProductNo');
  });

  it('payloadDesignMode는 READ_ONLY_NON_TRANSMITTABLE', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.payloadDesignMode, 'READ_ONLY_NON_TRANSMITTABLE');
  });

  it('canBuildTransmittablePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.canBuildTransmittablePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('productUpdateApiEntryDecision은 BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW');
  });

  it('설계 그룹이 7개 이상 생성됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.ok(result.designGroups.length >= 7, `설계 그룹 수: ${result.designGroups.length}`);
  });

  it('nonTransmittablePayloadDraft에 transmittablePayloadGenerated false가 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.nonTransmittablePayloadDraft.safety.transmittablePayloadGenerated, false);
    assert.strictEqual(result.nonTransmittablePayloadDraft.path.transmittable, false);
    assert.strictEqual(result.nonTransmittablePayloadDraft.bodyDesign.originProduct.actualValuesIncluded, false);
    assert.strictEqual(result.nonTransmittablePayloadDraft.bodyDesign.originProduct.priceChangeIncluded, false);
    assert.strictEqual(result.nonTransmittablePayloadDraft.bodyDesign.originProduct.stockChangeIncluded, false);
  });

  it('금지 항목에 수정 API 호출, 실제 전송 가능한 payload, 가격/재고 변경, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    const forbiddenText = result.continuedForbiddenItems.join(' ');
    assert.ok(forbiddenText.includes('수정 API 호출'), '수정 API 호출이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('payload'), 'payload가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('가격'), '가격이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('DB write'), 'DB write가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('raw') || forbiddenText.includes('secret'), 'raw/secret이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('POST') || forbiddenText.includes('버튼') || forbiddenText.includes('submit'), 'POST/button/submit이 금지 항목에 없음');
  });

  it('다음 Task가 Task 432로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
      makeApprovalPacketView(), makeOfficialReviewView()
    );
    assert.strictEqual(result.nextRecommendedTask, 'Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면');
  });
});
