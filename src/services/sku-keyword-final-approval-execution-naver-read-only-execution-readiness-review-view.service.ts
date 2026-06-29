import type {
  NaverReadOnlyExecutionReadinessApprovalPacketStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-execution-readiness-approval-packet-view.service';

export type NaverReadOnlyExecutionReadinessReviewStatus =
  | 'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
  | 'EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
  | 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP'
  | 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN'
  | 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV'
  | 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL'
  | 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyExecutionReadinessReviewItemStatus =
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
  | 'READINESS_REVIEW_BLOCKED_RECHECK_REQUIRED'
  | 'READINESS_REVIEW_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'READINESS_REVIEW_BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'READINESS_REVIEW_BLOCKED_RECHECK_ENV_REQUIRED'
  | 'READINESS_REVIEW_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'READINESS_REVIEW_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
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
  | 'READ_ONLY_INFO';

export interface NaverReadOnlyExecutionReadinessReviewItem {
  reviewItem: string;
  status: NaverReadOnlyExecutionReadinessReviewItemStatus;
  meaning: string;
}

export interface NaverReadOnlyExecutionReadinessReviewView {
  status: 'NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 301;
  referenceTaskNumbers: readonly [300, 299, 298, 297, 296, 295, 294, 293, 289, 276];
  isBatchJobResultDisplayOnly: true;
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
  isUserApprovalConfirmedForTask301: true;
  isExecutionReadinessReviewStatusRecorded: true;
  readOnlyExecutionReadinessApprovalPacketStatus: NaverReadOnlyExecutionReadinessApprovalPacketStatus;
  readOnlyExecutionReadinessReviewStatus: NaverReadOnlyExecutionReadinessReviewStatus;
  isReadOnlyExecutionReadinessReviewReadyForCompleteExecutionApprovalReview: boolean;
  isReadOnlyExecutionReadinessReviewReadyWithMissingFieldNotice: boolean;
  isReadOnlyExecutionReadinessReviewBlockedByGwIp: boolean;
  isReadOnlyExecutionReadinessReviewBlockedByToken: boolean;
  isReadOnlyExecutionReadinessReviewBlockedByEnv: boolean;
  isReadOnlyExecutionReadinessReviewBlockedByChannel: boolean;
  isReadOnlyExecutionReadinessReviewBlockedByProductLookup: boolean;
  isReadOnlyExecutionReadinessReviewAvailable: boolean;
  isReadOnlyExecutionReadinessReviewBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
  readinessReviewSummary: string;
  blockingReason: string | null;
  reviewItems: NaverReadOnlyExecutionReadinessReviewItem[];
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

const ALLOWED_PACKET_STATUSES: NaverReadOnlyExecutionReadinessApprovalPacketStatus[] = [
  'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW',
  'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
  'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
  'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
  'APPROVAL_PACKET_BLOCKED_BY_ENV',
  'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
  'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
];

const EXECUTION_READINESS_REVIEW_STATUS_BY_PACKET_STATUS: Record<
  NaverReadOnlyExecutionReadinessApprovalPacketStatus,
  NaverReadOnlyExecutionReadinessReviewStatus
> = {
  APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW:
    'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW',
  APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE:
    'EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  APPROVAL_PACKET_BLOCKED_BY_GW_IP:
    'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP',
  APPROVAL_PACKET_BLOCKED_BY_TOKEN:
    'EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN',
  APPROVAL_PACKET_BLOCKED_BY_ENV:
    'EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV',
  APPROVAL_PACKET_BLOCKED_BY_CHANNEL:
    'EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL',
  APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP:
    'EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
};

function buildReadinessReviewSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  reviewStatus: NaverReadOnlyExecutionReadinessReviewStatus;
}): { readinessReviewSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      readinessReviewSummary:
        'Task 300 패킷 결과(COMPLETE)를 확인했습니다. 실행 준비 검토 가능 상태입니다.',
      blockingReason: null,
    };
  }
  if (input.isPartial) {
    return {
      readinessReviewSummary:
        'Task 300 패킷 결과(PARTIAL)를 확인했습니다. missing field notice 포함 실행 준비 검토 가능 상태입니다.',
      blockingReason: null,
    };
  }
  const reasonMap: Record<NaverReadOnlyExecutionReadinessReviewStatus, string | null> = {
    EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW: null,
    EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE: null,
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP:
      'GW IP 차단 상태입니다. IP 허용 목록을 재확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN:
      'Token 인증 실패 상태입니다. 인증/권한을 재확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV:
      'Env 누락 상태입니다. Env/Auth 설정을 재확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL:
      'channelProductNo 누락 상태입니다. 채널 상품번호를 확인해야 합니다.',
    EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP:
      '상품 조회 실패 상태입니다. 상품/스토어 접근을 확인해야 합니다.',
  };
  return {
    readinessReviewSummary:
      'Task 300 패킷 결과가 차단 상태입니다. 원인별 보정이 필요합니다.',
    blockingReason: reasonMap[input.reviewStatus] ?? '원인 불명 차단 상태입니다.',
  };
}

function buildReviewItems(input: {
  packetStatus: NaverReadOnlyExecutionReadinessApprovalPacketStatus;
  reviewStatus: NaverReadOnlyExecutionReadinessReviewStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): NaverReadOnlyExecutionReadinessReviewItem[] {
  return [
    {
      reviewItem: 'Task 301 사용자 승인',
      status: 'USER_APPROVAL_CONFIRMED_FOR_TASK_301',
      meaning: 'Task 301 승인 범위를 확인했습니다.',
    },
    {
      reviewItem: 'Task 300 Execution Readiness Approval Packet',
      status: 'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
      meaning: `Task 300 실행 준비 승인 패킷(${input.packetStatus})을 확인했습니다.`,
    },
    {
      reviewItem: 'Task 299 Outcome Certification',
      status: 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 299 인증 결과를 확인했습니다.',
    },
    {
      reviewItem: 'Task 298 Safety Audit Seal',
      status: 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 298 안전 감사 봉인을 확인했습니다.',
    },
    {
      reviewItem: 'Task 297 Execution Approval Review',
      status: 'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: 'Task 297 실행 승인 검토 결과를 확인했습니다.',
    },
    {
      reviewItem: 'Task 296 Execution Approval Packet',
      status: 'EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 296 실행 승인 패킷을 확인했습니다.',
    },
    {
      reviewItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 확정 후보 표시 결과를 확인했습니다.',
    },
    {
      reviewItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: '설계안 블루프린트를 확인했습니다.',
    },
    {
      reviewItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      reviewItem: '실행 준비 검토 상태',
      status: 'EXECUTION_READINESS_REVIEW_STATUS_RECORDED',
      meaning: `reviewStatus=${input.reviewStatus}`,
    },
    {
      reviewItem: 'COMPLETE 검토 가능',
      status: 'READINESS_REVIEW_READY_IF_COMPLETE',
      meaning: input.isComplete
        ? 'COMPLETE 상태입니다. 실행 준비 검토 가능합니다.'
        : '현재 COMPLETE 상태가 아닙니다.',
    },
    {
      reviewItem: 'PARTIAL 검토 가능',
      status: 'READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'PARTIAL 상태입니다. missing field notice 포함 실행 준비 검토 가능합니다.'
        : '현재 PARTIAL 상태가 아닙니다.',
    },
    {
      reviewItem: 'BLOCKED 검토 차단',
      status: 'READINESS_REVIEW_BLOCKED_RECHECK_REQUIRED',
      meaning: input.isBlocked
        ? '차단 상태입니다. 원인별 보정이 필요합니다.'
        : '차단 상태가 아닙니다.',
    },
    {
      reviewItem: 'GW IP 차단',
      status: 'READINESS_REVIEW_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning:
        input.reviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP'
          ? 'IP 허용 목록 재확인이 필요합니다.'
          : '현재 GW IP 차단 상태가 아닙니다.',
    },
    {
      reviewItem: 'Token 실패 차단',
      status: 'READINESS_REVIEW_BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning:
        input.reviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN'
          ? '인증/권한 재확인이 필요합니다.'
          : '현재 Token 차단 상태가 아닙니다.',
    },
    {
      reviewItem: 'Env 누락 차단',
      status: 'READINESS_REVIEW_BLOCKED_RECHECK_ENV_REQUIRED',
      meaning:
        input.reviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV'
          ? 'Env/Auth 재확인이 필요합니다.'
          : '현재 Env 차단 상태가 아닙니다.',
    },
    {
      reviewItem: '상품번호 누락 차단',
      status: 'READINESS_REVIEW_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning:
        input.reviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL'
          ? 'channelProductNo 확인이 필요합니다.'
          : '현재 채널 차단 상태가 아닙니다.',
    },
    {
      reviewItem: '상품 조회 실패 차단',
      status: 'READINESS_REVIEW_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning:
        input.reviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP'
          ? '상품/스토어 접근 확인이 필요합니다.'
          : '현재 상품 조회 차단 상태가 아닙니다.',
    },
    {
      reviewItem: '실제 실행 준비 완료',
      status: 'NOT_MARKED_READY_FOR_EXECUTION',
      meaning: '이번 Task는 실제 실행 준비 완료 처리가 아닙니다.',
    },
    {
      reviewItem: '실제 실행 승인',
      status: 'NOT_APPROVED',
      meaning: '이번 Task는 실제 실행 승인이 아닙니다.',
    },
    {
      reviewItem: '실제 실행',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 실제 실행을 수행하지 않습니다.',
    },
    {
      reviewItem: '실행 버튼',
      status: 'NOT_CONNECTED',
      meaning: '실행 버튼을 추가하지 않습니다.',
    },
    {
      reviewItem: 'submit action',
      status: 'NOT_CONNECTED',
      meaning: 'submit action을 추가하지 않습니다.',
    },
    {
      reviewItem: 'Worker',
      status: 'LOCKED',
      meaning: 'Worker 실행 경로를 연결하지 않습니다.',
    },
    {
      reviewItem: 'Queue',
      status: 'LOCKED',
      meaning: 'Queue enqueue 경로를 연결하지 않습니다.',
    },
    {
      reviewItem: 'Adapter',
      status: 'LOCKED',
      meaning: 'Adapter 연결 경로를 연결하지 않습니다.',
    },
    {
      reviewItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
    },
    {
      reviewItem: '상품 수정 API',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않습니다.',
    },
    {
      reviewItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않습니다.',
    },
    {
      reviewItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않습니다.',
    },
    {
      reviewItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않습니다.',
    },
    {
      reviewItem: '설계안 DB 저장',
      status: 'NOT_STORED',
      meaning: '설계안을 DB에 저장하지 않습니다.',
    },
    {
      reviewItem: '설계안 실행용 복사',
      status: 'NOT_COPIED_FOR_EXECUTION',
      meaning: '설계안을 실행용으로 복사하지 않습니다.',
    },
    {
      reviewItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      reviewItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
    },
    {
      reviewItem: '옵션 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      reviewItem: '추가상품 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      reviewItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      reviewItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      reviewItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 응답 전체를 포함하지 않습니다.',
    },
    {
      reviewItem: 'raw API response 저장',
      status: 'NOT_STORED',
      meaning: '원본 응답을 저장하지 않습니다.',
    },
    {
      reviewItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      reviewItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      reviewItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      reviewItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더를 표시하지 않습니다.',
    },
    {
      reviewItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급을 수행하지 않았습니다.',
    },
    {
      reviewItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출을 수행하지 않았습니다.',
    },
    {
      reviewItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 301은 실행 준비 가능 여부 검토 표시 전용입니다.',
    },
  ] satisfies NaverReadOnlyExecutionReadinessReviewItem[];
}

export function buildNaverReadOnlyExecutionReadinessReviewView(input: {
  executionReadinessApprovalPacket: any;
  executionApprovalReviewOutcomeCertification: any;
  executionApprovalReviewSafetyAuditSeal: any;
  executionApprovalReview: any;
  executionApprovalPacket: any;
  finalizationCandidate: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyExecutionReadinessReviewView {
  const packet = input?.executionReadinessApprovalPacket ?? null;

  const rawPacketStatus = packet?.readOnlyExecutionReadinessApprovalPacketStatus;
  const readOnlyExecutionReadinessApprovalPacketStatus: NaverReadOnlyExecutionReadinessApprovalPacketStatus =
    ALLOWED_PACKET_STATUSES.includes(rawPacketStatus)
      ? rawPacketStatus
      : 'APPROVAL_PACKET_BLOCKED_BY_GW_IP';

  const readOnlyExecutionReadinessReviewStatus: NaverReadOnlyExecutionReadinessReviewStatus =
    EXECUTION_READINESS_REVIEW_STATUS_BY_PACKET_STATUS[readOnlyExecutionReadinessApprovalPacketStatus];

  const isComplete =
    readOnlyExecutionReadinessReviewStatus ===
    'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW';
  const isPartial =
    readOnlyExecutionReadinessReviewStatus ===
    'EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE';
  const isBlocked = !isComplete && !isPartial;

  const isReadOnlyExecutionReadinessReviewReadyForCompleteExecutionApprovalReview = isComplete;
  const isReadOnlyExecutionReadinessReviewReadyWithMissingFieldNotice = isPartial;
  const isReadOnlyExecutionReadinessReviewBlockedByGwIp =
    readOnlyExecutionReadinessReviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP';
  const isReadOnlyExecutionReadinessReviewBlockedByToken =
    readOnlyExecutionReadinessReviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN';
  const isReadOnlyExecutionReadinessReviewBlockedByEnv =
    readOnlyExecutionReadinessReviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV';
  const isReadOnlyExecutionReadinessReviewBlockedByChannel =
    readOnlyExecutionReadinessReviewStatus === 'EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL';
  const isReadOnlyExecutionReadinessReviewBlockedByProductLookup =
    readOnlyExecutionReadinessReviewStatus ===
    'EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP';

  const isReadOnlyExecutionReadinessReviewAvailable = isComplete || isPartial;
  const isReadOnlyExecutionReadinessReviewBlocked = isBlocked;
  const isMissingFieldNoticePreserved = isPartial;

  const { readinessReviewSummary, blockingReason } = buildReadinessReviewSummary({
    isComplete,
    isPartial,
    isBlocked,
    reviewStatus: readOnlyExecutionReadinessReviewStatus,
  });

  return {
    status: 'NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_READY',
    panelTitle: 'Task 301 - Read-Only Execution Readiness Review',
    description:
      'Task 301은 실행 준비 가능 여부를 read-only로 검토하는 단계입니다. 이 단계는 실제 실행 준비 완료 처리, 실제 실행 승인, 실제 실행, 실행 버튼 추가, 상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write, Worker 실행, Queue enqueue, Adapter 연결을 수행하지 않습니다.',
    currentTaskNumber: 301,
    referenceTaskNumbers: [300, 299, 298, 297, 296, 295, 294, 293, 289, 276],
    isBatchJobResultDisplayOnly: true,
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
    isUserApprovalConfirmedForTask301: true,
    isExecutionReadinessReviewStatusRecorded: true,
    readOnlyExecutionReadinessApprovalPacketStatus,
    readOnlyExecutionReadinessReviewStatus,
    isReadOnlyExecutionReadinessReviewReadyForCompleteExecutionApprovalReview,
    isReadOnlyExecutionReadinessReviewReadyWithMissingFieldNotice,
    isReadOnlyExecutionReadinessReviewBlockedByGwIp,
    isReadOnlyExecutionReadinessReviewBlockedByToken,
    isReadOnlyExecutionReadinessReviewBlockedByEnv,
    isReadOnlyExecutionReadinessReviewBlockedByChannel,
    isReadOnlyExecutionReadinessReviewBlockedByProductLookup,
    isReadOnlyExecutionReadinessReviewAvailable,
    isReadOnlyExecutionReadinessReviewBlocked,
    isMissingFieldNoticePreserved,
    readinessReviewSummary,
    blockingReason,
    reviewItems: buildReviewItems({
      packetStatus: readOnlyExecutionReadinessApprovalPacketStatus,
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
