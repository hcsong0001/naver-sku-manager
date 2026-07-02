import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView,
} from './tms-fast-connection-naver-channel-product-update-payload-design-result-decision-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView,
} from './tms-fast-connection-naver-channel-product-update-payload-read-only-design-view.service';

export type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewStatus =
  | 'PAYLOAD_SAFETY_REVIEW_COMPLETED';

export type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewItemDecision =
  | 'SAFE_FOR_READ_ONLY_NEXT_STEP'
  | 'BLOCKED_FOR_EXECUTION';

export interface TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewResultItem {
  reviewItemId: string;
  title: string;
  sourceDesignFinding: string;
  safetyDecision: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewItemDecision;
  executionGuard: string;
}

export interface TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView {
  taskId: 434;
  title: string;
  reviewStatus: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewStatus;
  userApprovalPhrase: string;
  safetyReviewApprovedPhraseAccepted: true;
  targetChannelProductNo: '6597910207';
  sourcePayloadDesignStatus: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView['designStatus'];
  payloadDesignMode: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView['payloadDesignMode'];
  safetyReviewItems: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewResultItem[];
  safetyReviewItemCount: number;
  payloadSafetyReviewStatus: 'COMPLETED_FOR_READ_ONLY_FLOW';
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  canBuildTransmittablePayload: false;
  canCallUpdateApi: false;
  productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL';
  nextActionRequiresSeparateApproval: true;
  safetyReviewCompletionNote: string;
  continuedForbiddenItems: string[];
  nextRecommendedTask: 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet';
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

const SAFETY_REVIEW_RESULT_ITEMS: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewResultItem[] = [
  {
    reviewItemId: 'SR1',
    title: 'channelProductNo path parameter 고정 확인',
    sourceDesignFinding: 'channelProductNo = 6597910207, transmittable: false 플래그로 path parameter 설계 완료.',
    safetyDecision: 'SAFE_FOR_READ_ONLY_NEXT_STEP',
    executionGuard: '실제 API 호출 시에는 channelProductNo 값 별도 승인 필요. 현재 단계에서는 read-only 확인만 허용.',
  },
  {
    reviewItemId: 'SR2',
    title: 'originProduct 필수 필드 누락 위험 검토',
    sourceDesignFinding: 'originProduct는 designOnly: true, actualValuesIncluded: false로 설계. 실제 필수 필드 목록 미확인 상태.',
    safetyDecision: 'BLOCKED_FOR_EXECUTION',
    executionGuard: '수정 API 호출 전 originProduct 내 필수 필드 목록 확인 및 별도 승인 필요. 현재 실행 불가.',
  },
  {
    reviewItemId: 'SR3',
    title: 'smartstoreChannelProduct 필수 필드 누락 위험 검토',
    sourceDesignFinding: 'smartstoreChannelProduct는 designOnly: true, actualValuesIncluded: false로 설계. 실제 필수 필드 목록 미확인 상태.',
    safetyDecision: 'BLOCKED_FOR_EXECUTION',
    executionGuard: '수정 API 호출 전 smartstoreChannelProduct 내 필수 필드 목록 확인 및 별도 승인 필요. 현재 실행 불가.',
  },
  {
    reviewItemId: 'SR4',
    title: '기존 상품명/옵션/추가상품 구조 보존 검토',
    sourceDesignFinding: '기존 상품 구조 보존 원칙 설계 완료. 상품명/옵션명/추가상품은 payload에 실제 값 포함 금지로 설계됨.',
    safetyDecision: 'SAFE_FOR_READ_ONLY_NEXT_STEP',
    executionGuard: '실제 API 호출 시 기존 상품 구조 변경 여부 별도 검증 필요. 현재 단계에서는 read-only 원칙 확인만 허용.',
  },
  {
    reviewItemId: 'SR5',
    title: '가격 필드 변경 차단 검토',
    sourceDesignFinding: 'priceChangeIncluded: false로 설계. 가격 필드는 이번 payload 설계 범위 외로 명확히 차단됨.',
    safetyDecision: 'SAFE_FOR_READ_ONLY_NEXT_STEP',
    executionGuard: '가격 변경을 위해서는 별도 Task와 안전 비교 승인 필요. 현재 payload에 가격 필드 포함 불가.',
  },
  {
    reviewItemId: 'SR6',
    title: '재고 필드 변경 차단 검토',
    sourceDesignFinding: 'stockChangeIncluded: false로 설계. 재고 필드는 이번 payload 설계 범위 외로 명확히 차단됨.',
    safetyDecision: 'SAFE_FOR_READ_ONLY_NEXT_STEP',
    executionGuard: '재고 변경을 위해서는 별도 Task와 안전 비교 승인 필요. 현재 payload에 재고 필드 포함 불가.',
  },
  {
    reviewItemId: 'SR7',
    title: '실제 전송 가능한 payload 생성 차단 검토',
    sourceDesignFinding: 'transmittablePayloadGenerated: false, canBuildTransmittablePayload: false로 설계. payload 초안은 전송 불가 상태.',
    safetyDecision: 'SAFE_FOR_READ_ONLY_NEXT_STEP',
    executionGuard: '전송 가능 payload 생성 전 Safety Review 완료 및 Transmittable Payload 별도 승인 Packet 확인 필요.',
  },
  {
    reviewItemId: 'SR8',
    title: '수정 API 호출 전 별도 승인 필요 확인',
    sourceDesignFinding: 'updateApiCallable: false, canCallUpdateApi: false로 설계. 수정 API 호출은 계속 BLOCKED 상태.',
    safetyDecision: 'SAFE_FOR_READ_ONLY_NEXT_STEP',
    executionGuard: 'Payload Safety Review 완료 후에도 Transmittable Payload 별도 승인 Packet 확인 전까지 수정 API 호출 불가.',
  },
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

const USER_APPROVAL_PHRASE = 'Naver 채널 상품 수정 Payload Safety Review를 별도로 승인합니다.';

const SAFETY_REVIEW_COMPLETION_NOTE =
  'Read-Only Payload Safety Review는 완료되었지만, 실제 전송 가능한 payload 생성과 수정 API 호출은 아직 승인되지 않았습니다. 다음 단계에서는 전송 가능 payload 생성 여부를 별도 승인 Packet으로 분리해야 합니다.';

export function buildTmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView(
  approvalPacketView: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewApprovalPacketView,
  resultDecisionView: TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView,
  payloadReadOnlyDesignView: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView
): TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView {
  void approvalPacketView;
  void resultDecisionView;

  return {
    taskId: 434,
    title: 'Task 434 - Naver 채널 상품 수정 Payload Safety Review',
    reviewStatus: 'PAYLOAD_SAFETY_REVIEW_COMPLETED',
    userApprovalPhrase: USER_APPROVAL_PHRASE,
    safetyReviewApprovedPhraseAccepted: true,
    targetChannelProductNo: '6597910207',
    sourcePayloadDesignStatus: payloadReadOnlyDesignView.designStatus,
    payloadDesignMode: payloadReadOnlyDesignView.payloadDesignMode,
    safetyReviewItems: SAFETY_REVIEW_RESULT_ITEMS,
    safetyReviewItemCount: SAFETY_REVIEW_RESULT_ITEMS.length,
    payloadSafetyReviewStatus: 'COMPLETED_FOR_READ_ONLY_FLOW',
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_TRANSMITTABLE_PAYLOAD_APPROVAL',
    nextActionRequiresSeparateApproval: true,
    safetyReviewCompletionNote: SAFETY_REVIEW_COMPLETION_NOTE,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
    nextRecommendedTask: 'Task 435 - Naver 채널 상품 수정 Transmittable Payload 승인 Packet',
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
