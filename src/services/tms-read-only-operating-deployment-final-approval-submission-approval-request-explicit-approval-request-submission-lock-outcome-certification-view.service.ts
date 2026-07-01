import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-lock-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationCategory =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_REFERENCE_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_LOCK_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItemStatus =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceLockReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView {
  taskId: 394;
  taskName: string;
  sourceExplicitApprovalRequestSubmissionLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Explicit Approval Request Submission Lock 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  explicitApprovalPhraseGuidance: '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.';
  explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalPhraseNonInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalRequestCreationLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestCreationNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  approvalRequestSubmissionNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  finalApprovalGrantNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  apiSecretUiActionPostLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItemCount: number;
  explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItemCount: number;
  explicitApprovalPhraseNonInputLockOutcomeCertificationItemCount: number;
  explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItemCount: number;
  explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItemCount: number;
  explicitApprovalRequestCreationLockOutcomeCertificationItemCount: number;
  explicitApprovalRequestSubmissionLockOutcomeCertificationItemCount: number;
  approvalRequestCreationNonExecutionLockOutcomeCertificationItemCount: number;
  approvalRequestSubmissionNonExecutionLockOutcomeCertificationItemCount: number;
  finalApprovalSubmissionNonExecutionLockOutcomeCertificationItemCount: number;
  finalApprovalGrantNonExecutionLockOutcomeCertificationItemCount: number;
  deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItemCount: number;
  apiSecretUiActionPostLockOutcomeCertificationItemCount: number;
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
  actualExplicitApprovalRequestCreated: false;
  actualExplicitApprovalRequestSubmitted: false;
  actualExplicitApprovalPhraseInputAdded: false;
  actualExplicitApprovalPhraseSubmitted: false;
  actualExplicitApprovalGranted: false;
  actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundarySubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false;
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
  actualApprovalButtonAdded: false;
  actualSubmitActionAdded: false;
  actualPostApiAdded: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItemStatus {
  if (item.isReady) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) {
    return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY';
  }
  if (item.isBlocked) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED';
  return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `explicit-approval-request-submission-lock-outcome-certification-${item.lockReviewItemId}-${category.toLowerCase()}`,
      sourceLockReviewItemId: item.lockReviewItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceLockReviewStatus: item.submissionLockReviewStatus,
      outcomeCertificationStatus,
      isReady:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED',
      isNotStarted:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
  lockReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus
    ];

  const explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItems = mapItems(
    lockReviewView.explicitApprovalRequestSubmissionLockReviewReadinessItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[명시 승인 요청 제출 Lock 결과 인증 준비도] read-only 결과 인증 준비 상태만 확인합니다.'
  );
  const explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItems = mapItems(
    lockReviewView.submissionBoundaryOutcomeCertificationReferenceLockReviewItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 제출 Lock 검토 참조 결과 인증] Task 393 검토 결과를 read-only로 인증합니다.'
  );
  const explicitApprovalPhraseNonInputLockOutcomeCertificationItems = mapItems(
    lockReviewView.explicitApprovalPhraseNonInputLockReviewItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 문구 비입력 Lock 결과 인증] 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며 이번 화면에는 입력창이 없습니다.'
  );
  const explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItems = mapItems(
    lockReviewView.explicitApprovalPhraseNonSubmissionLockReviewItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 문구 비제출 Lock 결과 인증] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItems = mapItems(
    lockReviewView.explicitApprovalAcceptanceNonGrantLockReviewItems,
    'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 수락 비부여 Lock 결과 인증] 이번 화면에서는 승인 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationLockOutcomeCertificationItems = mapItems(
    lockReviewView.explicitApprovalRequestCreationLockReviewItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 생성 Lock 결과 인증] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionLockOutcomeCertificationItems = mapItems(
    lockReviewView.explicitApprovalRequestSubmissionLockReviewDetailItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 제출 Lock 결과 인증] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const approvalRequestCreationNonExecutionLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestCreationNonExecutionLockReviewItems,
    'APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 생성 비실행 Lock 결과 인증] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionNonExecutionLockOutcomeCertificationItems = mapItems(
    lockReviewView.approvalRequestSubmissionNonExecutionLockReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 제출 비실행 Lock 결과 인증] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems = mapItems(
    lockReviewView.finalApprovalSubmissionNonExecutionLockReviewItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 비실행 Lock 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionLockOutcomeCertificationItems = mapItems(
    lockReviewView.finalApprovalGrantNonExecutionLockReviewItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 부여 비실행 Lock 결과 인증] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems = mapItems(
    lockReviewView.deploymentOperatingTransitionNonExecutionLockReviewItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포/운영 전환 비실행 Lock 결과 인증] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems = mapItems(
    lockReviewView.operatingDbRuntimeWorkerQueueAdapterLockReviewItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 DB/Runtime/Worker/Queue/Adapter Lock 결과 인증] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostLockOutcomeCertificationItems = mapItems(
    lockReviewView.apiSecretUiActionPostLockReviewItems,
    'API_SECRET_UI_ACTION_POST_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST Lock 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItems,
    ...explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItems,
    ...explicitApprovalPhraseNonInputLockOutcomeCertificationItems,
    ...explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItems,
    ...explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItems,
    ...explicitApprovalRequestCreationLockOutcomeCertificationItems,
    ...explicitApprovalRequestSubmissionLockOutcomeCertificationItems,
    ...approvalRequestCreationNonExecutionLockOutcomeCertificationItems,
    ...approvalRequestSubmissionNonExecutionLockOutcomeCertificationItems,
    ...finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems,
    ...finalApprovalGrantNonExecutionLockOutcomeCertificationItems,
    ...deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems,
    ...apiSecretUiActionPostLockOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((item) => item.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isPartialReady
  );
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isBlocked
  );
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 394,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Submission Lock Outcome Certification',
    sourceExplicitApprovalRequestSubmissionLockReviewStatus:
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Submission Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance: lockReviewView.explicitApprovalPhraseGuidance,
    explicitApprovalPhraseExample: lockReviewView.explicitApprovalPhraseExample,
    outcomeCertificationItems,
    explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItems,
    explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItems,
    explicitApprovalPhraseNonInputLockOutcomeCertificationItems,
    explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItems,
    explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItems,
    explicitApprovalRequestCreationLockOutcomeCertificationItems,
    explicitApprovalRequestSubmissionLockOutcomeCertificationItems,
    approvalRequestCreationNonExecutionLockOutcomeCertificationItems,
    approvalRequestSubmissionNonExecutionLockOutcomeCertificationItems,
    finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems,
    finalApprovalGrantNonExecutionLockOutcomeCertificationItems,
    deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems,
    apiSecretUiActionPostLockOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'Explicit Approval Request Submission Lock Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItemCount:
      explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItems.length,
    explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItems.length,
    explicitApprovalPhraseNonInputLockOutcomeCertificationItemCount:
      explicitApprovalPhraseNonInputLockOutcomeCertificationItems.length,
    explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItemCount:
      explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItems.length,
    explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItemCount:
      explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItems.length,
    explicitApprovalRequestCreationLockOutcomeCertificationItemCount:
      explicitApprovalRequestCreationLockOutcomeCertificationItems.length,
    explicitApprovalRequestSubmissionLockOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionLockOutcomeCertificationItems.length,
    approvalRequestCreationNonExecutionLockOutcomeCertificationItemCount:
      approvalRequestCreationNonExecutionLockOutcomeCertificationItems.length,
    approvalRequestSubmissionNonExecutionLockOutcomeCertificationItemCount:
      approvalRequestSubmissionNonExecutionLockOutcomeCertificationItems.length,
    finalApprovalSubmissionNonExecutionLockOutcomeCertificationItemCount:
      finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems.length,
    finalApprovalGrantNonExecutionLockOutcomeCertificationItemCount:
      finalApprovalGrantNonExecutionLockOutcomeCertificationItems.length,
    deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItemCount:
      deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItemCount:
      operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems.length,
    apiSecretUiActionPostLockOutcomeCertificationItemCount:
      apiSecretUiActionPostLockOutcomeCertificationItems.length,
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
    actualExplicitApprovalRequestCreated: false,
    actualExplicitApprovalRequestSubmitted: false,
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false,
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
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}
