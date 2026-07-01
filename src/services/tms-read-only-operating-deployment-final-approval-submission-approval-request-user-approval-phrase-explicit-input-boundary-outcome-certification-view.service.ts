import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-explicit-input-boundary-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationCategory =
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_READINESS'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_REQUIRED_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_EXPLICIT_INPUT_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_EXPLICIT_INPUT_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItemStatus =
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_BLOCKED'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceExplicitInputBoundaryItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceExplicitInputBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationView {
  taskId: 400;
  taskName: string;
  sourceUserApprovalPhraseExplicitInputBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 User Approval Phrase Explicit Input Boundary 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 Explicit Input Boundary 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseRequiredExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseInputUiNonAdditionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseInputNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  apiSecretUiActionPostExplicitInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[];
  userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItemCount: number;
  userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItemCount: number;
  userApprovalPhraseRequiredExplicitInputOutcomeCertificationItemCount: number;
  userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItemCount: number;
  userApprovalPhraseInputUiNonAdditionOutcomeCertificationItemCount: number;
  userApprovalPhraseInputNonExecutionOutcomeCertificationItemCount: number;
  userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItemCount: number;
  userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItemCount: number;
  explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItemCount: number;
  finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItemCount: number;
  deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItemCount: number;
  apiSecretUiActionPostExplicitInputOutcomeCertificationItemCount: number;
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
  actualUserApprovalPhraseExplicitInputBoundarySubmitted: false;
  actualUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationSubmitted: false;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItemStatus {
  if (item.isReady) {
    return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_READY';
  }
  if (item.isPartialReady) {
    return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY';
  }
  if (item.isBlocked) {
    return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_BLOCKED';
  }
  return 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `user-approval-phrase-explicit-input-boundary-outcome-certification-${item.explicitInputBoundaryItemId}-${category.toLowerCase()}`,
      sourceExplicitInputBoundaryItemId: item.explicitInputBoundaryItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceExplicitInputBoundaryStatus: item.explicitInputBoundaryStatus,
      outcomeCertificationStatus,
      isReady:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_BLOCKED',
      isNotStarted:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationView(
  explicitInputBoundaryView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      explicitInputBoundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus
    ];

  const userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItems = mapItems(
    explicitInputBoundaryView.userApprovalPhraseExplicitInputBoundaryReadinessItems,
    'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[사용자 승인 문구 Explicit Input Boundary 결과 인증 준비도] read-only 결과 인증 준비 상태만 확인합니다.'
  );
  const userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItems,
    'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 Explicit Input Boundary 참조 결과 인증] Task 399 경계 결과를 read-only로 인증합니다.'
  );
  const userApprovalPhraseRequiredExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.userApprovalPhraseRequiredExplicitInputBoundaryItems,
    'USER_APPROVAL_PHRASE_REQUIRED_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 필요 Explicit Input 결과 인증] 승인 문구는 이후 별도 승인 단계에서만 필요하며 이번 화면은 결과 인증만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.userApprovalPhraseExampleDisplayExplicitInputBoundaryItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 예시 표시 Explicit Input 결과 인증] 승인 문구 예시는 read-only 결과 인증만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseInputUiNonAdditionOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.userApprovalPhraseInputUiNonAdditionBoundaryItems,
    'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 입력 UI 미추가 결과 인증] 이번 화면에서는 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseInputNonExecutionOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.userApprovalPhraseInputNonExecutionBoundaryItems,
    'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 입력 비실행 결과 인증] 이번 화면에서는 승인 문구를 실제 입력하지 않습니다.'
  );
  const userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.userApprovalPhraseSubmissionNonExecutionBoundaryItems,
    'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 제출 비실행 결과 인증] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.userApprovalAcceptanceNonGrantExplicitInputBoundaryItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 수락 비부여 Explicit Input 결과 인증] 이번 화면에서는 승인 문구 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 생성 비실행 Explicit Input 결과 인증] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 제출 비실행 Explicit Input 결과 인증] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.finalApprovalSubmissionNonExecutionExplicitInputBoundaryItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 비실행 Explicit Input 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포/운영 전환 비실행 Explicit Input 결과 인증] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 DB/Runtime/Worker/Queue/Adapter Explicit Input 결과 인증] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostExplicitInputOutcomeCertificationItems = mapItems(
    explicitInputBoundaryView.apiSecretUiActionPostExplicitInputBoundaryItems,
    'API_SECRET_UI_ACTION_POST_EXPLICIT_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST Explicit Input 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItems,
    ...userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItems,
    ...userApprovalPhraseRequiredExplicitInputOutcomeCertificationItems,
    ...userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItems,
    ...userApprovalPhraseInputUiNonAdditionOutcomeCertificationItems,
    ...userApprovalPhraseInputNonExecutionOutcomeCertificationItems,
    ...userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItems,
    ...userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItems,
    ...explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItems,
    ...explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItems,
    ...finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItems,
    ...deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItems,
    ...apiSecretUiActionPostExplicitInputOutcomeCertificationItems,
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
    taskId: 400,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Explicit Input Boundary Outcome Certification',
    sourceUserApprovalPhraseExplicitInputBoundaryStatus:
      explicitInputBoundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 User Approval Phrase Explicit Input Boundary 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Explicit Input Boundary 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: explicitInputBoundaryView.userApprovalPhraseExample,
    outcomeCertificationItems,
    userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItems,
    userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItems,
    userApprovalPhraseRequiredExplicitInputOutcomeCertificationItems,
    userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItems,
    userApprovalPhraseInputUiNonAdditionOutcomeCertificationItems,
    userApprovalPhraseInputNonExecutionOutcomeCertificationItems,
    userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItems,
    userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItems,
    explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItems,
    explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItems,
    finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItems,
    deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItems,
    apiSecretUiActionPostExplicitInputOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'User Approval Phrase Explicit Input Boundary Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItemCount:
      userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItems.length,
    userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItemCount:
      userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItems.length,
    userApprovalPhraseRequiredExplicitInputOutcomeCertificationItemCount:
      userApprovalPhraseRequiredExplicitInputOutcomeCertificationItems.length,
    userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItemCount:
      userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItems.length,
    userApprovalPhraseInputUiNonAdditionOutcomeCertificationItemCount:
      userApprovalPhraseInputUiNonAdditionOutcomeCertificationItems.length,
    userApprovalPhraseInputNonExecutionOutcomeCertificationItemCount:
      userApprovalPhraseInputNonExecutionOutcomeCertificationItems.length,
    userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItemCount:
      userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItems.length,
    userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItemCount:
      userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItems.length,
    explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItemCount:
      explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItems.length,
    explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItems.length,
    finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItemCount:
      finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItems.length,
    deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItemCount:
      deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItemCount:
      operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItems.length,
    apiSecretUiActionPostExplicitInputOutcomeCertificationItemCount:
      apiSecretUiActionPostExplicitInputOutcomeCertificationItems.length,
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
    actualUserApprovalPhraseExplicitInputBoundarySubmitted: false,
    actualUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationSubmitted: false,
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
