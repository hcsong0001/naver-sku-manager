import {
  type TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView,
} from './tms-fast-connection-naver-channel-product-update-payload-design-approval-packet-view.service';
import {
  type TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView,
} from './tms-fast-connection-naver-channel-product-no-update-identifier-official-review-view.service';

export type TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignStatus =
  | 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED';

export type TmsFastConnectionNaverChannelProductUpdatePayloadDesignMode =
  | 'READ_ONLY_NON_TRANSMITTABLE';

export type TmsFastConnectionNaverChannelProductUpdatePayloadApiEntryDecision =
  | 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW';

export type TmsFastConnectionNaverChannelProductUpdatePayloadDesignSafetyStatus =
  | 'READ_ONLY'
  | 'BLOCKED'
  | 'REQUIRES_NEXT_REVIEW';

export interface TmsFastConnectionNaverChannelProductUpdatePayloadDesignGroup {
  designId: string;
  title: string;
  purpose: string;
  designDecision: string;
  allowedData: string[];
  forbiddenData: string[];
  safetyStatus: TmsFastConnectionNaverChannelProductUpdatePayloadDesignSafetyStatus;
}

export interface TmsFastConnectionNaverChannelProductUpdateNonTransmittablePayloadDraft {
  path: {
    channelProductNo: '6597910207';
    transmittable: false;
  };
  bodyDesign: {
    originProduct: {
      designOnly: true;
      actualValuesIncluded: false;
      fullProductNameIncluded: false;
      priceChangeIncluded: false;
      stockChangeIncluded: false;
    };
    smartstoreChannelProduct: {
      designOnly: true;
      actualValuesIncluded: false;
    };
  };
  safety: {
    transmittablePayloadGenerated: false;
    updateApiCallable: false;
    requiresNextReview: true;
  };
}

export interface TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView {
  taskId: 431;
  title: string;
  designStatus: TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignStatus;
  userApprovalPhrase: string;
  approvedPhraseAccepted: true;
  targetChannelProductNo: '6597910207';
  updateEndpoint: 'PUT /v2/products/channel-products/:channelProductNo';
  pathParameterName: 'channelProductNo';
  pathParameterValue: '6597910207';
  channelProductNoCanBeUsedAsUpdatePathParameter: true;
  payloadDesignMode: TmsFastConnectionNaverChannelProductUpdatePayloadDesignMode;
  canBuildTransmittablePayload: false;
  canCallUpdateApi: false;
  productUpdateApiEntryDecision: TmsFastConnectionNaverChannelProductUpdatePayloadApiEntryDecision;
  designGroups: TmsFastConnectionNaverChannelProductUpdatePayloadDesignGroup[];
  nonTransmittablePayloadDraft: TmsFastConnectionNaverChannelProductUpdateNonTransmittablePayloadDraft;
  continuedForbiddenItems: string[];
  nextRecommendedTask: 'Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면';
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

const DESIGN_GROUPS: TmsFastConnectionNaverChannelProductUpdatePayloadDesignGroup[] = [
  {
    designId: 'pathParameterDesign',
    title: 'Path Parameter 설계',
    purpose: '채널 상품 수정 API가 요구하는 path parameter 구조를 설계한다.',
    designDecision: 'channelProductNo = 6597910207을 PUT /v2/products/channel-products/:channelProductNo의 path parameter로 사용',
    allowedData: ['channelProductNo 값 (6597910207)', 'endpoint 경로 구조 표시'],
    forbiddenData: ['실제 전송 가능한 request 생성', 'API 호출'],
    safetyStatus: 'READ_ONLY',
  },
  {
    designId: 'payloadTopLevelStructureDesign',
    title: 'Payload Top-Level 구조 설계',
    purpose: '수정 API body의 최상위 필드 구조를 설계한다.',
    designDecision: 'body는 originProduct와 smartstoreChannelProduct 두 최상위 키를 포함하는 구조로 설계. Task 409 조회 응답의 최상위 키 구조와 일치.',
    allowedData: ['originProduct 키 존재 확인', 'smartstoreChannelProduct 키 존재 확인', '구조 도식화'],
    forbiddenData: ['실제 필드 값 채우기', '상품명/옵션명/판매자코드/가격/재고 포함'],
    safetyStatus: 'READ_ONLY',
  },
  {
    designId: 'originProductDesign',
    title: 'originProduct 필드 그룹 설계',
    purpose: '수정 API body의 originProduct 섹션에 포함될 필드 그룹과 허용/금지 범위를 설계한다.',
    designDecision: 'originProduct는 상품 원본 정보를 담는 섹션. 이번 Task에서는 필드 그룹 분류만 수행하고 실제 값은 포함하지 않음.',
    allowedData: ['originProduct 내 필드 그룹 분류 (read-only)', '필수/선택 필드 구분 표시'],
    forbiddenData: ['실제 상품명 포함', '실제 가격 포함', '실제 재고 포함', '실제 상세설명 포함', '실제 옵션명 포함', '판매자관리코드 포함'],
    safetyStatus: 'READ_ONLY',
  },
  {
    designId: 'smartstoreChannelProductDesign',
    title: 'smartstoreChannelProduct 필드 그룹 설계',
    purpose: '수정 API body의 smartstoreChannelProduct 섹션에 포함될 필드 그룹과 허용/금지 범위를 설계한다.',
    designDecision: 'smartstoreChannelProduct는 채널별 상품 정보를 담는 섹션. 이번 Task에서는 필드 그룹 분류만 수행하고 실제 값은 포함하지 않음.',
    allowedData: ['smartstoreChannelProduct 내 필드 그룹 분류 (read-only)', '필수/선택 필드 구분 표시'],
    forbiddenData: ['실제 채널 상품명 포함', '실제 채널 가격 포함', '실제 재고 포함'],
    safetyStatus: 'READ_ONLY',
  },
  {
    designId: 'preserveExistingProductStructurePolicy',
    title: '기존 상품 구조 보존 원칙 설계',
    purpose: '수정 API 호출 시 의도치 않은 기존 데이터 손실을 방지하기 위한 보존 원칙을 설계한다.',
    designDecision: '수정 payload에는 변경 의도가 없는 필드를 포함하지 않는다. 가격/재고/상품명/옵션은 명시적 변경 승인 없이 payload에 포함 금지.',
    allowedData: ['보존 원칙 문서화', '변경 금지 필드 목록 정의'],
    forbiddenData: ['임의 필드 값 설정', '가격/재고 변경 의도 없이 관련 필드 포함'],
    safetyStatus: 'READ_ONLY',
  },
  {
    designId: 'priceStockChangeSafetyPolicy',
    title: '가격/재고 변경 안전 정책 설계',
    purpose: '가격/재고 변경은 별도 승인 없이 payload에 포함할 수 없음을 명확히 설계한다.',
    designDecision: '이번 Task에서 가격/재고 필드는 payload 설계 범위 외. 가격/재고 수정을 위한 별도 Task와 안전 비교 기준이 확정된 이후에만 포함 가능.',
    allowedData: ['가격/재고 관련 필드 목록 문서화 (read-only)', '안전 비교 기준 설계 방향 정리'],
    forbiddenData: ['실제 가격 값 payload 포함', '실제 재고 값 payload 포함', '가격 변경 수행'],
    safetyStatus: 'BLOCKED',
  },
  {
    designId: 'nonTransmittablePayloadGuard',
    title: 'Non-Transmittable Payload 가드 설계',
    purpose: '이번 Task에서 생성되는 payload 초안이 실제 API 전송에 사용될 수 없음을 보장하는 가드를 설계한다.',
    designDecision: 'payload 초안에는 transmittable: false 플래그를 명시하고, 실제 값 없이 구조 설계만 표시한다. 다음 Task에서 설계 결과 판단 후 별도 승인 단계로 이동.',
    allowedData: ['transmittable: false 플래그 포함', '설계 구조 도식화'],
    forbiddenData: ['transmittable payload 생성', '실제 API body로 사용 가능한 JSON 생성'],
    safetyStatus: 'REQUIRES_NEXT_REVIEW',
  },
];

const NON_TRANSMITTABLE_PAYLOAD_DRAFT: TmsFastConnectionNaverChannelProductUpdateNonTransmittablePayloadDraft = {
  path: {
    channelProductNo: '6597910207',
    transmittable: false,
  },
  bodyDesign: {
    originProduct: {
      designOnly: true,
      actualValuesIncluded: false,
      fullProductNameIncluded: false,
      priceChangeIncluded: false,
      stockChangeIncluded: false,
    },
    smartstoreChannelProduct: {
      designOnly: true,
      actualValuesIncluded: false,
    },
  },
  safety: {
    transmittablePayloadGenerated: false,
    updateApiCallable: false,
    requiresNextReview: true,
  },
};

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

const USER_APPROVAL_PHRASE = 'Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.';

export function buildTmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView(
  approvalPacketView: TmsFastConnectionNaverChannelProductUpdatePayloadDesignApprovalPacketView,
  officialReviewView: TmsFastConnectionNaverChannelProductNoUpdateIdentifierOfficialReviewView
): TmsFastConnectionNaverChannelProductUpdatePayloadReadOnlyDesignView {
  void approvalPacketView;
  void officialReviewView;

  return {
    taskId: 431,
    title: 'Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계',
    designStatus: 'READ_ONLY_PAYLOAD_DESIGN_COMPLETED',
    userApprovalPhrase: USER_APPROVAL_PHRASE,
    approvedPhraseAccepted: true,
    targetChannelProductNo: '6597910207',
    updateEndpoint: 'PUT /v2/products/channel-products/:channelProductNo',
    pathParameterName: 'channelProductNo',
    pathParameterValue: '6597910207',
    channelProductNoCanBeUsedAsUpdatePathParameter: true,
    payloadDesignMode: 'READ_ONLY_NON_TRANSMITTABLE',
    canBuildTransmittablePayload: false,
    canCallUpdateApi: false,
    productUpdateApiEntryDecision: 'BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW',
    designGroups: DESIGN_GROUPS,
    nonTransmittablePayloadDraft: NON_TRANSMITTABLE_PAYLOAD_DRAFT,
    continuedForbiddenItems: CONTINUED_FORBIDDEN_ITEMS,
    nextRecommendedTask: 'Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면',
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
