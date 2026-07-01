import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-lock-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationCategory =
  | 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS'
  | 'FINAL_SUBMISSION_LOCK_REVIEW_OUTCOME_CERTIFICATION'
  | 'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_CREATION_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_LOCK_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_FINAL_LOCK_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItemStatus =
  | 'FINAL_LOCK_OUTCOME_CERTIFIED_READY'
  | 'FINAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'FINAL_LOCK_OUTCOME_BLOCKED'
  | 'FINAL_LOCK_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceLockReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView {
  taskId: 383;
  taskName: string;
  sourceFinalSubmissionLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Final Submission Lock 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  finalSubmissionLockOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  finalSubmissionLockReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  approvalRequestCreationFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  approvalRequestSubmissionFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  finalApprovalSubmissionFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  finalApprovalGrantFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  deploymentApprovalFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  deploymentExecutionFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  operatingTransitionFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  apiSecretUiActionPostFinalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[];
  finalSubmissionLockOutcomeCertificationReadinessItemCount: number;
  finalSubmissionLockReviewOutcomeCertificationItemCount: number;
  finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItemCount: number;
  approvalRequestCreationFinalLockOutcomeCertificationItemCount: number;
  approvalRequestReviewSubmissionFinalLockOutcomeCertificationItemCount: number;
  approvalRequestSubmissionFinalLockOutcomeCertificationItemCount: number;
  finalApprovalSubmissionFinalLockOutcomeCertificationItemCount: number;
  finalApprovalGrantFinalLockOutcomeCertificationItemCount: number;
  deploymentApprovalFinalLockOutcomeCertificationItemCount: number;
  deploymentExecutionFinalLockOutcomeCertificationItemCount: number;
  operatingTransitionFinalLockOutcomeCertificationItemCount: number;
  infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItemCount: number;
  apiSecretUiActionPostFinalLockOutcomeCertificationItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalOutcomeCertificationItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItemStatus {
  if (item.isReady) return 'FINAL_LOCK_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) return 'FINAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY';
  if (item.isBlocked) return 'FINAL_LOCK_OUTCOME_BLOCKED';
  return 'FINAL_LOCK_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `final-submission-lock-outcome-certification-${item.lockReviewItemId}-${category.toLowerCase()}`,
      sourceLockReviewItemId: item.lockReviewItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceLockReviewStatus: item.lockReviewStatus,
      outcomeCertificationStatus,
      isReady: outcomeCertificationStatus === 'FINAL_LOCK_OUTCOME_CERTIFIED_READY',
      isPartialReady: outcomeCertificationStatus === 'FINAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked: outcomeCertificationStatus === 'FINAL_LOCK_OUTCOME_BLOCKED',
      isNotStarted: outcomeCertificationStatus === 'FINAL_LOCK_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
  lockReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus
    ];

  const finalSubmissionLockOutcomeCertificationReadinessItems = mapItems(
    lockReviewView.finalSubmissionLockReviewReadinessItems,
    'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[최종 제출 Lock 결과 인증 준비도]'
  );
  const finalSubmissionLockReviewOutcomeCertificationItems = mapItems(
    lockReviewView.finalSubmissionLockReviewItems,
    'FINAL_SUBMISSION_LOCK_REVIEW_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 제출 Lock 검토 결과 인증]'
  );
  const finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems = mapItems(
    lockReviewView.finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems,
    'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 제출 경계 결과 인증 참조 Lock 결과 인증]'
  );
  const approvalRequestCreationFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestCreationFinalLockReviewItems,
    'APPROVAL_REQUEST_CREATION_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 생성 최종 Lock 결과 인증] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestReviewSubmissionFinalLockReviewItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 검토 제출 최종 Lock 결과 인증] 실제 승인 요청 검토 제출은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestSubmissionFinalLockReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 제출 최종 Lock 결과 인증] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.finalApprovalSubmissionFinalLockReviewItems,
    'FINAL_APPROVAL_SUBMISSION_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 최종 Lock 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.finalApprovalGrantFinalLockReviewItems,
    'FINAL_APPROVAL_GRANT_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 부여 최종 Lock 결과 인증] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.deploymentApprovalFinalLockReviewItems,
    'DEPLOYMENT_APPROVAL_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 승인 최종 Lock 결과 인증] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.deploymentExecutionFinalLockReviewItems,
    'DEPLOYMENT_EXECUTION_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 실행 최종 Lock 결과 인증] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.operatingTransitionFinalLockReviewItems,
    'OPERATING_TRANSITION_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 전환 최종 Lock 결과 인증] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.infrastructureDomainDnsHttpsFinalLockReviewItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[인프라/도메인/DNS/HTTPS 최종 Lock 결과 인증] 실제 도메인/DNS/SSL 작업은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems = [
    ...mapItems(
      lockReviewView.operatingDbFinalLockReviewItems,
      'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[운영 DB/Runtime/Worker/Queue/Adapter 최종 Lock 결과 인증] 실제 운영 DB 연결 변경과 Runtime 구성은 수행하지 않습니다.'
    ),
    ...mapItems(
      lockReviewView.runtimeWorkerQueueAdapterFinalLockReviewItems,
      'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[운영 DB/Runtime/Worker/Queue/Adapter 최종 Lock 결과 인증] 실제 Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
    ),
  ];
  const apiSecretUiActionPostFinalLockOutcomeCertificationItems = mapItems(
    lockReviewView.apiSecretUiActionPostFinalLockReviewItems,
    'API_SECRET_UI_ACTION_POST_FINAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST 최종 Lock 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...finalSubmissionLockOutcomeCertificationReadinessItems,
    ...finalSubmissionLockReviewOutcomeCertificationItems,
    ...finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems,
    ...approvalRequestCreationFinalLockOutcomeCertificationItems,
    ...approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems,
    ...approvalRequestSubmissionFinalLockOutcomeCertificationItems,
    ...finalApprovalSubmissionFinalLockOutcomeCertificationItems,
    ...finalApprovalGrantFinalLockOutcomeCertificationItems,
    ...deploymentApprovalFinalLockOutcomeCertificationItems,
    ...deploymentExecutionFinalLockOutcomeCertificationItems,
    ...operatingTransitionFinalLockOutcomeCertificationItems,
    ...infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems,
    ...apiSecretUiActionPostFinalLockOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((item) => item.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isPartialReady
  );
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter((item) => item.isBlocked);
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 383,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Final Submission Lock Outcome Certification',
    sourceFinalSubmissionLockReviewStatus:
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Final Submission Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    finalSubmissionLockOutcomeCertificationReadinessItems,
    finalSubmissionLockReviewOutcomeCertificationItems,
    finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems,
    approvalRequestCreationFinalLockOutcomeCertificationItems,
    approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems,
    approvalRequestSubmissionFinalLockOutcomeCertificationItems,
    finalApprovalSubmissionFinalLockOutcomeCertificationItems,
    finalApprovalGrantFinalLockOutcomeCertificationItems,
    deploymentApprovalFinalLockOutcomeCertificationItems,
    deploymentExecutionFinalLockOutcomeCertificationItems,
    operatingTransitionFinalLockOutcomeCertificationItems,
    infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems,
    apiSecretUiActionPostFinalLockOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'Final Submission Lock Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    finalSubmissionLockOutcomeCertificationReadinessItemCount:
      finalSubmissionLockOutcomeCertificationReadinessItems.length,
    finalSubmissionLockReviewOutcomeCertificationItemCount:
      finalSubmissionLockReviewOutcomeCertificationItems.length,
    finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItemCount:
      finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems.length,
    approvalRequestCreationFinalLockOutcomeCertificationItemCount:
      approvalRequestCreationFinalLockOutcomeCertificationItems.length,
    approvalRequestReviewSubmissionFinalLockOutcomeCertificationItemCount:
      approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems.length,
    approvalRequestSubmissionFinalLockOutcomeCertificationItemCount:
      approvalRequestSubmissionFinalLockOutcomeCertificationItems.length,
    finalApprovalSubmissionFinalLockOutcomeCertificationItemCount:
      finalApprovalSubmissionFinalLockOutcomeCertificationItems.length,
    finalApprovalGrantFinalLockOutcomeCertificationItemCount:
      finalApprovalGrantFinalLockOutcomeCertificationItems.length,
    deploymentApprovalFinalLockOutcomeCertificationItemCount:
      deploymentApprovalFinalLockOutcomeCertificationItems.length,
    deploymentExecutionFinalLockOutcomeCertificationItemCount:
      deploymentExecutionFinalLockOutcomeCertificationItems.length,
    operatingTransitionFinalLockOutcomeCertificationItemCount:
      operatingTransitionFinalLockOutcomeCertificationItems.length,
    infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItemCount:
      infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItemCount:
      operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems.length,
    apiSecretUiActionPostFinalLockOutcomeCertificationItemCount:
      apiSecretUiActionPostFinalLockOutcomeCertificationItems.length,
    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalOutcomeCertificationItemCount: outcomeCertificationItems.length,
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
