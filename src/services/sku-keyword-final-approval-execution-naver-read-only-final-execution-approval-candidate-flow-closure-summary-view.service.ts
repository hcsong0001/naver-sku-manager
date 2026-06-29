import { NaverReadOnlyFinalExecutionApprovalCandidateListStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-list-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-safety-audit-seal-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-safety-audit-seal-outcome-certification-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_EMPTY';

export type CandidateFlowClosureItemStatus = 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';

export const NEXT_TASK_320_APPROVAL_PHRASE =
  'Task 320에서 TMS read-only 배포/도메인 준비 상태 점검 화면 구현을 승인합니다. 이 단계는 실제 배포 실행이나 실제 도메인 연결이 아니라, 현재 로컬 개발 상태에서 배포와 도메인 연결을 준비하기 전에 필요한 조건을 read-only로 점검하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

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

function toClosureStatus(classification: FlowClassification): CandidateFlowClosureItemStatus {
  if (classification.isBlocked) return 'BLOCKED';
  if (classification.isEmpty) return 'EMPTY';
  if (classification.isLocked) return 'LOCKED';
  if (classification.isPartialReady) return 'PARTIAL_READY';
  return 'READY';
}

function deriveClosureSummaryStatus(
  classifications: FlowClassification[],
): NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryStatus {
  if (classifications.some((classification) => classification.isBlocked)) {
    return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_BLOCKED';
  }
  if (classifications.some((classification) => classification.isEmpty)) {
    return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_EMPTY';
  }
  if (classifications.some((classification) => classification.isPartialReady)) {
    return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_PARTIAL_READY';
  }
  return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_READY';
}

export interface CandidateFlowClosureItem {
  taskId: number;
  taskName: string;
  sourceStatus: string;
  closureStatus: CandidateFlowClosureItemStatus;
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
  dbWriteBlocked: true;
  workerQueueAdapterBlocked: true;
}

export interface CandidateFlowClosureSummaryCard {
  label: string;
  count: number;
  cardType: CandidateFlowClosureItemStatus;
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_VIEW';
  taskId: 319;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 319;
  referenceTaskNumbers: readonly [318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  candidateFlowClosureSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryStatus;
  closureFlowItems: readonly CandidateFlowClosureItem[];
  closureSummaryCards: readonly CandidateFlowClosureSummaryCard[];
  readyClosureCount: number;
  partialReadyClosureCount: number;
  blockedClosureCount: number;
  emptyClosureCount: number;
  lockedClosureCount: number;
  totalClosureCount: number;
  candidateFlowClosureReady: boolean;
  candidateFlowClosurePartialReady: boolean;
  candidateFlowClosureBlocked: boolean;
  candidateFlowClosureEmpty: boolean;
  candidateFlowReadOnlyClosed: true;
  candidateFlowStillDisplayOnly: true;
  candidateFlowSafeForDeploymentPreparation: true;
  deploymentPreparationNotStarted: true;
  domainConnectionNotStarted: true;
  safeDisplayFieldsStillCertified: true;
  excludedFieldsStillCertified: true;
  executionStillLocked: true;
  mutationStillBlocked: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  isReadOnlyCandidateFlowClosureSummary: true;
  requiresSeparateTask320Approval: true;
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
  deploymentStarted: false;
  domainConnected: false;
}

const STATUS_LABELS: Record<CandidateFlowClosureItemStatus, string> = {
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
  315: 'Candidate Final Summary',
  316: 'Candidate Final Summary Outcome Certification',
  317: 'Candidate Final Summary Safety Audit Seal',
  318: 'Candidate Final Summary Safety Audit Seal Outcome Certification',
};

export function buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(input: {
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
  candidateFinalSummary: {
    candidateFinalSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus;
  };
  candidateFinalSummaryOutcomeCertification: {
    candidateFinalSummaryOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus;
  };
  candidateFinalSummarySafetyAuditSeal: {
    candidateFinalSummarySafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus;
  };
  candidateFinalSummarySafetyAuditSealOutcomeCertification: {
    candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus;
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView {
  const rawFlows = [
    { taskId: 310, sourceStatus: input.candidateList.candidateListStatus as string },
    { taskId: 311, sourceStatus: input.candidateDetailReview.candidateDetailReviewStatus as string },
    {
      taskId: 312,
      sourceStatus: input.outcomeCertification.candidateDetailReviewOutcomeCertificationStatus as string,
    },
    {
      taskId: 313,
      sourceStatus: input.safetyAuditSeal.candidateDetailReviewSafetyAuditSealStatus as string,
    },
    {
      taskId: 314,
      sourceStatus:
        input.safetyAuditSealOutcomeCertification
          .candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus as string,
    },
    { taskId: 315, sourceStatus: input.candidateFinalSummary.candidateFinalSummaryStatus as string },
    {
      taskId: 316,
      sourceStatus:
        input.candidateFinalSummaryOutcomeCertification
          .candidateFinalSummaryOutcomeCertificationStatus as string,
    },
    {
      taskId: 317,
      sourceStatus:
        input.candidateFinalSummarySafetyAuditSeal.candidateFinalSummarySafetyAuditSealStatus as string,
    },
    {
      taskId: 318,
      sourceStatus:
        input.candidateFinalSummarySafetyAuditSealOutcomeCertification
          .candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus as string,
    },
  ];

  const classifications = rawFlows.map((flow) => classifyStatusString(flow.sourceStatus));
  const candidateFlowClosureSummaryStatus = deriveClosureSummaryStatus(classifications);

  const closureFlowItems: CandidateFlowClosureItem[] = rawFlows.map((flow, index) => {
    const classification = classifications[index];
    const closureStatus = toClosureStatus(classification);

    return {
      taskId: flow.taskId,
      taskName: TASK_NAMES[flow.taskId],
      sourceStatus: flow.sourceStatus,
      closureStatus,
      displayOrder: index + 1,
      isReady: classification.isReady,
      isPartialReady: classification.isPartialReady,
      isBlocked: classification.isBlocked,
      isEmpty: classification.isEmpty,
      isLocked: classification.isLocked,
      message: `Task ${flow.taskId} ${TASK_NAMES[flow.taskId]}: ${STATUS_LABELS[closureStatus]}`,
      isDisplayOnly: true,
      actualExecutionBlocked: true,
      mutationBlocked: true,
      apiCallBlocked: true,
      dbWriteBlocked: true,
      workerQueueAdapterBlocked: true,
    };
  });

  const readyClosureCount = classifications.filter((classification) => classification.isReady).length;
  const partialReadyClosureCount = classifications.filter((classification) => classification.isPartialReady).length;
  const blockedClosureCount = classifications.filter((classification) => classification.isBlocked).length;
  const emptyClosureCount = classifications.filter((classification) => classification.isEmpty).length;
  const lockedClosureCount = classifications.filter((classification) => classification.isLocked).length;
  const totalClosureCount = closureFlowItems.length;

  const closureSummaryCards: CandidateFlowClosureSummaryCard[] = [
    { label: '준비 완료', count: readyClosureCount, cardType: 'READY' },
    { label: '부분 준비', count: partialReadyClosureCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: blockedClosureCount, cardType: 'BLOCKED' },
    { label: '비어 있음', count: emptyClosureCount, cardType: 'EMPTY' },
    { label: '잠금됨', count: lockedClosureCount, cardType: 'LOCKED' },
  ];

  const candidateFlowClosureReady =
    candidateFlowClosureSummaryStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_READY';
  const candidateFlowClosurePartialReady =
    candidateFlowClosureSummaryStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_PARTIAL_READY';
  const candidateFlowClosureBlocked =
    candidateFlowClosureSummaryStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_BLOCKED';
  const candidateFlowClosureEmpty =
    candidateFlowClosureSummaryStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_EMPTY';

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_VIEW',
    taskId: 319,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Flow Closure Summary Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 흐름 Closure Summary',
    description:
      'Task 310~318 후보 목록, 상세 검토, 인증, 안전 봉인 흐름을 read-only로 닫고 다음 배포/도메인 준비 전 상태를 요약합니다. 이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아닙니다.',
    currentTaskNumber: 319,
    referenceTaskNumbers: [318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    candidateFlowClosureSummaryStatus,
    closureFlowItems,
    closureSummaryCards,
    readyClosureCount,
    partialReadyClosureCount,
    blockedClosureCount,
    emptyClosureCount,
    lockedClosureCount,
    totalClosureCount,
    candidateFlowClosureReady,
    candidateFlowClosurePartialReady,
    candidateFlowClosureBlocked,
    candidateFlowClosureEmpty,
    candidateFlowReadOnlyClosed: true,
    candidateFlowStillDisplayOnly: true,
    candidateFlowSafeForDeploymentPreparation: true,
    deploymentPreparationNotStarted: true,
    domainConnectionNotStarted: true,
    safeDisplayFieldsStillCertified: true,
    excludedFieldsStillCertified: true,
    executionStillLocked: true,
    mutationStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    isReadOnlyCandidateFlowClosureSummary: true,
    requiresSeparateTask320Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_320_APPROVAL_PHRASE,
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
    deploymentStarted: false,
    domainConnected: false,
  };
}
