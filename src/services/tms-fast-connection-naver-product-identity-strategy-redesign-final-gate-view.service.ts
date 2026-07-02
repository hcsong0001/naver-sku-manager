import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView,
  STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-approval-packet-view.service';

export type TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateStatus =
  | 'WAITING_FOR_SEPARATE_USER_APPROVAL'
  | 'APPROVED';

export type TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalStatus =
  | 'NOT_SUBMITTED'
  | 'SUBMITTED_AND_ACCEPTED';

export interface TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView {
  taskId: 425;
  title: string;
  sourceTaskId: 424;
  finalGateStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateStatus;
  targetProductNo: '6597910207';
  requiredApprovalPhrase: typeof STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE;
  approvalStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalStatus;
  approvalAccepted: false;
  canProceedToStrategyRedesignReview: false;
  canProceedToOfficialStructureReview: false;
  productUpdateApiEntryDecision: 'BLOCKED';
  officialStructureReviewNeeded: true;
  gateBlockedReason: string;
  forbiddenActions: string[];
  nextTaskIfApproved: 'Task 426 - Naver 상품 식별 전략 재설계 및 공식 구조 검토';
  actualNaverApiCall: false;
  actualOfficialDocReview: false;
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

const FORBIDDEN_ACTIONS: string[] = [
  'Naver API 재조회',
  '공식 문서 조회 실행',
  '상품 수정 API 호출',
  '가격/재고 변경',
  'DB write',
  'raw response 표시/저장',
  'secret/token/header/signature 노출',
  'POST API 추가',
  '버튼/form/submit action 추가',
  'Worker/Queue/Runtime 실행',
  'Prisma schema/migration/package 변경',
];

const GATE_BLOCKED_REASON =
  'Task 424 승인 Packet은 준비되었지만, 별도 승인 문구가 아직 제출되지 않았으므로 상품 식별 전략 재설계 및 공식 구조 검토를 실행할 수 없습니다.';

export function buildTmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView(
  approvalPacketView: TmsFastConnectionNaverProductIdentityStrategyRedesignApprovalPacketView
): TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView {
  const finalGateStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateStatus =
    approvalPacketView.approvalPacketStatus === 'WAITING_FOR_SEPARATE_USER_APPROVAL'
      ? 'WAITING_FOR_SEPARATE_USER_APPROVAL'
      : 'APPROVED';

  return {
    taskId: 425,
    title: 'Task 425 - Naver 상품 식별 전략 재설계 실행 전 Final Gate',
    sourceTaskId: 424,
    finalGateStatus,
    targetProductNo: '6597910207',
    requiredApprovalPhrase: STRATEGY_REDESIGN_REQUIRED_APPROVAL_PHRASE,
    approvalStatus: 'NOT_SUBMITTED',
    approvalAccepted: false,
    canProceedToStrategyRedesignReview: false,
    canProceedToOfficialStructureReview: false,
    productUpdateApiEntryDecision: 'BLOCKED',
    officialStructureReviewNeeded: true,
    gateBlockedReason: GATE_BLOCKED_REASON,
    forbiddenActions: FORBIDDEN_ACTIONS,
    nextTaskIfApproved: 'Task 426 - Naver 상품 식별 전략 재설계 및 공식 구조 검토',
    actualNaverApiCall: false,
    actualOfficialDocReview: false,
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
