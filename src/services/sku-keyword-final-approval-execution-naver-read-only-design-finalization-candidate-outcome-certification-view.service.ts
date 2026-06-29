import type {
  NaverReadOnlyDesignFinalizationCandidateStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-view.service';

export type NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus =
  | 'CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT'
  | 'CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP'
  | 'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN'
  | 'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV'
  | 'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL'
  | 'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationItemStatus =
  | 'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'APPROVAL_PACKET_CONFIRMED'
  | 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'OUTCOME_CERTIFICATION_STATUS_RECORDED'
  | 'CERTIFIED_READY_IF_COMPLETE_BLUEPRINT'
  | 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_BLOCKED_RECHECK_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
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

export interface NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationItem {
  certificationItem: string;
  status: NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationItemStatus;
  meaning: string;
}

export interface NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 295;
  referenceTaskNumbers: readonly [294, 293, 292, 291, 290, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true;
  isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyDesignFinalizationApprovalPacketReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyDesignFinalizationCandidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus;
  readOnlyDesignFinalizationCandidateOutcomeCertificationStatus: NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus;
  isCertifiedFinalizationCandidateReadyForCompleteBlueprint: boolean;
  isCertifiedFinalizationCandidateReadyWithMissingFieldNotice: boolean;
  isCertifiedFinalizationCandidateBlockedByGwIp: boolean;
  isCertifiedFinalizationCandidateBlockedByToken: boolean;
  isCertifiedFinalizationCandidateBlockedByEnv: boolean;
  isCertifiedFinalizationCandidateBlockedByChannel: boolean;
  isCertifiedFinalizationCandidateBlockedByProductLookup: boolean;
  isReadyForNextReadOnlyExecutionApprovalPacket: boolean;
  isNextReadOnlyExecutionApprovalPacketBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
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
  outcomeCertificationSummary: string;
  blockingReason: string | null;
  certificationItems: NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationItem[];
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
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;
}

const FINALIZATION_CANDIDATE_TO_OUTCOME_CERTIFICATION: Record<
  NaverReadOnlyDesignFinalizationCandidateStatus,
  NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus
> = {
  FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT:
    'CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT',
  FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE:
    'CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
  FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP:
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP',
  FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN:
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN',
  FINALIZATION_CANDIDATE_BLOCKED_BY_ENV:
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV',
  FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL:
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL',
  FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP:
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
};

const ALLOWED_FINALIZATION_CANDIDATE_STATUSES = Object.keys(
  FINALIZATION_CANDIDATE_TO_OUTCOME_CERTIFICATION
) as NaverReadOnlyDesignFinalizationCandidateStatus[];

function buildOutcomeCertificationSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): { outcomeCertificationSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      outcomeCertificationSummary:
        'Task 293 확정 후보와 Task 294 안전 감사 봉인을 바탕으로, 다음 read-only 실행 승인 패킷 후보(COMPLETE)로 인증되었습니다.',
      blockingReason: null,
    };
  }

  if (input.isPartial) {
    return {
      outcomeCertificationSummary:
        'Task 293 확정 후보와 Task 294 안전 감사 봉인을 바탕으로, missing field notice를 유지한 다음 read-only 실행 승인 패킷 후보(PARTIAL)로 인증되었습니다.',
      blockingReason: null,
    };
  }

  return {
    outcomeCertificationSummary:
      'Task 293 확정 후보는 차단 상태 그대로 인증되며, 다음 read-only 실행 승인 패킷 후보로 진행되지 않습니다.',
    blockingReason:
      '차단 원인을 먼저 보정한 뒤 별도 승인 기준을 다시 확인해야 합니다.',
  };
}

function buildCertificationItems(input: {
  candidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus;
  outcomeCertificationStatus: NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlockedByGwIp: boolean;
  isBlockedByToken: boolean;
  isBlockedByEnv: boolean;
  isBlockedByChannel: boolean;
  isBlockedByProductLookup: boolean;
}): NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationItem[] {
  const isBlocked = !input.isComplete && !input.isPartial;
  return [
    {
      certificationItem: 'Task 294 Safety Audit Seal',
      status: 'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 294 확정 후보 안전 감사 봉인을 확인했습니다.',
    },
    {
      certificationItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 확정 후보 표시 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 292 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: '설계 확정 승인 패킷을 확인했습니다.',
    },
    {
      certificationItem: 'Task 291 Outcome Certification',
      status: 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: '설계안 인증 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 290 Safety Audit Seal',
      status: 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: '설계안 안전 봉인을 확인했습니다.',
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
      certificationItem: 'Outcome Certification',
      status: 'OUTCOME_CERTIFICATION_STATUS_RECORDED',
      meaning: `outcomeCertification=${input.outcomeCertificationStatus}, candidate=${input.candidateStatus}`,
    },
    {
      certificationItem: 'COMPLETE 후보',
      status: 'CERTIFIED_READY_IF_COMPLETE_BLUEPRINT',
      meaning: input.isComplete
        ? '현재 COMPLETE 후보이므로 다음 read-only 실행 승인 패킷 후보 상태입니다.'
        : '현재 COMPLETE 후보 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'PARTIAL 후보',
      status: 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? '현재 PARTIAL 후보이므로 missing field notice를 유지한 다음 read-only 실행 승인 패킷 후보 상태입니다.'
        : '현재 PARTIAL 후보 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'BLOCKED 후보',
      status: 'CERTIFIED_BLOCKED_RECHECK_REQUIRED',
      meaning: isBlocked
        ? '차단 상태이므로 원인별 보정이 필요합니다.'
        : '차단 상태가 아닙니다.',
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
      certificationItem: '설계 확정',
      status: 'NOT_FINALIZED',
      meaning: '실제 설계 확정은 수행하지 않습니다.',
    },
    {
      certificationItem: '실행 승인',
      status: 'NOT_APPROVED_FOR_EXECUTION',
      meaning: '실행 승인 단계가 아닙니다.',
    },
    {
      certificationItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
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
      meaning: '다음 단계는 별도 승인이 필요합니다.',
    },
    {
      certificationItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 295는 인증 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(input: {
  finalizationCandidate: any;
  finalizationCandidateSafetyAuditSeal: any;
  approvalPacket: any;
  blueprintOutcomeCertification: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView {
  const finalizationCandidate = input?.finalizationCandidate ?? null;

  const rawCandidateStatus =
    finalizationCandidate?.readOnlyDesignFinalizationCandidateStatus;
  const readOnlyDesignFinalizationCandidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus =
    ALLOWED_FINALIZATION_CANDIDATE_STATUSES.includes(rawCandidateStatus)
      ? rawCandidateStatus
      : 'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP';

  const readOnlyDesignFinalizationCandidateOutcomeCertificationStatus =
    FINALIZATION_CANDIDATE_TO_OUTCOME_CERTIFICATION[
      readOnlyDesignFinalizationCandidateStatus
    ];

  const isCertifiedFinalizationCandidateReadyForCompleteBlueprint =
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus ===
    'CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT';
  const isCertifiedFinalizationCandidateReadyWithMissingFieldNotice =
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus ===
    'CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE';
  const isCertifiedFinalizationCandidateBlockedByGwIp =
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus ===
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP';
  const isCertifiedFinalizationCandidateBlockedByToken =
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus ===
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN';
  const isCertifiedFinalizationCandidateBlockedByEnv =
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus ===
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV';
  const isCertifiedFinalizationCandidateBlockedByChannel =
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus ===
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL';
  const isCertifiedFinalizationCandidateBlockedByProductLookup =
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus ===
    'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP';

  const isComplete = isCertifiedFinalizationCandidateReadyForCompleteBlueprint;
  const isPartial = isCertifiedFinalizationCandidateReadyWithMissingFieldNotice;
  const isBlocked = !isComplete && !isPartial;

  const isReadyForNextReadOnlyExecutionApprovalPacket = isComplete || isPartial;
  const isNextReadOnlyExecutionApprovalPacketBlocked = isBlocked;
  const isMissingFieldNoticePreserved = isPartial;
  const isDesignBlueprintFinalizationCandidate = isComplete || isPartial;

  const { outcomeCertificationSummary, blockingReason } =
    buildOutcomeCertificationSummary({ isComplete, isPartial, isBlocked });

  return {
    status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_READY',
    panelTitle:
      'Task 295 - Read-Only Design Finalization Candidate Outcome Certification',
    description:
      'Task 295는 Task 293 read-only 설계 확정 후보 표시 결과와 Task 294 안전 감사 봉인을 바탕으로 다음 read-only 실행 승인 패킷 후보 여부를 인증하는 단계입니다. Task 293은 설계 확정 후보 표시 전용이며, 실행 승인이나 상품 변경 승인이 아닙니다. 이번 Task에서도 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    currentTaskNumber: 295,
    referenceTaskNumbers: [294, 293, 292, 291, 290, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady: true,
    isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyDesignFinalizationApprovalPacketReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyDesignFinalizationCandidateStatus,
    readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
    isCertifiedFinalizationCandidateReadyForCompleteBlueprint,
    isCertifiedFinalizationCandidateReadyWithMissingFieldNotice,
    isCertifiedFinalizationCandidateBlockedByGwIp,
    isCertifiedFinalizationCandidateBlockedByToken,
    isCertifiedFinalizationCandidateBlockedByEnv,
    isCertifiedFinalizationCandidateBlockedByChannel,
    isCertifiedFinalizationCandidateBlockedByProductLookup,
    isReadyForNextReadOnlyExecutionApprovalPacket,
    isNextReadOnlyExecutionApprovalPacketBlocked,
    isMissingFieldNoticePreserved,
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
    outcomeCertificationSummary,
    blockingReason,
    certificationItems: buildCertificationItems({
      candidateStatus: readOnlyDesignFinalizationCandidateStatus,
      outcomeCertificationStatus:
        readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
      isComplete,
      isPartial,
      isBlockedByGwIp: isCertifiedFinalizationCandidateBlockedByGwIp,
      isBlockedByToken: isCertifiedFinalizationCandidateBlockedByToken,
      isBlockedByEnv: isCertifiedFinalizationCandidateBlockedByEnv,
      isBlockedByChannel: isCertifiedFinalizationCandidateBlockedByChannel,
      isBlockedByProductLookup:
        isCertifiedFinalizationCandidateBlockedByProductLookup,
    }),
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
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,
  };
}
