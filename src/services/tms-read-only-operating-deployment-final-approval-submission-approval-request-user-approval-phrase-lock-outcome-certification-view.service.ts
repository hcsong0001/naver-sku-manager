import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-lock-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationCategory =
  | 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_READINESS'
  | 'USER_APPROVAL_PHRASE_LOCK_REVIEW_REFERENCE_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_REQUIRED_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_NON_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_LOCK_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItemStatus =
  | 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY'
  | 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED'
  | 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceLockReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView {
  taskId: 398;
  taskName: string;
  sourceUserApprovalPhraseLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 User Approval Phrase Lock 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 Lock 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalPhraseLockOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalPhraseLockReviewReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalPhraseRequiredLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalPhraseExampleDisplayLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalPhraseNonInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalPhraseNonSubmissionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalAcceptanceNonGrantLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  finalApprovalGrantNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  apiSecretUiActionPostLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[];
  userApprovalPhraseLockOutcomeCertificationReadinessItemCount: number;
  userApprovalPhraseLockReviewReferenceOutcomeCertificationItemCount: number;
  userApprovalPhraseRequiredLockOutcomeCertificationItemCount: number;
  userApprovalPhraseExampleDisplayLockOutcomeCertificationItemCount: number;
  userApprovalPhraseNonInputLockOutcomeCertificationItemCount: number;
  userApprovalPhraseNonSubmissionLockOutcomeCertificationItemCount: number;
  userApprovalAcceptanceNonGrantLockOutcomeCertificationItemCount: number;
  explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItemCount: number;
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
  actualUserApprovalPhraseInputAdded: false;
  actualUserApprovalPhraseSubmitted: false;
  actualUserApprovalPhraseAccepted: false;
  actualUserApprovalGranted: false;
  actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundarySubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false;
  actualUserApprovalPhrasePreparationBoundarySubmitted: false;
  actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseLockReviewSubmitted: false;
  actualUserApprovalPhraseLockOutcomeCertificationSubmitted: false;
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
  actualSubmissionPreApprovalLockGranted: false;
  actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false;
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
  actualUserApprovalPhraseInputAddedToUi: false;
  actualSubmitActionAdded: false;
  actualPostApiAdded: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItemStatus {
  if (item.isReady) return 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) return 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY';
  if (item.isBlocked) return 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED';
  return 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `user-approval-phrase-lock-outcome-certification-${item.lockReviewItemId}-${category.toLowerCase()}`,
      sourceLockReviewItemId: item.lockReviewItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceLockReviewStatus: item.userApprovalPhraseLockReviewStatus,
      outcomeCertificationStatus,
      isReady: outcomeCertificationStatus === 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked: outcomeCertificationStatus === 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED',
      isNotStarted:
        outcomeCertificationStatus === 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
  lockReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus
    ];

  const userApprovalPhraseLockOutcomeCertificationReadinessItems = mapItems(
    lockReviewView.userApprovalPhraseLockReviewReadinessItems,
    'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[사용자 승인 문구 Lock 결과 인증 준비도] read-only 결과 인증 준비 상태만 확인합니다.'
  );
  const userApprovalPhraseLockReviewReferenceOutcomeCertificationItems = mapItems(
    lockReviewView.userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItems,
    'USER_APPROVAL_PHRASE_LOCK_REVIEW_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 Lock Review 참조 결과 인증] Task 397 검토 결과를 read-only로 인증합니다.'
  );
  const userApprovalPhraseRequiredLockOutcomeCertificationItems = mapItems(
    lockReviewView.userApprovalPhraseRequiredLockReviewItems,
    'USER_APPROVAL_PHRASE_REQUIRED_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 필요 Lock 결과 인증] 승인 문구는 이후 별도 승인 단계에서만 필요하며 이번 화면은 결과 인증만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayLockOutcomeCertificationItems = mapItems(
    lockReviewView.userApprovalPhraseExampleDisplayLockReviewItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 예시 표시 Lock 결과 인증] 승인 문구 예시는 read-only 결과 인증만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseNonInputLockOutcomeCertificationItems = mapItems(
    lockReviewView.userApprovalPhraseNonInputLockReviewItems,
    'USER_APPROVAL_PHRASE_NON_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 비입력 Lock 결과 인증] 이번 화면에서는 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseNonSubmissionLockOutcomeCertificationItems = mapItems(
    lockReviewView.userApprovalPhraseNonSubmissionLockReviewItems,
    'USER_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 비제출 Lock 결과 인증] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantLockOutcomeCertificationItems = mapItems(
    lockReviewView.userApprovalAcceptanceNonGrantLockReviewItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 수락 비부여 Lock 결과 인증] 이번 화면에서는 승인 문구 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems = mapItems(
    lockReviewView.explicitApprovalRequestCreationNonExecutionLockReviewItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 생성 비실행 Lock 결과 인증] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems = mapItems(
    lockReviewView.explicitApprovalRequestSubmissionNonExecutionLockReviewItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 제출 비실행 Lock 결과 인증] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
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
    ...userApprovalPhraseLockOutcomeCertificationReadinessItems,
    ...userApprovalPhraseLockReviewReferenceOutcomeCertificationItems,
    ...userApprovalPhraseRequiredLockOutcomeCertificationItems,
    ...userApprovalPhraseExampleDisplayLockOutcomeCertificationItems,
    ...userApprovalPhraseNonInputLockOutcomeCertificationItems,
    ...userApprovalPhraseNonSubmissionLockOutcomeCertificationItems,
    ...userApprovalAcceptanceNonGrantLockOutcomeCertificationItems,
    ...explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems,
    ...explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems,
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
    taskId: 398,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Lock Outcome Certification',
    sourceUserApprovalPhraseLockReviewStatus:
      lockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 User Approval Phrase Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Lock 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: lockReviewView.userApprovalPhraseExample,
    outcomeCertificationItems,
    userApprovalPhraseLockOutcomeCertificationReadinessItems,
    userApprovalPhraseLockReviewReferenceOutcomeCertificationItems,
    userApprovalPhraseRequiredLockOutcomeCertificationItems,
    userApprovalPhraseExampleDisplayLockOutcomeCertificationItems,
    userApprovalPhraseNonInputLockOutcomeCertificationItems,
    userApprovalPhraseNonSubmissionLockOutcomeCertificationItems,
    userApprovalAcceptanceNonGrantLockOutcomeCertificationItems,
    explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems,
    explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems,
    finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems,
    finalApprovalGrantNonExecutionLockOutcomeCertificationItems,
    deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems,
    apiSecretUiActionPostLockOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'User Approval Phrase Lock Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    userApprovalPhraseLockOutcomeCertificationReadinessItemCount:
      userApprovalPhraseLockOutcomeCertificationReadinessItems.length,
    userApprovalPhraseLockReviewReferenceOutcomeCertificationItemCount:
      userApprovalPhraseLockReviewReferenceOutcomeCertificationItems.length,
    userApprovalPhraseRequiredLockOutcomeCertificationItemCount:
      userApprovalPhraseRequiredLockOutcomeCertificationItems.length,
    userApprovalPhraseExampleDisplayLockOutcomeCertificationItemCount:
      userApprovalPhraseExampleDisplayLockOutcomeCertificationItems.length,
    userApprovalPhraseNonInputLockOutcomeCertificationItemCount:
      userApprovalPhraseNonInputLockOutcomeCertificationItems.length,
    userApprovalPhraseNonSubmissionLockOutcomeCertificationItemCount:
      userApprovalPhraseNonSubmissionLockOutcomeCertificationItems.length,
    userApprovalAcceptanceNonGrantLockOutcomeCertificationItemCount:
      userApprovalAcceptanceNonGrantLockOutcomeCertificationItems.length,
    explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItemCount:
      explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems.length,
    explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems.length,
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
    actualUserApprovalPhraseInputAdded: false,
    actualUserApprovalPhraseSubmitted: false,
    actualUserApprovalPhraseAccepted: false,
    actualUserApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false,
    actualUserApprovalPhrasePreparationBoundarySubmitted: false,
    actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseLockReviewSubmitted: false,
    actualUserApprovalPhraseLockOutcomeCertificationSubmitted: false,
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
    actualSubmissionPreApprovalLockGranted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false,
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
    actualUserApprovalPhraseInputAddedToUi: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}
