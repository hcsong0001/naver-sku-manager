import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-readiness-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationCategory =
  | 'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_READINESS'
  | 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE'
  | 'APPROVAL_REQUEST_SUBMISSION_SCOPE_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_SCOPE_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_SCOPE_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_SCOPE_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_SCOPE_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_SCOPE_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'DOMAIN_DNS_HTTPS_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'API_SECRET_RAW_RESPONSE_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'UI_ACTION_POST_SUBMIT_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceReadinessReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: number;
  sourceStatus: string;
  sourceReadinessReviewStatus: string;
  outcomeCertificationStatus: 'SUBMISSION_READINESS_OUTCOME_CERTIFIED' | 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_FAILED' | 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_NOT_STARTED';
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

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView {
  taskId: 377;
  taskName: string;

  sourceSubmissionReadinessReviewStatus: string;
  sourceRecommendedSubmissionReadinessReviewDecision: string;
  sourceRecommendedSubmissionReadinessReviewDecisionLabel: string;
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

  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus;

  approvalRequestSubmissionReadinessOutcomeCertificationStarted: boolean;
  approvalRequestSubmissionReadinessOutcomeCertificationStillReadOnly: boolean;
  approvalRequestSubmissionReadinessOutcomeCertificationStillLocked: boolean;
  approvalRequestSubmissionReadinessOutcomeCertified: boolean;

  recommendedOutcomeCertificationDecision: string;
  recommendedOutcomeCertificationDecisionLabel: string;

  recommendedNextStep: string;
  recommendedApprovalMode: string;
  recommendedExecutionMode: string;
  recommendedDeploymentMode: string;
  recommendedSafetyMode: string;

  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  approvalRequestSubmissionScopeOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  finalApprovalSubmissionScopeOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  finalApprovalGrantScopeOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  deploymentApprovalScopeOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  deploymentExecutionScopeOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  operatingTransitionScopeOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  infrastructureSubmissionBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  operatingDbSubmissionBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];

  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[];

  approvalRequestSubmissionReadinessOutcomeCertificationReadinessItemCount: number;
  approvalRequestPacketFinalReviewOutcomeCertificationReferenceItemCount: number;
  approvalRequestSubmissionScopeOutcomeCertificationItemCount: number;
  finalApprovalSubmissionScopeOutcomeCertificationItemCount: number;
  finalApprovalGrantScopeOutcomeCertificationItemCount: number;
  deploymentApprovalScopeOutcomeCertificationItemCount: number;
  deploymentExecutionScopeOutcomeCertificationItemCount: number;
  operatingTransitionScopeOutcomeCertificationItemCount: number;
  infrastructureSubmissionBoundaryOutcomeCertificationItemCount: number;
  domainDnsHttpsSubmissionBoundaryOutcomeCertificationItemCount: number;
  operatingDbSubmissionBoundaryOutcomeCertificationItemCount: number;
  runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItemCount: number;
  apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItemCount: number;
  uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItemCount: number;

  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalRequestSubmissionReadinessOutcomeCertificationItemCount: number;

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
  submissionReadinessOutcomeCertificationNotInterpretedAsSubmission: boolean;
  finalApprovalStillReadOnly: boolean;
  finalApprovalStillBlocked: boolean;
  deploymentApprovalStillBlocked: boolean;
  deploymentExecutionStillBlocked: boolean;
  apiCallStillBlocked: boolean;
  dbWriteStillBlocked: boolean;
  tokenOrAuthStillHidden: boolean;
  rawApiResponseStillHidden: boolean;

  isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertification: boolean;
  requiresSeparateTask378Approval: boolean;
  nextTaskApprovalPhrase: string;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_NOT_STARTED',
};

function mapReadinessReviewItemsToOutcomeCertification(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationCategory
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationItem[] {
  return items.map((item) => {
    let certStatus: 'SUBMISSION_READINESS_OUTCOME_CERTIFIED' | 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_FAILED' | 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_NOT_STARTED';
    if (item.readinessReviewStatus === 'SUBMISSION_READINESS_REVIEW_PASSED') {
      certStatus = 'SUBMISSION_READINESS_OUTCOME_CERTIFIED';
    } else if (item.readinessReviewStatus === 'SUBMISSION_READINESS_REVIEW_BLOCKED') {
      certStatus = 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_FAILED';
    } else {
      certStatus = 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_NOT_STARTED';
    }

    return {
      outcomeCertificationItemId: `submission-readiness-outcome-cert-${item.readinessReviewItemId}`,
      sourceReadinessReviewItemId: item.readinessReviewItemId,
      category,
      label: `${item.label} Outcome Certification`,
      description: `[제출 준비 결과 인증] ${item.description}`,
      sourceTaskId: item.sourceTaskId,
      sourceStatus: item.sourceStatus,
      sourceReadinessReviewStatus: item.readinessReviewStatus,
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

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
  readinessReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView {
  const outcomeCertificationStatus = STATUS_MAP[
    readinessReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus
  ];

  const approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.approvalRequestSubmissionReadinessReviewReadinessItems,
    'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_READINESS'
  );
  const approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems,
    'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE'
  );
  const approvalRequestSubmissionScopeOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.approvalRequestSubmissionScopeReadinessReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_SCOPE_OUTCOME_CERTIFICATION'
  );
  const finalApprovalSubmissionScopeOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.finalApprovalSubmissionScopeReadinessReviewItems,
    'FINAL_APPROVAL_SUBMISSION_SCOPE_OUTCOME_CERTIFICATION'
  );
  const finalApprovalGrantScopeOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.finalApprovalGrantScopeReadinessReviewItems,
    'FINAL_APPROVAL_GRANT_SCOPE_OUTCOME_CERTIFICATION'
  );
  const deploymentApprovalScopeOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.deploymentApprovalScopeReadinessReviewItems,
    'DEPLOYMENT_APPROVAL_SCOPE_OUTCOME_CERTIFICATION'
  );
  const deploymentExecutionScopeOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.deploymentExecutionScopeReadinessReviewItems,
    'DEPLOYMENT_EXECUTION_SCOPE_OUTCOME_CERTIFICATION'
  );
  const operatingTransitionScopeOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.operatingTransitionScopeReadinessReviewItems,
    'OPERATING_TRANSITION_SCOPE_OUTCOME_CERTIFICATION'
  );
  const infrastructureSubmissionBoundaryOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.infrastructureSubmissionBoundaryReviewItems,
    'INFRASTRUCTURE_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  );
  const domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.domainDnsHttpsSubmissionBoundaryReviewItems,
    'DOMAIN_DNS_HTTPS_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  );
  const operatingDbSubmissionBoundaryOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.operatingDbSubmissionBoundaryReviewItems,
    'OPERATING_DB_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  );
  const runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  );
  const apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.apiSecretRawResponseSubmissionBoundaryReviewItems,
    'API_SECRET_RAW_RESPONSE_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  );
  const uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems = mapReadinessReviewItemsToOutcomeCertification(
    readinessReviewView.uiActionPostSubmitSubmissionBoundaryReviewItems,
    'UI_ACTION_POST_SUBMIT_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  );

  const outcomeCertificationItems = [
    ...approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems,
    ...approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems,
    ...approvalRequestSubmissionScopeOutcomeCertificationItems,
    ...finalApprovalSubmissionScopeOutcomeCertificationItems,
    ...finalApprovalGrantScopeOutcomeCertificationItems,
    ...deploymentApprovalScopeOutcomeCertificationItems,
    ...deploymentExecutionScopeOutcomeCertificationItems,
    ...operatingTransitionScopeOutcomeCertificationItems,
    ...infrastructureSubmissionBoundaryOutcomeCertificationItems,
    ...domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems,
    ...operatingDbSubmissionBoundaryOutcomeCertificationItems,
    ...runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems,
    ...apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems,
    ...uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isPartialReady);
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isBlocked);
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter((i) => i.isNotStarted);

  return {
    taskId: 377,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Readiness Outcome Certification',

    sourceSubmissionReadinessReviewStatus: readinessReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
    sourceRecommendedSubmissionReadinessReviewDecision: readinessReviewView.recommendedSubmissionReadinessReviewDecision,
    sourceRecommendedSubmissionReadinessReviewDecisionLabel: readinessReviewView.recommendedSubmissionReadinessReviewDecisionLabel,
    sourcePacketStatus: readinessReviewView.sourceFinalReviewOutcomeCertificationStatus,
    sourceOutcomeCertifiedGoNoGoDecision: readinessReviewView.sourceOutcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel: readinessReviewView.sourceOutcomeCertifiedGoNoGoDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: readinessReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecision,
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: readinessReviewView.sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: readinessReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: readinessReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: readinessReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: readinessReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: readinessReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision,
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: readinessReviewView.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel,

    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus: outcomeCertificationStatus,

    approvalRequestSubmissionReadinessOutcomeCertificationStarted: true,
    approvalRequestSubmissionReadinessOutcomeCertificationStillReadOnly: true,
    approvalRequestSubmissionReadinessOutcomeCertificationStillLocked: true,
    approvalRequestSubmissionReadinessOutcomeCertified: true,

    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Submission Readiness 결과 인증 - read-only 인증 전용',

    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',

    outcomeCertificationItems,
    approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems,
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems,
    approvalRequestSubmissionScopeOutcomeCertificationItems,
    finalApprovalSubmissionScopeOutcomeCertificationItems,
    finalApprovalGrantScopeOutcomeCertificationItems,
    deploymentApprovalScopeOutcomeCertificationItems,
    deploymentExecutionScopeOutcomeCertificationItems,
    operatingTransitionScopeOutcomeCertificationItems,
    infrastructureSubmissionBoundaryOutcomeCertificationItems,
    domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems,
    operatingDbSubmissionBoundaryOutcomeCertificationItems,
    runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems,
    apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems,
    uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems,

    outcomeCertificationSummaryCards: [
      { label: 'Outcome Certified Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Partial Ready', value: partialReadyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Not Started', value: notStartedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,

    approvalRequestSubmissionReadinessOutcomeCertificationReadinessItemCount: approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems.length,
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItemCount: approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems.length,
    approvalRequestSubmissionScopeOutcomeCertificationItemCount: approvalRequestSubmissionScopeOutcomeCertificationItems.length,
    finalApprovalSubmissionScopeOutcomeCertificationItemCount: finalApprovalSubmissionScopeOutcomeCertificationItems.length,
    finalApprovalGrantScopeOutcomeCertificationItemCount: finalApprovalGrantScopeOutcomeCertificationItems.length,
    deploymentApprovalScopeOutcomeCertificationItemCount: deploymentApprovalScopeOutcomeCertificationItems.length,
    deploymentExecutionScopeOutcomeCertificationItemCount: deploymentExecutionScopeOutcomeCertificationItems.length,
    operatingTransitionScopeOutcomeCertificationItemCount: operatingTransitionScopeOutcomeCertificationItems.length,
    infrastructureSubmissionBoundaryOutcomeCertificationItemCount: infrastructureSubmissionBoundaryOutcomeCertificationItems.length,
    domainDnsHttpsSubmissionBoundaryOutcomeCertificationItemCount: domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems.length,
    operatingDbSubmissionBoundaryOutcomeCertificationItemCount: operatingDbSubmissionBoundaryOutcomeCertificationItems.length,
    runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItemCount: runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems.length,
    apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItemCount: apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems.length,
    uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItemCount: uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems.length,

    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalApprovalRequestSubmissionReadinessOutcomeCertificationItemCount: outcomeCertificationItems.length,

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
    submissionReadinessOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,

    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertification: true,
    requiresSeparateTask378Approval: true,
    nextTaskApprovalPhrase: 'Task 378에서 TMS read-only 운영 배포 최종 승인 제출 Approval Request Submission Lock Review 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 377 운영 배포 최종 승인 제출 Approval Request Submission Readiness 결과 인증을 read-only로 완료한 후 다음 단계로 진행하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요.',
  };
}
