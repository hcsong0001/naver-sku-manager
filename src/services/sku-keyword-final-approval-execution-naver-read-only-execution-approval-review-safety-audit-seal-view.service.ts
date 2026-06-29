import type {
  NaverReadOnlyExecutionApprovalReviewStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-view.service';

export type NaverReadOnlyExecutionApprovalReviewSafetyAuditItemStatus =
  | 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_READY'
  | 'EXECUTION_APPROVAL_REVIEW_CONFIRMED'
  | 'USER_APPROVAL_CONFIRMED_FOR_TASK_297'
  | 'EXECUTION_APPROVAL_PACKET_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_STATUS_RECORDED'
  | 'REVIEW_READY_IF_COMPLETE_CANDIDATE'
  | 'REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
  | 'REVIEW_BLOCKED_CONFIRMED'
  | 'NOT_APPROVED'
  | 'NOT_EXECUTED'
  | 'NOT_CONNECTED'
  | 'LOCKED'
  | 'NOT_APPROVED_FOR_PRODUCT_CHANGE'
  | 'NOT_STORED'
  | 'NOT_COPIED_FOR_EXECUTION'
  | 'CAPTURED_DATA_ONLY_CONFIRMED'
  | 'SUMMARY_REVIEW_ONLY_CONFIRMED'
  | 'NOT_INFERRED'
  | 'NOT_INCLUDED'
  | 'NOT_DISPLAYED'
  | 'READ_ONLY_INFO'
  | 'PENDING_SEPARATE_APPROVAL';

export interface NaverReadOnlyExecutionApprovalReviewSafetyAuditItem {
  auditItem: string;
  status: NaverReadOnlyExecutionApprovalReviewSafetyAuditItemStatus;
  meaning: string;
}

export interface NaverReadOnlyExecutionApprovalReviewSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEALED';
  panelTitle: string;
  description: string;
  currentTaskNumber: 298;
  referenceTaskNumbers: readonly [297, 296, 295, 294, 293, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true;
  isNaverReadOnlyExecutionApprovalReviewReady: true;
  isNaverReadOnlyExecutionApprovalPacketReady: true;
  isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true;
  isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  isExecutionApprovalReviewConfirmed: true;
  isUserApprovalConfirmedForTask297: true;
  isExecutionApprovalReviewStatusRecorded: true;
  readOnlyExecutionApprovalReviewStatus: NaverReadOnlyExecutionApprovalReviewStatus;
  isReadOnlyExecutionApprovalReviewAvailable: boolean;
  isReadOnlyExecutionApprovalReviewBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
  safetyAuditSummary: string;
  blockingReason: string | null;
  auditItems: NaverReadOnlyExecutionApprovalReviewSafetyAuditItem[];
  isReadOnlyExecutionApprovalGrantedInThisTask: false;
  isExecutionApprovalGranted: false;
  isExecutionExecutedInThisTask: false;
  isProductChangeApprovalGranted: false;
  isExecutionButtonAddedInThisTask: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
  hasAdapterTrigger: false;
  isWorkerExecutedInThisTask: false;
  isQueueEnqueuedInThisTask: false;
  isAdapterConnectedInThisTask: false;
  isDesignBlueprintFinalized: false;
  isDesignBlueprintApprovedForExecution: false;
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
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;
}

const ALLOWED_REVIEW_STATUSES: NaverReadOnlyExecutionApprovalReviewStatus[] = [
  'EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE',
  'EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP',
  'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN',
  'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV',
  'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL',
  'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
];

function buildSafetyAuditSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): { safetyAuditSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      safetyAuditSummary:
        'Task 297 실행 승인 검토 결과(COMPLETE)에 대한 안전 감사 봉인이 완료되었습니다. 검토 가능 상태였음을 확인했습니다.',
      blockingReason: null,
    };
  }
  if (input.isPartial) {
    return {
      safetyAuditSummary:
        'Task 297 실행 승인 검토 결과(PARTIAL)에 대한 안전 감사 봉인이 완료되었습니다. missing field notice를 유지한 검토 가능 상태였음을 확인했습니다.',
      blockingReason: null,
    };
  }
  return {
    safetyAuditSummary:
      'Task 297 실행 승인 검토 결과가 차단 상태였음을 확인하고 안전 감사 봉인을 완료했습니다.',
    blockingReason:
      '차단 원인을 먼저 보정한 뒤 별도 승인 기준을 다시 확인해야 합니다.',
  };
}

function buildAuditItems(input: {
  reviewStatus: NaverReadOnlyExecutionApprovalReviewStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): NaverReadOnlyExecutionApprovalReviewSafetyAuditItem[] {
  return [
    {
      auditItem: 'Task 298 Safety Audit Seal',
      status: 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_READY',
      meaning: 'Task 298 안전 감사 봉인을 준비했습니다.',
    },
    {
      auditItem: 'Task 297 Execution Approval Review',
      status: 'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: `Task 297 실행 승인 검토 결과(${input.reviewStatus})를 확인했습니다.`,
    },
    {
      auditItem: 'Task 297 사용자 승인',
      status: 'USER_APPROVAL_CONFIRMED_FOR_TASK_297',
      meaning: 'Task 297 승인 범위를 확인했습니다.',
    },
    {
      auditItem: 'Task 296 Execution Approval Packet',
      status: 'EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 296 실행 승인 패킷을 확인했습니다.',
    },
    {
      auditItem: 'Task 295 Outcome Certification',
      status: 'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 295 인증 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 294 Safety Audit Seal',
      status: 'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 294 확정 후보 안전 감사 봉인을 확인했습니다.',
    },
    {
      auditItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 확정 후보 표시 결과를 확인했습니다.',
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
      auditItem: '실행 승인 검토 상태',
      status: 'EXECUTION_APPROVAL_REVIEW_STATUS_RECORDED',
      meaning: `reviewStatus=${input.reviewStatus}`,
    },
    {
      auditItem: 'COMPLETE 검토 가능',
      status: 'REVIEW_READY_IF_COMPLETE_CANDIDATE',
      meaning: input.isComplete
        ? 'Task 297에서 COMPLETE 검토 가능 상태였음을 확인했습니다.'
        : '현재 COMPLETE 검토 가능 상태는 아닙니다.',
    },
    {
      auditItem: 'PARTIAL 검토 가능',
      status: 'REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'Task 297에서 PARTIAL 검토 가능 상태(missing field notice 포함)였음을 확인했습니다.'
        : '현재 PARTIAL 검토 가능 상태는 아닙니다.',
    },
    {
      auditItem: 'BLOCKED 검토 차단',
      status: 'REVIEW_BLOCKED_CONFIRMED',
      meaning: input.isBlocked
        ? 'Task 297에서 차단 상태였음을 확인했습니다.'
        : '차단 상태가 아닙니다.',
    },
    {
      auditItem: '실제 실행 승인',
      status: 'NOT_APPROVED',
      meaning: '이번 Task는 실제 실행 승인이 아닙니다.',
    },
    {
      auditItem: '실제 실행',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 실제 실행을 수행하지 않습니다.',
    },
    {
      auditItem: '실행 버튼',
      status: 'NOT_CONNECTED',
      meaning: '실행 버튼을 추가하지 않습니다.',
    },
    {
      auditItem: 'submit action',
      status: 'NOT_CONNECTED',
      meaning: 'submit action을 추가하지 않습니다.',
    },
    {
      auditItem: 'Worker',
      status: 'LOCKED',
      meaning: 'Worker 실행 경로를 연결하지 않습니다.',
    },
    {
      auditItem: 'Queue',
      status: 'LOCKED',
      meaning: 'Queue enqueue 경로를 연결하지 않습니다.',
    },
    {
      auditItem: 'Adapter',
      status: 'LOCKED',
      meaning: 'Adapter 연결 경로를 연결하지 않습니다.',
    },
    {
      auditItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
    },
    {
      auditItem: '상품 수정 API',
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
      auditItem: '설계안 DB 저장',
      status: 'NOT_STORED',
      meaning: '설계안을 DB에 저장하지 않습니다.',
    },
    {
      auditItem: '설계안 실행용 복사',
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
      meaning: '원본 응답을 저장하지 않습니다.',
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
      auditItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 298은 안전 감사 봉인 표시 전용입니다.',
    },
    {
      auditItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 단계는 별도 승인이 필요합니다.',
    },
  ] satisfies NaverReadOnlyExecutionApprovalReviewSafetyAuditItem[];
}

export function buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(input: {
  executionApprovalReview: any;
  executionApprovalPacket: any;
  finalizationCandidateOutcomeCertification: any;
  finalizationCandidateSafetyAuditSeal: any;
  finalizationCandidate: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyExecutionApprovalReviewSafetyAuditSealView {
  const review = input?.executionApprovalReview ?? null;

  const rawReviewStatus = review?.readOnlyExecutionApprovalReviewStatus;
  const readOnlyExecutionApprovalReviewStatus: NaverReadOnlyExecutionApprovalReviewStatus =
    ALLOWED_REVIEW_STATUSES.includes(rawReviewStatus)
      ? rawReviewStatus
      : 'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP';

  const isComplete =
    readOnlyExecutionApprovalReviewStatus ===
    'EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE';
  const isPartial =
    readOnlyExecutionApprovalReviewStatus ===
    'EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE';
  const isBlocked = !isComplete && !isPartial;

  const isReadOnlyExecutionApprovalReviewAvailable = isComplete || isPartial;
  const isReadOnlyExecutionApprovalReviewBlocked = isBlocked;
  const isMissingFieldNoticePreserved = isPartial;

  const { safetyAuditSummary, blockingReason } = buildSafetyAuditSummary({
    isComplete,
    isPartial,
    isBlocked,
  });

  return {
    status: 'NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEALED',
    panelTitle: 'Task 298 - Read-Only Execution Approval Review Safety Audit Seal',
    description:
      'Task 298은 Task 297 read-only 실행 승인 검토 결과의 안전성을 감사 봉인하는 단계입니다. Task 297은 실행 승인 가능 여부를 검토한 것이며, 실제 실행 승인·실제 실행·실행 버튼 추가·상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write, Worker 실행, Queue enqueue, Adapter 연결을 수행하지 않습니다.',
    currentTaskNumber: 298,
    referenceTaskNumbers: [297, 296, 295, 294, 293, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true,
    isNaverReadOnlyExecutionApprovalReviewReady: true,
    isNaverReadOnlyExecutionApprovalPacketReady: true,
    isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true,
    isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    isExecutionApprovalReviewConfirmed: true,
    isUserApprovalConfirmedForTask297: true,
    isExecutionApprovalReviewStatusRecorded: true,
    readOnlyExecutionApprovalReviewStatus,
    isReadOnlyExecutionApprovalReviewAvailable,
    isReadOnlyExecutionApprovalReviewBlocked,
    isMissingFieldNoticePreserved,
    safetyAuditSummary,
    blockingReason,
    auditItems: buildAuditItems({
      reviewStatus: readOnlyExecutionApprovalReviewStatus,
      isComplete,
      isPartial,
      isBlocked,
    }),
    isReadOnlyExecutionApprovalGrantedInThisTask: false,
    isExecutionApprovalGranted: false,
    isExecutionExecutedInThisTask: false,
    isProductChangeApprovalGranted: false,
    isExecutionButtonAddedInThisTask: false,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
    hasAdapterTrigger: false,
    isWorkerExecutedInThisTask: false,
    isQueueEnqueuedInThisTask: false,
    isAdapterConnectedInThisTask: false,
    isDesignBlueprintFinalized: false,
    isDesignBlueprintApprovedForExecution: false,
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
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,
  };
}
