import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-view.service';

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

describe('buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView', () => {
  it('Task 434 reviewStatus가 PAYLOAD_SAFETY_REVIEW_COMPLETED이면 승인 Packet 상태는 WAITING_FOR_SEPARATE_USER_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.approvalPacketStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('승인 문구가 정확히 일치', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver 채널 상품 수정 Transmittable Payload 생성을 별도로 승인합니다.'
    );
  });

  it('targetChannelProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.targetChannelProductNo, '6597910207');
  });

  it('priceChangeAllowed는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.priceChangeAllowed, false);
  });

  it('stockChangeAllowed는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.stockChangeAllowed, false);
  });

  it('canBuildTransmittablePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.canBuildTransmittablePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('승인 범위에 payload 생성 준비, 가격/재고 차단, Final Gate 필요가 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    const scope = result.approvalScope.join(' ');
    assert.ok(scope.includes('payload 생성 준비 단계'), 'payload 생성 준비 단계가 승인 범위에 없음');
    assert.ok(scope.includes('가격/재고 변경은 계속 차단'), '가격/재고 차단이 승인 범위에 없음');
    assert.ok(scope.includes('Final Gate'), 'Final Gate 필요가 승인 범위에 없음');
  });

  it('금지 항목에 수정 API 호출, 이번 Task의 전송 가능 payload 생성, 가격/재고, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    const forbidden = result.continuedForbiddenItems.join(' ');
    assert.ok(forbidden.includes('상품 수정 API 호출'), '수정 API 호출이 금지 항목에 없음');
    assert.ok(forbidden.includes('이번 Task에서 실제 전송 가능한 payload 생성'), '이번 Task 전송 가능 payload 생성 금지가 없음');
    assert.ok(forbidden.includes('가격/재고 변경'), '가격/재고 변경 금지가 없음');
    assert.ok(forbidden.includes('DB write'), 'DB write 금지가 없음');
    assert.ok(forbidden.includes('raw response') || forbidden.includes('secret'), 'raw/secret 노출 금지가 없음');
    assert.ok(forbidden.includes('POST API') || forbidden.includes('버튼') || forbidden.includes('submit'), 'POST/button/submit 금지가 없음');
  });

  it('다음 Task가 Task 436 Final Gate로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
      makePayloadSafetyReviewView()
    );
    assert.strictEqual(
      result.nextTask,
      'Task 436 - Naver 채널 상품 수정 Transmittable Payload 실행 전 Final Gate'
    );
  });
});
