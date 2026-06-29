import { NaverReadOnlyFinalExecutionApprovalCandidateListStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-list-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-outcome-certification-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_EMPTY';

export const NEXT_TASK_316_APPROVAL_PHRASE =
  'Task 316에서 Naver read-only 최종 실행 승인 후보 최종 요약 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 315 후보 최종 요약 결과를 read-only로 인증하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export type SummaryFlowItemStatus = 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';

type FlowClassification = {
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isEmpty: boolean;
  isLocked: boolean;
};

function classifyStatusString(status: string): FlowClassification {
  if (status.includes('EMPTY')) {
    return { isReady: false, isPartialReady: false, isBlocked: false, isEmpty: true, isLocked: false };
  }
  if (status.includes('BLOCKED')) {
    return { isReady: false, isPartialReady: false, isBlocked: true, isEmpty: false, isLocked: false };
  }
  if (status.includes('LOCKED')) {
    return { isReady: false, isPartialReady: false, isBlocked: false, isEmpty: false, isLocked: true };
  }
  if (status.includes('PARTIAL')) {
    return { isReady: false, isPartialReady: true, isBlocked: false, isEmpty: false, isLocked: false };
  }
  return { isReady: true, isPartialReady: false, isBlocked: false, isEmpty: false, isLocked: false };
}

function toSummaryStatus(c: FlowClassification): SummaryFlowItemStatus {
  if (c.isBlocked) return 'BLOCKED';
  if (c.isEmpty) return 'EMPTY';
  if (c.isLocked) return 'LOCKED';
  if (c.isPartialReady) return 'PARTIAL_READY';
  return 'READY';
}

function deriveFinalSummaryStatus(
  classifications: FlowClassification[],
): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus {
  if (classifications.some((c) => c.isBlocked))
    return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_BLOCKED';
  if (classifications.some((c) => c.isEmpty))
    return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_EMPTY';
  if (classifications.some((c) => c.isPartialReady))
    return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY';
  return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY';
}

export interface SummaryFlowItem {
  taskId: number;
  taskName: string;
  sourceStatus: string;
  summaryStatus: SummaryFlowItemStatus;
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

export interface CandidateFinalSummaryCard {
  label: string;
  count: number;
  cardType: SummaryFlowItemStatus;
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_VIEW';
  taskId: 315;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 315;
  referenceTaskNumbers: readonly [314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateListStatus: NaverReadOnlyFinalExecutionApprovalCandidateListStatus;
  sourceCandidateDetailReviewStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus;
  sourceCandidateDetailReviewOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus;
  sourceCandidateDetailReviewSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus;
  sourceCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus;
  candidateFinalSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus;
  summaryFlowItems: SummaryFlowItem[];
  candidateFinalSummaryCards: CandidateFinalSummaryCard[];
  readyFlowCount: number;
  partialReadyFlowCount: number;
  blockedFlowCount: number;
  emptyFlowCount: number;
  lockedFlowCount: number;
  totalFlowCount: number;
  candidateFinalSummaryReady: boolean;
  candidateFinalSummaryPartialReady: boolean;
  candidateFinalSummaryBlocked: boolean;
  candidateFinalSummaryEmpty: boolean;
  candidateReadOnlyFlowCompleted: true;
  candidateFlowStillDisplayOnly: true;
  safeDisplayFieldsStillCertified: true;
  excludedFieldsStillCertified: true;
  executionStillLocked: true;
  mutationStillBlocked: true;
  apiCallStillBlocked: true;
  isReadOnlyCandidateFinalSummary: true;
  requiresSeparateTask316Approval: true;
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

const STATUS_LABEL: Record<SummaryFlowItemStatus, string> = {
  READY: '준비 완료',
  PARTIAL_READY: '부분 준비',
  BLOCKED: '차단됨',
  EMPTY: '비어 있음',
  LOCKED: '잠금됨',
};

const TASK_NAMES: Record<number, string> = {
  310: 'Candidate List',
  311: 'Candidate Detail Review',
  312: 'Candidate Detail Review Outcome Certification',
  313: 'Candidate Detail Review Safety Audit Seal',
  314: 'Candidate Detail Review Safety Audit Seal Outcome Certification',
};

export function buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(input: {
  candidateList: {
    candidateListStatus: NaverReadOnlyFinalExecutionApprovalCandidateListStatus;
  };
  candidateDetailReview: {
    candidateDetailReviewStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus;
  };
  outcomeCertification: {
    candidateDetailReviewOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus;
  };
  safetyAuditSeal: {
    candidateDetailReviewSafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus;
  };
  safetyAuditSealOutcomeCertification: {
    candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus;
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView {
  const rawFlows = [
    { taskId: 310, sourceStatus: input.candidateList.candidateListStatus as string },
    { taskId: 311, sourceStatus: input.candidateDetailReview.candidateDetailReviewStatus as string },
    { taskId: 312, sourceStatus: input.outcomeCertification.candidateDetailReviewOutcomeCertificationStatus as string },
    { taskId: 313, sourceStatus: input.safetyAuditSeal.candidateDetailReviewSafetyAuditSealStatus as string },
    {
      taskId: 314,
      sourceStatus:
        input.safetyAuditSealOutcomeCertification
          .candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus as string,
    },
  ];

  const classifications = rawFlows.map((f) => classifyStatusString(f.sourceStatus));
  const candidateFinalSummaryStatus = deriveFinalSummaryStatus(classifications);

  const summaryFlowItems: SummaryFlowItem[] = rawFlows.map((f, idx) => {
    const c = classifications[idx];
    const ss = toSummaryStatus(c);
    return {
      taskId: f.taskId,
      taskName: TASK_NAMES[f.taskId],
      sourceStatus: f.sourceStatus,
      summaryStatus: ss,
      displayOrder: idx + 1,
      isReady: c.isReady,
      isPartialReady: c.isPartialReady,
      isBlocked: c.isBlocked,
      isEmpty: c.isEmpty,
      isLocked: c.isLocked,
      message: `Task ${f.taskId} ${TASK_NAMES[f.taskId]}: ${STATUS_LABEL[ss]}`,
      isDisplayOnly: true as const,
      actualExecutionBlocked: true as const,
      mutationBlocked: true as const,
      apiCallBlocked: true as const,
    };
  });

  const readyFlowCount = classifications.filter((c) => c.isReady).length;
  const partialReadyFlowCount = classifications.filter((c) => c.isPartialReady).length;
  const blockedFlowCount = classifications.filter((c) => c.isBlocked).length;
  const emptyFlowCount = classifications.filter((c) => c.isEmpty).length;
  const lockedFlowCount = classifications.filter((c) => c.isLocked).length;
  const totalFlowCount = rawFlows.length;

  const candidateFinalSummaryCards: CandidateFinalSummaryCard[] = [
    { label: '준비 완료', count: readyFlowCount, cardType: 'READY' },
    { label: '부분 준비', count: partialReadyFlowCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: blockedFlowCount, cardType: 'BLOCKED' },
    { label: '비어 있음', count: emptyFlowCount, cardType: 'EMPTY' },
    { label: '잠금됨', count: lockedFlowCount, cardType: 'LOCKED' },
  ];

  const candidateFinalSummaryReady =
    candidateFinalSummaryStatus === 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY';
  const candidateFinalSummaryPartialReady =
    candidateFinalSummaryStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY';
  const candidateFinalSummaryBlocked =
    candidateFinalSummaryStatus === 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_BLOCKED';
  const candidateFinalSummaryEmpty =
    candidateFinalSummaryStatus === 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_EMPTY';

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_VIEW',
    taskId: 315,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Final Summary',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 최종 요약',
    description:
      'Task 310~314 후보 목록, 상세 검토, 결과 인증, Safety Audit Seal, Seal 결과 인증 상태를 read-only로 최종 요약합니다. 이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아닙니다.',
    currentTaskNumber: 315,
    referenceTaskNumbers: [314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateListStatus: input.candidateList.candidateListStatus,
    sourceCandidateDetailReviewStatus: input.candidateDetailReview.candidateDetailReviewStatus,
    sourceCandidateDetailReviewOutcomeCertificationStatus:
      input.outcomeCertification.candidateDetailReviewOutcomeCertificationStatus,
    sourceCandidateDetailReviewSafetyAuditSealStatus:
      input.safetyAuditSeal.candidateDetailReviewSafetyAuditSealStatus,
    sourceCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus:
      input.safetyAuditSealOutcomeCertification.candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus,
    candidateFinalSummaryStatus,
    summaryFlowItems,
    candidateFinalSummaryCards,
    readyFlowCount,
    partialReadyFlowCount,
    blockedFlowCount,
    emptyFlowCount,
    lockedFlowCount,
    totalFlowCount,
    candidateFinalSummaryReady,
    candidateFinalSummaryPartialReady,
    candidateFinalSummaryBlocked,
    candidateFinalSummaryEmpty,
    candidateReadOnlyFlowCompleted: true,
    candidateFlowStillDisplayOnly: true,
    safeDisplayFieldsStillCertified: true,
    excludedFieldsStillCertified: true,
    executionStillLocked: true,
    mutationStillBlocked: true,
    apiCallStillBlocked: true,
    isReadOnlyCandidateFinalSummary: true,
    requiresSeparateTask316Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_316_APPROVAL_PHRASE,
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
