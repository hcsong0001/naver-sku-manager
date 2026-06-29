export interface NaverReadOnlyProductStructureReviewSafetyAuditItem {
  auditItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductStructureReviewSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_SAFETY_AUDIT_SEALED';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true;
  isNaverReadOnlyProductStructureReviewResultReady: true;
  isNaverReadOnlyProductStructureReviewApprovalPacketReady: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyProductStructureReviewStatus: string;
  isStructureReviewConfirmed: true;
  isUserApprovalConfirmedForTask285: true;
  isCapturedDataUsedOnly: true;
  isSummaryReviewResultUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isReadOnlyProductStructureReviewReexecutedInThisTask: false;
  isProductStructureReviewBuiltFromCapturedData: boolean;
  isOptionStructureDetailAvailableInCapturedData: false;
  isAdditionalProductStructureDetailAvailableInCapturedData: false;
  isOptionStructureInferred: false;
  isAdditionalProductStructureInferred: false;
  isIdentityStructureReadOnlyReviewed: boolean;
  isCategoryStructureReadOnlyReviewed: boolean;
  isMediaStructurePresenceFlagOnly: true;
  isCommercialPresenceFlagOnly: true;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isSalePricePresenceFlagOnly: true;
  isStockQuantityPresenceFlagOnly: true;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  auditItems: NaverReadOnlyProductStructureReviewSafetyAuditItem[];
  isTokenReissuedInThisTask: false;
  isTokenIssuanceExecutedInThisTask: false;
  isProductLookupApiCalledInThisTask: false;
  isNaverApiCalledInThisTask: false;
  isTokenValueIncludedInView: false;
  isTokenValueDisplayed: false;
  isTokenReturnedToClient: false;
  isTokenLoggedToConsole: false;
  isTokenStored: false;
  isTokenStoredInDb: false;
  isTokenStoredInFile: false;
  isEnvFileDirectlyAccessed: false;
  isEnvFileModified: false;
  isEnvValueDisplayed: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;
  isSignatureDisplayed: false;
  isAuthorizationHeaderDisplayed: false;
  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;
  isReadOnlyProductLookupOnly: true;
  isDbWriteExecuted: false;
  isDbUpsertExecuted: false;
  isDbUpdateExecuted: false;
  isActualApprovalSubmissionAllowed: false;
  isApprovalSubmitted: false;
  isExecutionAllowed: false;
  isPostApiConnected: false;
  isMutationConnected: false;
  isLiveExecutionEnabled: false;
  hasApprovalRequestButton: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
  hasAdapterTrigger: false;
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;
}

const VALID_STRUCTURE_REVIEW_STATUSES = [
  'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE',
  'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE',
  'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
  'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
] as const;

export function buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(input: {
  structureReview: any;
  approvalPacket: any;
  summaryReview: any;
  captureResult: any;
}): NaverReadOnlyProductStructureReviewSafetyAuditSealView {
  const structureReview = input?.structureReview ?? null;
  const rawStructureReviewStatus =
    structureReview?.readOnlyProductStructureReviewStatus ?? '';
  const readOnlyProductStructureReviewStatus: string = (
    VALID_STRUCTURE_REVIEW_STATUSES as readonly string[]
  ).includes(rawStructureReviewStatus)
    ? rawStructureReviewStatus
    : 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const isProductStructureReviewBuiltFromCapturedData =
    structureReview?.isCapturedDataUsedOnly === true &&
    structureReview?.isSummaryReviewResultUsedOnly === true;
  const isIdentityStructureReadOnlyReviewed =
    structureReview?.isReadOnlyProductStructureReviewExecutedInThisTask === true &&
    Array.isArray(structureReview?.fieldReviewItems) &&
    structureReview.fieldReviewItems.some(
      (item: any) =>
        item?.fieldName === 'channelProductNo' ||
        item?.fieldName === 'productName'
    );
  const isCategoryStructureReadOnlyReviewed =
    structureReview?.isReadOnlyProductStructureReviewExecutedInThisTask === true &&
    Array.isArray(structureReview?.fieldReviewItems) &&
    structureReview.fieldReviewItems.some(
      (item: any) => item?.fieldName === 'leafCategoryId'
    );

  const auditItems: NaverReadOnlyProductStructureReviewSafetyAuditItem[] = [
    {
      auditItem: 'Task 285 Structure Review',
      status: 'STRUCTURE_REVIEW_CONFIRMED',
      meaning: 'Task 285 구조 검토 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 284 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 284 승인 패킷을 확인했습니다.',
    },
    {
      auditItem: 'Task 281 Summary Review',
      status: 'SUMMARY_REVIEW_CONFIRMED',
      meaning: '기존 요약 검토 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      auditItem: '사용자 승인 문구',
      status: 'USER_APPROVAL_CONFIRMED_FOR_TASK_285',
      meaning: 'Task 285 승인 범위를 확인했습니다.',
    },
    {
      auditItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과를 사용하지 않았습니다.',
    },
    {
      auditItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '새 요약 검토를 수행하지 않았습니다.',
    },
    {
      auditItem: '새 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 새 API 호출이 없습니다.',
    },
    {
      auditItem: '옵션 구조 상세',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      auditItem: '추가상품 구조 상세',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      auditItem: '옵션 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 옵션 구조 상세가 없습니다.',
    },
    {
      auditItem: '추가상품 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 추가상품 구조 상세가 없습니다.',
    },
    {
      auditItem: '상품 식별 구조',
      status: 'READ_ONLY_REVIEWED',
      meaning: '식별 구조를 read-only로 검토했습니다.',
    },
    {
      auditItem: '카테고리 구조',
      status: 'READ_ONLY_REVIEWED',
      meaning: '카테고리 구조를 read-only로 검토했습니다.',
    },
    {
      auditItem: '이미지 구조',
      status: 'PRESENCE_FLAG_ONLY',
      meaning: '대표 이미지 존재 여부 플래그만 사용했습니다.',
    },
    {
      auditItem: '가격 존재 여부',
      status: 'PRESENCE_FLAG_ONLY',
      meaning: '가격 원값 없이 존재 여부 플래그만 사용했습니다.',
    },
    {
      auditItem: '재고 존재 여부',
      status: 'PRESENCE_FLAG_ONLY',
      meaning: '재고 원값 없이 존재 여부 플래그만 사용했습니다.',
    },
    {
      auditItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      auditItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      auditItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 응답 전체를 포함하지 않습니다.',
    },
    {
      auditItem: 'raw API response 저장',
      status: 'NOT_STORED',
      meaning: '원본 응답 전체를 저장하지 않습니다.',
    },
    {
      auditItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      auditItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      auditItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      auditItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 값을 표시하지 않습니다.',
    },
    {
      auditItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급을 수행하지 않습니다.',
    },
    {
      auditItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출을 수행하지 않습니다.',
    },
    {
      auditItem: '상품 구조 검토 재수행',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 구조 검토를 재수행하지 않습니다.',
    },
    {
      auditItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않습니다.',
    },
    {
      auditItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않습니다.',
    },
    {
      auditItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않습니다.',
    },
    {
      auditItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않습니다.',
    },
    {
      auditItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로가 없습니다.',
    },
    {
      auditItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 단계는 별도 승인이 필요합니다.',
    },
    {
      auditItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 286은 감사 봉인 표시 전용입니다.',
    },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_SAFETY_AUDIT_SEALED',
    panelTitle:
      'Naver Read-Only Product Structure Review Safety Audit Seal (Task 286)',
    description:
      'Task 286은 Task 285 read-only 상품 구조 검토 결과의 안전성을 감사 봉인하는 단계입니다. 기존 캡처 데이터와 기존 요약 검토 결과만 사용했으며, 옵션/추가상품 구조는 캡처 데이터에 없으므로 추정하지 않았습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
    isNaverReadOnlyProductStructureReviewResultReady: true,
    isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyProductStructureReviewStatus,
    isStructureReviewConfirmed: true,
    isUserApprovalConfirmedForTask285: true,
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isReadOnlyProductStructureReviewReexecutedInThisTask: false,
    isProductStructureReviewBuiltFromCapturedData,
    isOptionStructureDetailAvailableInCapturedData: false,
    isAdditionalProductStructureDetailAvailableInCapturedData: false,
    isOptionStructureInferred: false,
    isAdditionalProductStructureInferred: false,
    isIdentityStructureReadOnlyReviewed,
    isCategoryStructureReadOnlyReviewed,
    isMediaStructurePresenceFlagOnly: true,
    isCommercialPresenceFlagOnly: true,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isSalePricePresenceFlagOnly: true,
    isStockQuantityPresenceFlagOnly: true,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
    auditItems,
    isTokenReissuedInThisTask: false,
    isTokenIssuanceExecutedInThisTask: false,
    isProductLookupApiCalledInThisTask: false,
    isNaverApiCalledInThisTask: false,
    isTokenValueIncludedInView: false,
    isTokenValueDisplayed: false,
    isTokenReturnedToClient: false,
    isTokenLoggedToConsole: false,
    isTokenStored: false,
    isTokenStoredInDb: false,
    isTokenStoredInFile: false,
    isEnvFileDirectlyAccessed: false,
    isEnvFileModified: false,
    isEnvValueDisplayed: false,
    isAuthKeyValueDisplayed: false,
    isSecretLogged: false,
    isSignatureDisplayed: false,
    isAuthorizationHeaderDisplayed: false,
    isProductLookupApiCalled: false,
    isProductUpdateApiCalled: false,
    isPriceOrStockChanged: false,
    isReadOnlyProductLookupOnly: true,
    isDbWriteExecuted: false,
    isDbUpsertExecuted: false,
    isDbUpdateExecuted: false,
    isActualApprovalSubmissionAllowed: false,
    isApprovalSubmitted: false,
    isExecutionAllowed: false,
    isPostApiConnected: false,
    isMutationConnected: false,
    isLiveExecutionEnabled: false,
    hasApprovalRequestButton: false,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
    hasAdapterTrigger: false,
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,
  };
}
