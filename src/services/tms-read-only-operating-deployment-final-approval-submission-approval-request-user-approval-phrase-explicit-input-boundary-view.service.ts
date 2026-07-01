import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-lock-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryCategory =
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READINESS'
  | 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_REFERENCE_EXPLICIT_INPUT_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_REQUIRED_EXPLICIT_INPUT_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_EXPLICIT_INPUT_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_BOUNDARY'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_EXPLICIT_INPUT_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_EXPLICIT_INPUT_BOUNDARY'
  | 'API_SECRET_UI_ACTION_POST_EXPLICIT_INPUT_BOUNDARY';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItemStatus =
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem {
  explicitInputBoundaryItemId: string;
  sourceLockOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryCategory;
  label: string;
  description: string;
  sourceLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItemStatus;
  explicitInputBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView {
  taskId: 399;
  taskName: string;
  sourceUserApprovalPhraseLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus;
  recommendedUserApprovalPhraseExplicitInputBoundaryDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_ONLY';
  recommendedUserApprovalPhraseExplicitInputBoundaryDecisionLabel: '최종 승인 제출 User Approval Phrase Explicit Input Boundary - read-only 사용자 승인 문구 명시 입력 경계 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 Explicit Input Boundary 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 경계 표시만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  explicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseExplicitInputBoundaryReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseRequiredExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseExampleDisplayExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseInputUiNonAdditionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseInputNonExecutionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseSubmissionNonExecutionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalAcceptanceNonGrantExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  finalApprovalSubmissionNonExecutionExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  apiSecretUiActionPostExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  explicitInputBoundarySummaryCards: { label: string; value: number }[];
  readyExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  partialReadyExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  blockedExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  notStartedExplicitInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[];
  userApprovalPhraseExplicitInputBoundaryReadinessItemCount: number;
  userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItemCount: number;
  userApprovalPhraseRequiredExplicitInputBoundaryItemCount: number;
  userApprovalPhraseExampleDisplayExplicitInputBoundaryItemCount: number;
  userApprovalPhraseInputUiNonAdditionBoundaryItemCount: number;
  userApprovalPhraseInputNonExecutionBoundaryItemCount: number;
  userApprovalPhraseSubmissionNonExecutionBoundaryItemCount: number;
  userApprovalAcceptanceNonGrantExplicitInputBoundaryItemCount: number;
  explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItemCount: number;
  finalApprovalSubmissionNonExecutionExplicitInputBoundaryItemCount: number;
  deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItemCount: number;
  apiSecretUiActionPostExplicitInputBoundaryItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalExplicitInputBoundaryItemCount: number;
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
  actualUserApprovalPhraseExplicitInputBoundarySubmitted: false;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED',
};

function toExplicitInputBoundaryItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItemStatus {
  if (item.isReady) return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY';
  if (item.isPartialReady) {
    return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY';
  }
  if (item.isBlocked) return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED';
  return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[] {
  return items.map((item) => {
    const explicitInputBoundaryStatus = toExplicitInputBoundaryItemStatus(item);
    return {
      explicitInputBoundaryItemId: `user-approval-phrase-explicit-input-boundary-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceLockOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceLockOutcomeCertificationStatus: item.outcomeCertificationStatus,
      explicitInputBoundaryStatus,
      isReady:
        explicitInputBoundaryStatus === 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY',
      isPartialReady:
        explicitInputBoundaryStatus ===
        'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY',
      isBlocked:
        explicitInputBoundaryStatus === 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED',
      isNotStarted:
        explicitInputBoundaryStatus ===
        'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
  lockOutcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView {
  const explicitInputBoundaryStatus =
    STATUS_MAP[
      lockOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus
    ];

  const userApprovalPhraseExplicitInputBoundaryReadinessItems = mapItems(
    lockOutcomeCertificationView.userApprovalPhraseLockOutcomeCertificationReadinessItems,
    'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READINESS',
    'Explicit Input Boundary',
    '[사용자 승인 문구 명시 입력 경계 준비도] read-only 경계 표시 상태만 확인합니다.'
  );
  const userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.userApprovalPhraseLockReviewReferenceOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_REFERENCE_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[사용자 승인 문구 Lock 결과 인증 참조 명시 입력 경계] Task 398 결과를 read-only로 참조합니다.'
  );
  const userApprovalPhraseRequiredExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.userApprovalPhraseRequiredLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_REQUIRED_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[사용자 승인 문구 필요 명시 입력 경계] 승인 문구는 이후 별도 승인 단계에서만 필요하며 이번 화면은 경계 표시만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.userApprovalPhraseExampleDisplayLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[사용자 승인 문구 예시 표시 명시 입력 경계] 승인 문구 예시는 read-only 경계 안내만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseInputUiNonAdditionBoundaryItems = mapItems(
    lockOutcomeCertificationView.userApprovalPhraseNonInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_BOUNDARY',
    'Explicit Input Boundary',
    '[사용자 승인 문구 입력 UI 미추가 경계] 이번 화면에서는 승인 문구 입력창을 추가하지 않습니다.'
  );
  const userApprovalPhraseInputNonExecutionBoundaryItems = mapItems(
    lockOutcomeCertificationView.userApprovalPhraseNonInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_BOUNDARY',
    'Explicit Input Boundary',
    '[사용자 승인 문구 입력 비실행 경계] 이번 화면에서는 승인 문구를 실제 입력하지 않습니다.'
  );
  const userApprovalPhraseSubmissionNonExecutionBoundaryItems = mapItems(
    lockOutcomeCertificationView.userApprovalPhraseNonSubmissionLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_BOUNDARY',
    'Explicit Input Boundary',
    '[사용자 승인 문구 제출 비실행 경계] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.userApprovalAcceptanceNonGrantLockOutcomeCertificationItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[사용자 승인 수락 비부여 명시 입력 경계] 이번 화면에서는 승인 문구 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[명시 승인 요청 생성 비실행 명시 입력 경계] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[명시 승인 요청 제출 비실행 명시 입력 경계] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[최종 승인 제출 비실행 명시 입력 경계] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[배포/운영 전환 비실행 명시 입력 경계] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[운영 DB/Runtime/Worker/Queue/Adapter 명시 입력 경계] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostExplicitInputBoundaryItems = mapItems(
    lockOutcomeCertificationView.apiSecretUiActionPostLockOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_EXPLICIT_INPUT_BOUNDARY',
    'Explicit Input Boundary',
    '[API/Secret/UI Action/POST 명시 입력 경계] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const explicitInputBoundaryItems = [
    ...userApprovalPhraseExplicitInputBoundaryReadinessItems,
    ...userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItems,
    ...userApprovalPhraseRequiredExplicitInputBoundaryItems,
    ...userApprovalPhraseExampleDisplayExplicitInputBoundaryItems,
    ...userApprovalPhraseInputUiNonAdditionBoundaryItems,
    ...userApprovalPhraseInputNonExecutionBoundaryItems,
    ...userApprovalPhraseSubmissionNonExecutionBoundaryItems,
    ...userApprovalAcceptanceNonGrantExplicitInputBoundaryItems,
    ...explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItems,
    ...explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItems,
    ...finalApprovalSubmissionNonExecutionExplicitInputBoundaryItems,
    ...deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItems,
    ...operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItems,
    ...apiSecretUiActionPostExplicitInputBoundaryItems,
  ];

  const readyExplicitInputBoundaryItems = explicitInputBoundaryItems.filter(
    (item) => item.isReady
  );
  const partialReadyExplicitInputBoundaryItems = explicitInputBoundaryItems.filter(
    (item) => item.isPartialReady
  );
  const blockedExplicitInputBoundaryItems = explicitInputBoundaryItems.filter(
    (item) => item.isBlocked
  );
  const notStartedExplicitInputBoundaryItems = explicitInputBoundaryItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 399,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Explicit Input Boundary',
    sourceUserApprovalPhraseLockOutcomeCertificationStatus:
      lockOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus:
      explicitInputBoundaryStatus,
    recommendedUserApprovalPhraseExplicitInputBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_ONLY',
    recommendedUserApprovalPhraseExplicitInputBoundaryDecisionLabel:
      '최종 승인 제출 User Approval Phrase Explicit Input Boundary - read-only 사용자 승인 문구 명시 입력 경계 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Explicit Input Boundary 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 경계 표시만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: lockOutcomeCertificationView.userApprovalPhraseExample,
    explicitInputBoundaryItems,
    userApprovalPhraseExplicitInputBoundaryReadinessItems,
    userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItems,
    userApprovalPhraseRequiredExplicitInputBoundaryItems,
    userApprovalPhraseExampleDisplayExplicitInputBoundaryItems,
    userApprovalPhraseInputUiNonAdditionBoundaryItems,
    userApprovalPhraseInputNonExecutionBoundaryItems,
    userApprovalPhraseSubmissionNonExecutionBoundaryItems,
    userApprovalAcceptanceNonGrantExplicitInputBoundaryItems,
    explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItems,
    explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItems,
    finalApprovalSubmissionNonExecutionExplicitInputBoundaryItems,
    deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItems,
    operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItems,
    apiSecretUiActionPostExplicitInputBoundaryItems,
    explicitInputBoundarySummaryCards: [
      { label: 'User Approval Phrase Explicit Input Boundary 그룹', value: 14 },
      { label: 'Ready', value: readyExplicitInputBoundaryItems.length },
      { label: 'Blocked', value: blockedExplicitInputBoundaryItems.length },
      { label: 'Total', value: explicitInputBoundaryItems.length },
    ],
    readyExplicitInputBoundaryItems,
    partialReadyExplicitInputBoundaryItems,
    blockedExplicitInputBoundaryItems,
    notStartedExplicitInputBoundaryItems,
    userApprovalPhraseExplicitInputBoundaryReadinessItemCount:
      userApprovalPhraseExplicitInputBoundaryReadinessItems.length,
    userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItemCount:
      userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItems.length,
    userApprovalPhraseRequiredExplicitInputBoundaryItemCount:
      userApprovalPhraseRequiredExplicitInputBoundaryItems.length,
    userApprovalPhraseExampleDisplayExplicitInputBoundaryItemCount:
      userApprovalPhraseExampleDisplayExplicitInputBoundaryItems.length,
    userApprovalPhraseInputUiNonAdditionBoundaryItemCount:
      userApprovalPhraseInputUiNonAdditionBoundaryItems.length,
    userApprovalPhraseInputNonExecutionBoundaryItemCount:
      userApprovalPhraseInputNonExecutionBoundaryItems.length,
    userApprovalPhraseSubmissionNonExecutionBoundaryItemCount:
      userApprovalPhraseSubmissionNonExecutionBoundaryItems.length,
    userApprovalAcceptanceNonGrantExplicitInputBoundaryItemCount:
      userApprovalAcceptanceNonGrantExplicitInputBoundaryItems.length,
    explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItemCount:
      explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItems.length,
    explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItemCount:
      explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItems.length,
    finalApprovalSubmissionNonExecutionExplicitInputBoundaryItemCount:
      finalApprovalSubmissionNonExecutionExplicitInputBoundaryItems.length,
    deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItemCount:
      deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItems.length,
    operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItemCount:
      operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItems.length,
    apiSecretUiActionPostExplicitInputBoundaryItemCount:
      apiSecretUiActionPostExplicitInputBoundaryItems.length,
    readyItemCount: readyExplicitInputBoundaryItems.length,
    partialReadyItemCount: partialReadyExplicitInputBoundaryItems.length,
    blockedItemCount: blockedExplicitInputBoundaryItems.length,
    notStartedItemCount: notStartedExplicitInputBoundaryItems.length,
    totalExplicitInputBoundaryItemCount: explicitInputBoundaryItems.length,
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
    actualUserApprovalPhraseExplicitInputBoundarySubmitted: false,
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
