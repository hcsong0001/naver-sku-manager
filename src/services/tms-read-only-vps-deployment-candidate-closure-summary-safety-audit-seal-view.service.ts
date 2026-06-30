import {
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItemStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
  type TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-outcome-certification-view.service';

export type TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealCategory =
  | 'VPS_CANDIDATE_FLOW'
  | 'CLOSURE_SUMMARY'
  | 'DEPLOYMENT_SAFETY'
  | 'RUNTIME_SAFETY'
  | 'API_DB_SAFETY'
  | 'SECRET_EXPOSURE'
  | 'NEXT_REVIEW_LOCK';

export const NEXT_TASK_337_APPROVAL_PHRASE =
  'Task 337에서 TMS read-only VPS 배포 후보 Closure Summary Safety Audit Seal 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 336 VPS 후보 Closure Summary Safety Audit Seal 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem {
  sealId: string;
  sourceTaskId: number;
  sourceTaskName: string;
  sourceStatus: string;
  sealStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItemStatus;
  category: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealCategory;
  label: string;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_VIEW';
  taskId: 336;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 336;
  referenceTaskNumbers: readonly [335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus;
  vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus;
  closureSummarySafetySealed: true;
  closureSummaryItems: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView['closureSummaryItems'];
  safetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  flowSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  closureSummarySafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  deploymentSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  runtimeSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  apiDbSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  secretExposureSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  nextReviewLockSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem[];
  safetySealSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealCard[];
  readyCount: number;
  partialReadyCount: number;
  blockedCount: number;
  notStartedCount: number;
  totalClosureTargetCount: number;
  safetyAuditSealReady: boolean;
  safetyAuditSealPartialReady: boolean;
  safetyAuditSealBlocked: boolean;
  safetyAuditSealNotStarted: boolean;
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
  isReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSeal: true;
  requiresSeparateTask337Approval: true;
  nextTaskApprovalPhrase: string;
}

function mapOutcomeCertificationStatus(
  status: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
): TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Outcome Certification status: ${_exhaustiveCheck}`);
    }
  }
}

function mapItemStatus(
  status: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItemStatus,
): TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItemStatus {
  switch (status) {
    case 'READY':
      return 'READY';
    case 'PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'BLOCKED':
      return 'BLOCKED';
    case 'NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Outcome Certification item status: ${_exhaustiveCheck}`);
    }
  }
}

function mapSealItem(
  item: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationItem,
): TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealItem {
  const sealStatus = mapItemStatus(item.outcomeCertificationStatus);
  return {
    sealId: `closure-summary-safety-seal-${item.certificationId}`,
    sourceTaskId: item.sourceTaskId,
    sourceTaskName: item.sourceTaskName,
    sourceStatus: item.sourceStatus,
    sealStatus,
    category: item.category,
    label: `${item.label} 봉인`,
    isReady: sealStatus === 'READY',
    isPartialReady: sealStatus === 'PARTIAL_READY',
    isBlocked: sealStatus === 'BLOCKED',
    isNotStarted: sealStatus === 'NOT_STARTED',
    message: `${item.message} 상태를 read-only로 봉인합니다.`,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView(input: {
  vpsDeploymentCandidateClosureSummaryOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView;
}): TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView {
  const src = input.vpsDeploymentCandidateClosureSummaryOutcomeCertification;
  const sealStatus = mapOutcomeCertificationStatus(
    src.vpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
  );

  const safetySealItems = src.outcomeCertificationItems.map(mapSealItem);

  const flowSafetySealItems = safetySealItems.filter(
    (item) => item.category === 'VPS_CANDIDATE_FLOW',
  );
  const closureSummarySafetySealItems = safetySealItems.filter(
    (item) => item.category === 'CLOSURE_SUMMARY',
  );
  const deploymentSafetySealItems = safetySealItems.filter(
    (item) => item.category === 'DEPLOYMENT_SAFETY',
  );
  const runtimeSafetySealItems = safetySealItems.filter(
    (item) => item.category === 'RUNTIME_SAFETY',
  );
  const apiDbSafetySealItems = safetySealItems.filter(
    (item) => item.category === 'API_DB_SAFETY',
  );
  const secretExposureSafetySealItems = safetySealItems.filter(
    (item) => item.category === 'SECRET_EXPOSURE',
  );
  const nextReviewLockSafetySealItems = safetySealItems.filter(
    (item) => item.category === 'NEXT_REVIEW_LOCK',
  );

  const safetySealSummaryCards: TmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealCard[] =
    [
      {
        label: 'Safety Audit Seal 상태',
        value:
          sealStatus ===
          'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY'
            ? 'READY'
            : sealStatus ===
                'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY'
              ? 'PARTIAL'
              : sealStatus ===
                  'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED'
                ? 'BLOCKED'
                : 'NOT_STARTED',
        tone:
          sealStatus ===
          'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY'
            ? 'positive'
            : sealStatus ===
                'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED'
              ? 'warning'
              : 'neutral',
      },
      {
        label: 'Closure 대상 Task',
        value: `${src.totalClosureTargetCount}개`,
        tone: 'neutral',
      },
      {
        label: 'READY / PARTIAL / BLOCKED / N/S',
        value: `${src.readyCount} / ${src.partialReadyCount} / ${src.blockedCount} / ${src.notStartedCount}`,
        tone:
          src.blockedCount > 0
            ? 'warning'
            : src.partialReadyCount > 0
              ? 'warning'
              : 'positive',
      },
      {
        label: '전체 봉인 항목',
        value: `${safetySealItems.length}개`,
        tone: 'neutral',
      },
    ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_VIEW',
    taskId: 336,
    taskName:
      'TMS Read-Only VPS Deployment Candidate Closure Summary Safety Audit Seal Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Closure Summary Safety Audit Seal',
    description:
      '이 패널은 Task 335 VPS 후보 Closure Summary 결과 인증 이후의 안전 조건을 read-only로 봉인하는 화면입니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다. Runtime, Worker, Queue, Adapter, Naver API, DB write를 실행하지 않습니다.',
    currentTaskNumber: 336,
    referenceTaskNumbers: [335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus:
      src.vpsDeploymentCandidateClosureSummaryOutcomeCertificationStatus,
    vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus: sealStatus,
    closureSummarySafetySealed: true,
    closureSummaryItems: src.closureSummaryItems,
    safetySealItems,
    flowSafetySealItems,
    closureSummarySafetySealItems,
    deploymentSafetySealItems,
    runtimeSafetySealItems,
    apiDbSafetySealItems,
    secretExposureSafetySealItems,
    nextReviewLockSafetySealItems,
    safetySealSummaryCards,
    readyCount: src.readyCount,
    partialReadyCount: src.partialReadyCount,
    blockedCount: src.blockedCount,
    notStartedCount: src.notStartedCount,
    totalClosureTargetCount: src.totalClosureTargetCount,
    safetyAuditSealReady:
      sealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY',
    safetyAuditSealPartialReady:
      sealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY',
    safetyAuditSealBlocked:
      sealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED',
    safetyAuditSealNotStarted:
      sealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_NOT_STARTED',
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
    isReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSeal: true,
    requiresSeparateTask337Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_337_APPROVAL_PHRASE,
  };
}
