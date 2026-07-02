import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-final-gate-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-view.service';

function makeApprovalPacketView(): TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView {
  return {
    taskId: 435,
    title: 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetChannelProductNo: '6597910207',
    sourceReviewStatus: 'PAYLOAD_SAFETY_REVIEW_COMPLETED',
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    nextTransmittablePayloadRequiresSeparateApproval: true,
    requiredApprovalPhrase: 'Naver 채널 상품 수정 Transmittable Payload 생성을 별도로 승인합니다.',
    approvalScope: [],
    continuedForbiddenItems: [],
    nextTask: 'Task 436 - Naver 채널 상품 수정 Transmittable Payload 실행 전 Final Gate',
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

function makePayloadSafetyReviewView(): TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView {
  return {
    taskId: 434,
    title: 'Task 434 - Naver 채널 상품 수정 Payload Safety Review',
    reviewStatus: 'PAYLOAD_SAFETY_REVIEW_COMPLETED',
    userApprovalPhrase: 'Naver 채널 상품 수정 Payload Safety Review를 별도로 승인합니다.',
    safetyReviewApprovedPhraseAccepted: true,
    targetChannelProductNo: '6597910207',
    sourcePayloadDesignStatus: 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED',
    payloadDesignMode: 'READ_ONLY_NON_TRANSMITTABLE',
    safetyReviewItems: [],
    safetyReviewItemCount: 0,
    payloadSafetyReviewStatus: 'COMPLETED_FOR_READ_ONLY_FLOW',
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    nextActionRequiresSeparateApproval: true,
    safetyReviewCompletionNote: 'Read-Only Payload Safety Review 완료',
    continuedForbiddenItems: [],
    nextRecommendedTask: 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet',
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

describe('buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView', () => {
  it('Task 435 Packet이 있어도 approvalAccepted는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.approvalAccepted, false);
  });

  it('requiredApprovalPhrase가 정확히 일치', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver 채널 상품 수정 Transmittable Payload 생성을 별도로 승인합니다.'
    );
  });

  it('targetChannelProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.targetChannelProductNo, '6597910207');
  });

  it('canProceedToTransmittablePayloadBuild는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.canProceedToTransmittablePayloadBuild, false);
  });

  it('canBuildTransmittablePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.canBuildTransmittablePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('priceChangeAllowed는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.priceChangeAllowed, false);
  });

  it('stockChangeAllowed는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.stockChangeAllowed, false);
  });

  it('productUpdateApiEntryDecision은 BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL');
  });

  it('다음 Task가 Task 437로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.nextTaskIfApproved, 'Task 437 - Naver 채널 상품 수정 Transmittable Payload 생성');
  });

  it('금지 항목에 payload 생성, 수정 API 호출, 가격/재고 변경, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
      makeApprovalPacketView(),
      makePayloadSafetyReviewView()
    );
    const forbidden = result.continuedForbiddenItems.join(' ');
    assert.ok(forbidden.includes('payload 생성') || forbidden.includes('payload'), 'payload 생성 금지가 없음');
    assert.ok(forbidden.includes('상품 수정 API 호출'), '수정 API 호출 금지가 없음');
    assert.ok(forbidden.includes('가격/재고 변경'), '가격/재고 변경 금지가 없음');
    assert.ok(forbidden.includes('DB write'), 'DB write 금지가 없음');
    assert.ok(forbidden.includes('raw response') || forbidden.includes('secret'), 'raw/secret 노출 금지가 없음');
    assert.ok(forbidden.includes('POST API') || forbidden.includes('버튼') || forbidden.includes('submit'), 'POST/button/submit 금지가 없음');
  });
});
