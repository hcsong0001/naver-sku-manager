export type NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus =
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus =
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL'
  | 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP';

export interface NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintItem {
  item: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyOptionAdditionalStructureExpansionStructureArea {
  area: string;
  status: '미확정' | '확인 필요' | '후속 검토 후보';
  reason: string;
}

export interface NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView {
  status: 'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 289;
  referenceTaskNumbers: readonly [288, 287, 286, 285, 284, 281, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateReady: true;
  isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true;
  isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true;
  isNaverReadOnlyProductStructureReviewResultReady: true;
  isNaverReadOnlyProductStructureReviewApprovalPacketReady: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  optionAdditionalStructureExpansionPlanningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus;
  optionAdditionalStructureExpansionDesignBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus;
  isDesignBlueprintReadyForCompleteSummary: boolean;
  isDesignBlueprintReadyWithMissingFieldNotice: boolean;
  isDesignBlueprintBlockedByGwIp: boolean;
  isDesignBlueprintBlockedByToken: boolean;
  isDesignBlueprintBlockedByEnv: boolean;
  isDesignBlueprintBlockedByChannel: boolean;
  isDesignBlueprintBlockedByProductLookup: boolean;
  isReadOnlyDesignBlueprintCreatable: boolean;
  isMissingFieldNoticeRequired: boolean;
  isDesignConfirmed: false;
  isExecutionApproved: false;
  designBlueprintReason: string;
  blockingReason: string | null;
  structureAreasToReview: NaverReadOnlyOptionAdditionalStructureExpansionStructureArea[];
  blueprintItems: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintItem[];
  safetyRestrictions: string[];
  nonExecutedItems: string[];
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

const PLANNING_CANDIDATE_TO_BLUEPRINT: Record<
  NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus,
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus
> = {
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP:
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
};

const ALLOWED_PLANNING_CANDIDATE_STATUSES = Object.keys(
  PLANNING_CANDIDATE_TO_BLUEPRINT
) as NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus[];

function buildReason(
  blueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus
): { designBlueprintReason: string; blockingReason: string | null } {
  switch (blueprintStatus) {
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY':
      return {
        designBlueprintReason:
          'Task 288 COMPLETE 후보 결과를 기준으로 다음 설계 단계에서 검토할 read-only blueprint를 생성할 수 있습니다.',
        blockingReason: null,
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE':
      return {
        designBlueprintReason:
          'Task 288 PARTIAL 후보 결과를 기준으로 missing field notice를 유지한 read-only blueprint를 생성할 수 있습니다.',
        blockingReason: null,
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP':
      return {
        designBlueprintReason:
          'Task 288 차단 상태를 그대로 따라 이번 Task는 설계안 차단 안내만 제공합니다.',
        blockingReason: 'GW IP 허용 목록 재확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN':
      return {
        designBlueprintReason:
          'Task 288 차단 상태를 그대로 따라 이번 Task는 설계안 차단 안내만 제공합니다.',
        blockingReason: '인증/권한 재확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV':
      return {
        designBlueprintReason:
          'Task 288 차단 상태를 그대로 따라 이번 Task는 설계안 차단 안내만 제공합니다.',
        blockingReason: 'Env/Auth 재확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL':
      return {
        designBlueprintReason:
          'Task 288 차단 상태를 그대로 따라 이번 Task는 설계안 차단 안내만 제공합니다.',
        blockingReason: 'channelProductNo 확인이 필요합니다.',
      };
    case 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP':
      return {
        designBlueprintReason:
          'Task 288 차단 상태를 그대로 따라 이번 Task는 설계안 차단 안내만 제공합니다.',
        blockingReason: '상품/스토어 접근 재확인이 필요합니다.',
      };
  }
}

function buildStructureAreas(
  isCreatable: boolean,
  isMissingFieldNoticeRequired: boolean
): NaverReadOnlyOptionAdditionalStructureExpansionStructureArea[] {
  const readyStatus = isCreatable ? '후속 검토 후보' : '확인 필요';
  const unknownStatus: '미확정' | '확인 필요' = isCreatable
    ? '미확정'
    : '확인 필요';
  const missingSuffix = isMissingFieldNoticeRequired
    ? ' 누락 안내를 유지한 추가 확인이 필요합니다.'
    : '';

  return [
    {
      area: '단일상품 여부',
      status: unknownStatus,
      reason:
        '현재 캡처 데이터와 구조 검토 결과에 단일상품 확정 정보가 명시적으로 없어 미확정으로 유지합니다.' +
        missingSuffix,
    },
    {
      area: '옵션상품 여부',
      status: unknownStatus,
      reason:
        '현재 캡처 데이터에 옵션 상세 구조가 없어 옵션상품 여부는 확인 필요로만 유지합니다.' +
        missingSuffix,
    },
    {
      area: '추가상품 여부',
      status: unknownStatus,
      reason:
        '현재 캡처 데이터에 추가상품 상세 구조가 없어 추가상품 여부는 확인 필요로만 유지합니다.' +
        missingSuffix,
    },
    {
      area: '옵션/추가상품 동시 존재 여부',
      status: unknownStatus,
      reason:
        '옵션 및 추가상품 구조 데이터가 모두 없으므로 동시 존재 여부를 임의 확정하지 않습니다.' +
        missingSuffix,
    },
    {
      area: '세트/구성형 상품 가능성 여부',
      status: unknownStatus,
      reason:
        '세트/구성형 판정에 필요한 명시 정보가 현재 데이터에 없으므로 미확정으로 유지합니다.' +
        missingSuffix,
    },
    {
      area: '매핑 확장 필요 여부',
      status: readyStatus,
      reason: isCreatable
        ? '다음 read-only 설계 단계에서 옵션/추가상품 확장 매핑 필요 여부를 검토할 후보 상태입니다.' +
          missingSuffix
        : '후보 상태가 차단되어 있으므로 매핑 확장 필요 여부도 동일 원인 해소 전까지 확인 필요입니다.',
    },
  ];
}

function buildBlueprintItems(
  blueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus,
  isCreatable: boolean
): NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintItem[] {
  return [
    {
      item: 'Task 288 Planning Candidate',
      status: 'PLANNING_CANDIDATE_CONFIRMED',
      meaning: 'Task 288 후보 판정 결과를 확인했습니다.',
    },
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
      item: '설계안 상태',
      status: 'DESIGN_BLUEPRINT_STATUS_RECORDED',
      meaning: `optionAdditionalStructureExpansionDesignBlueprintStatus: ${blueprintStatus}`,
    },
    {
      item: 'read-only 설계안 생성 여부',
      status: isCreatable ? 'BLUEPRINT_READY' : 'BLUEPRINT_BLOCKED',
      meaning: isCreatable
        ? '실제 설계 확정이 아니라 다음 단계에서 검토할 blueprint 초안만 제공합니다.'
        : '동일 원인으로 blueprint 초안 생성도 차단되어 있습니다.',
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
      item: '옵션 구조 확정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 확정하지 않았습니다.',
    },
    {
      item: '추가상품 구조 확정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 확정하지 않았습니다.',
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
      item: '가격/재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격/재고 원본 값은 설계안에 포함하지 않습니다.',
    },
    {
      item: 'raw API response / Token/Auth',
      status: 'NOT_DISPLAYED',
      meaning: 'raw response와 token/auth 값은 표시하지 않습니다.',
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
      meaning: 'Task 289는 read-only 설계안 초안 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
  input: {
    planningCandidate: any;
    outcomeCertification: any;
    safetyAuditSeal: any;
    structureReview: any;
    approvalPacket: any;
    summaryReview: any;
    captureResult: any;
  }
): NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView {
  const planningCandidate = input?.planningCandidate ?? null;
  const rawPlanningStatus =
    planningCandidate?.optionAdditionalStructureExpansionPlanningCandidateStatus;
  const optionAdditionalStructureExpansionPlanningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus =
    ALLOWED_PLANNING_CANDIDATE_STATUSES.includes(rawPlanningStatus)
      ? rawPlanningStatus
      : 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP';

  const optionAdditionalStructureExpansionDesignBlueprintStatus =
    PLANNING_CANDIDATE_TO_BLUEPRINT[
      optionAdditionalStructureExpansionPlanningCandidateStatus
    ];

  const isDesignBlueprintReadyForCompleteSummary =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY';
  const isDesignBlueprintReadyWithMissingFieldNotice =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE';
  const isDesignBlueprintBlockedByGwIp =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP';
  const isDesignBlueprintBlockedByToken =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN';
  const isDesignBlueprintBlockedByEnv =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV';
  const isDesignBlueprintBlockedByChannel =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL';
  const isDesignBlueprintBlockedByProductLookup =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP';
  const isReadOnlyDesignBlueprintCreatable =
    isDesignBlueprintReadyForCompleteSummary ||
    isDesignBlueprintReadyWithMissingFieldNotice;
  const isMissingFieldNoticeRequired =
    isDesignBlueprintReadyWithMissingFieldNotice;
  const isProductStructureReviewBuiltFromCapturedData =
    planningCandidate?.isProductStructureReviewBuiltFromCapturedData === true;

  const { designBlueprintReason, blockingReason } = buildReason(
    optionAdditionalStructureExpansionDesignBlueprintStatus
  );

  return {
    status: 'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY',
    panelTitle:
      'Task 289 - Option/Additional Structure Expansion Design Blueprint',
    description:
      'Task 289는 Task 288 후보 판정 결과를 기반으로 다음 설계 단계에서 무엇을 검토해야 하는지 read-only blueprint 초안으로 보여주는 단계입니다. 이 패널은 실제 옵션/추가상품 구조 설계 확정이 아니라 검토용 blueprint만 표시하며, 실제 Naver API, 상품조회 재호출, 상품수정, 가격/재고 변경, DB write를 수행하지 않습니다.',
    currentTaskNumber: 289,
    referenceTaskNumbers: [288, 287, 286, 285, 284, 281, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateReady: true,
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
    isNaverReadOnlyProductStructureReviewResultReady: true,
    isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    optionAdditionalStructureExpansionPlanningCandidateStatus,
    optionAdditionalStructureExpansionDesignBlueprintStatus,
    isDesignBlueprintReadyForCompleteSummary,
    isDesignBlueprintReadyWithMissingFieldNotice,
    isDesignBlueprintBlockedByGwIp,
    isDesignBlueprintBlockedByToken,
    isDesignBlueprintBlockedByEnv,
    isDesignBlueprintBlockedByChannel,
    isDesignBlueprintBlockedByProductLookup,
    isReadOnlyDesignBlueprintCreatable,
    isMissingFieldNoticeRequired,
    isDesignConfirmed: false,
    isExecutionApproved: false,
    designBlueprintReason,
    blockingReason,
    structureAreasToReview: buildStructureAreas(
      isReadOnlyDesignBlueprintCreatable,
      isMissingFieldNoticeRequired
    ),
    blueprintItems: buildBlueprintItems(
      optionAdditionalStructureExpansionDesignBlueprintStatus,
      isReadOnlyDesignBlueprintCreatable
    ),
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
      '설계 확정',
      '실행 승인',
      'POST / submit / mutation / live action',
    ],
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
