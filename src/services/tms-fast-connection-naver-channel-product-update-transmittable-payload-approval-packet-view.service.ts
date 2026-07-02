import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-view.service';

export const CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE =
  'Naver 채널 상품 수정 Transmittable Payload 생성을 별도로 승인합니다.' as const;

export type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketStatus =
  | 'WAITING_FOR_SEPARATE_USER_APPROVAL';

export interface TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView {
  taskId: 435;
  title: string;
  approvalPacketStatus: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketStatus;
  targetChannelProductNo: '6597910207';
  sourceReviewStatus: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView['reviewStatus'];
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL';
  canBuildTransmittablePayload: false;
  canCallUpdateApi: false;
  nextTransmittablePayloadRequiresSeparateApproval: true;
  requiredApprovalPhrase: typeof CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE;
  approvalScope: string[];
  continuedForbiddenItems: string[];
  nextTask: 'Task 436 - Naver 채널 상품 수정 Transmittable Payload 실행 전 Final Gate';
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
  '실제 수정 API 호출 없이 전송 가능한 payload 생성 준비 단계로 진입',
  'channelProductNo 6597910207 기준 payload 생성 가능 여부 검토',
  '가격/재고 변경은 계속 차단',
  '기존 상품명/옵션/추가상품 구조 보존 전제',
  '실제 수정 API 호출 전 Final Gate를 반드시 거침',
];

const CONTINUED_FORBIDDEN_ITEMS: string[] = [
  'Naver API 재호출',
  '상품 수정 API 호출',
  '이번 Task에서 실제 전송 가능한 payload 생성',
  '가격/재고 변경',
  'DB write',
  'raw response 표시/저장',
  'secret/token/header/signature 노출',
  'full product name / option name / seller code 노출',
  'POST API 추가',
  '버튼/form/submit action 추가',
  'Worker/Queue/Runtime 실행',
  'Prisma schema/migration/package 변경',
];

export function buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView(
  payloadSafetyReviewView: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView
): TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView {
  return {
    taskId: 435,
    title: 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetChannelProductNo: payloadSafetyReviewView.targetChannelProductNo,
    sourceReviewStatus: payloadSafetyReviewView.reviewStatus,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    nextTransmittablePayloadRequiresSeparateApproval: true,
    requiredApprovalPhrase: CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE,
    approvalScope: APPROVAL_SCOPE,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
    nextTask: 'Task 436 - Naver 채널 상품 수정 Transmittable Payload 실행 전 Final Gate',
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
