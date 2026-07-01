import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-readiness-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewCategory =
  | 'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READINESS'
  | 'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_CREATION_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_LOCK_REVIEW'
  | 'FINAL_APPROVAL_GRANT_LOCK_REVIEW'
  | 'DEPLOYMENT_APPROVAL_LOCK_REVIEW'
  | 'DEPLOYMENT_EXECUTION_LOCK_REVIEW'
  | 'OPERATING_TRANSITION_LOCK_REVIEW'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_LOCK_REVIEW'
  | 'OPERATING_DB_LOCK_REVIEW'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_REVIEW'
  | 'API_SECRET_UI_ACTION_POST_LOCK_REVIEW';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem {
  lockReviewItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceOutcomeCertificationStatus: string;
  lockReviewStatus: 'SUBMISSION_LOCK_REVIEW_PASSED' | 'SUBMISSION_LOCK_REVIEW_BLOCKED' | 'SUBMISSION_LOCK_REVIEW_NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualNaverApiCall: boolean;
  actualProductLookupApiCall: boolean;
  actualProductUpdateApiCall: boolean;
  actualTokenReissue: boolean;
  actualPriceChange: boolean;
  actualStockChange: boolean;
  actualDbWrite: boolean;
  actualApprovalRequestCreated: boolean;
  actualApprovalRequestReviewedAsSubmission: boolean;
  actualApprovalRequestSubmitted: boolean;
  actualFinalApprovalGrant: boolean;
  actualFinalApprovalSubmission: boolean;
  actualDeploymentApproval: boolean;
  actualDeploymentExecution: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView {
  taskId: 378;
  taskName: string;

  sourceSubmissionReadinessOutcomeCertificationStatus: string;
  sourceRecommendedOutcomeCertificationDecision: string;
  sourceRecommendedOutcomeCertificationDecisionLabel: string;
  sourcePacketStatus: string;
  sourceOutcomeCertifiedGoNoGoDecision: string;
  sourceOutcomeCertifiedGoNoGoDecisionLabel: string;
  sourceOutcomeCertifiedFinalApprovalCandidateDecision: string;
  sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: string;
  sourceOutcomeCertifiedFinalApprovalSubmissionDecision: string;
  sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: string;
  sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: string;
  sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: string;
  sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: string;
  sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: string;

  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus;

  approvalRequestSubmissionLockReviewStarted: boolean;
  approvalRequestSubmissionLockReviewStillReadOnly: boolean;
  approvalRequestSubmissionLockReviewStillLocked: boolean;
  approvalRequestSubmissionLockReviewCompleted: boolean;

  recommendedSubmissionLockReviewDecision: string;
  recommendedSubmissionLockReviewDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  lockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  approvalRequestSubmissionLockReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  approvalRequestCreationLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  approvalRequestReviewSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  approvalRequestSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  finalApprovalSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  finalApprovalGrantLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  deploymentApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  deploymentExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  operatingTransitionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  infrastructureDomainDnsHttpsLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  operatingDbLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  runtimeWorkerQueueAdapterLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  apiSecretUiActionPostLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];

  lockReviewSummaryCards: { label: string; value: number }[];
  readyLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  partialReadyLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  blockedLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];
  notStartedLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[];

  approvalRequestSubmissionLockReviewReadinessItemCount: number;
  approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItemCount: number;
  approvalRequestCreationLockReviewItemCount: number;
  approvalRequestReviewSubmissionLockReviewItemCount: number;
  approvalRequestSubmissionLockReviewItemCount: number;
  finalApprovalSubmissionLockReviewItemCount: number;
  finalApprovalGrantLockReviewItemCount: number;
  deploymentApprovalLockReviewItemCount: number;
  deploymentExecutionLockReviewItemCount: number;
  operatingTransitionLockReviewItemCount: number;
  infrastructureDomainDnsHttpsLockReviewItemCount: number;
  operatingDbLockReviewItemCount: number;
  runtimeWorkerQueueAdapterLockReviewItemCount: number;
  apiSecretUiActionPostLockReviewItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestSubmissionLockReviewItemCount: number;

  actualNaverApiCall: boolean;
  actualProductLookupApiCall: boolean;
  actualProductUpdateApiCall: boolean;
  actualTokenReissue: boolean;
  actualPriceChange: boolean;
  actualStockChange: boolean;
  actualDbWrite: boolean;
  actualOperatingDbConnectionChange: boolean;
  actualEnvReadOrWrite: boolean;
  actualSecretExposure: boolean;
  actualRawApiResponseExposure: boolean;
  actualWorkerRun: boolean;
  actualQueueEnqueue: boolean;
  actualAdapterConnection: boolean;
  actualRuntimeConfiguration: boolean;
  actualApprovalRequestCreated: boolean;
  actualApprovalRequestReviewedAsSubmission: boolean;
  actualApprovalRequestSubmitted: boolean;
  actualSubmissionReadinessReviewSubmitted: boolean;
  actualSubmissionReadinessOutcomeCertificationSubmitted: boolean;
  actualSubmissionLockReviewSubmitted: boolean;
  actualFinalApprovalGrant: boolean;
  actualFinalApprovalSubmission: boolean;
  actualDeploymentApproval: boolean;
  actualDeploymentExecution: boolean;
  actualOperatingTransition: boolean;
  actualVpsCreation: boolean;
  actualDomainConnection: boolean;
  actualDnsChange: boolean;
  actualSslCertificateIssue: boolean;
  actualExecutionButtonAdded: boolean;
  actualSubmitActionAdded: boolean;
  actualPostApiAdded: boolean;

  finalApprovalSubmissionStillNotPerformed: boolean;
  approvalRequestStillNotCreated: boolean;
  submissionReadinessReviewStillNotSubmitted: boolean;
  submissionReadinessOutcomeCertificationStillNotSubmitted: boolean;
  submissionLockReviewStillNotSubmitted: boolean;
  submissionLockReviewNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReview: boolean;
  requiresSeparateTask379Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
};

function mapOutcomeCertificationItemsToLockReview(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[] {
  return items.map((item) => {
    let reviewStatus: 'SUBMISSION_LOCK_REVIEW_PASSED' | 'SUBMISSION_LOCK_REVIEW_BLOCKED' | 'SUBMISSION_LOCK_REVIEW_NOT_STARTED';
    if (item.outcomeCertificationStatus === 'SUBMISSION_READINESS_OUTCOME_CERTIFIED') {
      reviewStatus = 'SUBMISSION_LOCK_REVIEW_PASSED';
    } else if (item.outcomeCertificationStatus === 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_FAILED') {
      reviewStatus = 'SUBMISSION_LOCK_REVIEW_BLOCKED';
    } else {
      reviewStatus = 'SUBMISSION_LOCK_REVIEW_NOT_STARTED';
    }

    return {
      lockReviewItemId: `submission-lock-review-${item.outcomeCertificationItemId}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} Lock Review`,
      description: `[제출 Lock 검토] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      lockReviewStatus: reviewStatus,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isNotStarted: item.isNotStarted,
      isReadOnly: true,
      actualNaverApiCall: false,
      actualProductLookupApiCall: false,
      actualProductUpdateApiCall: false,
      actualTokenReissue: false,
      actualPriceChange: false,
      actualStockChange: false,
      actualDbWrite: false,
      actualApprovalRequestCreated: false,
      actualApprovalRequestReviewedAsSubmission: false,
      actualApprovalRequestSubmitted: false,
      actualFinalApprovalGrant: false,
      actualFinalApprovalSubmission: false,
      actualDeploymentApproval: false,
      actualDeploymentExecution: false,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
  readinessOutcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView {
  const lockReviewStatus = STATUS_MAP[
    readinessOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus
  ];

  const approvalRequestSubmissionLockReviewReadinessItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems,
    'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READINESS'
  );
  const approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems,
    'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_LOCK_REVIEW'
  );
  const approvalRequestCreationLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.approvalRequestSubmissionScopeOutcomeCertificationItems,
    'APPROVAL_REQUEST_CREATION_LOCK_REVIEW'
  );
  const approvalRequestReviewSubmissionLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.finalApprovalSubmissionScopeOutcomeCertificationItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_LOCK_REVIEW'
  );
  const approvalRequestSubmissionLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.finalApprovalGrantScopeOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW'
  );
  const finalApprovalSubmissionLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.deploymentApprovalScopeOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_LOCK_REVIEW'
  );
  const finalApprovalGrantLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.deploymentExecutionScopeOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_LOCK_REVIEW'
  );
  const deploymentApprovalLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.operatingTransitionScopeOutcomeCertificationItems,
    'DEPLOYMENT_APPROVAL_LOCK_REVIEW'
  );
  const deploymentExecutionLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.infrastructureSubmissionBoundaryOutcomeCertificationItems,
    'DEPLOYMENT_EXECUTION_LOCK_REVIEW'
  );
  const operatingTransitionLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems,
    'OPERATING_TRANSITION_LOCK_REVIEW'
  );
  const infrastructureDomainDnsHttpsLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.operatingDbSubmissionBoundaryOutcomeCertificationItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_LOCK_REVIEW'
  );
  const operatingDbLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems,
    'OPERATING_DB_LOCK_REVIEW'
  );
  const runtimeWorkerQueueAdapterLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_REVIEW'
  );
  const apiSecretUiActionPostLockReviewItems = mapOutcomeCertificationItemsToLockReview(
    readinessOutcomeCertificationView.uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_LOCK_REVIEW'
  );

  const lockReviewItems = [
    ...approvalRequestSubmissionLockReviewReadinessItems,
    ...approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems,
    ...approvalRequestCreationLockReviewItems,
    ...approvalRequestReviewSubmissionLockReviewItems,
    ...approvalRequestSubmissionLockReviewItems,
    ...finalApprovalSubmissionLockReviewItems,
    ...finalApprovalGrantLockReviewItems,
    ...deploymentApprovalLockReviewItems,
    ...deploymentExecutionLockReviewItems,
    ...operatingTransitionLockReviewItems,
    ...infrastructureDomainDnsHttpsLockReviewItems,
    ...operatingDbLockReviewItems,
    ...runtimeWorkerQueueAdapterLockReviewItems,
    ...apiSecretUiActionPostLockReviewItems,
  ];

  const readyLockReviewItems = lockReviewItems.filter((i) => i.isReady);
  const partialReadyLockReviewItems = lockReviewItems.filter((i) => i.isPartialReady);
  const blockedLockReviewItems = lockReviewItems.filter((i) => i.isBlocked);
  const notStartedLockReviewItems = lockReviewItems.filter((i) => i.isNotStarted);

  return {
    taskId: 378,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Lock Review',

    sourceSubmissionReadinessOutcomeCertificationStatus: readinessOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
    sourceRecommendedOutcomeCertificationDecision: readinessOutcomeCertificationView.recommendedOutcomeCertificationDecision,
    sourceRecommendedOutcomeCertificationDecisionLabel: readinessOutcomeCertificationView.recommendedOutcomeCertificationDecisionLabel,
    sourcePacketStatus: readinessOutcomeCertificationView.sourcePacketStatus,
    sourceOutcomeCertifiedGoNoGoDecision: readinessOutcomeCertificationView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: readinessOutcomeCertificationView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: readinessOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus: lockReviewStatus,

    approvalRequestSubmissionLockReviewStarted: true,
    approvalRequestSubmissionLockReviewStillReadOnly: true,
    approvalRequestSubmissionLockReviewStillLocked: true,
    approvalRequestSubmissionLockReviewCompleted: true,

    recommendedSubmissionLockReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSubmissionLockReviewDecisionLabel: '최종 승인 제출 Approval Request Submission Lock Review - read-only 제출 Lock 검토 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    lockReviewItems,
    approvalRequestSubmissionLockReviewReadinessItems,
    approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems,
    approvalRequestCreationLockReviewItems,
    approvalRequestReviewSubmissionLockReviewItems,
    approvalRequestSubmissionLockReviewItems,
    finalApprovalSubmissionLockReviewItems,
    finalApprovalGrantLockReviewItems,
    deploymentApprovalLockReviewItems,
    deploymentExecutionLockReviewItems,
    operatingTransitionLockReviewItems,
    infrastructureDomainDnsHttpsLockReviewItems,
    operatingDbLockReviewItems,
    runtimeWorkerQueueAdapterLockReviewItems,
    apiSecretUiActionPostLockReviewItems,

    lockReviewSummaryCards: [
      { label: 'Lock Review Ready', value: readyLockReviewItems.length },
      { label: 'Partial Ready', value: partialReadyLockReviewItems.length },
      { label: 'Blocked', value: blockedLockReviewItems.length },
      { label: 'Not Started', value: notStartedLockReviewItems.length },
      { label: 'Total', value: lockReviewItems.length },
    ],
    readyLockReviewItems,
    partialReadyLockReviewItems,
    blockedLockReviewItems,
    notStartedLockReviewItems,

    approvalRequestSubmissionLockReviewReadinessItemCount: approvalRequestSubmissionLockReviewReadinessItems.length,
    approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItemCount: approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems.length,
    approvalRequestCreationLockReviewItemCount: approvalRequestCreationLockReviewItems.length,
    approvalRequestReviewSubmissionLockReviewItemCount: approvalRequestReviewSubmissionLockReviewItems.length,
    approvalRequestSubmissionLockReviewItemCount: approvalRequestSubmissionLockReviewItems.length,
    finalApprovalSubmissionLockReviewItemCount: finalApprovalSubmissionLockReviewItems.length,
    finalApprovalGrantLockReviewItemCount: finalApprovalGrantLockReviewItems.length,
    deploymentApprovalLockReviewItemCount: deploymentApprovalLockReviewItems.length,
    deploymentExecutionLockReviewItemCount: deploymentExecutionLockReviewItems.length,
    operatingTransitionLockReviewItemCount: operatingTransitionLockReviewItems.length,
    infrastructureDomainDnsHttpsLockReviewItemCount: infrastructureDomainDnsHttpsLockReviewItems.length,
    operatingDbLockReviewItemCount: operatingDbLockReviewItems.length,
    runtimeWorkerQueueAdapterLockReviewItemCount: runtimeWorkerQueueAdapterLockReviewItems.length,
    apiSecretUiActionPostLockReviewItemCount: apiSecretUiActionPostLockReviewItems.length,

    readyItemCount: readyLockReviewItems.length,
    partialReadyItemCount: partialReadyLockReviewItems.length,
    blockedItemCount: blockedLockReviewItems.length,
    notStartedItemCount: notStartedLockReviewItems.length,
    totalApprovalRequestSubmissionLockReviewItemCount: lockReviewItems.length,

    actualNaverApiCall: false,
    actualProductLookupApiCall: false,
    actualProductUpdateApiCall: false,
    actualTokenReissue: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualOperatingDbConnectionChange: false,
    actualEnvReadOrWrite: false,
    actualSecretExposure: false,
    actualRawApiResponseExposure: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualAdapterConnection: false,
    actualRuntimeConfiguration: false,
    actualApprovalRequestCreated: false,
    actualApprovalRequestReviewedAsSubmission: false,
    actualApprovalRequestSubmitted: false,
    actualSubmissionReadinessReviewSubmitted: false,
    actualSubmissionReadinessOutcomeCertificationSubmitted: false,
    actualSubmissionLockReviewSubmitted: false,
    actualFinalApprovalGrant: false,
    actualFinalApprovalSubmission: false,
    actualDeploymentApproval: false,
    actualDeploymentExecution: false,
    actualOperatingTransition: false,
    actualVpsCreation: false,
    actualDomainConnection: false,
    actualDnsChange: false,
    actualSslCertificateIssue: false,
    actualExecutionButtonAdded: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,

    finalApprovalSubmissionStillNotPerformed: true,
    approvalRequestStillNotCreated: true,
    submissionReadinessReviewStillNotSubmitted: true,
    submissionReadinessOutcomeCertificationStillNotSubmitted: true,
    submissionLockReviewStillNotSubmitted: true,
    submissionLockReviewNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReview: true,
    requiresSeparateTask379Approval: true,
    nextTaskApprovalPhrase: 'Task 379에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Submission Lock 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 378 운영 배포 최종 승인 제출 Approval Request Submission Lock Review를 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
