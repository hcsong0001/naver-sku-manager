import {
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-safety-audit-seal-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-safety-audit-seal-outcome-certification-view.service';

export type TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryCategory =
  | 'VPS_CANDIDATE_DETAIL_REVIEW'
  | 'READINESS_REVIEW'
  | 'FINAL_SUMMARY'
  | 'CLOSURE_SUMMARY'
  | 'CLOSURE_OUTCOME_CERTIFICATION'
  | 'CLOSURE_SAFETY_AUDIT_SEAL'
  | 'CLOSURE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION';

export const NEXT_TASK_339_APPROVAL_PHRASE =
  'Task 339에서 TMS read-only VPS 배포 후보 Final Closure Summary 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 338 VPS 후보 Final Closure Summary 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItem {
  summaryId: string;
  sourceTaskId: number;
  sourceTaskName: string;
  sourceStatus: string;
  normalizedStatus: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItemStatus;
  category: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryCategory;
  label: string;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_VIEW';
  taskId: 338;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 338;
  referenceTaskNumbers: readonly [337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateClosureSummaryStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus;
  sourceVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus;
  sourceVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus;
  sourceVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus;
  vpsDeploymentCandidateFinalClosureSummaryStatus: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryStatus;
  finalClosureSummaryCompleted: true;
  finalClosureSummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItem[];
  closureSummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItem[];
  postClosureSummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItem[];
  finalClosureSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryCard[];
  readyCount: number;
  partialReadyCount: number;
  blockedCount: number;
  notStartedCount: number;
  totalFinalClosureTargetCount: number;
  totalClosureTargetCount: number;
  totalPostClosureTargetCount: number;
  finalClosureSummaryReady: boolean;
  finalClosureSummaryPartialReady: boolean;
  finalClosureSummaryBlocked: boolean;
  finalClosureSummaryNotStarted: boolean;
  vpsCandidateFlowClosureCompleted: true;
  vpsCandidateFlowReadOnlyCompleted: true;
  vpsCandidateFlowStillDisplayOnly: true;
  vpsCandidateFlowSafeForNextReview: true;
  vpsCandidateFlowClosedWithoutActualDeployment: true;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualProductionTransitionStarted: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  dbWritePerformed: false;
  envFileReadOrModified: false;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  submitActionAdded: false;
  postApiAdded: false;
  priceChanged: false;
  stockChanged: false;
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
  isReadOnlyVpsDeploymentCandidateFinalClosureSummary: true;
  requiresSeparateTask339Approval: true;
  nextTaskApprovalPhrase: string;
}

function mapTask337Status(
  status: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus,
): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Closure Summary Safety Audit Seal Outcome Certification status: ${_exhaustiveCheck}`);
    }
  }
}

function mapClosureSummaryStatus(
  status: TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus,
): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_READY':
      return 'READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Closure Summary status: ${_exhaustiveCheck}`);
    }
  }
}

function mapOutcomeCertificationStatus(
  status: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_READY':
      return 'READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Closure Summary Outcome Certification status: ${_exhaustiveCheck}`);
    }
  }
}

function mapSafetySealStatus(
  status: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY':
      return 'READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Closure Summary Safety Audit Seal status: ${_exhaustiveCheck}`);
    }
  }
}

function mapSealOutcomeCertificationStatus(
  status: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus,
): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY':
      return 'READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Closure Summary Safety Audit Seal Outcome Certification status: ${_exhaustiveCheck}`);
    }
  }
}

function resolveFlowCategory(
  taskId: number,
): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryCategory {
  if (taskId >= 322 && taskId <= 325) return 'VPS_CANDIDATE_DETAIL_REVIEW';
  if (taskId >= 326 && taskId <= 329) return 'READINESS_REVIEW';
  return 'FINAL_SUMMARY';
}

function makeItem(input: {
  summaryId: string;
  sourceTaskId: number;
  sourceTaskName: string;
  sourceStatus: string;
  normalizedStatus: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItemStatus;
  category: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryCategory;
  label: string;
  message: string;
}): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItem {
  return {
    summaryId: input.summaryId,
    sourceTaskId: input.sourceTaskId,
    sourceTaskName: input.sourceTaskName,
    sourceStatus: input.sourceStatus,
    normalizedStatus: input.normalizedStatus,
    category: input.category,
    label: input.label,
    isReady: input.normalizedStatus === 'READY',
    isPartialReady: input.normalizedStatus === 'PARTIAL_READY',
    isBlocked: input.normalizedStatus === 'BLOCKED',
    isNotStarted: input.normalizedStatus === 'NOT_STARTED',
    message: input.message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryView(input: {
  vpsDeploymentCandidateClosureSummary: TmsReadOnlyVpsDeploymentCandidateClosureSummaryView;
  vpsDeploymentCandidateClosureSummaryOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView;
  vpsDeploymentCandidateClosureSummarySafetyAuditSeal: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView;
  vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationView;
}): TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryView {
  const closureSummary = input.vpsDeploymentCandidateClosureSummary;
  const outcomeCertification = input.vpsDeploymentCandidateClosureSummaryOutcomeCertification;
  const safetySeal = input.vpsDeploymentCandidateClosureSummarySafetyAuditSeal;
  const sealOutcomeCertification =
    input.vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertification;

  const closureSummaryItems =
    closureSummary.closureSummaryItems.map<TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItem>(
      (item) =>
        makeItem({
          summaryId: `final-closure-summary-task-${item.taskId}`,
          sourceTaskId: item.taskId,
          sourceTaskName: item.taskName,
          sourceStatus: item.sourceStatus,
          normalizedStatus: item.closureStatus,
          category: resolveFlowCategory(item.taskId),
          label: `Task ${item.taskId} ${item.taskName}`,
          message: item.message,
        }),
    );

  const postClosureSummaryItems: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryItem[] = [
    makeItem({
      summaryId: 'final-closure-summary-task-334',
      sourceTaskId: 334,
      sourceTaskName: 'VPS 후보 Closure Summary',
      sourceStatus: closureSummary.vpsDeploymentCandidateClosureSummaryStatus,
      normalizedStatus: mapClosureSummaryStatus(
        closureSummary.vpsDeploymentCandidateClosureSummaryStatus,
      ),
      category: 'CLOSURE_SUMMARY',
      label: 'Task 334 VPS 후보 Closure Summary',
      message: 'Task 322~333 Closure 대상 12개 흐름이 read-only Closure Summary로 유지되었는지 최종 요약합니다.',
    }),
    makeItem({
      summaryId: 'final-closure-summary-task-335',
      sourceTaskId: 335,
      sourceTaskName: 'VPS 후보 Closure Summary 결과 인증',
      sourceStatus:
        outcomeCertification.vpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
      normalizedStatus: mapOutcomeCertificationStatus(
        outcomeCertification.vpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
      ),
      category: 'CLOSURE_OUTCOME_CERTIFICATION',
      label: 'Task 335 VPS 후보 Closure Summary 결과 인증',
      message: 'Task 334 Closure Summary 결과가 read-only 기준으로 인증되었는지 최종 요약합니다.',
    }),
    makeItem({
      summaryId: 'final-closure-summary-task-336',
      sourceTaskId: 336,
      sourceTaskName: 'VPS 후보 Closure Summary Safety Audit Seal',
      sourceStatus: safetySeal.vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
      normalizedStatus: mapSafetySealStatus(
        safetySeal.vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
      ),
      category: 'CLOSURE_SAFETY_AUDIT_SEAL',
      label: 'Task 336 VPS 후보 Closure Summary Safety Audit Seal',
      message: 'Task 335 이후 안전 조건이 read-only Safety Audit Seal로 봉인되었는지 최종 요약합니다.',
    }),
    makeItem({
      summaryId: 'final-closure-summary-task-337',
      sourceTaskId: 337,
      sourceTaskName: 'VPS 후보 Closure Summary Safety Audit Seal 결과 인증',
      sourceStatus:
        sealOutcomeCertification.vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus,
      normalizedStatus: mapSealOutcomeCertificationStatus(
        sealOutcomeCertification.vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus,
      ),
      category: 'CLOSURE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION',
      label: 'Task 337 VPS 후보 Closure Summary Safety Audit Seal 결과 인증',
      message: 'Task 336 Safety Audit Seal 결과가 read-only로 재인증되었는지 최종 요약합니다.',
    }),
  ];

  const finalClosureSummaryItems = [...closureSummaryItems, ...postClosureSummaryItems];
  const finalStatus = mapTask337Status(
    sealOutcomeCertification.vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus,
  );

  const readyCount = finalClosureSummaryItems.filter((item) => item.isReady).length;
  const partialReadyCount = finalClosureSummaryItems.filter((item) => item.isPartialReady).length;
  const blockedCount = finalClosureSummaryItems.filter((item) => item.isBlocked).length;
  const notStartedCount = finalClosureSummaryItems.filter((item) => item.isNotStarted).length;

  const finalClosureSummaryCards: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryCard[] = [
    {
      label: 'Final Closure Summary 상태',
      value:
        finalStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_READY'
          ? 'READY'
          : finalStatus ===
              'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_PARTIAL_READY'
            ? 'PARTIAL_READY'
            : finalStatus ===
                'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_BLOCKED'
              ? 'BLOCKED'
              : 'NOT_STARTED',
      tone:
        finalStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_READY'
          ? 'positive'
          : finalStatus ===
              'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '최종 요약 대상',
      value: `${finalClosureSummaryItems.length}개`,
      tone: 'neutral',
    },
    {
      label: 'Closure 대상 / 후속 대상',
      value: `${closureSummaryItems.length} / ${postClosureSummaryItems.length}`,
      tone: 'neutral',
    },
    {
      label: 'READY / PARTIAL / BLOCKED / N/S',
      value: `${readyCount} / ${partialReadyCount} / ${blockedCount} / ${notStartedCount}`,
      tone: blockedCount > 0 ? 'warning' : partialReadyCount > 0 ? 'warning' : 'positive',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_VIEW',
    taskId: 338,
    taskName: 'TMS Read-Only VPS Deployment Candidate Final Closure Summary Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Final Closure Summary',
    description:
      '이 패널은 Task 322~337 VPS 후보 흐름을 최종적으로 read-only 요약하는 화면입니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다. Runtime, Worker, Queue, Adapter, Naver API, DB write를 실행하지 않습니다.',
    currentTaskNumber: 338,
    referenceTaskNumbers: [337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateClosureSummaryStatus:
      closureSummary.vpsDeploymentCandidateClosureSummaryStatus,
    sourceVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus:
      outcomeCertification.vpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
    sourceVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus:
      safetySeal.vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
    sourceVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus:
      sealOutcomeCertification.vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationStatus,
    vpsDeploymentCandidateFinalClosureSummaryStatus: finalStatus,
    finalClosureSummaryCompleted: true,
    finalClosureSummaryItems,
    closureSummaryItems,
    postClosureSummaryItems,
    finalClosureSummaryCards,
    readyCount,
    partialReadyCount,
    blockedCount,
    notStartedCount,
    totalFinalClosureTargetCount: finalClosureSummaryItems.length,
    totalClosureTargetCount: closureSummaryItems.length,
    totalPostClosureTargetCount: postClosureSummaryItems.length,
    finalClosureSummaryReady:
      finalStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_READY',
    finalClosureSummaryPartialReady:
      finalStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_PARTIAL_READY',
    finalClosureSummaryBlocked:
      finalStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_BLOCKED',
    finalClosureSummaryNotStarted:
      finalStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_NOT_STARTED',
    vpsCandidateFlowClosureCompleted: true,
    vpsCandidateFlowReadOnlyCompleted: true,
    vpsCandidateFlowStillDisplayOnly: true,
    vpsCandidateFlowSafeForNextReview: true,
    vpsCandidateFlowClosedWithoutActualDeployment: true,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    dbWritePerformed: false,
    envFileReadOrModified: false,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    priceChanged: false,
    stockChanged: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    isReadOnlyVpsDeploymentCandidateFinalClosureSummary: true,
    requiresSeparateTask339Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_339_APPROVAL_PHRASE,
  };
}
