import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView,
  STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-approval-packet-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-view.service';

function makeStrategyRedesignView(
  strategyStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignView['strategyStatus']
): TmsFastConnectionNaverProductIdentityStrategyRedesignView {
  return {
    taskId: 423,
    title: 'Task 423 - Naver 상품 조회 응답 구조 기반 식별 전략 재설계 화면',
    strategyStatus,
    targetProductNo: '6597910207',
    sourceDecisionStatus: 'PRODUCT_IDENTITY_STILL_NOT_CONFIRMED',
    productUpdateApiEntryDecision: 'BLOCKED',
    randomFieldExplorationRecommended: false,
    additionalApiRecallRecommended: false,
    officialStructureReviewNeeded: true,
    findingSummary: ['조회 API 호출 자체는 성공 (HTTP 200)'],
    strategyItems: [],
    nextRecommendedTask: 'Task 424 - Naver 상품 식별 전략 재설계 승인 Packet',
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

describe('buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView', () => {
  it('Task 423 strategyStatus가 STRATEGY_REDESIGN_REQUIRED이면 승인 Packet 상태는 WAITING_FOR_SEPARATE_USER_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
      makeStrategyRedesignView('STRATEGY_REDESIGN_REQUIRED')
    );
    assert.strictEqual(result.approvalPacketStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('승인 문구가 정확히 일치', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
      makeStrategyRedesignView('STRATEGY_REDESIGN_REQUIRED')
    );
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.'
    );
    assert.strictEqual(result.requiredApprovalPhrase, STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE);
  });

  it('targetProductNo는 6597910207', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
      makeStrategyRedesignView('STRATEGY_REDESIGN_REQUIRED')
    );
    assert.strictEqual(result.targetProductNo, '6597910207');
  });

  it('productUpdateApiEntryDecision은 BLOCKED', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
      makeStrategyRedesignView('STRATEGY_REDESIGN_REQUIRED')
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('승인 범위에 공식 구조 검토, originProduct/smartstoreChannelProduct 역할 재정의, 식별자 관계 재검토가 포함됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
      makeStrategyRedesignView('STRATEGY_REDESIGN_REQUIRED')
    );
    const scope = result.approvalScope;
    const hasOfficialReview = scope.some((s) => s.includes('공식') && s.includes('검토'));
    const hasOriginProductRole = scope.some(
      (s) => s.includes('originProduct') && s.includes('역할')
    );
    const hasIdentifierReview = scope.some(
      (s) =>
        (s.includes('channelProductNo') || s.includes('originProductNo') || s.includes('productNo')) &&
        s.includes('재검토')
    );
    assert.ok(hasOfficialReview, '공식 구조 검토 항목이 없음');
    assert.ok(hasOriginProductRole, 'originProduct/smartstoreChannelProduct 역할 재정의 항목이 없음');
    assert.ok(hasIdentifierReview, '식별자 관계 재검토 항목이 없음');
  });

  it('금지 항목에 API 재호출, 수정 API, 가격/재고, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
      makeStrategyRedesignView('STRATEGY_REDESIGN_REQUIRED')
    );
    const forbidden = result.continuedForbiddenItems;
    const hasApiRecall = forbidden.some((f) => f.includes('API') && f.includes('재호출'));
    const hasUpdateApi = forbidden.some((f) => f.includes('수정 API'));
    const hasPriceStock = forbidden.some((f) => f.includes('가격') || f.includes('재고'));
    const hasDbWrite = forbidden.some((f) => f.includes('DB write'));
    const hasRawSecret = forbidden.some(
      (f) => f.includes('raw') || f.includes('secret') || f.includes('token')
    );
    const hasPostButton = forbidden.some((f) => f.includes('POST') || f.includes('버튼') || f.includes('submit'));
    assert.ok(hasApiRecall, 'API 재호출 금지 항목이 없음');
    assert.ok(hasUpdateApi, '수정 API 금지 항목이 없음');
    assert.ok(hasPriceStock, '가격/재고 금지 항목이 없음');
    assert.ok(hasDbWrite, 'DB write 금지 항목이 없음');
    assert.ok(hasRawSecret, 'raw/secret 금지 항목이 없음');
    assert.ok(hasPostButton, 'POST/button/submit 금지 항목이 없음');
  });

  it('다음 Task가 Task 425 Final Gate로 표시됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
      makeStrategyRedesignView('STRATEGY_REDESIGN_REQUIRED')
    );
    assert.strictEqual(
      result.nextRecommendedTask,
      'Task 425 - Naver 상품 식별 전략 재설계 실행 전 Final Gate'
    );
  });
});
