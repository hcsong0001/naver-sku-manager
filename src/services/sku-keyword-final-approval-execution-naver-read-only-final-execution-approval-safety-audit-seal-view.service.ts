import type {
  NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-review-outcome-certification-view.service';

export type NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyFinalExecutionApprovalSafetyAuditSealItemStatus =
  | 'FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY'
  | 'FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'FINAL_EXECUTION_APPROVAL_REVIEW_CONFIRMED'
  | 'FINAL_EXECUTION_APPROVAL_PACKET_CONFIRMED'
  | 'EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'EXECUTION_READINESS_REVIEW_CONFIRMED'
  | 'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED'
  | 'EXECUTION_APPROVAL_REVIEW_CONFIRMED'
  | 'EXECUTION_APPROVAL_PACKET_CONFIRMED'
  | 'FINALIZATION_CANDIDATE_CONFIRMED'
  | 'DESIGN_BLUEPRINT_CONFIRMED'
  | 'CAPTURE_RESULT_CONFIRMED'
  | 'SAFETY_AUDIT_SEAL_STATUS_RECORDED'
  | 'SEAL_READY_IF_COMPLETE'
  | 'SEAL_READY_WITH_MISSING_FIELD_NOTICE'
  | 'SEAL_BLOCKED_RECHECK_REQUIRED'
  | 'SEAL_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'SEAL_BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'SEAL_BLOCKED_RECHECK_ENV_REQUIRED'
  | 'SEAL_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'SEAL_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
  | 'PENDING_TASK_308_APPROVAL'
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

export interface NaverReadOnlyFinalExecutionApprovalSafetyAuditSealItem {
  sealItem: string;
  status: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealItemStatus;
  meaning: string;
}

export interface NaverReadOnlyFinalExecutionApprovalSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEALED';
  panelTitle: string;
  description: string;
  taskId: 307;
  taskName: 'Naver Read-Only Final Execution Approval Safety Audit Seal Screen Flow';
  currentTaskNumber: 307;
  referenceTaskNumbers: readonly [306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296, 293, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyFinalExecutionApprovalSafetyAuditSealed: true;
  isNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationReady: true;
  isNaverReadOnlyFinalExecutionApprovalReviewReady: true;
  isNaverReadOnlyFinalExecutionApprovalPacketReady: true;
  isNaverReadOnlyExecutionReadinessReviewOutcomeCertificationReady: true;
  isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed: true;
  isNaverReadOnlyExecutionReadinessReviewReady: true;
  isNaverReadOnlyExecutionReadinessApprovalPacketReady: true;
  isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true;
  isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true;
  isNaverReadOnlyExecutionApprovalReviewReady: true;
  isNaverReadOnlyExecutionApprovalPacketReady: true;
  isNaverReadOnlyDesignFinalizationCandidateReady: true;
  isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  sourceFinalExecutionApprovalReviewOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus;
  finalExecutionApprovalSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus;
  sealSummary: string;
  blockingReason: string | null;
  safetySealItems: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealItem[];
  safetyAuditSealReady: boolean;
  safetyAuditSealPartialReady: boolean;
  safetyAuditSealBlocked: boolean;
  requiresSeparateTask308Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  submitActionAdded: false;
  postApiAdded: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  priceChanged: false;
  stockChanged: false;
  dbWritePerformed: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
  envFileReadOrModified: false;
}

const ALLOWED_CERTIFICATION_STATUSES: NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus[] = [
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_GW_IP',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_TOKEN',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_ENV',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_CHANNEL',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP',
];

export const FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_STATUS_BY_CERTIFICATION_STATUS: Record<
  NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus,
  NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus
> = {
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_GW_IP:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_TOKEN:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_ENV:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_CHANNEL:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP',
};

export const NEXT_TASK_308_APPROVAL_PHRASE =
  'Task 308에서 Naver read-only 최종 실행 승인 Safety Audit Seal 결과 인증을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 최종 실행 승인 안전 감사 Seal 결과를 read-only로 인증하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

function buildSealSummary(input: {
  sealStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus;
  safetyAuditSealReady: boolean;
  safetyAuditSealPartialReady: boolean;
}): { sealSummary: string; blockingReason: string | null } {
  if (input.safetyAuditSealReady) {
    return {
      sealSummary:
        'Task 306 인증 결과(COMPLETE)를 기반으로 안전 조건을 read-only로 봉인했습니다. Task 308 인증 단계 후보입니다.',
      blockingReason: null,
    };
  }
  if (input.safetyAuditSealPartialReady) {
    return {
      sealSummary:
        'Task 306 인증 결과(PARTIAL)를 기반으로 안전 조건을 read-only로 봉인했습니다. 누락 필드 안내를 유지한 채 Task 308 인증 단계 후보입니다.',
      blockingReason: null,
    };
  }
  const reasonMap: Record<NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus, string | null> =
    {
      NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY: null,
      NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY: null,
      NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP:
        'GW IP 차단 상태입니다. IP 허용 목록을 재확인해야 합니다.',
      NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN:
        'Token 인증 실패 상태입니다. 인증/권한을 재확인해야 합니다.',
      NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV:
        'Env 누락 상태입니다. Env/Auth 설정을 재확인해야 합니다.',
      NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL:
        'channelProductNo 누락 상태입니다. 채널 상품번호를 확인해야 합니다.',
      NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP:
        '상품 조회 실패 상태입니다. 상품/스토어 접근을 확인해야 합니다.',
    };
  return {
    sealSummary:
      'Task 306 인증 결과가 차단 상태이므로, 안전 조건 봉인은 원인별 보정 필요 상태입니다.',
    blockingReason: reasonMap[input.sealStatus] ?? '원인 불명 차단 상태입니다.',
  };
}

function buildSafetySealItems(input: {
  certificationStatus: NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus;
  sealStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus;
}): NaverReadOnlyFinalExecutionApprovalSafetyAuditSealItem[] {
  return [
    {
      sealItem: 'Task 307 Final Execution Approval Safety Audit Seal',
      status: 'FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY',
      meaning: `Task 307 read-only 봉인 패널을 구성했습니다. 현재 봉인 상태는 ${input.sealStatus}입니다.`,
    },
    {
      sealItem: 'Task 306 Final Execution Approval Review Outcome Certification',
      status: 'FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: `Task 306 인증 상태(${input.certificationStatus})를 확인했습니다.`,
    },
    {
      sealItem: 'Task 305 Final Execution Approval Review',
      status: 'FINAL_EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: 'Task 305 검토 참조 흐름을 유지합니다.',
    },
    {
      sealItem: 'Task 304 Final Execution Approval Packet',
      status: 'FINAL_EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 304 패킷 참조 흐름을 유지합니다.',
    },
    {
      sealItem: 'Task 303 Outcome Certification',
      status: 'EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 303 인증 참조 흐름을 유지합니다.',
    },
    {
      sealItem: 'Task 302 Safety Audit Seal',
      status: 'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 302 안전 감사 봉인 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 301 Execution Readiness Review',
      status: 'EXECUTION_READINESS_REVIEW_CONFIRMED',
      meaning: 'Task 301 실행 준비 검토 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 300 Execution Readiness Approval Packet',
      status: 'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 300 승인 패킷 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 299 Outcome Certification',
      status: 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 299 인증 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 298 Safety Audit Seal',
      status: 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 298 안전 감사 봉인 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 297 Execution Approval Review',
      status: 'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: 'Task 297 실행 승인 검토 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 296 Execution Approval Packet',
      status: 'EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 296 실행 승인 패킷 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 설계 확정 후보 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: 'Task 289 설계안 블루프린트 참조를 유지합니다.',
    },
    {
      sealItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: 'Task 276 기존 캡처 결과 참조를 유지합니다.',
    },
    {
      sealItem: '봉인 상태 기록',
      status: 'SAFETY_AUDIT_SEAL_STATUS_RECORDED',
      meaning: 'Task 306 인증 상태 7종을 Task 307 봉인 상태 7종으로 1:1 매핑했습니다.',
    },
    {
      sealItem: 'COMPLETE 봉인 가능',
      status: 'SEAL_READY_IF_COMPLETE',
      meaning: 'COMPLETE 계열이면 Task 308 인증 단계 후보입니다.',
    },
    {
      sealItem: 'PARTIAL 봉인 가능',
      status: 'SEAL_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: 'PARTIAL 계열이면 누락 안내 포함 Task 308 인증 단계 후보입니다.',
    },
    {
      sealItem: 'BLOCKED 봉인 차단',
      status: 'SEAL_BLOCKED_RECHECK_REQUIRED',
      meaning: 'BLOCKED 계열이면 원인별 보정이 필요합니다.',
    },
    {
      sealItem: 'GW IP 차단',
      status: 'SEAL_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning: 'GW IP 차단 시 IP 허용 목록 재확인이 필요합니다.',
    },
    {
      sealItem: 'Token 차단',
      status: 'SEAL_BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning: 'Token/Auth 재확인이 필요합니다.',
    },
    {
      sealItem: 'Env 차단',
      status: 'SEAL_BLOCKED_RECHECK_ENV_REQUIRED',
      meaning: 'Env/Auth 설정 재확인이 필요합니다.',
    },
    {
      sealItem: '상품번호 차단',
      status: 'SEAL_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning: 'channelProductNo 재확인이 필요합니다.',
    },
    {
      sealItem: '상품 조회 차단',
      status: 'SEAL_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning: '상품/스토어 접근 재확인이 필요합니다.',
    },
    {
      sealItem: 'Task 308 승인 대기',
      status: 'PENDING_TASK_308_APPROVAL',
      meaning: 'Task 308은 사용자 별도 명시 승인 전까지 진행하지 않습니다.',
    },
    {
      sealItem: '실제 최종 실행 승인',
      status: 'NOT_APPROVED',
      meaning: '실제 최종 실행 승인은 부여되지 않았습니다.',
    },
    {
      sealItem: '실제 실행 승인/실행',
      status: 'NOT_EXECUTED',
      meaning: '실제 실행 승인과 실제 실행은 모두 수행되지 않았습니다.',
    },
    {
      sealItem: '버튼/submit/POST',
      status: 'NOT_CONNECTED',
      meaning: '실행 버튼, submit action, POST API는 추가하지 않았습니다.',
    },
    {
      sealItem: 'Worker/Queue/Adapter',
      status: 'LOCKED',
      meaning: 'Worker / Queue / Adapter 실행 경로는 연결하지 않았습니다.',
    },
    {
      sealItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인은 부여되지 않았습니다.',
    },
    {
      sealItem: 'DB 저장',
      status: 'NOT_STORED',
      meaning: 'DB 저장/쓰기 작업은 수행하지 않았습니다.',
    },
    {
      sealItem: '실행용 복사',
      status: 'NOT_COPIED_FOR_EXECUTION',
      meaning: '설계안 또는 승인 결과를 실행용으로 복사하지 않았습니다.',
    },
    {
      sealItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '기존 캡처 데이터만 사용했습니다.',
    },
    {
      sealItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
    },
    {
      sealItem: '구조 임의 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션/추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      sealItem: '원본 값 포함',
      status: 'NOT_INCLUDED',
      meaning: '가격/재고 원본 값과 raw API response를 포함하지 않았습니다.',
    },
    {
      sealItem: '민감값 노출',
      status: 'NOT_DISPLAYED',
      meaning: 'Token/Auth/Signature/Authorization 값은 표시하지 않았습니다.',
    },
    {
      sealItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 307은 최종 실행 승인 전 안전 조건을 read-only로 봉인하는 단계입니다.',
    },
  ];
}

export function buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(input: {
  finalExecutionApprovalReviewOutcomeCertification: {
    finalExecutionApprovalReviewOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus;
  };
}): NaverReadOnlyFinalExecutionApprovalSafetyAuditSealView {
  const sourceFinalExecutionApprovalReviewOutcomeCertificationStatus =
    input.finalExecutionApprovalReviewOutcomeCertification
      .finalExecutionApprovalReviewOutcomeCertificationStatus;

  if (
    !ALLOWED_CERTIFICATION_STATUSES.includes(
      sourceFinalExecutionApprovalReviewOutcomeCertificationStatus
    )
  ) {
    throw new Error(
      `Unsupported final execution approval review outcome certification status: ${sourceFinalExecutionApprovalReviewOutcomeCertificationStatus}`
    );
  }

  const finalExecutionApprovalSafetyAuditSealStatus =
    FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_STATUS_BY_CERTIFICATION_STATUS[
      sourceFinalExecutionApprovalReviewOutcomeCertificationStatus
    ];

  const safetyAuditSealReady =
    finalExecutionApprovalSafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY';
  const safetyAuditSealPartialReady =
    finalExecutionApprovalSafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY';
  const safetyAuditSealBlocked = !safetyAuditSealReady && !safetyAuditSealPartialReady;

  const { sealSummary, blockingReason } = buildSealSummary({
    sealStatus: finalExecutionApprovalSafetyAuditSealStatus,
    safetyAuditSealReady,
    safetyAuditSealPartialReady,
  });

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEALED',
    panelTitle: 'Task 307 - Read-Only Final Execution Approval Safety Audit Seal',
    description:
      'Task 307은 Task 306 인증 결과를 바탕으로 최종 실행 승인 전 안전 조건을 read-only로 봉인하는 단계입니다. 이 패널은 실제 최종 실행 승인, 실제 실행 승인, 실제 실행, 상품 변경 승인, 실행 버튼 추가, POST / submit action 추가, Worker / Queue / Adapter 연결이 아닙니다.',
    taskId: 307,
    taskName: 'Naver Read-Only Final Execution Approval Safety Audit Seal Screen Flow',
    currentTaskNumber: 307,
    referenceTaskNumbers: [306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296, 293, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyFinalExecutionApprovalSafetyAuditSealed: true,
    isNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationReady: true,
    isNaverReadOnlyFinalExecutionApprovalReviewReady: true,
    isNaverReadOnlyFinalExecutionApprovalPacketReady: true,
    isNaverReadOnlyExecutionReadinessReviewOutcomeCertificationReady: true,
    isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed: true,
    isNaverReadOnlyExecutionReadinessReviewReady: true,
    isNaverReadOnlyExecutionReadinessApprovalPacketReady: true,
    isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady: true,
    isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed: true,
    isNaverReadOnlyExecutionApprovalReviewReady: true,
    isNaverReadOnlyExecutionApprovalPacketReady: true,
    isNaverReadOnlyDesignFinalizationCandidateReady: true,
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    sourceFinalExecutionApprovalReviewOutcomeCertificationStatus,
    finalExecutionApprovalSafetyAuditSealStatus,
    sealSummary,
    blockingReason,
    safetySealItems: buildSafetySealItems({
      certificationStatus: sourceFinalExecutionApprovalReviewOutcomeCertificationStatus,
      sealStatus: finalExecutionApprovalSafetyAuditSealStatus,
    }),
    safetyAuditSealReady,
    safetyAuditSealPartialReady,
    safetyAuditSealBlocked,
    requiresSeparateTask308Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_308_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritePerformed: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    envFileReadOrModified: false,
  };
}
