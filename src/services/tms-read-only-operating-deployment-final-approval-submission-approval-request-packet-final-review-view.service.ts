import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-seal-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewCategory =
  | 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READINESS'
  | 'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_FINAL_REVIEW'
  | 'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_FINAL_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_FINAL_REVIEW'
  | 'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_FINAL_REVIEW'
  | 'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_FINAL_REVIEW'
  | 'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_FINAL_REVIEW'
  | 'OPERATING_TRANSITION_REQUEST_SCOPE_FINAL_REVIEW'
  | 'INFRASTRUCTURE_REQUEST_BOUNDARY_FINAL_REVIEW'
  | 'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_FINAL_REVIEW'
  | 'OPERATING_DB_REQUEST_BOUNDARY_FINAL_REVIEW'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_FINAL_REVIEW'
  | 'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_FINAL_REVIEW'
  | 'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_FINAL_REVIEW';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem {
  finalReviewItemId: string;
  sourceSealOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceSealOutcomeCertificationStatus: string;
  finalReviewStatus: 'FINAL_REVIEW_PASSED' | 'FINAL_REVIEW_BLOCKED' | 'FINAL_REVIEW_NOT_STARTED';
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

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView {
  taskId: 374;
  taskName: string;

  sourceSealOutcomeCertificationStatus: string;
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

  operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus;

  approvalRequestPacketFinalReviewStarted: boolean;
  approvalRequestPacketFinalReviewStillReadOnly: boolean;
  approvalRequestPacketFinalReviewStillLocked: boolean;
  approvalRequestPacketFinalReviewCompleted: boolean;

  recommendedFinalReviewDecision: string;
  recommendedFinalReviewDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  finalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  approvalRequestPacketFinalReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  approvalRequestPacketSealOutcomeCertificationFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  finalApprovalSubmissionRequestScopeFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  finalApprovalGrantRequestScopeFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  deploymentApprovalRequestScopeFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  deploymentExecutionRequestScopeFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  operatingTransitionRequestScopeFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  infrastructureRequestBoundaryFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  domainDnsHttpsRequestBoundaryFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  operatingDbRequestBoundaryFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  apiSecretRawResponseRequestBoundaryFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  uiActionPostSubmitRequestBoundaryFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];

  finalReviewSummaryCards: { label: string; value: number }[];
  readyFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  partialReadyFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  blockedFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];
  notStartedFinalReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[];

  approvalRequestPacketFinalReviewReadinessItemCount: number;
  approvalRequestPacketSealOutcomeCertificationFinalReviewItemCount: number;
  approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItemCount: number;
  finalApprovalSubmissionRequestScopeFinalReviewItemCount: number;
  finalApprovalGrantRequestScopeFinalReviewItemCount: number;
  deploymentApprovalRequestScopeFinalReviewItemCount: number;
  deploymentExecutionRequestScopeFinalReviewItemCount: number;
  operatingTransitionRequestScopeFinalReviewItemCount: number;
  infrastructureRequestBoundaryFinalReviewItemCount: number;
  domainDnsHttpsRequestBoundaryFinalReviewItemCount: number;
  operatingDbRequestBoundaryFinalReviewItemCount: number;
  runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItemCount: number;
  apiSecretRawResponseRequestBoundaryFinalReviewItemCount: number;
  uiActionPostSubmitRequestBoundaryFinalReviewItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestPacketFinalReviewItemCount: number;

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
  finalReviewStillNotSubmitted: boolean;
  finalReviewNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReview: boolean;
  requiresSeparateTask375Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED',
};

function mapSealOutcomeCertificationItemsToFinalReview(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[] {
  return items.map((item) => {
    let reviewStatus: 'FINAL_REVIEW_PASSED' | 'FINAL_REVIEW_BLOCKED' | 'FINAL_REVIEW_NOT_STARTED';
    if (item.outcomeCertificationStatus === 'SEAL_OUTCOME_CERTIFIED') {
      reviewStatus = 'FINAL_REVIEW_PASSED';
    } else if (item.outcomeCertificationStatus === 'SEAL_OUTCOME_CERTIFICATION_FAILED') {
      reviewStatus = 'FINAL_REVIEW_BLOCKED';
    } else {
      reviewStatus = 'FINAL_REVIEW_NOT_STARTED';
    }

    return {
      finalReviewItemId: `final-review-${item.outcomeCertificationItemId}`,
      sourceSealOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} Final Review`,
      description: `[최종 검토] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceSealOutcomeCertificationStatus: item.outcomeCertificationStatus,
      finalReviewStatus: reviewStatus,
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

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
  sealOutcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView {
  const finalReviewStatus = STATUS_MAP[
    sealOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus
  ];

  const approvalRequestPacketFinalReviewReadinessItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.approvalRequestPacketSealOutcomeCertificationReadinessItems,
    'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READINESS'
  );
  const approvalRequestPacketSealOutcomeCertificationFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.approvalRequestPacketSealReviewOutcomeCertificationItems,
    'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_FINAL_REVIEW'
  );
  const approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems,
    'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_FINAL_REVIEW'
  );
  const finalApprovalSubmissionRequestScopeFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_FINAL_REVIEW'
  );
  const finalApprovalGrantRequestScopeFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.finalApprovalGrantRequestScopeSealOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_FINAL_REVIEW'
  );
  const deploymentApprovalRequestScopeFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.deploymentApprovalRequestScopeSealOutcomeCertificationItems,
    'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_FINAL_REVIEW'
  );
  const deploymentExecutionRequestScopeFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.deploymentExecutionRequestScopeSealOutcomeCertificationItems,
    'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_FINAL_REVIEW'
  );
  const operatingTransitionRequestScopeFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.operatingTransitionRequestScopeSealOutcomeCertificationItems,
    'OPERATING_TRANSITION_REQUEST_SCOPE_FINAL_REVIEW'
  );
  const infrastructureRequestBoundaryFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.infrastructureRequestBoundarySealOutcomeCertificationItems,
    'INFRASTRUCTURE_REQUEST_BOUNDARY_FINAL_REVIEW'
  );
  const domainDnsHttpsRequestBoundaryFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.domainDnsHttpsRequestBoundarySealOutcomeCertificationItems,
    'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_FINAL_REVIEW'
  );
  const operatingDbRequestBoundaryFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.operatingDbRequestBoundarySealOutcomeCertificationItems,
    'OPERATING_DB_REQUEST_BOUNDARY_FINAL_REVIEW'
  );
  const runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_FINAL_REVIEW'
  );
  const apiSecretRawResponseRequestBoundaryFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems,
    'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_FINAL_REVIEW'
  );
  const uiActionPostSubmitRequestBoundaryFinalReviewItems = mapSealOutcomeCertificationItemsToFinalReview(
    sealOutcomeCertificationView.uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems,
    'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_FINAL_REVIEW'
  );

  const finalReviewItems = [
    ...approvalRequestPacketFinalReviewReadinessItems,
    ...approvalRequestPacketSealOutcomeCertificationFinalReviewItems,
    ...approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems,
    ...finalApprovalSubmissionRequestScopeFinalReviewItems,
    ...finalApprovalGrantRequestScopeFinalReviewItems,
    ...deploymentApprovalRequestScopeFinalReviewItems,
    ...deploymentExecutionRequestScopeFinalReviewItems,
    ...operatingTransitionRequestScopeFinalReviewItems,
    ...infrastructureRequestBoundaryFinalReviewItems,
    ...domainDnsHttpsRequestBoundaryFinalReviewItems,
    ...operatingDbRequestBoundaryFinalReviewItems,
    ...runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems,
    ...apiSecretRawResponseRequestBoundaryFinalReviewItems,
    ...uiActionPostSubmitRequestBoundaryFinalReviewItems,
  ];

  const readyFinalReviewItems = finalReviewItems.filter((i) => i.isReady);
  const partialReadyFinalReviewItems = finalReviewItems.filter((i) => i.isPartialReady);
  const blockedFinalReviewItems = finalReviewItems.filter((i) => i.isBlocked);
  const notStartedFinalReviewItems = finalReviewItems.filter((i) => i.isNotStarted);

  return {
    taskId: 374,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Final Review',

    sourceSealOutcomeCertificationStatus: sealOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
    sourceRecommendedOutcomeCertificationDecision: sealOutcomeCertificationView.recommendedOutcomeCertificationDecision,
    sourceRecommendedOutcomeCertificationDecisionLabel: sealOutcomeCertificationView.recommendedOutcomeCertificationDecisionLabel,
    sourcePacketStatus: sealOutcomeCertificationView.sourcePacketStatus,
    sourceOutcomeCertifiedGoNoGoDecision: sealOutcomeCertificationView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: sealOutcomeCertificationView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: sealOutcomeCertificationView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus: finalReviewStatus,

    approvalRequestPacketFinalReviewStarted: true,
    approvalRequestPacketFinalReviewStillReadOnly: true,
    approvalRequestPacketFinalReviewStillLocked: true,
    approvalRequestPacketFinalReviewCompleted: true,

    recommendedFinalReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY',
    recommendedFinalReviewDecisionLabel: '최종 승인 제출 Approval Request Packet Final Review - read-only 최종 검토 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    finalReviewItems,
    approvalRequestPacketFinalReviewReadinessItems,
    approvalRequestPacketSealOutcomeCertificationFinalReviewItems,
    approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems,
    finalApprovalSubmissionRequestScopeFinalReviewItems,
    finalApprovalGrantRequestScopeFinalReviewItems,
    deploymentApprovalRequestScopeFinalReviewItems,
    deploymentExecutionRequestScopeFinalReviewItems,
    operatingTransitionRequestScopeFinalReviewItems,
    infrastructureRequestBoundaryFinalReviewItems,
    domainDnsHttpsRequestBoundaryFinalReviewItems,
    operatingDbRequestBoundaryFinalReviewItems,
    runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems,
    apiSecretRawResponseRequestBoundaryFinalReviewItems,
    uiActionPostSubmitRequestBoundaryFinalReviewItems,

    finalReviewSummaryCards: [
      { label: 'Final Review Ready', value: readyFinalReviewItems.length },
      { label: 'Partial Ready', value: partialReadyFinalReviewItems.length },
      { label: 'Blocked', value: blockedFinalReviewItems.length },
      { label: 'Not Started', value: notStartedFinalReviewItems.length },
      { label: 'Total', value: finalReviewItems.length },
    ],
    readyFinalReviewItems,
    partialReadyFinalReviewItems,
    blockedFinalReviewItems,
    notStartedFinalReviewItems,

    approvalRequestPacketFinalReviewReadinessItemCount: approvalRequestPacketFinalReviewReadinessItems.length,
    approvalRequestPacketSealOutcomeCertificationFinalReviewItemCount: approvalRequestPacketSealOutcomeCertificationFinalReviewItems.length,
    approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItemCount: approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems.length,
    finalApprovalSubmissionRequestScopeFinalReviewItemCount: finalApprovalSubmissionRequestScopeFinalReviewItems.length,
    finalApprovalGrantRequestScopeFinalReviewItemCount: finalApprovalGrantRequestScopeFinalReviewItems.length,
    deploymentApprovalRequestScopeFinalReviewItemCount: deploymentApprovalRequestScopeFinalReviewItems.length,
    deploymentExecutionRequestScopeFinalReviewItemCount: deploymentExecutionRequestScopeFinalReviewItems.length,
    operatingTransitionRequestScopeFinalReviewItemCount: operatingTransitionRequestScopeFinalReviewItems.length,
    infrastructureRequestBoundaryFinalReviewItemCount: infrastructureRequestBoundaryFinalReviewItems.length,
    domainDnsHttpsRequestBoundaryFinalReviewItemCount: domainDnsHttpsRequestBoundaryFinalReviewItems.length,
    operatingDbRequestBoundaryFinalReviewItemCount: operatingDbRequestBoundaryFinalReviewItems.length,
    runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItemCount: runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems.length,
    apiSecretRawResponseRequestBoundaryFinalReviewItemCount: apiSecretRawResponseRequestBoundaryFinalReviewItems.length,
    uiActionPostSubmitRequestBoundaryFinalReviewItemCount: uiActionPostSubmitRequestBoundaryFinalReviewItems.length,

    readyItemCount: readyFinalReviewItems.length,
    partialReadyItemCount: partialReadyFinalReviewItems.length,
    blockedItemCount: blockedFinalReviewItems.length,
    notStartedItemCount: notStartedFinalReviewItems.length,
    totalApprovalRequestPacketFinalReviewItemCount: finalReviewItems.length,

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
    finalReviewStillNotSubmitted: true,
    finalReviewNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReview: true,
    requiresSeparateTask375Approval: true,
    nextTaskApprovalPhrase: 'Task 375에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Packet Final Review 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 374 운영 배포 최종 승인 제출 Approval Request Packet Final Review를 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
