import {
  CandidateFinalSummaryOutcomeCertificationItem,
  NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-outcome-certification-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_EMPTY';

export const NEXT_TASK_318_APPROVAL_PHRASE =
  'Task 318에서 Naver read-only 최종 실행 승인 후보 최종 요약 Safety Audit Seal 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 317 후보 최종 요약 Safety Audit Seal 결과를 read-only로 인증하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface CandidateFinalSummarySafetySealItem {
  taskId: number;
  taskName: string;
  sourceOutcomeCertificationStatus: string;
  safetySealStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';
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

export interface CandidateFinalSummarySafetySealCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_VIEW';
  taskId: 317;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 317;
  referenceTaskNumbers: readonly [316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateFinalSummaryOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus;
  candidateFinalSummarySafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus;
  safetySealItems: readonly CandidateFinalSummarySafetySealItem[];
  safetySealSummaryCards: readonly CandidateFinalSummarySafetySealCard[];
  safetyAuditSealReady: boolean;
  safetyAuditSealPartialReady: boolean;
  safetyAuditSealBlocked: boolean;
  safetyAuditSealEmpty: boolean;
  sealedReadyFlowCount: number;
  sealedPartialReadyFlowCount: number;
  sealedBlockedFlowCount: number;
  sealedEmptyFlowCount: number;
  sealedLockedFlowCount: number;
  totalSealedFlowCount: number;
  candidateReadOnlyFlowStillCompleted: true;
  candidateFlowStillDisplayOnly: true;
  safeDisplayFieldsStillCertified: true;
  excludedFieldsStillCertified: true;
  executionStillLocked: true;
  mutationStillBlocked: true;
  apiCallStillBlocked: true;
  isReadOnlyCandidateFinalSummarySafetyAuditSeal: true;
  requiresSeparateTask318Approval: true;
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

function mapOutcomeCertificationStatusToSafetyAuditSealStatus(
  status: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus,
): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus {
  switch (status) {
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_EMPTY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_EMPTY';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

export function buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(input: {
  outcomeCertification: {
    candidateFinalSummaryOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus;
    outcomeCertificationItems: readonly CandidateFinalSummaryOutcomeCertificationItem[];
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView {
  const { outcomeCertification } = input;
  const candidateFinalSummarySafetyAuditSealStatus = mapOutcomeCertificationStatusToSafetyAuditSealStatus(
    outcomeCertification.candidateFinalSummaryOutcomeCertificationStatus,
  );

  const safetySealItems: CandidateFinalSummarySafetySealItem[] =
    outcomeCertification.outcomeCertificationItems.map((item) => ({
      taskId: item.taskId,
      taskName: item.taskName,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      safetySealStatus: item.outcomeCertificationStatus,
      displayOrder: item.displayOrder,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isEmpty: item.isEmpty,
      isLocked: item.isLocked,
      message: `${item.message} / Safety Audit Seal 완료`,
      isDisplayOnly: true,
      actualExecutionBlocked: true,
      mutationBlocked: true,
      apiCallBlocked: true,
    }));

  const sealedReadyFlowCount = safetySealItems.filter((item) => item.isReady).length;
  const sealedPartialReadyFlowCount = safetySealItems.filter((item) => item.isPartialReady).length;
  const sealedBlockedFlowCount = safetySealItems.filter((item) => item.isBlocked).length;
  const sealedEmptyFlowCount = safetySealItems.filter((item) => item.isEmpty).length;
  const sealedLockedFlowCount = safetySealItems.filter((item) => item.isLocked).length;
  const totalSealedFlowCount = safetySealItems.length;

  const safetySealSummaryCards: CandidateFinalSummarySafetySealCard[] = [
    { label: '봉인 완료', count: sealedReadyFlowCount, cardType: 'READY' },
    { label: '부분 봉인', count: sealedPartialReadyFlowCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: sealedBlockedFlowCount, cardType: 'BLOCKED' },
    { label: '비어 있음', count: sealedEmptyFlowCount, cardType: 'EMPTY' },
    { label: '잠금됨', count: sealedLockedFlowCount, cardType: 'LOCKED' },
  ];

  const safetyAuditSealReady =
    candidateFinalSummarySafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY';
  const safetyAuditSealPartialReady =
    candidateFinalSummarySafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY';
  const safetyAuditSealBlocked =
    candidateFinalSummarySafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED';
  const safetyAuditSealEmpty =
    candidateFinalSummarySafetyAuditSealStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_EMPTY';

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_VIEW',
    taskId: 317,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Final Summary Safety Audit Seal Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 최종 요약 Safety Audit Seal',
    description:
      'Task 316 후보 최종 요약 결과 인증 이후의 안전 조건을 read-only로 봉인합니다. 이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아닙니다.',
    currentTaskNumber: 317,
    referenceTaskNumbers: [316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateFinalSummaryOutcomeCertificationStatus:
      outcomeCertification.candidateFinalSummaryOutcomeCertificationStatus,
    candidateFinalSummarySafetyAuditSealStatus,
    safetySealItems,
    safetySealSummaryCards,
    safetyAuditSealReady,
    safetyAuditSealPartialReady,
    safetyAuditSealBlocked,
    safetyAuditSealEmpty,
    sealedReadyFlowCount,
    sealedPartialReadyFlowCount,
    sealedBlockedFlowCount,
    sealedEmptyFlowCount,
    sealedLockedFlowCount,
    totalSealedFlowCount,
    candidateReadOnlyFlowStillCompleted: true,
    candidateFlowStillDisplayOnly: true,
    safeDisplayFieldsStillCertified: true,
    excludedFieldsStillCertified: true,
    executionStillLocked: true,
    mutationStillBlocked: true,
    apiCallStillBlocked: true,
    isReadOnlyCandidateFinalSummarySafetyAuditSeal: true,
    requiresSeparateTask318Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_318_APPROVAL_PHRASE,
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
