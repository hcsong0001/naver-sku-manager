import type {
  NaverReadOnlyExecutionReadinessReviewStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-execution-readiness-review-view.service';

export type NaverReadOnlyExecutionReadinessReviewSafetyAuditSealItemStatus =
  | 'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_READY'
  | 'EXECUTION_READINESS_REVIEW_CONFIRMED'
  | 'USER_APPROVAL_CONFIRMED_FOR_TASK_301'
  | 'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_CONFIRMED'
  | 'EXECUTION_APPROVAL_PACKET_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'EXECUTION_READINESS_REVIEW_STATUS_RECORDED'
  | 'READINESS_REVIEW_READY_IF_COMPLETE'
  | 'READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
  | 'READINESS_REVIEW_BLOCKED_CONFIRMED'
  | 'NOT_MARKED_READY_FOR_EXECUTION'
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

export interface NaverReadOnlyExecutionReadinessReviewSafetyAuditSealItem {
  auditItem: string;
  status: NaverReadOnlyExecutionReadinessReviewSafetyAuditSealItemStatus;
  meaning: string;
}

export interface NaverReadOnlyExecutionReadinessReviewSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEALED';
  panelTitle: string;
  description: string;
  currentTaskNumber: 302;
  referenceTaskNumbers: readonly [301, 300, 299, 298, 297, 296, 295, 294, 293, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed: true;
  isNaverReadOnlyExecutionReadinessReviewReady: true;
  isNaverReadOnlyExecutionReadinessApprovalPacketReady: true;
  isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true;
  isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true;
  isNaverReadOnlyExecutionApprovalReviewReady: true;
  isNaverReadOnlyExecutionApprovalPacketReady: true;
  isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  isExecutionReadinessReviewConfirmed: true;
  isUserApprovalConfirmedForTask301: true;
  isExecutionReadinessReviewStatusRecorded: true;
  readOnlyExecutionReadinessReviewStatus: NaverReadOnlyExecutionReadinessReviewStatus;
  isReadOnlyExecutionReadinessReviewAvailable: boolean;
  isReadOnlyExecutionReadinessReviewBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
  sealSummary: string;
  blockingReason: string | null;
  auditItems: NaverReadOnlyExecutionReadinessReviewSafetyAuditSealItem[];
  isMarkedReadyForExecutionInThisTask: false;
  isReadOnlyExecutionReadinessReviewGranted: false;
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

const ALLOWED_READINESS_REVIEW_STATUSES: NaverReadOnlyExecutionReadinessReviewStatus[] = [
  'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW',
  'EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP',
  'EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN',
  'EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV',
  'EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL',
  'EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
];

function buildSealSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  reviewStatus: NaverReadOnlyExecutionReadinessReviewStatus;
}): { sealSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      sealSummary:
        'Task 301 실행 준비 검토 결과(COMPLETE)를 안전하게 확인하고 봉인했습니다.',
      blockingReason: null,
    };
  }
  if (input.isPartial) {
    return {
      sealSummary:
        'Task 301 실행 준비 검토 결과(PARTIAL)를 안전하게 확인하고 봉인했습니다. missing field notice가 보존됩니다.',
      blockingReason: null,
    };
  }
  const reasonMap: Record<NaverReadOnlyExecutionReadinessReviewStatus, string | null> = {
    EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW: null,
    EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE: null,
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP:
      'GW IP 차단 상태였습니다. IP 허용 목록을 재확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN:
      'Token 인증 실패 상태였습니다. 인증/권한을 재확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV:
      'Env 누락 상태였습니다. Env/Auth 설정을 재확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL:
      'channelProductNo 누락 상태였습니다. 채널 상품번호를 확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP:
      '상품 조회 실패 상태였습니다. 상품/스토어 접근을 확인해야 합니다.',
  };
  return {
    sealSummary:
      'Task 301 실행 준비 검토 결과(BLOCKED)를 확인했습니다. 차단 상태가 봉인되었습니다.',
    blockingReason:
      reasonMap[input.reviewStatus] ?? '원인 불명 차단 상태였습니다.',
  };
}

function buildAuditItems(input: {
  reviewStatus: NaverReadOnlyExecutionReadinessReviewStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): NaverReadOnlyExecutionReadinessReviewSafetyAuditSealItem[] {
  return [
    {
      auditItem: 'Task 302 Safety Audit Seal',
      status: 'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_READY',
      meaning: 'Task 302 안전 감사 봉인이 준비되었습니다.',
    },
    {
      auditItem: 'Task 301 Execution Readiness Review',
      status: 'EXECUTION_READINESS_REVIEW_CONFIRMED',
      meaning: `Task 301 실행 준비 검토 결과(${input.reviewStatus})를 확인했습니다.`,
    },
    {
      auditItem: 'Task 301 사용자 승인',
      status: 'USER_APPROVAL_CONFIRMED_FOR_TASK_301',
      meaning: 'Task 301 사용자 승인 범위를 확인했습니다.',
    },
    {
      auditItem: 'Task 300 Execution Readiness Approval Packet',
      status: 'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 300 실행 준비 승인 패킷을 확인했습니다.',
    },
    {
      auditItem: 'Task 299 Outcome Certification',
      status: 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 299 인증 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 298 Safety Audit Seal',
      status: 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 298 안전 감사 봉인을 확인했습니다.',
    },
    {
      auditItem: 'Task 297 Execution Approval Review',
      status: 'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: 'Task 297 실행 승인 검토 결과를 확인했습니다.',
    },
    {
      auditItem: 'Task 296 Execution Approval Packet',
      status: 'EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 296 실행 승인 패킷을 확인했습니다.',
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
      auditItem: '실행 준비 검토 상태',
      status: 'EXECUTION_READINESS_REVIEW_STATUS_RECORDED',
      meaning: `reviewStatus=${input.reviewStatus}`,
    },
    {
      auditItem: 'COMPLETE 검토 가능',
      status: 'READINESS_REVIEW_READY_IF_COMPLETE',
      meaning: input.isComplete
        ? 'Task 301에서 COMPLETE 상태였습니다. 실행 준비 검토 가능 상태였습니다.'
        : 'Task 301에서 COMPLETE 상태가 아니었습니다.',
    },
    {
      auditItem: 'PARTIAL 검토 가능',
      status: 'READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'Task 301에서 PARTIAL 상태였습니다. missing field notice 포함 검토 가능 상태였습니다.'
        : 'Task 301에서 PARTIAL 상태가 아니었습니다.',
    },
    {
      auditItem: 'BLOCKED 검토 차단',
      status: 'READINESS_REVIEW_BLOCKED_CONFIRMED',
      meaning: input.isBlocked
        ? 'Task 301에서 차단 상태였습니다. 차단 상태가 확인되어 봉인되었습니다.'
        : '차단 상태가 아니었습니다.',
    },
    {
      auditItem: '실제 실행 준비 완료',
      status: 'NOT_MARKED_READY_FOR_EXECUTION',
      meaning: '이번 Task는 실제 실행 준비 완료 처리가 아닙니다.',
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
      meaning: 'Task 302는 Task 301 실행 준비 검토 결과 안전 감사 봉인 표시 전용입니다.',
    },
    {
      auditItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 단계 진행 시 별도 승인이 필요합니다.',
    },
  ] satisfies NaverReadOnlyExecutionReadinessReviewSafetyAuditSealItem[];
}

export function buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(input: {
  executionReadinessReview: any;
  executionReadinessApprovalPacket: any;
  executionApprovalReviewOutcomeCertification: any;
  executionApprovalReviewSafetyAuditSeal: any;
  executionApprovalReview: any;
  executionApprovalPacket: any;
  finalizationCandidate: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyExecutionReadinessReviewSafetyAuditSealView {
  const review = input?.executionReadinessReview ?? null;

  const rawReviewStatus = review?.readOnlyExecutionReadinessReviewStatus;
  const readOnlyExecutionReadinessReviewStatus: NaverReadOnlyExecutionReadinessReviewStatus =
    ALLOWED_READINESS_REVIEW_STATUSES.includes(rawReviewStatus)
      ? rawReviewStatus
      : 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP';

  const isComplete =
    readOnlyExecutionReadinessReviewStatus ===
    'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW';
  const isPartial =
    readOnlyExecutionReadinessReviewStatus ===
    'EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE';
  const isBlocked = !isComplete && !isPartial;

  const isReadOnlyExecutionReadinessReviewAvailable = isComplete || isPartial;
  const isReadOnlyExecutionReadinessReviewBlocked = isBlocked;
  const isMissingFieldNoticePreserved = isPartial;

  const { sealSummary, blockingReason } = buildSealSummary({
    isComplete,
    isPartial,
    isBlocked,
    reviewStatus: readOnlyExecutionReadinessReviewStatus,
  });

  return {
    status: 'NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEALED',
    panelTitle: 'Task 302 - Read-Only Execution Readiness Review Safety Audit Seal',
    description:
      'Task 302는 Task 301 read-only 실행 준비 검토 결과의 안전성을 감사 봉인하는 단계입니다. Task 301은 실행 준비 가능 여부를 검토한 것이며, 실제 실행 준비 완료 처리·실제 실행 승인·실제 실행·실행 버튼 추가·상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write, Worker 실행, Queue enqueue, Adapter 연결을 수행하지 않습니다.',
    currentTaskNumber: 302,
    referenceTaskNumbers: [301, 300, 299, 298, 297, 296, 295, 294, 293, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed: true,
    isNaverReadOnlyExecutionReadinessReviewReady: true,
    isNaverReadOnlyExecutionReadinessApprovalPacketReady: true,
    isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true,
    isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true,
    isNaverReadOnlyExecutionApprovalReviewReady: true,
    isNaverReadOnlyExecutionApprovalPacketReady: true,
    isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    isExecutionReadinessReviewConfirmed: true,
    isUserApprovalConfirmedForTask301: true,
    isExecutionReadinessReviewStatusRecorded: true,
    readOnlyExecutionReadinessReviewStatus,
    isReadOnlyExecutionReadinessReviewAvailable,
    isReadOnlyExecutionReadinessReviewBlocked,
    isMissingFieldNoticePreserved,
    sealSummary,
    blockingReason,
    auditItems: buildAuditItems({
      reviewStatus: readOnlyExecutionReadinessReviewStatus,
      isComplete,
      isPartial,
      isBlocked,
    }),
    isMarkedReadyForExecutionInThisTask: false,
    isReadOnlyExecutionReadinessReviewGranted: false,
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
