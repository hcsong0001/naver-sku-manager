import {
  CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE,
  type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-view.service';

export type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateStatus =
  | 'WAITING_FOR_SEPARATE_USER_APPROVAL';

export type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateApprovalStatus =
  | 'NOT_SUBMITTED';

export interface TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView {
  taskId: 436;
  title: string;
  finalGateStatus: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateStatus;
  targetChannelProductNo: '6597910207';
  requiredApprovalPhrase: typeof CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE;
  approvalAccepted: false;
  approvalStatus: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateApprovalStatus;
  canProceedToTransmittablePayloadBuild: false;
  canBuildTransmittablePayload: false;
  canCallUpdateApi: false;
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL';
  nextTaskIfApproved: 'Task 437 - Naver 채널 상품 수정 Transmittable Payload 생성';
  continuedForbiddenItems: string[];
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

const CONTINUED_FORBIDDEN_ITEMS: string[] = [
  'Naver API 재호출',
  '상품 수정 API 호출',
  '실제 전송 가능한 payload 생성',
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

export function buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView(
  approvalPacketView: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadApprovalPacketView,
  payloadSafetyReviewView: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView
): TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView {
  void payloadSafetyReviewView;

  return {
    taskId: 436,
    title: 'Task 436 - Naver 채널 상품 수정 Transmittable Payload 실행 전 Final Gate',
    finalGateStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    targetChannelProductNo: approvalPacketView.targetChannelProductNo,
    requiredApprovalPhrase: CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE,
    approvalAccepted: false,
    approvalStatus: 'NOT_SUBMITTED',
    canProceedToTransmittablePayloadBuild: false,
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    nextTaskIfApproved: 'Task 437 - Naver 채널 상품 수정 Transmittable Payload 생성',
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
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
