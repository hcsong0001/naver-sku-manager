import { TmsReadOnlyDeploymentDomainPreparationStatus } from './tms-read-only-deployment-domain-preparation-status-check-view.service';

export type TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonStatus =
  | 'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY'
  | 'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY'
  | 'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED'
  | 'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED';

export type DeploymentTargetEnvironmentKey = 'NAS' | 'COMPANY_PC' | 'HOME_PC' | 'VPS';

export const NEXT_TASK_322_APPROVAL_PHRASE =
  'Task 322에서 TMS read-only VPS 배포 후보 상세 검토 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 321에서 권장 후보로 표시된 VPS 환경의 요구사항·비용·접근 제한·백업·보안 조건을 read-only로 상세 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface DeploymentTargetEnvironmentOption {
  environmentKey: DeploymentTargetEnvironmentKey;
  environmentLabel: string;
  summary: string;
  stabilityScore: number;
  accessibilityScore: number;
  recoveryScore: number;
  costScore: number;
  domainSuitabilityScore: number;
  securityScore: number;
  overallScore: number;
  pros: readonly string[];
  cons: readonly string[];
  recommendedUse: string;
  isRecommended: boolean;
  isReadOnly: true;
  actualConfigChanged: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
}

export interface DeploymentTargetComparisonCriterion {
  criterionKey: string;
  label: string;
  description: string;
}

export interface DeploymentTargetEnvironmentComparisonSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView {
  status: 'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_VIEW';
  taskId: 321;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 321;
  referenceTaskNumbers: readonly [320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceDeploymentDomainPreparationStatus: TmsReadOnlyDeploymentDomainPreparationStatus;
  deploymentTargetEnvironmentSelectionComparisonStatus: TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonStatus;
  environmentOptions: readonly DeploymentTargetEnvironmentOption[];
  environmentComparisonSummaryCards: readonly DeploymentTargetEnvironmentComparisonSummaryCard[];
  recommendedEnvironmentKey: DeploymentTargetEnvironmentKey;
  recommendedEnvironmentLabel: string;
  recommendationReason: string;
  nasOption: DeploymentTargetEnvironmentOption;
  companyPcOption: DeploymentTargetEnvironmentOption;
  homePcOption: DeploymentTargetEnvironmentOption;
  vpsOption: DeploymentTargetEnvironmentOption;
  comparisonCriteria: readonly DeploymentTargetComparisonCriterion[];
  deploymentTargetSelectionReady: boolean;
  deploymentTargetSelectionPartialReady: boolean;
  deploymentTargetSelectionBlocked: boolean;
  deploymentTargetSelectionNotStarted: boolean;
  actualDeploymentTargetSelected: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  nasConfigChanged: false;
  companyPcConfigChanged: false;
  homePcConfigChanged: false;
  vpsConfigChanged: false;
  operatingDbConnectionChanged: false;
  candidateFlowReadOnlyClosed: boolean;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  isReadOnlyDeploymentTargetEnvironmentComparison: true;
  requiresSeparateTask322Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  submitActionAdded: false;
  postApiAdded: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  priceChanged: false;
  stockChanged: false;
  dbWritePerformed: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
  envFileReadOrModified: false;
}

const PREPARATION_TO_COMPARISON_STATUS: Record<
  TmsReadOnlyDeploymentDomainPreparationStatus,
  TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonStatus
> = {
  TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_READY:
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY',
  TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_PARTIAL_READY:
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_BLOCKED:
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
  TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED:
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
};

const ENVIRONMENT_OPTIONS: readonly DeploymentTargetEnvironmentOption[] = [
  {
    environmentKey: 'NAS',
    environmentLabel: 'NAS',
    summary: '백업과 내부 보조 인프라에는 유리하지만 외부 공개 운영은 보안·성능·장애 대응 검토가 더 필요합니다.',
    stabilityScore: 6,
    accessibilityScore: 5,
    recoveryScore: 7,
    costScore: 8,
    domainSuitabilityScore: 4,
    securityScore: 5,
    overallScore: 35,
    pros: ['내부 백업 및 파일 저장에 유리', '추가 월 비용이 상대적으로 낮음', '사내 보조 운영 인프라로 활용 가능'],
    cons: ['외부 공개 운영 시 보안 검토 부담이 큼', '전원·네트워크·하드웨어 장애 대응이 제한적', '도메인·HTTPS 공개 운영 적합성이 낮음'],
    recommendedUse: '내부 백업, 보조 인프라, 제한된 내부 접근용',
    isRecommended: false,
    isReadOnly: true,
    actualConfigChanged: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
  },
  {
    environmentKey: 'COMPANY_PC',
    environmentLabel: '회사 PC',
    summary: '내부 운영과 테스트에는 가능하지만 업무용 장비 의존성과 전원·네트워크 지속성 문제가 큽니다.',
    stabilityScore: 4,
    accessibilityScore: 5,
    recoveryScore: 4,
    costScore: 7,
    domainSuitabilityScore: 3,
    securityScore: 4,
    overallScore: 27,
    pros: ['추가 인프라 구매 없이 검토 가능', '내부 테스트 용도로 빠르게 접근 가능', '사내 네트워크 맥락을 확인하기 쉬움'],
    cons: ['업무용 장비 의존성이 높음', '전원 종료·재부팅·업무 시간 제약 영향이 큼', '외부 공개 운영과 도메인 연결 적합성이 낮음'],
    recommendedUse: '사내 테스트, 임시 검증, 내부 접근 한정 시나리오',
    isRecommended: false,
    isReadOnly: true,
    actualConfigChanged: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
  },
  {
    environmentKey: 'HOME_PC',
    environmentLabel: '집 PC',
    summary: '개발과 임시 테스트에는 가능하지만 운영 배포 대상으로는 전원·네트워크·보안 측면에서 부적합합니다.',
    stabilityScore: 3,
    accessibilityScore: 4,
    recoveryScore: 3,
    costScore: 8,
    domainSuitabilityScore: 2,
    securityScore: 3,
    overallScore: 23,
    pros: ['개발자가 직접 제어하기 쉬움', '임시 테스트와 로컬 검증에는 편리', '추가 인프라 비용이 거의 없음'],
    cons: ['운영 배포 대상으로는 안정성이 부족', '가정용 전원·네트워크 의존성이 큼', '도메인·HTTPS·접근 제한 구성에 불리함'],
    recommendedUse: '개발, 로컬 테스트, 임시 확인 환경',
    isRecommended: false,
    isReadOnly: true,
    actualConfigChanged: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
  },
  {
    environmentKey: 'VPS',
    environmentLabel: 'VPS',
    summary: '외부 접속, 도메인, HTTPS, 운영 안정성 기준에서 가장 균형이 좋아 TMS 운영 배포 후보로 가장 적합합니다.',
    stabilityScore: 9,
    accessibilityScore: 9,
    recoveryScore: 8,
    costScore: 6,
    domainSuitabilityScore: 9,
    securityScore: 8,
    overallScore: 49,
    pros: ['외부 접속과 도메인 연결에 가장 적합', '운영 안정성과 장애 대응 구성이 비교적 수월', 'HTTPS, 백업, 접근 제한 정책 수립이 용이'],
    cons: ['월 비용이 발생', '초기 운영 보안 설정 검토가 필요', '서버 운영 책임이 생김'],
    recommendedUse: '실서비스 운영 배포, 도메인 연결, HTTPS 기반 외부 접근',
    isRecommended: true,
    isReadOnly: true,
    actualConfigChanged: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
  },
] as const;

const COMPARISON_CRITERIA: readonly DeploymentTargetComparisonCriterion[] = [
  {
    criterionKey: 'stability',
    label: '안정성',
    description: '장시간 운영 시 전원·네트워크·장비 지속성 관점에서 얼마나 안정적인지 비교합니다.',
  },
  {
    criterionKey: 'accessibility',
    label: '접근성',
    description: '외부 접속, 운영 관리, 원격 접근 편의성을 비교합니다.',
  },
  {
    criterionKey: 'recovery',
    label: '장애 복구성',
    description: '장애 발생 시 복구 절차, 재기동, 백업 연계 난이도를 비교합니다.',
  },
  {
    criterionKey: 'cost',
    label: '운영 비용',
    description: '월 비용, 유지비, 추가 인프라 비용을 비교합니다.',
  },
  {
    criterionKey: 'domain',
    label: '도메인 연결 적합성',
    description: '외부 공개 운영, DNS, HTTPS 연결에 얼마나 적합한지 비교합니다.',
  },
  {
    criterionKey: 'security',
    label: '보안/접근 제한',
    description: '접근 제어, 비공개 운영, 외부 노출 관리의 용이성을 비교합니다.',
  },
  {
    criterionKey: 'backup',
    label: '백업 구성 용이성',
    description: '운영 DB 및 파일 백업 구조를 얼마나 일관되게 설계할 수 있는지 비교합니다.',
  },
  {
    criterionKey: 'power-network',
    label: '전원/네트워크 의존성',
    description: '개인 장비나 사내 장비 의존성 없이 안정적으로 유지 가능한지 비교합니다.',
  },
] as const;

export function buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(input: {
  deploymentDomainPreparation: {
    deploymentDomainPreparationStatus: TmsReadOnlyDeploymentDomainPreparationStatus;
    candidateFlowReadOnlyClosed: boolean;
    deploymentNotStarted: boolean;
    domainConnectionNotStarted: boolean;
  };
}): TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView {
  const sourceDeploymentDomainPreparationStatus =
    input.deploymentDomainPreparation.deploymentDomainPreparationStatus;
  const deploymentTargetEnvironmentSelectionComparisonStatus =
    PREPARATION_TO_COMPARISON_STATUS[sourceDeploymentDomainPreparationStatus];

  const deploymentTargetSelectionReady =
    deploymentTargetEnvironmentSelectionComparisonStatus ===
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY';
  const deploymentTargetSelectionPartialReady =
    deploymentTargetEnvironmentSelectionComparisonStatus ===
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY';
  const deploymentTargetSelectionBlocked =
    deploymentTargetEnvironmentSelectionComparisonStatus ===
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED';
  const deploymentTargetSelectionNotStarted =
    deploymentTargetEnvironmentSelectionComparisonStatus ===
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED';

  const recommendedEnvironment =
    ENVIRONMENT_OPTIONS.find((option) => option.isRecommended) ?? ENVIRONMENT_OPTIONS[3];

  const environmentComparisonSummaryCards: readonly DeploymentTargetEnvironmentComparisonSummaryCard[] = [
    {
      label: '비교 대상 환경',
      value: `${ENVIRONMENT_OPTIONS.length}개`,
      tone: 'neutral',
    },
    {
      label: '권장 후보',
      value: recommendedEnvironment.environmentLabel,
      tone: 'positive',
    },
    {
      label: '실제 선택 저장',
      value: '미수행',
      tone: 'warning',
    },
    {
      label: '실제 배포/도메인 연결',
      value: '미시작',
      tone: 'warning',
    },
  ];

  const nasOption = ENVIRONMENT_OPTIONS.find((option) => option.environmentKey === 'NAS')!;
  const companyPcOption = ENVIRONMENT_OPTIONS.find((option) => option.environmentKey === 'COMPANY_PC')!;
  const homePcOption = ENVIRONMENT_OPTIONS.find((option) => option.environmentKey === 'HOME_PC')!;
  const vpsOption = ENVIRONMENT_OPTIONS.find((option) => option.environmentKey === 'VPS')!;

  return {
    status: 'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_VIEW',
    taskId: 321,
    taskName: 'TMS Read-Only Deployment Target Environment Selection Comparison Screen Flow',
    panelTitle: 'TMS Read-Only 배포 대상 환경 선택 비교',
    description:
      'Task 320 배포/도메인 준비 상태를 바탕으로 NAS, 회사 PC, 집 PC, VPS 환경을 read-only로 비교합니다. 이 화면은 실제 배포 대상 선택 저장, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.',
    currentTaskNumber: 321,
    referenceTaskNumbers: [320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceDeploymentDomainPreparationStatus,
    deploymentTargetEnvironmentSelectionComparisonStatus,
    environmentOptions: ENVIRONMENT_OPTIONS,
    environmentComparisonSummaryCards,
    recommendedEnvironmentKey: recommendedEnvironment.environmentKey,
    recommendedEnvironmentLabel: recommendedEnvironment.environmentLabel,
    recommendationReason:
      'VPS는 외부 접속, 도메인 연결, HTTPS, 운영 안정성, 보안 통제 측면에서 가장 균형이 좋아 TMS 운영 배포 후보로 가장 적합합니다.',
    nasOption,
    companyPcOption,
    homePcOption,
    vpsOption,
    comparisonCriteria: COMPARISON_CRITERIA,
    deploymentTargetSelectionReady,
    deploymentTargetSelectionPartialReady,
    deploymentTargetSelectionBlocked,
    deploymentTargetSelectionNotStarted,
    actualDeploymentTargetSelected: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    nasConfigChanged: false,
    companyPcConfigChanged: false,
    homePcConfigChanged: false,
    vpsConfigChanged: false,
    operatingDbConnectionChanged: false,
    candidateFlowReadOnlyClosed: input.deploymentDomainPreparation.candidateFlowReadOnlyClosed,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    isReadOnlyDeploymentTargetEnvironmentComparison: true,
    requiresSeparateTask322Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_322_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritePerformed: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    envFileReadOrModified: false,
  };
}
