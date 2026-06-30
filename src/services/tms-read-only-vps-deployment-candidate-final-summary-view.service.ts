import {
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus,
} from './tms-read-only-vps-deployment-candidate-detail-review-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
} from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus,
} from './tms-read-only-vps-deployment-candidate-readiness-review-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus,
} from './tms-read-only-vps-deployment-candidate-readiness-review-outcome-certification-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealStatus,
} from './tms-read-only-vps-deployment-candidate-readiness-review-safety-audit-seal-view.service';
import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationStatus,
} from './tms-read-only-vps-deployment-candidate-readiness-review-safety-audit-seal-outcome-certification-view.service';

export type TmsReadOnlyVpsDeploymentCandidateFinalSummaryStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateFinalSummaryItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export const NEXT_TASK_331_APPROVAL_PHRASE =
  'Task 331에서 TMS read-only VPS 배포 후보 Final Summary Outcome Certification 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 330 VPS 후보 Final Summary 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem {
  summaryItemId: string;
  taskId: number;
  taskName: string;
  sourceStatus: string;
  summaryStatus: TmsReadOnlyVpsDeploymentCandidateFinalSummaryItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummarySourceTaskStatuses {
  task322: string;
  task323: string;
  task324: string;
  task325: string;
  task326: string;
  task327: string;
  task328: string;
  task329: string;
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummaryView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_VIEW';
  taskId: 330;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 330;
  referenceTaskNumbers: readonly [329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  vpsDeploymentCandidateFinalSummaryStatus: TmsReadOnlyVpsDeploymentCandidateFinalSummaryStatus;
  sourceTaskStatuses: TmsReadOnlyVpsDeploymentCandidateFinalSummarySourceTaskStatuses;
  finalSummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem[];
  finalSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryCard[];
  readySummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem[];
  partialReadySummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem[];
  blockedSummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem[];
  notStartedSummaryItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem[];
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalSummaryItemCount: number;
  vpsCandidateFlowFinalSummaryReady: boolean;
  vpsCandidateFlowFinalSummaryPartialReady: boolean;
  vpsCandidateFlowFinalSummaryBlocked: boolean;
  vpsCandidateFlowFinalSummaryNotStarted: boolean;
  vpsCandidateFlowReadOnlyCompleted: true;
  vpsCandidateFlowStillDisplayOnly: true;
  vpsCandidateFlowSafeForNextReview: true;
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
  isReadOnlyVpsDeploymentCandidateFinalSummary: true;
  requiresSeparateTask331Approval: true;
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

function classifyStatus(status: string): TmsReadOnlyVpsDeploymentCandidateFinalSummaryItemStatus {
  if (status.includes('BLOCKED')) return 'BLOCKED';
  if (status.includes('NOT_STARTED')) return 'NOT_STARTED';
  if (status.includes('PARTIAL')) return 'PARTIAL_READY';
  return 'READY';
}

function makeSummaryItem(
  taskId: number,
  taskName: string,
  sourceStatus: string,
  message: string,
): TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem {
  const summaryStatus = classifyStatus(sourceStatus);
  const isReady = summaryStatus === 'READY';
  const isPartialReady = summaryStatus === 'PARTIAL_READY';
  const isBlocked = summaryStatus === 'BLOCKED';
  const isNotStarted = summaryStatus === 'NOT_STARTED';

  return {
    summaryItemId: `final-summary-task-${taskId}`,
    taskId,
    taskName,
    sourceStatus,
    summaryStatus,
    isReady,
    isPartialReady,
    isBlocked,
    isNotStarted,
    message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

function aggregateFinalSummaryStatus(
  items: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem[],
): TmsReadOnlyVpsDeploymentCandidateFinalSummaryStatus {
  if (items.some((i) => i.isBlocked))
    return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_BLOCKED';
  if (items.some((i) => i.isNotStarted))
    return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_NOT_STARTED';
  if (items.some((i) => i.isPartialReady))
    return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY';
  return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_READY';
}

export function buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(input: {
  vpsDeploymentCandidateDetailReview: {
    vpsDeploymentCandidateDetailReviewStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus;
  };
  vpsDeploymentCandidateDetailReviewOutcomeCertification: {
    vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus;
  };
  vpsDeploymentCandidateSafetyAuditSeal: {
    vpsDeploymentCandidateSafetyAuditSealStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus;
  };
  vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: {
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus;
  };
  vpsDeploymentCandidateReadinessReview: {
    vpsDeploymentCandidateReadinessReviewStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus;
  };
  vpsDeploymentCandidateReadinessReviewOutcomeCertification: {
    vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus;
  };
  vpsDeploymentCandidateReadinessReviewSafetyAuditSeal: {
    vpsDeploymentCandidateReadinessReviewSafetyAuditSealStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealStatus;
  };
  vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertification: {
    vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationStatus;
  };
}): TmsReadOnlyVpsDeploymentCandidateFinalSummaryView {
  const s322 =
    input.vpsDeploymentCandidateDetailReview.vpsDeploymentCandidateDetailReviewStatus;
  const s323 =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification
      .vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus;
  const s324 =
    input.vpsDeploymentCandidateSafetyAuditSeal.vpsDeploymentCandidateSafetyAuditSealStatus;
  const s325 =
    input.vpsDeploymentCandidateSafetyAuditSealOutcomeCertification
      .vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus;
  const s326 =
    input.vpsDeploymentCandidateReadinessReview.vpsDeploymentCandidateReadinessReviewStatus;
  const s327 =
    input.vpsDeploymentCandidateReadinessReviewOutcomeCertification
      .vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus;
  const s328 =
    input.vpsDeploymentCandidateReadinessReviewSafetyAuditSeal
      .vpsDeploymentCandidateReadinessReviewSafetyAuditSealStatus;
  const s329 =
    input.vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertification
      .vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationStatus;

  const finalSummaryItems: TmsReadOnlyVpsDeploymentCandidateFinalSummaryItem[] = [
    makeSummaryItem(322, 'VPS 후보 상세 검토', s322, 'VPS 후보 상세 검토 흐름 read-only 완료'),
    makeSummaryItem(323, 'VPS 후보 상세 검토 결과 인증', s323, 'VPS 후보 상세 검토 결과 인증 read-only 완료'),
    makeSummaryItem(324, 'VPS 후보 Safety Audit Seal', s324, 'VPS 후보 Safety Audit Seal read-only 완료'),
    makeSummaryItem(325, 'VPS 후보 Safety Audit Seal 결과 인증', s325, 'VPS 후보 Safety Audit Seal 결과 인증 read-only 완료'),
    makeSummaryItem(326, 'VPS 후보 Readiness Review', s326, 'VPS 후보 Readiness Review read-only 완료'),
    makeSummaryItem(327, 'VPS 후보 Readiness Review 결과 인증', s327, 'VPS 후보 Readiness Review 결과 인증 read-only 완료'),
    makeSummaryItem(328, 'VPS 후보 Readiness Review Safety Audit Seal', s328, 'VPS 후보 Readiness Review Safety Audit Seal read-only 완료'),
    makeSummaryItem(329, 'VPS 후보 Readiness Review Safety Audit Seal 결과 인증', s329, 'VPS 후보 Readiness Review Safety Audit Seal 결과 인증 read-only 완료'),
  ];

  const vpsDeploymentCandidateFinalSummaryStatus = aggregateFinalSummaryStatus(finalSummaryItems);

  const readySummaryItems = finalSummaryItems.filter((i) => i.isReady);
  const partialReadySummaryItems = finalSummaryItems.filter((i) => i.isPartialReady);
  const blockedSummaryItems = finalSummaryItems.filter((i) => i.isBlocked);
  const notStartedSummaryItems = finalSummaryItems.filter((i) => i.isNotStarted);

  const finalSummaryCards: TmsReadOnlyVpsDeploymentCandidateFinalSummaryCard[] = [
    {
      label: 'VPS 후보 검토 흐름 완료',
      value: `Task 322~329`,
      tone: 'positive',
    },
    {
      label: 'READY',
      value: `${readySummaryItems.length}개`,
      tone: 'positive',
    },
    {
      label: 'PARTIAL / BLOCKED / N/S',
      value: `${partialReadySummaryItems.length + blockedSummaryItems.length + notStartedSummaryItems.length}개`,
      tone:
        blockedSummaryItems.length > 0
          ? 'warning'
          : partialReadySummaryItems.length > 0
            ? 'warning'
            : 'neutral',
    },
    {
      label: '전체 요약 항목',
      value: `${finalSummaryItems.length}개`,
      tone: 'neutral',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_VIEW',
    taskId: 330,
    taskName: 'TMS Read-Only VPS Deployment Candidate Final Summary Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Final Summary',
    description:
      'Task 322~329 VPS 배포 후보 검토 흐름을 read-only로 최종 요약합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다. Runtime, Worker, Queue, Adapter, 운영 DB, DNS, SSL, 포트포워딩, 서버/VPS 설정을 변경하지 않습니다.',
    currentTaskNumber: 330,
    referenceTaskNumbers: [329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    vpsDeploymentCandidateFinalSummaryStatus,
    sourceTaskStatuses: {
      task322: s322,
      task323: s323,
      task324: s324,
      task325: s325,
      task326: s326,
      task327: s327,
      task328: s328,
      task329: s329,
    },
    finalSummaryItems,
    finalSummaryCards,
    readySummaryItems,
    partialReadySummaryItems,
    blockedSummaryItems,
    notStartedSummaryItems,
    readyItemCount: readySummaryItems.length,
    partialReadyItemCount: partialReadySummaryItems.length,
    blockedItemCount: blockedSummaryItems.length,
    notStartedItemCount: notStartedSummaryItems.length,
    totalSummaryItemCount: finalSummaryItems.length,
    vpsCandidateFlowFinalSummaryReady:
      vpsDeploymentCandidateFinalSummaryStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_READY',
    vpsCandidateFlowFinalSummaryPartialReady:
      vpsDeploymentCandidateFinalSummaryStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY',
    vpsCandidateFlowFinalSummaryBlocked:
      vpsDeploymentCandidateFinalSummaryStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_BLOCKED',
    vpsCandidateFlowFinalSummaryNotStarted:
      vpsDeploymentCandidateFinalSummaryStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_NOT_STARTED',
    vpsCandidateFlowReadOnlyCompleted: true,
    vpsCandidateFlowStillDisplayOnly: true,
    vpsCandidateFlowSafeForNextReview: true,
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
    isReadOnlyVpsDeploymentCandidateFinalSummary: true,
    requiresSeparateTask331Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_331_APPROVAL_PHRASE,
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
