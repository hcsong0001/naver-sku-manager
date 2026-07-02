import {
  CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView,
} from './tms-fast-connection-naver-channel-product-update-transmittable-payload-final-gate-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
} from './tms-fast-connection-naver-channel-product-update-payload-safety-review-view.service';
import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView,
} from './tms-fast-connection-naver-channel-product-update-payload-read-only-design-view.service';

export type TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildStatus =
  | 'TRANSMITTABLE_PAYLOAD_BUILD_COMPLETED'
  | 'TRANSMITTABLE_PAYLOAD_BUILD_BLOCKED_BY_SOURCE_DATA_GAP';

export interface TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadCandidate {
  path: {
    channelProductNo: '6597910207';
  };
  method: 'PUT';
  endpoint: '/v2/products/channel-products/:channelProductNo';
  body: {
    originProduct: {
      preserveExistingStructure: true;
      priceChangeIncluded: false;
      stockChangeIncluded: false;
    };
    smartstoreChannelProduct: {
      preserveExistingStructure: true;
    };
  };
  safety: {
    transmittablePayloadGenerated: true;
    updateApiCalled: false;
    priceChangeAllowed: false;
    stockChangeAllowed: false;
    requiresFinalExecutionApproval: true;
  };
}

export interface TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildSummary {
  pathChannelProductNo: '6597910207';
  method: 'PUT';
  endpoint: '/v2/products/channel-products/:channelProductNo';
  bodyTopLevelKeys: ['originProduct', 'smartstoreChannelProduct'];
  priceChangeIncluded: false;
  stockChangeIncluded: false;
  updateApiCalled: false;
  requiresFinalExecutionApproval: true;
}

export interface TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView {
  taskId: 437;
  title: string;
  buildStatus: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildStatus;
  targetChannelProductNo: '6597910207';
  approvalAccepted: boolean;
  requiredApprovalPhrase: typeof CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE;
  transmittablePayloadGenerated: boolean;
  sourceDataGapDetected: boolean;
  sourceDataGapReasons: string[];
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  canCallUpdateApi: false;
  updateApiCalled: false;
  dbWritePerformed: false;
  payloadSummary: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildSummary | null;
  transmittablePayloadCandidate: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadCandidate | null;
  continuedForbiddenItems: string[];
  nextRecommendedTask: 'Task 438 - Naver 채널 상품 수정 Transmittable Payload 결과 판단 화면';
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

interface OptionalTransmittableSourceSnapshot {
  transmittableSourceDataSnapshot?: {
    channelProductNo: '6597910207';
    preserveExistingStructureConfirmed: true;
    originProductSufficient: true;
    smartstoreChannelProductSufficient: true;
    placeholderFree: true;
    containsNoSecrets: true;
  };
}

const CONTINUED_FORBIDDEN_ITEMS: string[] = [
  'Naver API 재호출',
  '상품 수정 API 호출',
  '가격 변경',
  '재고 변경',
  'DB write',
  'raw response 표시 또는 저장',
  'secret/token/header/signature 노출',
  'full product name / option name / seller code 노출',
  'POST API 추가',
  '버튼/form/submit action 추가',
  'Worker/Queue/Runtime 실행',
  'Prisma schema/migration/package 변경',
];

function buildSourceDataGapReasons(
  payloadReadOnlyDesignView: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView
): string[] {
  const reasons: string[] = [];
  const snapshot = (
    payloadReadOnlyDesignView as TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView &
      OptionalTransmittableSourceSnapshot
  ).transmittableSourceDataSnapshot;

  if (!snapshot) {
    reasons.push('전송 가능한 payload 생성을 위한 실제 source data snapshot이 제공되지 않았습니다.');
    return reasons;
  }

  if (snapshot.channelProductNo !== '6597910207') {
    reasons.push('channelProductNo가 승인 대상과 일치하지 않습니다.');
  }
  if (!snapshot.preserveExistingStructureConfirmed) {
    reasons.push('기존 상품 구조 보존 가능 여부가 확인되지 않았습니다.');
  }
  if (!snapshot.originProductSufficient) {
    reasons.push('originProduct 필수 source data가 충분하지 않습니다.');
  }
  if (!snapshot.smartstoreChannelProductSufficient) {
    reasons.push('smartstoreChannelProduct 필수 source data가 충분하지 않습니다.');
  }
  if (!snapshot.placeholderFree) {
    reasons.push('placeholder 또는 임의/추정 값이 감지되었습니다.');
  }
  if (!snapshot.containsNoSecrets) {
    reasons.push('secret/token/header/signature 포함 가능성이 제거되지 않았습니다.');
  }

  return reasons;
}

function buildPayloadCandidate():
  TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadCandidate {
  return {
    path: {
      channelProductNo: '6597910207',
    },
    method: 'PUT',
    endpoint: '/v2/products/channel-products/:channelProductNo',
    body: {
      originProduct: {
        preserveExistingStructure: true,
        priceChangeIncluded: false,
        stockChangeIncluded: false,
      },
      smartstoreChannelProduct: {
        preserveExistingStructure: true,
      },
    },
    safety: {
      transmittablePayloadGenerated: true,
      updateApiCalled: false,
      priceChangeAllowed: false,
      stockChangeAllowed: false,
      requiresFinalExecutionApproval: true,
    },
  };
}

function buildPayloadSummary():
  TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildSummary {
  return {
    pathChannelProductNo: '6597910207',
    method: 'PUT',
    endpoint: '/v2/products/channel-products/:channelProductNo',
    bodyTopLevelKeys: ['originProduct', 'smartstoreChannelProduct'],
    priceChangeIncluded: false,
    stockChangeIncluded: false,
    updateApiCalled: false,
    requiresFinalExecutionApproval: true,
  };
}

export function buildTmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView(
  finalGateView: TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadFinalGateView,
  payloadSafetyReviewView: TmsFastConnectionNaverChannelProductUpdatePayloadSafetyReviewView,
  payloadReadOnlyDesignView: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView
): TmsFastConnectionNaverChannelProductUpdateTransmittablePayloadBuildView {
  void payloadSafetyReviewView;

  const approvalAccepted =
    finalGateView.requiredApprovalPhrase ===
    CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE;
  const sourceDataGapReasons = buildSourceDataGapReasons(payloadReadOnlyDesignView);
  const sourceDataGapDetected = sourceDataGapReasons.length > 0;
  const transmittablePayloadGenerated = approvalAccepted && !sourceDataGapDetected;
  const transmittablePayloadCandidate = transmittablePayloadGenerated
    ? buildPayloadCandidate()
    : null;
  const payloadSummary = transmittablePayloadGenerated ? buildPayloadSummary() : null;

  return {
    taskId: 437,
    title: 'Task 437 - Naver 채널 상품 수정 Transmittable Payload 생성',
    buildStatus: transmittablePayloadGenerated
      ? 'TRANSMITTABLE_PAYLOAD_BUILD_COMPLETED'
      : 'TRANSMITTABLE_PAYLOAD_BUILD_BLOCKED_BY_SOURCE_DATA_GAP',
    targetChannelProductNo: finalGateView.targetChannelProductNo,
    approvalAccepted,
    requiredApprovalPhrase: CHANNEL_PRODUCT_UPDATE_TRANSMITTABLE_PAYLOAD_APPROVAL_PHRASE,
    transmittablePayloadGenerated,
    sourceDataGapDetected,
    sourceDataGapReasons,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    canCallUpdateApi: false,
    updateApiCalled: false,
    dbWritePerformed: false,
    payloadSummary,
    transmittablePayloadCandidate,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
    nextRecommendedTask: 'Task 438 - Naver 채널 상품 수정 Transmittable Payload 결과 판단 화면',
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
