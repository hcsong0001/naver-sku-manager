import {
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewView,
} from './tms-read-only-vps-deployment-candidate-detail-review-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewView,
} from './tms-read-only-vps-deployment-candidate-readiness-review-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-readiness-review-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-readiness-review-safety-audit-seal-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-readiness-review-safety-audit-seal-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateFinalSummaryView,
} from './tms-read-only-vps-deployment-candidate-final-summary-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-final-summary-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-final-summary-safety-audit-seal-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-final-summary-safety-audit-seal-outcome-certification-view.service';

export type TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateClosureItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export const NEXT_TASK_335_APPROVAL_PHRASE =
  'Task 335에서 TMS read-only VPS 배포 후보 Closure Summary Outcome Certification 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 334 VPS 후보 Closure Summary 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem {
  closureItemId: string;
  taskId: number;
  taskName: string;
  sourceStatus: string;
  closureStatus: TmsReadOnlyVpsDeploymentCandidateClosureItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummaryView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_VIEW';
  taskId: 334;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 334;
  referenceTaskNumbers: readonly [333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  vpsDeploymentCandidateClosureSummaryStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus;
  sourceTaskStatuses: {
    task322: string;
    task323: string;
    task324: string;
    task325: string;
    task326: string;
    task327: string;
    task328: string;
    task329: string;
    task330: string;
    task331: string;
    task332: string;
    task333: string;
  };
  closureSummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem[];
  closureSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryCard[];
  readyClosureItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem[];
  partialReadyClosureItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem[];
  blockedClosureItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem[];
  notStartedClosureItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem[];
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalClosureItemCount: number;
  vpsCandidateClosureReady: boolean;
  vpsCandidateClosurePartialReady: boolean;
  vpsCandidateClosureBlocked: boolean;
  vpsCandidateClosureNotStarted: boolean;
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
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  operatingDbConnectionChanged: false;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  dbWritePerformed: false;
  envFileReadOrModified: false;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyVpsDeploymentCandidateClosureSummary: true;
  requiresSeparateTask335Approval: true;
  nextTaskApprovalPhrase: string;
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
}

function classifyStatus(status: string): TmsReadOnlyVpsDeploymentCandidateClosureItemStatus {
  if (status.includes('BLOCKED')) return 'BLOCKED';
  if (status.includes('NOT_STARTED')) return 'NOT_STARTED';
  if (status.includes('PARTIAL')) return 'PARTIAL_READY';
  return 'READY';
}

function aggregateClosureStatus(
  items: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem[],
): TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus {
  if (items.some((i) => i.isBlocked)) {
    return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_BLOCKED';
  }
  if (items.some((i) => i.isNotStarted)) {
    return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_NOT_STARTED';
  }
  if (items.some((i) => i.isPartialReady)) {
    return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_PARTIAL_READY';
  }
  return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_READY';
}

function makeClosureItem(
  taskId: number,
  taskName: string,
  sourceStatus: string,
): TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem {
  const closureStatus = classifyStatus(sourceStatus);
  const isReady = closureStatus === 'READY';
  const isPartialReady = closureStatus === 'PARTIAL_READY';
  const isBlocked = closureStatus === 'BLOCKED';
  const isNotStarted = closureStatus === 'NOT_STARTED';
  return {
    closureItemId: `closure-task-${taskId}`,
    taskId,
    taskName,
    sourceStatus,
    closureStatus,
    isReady,
    isPartialReady,
    isBlocked,
    isNotStarted,
    message: `Task ${taskId} ${taskName} 흐름 read-only Closure 완료`,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(input: {
  vpsDeploymentCandidateDetailReview: TmsReadOnlyVpsDeploymentCandidateDetailReviewView;
  vpsDeploymentCandidateDetailReviewOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView;
  vpsDeploymentCandidateSafetyAuditSeal: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView;
  vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView;
  vpsDeploymentCandidateReadinessReview: TmsReadOnlyVpsDeploymentCandidateReadinessReviewView;
  vpsDeploymentCandidateReadinessReviewOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView;
  vpsDeploymentCandidateReadinessReviewSafetyAuditSeal: TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealView;
  vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationView;
  vpsDeploymentCandidateFinalSummary: TmsReadOnlyVpsDeploymentCandidateFinalSummaryView;
  vpsDeploymentCandidateFinalSummaryOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView;
  vpsDeploymentCandidateFinalSummarySafetyAuditSeal: TmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView;
  vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView;
}): TmsReadOnlyVpsDeploymentCandidateClosureSummaryView {
  const t322Status =
    input.vpsDeploymentCandidateDetailReview.vpsDeploymentCandidateDetailReviewStatus;
  const t323Status =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification
      .vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus;
  const t324Status =
    input.vpsDeploymentCandidateSafetyAuditSeal.vpsDeploymentCandidateSafetyAuditSealStatus;
  const t325Status =
    input.vpsDeploymentCandidateSafetyAuditSealOutcomeCertification
      .vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus;
  const t326Status =
    input.vpsDeploymentCandidateReadinessReview.vpsDeploymentCandidateReadinessReviewStatus;
  const t327Status =
    input.vpsDeploymentCandidateReadinessReviewOutcomeCertification
      .vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus;
  const t328Status =
    input.vpsDeploymentCandidateReadinessReviewSafetyAuditSeal
      .vpsDeploymentCandidateReadinessReviewSafetyAuditSealStatus;
  const t329Status =
    input.vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertification
      .vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationStatus;
  const t330Status =
    input.vpsDeploymentCandidateFinalSummary.vpsDeploymentCandidateFinalSummaryStatus;
  const t331Status =
    input.vpsDeploymentCandidateFinalSummaryOutcomeCertification
      .vpsDeploymentCandidateFinalSummaryOutcomeCertificationStatus;
  const t332Status =
    input.vpsDeploymentCandidateFinalSummarySafetyAuditSeal
      .vpsDeploymentCandidateFinalSummarySafetyAuditSealStatus;
  const t333Status =
    input.vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertification
      .vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus;

  const closureSummaryItems: TmsReadOnlyVpsDeploymentCandidateClosureSummaryItem[] = [
    makeClosureItem(322, 'VPS 후보 상세 검토', t322Status),
    makeClosureItem(323, 'VPS 후보 상세 검토 결과 인증', t323Status),
    makeClosureItem(324, 'VPS 후보 Safety Audit Seal', t324Status),
    makeClosureItem(325, 'VPS 후보 Safety Audit Seal 결과 인증', t325Status),
    makeClosureItem(326, 'VPS 후보 Readiness Review', t326Status),
    makeClosureItem(327, 'VPS 후보 Readiness Review 결과 인증', t327Status),
    makeClosureItem(328, 'VPS 후보 Readiness Review Safety Audit Seal', t328Status),
    makeClosureItem(329, 'VPS 후보 Readiness Review Safety Audit Seal 결과 인증', t329Status),
    makeClosureItem(330, 'VPS 후보 Final Summary', t330Status),
    makeClosureItem(331, 'VPS 후보 Final Summary 결과 인증', t331Status),
    makeClosureItem(332, 'VPS 후보 Final Summary Safety Audit Seal', t332Status),
    makeClosureItem(333, 'VPS 후보 Final Summary Safety Audit Seal 결과 인증', t333Status),
  ];

  const closureStatus = aggregateClosureStatus(closureSummaryItems);

  const readyClosureItems = closureSummaryItems.filter((i) => i.isReady);
  const partialReadyClosureItems = closureSummaryItems.filter((i) => i.isPartialReady);
  const blockedClosureItems = closureSummaryItems.filter((i) => i.isBlocked);
  const notStartedClosureItems = closureSummaryItems.filter((i) => i.isNotStarted);

  const closureSummaryCards: TmsReadOnlyVpsDeploymentCandidateClosureSummaryCard[] = [
    {
      label: 'Closure Summary 상태',
      value: closureStatus.includes('_READY') && !closureStatus.includes('PARTIAL')
        ? 'READY'
        : closureStatus.includes('PARTIAL')
          ? 'PARTIAL_READY'
          : closureStatus.includes('BLOCKED')
            ? 'BLOCKED'
            : 'NOT_STARTED',
      tone: closureStatus.includes('_READY') && !closureStatus.includes('PARTIAL')
        ? 'positive'
        : closureStatus.includes('BLOCKED')
          ? 'warning'
          : 'neutral',
    },
    {
      label: 'READY 항목',
      value: `${readyClosureItems.length}개`,
      tone: readyClosureItems.length === closureSummaryItems.length ? 'positive' : 'neutral',
    },
    {
      label: 'PARTIAL / BLOCKED / N/S',
      value: `${partialReadyClosureItems.length + blockedClosureItems.length + notStartedClosureItems.length}개`,
      tone:
        blockedClosureItems.length > 0
          ? 'warning'
          : partialReadyClosureItems.length > 0
            ? 'warning'
            : 'neutral',
    },
    {
      label: '전체 Closure 항목',
      value: `${closureSummaryItems.length}개`,
      tone: 'neutral',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_VIEW',
    taskId: 334,
    taskName:
      'TMS Read-Only VPS Deployment Candidate Closure Summary Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Closure Summary',
    description:
      'Task 322~333 VPS 배포 후보 검토·인증·안전 봉인·최종 요약 흐름을 read-only로 닫는 Closure Summary 화면입니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.',
    currentTaskNumber: 334,
    referenceTaskNumbers: [333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    vpsDeploymentCandidateClosureSummaryStatus: closureStatus,
    sourceTaskStatuses: {
      task322: t322Status,
      task323: t323Status,
      task324: t324Status,
      task325: t325Status,
      task326: t326Status,
      task327: t327Status,
      task328: t328Status,
      task329: t329Status,
      task330: t330Status,
      task331: t331Status,
      task332: t332Status,
      task333: t333Status,
    },
    closureSummaryItems,
    closureSummaryCards,
    readyClosureItems,
    partialReadyClosureItems,
    blockedClosureItems,
    notStartedClosureItems,
    readyItemCount: readyClosureItems.length,
    partialReadyItemCount: partialReadyClosureItems.length,
    blockedItemCount: blockedClosureItems.length,
    notStartedItemCount: notStartedClosureItems.length,
    totalClosureItemCount: closureSummaryItems.length,
    vpsCandidateClosureReady:
      closureStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_READY',
    vpsCandidateClosurePartialReady:
      closureStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_PARTIAL_READY',
    vpsCandidateClosureBlocked:
      closureStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_BLOCKED',
    vpsCandidateClosureNotStarted:
      closureStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_NOT_STARTED',
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
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    operatingDbConnectionChanged: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    dbWritePerformed: false,
    envFileReadOrModified: false,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyVpsDeploymentCandidateClosureSummary: true,
    requiresSeparateTask335Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_335_APPROVAL_PHRASE,
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
  };
}
