export type NaverReadOnlyProductStructureReviewOutcomeCertificationStatus =
  | 'CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY'
  | 'CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export type NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus =
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP';

export interface NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateItem {
  item: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView {
  status: 'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 288;
  referenceTaskNumbers: readonly [287, 286, 285, 284, 281, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateReady: true;
  isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true;
  isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true;
  isNaverReadOnlyProductStructureReviewResultReady: true;
  isNaverReadOnlyProductStructureReviewApprovalPacketReady: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyProductStructureReviewOutcomeCertificationStatus: NaverReadOnlyProductStructureReviewOutcomeCertificationStatus;
  optionAdditionalStructureExpansionPlanningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus;
  isPlanningCandidateReadyForCompleteSummary: boolean;
  isPlanningCandidateReadyWithMissingFieldNotice: boolean;
  isPlanningCandidateBlockedByGwIp: boolean;
  isPlanningCandidateBlockedByToken: boolean;
  isPlanningCandidateBlockedByEnv: boolean;
  isPlanningCandidateBlockedByChannel: boolean;
  isPlanningCandidateBlockedByProductLookup: boolean;
  isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate: boolean;
  isNextReadOnlyOptionAdditionalStructureExpansionPlanningBlocked: boolean;
  isMissingFieldNoticeRequired: boolean;
  planningCandidateReason: string;
  blockingReason: string | null;
  safetyRestrictions: string[];
  nonExecutedItems: string[];
  candidateItems: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateItem[];
  isCapturedDataUsedOnly: true;
  isSummaryReviewResultUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isReadOnlyProductStructureReviewReexecutedInThisTask: false;
  isProductStructureReviewBuiltFromCapturedData: boolean;
  isOptionStructureDetailAvailableInCapturedData: false;
  isAdditionalProductStructureDetailAvailableInCapturedData: false;
  isOptionStructureInferred: false;
  isAdditionalProductStructureInferred: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isSalePricePresenceFlagOnly: true;
  isStockQuantityPresenceFlagOnly: true;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
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
}

const OUTCOME_TO_PLANNING_CANDIDATE: Record<
  NaverReadOnlyProductStructureReviewOutcomeCertificationStatus,
  NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus
> = {
  CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY',
  CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
  CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP',
  CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN',
  CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV',
  CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL',
  CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
};

const ALLOWED_OUTCOME_STATUSES = Object.keys(
  OUTCOME_TO_PLANNING_CANDIDATE
) as NaverReadOnlyProductStructureReviewOutcomeCertificationStatus[];

function buildReason(
  candidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus
): { planningCandidateReason: string; blockingReason: string | null } {
  switch (candidateStatus) {
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY':
      return {
        planningCandidateReason:
          'Task 287 COMPLETE 인증 결과를 기준으로 다음 read-only 옵션/추가상품 구조 확장 설계 후보로 안내할 수 있습니다.',
        blockingReason: null,
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE':
      return {
        planningCandidateReason:
          'Task 287 PARTIAL 인증 결과를 기준으로 누락 안내와 함께 다음 read-only 옵션/추가상품 구조 확장 설계 후보로 안내할 수 있습니다.',
        blockingReason: null,
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP':
      return {
        planningCandidateReason:
          'Task 287 차단 상태를 그대로 따라 이번 Task는 후보 차단 안내만 제공합니다.',
        blockingReason: 'GW IP 허용 목록 재확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN':
      return {
        planningCandidateReason:
          'Task 287 차단 상태를 그대로 따라 이번 Task는 후보 차단 안내만 제공합니다.',
        blockingReason: '인증/권한 재확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV':
      return {
        planningCandidateReason:
          'Task 287 차단 상태를 그대로 따라 이번 Task는 후보 차단 안내만 제공합니다.',
        blockingReason: 'Env/Auth 재확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL':
      return {
        planningCandidateReason:
          'Task 287 차단 상태를 그대로 따라 이번 Task는 후보 차단 안내만 제공합니다.',
        blockingReason: 'channelProductNo 확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP':
      return {
        planningCandidateReason:
          'Task 287 차단 상태를 그대로 따라 이번 Task는 후보 차단 안내만 제공합니다.',
        blockingReason: '상품/스토어 접근 재확인이 필요합니다.',
      };
  }
}

function buildCandidateItems(
  candidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus
): NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateItem[] {
  const isReady =
    candidateStatus ===
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY' ||
    candidateStatus ===
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE';

  return [
    {
      item: 'Task 287 Outcome Certification',
      status: 'OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 287 인증 결과를 확인했습니다.',
    },
    {
      item: 'Task 286 Safety Audit Seal',
      status: 'SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 286 안전 감사 봉인을 확인했습니다.',
    },
    {
      item: 'Task 285 Structure Review',
      status: 'STRUCTURE_REVIEW_CONFIRMED',
      meaning: 'Task 285 구조 검토 결과를 확인했습니다.',
    },
    {
      item: 'Task 284 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 284 승인 패킷을 확인했습니다.',
    },
    {
      item: 'Task 281 Summary Review',
      status: 'SUMMARY_REVIEW_CONFIRMED',
      meaning: '기존 요약 검토 결과를 확인했습니다.',
    },
    {
      item: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      item: '후보 판정 상태',
      status: 'PLANNING_CANDIDATE_STATUS_RECORDED',
      meaning: `optionAdditionalStructureExpansionPlanningCandidateStatus: ${candidateStatus}`,
    },
    {
      item: '다음 read-only 설계 후보',
      status: isReady ? 'READY_CANDIDATE' : 'BLOCKED_CANDIDATE',
      meaning: isReady
        ? '실제 설계 실행이 아니라 다음 단계 후보 안내만 제공합니다.'
        : '동일 원인으로 후보 상태가 차단되어 있습니다.',
    },
    {
      item: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      item: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
    },
    {
      item: '옵션 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      item: '추가상품 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      item: '옵션 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 옵션 상세 구조가 없습니다.',
    },
    {
      item: '추가상품 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 추가상품 상세 구조가 없습니다.',
    },
    {
      item: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      item: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      item: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 API 응답 전체를 포함하지 않습니다.',
    },
    {
      item: 'Token/Auth/Signature/Authorization',
      status: 'NOT_DISPLAYED',
      meaning: '민감 정보는 표시하지 않습니다.',
    },
    {
      item: '실행/변경 작업',
      status: 'NOT_EXECUTED',
      meaning:
        '이번 Task에서 API 호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.',
    },
    {
      item: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로를 열지 않습니다.',
    },
    {
      item: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 288은 후보 인증 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
  input: {
    outcomeCertification: any;
    safetyAuditSeal: any;
    structureReview: any;
    approvalPacket: any;
    summaryReview: any;
    captureResult: any;
  }
): NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView {
  const outcomeCertification = input?.outcomeCertification ?? null;
  const rawOutcomeStatus =
    outcomeCertification?.readOnlyProductStructureReviewOutcomeCertificationStatus;
  const readOnlyProductStructureReviewOutcomeCertificationStatus: NaverReadOnlyProductStructureReviewOutcomeCertificationStatus =
    ALLOWED_OUTCOME_STATUSES.includes(rawOutcomeStatus)
      ? rawOutcomeStatus
      : 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const optionAdditionalStructureExpansionPlanningCandidateStatus =
    OUTCOME_TO_PLANNING_CANDIDATE[
      readOnlyProductStructureReviewOutcomeCertificationStatus
    ];

  const isPlanningCandidateReadyForCompleteSummary =
    optionAdditionalStructureExpansionPlanningCandidateStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY';
  const isPlanningCandidateReadyWithMissingFieldNotice =
    optionAdditionalStructureExpansionPlanningCandidateStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE';
  const isPlanningCandidateBlockedByGwIp =
    optionAdditionalStructureExpansionPlanningCandidateStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP';
  const isPlanningCandidateBlockedByToken =
    optionAdditionalStructureExpansionPlanningCandidateStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN';
  const isPlanningCandidateBlockedByEnv =
    optionAdditionalStructureExpansionPlanningCandidateStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV';
  const isPlanningCandidateBlockedByChannel =
    optionAdditionalStructureExpansionPlanningCandidateStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL';
  const isPlanningCandidateBlockedByProductLookup =
    optionAdditionalStructureExpansionPlanningCandidateStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP';
  const isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate =
    isPlanningCandidateReadyForCompleteSummary ||
    isPlanningCandidateReadyWithMissingFieldNotice;
  const isNextReadOnlyOptionAdditionalStructureExpansionPlanningBlocked =
    !isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate;
  const isMissingFieldNoticeRequired =
    isPlanningCandidateReadyWithMissingFieldNotice;
  const isProductStructureReviewBuiltFromCapturedData =
    outcomeCertification?.isProductStructureReviewBuiltFromCapturedData === true;

  const { planningCandidateReason, blockingReason } = buildReason(
    optionAdditionalStructureExpansionPlanningCandidateStatus
  );

  return {
    status: 'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY',
    panelTitle:
      'Task 288 - Option/Additional Structure Expansion Planning Candidate',
    description:
      'Task 288은 Task 287 결과를 기반으로 다음 read-only 옵션/추가상품 구조 확장 설계를 진행할 수 있는 후보 상태인지 안내하는 단계입니다. 이 패널은 실제 설계 실행이 아니라 후보 인증만 표시하며, 실제 Naver API 호출, 상품조회 재호출, 상품수정, 가격/재고 변경, DB write는 수행하지 않습니다.',
    currentTaskNumber: 288,
    referenceTaskNumbers: [287, 286, 285, 284, 281, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateReady: true,
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
    isNaverReadOnlyProductStructureReviewResultReady: true,
    isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyProductStructureReviewOutcomeCertificationStatus,
    optionAdditionalStructureExpansionPlanningCandidateStatus,
    isPlanningCandidateReadyForCompleteSummary,
    isPlanningCandidateReadyWithMissingFieldNotice,
    isPlanningCandidateBlockedByGwIp,
    isPlanningCandidateBlockedByToken,
    isPlanningCandidateBlockedByEnv,
    isPlanningCandidateBlockedByChannel,
    isPlanningCandidateBlockedByProductLookup,
    isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
    isNextReadOnlyOptionAdditionalStructureExpansionPlanningBlocked,
    isMissingFieldNoticeRequired,
    planningCandidateReason,
    blockingReason,
    safetyRestrictions: [
      '실제 Naver API 호출 금지',
      '상품 조회 API 재호출 금지',
      '상품 수정 API 호출 금지',
      'Token 재발급 금지',
      '가격 변경 금지',
      '재고 변경 금지',
      'DB write / upsert / update 금지',
      '옵션 구조 임의 추정 금지',
      '추가상품 구조 임의 추정 금지',
      'raw API response 전체 표시 또는 저장 금지',
    ],
    nonExecutedItems: [
      'Naver API 호출',
      '상품 조회 API 재호출',
      '상품 수정 API 호출',
      'Token 재발급',
      '가격 변경',
      '재고 변경',
      'DB write / upsert / update',
      'POST / submit / mutation / live action',
    ],
    candidateItems: buildCandidateItems(
      optionAdditionalStructureExpansionPlanningCandidateStatus
    ),
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isReadOnlyProductStructureReviewReexecutedInThisTask: false,
    isProductStructureReviewBuiltFromCapturedData,
    isOptionStructureDetailAvailableInCapturedData: false,
    isAdditionalProductStructureDetailAvailableInCapturedData: false,
    isOptionStructureInferred: false,
    isAdditionalProductStructureInferred: false,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isSalePricePresenceFlagOnly: true,
    isStockQuantityPresenceFlagOnly: true,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
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
  };
}
