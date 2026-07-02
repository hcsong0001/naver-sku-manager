import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-result-decision-view.service';

export const CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW_APPROVAL_PHRASE =
  'Naver channelProductNo 수정 API 식별자 공식 검토를 별도로 승인합니다.' as const;

export type TmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketStatus =
  | 'WAITING_FOR_SEPARATE_USER_APPROVAL';

export interface TmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView {
  taskId: 428;
  title: string;
  approvalPacketStatus: TmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketStatus;
  sourceTaskId: 427;
  targetProductNo: '6597910207';
  priorityStrategyCandidate: 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW';
  productUpdateApiEntryDecision: 'BLOCKED';
  canBuildUpdatePayload: false;
  canCallUpdateApi: false;
  nextReviewRequiresSeparateApproval: true;
  requiredApprovalPhrase: typeof CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW_APPROVAL_PHRASE;
  approvalScope: string[];
  continuedForbiddenItems: string[];
  nextTask: 'Task 429 - Naver channelProductNo 수정 API 식별자 공식 검토';
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
  'Naver Commerce API 공식 문서/구조 기준 검토',
  '조회 API에 사용한 상품번호 6597910207의 식별자 의미 검토',
  'channelProductNo가 수정 API path parameter로 사용 가능한지 검토',
  '수정 API가 요구하는 path parameter와 body identifier 구분 검토',
  '실제 수정 API 호출 전 필요한 read-only payload 설계 방향 정리',
];

const CONTINUED_FORBIDDEN_ITEMS: string[] = [
  'Naver API 재호출',
  '상품 수정 API 호출',
  '수정 payload 생성',
  '가격/재고 변경',
  'DB write',
  'raw response 표시/저장',
  'secret/token/header/signature 노출',
  'POST API 추가',
  '버튼/form/submit action 추가',
  'Worker/Queue/Runtime 실행',
  'Prisma schema/migration/package 변경',
];

export function buildTmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView(
  resultDecisionView: TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView
): TmsFastConnectionNaverChannelProductNoUpdateIdentifierReviewApprovalPacketView {
  void resultDecisionView;

  return {
    taskId: 428,
    title: 'Task 428 - Naver channelProductNo 수정 API 식별자 검토 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    sourceTaskId: 427,
    targetProductNo: '6597910207',
    priorityStrategyCandidate: 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW',
    productUpdateApiEntryDecision: 'BLOCKED',
    canBuildUpdatePayload: false,
    canCallUpdateApi: false,
    nextReviewRequiresSeparateApproval: true,
    requiredApprovalPhrase: CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW_APPROVAL_PHRASE,
    approvalScope: APPROVAL_SCOPE,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
    nextTask: 'Task 429 - Naver channelProductNo 수정 API 식별자 공식 검토',
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
