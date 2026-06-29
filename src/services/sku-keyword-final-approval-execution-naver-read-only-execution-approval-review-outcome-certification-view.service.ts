import type {
  NaverReadOnlyExecutionApprovalReviewStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-view.service';

export type NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus =
  | 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE'
  | 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP'
  | 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN'
  | 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV'
  | 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL'
  | 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyExecutionApprovalReviewOutcomeCertificationItemStatus =
  | 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY'
  | 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_CONFIRMED'
  | 'USER_APPROVAL_CONFIRMED_FOR_TASK_297'
  | 'EXECUTION_APPROVAL_PACKET_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'OUTCOME_CERTIFICATION_STATUS_RECORDED'
  | 'CERTIFIED_READY_IF_COMPLETE_CANDIDATE'
  | 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_BLOCKED_RECHECK_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
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

export interface NaverReadOnlyExecutionApprovalReviewOutcomeCertificationItem {
  certificationItem: string;
  status: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationItemStatus;
  meaning: string;
}

export interface NaverReadOnlyExecutionApprovalReviewOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 299;
  referenceTaskNumbers: readonly [298, 297, 296, 295, 294, 293, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true;
  isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true;
  isNaverReadOnlyExecutionApprovalReviewReady: true;
  isNaverReadOnlyExecutionApprovalPacketReady: true;
  isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  isExecutionApprovalReviewOutcomeCertificationReady: true;
  isExecutionApprovalReviewSafetyAuditSealed: true;
  isExecutionApprovalReviewConfirmed: true;
  isUserApprovalConfirmedForTask297: true;
  isOutcomeCertificationStatusRecorded: true;
  readOnlyExecutionApprovalReviewStatus: NaverReadOnlyExecutionApprovalReviewStatus;
  readOnlyExecutionApprovalReviewOutcomeCertificationStatus: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus;
  isCertifiedExecutionApprovalReviewReadyForCompleteFinalizationCandidate: boolean;
  isCertifiedExecutionApprovalReviewReadyWithMissingFieldNotice: boolean;
  isCertifiedExecutionApprovalReviewBlockedByGwIp: boolean;
  isCertifiedExecutionApprovalReviewBlockedByToken: boolean;
  isCertifiedExecutionApprovalReviewBlockedByEnv: boolean;
  isCertifiedExecutionApprovalReviewBlockedByChannel: boolean;
  isCertifiedExecutionApprovalReviewBlockedByProductLookup: boolean;
  isReadyForNextReadOnlyExecutionReadinessApprovalPacket: boolean;
  isNextReadOnlyExecutionReadinessApprovalPacketBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
  certificationSummary: string;
  blockingReason: string | null;
  certificationItems: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationItem[];
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

const OUTCOME_CERTIFICATION_STATUS_BY_REVIEW_STATUS: Record<
  NaverReadOnlyExecutionApprovalReviewStatus,
  NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus
> = {
  EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE:
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE',
  EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE:
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP:
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP',
  EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN:
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN',
  EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV:
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV',
  EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL:
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL',
  EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP:
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
};

function buildCertificationSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  certStatus: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus;
}): { certificationSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      certificationSummary:
        'Task 297 실행 승인 검토 결과(COMPLETE)가 인증되었습니다. 다음 read-only 실행 준비 승인 패킷 후보 상태입니다.',
      blockingReason: null,
    };
  }
  if (input.isPartial) {
    return {
      certificationSummary:
        'Task 297 실행 승인 검토 결과(PARTIAL)가 인증되었습니다. missing field notice를 포함한 다음 read-only 실행 준비 승인 패킷 후보 상태입니다.',
      blockingReason: null,
    };
  }
  const reasonMap: Record<
    NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus,
    string | null
  > = {
    CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE: null,
    CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE: null,
    CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP:
      'GW IP 차단 상태입니다. IP 허용 목록을 재확인해야 합니다.',
    CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN:
      'Token 인증 실패 상태입니다. 인증/권한을 재확인해야 합니다.',
    CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV:
      'Env 누락 상태입니다. Env/Auth 설정을 재확인해야 합니다.',
    CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL:
      'channelProductNo 누락 상태입니다. 채널 상품번호를 확인해야 합니다.',
    CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP:
      '상품 조회 실패 상태입니다. 상품/스토어 접근을 확인해야 합니다.',
  };
  return {
    certificationSummary:
      'Task 297 실행 승인 검토 결과가 차단 상태임을 인증했습니다. 원인별 보정이 필요합니다.',
    blockingReason: reasonMap[input.certStatus] ?? '원인 불명 차단 상태입니다.',
  };
}

function buildCertificationItems(input: {
  reviewStatus: NaverReadOnlyExecutionApprovalReviewStatus;
  certStatus: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): NaverReadOnlyExecutionApprovalReviewOutcomeCertificationItem[] {
  return [
    {
      certificationItem: 'Task 299 Outcome Certification',
      status: 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY',
      meaning: 'Task 299 인증 준비가 완료되었습니다.',
    },
    {
      certificationItem: 'Task 298 Safety Audit Seal',
      status: 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 298 안전 감사 봉인을 확인했습니다.',
    },
    {
      certificationItem: 'Task 297 Execution Approval Review',
      status: 'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: `Task 297 실행 승인 검토 결과(${input.reviewStatus})를 확인했습니다.`,
    },
    {
      certificationItem: 'Task 297 사용자 승인',
      status: 'USER_APPROVAL_CONFIRMED_FOR_TASK_297',
      meaning: 'Task 297 승인 범위를 확인했습니다.',
    },
    {
      certificationItem: 'Task 296 Execution Approval Packet',
      status: 'EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 296 실행 승인 패킷을 확인했습니다.',
    },
    {
      certificationItem: 'Task 295 Outcome Certification',
      status: 'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 295 인증 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 확정 후보 표시 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: '설계안 블루프린트를 확인했습니다.',
    },
    {
      certificationItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      certificationItem: '인증 상태',
      status: 'OUTCOME_CERTIFICATION_STATUS_RECORDED',
      meaning: `certStatus=${input.certStatus}`,
    },
    {
      certificationItem: 'COMPLETE 검토 가능',
      status: 'CERTIFIED_READY_IF_COMPLETE_CANDIDATE',
      meaning: input.isComplete
        ? '다음 read-only 실행 준비 승인 패킷 후보 상태(COMPLETE)입니다.'
        : '현재 COMPLETE 상태가 아닙니다.',
    },
    {
      certificationItem: 'PARTIAL 검토 가능',
      status: 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'missing field notice 포함 다음 read-only 실행 준비 승인 패킷 후보 상태입니다.'
        : '현재 PARTIAL 상태가 아닙니다.',
    },
    {
      certificationItem: 'BLOCKED 검토 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_REQUIRED',
      meaning: input.isBlocked
        ? '원인별 보정이 필요합니다.'
        : '차단 상태가 아닙니다.',
    },
    {
      certificationItem: 'GW IP 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning:
        input.certStatus === 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP'
          ? 'IP 허용 목록 재확인이 필요합니다.'
          : '현재 GW IP 차단 상태가 아닙니다.',
    },
    {
      certificationItem: 'Token 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning:
        input.certStatus === 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN'
          ? '인증/권한 재확인이 필요합니다.'
          : '현재 Token 차단 상태가 아닙니다.',
    },
    {
      certificationItem: 'Env 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
      meaning:
        input.certStatus === 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV'
          ? 'Env/Auth 재확인이 필요합니다.'
          : '현재 Env 차단 상태가 아닙니다.',
    },
    {
      certificationItem: '상품번호 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning:
        input.certStatus === 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL'
          ? 'channelProductNo 확인이 필요합니다.'
          : '현재 채널 차단 상태가 아닙니다.',
    },
    {
      certificationItem: '상품 조회 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning:
        input.certStatus === 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP'
          ? '상품/스토어 접근 확인이 필요합니다.'
          : '현재 상품 조회 차단 상태가 아닙니다.',
    },
    {
      certificationItem: '실제 실행 승인',
      status: 'NOT_APPROVED',
      meaning: '이번 Task는 실제 실행 승인이 아닙니다.',
    },
    {
      certificationItem: '실제 실행',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 실제 실행을 수행하지 않습니다.',
    },
    {
      certificationItem: '실행 버튼',
      status: 'NOT_CONNECTED',
      meaning: '실행 버튼을 추가하지 않습니다.',
    },
    {
      certificationItem: 'submit action',
      status: 'NOT_CONNECTED',
      meaning: 'submit action을 추가하지 않습니다.',
    },
    {
      certificationItem: 'Worker',
      status: 'LOCKED',
      meaning: 'Worker 실행 경로를 연결하지 않습니다.',
    },
    {
      certificationItem: 'Queue',
      status: 'LOCKED',
      meaning: 'Queue enqueue 경로를 연결하지 않습니다.',
    },
    {
      certificationItem: 'Adapter',
      status: 'LOCKED',
      meaning: 'Adapter 연결 경로를 연결하지 않습니다.',
    },
    {
      certificationItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
    },
    {
      certificationItem: '상품 수정 API',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않습니다.',
    },
    {
      certificationItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않습니다.',
    },
    {
      certificationItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않습니다.',
    },
    {
      certificationItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않습니다.',
    },
    {
      certificationItem: '설계안 DB 저장',
      status: 'NOT_STORED',
      meaning: '설계안을 DB에 저장하지 않습니다.',
    },
    {
      certificationItem: '설계안 실행용 복사',
      status: 'NOT_COPIED_FOR_EXECUTION',
      meaning: '설계안을 실행용으로 복사하지 않습니다.',
    },
    {
      certificationItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      certificationItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
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
      meaning: '원본 응답 전체를 포함하지 않습니다.',
    },
    {
      certificationItem: 'raw API response 저장',
      status: 'NOT_STORED',
      meaning: '원본 응답을 저장하지 않습니다.',
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
      certificationItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 299는 실행 승인 검토 결과 인증 표시 전용입니다.',
    },
    {
      certificationItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 단계는 별도 승인이 필요합니다.',
    },
  ] satisfies NaverReadOnlyExecutionApprovalReviewOutcomeCertificationItem[];
}

export function buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(input: {
  executionApprovalReview: any;
  executionApprovalReviewSafetyAuditSeal: any;
  executionApprovalPacket: any;
  finalizationCandidateOutcomeCertification: any;
  finalizationCandidate: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyExecutionApprovalReviewOutcomeCertificationView {
  const review = input?.executionApprovalReview ?? null;

  const rawReviewStatus = review?.readOnlyExecutionApprovalReviewStatus;
  const readOnlyExecutionApprovalReviewStatus: NaverReadOnlyExecutionApprovalReviewStatus =
    ALLOWED_REVIEW_STATUSES.includes(rawReviewStatus)
      ? rawReviewStatus
      : 'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP';

  const readOnlyExecutionApprovalReviewOutcomeCertificationStatus: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus =
    OUTCOME_CERTIFICATION_STATUS_BY_REVIEW_STATUS[readOnlyExecutionApprovalReviewStatus];

  const isComplete =
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus ===
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE';
  const isPartial =
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus ===
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE';
  const isBlocked = !isComplete && !isPartial;

  const isCertifiedExecutionApprovalReviewReadyForCompleteFinalizationCandidate = isComplete;
  const isCertifiedExecutionApprovalReviewReadyWithMissingFieldNotice = isPartial;
  const isCertifiedExecutionApprovalReviewBlockedByGwIp =
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus ===
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP';
  const isCertifiedExecutionApprovalReviewBlockedByToken =
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus ===
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN';
  const isCertifiedExecutionApprovalReviewBlockedByEnv =
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus ===
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV';
  const isCertifiedExecutionApprovalReviewBlockedByChannel =
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus ===
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL';
  const isCertifiedExecutionApprovalReviewBlockedByProductLookup =
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus ===
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP';

  const isReadyForNextReadOnlyExecutionReadinessApprovalPacket = isComplete || isPartial;
  const isNextReadOnlyExecutionReadinessApprovalPacketBlocked = isBlocked;
  const isMissingFieldNoticePreserved = isPartial;

  const { certificationSummary, blockingReason } = buildCertificationSummary({
    isComplete,
    isPartial,
    isBlocked,
    certStatus: readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
  });

  return {
    status: 'NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY',
    panelTitle: 'Task 299 - Read-Only Execution Approval Review Outcome Certification',
    description:
      'Task 299는 Task 297 read-only 실행 승인 검토 결과와 Task 298 안전 감사 봉인을 바탕으로 다음 read-only 실행 준비 승인 패킷 후보 여부를 인증하는 단계입니다. 이 단계는 실제 실행 승인, 실제 실행, 실행 버튼 추가, 상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write, Worker 실행, Queue enqueue, Adapter 연결을 수행하지 않습니다.',
    currentTaskNumber: 299,
    referenceTaskNumbers: [298, 297, 296, 295, 294, 293, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true,
    isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true,
    isNaverReadOnlyExecutionApprovalReviewReady: true,
    isNaverReadOnlyExecutionApprovalPacketReady: true,
    isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    isExecutionApprovalReviewOutcomeCertificationReady: true,
    isExecutionApprovalReviewSafetyAuditSealed: true,
    isExecutionApprovalReviewConfirmed: true,
    isUserApprovalConfirmedForTask297: true,
    isOutcomeCertificationStatusRecorded: true,
    readOnlyExecutionApprovalReviewStatus,
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
    isCertifiedExecutionApprovalReviewReadyForCompleteFinalizationCandidate,
    isCertifiedExecutionApprovalReviewReadyWithMissingFieldNotice,
    isCertifiedExecutionApprovalReviewBlockedByGwIp,
    isCertifiedExecutionApprovalReviewBlockedByToken,
    isCertifiedExecutionApprovalReviewBlockedByEnv,
    isCertifiedExecutionApprovalReviewBlockedByChannel,
    isCertifiedExecutionApprovalReviewBlockedByProductLookup,
    isReadyForNextReadOnlyExecutionReadinessApprovalPacket,
    isNextReadOnlyExecutionReadinessApprovalPacketBlocked,
    isMissingFieldNoticePreserved,
    certificationSummary,
    blockingReason,
    certificationItems: buildCertificationItems({
      reviewStatus: readOnlyExecutionApprovalReviewStatus,
      certStatus: readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
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
