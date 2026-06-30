import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationCategory =
  | 'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_READINESS'
  | 'APPROVAL_REQUEST_PACKET_REFERENCE_REVIEW_OUTCOME_CERTIFICATION'
  | 'FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_REVIEW_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  | 'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  | 'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  | 'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceReviewStatus: string;
  outcomeCertificationStatus: 'OUTCOME_CERTIFIED' | 'OUTCOME_CERTIFICATION_FAILED' | 'OUTCOME_CERTIFICATION_NOT_STARTED';
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

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView {
  taskId: 371;
  taskName: string;

  sourceReviewStatus: string;
  sourceRecommendedApprovalRequestPacketReviewDecision: string;
  sourceRecommendedApprovalRequestPacketReviewDecisionLabel: string;
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

  operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus;

  approvalRequestPacketReviewOutcomeCertificationStarted: boolean;
  approvalRequestPacketReviewOutcomeCertificationStillReadOnly: boolean;
  approvalRequestPacketReviewOutcomeCertificationStillLocked: boolean;
  approvalRequestPacketReviewOutcomeCertified: boolean;

  recommendedOutcomeCertificationDecision: string;
  recommendedOutcomeCertificationDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  approvalRequestPacketReviewOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  approvalRequestPacketReferenceReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  finalApprovalGrantRequestScopeReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  deploymentApprovalRequestScopeReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  deploymentExecutionRequestScopeReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  operatingTransitionRequestScopeReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  infrastructureRequestBoundaryReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  operatingDbRequestBoundaryReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];

  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[];

  approvalRequestPacketReviewOutcomeCertificationReadinessItemCount: number;
  approvalRequestPacketReferenceReviewOutcomeCertificationItemCount: number;
  finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItemCount: number;
  finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItemCount: number;
  finalApprovalGrantRequestScopeReviewOutcomeCertificationItemCount: number;
  deploymentApprovalRequestScopeReviewOutcomeCertificationItemCount: number;
  deploymentExecutionRequestScopeReviewOutcomeCertificationItemCount: number;
  operatingTransitionRequestScopeReviewOutcomeCertificationItemCount: number;
  infrastructureRequestBoundaryReviewOutcomeCertificationItemCount: number;
  domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItemCount: number;
  operatingDbRequestBoundaryReviewOutcomeCertificationItemCount: number;
  runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItemCount: number;
  apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItemCount: number;
  uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestPacketReviewOutcomeCertificationItemCount: number;

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
  approvalRequestReviewOutcomeCertificationStillNotSubmitted: boolean;
  reviewOutcomeCertificationNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertification: boolean;
  requiresSeparateTask372Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
};

function mapReviewItemsToOutcomeCertification(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationItem[] {
  return items.map((item) => {
    let certStatus: 'OUTCOME_CERTIFIED' | 'OUTCOME_CERTIFICATION_FAILED' | 'OUTCOME_CERTIFICATION_NOT_STARTED';
    if (item.reviewStatus === 'REVIEW_COMPLETED') {
      certStatus = 'OUTCOME_CERTIFIED';
    } else if (item.reviewStatus === 'REVIEW_BLOCKED') {
      certStatus = 'OUTCOME_CERTIFICATION_FAILED';
    } else {
      certStatus = 'OUTCOME_CERTIFICATION_NOT_STARTED';
    }

    return {
      outcomeCertificationItemId: `outcome-cert-${item.reviewItemId}`,
      sourceReviewItemId: item.reviewItemId,
      category,
      label: `${item.label} Outcome Certification`,
      description: `[결과 인증] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceReviewStatus: item.reviewStatus,
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

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
  reviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView {
  const outcomeCertificationStatus = STATUS_MAP[
    reviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus
  ];

  const approvalRequestPacketReviewOutcomeCertificationReadinessItems = mapReviewItemsToOutcomeCertification(
    reviewView.approvalRequestPacketReviewReadinessItems,
    'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_READINESS'
  );
  const approvalRequestPacketReferenceReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.approvalRequestPacketReferenceReviewItems,
    'APPROVAL_REQUEST_PACKET_REFERENCE_REVIEW_OUTCOME_CERTIFICATION'
  );
  const finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.finalReviewOutcomeCertificationReferenceReviewItems,
    'FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_REVIEW_OUTCOME_CERTIFICATION'
  );
  const finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.finalApprovalSubmissionRequestScopeReviewItems,
    'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  );
  const finalApprovalGrantRequestScopeReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.finalApprovalGrantRequestScopeReviewItems,
    'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  );
  const deploymentApprovalRequestScopeReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.deploymentApprovalRequestScopeReviewItems,
    'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  );
  const deploymentExecutionRequestScopeReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.deploymentExecutionRequestScopeReviewItems,
    'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  );
  const operatingTransitionRequestScopeReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.operatingTransitionRequestScopeReviewItems,
    'OPERATING_TRANSITION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION'
  );
  const infrastructureRequestBoundaryReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.infrastructureRequestBoundaryReviewItems,
    'INFRASTRUCTURE_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  );
  const domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.domainDnsHttpsRequestBoundaryReviewItems,
    'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  );
  const operatingDbRequestBoundaryReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.operatingDbRequestBoundaryReviewItems,
    'OPERATING_DB_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  );
  const runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.runtimeWorkerQueueAdapterRequestBoundaryReviewItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  );
  const apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.apiSecretRawResponseRequestBoundaryReviewItems,
    'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  );
  const uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItems = mapReviewItemsToOutcomeCertification(
    reviewView.uiActionPostSubmitRequestBoundaryReviewItems,
    'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION'
  );

  const outcomeCertificationItems = [
    ...approvalRequestPacketReviewOutcomeCertificationReadinessItems,
    ...approvalRequestPacketReferenceReviewOutcomeCertificationItems,
    ...finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItems,
    ...finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItems,
    ...finalApprovalGrantRequestScopeReviewOutcomeCertificationItems,
    ...deploymentApprovalRequestScopeReviewOutcomeCertificationItems,
    ...deploymentExecutionRequestScopeReviewOutcomeCertificationItems,
    ...operatingTransitionRequestScopeReviewOutcomeCertificationItems,
    ...infrastructureRequestBoundaryReviewOutcomeCertificationItems,
    ...domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItems,
    ...operatingDbRequestBoundaryReviewOutcomeCertificationItems,
    ...runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItems,
    ...apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItems,
    ...uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isPartialReady);
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isBlocked);
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isNotStarted);

  return {
    taskId: 371,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Review Outcome Certification',

    sourceReviewStatus: reviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus,
    sourceRecommendedApprovalRequestPacketReviewDecision: reviewView.recommendedApprovalRequestPacketReviewDecision,
    sourceRecommendedApprovalRequestPacketReviewDecisionLabel: reviewView.recommendedApprovalRequestPacketReviewDecisionLabel,
    sourcePacketStatus: reviewView.sourcePacketStatus,
    sourceOutcomeCertifiedGoNoGoDecision: reviewView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: reviewView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: reviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: reviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: reviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: reviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: reviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: reviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: reviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: reviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus: outcomeCertificationStatus,

    approvalRequestPacketReviewOutcomeCertificationStarted: true,
    approvalRequestPacketReviewOutcomeCertificationStillReadOnly: true,
    approvalRequestPacketReviewOutcomeCertificationStillLocked: true,
    approvalRequestPacketReviewOutcomeCertified: true,

    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Packet Review 결과 인증 - read-only 인증 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    outcomeCertificationItems,
    approvalRequestPacketReviewOutcomeCertificationReadinessItems,
    approvalRequestPacketReferenceReviewOutcomeCertificationItems,
    finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItems,
    finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItems,
    finalApprovalGrantRequestScopeReviewOutcomeCertificationItems,
    deploymentApprovalRequestScopeReviewOutcomeCertificationItems,
    deploymentExecutionRequestScopeReviewOutcomeCertificationItems,
    operatingTransitionRequestScopeReviewOutcomeCertificationItems,
    infrastructureRequestBoundaryReviewOutcomeCertificationItems,
    domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItems,
    operatingDbRequestBoundaryReviewOutcomeCertificationItems,
    runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItems,
    apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItems,
    uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItems,

    outcomeCertificationSummaryCards: [
      { label: 'Certified Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Partial Ready', value: partialReadyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Not Started', value: notStartedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,

    approvalRequestPacketReviewOutcomeCertificationReadinessItemCount: approvalRequestPacketReviewOutcomeCertificationReadinessItems.length,
    approvalRequestPacketReferenceReviewOutcomeCertificationItemCount: approvalRequestPacketReferenceReviewOutcomeCertificationItems.length,
    finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItemCount: finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItems.length,
    finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItemCount: finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItems.length,
    finalApprovalGrantRequestScopeReviewOutcomeCertificationItemCount: finalApprovalGrantRequestScopeReviewOutcomeCertificationItems.length,
    deploymentApprovalRequestScopeReviewOutcomeCertificationItemCount: deploymentApprovalRequestScopeReviewOutcomeCertificationItems.length,
    deploymentExecutionRequestScopeReviewOutcomeCertificationItemCount: deploymentExecutionRequestScopeReviewOutcomeCertificationItems.length,
    operatingTransitionRequestScopeReviewOutcomeCertificationItemCount: operatingTransitionRequestScopeReviewOutcomeCertificationItems.length,
    infrastructureRequestBoundaryReviewOutcomeCertificationItemCount: infrastructureRequestBoundaryReviewOutcomeCertificationItems.length,
    domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItemCount: domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItems.length,
    operatingDbRequestBoundaryReviewOutcomeCertificationItemCount: operatingDbRequestBoundaryReviewOutcomeCertificationItems.length,
    runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItemCount: runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItems.length,
    apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItemCount: apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItems.length,
    uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItemCount: uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItems.length,

    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalApprovalRequestPacketReviewOutcomeCertificationItemCount: outcomeCertificationItems.length,

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
    approvalRequestReviewOutcomeCertificationStillNotSubmitted: true,
    reviewOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertification: true,
    requiresSeparateTask372Approval: true,
    nextTaskApprovalPhrase: 'Task 372에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Packet Seal Review 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 371 운영 배포 최종 승인 제출 Approval Request Packet Review 결과 인증을 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
