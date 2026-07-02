import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView,
} from './tms-fast-connection-naver-product-identity-field-exploration-final-gate-view.service';
import { type TmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView } from './tms-fast-connection-naver-product-identity-field-exploration-approval-packet-view.service';

function makeTask419View(
  overrides: Partial<TmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView> = {}
): TmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView {
  return {
    taskId: 419,
    title: 'Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetProductNo: '6597910207',
    sourceTaskId: 418,
    sourceDesignStatus: 'FIELD_EXPLORATION_DESIGN_READY',
    productUpdateApiEntryDecision: 'BLOCKED',
    nextCollectionRequiresSeparateApproval: true,
    requiredApprovalPhrase: 'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.',
    maxAllowedLookupRecallCount: 1,
    guidance: '승인 Packet 더미 데이터',
    approvalScope: [],
    forbiddenItems: [],
    nextTask: 'Task 420 - Naver 상품 식별 필드 추가 탐색 실행 전 Final Gate',
    actualApiRecallInTask419: false,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualFullProductNameExposure: false,
    actualFullOptionNameExposure: false,
    actualFullSellerManagementCodeExposure: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualRepeatedLookup: false,
    actualDifferentProductLookup: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    ...overrides,
  };
}

describe('Task 420 - Naver Product Identity Field Exploration Final Gate View', () => {
  it('Task 419 Packet이 있어도 approvalAccepted는 false다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
      makeTask419View()
    );

    assert.equal(view.approvalAccepted, false);
    assert.equal(view.approvalStatus, 'NOT_SUBMITTED');
  });

  it('requiredApprovalPhrase가 정확히 일치한다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
      makeTask419View()
    );

    assert.equal(
      view.requiredApprovalPhrase,
      'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.'
    );
  });

  it('canProceedToActualCollection은 false다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
      makeTask419View()
    );

    assert.equal(view.canProceedToActualCollection, false);
    assert.equal(view.actualCollectionDecision, 'BLOCKED');
  });

  it('finalGateStatus는 WAITING_FOR_SEPARATE_USER_APPROVAL이다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
      makeTask419View()
    );

    assert.equal(view.finalGateStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('productUpdateApiEntryDecision은 BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
      makeTask419View({
        productUpdateApiEntryDecision: 'BLOCKED',
      })
    );

    assert.equal(view.productUpdateApiEntryDecision, 'BLOCKED');
    assert.equal(view.productLookupApiRecallDecision, 'BLOCKED');
  });

  it('다음 Task가 Task 421 실제 수집으로 표시된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
      makeTask419View()
    );

    assert.equal(
      view.nextTaskIfApproved,
      'Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집'
    );
  });

  it('금지 항목에 API 재호출, 수정 API, 가격/재고, DB write, raw/secret 노출, POST/button/submit이 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
      makeTask419View()
    );

    assert.ok(view.forbiddenItems.includes('Naver API 재호출'));
    assert.ok(view.forbiddenItems.includes('상품 수정 API 호출'));
    assert.ok(view.forbiddenItems.includes('가격 변경'));
    assert.ok(view.forbiddenItems.includes('재고 변경'));
    assert.ok(view.forbiddenItems.includes('DB write'));
    assert.ok(view.forbiddenItems.includes('raw response 표시/저장'));
    assert.ok(view.forbiddenItems.includes('secret/token/header/signature 노출'));
    assert.ok(view.forbiddenItems.includes('POST API 추가'));
    assert.ok(view.forbiddenItems.includes('버튼/form/submit action 추가'));
  });
});
