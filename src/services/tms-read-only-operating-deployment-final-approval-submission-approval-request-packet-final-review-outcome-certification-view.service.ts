import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-final-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationCategory =
  | 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_READINESS'
  | 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_REFERENCE_FINAL_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  | 'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  | 'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  | 'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceFinalReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceFinalReviewStatus: string;
  outcomeCertificationStatus: 'FINAL_REVIEW_OUTCOME_CERTIFIED' | 'FINAL_REVIEW_OUTCOME_CERTIFICATION_FAILED' | 'FINAL_REVIEW_OUTCOME_CERTIFICATION_NOT_STARTED';
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

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView {
  taskId: 375;
  taskName: string;

  sourceFinalReviewStatus: string;
  sourceRecommendedFinalReviewDecision: string;
  sourceRecommendedFinalReviewDecisionLabel: string;
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

  operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus;

  approvalRequestPacketFinalReviewOutcomeCertificationStarted: boolean;
  approvalRequestPacketFinalReviewOutcomeCertificationStillReadOnly: boolean;
  approvalRequestPacketFinalReviewOutcomeCertificationStillLocked: boolean;
  approvalRequestPacketFinalReviewOutcomeCertified: boolean;

  recommendedOutcomeCertificationDecision: string;
  recommendedOutcomeCertificationDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  approvalRequestPacketFinalReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  finalApprovalGrantRequestScopeFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  deploymentApprovalRequestScopeFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  deploymentExecutionRequestScopeFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  operatingTransitionRequestScopeFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  infrastructureRequestBoundaryFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  operatingDbRequestBoundaryFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];

  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[];

  approvalRequestPacketFinalReviewOutcomeCertificationReadinessItemCount: number;
  approvalRequestPacketFinalReviewOutcomeCertificationItemCount: number;
  approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItemCount: number;
  finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItemCount: number;
  finalApprovalGrantRequestScopeFinalOutcomeCertificationItemCount: number;
  deploymentApprovalRequestScopeFinalOutcomeCertificationItemCount: number;
  deploymentExecutionRequestScopeFinalOutcomeCertificationItemCount: number;
  operatingTransitionRequestScopeFinalOutcomeCertificationItemCount: number;
  infrastructureRequestBoundaryFinalOutcomeCertificationItemCount: number;
  domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItemCount: number;
  operatingDbRequestBoundaryFinalOutcomeCertificationItemCount: number;
  runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItemCount: number;
  apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItemCount: number;
  uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestPacketFinalReviewOutcomeCertificationItemCount: number;

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
  finalReviewOutcomeCertificationStillNotSubmitted: boolean;
  finalReviewOutcomeCertificationNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertification: boolean;
  requiresSeparateTask376Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_NOT_STARTED',
};

function mapFinalReviewItemsToOutcomeCertification(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationItem[] {
  return items.map((item) => {
    let certStatus: 'FINAL_REVIEW_OUTCOME_CERTIFIED' | 'FINAL_REVIEW_OUTCOME_CERTIFICATION_FAILED' | 'FINAL_REVIEW_OUTCOME_CERTIFICATION_NOT_STARTED';
    if (item.finalReviewStatus === 'FINAL_REVIEW_PASSED') {
      certStatus = 'FINAL_REVIEW_OUTCOME_CERTIFIED';
    } else if (item.finalReviewStatus === 'FINAL_REVIEW_BLOCKED') {
      certStatus = 'FINAL_REVIEW_OUTCOME_CERTIFICATION_FAILED';
    } else {
      certStatus = 'FINAL_REVIEW_OUTCOME_CERTIFICATION_NOT_STARTED';
    }

    return {
      outcomeCertificationItemId: `final-review-outcome-cert-${item.finalReviewItemId}`,
      sourceFinalReviewItemId: item.finalReviewItemId,
      category,
      label: `${item.label} Outcome Certification`,
      description: `[Final Review 결과 인증] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceFinalReviewStatus: item.finalReviewStatus,
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

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
  finalReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView {
  const outcomeCertificationStatus = STATUS_MAP[
    finalReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus
  ];

  const approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.approvalRequestPacketFinalReviewReadinessItems,
    'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_READINESS'
  );
  const approvalRequestPacketFinalReviewOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.approvalRequestPacketSealOutcomeCertificationFinalReviewItems,
    'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION'
  );
  const approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems,
    'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_REFERENCE_FINAL_OUTCOME_CERTIFICATION'
  );
  const finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.finalApprovalSubmissionRequestScopeFinalReviewItems,
    'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  );
  const finalApprovalGrantRequestScopeFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.finalApprovalGrantRequestScopeFinalReviewItems,
    'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  );
  const deploymentApprovalRequestScopeFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.deploymentApprovalRequestScopeFinalReviewItems,
    'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  );
  const deploymentExecutionRequestScopeFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.deploymentExecutionRequestScopeFinalReviewItems,
    'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  );
  const operatingTransitionRequestScopeFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.operatingTransitionRequestScopeFinalReviewItems,
    'OPERATING_TRANSITION_REQUEST_SCOPE_FINAL_OUTCOME_CERTIFICATION'
  );
  const infrastructureRequestBoundaryFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.infrastructureRequestBoundaryFinalReviewItems,
    'INFRASTRUCTURE_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  );
  const domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.domainDnsHttpsRequestBoundaryFinalReviewItems,
    'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  );
  const operatingDbRequestBoundaryFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.operatingDbRequestBoundaryFinalReviewItems,
    'OPERATING_DB_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  );
  const runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  );
  const apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.apiSecretRawResponseRequestBoundaryFinalReviewItems,
    'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  );
  const uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems = mapFinalReviewItemsToOutcomeCertification(
    finalReviewView.uiActionPostSubmitRequestBoundaryFinalReviewItems,
    'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_FINAL_OUTCOME_CERTIFICATION'
  );

  const outcomeCertificationItems = [
    ...approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems,
    ...approvalRequestPacketFinalReviewOutcomeCertificationItems,
    ...approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems,
    ...finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems,
    ...finalApprovalGrantRequestScopeFinalOutcomeCertificationItems,
    ...deploymentApprovalRequestScopeFinalOutcomeCertificationItems,
    ...deploymentExecutionRequestScopeFinalOutcomeCertificationItems,
    ...operatingTransitionRequestScopeFinalOutcomeCertificationItems,
    ...infrastructureRequestBoundaryFinalOutcomeCertificationItems,
    ...domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems,
    ...operatingDbRequestBoundaryFinalOutcomeCertificationItems,
    ...runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems,
    ...apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems,
    ...uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isPartialReady);
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isBlocked);
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isNotStarted);

  return {
    taskId: 375,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Final Review Outcome Certification',

    sourceFinalReviewStatus: finalReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
    sourceRecommendedFinalReviewDecision: finalReviewView.recommendedFinalReviewDecision,
    sourceRecommendedFinalReviewDecisionLabel: finalReviewView.recommendedFinalReviewDecisionLabel,
    sourcePacketStatus: finalReviewView.sourcePacketStatus,
    sourceOutcomeCertifiedGoNoGoDecision: finalReviewView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: finalReviewView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: finalReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: finalReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: finalReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: finalReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: finalReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: finalReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: finalReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: finalReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus: outcomeCertificationStatus,

    approvalRequestPacketFinalReviewOutcomeCertificationStarted: true,
    approvalRequestPacketFinalReviewOutcomeCertificationStillReadOnly: true,
    approvalRequestPacketFinalReviewOutcomeCertificationStillLocked: true,
    approvalRequestPacketFinalReviewOutcomeCertified: true,

    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Packet Final Review 결과 인증 - read-only 인증 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    outcomeCertificationItems,
    approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems,
    approvalRequestPacketFinalReviewOutcomeCertificationItems,
    approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems,
    finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems,
    finalApprovalGrantRequestScopeFinalOutcomeCertificationItems,
    deploymentApprovalRequestScopeFinalOutcomeCertificationItems,
    deploymentExecutionRequestScopeFinalOutcomeCertificationItems,
    operatingTransitionRequestScopeFinalOutcomeCertificationItems,
    infrastructureRequestBoundaryFinalOutcomeCertificationItems,
    domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems,
    operatingDbRequestBoundaryFinalOutcomeCertificationItems,
    runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems,
    apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems,
    uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems,

    outcomeCertificationSummaryCards: [
      { label: 'Final Review Outcome Certified Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Partial Ready', value: partialReadyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Not Started', value: notStartedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,

    approvalRequestPacketFinalReviewOutcomeCertificationReadinessItemCount: approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems.length,
    approvalRequestPacketFinalReviewOutcomeCertificationItemCount: approvalRequestPacketFinalReviewOutcomeCertificationItems.length,
    approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItemCount: approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems.length,
    finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItemCount: finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems.length,
    finalApprovalGrantRequestScopeFinalOutcomeCertificationItemCount: finalApprovalGrantRequestScopeFinalOutcomeCertificationItems.length,
    deploymentApprovalRequestScopeFinalOutcomeCertificationItemCount: deploymentApprovalRequestScopeFinalOutcomeCertificationItems.length,
    deploymentExecutionRequestScopeFinalOutcomeCertificationItemCount: deploymentExecutionRequestScopeFinalOutcomeCertificationItems.length,
    operatingTransitionRequestScopeFinalOutcomeCertificationItemCount: operatingTransitionRequestScopeFinalOutcomeCertificationItems.length,
    infrastructureRequestBoundaryFinalOutcomeCertificationItemCount: infrastructureRequestBoundaryFinalOutcomeCertificationItems.length,
    domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItemCount: domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems.length,
    operatingDbRequestBoundaryFinalOutcomeCertificationItemCount: operatingDbRequestBoundaryFinalOutcomeCertificationItems.length,
    runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItemCount: runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems.length,
    apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItemCount: apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems.length,
    uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItemCount: uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems.length,

    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalApprovalRequestPacketFinalReviewOutcomeCertificationItemCount: outcomeCertificationItems.length,

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
    finalReviewOutcomeCertificationStillNotSubmitted: true,
    finalReviewOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertification: true,
    requiresSeparateTask376Approval: true,
    nextTaskApprovalPhrase: 'Task 376에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Submission Readiness Review 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 375 운영 배포 최종 승인 제출 Approval Request Packet Final Review 결과 인증을 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
