import {
  NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus,
  SummaryFlowItem,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_EMPTY';

export const NEXT_TASK_317_APPROVAL_PHRASE =
  'Task 317에서 Naver read-only 최종 실행 승인 후보 최종 요약 Safety Audit Seal 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 316 후보 최종 요약 결과 인증 이후의 안전 조건을 read-only로 봉인하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface CandidateFinalSummaryOutcomeCertificationItem {
  taskId: number;
  taskName: string;
  sourceStatus: string;
  outcomeCertificationStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';
  displayOrder: number;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isEmpty: boolean;
  isLocked: boolean;
  message: string;
  isDisplayOnly: true;
  actualExecutionBlocked: true;
  mutationBlocked: true;
  apiCallBlocked: true;
}

export interface CandidateFinalSummaryOutcomeCertificationCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFICATION_VIEW';
  taskId: 316;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 316;
  referenceTaskNumbers: readonly [315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateFinalSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus;
  candidateFinalSummaryOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus;
  outcomeCertificationItems: readonly CandidateFinalSummaryOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly CandidateFinalSummaryOutcomeCertificationCard[];
  outcomeCertifiedReady: boolean;
  outcomeCertifiedPartialReady: boolean;
  outcomeCertificationBlocked: boolean;
  outcomeCertificationEmpty: boolean;
  certifiedReadyFlowCount: number;
  certifiedPartialReadyFlowCount: number;
  certifiedBlockedFlowCount: number;
  certifiedEmptyFlowCount: number;
  certifiedLockedFlowCount: number;
  totalCertifiedFlowCount: number;
  candidateReadOnlyFlowStillCompleted: true;
  candidateFlowStillDisplayOnly: true;
  safeDisplayFieldsStillCertified: true;
  excludedFieldsStillCertified: true;
  executionStillLocked: true;
  mutationStillBlocked: true;
  apiCallStillBlocked: true;
  isReadOnlyCandidateFinalSummaryOutcomeCertification: true;
  requiresSeparateTask317Approval: true;
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

function mapFinalSummaryStatusToOutcomeCertificationStatus(
  status: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus,
): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus {
  switch (status) {
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_BLOCKED':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_EMPTY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_EMPTY';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

export function buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(input: {
  candidateFinalSummary: {
    candidateFinalSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus;
    summaryFlowItems: readonly SummaryFlowItem[];
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView {
  const { candidateFinalSummary } = input;
  const candidateFinalSummaryOutcomeCertificationStatus = mapFinalSummaryStatusToOutcomeCertificationStatus(
    candidateFinalSummary.candidateFinalSummaryStatus,
  );

  const outcomeCertificationItems: CandidateFinalSummaryOutcomeCertificationItem[] =
    candidateFinalSummary.summaryFlowItems.map((item) => ({
      taskId: item.taskId,
      taskName: item.taskName,
      sourceStatus: item.sourceStatus,
      outcomeCertificationStatus: item.summaryStatus,
      displayOrder: item.displayOrder,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isEmpty: item.isEmpty,
      isLocked: item.isLocked,
      message: `${item.message} / 인증 완료`,
      isDisplayOnly: true,
      actualExecutionBlocked: true,
      mutationBlocked: true,
      apiCallBlocked: true,
    }));

  const certifiedReadyFlowCount = outcomeCertificationItems.filter((item) => item.isReady).length;
  const certifiedPartialReadyFlowCount = outcomeCertificationItems.filter((item) => item.isPartialReady).length;
  const certifiedBlockedFlowCount = outcomeCertificationItems.filter((item) => item.isBlocked).length;
  const certifiedEmptyFlowCount = outcomeCertificationItems.filter((item) => item.isEmpty).length;
  const certifiedLockedFlowCount = outcomeCertificationItems.filter((item) => item.isLocked).length;
  const totalCertifiedFlowCount = outcomeCertificationItems.length;

  const outcomeCertificationSummaryCards: CandidateFinalSummaryOutcomeCertificationCard[] = [
    { label: '인증 완료', count: certifiedReadyFlowCount, cardType: 'READY' },
    { label: '부분 인증', count: certifiedPartialReadyFlowCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: certifiedBlockedFlowCount, cardType: 'BLOCKED' },
    { label: '비어 있음', count: certifiedEmptyFlowCount, cardType: 'EMPTY' },
    { label: '잠금됨', count: certifiedLockedFlowCount, cardType: 'LOCKED' },
  ];

  const outcomeCertifiedReady =
    candidateFinalSummaryOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY';
  const outcomeCertifiedPartialReady =
    candidateFinalSummaryOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY';
  const outcomeCertificationBlocked =
    candidateFinalSummaryOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED';
  const outcomeCertificationEmpty =
    candidateFinalSummaryOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_EMPTY';

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFICATION_VIEW',
    taskId: 316,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Final Summary Outcome Certification Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 최종 요약 결과 인증',
    description:
      'Task 315 후보 최종 요약 결과를 read-only로 인증합니다. 이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아닙니다.',
    currentTaskNumber: 316,
    referenceTaskNumbers: [315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateFinalSummaryStatus: candidateFinalSummary.candidateFinalSummaryStatus,
    candidateFinalSummaryOutcomeCertificationStatus,
    outcomeCertificationItems,
    outcomeCertificationSummaryCards,
    outcomeCertifiedReady,
    outcomeCertifiedPartialReady,
    outcomeCertificationBlocked,
    outcomeCertificationEmpty,
    certifiedReadyFlowCount,
    certifiedPartialReadyFlowCount,
    certifiedBlockedFlowCount,
    certifiedEmptyFlowCount,
    certifiedLockedFlowCount,
    totalCertifiedFlowCount,
    candidateReadOnlyFlowStillCompleted: true,
    candidateFlowStillDisplayOnly: true,
    safeDisplayFieldsStillCertified: true,
    excludedFieldsStillCertified: true,
    executionStillLocked: true,
    mutationStillBlocked: true,
    apiCallStillBlocked: true,
    isReadOnlyCandidateFinalSummaryOutcomeCertification: true,
    requiresSeparateTask317Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_317_APPROVAL_PHRASE,
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
