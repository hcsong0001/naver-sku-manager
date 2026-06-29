import type {
  NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-safety-audit-seal-view.service';

export type NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_GW_IP'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_TOKEN'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_ENV'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_CHANNEL'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP';

export type NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationItemStatus =
  | 'FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_READY'
  | 'FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_CONFIRMED'
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
  | 'SEAL_OUTCOME_CERTIFICATION_STATUS_RECORDED'
  | 'SEAL_OUTCOME_CERTIFIED_READY_IF_COMPLETE'
  | 'SEAL_OUTCOME_CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE'
  | 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_REQUIRED'
  | 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
  | 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED'
  | 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED'
  | 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
  | 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
  | 'PENDING_TASK_309_APPROVAL'
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

export interface NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationItem {
  certificationItem: string;
  status: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationItemStatus;
  meaning: string;
}

export interface NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_READY';
  panelTitle: string;
  description: string;
  taskId: 308;
  taskName: 'Naver Read-Only Final Execution Approval Safety Audit Seal Outcome Certification Screen Flow';
  currentTaskNumber: 308;
  referenceTaskNumbers: readonly [307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296, 293, 289, 276];
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationReady: true;
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
  sourceFinalExecutionApprovalSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus;
  finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus;
  certificationSummary: string;
  blockingReason: string | null;
  certificationItems: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationItem[];
  sealOutcomeCertifiedReady: boolean;
  sealOutcomeCertifiedPartialReady: boolean;
  sealOutcomeCertificationBlocked: boolean;
  requiresSeparateTask309Approval: true;
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

const ALLOWED_SEAL_STATUSES: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus[] = [
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL',
  'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP',
];

export const FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_STATUS_BY_SEAL_STATUS: Record<
  NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus,
  NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus
> = {
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_GW_IP',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_TOKEN',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_ENV',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_CHANNEL',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP',
};

export const NEXT_TASK_309_APPROVAL_PHRASE =
  'Task 309에서 Naver read-only 최종 실행 승인 준비 요약 대시보드 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 지금까지의 read-only 승인·검토·인증·안전 봉인 결과를 한 화면에서 요약하는 대시보드 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

function buildCertificationSummary(input: {
  certificationStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus;
  sealOutcomeCertifiedReady: boolean;
  sealOutcomeCertifiedPartialReady: boolean;
}): { certificationSummary: string; blockingReason: string | null } {
  if (input.sealOutcomeCertifiedReady) {
    return {
      certificationSummary:
        'Task 307 안전 감사 Seal 결과(COMPLETE)를 read-only로 인증했습니다. 다음 준비 요약 대시보드 단계 후보로 넘길 수 있는 상태입니다.',
      blockingReason: null,
    };
  }
  if (input.sealOutcomeCertifiedPartialReady) {
    return {
      certificationSummary:
        'Task 307 안전 감사 Seal 결과(PARTIAL)를 read-only로 인증했습니다. 누락 필드 안내를 유지한 채 다음 준비 요약 대시보드 단계 후보로 넘길 수 있는 상태입니다.',
      blockingReason: null,
    };
  }
  const reasonMap: Record<
    NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus,
    string | null
  > = {
    NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY: null,
    NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY:
      null,
    NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_GW_IP:
      'GW IP 차단 상태입니다. IP 허용 목록을 재확인해야 합니다.',
    NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_TOKEN:
      'Token 인증 실패 상태입니다. 인증/권한을 재확인해야 합니다.',
    NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_ENV:
      'Env 누락 상태입니다. Env/Auth 설정을 재확인해야 합니다.',
    NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_CHANNEL:
      'channelProductNo 누락 상태입니다. 채널 상품번호를 확인해야 합니다.',
    NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP:
      '상품 조회 실패 상태입니다. 상품/스토어 접근을 확인해야 합니다.',
  };
  return {
    certificationSummary:
      'Task 307 안전 감사 Seal 결과가 차단 상태이므로, 인증 결과는 원인별 보정 필요 상태만 표시합니다.',
    blockingReason:
      reasonMap[input.certificationStatus] ?? '원인 불명 차단 상태입니다.',
  };
}

function buildCertificationItems(input: {
  sealStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus;
  certificationStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus;
}): NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationItem[] {
  return [
    {
      certificationItem: 'Task 308 Safety Audit Seal Outcome Certification',
      status: 'FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_READY',
      meaning: `Task 308 read-only 인증 패널을 구성했습니다. 현재 인증 상태는 ${input.certificationStatus}입니다.`,
    },
    {
      certificationItem: 'Task 307 Safety Audit Seal',
      status: 'FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: `Task 307 봉인 상태(${input.sealStatus})를 확인했습니다.`,
    },
    {
      certificationItem: 'Task 306 Outcome Certification',
      status: 'FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 306 인증 참조 흐름을 유지합니다.',
    },
    {
      certificationItem: 'Task 305 Final Execution Approval Review',
      status: 'FINAL_EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: 'Task 305 검토 참조 흐름을 유지합니다.',
    },
    {
      certificationItem: 'Task 304 Final Execution Approval Packet',
      status: 'FINAL_EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 304 패킷 참조 흐름을 유지합니다.',
    },
    {
      certificationItem: 'Task 303 Outcome Certification',
      status: 'EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 303 인증 참조 흐름을 유지합니다.',
    },
    {
      certificationItem: 'Task 302 Safety Audit Seal',
      status: 'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 302 안전 감사 봉인 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 301 Execution Readiness Review',
      status: 'EXECUTION_READINESS_REVIEW_CONFIRMED',
      meaning: 'Task 301 실행 준비 검토 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 300 Execution Readiness Approval Packet',
      status: 'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 300 승인 패킷 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 299 Outcome Certification',
      status: 'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 299 인증 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 298 Safety Audit Seal',
      status: 'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 298 안전 감사 봉인 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 297 Execution Approval Review',
      status: 'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
      meaning: 'Task 297 실행 승인 검토 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 296 Execution Approval Packet',
      status: 'EXECUTION_APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 296 실행 승인 패킷 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 293 Finalization Candidate',
      status: 'FINALIZATION_CANDIDATE_CONFIRMED',
      meaning: 'Task 293 설계 확정 후보 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 289 Design Blueprint',
      status: 'DESIGN_BLUEPRINT_CONFIRMED',
      meaning: 'Task 289 설계안 블루프린트 참조를 유지합니다.',
    },
    {
      certificationItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: 'Task 276 기존 캡처 결과 참조를 유지합니다.',
    },
    {
      certificationItem: '인증 상태 기록',
      status: 'SEAL_OUTCOME_CERTIFICATION_STATUS_RECORDED',
      meaning: 'Task 307 봉인 상태 7종을 Task 308 인증 상태 7종으로 1:1 매핑했습니다.',
    },
    {
      certificationItem: 'COMPLETE 인증 가능',
      status: 'SEAL_OUTCOME_CERTIFIED_READY_IF_COMPLETE',
      meaning: 'COMPLETE 계열이면 다음 준비 요약 대시보드 단계 후보입니다.',
    },
    {
      certificationItem: 'PARTIAL 인증 가능',
      status: 'SEAL_OUTCOME_CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: 'PARTIAL 계열이면 누락 안내 포함 다음 단계 후보입니다.',
    },
    {
      certificationItem: 'BLOCKED 인증 차단',
      status: 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_REQUIRED',
      meaning: 'BLOCKED 계열이면 원인별 보정이 필요합니다.',
    },
    {
      certificationItem: 'GW IP 차단',
      status: 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning: 'GW IP 차단 시 IP 허용 목록 재확인이 필요합니다.',
    },
    {
      certificationItem: 'Token 차단',
      status: 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning: 'Token/Auth 재확인이 필요합니다.',
    },
    {
      certificationItem: 'Env 차단',
      status: 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
      meaning: 'Env/Auth 설정 재확인이 필요합니다.',
    },
    {
      certificationItem: '상품번호 차단',
      status: 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning: 'channelProductNo 재확인이 필요합니다.',
    },
    {
      certificationItem: '상품 조회 차단',
      status: 'SEAL_OUTCOME_CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning: '상품/스토어 접근 재확인이 필요합니다.',
    },
    {
      certificationItem: 'Task 309 승인 대기',
      status: 'PENDING_TASK_309_APPROVAL',
      meaning: 'Task 309는 사용자 별도 명시 승인 전까지 진행하지 않습니다.',
    },
    {
      certificationItem: '실제 최종 실행 승인',
      status: 'NOT_APPROVED',
      meaning: '실제 최종 실행 승인은 부여되지 않았습니다.',
    },
    {
      certificationItem: '실제 실행 승인/실행',
      status: 'NOT_EXECUTED',
      meaning: '실제 실행 승인과 실제 실행은 모두 수행되지 않았습니다.',
    },
    {
      certificationItem: '버튼/submit/POST',
      status: 'NOT_CONNECTED',
      meaning: '실행 버튼, submit action, POST API는 추가하지 않았습니다.',
    },
    {
      certificationItem: 'Worker/Queue/Adapter',
      status: 'LOCKED',
      meaning: 'Worker / Queue / Adapter 실행 경로는 연결하지 않았습니다.',
    },
    {
      certificationItem: '상품 변경 승인',
      status: 'NOT_APPROVED_FOR_PRODUCT_CHANGE',
      meaning: '상품 변경 승인은 부여되지 않았습니다.',
    },
    {
      certificationItem: 'DB 저장',
      status: 'NOT_STORED',
      meaning: 'DB 저장/쓰기 작업은 수행하지 않았습니다.',
    },
    {
      certificationItem: '실행용 복사',
      status: 'NOT_COPIED_FOR_EXECUTION',
      meaning: '설계안 또는 승인 결과를 실행용으로 복사하지 않았습니다.',
    },
    {
      certificationItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '기존 캡처 데이터만 사용했습니다.',
    },
    {
      certificationItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
    },
    {
      certificationItem: '구조 임의 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션/추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      certificationItem: '원본 값 포함',
      status: 'NOT_INCLUDED',
      meaning: '가격/재고 원본 값과 raw API response를 포함하지 않았습니다.',
    },
    {
      certificationItem: '민감값 노출',
      status: 'NOT_DISPLAYED',
      meaning: 'Token/Auth/Signature/Authorization 값은 표시하지 않았습니다.',
    },
    {
      certificationItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 308은 최종 실행 승인 Safety Audit Seal 결과를 read-only로 인증하는 단계입니다.',
    },
  ];
}

export function buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(input: {
  finalExecutionApprovalSafetyAuditSeal: {
    finalExecutionApprovalSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus;
  };
}): NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView {
  const sourceFinalExecutionApprovalSafetyAuditSealStatus =
    input.finalExecutionApprovalSafetyAuditSeal.finalExecutionApprovalSafetyAuditSealStatus;

  if (!ALLOWED_SEAL_STATUSES.includes(sourceFinalExecutionApprovalSafetyAuditSealStatus)) {
    throw new Error(
      `Unsupported final execution approval safety audit seal status: ${sourceFinalExecutionApprovalSafetyAuditSealStatus}`
    );
  }

  const finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus =
    FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_STATUS_BY_SEAL_STATUS[
      sourceFinalExecutionApprovalSafetyAuditSealStatus
    ];

  const sealOutcomeCertifiedReady =
    finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY';
  const sealOutcomeCertifiedPartialReady =
    finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY';
  const sealOutcomeCertificationBlocked =
    !sealOutcomeCertifiedReady && !sealOutcomeCertifiedPartialReady;

  const { certificationSummary, blockingReason } = buildCertificationSummary({
    certificationStatus: finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus,
    sealOutcomeCertifiedReady,
    sealOutcomeCertifiedPartialReady,
  });

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_READY',
    panelTitle: 'Task 308 - Read-Only Final Execution Approval Safety Audit Seal Outcome Certification',
    description:
      'Task 308은 Task 307 안전 감사 Seal 결과를 다음 단계로 넘길 수 있는지 read-only로 인증하는 단계입니다. 이 패널은 실제 최종 실행 승인, 실제 실행 승인, 실제 실행, 상품 변경 승인, 실행 버튼 추가, POST / submit action 추가, Worker / Queue / Adapter 연결이 아닙니다.',
    taskId: 308,
    taskName:
      'Naver Read-Only Final Execution Approval Safety Audit Seal Outcome Certification Screen Flow',
    currentTaskNumber: 308,
    referenceTaskNumbers: [307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296, 293, 289, 276],
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationReady: true,
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
    sourceFinalExecutionApprovalSafetyAuditSealStatus,
    finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus,
    certificationSummary,
    blockingReason,
    certificationItems: buildCertificationItems({
      sealStatus: sourceFinalExecutionApprovalSafetyAuditSealStatus,
      certificationStatus: finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus,
    }),
    sealOutcomeCertifiedReady,
    sealOutcomeCertifiedPartialReady,
    sealOutcomeCertificationBlocked,
    requiresSeparateTask309Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_309_APPROVAL_PHRASE,
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
