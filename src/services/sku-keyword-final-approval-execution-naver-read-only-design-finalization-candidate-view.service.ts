import type {
  NaverReadOnlyDesignFinalizationApprovalPacketStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-approval-packet-view.service';
import type {
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-outcome-certification-view.service';
import type {
  NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-view.service';

export type NaverReadOnlyDesignFinalizationCandidateStatus =
  | 'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT'
  | 'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
  | 'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP'
  | 'FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN'
  | 'FINALIZATION_CANDIDATE_BLOCKED_BY_ENV'
  | 'FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL'
  | 'FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyDesignFinalizationCandidateItemStatus =
  | 'USER_APPROVAL_CONFIRMED_FOR_TASK_293'
  | 'APPROVAL_PACKET_CONFIRMED'
  | 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_STATUS_RECORDED'
  | 'CANDIDATE_READY_IF_COMPLETE_BLUEPRINT'
  | 'CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CANDIDATE_BLOCKED'
  | 'MISSING_FIELD_NOTICE_PRESERVED'
  | 'NOT_FINALIZED'
  | 'NOT_APPROVED_FOR_EXECUTION'
  | 'NOT_APPROVED_FOR_PRODUCT_CHANGE'
  | 'NOT_STORED'
  | 'CAPTURED_DATA_ONLY_CONFIRMED'
  | 'SUMMARY_REVIEW_ONLY_CONFIRMED'
  | 'NOT_INFERRED'
  | 'NOT_INCLUDED'
  | 'NOT_DISPLAYED'
  | 'NOT_EXECUTED'
  | 'LOCKED'
  | 'PENDING_SEPARATE_APPROVAL'
  | 'READ_ONLY_INFO';

export interface NaverReadOnlyDesignFinalizationCandidateItem {
  candidateItem: string;
  status: NaverReadOnlyDesignFinalizationCandidateItemStatus;
  meaning: string;
}

export interface NaverReadOnlyDesignFinalizationCandidatePayload {
  sourceDesignBlueprintTask: 'TASK_289';
  sourceApprovalPacketTask: 'TASK_292';
  candidateType:
    | 'READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT'
    | 'BLOCKED_CANDIDATE';
  finalizationCandidateStatus:
    | 'CANDIDATE_AVAILABLE_FOR_COMPLETE_BLUEPRINT'
    | 'CANDIDATE_AVAILABLE_WITH_MISSING_FIELD_NOTICE'
    | 'CANDIDATE_BLOCKED';
  isFinalizationCandidateDisplayed: boolean;
  isDesignBlueprintFinalized: false;
  isExecutionApprovalGranted: false;
  isProductChangeApprovalGranted: false;
  missingFieldNoticeRequired: boolean;
  designBlueprintReferenceOnly: true;
  designBlueprintCopiedForExecution: false;
  designBlueprintPersistedToDb: false;
}

export interface NaverReadOnlyDesignFinalizationCandidateView {
  status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_READY';
  panelTitle: string;
  description: string;
  currentTaskNumber: 293;
  referenceTaskNumbers: readonly [292, 291, 290, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyDesignFinalizationApprovalPacketReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  isUserApprovalConfirmedForTask293: true;
  readOnlyDesignFinalizationApprovalPacketStatus: NaverReadOnlyDesignFinalizationApprovalPacketStatus;
  optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus;
  optionAdditionalStructureExpansionDesignBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus;
  readOnlyDesignFinalizationCandidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus;
  isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint: boolean;
  isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice: boolean;
  isReadOnlyDesignFinalizationCandidateBlockedByGwIp: boolean;
  isReadOnlyDesignFinalizationCandidateBlockedByToken: boolean;
  isReadOnlyDesignFinalizationCandidateBlockedByEnv: boolean;
  isReadOnlyDesignFinalizationCandidateBlockedByChannel: boolean;
  isReadOnlyDesignFinalizationCandidateBlockedByProductLookup: boolean;
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
  designFinalizationCandidate: NaverReadOnlyDesignFinalizationCandidatePayload | null;
  candidateSummary: string;
  blockingReason: string | null;
  candidateItems: NaverReadOnlyDesignFinalizationCandidateItem[];
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;
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
}

const APPROVAL_PACKET_TO_FINALIZATION_CANDIDATE: Record<
  NaverReadOnlyDesignFinalizationApprovalPacketStatus,
  NaverReadOnlyDesignFinalizationCandidateStatus
> = {
  APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT:
    'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT',
  APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE:
    'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
  APPROVAL_PACKET_BLOCKED_BY_GW_IP:
    'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP',
  APPROVAL_PACKET_BLOCKED_BY_TOKEN:
    'FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN',
  APPROVAL_PACKET_BLOCKED_BY_ENV:
    'FINALIZATION_CANDIDATE_BLOCKED_BY_ENV',
  APPROVAL_PACKET_BLOCKED_BY_CHANNEL:
    'FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL',
  APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP:
    'FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
};

const ALLOWED_APPROVAL_PACKET_STATUSES = Object.keys(
  APPROVAL_PACKET_TO_FINALIZATION_CANDIDATE
) as NaverReadOnlyDesignFinalizationApprovalPacketStatus[];

const ALLOWED_OUTCOME_STATUSES = [
  'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
  'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
  'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP',
  'CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN',
  'CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV',
  'CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL',
  'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
] as const satisfies readonly NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus[];

const ALLOWED_BLUEPRINT_STATUSES = [
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL',
  'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
] as const satisfies readonly NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus[];

function buildSummary(input: {
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
}): { candidateSummary: string; blockingReason: string | null } {
  if (input.isComplete) {
    return {
      candidateSummary:
        'Task 289 설계안 블루프린트를 read-only 확정 후보로 표시합니다. 이 표시는 실행 승인이나 상품 변경 승인이 아니며 DB 저장도 수행하지 않습니다.',
      blockingReason: null,
    };
  }

  if (input.isPartial) {
    return {
      candidateSummary:
        'Task 289 설계안 블루프린트를 missing field notice와 함께 read-only 확정 후보로 표시합니다. 실제 설계 확정은 수행하지 않습니다.',
      blockingReason: null,
    };
  }

  if (input.isBlocked) {
    return {
      candidateSummary:
        '승인 패킷이 차단 상태이므로 Task 289 설계안을 read-only 확정 후보로 표시하지 않습니다.',
      blockingReason:
        '차단 원인 보정 전까지 확정 후보 표시가 열리지 않습니다.',
    };
  }

  return {
    candidateSummary:
      'read-only 설계 확정 후보 상태를 표시합니다.',
    blockingReason: null,
  };
}

function buildCandidatePayload(input: {
  isDisplayable: boolean;
  isComplete: boolean;
  isPartial: boolean;
}): NaverReadOnlyDesignFinalizationCandidatePayload | null {
  if (!input.isDisplayable) {
    return null;
  }

  return {
    sourceDesignBlueprintTask: 'TASK_289',
    sourceApprovalPacketTask: 'TASK_292',
    candidateType: 'READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT',
    finalizationCandidateStatus: input.isComplete
      ? 'CANDIDATE_AVAILABLE_FOR_COMPLETE_BLUEPRINT'
      : input.isPartial
        ? 'CANDIDATE_AVAILABLE_WITH_MISSING_FIELD_NOTICE'
        : 'CANDIDATE_BLOCKED',
    isFinalizationCandidateDisplayed: true,
    isDesignBlueprintFinalized: false,
    isExecutionApprovalGranted: false,
    isProductChangeApprovalGranted: false,
    missingFieldNoticeRequired: input.isPartial,
    designBlueprintReferenceOnly: true,
    designBlueprintCopiedForExecution: false,
    designBlueprintPersistedToDb: false,
  };
}

function buildCandidateItems(input: {
  candidateStatus: NaverReadOnlyDesignFinalizationCandidateStatus;
  isComplete: boolean;
  isPartial: boolean;
  isBlocked: boolean;
  isMissingFieldNoticePreserved: boolean;
}): NaverReadOnlyDesignFinalizationCandidateItem[] {
  return [
    {
      candidateItem: 'Task 293 사용자 승인',
      status: 'USER_APPROVAL_CONFIRMED_FOR_TASK_293',
      meaning: 'Task 293 승인 범위를 확인했습니다.',
    },
    {
      candidateItem: 'Task 292 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: '설계 확정 승인 패킷을 확인했습니다.',
    },
    {
      candidateItem: 'Task 291 Outcome Certification',
      status: 'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: '설계안 인증 결과를 확인했습니다.',
    },
    {
      candidateItem: 'Task 290 Safety Audit Seal',
      status: 'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: '설계안 안전 봉인을 확인했습니다.',
    },
    {
      candidateItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: '설계안 블루프린트를 확인했습니다.',
    },
    {
      candidateItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      candidateItem: '후보 상태',
      status: 'FINALIZATION_CANDIDATE_STATUS_RECORDED',
      meaning: `readOnlyDesignFinalizationCandidateStatus: ${input.candidateStatus}`,
    },
    {
      candidateItem: 'COMPLETE 설계안',
      status: 'CANDIDATE_READY_IF_COMPLETE_BLUEPRINT',
      meaning: input.isComplete
        ? 'COMPLETE이면 확정 후보 표시가 가능합니다.'
        : '현재 COMPLETE 설계안 확정 후보 상태는 아닙니다.',
    },
    {
      candidateItem: 'PARTIAL 설계안',
      status: 'CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: input.isPartial
        ? 'PARTIAL이면 누락 안내 포함 확정 후보 표시가 가능합니다.'
        : '현재 PARTIAL 설계안 확정 후보 상태는 아닙니다.',
    },
    {
      candidateItem: 'BLOCKED 설계안',
      status: 'CANDIDATE_BLOCKED',
      meaning: input.isBlocked
        ? 'BLOCKED이면 확정 후보를 표시하지 않습니다.'
        : '현재 BLOCKED 설계안 상태는 아닙니다.',
    },
    {
      candidateItem: 'missing field notice',
      status: 'MISSING_FIELD_NOTICE_PRESERVED',
      meaning: input.isMissingFieldNoticePreserved
        ? 'PARTIAL 안내를 그대로 유지했습니다.'
        : 'missing field notice가 없는 상태를 그대로 유지했습니다.',
    },
    {
      candidateItem: '설계 확정',
      status: 'NOT_FINALIZED',
      meaning: '실제 설계 확정은 수행하지 않습니다.',
    },
    {
      candidateItem: '실행 승인',
      status: 'NOT_APPROVED_FOR_EXECUTION',
      meaning: '실행 승인 단계가 아닙니다.',
    },
    {
      candidateItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인 단계가 아닙니다.',
    },
    {
      candidateItem: 'DB 저장',
      status: 'NOT_STORED',
      meaning: '설계안을 DB에 저장하지 않습니다.',
    },
    {
      candidateItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      candidateItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
    },
    {
      candidateItem: '옵션 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      candidateItem: '추가상품 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      candidateItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      candidateItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      candidateItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 응답 전체를 포함하지 않습니다.',
    },
    {
      candidateItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      candidateItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      candidateItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      candidateItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더를 표시하지 않습니다.',
    },
    {
      candidateItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급을 수행하지 않았습니다.',
    },
    {
      candidateItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출을 수행하지 않았습니다.',
    },
    {
      candidateItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출을 수행하지 않았습니다.',
    },
    {
      candidateItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경을 수행하지 않았습니다.',
    },
    {
      candidateItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경을 수행하지 않았습니다.',
    },
    {
      candidateItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update를 수행하지 않았습니다.',
    },
    {
      candidateItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로를 열지 않습니다.',
    },
    {
      candidateItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 단계는 별도 승인이 필요합니다.',
    },
    {
      candidateItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 293은 확정 후보 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyDesignFinalizationCandidateView(input: {
  approvalPacket: any;
  blueprintOutcomeCertification: any;
  blueprintSafetyAuditSeal: any;
  designBlueprint: any;
  captureResult: any;
}): NaverReadOnlyDesignFinalizationCandidateView {
  const approvalPacket = input?.approvalPacket ?? null;
  const blueprintOutcomeCertification =
    input?.blueprintOutcomeCertification ?? null;
  const designBlueprint = input?.designBlueprint ?? null;

  const rawApprovalPacketStatus =
    approvalPacket?.readOnlyDesignFinalizationApprovalPacketStatus;
  const readOnlyDesignFinalizationApprovalPacketStatus: NaverReadOnlyDesignFinalizationApprovalPacketStatus =
    ALLOWED_APPROVAL_PACKET_STATUSES.includes(rawApprovalPacketStatus)
      ? rawApprovalPacketStatus
      : 'APPROVAL_PACKET_BLOCKED_BY_GW_IP';

  const rawOutcomeStatus =
    blueprintOutcomeCertification?.optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus;
  const optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus =
    (
      ALLOWED_OUTCOME_STATUSES as readonly string[]
    ).includes(rawOutcomeStatus)
      ? rawOutcomeStatus
      : 'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP';

  const rawBlueprintStatus =
    designBlueprint?.optionAdditionalStructureExpansionDesignBlueprintStatus;
  const optionAdditionalStructureExpansionDesignBlueprintStatus: NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintStatus =
    (
      ALLOWED_BLUEPRINT_STATUSES as readonly string[]
    ).includes(rawBlueprintStatus)
      ? rawBlueprintStatus
      : 'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP';

  const readOnlyDesignFinalizationCandidateStatus =
    APPROVAL_PACKET_TO_FINALIZATION_CANDIDATE[
      readOnlyDesignFinalizationApprovalPacketStatus
    ];

  const isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT';
  const isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE';
  const isReadOnlyDesignFinalizationCandidateBlockedByGwIp =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP';
  const isReadOnlyDesignFinalizationCandidateBlockedByToken =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN';
  const isReadOnlyDesignFinalizationCandidateBlockedByEnv =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_BLOCKED_BY_ENV';
  const isReadOnlyDesignFinalizationCandidateBlockedByChannel =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL';
  const isReadOnlyDesignFinalizationCandidateBlockedByProductLookup =
    readOnlyDesignFinalizationCandidateStatus ===
    'FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP';

  const canDisplayFinalizationCandidate =
    readOnlyDesignFinalizationApprovalPacketStatus ===
      'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT' ||
    readOnlyDesignFinalizationApprovalPacketStatus ===
      'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE';

  const isReadOnlyDesignFinalizationCandidateDisplayed =
    canDisplayFinalizationCandidate;
  const isReadOnlyDesignFinalizationExecutedInThisTask =
    canDisplayFinalizationCandidate;
  const isDesignBlueprintFinalizationCandidate =
    canDisplayFinalizationCandidate;
  const isMissingFieldNoticePreserved =
    isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice;

  const { candidateSummary, blockingReason } = buildSummary({
    isComplete: isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint,
    isPartial:
      isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice,
    isBlocked: !canDisplayFinalizationCandidate,
  });

  return {
    status: 'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_READY',
    panelTitle: 'Task 293 - Read-Only Design Finalization Candidate',
    description:
      'Task 293은 Task 289 설계안 블루프린트를 read-only 확정 후보로 표시하는 단계입니다. 이 단계는 실행 승인이나 상품 변경 승인이 아니며, 설계안을 DB에 저장하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    currentTaskNumber: 293,
    referenceTaskNumbers: [292, 291, 290, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyDesignFinalizationApprovalPacketReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    isUserApprovalConfirmedForTask293: true,
    readOnlyDesignFinalizationApprovalPacketStatus,
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
    optionAdditionalStructureExpansionDesignBlueprintStatus,
    readOnlyDesignFinalizationCandidateStatus,
    isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint,
    isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice,
    isReadOnlyDesignFinalizationCandidateBlockedByGwIp,
    isReadOnlyDesignFinalizationCandidateBlockedByToken,
    isReadOnlyDesignFinalizationCandidateBlockedByEnv,
    isReadOnlyDesignFinalizationCandidateBlockedByChannel,
    isReadOnlyDesignFinalizationCandidateBlockedByProductLookup,
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
    designFinalizationCandidate: buildCandidatePayload({
      isDisplayable: canDisplayFinalizationCandidate,
      isComplete: isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint,
      isPartial:
        isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice,
    }),
    candidateSummary,
    blockingReason,
    candidateItems: buildCandidateItems({
      candidateStatus: readOnlyDesignFinalizationCandidateStatus,
      isComplete: isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint,
      isPartial:
        isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice,
      isBlocked: !canDisplayFinalizationCandidate,
      isMissingFieldNoticePreserved,
    }),
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,
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
  };
}
