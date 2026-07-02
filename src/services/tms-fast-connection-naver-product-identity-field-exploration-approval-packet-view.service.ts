import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationDesignView,
} from './tms-fast-connection-naver-product-identity-field-exploration-design-view.service';

export interface TmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView {
  taskId: 419;
  title: string;
  approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL';
  targetProductNo: '6597910207';
  sourceTaskId: 418;
  sourceDesignStatus: 'FIELD_EXPLORATION_DESIGN_READY';
  productUpdateApiEntryDecision: 'BLOCKED';
  nextCollectionRequiresSeparateApproval: true;
  requiredApprovalPhrase: 'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.';
  maxAllowedLookupRecallCount: 1;
  guidance: string;
  approvalScope: string[];
  forbiddenItems: string[];
  nextTask: 'Task 420 - Naver 상품 식별 필드 추가 탐색 실행 전 Final Gate';
  actualApiRecallInTask419: false;
  actualProductUpdateApiCall: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualRawResponseExposure: false;
  actualRawResponseStored: false;
  actualFullProductNameExposure: false;
  actualFullOptionNameExposure: false;
  actualFullSellerManagementCodeExposure: false;
  actualSecretExposure: false;
  actualTokenExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualRepeatedLookup: false;
  actualDifferentProductLookup: false;
  actualWorkerRun: false;
  actualQueueRun: false;
  actualRuntimeExecution: false;
  actualPostApiAdded: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualSubmitActionAdded: false;
}

const REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.' as const;

const APPROVAL_SCOPE = [
  '대상 상품번호 6597910207',
  'Naver 상품 조회 API 재조회 최대 1회',
  'raw response 전체 표시/저장 없이 key name 탐색',
  'product/channel/origin 계열 nested key name 탐색',
  'id/productNo/channelProductNo/originProductNo 유사 key name 탐색',
  '후보 값은 masked last4와 equalsTargetProductNo boolean만 허용',
];

const FORBIDDEN_ITEMS = [
  '상품 수정 API 호출',
  '가격 변경',
  '재고 변경',
  'DB write',
  'raw response 전체 표시/저장',
  'full product name 표시',
  'full option name 표시',
  'full seller management code 표시',
  'secret/token/header/signature 출력',
  '반복 조회',
  '다른 상품번호 조회',
  'Worker/Queue/Runtime 실행',
  'POST API 추가',
  '실행 버튼/승인 버튼/submit action 추가',
];

export function buildTmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView(
  designView: TmsFastConnectionNaverProductIdentityFieldExplorationDesignView
): TmsFastConnectionNaverProductIdentityFieldExplorationApprovalPacketView {
  return {
    taskId: 419,
    title: 'Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetProductNo: '6597910207',
    sourceTaskId: 418,
    sourceDesignStatus: designView.designStatus,
    productUpdateApiEntryDecision: 'BLOCKED',
    nextCollectionRequiresSeparateApproval: true,
    requiredApprovalPhrase: REQUIRED_APPROVAL_PHRASE,
    maxAllowedLookupRecallCount: 1,
    guidance:
      'Task 418 설계 결과를 기준으로, 다음 실제 추가 탐색 수집 전 별도 사용자 승인 문구와 허용 범위를 read-only로 고정합니다. 이번 Task에서는 실제 API 호출이나 수집을 수행하지 않습니다.',
    approvalScope: APPROVAL_SCOPE,
    forbiddenItems: FORBIDDEN_ITEMS,
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
  };
}
