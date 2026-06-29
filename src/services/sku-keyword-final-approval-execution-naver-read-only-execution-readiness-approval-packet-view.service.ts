import type {
  NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-outcome-certification-view.service';

export type NaverReadOnlyExecutionReadinessApprovalPacketStatus =
  | 'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
  | 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
  | 'APPROVAL_PACKET_BLOCKED_BY_GW_IP'
  | 'APPROVAL_PACKET_BLOCKED_BY_TOKEN'
  | 'APPROVAL_PACKET_BLOCKED_BY_ENV'
  | 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL'
  | 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyExecutionReadinessApprovalPacketItemStatus =
  | 'EXECUTION_READINESS_APPROVAL_PACKET_READY'
  | 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_CONFIRMED'
  | 'EXECUTION_APPROVAL_PACKET_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'EXECUTION_READINESS_APPROVAL_PACKET_STATUS_RECORDED'
  | 'READY_FOR_EXECUTION_READINESS_REVIEW_IF_COMPLETE'
  | 'READY_WITH_MISSING_FIELD_NOTICE'
  | 'BLOCKED_RECHECK_REQUIRED'
  | 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'BLOCKED_RECHECK_ENV_REQUIRED'
  | 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
  | 'PENDING_USER_APPROVAL'
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

export interface NaverReadOnlyExecutionReadinessApprovalPacketItem {
  packetItem: string;
  status: NaverReadOnlyExecutionReadinessApprovalPacketItemStatus;
  meaning: string;
}

export interface NaverReadOnlyExecutionReadinessApprovalPacketView {
  status: 'NAVER_READ_ONLY_EXECUTION_READINESS_APPROVAL_PACKET_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 300;
  referenceTaskNumbers: readonly [299, 298, 297, 296, 295, 294, 293, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyExecutionReadinessApprovalPacketReady: true;
  isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true;
  isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true;
  isNaverReadOnlyExecutionApprovalReviewReady: true;
  isNaverReadOnlyExecutionApprovalPacketReady: true;
  isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyExecutionApprovalReviewOutcomeCertificationStatus: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus;
  readOnlyExecutionReadinessApprovalPacketStatus: NaverReadOnlyExecutionReadinessApprovalPacketStatus;
  isReadOnlyExecutionReadinessApprovalPacketReadyForCompleteExecutionApprovalReview: boolean;
  isReadOnlyExecutionReadinessApprovalPacketReadyWithMissingFieldNotice: boolean;
  isReadOnlyExecutionReadinessApprovalPacketBlockedByGwIp: boolean;
  isReadOnlyExecutionReadinessApprovalPacketBlockedByToken: boolean;
  isReadOnlyExecutionReadinessApprovalPacketBlockedByEnv: boolean;
  isReadOnlyExecutionReadinessApprovalPacketBlockedByChannel: boolean;
  isReadOnlyExecutionReadinessApprovalPacketBlockedByProductLookup: boolean;
  isReadOnlyExecutionReadinessReviewRequired: true;
  isReadOnlyExecutionReadinessReviewGranted: false;
  isUserApprovalPhraseReceivedForReadOnlyExecutionReadinessReview: false;
  isReadOnlyExecutionReadinessReviewExecutedInThisTask: false;
  isMissingFieldNoticePreserved: boolean;
  packetSummary: string;
  blockingReason: string | null;
  userApprovalPhrase: string;
  packetItems: NaverReadOnlyExecutionReadinessApprovalPacketItem[];
  isMarkedReadyForExecutionInThisTask: false;
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
}

const ALLOWED_CERTIFICATION_STATUSES: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus[] =
  [
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE',
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP',
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN',
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV',
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL',
    'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
  ];

const READ_ONLY_EXECUTION_READINESS_APPROVAL_PACKET_STATUS_BY_CERTIFICATION_STATUS: Record<
  NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus,
  NaverReadOnlyExecutionReadinessApprovalPacketStatus
> = {
  CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE:
    'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW',
  CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE:
    'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
  CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP:
    'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
  CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN:
    'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
  CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV:
    'APPROVAL_PACKET_BLOCKED_BY_ENV',
  CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL:
    'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
  CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP:
    'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
};

const USER_APPROVAL_PHRASE_FOR_TASK_301 =
  'Task 301에서 Naver read-only 실행 준비 검토를 승인합니다. 이 단계는 실제 실행 준비 완료 처리나 실행 승인이 아니라 실행 준비 가능 여부를 read-only로 검토하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

function buildPacketSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  packetStatus: NaverReadOnlyExecutionReadinessApprovalPacketStatus;
}): { packetSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      packetSummary:
        'Task 299 인증 결과(COMPLETE)를 확인했습니다. 사용자 승인 후 read-only 실행 준비 검토 패킷이 준비됩니다.',
      blockingReason: null,
    };
  }
  if (input.isPartial) {
    return {
      packetSummary:
        'Task 299 인증 결과(PARTIAL)를 확인했습니다. missing field notice 포함 사용자 승인 후 read-only 실행 준비 검토 패킷이 준비됩니다.',
      blockingReason: null,
    };
  }
  const reasonMap: Record<NaverReadOnlyExecutionReadinessApprovalPacketStatus, string | null> = {
    APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW: null,
    APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE: null,
    APPROVAL_PACKET_BLOCKED_BY_GW_IP: 'GW IP 차단 상태입니다. IP 허용 목록을 재확인해야 합니다.',
    APPROVAL_PACKET_BLOCKED_BY_TOKEN: 'Token 인증 실패 상태입니다. 인증/권한을 재확인해야 합니다.',
    APPROVAL_PACKET_BLOCKED_BY_ENV: 'Env 누락 상태입니다. Env/Auth 설정을 재확인해야 합니다.',
    APPROVAL_PACKET_BLOCKED_BY_CHANNEL:
      'channelProductNo 누락 상태입니다. 채널 상품번호를 확인해야 합니다.',
    APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP:
      '상품 조회 실패 상태입니다. 상품/스토어 접근을 확인해야 합니다.',
  };
  return {
    packetSummary: 'Task 299 인증 결과가 차단 상태입니다. 원인별 보정이 필요합니다.',
    blockingReason: reasonMap[input.packetStatus] ?? '원인 불명 차단 상태입니다.',
  };
}

function buildPacketItems(input: {
  certStatus: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus;
  packetStatus: NaverReadOnlyExecutionReadinessApprovalPacketStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): NaverReadOnlyExecutionReadinessApprovalPacketItem[] {
  return [
    {
      packetItem: 'Task 300 Approval Packet',
      status: 'EXECUTION_READINESS_APPROVAL_PACKET_READY',
      meaning: 'Task 300 실행 준비 승인 패킷을 준비했습니다.',
    },
    {
      packetItem: 'Task 299 Outcome Certification',
      status: 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: `Task 299 인증 결과(${input.certStatus})를 확인했습니다.`,
    },
    {
      packetItem: 'Task 298 Safety Audit Seal',
      status: 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 298 안전 감사 봉인을 확인했습니다.',
    },
    {
      packetItem: 'Task 297 Execution Approval Review',
      status: 'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: 'Task 297 실행 승인 검토 결과를 확인했습니다.',
    },
    {
      packetItem: 'Task 296 Execution Approval Packet',
      status: 'EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 296 실행 승인 패킷을 확인했습니다.',
    },
    {
      packetItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 확정 후보 표시 결과를 확인했습니다.',
    },
    {
      packetItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: '설계안 블루프린트를 확인했습니다.',
    },
    {
      packetItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      packetItem: '패킷 상태',
      status: 'EXECUTION_READINESS_APPROVAL_PACKET_STATUS_RECORDED',
      meaning: `packetStatus=${input.packetStatus}`,
    },
    {
      packetItem: 'COMPLETE 후보',
      status: 'READY_FOR_EXECUTION_READINESS_REVIEW_IF_COMPLETE',
      meaning: input.isComplete
        ? 'COMPLETE 상태입니다. 사용자 승인 후 실행 준비 검토 요청이 가능합니다.'
        : '현재 COMPLETE 상태가 아닙니다.',
    },
    {
      packetItem: 'PARTIAL 후보',
      status: 'READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'PARTIAL 상태입니다. missing field notice 포함 사용자 승인 후 실행 준비 검토 요청이 가능합니다.'
        : '현재 PARTIAL 상태가 아닙니다.',
    },
    {
      packetItem: 'BLOCKED 후보',
      status: 'BLOCKED_RECHECK_REQUIRED',
      meaning: input.isBlocked
        ? '원인별 보정이 필요합니다.'
        : '차단 상태가 아닙니다.',
    },
    {
      packetItem: 'GW IP 차단',
      status: 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning:
        input.packetStatus === 'APPROVAL_PACKET_BLOCKED_BY_GW_IP'
          ? 'IP 허용 목록 재확인이 필요합니다.'
          : '현재 GW IP 차단 상태가 아닙니다.',
    },
    {
      packetItem: 'Token 실패 차단',
      status: 'BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning:
        input.packetStatus === 'APPROVAL_PACKET_BLOCKED_BY_TOKEN'
          ? '인증/권한 재확인이 필요합니다.'
          : '현재 Token 차단 상태가 아닙니다.',
    },
    {
      packetItem: 'Env 누락 차단',
      status: 'BLOCKED_RECHECK_ENV_REQUIRED',
      meaning:
        input.packetStatus === 'APPROVAL_PACKET_BLOCKED_BY_ENV'
          ? 'Env/Auth 재확인이 필요합니다.'
          : '현재 Env 차단 상태가 아닙니다.',
    },
    {
      packetItem: '상품번호 누락 차단',
      status: 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning:
        input.packetStatus === 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL'
          ? 'channelProductNo 확인이 필요합니다.'
          : '현재 채널 차단 상태가 아닙니다.',
    },
    {
      packetItem: '상품 조회 실패 차단',
      status: 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning:
        input.packetStatus === 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP'
          ? '상품/스토어 접근 확인이 필요합니다.'
          : '현재 상품 조회 차단 상태가 아닙니다.',
    },
    {
      packetItem: '사용자 별도 승인',
      status: 'PENDING_USER_APPROVAL',
      meaning: 'Task 301 실행 준비 검토를 위한 사용자 별도 승인이 아직 없습니다.',
    },
    {
      packetItem: '실제 실행 준비 완료',
      status: 'NOT_MARKED_READY_FOR_EXECUTION',
      meaning: '이번 Task는 실제 실행 준비 완료 처리가 아닙니다.',
    },
    {
      packetItem: '실제 실행 승인',
      status: 'NOT_APPROVED',
      meaning: '이번 Task는 실제 실행 승인이 아닙니다.',
    },
    {
      packetItem: '실제 실행',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 실제 실행을 수행하지 않습니다.',
    },
    {
      packetItem: '실행 버튼',
      status: 'NOT_CONNECTED',
      meaning: '실행 버튼을 추가하지 않습니다.',
    },
    {
      packetItem: 'submit action',
      status: 'NOT_CONNECTED',
      meaning: 'submit action을 추가하지 않습니다.',
    },
    {
      packetItem: 'Worker',
      status: 'LOCKED',
      meaning: 'Worker 실행 경로를 연결하지 않습니다.',
    },
    {
      packetItem: 'Queue',
      status: 'LOCKED',
      meaning: 'Queue enqueue 경로를 연결하지 않습니다.',
    },
    {
      packetItem: 'Adapter',
      status: 'LOCKED',
      meaning: 'Adapter 연결 경로를 연결하지 않습니다.',
    },
    {
      packetItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
    },
    {
      packetItem: '상품 수정 API',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않습니다.',
    },
    {
      packetItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않습니다.',
    },
    {
      packetItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않습니다.',
    },
    {
      packetItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않습니다.',
    },
    {
      packetItem: '설계안 DB 저장',
      status: 'NOT_STORED',
      meaning: '설계안을 DB에 저장하지 않습니다.',
    },
    {
      packetItem: '설계안 실행용 복사',
      status: 'NOT_COPIED_FOR_EXECUTION',
      meaning: '설계안을 실행용으로 복사하지 않습니다.',
    },
    {
      packetItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      packetItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
    },
    {
      packetItem: '옵션 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      packetItem: '추가상품 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      packetItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      packetItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      packetItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 응답 전체를 포함하지 않습니다.',
    },
    {
      packetItem: 'raw API response 저장',
      status: 'NOT_STORED',
      meaning: '원본 응답을 저장하지 않습니다.',
    },
    {
      packetItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더를 표시하지 않습니다.',
    },
    {
      packetItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급을 수행하지 않았습니다.',
    },
    {
      packetItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출을 수행하지 않았습니다.',
    },
    {
      packetItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 300은 실행 준비 승인 패킷 표시 전용입니다.',
    },
  ] satisfies NaverReadOnlyExecutionReadinessApprovalPacketItem[];
}

export function buildNaverReadOnlyExecutionReadinessApprovalPacketView(input: {
  executionApprovalReviewOutcomeCertification: any;
  executionApprovalReviewSafetyAuditSeal: any;
  executionApprovalReview: any;
  executionApprovalPacket: any;
  finalizationCandidate: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyExecutionReadinessApprovalPacketView {
  const certification = input?.executionApprovalReviewOutcomeCertification ?? null;

  const rawCertStatus =
    certification?.readOnlyExecutionApprovalReviewOutcomeCertificationStatus;
  const readOnlyExecutionApprovalReviewOutcomeCertificationStatus: NaverReadOnlyExecutionApprovalReviewOutcomeCertificationStatus =
    ALLOWED_CERTIFICATION_STATUSES.includes(rawCertStatus)
      ? rawCertStatus
      : 'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP';

  const readOnlyExecutionReadinessApprovalPacketStatus: NaverReadOnlyExecutionReadinessApprovalPacketStatus =
    READ_ONLY_EXECUTION_READINESS_APPROVAL_PACKET_STATUS_BY_CERTIFICATION_STATUS[
      readOnlyExecutionApprovalReviewOutcomeCertificationStatus
    ];

  const isComplete =
    readOnlyExecutionReadinessApprovalPacketStatus ===
    'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW';
  const isPartial =
    readOnlyExecutionReadinessApprovalPacketStatus ===
    'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE';
  const isBlocked = !isComplete && !isPartial;

  const isReadOnlyExecutionReadinessApprovalPacketReadyForCompleteExecutionApprovalReview =
    isComplete;
  const isReadOnlyExecutionReadinessApprovalPacketReadyWithMissingFieldNotice = isPartial;
  const isReadOnlyExecutionReadinessApprovalPacketBlockedByGwIp =
    readOnlyExecutionReadinessApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_GW_IP';
  const isReadOnlyExecutionReadinessApprovalPacketBlockedByToken =
    readOnlyExecutionReadinessApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_TOKEN';
  const isReadOnlyExecutionReadinessApprovalPacketBlockedByEnv =
    readOnlyExecutionReadinessApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_ENV';
  const isReadOnlyExecutionReadinessApprovalPacketBlockedByChannel =
    readOnlyExecutionReadinessApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL';
  const isReadOnlyExecutionReadinessApprovalPacketBlockedByProductLookup =
    readOnlyExecutionReadinessApprovalPacketStatus ===
    'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP';
  const isMissingFieldNoticePreserved = isPartial;

  const { packetSummary, blockingReason } = buildPacketSummary({
    isComplete,
    isPartial,
    isBlocked,
    packetStatus: readOnlyExecutionReadinessApprovalPacketStatus,
  });

  return {
    status: 'NAVER_READ_ONLY_EXECUTION_READINESS_APPROVAL_PACKET_READY',
    panelTitle: 'Task 300 - Read-Only Execution Readiness Approval Packet',
    description:
      'Task 300은 read-only 실행 준비 검토 단계로 진입하기 위한 승인 요청 패킷입니다. 이 패킷은 실제 실행 준비 완료 처리, 실제 실행 승인, 실제 실행, 실행 버튼 추가, 상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write, Worker 실행, Queue enqueue, Adapter 연결을 수행하지 않습니다.',
    currentTaskNumber: 300,
    referenceTaskNumbers: [299, 298, 297, 296, 295, 294, 293, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyExecutionReadinessApprovalPacketReady: true,
    isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true,
    isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true,
    isNaverReadOnlyExecutionApprovalReviewReady: true,
    isNaverReadOnlyExecutionApprovalPacketReady: true,
    isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
    readOnlyExecutionReadinessApprovalPacketStatus,
    isReadOnlyExecutionReadinessApprovalPacketReadyForCompleteExecutionApprovalReview,
    isReadOnlyExecutionReadinessApprovalPacketReadyWithMissingFieldNotice,
    isReadOnlyExecutionReadinessApprovalPacketBlockedByGwIp,
    isReadOnlyExecutionReadinessApprovalPacketBlockedByToken,
    isReadOnlyExecutionReadinessApprovalPacketBlockedByEnv,
    isReadOnlyExecutionReadinessApprovalPacketBlockedByChannel,
    isReadOnlyExecutionReadinessApprovalPacketBlockedByProductLookup,
    isReadOnlyExecutionReadinessReviewRequired: true,
    isReadOnlyExecutionReadinessReviewGranted: false,
    isUserApprovalPhraseReceivedForReadOnlyExecutionReadinessReview: false,
    isReadOnlyExecutionReadinessReviewExecutedInThisTask: false,
    isMissingFieldNoticePreserved,
    packetSummary,
    blockingReason,
    userApprovalPhrase: USER_APPROVAL_PHRASE_FOR_TASK_301,
    packetItems: buildPacketItems({
      certStatus: readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
      packetStatus: readOnlyExecutionReadinessApprovalPacketStatus,
      isComplete,
      isPartial,
      isBlocked,
    }),
    isMarkedReadyForExecutionInThisTask: false,
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
  };
}
