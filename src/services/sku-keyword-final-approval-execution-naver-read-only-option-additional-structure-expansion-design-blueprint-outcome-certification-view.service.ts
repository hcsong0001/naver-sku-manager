import type {
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus,
  NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-view.service';

export type NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus =
  | 'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
  | 'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP'
  | 'CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN'
  | 'CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV'
  | 'CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL'
  | 'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationItemStatus =
  | 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'PLANNING_CANDIDATE_CONFIRMED'
  | 'STRUCTURE_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'STRUCTURE_REVIEW_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'OUTCOME_CERTIFICATION_STATUS_RECORDED'
  | 'CERTIFIED_READY_IF_COMPLETE_SUMMARY'
  | 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
  | 'MISSING_FIELD_NOTICE_PRESERVED'
  | 'NOT_FINALIZED'
  | 'NOT_APPROVED_FOR_EXECUTION'
  | 'CAPTURED_DATA_ONLY_CONFIRMED'
  | 'SUMMARY_REVIEW_ONLY_CONFIRMED'
  | 'NOT_INFERRED'
  | 'NOT_AVAILABLE_IN_CAPTURED_DATA'
  | 'NOT_INCLUDED'
  | 'NOT_DISPLAYED'
  | 'NOT_EXECUTED'
  | 'LOCKED'
  | 'PENDING_SEPARATE_APPROVAL'
  | 'READ_ONLY_INFO';

export interface NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationItem {
  certificationItem: string;
  status: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationItemStatus;
  meaning: string;
}

export interface NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_OUTCOME_CERTIFICATION_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 291;
  referenceTaskNumbers: readonly [290, 289, 288, 287, 285, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionPlanningApprovalPacketReady: true;
  isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true;
  isNaverReadOnlyProductStructureReviewResultReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  optionAdditionalStructureExpansionPlanningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus;
  optionAdditionalStructureExpansionDesignBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus;
  optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus;
  isCertifiedBlueprintReadyForCompleteSummary: boolean;
  isCertifiedBlueprintReadyWithMissingFieldNotice: boolean;
  isCertifiedBlueprintBlockedByGwIp: boolean;
  isCertifiedBlueprintBlockedByToken: boolean;
  isCertifiedBlueprintBlockedByEnv: boolean;
  isCertifiedBlueprintBlockedByChannel: boolean;
  isCertifiedBlueprintBlockedByProductLookup: boolean;
  isReadyForNextReadOnlyDesignFinalizationApprovalPacket: boolean;
  isNextReadOnlyDesignFinalizationApprovalPacketBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
  outcomeCertificationSummary: string;
  blockingReason: string | null;
  certificationItems: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationItem[];
  isDesignBlueprintFinalized: false;
  isDesignBlueprintApprovedForExecution: false;
  isExecutionApprovalGranted: false;
  isCapturedDataUsedOnly: true;
  isSummaryReviewResultUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isOptionAdditionalStructureExpansionDesignReexecutedInThisTask: false;
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
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;
}

const DESIGN_BLUEPRINT_TO_OUTCOME_CERTIFICATION: Record<
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus,
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus
> = {
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY:
    'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE:
    'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP:
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN:
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV:
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL:
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL',
  OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP:
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
};

const ALLOWED_DESIGN_BLUEPRINT_STATUSES = Object.keys(
  DESIGN_BLUEPRINT_TO_OUTCOME_CERTIFICATION
) as NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus[];

const ALLOWED_PLANNING_CANDIDATE_STATUSES = [
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
] as const satisfies readonly NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus[];

function buildOutcomeCertificationSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): { outcomeCertificationSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      outcomeCertificationSummary:
        'Task 289 설계안 블루프린트와 Task 290 안전 감사 봉인을 바탕으로, 다음 read-only 설계 확정 승인 패킷 후보로 인증되었습니다.',
      blockingReason: null,
    };
  }

  if (input.isPartial) {
    return {
      outcomeCertificationSummary:
        'Task 289 설계안 블루프린트와 Task 290 안전 감사 봉인을 바탕으로, missing field notice를 유지한 다음 read-only 설계 확정 승인 패킷 후보로 인증되었습니다.',
      blockingReason: null,
    };
  }

  if (input.isBlocked) {
    return {
      outcomeCertificationSummary:
        'Task 289 설계안 블루프린트는 차단 상태 그대로 인증되며, 다음 read-only 설계 확정 승인 패킷 후보로는 진행되지 않습니다.',
      blockingReason:
        '차단 원인을 먼저 보정한 뒤 별도 승인 기준을 다시 확인해야 합니다.',
    };
  }

  return {
    outcomeCertificationSummary:
      '설계안 블루프린트 인증 상태를 read-only로 기록합니다.',
    blockingReason: null,
  };
}

function buildCertificationItems(input: {
  planningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus;
  designBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus;
  outcomeCertificationStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlockedByGwIp: boolean;
  isBlockedByToken: boolean;
  isBlockedByEnv: boolean;
  isBlockedByChannel: boolean;
  isBlockedByProductLookup: boolean;
  isMissingFieldNoticePreserved: boolean;
}): NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationItem[] {
  return [
    {
      certificationItem: 'Task 290 Safety Audit Seal',
      status: 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 290 설계안 안전 감사 봉인을 확인했습니다.',
    },
    {
      certificationItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: 'Task 289 설계안 블루프린트를 확인했습니다.',
    },
    {
      certificationItem: 'Task 288 Planning Candidate',
      status: 'PLANNING_CANDIDATE_CONFIRMED',
      meaning: 'Task 288 확장 설계 후보 판정을 확인했습니다.',
    },
    {
      certificationItem: 'Task 287 Structure Outcome Certification',
      status: 'STRUCTURE_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 287 구조 검토 인증 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 285 Structure Review',
      status: 'STRUCTURE_REVIEW_CONFIRMED',
      meaning: 'Task 285 구조 검토 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: 'Task 276 기존 캡처 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Outcome Certification',
      status: 'OUTCOME_CERTIFICATION_STATUS_RECORDED',
      meaning:
        `outcome=${input.outcomeCertificationStatus}, blueprint=${input.designBlueprintStatus}, planningCandidate=${input.planningCandidateStatus}`,
    },
    {
      certificationItem: 'COMPLETE 설계안',
      status: 'CERTIFIED_READY_IF_COMPLETE_SUMMARY',
      meaning: input.isComplete
        ? '현재 COMPLETE 설계안이므로 다음 read-only 설계 확정 승인 패킷 후보 상태입니다.'
        : '현재 COMPLETE 설계안 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'PARTIAL 설계안',
      status: 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? '현재 PARTIAL 설계안이므로 missing field notice를 유지한 다음 read-only 설계 확정 승인 패킷 후보 상태입니다.'
        : '현재 PARTIAL 설계안 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'GW IP 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning: input.isBlockedByGwIp
        ? '현재 GW IP 허용 목록 재확인이 필요합니다.'
        : '현재 GW IP 차단 상태는 아닙니다.',
    },
    {
      certificationItem: 'Token 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning: input.isBlockedByToken
        ? '현재 인증/권한 재확인이 필요합니다.'
        : '현재 Token 실패 차단 상태는 아닙니다.',
    },
    {
      certificationItem: 'Env 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
      meaning: input.isBlockedByEnv
        ? '현재 Env/Auth 재확인이 필요합니다.'
        : '현재 Env 누락 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '상품번호 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning: input.isBlockedByChannel
        ? '현재 channelProductNo 확인이 필요합니다.'
        : '현재 상품번호 누락 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '상품 조회 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning: input.isBlockedByProductLookup
        ? '현재 상품/스토어 접근 재확인이 필요합니다.'
        : '현재 상품 조회 실패 차단 상태는 아닙니다.',
    },
    {
      certificationItem: 'missing field notice',
      status: 'MISSING_FIELD_NOTICE_PRESERVED',
      meaning: input.isMissingFieldNoticePreserved
        ? 'PARTIAL 안내를 그대로 유지했습니다.'
        : 'missing field notice가 없는 상태도 임의 변경 없이 유지했습니다.',
    },
    {
      certificationItem: '설계 확정',
      status: 'NOT_FINALIZED',
      meaning: '이번 Task는 설계 확정 단계가 아닙니다.',
    },
    {
      certificationItem: '실행 승인',
      status: 'NOT_APPROVED_FOR_EXECUTION',
      meaning: '이번 Task는 실행 승인 단계가 아닙니다.',
    },
    {
      certificationItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      certificationItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '새 요약 검토가 아니라 기존 요약 검토 결과만 사용했습니다.',
    },
    {
      certificationItem: '옵션 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      certificationItem: '추가상품 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      certificationItem: '옵션 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 옵션 상세 구조가 없습니다.',
    },
    {
      certificationItem: '추가상품 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 추가상품 상세 구조가 없습니다.',
    },
    {
      certificationItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      certificationItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      certificationItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: 'raw API response 전체를 포함하지 않습니다.',
    },
    {
      certificationItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더를 표시하지 않습니다.',
    },
    {
      certificationItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급을 수행하지 않았습니다.',
    },
    {
      certificationItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출을 수행하지 않았습니다.',
    },
    {
      certificationItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않았습니다.',
    },
    {
      certificationItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않았습니다.',
    },
    {
      certificationItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않았습니다.',
    },
    {
      certificationItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않았습니다.',
    },
    {
      certificationItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로를 열지 않습니다.',
    },
    {
      certificationItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning:
        input.isComplete || input.isPartial
          ? '다음 read-only 설계 확정 승인 패킷 후보 상태이지만 별도 승인 전까지 진행하지 않습니다.'
          : '차단 원인 보정 후 별도 승인이 필요합니다.',
    },
    {
      certificationItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 291은 인증 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
  input: {
    designBlueprint: any;
    safetyAuditSeal: any;
    planningApprovalPacket: any;
    structureOutcomeCertification: any;
    structureReview: any;
    captureResult: any;
  }
): NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView {
  const designBlueprint = input?.designBlueprint ?? null;
  const rawDesignBlueprintStatus =
    designBlueprint?.optionAdditionalStructureExpansionDesignBlueprintStatus;
  const optionAdditionalStructureExpansionDesignBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus =
    ALLOWED_DESIGN_BLUEPRINT_STATUSES.includes(rawDesignBlueprintStatus)
      ? rawDesignBlueprintStatus
      : 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP';

  const optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus =
    DESIGN_BLUEPRINT_TO_OUTCOME_CERTIFICATION[
      optionAdditionalStructureExpansionDesignBlueprintStatus
    ];

  const rawPlanningCandidateStatus =
    designBlueprint?.optionAdditionalStructureExpansionPlanningCandidateStatus;
  const optionAdditionalStructureExpansionPlanningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus =
    (
      ALLOWED_PLANNING_CANDIDATE_STATUSES as readonly string[]
    ).includes(rawPlanningCandidateStatus)
      ? rawPlanningCandidateStatus
      : 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP';

  const isCertifiedBlueprintReadyForCompleteSummary =
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus ===
    'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY';
  const isCertifiedBlueprintReadyWithMissingFieldNotice =
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus ===
    'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE';
  const isCertifiedBlueprintBlockedByGwIp =
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus ===
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP';
  const isCertifiedBlueprintBlockedByToken =
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus ===
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN';
  const isCertifiedBlueprintBlockedByEnv =
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus ===
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV';
  const isCertifiedBlueprintBlockedByChannel =
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus ===
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL';
  const isCertifiedBlueprintBlockedByProductLookup =
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus ===
    'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP';
  const isReadyForNextReadOnlyDesignFinalizationApprovalPacket =
    isCertifiedBlueprintReadyForCompleteSummary ||
    isCertifiedBlueprintReadyWithMissingFieldNotice;
  const isNextReadOnlyDesignFinalizationApprovalPacketBlocked =
    !isReadyForNextReadOnlyDesignFinalizationApprovalPacket;
  const isMissingFieldNoticePreserved =
    isCertifiedBlueprintReadyWithMissingFieldNotice;

  const { outcomeCertificationSummary, blockingReason } =
    buildOutcomeCertificationSummary({
      isComplete: isCertifiedBlueprintReadyForCompleteSummary,
      isPartial: isCertifiedBlueprintReadyWithMissingFieldNotice,
      isBlocked: isNextReadOnlyDesignFinalizationApprovalPacketBlocked,
    });

  return {
    status:
      'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_OUTCOME_CERTIFICATION_READY',
    panelTitle:
      'Task 291 - Option/Additional Structure Expansion Design Blueprint Outcome Certification',
    description:
      'Task 291은 Task 289 read-only 옵션/추가상품 구조 확장 설계안 블루프린트와 Task 290 안전 감사 봉인을 바탕으로 다음 read-only 설계 확정 승인 패킷 후보 여부를 인증하는 단계입니다. 이 설계안은 아직 확정 설계가 아니며 실행 승인도 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    currentTaskNumber: 291,
    referenceTaskNumbers: [290, 289, 288, 287, 285, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionPlanningApprovalPacketReady:
      true,
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
    isNaverReadOnlyProductStructureReviewResultReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    optionAdditionalStructureExpansionPlanningCandidateStatus,
    optionAdditionalStructureExpansionDesignBlueprintStatus,
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
    isCertifiedBlueprintReadyForCompleteSummary,
    isCertifiedBlueprintReadyWithMissingFieldNotice,
    isCertifiedBlueprintBlockedByGwIp,
    isCertifiedBlueprintBlockedByToken,
    isCertifiedBlueprintBlockedByEnv,
    isCertifiedBlueprintBlockedByChannel,
    isCertifiedBlueprintBlockedByProductLookup,
    isReadyForNextReadOnlyDesignFinalizationApprovalPacket,
    isNextReadOnlyDesignFinalizationApprovalPacketBlocked,
    isMissingFieldNoticePreserved,
    outcomeCertificationSummary,
    blockingReason,
    certificationItems: buildCertificationItems({
      planningCandidateStatus:
        optionAdditionalStructureExpansionPlanningCandidateStatus,
      designBlueprintStatus:
        optionAdditionalStructureExpansionDesignBlueprintStatus,
      outcomeCertificationStatus:
        optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
      isComplete: isCertifiedBlueprintReadyForCompleteSummary,
      isPartial: isCertifiedBlueprintReadyWithMissingFieldNotice,
      isBlockedByGwIp: isCertifiedBlueprintBlockedByGwIp,
      isBlockedByToken: isCertifiedBlueprintBlockedByToken,
      isBlockedByEnv: isCertifiedBlueprintBlockedByEnv,
      isBlockedByChannel: isCertifiedBlueprintBlockedByChannel,
      isBlockedByProductLookup: isCertifiedBlueprintBlockedByProductLookup,
      isMissingFieldNoticePreserved,
    }),
    isDesignBlueprintFinalized: false,
    isDesignBlueprintApprovedForExecution: false,
    isExecutionApprovalGranted: false,
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isOptionAdditionalStructureExpansionDesignReexecutedInThisTask: false,
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
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,
  };
}
