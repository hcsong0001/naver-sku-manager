import type {
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus,
  NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-view.service';

export type NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditStatus =
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'PLANNING_CANDIDATE_CONFIRMED'
  | 'STRUCTURE_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'STRUCTURE_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'STRUCTURE_REVIEW_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'DESIGN_BLUEPRINT_STATUS_RECORDED'
  | 'DESIGN_AVAILABILITY_RECORDED'
  | 'MISSING_FIELD_NOTICE_PRESERVED'
  | 'NOT_FINALIZED'
  | 'NOT_APPROVED_FOR_EXECUTION'
  | 'CAPTURED_DATA_ONLY_CONFIRMED'
  | 'SUMMARY_REVIEW_ONLY_CONFIRMED'
  | 'NOT_INFERRED'
  | 'NOT_AVAILABLE_IN_CAPTURED_DATA'
  | 'NOT_INCLUDED'
  | 'NOT_STORED'
  | 'NOT_DISPLAYED'
  | 'NOT_EXECUTED'
  | 'LOCKED'
  | 'PENDING_SEPARATE_APPROVAL'
  | 'READ_ONLY_INFO';

export interface NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditItem {
  auditItem: string;
  status: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditStatus;
  meaning: string;
}

export interface NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_SAFETY_AUDIT_SEALED';
  panelTitle: string;
  description: string;
  currentTaskNumber: 290;
  referenceTaskNumbers: readonly [289, 288, 287, 286, 285, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionPlanningApprovalPacketReady: true;
  isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true;
  isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true;
  isNaverReadOnlyProductStructureReviewResultReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  optionAdditionalStructureExpansionPlanningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus;
  optionAdditionalStructureExpansionDesignBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus;
  isDesignBlueprintConfirmed: true;
  isPlanningCandidateConfirmed: true;
  isDesignBlueprintStatusRecorded: true;
  isDesignBlueprintFinalized: false;
  isDesignBlueprintApprovedForExecution: false;
  isExecutionApprovalGranted: false;
  isMissingFieldNoticePreserved: boolean;
  isDesignBlueprintAvailableForCompleteSummary: boolean;
  isDesignBlueprintAvailableWithMissingFieldNotice: boolean;
  isDesignBlueprintBlocked: boolean;
  safetyAuditSummary: string;
  blockingReason: string | null;
  auditItems: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditItem[];
  safetyRestrictions: string[];
  nonExecutedItems: string[];
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

const ALLOWED_DESIGN_BLUEPRINT_STATUSES = [
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
] as const satisfies readonly NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus[];

const ALLOWED_PLANNING_CANDIDATE_STATUSES = [
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
] as const satisfies readonly NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus[];

function buildSafetyAuditSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
}): { safetyAuditSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      safetyAuditSummary:
        'Task 289 설계안 블루프린트는 COMPLETE 가능 상태를 유지한 채 read-only 안전 감사 봉인 대상으로 확인되었습니다. 설계 확정이나 실행 승인은 열리지 않습니다.',
      blockingReason: null,
    };
  }

  if (input.isPartial) {
    return {
      safetyAuditSummary:
        'Task 289 설계안 블루프린트는 PARTIAL 가능 상태와 missing field notice를 유지한 채 read-only 안전 감사 봉인 대상으로 확인되었습니다.',
      blockingReason: null,
    };
  }

  if (input.isBlocked) {
    return {
      safetyAuditSummary:
        'Task 289 설계안 블루프린트는 차단 상태 그대로 read-only 안전 감사 봉인만 수행하며, 설계 확정이나 실행 승인으로 전환되지 않습니다.',
      blockingReason:
        '설계안 차단 원인이 해소되기 전까지 다음 단계는 별도 승인 이전에 보류됩니다.',
    };
  }

  return {
    safetyAuditSummary:
      'Task 289 설계안 블루프린트 상태를 read-only로 기록하고 안전 제한을 유지합니다.',
    blockingReason: null,
  };
}

function buildDesignAvailabilityMeaning(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): string {
  if (input.isComplete) {
    return 'COMPLETE 상태였으므로 read-only 설계안 가능 상태가 기록되었습니다.';
  }

  if (input.isPartial) {
    return 'PARTIAL 상태였으므로 missing field notice를 유지한 read-only 설계안 가능 상태가 기록되었습니다.';
  }

  if (input.isBlocked) {
    return 'BLOCKED 상태였으므로 동일 원인으로 설계안 불가 상태가 기록되었습니다.';
  }

  return '설계안 가능 여부를 read-only로 기록했습니다.';
}

function buildMissingFieldNoticeMeaning(
  isMissingFieldNoticePreserved: boolean
): string {
  if (isMissingFieldNoticePreserved) {
    return 'PARTIAL 설계안의 missing field notice를 그대로 유지했습니다.';
  }

  return 'missing field notice가 없는 상태도 임의 변경 없이 그대로 유지했습니다.';
}

function buildAuditItems(input: {
  planningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus;
  designBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
}): NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditItem[] {
  return [
    {
      auditItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: 'Task 289 설계안 블루프린트를 확인했습니다.',
    },
    {
      auditItem: 'Task 288 Planning Candidate',
      status: 'PLANNING_CANDIDATE_CONFIRMED',
      meaning: 'Task 288 확장 설계 후보 판정을 확인했습니다.',
    },
    {
      auditItem: 'Task 287 Outcome Certification',
      status: 'STRUCTURE_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 287 구조 검토 인증 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 286 Safety Audit Seal',
      status: 'STRUCTURE_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 286 구조 검토 안전 감사 봉인을 확인했습니다.',
    },
    {
      auditItem: 'Task 285 Structure Review',
      status: 'STRUCTURE_REVIEW_CONFIRMED',
      meaning: 'Task 285 구조 검토 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: 'Task 276 기존 캡처 결과를 확인했습니다.',
    },
    {
      auditItem: '설계안 상태',
      status: 'DESIGN_BLUEPRINT_STATUS_RECORDED',
      meaning:
        `designBlueprint=${input.designBlueprintStatus}, planningCandidate=${input.planningCandidateStatus}`,
    },
    {
      auditItem: '설계 가능 여부',
      status: 'DESIGN_AVAILABILITY_RECORDED',
      meaning: buildDesignAvailabilityMeaning(input),
    },
    {
      auditItem: 'missing field notice',
      status: 'MISSING_FIELD_NOTICE_PRESERVED',
      meaning: buildMissingFieldNoticeMeaning(input.isMissingFieldNoticePreserved),
    },
    {
      auditItem: '설계 확정',
      status: 'NOT_FINALIZED',
      meaning: '이번 Task는 설계 확정 단계가 아닙니다.',
    },
    {
      auditItem: '실행 승인',
      status: 'NOT_APPROVED_FOR_EXECUTION',
      meaning: '이번 Task는 실행 승인 단계가 아닙니다.',
    },
    {
      auditItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      auditItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '새 요약 검토가 아니라 기존 요약 검토 결과만 사용했습니다.',
    },
    {
      auditItem: '옵션 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      auditItem: '추가상품 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      auditItem: '옵션 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 옵션 상세 구조가 없습니다.',
    },
    {
      auditItem: '추가상품 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 추가상품 상세 구조가 없습니다.',
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
      meaning: 'raw API response 전체를 포함하지 않습니다.',
    },
    {
      auditItem: 'raw API response 저장',
      status: 'NOT_STORED',
      meaning: 'raw API response 전체를 저장하지 않습니다.',
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
      meaning: 'Authorization 헤더를 표시하지 않습니다.',
    },
    {
      auditItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급을 수행하지 않았습니다.',
    },
    {
      auditItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출을 수행하지 않았습니다.',
    },
    {
      auditItem: '옵션/추가상품 구조 확장 설계 재수행',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 옵션/추가상품 구조 확장 설계를 재수행하지 않았습니다.',
    },
    {
      auditItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않았습니다.',
    },
    {
      auditItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않았습니다.',
    },
    {
      auditItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않았습니다.',
    },
    {
      auditItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않았습니다.',
    },
    {
      auditItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로를 열지 않습니다.',
    },
    {
      auditItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 단계는 별도 승인이 필요합니다.',
    },
    {
      auditItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 290은 설계안 안전 감사 봉인 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
  input: {
    designBlueprint: any;
    planningCandidate: any;
    structureOutcomeCertification: any;
    structureSafetyAuditSeal: any;
    structureReview: any;
    captureResult: any;
  }
): NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView {
  const designBlueprint = input?.designBlueprint ?? null;
  const planningCandidate = input?.planningCandidate ?? null;

  const rawDesignBlueprintStatus =
    designBlueprint?.optionAdditionalStructureExpansionDesignBlueprintStatus;
  const optionAdditionalStructureExpansionDesignBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus =
    (
      ALLOWED_DESIGN_BLUEPRINT_STATUSES as readonly string[]
    ).includes(rawDesignBlueprintStatus)
      ? rawDesignBlueprintStatus
      : 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP';

  const rawPlanningCandidateStatus =
    planningCandidate?.optionAdditionalStructureExpansionPlanningCandidateStatus ??
    designBlueprint?.optionAdditionalStructureExpansionPlanningCandidateStatus;
  const optionAdditionalStructureExpansionPlanningCandidateStatus: NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateStatus =
    (
      ALLOWED_PLANNING_CANDIDATE_STATUSES as readonly string[]
    ).includes(rawPlanningCandidateStatus)
      ? rawPlanningCandidateStatus
      : 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP';

  const isDesignBlueprintAvailableForCompleteSummary =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY';
  const isDesignBlueprintAvailableWithMissingFieldNotice =
    optionAdditionalStructureExpansionDesignBlueprintStatus ===
    'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE';
  const isDesignBlueprintBlocked =
    !isDesignBlueprintAvailableForCompleteSummary &&
    !isDesignBlueprintAvailableWithMissingFieldNotice;
  const isMissingFieldNoticePreserved =
    isDesignBlueprintAvailableWithMissingFieldNotice;

  const { safetyAuditSummary, blockingReason } = buildSafetyAuditSummary({
    isComplete: isDesignBlueprintAvailableForCompleteSummary,
    isPartial: isDesignBlueprintAvailableWithMissingFieldNotice,
    isBlocked: isDesignBlueprintBlocked,
    isMissingFieldNoticePreserved,
  });

  return {
    status:
      'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_SAFETY_AUDIT_SEALED',
    panelTitle:
      'Task 290 - Option/Additional Structure Expansion Design Blueprint Safety Audit Seal',
    description:
      'Task 290은 Task 289 read-only 옵션/추가상품 구조 확장 설계안 블루프린트의 안전성을 감사 봉인하는 단계입니다. 이 설계안은 확정 설계가 아니며 실행 승인도 아닙니다. 현재 캡처 데이터에는 옵션 상세 구조와 추가상품 상세 구조가 없으므로 이를 추정하지 않았습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    currentTaskNumber: 290,
    referenceTaskNumbers: [289, 288, 287, 286, 285, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionPlanningApprovalPacketReady:
      true,
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
    isNaverReadOnlyProductStructureReviewResultReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    optionAdditionalStructureExpansionPlanningCandidateStatus,
    optionAdditionalStructureExpansionDesignBlueprintStatus,
    isDesignBlueprintConfirmed: true,
    isPlanningCandidateConfirmed: true,
    isDesignBlueprintStatusRecorded: true,
    isDesignBlueprintFinalized: false,
    isDesignBlueprintApprovedForExecution: false,
    isExecutionApprovalGranted: false,
    isMissingFieldNoticePreserved,
    isDesignBlueprintAvailableForCompleteSummary,
    isDesignBlueprintAvailableWithMissingFieldNotice,
    isDesignBlueprintBlocked,
    safetyAuditSummary,
    blockingReason,
    auditItems: buildAuditItems({
      planningCandidateStatus:
        optionAdditionalStructureExpansionPlanningCandidateStatus,
      designBlueprintStatus:
        optionAdditionalStructureExpansionDesignBlueprintStatus,
      isComplete: isDesignBlueprintAvailableForCompleteSummary,
      isPartial: isDesignBlueprintAvailableWithMissingFieldNotice,
      isBlocked: isDesignBlueprintBlocked,
      isMissingFieldNoticePreserved,
    }),
    safetyRestrictions: [
      'Token 재발급 금지',
      'Naver API 호출 금지',
      '상품 조회 API 재호출 금지',
      '옵션/추가상품 구조 확장 설계 재수행 금지',
      '옵션 구조 임의 추정 금지',
      '추가상품 구조 임의 추정 금지',
      '설계 확정 금지',
      '실행 승인 금지',
      '상품 수정 API 호출 금지',
      '가격 변경 금지',
      '재고 변경 금지',
      'DB write / upsert / update 금지',
      'raw API response 표시 또는 저장 금지',
    ],
    nonExecutedItems: [
      'Token 재발급',
      'Naver API 호출',
      '상품 조회 API 재호출',
      '옵션/추가상품 구조 확장 설계 재수행',
      '상품 수정 API 호출',
      '가격 변경',
      '재고 변경',
      'DB write / upsert / update',
      'POST API / submit / mutation / live action',
      'Worker / Queue / Adapter 연결',
    ],
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
