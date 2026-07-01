import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-lock-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationCategory =
  | 'SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_READINESS'
  | 'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_OUTCOME_CERTIFICATION'
  | 'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'PRE_APPROVAL_GRANT_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_OPERATING_DB_RUNTIME_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItemStatus =
  | 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY'
  | 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'PRE_APPROVAL_LOCK_OUTCOME_BLOCKED'
  | 'PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceLockReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView {
  taskId: 387;
  taskName: string;
  sourceSubmissionPreApprovalLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Submission Pre-Approval Lock 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  submissionPreApprovalLockOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  submissionPreApprovalLockReviewOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  approvalRequestCreationPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  preApprovalGrantLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  finalApprovalGrantPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  deploymentApprovalPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  deploymentExecutionPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  operatingTransitionPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[];
  submissionPreApprovalLockOutcomeCertificationReadinessItemCount: number;
  submissionPreApprovalLockReviewOutcomeCertificationItemCount: number;
  submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItemCount: number;
  approvalRequestCreationPreApprovalLockOutcomeCertificationItemCount: number;
  approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItemCount: number;
  approvalRequestSubmissionPreApprovalLockOutcomeCertificationItemCount: number;
  preApprovalGrantLockOutcomeCertificationItemCount: number;
  finalApprovalSubmissionPreApprovalLockOutcomeCertificationItemCount: number;
  finalApprovalGrantPreApprovalLockOutcomeCertificationItemCount: number;
  deploymentApprovalPreApprovalLockOutcomeCertificationItemCount: number;
  deploymentExecutionPreApprovalLockOutcomeCertificationItemCount: number;
  operatingTransitionPreApprovalLockOutcomeCertificationItemCount: number;
  infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItemCount: number;
  apiSecretUiActionPostPreApprovalLockOutcomeCertificationItemCount: number;
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
  actualSubmissionPreApprovalBoundarySubmitted: false;
  actualSubmissionPreApprovalGranted: false;
  actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false;
  actualSubmissionPreApprovalLockReviewSubmitted: false;
  actualSubmissionPreApprovalLockReviewGranted: false;
  actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalLockOutcomeCertificationGranted: false;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItemStatus {
  if (item.isReady) return 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) return 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY';
  if (item.isBlocked) return 'PRE_APPROVAL_LOCK_OUTCOME_BLOCKED';
  return 'PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `submission-pre-approval-lock-outcome-certification-${item.lockReviewItemId}-${category.toLowerCase()}`,
      sourceLockReviewItemId: item.lockReviewItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceLockReviewStatus: item.lockReviewStatus,
      outcomeCertificationStatus,
      isReady: outcomeCertificationStatus === 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus === 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked: outcomeCertificationStatus === 'PRE_APPROVAL_LOCK_OUTCOME_BLOCKED',
      isNotStarted: outcomeCertificationStatus === 'PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
  lockReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus
    ];

  const submissionPreApprovalLockOutcomeCertificationReadinessItems = mapItems(
    lockReviewView.submissionPreApprovalLockReviewReadinessItems,
    'SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[사전 승인 Lock 결과 인증 준비도]'
  );
  const submissionPreApprovalLockReviewOutcomeCertificationItems = mapItems(
    lockReviewView.submissionPreApprovalLockReviewItems,
    'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사전 승인 Lock 검토 결과 인증]'
  );
  const submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems =
    mapItems(
      lockReviewView.submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems,
      'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[사전 승인 경계 결과 인증 참조 Lock 결과 인증]'
    );
  const approvalRequestCreationPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestCreationPreApprovalLockReviewItems,
    'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 생성 사전 승인 Lock 결과 인증] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestReviewSubmissionPreApprovalLockReviewItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 검토 제출 사전 승인 Lock 결과 인증] 실제 승인 요청 검토 제출은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestSubmissionPreApprovalLockReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 제출 사전 승인 Lock 결과 인증] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const preApprovalGrantLockOutcomeCertificationItems = mapItems(
    lockReviewView.preApprovalGrantLockReviewItems,
    'PRE_APPROVAL_GRANT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사전 승인 부여 Lock 결과 인증] 실제 사전 승인 부여는 수행하지 않습니다.'
  );
  const finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.finalApprovalSubmissionPreApprovalLockReviewItems,
    'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 사전 승인 Lock 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.finalApprovalGrantPreApprovalLockReviewItems,
    'FINAL_APPROVAL_GRANT_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 부여 사전 승인 Lock 결과 인증] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.deploymentApprovalPreApprovalLockReviewItems,
    'DEPLOYMENT_APPROVAL_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 승인 사전 승인 Lock 결과 인증] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.deploymentExecutionPreApprovalLockReviewItems,
    'DEPLOYMENT_EXECUTION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 실행 사전 승인 Lock 결과 인증] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.operatingTransitionPreApprovalLockReviewItems,
    'OPERATING_TRANSITION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 전환 사전 승인 Lock 결과 인증] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems = [
    ...mapItems(
      lockReviewView.infrastructureDomainDnsHttpsPreApprovalLockReviewItems,
      'INFRASTRUCTURE_OPERATING_DB_RUNTIME_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[인프라/도메인/DNS/HTTPS/운영 DB/Runtime 사전 승인 Lock 결과 인증] 실제 도메인 연결, DNS 변경, SSL 발급은 수행하지 않습니다.'
    ),
    ...mapItems(
      lockReviewView.operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems,
      'INFRASTRUCTURE_OPERATING_DB_RUNTIME_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[인프라/도메인/DNS/HTTPS/운영 DB/Runtime 사전 승인 Lock 결과 인증] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
    ),
  ];
  const apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems = mapItems(
    lockReviewView.apiSecretUiActionPostPreApprovalLockReviewItems,
    'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST 사전 승인 Lock 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...submissionPreApprovalLockOutcomeCertificationReadinessItems,
    ...submissionPreApprovalLockReviewOutcomeCertificationItems,
    ...submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems,
    ...approvalRequestCreationPreApprovalLockOutcomeCertificationItems,
    ...approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems,
    ...approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems,
    ...preApprovalGrantLockOutcomeCertificationItems,
    ...finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems,
    ...finalApprovalGrantPreApprovalLockOutcomeCertificationItems,
    ...deploymentApprovalPreApprovalLockOutcomeCertificationItems,
    ...deploymentExecutionPreApprovalLockOutcomeCertificationItems,
    ...operatingTransitionPreApprovalLockOutcomeCertificationItems,
    ...infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems,
    ...apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems,
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
    taskId: 387,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Lock Outcome Certification',
    sourceSubmissionPreApprovalLockReviewStatus:
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    submissionPreApprovalLockOutcomeCertificationReadinessItems,
    submissionPreApprovalLockReviewOutcomeCertificationItems,
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems,
    approvalRequestCreationPreApprovalLockOutcomeCertificationItems,
    approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems,
    approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems,
    preApprovalGrantLockOutcomeCertificationItems,
    finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems,
    finalApprovalGrantPreApprovalLockOutcomeCertificationItems,
    deploymentApprovalPreApprovalLockOutcomeCertificationItems,
    deploymentExecutionPreApprovalLockOutcomeCertificationItems,
    operatingTransitionPreApprovalLockOutcomeCertificationItems,
    infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems,
    apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'Submission Pre-Approval Lock Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    submissionPreApprovalLockOutcomeCertificationReadinessItemCount:
      submissionPreApprovalLockOutcomeCertificationReadinessItems.length,
    submissionPreApprovalLockReviewOutcomeCertificationItemCount:
      submissionPreApprovalLockReviewOutcomeCertificationItems.length,
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItemCount:
      submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems.length,
    approvalRequestCreationPreApprovalLockOutcomeCertificationItemCount:
      approvalRequestCreationPreApprovalLockOutcomeCertificationItems.length,
    approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItemCount:
      approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems.length,
    approvalRequestSubmissionPreApprovalLockOutcomeCertificationItemCount:
      approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems.length,
    preApprovalGrantLockOutcomeCertificationItemCount:
      preApprovalGrantLockOutcomeCertificationItems.length,
    finalApprovalSubmissionPreApprovalLockOutcomeCertificationItemCount:
      finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems.length,
    finalApprovalGrantPreApprovalLockOutcomeCertificationItemCount:
      finalApprovalGrantPreApprovalLockOutcomeCertificationItems.length,
    deploymentApprovalPreApprovalLockOutcomeCertificationItemCount:
      deploymentApprovalPreApprovalLockOutcomeCertificationItems.length,
    deploymentExecutionPreApprovalLockOutcomeCertificationItemCount:
      deploymentExecutionPreApprovalLockOutcomeCertificationItems.length,
    operatingTransitionPreApprovalLockOutcomeCertificationItemCount:
      operatingTransitionPreApprovalLockOutcomeCertificationItems.length,
    infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItemCount:
      infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems.length,
    apiSecretUiActionPostPreApprovalLockOutcomeCertificationItemCount:
      apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems.length,
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
    actualSubmissionPreApprovalBoundarySubmitted: false,
    actualSubmissionPreApprovalGranted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false,
    actualSubmissionPreApprovalLockReviewSubmitted: false,
    actualSubmissionPreApprovalLockReviewGranted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationGranted: false,
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
