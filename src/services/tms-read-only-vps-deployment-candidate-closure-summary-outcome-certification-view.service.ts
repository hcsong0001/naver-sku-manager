import {
  type TmsReadOnlyVpsDeploymentCandidateClosureItemStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-view.service';

export type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationCategory =
  | 'VPS_CANDIDATE_FLOW'
  | 'CLOSURE_SUMMARY'
  | 'DEPLOYMENT_SAFETY'
  | 'RUNTIME_SAFETY'
  | 'API_DB_SAFETY'
  | 'SECRET_EXPOSURE'
  | 'NEXT_REVIEW_LOCK';

export const NEXT_TASK_336_APPROVAL_PHRASE =
  'Task 336에서 TMS read-only VPS 배포 후보 Closure Summary Safety Audit Seal 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 335 VPS 후보 Closure Summary 결과 인증 이후의 안전 조건을 read-only로 봉인하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem {
  certificationId: string;
  sourceTaskId: number;
  sourceTaskName: string;
  sourceStatus: string;
  outcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItemStatus;
  category: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationCategory;
  label: string;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFICATION_VIEW';
  taskId: 335;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 335;
  referenceTaskNumbers: readonly [334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateClosureSummaryStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus;
  vpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus;
  closureSummaryOutcomeCertified: true;
  closureSummaryItems: TmsReadOnlyVpsDeploymentCandidateClosureSummaryView['closureSummaryItems'];
  outcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  flowOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  closureSummaryOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  deploymentSafetyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  runtimeSafetyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  apiDbSafetyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  secretExposureOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  nextReviewLockOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationCard[];
  readyCount: number;
  partialReadyCount: number;
  blockedCount: number;
  notStartedCount: number;
  totalClosureTargetCount: number;
  closureSummaryOutcomeCertifiedReady: boolean;
  closureSummaryOutcomeCertifiedPartialReady: boolean;
  closureSummaryOutcomeBlocked: boolean;
  closureSummaryOutcomeNotStarted: boolean;
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
  isReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertification: true;
  requiresSeparateTask336Approval: true;
  nextTaskApprovalPhrase: string;
}

function mapClosureSummaryStatus(
  closureSummaryStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryStatus,
): TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus {
  switch (closureSummaryStatus) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = closureSummaryStatus;
      throw new Error(`Unknown Closure Summary status: ${_exhaustiveCheck}`);
    }
  }
}

function mapClosureItemStatus(
  closureItemStatus: TmsReadOnlyVpsDeploymentCandidateClosureItemStatus,
): TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItemStatus {
  switch (closureItemStatus) {
    case 'READY':
      return 'READY';
    case 'PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'BLOCKED':
      return 'BLOCKED';
    case 'NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = closureItemStatus;
      throw new Error(`Unknown Closure Summary item status: ${_exhaustiveCheck}`);
    }
  }
}

function resolveTaskCategory(
  taskId: number,
): TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationCategory {
  return taskId >= 330 ? 'CLOSURE_SUMMARY' : 'VPS_CANDIDATE_FLOW';
}

function makeSummaryCertificationItem(input: {
  certificationId: string;
  category: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationCategory;
  label: string;
  message: string;
  sourceTaskId?: number;
  sourceTaskName?: string;
  sourceStatus: string;
}): TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem {
  return {
    certificationId: input.certificationId,
    sourceTaskId: input.sourceTaskId ?? 334,
    sourceTaskName: input.sourceTaskName ?? 'VPS 후보 Closure Summary',
    sourceStatus: input.sourceStatus,
    outcomeCertificationStatus: 'READY',
    category: input.category,
    label: input.label,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    message: input.message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView(input: {
  vpsDeploymentCandidateClosureSummary: TmsReadOnlyVpsDeploymentCandidateClosureSummaryView;
}): TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView {
  const src = input.vpsDeploymentCandidateClosureSummary;
  const certificationStatus = mapClosureSummaryStatus(
    src.vpsDeploymentCandidateClosureSummaryStatus,
  );

  const flowOutcomeCertificationItems =
    src.closureSummaryItems.map<TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem>(
      (item) => {
        const outcomeCertificationStatus = mapClosureItemStatus(item.closureStatus);
        const isReady = outcomeCertificationStatus === 'READY';
        const isPartialReady = outcomeCertificationStatus === 'PARTIAL_READY';
        const isBlocked = outcomeCertificationStatus === 'BLOCKED';
        const isNotStarted = outcomeCertificationStatus === 'NOT_STARTED';

        return {
          certificationId: `closure-summary-outcome-cert-task-${item.taskId}`,
          sourceTaskId: item.taskId,
          sourceTaskName: item.taskName,
          sourceStatus: item.sourceStatus,
          outcomeCertificationStatus,
          category: resolveTaskCategory(item.taskId),
          label: `Task ${item.taskId} ${item.taskName} 결과 인증`,
          isReady,
          isPartialReady,
          isBlocked,
          isNotStarted,
          message: `Task ${item.taskId} ${item.taskName} Closure Summary 결과를 read-only로 인증합니다.`,
          isReadOnly: true,
          actualChangePerformed: false,
        };
      },
    );

  const closureSummaryOutcomeCertificationItems = [
    makeSummaryCertificationItem({
      certificationId: 'closure-summary-outcome-certified',
      category: 'CLOSURE_SUMMARY',
      label: 'Task 334 Closure Summary 결과 인증',
      message: 'Task 334 Closure Summary 결과가 read-only 기준으로 다시 인증되었음을 확인합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
  ];

  const deploymentSafetyOutcomeCertificationItems = [
    makeSummaryCertificationItem({
      certificationId: 'deployment-safety-closed-without-deployment',
      category: 'DEPLOYMENT_SAFETY',
      label: '실제 배포 없이 종료 인증',
      message: 'VPS 후보 흐름이 실제 VPS 배포 없이 안전하게 닫혔음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
    makeSummaryCertificationItem({
      certificationId: 'deployment-safety-no-vps-or-domain',
      category: 'DEPLOYMENT_SAFETY',
      label: '실제 VPS 생성/설정/도메인 연결 없음 인증',
      message: '실제 VPS 생성, VPS 설정 변경, 운영 전환, 배포 실행, 도메인 연결이 수행되지 않았음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
  ];

  const runtimeSafetyOutcomeCertificationItems = [
    makeSummaryCertificationItem({
      certificationId: 'runtime-safety-no-runtime',
      category: 'RUNTIME_SAFETY',
      label: 'Runtime / Worker / Queue / Adapter 미연결 인증',
      message: 'Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결이 수행되지 않았음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
  ];

  const apiDbSafetyOutcomeCertificationItems = [
    makeSummaryCertificationItem({
      certificationId: 'api-db-safety-no-api-call',
      category: 'API_DB_SAFETY',
      label: 'Naver API / 상품 API 호출 없음 인증',
      message: 'Naver API 호출, 상품 조회 API 재호출, 상품 수정 API 호출이 수행되지 않았음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
    makeSummaryCertificationItem({
      certificationId: 'api-db-safety-no-db-write',
      category: 'API_DB_SAFETY',
      label: 'DB write 없음 인증',
      message: 'DB write, upsert, update가 수행되지 않았음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
  ];

  const secretExposureOutcomeCertificationItems = [
    makeSummaryCertificationItem({
      certificationId: 'secret-exposure-no-token-output',
      category: 'SECRET_EXPOSURE',
      label: 'Token/Auth 비노출 인증',
      message: 'Token/Auth/Signature/Authorization 값이 노출되지 않았음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
    makeSummaryCertificationItem({
      certificationId: 'secret-exposure-no-raw-response',
      category: 'SECRET_EXPOSURE',
      label: 'raw API response 비표시·비저장 인증',
      message: 'raw API response가 표시되거나 저장되지 않았음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
  ];

  const nextReviewLockOutcomeCertificationItems = [
    makeSummaryCertificationItem({
      certificationId: 'next-review-lock-task-336-approval-required',
      category: 'NEXT_REVIEW_LOCK',
      label: 'Task 336 별도 승인 필요 안내',
      message: 'Task 336은 사용자 별도 명시 승인 없이는 진행하지 않음을 인증합니다.',
      sourceStatus: src.vpsDeploymentCandidateClosureSummaryStatus,
    }),
  ];

  const outcomeCertificationItems = [
    ...flowOutcomeCertificationItems,
    ...closureSummaryOutcomeCertificationItems,
    ...deploymentSafetyOutcomeCertificationItems,
    ...runtimeSafetyOutcomeCertificationItems,
    ...apiDbSafetyOutcomeCertificationItems,
    ...secretExposureOutcomeCertificationItems,
    ...nextReviewLockOutcomeCertificationItems,
  ];

  const outcomeCertificationSummaryCards: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationCard[] =
    [
      {
        label: 'Outcome Certification 상태',
        value:
          certificationStatus ===
          'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_READY'
            ? 'CERTIFIED_READY'
            : certificationStatus ===
                'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY'
              ? 'CERTIFIED_PARTIAL_READY'
              : certificationStatus ===
                  'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_BLOCKED'
                ? 'BLOCKED'
                : 'NOT_STARTED',
        tone:
          certificationStatus ===
          'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_READY'
            ? 'positive'
            : certificationStatus ===
                'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_BLOCKED'
              ? 'warning'
              : 'neutral',
      },
      {
        label: 'Closure 대상 Task',
        value: `${src.totalClosureItemCount}개`,
        tone: 'neutral',
      },
      {
        label: 'READY / PARTIAL / BLOCKED / N/S',
        value: `${src.readyItemCount} / ${src.partialReadyItemCount} / ${src.blockedItemCount} / ${src.notStartedItemCount}`,
        tone:
          src.blockedItemCount > 0
            ? 'warning'
            : src.partialReadyItemCount > 0
              ? 'warning'
              : 'positive',
      },
      {
        label: '전체 인증 항목',
        value: `${outcomeCertificationItems.length}개`,
        tone: 'neutral',
      },
    ];

  return {
    status:
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFICATION_VIEW',
    taskId: 335,
    taskName:
      'TMS Read-Only VPS Deployment Candidate Closure Summary Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Closure Summary Outcome Certification',
    description:
      '이 패널은 Task 334 VPS 후보 Closure Summary 결과를 read-only로 인증하는 화면입니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다. Runtime, Worker, Queue, Adapter, Naver API, DB write를 실행하지 않습니다.',
    currentTaskNumber: 335,
    referenceTaskNumbers: [334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateClosureSummaryStatus:
      src.vpsDeploymentCandidateClosureSummaryStatus,
    vpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus:
      certificationStatus,
    closureSummaryOutcomeCertified: true,
    closureSummaryItems: src.closureSummaryItems,
    outcomeCertificationItems,
    flowOutcomeCertificationItems,
    closureSummaryOutcomeCertificationItems,
    deploymentSafetyOutcomeCertificationItems,
    runtimeSafetyOutcomeCertificationItems,
    apiDbSafetyOutcomeCertificationItems,
    secretExposureOutcomeCertificationItems,
    nextReviewLockOutcomeCertificationItems,
    outcomeCertificationSummaryCards,
    readyCount: src.readyItemCount,
    partialReadyCount: src.partialReadyItemCount,
    blockedCount: src.blockedItemCount,
    notStartedCount: src.notStartedItemCount,
    totalClosureTargetCount: src.totalClosureItemCount,
    closureSummaryOutcomeCertifiedReady:
      certificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_READY',
    closureSummaryOutcomeCertifiedPartialReady:
      certificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    closureSummaryOutcomeBlocked:
      certificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_BLOCKED',
    closureSummaryOutcomeNotStarted:
      certificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_NOT_STARTED',
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
    isReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertification: true,
    requiresSeparateTask336Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_336_APPROVAL_PHRASE,
  };
}
