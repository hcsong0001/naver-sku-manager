import type {
  NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-outcome-certification-view.service';

export type NaverReadOnlyExecutionApprovalPacketStatus =
  | 'APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE'
  | 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
  | 'APPROVAL_PACKET_BLOCKED_BY_GW_IP'
  | 'APPROVAL_PACKET_BLOCKED_BY_TOKEN'
  | 'APPROVAL_PACKET_BLOCKED_BY_ENV'
  | 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL'
  | 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyExecutionApprovalPacketItemStatus =
  | 'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'DESIGN_FINALIZATION_APPROVAL_PACKET_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'EXECUTION_APPROVAL_PACKET_STATUS_RECORDED'
  | 'READY_FOR_EXECUTION_REVIEW_IF_COMPLETE_CANDIDATE'
  | 'READY_WITH_MISSING_FIELD_NOTICE'
  | 'BLOCKED_RECHECK_REQUIRED'
  | 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'BLOCKED_RECHECK_ENV_REQUIRED'
  | 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
  | 'PENDING_USER_APPROVAL'
  | 'LOCKED_UNTIL_USER_APPROVAL'
  | 'NOT_EXECUTED'
  | 'NOT_CONNECTED'
  | 'LOCKED'
  | 'NOT_FINALIZED'
  | 'NOT_APPROVED_FOR_PRODUCT_CHANGE'
  | 'NOT_STORED'
  | 'NOT_COPIED_FOR_EXECUTION'
  | 'CAPTURED_DATA_ONLY_CONFIRMED'
  | 'SUMMARY_REVIEW_ONLY_CONFIRMED'
  | 'NOT_INFERRED'
  | 'NOT_INCLUDED'
  | 'NOT_DISPLAYED'
  | 'READ_ONLY_INFO';

export interface NaverReadOnlyExecutionApprovalPacketItem {
  packetItem: string;
  status: NaverReadOnlyExecutionApprovalPacketItemStatus;
  meaning: string;
}

export interface NaverReadOnlyExecutionApprovalPacketView {
  status: 'NAVER_READ_ONLY_EXECUTION_APPROVAL_PACKET_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 296;
  referenceTaskNumbers: readonly [295, 294, 293, 292, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyExecutionApprovalPacketReady: true;
  isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true;
  isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyDesignFinalizationApprovalPacketReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyDesignFinalizationCandidateOutcomeCertificationStatus: NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus;
  readOnlyExecutionApprovalPacketStatus: NaverReadOnlyExecutionApprovalPacketStatus;
  isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate: boolean;
  isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice: boolean;
  isReadOnlyExecutionApprovalPacketBlockedByGwIp: boolean;
  isReadOnlyExecutionApprovalPacketBlockedByToken: boolean;
  isReadOnlyExecutionApprovalPacketBlockedByEnv: boolean;
  isReadOnlyExecutionApprovalPacketBlockedByChannel: boolean;
  isReadOnlyExecutionApprovalPacketBlockedByProductLookup: boolean;
  isReadOnlyExecutionApprovalRequired: true;
  isReadOnlyExecutionApprovalGranted: false;
  isUserApprovalPhraseReceivedForReadOnlyExecutionApproval: false;
  isReadOnlyExecutionApprovalExecutedInThisTask: false;
  isExecutionApprovalGranted: false;
  isExecutionExecutedInThisTask: false;
  isProductChangeApprovalGranted: false;
  isDesignBlueprintFinalized: false;
  isDesignBlueprintApprovedForExecution: false;
  isDesignBlueprintReferenceOnly: true;
  isDesignBlueprintCopiedForExecution: false;
  isDesignBlueprintPersistedToDb: false;
  isDesignFinalizationCandidateStoredInDb: false;
  isDesignFinalizationCandidateCopiedForExecution: false;
  approvalPacketSummary: string;
  blockingReason: string | null;
  packetItems: NaverReadOnlyExecutionApprovalPacketItem[];
  userApprovalPhrase: string;
  isCapturedDataUsedOnly: true;
  isSummaryReviewResultUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isOptionAdditionalStructureExpansionDesignReexecutedInThisTask: false;
  isOptionStructureInferred: false;
  isAdditionalProductStructureInferred: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
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

const OUTCOME_CERTIFICATION_TO_APPROVAL_PACKET: Record<
  NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
  NaverReadOnlyExecutionApprovalPacketStatus
> = {
  CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT:
    'APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE',
  CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE:
    'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
  CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP:
    'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
  CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN:
    'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
  CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV:
    'APPROVAL_PACKET_BLOCKED_BY_ENV',
  CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL:
    'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
  CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP:
    'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
};

const ALLOWED_OUTCOME_CERTIFICATION_STATUSES = Object.keys(
  OUTCOME_CERTIFICATION_TO_APPROVAL_PACKET
) as NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus[];

const USER_APPROVAL_PHRASE =
  'Task 297에서 Naver read-only 실행 승인 검토를 승인합니다. 이 단계는 실제 실행이나 상품 변경이 아니라 실행 승인 가능 여부를 read-only로 검토하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

function buildApprovalPacketSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): { approvalPacketSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      approvalPacketSummary:
        'Task 295 인증 결과(COMPLETE)를 바탕으로 read-only 실행 승인 검토 패킷이 준비되었습니다. 사용자의 별도 승인 후 Task 297 진행이 가능합니다.',
      blockingReason: null,
    };
  }
  if (input.isPartial) {
    return {
      approvalPacketSummary:
        'Task 295 인증 결과(PARTIAL)를 바탕으로 missing field notice를 유지한 read-only 실행 승인 검토 패킷이 준비되었습니다. 사용자의 별도 승인 후 Task 297 진행이 가능합니다.',
      blockingReason: null,
    };
  }
  return {
    approvalPacketSummary:
      'Task 295 인증 결과가 차단 상태이므로 실행 승인 검토 패킷을 진행할 수 없습니다.',
    blockingReason:
      '차단 원인을 먼저 보정한 뒤 별도 승인 기준을 다시 확인해야 합니다.',
  };
}

function buildPacketItems(input: {
  outcomeCertificationStatus: NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus;
  packetStatus: NaverReadOnlyExecutionApprovalPacketStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlockedByGwIp: boolean;
  isBlockedByToken: boolean;
  isBlockedByEnv: boolean;
  isBlockedByChannel: boolean;
  isBlockedByProductLookup: boolean;
}): NaverReadOnlyExecutionApprovalPacketItem[] {
  const isBlocked = !input.isComplete && !input.isPartial;
  return [
    {
      packetItem: 'Task 295 Outcome Certification',
      status: 'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 295 인증 결과를 확인했습니다.',
    },
    {
      packetItem: 'Task 294 Safety Audit Seal',
      status: 'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 294 확정 후보 안전 감사 봉인을 확인했습니다.',
    },
    {
      packetItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 확정 후보 표시 결과를 확인했습니다.',
    },
    {
      packetItem: 'Task 292 Approval Packet',
      status: 'DESIGN_FINALIZATION_APPROVAL_PACKET_CONFIRMED',
      meaning: '설계 확정 승인 패킷을 확인했습니다.',
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
      packetItem: '실행 승인 패킷 상태',
      status: 'EXECUTION_APPROVAL_PACKET_STATUS_RECORDED',
      meaning: `packetStatus=${input.packetStatus}, outcomeCertification=${input.outcomeCertificationStatus}`,
    },
    {
      packetItem: 'COMPLETE 후보',
      status: 'READY_FOR_EXECUTION_REVIEW_IF_COMPLETE_CANDIDATE',
      meaning: input.isComplete
        ? '현재 COMPLETE 후보이므로 read-only 실행 승인 검토 요청이 가능합니다.'
        : '현재 COMPLETE 후보 상태는 아닙니다.',
    },
    {
      packetItem: 'PARTIAL 후보',
      status: 'READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? '현재 PARTIAL 후보이므로 누락 안내를 포함한 실행 승인 검토 요청이 가능합니다.'
        : '현재 PARTIAL 후보 상태는 아닙니다.',
    },
    {
      packetItem: 'BLOCKED 후보',
      status: 'BLOCKED_RECHECK_REQUIRED',
      meaning: isBlocked
        ? '차단 상태이므로 원인별 보정이 필요합니다.'
        : '차단 상태가 아닙니다.',
    },
    {
      packetItem: 'GW IP 차단',
      status: 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning: input.isBlockedByGwIp
        ? '현재 GW IP 허용 목록 재확인이 필요합니다.'
        : '현재 GW IP 차단 상태는 아닙니다.',
    },
    {
      packetItem: 'Token 실패 차단',
      status: 'BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning: input.isBlockedByToken
        ? '현재 인증/권한 재확인이 필요합니다.'
        : '현재 Token 실패 차단 상태는 아닙니다.',
    },
    {
      packetItem: 'Env 누락 차단',
      status: 'BLOCKED_RECHECK_ENV_REQUIRED',
      meaning: input.isBlockedByEnv
        ? '현재 Env/Auth 재확인이 필요합니다.'
        : '현재 Env 누락 차단 상태는 아닙니다.',
    },
    {
      packetItem: '상품번호 누락 차단',
      status: 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning: input.isBlockedByChannel
        ? '현재 channelProductNo 확인이 필요합니다.'
        : '현재 상품번호 누락 차단 상태는 아닙니다.',
    },
    {
      packetItem: '상품 조회 실패 차단',
      status: 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning: input.isBlockedByProductLookup
        ? '현재 상품/스토어 접근 재확인이 필요합니다.'
        : '현재 상품 조회 실패 차단 상태는 아닙니다.',
    },
    {
      packetItem: '사용자 별도 승인',
      status: 'PENDING_USER_APPROVAL',
      meaning: '아직 사용자 승인 전입니다. 승인 전 실행 승인 검토를 시작하지 않습니다.',
    },
    {
      packetItem: '실제 실행 승인',
      status: 'LOCKED_UNTIL_USER_APPROVAL',
      meaning: '사용자 승인 전까지 실제 실행 승인은 잠겨 있습니다.',
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
      packetItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로(Worker/Queue/Adapter)를 연결하지 않습니다.',
    },
    {
      packetItem: '설계 확정',
      status: 'NOT_FINALIZED',
      meaning: '실제 설계 확정은 수행하지 않습니다.',
    },
    {
      packetItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
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
      packetItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않았습니다.',
    },
    {
      packetItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않았습니다.',
    },
    {
      packetItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않았습니다.',
    },
    {
      packetItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않았습니다.',
    },
    {
      packetItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 296은 실행 승인 패킷 표시 전용입니다.',
    },
  ] satisfies NaverReadOnlyExecutionApprovalPacketItem[];
}

export function buildNaverReadOnlyExecutionApprovalPacketView(input: {
  finalizationCandidateOutcomeCertification: any;
  finalizationCandidateSafetyAuditSeal: any;
  finalizationCandidate: any;
  designFinalizationApprovalPacket: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyExecutionApprovalPacketView {
  const outcomeCertification = input?.finalizationCandidateOutcomeCertification ?? null;

  const rawOutcomeCertificationStatus =
    outcomeCertification?.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus;
  const readOnlyDesignFinalizationCandidateOutcomeCertificationStatus: NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus =
    ALLOWED_OUTCOME_CERTIFICATION_STATUSES.includes(rawOutcomeCertificationStatus)
      ? rawOutcomeCertificationStatus
      : 'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP';

  const readOnlyExecutionApprovalPacketStatus =
    OUTCOME_CERTIFICATION_TO_APPROVAL_PACKET[
      readOnlyDesignFinalizationCandidateOutcomeCertificationStatus
    ];

  const isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate =
    readOnlyExecutionApprovalPacketStatus ===
    'APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE';
  const isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice =
    readOnlyExecutionApprovalPacketStatus ===
    'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE';
  const isReadOnlyExecutionApprovalPacketBlockedByGwIp =
    readOnlyExecutionApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_GW_IP';
  const isReadOnlyExecutionApprovalPacketBlockedByToken =
    readOnlyExecutionApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_TOKEN';
  const isReadOnlyExecutionApprovalPacketBlockedByEnv =
    readOnlyExecutionApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_ENV';
  const isReadOnlyExecutionApprovalPacketBlockedByChannel =
    readOnlyExecutionApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL';
  const isReadOnlyExecutionApprovalPacketBlockedByProductLookup =
    readOnlyExecutionApprovalPacketStatus ===
    'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP';

  const isComplete = isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate;
  const isPartial = isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice;
  const isBlocked = !isComplete && !isPartial;

  const { approvalPacketSummary, blockingReason } = buildApprovalPacketSummary({
    isComplete,
    isPartial,
    isBlocked,
  });

  return {
    status: 'NAVER_READ_ONLY_EXECUTION_APPROVAL_PACKET_READY',
    panelTitle:
      'Task 296 - Read-Only Execution Approval Packet',
    description:
      'Task 296은 read-only 실행 승인 검토 단계로 진입하기 위한 승인 요청 패킷입니다. 이 패킷은 실제 실행 승인, 실행 버튼 추가, 상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write, Worker 실행, Queue enqueue, Adapter 연결을 수행하지 않습니다.',
    currentTaskNumber: 296,
    referenceTaskNumbers: [295, 294, 293, 292, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyExecutionApprovalPacketReady: true,
    isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true,
    isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyDesignFinalizationApprovalPacketReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
    readOnlyExecutionApprovalPacketStatus,
    isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate,
    isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice,
    isReadOnlyExecutionApprovalPacketBlockedByGwIp,
    isReadOnlyExecutionApprovalPacketBlockedByToken,
    isReadOnlyExecutionApprovalPacketBlockedByEnv,
    isReadOnlyExecutionApprovalPacketBlockedByChannel,
    isReadOnlyExecutionApprovalPacketBlockedByProductLookup,
    isReadOnlyExecutionApprovalRequired: true,
    isReadOnlyExecutionApprovalGranted: false,
    isUserApprovalPhraseReceivedForReadOnlyExecutionApproval: false,
    isReadOnlyExecutionApprovalExecutedInThisTask: false,
    isExecutionApprovalGranted: false,
    isExecutionExecutedInThisTask: false,
    isProductChangeApprovalGranted: false,
    isDesignBlueprintFinalized: false,
    isDesignBlueprintApprovedForExecution: false,
    isDesignBlueprintReferenceOnly: true,
    isDesignBlueprintCopiedForExecution: false,
    isDesignBlueprintPersistedToDb: false,
    isDesignFinalizationCandidateStoredInDb: false,
    isDesignFinalizationCandidateCopiedForExecution: false,
    approvalPacketSummary,
    blockingReason,
    packetItems: buildPacketItems({
      outcomeCertificationStatus:
        readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
      packetStatus: readOnlyExecutionApprovalPacketStatus,
      isComplete,
      isPartial,
      isBlockedByGwIp: isReadOnlyExecutionApprovalPacketBlockedByGwIp,
      isBlockedByToken: isReadOnlyExecutionApprovalPacketBlockedByToken,
      isBlockedByEnv: isReadOnlyExecutionApprovalPacketBlockedByEnv,
      isBlockedByChannel: isReadOnlyExecutionApprovalPacketBlockedByChannel,
      isBlockedByProductLookup:
        isReadOnlyExecutionApprovalPacketBlockedByProductLookup,
    }),
    userApprovalPhrase: USER_APPROVAL_PHRASE,
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isOptionAdditionalStructureExpansionDesignReexecutedInThisTask: false,
    isOptionStructureInferred: false,
    isAdditionalProductStructureInferred: false,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
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
