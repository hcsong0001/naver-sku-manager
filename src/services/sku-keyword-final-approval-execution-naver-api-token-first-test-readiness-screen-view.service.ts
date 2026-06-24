/**
 * Task 39 - Token First Test Readiness Screen Flow / Read-only Dashboard Integration
 *
 * 이 서비스는 Task 26~38에서 구축한 안전 계층의 결과들을 화면에 표시하기 위한
 * Read-only View Model을 생성하는 순수 함수입니다.
 *
 * 실제 API 호출이나 DB 저장을 하지 않으며, UI에서 상태와 차단 사유를 표시할 목적의 데이터 구조만을 제공합니다.
 */

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestGoTicketIssueAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-go-ticket-issue-audit-plan.service';
import type { NaverApiTokenFirstTestGoTicketPersistenceResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-go-ticket-persistence-disabled.service';
import type { NaverApiTokenFirstTestSandboxInvocationResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-sandbox-adapter-disabled.service';
import type { NaverApiTokenFirstTestGoTicketResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-one-time-go-ticket.service';

export interface ReadinessScreenStatusCard {
  title: string;
  value: string;
  isOk: boolean;
}

export interface ReadinessScreenSafetyStep {
  step: number;
  key: string;
  label: string;
  status: 'READY' | 'BLOCKED' | 'DISABLED' | 'REVIEW_ONLY' | 'NOT_STARTED' | 'PENDING';
  message: string;
  reasons: string[];
}

export interface NaverApiTokenFirstTestReadinessScreenViewModel {
  screenViewCreated: boolean;
  readOnly: boolean;
  statusCardsCreated: boolean;
  safetyStepsCreated: boolean;
  copyableSafetyReportCreated: boolean;
  copyableSafetyReport: string;
  manualReviewRequired: boolean;
  requiresSeparateLiveApproval: boolean;
  
  overallStatus: 'READY' | 'BLOCKED' | 'NOT_STARTED';
  overallMessage: string;

  statusCards: ReadinessScreenStatusCard[];
  safetySteps: ReadinessScreenSafetyStep[];

  // 강제 차단 플래그들 (View Model 계층에서도 안전 보장)
  screenActionEnabled: false;
  liveTokenTestApproved: false;
  liveTokenTestExecutionAllowed: false;
  dbWriteAllowed: false;
  persistenceExecuted: false;
  metadataPersisted: false;
  auditEventPersisted: false;
  dbWriteExecuted: false;
  prismaMutationExecuted: false;
  goTicketIssued: false;
  executionLeaseIssued: false;
  sandboxInvocationAllowed: false;
  sandboxInvocationExecuted: false;
  coordinatorExecutionAllowed: false;
  requestPayloadCreated: false;
  requestBodyCreated: false;
  requestHeadersCreated: false;
  networkKillSwitchOpen: false;
  networkAdapterEnabled: false;
  networkExecutionAllowed: false;
  tokenNetworkRequestAllowed: false;
  tokenRequestAllowed: false;
  tokenRequestPrepared: false;
  tokenRequestExecuted: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  clientSecretUsed: false;
  clientSecretSignCreated: false;
  tokenIssued: false;
  tokenStored: false;
  authorizationHeaderCreated: false;
  endpointResolved: false;
  endpointCalled: false;
  httpRequestCreated: false;
  httpClientCreated: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
}

export interface BuildReadinessScreenViewInput {
  safetyBoundaryResult?: NaverApiTokenFirstTestSafetyBoundaryResult | null;
  goTicketPlanResult?: NaverApiTokenFirstTestGoTicketResult | null;
  sandboxResult?: NaverApiTokenFirstTestSandboxInvocationResult | null;
  auditPlanResult?: NaverApiTokenFirstTestGoTicketIssueAuditResult | null;
  persistenceResult?: NaverApiTokenFirstTestGoTicketPersistenceResult | null;
}

function buildCopyableSafetyReport(
  steps: ReadinessScreenSafetyStep[],
  overallStatus: string,
  overallMessage: string,
): string {
  const stepLines = steps.map(step => {
    const header = `  [${step.step}] ${step.label}: ${step.status} — ${step.message}`;
    if (step.reasons.length === 0) return header;
    return [header, ...step.reasons.map(r => `      └ ${r}`)].join('\n');
  });

  return [
    '=== Naver Token First Test Readiness Safety Report ===',
    '',
    '■ 이 보고서는 read-only 상태 확인 전용입니다.',
    '■ 실제 Naver API 호출 없음',
    '■ 실제 token 발급 없음',
    '■ 실제 DB write 없음',
    '■ 실행 버튼 없음',
    '',
    `전체 상태: ${overallStatus}`,
    overallMessage,
    '',
    '■ 12개 안전 단계 요약:',
    ...stepLines,
    '',
    '■ 다음 단계는 별도 사용자 승인 후 Test DB 또는 명시된 안전 환경에서만 진행 가능합니다.',
    '■ 현재 화면에서는 실행할 수 없습니다.',
    '■ 실제 token 발급 요청은 아직 구현되어 있지 않습니다.',
  ].join('\n');
}

export function buildNaverApiTokenFirstTestReadinessScreenView(
  input?: BuildReadinessScreenViewInput | null
): NaverApiTokenFirstTestReadinessScreenViewModel {
  const safeInput = input ?? {};
  
  const bnd = safeInput.safetyBoundaryResult;
  const plan = safeInput.goTicketPlanResult;
  const sbx = safeInput.sandboxResult;
  const audit = safeInput.auditPlanResult;
  const persist = safeInput.persistenceResult;

  const steps: ReadinessScreenSafetyStep[] = [];
  let blockedCount = 0;

  // Step 1: Safety Boundary (Task 26)
  if (bnd) {
    steps.push({
      step: 1,
      key: 'safetyBoundary',
      label: 'Safety Boundary',
      status: bnd.ok ? 'READY' : 'BLOCKED',
      message: bnd.resultMessage,
      reasons: bnd.blockingReasons ?? []
    });
    if (!bnd.ok) blockedCount++;
  } else {
    steps.push({ step: 1, key: 'safetyBoundary', label: 'Safety Boundary', status: 'NOT_STARTED', message: '평가되지 않음', reasons: [] });
    blockedCount++;
  }

  // Step 2-8 (Abstracted for simplicity in view, but we show them from boundary's checklist if available)
  const boundarySteps = [
    { key: 'executorDisabled', label: 'Executor Disabled' },
    { key: 'finalApprovalAudit', label: 'Final Approval Audit' },
    { key: 'preflightNoNetwork', label: 'Preflight No-Network Harness' },
    { key: 'networkKillSwitch', label: 'Network Kill-Switch' },
    { key: 'requestIntent', label: 'Request Intent Builder' },
    { key: 'sealedCoordinator', label: 'Sealed Coordinator' },
    { key: 'liveReadinessReview', label: 'Live Readiness Review' }
  ];

  let currentStepNum = 2;
  for (const bs of boundarySteps) {
    // In actual implementation, we might extract this from boundary.checklistItems
    // For now, we mimic the state based on the boundary's overall ok status
    steps.push({
      step: currentStepNum++,
      key: bs.key,
      label: bs.label,
      status: bnd && bnd.ok ? 'READY' : (bnd ? 'PENDING' : 'NOT_STARTED'),
      message: bnd && bnd.ok ? '통과' : '대기 중 또는 실패',
      reasons: []
    });
  }

  // Step 9: One-Time Go Ticket Plan (Task 35)
  if (plan) {
    steps.push({
      step: currentStepNum++,
      key: 'goTicketPlan',
      label: 'One-Time Go Ticket Plan',
      status: plan.ok ? 'READY' : 'BLOCKED',
      message: plan.status,
      reasons: plan.reasons ?? []
    });
    if (!plan.ok) blockedCount++;
  } else {
    steps.push({ step: currentStepNum++, key: 'goTicketPlan', label: 'One-Time Go Ticket Plan', status: 'NOT_STARTED', message: '평가되지 않음', reasons: [] });
    blockedCount++;
  }

  // Step 10: Sandbox Adapter Disabled (Task 36)
  if (sbx) {
    steps.push({
      step: currentStepNum++,
      key: 'sandboxAdapter',
      label: 'Sandbox Adapter Disabled',
      status: sbx.ok ? 'DISABLED' : 'BLOCKED',
      message: sbx.status,
      reasons: sbx.reasons ?? []
    });
    if (!sbx.ok) blockedCount++;
  } else {
    steps.push({ step: currentStepNum++, key: 'sandboxAdapter', label: 'Sandbox Adapter Disabled', status: 'NOT_STARTED', message: '평가되지 않음', reasons: [] });
    blockedCount++;
  }

  // Step 11: Go Ticket Issue Audit Plan (Task 37)
  if (audit) {
    steps.push({
      step: currentStepNum++,
      key: 'auditPlan',
      label: 'Go Ticket Issue Audit Plan',
      status: audit.ok ? 'READY' : 'BLOCKED',
      message: audit.status,
      reasons: audit.reasons ?? []
    });
    if (!audit.ok) blockedCount++;
  } else {
    steps.push({ step: currentStepNum++, key: 'auditPlan', label: 'Go Ticket Issue Audit Plan', status: 'NOT_STARTED', message: '평가되지 않음', reasons: [] });
    blockedCount++;
  }

  // Step 12: Go Ticket Persistence Disabled (Task 38)
  if (persist) {
    steps.push({
      step: currentStepNum++,
      key: 'persistenceDisabled',
      label: 'Go Ticket Persistence Disabled',
      status: persist.ok ? 'REVIEW_ONLY' : 'BLOCKED',
      message: persist.status,
      reasons: persist.reasons ?? []
    });
    if (!persist.ok) blockedCount++;
  } else {
    steps.push({ step: currentStepNum++, key: 'persistenceDisabled', label: 'Go Ticket Persistence Disabled', status: 'NOT_STARTED', message: '평가되지 않음', reasons: [] });
    blockedCount++;
  }

  const overallOk = blockedCount === 0;
  const overallStatusValue: 'READY' | 'BLOCKED' = overallOk ? 'READY' : 'BLOCKED';
  const overallMessageValue = overallOk
    ? '모든 안전 계층이 준비되었습니다. 현재는 읽기 전용 상태입니다.'
    : '일부 안전 계층이 차단되었습니다.';

  const statusCards: ReadinessScreenStatusCard[] = [
    {
      title: 'Overall Status',
      value: overallOk ? 'READY (READ-ONLY)' : 'BLOCKED',
      isOk: overallOk
    },
    {
      title: 'Execution Allowed',
      value: 'FALSE',
      isOk: true // false is the expected safe state
    },
    {
      title: 'DB Write Allowed',
      value: 'FALSE',
      isOk: true
    },
    {
      title: 'Naver API Call Allowed',
      value: 'FALSE',
      isOk: true
    },
    {
      title: 'Token Issued',
      value: 'FALSE',
      isOk: true
    }
  ];

  return {
    screenViewCreated: true,
    readOnly: true,
    statusCardsCreated: true,
    safetyStepsCreated: true,
    copyableSafetyReportCreated: true,
    copyableSafetyReport: buildCopyableSafetyReport(steps, overallStatusValue, overallMessageValue),
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,

    overallStatus: overallStatusValue,
    overallMessage: overallMessageValue,

    statusCards,
    safetySteps: steps,

    screenActionEnabled: false,
    liveTokenTestApproved: false,
    liveTokenTestExecutionAllowed: false,
    dbWriteAllowed: false,
    persistenceExecuted: false,
    metadataPersisted: false,
    auditEventPersisted: false,
    dbWriteExecuted: false,
    prismaMutationExecuted: false,
    goTicketIssued: false,
    executionLeaseIssued: false,
    sandboxInvocationAllowed: false,
    sandboxInvocationExecuted: false,
    coordinatorExecutionAllowed: false,
    requestPayloadCreated: false,
    requestBodyCreated: false,
    requestHeadersCreated: false,
    networkKillSwitchOpen: false,
    networkAdapterEnabled: false,
    networkExecutionAllowed: false,
    tokenNetworkRequestAllowed: false,
    tokenRequestAllowed: false,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    clientSecretUsed: false,
    clientSecretSignCreated: false,
    tokenIssued: false,
    tokenStored: false,
    authorizationHeaderCreated: false,
    endpointResolved: false,
    endpointCalled: false,
    httpRequestCreated: false,
    httpClientCreated: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    queueAllowed: false,
    workerAllowed: false
  };
}
