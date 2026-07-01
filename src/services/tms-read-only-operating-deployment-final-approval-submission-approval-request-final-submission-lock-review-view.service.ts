import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-boundary-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewCategory =
  | 'FINAL_SUBMISSION_LOCK_REVIEW_READINESS'
  | 'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_CREATION_FINAL_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_FINAL_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_SUBMISSION_FINAL_LOCK_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_FINAL_LOCK_REVIEW'
  | 'FINAL_APPROVAL_GRANT_FINAL_LOCK_REVIEW'
  | 'DEPLOYMENT_APPROVAL_FINAL_LOCK_REVIEW'
  | 'DEPLOYMENT_EXECUTION_FINAL_LOCK_REVIEW'
  | 'OPERATING_TRANSITION_FINAL_LOCK_REVIEW'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_FINAL_LOCK_REVIEW'
  | 'OPERATING_DB_FINAL_LOCK_REVIEW'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_LOCK_REVIEW'
  | 'API_SECRET_UI_ACTION_POST_FINAL_LOCK_REVIEW';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItemStatus =
  | 'FINAL_LOCK_REVIEW_READY'
  | 'FINAL_LOCK_REVIEW_PARTIAL_READY'
  | 'FINAL_LOCK_REVIEW_BLOCKED'
  | 'FINAL_LOCK_REVIEW_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem {
  lockReviewItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationItemStatus;
  lockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView {
  taskId: 382;
  taskName: string;
  sourceFinalSubmissionBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus;
  recommendedFinalSubmissionLockReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_ONLY';
  recommendedFinalSubmissionLockReviewDecisionLabel: '최종 승인 제출 Approval Request Final Submission Lock Review - read-only 최종 제출 Lock 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'FINAL_SUBMISSION_LOCK_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  finalSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  finalSubmissionLockReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  approvalRequestCreationFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  approvalRequestReviewSubmissionFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  approvalRequestSubmissionFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  finalApprovalSubmissionFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  finalApprovalGrantFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  deploymentApprovalFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  deploymentExecutionFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  operatingTransitionFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  infrastructureDomainDnsHttpsFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  operatingDbFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  runtimeWorkerQueueAdapterFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  apiSecretUiActionPostFinalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  finalSubmissionLockReviewSummaryCards: { label: string; value: number }[];
  readyFinalSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  partialReadyFinalSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  blockedFinalSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  notStartedFinalSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[];
  finalSubmissionLockReviewReadinessItemCount: number;
  finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItemCount: number;
  approvalRequestCreationFinalLockReviewItemCount: number;
  approvalRequestReviewSubmissionFinalLockReviewItemCount: number;
  approvalRequestSubmissionFinalLockReviewItemCount: number;
  finalApprovalSubmissionFinalLockReviewItemCount: number;
  finalApprovalGrantFinalLockReviewItemCount: number;
  deploymentApprovalFinalLockReviewItemCount: number;
  deploymentExecutionFinalLockReviewItemCount: number;
  operatingTransitionFinalLockReviewItemCount: number;
  infrastructureDomainDnsHttpsFinalLockReviewItemCount: number;
  operatingDbFinalLockReviewItemCount: number;
  runtimeWorkerQueueAdapterFinalLockReviewItemCount: number;
  apiSecretUiActionPostFinalLockReviewItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalFinalSubmissionLockReviewItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
};

function toLockReviewItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItemStatus {
  if (item.isReady) return 'FINAL_LOCK_REVIEW_READY';
  if (item.isPartialReady) return 'FINAL_LOCK_REVIEW_PARTIAL_READY';
  if (item.isBlocked) return 'FINAL_LOCK_REVIEW_BLOCKED';
  return 'FINAL_LOCK_REVIEW_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[] {
  return items.map((item) => {
    const lockReviewStatus = toLockReviewItemStatus(item);
    return {
      lockReviewItemId: `final-submission-lock-review-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      lockReviewStatus,
      isReady: lockReviewStatus === 'FINAL_LOCK_REVIEW_READY',
      isPartialReady: lockReviewStatus === 'FINAL_LOCK_REVIEW_PARTIAL_READY',
      isBlocked: lockReviewStatus === 'FINAL_LOCK_REVIEW_BLOCKED',
      isNotStarted: lockReviewStatus === 'FINAL_LOCK_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView {
  const lockReviewStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus
    ];

  const finalSubmissionLockReviewReadinessItems = mapItems(
    outcomeCertificationView.finalSubmissionBoundaryOutcomeCertificationReadinessItems,
    'FINAL_SUBMISSION_LOCK_REVIEW_READINESS',
    'Lock Review',
    '[최종 제출 Lock 준비도 검토]'
  );
  const finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems = [
    ...mapItems(
      outcomeCertificationView.finalSubmissionBoundaryReviewOutcomeCertificationItems,
      'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW',
      'Lock Review',
      '[최종 제출 경계 결과 인증 참조 Lock 검토]'
    ),
    ...mapItems(
      outcomeCertificationView.submissionLockOutcomeCertificationReferenceBoundaryOutcomeCertificationItems,
      'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW',
      'Lock Review',
      '[제출 Lock 결과 인증 참조 Lock 검토]'
    ),
  ];
  const approvalRequestCreationFinalLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestCreationBoundaryOutcomeCertificationItems,
    'APPROVAL_REQUEST_CREATION_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 생성 최종 Lock 검토] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestReviewSubmissionFinalLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestReviewSubmissionBoundaryOutcomeCertificationItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 검토 제출 최종 Lock 검토] 실제 승인 요청 검토 제출은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionFinalLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestSubmissionBoundaryOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 제출 최종 Lock 검토] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionFinalLockReviewItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionBoundaryOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[최종 승인 제출 최종 Lock 검토] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantFinalLockReviewItems = mapItems(
    outcomeCertificationView.finalApprovalGrantBoundaryOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[최종 승인 부여 최종 Lock 검토] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalFinalLockReviewItems = mapItems(
    outcomeCertificationView.deploymentApprovalBoundaryOutcomeCertificationItems,
    'DEPLOYMENT_APPROVAL_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[배포 승인 최종 Lock 검토] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionFinalLockReviewItems = mapItems(
    outcomeCertificationView.deploymentExecutionBoundaryOutcomeCertificationItems,
    'DEPLOYMENT_EXECUTION_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[배포 실행 최종 Lock 검토] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionFinalLockReviewItems = mapItems(
    outcomeCertificationView.operatingTransitionBoundaryOutcomeCertificationItems,
    'OPERATING_TRANSITION_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[운영 전환 최종 Lock 검토] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsFinalLockReviewItems = mapItems(
    outcomeCertificationView.infrastructureDomainDnsHttpsBoundaryOutcomeCertificationItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[인프라/도메인/DNS/HTTPS 최종 Lock 검토] 실제 도메인/DNS/SSL 작업은 수행하지 않습니다.'
  );
  const operatingDbFinalLockReviewItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterBoundaryOutcomeCertificationItems,
    'OPERATING_DB_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[운영 DB 최종 Lock 검토] 실제 운영 DB 연결 변경과 DB write는 수행하지 않습니다.'
  );
  const runtimeWorkerQueueAdapterFinalLockReviewItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterBoundaryOutcomeCertificationItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[Runtime/Worker/Queue/Adapter 최종 Lock 검토] 실제 Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostFinalLockReviewItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostBoundaryOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_FINAL_LOCK_REVIEW',
    'Lock Review',
    '[API/Secret/UI Action/POST 최종 Lock 검토] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const finalSubmissionLockReviewItems = [
    ...finalSubmissionLockReviewReadinessItems,
    ...finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems,
    ...approvalRequestCreationFinalLockReviewItems,
    ...approvalRequestReviewSubmissionFinalLockReviewItems,
    ...approvalRequestSubmissionFinalLockReviewItems,
    ...finalApprovalSubmissionFinalLockReviewItems,
    ...finalApprovalGrantFinalLockReviewItems,
    ...deploymentApprovalFinalLockReviewItems,
    ...deploymentExecutionFinalLockReviewItems,
    ...operatingTransitionFinalLockReviewItems,
    ...infrastructureDomainDnsHttpsFinalLockReviewItems,
    ...operatingDbFinalLockReviewItems,
    ...runtimeWorkerQueueAdapterFinalLockReviewItems,
    ...apiSecretUiActionPostFinalLockReviewItems,
  ];

  const readyFinalSubmissionLockReviewItems = finalSubmissionLockReviewItems.filter(
    (item) => item.isReady
  );
  const partialReadyFinalSubmissionLockReviewItems = finalSubmissionLockReviewItems.filter(
    (item) => item.isPartialReady
  );
  const blockedFinalSubmissionLockReviewItems = finalSubmissionLockReviewItems.filter(
    (item) => item.isBlocked
  );
  const notStartedFinalSubmissionLockReviewItems = finalSubmissionLockReviewItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 382,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Final Submission Lock Review',
    sourceFinalSubmissionBoundaryOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus:
      lockReviewStatus,
    recommendedFinalSubmissionLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedFinalSubmissionLockReviewDecisionLabel:
      '최종 승인 제출 Approval Request Final Submission Lock Review - read-only 최종 제출 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    finalSubmissionLockReviewItems,
    finalSubmissionLockReviewReadinessItems,
    finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems,
    approvalRequestCreationFinalLockReviewItems,
    approvalRequestReviewSubmissionFinalLockReviewItems,
    approvalRequestSubmissionFinalLockReviewItems,
    finalApprovalSubmissionFinalLockReviewItems,
    finalApprovalGrantFinalLockReviewItems,
    deploymentApprovalFinalLockReviewItems,
    deploymentExecutionFinalLockReviewItems,
    operatingTransitionFinalLockReviewItems,
    infrastructureDomainDnsHttpsFinalLockReviewItems,
    operatingDbFinalLockReviewItems,
    runtimeWorkerQueueAdapterFinalLockReviewItems,
    apiSecretUiActionPostFinalLockReviewItems,
    finalSubmissionLockReviewSummaryCards: [
      { label: 'Final Submission Lock Review 그룹', value: 14 },
      { label: 'Ready', value: readyFinalSubmissionLockReviewItems.length },
      { label: 'Blocked', value: blockedFinalSubmissionLockReviewItems.length },
      { label: 'Total', value: finalSubmissionLockReviewItems.length },
    ],
    readyFinalSubmissionLockReviewItems,
    partialReadyFinalSubmissionLockReviewItems,
    blockedFinalSubmissionLockReviewItems,
    notStartedFinalSubmissionLockReviewItems,
    finalSubmissionLockReviewReadinessItemCount:
      finalSubmissionLockReviewReadinessItems.length,
    finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItemCount:
      finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems.length,
    approvalRequestCreationFinalLockReviewItemCount:
      approvalRequestCreationFinalLockReviewItems.length,
    approvalRequestReviewSubmissionFinalLockReviewItemCount:
      approvalRequestReviewSubmissionFinalLockReviewItems.length,
    approvalRequestSubmissionFinalLockReviewItemCount:
      approvalRequestSubmissionFinalLockReviewItems.length,
    finalApprovalSubmissionFinalLockReviewItemCount:
      finalApprovalSubmissionFinalLockReviewItems.length,
    finalApprovalGrantFinalLockReviewItemCount:
      finalApprovalGrantFinalLockReviewItems.length,
    deploymentApprovalFinalLockReviewItemCount:
      deploymentApprovalFinalLockReviewItems.length,
    deploymentExecutionFinalLockReviewItemCount:
      deploymentExecutionFinalLockReviewItems.length,
    operatingTransitionFinalLockReviewItemCount:
      operatingTransitionFinalLockReviewItems.length,
    infrastructureDomainDnsHttpsFinalLockReviewItemCount:
      infrastructureDomainDnsHttpsFinalLockReviewItems.length,
    operatingDbFinalLockReviewItemCount: operatingDbFinalLockReviewItems.length,
    runtimeWorkerQueueAdapterFinalLockReviewItemCount:
      runtimeWorkerQueueAdapterFinalLockReviewItems.length,
    apiSecretUiActionPostFinalLockReviewItemCount:
      apiSecretUiActionPostFinalLockReviewItems.length,
    readyItemCount: readyFinalSubmissionLockReviewItems.length,
    partialReadyItemCount: partialReadyFinalSubmissionLockReviewItems.length,
    blockedItemCount: blockedFinalSubmissionLockReviewItems.length,
    notStartedItemCount: notStartedFinalSubmissionLockReviewItems.length,
    totalFinalSubmissionLockReviewItemCount: finalSubmissionLockReviewItems.length,
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
