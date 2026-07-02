import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-final-gate-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-approval-packet-view.service';

function makeApprovalPacketView(): TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView {
  return {
    taskId: 424,
    title: 'Task 424 - Naver 상품 식별 전략 재설계 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    sourceTaskId: 423,
    sourceStrategyStatus: 'STRATEGY_REDESIGN_REQUIRED',
    targetProductNo: '6597910207',
    productUpdateApiEntryDecision: 'BLOCKED',
    officialStructureReviewNeeded: true,
    nextReviewRequiresSeparateApproval: true,
    requiredApprovalPhrase: 'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.',
    approvalScope: ['Naver Commerce API 공식 구조/문서 기준 검토'],
    continuedForbiddenItems: ['Naver API 재호출'],
    nextRecommendedTask: 'Task 425 - Naver 상품 식별 전략 재설계 실행 전 Final Gate',
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

describe('buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView', () => {
  it('Task 424 Packet이 있어도 approvalAccepted는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    assert.strictEqual(result.approvalAccepted, false);
  });

  it('requiredApprovalPhrase가 정확히 일치', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    assert.strictEqual(
      result.requiredApprovalPhrase,
      'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.'
    );
  });

  it('canProceedToStrategyRedesignReview는 false', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    assert.strictEqual(result.canProceedToStrategyRedesignReview, false);
  });

  it('finalGateStatus는 WAITING_FOR_SEPARATE_USER_APPROVAL', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    assert.strictEqual(result.finalGateStatus, 'WAITING_FOR_SEPARATE_USER_APPROVAL');
  });

  it('productUpdateApiEntryDecision은 BLOCKED', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    assert.strictEqual(result.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('officialStructureReviewNeeded는 true', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    assert.strictEqual(result.officialStructureReviewNeeded, true);
  });

  it('다음 Task가 Task 426으로 표시됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    assert.strictEqual(
      result.nextTaskIfApproved,
      'Task 426 - Naver 상품 식별 전략 재설계 및 공식 구조 검토'
    );
  });

  it('금지 항목에 API 재조회, 수정 API, 가격/재고, DB write, raw/secret 노출, POST/button/submit이 포함됨', () => {
    const result = buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
      makeApprovalPacketView()
    );
    const forbidden = result.forbiddenActions;
    const hasApiRecall = forbidden.some((f) => f.includes('API') && (f.includes('재조회') || f.includes('재호출')));
    const hasUpdateApi = forbidden.some((f) => f.includes('수정 API'));
    const hasPriceStock = forbidden.some((f) => f.includes('가격') || f.includes('재고'));
    const hasDbWrite = forbidden.some((f) => f.includes('DB write'));
    const hasRawSecret = forbidden.some(
      (f) => f.includes('raw') || f.includes('secret') || f.includes('token')
    );
    const hasPostButton = forbidden.some((f) => f.includes('POST') || f.includes('버튼') || f.includes('submit'));
    assert.ok(hasApiRecall, 'API 재조회 금지 항목이 없음');
    assert.ok(hasUpdateApi, '수정 API 금지 항목이 없음');
    assert.ok(hasPriceStock, '가격/재고 금지 항목이 없음');
    assert.ok(hasDbWrite, 'DB write 금지 항목이 없음');
    assert.ok(hasRawSecret, 'raw/secret 금지 항목이 없음');
    assert.ok(hasPostButton, 'POST/button/submit 금지 항목이 없음');
  });
});
