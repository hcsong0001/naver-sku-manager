import {
  type TmsReadOnlyVpsDeploymentCandidateFinalSummaryStatus,
  type TmsReadOnlyVpsDeploymentCandidateFinalSummaryView,
} from './tms-read-only-vps-deployment-candidate-final-summary-view.service';

export type TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export const NEXT_TASK_332_APPROVAL_PHRASE =
  'Task 332에서 TMS read-only VPS 배포 후보 Final Summary Safety Audit Seal 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 331 Final Summary Outcome Certification 이후에도 실제 VPS 생성·Runtime 구성·운영 DB 연결·Worker/Queue/Adapter 연결·도메인 연결·Naver API 호출·DB write가 차단 상태인지 read-only로 봉인하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItem {
  certificationId: string;
  sourceSummaryItemId: string;
  taskId: number;
  taskName: string;
  sourceStatus: string;
  outcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyOutcomeCertificationItem {
  certificationId: string;
  label: string;
  certified: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFICATION_VIEW';
  taskId: 331;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 331;
  referenceTaskNumbers: readonly [330, 329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateFinalSummaryStatus: TmsReadOnlyVpsDeploymentCandidateFinalSummaryStatus;
  vpsDeploymentCandidateFinalSummaryOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationStatus;
  finalSummaryOutcomeCertified: true;
  finalSummaryItemsCertified: true;
  readySummaryItemsCertified: true;
  partialReadySummaryItemsCertified: true;
  blockedSummaryItemsCertified: true;
  notStartedSummaryItemsCertified: true;
  outcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItem[];
  readyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItem[];
  safetyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationCard[];
  outcomeCertifiedReady: boolean;
  outcomeCertifiedPartialReady: boolean;
  outcomeCertificationBlocked: boolean;
  outcomeCertificationNotStarted: boolean;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalOutcomeCertificationItemCount: number;
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
  isReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertification: true;
  requiresSeparateTask332Approval: true;
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

function mapFinalSummaryStatus(
  status: TmsReadOnlyVpsDeploymentCandidateFinalSummaryStatus,
): TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Final Summary status: ${_exhaustiveCheck}`);
    }
  }
}

function mapItemStatus(
  summaryStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'NOT_STARTED',
): TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItemStatus {
  switch (summaryStatus) {
    case 'READY':
      return 'READY';
    case 'PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'BLOCKED':
      return 'BLOCKED';
    case 'NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = summaryStatus;
      throw new Error(`Unknown item status: ${_exhaustiveCheck}`);
    }
  }
}

export function buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView(input: {
  vpsDeploymentCandidateFinalSummary: TmsReadOnlyVpsDeploymentCandidateFinalSummaryView;
}): TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView {
  const src = input.vpsDeploymentCandidateFinalSummary;

  const certStatus = mapFinalSummaryStatus(src.vpsDeploymentCandidateFinalSummaryStatus);

  const outcomeCertificationItems: TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationItem[] =
    src.finalSummaryItems.map((item) => {
      const certItemStatus = mapItemStatus(item.summaryStatus);
      const isReady = certItemStatus === 'READY';
      const isPartialReady = certItemStatus === 'PARTIAL_READY';
      const isBlocked = certItemStatus === 'BLOCKED';
      const isNotStarted = certItemStatus === 'NOT_STARTED';
      return {
        certificationId: `outcome-cert-task-${item.taskId}`,
        sourceSummaryItemId: item.summaryItemId,
        taskId: item.taskId,
        taskName: `${item.taskName} 결과 인증`,
        sourceStatus: item.summaryStatus,
        outcomeCertificationStatus: certItemStatus,
        isReady,
        isPartialReady,
        isBlocked,
        isNotStarted,
        message: `Task ${item.taskId} ${item.taskName} 흐름 결과 read-only 인증 완료`,
        isReadOnly: true,
        actualChangePerformed: false,
      };
    });

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (i) => i.isPartialReady,
  );
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isBlocked);
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (i) => i.isNotStarted,
  );

  const safetyOutcomeCertificationItems: TmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyOutcomeCertificationItem[] =
    [
      {
        certificationId: 'safety-cert-readonly-flow',
        label: 'VPS 후보 흐름 read-only 완료 인증',
        certified: true,
        message: 'Task 322~329 VPS 후보 흐름 전체가 read-only로 완료됨을 인증합니다.',
        isReadOnly: true,
        actualChangePerformed: false,
      },
      {
        certificationId: 'safety-cert-no-deployment',
        label: '실제 배포 미수행 인증',
        certified: true,
        message: '실제 VPS 배포 실행이 수행되지 않았음을 인증합니다.',
        isReadOnly: true,
        actualChangePerformed: false,
      },
      {
        certificationId: 'safety-cert-no-domain',
        label: '도메인 연결 미수행 인증',
        certified: true,
        message: '실제 도메인 연결 작업이 수행되지 않았음을 인증합니다.',
        isReadOnly: true,
        actualChangePerformed: false,
      },
      {
        certificationId: 'safety-cert-no-runtime-worker',
        label: 'Runtime / Worker / Queue / Adapter 미연결 인증',
        certified: true,
        message: 'Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결이 수행되지 않았음을 인증합니다.',
        isReadOnly: true,
        actualChangePerformed: false,
      },
      {
        certificationId: 'safety-cert-no-api-db',
        label: 'API / DB write 차단 유지 인증',
        certified: true,
        message: 'Naver API 호출과 DB write가 수행되지 않았음을 인증합니다.',
        isReadOnly: true,
        actualChangePerformed: false,
      },
      {
        certificationId: 'safety-cert-no-env',
        label: '.env / .env.local 비열람·비수정 인증',
        certified: true,
        message: '.env / .env.local 파일 열람 및 수정이 수행되지 않았음을 인증합니다.',
        isReadOnly: true,
        actualChangePerformed: false,
      },
      {
        certificationId: 'safety-cert-task332-approval',
        label: 'Task 332 별도 승인 대기 인증',
        certified: true,
        message: 'Task 332 진행 전 사용자 별도 명시 승인이 필요함을 인증합니다.',
        isReadOnly: true,
        actualChangePerformed: false,
      },
    ];

  const outcomeCertificationSummaryCards: TmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationCard[] =
    [
      {
        label: 'Outcome Certification 상태',
        value: certStatus.includes('CERTIFIED_READY')
          ? 'CERTIFIED_READY'
          : certStatus.includes('CERTIFIED_PARTIAL')
            ? 'CERTIFIED_PARTIAL_READY'
            : certStatus.includes('BLOCKED')
              ? 'BLOCKED'
              : 'NOT_STARTED',
        tone: certStatus.includes('CERTIFIED_READY')
          ? 'positive'
          : certStatus.includes('BLOCKED')
            ? 'warning'
            : 'neutral',
      },
      {
        label: 'READY 인증',
        value: `${readyOutcomeCertificationItems.length}개`,
        tone: 'positive',
      },
      {
        label: 'PARTIAL / BLOCKED / N/S',
        value: `${partialReadyOutcomeCertificationItems.length + blockedOutcomeCertificationItems.length + notStartedOutcomeCertificationItems.length}개`,
        tone:
          blockedOutcomeCertificationItems.length > 0
            ? 'warning'
            : partialReadyOutcomeCertificationItems.length > 0
              ? 'warning'
              : 'neutral',
      },
      {
        label: '전체 인증 항목',
        value: `${outcomeCertificationItems.length}개`,
        tone: 'neutral',
      },
    ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFICATION_VIEW',
    taskId: 331,
    taskName:
      'TMS Read-Only VPS Deployment Candidate Final Summary Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Final Summary Outcome Certification',
    description:
      'Task 330 VPS 배포 후보 Final Summary 결과를 read-only로 인증합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다. Runtime, Worker, Queue, Adapter, 운영 DB, DNS, SSL, 포트포워딩, 서버/VPS 설정을 변경하지 않습니다.',
    currentTaskNumber: 331,
    referenceTaskNumbers: [330, 329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateFinalSummaryStatus: src.vpsDeploymentCandidateFinalSummaryStatus,
    vpsDeploymentCandidateFinalSummaryOutcomeCertificationStatus: certStatus,
    finalSummaryOutcomeCertified: true,
    finalSummaryItemsCertified: true,
    readySummaryItemsCertified: true,
    partialReadySummaryItemsCertified: true,
    blockedSummaryItemsCertified: true,
    notStartedSummaryItemsCertified: true,
    outcomeCertificationItems,
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    safetyOutcomeCertificationItems,
    outcomeCertificationSummaryCards,
    outcomeCertifiedReady: certStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY',
    outcomeCertifiedPartialReady:
      certStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    outcomeCertificationBlocked:
      certStatus === 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED',
    outcomeCertificationNotStarted:
      certStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_OUTCOME_NOT_STARTED',
    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalOutcomeCertificationItemCount: outcomeCertificationItems.length,
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
    isReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertification: true,
    requiresSeparateTask332Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_332_APPROVAL_PHRASE,
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
