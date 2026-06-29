import {
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus,
  SafetySealItem,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_EMPTY';

export const NEXT_TASK_315_APPROVAL_PHRASE =
  'Task 315에서 Naver read-only 최종 실행 승인 후보 상세 검토 최종 요약 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 310~314 후보 목록·상세 검토·인증·안전 봉인 결과를 한 화면에서 요약하는 read-only 최종 후보 요약 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export const OUTCOME_CERT_STATUS_BY_SAFETY_AUDIT_SEAL_STATUS: Record<
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus,
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus
> = {
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_PARTIAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_EMPTY',
};

export interface OutcomeCertificationItem {
  candidateId: string;
  displayOrder: number;
  displayName: string;
  sourceSafetySealStatus: string;
  outcomeCertificationStatus: string;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  warningCount: number;
  errorCount: number;
  outcomeCertificationMessage: string;
  safeDisplayFields: readonly string[];
  excludedFields: readonly string[];
  priceStockRawValuesExcluded: true;
  executionPayloadExcluded: true;
  rawApiResponseExcluded: true;
  tokenOrAuthExcluded: true;
  actualExecutionBlocked: true;
  mutationBlocked: true;
  apiCallBlocked: true;
  isDisplayOnly: true;
}

export interface OutcomeCertificationSummaryCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_VIEW';
  taskId: 314;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 314;
  referenceTaskNumbers: readonly [313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateDetailReviewSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus;
  candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus;
  outcomeCertificationItems: readonly OutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly OutcomeCertificationSummaryCard[];
  certifiedReadyCount: number;
  certifiedPartialReadyCount: number;
  certifiedBlockedCount: number;
  certifiedLockedCount: number;
  totalCertifiedCount: number;
  outcomeCertifiedReady: boolean;
  outcomeCertifiedPartialReady: boolean;
  outcomeCertificationBlocked: boolean;
  outcomeCertificationEmpty: boolean;
  safeDisplayFieldsStillCertified: true;
  excludedFieldsStillCertified: true;
  executionStillLocked: true;
  mutationStillBlocked: true;
  apiCallStillBlocked: true;
  isReadOnlySafetyAuditSealOutcomeCertification: true;
  requiresSeparateTask315Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  candidateSelectionSubmitAdded: false;
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

export function buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView(input: {
  safetyAuditSeal: {
    candidateDetailReviewSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus;
    safetySealItems: readonly SafetySealItem[];
    sealedReadyCount: number;
    sealedPartialReadyCount: number;
    sealedBlockedCount: number;
    sealedLockedCount: number;
    totalSealedCount: number;
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView {
  const { safetyAuditSeal } = input;
  const { candidateDetailReviewSafetyAuditSealStatus } = safetyAuditSeal;

  const candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus =
    OUTCOME_CERT_STATUS_BY_SAFETY_AUDIT_SEAL_STATUS[candidateDetailReviewSafetyAuditSealStatus];

  const outcomeCertificationItems: OutcomeCertificationItem[] = safetyAuditSeal.safetySealItems.map((item) => {
    const outcomeCertificationMessage = item.isBlocked
      ? '차단됨 - Safety Audit Seal 인증 불가'
      : item.isPartialReady
        ? '부분 인증 - 경고 항목 확인 필요'
        : item.isLocked
          ? '잠김 - 사전 조건 미충족'
          : '인증 완료 - Safety Audit Seal 통과 확인됨';

    return {
      candidateId: item.candidateId,
      displayOrder: item.displayOrder,
      displayName: item.displayName,
      sourceSafetySealStatus: item.safetySealStatus,
      outcomeCertificationStatus: item.safetySealStatus,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isLocked: item.isLocked,
      warningCount: item.warningCount,
      errorCount: item.errorCount,
      outcomeCertificationMessage,
      safeDisplayFields: item.safeDisplayFields,
      excludedFields: item.excludedFields,
      priceStockRawValuesExcluded: true,
      executionPayloadExcluded: true,
      rawApiResponseExcluded: true,
      tokenOrAuthExcluded: true,
      actualExecutionBlocked: true,
      mutationBlocked: true,
      apiCallBlocked: true,
      isDisplayOnly: true,
    };
  });

  const certifiedReadyCount = outcomeCertificationItems.filter((i) => i.isReady).length;
  const certifiedPartialReadyCount = outcomeCertificationItems.filter((i) => i.isPartialReady).length;
  const certifiedBlockedCount = outcomeCertificationItems.filter((i) => i.isBlocked).length;
  const certifiedLockedCount = outcomeCertificationItems.filter((i) => i.isLocked).length;
  const totalCertifiedCount = outcomeCertificationItems.length;

  const outcomeCertifiedReady =
    candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY';
  const outcomeCertifiedPartialReady =
    candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY';
  const outcomeCertificationBlocked =
    candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED';
  const outcomeCertificationEmpty =
    candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_EMPTY';

  const outcomeCertificationSummaryCards: OutcomeCertificationSummaryCard[] = [
    { label: '인증 완료', count: certifiedReadyCount, cardType: 'READY' },
    { label: '부분 인증', count: certifiedPartialReadyCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: certifiedBlockedCount, cardType: 'BLOCKED' },
    { label: '잠김', count: certifiedLockedCount, cardType: 'LOCKED' },
  ];

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_VIEW',
    taskId: 314,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Detail Review Safety Audit Seal Outcome Certification Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 상세 검토 Safety Audit Seal 결과 인증',
    description:
      'Task 313 후보 상세 검토 Safety Audit Seal 결과를 read-only로 인증합니다. 이 화면은 실제 승인, 실행, 상품 변경이 아닙니다.',
    currentTaskNumber: 314,
    referenceTaskNumbers: [313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateDetailReviewSafetyAuditSealStatus: candidateDetailReviewSafetyAuditSealStatus,
    candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus,
    outcomeCertificationItems,
    outcomeCertificationSummaryCards,
    certifiedReadyCount,
    certifiedPartialReadyCount,
    certifiedBlockedCount,
    certifiedLockedCount,
    totalCertifiedCount,
    outcomeCertifiedReady,
    outcomeCertifiedPartialReady,
    outcomeCertificationBlocked,
    outcomeCertificationEmpty,
    safeDisplayFieldsStillCertified: true,
    excludedFieldsStillCertified: true,
    executionStillLocked: true,
    mutationStillBlocked: true,
    apiCallStillBlocked: true,
    isReadOnlySafetyAuditSealOutcomeCertification: true,
    requiresSeparateTask315Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_315_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    candidateSelectionSubmitAdded: false,
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
