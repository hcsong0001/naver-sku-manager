import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView,
} from './tms-fast-connection-naver-channel-product-update-payload-design-result-decision-view.service';

export const CHANNEL_PRODUCT_UPDATE_PAYLOAD_SAFETY_REVIEW_APPROVAL_PHRASE =
  'Naver 채널 상품 수정 Payload Safety Review를 별도로 승인합니다.' as const;

export type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketStatus =
  | 'WAITING_FOR_SEPARATE_USER_APPROVAL';

export interface TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView {
  taskId: 433;
  title: string;
  approvalPacketStatus: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketStatus;
  sourceDecisionStatus: TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView['decisionStatus'];
  targetChannelProductNo: '6597910207';
  payloadSafetyReviewRequired: true;
  productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW';
  canBuildTransmittablePayload: false;
  canCallUpdateApi: false;
  nextSafetyReviewRequiresSeparateApproval: true;
  requiredApprovalPhrase: typeof CHANNEL_PRODUCT_UPDATE_PAYLOAD_SAFETY_REVIEW_APPROVAL_PHRASE;
  approvalScope: string[];
  continuedForbiddenItems: string[];
  nextTask: 'Task 434 - Naver 채널 상품 수정 Payload Safety Review';
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
  '실제 수정 API 호출 없이 read-only payload safety review 실행',
  'channelProductNo 6597910207 path parameter 고정 검토',
  'originProduct 필수 필드 누락 위험 검토',
  'smartstoreChannelProduct 필수 필드 누락 위험 검토',
  '기존 상품명/옵션/추가상품 구조 보존 검토',
  '가격/재고 변경 차단 검토',
  '실제 전송 가능한 payload 생성 차단 검토',
  '수정 API 호출 전 별도 승인 필요 상태 유지',
];

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

export function buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView(
  resultDecisionView: TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView
): TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView {
  void resultDecisionView;

  return {
    taskId: 433,
    title: 'Task 433 - Naver 채널 상품 수정 Payload Safety Review 승인 Packet',
    approvalPacketStatus: 'WAITING_FOR_SEPARATE_USER_APPROVAL',
    sourceDecisionStatus: 'PAYLOAD_DESIGN_RESULT_DECISION_READY',
    targetChannelProductNo: '6597910207',
    payloadSafetyReviewRequired: true,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    nextSafetyReviewRequiresSeparateApproval: true,
    requiredApprovalPhrase: CHANNEL_PRODUCT_UPDATE_PAYLOAD_SAFETY_REVIEW_APPROVAL_PHRASE,
    approvalScope: APPROVAL_SCOPE,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
    nextTask: 'Task 434 - Naver 채널 상품 수정 Payload Safety Review',
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
