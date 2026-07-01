import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-final-review-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewCategory =
  | 'APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READINESS'
  | 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE'
  | 'APPROVAL_REQUEST_SUBMISSION_SCOPE_READINESS_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_SCOPE_READINESS_REVIEW'
  | 'FINAL_APPROVAL_GRANT_SCOPE_READINESS_REVIEW'
  | 'DEPLOYMENT_APPROVAL_SCOPE_READINESS_REVIEW'
  | 'DEPLOYMENT_EXECUTION_SCOPE_READINESS_REVIEW'
  | 'OPERATING_TRANSITION_SCOPE_READINESS_REVIEW'
  | 'INFRASTRUCTURE_SUBMISSION_BOUNDARY_REVIEW'
  | 'DOMAIN_DNS_HTTPS_SUBMISSION_BOUNDARY_REVIEW'
  | 'OPERATING_DB_SUBMISSION_BOUNDARY_REVIEW'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_SUBMISSION_BOUNDARY_REVIEW'
  | 'API_SECRET_RAW_RESPONSE_SUBMISSION_BOUNDARY_REVIEW'
  | 'UI_ACTION_POST_SUBMIT_SUBMISSION_BOUNDARY_REVIEW';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem {
  readinessReviewItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceOutcomeCertificationStatus: string;
  readinessReviewStatus: 'SUBMISSION_READINESS_REVIEW_PASSED' | 'SUBMISSION_READINESS_REVIEW_BLOCKED' | 'SUBMISSION_READINESS_REVIEW_NOT_STARTED';
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

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView {
  taskId: 376;
  taskName: string;

  sourceFinalReviewOutcomeCertificationStatus: string;
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

  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus;

  approvalRequestSubmissionReadinessReviewStarted: boolean;
  approvalRequestSubmissionReadinessReviewStillReadOnly: boolean;
  approvalRequestSubmissionReadinessReviewStillLocked: boolean;
  approvalRequestSubmissionReadinessReviewCompleted: boolean;

  recommendedSubmissionReadinessReviewDecision: string;
  recommendedSubmissionReadinessReviewDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  readinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  approvalRequestSubmissionReadinessReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  approvalRequestSubmissionScopeReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  finalApprovalSubmissionScopeReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  finalApprovalGrantScopeReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  deploymentApprovalScopeReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  deploymentExecutionScopeReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  operatingTransitionScopeReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  infrastructureSubmissionBoundaryReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  domainDnsHttpsSubmissionBoundaryReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  operatingDbSubmissionBoundaryReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  apiSecretRawResponseSubmissionBoundaryReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  uiActionPostSubmitSubmissionBoundaryReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];

  readinessReviewSummaryCards: { label: string; value: number }[];
  readyReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  partialReadyReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  blockedReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];
  notStartedReadinessReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[];

  approvalRequestSubmissionReadinessReviewReadinessItemCount: number;
  approvalRequestPacketFinalReviewOutcomeCertificationReferenceItemCount: number;
  approvalRequestSubmissionScopeReadinessReviewItemCount: number;
  finalApprovalSubmissionScopeReadinessReviewItemCount: number;
  finalApprovalGrantScopeReadinessReviewItemCount: number;
  deploymentApprovalScopeReadinessReviewItemCount: number;
  deploymentExecutionScopeReadinessReviewItemCount: number;
  operatingTransitionScopeReadinessReviewItemCount: number;
  infrastructureSubmissionBoundaryReviewItemCount: number;
  domainDnsHttpsSubmissionBoundaryReviewItemCount: number;
  operatingDbSubmissionBoundaryReviewItemCount: number;
  runtimeWorkerQueueAdapterSubmissionBoundaryReviewItemCount: number;
  apiSecretRawResponseSubmissionBoundaryReviewItemCount: number;
  uiActionPostSubmitSubmissionBoundaryReviewItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestSubmissionReadinessReviewItemCount: number;

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
  submissionReadinessReviewNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReview: boolean;
  requiresSeparateTask377Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_NOT_STARTED',
};

function mapOutcomeCertificationItemsToReadinessReview(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[] {
  return items.map((item) => {
    let reviewStatus: 'SUBMISSION_READINESS_REVIEW_PASSED' | 'SUBMISSION_READINESS_REVIEW_BLOCKED' | 'SUBMISSION_READINESS_REVIEW_NOT_STARTED';
    if (item.outcomeCertificationStatus === 'FINAL_REVIEW_OUTCOME_CERTIFIED') {
      reviewStatus = 'SUBMISSION_READINESS_REVIEW_PASSED';
    } else if (item.outcomeCertificationStatus === 'FINAL_REVIEW_OUTCOME_CERTIFICATION_FAILED') {
      reviewStatus = 'SUBMISSION_READINESS_REVIEW_BLOCKED';
    } else {
      reviewStatus = 'SUBMISSION_READINESS_REVIEW_NOT_STARTED';
    }

    return {
      readinessReviewItemId: `submission-readiness-review-${item.outcomeCertificationItemId}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} Submission Readiness Review`,
      description: `[제출 준비 검토] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      readinessReviewStatus: reviewStatus,
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

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
  finalReviewOutcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView {
  const readinessReviewStatus = STATUS_MAP[
    finalReviewOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus
  ];

  const approvalRequestSubmissionReadinessReviewReadinessItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems,
    'APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READINESS'
  );
  const approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.approvalRequestPacketFinalReviewOutcomeCertificationItems,
    'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE'
  );
  const approvalRequestSubmissionScopeReadinessReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_SCOPE_READINESS_REVIEW'
  );
  const finalApprovalSubmissionScopeReadinessReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_SCOPE_READINESS_REVIEW'
  );
  const finalApprovalGrantScopeReadinessReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.finalApprovalGrantRequestScopeFinalOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_SCOPE_READINESS_REVIEW'
  );
  const deploymentApprovalScopeReadinessReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.deploymentApprovalRequestScopeFinalOutcomeCertificationItems,
    'DEPLOYMENT_APPROVAL_SCOPE_READINESS_REVIEW'
  );
  const deploymentExecutionScopeReadinessReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.deploymentExecutionRequestScopeFinalOutcomeCertificationItems,
    'DEPLOYMENT_EXECUTION_SCOPE_READINESS_REVIEW'
  );
  const operatingTransitionScopeReadinessReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.operatingTransitionRequestScopeFinalOutcomeCertificationItems,
    'OPERATING_TRANSITION_SCOPE_READINESS_REVIEW'
  );
  const infrastructureSubmissionBoundaryReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.infrastructureRequestBoundaryFinalOutcomeCertificationItems,
    'INFRASTRUCTURE_SUBMISSION_BOUNDARY_REVIEW'
  );
  const domainDnsHttpsSubmissionBoundaryReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems,
    'DOMAIN_DNS_HTTPS_SUBMISSION_BOUNDARY_REVIEW'
  );
  const operatingDbSubmissionBoundaryReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.operatingDbRequestBoundaryFinalOutcomeCertificationItems,
    'OPERATING_DB_SUBMISSION_BOUNDARY_REVIEW'
  );
  const runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_SUBMISSION_BOUNDARY_REVIEW'
  );
  const apiSecretRawResponseSubmissionBoundaryReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems,
    'API_SECRET_RAW_RESPONSE_SUBMISSION_BOUNDARY_REVIEW'
  );
  const uiActionPostSubmitSubmissionBoundaryReviewItems = mapOutcomeCertificationItemsToReadinessReview(
    finalReviewOutcomeCertificationView.uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems,
    'UI_ACTION_POST_SUBMIT_SUBMISSION_BOUNDARY_REVIEW'
  );

  const readinessReviewItems = [
    ...approvalRequestSubmissionReadinessReviewReadinessItems,
    ...approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems,
    ...approvalRequestSubmissionScopeReadinessReviewItems,
    ...finalApprovalSubmissionScopeReadinessReviewItems,
    ...finalApprovalGrantScopeReadinessReviewItems,
    ...deploymentApprovalScopeReadinessReviewItems,
    ...deploymentExecutionScopeReadinessReviewItems,
    ...operatingTransitionScopeReadinessReviewItems,
    ...infrastructureSubmissionBoundaryReviewItems,
    ...domainDnsHttpsSubmissionBoundaryReviewItems,
    ...operatingDbSubmissionBoundaryReviewItems,
    ...runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems,
    ...apiSecretRawResponseSubmissionBoundaryReviewItems,
    ...uiActionPostSubmitSubmissionBoundaryReviewItems,
  ];

  const readyReadinessReviewItems = readinessReviewItems.filter((i) => i.isReady);
  const partialReadyReadinessReviewItems = readinessReviewItems.filter((i) => i.isPartialReady);
  const blockedReadinessReviewItems = readinessReviewItems.filter((i) => i.isBlocked);
  const notStartedReadinessReviewItems = readinessReviewItems.filter((i) => i.isNotStarted);

  return {
    taskId: 376,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Readiness Review',

    sourceFinalReviewOutcomeCertificationStatus: finalReviewOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
    sourceRecommendedOutcomeCertificationDecision: finalReviewOutcomeCertificationView.recommendedOutcomeCertificationDecision,
    sourceRecommendedOutcomeCertificationDecisionLabel: finalReviewOutcomeCertificationView.recommendedOutcomeCertificationDecisionLabel,
    sourcePacketStatus: finalReviewOutcomeCertificationView.sourcePacketStatus,
    sourceOutcomeCertifiedGoNoGoDecision: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: finalReviewOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus: readinessReviewStatus,

    approvalRequestSubmissionReadinessReviewStarted: true,
    approvalRequestSubmissionReadinessReviewStillReadOnly: true,
    approvalRequestSubmissionReadinessReviewStillLocked: true,
    approvalRequestSubmissionReadinessReviewCompleted: true,

    recommendedSubmissionReadinessReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY',
    recommendedSubmissionReadinessReviewDecisionLabel: '최종 승인 제출 Approval Request Submission Readiness Review - read-only 제출 준비 검토 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    readinessReviewItems,
    approvalRequestSubmissionReadinessReviewReadinessItems,
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems,
    approvalRequestSubmissionScopeReadinessReviewItems,
    finalApprovalSubmissionScopeReadinessReviewItems,
    finalApprovalGrantScopeReadinessReviewItems,
    deploymentApprovalScopeReadinessReviewItems,
    deploymentExecutionScopeReadinessReviewItems,
    operatingTransitionScopeReadinessReviewItems,
    infrastructureSubmissionBoundaryReviewItems,
    domainDnsHttpsSubmissionBoundaryReviewItems,
    operatingDbSubmissionBoundaryReviewItems,
    runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems,
    apiSecretRawResponseSubmissionBoundaryReviewItems,
    uiActionPostSubmitSubmissionBoundaryReviewItems,

    readinessReviewSummaryCards: [
      { label: 'Readiness Review Ready', value: readyReadinessReviewItems.length },
      { label: 'Partial Ready', value: partialReadyReadinessReviewItems.length },
      { label: 'Blocked', value: blockedReadinessReviewItems.length },
      { label: 'Not Started', value: notStartedReadinessReviewItems.length },
      { label: 'Total', value: readinessReviewItems.length },
    ],
    readyReadinessReviewItems,
    partialReadyReadinessReviewItems,
    blockedReadinessReviewItems,
    notStartedReadinessReviewItems,

    approvalRequestSubmissionReadinessReviewReadinessItemCount: approvalRequestSubmissionReadinessReviewReadinessItems.length,
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItemCount: approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems.length,
    approvalRequestSubmissionScopeReadinessReviewItemCount: approvalRequestSubmissionScopeReadinessReviewItems.length,
    finalApprovalSubmissionScopeReadinessReviewItemCount: finalApprovalSubmissionScopeReadinessReviewItems.length,
    finalApprovalGrantScopeReadinessReviewItemCount: finalApprovalGrantScopeReadinessReviewItems.length,
    deploymentApprovalScopeReadinessReviewItemCount: deploymentApprovalScopeReadinessReviewItems.length,
    deploymentExecutionScopeReadinessReviewItemCount: deploymentExecutionScopeReadinessReviewItems.length,
    operatingTransitionScopeReadinessReviewItemCount: operatingTransitionScopeReadinessReviewItems.length,
    infrastructureSubmissionBoundaryReviewItemCount: infrastructureSubmissionBoundaryReviewItems.length,
    domainDnsHttpsSubmissionBoundaryReviewItemCount: domainDnsHttpsSubmissionBoundaryReviewItems.length,
    operatingDbSubmissionBoundaryReviewItemCount: operatingDbSubmissionBoundaryReviewItems.length,
    runtimeWorkerQueueAdapterSubmissionBoundaryReviewItemCount: runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems.length,
    apiSecretRawResponseSubmissionBoundaryReviewItemCount: apiSecretRawResponseSubmissionBoundaryReviewItems.length,
    uiActionPostSubmitSubmissionBoundaryReviewItemCount: uiActionPostSubmitSubmissionBoundaryReviewItems.length,

    readyItemCount: readyReadinessReviewItems.length,
    partialReadyItemCount: partialReadyReadinessReviewItems.length,
    blockedItemCount: blockedReadinessReviewItems.length,
    notStartedItemCount: notStartedReadinessReviewItems.length,
    totalApprovalRequestSubmissionReadinessReviewItemCount: readinessReviewItems.length,

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
    submissionReadinessReviewNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReview: true,
    requiresSeparateTask377Approval: true,
    nextTaskApprovalPhrase: 'Task 377에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Submission Readiness 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 376 운영 배포 최종 승인 제출 Approval Request Submission Readiness Review를 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
