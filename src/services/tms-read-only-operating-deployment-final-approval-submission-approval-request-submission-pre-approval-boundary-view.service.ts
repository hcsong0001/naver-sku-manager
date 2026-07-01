import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-lock-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryCategory =
  | 'SUBMISSION_PRE_APPROVAL_BOUNDARY_READINESS'
  | 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PRE_APPROVAL_BOUNDARY'
  | 'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_BOUNDARY'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_BOUNDARY'
  | 'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY'
  | 'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_BOUNDARY'
  | 'FINAL_APPROVAL_GRANT_PRE_APPROVAL_BOUNDARY'
  | 'DEPLOYMENT_APPROVAL_PRE_APPROVAL_BOUNDARY'
  | 'DEPLOYMENT_EXECUTION_PRE_APPROVAL_BOUNDARY'
  | 'OPERATING_TRANSITION_PRE_APPROVAL_BOUNDARY'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_PRE_APPROVAL_BOUNDARY'
  | 'OPERATING_DB_PRE_APPROVAL_BOUNDARY'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_PRE_APPROVAL_BOUNDARY'
  | 'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_BOUNDARY';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItemStatus =
  | 'PRE_APPROVAL_BOUNDARY_READY'
  | 'PRE_APPROVAL_BOUNDARY_PARTIAL_READY'
  | 'PRE_APPROVAL_BOUNDARY_BLOCKED'
  | 'PRE_APPROVAL_BOUNDARY_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem {
  boundaryItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItemStatus;
  boundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView {
  taskId: 384;
  taskName: string;
  sourceFinalSubmissionLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus;
  recommendedPreApprovalBoundaryDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY';
  recommendedPreApprovalBoundaryDecisionLabel: '최종 승인 제출 Approval Request Submission Pre-Approval Boundary - read-only 사전 승인 경계 표시 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  submissionPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  submissionPreApprovalBoundaryReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  approvalRequestCreationPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  approvalRequestReviewSubmissionPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  approvalRequestSubmissionPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  finalApprovalSubmissionPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  finalApprovalGrantPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  deploymentApprovalPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  deploymentExecutionPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  operatingTransitionPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  infrastructureDomainDnsHttpsPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  operatingDbPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  runtimeWorkerQueueAdapterPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  apiSecretUiActionPostPreApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  submissionPreApprovalBoundarySummaryCards: { label: string; value: number }[];
  readyBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  partialReadyBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  blockedBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  notStartedBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[];
  submissionPreApprovalBoundaryReadinessItemCount: number;
  finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItemCount: number;
  approvalRequestCreationPreApprovalBoundaryItemCount: number;
  approvalRequestReviewSubmissionPreApprovalBoundaryItemCount: number;
  approvalRequestSubmissionPreApprovalBoundaryItemCount: number;
  finalApprovalSubmissionPreApprovalBoundaryItemCount: number;
  finalApprovalGrantPreApprovalBoundaryItemCount: number;
  deploymentApprovalPreApprovalBoundaryItemCount: number;
  deploymentExecutionPreApprovalBoundaryItemCount: number;
  operatingTransitionPreApprovalBoundaryItemCount: number;
  infrastructureDomainDnsHttpsPreApprovalBoundaryItemCount: number;
  operatingDbPreApprovalBoundaryItemCount: number;
  runtimeWorkerQueueAdapterPreApprovalBoundaryItemCount: number;
  apiSecretUiActionPostPreApprovalBoundaryItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalSubmissionPreApprovalBoundaryItemCount: number;
  actualNaverApiCall: false;
  actualProductLookupApiCall: false;
  actualProductUpdateApiCall: false;
  actualTokenReissue: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualOperatingDbConnectionChange: false;
  actualEnvReadOrWrite: false;
  actualSecretExposure: false;
  actualRawApiResponseExposure: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualAdapterConnection: false;
  actualRuntimeConfiguration: false;
  actualApprovalRequestCreated: false;
  actualApprovalRequestReviewedAsSubmission: false;
  actualApprovalRequestSubmitted: false;
  actualSubmissionReadinessReviewSubmitted: false;
  actualSubmissionReadinessOutcomeCertificationSubmitted: false;
  actualSubmissionLockReviewSubmitted: false;
  actualSubmissionLockOutcomeCertificationSubmitted: false;
  actualFinalSubmissionBoundaryReviewSubmitted: false;
  actualFinalSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualFinalSubmissionLockReviewSubmitted: false;
  actualFinalSubmissionLockOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalBoundarySubmitted: false;
  actualSubmissionPreApprovalGranted: false;
  actualFinalApprovalGrant: false;
  actualFinalApprovalSubmission: false;
  actualDeploymentApproval: false;
  actualDeploymentExecution: false;
  actualOperatingTransition: false;
  actualVpsCreation: false;
  actualDomainConnection: false;
  actualDnsChange: false;
  actualSslCertificateIssue: false;
  actualExecutionButtonAdded: false;
  actualSubmitActionAdded: false;
  actualPostApiAdded: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_NOT_STARTED',
};

function toBoundaryItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItemStatus {
  if (item.isReady) return 'PRE_APPROVAL_BOUNDARY_READY';
  if (item.isPartialReady) return 'PRE_APPROVAL_BOUNDARY_PARTIAL_READY';
  if (item.isBlocked) return 'PRE_APPROVAL_BOUNDARY_BLOCKED';
  return 'PRE_APPROVAL_BOUNDARY_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[] {
  return items.map((item) => {
    const boundaryStatus = toBoundaryItemStatus(item);
    return {
      boundaryItemId: `submission-pre-approval-boundary-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      boundaryStatus,
      isReady: boundaryStatus === 'PRE_APPROVAL_BOUNDARY_READY',
      isPartialReady: boundaryStatus === 'PRE_APPROVAL_BOUNDARY_PARTIAL_READY',
      isBlocked: boundaryStatus === 'PRE_APPROVAL_BOUNDARY_BLOCKED',
      isNotStarted: boundaryStatus === 'PRE_APPROVAL_BOUNDARY_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView {
  const boundaryStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus
    ];

  const submissionPreApprovalBoundaryReadinessItems = mapItems(
    outcomeCertificationView.finalSubmissionLockOutcomeCertificationReadinessItems,
    'SUBMISSION_PRE_APPROVAL_BOUNDARY_READINESS',
    'Pre-Approval Boundary',
    '[사전 승인 경계 준비도 표시]'
  );
  const finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems = [
    ...mapItems(
      outcomeCertificationView.finalSubmissionLockReviewOutcomeCertificationItems,
      'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PRE_APPROVAL_BOUNDARY',
      'Pre-Approval Boundary',
      '[최종 제출 Lock 검토 결과 인증 참조 사전 승인 경계]'
    ),
    ...mapItems(
      outcomeCertificationView.finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems,
      'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PRE_APPROVAL_BOUNDARY',
      'Pre-Approval Boundary',
      '[최종 제출 경계 결과 인증 참조 사전 승인 경계]'
    ),
  ];
  const approvalRequestCreationPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.approvalRequestCreationFinalLockOutcomeCertificationItems,
    'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[승인 요청 생성 사전 승인 경계] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestReviewSubmissionPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[승인 요청 검토 제출 사전 승인 경계] 실제 승인 요청 검토 제출은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.approvalRequestSubmissionFinalLockOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[승인 요청 제출 사전 승인 경계] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionFinalLockOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[최종 승인 제출 사전 승인 경계] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.finalApprovalGrantFinalLockOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[최종 승인 부여 사전 승인 경계] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.deploymentApprovalFinalLockOutcomeCertificationItems,
    'DEPLOYMENT_APPROVAL_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[배포 승인 사전 승인 경계] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.deploymentExecutionFinalLockOutcomeCertificationItems,
    'DEPLOYMENT_EXECUTION_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[배포 실행 사전 승인 경계] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.operatingTransitionFinalLockOutcomeCertificationItems,
    'OPERATING_TRANSITION_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[운영 전환 사전 승인 경계] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[인프라/도메인/DNS/HTTPS 사전 승인 경계] 실제 도메인/DNS/SSL 작업은 수행하지 않습니다.'
  );
  const operatingDbPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems,
    'OPERATING_DB_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[운영 DB 사전 승인 경계] 실제 운영 DB 연결 변경과 DB write는 수행하지 않습니다.'
  );
  const runtimeWorkerQueueAdapterPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[Runtime/Worker/Queue/Adapter 사전 승인 경계] 실제 Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostPreApprovalBoundaryItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostFinalLockOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_BOUNDARY',
    'Pre-Approval Boundary',
    '[API/Secret/UI Action/POST 사전 승인 경계] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const submissionPreApprovalBoundaryItems = [
    ...submissionPreApprovalBoundaryReadinessItems,
    ...finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems,
    ...approvalRequestCreationPreApprovalBoundaryItems,
    ...approvalRequestReviewSubmissionPreApprovalBoundaryItems,
    ...approvalRequestSubmissionPreApprovalBoundaryItems,
    ...finalApprovalSubmissionPreApprovalBoundaryItems,
    ...finalApprovalGrantPreApprovalBoundaryItems,
    ...deploymentApprovalPreApprovalBoundaryItems,
    ...deploymentExecutionPreApprovalBoundaryItems,
    ...operatingTransitionPreApprovalBoundaryItems,
    ...infrastructureDomainDnsHttpsPreApprovalBoundaryItems,
    ...operatingDbPreApprovalBoundaryItems,
    ...runtimeWorkerQueueAdapterPreApprovalBoundaryItems,
    ...apiSecretUiActionPostPreApprovalBoundaryItems,
  ];

  const readyBoundaryItems = submissionPreApprovalBoundaryItems.filter((item) => item.isReady);
  const partialReadyBoundaryItems = submissionPreApprovalBoundaryItems.filter(
    (item) => item.isPartialReady
  );
  const blockedBoundaryItems = submissionPreApprovalBoundaryItems.filter((item) => item.isBlocked);
  const notStartedBoundaryItems = submissionPreApprovalBoundaryItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 384,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Boundary',
    sourceFinalSubmissionLockOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus:
      boundaryStatus,
    recommendedPreApprovalBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY',
    recommendedPreApprovalBoundaryDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Boundary - read-only 사전 승인 경계 표시 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    submissionPreApprovalBoundaryItems,
    submissionPreApprovalBoundaryReadinessItems,
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems,
    approvalRequestCreationPreApprovalBoundaryItems,
    approvalRequestReviewSubmissionPreApprovalBoundaryItems,
    approvalRequestSubmissionPreApprovalBoundaryItems,
    finalApprovalSubmissionPreApprovalBoundaryItems,
    finalApprovalGrantPreApprovalBoundaryItems,
    deploymentApprovalPreApprovalBoundaryItems,
    deploymentExecutionPreApprovalBoundaryItems,
    operatingTransitionPreApprovalBoundaryItems,
    infrastructureDomainDnsHttpsPreApprovalBoundaryItems,
    operatingDbPreApprovalBoundaryItems,
    runtimeWorkerQueueAdapterPreApprovalBoundaryItems,
    apiSecretUiActionPostPreApprovalBoundaryItems,
    submissionPreApprovalBoundarySummaryCards: [
      { label: 'Submission Pre-Approval Boundary 그룹', value: 14 },
      { label: 'Ready', value: readyBoundaryItems.length },
      { label: 'Blocked', value: blockedBoundaryItems.length },
      { label: 'Total', value: submissionPreApprovalBoundaryItems.length },
    ],
    readyBoundaryItems,
    partialReadyBoundaryItems,
    blockedBoundaryItems,
    notStartedBoundaryItems,
    submissionPreApprovalBoundaryReadinessItemCount:
      submissionPreApprovalBoundaryReadinessItems.length,
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItemCount:
      finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems.length,
    approvalRequestCreationPreApprovalBoundaryItemCount:
      approvalRequestCreationPreApprovalBoundaryItems.length,
    approvalRequestReviewSubmissionPreApprovalBoundaryItemCount:
      approvalRequestReviewSubmissionPreApprovalBoundaryItems.length,
    approvalRequestSubmissionPreApprovalBoundaryItemCount:
      approvalRequestSubmissionPreApprovalBoundaryItems.length,
    finalApprovalSubmissionPreApprovalBoundaryItemCount:
      finalApprovalSubmissionPreApprovalBoundaryItems.length,
    finalApprovalGrantPreApprovalBoundaryItemCount:
      finalApprovalGrantPreApprovalBoundaryItems.length,
    deploymentApprovalPreApprovalBoundaryItemCount:
      deploymentApprovalPreApprovalBoundaryItems.length,
    deploymentExecutionPreApprovalBoundaryItemCount:
      deploymentExecutionPreApprovalBoundaryItems.length,
    operatingTransitionPreApprovalBoundaryItemCount:
      operatingTransitionPreApprovalBoundaryItems.length,
    infrastructureDomainDnsHttpsPreApprovalBoundaryItemCount:
      infrastructureDomainDnsHttpsPreApprovalBoundaryItems.length,
    operatingDbPreApprovalBoundaryItemCount: operatingDbPreApprovalBoundaryItems.length,
    runtimeWorkerQueueAdapterPreApprovalBoundaryItemCount:
      runtimeWorkerQueueAdapterPreApprovalBoundaryItems.length,
    apiSecretUiActionPostPreApprovalBoundaryItemCount:
      apiSecretUiActionPostPreApprovalBoundaryItems.length,
    readyItemCount: readyBoundaryItems.length,
    partialReadyItemCount: partialReadyBoundaryItems.length,
    blockedItemCount: blockedBoundaryItems.length,
    notStartedItemCount: notStartedBoundaryItems.length,
    totalSubmissionPreApprovalBoundaryItemCount: submissionPreApprovalBoundaryItems.length,
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
    actualFinalSubmissionBoundaryReviewSubmitted: false,
    actualFinalSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualFinalSubmissionLockReviewSubmitted: false,
    actualFinalSubmissionLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundarySubmitted: false,
    actualSubmissionPreApprovalGranted: false,
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
  };
}
