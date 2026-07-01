import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-lock-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationCategory =
  | 'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS'
  | 'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_REFERENCE'
  | 'APPROVAL_REQUEST_CREATION_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_LOCK_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_LOCK_OUTCOME_CERTIFICATION';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceLockReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceLockReviewStatus: string;
  outcomeCertificationStatus: 'SUBMISSION_LOCK_OUTCOME_CERTIFIED' | 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_FAILED' | 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_NOT_STARTED';
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

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView {
  taskId: 379;
  taskName: string;

  sourceSubmissionLockReviewStatus: string;
  sourceRecommendedSubmissionLockReviewDecision: string;
  sourceRecommendedSubmissionLockReviewDecisionLabel: string;
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

  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus;

  approvalRequestSubmissionLockOutcomeCertificationStarted: boolean;
  approvalRequestSubmissionLockOutcomeCertificationStillReadOnly: boolean;
  approvalRequestSubmissionLockOutcomeCertificationStillLocked: boolean;
  approvalRequestSubmissionLockOutcomeCertificationCompleted: boolean;

  recommendedOutcomeCertificationDecision: string;
  recommendedOutcomeCertificationDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestSubmissionLockOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestSubmissionLockReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestSubmissionReadinessOutcomeCertificationReferenceItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestCreationLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestReviewSubmissionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestSubmissionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  finalApprovalSubmissionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  finalApprovalGrantLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  deploymentApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  deploymentExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  operatingTransitionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  infrastructureDomainDnsHttpsLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  apiSecretUiActionPostLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];

  outcomeCertificationSummaryCards: { label: string; value: number }[];
  certifiedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  failedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[];

  approvalRequestSubmissionLockOutcomeCertificationReadinessItemCount: number;
  approvalRequestSubmissionLockReviewOutcomeCertificationItemCount: number;
  approvalRequestSubmissionReadinessOutcomeCertificationReferenceItemCount: number;
  approvalRequestCreationLockOutcomeCertificationItemCount: number;
  approvalRequestReviewSubmissionLockOutcomeCertificationItemCount: number;
  approvalRequestSubmissionLockOutcomeCertificationItemCount: number;
  finalApprovalSubmissionLockOutcomeCertificationItemCount: number;
  finalApprovalGrantLockOutcomeCertificationItemCount: number;
  deploymentApprovalLockOutcomeCertificationItemCount: number;
  deploymentExecutionLockOutcomeCertificationItemCount: number;
  operatingTransitionLockOutcomeCertificationItemCount: number;
  infrastructureDomainDnsHttpsLockOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItemCount: number;
  apiSecretUiActionPostLockOutcomeCertificationItemCount: number;

  certifiedItemCount: number;
  failedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestSubmissionLockOutcomeCertificationItemCount: number;

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
  actualSubmissionLockOutcomeCertificationSubmitted: boolean;
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
  submissionLockOutcomeCertificationStillNotSubmitted: boolean;
  submissionLockOutcomeCertificationNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertification: boolean;
  requiresSeparateTask380Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
};

function mapLockReviewItemsToOutcomeCertification(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationItem[] {
  return items.map((item) => {
    let certStatus: 'SUBMISSION_LOCK_OUTCOME_CERTIFIED' | 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_FAILED' | 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_NOT_STARTED';
    if (item.lockReviewStatus === 'SUBMISSION_LOCK_REVIEW_PASSED') {
      certStatus = 'SUBMISSION_LOCK_OUTCOME_CERTIFIED';
    } else if (item.lockReviewStatus === 'SUBMISSION_LOCK_REVIEW_BLOCKED') {
      certStatus = 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_FAILED';
    } else {
      certStatus = 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_NOT_STARTED';
    }

    return {
      outcomeCertificationItemId: `submission-lock-outcome-cert-${item.lockReviewItemId}`,
      sourceLockReviewItemId: item.lockReviewItemId,
      category,
      label: `${item.label} Outcome Certification`,
      description: `[제출 Lock 결과 인증] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceLockReviewStatus: item.lockReviewStatus,
      outcomeCertificationStatus: certStatus,
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

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
  lockReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView {
  const outcomeCertificationStatus = STATUS_MAP[
    lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus
  ];

  const approvalRequestSubmissionLockOutcomeCertificationReadinessItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.approvalRequestSubmissionLockReviewReadinessItems,
    'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS'
  );
  const approvalRequestSubmissionLockReviewOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_OUTCOME_CERTIFICATION'
  );
  const approvalRequestSubmissionReadinessOutcomeCertificationReferenceItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.approvalRequestCreationLockReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_REFERENCE'
  );
  const approvalRequestCreationLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.approvalRequestReviewSubmissionLockReviewItems,
    'APPROVAL_REQUEST_CREATION_LOCK_OUTCOME_CERTIFICATION'
  );
  const approvalRequestReviewSubmissionLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.approvalRequestSubmissionLockReviewItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  );
  const approvalRequestSubmissionLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.finalApprovalSubmissionLockReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  );
  const finalApprovalSubmissionLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.finalApprovalGrantLockReviewItems,
    'FINAL_APPROVAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  );
  const finalApprovalGrantLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.deploymentApprovalLockReviewItems,
    'FINAL_APPROVAL_GRANT_LOCK_OUTCOME_CERTIFICATION'
  );
  const deploymentApprovalLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.deploymentExecutionLockReviewItems,
    'DEPLOYMENT_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  );
  const deploymentExecutionLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.operatingTransitionLockReviewItems,
    'DEPLOYMENT_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  );
  const operatingTransitionLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.infrastructureDomainDnsHttpsLockReviewItems,
    'OPERATING_TRANSITION_LOCK_OUTCOME_CERTIFICATION'
  );
  const infrastructureDomainDnsHttpsLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.operatingDbLockReviewItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_LOCK_OUTCOME_CERTIFICATION'
  );
  const operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.runtimeWorkerQueueAdapterLockReviewItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_OUTCOME_CERTIFICATION'
  );
  const apiSecretUiActionPostLockOutcomeCertificationItems = mapLockReviewItemsToOutcomeCertification(
    lockReviewView.apiSecretUiActionPostLockReviewItems,
    'API_SECRET_UI_ACTION_POST_LOCK_OUTCOME_CERTIFICATION'
  );

  const outcomeCertificationItems = [
    ...approvalRequestSubmissionLockOutcomeCertificationReadinessItems,
    ...approvalRequestSubmissionLockReviewOutcomeCertificationItems,
    ...approvalRequestSubmissionReadinessOutcomeCertificationReferenceItems,
    ...approvalRequestCreationLockOutcomeCertificationItems,
    ...approvalRequestReviewSubmissionLockOutcomeCertificationItems,
    ...approvalRequestSubmissionLockOutcomeCertificationItems,
    ...finalApprovalSubmissionLockOutcomeCertificationItems,
    ...finalApprovalGrantLockOutcomeCertificationItems,
    ...deploymentApprovalLockOutcomeCertificationItems,
    ...deploymentExecutionLockOutcomeCertificationItems,
    ...operatingTransitionLockOutcomeCertificationItems,
    ...infrastructureDomainDnsHttpsLockOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems,
    ...apiSecretUiActionPostLockOutcomeCertificationItems,
  ];

  const certifiedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.outcomeCertificationStatus === 'SUBMISSION_LOCK_OUTCOME_CERTIFIED');
  const failedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.outcomeCertificationStatus === 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_FAILED');
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.outcomeCertificationStatus === 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_NOT_STARTED');

  return {
    taskId: 379,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Lock Outcome Certification',

    sourceSubmissionLockReviewStatus: lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
    sourceRecommendedSubmissionLockReviewDecision: lockReviewView.recommendedSubmissionLockReviewDecision,
    sourceRecommendedSubmissionLockReviewDecisionLabel: lockReviewView.recommendedSubmissionLockReviewDecisionLabel,
    sourceSubmissionReadinessOutcomeCertificationStatus: lockReviewView.sourceSubmissionReadinessOutcomeCertificationStatus,
    sourceRecommendedOutcomeCertificationDecision: lockReviewView.sourceRecommendedOutcomeCertificationDecision,
    sourceRecommendedOutcomeCertificationDecisionLabel: lockReviewView.sourceRecommendedOutcomeCertificationDecisionLabel,
    sourcePacketStatus: lockReviewView.sourcePacketStatus,
    sourceOutcomeCertifiedGoNoGoDecision: lockReviewView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: lockReviewView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: lockReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: lockReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: lockReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: lockReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: lockReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: lockReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: lockReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: lockReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus: outcomeCertificationStatus,

    approvalRequestSubmissionLockOutcomeCertificationStarted: true,
    approvalRequestSubmissionLockOutcomeCertificationStillReadOnly: true,
    approvalRequestSubmissionLockOutcomeCertificationStillLocked: true,
    approvalRequestSubmissionLockOutcomeCertificationCompleted: true,

    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Submission Lock 결과 인증 - read-only 인증 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    outcomeCertificationItems,
    approvalRequestSubmissionLockOutcomeCertificationReadinessItems,
    approvalRequestSubmissionLockReviewOutcomeCertificationItems,
    approvalRequestSubmissionReadinessOutcomeCertificationReferenceItems,
    approvalRequestCreationLockOutcomeCertificationItems,
    approvalRequestReviewSubmissionLockOutcomeCertificationItems,
    approvalRequestSubmissionLockOutcomeCertificationItems,
    finalApprovalSubmissionLockOutcomeCertificationItems,
    finalApprovalGrantLockOutcomeCertificationItems,
    deploymentApprovalLockOutcomeCertificationItems,
    deploymentExecutionLockOutcomeCertificationItems,
    operatingTransitionLockOutcomeCertificationItems,
    infrastructureDomainDnsHttpsLockOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems,
    apiSecretUiActionPostLockOutcomeCertificationItems,

    outcomeCertificationSummaryCards: [
      { label: 'Outcome Certified', value: certifiedOutcomeCertificationItems.length },
      { label: 'Certification Failed', value: failedOutcomeCertificationItems.length },
      { label: 'Not Started', value: notStartedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    certifiedOutcomeCertificationItems,
    failedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,

    approvalRequestSubmissionLockOutcomeCertificationReadinessItemCount: approvalRequestSubmissionLockOutcomeCertificationReadinessItems.length,
    approvalRequestSubmissionLockReviewOutcomeCertificationItemCount: approvalRequestSubmissionLockReviewOutcomeCertificationItems.length,
    approvalRequestSubmissionReadinessOutcomeCertificationReferenceItemCount: approvalRequestSubmissionReadinessOutcomeCertificationReferenceItems.length,
    approvalRequestCreationLockOutcomeCertificationItemCount: approvalRequestCreationLockOutcomeCertificationItems.length,
    approvalRequestReviewSubmissionLockOutcomeCertificationItemCount: approvalRequestReviewSubmissionLockOutcomeCertificationItems.length,
    approvalRequestSubmissionLockOutcomeCertificationItemCount: approvalRequestSubmissionLockOutcomeCertificationItems.length,
    finalApprovalSubmissionLockOutcomeCertificationItemCount: finalApprovalSubmissionLockOutcomeCertificationItems.length,
    finalApprovalGrantLockOutcomeCertificationItemCount: finalApprovalGrantLockOutcomeCertificationItems.length,
    deploymentApprovalLockOutcomeCertificationItemCount: deploymentApprovalLockOutcomeCertificationItems.length,
    deploymentExecutionLockOutcomeCertificationItemCount: deploymentExecutionLockOutcomeCertificationItems.length,
    operatingTransitionLockOutcomeCertificationItemCount: operatingTransitionLockOutcomeCertificationItems.length,
    infrastructureDomainDnsHttpsLockOutcomeCertificationItemCount: infrastructureDomainDnsHttpsLockOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItemCount: operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems.length,
    apiSecretUiActionPostLockOutcomeCertificationItemCount: apiSecretUiActionPostLockOutcomeCertificationItems.length,

    certifiedItemCount: certifiedOutcomeCertificationItems.length,
    failedItemCount: failedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalApprovalRequestSubmissionLockOutcomeCertificationItemCount: outcomeCertificationItems.length,

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
    actualSubmissionLockOutcomeCertificationSubmitted: false,
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
    submissionLockOutcomeCertificationStillNotSubmitted: true,
    submissionLockOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertification: true,
    requiresSeparateTask380Approval: true,
    nextTaskApprovalPhrase: 'Task 380에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Final Submission Boundary Review 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 379 운영 배포 최종 승인 제출 Approval Request Submission Lock 결과 인증을 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
