import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView,
} from './tms-fast-connection-naver-channel-product-update-payload-design-result-decision-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView,
} from './tms-fast-connection-naver-channel-product-update-payload-read-only-design-view.service';

function makeApprovalPacketView(): TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView {
  return {
    taskId: 433,
    title: 'Task 433 - Naver 채널 상품 수정 Payload Safety Review 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    sourceDecisionStatus: 'PAYLOAD_DESIGN_RESULT_DECISION_READY',
    targetChannelProductNo: '6597910207',
    payloadSafetyReviewRequired: true,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    nextSafetyReviewRequiresSeparateApproval: true,
    requiredApprovalPhrase: 'Naver 채널 상품 수정 Payload Safety Review를 별도로 승인합니다.',
    approvalScope: [],
    continuedForbiddenItems: [],
    nextTask: 'Task 434 - Naver 채널 상품 수정 Payload Safety Review',
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

function makePayloadReadOnlyDesignView(): TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView {
  return {
    taskId: 431,
    title: 'Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계',
    designStatus: 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED',
    userApprovalPhrase: 'Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.',
    approvedPhraseAccepted: true,
    targetChannelProductNo: '6597910207',
    updateEndpoint: 'PUT /v2/products/channel-products/:channelProductNo',
    pathParameterName: 'channelProductNo',
    pathParameterValue: '6597910207',
    channelProductNoCanBeUsedAsUpdatePathParameter: true,
    payloadDesignMode: 'READ_ONLY_NON_TRANSMITTABLE',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW',
    designGroups: [],
    nonTransmittablePayloadDraft: {
      path: { channelProductNo: '6597910207', transmittable: false },
      bodyDesign: {
        originProduct: {
          designOnly: true,
          actualValuesIncluded: false,
          fullProductNameIncluded: false,
          priceChangeIncluded: false,
          stockChangeIncluded: false,
        },
        smartstoreChannelProduct: { designOnly: true, actualValuesIncluded: false },
      },
      safety: { transmittablePayloadGenerated: false, updateApiCallable: false, requiresNextReview: true },
    },
    continuedForbiddenItems: [],
    nextRecommendedTask: 'Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면',
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

describe('buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView', () => {
  it('reviewStatus는 PAYLOAD_SAFETY_REVIEW_COMPLETED', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.reviewStatus, 'PAYLOAD_SAFETY_REVIEW_COMPLETED');
  });

  it('targetChannelProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.targetChannelProductNo, '6597910207');
  });

  it('payloadDesignMode는 READ_ONLY_NON_TRANSMITTABLE', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.payloadDesignMode, 'READ_ONLY_NON_TRANSMITTABLE');
  });

  it('safety review 항목이 8개 이상 생성됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.ok(result.safetyReviewItems.length >= 8, `Safety review 항목 수가 8 미만: ${result.safetyReviewItems.length}`);
    assert.strictEqual(result.safetyReviewItemCount, result.safetyReviewItems.length);
  });

  it('가격 변경 허용 여부는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.priceChangeAllowed, false);
  });

  it('재고 변경 허용 여부는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.stockChangeAllowed, false);
  });

  it('canBuildTransmittablePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.canBuildTransmittablePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('productUpdateApiEntryDecision은 BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL');
  });

  it('다음 Task가 Task 435로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.nextRecommendedTask, 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet');
  });

  it('금지 항목에 수정 API 호출, 실제 전송 가능한 payload, 가격/재고 변경, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
      makeApprovalPacketView(), makeResultDecisionView(), makePayloadReadOnlyDesignView()
    );
    const forbiddenText = result.continuedForbiddenItems.join(' ');
    assert.ok(forbiddenText.includes('수정 API 호출'), '수정 API 호출이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('payload'), 'payload가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('가격'), '가격이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('DB write'), 'DB write가 금지 항목에 없음');
    assert.ok(forbiddenText.includes('raw') || forbiddenText.includes('secret'), 'raw/secret이 금지 항목에 없음');
    assert.ok(forbiddenText.includes('POST') || forbiddenText.includes('버튼') || forbiddenText.includes('submit'), 'POST/button/submit이 금지 항목에 없음');
  });
});
