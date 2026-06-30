import {
  type TmsReadOnlyFinalApprovalCandidateDecision,
  type TmsReadOnlyFinalApprovalCandidateItem,
  type TmsReadOnlyFinalApprovalCandidateItemCategory,
  type TmsReadOnlyFinalApprovalCandidateItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView,
} from './tms-read-only-operating-deployment-final-approval-candidate-review-view.service';
import { type TmsReadOnlyGoNoGoDecision } from './tms-read-only-operating-deployment-go-no-go-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_NOT_STARTED';

export type TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItemStatus =
  | 'CERTIFIED_READY'
  | 'CERTIFIED_PARTIAL_READY'
  | 'OUTCOME_BLOCKED'
  | 'OUTCOME_NOT_STARTED';

export type TmsReadOnlyFinalApprovalCandidateOutcomeCertificationCategory =
  | 'FINAL_APPROVAL_CANDIDATE_READINESS_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_BOUNDARY_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_SEAL_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK_OUTCOME'
  | 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT_OUTCOME';

export const NEXT_TASK_361_APPROVAL_PHRASE =
  'Task 361에서 TMS read-only 운영 배포 최종 승인 제출 경계 검토 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 360 운영 배포 최종 승인 후보 결과 인증 이후 실제 최종 승인 제출로 넘어가기 전 제출 경계를 read-only로 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem {
  certificationItemId: string;
  sourceCandidateItemId: string;
  category: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: TmsReadOnlyFinalApprovalCandidateItem['sourceTaskId'];
  sourceStatus: TmsReadOnlyFinalApprovalCandidateItem['sourceStatus'];
  sourceCandidateReviewStatus: TmsReadOnlyFinalApprovalCandidateItemStatus;
  sourceCertifiedDecision: TmsReadOnlyGoNoGoDecision;
  sourceRecommendedCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  outcomeCertificationStatus: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualCandidateSaved: false;
  actualApprovalGranted: false;
  actualSubmissionPerformed: false;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyFinalApprovalCandidateOutcomeCertificationSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFICATION_VIEW';
  taskId: 360;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 360;
  isBatchJobResultDisplayOnly: true;
  sourceFinalApprovalCandidateReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus;
  sourceCandidateCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  sourceCandidateCertifiedGoNoGoDecisionLabel: string;
  sourceRecommendedFinalApprovalCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  sourceRecommendedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용';
  operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus;
  finalApprovalCandidateOutcomeCertified: true;
  finalApprovalCandidateItemsCertified: true;
  finalApprovalCandidateOutcomeCertificationStarted: true;
  finalApprovalCandidateOutcomeCertificationStillReadOnly: true;
  finalApprovalCandidateOutcomeStillReadOnly: true;
  outcomeCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  outcomeCertifiedGoNoGoDecisionLabel: string;
  outcomeCertifiedFinalApprovalCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  outcomeCertifiedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'FINAL_APPROVAL_CANDIDATE_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  outcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateReadinessOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateBoundaryOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateSealOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateApprovalPrerequisiteOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateExecutionBlockOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateInfrastructureBlockOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateDomainDnsHttpsBlockOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateOperatingDbBlockOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateRuntimeWorkerQueueAdapterBlockOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateApiAndSecretBlockOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateUiActionBlockOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateFinalRequirementOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationSummaryCard[];
  readyOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[];
  candidateReadinessCertificationItemCount: number;
  candidateBoundaryCertificationItemCount: number;
  candidateSealCertificationItemCount: number;
  candidateApprovalPrerequisiteCertificationItemCount: number;
  candidateExecutionBlockCertificationItemCount: number;
  candidateInfrastructureBlockCertificationItemCount: number;
  candidateDomainDnsHttpsBlockCertificationItemCount: number;
  candidateOperatingDbBlockCertificationItemCount: number;
  candidateRuntimeWorkerQueueAdapterBlockCertificationItemCount: number;
  candidateApiAndSecretBlockCertificationItemCount: number;
  candidateUiActionBlockCertificationItemCount: number;
  candidateFinalRequirementCertificationItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalFinalApprovalCandidateOutcomeCertificationItemCount: number;
  actualFinalApprovalGranted: false;
  actualFinalApprovalCandidateSaved: false;
  actualFinalApprovalPacketSubmitted: false;
  actualDeploymentApprovalGranted: false;
  actualDeploymentStarted: false;
  actualProductionTransitionStarted: false;
  actualGoDecisionGranted: false;
  actualNoGoDecisionGranted: false;
  actualGoNoGoDecisionSaved: false;
  actualApprovalPacketSubmitted: false;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualDomainConnected: false;
  dnsChanged: false;
  dnsRecordCreatedOrModified: false;
  sslCertificateIssued: false;
  httpsEnabled: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  redisOperatingConnectionChanged: false;
  adapterConnected: false;
  operatingDbConnectionChanged: false;
  databaseUrlChanged: false;
  envFileReadOrModified: false;
  dbWritePerformed: false;
  dbBackupExecuted: false;
  dbRestoreExecuted: false;
  rollbackExecuted: false;
  migrationExecuted: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  finalApprovalCandidateStillDisplayOnly: true;
  finalApprovalCandidateOutcomeStillDisplayOnly: true;
  finalApprovalCandidateStillNotApproved: true;
  finalApprovalSubmissionStillBlocked: true;
  finalApprovalStillReadOnly: true;
  finalApprovalStillBlocked: true;
  goNoGoDecisionStillReadOnly: true;
  goDecisionStillBlocked: true;
  noGoDecisionStillBlocked: true;
  approvalSubmissionStillBlocked: true;
  deploymentApprovalStillBlocked: true;
  deploymentExecutionStillBlocked: true;
  productionTransitionStillBlocked: true;
  vpsServerCreationStillBlocked: true;
  vpsConfigChangeStillBlocked: true;
  runtimeConfigurationStillReadOnly: true;
  workerExecutionStillBlocked: true;
  queueEnqueueStillBlocked: true;
  adapterConnectionStillBlocked: true;
  domainConnectionStillReadOnly: true;
  dnsChangeStillBlocked: true;
  sslIssueStillBlocked: true;
  operatingDbConnectionStillReadOnly: true;
  databaseUrlChangeStillBlocked: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  uiExecutionActionStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertification: true;
  requiresSeparateTask361Approval: true;
  nextTaskApprovalPhrase: string;
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

function exhaustiveGuard(value: never): never {
  throw new Error(`Unknown value: ${String(value)}`);
}

function mapCandidateReviewToOutcomeCertificationStatus(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus,
): TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function mapCandidateItemStatusToOutcomeCertificationStatus(
  status: TmsReadOnlyFinalApprovalCandidateItemStatus,
): TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItemStatus {
  switch (status) {
    case 'READY':
      return 'CERTIFIED_READY';
    case 'PARTIAL_READY':
      return 'CERTIFIED_PARTIAL_READY';
    case 'BLOCKED':
      return 'OUTCOME_BLOCKED';
    case 'NOT_STARTED':
      return 'OUTCOME_NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function mapCandidateCategoryToOutcomeCertificationCategory(
  category: TmsReadOnlyFinalApprovalCandidateItemCategory,
): TmsReadOnlyFinalApprovalCandidateOutcomeCertificationCategory {
  switch (category) {
    case 'FINAL_APPROVAL_CANDIDATE_READINESS':
      return 'FINAL_APPROVAL_CANDIDATE_READINESS_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_BOUNDARY':
      return 'FINAL_APPROVAL_CANDIDATE_BOUNDARY_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_SEAL':
      return 'FINAL_APPROVAL_CANDIDATE_SEAL_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE':
      return 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK':
      return 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK':
      return 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK':
      return 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK':
      return 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK':
      return 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK':
      return 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK':
      return 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK_OUTCOME';
    case 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT':
      return 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT_OUTCOME';
    default:
      return exhaustiveGuard(category);
  }
}

function toSummaryTone(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
): 'positive' | 'neutral' | 'warning' {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_READY':
      return 'positive';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_BLOCKED':
      return 'warning';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_PARTIAL_READY':
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_NOT_STARTED':
      return 'neutral';
    default:
      return exhaustiveGuard(status);
  }
}

function buildOutcomeCertificationItem(
  item: TmsReadOnlyFinalApprovalCandidateItem,
): TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem {
  const outcomeCertificationStatus =
    mapCandidateItemStatusToOutcomeCertificationStatus(item.candidateReviewStatus);

  return {
    certificationItemId: `${item.candidateItemId}-outcome-certification`,
    sourceCandidateItemId: item.candidateItemId,
    category: mapCandidateCategoryToOutcomeCertificationCategory(item.category),
    label: item.label,
    description: item.description,
    sourceTaskId: item.sourceTaskId,
    sourceStatus: item.sourceStatus,
    sourceCandidateReviewStatus: item.candidateReviewStatus,
    sourceCertifiedDecision: item.sourceCertifiedDecision,
    sourceRecommendedCandidateDecision: item.recommendedCandidateDecision,
    outcomeCertificationStatus,
    isReady: outcomeCertificationStatus === 'CERTIFIED_READY',
    isPartialReady:
      outcomeCertificationStatus === 'CERTIFIED_PARTIAL_READY',
    isBlocked: outcomeCertificationStatus === 'OUTCOME_BLOCKED',
    isNotStarted: outcomeCertificationStatus === 'OUTCOME_NOT_STARTED',
    isReadOnly: true,
    actualCandidateSaved: false,
    actualApprovalGranted: false,
    actualSubmissionPerformed: false,
    actualChangePerformed: false,
    requiresSeparateApproval: item.requiresSeparateApproval,
  };
}

function filterByCategory(
  items: readonly TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem[],
  category: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationCategory,
) {
  return items.filter((item) => item.category === category);
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView(input: {
  operatingDeploymentFinalApprovalCandidateReview: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView;
}): TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView {
  const review = input.operatingDeploymentFinalApprovalCandidateReview;
  const operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus =
    mapCandidateReviewToOutcomeCertificationStatus(
      review.operatingDeploymentFinalApprovalCandidateReviewStatus,
    );
  const outcomeCertificationItems = review.finalApprovalCandidateItems.map(
    buildOutcomeCertificationItem,
  );

  const candidateReadinessOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_READINESS_OUTCOME',
  );
  const candidateBoundaryOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_BOUNDARY_OUTCOME',
  );
  const candidateSealOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_SEAL_OUTCOME',
  );
  const candidateApprovalPrerequisiteOutcomeCertificationItems =
    filterByCategory(
      outcomeCertificationItems,
      'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE_OUTCOME',
    );
  const candidateExecutionBlockOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK_OUTCOME',
  );
  const candidateInfrastructureBlockOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK_OUTCOME',
  );
  const candidateDomainDnsHttpsBlockOutcomeCertificationItems =
    filterByCategory(
      outcomeCertificationItems,
      'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK_OUTCOME',
    );
  const candidateOperatingDbBlockOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK_OUTCOME',
  );
  const candidateRuntimeWorkerQueueAdapterBlockOutcomeCertificationItems =
    filterByCategory(
      outcomeCertificationItems,
      'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK_OUTCOME',
    );
  const candidateApiAndSecretBlockOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK_OUTCOME',
  );
  const candidateUiActionBlockOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK_OUTCOME',
  );
  const candidateFinalRequirementOutcomeCertificationItems = filterByCategory(
    outcomeCertificationItems,
    'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT_OUTCOME',
  );

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isReady,
  );
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isPartialReady,
  );
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isBlocked,
  );
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isNotStarted,
  );

  const outcomeCertificationSummaryCards: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationSummaryCard[] =
    [
      {
        label: '최종 승인 후보 결과 인증 상태',
        value:
          operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus.replace(
            'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_',
            '',
          ),
        tone: toSummaryTone(
          operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
        ),
      },
      {
        label: '인증된 Go/No-Go 후보',
        value: review.candidateCertifiedGoNoGoDecisionLabel,
        tone:
          review.candidateCertifiedGoNoGoDecision === 'GO_CANDIDATE_REVIEW_ONLY'
            ? 'positive'
            : review.candidateCertifiedGoNoGoDecision ===
                'NO_GO_CANDIDATE_REVIEW_ONLY'
              ? 'warning'
              : 'neutral',
      },
      {
        label: '인증된 최종 승인 후보 결정',
        value: review.recommendedFinalApprovalCandidateDecisionLabel,
        tone: 'neutral',
      },
      {
        label: '총 후보 결과 인증 항목',
        value: `${outcomeCertificationItems.length}개`,
        tone: 'warning',
      },
    ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFICATION_VIEW',
    taskId: 360,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Candidate Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 최종 승인 후보 결과 인증',
    description:
      '이 패널은 운영 배포 최종 승인 후보 검토 결과를 read-only로 인증하는 화면입니다. 이 화면은 실제 최종 승인, 실제 승인 제출, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 361은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 360,
    isBatchJobResultDisplayOnly: true,
    sourceFinalApprovalCandidateReviewStatus:
      review.operatingDeploymentFinalApprovalCandidateReviewStatus,
    sourceCandidateCertifiedGoNoGoDecision:
      review.candidateCertifiedGoNoGoDecision,
    sourceCandidateCertifiedGoNoGoDecisionLabel:
      review.candidateCertifiedGoNoGoDecisionLabel,
    sourceRecommendedFinalApprovalCandidateDecision:
      review.recommendedFinalApprovalCandidateDecision,
    sourceRecommendedFinalApprovalCandidateDecisionLabel:
      review.recommendedFinalApprovalCandidateDecisionLabel,
    operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
    finalApprovalCandidateOutcomeCertified: true,
    finalApprovalCandidateItemsCertified: true,
    finalApprovalCandidateOutcomeCertificationStarted: true,
    finalApprovalCandidateOutcomeCertificationStillReadOnly: true,
    finalApprovalCandidateOutcomeStillReadOnly: true,
    outcomeCertifiedGoNoGoDecision: review.candidateCertifiedGoNoGoDecision,
    outcomeCertifiedGoNoGoDecisionLabel:
      review.candidateCertifiedGoNoGoDecisionLabel,
    outcomeCertifiedFinalApprovalCandidateDecision:
      review.recommendedFinalApprovalCandidateDecision,
    outcomeCertifiedFinalApprovalCandidateDecisionLabel:
      review.recommendedFinalApprovalCandidateDecisionLabel,
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_APPROVAL_CANDIDATE_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    candidateReadinessOutcomeCertificationItems,
    candidateBoundaryOutcomeCertificationItems,
    candidateSealOutcomeCertificationItems,
    candidateApprovalPrerequisiteOutcomeCertificationItems,
    candidateExecutionBlockOutcomeCertificationItems,
    candidateInfrastructureBlockOutcomeCertificationItems,
    candidateDomainDnsHttpsBlockOutcomeCertificationItems,
    candidateOperatingDbBlockOutcomeCertificationItems,
    candidateRuntimeWorkerQueueAdapterBlockOutcomeCertificationItems,
    candidateApiAndSecretBlockOutcomeCertificationItems,
    candidateUiActionBlockOutcomeCertificationItems,
    candidateFinalRequirementOutcomeCertificationItems,
    outcomeCertificationSummaryCards,
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    candidateReadinessCertificationItemCount:
      candidateReadinessOutcomeCertificationItems.length,
    candidateBoundaryCertificationItemCount:
      candidateBoundaryOutcomeCertificationItems.length,
    candidateSealCertificationItemCount:
      candidateSealOutcomeCertificationItems.length,
    candidateApprovalPrerequisiteCertificationItemCount:
      candidateApprovalPrerequisiteOutcomeCertificationItems.length,
    candidateExecutionBlockCertificationItemCount:
      candidateExecutionBlockOutcomeCertificationItems.length,
    candidateInfrastructureBlockCertificationItemCount:
      candidateInfrastructureBlockOutcomeCertificationItems.length,
    candidateDomainDnsHttpsBlockCertificationItemCount:
      candidateDomainDnsHttpsBlockOutcomeCertificationItems.length,
    candidateOperatingDbBlockCertificationItemCount:
      candidateOperatingDbBlockOutcomeCertificationItems.length,
    candidateRuntimeWorkerQueueAdapterBlockCertificationItemCount:
      candidateRuntimeWorkerQueueAdapterBlockOutcomeCertificationItems.length,
    candidateApiAndSecretBlockCertificationItemCount:
      candidateApiAndSecretBlockOutcomeCertificationItems.length,
    candidateUiActionBlockCertificationItemCount:
      candidateUiActionBlockOutcomeCertificationItems.length,
    candidateFinalRequirementCertificationItemCount:
      candidateFinalRequirementOutcomeCertificationItems.length,
    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalFinalApprovalCandidateOutcomeCertificationItemCount:
      outcomeCertificationItems.length,
    actualFinalApprovalGranted: false,
    actualFinalApprovalCandidateSaved: false,
    actualFinalApprovalPacketSubmitted: false,
    actualDeploymentApprovalGranted: false,
    actualDeploymentStarted: false,
    actualProductionTransitionStarted: false,
    actualGoDecisionGranted: false,
    actualNoGoDecisionGranted: false,
    actualGoNoGoDecisionSaved: false,
    actualApprovalPacketSubmitted: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    redisOperatingConnectionChanged: false,
    adapterConnected: false,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    dbBackupExecuted: false,
    dbRestoreExecuted: false,
    rollbackExecuted: false,
    migrationExecuted: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    finalApprovalCandidateStillDisplayOnly: true,
    finalApprovalCandidateOutcomeStillDisplayOnly: true,
    finalApprovalCandidateStillNotApproved: true,
    finalApprovalSubmissionStillBlocked: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    goNoGoDecisionStillReadOnly: true,
    goDecisionStillBlocked: true,
    noGoDecisionStillBlocked: true,
    approvalSubmissionStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    productionTransitionStillBlocked: true,
    vpsServerCreationStillBlocked: true,
    vpsConfigChangeStillBlocked: true,
    runtimeConfigurationStillReadOnly: true,
    workerExecutionStillBlocked: true,
    queueEnqueueStillBlocked: true,
    adapterConnectionStillBlocked: true,
    domainConnectionStillReadOnly: true,
    dnsChangeStillBlocked: true,
    sslIssueStillBlocked: true,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    uiExecutionActionStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertification: true,
    requiresSeparateTask361Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_361_APPROVAL_PHRASE,
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
