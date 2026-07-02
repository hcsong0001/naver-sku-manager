import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView,
} from './tms-fast-connection-naver-product-identity-field-exploration-approval-packet-view.service';

export interface TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView {
  taskId: 420;
  title: string;
  finalGateStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL';
  approvalStatus: 'NOT_SUBMITTED';
  targetProductNo: '6597910207';
  requiredApprovalPhrase: 'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.';
  approvalAccepted: false;
  canProceedToActualCollection: false;
  productLookupApiRecallDecision: 'BLOCKED';
  actualCollectionDecision: 'BLOCKED';
  productUpdateApiEntryDecision: 'BLOCKED';
  nextAction: '사용자 별도 승인 문구 대기';
  nextTaskIfApproved: 'Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집';
  guidance: string;
  forbiddenItems: string[];
  actualApiRecallInTask420: false;
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

const REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.' as const;

const FORBIDDEN_ITEMS = [
  'Naver API 재호출',
  '상품 수정 API 호출',
  '가격 변경',
  '재고 변경',
  'DB write',
  'raw response 표시/저장',
  'secret/token/header/signature 노출',
  'POST API 추가',
  '버튼/form/submit action 추가',
  'Worker/Queue/Runtime 실행',
];

export function buildTmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView(
  approvalPacketView: TmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView
): TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView {
  return {
    taskId: 420,
    title: 'Task 420 - Naver 상품 식별 필드 추가 탐색 실행 전 Final Gate',
    finalGateStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    approvalStatus: 'NOT_SUBMITTED',
    targetProductNo: approvalPacketView.targetProductNo,
    requiredApprovalPhrase: REQUIRED_APPROVAL_PHRASE,
    approvalAccepted: false,
    canProceedToActualCollection: false,
    productLookupApiRecallDecision: 'BLOCKED',
    actualCollectionDecision: 'BLOCKED',
    productUpdateApiEntryDecision: 'BLOCKED',
    nextAction: '사용자 별도 승인 문구 대기',
    nextTaskIfApproved: 'Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집',
    guidance:
      'Task 419 승인 Packet은 준비되었지만, 별도 승인 문구가 아직 제출되지 않았으므로 추가 식별 필드 탐색 수집을 실행할 수 없습니다.',
    forbiddenItems: FORBIDDEN_ITEMS,
    actualApiRecallInTask420: false,
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
