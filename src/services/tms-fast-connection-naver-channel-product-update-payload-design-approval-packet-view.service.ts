import {
  type TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView,
} from './tms-fast-connection-naver-channel-product-no-update-identifier-official-review-view.service';

export const CHANNEL_PRODUCT_UPDATE_PAYLOAD_DESIGN_APPROVAL_PHRASE =
  'Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.' as const;

export type TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketStatus =
  | 'WAITING_FOR_SEPARATE_USER_APPROVAL';

export interface TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView {
  taskId: 430;
  title: string;
  approvalPacketStatus: TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketStatus;
  sourceTaskId: 429;
  targetProductNo: '6597910207';
  channelProductNoCanBeUsedAsUpdatePathParameter: true;
  productUpdateApiEntryDecision: 'STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN';
  canBuildUpdatePayload: false;
  canCallUpdateApi: false;
  nextPayloadDesignRequiresSeparateApproval: true;
  requiredApprovalPhrase: typeof CHANNEL_PRODUCT_UPDATE_PAYLOAD_DESIGN_APPROVAL_PHRASE;
  approvalScope: string[];
  continuedForbiddenItems: string[];
  nextTask: 'Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계';
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
  '실제 수정 API 호출 없이 read-only payload 구조 설계',
  'channelProductNo 6597910207 기준 path parameter 설계',
  '가격/재고 변경 없이 기존 상품 구조 보존 원칙 정리',
  '수정 API payload 필수/선택 필드 구분',
  '추후 가격/재고 수정 전 안전 비교 기준 설계',
  'payload 초안은 실제 전송 불가 상태로만 표시',
];

const CONTINUED_FORBIDDEN_ITEMS: string[] = [
  'Naver API 재호출',
  '상품 수정 API 호출',
  '실제 전송 가능한 payload 생성',
  '가격/재고 변경',
  'DB write',
  'raw response 표시/저장',
  'secret/token/header/signature 노출',
  'POST API 추가',
  '버튼/form/submit action 추가',
  'Worker/Queue/Runtime 실행',
  'Prisma schema/migration/package 변경',
];

export function buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView(
  officialReviewView: TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView
): TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView {
  void officialReviewView;

  return {
    taskId: 430,
    title: 'Task 430 - Naver 채널 상품 수정 Payload 설계 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    sourceTaskId: 429,
    targetProductNo: '6597910207',
    channelProductNoCanBeUsedAsUpdatePathParameter: true,
    productUpdateApiEntryDecision: 'STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN',
    canBuildUpdatePayload: false,
    canCallUpdateApi: false,
    nextPayloadDesignRequiresSeparateApproval: true,
    requiredApprovalPhrase: CHANNEL_PRODUCT_UPDATE_PAYLOAD_DESIGN_APPROVAL_PHRASE,
    approvalScope: APPROVAL_SCOPE,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
    nextTask: 'Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계',
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
