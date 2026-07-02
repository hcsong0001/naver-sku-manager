import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-view.service';

export type TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketStatus =
  | 'WAITING_FOR_SEPARATE_USER_APPROVAL'
  | 'APPROVED';

export const STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.' as const;

export type TmsFastConnectionNaverProductIdentityStrategyRedesignRequiredApprovalPhrase =
  typeof STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE;

export interface TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView {
  taskId: 424;
  title: string;
  approvalPacketStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketStatus;
  sourceTaskId: 423;
  sourceStrategyStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignView['strategyStatus'];
  targetProductNo: '6597910207';
  productUpdateApiEntryDecision: 'BLOCKED';
  officialStructureReviewNeeded: true;
  nextReviewRequiresSeparateApproval: true;
  requiredApprovalPhrase: TmsFastConnectionNaverProductIdentityStrategyRedesignRequiredApprovalPhrase;
  approvalScope: string[];
  continuedForbiddenItems: string[];
  nextRecommendedTask: 'Task 425 - Naver 상품 식별 전략 재설계 실행 전 Final Gate';
  actualNaverApiCall: false;
  actualProductUpdateApiCall: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualRawResponseExposure: false;
  actualRawResponseStored: false;
  actualSecretExposure: false;
  actualTokenExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualPostApiAdded: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualSubmitActionAdded: false;
  actualWorkerRun: false;
  actualQueueRun: false;
  actualRuntimeExecution: false;
}

const APPROVAL_SCOPE: string[] = [
  'Naver Commerce API 공식 구조/문서 기준 검토',
  '상품 조회 API 응답의 originProduct / smartstoreChannelProduct 역할 재정의',
  'channelProductNo / originProductNo / productNo / id 관계 재검토',
  '수정 API 진입에 필요한 식별자가 무엇인지 전략적으로 재정리',
  'raw response 없이 다음 안전 수집 방식 설계',
];

const CONTINUED_FORBIDDEN_ITEMS: string[] = [
  'Naver API 재호출',
  '상품 수정 API 호출',
  '가격/재고 변경',
  'DB write',
  'raw response 표시/저장',
  'secret/token/header/signature 노출',
  'full product/option/seller code 표시',
  'POST API 추가',
  '버튼/form/submit action 추가',
  'Worker/Queue/Runtime 실행',
  'Prisma schema/migration/package 변경',
];

export function buildTmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView(
  strategyRedesignView: TmsFastConnectionNaverProductIdentityStrategyRedesignView
): TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView {
  const approvalPacketStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketStatus =
    strategyRedesignView.strategyStatus === 'STRATEGY_REDESIGN_REQUIRED'
      ? 'WAITING_FOR_SEPARATE_USER_APPROVAL'
      : 'APPROVED';

  return {
    taskId: 424,
    title: 'Task 424 - Naver 상품 식별 전략 재설계 승인 Packet',
    approvalPacketStatus,
    sourceTaskId: 423,
    sourceStrategyStatus: strategyRedesignView.strategyStatus,
    targetProductNo: '6597910207',
    productUpdateApiEntryDecision: 'BLOCKED',
    officialStructureReviewNeeded: true,
    nextReviewRequiresSeparateApproval: true,
    requiredApprovalPhrase: STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE,
    approvalScope: APPROVAL_SCOPE,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
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
