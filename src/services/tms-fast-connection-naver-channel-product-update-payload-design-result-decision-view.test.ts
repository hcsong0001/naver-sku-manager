import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView,
} from './tms-fast-connection-naver-channel-product-update-payload-design-result-decision-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView,
} from './tms-fast-connection-naver-channel-product-update-payload-read-only-design-view.service';

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
        originProduct: { designOnly: true, actualValuesIncluded: false, fullProductNameIncluded: false, priceChangeIncluded: false, stockChangeIncluded: false },
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

describe('buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView', () => {
  it('decisionStatus는 PAYLOAD_DESIGN_RESULT_DECISION_READY', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.decisionStatus, 'PAYLOAD_DESIGN_RESULT_DECISION_READY');
  });

  it('sourceDesignStatus는 READ_ONLY_PAYLOAD_DESIGN_COMPLETED', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.sourceDesignStatus, 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED');
  });

  it('targetChannelProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.targetChannelProductNo, '6597910207');
  });

  it('designGroupCount는 7', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.designGroupCount, 7);
  });

  it('canBuildTransmittablePayload는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.canBuildTransmittablePayload, false);
  });

  it('canCallUpdateApi는 false', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.canCallUpdateApi, false);
  });

  it('productUpdateApiEntryDecision은 BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW');
  });

  it('payloadSafetyReviewRequired는 true', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.payloadSafetyReviewRequired, true);
  });

  it('safety review 항목이 8개 이상 생성됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.ok(result.safetyReviewItems.length >= 8, `safety review 항목 수: ${result.safetyReviewItems.length}`);
  });

  it('가격/재고 변경 차단 항목이 포함됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    const allText = result.safetyReviewItems.map(item =>
      `${item.title} ${item.currentDesignFinding} ${item.requiredSafetyCheck}`
    ).join(' ');
    assert.ok(allText.includes('가격'), '가격 차단 항목이 포함되지 않음');
    assert.ok(allText.includes('재고'), '재고 차단 항목이 포함되지 않음');
  });

  it('다음 Task가 Task 433으로 표시됨', () => {
    const result = buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
      makePayloadReadOnlyDesignView()
    );
    assert.strictEqual(result.nextRecommendedTask, 'Task 433 - Naver 채널 상품 수정 Payload Safety Review 승인 Packet');
  });
});
