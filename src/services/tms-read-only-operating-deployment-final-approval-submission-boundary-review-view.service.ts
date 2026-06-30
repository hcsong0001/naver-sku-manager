import {
  type TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem,
  type TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-candidate-outcome-certification-view.service';
import { type TmsReadOnlyFinalApprovalCandidateDecision } from './tms-read-only-operating-deployment-final-approval-candidate-review-view.service';
import { type TmsReadOnlyGoNoGoDecision } from './tms-read-only-operating-deployment-go-no-go-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED';

export type TmsReadOnlyFinalApprovalSubmissionBoundaryReviewItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyFinalApprovalSubmissionBoundaryCategory =
  | 'FINAL_APPROVAL_SUBMISSION_READINESS_BOUNDARY'
  | 'FINAL_APPROVAL_CANDIDATE_CERTIFICATION_BOUNDARY'
  | 'FINAL_APPROVAL_SUBMISSION_LOCK'
  | 'FINAL_APPROVAL_GRANT_BOUNDARY'
  | 'FINAL_APPROVAL_PACKET_SUBMISSION_BOUNDARY'
  | 'DEPLOYMENT_APPROVAL_BOUNDARY'
  | 'DEPLOYMENT_EXECUTION_BOUNDARY'
  | 'INFRASTRUCTURE_SUBMISSION_BOUNDARY'
  | 'DOMAIN_DNS_HTTPS_SUBMISSION_BOUNDARY'
  | 'OPERATING_DB_SUBMISSION_BOUNDARY'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_SUBMISSION_BOUNDARY'
  | 'API_AND_SECRET_SUBMISSION_BOUNDARY'
  | 'UI_ACTION_SUBMISSION_BOUNDARY'
  | 'FINAL_SUBMISSION_REQUIREMENT';

export const NEXT_TASK_362_APPROVAL_PHRASE =
  'Task 362에서 TMS read-only 운영 배포 최종 승인 제출 경계 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 361 운영 배포 최종 승인 제출 경계 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyFinalApprovalSubmissionBoundaryItem {
  submissionBoundaryItemId: string;
  category: TmsReadOnlyFinalApprovalSubmissionBoundaryCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceCandidateOutcomeCertificationStatus: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItemStatus;
  sourceCertifiedDecision: TmsReadOnlyGoNoGoDecision;
  sourceCertifiedFinalApprovalCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  submissionBoundaryReviewStatus: TmsReadOnlyFinalApprovalSubmissionBoundaryReviewItemStatus;
  recommendedSubmissionDecision: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualSubmissionPerformed: false;
  actualCandidateSaved: false;
  actualApprovalGranted: false;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyFinalApprovalSubmissionBoundarySummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_VIEW';
  taskId: 361;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 361;
  isBatchJobResultDisplayOnly: true;
  sourceFinalApprovalCandidateOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus;
  sourceOutcomeCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  sourceOutcomeCertifiedGoNoGoDecisionLabel: string;
  sourceOutcomeCertifiedFinalApprovalCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용';

  operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus;
  finalApprovalSubmissionBoundaryReviewReady: boolean;
  finalApprovalSubmissionBoundaryReviewPartialReady: boolean;
  finalApprovalSubmissionBoundaryReviewBlocked: boolean;
  finalApprovalSubmissionBoundaryReviewNotStarted: boolean;
  finalApprovalSubmissionBoundaryReviewStarted: true;
  finalApprovalSubmissionBoundaryStillReadOnly: true;

  submissionBoundaryCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  submissionBoundaryCertifiedGoNoGoDecisionLabel: string;
  submissionBoundaryCertifiedFinalApprovalCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  submissionBoundaryCertifiedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용';

  recommendedFinalApprovalSubmissionDecision: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY';
  recommendedFinalApprovalSubmissionDecisionLabel: '최종 승인 제출 경계 - read-only 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';

  finalApprovalSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  submissionReadinessBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  candidateCertificationBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  finalApprovalSubmissionLockItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  finalApprovalGrantBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  approvalPacketSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  deploymentApprovalBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  deploymentExecutionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  infrastructureSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  domainDnsHttpsSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  operatingDbSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  runtimeWorkerQueueAdapterSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  apiAndSecretSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  uiActionSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  finalSubmissionRequirementItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];

  submissionBoundarySummaryCards: readonly TmsReadOnlyFinalApprovalSubmissionBoundarySummaryCard[];
  readySubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  partialReadySubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  blockedSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];
  notStartedSubmissionBoundaryItems: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[];

  submissionReadinessBoundaryItemCount: number;
  candidateCertificationBoundaryItemCount: number;
  finalApprovalSubmissionLockItemCount: number;
  finalApprovalGrantBoundaryItemCount: number;
  approvalPacketSubmissionBoundaryItemCount: number;
  deploymentApprovalBoundaryItemCount: number;
  deploymentExecutionBoundaryItemCount: number;
  infrastructureSubmissionBoundaryItemCount: number;
  domainDnsHttpsSubmissionBoundaryItemCount: number;
  operatingDbSubmissionBoundaryItemCount: number;
  runtimeWorkerQueueAdapterSubmissionBoundaryItemCount: number;
  apiAndSecretSubmissionBoundaryItemCount: number;
  uiActionSubmissionBoundaryItemCount: number;
  finalSubmissionRequirementItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalFinalApprovalSubmissionBoundaryItemCount: number;

  actualFinalApprovalGranted: false;
  actualFinalApprovalCandidateSaved: false;
  actualFinalApprovalSubmissionPerformed: false;
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

  finalApprovalSubmissionBoundaryStillDisplayOnly: true;
  finalApprovalSubmissionStillNotPerformed: true;
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

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReview: true;
  requiresSeparateTask362Approval: true;
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

function mapCandidateOutcomeToSubmissionBoundaryStatus(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function mapCandidateOutcomeItemStatusToSubmissionBoundaryReviewItemStatus(
  status: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItemStatus,
): TmsReadOnlyFinalApprovalSubmissionBoundaryReviewItemStatus {
  switch (status) {
    case 'CERTIFIED_READY':
      return 'READY';
    case 'CERTIFIED_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'OUTCOME_BLOCKED':
      return 'BLOCKED';
    case 'OUTCOME_NOT_STARTED':
      return 'NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function mapCategory(
  itemCategory: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem['category'],
): TmsReadOnlyFinalApprovalSubmissionBoundaryCategory {
  switch (itemCategory) {
    case 'FINAL_APPROVAL_CANDIDATE_READINESS_OUTCOME':
      return 'FINAL_APPROVAL_SUBMISSION_READINESS_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_BOUNDARY_OUTCOME':
      return 'FINAL_APPROVAL_CANDIDATE_CERTIFICATION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_SEAL_OUTCOME':
      return 'FINAL_APPROVAL_SUBMISSION_LOCK';
    case 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE_OUTCOME':
      return 'FINAL_APPROVAL_GRANT_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK_OUTCOME':
      return 'DEPLOYMENT_EXECUTION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK_OUTCOME':
      return 'INFRASTRUCTURE_SUBMISSION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK_OUTCOME':
      return 'DOMAIN_DNS_HTTPS_SUBMISSION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK_OUTCOME':
      return 'OPERATING_DB_SUBMISSION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK_OUTCOME':
      return 'RUNTIME_WORKER_QUEUE_ADAPTER_SUBMISSION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK_OUTCOME':
      return 'API_AND_SECRET_SUBMISSION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK_OUTCOME':
      return 'UI_ACTION_SUBMISSION_BOUNDARY';
    case 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT_OUTCOME':
      return 'FINAL_SUBMISSION_REQUIREMENT';
    default:
      return exhaustiveGuard(itemCategory);
  }
}

function toSummaryTone(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus,
): 'positive' | 'neutral' | 'warning' {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY':
      return 'positive';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED':
      return 'warning';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY':
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED':
      return 'neutral';
    default:
      return exhaustiveGuard(status);
  }
}

function buildSubmissionBoundaryItem(
  item: TmsReadOnlyFinalApprovalCandidateOutcomeCertificationItem,
): TmsReadOnlyFinalApprovalSubmissionBoundaryItem {
  const submissionBoundaryReviewStatus =
    mapCandidateOutcomeItemStatusToSubmissionBoundaryReviewItemStatus(
      item.outcomeCertificationStatus,
    );

  return {
    submissionBoundaryItemId: `${item.certificationItemId}-submission-boundary`,
    category: mapCategory(item.category),
    label: item.label,
    description: item.description,
    sourceTaskId: item.sourceTaskId,
    sourceStatus: item.sourceStatus,
    sourceCandidateOutcomeCertificationStatus: item.outcomeCertificationStatus,
    sourceCertifiedDecision: item.sourceCertifiedDecision,
    sourceCertifiedFinalApprovalCandidateDecision:
      item.sourceRecommendedCandidateDecision,
    submissionBoundaryReviewStatus,
    recommendedSubmissionDecision:
      'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
    isReady: submissionBoundaryReviewStatus === 'READY',
    isPartialReady: submissionBoundaryReviewStatus === 'PARTIAL_READY',
    isBlocked: submissionBoundaryReviewStatus === 'BLOCKED',
    isNotStarted: submissionBoundaryReviewStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualSubmissionPerformed: false,
    actualCandidateSaved: false,
    actualApprovalGranted: false,
    actualChangePerformed: false,
    requiresSeparateApproval: item.requiresSeparateApproval,
  };
}

function filterByCategory(
  items: readonly TmsReadOnlyFinalApprovalSubmissionBoundaryItem[],
  category: TmsReadOnlyFinalApprovalSubmissionBoundaryCategory,
) {
  return items.filter((item) => item.category === category);
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView(input: {
  operatingDeploymentFinalApprovalCandidateOutcomeCertification: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView;
}): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView {
  const certification = input.operatingDeploymentFinalApprovalCandidateOutcomeCertification;
  const operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus =
    mapCandidateOutcomeToSubmissionBoundaryStatus(
      certification.operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
    );

  // Note: Some mapping needed to cover all 14 categories.
  // The source has 12 categories, we map them into the 14 via the helper, but two might be missing or combined.
  // The requirement says we need 14 groups. Let's make sure we have items for all 14 categories.
  // We'll generate the base items first:
  const baseItems = certification.outcomeCertificationItems.map(
    buildSubmissionBoundaryItem,
  );
  
  // We explicitly add the remaining 2 categories if not covered:
  // FINAL_APPROVAL_PACKET_SUBMISSION_BOUNDARY
  // DEPLOYMENT_APPROVAL_BOUNDARY
  // We will create artificial items for these derived from final requirement to meet the 14 groups strict structure.
  
  const additionalItems: TmsReadOnlyFinalApprovalSubmissionBoundaryItem[] = [
    {
      submissionBoundaryItemId: 'approval-packet-submission-boundary',
      category: 'FINAL_APPROVAL_PACKET_SUBMISSION_BOUNDARY',
      label: '승인 패킷 제출 경계',
      description: '실제 승인 패킷 제출 없음, 실제 최종 승인 패킷 제출 없음, 승인 패킷은 read-only 검토/인증 단계였음, 실제 제출은 별도 승인 필요',
      sourceTaskId: 360,
      sourceStatus: certification.operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
      sourceCandidateOutcomeCertificationStatus: certification.outcomeCertificationItems[0]?.outcomeCertificationStatus || 'CERTIFIED_NOT_STARTED',
      sourceCertifiedDecision: certification.sourceCandidateCertifiedGoNoGoDecision,
      sourceCertifiedFinalApprovalCandidateDecision: certification.sourceRecommendedFinalApprovalCandidateDecision,
      submissionBoundaryReviewStatus: mapCandidateOutcomeItemStatusToSubmissionBoundaryReviewItemStatus(certification.outcomeCertificationItems[0]?.outcomeCertificationStatus || 'CERTIFIED_NOT_STARTED'),
      recommendedSubmissionDecision: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
      isReady: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY',
      isPartialReady: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY',
      isBlocked: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED',
      isNotStarted: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualSubmissionPerformed: false,
      actualCandidateSaved: false,
      actualApprovalGranted: false,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    },
    {
      submissionBoundaryItemId: 'deployment-approval-boundary',
      category: 'DEPLOYMENT_APPROVAL_BOUNDARY',
      label: '배포 승인 경계',
      description: '실제 배포 승인 없음, 실제 배포 승인 제출 없음, 배포 승인 전 최종 제출 경계 확인 필요, 배포 승인은 별도 승인 전까지 차단',
      sourceTaskId: 360,
      sourceStatus: certification.operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
      sourceCandidateOutcomeCertificationStatus: certification.outcomeCertificationItems[0]?.outcomeCertificationStatus || 'CERTIFIED_NOT_STARTED',
      sourceCertifiedDecision: certification.sourceCandidateCertifiedGoNoGoDecision,
      sourceCertifiedFinalApprovalCandidateDecision: certification.sourceRecommendedFinalApprovalCandidateDecision,
      submissionBoundaryReviewStatus: mapCandidateOutcomeItemStatusToSubmissionBoundaryReviewItemStatus(certification.outcomeCertificationItems[0]?.outcomeCertificationStatus || 'CERTIFIED_NOT_STARTED'),
      recommendedSubmissionDecision: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
      isReady: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY',
      isPartialReady: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY',
      isBlocked: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED',
      isNotStarted: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualSubmissionPerformed: false,
      actualCandidateSaved: false,
      actualApprovalGranted: false,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    }
  ];

  const finalApprovalSubmissionBoundaryItems = [...baseItems, ...additionalItems];

  const submissionReadinessBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'FINAL_APPROVAL_SUBMISSION_READINESS_BOUNDARY');
  const candidateCertificationBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'FINAL_APPROVAL_CANDIDATE_CERTIFICATION_BOUNDARY');
  const finalApprovalSubmissionLockItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'FINAL_APPROVAL_SUBMISSION_LOCK');
  const finalApprovalGrantBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'FINAL_APPROVAL_GRANT_BOUNDARY');
  const approvalPacketSubmissionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'FINAL_APPROVAL_PACKET_SUBMISSION_BOUNDARY');
  const deploymentApprovalBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'DEPLOYMENT_APPROVAL_BOUNDARY');
  const deploymentExecutionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'DEPLOYMENT_EXECUTION_BOUNDARY');
  const infrastructureSubmissionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'INFRASTRUCTURE_SUBMISSION_BOUNDARY');
  const domainDnsHttpsSubmissionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'DOMAIN_DNS_HTTPS_SUBMISSION_BOUNDARY');
  const operatingDbSubmissionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'OPERATING_DB_SUBMISSION_BOUNDARY');
  const runtimeWorkerQueueAdapterSubmissionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'RUNTIME_WORKER_QUEUE_ADAPTER_SUBMISSION_BOUNDARY');
  const apiAndSecretSubmissionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'API_AND_SECRET_SUBMISSION_BOUNDARY');
  const uiActionSubmissionBoundaryItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'UI_ACTION_SUBMISSION_BOUNDARY');
  const finalSubmissionRequirementItems = filterByCategory(finalApprovalSubmissionBoundaryItems, 'FINAL_SUBMISSION_REQUIREMENT');

  const readySubmissionBoundaryItems = finalApprovalSubmissionBoundaryItems.filter((item) => item.isReady);
  const partialReadySubmissionBoundaryItems = finalApprovalSubmissionBoundaryItems.filter((item) => item.isPartialReady);
  const blockedSubmissionBoundaryItems = finalApprovalSubmissionBoundaryItems.filter((item) => item.isBlocked);
  const notStartedSubmissionBoundaryItems = finalApprovalSubmissionBoundaryItems.filter((item) => item.isNotStarted);

  const submissionBoundarySummaryCards: TmsReadOnlyFinalApprovalSubmissionBoundarySummaryCard[] = [
    {
      label: '최종 승인 제출 경계 검토 상태',
      value: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus.replace('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_', ''),
      tone: toSummaryTone(operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus),
    },
    {
      label: '추천 최종 승인 제출 결정',
      value: '최종 승인 제출 경계 - read-only 검토 전용',
      tone: 'neutral',
    },
    {
      label: '총 제출 경계 검토 항목',
      value: `${finalApprovalSubmissionBoundaryItems.length}개`,
      tone: 'warning',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_VIEW',
    taskId: 361,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Boundary Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 최종 승인 제출 경계 검토',
    description: '이 패널은 운영 배포 최종 승인 제출 전 경계를 read-only로 검토하는 화면입니다. 이 화면은 실제 최종 승인, 실제 승인 제출, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 362는 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 361,
    isBatchJobResultDisplayOnly: true,
    sourceFinalApprovalCandidateOutcomeCertificationStatus: certification.operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus,
    sourceOutcomeCertifiedGoNoGoDecision: certification.outcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: certification.outcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: certification.outcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: certification.outcomeCertifiedFinalApprovalCandidateDecisionLabel,
    operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus,
    finalApprovalSubmissionBoundaryReviewReady: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY',
    finalApprovalSubmissionBoundaryReviewPartialReady: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY',
    finalApprovalSubmissionBoundaryReviewBlocked: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED',
    finalApprovalSubmissionBoundaryReviewNotStarted: operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED',
    finalApprovalSubmissionBoundaryReviewStarted: true,
    finalApprovalSubmissionBoundaryStillReadOnly: true,
    submissionBoundaryCertifiedGoNoGoDecision: certification.outcomeCertifiedGoNoGoDecision,
    submissionBoundaryCertifiedGoNoGoDecisionLabel: certification.outcomeCertifiedGoNoGoDecisionLabel,
    submissionBoundaryCertifiedFinalApprovalCandidateDecision: certification.outcomeCertifiedFinalApprovalCandidateDecision,
    submissionBoundaryCertifiedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용',
    recommendedFinalApprovalSubmissionDecision: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
    recommendedFinalApprovalSubmissionDecisionLabel: '최종 승인 제출 경계 - read-only 검토 전용',
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    finalApprovalSubmissionBoundaryItems,
    submissionReadinessBoundaryItems,
    candidateCertificationBoundaryItems,
    finalApprovalSubmissionLockItems,
    finalApprovalGrantBoundaryItems,
    approvalPacketSubmissionBoundaryItems,
    deploymentApprovalBoundaryItems,
    deploymentExecutionBoundaryItems,
    infrastructureSubmissionBoundaryItems,
    domainDnsHttpsSubmissionBoundaryItems,
    operatingDbSubmissionBoundaryItems,
    runtimeWorkerQueueAdapterSubmissionBoundaryItems,
    apiAndSecretSubmissionBoundaryItems,
    uiActionSubmissionBoundaryItems,
    finalSubmissionRequirementItems,
    submissionBoundarySummaryCards,
    readySubmissionBoundaryItems,
    partialReadySubmissionBoundaryItems,
    blockedSubmissionBoundaryItems,
    notStartedSubmissionBoundaryItems,
    submissionReadinessBoundaryItemCount: submissionReadinessBoundaryItems.length,
    candidateCertificationBoundaryItemCount: candidateCertificationBoundaryItems.length,
    finalApprovalSubmissionLockItemCount: finalApprovalSubmissionLockItems.length,
    finalApprovalGrantBoundaryItemCount: finalApprovalGrantBoundaryItems.length,
    approvalPacketSubmissionBoundaryItemCount: approvalPacketSubmissionBoundaryItems.length,
    deploymentApprovalBoundaryItemCount: deploymentApprovalBoundaryItems.length,
    deploymentExecutionBoundaryItemCount: deploymentExecutionBoundaryItems.length,
    infrastructureSubmissionBoundaryItemCount: infrastructureSubmissionBoundaryItems.length,
    domainDnsHttpsSubmissionBoundaryItemCount: domainDnsHttpsSubmissionBoundaryItems.length,
    operatingDbSubmissionBoundaryItemCount: operatingDbSubmissionBoundaryItems.length,
    runtimeWorkerQueueAdapterSubmissionBoundaryItemCount: runtimeWorkerQueueAdapterSubmissionBoundaryItems.length,
    apiAndSecretSubmissionBoundaryItemCount: apiAndSecretSubmissionBoundaryItems.length,
    uiActionSubmissionBoundaryItemCount: uiActionSubmissionBoundaryItems.length,
    finalSubmissionRequirementItemCount: finalSubmissionRequirementItems.length,
    readyItemCount: readySubmissionBoundaryItems.length,
    partialReadyItemCount: partialReadySubmissionBoundaryItems.length,
    blockedItemCount: blockedSubmissionBoundaryItems.length,
    notStartedItemCount: notStartedSubmissionBoundaryItems.length,
    totalFinalApprovalSubmissionBoundaryItemCount: finalApprovalSubmissionBoundaryItems.length,
    actualFinalApprovalGranted: false,
    actualFinalApprovalCandidateSaved: false,
    actualFinalApprovalSubmissionPerformed: false,
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
    finalApprovalSubmissionBoundaryStillDisplayOnly: true,
    finalApprovalSubmissionStillNotPerformed: true,
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
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReview: true,
    requiresSeparateTask362Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_362_APPROVAL_PHRASE,
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
