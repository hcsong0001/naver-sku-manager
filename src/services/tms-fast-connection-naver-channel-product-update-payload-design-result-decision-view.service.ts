import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView,
} from './tms-fast-connection-naver-channel-product-update-payload-read-only-design-view.service';

export type TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionStatus =
  | 'PAYLOAD_DESIGN_RESULT_DECISION_READY';

export interface TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewItem {
  reviewItemId: string;
  title: string;
  currentDesignFinding: string;
  requiredSafetyCheck: string;
  decisionBeforeReview: 'BLOCKED';
}

export interface TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView {
  taskId: 432;
  title: string;
  decisionStatus: TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionStatus;
  targetChannelProductNo: '6597910207';
  sourceDesignStatus: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView['designStatus'];
  payloadDesignMode: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView['payloadDesignMode'];
  designGroupCount: 7;
  payloadDesignAcceptedForReview: true;
  canBuildTransmittablePayload: false;
  canCallUpdateApi: false;
  productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW';
  payloadSafetyReviewRequired: true;
  safetyReviewItems: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewItem[];
  nextRecommendedTask: 'Task 433 - Naver 채널 상품 수정 Payload Safety Review 승인 Packet';
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

const SAFETY_REVIEW_ITEMS: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewItem[] = [
  {
    reviewItemId: 'SR1',
    title: 'path parameter channelProductNo 고정 확인',
    currentDesignFinding: 'channelProductNo = 6597910207로 path parameter 설계 완료. transmittable: false 플래그 포함.',
    requiredSafetyCheck: '실제 수정 API 호출 시 channelProductNo 값이 의도한 상품에만 사용되는지 별도 승인 필요.',
    decisionBeforeReview: 'BLOCKED',
  },
  {
    reviewItemId: 'SR2',
    title: 'originProduct 필수 필드 누락 위험 검토',
    currentDesignFinding: 'originProduct는 designOnly: true, actualValuesIncluded: false로 설계. 실제 필수 필드 목록 미확인.',
    requiredSafetyCheck: '수정 API가 요구하는 originProduct 내 필수 필드가 누락될 경우 API 오류 또는 의도치 않은 데이터 삭제 위험. 필수 필드 목록 확인 필요.',
    decisionBeforeReview: 'BLOCKED',
  },
  {
    reviewItemId: 'SR3',
    title: 'smartstoreChannelProduct 필수 필드 누락 위험 검토',
    currentDesignFinding: 'smartstoreChannelProduct는 designOnly: true, actualValuesIncluded: false로 설계. 실제 필수 필드 목록 미확인.',
    requiredSafetyCheck: '수정 API가 요구하는 smartstoreChannelProduct 내 필수 필드 누락 시 오류 또는 데이터 손실 위험. 필수 필드 목록 확인 필요.',
    decisionBeforeReview: 'BLOCKED',
  },
  {
    reviewItemId: 'SR4',
    title: '기존 상품명/옵션/추가상품 구조 보존 검토',
    currentDesignFinding: '기존 상품 구조 보존 원칙이 설계에 포함됨. 상품명/옵션명/추가상품은 payload에 실제 값 포함 금지로 설계.',
    requiredSafetyCheck: '수정 API 호출 시 기존 상품명/옵션/추가상품 구조가 의도치 않게 변경되거나 삭제되지 않는지 별도 안전 비교 검토 필요.',
    decisionBeforeReview: 'BLOCKED',
  },
  {
    reviewItemId: 'SR5',
    title: '가격 필드 변경 차단 검토',
    currentDesignFinding: 'priceChangeIncluded: false로 설계. 가격 필드는 이번 payload 설계 범위 외.',
    requiredSafetyCheck: '가격 필드가 payload에 포함되지 않도록 차단 확인 필요. 가격 변경을 위해서는 별도 Task와 안전 비교 승인 필요.',
    decisionBeforeReview: 'BLOCKED',
  },
  {
    reviewItemId: 'SR6',
    title: '재고 필드 변경 차단 검토',
    currentDesignFinding: 'stockChangeIncluded: false로 설계. 재고 필드는 이번 payload 설계 범위 외.',
    requiredSafetyCheck: '재고 필드가 payload에 포함되지 않도록 차단 확인 필요. 재고 변경을 위해서는 별도 Task와 안전 비교 승인 필요.',
    decisionBeforeReview: 'BLOCKED',
  },
  {
    reviewItemId: 'SR7',
    title: '실제 전송 가능한 payload 생성 차단 검토',
    currentDesignFinding: 'transmittablePayloadGenerated: false, canBuildTransmittablePayload: false로 설계. payload 초안은 전송 불가 상태.',
    requiredSafetyCheck: '실제 전송 가능한 payload 생성 전에 Safety Review 완료 및 별도 승인이 필요함을 확인.',
    decisionBeforeReview: 'BLOCKED',
  },
  {
    reviewItemId: 'SR8',
    title: '수정 API 호출 전 별도 승인 필요 검토',
    currentDesignFinding: 'updateApiCallable: false, canCallUpdateApi: false로 설계. 수정 API 호출은 계속 BLOCKED.',
    requiredSafetyCheck: 'Payload Safety Review 및 별도 승인 Packet 확인 후에만 수정 API 호출 진입 가능. 현재 단계에서는 호출 불가.',
    decisionBeforeReview: 'BLOCKED',
  },
];

export function buildTmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView(
  payloadReadOnlyDesignView: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView
): TmsFastConnectionNaverChannelProductUpdatePayloadDesignResultDecisionView {
  return {
    taskId: 432,
    title: 'Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면',
    decisionStatus: 'PAYLOAD_DESIGN_RESULT_DECISION_READY',
    targetChannelProductNo: '6597910207',
    sourceDesignStatus: payloadReadOnlyDesignView.designStatus,
    payloadDesignMode: payloadReadOnlyDesignView.payloadDesignMode,
    designGroupCount: 7,
    payloadDesignAcceptedForReview: true,
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW',
    payloadSafetyReviewRequired: true,
    safetyReviewItems: SAFETY_REVIEW_ITEMS,
    nextRecommendedTask: 'Task 433 - Naver 채널 상품 수정 Payload Safety Review 승인 Packet',
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
