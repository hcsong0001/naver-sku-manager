import type {
  NaverReadOnlyDesignFinalizationCandidateStatus,
  NaverReadOnlyDesignFinalizationCandidateView,
} from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-view.service';

export type NaverReadOnlyDesignFinalizationCandidateSafetyAuditStatus =
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'USER_APPROVAL_CONFIRMED_FOR_TASK_293'
  | 'APPROVAL_PACKET_CONFIRMED'
  | 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_STATUS_RECORDED'
  | 'CANDIDATE_READY_IF_COMPLETE_BLUEPRINT'
  | 'CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CANDIDATE_BLOCKED_CONFIRMED'
  | 'NOT_FINALIZED'
  | 'NOT_APPROVED_FOR_EXECUTION'
  | 'NOT_APPROVED_FOR_PRODUCT_CHANGE'
  | 'NOT_STORED'
  | 'NOT_COPIED_FOR_EXECUTION'
  | 'CAPTURED_DATA_ONLY_CONFIRMED'
  | 'SUMMARY_REVIEW_ONLY_CONFIRMED'
  | 'NOT_INFERRED'
  | 'NOT_INCLUDED'
  | 'NOT_DISPLAYED'
  | 'NOT_EXECUTED'
  | 'LOCKED'
  | 'PENDING_SEPARATE_APPROVAL'
  | 'READ_ONLY_INFO';

export interface NaverReadOnlyDesignFinalizationCandidateSafetyAuditItem {
  auditItem: string;
  status: NaverReadOnlyDesignFinalizationCandidateSafetyAuditStatus;
  meaning: string;
}

export interface NaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEALED';
  panelTitle: string;
  description: string;
  currentTaskNumber: 294;
  referenceTaskNumbers: readonly [293, 292, 291, 290, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyDesignFinalizationApprovalPacketReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  isFinalizationCandidateConfirmed: true;
  isUserApprovalConfirmedForTask293: true;
  isFinalizationCandidateStatusRecorded: true;
  readOnlyDesignFinalizationCandidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus;
  isReadOnlyDesignFinalizationCandidateDisplayed: boolean;
  isReadOnlyDesignFinalizationExecutedInThisTask: boolean;
  isDesignBlueprintFinalizationCandidate: boolean;
  isDesignBlueprintFinalized: false;
  isDesignBlueprintApprovedForExecution: false;
  isExecutionApprovalGranted: false;
  isProductChangeApprovalGranted: false;
  isDesignBlueprintReferenceOnly: true;
  isDesignBlueprintCopiedForExecution: false;
  isDesignBlueprintPersistedToDb: false;
  isDesignFinalizationCandidateStoredInDb: false;
  isDesignFinalizationCandidateCopiedForExecution: false;
  isCapturedDataUsedOnly: true;
  isSummaryReviewResultUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isOptionAdditionalStructureExpansionDesignReexecutedInThisTask: false;
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
  safetyAuditSummary: string;
  blockingReason: string | null;
  auditItems: NaverReadOnlyDesignFinalizationCandidateSafetyAuditItem[];
  safetyRestrictions: string[];
  nonExecutedItems: string[];
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;
}

const ALLOWED_FINALIZATION_CANDIDATE_STATUSES = [
  'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT',
  'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
  'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP',
  'FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN',
  'FINALIZATION_CANDIDATE_BLOCKED_BY_ENV',
  'FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL',
  'FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
] as const satisfies readonly NaverReadOnlyDesignFinalizationCandidateStatus[];

function buildSafetyAuditSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): { safetyAuditSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      safetyAuditSummary:
        'Task 293 read-only 설계 확정 후보(COMPLETE)가 안전하게 제한된 범위 안에서 구성되었음을 감사 봉인합니다. 설계 확정 아님·실행 승인 아님·상품 변경 승인 아님·DB 저장 없음·API 호출 없음을 확인했습니다.',
      blockingReason: null,
    };
  }

  if (input.isPartial) {
    return {
      safetyAuditSummary:
        'Task 293 read-only 설계 확정 후보(PARTIAL, missing field notice 포함)가 안전하게 제한된 범위 안에서 구성되었음을 감사 봉인합니다. 설계 확정 아님·실행 승인 아님·상품 변경 승인 아님·DB 저장 없음·API 호출 없음을 확인했습니다.',
      blockingReason: null,
    };
  }

  return {
    safetyAuditSummary:
      'Task 293 read-only 설계 확정 후보는 BLOCKED 상태였으므로 표시되지 않았습니다. 해당 범위를 감사 봉인합니다. 설계 확정 아님·실행 승인 아님·상품 변경 승인 아님·DB 저장 없음·API 호출 없음을 확인했습니다.',
    blockingReason:
      '차단 원인 보정 전까지 확정 후보 표시가 열리지 않습니다.',
  };
}

function buildAuditItems(input: {
  candidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  isDisplayed: boolean;
}): NaverReadOnlyDesignFinalizationCandidateSafetyAuditItem[] {
  return [
    {
      auditItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 확정 후보 표시 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 293 사용자 승인',
      status: 'USER_APPROVAL_CONFIRMED_FOR_TASK_293',
      meaning: 'Task 293 승인 범위를 확인했습니다.',
    },
    {
      auditItem: 'Task 292 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: '설계 확정 승인 패킷을 확인했습니다.',
    },
    {
      auditItem: 'Task 291 Outcome Certification',
      status: 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: '설계안 인증 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 290 Safety Audit Seal',
      status: 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: '설계안 안전 봉인을 확인했습니다.',
    },
    {
      auditItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: '설계안 블루프린트를 확인했습니다.',
    },
    {
      auditItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      auditItem: '후보 상태',
      status: 'FINALIZATION_CANDIDATE_STATUS_RECORDED',
      meaning: `readOnlyDesignFinalizationCandidateStatus: ${input.candidateStatus}`,
    },
    {
      auditItem: 'COMPLETE 후보',
      status: 'CANDIDATE_READY_IF_COMPLETE_BLUEPRINT',
      meaning: input.isComplete
        ? 'COMPLETE이면 확정 후보 표시가 가능하며, 이번 Task에서 해당 상태임을 확인했습니다.'
        : 'COMPLETE 확정 후보 상태가 아님을 확인했습니다.',
    },
    {
      auditItem: 'PARTIAL 후보',
      status: 'CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'PARTIAL이면 누락 안내 포함 확정 후보 표시가 가능하며, 이번 Task에서 해당 상태임을 확인했습니다.'
        : 'PARTIAL 확정 후보 상태가 아님을 확인했습니다.',
    },
    {
      auditItem: 'BLOCKED 후보',
      status: 'CANDIDATE_BLOCKED_CONFIRMED',
      meaning: input.isBlocked
        ? 'BLOCKED 상태였으므로 확정 후보가 표시되지 않았음을 확인했습니다.'
        : 'BLOCKED 상태가 아니었으므로 확정 후보가 표시되었음을 확인했습니다.',
    },
    {
      auditItem: '설계 확정',
      status: 'NOT_FINALIZED',
      meaning: '실제 설계 확정은 수행하지 않습니다.',
    },
    {
      auditItem: '실행 승인',
      status: 'NOT_APPROVED_FOR_EXECUTION',
      meaning: '실행 승인 단계가 아닙니다.',
    },
    {
      auditItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
    },
    {
      auditItem: '설계안 DB 저장',
      status: 'NOT_STORED',
      meaning: '설계안을 DB에 저장하지 않습니다.',
    },
    {
      auditItem: '설계안 실행 복사',
      status: 'NOT_COPIED_FOR_EXECUTION',
      meaning: '설계안을 실행용으로 복사하지 않습니다.',
    },
    {
      auditItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      auditItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
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
      meaning: 'Task 294는 감사 봉인 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(input: {
  finalizationCandidate: NaverReadOnlyDesignFinalizationCandidateView | any;
  approvalPacket: any;
  blueprintOutcomeCertification: any;
  blueprintSafetyAuditSeal: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView {
  const finalizationCandidate = input?.finalizationCandidate ?? null;

  const rawCandidateStatus =
    finalizationCandidate?.readOnlyDesignFinalizationCandidateStatus;
  const readOnlyDesignFinalizationCandidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus =
    (ALLOWED_FINALIZATION_CANDIDATE_STATUSES as readonly string[]).includes(
      rawCandidateStatus
    )
      ? rawCandidateStatus
      : 'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP';

  const isComplete =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT';
  const isPartial =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE';
  const isBlocked = !isComplete && !isPartial;

  const isReadOnlyDesignFinalizationCandidateDisplayed =
    finalizationCandidate?.isReadOnlyDesignFinalizationCandidateDisplayed === true
      ? true
      : !isBlocked;
  const isReadOnlyDesignFinalizationExecutedInThisTask =
    isReadOnlyDesignFinalizationCandidateDisplayed;
  const isDesignBlueprintFinalizationCandidate =
    isReadOnlyDesignFinalizationCandidateDisplayed;

  const { safetyAuditSummary, blockingReason } = buildSafetyAuditSummary({
    isComplete,
    isPartial,
    isBlocked,
  });

  return {
    status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEALED',
    panelTitle:
      'Task 294 - Read-Only Design Finalization Candidate Safety Audit Seal',
    description:
      'Task 294는 Task 293 read-only 설계 확정 후보 표시 결과의 안전성을 감사 봉인하는 단계입니다. Task 293은 설계 확정 후보 표시 전용이며, 실행 승인이나 상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    currentTaskNumber: 294,
    referenceTaskNumbers: [293, 292, 291, 290, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyDesignFinalizationApprovalPacketReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    isFinalizationCandidateConfirmed: true,
    isUserApprovalConfirmedForTask293: true,
    isFinalizationCandidateStatusRecorded: true,
    readOnlyDesignFinalizationCandidateStatus,
    isReadOnlyDesignFinalizationCandidateDisplayed,
    isReadOnlyDesignFinalizationExecutedInThisTask,
    isDesignBlueprintFinalizationCandidate,
    isDesignBlueprintFinalized: false,
    isDesignBlueprintApprovedForExecution: false,
    isExecutionApprovalGranted: false,
    isProductChangeApprovalGranted: false,
    isDesignBlueprintReferenceOnly: true,
    isDesignBlueprintCopiedForExecution: false,
    isDesignBlueprintPersistedToDb: false,
    isDesignFinalizationCandidateStoredInDb: false,
    isDesignFinalizationCandidateCopiedForExecution: false,
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isOptionAdditionalStructureExpansionDesignReexecutedInThisTask: false,
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
    safetyAuditSummary,
    blockingReason,
    auditItems: buildAuditItems({
      candidateStatus: readOnlyDesignFinalizationCandidateStatus,
      isComplete,
      isPartial,
      isBlocked,
      isDisplayed: isReadOnlyDesignFinalizationCandidateDisplayed,
    }),
    safetyRestrictions: [
      'Token 재발급 금지',
      'Naver API 호출 금지',
      '상품 조회 API 재호출 금지',
      'read-only 설계 확정 재수행 금지',
      '옵션 구조 임의 추정 금지',
      '추가상품 구조 임의 추정 금지',
      '설계 확정 금지',
      '실행 승인 금지',
      '상품 변경 승인 금지',
      '설계안 DB 저장 금지',
      '설계안 실행용 복사 금지',
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
      'read-only 설계 확정 재수행',
      '상품 수정 API 호출',
      '가격 변경',
      '재고 변경',
      'DB write / upsert / update',
      'POST API / submit / mutation / live action',
      'Worker / Queue / Adapter 연결',
    ],
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,
  };
}
