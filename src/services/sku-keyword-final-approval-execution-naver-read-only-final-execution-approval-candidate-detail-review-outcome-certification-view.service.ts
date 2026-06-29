import {
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus,
  CandidateDetailItem,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_EMPTY';

export const NEXT_TASK_313_APPROVAL_PHRASE =
  'Task 313에서 Naver read-only 최종 실행 승인 후보 상세 검토 결과 Safety Audit Seal 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 312 후보 상세 검토 결과 인증 이후의 안전 조건을 read-only로 봉인하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export const OUTCOME_CERTIFICATION_STATUS_BY_DETAIL_REVIEW_STATUS: Record<
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus,
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus
> = {
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_BLOCKED:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_EMPTY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_EMPTY',
};

export interface CertificationItem {
  candidateId: string;
  displayOrder: number;
  displayName: string;
  sourceDetailReviewStatus: string;
  certificationStatus: string;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  warningCount: number;
  errorCount: number;
  certificationMessage: string;
  safeDisplayFields: readonly string[];
  excludedFields: readonly string[];
  priceStockRawValuesExcluded: true;
  executionPayloadExcluded: true;
  rawApiResponseExcluded: true;
  tokenOrAuthExcluded: true;
  isDisplayOnly: true;
}

export interface OutcomeCertificationSummaryCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFICATION_VIEW';
  taskId: 312;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 312;
  referenceTaskNumbers: readonly [311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateDetailReviewStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus;
  candidateDetailReviewOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus;
  certificationItems: readonly CertificationItem[];
  outcomeSummaryCards: readonly OutcomeCertificationSummaryCard[];
  certifiedDetailCount: number;
  partialCertifiedDetailCount: number;
  blockedCertifiedDetailCount: number;
  lockedCertifiedDetailCount: number;
  totalCertifiedDetailCount: number;
  outcomeCertifiedReady: boolean;
  outcomeCertifiedPartialReady: boolean;
  outcomeCertificationBlocked: boolean;
  outcomeCertificationEmpty: boolean;
  safeDisplayFieldsCertified: true;
  excludedFieldsCertified: true;
  isReadOnlyOutcomeCertification: true;
  requiresSeparateTask313Approval: true;
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

export function buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView(input: {
  candidateDetailReview: {
    candidateDetailReviewStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus;
    candidateDetailItems: readonly CandidateDetailItem[];
    readyDetailCount: number;
    partialReadyDetailCount: number;
    blockedDetailCount: number;
    lockedDetailCount: number;
    totalDetailCount: number;
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView {
  const { candidateDetailReview } = input;
  const { candidateDetailReviewStatus } = candidateDetailReview;

  const candidateDetailReviewOutcomeCertificationStatus =
    OUTCOME_CERTIFICATION_STATUS_BY_DETAIL_REVIEW_STATUS[candidateDetailReviewStatus];

  const certificationItems: CertificationItem[] = candidateDetailReview.candidateDetailItems.map((item) => {
    const certificationMessage = item.isBlocked
      ? '차단됨 - 인증 불가'
      : item.isPartialReady
        ? '부분 인증 - 경고 항목 확인 필요'
        : item.isLocked
          ? '잠김 - 사전 조건 미충족'
          : '인증 완료 - 상세 검토 통과 확인됨';

    return {
      candidateId: item.candidateId,
      displayOrder: item.displayOrder,
      displayName: item.displayName,
      sourceDetailReviewStatus: item.detailReviewStatus,
      certificationStatus: item.detailReviewStatus,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isLocked: item.isLocked,
      warningCount: item.warningCount,
      errorCount: item.errorCount,
      certificationMessage,
      safeDisplayFields: item.safeDisplayFields,
      excludedFields: item.excludedFields,
      priceStockRawValuesExcluded: true,
      executionPayloadExcluded: true,
      rawApiResponseExcluded: true,
      tokenOrAuthExcluded: true,
      isDisplayOnly: true,
    };
  });

  const certifiedDetailCount = certificationItems.filter((i) => i.isReady).length;
  const partialCertifiedDetailCount = certificationItems.filter((i) => i.isPartialReady).length;
  const blockedCertifiedDetailCount = certificationItems.filter((i) => i.isBlocked).length;
  const lockedCertifiedDetailCount = certificationItems.filter((i) => i.isLocked).length;
  const totalCertifiedDetailCount = certificationItems.length;

  const outcomeCertifiedReady =
    candidateDetailReviewOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY';
  const outcomeCertifiedPartialReady =
    candidateDetailReviewOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY';
  const outcomeCertificationBlocked =
    candidateDetailReviewOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED';
  const outcomeCertificationEmpty =
    candidateDetailReviewOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_EMPTY';

  const outcomeSummaryCards: OutcomeCertificationSummaryCard[] = [
    { label: '인증 완료', count: certifiedDetailCount, cardType: 'READY' },
    { label: '부분 인증', count: partialCertifiedDetailCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: blockedCertifiedDetailCount, cardType: 'BLOCKED' },
    { label: '잠김', count: lockedCertifiedDetailCount, cardType: 'LOCKED' },
  ];

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFICATION_VIEW',
    taskId: 312,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Detail Review Outcome Certification Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 상세 검토 결과 인증',
    description:
      'Task 311 후보 상세 검토 결과를 read-only로 인증합니다. 이 화면은 실제 승인, 실행, 상품 변경이 아닙니다.',
    currentTaskNumber: 312,
    referenceTaskNumbers: [311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateDetailReviewStatus: candidateDetailReviewStatus,
    candidateDetailReviewOutcomeCertificationStatus,
    certificationItems,
    outcomeSummaryCards,
    certifiedDetailCount,
    partialCertifiedDetailCount,
    blockedCertifiedDetailCount,
    lockedCertifiedDetailCount,
    totalCertifiedDetailCount,
    outcomeCertifiedReady,
    outcomeCertifiedPartialReady,
    outcomeCertificationBlocked,
    outcomeCertificationEmpty,
    safeDisplayFieldsCertified: true,
    excludedFieldsCertified: true,
    isReadOnlyOutcomeCertification: true,
    requiresSeparateTask313Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_313_APPROVAL_PHRASE,
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
