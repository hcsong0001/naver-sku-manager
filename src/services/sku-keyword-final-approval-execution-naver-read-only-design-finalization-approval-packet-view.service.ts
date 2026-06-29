import type {
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-outcome-certification-view.service';

export type NaverReadOnlyDesignFinalizationApprovalPacketStatus =
  | 'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT'
  | 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
  | 'APPROVAL_PACKET_BLOCKED_BY_GW_IP'
  | 'APPROVAL_PACKET_BLOCKED_BY_TOKEN'
  | 'APPROVAL_PACKET_BLOCKED_BY_ENV'
  | 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL'
  | 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyDesignFinalizationApprovalPacketItemStatus =
  | 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'PLANNING_CANDIDATE_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'APPROVAL_PACKET_STATUS_RECORDED'
  | 'READY_FOR_FINALIZATION_IF_COMPLETE_BLUEPRINT'
  | 'READY_WITH_MISSING_FIELD_NOTICE'
  | 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'BLOCKED_RECHECK_ENV_REQUIRED'
  | 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
  | 'PENDING_USER_APPROVAL'
  | 'LOCKED_UNTIL_USER_APPROVAL'
  | 'NOT_FINALIZED'
  | 'NOT_APPROVED_FOR_EXECUTION'
  | 'CAPTURED_DATA_ONLY_CONFIRMED'
  | 'SUMMARY_REVIEW_ONLY_CONFIRMED'
  | 'NOT_INFERRED'
  | 'NOT_INCLUDED'
  | 'NOT_DISPLAYED'
  | 'NOT_EXECUTED'
  | 'LOCKED'
  | 'READ_ONLY_INFO';

export interface NaverReadOnlyDesignFinalizationApprovalPacketItem {
  packetItem: string;
  status: NaverReadOnlyDesignFinalizationApprovalPacketItemStatus;
  meaning: string;
}

export interface NaverReadOnlyDesignFinalizationApprovalPacketView {
  status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_APPROVAL_PACKET_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 292;
  referenceTaskNumbers: readonly [291, 290, 289, 288, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyDesignFinalizationApprovalPacketReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionPlanningApprovalPacketReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus;
  readOnlyDesignFinalizationApprovalPacketStatus: NaverReadOnlyDesignFinalizationApprovalPacketStatus;
  isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint: boolean;
  isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice: boolean;
  isReadOnlyDesignFinalizationApprovalPacketBlockedByGwIp: boolean;
  isReadOnlyDesignFinalizationApprovalPacketBlockedByToken: boolean;
  isReadOnlyDesignFinalizationApprovalPacketBlockedByEnv: boolean;
  isReadOnlyDesignFinalizationApprovalPacketBlockedByChannel: boolean;
  isReadOnlyDesignFinalizationApprovalPacketBlockedByProductLookup: boolean;
  isReadOnlyDesignFinalizationApprovalRequired: true;
  isReadOnlyDesignFinalizationApprovalGranted: false;
  isUserApprovalPhraseReceivedForReadOnlyDesignFinalization: false;
  isReadOnlyDesignFinalizationExecutedInThisTask: false;
  isDesignBlueprintFinalized: false;
  isDesignBlueprintApprovedForExecution: false;
  isExecutionApprovalGranted: false;
  approvalPacketSummary: string;
  blockingReason: string | null;
  requiredUserApprovalPhrase: string;
  packetItems: NaverReadOnlyDesignFinalizationApprovalPacketItem[];
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
}

const OUTCOME_TO_APPROVAL_PACKET: Record<
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
  NaverReadOnlyDesignFinalizationApprovalPacketStatus
> = {
  CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY:
    'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
  CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE:
    'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
  CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP:
    'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
  CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN:
    'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
  CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV:
    'APPROVAL_PACKET_BLOCKED_BY_ENV',
  CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL:
    'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
  CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP:
    'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
};

const ALLOWED_OUTCOME_STATUSES = Object.keys(
  OUTCOME_TO_APPROVAL_PACKET
) as NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus[];

const REQUIRED_USER_APPROVAL_PHRASE =
  'Task 293에서 Naver read-only 설계 확정을 승인합니다. Task 289 설계안 블루프린트를 확정 후보로 표시만 하고, Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write는 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요. 설계 확정은 실행 승인이나 상품 변경 승인이 아닙니다.';

function buildApprovalPacketSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): { approvalPacketSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      approvalPacketSummary:
        'Task 291 인증 결과가 COMPLETE이므로 read-only 설계 확정 승인 요청 패킷을 표시할 수 있습니다. 단, 사용자 별도 승인 전까지 실제 설계 확정은 수행하지 않습니다.',
      blockingReason: null,
    };
  }

  if (input.isPartial) {
    return {
      approvalPacketSummary:
        'Task 291 인증 결과가 PARTIAL이므로 missing field notice를 포함한 read-only 설계 확정 승인 요청 패킷을 표시할 수 있습니다.',
      blockingReason: null,
    };
  }

  if (input.isBlocked) {
    return {
      approvalPacketSummary:
        'Task 291 인증 결과가 차단 상태이므로 read-only 설계 확정 승인 요청 패킷은 차단 원인 안내 중심으로만 표시됩니다.',
      blockingReason:
        '차단 원인 보정 전까지 승인 요청 가능 상태로 전환되지 않습니다.',
    };
  }

  return {
    approvalPacketSummary:
      'read-only 설계 확정 승인 요청 패킷 상태를 표시합니다.',
    blockingReason: null,
  };
}

function buildPacketItems(input: {
  outcomeStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus;
  approvalPacketStatus: NaverReadOnlyDesignFinalizationApprovalPacketStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlockedByGwIp: boolean;
  isBlockedByToken: boolean;
  isBlockedByEnv: boolean;
  isBlockedByChannel: boolean;
  isBlockedByProductLookup: boolean;
}): NaverReadOnlyDesignFinalizationApprovalPacketItem[] {
  return [
    {
      packetItem: 'Task 291 Outcome Certification',
      status: 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 291 인증 결과를 확인했습니다.',
    },
    {
      packetItem: 'Task 290 Safety Audit Seal',
      status: 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: '설계안 안전 감사 봉인을 확인했습니다.',
    },
    {
      packetItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: '설계안 블루프린트를 확인했습니다.',
    },
    {
      packetItem: 'Task 288 Planning Candidate',
      status: 'PLANNING_CANDIDATE_CONFIRMED',
      meaning: '확장 설계 후보를 확인했습니다.',
    },
    {
      packetItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      packetItem: 'Approval Packet 상태',
      status: 'APPROVAL_PACKET_STATUS_RECORDED',
      meaning: `approvalPacket=${input.approvalPacketStatus}, outcome=${input.outcomeStatus}`,
    },
    {
      packetItem: 'COMPLETE 설계안',
      status: 'READY_FOR_FINALIZATION_IF_COMPLETE_BLUEPRINT',
      meaning: input.isComplete
        ? 'COMPLETE이면 설계 확정 승인 요청 패킷 표시가 가능합니다.'
        : '현재 COMPLETE 설계안 승인 요청 가능 상태는 아닙니다.',
    },
    {
      packetItem: 'PARTIAL 설계안',
      status: 'READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'PARTIAL이면 누락 필드 안내 포함 설계 확정 승인 요청 패킷 표시가 가능합니다.'
        : '현재 PARTIAL 설계안 승인 요청 가능 상태는 아닙니다.',
    },
    {
      packetItem: 'GW IP 차단',
      status: 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning: input.isBlockedByGwIp
        ? 'IP 허용 목록 재확인이 필요합니다.'
        : '현재 GW IP 차단 상태는 아닙니다.',
    },
    {
      packetItem: 'Token 실패 차단',
      status: 'BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning: input.isBlockedByToken
        ? '인증/권한 재확인이 필요합니다.'
        : '현재 Token 실패 차단 상태는 아닙니다.',
    },
    {
      packetItem: 'Env 누락 차단',
      status: 'BLOCKED_RECHECK_ENV_REQUIRED',
      meaning: input.isBlockedByEnv
        ? 'Env/Auth 재확인이 필요합니다.'
        : '현재 Env 누락 차단 상태는 아닙니다.',
    },
    {
      packetItem: '상품번호 누락 차단',
      status: 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning: input.isBlockedByChannel
        ? 'channelProductNo 확인이 필요합니다.'
        : '현재 상품번호 누락 차단 상태는 아닙니다.',
    },
    {
      packetItem: '상품 조회 실패 차단',
      status: 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning: input.isBlockedByProductLookup
        ? '상품/스토어 접근 확인이 필요합니다.'
        : '현재 상품 조회 실패 차단 상태는 아닙니다.',
    },
    {
      packetItem: '사용자 별도 승인',
      status: 'PENDING_USER_APPROVAL',
      meaning: '아직 사용자 승인 전이며 이번 Task에서는 승인으로 처리하지 않습니다.',
    },
    {
      packetItem: '실제 설계 확정',
      status: 'LOCKED_UNTIL_USER_APPROVAL',
      meaning: '사용자 승인 전까지 실제 설계 확정은 잠금 상태입니다.',
    },
    {
      packetItem: '설계 확정',
      status: 'NOT_FINALIZED',
      meaning: '이번 Task에서 설계 확정을 수행하지 않습니다.',
    },
    {
      packetItem: '실행 승인',
      status: 'NOT_APPROVED_FOR_EXECUTION',
      meaning: '이번 Task는 실행 승인 단계가 아닙니다.',
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
      meaning: 'Authorization 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급을 수행하지 않습니다.',
    },
    {
      packetItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출을 수행하지 않습니다.',
    },
    {
      packetItem: '상품 수정 API 호출',
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
      meaning: 'DB 변경을 수행하지 않습니다.',
    },
    {
      packetItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로가 없습니다.',
    },
    {
      packetItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 292는 승인 요청 패킷 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyDesignFinalizationApprovalPacketView(input: {
  blueprintOutcomeCertification: any;
  blueprintSafetyAuditSeal: any;
  designBlueprint: any;
  planningApprovalPacket: any;
  captureResult: any;
}): NaverReadOnlyDesignFinalizationApprovalPacketView {
  const outcomeCertification = input?.blueprintOutcomeCertification ?? null;
  const rawOutcomeStatus =
    outcomeCertification?.optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus;
  const optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus =
    ALLOWED_OUTCOME_STATUSES.includes(rawOutcomeStatus)
      ? rawOutcomeStatus
      : 'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP';

  const readOnlyDesignFinalizationApprovalPacketStatus =
    OUTCOME_TO_APPROVAL_PACKET[
      optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus
    ];

  const isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint =
    readOnlyDesignFinalizationApprovalPacketStatus ===
    'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT';
  const isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice =
    readOnlyDesignFinalizationApprovalPacketStatus ===
    'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE';
  const isReadOnlyDesignFinalizationApprovalPacketBlockedByGwIp =
    readOnlyDesignFinalizationApprovalPacketStatus ===
    'APPROVAL_PACKET_BLOCKED_BY_GW_IP';
  const isReadOnlyDesignFinalizationApprovalPacketBlockedByToken =
    readOnlyDesignFinalizationApprovalPacketStatus ===
    'APPROVAL_PACKET_BLOCKED_BY_TOKEN';
  const isReadOnlyDesignFinalizationApprovalPacketBlockedByEnv =
    readOnlyDesignFinalizationApprovalPacketStatus ===
    'APPROVAL_PACKET_BLOCKED_BY_ENV';
  const isReadOnlyDesignFinalizationApprovalPacketBlockedByChannel =
    readOnlyDesignFinalizationApprovalPacketStatus ===
    'APPROVAL_PACKET_BLOCKED_BY_CHANNEL';
  const isReadOnlyDesignFinalizationApprovalPacketBlockedByProductLookup =
    readOnlyDesignFinalizationApprovalPacketStatus ===
    'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP';

  const { approvalPacketSummary, blockingReason } = buildApprovalPacketSummary({
    isComplete:
      isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint,
    isPartial:
      isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice,
    isBlocked:
      isReadOnlyDesignFinalizationApprovalPacketBlockedByGwIp ||
      isReadOnlyDesignFinalizationApprovalPacketBlockedByToken ||
      isReadOnlyDesignFinalizationApprovalPacketBlockedByEnv ||
      isReadOnlyDesignFinalizationApprovalPacketBlockedByChannel ||
      isReadOnlyDesignFinalizationApprovalPacketBlockedByProductLookup,
  });

  return {
    status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_APPROVAL_PACKET_READY',
    panelTitle: 'Task 292 - Read-Only Design Finalization Approval Packet',
    description:
      'Task 292는 read-only 설계 확정 단계로 진입하기 위한 승인 요청 패킷입니다. COMPLETE 또는 PARTIAL 상태에서는 다음 단계 승인 요청이 가능하지만, 사용자 별도 승인 전까지 설계 확정을 수행하지 않습니다. 이번 Task는 실행 승인이나 상품 변경 승인이 아닙니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    currentTaskNumber: 292,
    referenceTaskNumbers: [291, 290, 289, 288, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyDesignFinalizationApprovalPacketReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionPlanningApprovalPacketReady:
      true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
    readOnlyDesignFinalizationApprovalPacketStatus,
    isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint,
    isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice,
    isReadOnlyDesignFinalizationApprovalPacketBlockedByGwIp,
    isReadOnlyDesignFinalizationApprovalPacketBlockedByToken,
    isReadOnlyDesignFinalizationApprovalPacketBlockedByEnv,
    isReadOnlyDesignFinalizationApprovalPacketBlockedByChannel,
    isReadOnlyDesignFinalizationApprovalPacketBlockedByProductLookup,
    isReadOnlyDesignFinalizationApprovalRequired: true,
    isReadOnlyDesignFinalizationApprovalGranted: false,
    isUserApprovalPhraseReceivedForReadOnlyDesignFinalization: false,
    isReadOnlyDesignFinalizationExecutedInThisTask: false,
    isDesignBlueprintFinalized: false,
    isDesignBlueprintApprovedForExecution: false,
    isExecutionApprovalGranted: false,
    approvalPacketSummary,
    blockingReason,
    requiredUserApprovalPhrase: REQUIRED_USER_APPROVAL_PHRASE,
    packetItems: buildPacketItems({
      outcomeStatus:
        optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
      approvalPacketStatus: readOnlyDesignFinalizationApprovalPacketStatus,
      isComplete:
        isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint,
      isPartial:
        isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice,
      isBlockedByGwIp: isReadOnlyDesignFinalizationApprovalPacketBlockedByGwIp,
      isBlockedByToken:
        isReadOnlyDesignFinalizationApprovalPacketBlockedByToken,
      isBlockedByEnv: isReadOnlyDesignFinalizationApprovalPacketBlockedByEnv,
      isBlockedByChannel:
        isReadOnlyDesignFinalizationApprovalPacketBlockedByChannel,
      isBlockedByProductLookup:
        isReadOnlyDesignFinalizationApprovalPacketBlockedByProductLookup,
    }),
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
  };
}
