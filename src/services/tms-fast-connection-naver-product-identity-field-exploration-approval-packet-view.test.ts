import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView,
} from './tms-fast-connection-naver-product-identity-field-exploration-approval-packet-view.service';
import { type TmsFastConnectionNaverProductIdentityFieldExplorationDesignView } from './tms-fast-connection-naver-product-identity-field-exploration-design-view.service';

function makeTask418View(
  overrides: Partial<TmsFastConnectionNaverProductIdentityFieldExplorationDesignView> = {}
): TmsFastConnectionNaverProductIdentityFieldExplorationDesignView {
  return {
    taskId: 418,
    title: 'Task 418 - Naver 상품 식별 필드 추가 탐색 설계 화면',
    designStatus: 'FIELD_EXPLORATION_DESIGN_READY',
    targetProductNo: '6597910207',
    sourceDecisionStatus: 'PRODUCT_IDENTITY_NOT_CONFIRMED',
    currentProductUpdateApiEntryDecision: 'BLOCKED',
    previousCandidatePathCount: 7,
    confirmedCandidatePathCount: 0,
    explorationNeeded: true,
    explorationMode: 'DESIGN_ONLY',
    nextCollectionRequiresSeparateApproval: true,
    nextRecommendedTask: 'Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet',
    guidance: '설계 화면 더미 데이터',
    candidateExplorationGroups: [],
    actualApiRecallInTask418: false,
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
    actualQueueEnqueue: false,
    actualRuntimeConfiguration: false,
    ...overrides,
  };
}

describe('Task 419 - Naver Product Identity Field Exploration Approval Packet View', () => {
  it('Task 418 결과가 FIELD_EXPLORATION_DESIGN_READY이면 승인 Packet 상태는 WAITING_FOR_SEPARATE_USER_APPROVAL이다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView(
      makeTask418View()
    );

    assert.equal(view.sourceDesignStatus, 'FIELD_EXPLORATION_DESIGN_READY');
    assert.equal(view.approvalPacketStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('승인 문구와 대상 상품번호, 최대 재조회 수가 고정된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView(
      makeTask418View()
    );

    assert.equal(
      view.requiredApprovalPhrase,
      'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.'
    );
    assert.equal(view.targetProductNo, '6597910207');
    assert.equal(view.maxAllowedLookupRecallCount, 1);
  });

  it('허용 항목에 key name 탐색, masked last4, equalsTargetProductNo boolean이 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView(
      makeTask418View()
    );

    assert.ok(view.approvalScope.includes('raw response 전체 표시/저장 없이 key name 탐색'));
    assert.ok(view.approvalScope.includes('product/channel/origin 계열 nested key name 탐색'));
    assert.ok(view.approvalScope.includes('id/productNo/channelProductNo/originProductNo 유사 key name 탐색'));
    assert.ok(view.approvalScope.includes('후보 값은 masked last4와 equalsTargetProductNo boolean만 허용'));
  });

  it('금지 항목에 수정 API, 가격/재고, DB write, raw response, secret/token/header/signature가 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView(
      makeTask418View()
    );

    assert.ok(view.forbiddenItems.includes('상품 수정 API 호출'));
    assert.ok(view.forbiddenItems.includes('가격 변경'));
    assert.ok(view.forbiddenItems.includes('재고 변경'));
    assert.ok(view.forbiddenItems.includes('DB write'));
    assert.ok(view.forbiddenItems.includes('raw response 전체 표시/저장'));
    assert.ok(view.forbiddenItems.includes('secret/token/header/signature 출력'));
  });

  it('productUpdateApiEntryDecision은 계속 BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView(
      makeTask418View({
        currentProductUpdateApiEntryDecision: 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL',
      })
    );

    assert.equal(view.productUpdateApiEntryDecision, 'BLOCKED');
  });
});
