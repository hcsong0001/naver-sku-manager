import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-seal-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationCategory =
  | 'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_READINESS'
  | 'APPROVAL_REQUEST_PACKET_SEAL_REVIEW_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_SEAL_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  | 'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  | 'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  | 'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceSealReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceSealReviewStatus: string;
  outcomeCertificationStatus: 'SEAL_OUTCOME_CERTIFIED' | 'SEAL_OUTCOME_CERTIFICATION_FAILED' | 'SEAL_OUTCOME_CERTIFICATION_NOT_STARTED';
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

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView {
  taskId: 373;
  taskName: string;

  sourceSealReviewStatus: string;
  sourceRecommendedSealReviewDecision: string;
  sourceRecommendedSealReviewDecisionLabel: string;
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

  operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus;

  approvalRequestPacketSealOutcomeCertificationStarted: boolean;
  approvalRequestPacketSealOutcomeCertificationStillReadOnly: boolean;
  approvalRequestPacketSealOutcomeCertificationStillLocked: boolean;
  approvalRequestPacketSealOutcomeCertified: boolean;

  recommendedOutcomeCertificationDecision: string;
  recommendedOutcomeCertificationDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  approvalRequestPacketSealOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  approvalRequestPacketSealReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  finalApprovalGrantRequestScopeSealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  deploymentApprovalRequestScopeSealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  deploymentExecutionRequestScopeSealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  operatingTransitionRequestScopeSealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  infrastructureRequestBoundarySealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  domainDnsHttpsRequestBoundarySealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  operatingDbRequestBoundarySealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];

  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[];

  approvalRequestPacketSealOutcomeCertificationReadinessItemCount: number;
  approvalRequestPacketSealReviewOutcomeCertificationItemCount: number;
  approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItemCount: number;
  finalApprovalSubmissionRequestScopeSealOutcomeCertificationItemCount: number;
  finalApprovalGrantRequestScopeSealOutcomeCertificationItemCount: number;
  deploymentApprovalRequestScopeSealOutcomeCertificationItemCount: number;
  deploymentExecutionRequestScopeSealOutcomeCertificationItemCount: number;
  operatingTransitionRequestScopeSealOutcomeCertificationItemCount: number;
  infrastructureRequestBoundarySealOutcomeCertificationItemCount: number;
  domainDnsHttpsRequestBoundarySealOutcomeCertificationItemCount: number;
  operatingDbRequestBoundarySealOutcomeCertificationItemCount: number;
  runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItemCount: number;
  apiSecretRawResponseRequestBoundarySealOutcomeCertificationItemCount: number;
  uiActionPostSubmitRequestBoundarySealOutcomeCertificationItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestPacketSealOutcomeCertificationItemCount: number;

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
  sealOutcomeCertificationStillNotSubmitted: boolean;
  sealOutcomeCertificationNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertification: boolean;
  requiresSeparateTask374Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED',
};

function mapSealReviewItemsToOutcomeCertification(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationItem[] {
  return items.map((item) => {
    let certStatus: 'SEAL_OUTCOME_CERTIFIED' | 'SEAL_OUTCOME_CERTIFICATION_FAILED' | 'SEAL_OUTCOME_CERTIFICATION_NOT_STARTED';
    if (item.sealReviewStatus === 'SEAL_REVIEW_PASSED') {
      certStatus = 'SEAL_OUTCOME_CERTIFIED';
    } else if (item.sealReviewStatus === 'SEAL_REVIEW_BLOCKED') {
      certStatus = 'SEAL_OUTCOME_CERTIFICATION_FAILED';
    } else {
      certStatus = 'SEAL_OUTCOME_CERTIFICATION_NOT_STARTED';
    }

    return {
      outcomeCertificationItemId: `seal-outcome-cert-${item.sealReviewItemId}`,
      sourceSealReviewItemId: item.sealReviewItemId,
      category,
      label: `${item.label} Outcome Certification`,
      description: `[Seal 결과 인증] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceSealReviewStatus: item.sealReviewStatus,
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

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
  sealReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView {
  const outcomeCertificationStatus = STATUS_MAP[
    sealReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus
  ];

  const approvalRequestPacketSealOutcomeCertificationReadinessItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.approvalRequestPacketSealReviewReadinessItems,
    'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_READINESS'
  );
  const approvalRequestPacketSealReviewOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.approvalRequestPacketReviewOutcomeCertificationSealReviewItems,
    'APPROVAL_REQUEST_PACKET_SEAL_REVIEW_OUTCOME_CERTIFICATION'
  );
  const approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.finalReviewOutcomeCertificationReferenceSealReviewItems,
    'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_SEAL_OUTCOME_CERTIFICATION'
  );
  const finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.finalApprovalSubmissionRequestScopeSealReviewItems,
    'FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  );
  const finalApprovalGrantRequestScopeSealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.finalApprovalGrantRequestScopeSealReviewItems,
    'FINAL_APPROVAL_GRANT_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  );
  const deploymentApprovalRequestScopeSealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.deploymentApprovalRequestScopeSealReviewItems,
    'DEPLOYMENT_APPROVAL_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  );
  const deploymentExecutionRequestScopeSealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.deploymentExecutionRequestScopeSealReviewItems,
    'DEPLOYMENT_EXECUTION_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  );
  const operatingTransitionRequestScopeSealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.operatingTransitionRequestScopeSealReviewItems,
    'OPERATING_TRANSITION_REQUEST_SCOPE_SEAL_OUTCOME_CERTIFICATION'
  );
  const infrastructureRequestBoundarySealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.infrastructureRequestBoundarySealReviewItems,
    'INFRASTRUCTURE_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  );
  const domainDnsHttpsRequestBoundarySealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.domainDnsHttpsRequestBoundarySealReviewItems,
    'DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  );
  const operatingDbRequestBoundarySealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.operatingDbRequestBoundarySealReviewItems,
    'OPERATING_DB_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  );
  const runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.runtimeWorkerQueueAdapterRequestBoundarySealReviewItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  );
  const apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.apiSecretRawResponseRequestBoundarySealReviewItems,
    'API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  );
  const uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems = mapSealReviewItemsToOutcomeCertification(
    sealReviewView.uiActionPostSubmitRequestBoundarySealReviewItems,
    'UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_SEAL_OUTCOME_CERTIFICATION'
  );

  const outcomeCertificationItems = [
    ...approvalRequestPacketSealOutcomeCertificationReadinessItems,
    ...approvalRequestPacketSealReviewOutcomeCertificationItems,
    ...approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems,
    ...finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems,
    ...finalApprovalGrantRequestScopeSealOutcomeCertificationItems,
    ...deploymentApprovalRequestScopeSealOutcomeCertificationItems,
    ...deploymentExecutionRequestScopeSealOutcomeCertificationItems,
    ...operatingTransitionRequestScopeSealOutcomeCertificationItems,
    ...infrastructureRequestBoundarySealOutcomeCertificationItems,
    ...domainDnsHttpsRequestBoundarySealOutcomeCertificationItems,
    ...operatingDbRequestBoundarySealOutcomeCertificationItems,
    ...runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems,
    ...apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems,
    ...uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isPartialReady);
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isBlocked);
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isNotStarted);

  return {
    taskId: 373,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Seal Outcome Certification',

    sourceSealReviewStatus: sealReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
    sourceRecommendedSealReviewDecision: sealReviewView.recommendedSealReviewDecision,
    sourceRecommendedSealReviewDecisionLabel: sealReviewView.recommendedSealReviewDecisionLabel,
    sourcePacketStatus: sealReviewView.sourcePacketStatus,
    sourceOutcomeCertifiedGoNoGoDecision: sealReviewView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: sealReviewView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: sealReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: sealReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: sealReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: sealReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: sealReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: sealReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: sealReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: sealReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus: outcomeCertificationStatus,

    approvalRequestPacketSealOutcomeCertificationStarted: true,
    approvalRequestPacketSealOutcomeCertificationStillReadOnly: true,
    approvalRequestPacketSealOutcomeCertificationStillLocked: true,
    approvalRequestPacketSealOutcomeCertified: true,

    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Packet Seal 결과 인증 - read-only 인증 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    outcomeCertificationItems,
    approvalRequestPacketSealOutcomeCertificationReadinessItems,
    approvalRequestPacketSealReviewOutcomeCertificationItems,
    approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems,
    finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems,
    finalApprovalGrantRequestScopeSealOutcomeCertificationItems,
    deploymentApprovalRequestScopeSealOutcomeCertificationItems,
    deploymentExecutionRequestScopeSealOutcomeCertificationItems,
    operatingTransitionRequestScopeSealOutcomeCertificationItems,
    infrastructureRequestBoundarySealOutcomeCertificationItems,
    domainDnsHttpsRequestBoundarySealOutcomeCertificationItems,
    operatingDbRequestBoundarySealOutcomeCertificationItems,
    runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems,
    apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems,
    uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems,

    outcomeCertificationSummaryCards: [
      { label: 'Seal Certified Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Partial Ready', value: partialReadyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Not Started', value: notStartedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,

    approvalRequestPacketSealOutcomeCertificationReadinessItemCount: approvalRequestPacketSealOutcomeCertificationReadinessItems.length,
    approvalRequestPacketSealReviewOutcomeCertificationItemCount: approvalRequestPacketSealReviewOutcomeCertificationItems.length,
    approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItemCount: approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems.length,
    finalApprovalSubmissionRequestScopeSealOutcomeCertificationItemCount: finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems.length,
    finalApprovalGrantRequestScopeSealOutcomeCertificationItemCount: finalApprovalGrantRequestScopeSealOutcomeCertificationItems.length,
    deploymentApprovalRequestScopeSealOutcomeCertificationItemCount: deploymentApprovalRequestScopeSealOutcomeCertificationItems.length,
    deploymentExecutionRequestScopeSealOutcomeCertificationItemCount: deploymentExecutionRequestScopeSealOutcomeCertificationItems.length,
    operatingTransitionRequestScopeSealOutcomeCertificationItemCount: operatingTransitionRequestScopeSealOutcomeCertificationItems.length,
    infrastructureRequestBoundarySealOutcomeCertificationItemCount: infrastructureRequestBoundarySealOutcomeCertificationItems.length,
    domainDnsHttpsRequestBoundarySealOutcomeCertificationItemCount: domainDnsHttpsRequestBoundarySealOutcomeCertificationItems.length,
    operatingDbRequestBoundarySealOutcomeCertificationItemCount: operatingDbRequestBoundarySealOutcomeCertificationItems.length,
    runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItemCount: runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems.length,
    apiSecretRawResponseRequestBoundarySealOutcomeCertificationItemCount: apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems.length,
    uiActionPostSubmitRequestBoundarySealOutcomeCertificationItemCount: uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems.length,

    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalApprovalRequestPacketSealOutcomeCertificationItemCount: outcomeCertificationItems.length,

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
    sealOutcomeCertificationStillNotSubmitted: true,
    sealOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertification: true,
    requiresSeparateTask374Approval: true,
    nextTaskApprovalPhrase: 'Task 374에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Packet Final Review 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 373 운영 배포 최종 승인 제출 Approval Request Packet Seal 결과 인증을 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
