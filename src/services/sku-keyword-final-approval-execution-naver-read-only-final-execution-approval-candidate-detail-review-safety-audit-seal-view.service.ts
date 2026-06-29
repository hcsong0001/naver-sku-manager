import {
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus,
  CertificationItem,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-outcome-certification-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY';

export const NEXT_TASK_314_APPROVAL_PHRASE =
  'Task 314에서 Naver read-only 최종 실행 승인 후보 상세 검토 Safety Audit Seal 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 313 후보 상세 검토 Safety Audit Seal 결과를 read-only로 인증하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export const SAFETY_AUDIT_SEAL_STATUS_BY_OUTCOME_CERTIFICATION_STATUS: Record<
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus,
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus
> = {
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_PARTIAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_EMPTY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY',
};

export interface SafetySealItem {
  candidateId: string;
  displayOrder: number;
  displayName: string;
  sourceCertificationStatus: string;
  safetySealStatus: string;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  warningCount: number;
  errorCount: number;
  safetySealMessage: string;
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

export interface SafetyAuditSealSummaryCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_VIEW';
  taskId: 313;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 313;
  referenceTaskNumbers: readonly [312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateDetailReviewOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus;
  candidateDetailReviewSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus;
  safetySealItems: readonly SafetySealItem[];
  safetySealSummaryCards: readonly SafetyAuditSealSummaryCard[];
  sealedReadyCount: number;
  sealedPartialReadyCount: number;
  sealedBlockedCount: number;
  sealedLockedCount: number;
  totalSealedCount: number;
  safetyAuditSealReady: boolean;
  safetyAuditSealPartialReady: boolean;
  safetyAuditSealBlocked: boolean;
  safetyAuditSealEmpty: boolean;
  safeDisplayFieldsStillCertified: true;
  excludedFieldsStillCertified: true;
  executionStillLocked: true;
  mutationStillBlocked: true;
  apiCallStillBlocked: true;
  isReadOnlySafetyAuditSeal: true;
  requiresSeparateTask314Approval: true;
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

export function buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView(input: {
  outcomeCertification: {
    candidateDetailReviewOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus;
    certificationItems: readonly CertificationItem[];
    certifiedDetailCount: number;
    partialCertifiedDetailCount: number;
    blockedCertifiedDetailCount: number;
    lockedCertifiedDetailCount: number;
    totalCertifiedDetailCount: number;
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView {
  const { outcomeCertification } = input;
  const { candidateDetailReviewOutcomeCertificationStatus } = outcomeCertification;

  const candidateDetailReviewSafetyAuditSealStatus =
    SAFETY_AUDIT_SEAL_STATUS_BY_OUTCOME_CERTIFICATION_STATUS[candidateDetailReviewOutcomeCertificationStatus];

  const safetySealItems: SafetySealItem[] = outcomeCertification.certificationItems.map((item) => {
    const safetySealMessage = item.isBlocked
      ? '차단됨 - Safety Audit Seal 불가'
      : item.isPartialReady
        ? '부분 봉인 - 경고 항목 확인 필요'
        : item.isLocked
          ? '잠김 - 사전 조건 미충족'
          : '봉인 완료 - 안전 조건 유지 확인됨';

    return {
      candidateId: item.candidateId,
      displayOrder: item.displayOrder,
      displayName: item.displayName,
      sourceCertificationStatus: item.certificationStatus,
      safetySealStatus: item.certificationStatus,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isLocked: item.isLocked,
      warningCount: item.warningCount,
      errorCount: item.errorCount,
      safetySealMessage,
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

  const sealedReadyCount = safetySealItems.filter((i) => i.isReady).length;
  const sealedPartialReadyCount = safetySealItems.filter((i) => i.isPartialReady).length;
  const sealedBlockedCount = safetySealItems.filter((i) => i.isBlocked).length;
  const sealedLockedCount = safetySealItems.filter((i) => i.isLocked).length;
  const totalSealedCount = safetySealItems.length;

  const safetyAuditSealReady =
    candidateDetailReviewSafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY';
  const safetyAuditSealPartialReady =
    candidateDetailReviewSafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_PARTIAL_READY';
  const safetyAuditSealBlocked =
    candidateDetailReviewSafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED';
  const safetyAuditSealEmpty =
    candidateDetailReviewSafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY';

  const safetySealSummaryCards: SafetyAuditSealSummaryCard[] = [
    { label: '봉인 완료', count: sealedReadyCount, cardType: 'READY' },
    { label: '부분 봉인', count: sealedPartialReadyCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: sealedBlockedCount, cardType: 'BLOCKED' },
    { label: '잠김', count: sealedLockedCount, cardType: 'LOCKED' },
  ];

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_VIEW',
    taskId: 313,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Detail Review Safety Audit Seal Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 상세 검토 결과 Safety Audit Seal',
    description:
      'Task 312 후보 상세 검토 결과 인증 이후의 안전 조건을 read-only로 봉인합니다. 이 화면은 실제 승인, 실행, 상품 변경이 아닙니다.',
    currentTaskNumber: 313,
    referenceTaskNumbers: [312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateDetailReviewOutcomeCertificationStatus: candidateDetailReviewOutcomeCertificationStatus,
    candidateDetailReviewSafetyAuditSealStatus,
    safetySealItems,
    safetySealSummaryCards,
    sealedReadyCount,
    sealedPartialReadyCount,
    sealedBlockedCount,
    sealedLockedCount,
    totalSealedCount,
    safetyAuditSealReady,
    safetyAuditSealPartialReady,
    safetyAuditSealBlocked,
    safetyAuditSealEmpty,
    safeDisplayFieldsStillCertified: true,
    excludedFieldsStillCertified: true,
    executionStillLocked: true,
    mutationStillBlocked: true,
    apiCallStillBlocked: true,
    isReadOnlySafetyAuditSeal: true,
    requiresSeparateTask314Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_314_APPROVAL_PHRASE,
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
