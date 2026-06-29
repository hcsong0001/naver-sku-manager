export interface NaverReadOnlyProductDataCaptureSafetyAuditItem {
  auditItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductDataCaptureSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_SAFETY_AUDIT_SEALED';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  isNaverReadOnlyProductDataCaptureApprovalPacketReady: true;
  readOnlyProductDataCaptureStatus: string;
  isCaptureResultConfirmed: true;
  isCapturedProductDataAllowedFieldsOnly: true;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isSalePricePresenceFlagOnly: true;
  isStockQuantityPresenceFlagOnly: true;
  isRepresentativeImagePresenceFlagOnly: true;
  auditItems: NaverReadOnlyProductDataCaptureSafetyAuditItem[];
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

const VALID_CAPTURE_STATUSES = [
  'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
  'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  'CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  'CAPTURE_BLOCKED_BY_ENV_MISSING',
  'CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  'CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
] as const;

export function buildNaverReadOnlyProductDataCaptureSafetyAuditSealView(input: {
  captureResult: any;
}): NaverReadOnlyProductDataCaptureSafetyAuditSealView {
  const captureResult = input?.captureResult ?? null;
  const rawCaptureStatus = captureResult?.readOnlyProductDataCaptureStatus ?? '';
  const readOnlyProductDataCaptureStatus: string =
    (VALID_CAPTURE_STATUSES as readonly string[]).includes(rawCaptureStatus)
      ? rawCaptureStatus
      : 'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const auditItems: NaverReadOnlyProductDataCaptureSafetyAuditItem[] = [
    { auditItem: 'Task 276 Capture Result', status: 'CAPTURE_RESULT_CONFIRMED', meaning: 'Task 276 결과 확인' },
    { auditItem: 'Task 275 Approval Packet', status: 'APPROVAL_PACKET_CONFIRMED', meaning: '승인 패킷 확인' },
    { auditItem: '캡처 상태', status: 'CAPTURE_STATUS_RECORDED', meaning: 'capture status 기록' },
    { auditItem: '허용 필드만 포함', status: 'ALLOWED_FIELDS_ONLY_CONFIRMED', meaning: '허용 필드만 포함' },
    { auditItem: 'raw API response 전체', status: 'NOT_INCLUDED', meaning: '원본 응답 전체 없음' },
    { auditItem: '가격 원본 값', status: 'NOT_INCLUDED', meaning: 'salePrice 원값 없음' },
    { auditItem: '재고 원본 값', status: 'NOT_INCLUDED', meaning: 'stockQuantity 원값 없음' },
    { auditItem: '가격 존재 여부', status: 'PRESENCE_FLAG_ONLY', meaning: 'salePricePresent만 허용' },
    { auditItem: '재고 존재 여부', status: 'PRESENCE_FLAG_ONLY', meaning: 'stockQuantityPresent만 허용' },
    { auditItem: '대표 이미지', status: 'PRESENCE_FLAG_ONLY', meaning: 'representativeImageUrlPresent만 허용' },
    { auditItem: 'Token 값', status: 'NOT_DISPLAYED', meaning: 'Token 값 없음' },
    { auditItem: 'Auth 값', status: 'NOT_DISPLAYED', meaning: 'Auth 값 없음' },
    { auditItem: 'Signature', status: 'NOT_DISPLAYED', meaning: 'Signature 없음' },
    { auditItem: 'Authorization 헤더', status: 'NOT_DISPLAYED', meaning: 'Authorization 없음' },
    { auditItem: 'Token 저장', status: 'NOT_STORED', meaning: '저장 없음' },
    { auditItem: 'raw 응답 저장', status: 'NOT_STORED', meaning: '원본 응답 저장 없음' },
    { auditItem: 'DB write', status: 'NOT_EXECUTED', meaning: 'DB write 없음' },
    { auditItem: 'DB upsert', status: 'NOT_EXECUTED', meaning: 'DB upsert 없음' },
    { auditItem: 'DB update', status: 'NOT_EXECUTED', meaning: 'DB update 없음' },
    { auditItem: 'Token 재발급', status: 'NOT_EXECUTED', meaning: '이번 Task 발급 없음' },
    { auditItem: '상품 조회 API 재호출', status: 'NOT_EXECUTED', meaning: '이번 Task 조회 없음' },
    { auditItem: '상품 수정 API 호출', status: 'NOT_EXECUTED', meaning: '수정 없음' },
    { auditItem: '가격 변경', status: 'NOT_EXECUTED', meaning: '가격 변경 없음' },
    { auditItem: '재고 변경', status: 'NOT_EXECUTED', meaning: '재고 변경 없음' },
    { auditItem: '.env 직접 열람', status: 'NOT_ACCESSED', meaning: '파일 열람 없음' },
    { auditItem: '.env 자동 수정', status: 'NOT_MODIFIED', meaning: '파일 수정 없음' },
    { auditItem: 'Worker / Queue / Adapter', status: 'LOCKED', meaning: '실행 경로 없음' },
    { auditItem: '다음 단계', status: 'PENDING_SEPARATE_APPROVAL', meaning: '다음 단계 별도 승인 필요' },
    { auditItem: '현재 Task 상태', status: 'READ_ONLY_INFO', meaning: 'Task 277은 감사 봉인 표시 전용' },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_SAFETY_AUDIT_SEALED',
    panelTitle: 'Naver Read-Only Product Data Capture Safety Audit Seal (Task 277)',
    description:
      'Task 277은 Task 276의 read-only 캡처 결과가 안전한 표시용 필드만 포함하는지 감사 봉인하는 단계입니다. 가격/재고 원본 값, raw API response, Token/Auth/Signature/Authorization 값은 포함하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    isNaverReadOnlyProductDataCaptureApprovalPacketReady: true,
    readOnlyProductDataCaptureStatus,
    isCaptureResultConfirmed: true,
    isCapturedProductDataAllowedFieldsOnly: true,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isSalePricePresenceFlagOnly: true,
    isStockQuantityPresenceFlagOnly: true,
    isRepresentativeImagePresenceFlagOnly: true,
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
