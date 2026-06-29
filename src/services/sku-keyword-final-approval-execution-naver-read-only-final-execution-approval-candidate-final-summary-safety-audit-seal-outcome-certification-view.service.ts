import {
  CandidateFinalSummarySafetySealItem,
  NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-safety-audit-seal-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_EMPTY';

export const NEXT_TASK_319_APPROVAL_PHRASE =
  'Task 319에서 Naver read-only 최종 실행 승인 후보 흐름 Closure Summary 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 310~318 후보 목록·상세 검토·인증·안전 봉인 흐름을 read-only로 닫고, 다음 배포/도메인 준비 전 상태를 요약하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface CandidateFinalSummarySafetyAuditSealOutcomeCertificationItem {
  taskId: number;
  taskName: string;
  sourceSafetySealStatus: string;
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

export interface CandidateFinalSummarySafetyAuditSealOutcomeCertificationCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_VIEW';
  taskId: 318;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 318;
  referenceTaskNumbers: readonly [317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateFinalSummarySafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus;
  candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus;
  outcomeCertificationItems: readonly CandidateFinalSummarySafetyAuditSealOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly CandidateFinalSummarySafetyAuditSealOutcomeCertificationCard[];
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
  isReadOnlyCandidateFinalSummarySafetyAuditSealOutcomeCertification: true;
  requiresSeparateTask319Approval: true;
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

function mapSafetyAuditSealStatusToOutcomeCertificationStatus(
  status: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus,
): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus {
  switch (status) {
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED';
    case 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_EMPTY':
      return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_EMPTY';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

export function buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(input: {
  safetyAuditSeal: {
    candidateFinalSummarySafetyAuditSealStatus: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealStatus;
    safetySealItems: readonly CandidateFinalSummarySafetySealItem[];
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealOutcomeCertificationView {
  const { safetyAuditSeal } = input;
  const candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus =
    mapSafetyAuditSealStatusToOutcomeCertificationStatus(
      safetyAuditSeal.candidateFinalSummarySafetyAuditSealStatus,
    );

  const outcomeCertificationItems: CandidateFinalSummarySafetyAuditSealOutcomeCertificationItem[] =
    safetyAuditSeal.safetySealItems.map((item) => ({
      taskId: item.taskId,
      taskName: item.taskName,
      sourceSafetySealStatus: item.safetySealStatus,
      outcomeCertificationStatus: item.safetySealStatus,
      displayOrder: item.displayOrder,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isEmpty: item.isEmpty,
      isLocked: item.isLocked,
      message: `${item.message} / 결과 인증 완료`,
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

  const outcomeCertificationSummaryCards: CandidateFinalSummarySafetyAuditSealOutcomeCertificationCard[] = [
    { label: '인증 완료', count: certifiedReadyFlowCount, cardType: 'READY' },
    { label: '부분 인증', count: certifiedPartialReadyFlowCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: certifiedBlockedFlowCount, cardType: 'BLOCKED' },
    { label: '비어 있음', count: certifiedEmptyFlowCount, cardType: 'EMPTY' },
    { label: '잠금됨', count: certifiedLockedFlowCount, cardType: 'LOCKED' },
  ];

  const outcomeCertifiedReady =
    candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY';
  const outcomeCertifiedPartialReady =
    candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY';
  const outcomeCertificationBlocked =
    candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED';
  const outcomeCertificationEmpty =
    candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_EMPTY';

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_VIEW',
    taskId: 318,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Final Summary Safety Audit Seal Outcome Certification Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 최종 요약 Safety Audit Seal 결과 인증',
    description:
      'Task 317 후보 최종 요약 Safety Audit Seal 결과를 read-only로 인증합니다. 이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아닙니다.',
    currentTaskNumber: 318,
    referenceTaskNumbers: [317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateFinalSummarySafetyAuditSealStatus:
      safetyAuditSeal.candidateFinalSummarySafetyAuditSealStatus,
    candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus,
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
    isReadOnlyCandidateFinalSummarySafetyAuditSealOutcomeCertification: true,
    requiresSeparateTask319Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_319_APPROVAL_PHRASE,
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
