'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  CheckCircle2,
  ClipboardList,
  FileJson,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  X,
  Info,
  Lock,
  AlertCircle,
  AlertOctagon,
  FileText,
  Target,
  Maximize,
  FileCheck,
  ListChecks,
  Circle,
  Users,
} from 'lucide-react';
import type {
  SkuKeywordDraftBatchApproveRequest,
  SkuKeywordDraftBatchApproveResponse,
} from '@/src/types/sku-keyword-draft-preview.types';
import type { SkuKeywordFinalApprovalCreateRequest } from '@/src/types/sku-keyword-final-approval.types';
import { ManualApprovalChecklistPanel } from './ManualApprovalChecklistPanel';

type DraftBatchItem = {
  id: string;
  status: string;
  calculationType?: string;
  targetType?: string;
  targetId?: string;
  requestPayload?: unknown;
  candidateSummary?: {
    sku?: string;
    barcode?: string;
    productName?: string;
    keyword?: string;
    targetType?: string;
    changeType?: string;
  };
  dryRunSummary?: {
    riskLevel?: string;
    warnings?: string[];
    blockedReasons?: string[];
    before?: {
      price?: number | null;
      stock?: number | null;
    };
    after?: {
      price?: number | null;
      stock?: number | null;
    };
  };
};

type ExecutionMetadata = {
  executionMode?: string;
  actorId?: string;
  durationMs?: number;
  startedAt?: string;
  endedAt?: string;
  finalApprovalId?: string;
  recordedAt?: string;
  resultSummary?: {
    successCount: number;
    failedCount: number;
    skippedCount: number;
  };
};

type LivePreflightChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type LivePreflightSummary = {
  statusLabel: string;
  statusCode: string;
  naverApiCalled: boolean;
  naverApiCallAllowed: false;
  blockingCount: number;
  warningCount: number;
  passCount: number;
};

type LivePreflightResult = {
  ready: boolean;
  readinessCode: string;
  readinessMessage: string;
  checklistItems: LivePreflightChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  naverApiCallAllowed: false;
  naverApiCalled: boolean;
  summary: LivePreflightSummary;
};

type LiveSingleTestApprovalChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type LiveSingleTestApprovalSummary = {
  statusLabel: string;
  approvalCode: string;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  blockingCount: number;
  warningCount: number;
  passCount: number;
  acknowledgedCount: number;
  totalRequiredAcknowledgements: number;
  missingAcknowledgements: string[];
};

type TargetProductSummary = {
  itemId: string;
  targetType?: string | null;
  targetId?: string | null;
  channelProductNo?: string | null;
  productName?: string | null;
  skuCode?: string | null;
  changeType?: string | null;
  priceChange?: { before: unknown; after: unknown } | null;
  stockChange?: { before: unknown; after: unknown } | null;
};

type LiveSingleTestApprovalResult = {
  approvalReady: boolean;
  approvalCode: string;
  approvalMessage: string;
  checklistItems: LiveSingleTestApprovalChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  requiredAcknowledgements: string[];
  acknowledgedCount: number;
  missingAcknowledgements: string[];
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  maxAllowedState: string;
  summary: LiveSingleTestApprovalSummary;
  targetProductSummary?: TargetProductSummary | null;
};

type EnvironmentSafetyChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type EnvironmentSafetyResult = {
  allowed: boolean;
  environmentCode: string;
  environmentMessage: string;
  databaseEnvironment: 'local' | 'test' | 'unknown' | 'operating_blocked';
  redisEnvironment: 'local' | 'test' | 'unknown' | 'operating_blocked';
  naverApiCallAllowed: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  checklistItems: EnvironmentSafetyChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  sanitized: true;
};

type AuditHistoryItemStatus = 'RECORDED_BUT_NOT_EXECUTABLE' | 'UNKNOWN';

type LiveSingleTestAuditHistoryItem = {
  id: string;
  batchJobId: string;
  finalApprovalId: string | null;
  auditCode: string;
  status: AuditHistoryItemStatus;
  recordedAt: string | null;
  actorId: string | null;
  acknowledgedItems: string[];
  missingAcknowledgements: string[];
  targetProductSummary: Record<string, unknown> | null;
  safePayloadSummary: Record<string, unknown> | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
};

type LiveSingleTestAuditHistorySummary = {
  totalRecords: number;
  hasAuditRecord: boolean;
  latestAuditCode: string | null;
  latestRecordedAt: string | null;
  latestActorId: string | null;
  latestStatus: AuditHistoryItemStatus | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
};

type LiveSingleTestAuditHistoryResult = {
  exists: boolean;
  latestAudit: LiveSingleTestAuditHistoryItem | null;
  summary: LiveSingleTestAuditHistorySummary;
  blockingReasons: string[];
  warnings: string[];
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
  maxAllowedState: string;
};

type LiveSingleTestApprovalAuditTargetSummary = {
  itemId?: string | null;
  targetType?: string | null;
  targetId?: string | null;
  channelProductNo?: string | null;
  productName?: string | null;
  skuCode?: string | null;
  changeType?: string | null;
};

type LiveSingleTestApprovalAuditPayloadSummary = {
  changeType?: string | null;
  riskLevel?: string | null;
};

type LiveSingleTestApprovalAuditRecord = {
  auditCode: string;
  auditStatus: string;
  auditMessage: string;
  finalApprovalId?: string | null;
  batchJobId?: string | null;
  actorId?: string | null;
  acknowledgedItems: string[];
  missingAcknowledgements: string[];
  warnings: string[];
  targetProductSummary?: LiveSingleTestApprovalAuditTargetSummary | null;
  safePayloadSummary?: LiveSingleTestApprovalAuditPayloadSummary | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  maxAllowedState: string;
  recordedAt: string;
};

type LiveAdapterSkeletonStatus = {
  ok: false;
  success: false;
  exists: true;
  status: 'DISABLED' | 'NOT_IMPLEMENTED';
  resultCode: string;
  resultMessage: string;
  naverApiCalled: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  httpRequestCreated: false;
  endpointCalled: false;
  accessTokenRequested: false;
  credentialsUsed: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  maxAllowedState: string;
  sanitized: true;
};

type NaverAuthConfigChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type NaverAuthConfigSafety = {
  credentialConfigured: boolean;
  authConfigUsable: false;
  authConfigStatus: 'CONFIGURED_BUT_BLOCKED' | 'MISSING' | 'PARTIAL' | 'BLOCKED' | 'UNKNOWN';
  clientIdStatus: 'configured' | 'missing' | 'blocked' | 'unknown';
  clientSecretStatus: 'configured' | 'missing' | 'blocked' | 'unknown';
  tokenStatus: 'disabled';
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  accessTokenRequested: false;
  credentialsUsed: false;
  tokenIssued: false;
  authorizationHeaderCreated: false;
  endpointCalled: false;
  secretVisible: false;
  sanitized: true;
  checklistItems: NaverAuthConfigChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  maxAllowedState: 'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED';
};

type NaverAuthTokenProviderChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type NaverAuthTokenProviderStatus = {
  status: 'DISABLED';
  resultCode: 'NAVER_AUTH_TOKEN_REQUEST_DISABLED';
  resultMessage: string;
  tokenStatus: 'disabled';
  authConfigUsable: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  tokenIssued: false;
  tokenStored: false;
  authorizationHeaderCreated: false;
  httpRequestCreated: false;
  endpointCalled: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  secretVisible: false;
  tokenVisible: false;
  sanitized: true;
  checklistItems: NaverAuthTokenProviderChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  maxAllowedState: 'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED';
};

type NaverAuthTokenDryPermissionGateChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type NaverAuthTokenDryPermissionGate = {
  ok: boolean;
  allowed: false;
  status: 'BLOCKED' | 'DISABLED' | 'NEEDS_REVIEW';
  resultCode: string;
  resultMessage: string;
  dryCheckPassed: boolean;
  tokenRequestAllowed: false;
  tokenStatus: 'disabled';
  authConfigUsable: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  httpRequestCreated: false;
  endpointCalled: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  tokenIssued: false;
  tokenStored: false;
  authorizationHeaderCreated: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  secretVisible: false;
  tokenVisible: false;
  sanitized: true;
  checklistItems: NaverAuthTokenDryPermissionGateChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  needsReviewReasons: string[];
  maxAllowedState: 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED';
};

type NaverAuthTokenTestOnlySkeletonChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type NaverAuthTokenTestOnlySkeleton = {
  ok: false;
  success: false;
  status: 'DISABLED' | 'NOT_EXECUTED';
  resultCode: string;
  resultMessage: string;
  testOnlyMode: true;
  tokenRequestPrepared: false;
  tokenRequestExecuted: false;
  tokenRequestAllowed: false;
  tokenStatus: 'disabled' | 'not_requested';
  authConfigUsable: false;
  dryPermissionPassed: boolean;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  tokenIssued: false;
  tokenStored: false;
  authorizationHeaderCreated: false;
  endpointResolved: false;
  endpointCalled: false;
  httpRequestCreated: false;
  httpClientCreated: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  secretVisible: false;
  tokenVisible: false;
  endpointVisible: false;
  sanitized: true;
  checklistItems: NaverAuthTokenTestOnlySkeletonChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  needsReviewReasons: string[];
  maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED';
};

// Token Test Approval Audit 기록 타입
type NaverAuthTokenTestApprovalAuditRecord = {
  hasAudit: true;
  auditCode: string;
  recordedAt: string;
  recordedBy: string | null;
  approvalPurpose: string;
  acknowledgedItems: string[];
  maxAllowedState: string;
  tokenRequestAllowed: false;
  accessTokenRequested: false;
  tokenIssued: false;
  endpointCalled: false;
  httpClientCreated: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  sanitized: true;
};

type NaverAuthTokenTestApprovalAuditField =
  | NaverAuthTokenTestApprovalAuditRecord
  | { hasAudit: false };

type DraftBatchJob = {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
  successItems: number;
  failedItems: number;
  skippedItems: number;
  executedAt: string | null;
  executionMetadata: ExecutionMetadata | null;
  items: DraftBatchItem[];
  livePreflight?: LivePreflightResult | null;
  liveSingleTestApproval?: LiveSingleTestApprovalResult | null;
  liveSingleTestApprovalAudit?: LiveSingleTestApprovalAuditRecord | null;
  liveSingleTestAuditHistory?: LiveSingleTestAuditHistoryResult | null;
  environmentSafety?: EnvironmentSafetyResult | null;
  liveAdapterSkeletonStatus?: LiveAdapterSkeletonStatus | null;
  naverAuthConfigSafety?: NaverAuthConfigSafety;
  naverAuthTokenProviderStatus?: NaverAuthTokenProviderStatus | null;
  naverAuthTokenDryPermissionGate?: NaverAuthTokenDryPermissionGate | null;
  naverAuthTokenTestOnlySkeletonStatus?: NaverAuthTokenTestOnlySkeleton | null;
  naverAuthTokenTestApprovalAudit?: NaverAuthTokenTestApprovalAuditField | null;
  naverAuthTokenFirstTestSafetyBoundary?: {
    ok: boolean;
    readyForExplicitTokenTestApproval: boolean;
    allowed: false;
    status: 'BLOCKED' | 'READY_BUT_DISABLED' | 'NEEDS_REVIEW';
    resultCode: string;
    resultMessage: string;
    tokenTestApprovalPresent: boolean;
    tokenTestApprovalComplete: boolean;
    allPreconditionsPassed: boolean;
    tokenRequestAllowed: false;
    tokenRequestPrepared: false;
    tokenRequestExecuted: false;
    accessTokenRequested: false;
    refreshTokenRequested: false;
    credentialsUsed: false;
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
    secretVisible: false;
    tokenVisible: false;
    endpointVisible: false;
    sanitized: true;
    checklistItems: Array<{
      key: string;
      label: string;
      status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
      message: string;
    }>;
    blockingReasons: string[];
    warnings: string[];
    needsReviewReasons: string[];
    maxAllowedState: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE';
  } | null;
  naverAuthTokenFirstTestFinalApprovalAudit?: {
    approvalRecorded: boolean;
    approvalRecordedAt?: string;
    approvalScope: string;
    approvedByRole: string;
    acknowledgementVersion: string;
    acknowledgementCount: number;
    approvedAcknowledgementKeys: string[];
    safetyBoundaryStatus: string;
    executorStatus: string;
    tokenRequestAllowed: false;
    executorArmed: false;
    tokenRequestPrepared: false;
    tokenRequestExecuted: false;
    accessTokenRequested: false;
    refreshTokenRequested: false;
    credentialsUsed: false;
    clientSecretUsed: false;
    clientSecretSignCreated: false;
    naverApiCallAllowed: false;
    endpointResolved: false;
    endpointCalled: false;
    httpRequestCreated: false;
    httpClientCreated: false;
    authorizationHeaderCreated: false;
    tokenIssued: false;
    tokenStored: false;
    queueAllowed: false;
    workerAllowed: false;
    liveExecutionEnabled: false;
  } | null;
  naverAuthTokenFirstTestReadinessScreen?: {
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

    statusCards: Array<{
      title: string;
      value: string;
      isOk: boolean;
    }>;
    safetySteps: Array<{
      step: number;
      key: string;
      label: string;
      status: 'READY' | 'BLOCKED' | 'DISABLED' | 'REVIEW_ONLY' | 'NOT_STARTED' | 'PENDING';
      message: string;
      reasons: string[];
    }>;

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
  } | null;
  naverAuthTokenFirstTestFinalConfirmationGateScreen?: {
    finalConfirmationGateCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    checklistCreated: boolean;
    safetySummaryCreated: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    title: string;
    description: string;
    warningMessage: string;
    checklist: Array<{ id: number; message: string; }>;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestActionLockScreen?: {
    actionLockViewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    actionLocked: boolean;
    lockReasonsCreated: boolean;
    safetySummaryCreated: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    title: string;
    description: string;
    warningMessage: string;
    lockReasons: Array<{ id: number; message: string; }>;
    actionButtonRendered: false;
    actionButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSafetyReviewScreen?: {
    safetyReviewViewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    reviewItemsCreated: boolean;
    safetySummaryCreated: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    title: string;
    description: string;
    warningMessage: string;
    reviewItems: Array<{ id: number; message: string; }>;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSafeNextStepGuideScreen?: {
    safeNextStepGuideViewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    completedStepsCreated: boolean;
    pendingApprovalItemsCreated: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    title: string;
    description: string;
    currentPhaseLabel: string;
    tokenTestExecutionAllowedYet: boolean;
    blockedReason: string;
    completedSteps: Array<{ step: number; label: string; statusLabel: string; }>;
    pendingApprovalItems: Array<{ id: number; approvalKey: string; description: string; }>;
    nextPhaseLabel: string;
    nextPhaseGuide: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSeparateApprovalPacketScreen?: {
    approvalPacketViewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    riskScopeItemsCreated: boolean;
    approverChecklistCreated: boolean;
    prohibitedItemsCreated: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    title: string;
    description: string;
    currentLockStatus: string;
    tokenTestNotAllowedReason: string;
    riskScopeItems: Array<{ id: number; riskKey: string; description: string; }>;
    approverChecklist: Array<{ id: number; checkKey: string; description: string; }>;
    prohibitedItems: Array<{ id: number; prohibitedKey: string; description: string; }>;
    approvalNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestApprovalEvidenceTimelineScreen?: {
    evidenceTimelineViewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    allStepsTracked: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    description: string;
    overallLockStatus: string;
    tokenTestBlockedReason: string;
    timelineSteps: Array<{
      id: number;
      stepKey: string;
      stepName: string;
      currentStatus: string;
      confirmedSafetyConditions: string[];
      stillLockedConditions: string[];
    }>;
    approvalNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestApprovalConsoleScreen?: {
    approvalConsoleViewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    allPriorStepsCompletedAsReadOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    consoleReadyForApproverReview: boolean;
    title: string;
    description: string;
    currentPhaseLabel: string;
    overallStatus: string;
    summaryItems: Array<{ id: number; itemKey: string; label: string; currentValue: string; }>;
    completedFlowSteps: Array<{ id: number; stepKey: string; stepLabel: string; completedAsReadOnly: boolean; }>;
    nextRequiredAction: string;
    approvalNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestReviewHubNavigationScreen?: {
    reviewHubNavigationViewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    allPanelsIndexed: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    description: string;
    totalPanelCount: number;
    navigationEntries: Array<{
      id: number;
      stepNumber: number;
      stepKey: string;
      stepName: string;
      currentStatus: string;
      panelDescription: string;
      executionAllowed: false;
    }>;
    hubNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestReviewSectionLayoutScreen?: {
    reviewSectionLayoutCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    sectionIsReviewOnly: boolean;
    allSectionsReadOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    sectionAreaLabel: string;
    sectionAreaDescription: string;
    notExecutionAreaWarning: string;
    sectionEntries: Array<{
      id: number;
      sectionOrder: number;
      sectionKey: string;
      sectionLabel: string;
      sectionDescription: string;
      isReadOnly: boolean;
      isExecutionSection: false;
    }>;
    layoutNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSeparateApprovalRequestDraftScreen?: {
    approvalRequestDraftCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    draftIsReadOnly: boolean;
    approvalNotYetRequested: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    draftLabel: string;
    draftPurpose: string;
    currentStatusSummary: string;
    whyNotAllowedYet: string;
    approvalRequestSections: Array<{
      id: number;
      sectionKey: string;
      sectionTitle: string;
      sectionContent: string;
      isReadOnly: boolean;
      isSubmittable: false;
    }>;
    stillProhibitedItems: string[];
    draftNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestApprovalReadinessChecklistScreen?: {
    approvalReadinessChecklistCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    checklistIsReadOnly: boolean;
    allItemsReadOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    checklistLabel: string;
    checklistDescription: string;
    checklistItems: Array<{
      id: number;
      checkKey: string;
      checkLabel: string;
      checkStatus: 'CONFIRMED' | 'LOCKED' | 'PENDING';
      checkDetail: string;
      isReadOnly: boolean;
      isCheckable: false;
    }>;
    checklistNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestApprovalDecisionSummaryScreen?: {
    approvalDecisionSummaryCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    summaryIsReadOnly: boolean;
    currentDecisionIsNotAllowed: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    summaryLabel: string;
    currentDecision: string;
    currentPhase: string;
    reviewedPanelCount: number;
    allPanelsReadOnly: boolean;
    decisionItems: Array<{
      id: number;
      itemKey: string;
      itemLabel: string;
      currentState: string;
      isReadOnly: boolean;
      isDecisionEditable: false;
    }>;
    summaryNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSeparateApprovalBoundaryScreen?: {
    approvalBoundaryCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    boundaryIsReadOnly: boolean;
    currentScreenIsReviewOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    boundaryLabel: string;
    currentScreenNote: string;
    afterApprovalNote: string;
    allowedZoneTitle: string;
    allowedItems: Array<{
      id: number;
      itemKey: string;
      itemLabel: string;
      itemDetail: string;
      isReadOnly: boolean;
      isActionable: false;
    }>;
    prohibitedZoneTitle: string;
    prohibitedItems: Array<{
      id: number;
      itemKey: string;
      itemLabel: string;
      itemDetail: string;
      isReadOnly: boolean;
      isActionable: false;
    }>;
    boundaryNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestApprovalHandoffSummaryScreen?: {
    handoffSummaryCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    handoffIsReadOnly: boolean;
    currentScreenIsReviewOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    handoffLabel: string;
    handoffNote: string;
    currentConclusion: string;
    currentPhase: string;
    reviewedFlowCount: number;
    currentAllowedSummary: string;
    currentProhibitedSummary: string;
    summaryItems: Array<{
      id: number;
      itemKey: string;
      itemLabel: string;
      itemValue: string;
      isReadOnly: boolean;
      isEditable: false;
    }>;
    nextActionItems: Array<{
      id: number;
      checkKey: string;
      checkLabel: string;
      checkDetail: string;
      isReadOnly: boolean;
      isCheckable: false;
    }>;
    absoluteProhibitionItems: Array<{
      id: number;
      prohibitionKey: string;
      prohibitionLabel: string;
      prohibitionDetail: string;
      isReadOnly: boolean;
      isReleasable: false;
    }>;
    handoffSummaryNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestApprovalHandoffVerificationScreen?: {
    handoffVerificationCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    handoffIsReadOnly: boolean;
    verificationIsReadOnly: boolean;
    currentScreenIsReviewOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    verificationLabel: string;
    verificationNote: string;
    currentConclusion: string;
    currentPhase: string;
    verifiedFlowCount: number;
    currentAllowedSummary: string;
    currentProhibitedSummary: string;
    verificationItems: Array<{
      id: number;
      verificationKey: string;
      verificationLabel: string;
      verificationValue: string;
      isReadOnly: boolean;
      isVerifiable: false;
    }>;
    verificationCheckItems: Array<{
      id: number;
      checkKey: string;
      checkLabel: string;
      checkDetail: string;
      isReadOnly: boolean;
      isCheckable: false;
    }>;
    handoffVerificationNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    verificationSaveButtonRendered: false;
    verificationSaveButtonEnabled: false;
    verificationConfirmButtonRendered: false;
    verificationConfirmButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestManualApprovalChecklistAlignmentScreen?: {
    checklistAlignmentCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    alignmentIsReadOnly: boolean;
    checklistIsExecution: boolean;
    currentScreenIsReviewOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    alignmentLabel: string;
    alignmentNote: string;
    currentPhase: string;
    nextStepContext: string;
    alignmentItems: Array<{
      id: number;
      alignmentKey: string;
      alignmentLabel: string;
      alignmentValue: string;
      isReadOnly: boolean;
      isExecutable: false;
    }>;
    checklistClarificationItems: Array<{
      id: number;
      clarificationKey: string;
      clarificationLabel: string;
      clarificationDetail: string;
      isReadOnly: boolean;
      isExecutable: false;
    }>;
    alignmentSummaryNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    verificationSaveButtonRendered: false;
    verificationSaveButtonEnabled: false;
    verificationConfirmButtonRendered: false;
    verificationConfirmButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestManualApprovalFinalSealScreen?: {
    finalSealCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    sealIsReadOnly: boolean;
    checklistIsExecution: boolean;
    currentScreenIsReviewOnly: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    title: string;
    sealStatusLabel: string;
    sealStatusNote: string;
    currentPhase: string;
    nextStepContext: string;
    sealItems: Array<{
      id: number;
      sealKey: string;
      sealLabel: string;
      sealValue: string;
      isReadOnly: boolean;
      isExecutable: false;
    }>;
    sealClarificationItems: Array<{
      id: number;
      clarificationKey: string;
      clarificationLabel: string;
      clarificationDetail: string;
      isReadOnly: boolean;
      isExecutable: false;
    }>;
    sealSummaryNote: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    verificationSaveButtonRendered: false;
    verificationSaveButtonEnabled: false;
    verificationConfirmButtonRendered: false;
    verificationConfirmButtonEnabled: false;
    finalSealSaveButtonRendered: false;
    finalSealSaveButtonEnabled: false;
    finalSealConfirmButtonRendered: false;
    finalSealConfirmButtonEnabled: false;
    finalSealReleaseButtonRendered: false;
    finalSealReleaseButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestReadOnlyPhaseClosureSummaryScreen?: {
    readOnlyPhaseClosureSummaryCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    screenTitle: string;
    phaseName: string;
    phaseStatus: string;
    reviewedFlowCount: number;
    auditTargetCommit: string;
    auditResultCommit: string;
    allScreensReadOnly: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;
    task58BulkAddAuditCompleted: boolean;
    nextStepLabel: string;
    closureSummaryItems: Array<{
      id: number;
      label: string;
      value: string;
      isReadOnly: boolean;
    }>;
    stillForbiddenItems: Array<{
      id: number;
      label: string;
      value: string;
      isReadOnly: boolean;
    }>;
    completedPhaseItems: Array<{
      id: number;
      label: string;
      value: string;
      isReadOnly: boolean;
    }>;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    verificationSaveButtonRendered: false;
    verificationSaveButtonEnabled: false;
    verificationConfirmButtonRendered: false;
    verificationConfirmButtonEnabled: false;
    finalSealSaveButtonRendered: false;
    finalSealSaveButtonEnabled: false;
    finalSealConfirmButtonRendered: false;
    finalSealConfirmButtonEnabled: false;
    finalSealReleaseButtonRendered: false;
    finalSealReleaseButtonEnabled: false;
    closureSaveButtonRendered: false;
    closureSaveButtonEnabled: false;
    closureConfirmButtonRendered: false;
    closureConfirmButtonEnabled: false;
    closureReleaseButtonRendered: false;
    closureReleaseButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSeparateApprovalCriteriaReviewScreen?: {
    criteriaReviewCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    manualReviewRequired: boolean;
    requiresSeparateLiveApproval: boolean;
    tokenTestStillNotAllowed: boolean;
    screenTitle: string;
    reviewPurpose: string;
    criteriaLabel: string;
    safetyFirstPrinciple: string;
    criteriaItems: Array<{
      id: number;
      criteriaKey: string;
      criteriaLabel: string;
      criteriaDetail: string;
      isReadOnly: boolean;
    }>;
    prohibitedActionsLabel: string;
    prohibitedActionItems: Array<{
      id: number;
      prohibitedKey: string;
      prohibitedLabel: string;
      prohibitedDetail: string;
      isReadOnly: boolean;
    }>;
    reviewSummaryNote: string;
    nextStepLabel: string;
    nextStepContext: string;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    verificationSaveButtonRendered: false;
    verificationSaveButtonEnabled: false;
    verificationConfirmButtonRendered: false;
    verificationConfirmButtonEnabled: false;
    finalSealSaveButtonRendered: false;
    finalSealSaveButtonEnabled: false;
    finalSealConfirmButtonRendered: false;
    finalSealConfirmButtonEnabled: false;
    finalSealReleaseButtonRendered: false;
    finalSealReleaseButtonEnabled: false;
    closureSaveButtonRendered: false;
    closureSaveButtonEnabled: false;
    closureConfirmButtonRendered: false;
    closureConfirmButtonEnabled: false;
    closureReleaseButtonRendered: false;
    closureReleaseButtonEnabled: false;
    criteriaReviewSaveButtonRendered: false;
    criteriaReviewSaveButtonEnabled: false;
    criteriaReviewConfirmButtonRendered: false;
    criteriaReviewConfirmButtonEnabled: false;
    criteriaReviewReleaseButtonRendered: false;
    criteriaReviewReleaseButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSeparateApprovalCriteriaGapAnalysisScreen?: {
    gapAnalysisCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    criteriaReviewCompleted: boolean;
    criteriaGapAnalysisOnly: boolean;
    separateApprovalStillRequired: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;

    screenTitle: string;
    gapAnalysisPhaseName: string;
    gapAnalysisStatus: string;
    criteriaReviewCommit: string;
    criteriaRecoveryCommit: string;

    satisfiedCriteriaItems: Array<{
      id: number;
      criteriaKey: string;
      criteriaLabel: string;
      criteriaDetail: string;
      isSatisfied: boolean;
    }>;
    unsatisfiedCriteriaItems: Array<{
      id: number;
      criteriaKey: string;
      criteriaLabel: string;
      criteriaDetail: string;
      isSatisfied: boolean;
    }>;
    blockingGapItems: Array<{
      id: number;
      gapKey: string;
      gapLabel: string;
      gapDetail: string;
    }>;
    nextReviewItems: Array<{
      id: number;
      reviewKey: string;
      reviewLabel: string;
      reviewDetail: string;
    }>;
    stillForbiddenItems: Array<{
      id: number;
      forbiddenKey: string;
      forbiddenLabel: string;
      forbiddenDetail: string;
    }>;

    nextStepLabel: string;

    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    verificationSaveButtonRendered: false;
    verificationSaveButtonEnabled: false;
    verificationConfirmButtonRendered: false;
    verificationConfirmButtonEnabled: false;
    finalSealSaveButtonRendered: false;
    finalSealSaveButtonEnabled: false;
    finalSealConfirmButtonRendered: false;
    finalSealConfirmButtonEnabled: false;
    finalSealReleaseButtonRendered: false;
    finalSealReleaseButtonEnabled: false;
    closureSaveButtonRendered: false;
    closureSaveButtonEnabled: false;
    closureConfirmButtonRendered: false;
    closureConfirmButtonEnabled: false;
    closureReleaseButtonRendered: false;
    closureReleaseButtonEnabled: false;
    criteriaReviewSaveButtonRendered: false;
    criteriaReviewSaveButtonEnabled: false;
    criteriaReviewConfirmButtonRendered: false;
    criteriaReviewConfirmButtonEnabled: false;
    criteriaReviewReleaseButtonRendered: false;
    criteriaReviewReleaseButtonEnabled: false;
    gapAnalysisSaveButtonRendered: false;
    gapAnalysisSaveButtonEnabled: false;
    gapAnalysisConfirmButtonRendered: false;
    gapAnalysisConfirmButtonEnabled: false;
    gapAnalysisReleaseButtonRendered: false;
    gapAnalysisReleaseButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
    workerAllowed: false;
  } | null;
  naverAuthTokenFirstTestSeparateApprovalRiskMatrixScreen?: {
    riskMatrixCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    criteriaReviewCompleted: boolean;
    riskMatrixReviewOnly: boolean;
    separateApprovalStillRequired: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;

    screenTitle: string;
    riskMatrixPhaseName: string;
    riskMatrixStatus: string;
    criteriaGapAnalysisCommit: string;

    highRiskItems: Array<{
      id: number;
      riskKey: string;
      riskLabel: string;
      riskStatus: string;
      blockingReason: string;
      mitigationCondition: string;
    }>;
    mediumRiskItems: Array<{
      id: number;
      riskKey: string;
      riskLabel: string;
      riskStatus: string;
      blockingReason: string;
      mitigationCondition: string;
    }>;
    lowRiskItems: Array<{
      id: number;
      riskKey: string;
      riskLabel: string;
      riskStatus: string;
      blockingReason: string;
      mitigationCondition: string;
    }>;

    stillForbiddenItems: Array<{
      id: number;
      forbiddenKey: string;
      forbiddenLabel: string;
      forbiddenDetail: string;
    }>;

    nextStepLabel: string;

    executionButtonRendered: false;
    executionButtonEnabled: false;
    approvalButtonRendered: false;
    approvalButtonEnabled: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    checklistSaveButtonRendered: false;
    checklistSaveButtonEnabled: false;
    decisionSaveButtonRendered: false;
    decisionSaveButtonEnabled: false;
    boundaryReleaseButtonRendered: false;
    boundaryReleaseButtonEnabled: false;
    handoffSaveButtonRendered: false;
    handoffSaveButtonEnabled: false;
    handoffCopyButtonRendered: false;
    handoffCopyButtonEnabled: false;
    handoffSendButtonRendered: false;
    handoffSendButtonEnabled: false;
    verificationSaveButtonRendered: false;
    verificationSaveButtonEnabled: false;
    verificationConfirmButtonRendered: false;
    verificationConfirmButtonEnabled: false;
    finalSealSaveButtonRendered: false;
    finalSealSaveButtonEnabled: false;
    finalSealConfirmButtonRendered: false;
    finalSealConfirmButtonEnabled: false;
    finalSealReleaseButtonRendered: false;
    finalSealReleaseButtonEnabled: false;
    closureSaveButtonRendered: false;
    closureSaveButtonEnabled: false;
    closureConfirmButtonRendered: false;
    closureConfirmButtonEnabled: false;
    closureReleaseButtonRendered: false;
    closureReleaseButtonEnabled: false;
    criteriaReviewSaveButtonRendered: false;
    criteriaReviewSaveButtonEnabled: false;
    criteriaReviewConfirmButtonRendered: false;
    criteriaReviewConfirmButtonEnabled: false;
    criteriaReviewReleaseButtonRendered: false;
    criteriaReviewReleaseButtonEnabled: false;
    gapAnalysisSaveButtonRendered: false;
    gapAnalysisSaveButtonEnabled: false;
    gapAnalysisConfirmButtonRendered: false;
    gapAnalysisConfirmButtonEnabled: false;
    gapAnalysisReleaseButtonRendered: false;
    gapAnalysisReleaseButtonEnabled: false;
    riskMatrixSaveButtonRendered: false;
    riskMatrixSaveButtonEnabled: false;
    riskMatrixConfirmButtonRendered: false;
    riskMatrixConfirmButtonEnabled: false;
    riskMatrixReleaseButtonRendered: false;
    riskMatrixReleaseButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    finalConfirmationPersisted: false;
    finalConfirmationDbWriteExecuted: false;
    finalConfirmationActionEnabled: false;
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
  } | null;
  naverAuthTokenFirstTestSeparateApprovalRiskMitigationPlanScreen?: {
    mitigationPlanCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    riskMatrixCompleted: boolean;
    mitigationPlanReviewOnly: boolean;
    executionStillForbidden: boolean;
    screenTitle: string;
    mitigationPlanPhaseName: string;
    mitigationPlanStatus: string;
    highRiskMitigationItems: any[];
    mediumRiskMitigationItems: any[];
    lowRiskMitigationItems: any[];
    postMitigationStillForbiddenItems: any[];
    stillBlockingItems: any[];
    nextStepLabel: string;
  } | null;
  naverAuthTokenFirstTestSeparateApprovalFinalBlockerSummaryScreen?: {
    finalBlockerSummaryCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    riskMitigationPlanCompleted: boolean;
    finalBlockerReviewOnly: boolean;
    separateApprovalStillRequired: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;
    screenTitle: string;
    finalBlockerPhaseName: string;
    finalBlockerStatus: string;
    riskMitigationPlanCommit: string;
    finalBlockerItems: any[];
    unresolvedBlockerItems: any[];
    stillForbiddenItems: any[];
    releaseRequirementItems: any[];
    nextStepLabel: string;
  } | null;
  naverAuthTokenFirstTestSeparateApprovalRequestPacketScreen?: {
    requestPacketCreated: boolean;
    displayOnly: boolean;
    readOnly: boolean;
    executionLocked: boolean;
    finalBlockerSummaryCompleted: boolean;
    requestPacketReviewOnly: boolean;
    separateApprovalStillRequired: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;
    screenTitle: string;
    requestPacketPhaseName: string;
    requestPacketStatus: string;
    finalBlockerSummaryCommit: string;
    approvalRequestSubmitted: boolean;
    approvalRequestSubmitButtonRendered: boolean;
    approvalRequestSubmitButtonEnabled: boolean;
    requestPurposeItems: any[];
    requestScopeItems: any[];
    evidencePacketItems: any[];
    preSubmissionCheckItems: any[];
    stillForbiddenItems: any[];
    nextStepLabel: string;
  } | null;
  naverAuthTokenFirstTestSeparateApprovalPreSubmissionReviewScreen?: {
    preSubmissionReviewOnly: boolean;
    separateApprovalStillRequired: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;
    screenTitle: string;
    preSubmissionPhaseName: string;
    preSubmissionStatus: string;
    requestPacketCommit: string;
    approvalRequestSubmitted: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    packetReviewItems: any[];
    missingBeforeSubmissionItems: any[];
    misunderstandingPreventionItems: any[];
    riskRecheckItems: any[];
    stillForbiddenItems: any[];
    nextStepLabel: string;
    preSubmissionConfirmButtonRendered: false;
    preSubmissionConfirmButtonEnabled: false;
    requestPacketSubmitButtonRendered: false;
    requestPacketSubmitButtonEnabled: false;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    dbWriteAllowed: false;
    naverApiCallAllowed: false;
    tokenRequestAllowed: false;
    accessTokenRequested: false;
    tokenIssued: false;
    liveExecutionEnabled: false;
    queueAllowed: false;
    workerAllowed: false;
  } | null;
  naverAuthTokenFirstTestSeparateApprovalSubmissionReadinessDecisionScreen?: {
    submissionDecisionReviewOnly: boolean;
    separateApprovalStillRequired: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;
    screenTitle: string;
    submissionDecisionPhaseName: string;
    submissionDecisionStatus: string;
    preSubmissionReviewCommit: string;
    approvalRequestSubmitted: false;
    approvalRequestSubmissionAllowed: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    readinessDecisionItems: any[];
    submissionBlockedReasonItems: any[];
    unresolvedBeforeSubmissionItems: any[];
    postSubmissionStillForbiddenItems: any[];
    nextStepLabel: string;
    submissionReadinessDecisionSaveButtonRendered: false;
    submissionReadinessDecisionSaveButtonEnabled: false;
    submissionReadinessDecisionConfirmButtonRendered: false;
    submissionReadinessDecisionConfirmButtonEnabled: false;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    dbWriteAllowed: false;
    naverApiCallAllowed: false;
    tokenRequestAllowed: false;
    accessTokenRequested: false;
    tokenIssued: false;
    liveExecutionEnabled: false;
    queueAllowed: false;
    workerAllowed: false;
  } | null;
  naverAuthTokenFirstTestSeparateApprovalSubmissionDecisionSealScreen?: {
    submissionDecisionSealReviewOnly: boolean;
    separateApprovalStillRequired: boolean;
    executionStillForbidden: boolean;
    tokenRequestStillForbidden: boolean;
    naverApiCallStillForbidden: boolean;
    operatingDbWriteStillForbidden: boolean;
    priceStockChangeStillForbidden: boolean;
    queueWorkerStillDisconnected: boolean;
    postApiStillNotAdded: boolean;
    screenTitle: string;
    submissionDecisionSealPhaseName: string;
    submissionDecisionSealStatus: string;
    submissionReadinessDecisionCommit: string;
    approvalRequestSubmitted: false;
    approvalRequestSubmissionAllowed: false;
    approvalRequestSubmitButtonRendered: false;
    approvalRequestSubmitButtonEnabled: false;
    decisionSealItems: any[];
    submissionStillBlockedItems: any[];
    executionStillForbiddenItems: any[];
    nextStepItems: any[];
    stillForbiddenItems: any[];
    nextStepLabel: string;
    submissionDecisionSealSaveButtonRendered: false;
    submissionDecisionSealSaveButtonEnabled: false;
    submissionDecisionSealConfirmButtonRendered: false;
    submissionDecisionSealConfirmButtonEnabled: false;
    executionButtonRendered: false;
    executionButtonEnabled: false;
    formRendered: false;
    formSubmitEnabled: false;
    postApiEnabled: false;
    dbWriteAllowed: false;
    naverApiCallAllowed: false;
    tokenRequestAllowed: false;
    accessTokenRequested: false;
    tokenIssued: false;
    liveExecutionEnabled: false;
    queueAllowed: false;
    workerAllowed: false;
  } | null;
  tokenFirstTestSeparateApprovalFinalClosureGateView?: {
    title: string;
    statusLabel: string;
    statusTone: 'locked' | 'blocked' | 'review_only';
    summary: string;
    task71Commit: string;
    finalClosureGateItems: Array<{ label: string; value: string; tone: 'safe' | 'warning' | 'blocked' | 'neutral'; }>;
    readOnlyClosureChecks: Array<{ label: string; value: string; tone: 'safe' | 'warning' | 'blocked' | 'neutral'; }>;
    releaseBlockedReasons: Array<{ label: string; value: string; tone: 'safe' | 'warning' | 'blocked' | 'neutral'; }>;
    nextHumanReviewItems: Array<{ label: string; value: string; tone: 'safe' | 'warning' | 'blocked' | 'neutral'; }>;
    stillForbiddenItems: Array<{ label: string; value: string; tone: 'safe' | 'warning' | 'blocked' | 'neutral'; }>;
  } | null;
  tokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousGateLabel: string;
    previousGateCommit: string;
    handoffSummaryItems: Array<{ label: string; value: string; description: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    closureEvidenceItems: Array<{ label: string; description: string; evidence: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    humanReviewRequiredItems: Array<{ label: string; reason: string; requiredBefore: string; tone: 'warning' | 'blocked'; }>;
    notReleasedItems: Array<{ label: string; description: string; releaseState: string; tone: 'blocked'; }>;
    nextHandoffItems: Array<{ label: string; description: string; owner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousHandoffLabel: string;
    previousHandoffCommit: string;
    acceptanceChecklistItems: Array<{ label: string; description: string; requiredState: string; currentState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    reviewerAwarenessItems: Array<{ label: string; description: string; reviewerMustUnderstand: string; tone: 'warning' | 'blocked'; }>;
    acceptanceBlockedItems: Array<{ label: string; reason: string; unresolvedState: string; tone: 'blocked'; }>;
    evidenceReviewItems: Array<{ label: string; description: string; evidenceState: string; tone: 'neutral' | 'warning'; }>;
    notApprovalItems: Array<{ label: string; description: string; notGrantedState: string; tone: 'blocked'; }>;
    nextReviewPreparationItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousChecklistLabel: string;
    previousChecklistCommit: string;
    boundarySummaryItems: Array<{ label: string; description: string; boundaryState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    acceptanceIsNotApprovalItems: Array<{ label: string; description: string; notApprovalReason: string; tone: 'warning' | 'blocked'; }>;
    nonExecutionBoundaryItems: Array<{ label: string; description: string; blockedState: string; tone: 'blocked'; }>;
    requiredBeforeReleaseItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    reviewerMisunderstandingPreventionItems: Array<{ label: string; misunderstanding: string; correctInterpretation: string; tone: 'warning' | 'blocked'; }>;
    nextHumanDecisionItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousBoundaryLabel: string;
    previousBoundaryCommit: string;
    sealSummaryItems: Array<{ label: string; description: string; sealState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    nonExecutionSealItems: Array<{ label: string; description: string; sealedReason: string; tone: 'blocked'; }>;
    humanReviewAftermathItems: Array<{ label: string; description: string; currentMeaning: string; tone: 'warning' | 'blocked'; }>;
    releaseNotGrantedItems: Array<{ label: string; description: string; notGrantedState: string; tone: 'blocked'; }>;
    separateApprovalRequiredItems: Array<{ label: string; description: string; requiredBeforeRelease: string; tone: 'warning' | 'blocked'; }>;
    nextSafeReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousSealLabel: string;
    previousSealCommit: string;
    holdSummaryItems: Array<{ label: string; description: string; holdState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    finalHoldReasons: Array<{ label: string; description: string; reason: string; tone: 'warning' | 'blocked'; }>;
    humanReviewStillPendingItems: Array<{ label: string; description: string; pendingState: string; tone: 'warning' | 'blocked'; }>;
    releaseBlockedItems: Array<{ label: string; description: string; blockedState: string; tone: 'blocked'; }>;
    notExecutionReadyItems: Array<{ label: string; description: string; notReadyState: string; tone: 'blocked'; }>;
    nextSafeHandoffItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousHoldLabel: string;
    previousHoldCommit: string;
    preconditionSummaryItems: Array<{ label: string; description: string; currentState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    releasePreconditionItems: Array<{ label: string; description: string; requiredBeforeRelease: string; tone: 'warning' | 'blocked'; }>;
    unresolvedHoldItems: Array<{ label: string; description: string; unresolvedState: string; tone: 'warning' | 'blocked'; }>;
    approvalEvidenceRequiredItems: Array<{ label: string; description: string; evidenceRequired: string; tone: 'warning' | 'blocked'; }>;
    releaseMisunderstandingPreventionItems: Array<{ label: string; misunderstanding: string; correctInterpretation: string; tone: 'warning' | 'blocked'; }>;
    nextReviewGateItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousPreconditionsLabel: string;
    previousPreconditionsCommit: string;
    boundarySummaryItems: Array<{ label: string; description: string; boundaryState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    releaseIsNotGrantedItems: Array<{ label: string; description: string; notGrantedReason: string; tone: 'warning' | 'blocked'; }>;
    preconditionReviewNotApprovalItems: Array<{ label: string; description: string; correctInterpretation: string; tone: 'warning' | 'blocked'; }>;
    blockedReleasePathItems: Array<{ label: string; description: string; blockedState: string; tone: 'blocked'; }>;
    requiredBeforeActualReleaseItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextHumanGateItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousBoundaryLabel: string;
    previousBoundaryCommit: string;
    sealSummaryItems: Array<{ label: string; description: string; sealState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    nonReleaseSealItems: Array<{ label: string; description: string; sealedState: string; tone: 'blocked'; }>;
    releaseStillBlockedItems: Array<{ label: string; description: string; blockedReason: string; tone: 'warning' | 'blocked'; }>;
    boundaryAftermathItems: Array<{ label: string; description: string; currentMeaning: string; tone: 'warning' | 'blocked'; }>;
    requiredBeforeReleaseItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextSafeReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousSealLabel: string;
    previousSealCommit: string;
    handoffChecklistItems: Array<{ label: string; description: string; requiredCheck: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    nonReleaseStateItems: Array<{ label: string; description: string; currentState: string; tone: 'warning' | 'blocked'; }>;
    reviewerConfirmationItems: Array<{ label: string; description: string; reviewerMustConfirm: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    releaseNotAllowedItems: Array<{ label: string; description: string; notAllowedReason: string; tone: 'blocked'; }>;
    handoffMisunderstandingPreventionItems: Array<{ label: string; misunderstanding: string; correctInterpretation: string; tone: 'warning' | 'blocked'; }>;
    nextHumanReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffBoundaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousChecklistLabel: string;
    previousChecklistCommit: string;
    boundarySummaryItems: Array<{ label: string; description: string; boundaryState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    handoffIsNotReleaseItems: Array<{ label: string; description: string; notReleaseReason: string; tone: 'warning' | 'blocked'; }>;
    checklistReviewNotApprovalItems: Array<{ label: string; description: string; correctInterpretation: string; tone: 'warning' | 'blocked'; }>;
    blockedTransitionItems: Array<{ label: string; description: string; blockedState: string; tone: 'blocked'; }>;
    requiredBeforeReleaseItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextHumanReviewGateItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffNonReleaseSealView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousBoundaryLabel: string;
    previousBoundaryCommit: string;
    sealSummaryItems: Array<{ label: string; description: string; sealState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    handoffNonReleaseSealItems: Array<{ label: string; description: string; sealedState: string; tone: 'blocked'; }>;
    boundaryConfirmationAftermathItems: Array<{ label: string; description: string; currentMeaning: string; tone: 'warning' | 'blocked'; }>;
    releaseStillNotGrantedItems: Array<{ label: string; description: string; notGrantedReason: string; tone: 'blocked'; }>;
    requiredBeforeAnyReleaseItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextSafeHumanReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousSealLabel: string;
    previousSealCommit: string;
    finalReviewSummaryItems: Array<{ label: string; description: string; reviewState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    nonReleaseHandoffSummaryItems: Array<{ label: string; description: string; currentState: string; tone: 'warning' | 'blocked'; }>;
    reviewerFinalCheckItems: Array<{ label: string; description: string; reviewerMustConfirm: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    notReleaseApprovalItems: Array<{ label: string; description: string; notApprovalReason: string; tone: 'warning' | 'blocked'; }>;
    remainingHoldItems: Array<{ label: string; description: string; holdState: string; tone: 'blocked'; }>;
    nextSafeHandoffItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousSummaryLabel: string;
    previousSummaryCommit: string;
    closureGateSummaryItems: Array<{ label: string; description: string; gateState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    handoffClosureItems: Array<{ label: string; description: string; closureState: string; tone: 'warning' | 'blocked'; }>;
    notReleaseCompletionItems: Array<{ label: string; description: string; notCompletionReason: string; tone: 'warning' | 'blocked'; }>;
    remainingBlockedPathItems: Array<{ label: string; description: string; blockedState: string; tone: 'blocked'; }>;
    requiredBeforeFutureTransitionItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextSafeReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureNonReleaseSealView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousClosureGateLabel: string;
    previousClosureGateCommit: string;
    sealSummaryItems: Array<{ label: string; description: string; sealState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    closureNonReleaseSealItems: Array<{ label: string; description: string; sealedState: string; tone: 'blocked'; }>;
    closureGateAftermathItems: Array<{ label: string; description: string; currentMeaning: string; tone: 'warning' | 'blocked'; }>;
    releaseStillNotCompletedItems: Array<{ label: string; description: string; notCompletedReason: string; tone: 'blocked'; }>;
    requiredBeforeAnyFutureTransitionItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextSafeReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousSealLabel: string;
    previousSealCommit: string;
    finalStatusSummaryItems: Array<{ label: string; description: string; statusState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    closureReviewStateItems: Array<{ label: string; description: string; currentMeaning: string; tone: 'warning' | 'blocked'; }>;
    nonReleaseStateItems: Array<{ label: string; description: string; nonReleaseState: string; tone: 'blocked'; }>;
    notTransitionReadyItems: Array<{ label: string; description: string; notReadyReason: string; tone: 'warning' | 'blocked'; }>;
    requiredBeforeNextTransitionItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextSafeReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousSummaryLabel: string;
    previousSummaryCommit: string;
    boundarySummaryItems: Array<{ label: string; description: string; boundaryState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    finalStatusIsNotReleaseItems: Array<{ label: string; description: string; notReleaseReason: string; tone: 'warning' | 'blocked'; }>;
    summaryReviewNotApprovalItems: Array<{ label: string; description: string; correctInterpretation: string; tone: 'warning' | 'blocked'; }>;
    blockedTransitionItems: Array<{ label: string; description: string; blockedState: string; tone: 'blocked'; }>;
    requiredBeforeReleaseItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextSafeReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
  tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusNonReleaseSealView?: {
    title: string;
    statusLabel: string;
    statusTone: 'neutral' | 'warning' | 'blocked';
    summary: string;
    taskRangeLabel: string;
    previousBoundaryLabel: string;
    previousBoundaryCommit: string;
    sealSummaryItems: Array<{ label: string; description: string; sealState: string; tone: 'neutral' | 'warning' | 'blocked'; }>;
    finalStatusNonReleaseSealItems: Array<{ label: string; description: string; sealedState: string; tone: 'blocked'; }>;
    boundaryAftermathItems: Array<{ label: string; description: string; currentMeaning: string; tone: 'warning' | 'blocked'; }>;
    releaseStillNotGrantedItems: Array<{ label: string; description: string; notGrantedReason: string; tone: 'blocked'; }>;
    transitionStillBlockedItems: Array<{ label: string; description: string; blockedState: string; tone: 'blocked'; }>;
    requiredBeforeAnyFutureTransitionItems: Array<{ label: string; description: string; requiredEvidence: string; tone: 'warning' | 'blocked'; }>;
    nextSafeReviewItems: Array<{ label: string; description: string; nextOwner: string; tone: 'neutral' | 'warning'; }>;
    stillForbiddenItems: Array<{ label: string; description: string; tone: 'blocked'; }>;
    finalNotice: string;
  } | null;
};

type DraftBatchDetailResponse =
  | {
    ok: true;
    job: DraftBatchJob;
  }
  | {
    ok: false;
    error?: string;
  };

type FinalApprovalSummary = {
  id: string;
  version: number;
  status: 'ACTIVE' | 'INVALIDATED' | 'SUPERSEDED';
  finalApprovedAt: string;
  finalApprovedBy: string;
  validationExpiresAt: string;
  invalidatedAt: string | null;
  supersedesApprovalId: string | null;
  itemCount: number;
  validationSnapshotHash: string;
  payloadHash: string;
};

type FinalApprovalsListResponse =
  | {
    ok: true;
    jobId: string;
    finalApprovals: FinalApprovalSummary[];
  }
  | {
    ok: false;
    error?: string;
  };

const ALLOWED_TARGET_TYPES = new Set(['SINGLE', 'OPTION', 'ADDITIONAL']);
const WARNING_LABELS: Record<string, string> = {
  CHANNEL_ID_UNAVAILABLE: '채널 ID 정보 없음',
  UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW: '업로드 Preview 기준 현재값 사용',
  CURRENT_CONTEXT_STALE: '현재 문맥이 오래되었을 수 있음',
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === 'string')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getStatusBadgeStyle(status: string): string {
  switch (status.toUpperCase()) {
    case 'EXECUTED':
    case 'SUCCESS':
    case 'ACTIVE':
      return 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300';
    case 'PARTIAL_SUCCESS':
      return 'border-orange-500/30 bg-orange-500/20 text-orange-300';
    case 'FAILED':
    case 'INVALIDATED':
      return 'border-red-500/30 bg-red-500/20 text-red-300';
    case 'EXECUTING':
      return 'border-amber-500/30 bg-amber-500/20 text-amber-300';
    case 'APPROVED':
      return 'border-indigo-500/30 bg-indigo-500/20 text-indigo-300';
    case 'READY':
      return 'border-teal-500/30 bg-teal-500/20 text-teal-300';
    case 'SKIPPED':
    case 'CANCELLED':
    case 'SUPERSEDED':
      return 'border-gray-500/30 bg-gray-500/20 text-gray-400';
    case 'DRAFT':
    default:
      return 'border-slate-500/30 bg-slate-500/20 text-slate-300';
  }
}

function formatWarningCode(code: string): string {
  return WARNING_LABELS[code] ?? code;
}

function detectVisibleWarningCodes(job: DraftBatchJob | null): string[] {
  if (!job) return [];

  const warnings = new Set<string>();
  const staleThresholdMs = 24 * 60 * 60 * 1000;

  for (const item of job.items) {
    const requestPayload = asRecord(item.requestPayload);
    const candidate = asRecord(requestPayload?.candidate);
    if (!candidate) continue;

    const issues = Array.isArray(candidate.issues) ? candidate.issues : [];
    for (const issue of issues) {
      const issueRecord = asRecord(issue);
      if (issueRecord?.code === 'CHANNEL_ID_UNAVAILABLE') {
        warnings.add('CHANNEL_ID_UNAVAILABLE');
      }
    }

    const currentStateSource = asString(candidate.currentStateSource);
    if (currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW') {
      warnings.add('UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW');
    }

    const syncedAtRaw = candidate.currentStateSyncedAt;
    if (typeof syncedAtRaw === 'string') {
      const syncedAt = new Date(syncedAtRaw);
      if (!Number.isNaN(syncedAt.getTime()) && Date.now() - syncedAt.getTime() > staleThresholdMs) {
        warnings.add('CURRENT_CONTEXT_STALE');
      }
    }
  }

  return Array.from(warnings);
}

function getVisibleHardBlockers(job: DraftBatchJob | null): string[] {
  if (!job) return ['Batch 정보를 아직 불러오지 못했습니다.'];

  const blockers: string[] = [];

  if (job.status !== 'DRAFT') {
    blockers.push(`현재 Job 상태가 DRAFT가 아닙니다. (${job.status})`);
  }

  if (job.itemCount <= 0 || job.items.length === 0) {
    blockers.push('승인할 item이 없습니다.');
  }

  for (const item of job.items) {
    if (item.status !== 'DRAFT') {
      blockers.push(`Item ${item.id} 상태가 DRAFT가 아닙니다. (${item.status})`);
    }

    if (!item.targetType || !ALLOWED_TARGET_TYPES.has(item.targetType)) {
      blockers.push(`Item ${item.id}의 targetType이 유효하지 않습니다.`);
    }

    if (!item.targetId) {
      blockers.push(`Item ${item.id}의 targetId가 비어 있습니다.`);
    }

    if (!item.dryRunSummary) {
      blockers.push(`Item ${item.id}의 dry-run 요약이 없습니다.`);
    } else {
      if ((item.dryRunSummary.blockedReasons?.length ?? 0) > 0) {
        blockers.push(`Item ${item.id}에 dry-run 차단 사유가 남아 있습니다.`);
      }

      if (item.dryRunSummary.riskLevel === 'HIGH') {
        blockers.push(`Item ${item.id}의 위험도가 HIGH입니다.`);
      }

      const before = item.dryRunSummary.before;
      const after = item.dryRunSummary.after;
      const hasPrice = before?.price !== null && before?.price !== undefined
        && after?.price !== null && after?.price !== undefined;
      const hasStock = before?.stock !== null && before?.stock !== undefined
        && after?.stock !== null && after?.stock !== undefined;
      if (!hasPrice && !hasStock) {
        blockers.push(`Item ${item.id}의 before/after 비교값이 부족합니다.`);
      }
    }

    const requestPayload = asRecord(item.requestPayload);
    const candidate = asRecord(requestPayload?.candidate);
    if (!candidate) {
      blockers.push(`Item ${item.id}의 requestPayload.candidate가 없습니다.`);
      continue;
    }

    if (asString(candidate.status) === 'NEEDS_CONTEXT') {
      blockers.push(`Item ${item.id}가 NEEDS_CONTEXT 상태입니다.`);
    }

    const riskTypes = asStringArray(candidate.riskTypes);
    if (riskTypes.includes('CURRENT_PRICE_UNAVAILABLE')) {
      blockers.push(`Item ${item.id}에 CURRENT_PRICE_UNAVAILABLE이 남아 있습니다.`);
    }
    if (riskTypes.includes('CURRENT_STOCK_UNAVAILABLE')) {
      blockers.push(`Item ${item.id}에 CURRENT_STOCK_UNAVAILABLE이 남아 있습니다.`);
    }

    const reviewMessage = asString(candidate.reviewMessage) ?? '';
    if (reviewMessage.includes('매칭: optionValue')) {
      blockers.push(`Item ${item.id}는 optionValue fallback 매칭 후보입니다.`);
    }
  }

  return Array.from(new Set(blockers));
}

export default function DraftBatchDetailPage(props: { params: Promise<{ jobId: string }> }) {
  const params = use(props.params);
  const [job, setJob] = useState<DraftBatchJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [approveChecked, setApproveChecked] = useState(false);
  const [approving, setApproving] = useState(false);
  const [approveError, setApproveError] = useState<string | null>(null);
  const [approveResult, setApproveResult] = useState<SkuKeywordDraftBatchApproveResponse | null>(null);

  const [finalApprovals, setFinalApprovals] = useState<FinalApprovalSummary[] | null>(null);
  const [finalApprovalsLoading, setFinalApprovalsLoading] = useState(true);
  const [finalApprovalsError, setFinalApprovalsError] = useState<string | null>(null);

  const [isFinalApprovalModalOpen, setIsFinalApprovalModalOpen] = useState(false);
  const [isCreatingFinalApproval, setIsCreatingFinalApproval] = useState(false);
  const [finalApprovalCreateError, setFinalApprovalCreateError] = useState<string | null>(null);
  const [finalApprovalCreateSuccess, setFinalApprovalCreateSuccess] = useState<string | null>(null);

  const [liveAuditCheckedItems, setLiveAuditCheckedItems] = useState<string[]>([]);
  const [liveAuditSaving, setLiveAuditSaving] = useState(false);
  const [liveAuditSaveError, setLiveAuditSaveError] = useState<string | null>(null);
  const [liveAuditSaveResult, setLiveAuditSaveResult] = useState<{
    approvalCode: string;
    recordedAt: string;
    acknowledgedItems: string[];
    message: string;
  } | null>(null);

  // Token Test Approval Audit state
  const [tokenTestApprovalCheckedItems, setTokenTestApprovalCheckedItems] = useState<string[]>([]);
  const [tokenTestApprovalSaving, setTokenTestApprovalSaving] = useState(false);
  const [tokenTestApprovalSaveError, setTokenTestApprovalSaveError] = useState<string | null>(null);
  const [tokenTestApprovalSaveResult, setTokenTestApprovalSaveResult] = useState<{
    auditCode: string;
    recordedAt: string;
    acknowledgedItems: string[];
    message: string;
  } | null>(null);

  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const initTimer = setTimeout(() => setNow(Date.now()), 0);
    const intervalTimer = setInterval(() => setNow(Date.now()), 60000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/sku-matching/draft-batch/${params.jobId}`);
      const data = (await response.json()) as DraftBatchDetailResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.ok ? 'Batch 상세 조회에 실패했습니다.' : data.error || 'Batch 상세 조회에 실패했습니다.');
      }

      setJob(data.job);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [params.jobId]);

  useEffect(() => {
    let cancelled = false;

    const loadInitialJob = async () => {
      try {
        const response = await fetch(`/api/sku-matching/draft-batch/${params.jobId}`);
        const data = (await response.json()) as DraftBatchDetailResponse;

        if (!response.ok || !data.ok) {
          throw new Error(data.ok ? 'Batch 상세 조회에 실패했습니다.' : data.error || 'Batch 상세 조회에 실패했습니다.');
        }

        if (!cancelled) {
          setJob(data.job);
          setError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const loadFinalApprovals = async () => {
      try {
        setFinalApprovalsLoading(true);
        const response = await fetch(`/api/sku-matching/draft-batch/${params.jobId}/final-approvals`);
        const data = (await response.json()) as FinalApprovalsListResponse;

        if (!response.ok || !data.ok) {
          throw new Error('error' in data && data.error ? data.error : 'FinalApproval 조회에 실패했습니다.');
        }

        if (!cancelled) {
          setFinalApprovals(data.finalApprovals);
          setFinalApprovalsError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setFinalApprovalsError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setFinalApprovalsLoading(false);
        }
      }
    };

    void Promise.all([loadInitialJob(), loadFinalApprovals()]);

    return () => {
      cancelled = true;
    };
  }, [params.jobId]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS = [
    'CONFIRM_SINGLE_ITEM_ONLY',
    'CONFIRM_TARGET_PRODUCT_REVIEWED',
    'CONFIRM_PAYLOAD_REVIEWED',
    'CONFIRM_NAVER_API_STILL_DISABLED',
    'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER',
    'CONFIRM_NO_REPLAY_ALLOWED',
  ] as const;

  const handleToggleLiveAuditItem = (ack: string) => {
    setLiveAuditCheckedItems(prev =>
      prev.includes(ack) ? prev.filter(a => a !== ack) : [...prev, ack]
    );
  };

  const handleSaveLiveAudit = async () => {
    if (!job || liveAuditSaving) return;
    const currentActiveFinalApproval = finalApprovals?.find(a => a.status === 'ACTIVE') ?? null;
    if (!currentActiveFinalApproval) return;

    try {
      setLiveAuditSaving(true);
      setLiveAuditSaveError(null);

      const response = await fetch('/api/sku-keyword-final-approvals/live-single-test-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalApprovalId: currentActiveFinalApproval.id,
          batchJobId: job.id,
          acknowledgedItems: liveAuditCheckedItems,
          confirmApprovalRecordOnly: true,
          actorId: 'UI_USER',
        }),
      });

      type SaveAuditResponse =
        | { ok: true; approvalCode: string; auditRecord: { recordedAt: string; acknowledgedItems: string[] }; message: string }
        | { ok: false; error?: string; missingAcknowledgements?: string[] };

      const data = (await response.json()) as SaveAuditResponse;
      if (!response.ok || !data.ok) {
        throw new Error(
          !data.ok && data.error ? data.error : '승인 기록 저장에 실패했습니다.'
        );
      }

      setLiveAuditSaveResult({
        approvalCode: data.approvalCode,
        recordedAt: data.auditRecord.recordedAt,
        acknowledgedItems: data.auditRecord.acknowledgedItems,
        message: data.message,
      });
      await fetchJob();
    } catch (err: unknown) {
      setLiveAuditSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setLiveAuditSaving(false);
    }
  };

  // Token Test Approval Audit 필수 항목 목록
  const TOKEN_TEST_APPROVAL_REQUIRED_ACKNOWLEDGEMENTS = [
    'CONFIRM_TOKEN_TEST_ONLY',
    'CONFIRM_NO_PRODUCT_UPDATE',
    'CONFIRM_NO_ENDPOINT_CALL_IN_THIS_STEP',
    'CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP',
    'CONFIRM_TOKEN_WILL_NOT_BE_STORED',
    'CONFIRM_TOKEN_WILL_NOT_BE_DISPLAYED',
    'CONFIRM_NO_AUTHORIZATION_HEADER_CREATED',
    'CONFIRM_NO_QUEUE_OR_WORKER',
    'CONFIRM_NO_AUTOMATIC_RETRY',
    'CONFIRM_SUCCESS_DOES_NOT_ENABLE_LIVE_EXECUTION',
    'CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST',
    'CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_PRODUCT_UPDATE',
  ] as const;

  const TOKEN_TEST_APPROVAL_LABELS: Record<string, string> = {
    CONFIRM_TOKEN_TEST_ONLY:
      '이 작업은 token 발급 테스트 기록만을 목적으로 합니다. 실제 token 발급은 이 단계에서 실행되지 않습니다.',
    CONFIRM_NO_PRODUCT_UPDATE:
      '이 작업은 상품 수정 API와 연결되지 않습니다. 스마트스토어 상품/가격/키워드는 변경되지 않습니다.',
    CONFIRM_NO_ENDPOINT_CALL_IN_THIS_STEP:
      '이 단계에서 Naver API endpoint 호출이 발생하지 않습니다.',
    CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP:
      '이 단계에서 access token 또는 refresh token이 발급되지 않습니다.',
    CONFIRM_TOKEN_WILL_NOT_BE_STORED:
      '발급된 token은 저장되지 않습니다. (이 단계에서는 token이 발급되지 않으므로 저장도 없습니다.)',
    CONFIRM_TOKEN_WILL_NOT_BE_DISPLAYED:
      'access token, refresh token, client secret은 UI/로그에 표시되지 않습니다.',
    CONFIRM_NO_AUTHORIZATION_HEADER_CREATED:
      'Authorization header가 생성되지 않습니다.',
    CONFIRM_NO_QUEUE_OR_WORKER:
      'Queue enqueue 또는 Worker 호출이 없습니다.',
    CONFIRM_NO_AUTOMATIC_RETRY:
      '실패 시 자동 재시도가 없습니다.',
    CONFIRM_SUCCESS_DOES_NOT_ENABLE_LIVE_EXECUTION:
      '이 승인 기록 저장 성공이 Live 실행을 활성화하지 않습니다.',
    CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST:
      '실제 token 발급 테스트를 실행하려면 별도의 추가 사용자 승인이 필요합니다.',
    CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_PRODUCT_UPDATE:
      '상품 수정 API 호출을 위해서는 별도의 추가 사용자 승인이 필요합니다.',
  };

  const handleToggleTokenTestApprovalItem = (ack: string) => {
    setTokenTestApprovalCheckedItems(prev =>
      prev.includes(ack) ? prev.filter(a => a !== ack) : [...prev, ack]
    );
  };

  const handleSaveTokenTestApproval = async () => {
    if (!job || tokenTestApprovalSaving) return;
    const currentActiveFinalApproval = finalApprovals?.find(a => a.status === 'ACTIVE') ?? null;
    if (!currentActiveFinalApproval) {
      setTokenTestApprovalSaveError('ACTIVE 상태의 Final Approval이 없습니다.');
      return;
    }

    try {
      setTokenTestApprovalSaving(true);
      setTokenTestApprovalSaveError(null);

      const response = await fetch('/api/sku-keyword-final-approvals/naver-auth-token-test-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalApprovalId: currentActiveFinalApproval.id,
          batchJobId: job.id,
          acknowledgedItems: tokenTestApprovalCheckedItems,
          confirmApprovalRecordOnly: true,
          actorId: 'UI_USER',
        }),
      });

      type TokenTestApprovalResponse =
        | {
            ok: true;
            audit: { auditCode: string; recordedAt: string; acknowledgedItems: string[] };
            message: string;
            tokenRequestAllowed: false;
            accessTokenRequested: false;
            tokenIssued: false;
            naverApiCallAllowed: false;
            liveExecutionEnabled: false;
          }
        | { ok: false; error?: string; missingAcknowledgements?: string[] };

      const data = (await response.json()) as TokenTestApprovalResponse;
      if (!response.ok || !data.ok) {
        throw new Error(
          !data.ok && data.error ? data.error : '승인 기록 저장에 실패했습니다.'
        );
      }

      setTokenTestApprovalSaveResult({
        auditCode: data.audit.auditCode,
        recordedAt: data.audit.recordedAt,
        acknowledgedItems: data.audit.acknowledgedItems,
        message: data.message,
      });
      await fetchJob();
    } catch (err: unknown) {
      setTokenTestApprovalSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setTokenTestApprovalSaving(false);
    }
  };

  const visibleWarnings = useMemo(() => detectVisibleWarningCodes(job), [job]);
  const visibleHardBlockers = useMemo(() => getVisibleHardBlockers(job), [job]);
  const hasVisibleHardBlockers = visibleHardBlockers.length > 0;
  const canApprove = job?.status === 'DRAFT'
    && (job.itemCount ?? 0) > 0
    && approveChecked
    && !hasVisibleHardBlockers
    && !approving;

  const TERMINAL_JOB_STATUSES_UI = ['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED'];
  const finalApprovalBlockingReasons: string[] = [];
  if (!job) {
    finalApprovalBlockingReasons.push("Batch 정보를 불러오는 중입니다.");
  } else if (TERMINAL_JOB_STATUSES_UI.includes(job.status)) {
    finalApprovalBlockingReasons.push(
      `이미 실행 기록이 있는 BatchJob입니다 (상태: ${job.status}). 안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다.`
    );
  } else if (job.status === 'EXECUTING') {
    finalApprovalBlockingReasons.push("BatchJob이 현재 실행 중입니다. 동시 실행은 허용되지 않습니다.");
  } else if (job.status !== 'APPROVED') {
    finalApprovalBlockingReasons.push("Batch 상태가 APPROVED가 아닙니다.");
  }
  const allItemsReady = job?.items.every(item => item.status === 'READY') ?? false;
  const isTerminalJobStatus = job ? TERMINAL_JOB_STATUSES_UI.includes(job.status) || job.status === 'EXECUTING' : false;
  if (job && !allItemsReady && !isTerminalJobStatus) {
    finalApprovalBlockingReasons.push("READY가 아닌 Item이 있습니다.");
  }
  if (finalApprovalsLoading) {
    finalApprovalBlockingReasons.push("FinalApproval 조회 중입니다.");
  }
  if (finalApprovalsError) {
    finalApprovalBlockingReasons.push("FinalApproval 조회에 실패했습니다.");
  }
  const activeFinalApproval = finalApprovals?.find(a => a.status === 'ACTIVE');
  if (activeFinalApproval) {
    finalApprovalBlockingReasons.push("이미 ACTIVE 최종 승인 Artifact가 있습니다.");
  }
  const canCreateFinalApproval = finalApprovalBlockingReasons.length === 0;

  const handleApprove = async () => {
    if (!job || !canApprove) return;

    try {
      setApproving(true);
      setApproveError(null);
      setApproveResult(null);

      const response = await fetch(`/api/sku-matching/draft-batch/${job.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmApproveOnly: true,
          acknowledgedWarnings: visibleWarnings,
        } satisfies SkuKeywordDraftBatchApproveRequest),
      });

      const data = (await response.json()) as SkuKeywordDraftBatchApproveResponse | { ok: false; error?: string };
      if (!response.ok || !data.ok) {
        if ('blockedReasons' in data && Array.isArray(data.blockedReasons) && data.blockedReasons.length > 0) {
          throw new Error(data.blockedReasons.join(' / '));
        }
        throw new Error('error' in data ? data.error || '승인 처리에 실패했습니다.' : '승인 처리에 실패했습니다.');
      }

      setApproveResult(data);
      setApproveChecked(false);
      await fetchJob();
    } catch (err: unknown) {
      setApproveError(err instanceof Error ? err.message : String(err));
    } finally {
      setApproving(false);
    }
  };

  const handleCreateFinalApproval = async () => {
    if (!job || !canCreateFinalApproval || isCreatingFinalApproval) return;

    try {
      setIsCreatingFinalApproval(true);
      setFinalApprovalCreateError(null);
      setFinalApprovalCreateSuccess(null);

      const requestBody: SkuKeywordFinalApprovalCreateRequest = {
        confirmFinalApproval: true,
        approvalMemo: null,
        acknowledgedWarnings: visibleWarnings,
      };

      const response = await fetch(`/api/sku-matching/draft-batch/${job.id}/final-approvals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if ('message' in data && typeof data.message === 'string') {
          throw new Error(data.message);
        }
        throw new Error(`최종 승인 생성에 실패했습니다. (${response.status})`);
      }

      setFinalApprovalCreateSuccess(
        'FinalApproval artifact가 생성되었습니다. 이 작업은 네이버 API 호출이나 실행 전환을 수행하지 않았습니다.'
      );
      setIsFinalApprovalModalOpen(false);

      // 성공 후 최종 승인 목록 재조회
      setFinalApprovalsLoading(true);
      const listResponse = await fetch(`/api/sku-matching/draft-batch/${job.id}/final-approvals`);
      const listData = await listResponse.json();
      if (listResponse.ok && listData.ok) {
        setFinalApprovals(listData.finalApprovals);
      }
    } catch (err: unknown) {
      setFinalApprovalCreateError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsCreatingFinalApproval(false);
      setFinalApprovalsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 text-gray-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Batch 상세를 불러오는 중입니다...</span>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="p-6">
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>{error || 'Batch를 찾을 수 없습니다.'}</div>
        </div>
        <Link
          href="/dashboard/sku-keyword-draft-batches"
          className="mt-4 inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-6 text-gray-100">
      <div className="mb-6">
        <Link
          href="/dashboard/sku-keyword-draft-batches"
          className="mb-4 inline-flex items-center text-sm text-gray-400 hover:text-gray-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> DRAFT Batch 목록
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white">Batch 상세 검토</h1>
        {job.status === 'DRAFT' ? (
          <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            이 화면에서는 DRAFT Batch를 APPROVED 상태로만 전환할 수 있습니다. 네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다.
          </div>
        ) : job.status === 'APPROVED' ? (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            이 Batch는 APPROVED 상태입니다. 각 item은 READY 상태로 승인되었습니다. 아직 네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행되지 않았습니다. 실제 실행 기능은 별도 단계에서만 구현됩니다.
          </div>
        ) : job.status === 'EXECUTED' ? (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            이 Batch는 <strong className="text-white">EXECUTED</strong> 상태입니다. Worker 실행이 완료됐습니다. 실제 Naver API는 호출되지 않았습니다.
          </div>
        ) : job.status === 'PARTIAL_SUCCESS' ? (
          <div className="mt-2 rounded-md border border-orange-500/20 bg-orange-500/10 p-3 text-sm text-orange-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            이 Batch는 <strong className="text-white">PARTIAL_SUCCESS</strong> 상태입니다. 일부 항목만 성공했습니다. 하단 실행 결과를 확인하세요.
          </div>
        ) : job.status === 'FAILED' ? (
          <div className="mt-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            이 Batch는 <strong className="text-white">FAILED</strong> 상태입니다. 하단 실행 결과를 확인하세요.
          </div>
        ) : job.status === 'EXECUTING' ? (
          <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
            <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />
            이 Batch는 <strong className="text-white">EXECUTING</strong> 상태입니다. Worker가 실행 중입니다.
          </div>
        ) : (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            이 Batch는 이미 {job.status} 상태입니다. 이 화면에서는 실행 버튼이나 네이버 반영 버튼을 제공하지 않습니다.
          </div>
        )}
      </div>

      <div className="mb-6 grid gap-4 rounded-lg border border-[#262629] bg-[#121214] p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mb-1 text-xs text-gray-500">Batch ID</p>
          <p className="font-mono text-sm text-gray-300">{job.id}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">상태</p>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(job.status)}`}>
            {job.status}
          </span>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">항목 수</p>
          <p className="text-sm font-semibold text-white">{job.itemCount}건</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">생성일시</p>
          <p className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {job.status === 'DRAFT' && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
            <div className="space-y-3">
              <div>
                <h2 className="text-base font-semibold text-white">승인 영역</h2>
                <p className="mt-1 text-sm text-gray-300">
                  이 작업은 Batch를 <strong className="text-white">APPROVED</strong> 상태로만 변경합니다.
                  각 item은 <strong className="text-white">READY</strong> 상태로 전환됩니다.
                  네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다.
                  실제 실행은 별도 단계에서만 가능합니다.
                </p>
              </div>

              {visibleWarnings.length > 0 && (
                <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                  <p className="font-semibold text-amber-300">승인 전 확인할 경고</p>
                  <ul className="mt-2 space-y-1">
                    {visibleWarnings.map((warningCode) => (
                      <li key={warningCode}>- {formatWarningCode(warningCode)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasVisibleHardBlockers && (
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                  <p className="font-semibold text-red-300">화면에서 확인된 승인 차단 사유</p>
                  <ul className="mt-2 space-y-1">
                    {visibleHardBlockers.map((reason) => (
                      <li key={reason}>- {reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              <label className="flex items-start gap-3 rounded-md border border-[#262629] bg-[#18181b] p-3 text-sm text-gray-200">
                <input
                  type="checkbox"
                  checked={approveChecked}
                  onChange={(event) => setApproveChecked(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-500 bg-[#0f0f11] text-indigo-500"
                />
                <span>이 작업은 승인 상태 전환만 수행하며, 네이버 API 호출이 없음을 확인했습니다.</span>
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleApprove()}
                  disabled={!canApprove}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                >
                  {approving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      APPROVED 상태로 승인 중...
                    </>
                  ) : (
                    '검토 완료 후 승인'
                  )}
                </button>
                <span className="text-xs text-gray-400">
                  승인 후 DRAFT 전용 목록에서는 이 Batch가 보이지 않을 수 있습니다.
                </span>
              </div>

              {approveError && (
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                  {approveError}
                </div>
              )}

              {approveResult?.ok && (
                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                  <p className="font-semibold text-emerald-300">승인 완료</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <p>jobId: <span className="font-mono">{approveResult.jobId}</span></p>
                    <p>previousJobStatus: {approveResult.previousJobStatus}</p>
                    <p>nextJobStatus: {approveResult.nextJobStatus}</p>
                    <p>nextItemStatus: {approveResult.nextItemStatus}</p>
                    <p>itemCount: {approveResult.itemCount}</p>
                    <p>네이버 API 호출 없음</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FinalApproval 요약 표시 영역 */}
      <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
          <FileJson className="h-5 w-5 text-indigo-400" />
          최종 승인 Artifact
        </h2>

        <div className="mb-4 rounded-md border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-200">
          <p className="mb-1 font-semibold text-blue-300">실행 모드 안내</p>
          <ul className="space-y-0.5">
            <li>현재 실행은 Mock 모드입니다.</li>
            <li>실제 Naver API는 호출되지 않습니다.</li>
            <li>가격/재고/상품 정보는 실제로 변경되지 않습니다.</li>
          </ul>
        </div>

        {/* 재실행 차단 안내 */}
        {job && TERMINAL_JOB_STATUSES_UI.includes(job.status) && (
          <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
            <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              재실행 차단됨
            </p>
            <p className="text-xs text-red-200">
              이 BatchJob은 이미 실행 기록이 있습니다. 안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-red-300">
              <div>
                <span className="text-red-400">실행 상태: </span>
                <span className={`rounded-full border px-1.5 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(job.status)}`}>
                  {job.status}
                </span>
              </div>
              {job.executedAt && (
                <div>
                  <span className="text-red-400">실행 완료 시각: </span>
                  <span>{new Date(job.executedAt).toLocaleString()}</span>
                </div>
              )}
              {job.executionMetadata?.actorId && (
                <div className="col-span-2">
                  <span className="text-red-400">실행 Actor: </span>
                  <span className="font-mono">{job.executionMetadata.actorId}</span>
                </div>
              )}
              {job.executionMetadata?.executionMode && (
                <div>
                  <span className="text-red-400">실행 모드: </span>
                  <span className="font-mono">{job.executionMetadata.executionMode}</span>
                </div>
              )}
              {job.executionMetadata?.finalApprovalId && (
                <div className="col-span-2">
                  <span className="text-red-400">FinalApproval ID: </span>
                  <span className="font-mono">{job.executionMetadata.finalApprovalId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {job && job.status === 'EXECUTING' && (
          <div className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            <p className="flex items-center gap-1.5 font-semibold text-amber-300">
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              실행 중 — 동시 실행 차단됨
            </p>
            <p className="mt-1 text-xs">
              현재 Worker가 이 BatchJob을 실행 중입니다. 완료 후 결과를 확인하세요.
            </p>
          </div>
        )}

        {finalApprovalCreateSuccess && (
          <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            {finalApprovalCreateSuccess}
          </div>
        )}

        {finalApprovalsLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>최종 승인 이력 조회 중...</span>
          </div>
        ) : finalApprovalsError ? (
          <div className="text-sm text-red-400">
            조회 에러: {finalApprovalsError}
          </div>
        ) : !finalApprovals || finalApprovals.length === 0 ? (
          <div className="space-y-4">
            <div className="text-sm text-gray-400">최종 승인 Artifact가 아직 없습니다.</div>
            <div className="rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-sm text-indigo-200">
              <p className="font-semibold text-indigo-300">최종 승인 생성 준비 상태</p>

              {finalApprovalBlockingReasons.length > 0 ? (
                <div className="mt-2 text-red-300">
                  <p className="mb-1 text-xs">버튼이 비활성화된 사유:</p>
                  <ul className="list-inside list-disc text-sm">
                    {finalApprovalBlockingReasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2 text-sm text-emerald-300">
                  모든 조건이 충족되었습니다. 아래 버튼을 눌러 승인 확인 단계를 진행할 수 있습니다.
                  <br />
                  <span className="text-xs text-gray-400">
                    (서버에서 candidate, dryRunItem, 수집 문맥 등을 다시 검증합니다.)
                  </span>
                </p>
              )}

              <div className="mt-4">
                <button
                  type="button"
                  disabled={!canCreateFinalApproval}
                  onClick={() => setIsFinalApprovalModalOpen(true)}
                  className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                    canCreateFinalApproval
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                      : 'bg-slate-700 text-slate-300 opacity-70 cursor-not-allowed'
                  }`}
                >
                  {canCreateFinalApproval ? '최종 승인 Artifact 생성 준비' : '최종 승인 Artifact 생성 불가'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          (() => {
            const targetApproval = finalApprovals.find(a => a.status === 'ACTIVE') || finalApprovals[0];
            const isExpired = now === null ? false : new Date(targetApproval.validationExpiresAt).getTime() <= now;
            return (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">상태</p>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${targetApproval.status === 'ACTIVE' ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300' : 'border-slate-500/30 bg-slate-500/20 text-slate-300'}`}>
                    {targetApproval.status}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">최종 승인 시각</p>
                  <p className="text-sm text-gray-200">{new Date(targetApproval.finalApprovedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">검증 만료 시각</p>
                  <p className="text-sm text-gray-200">{new Date(targetApproval.validationExpiresAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">만료 여부</p>
                  <span className={`text-sm font-semibold ${isExpired ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isExpired ? '만료됨' : '유효'}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">승인자</p>
                  <p className="text-sm text-gray-200">{targetApproval.finalApprovedBy}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">대상 item 수</p>
                  <p className="text-sm text-gray-200">{targetApproval.itemCount}개</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <p className="mb-1 text-xs text-gray-500">해시 검증 (요약)</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 mr-2">Payload:</span>
                      <span className="font-mono text-gray-300">{targetApproval.payloadHash.substring(0, 12)}...</span>
                    </div>
                    <div>
                      <span className="text-gray-500 mr-2">Validation:</span>
                      <span className="font-mono text-gray-300">{targetApproval.validationSnapshotHash.substring(0, 12)}...</span>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-4 mt-2">
                  <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <p className="font-semibold text-amber-300">최종 승인 생성 준비 상태</p>

                    {finalApprovalBlockingReasons.length > 0 ? (
                      <div className="mt-2 text-red-300">
                        <p className="mb-1 text-xs">버튼이 비활성화된 사유:</p>
                        <ul className="list-inside list-disc text-sm">
                          {finalApprovalBlockingReasons.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-emerald-300">
                        모든 조건이 충족되었습니다. 아래 버튼을 눌러 승인 확인 단계를 진행할 수 있습니다.
                      </p>
                    )}

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={!canCreateFinalApproval}
                        onClick={() => setIsFinalApprovalModalOpen(true)}
                        className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                          canCreateFinalApproval
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                            : 'bg-slate-700 text-slate-300 opacity-70 cursor-not-allowed'
                        }`}
                      >
                        {canCreateFinalApproval ? '최종 승인 Artifact 생성 준비' : '최종 승인 Artifact 생성 불가'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* ── Live 단일 테스트 전 점검표 ────────────────────────────────────────── */}
      {job.livePreflight && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            Live 단일 테스트 전 점검표
          </h2>

          <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-200">
            <p>
              현재 화면은 실제 Naver API 호출 전 점검용입니다.
              이 단계에서는 상품 정보가 변경되지 않으며, Live 호출은 Safety Gate에 의해 차단됩니다.
            </p>
          </div>

          {/* 점검 요약 */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">점검 상태</p>
              <p className={`text-xs font-semibold ${job.livePreflight.ready ? 'text-emerald-400' : 'text-red-400'}`}>
                {job.livePreflight.ready ? '점검 조건 충족' : '점검 미완료'}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Naver API 호출</p>
              <p className={`text-xs font-semibold ${job.livePreflight.naverApiCalled ? 'text-red-400' : 'text-emerald-400'}`}>
                {job.livePreflight.naverApiCalled ? '호출됨 (확인 필요)' : '아직 호출되지 않음'}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Live 실행 가능 여부</p>
              <p className="text-xs font-semibold text-red-400">현재는 차단됨</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">점검 현황</p>
              <p className="text-xs">
                <span className={job.livePreflight.summary.blockingCount > 0 ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                  차단 {job.livePreflight.summary.blockingCount}건
                </span>
                {' · '}
                <span className={job.livePreflight.summary.warningCount > 0 ? 'text-amber-400' : 'text-gray-400'}>
                  확인 {job.livePreflight.summary.warningCount}건
                </span>
                {' · '}
                <span className="text-emerald-400">통과 {job.livePreflight.summary.passCount}건</span>
              </p>
            </div>
          </div>

          {/* 차단 사유 */}
          {job.livePreflight.blockingReasons.length > 0 && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
              <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                차단 사유 ({job.livePreflight.blockingReasons.length}건)
              </p>
              <ul className="space-y-1">
                {job.livePreflight.blockingReasons.map((reason, idx) => (
                  <li key={idx} className="text-red-200">
                    - {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 항목별 점검 결과 */}
          <div className="mb-4 space-y-1.5">
            <p className="mb-2 text-xs font-semibold text-gray-400">항목별 점검 결과</p>
            {job.livePreflight.checklistItems.map(item => (
              <div
                key={item.key}
                className={`flex items-start gap-3 rounded-md border p-2 text-xs ${
                  item.status === 'PASS'
                    ? 'border-emerald-500/20 bg-emerald-500/10'
                    : item.status === 'BLOCKED'
                      ? 'border-red-500/20 bg-red-500/10'
                      : item.status === 'WARN'
                        ? 'border-amber-500/20 bg-amber-500/10'
                        : 'border-blue-500/20 bg-blue-500/10'
                }`}
              >
                <span
                  className={`mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 ${
                    item.status === 'PASS'
                      ? 'text-emerald-400'
                      : item.status === 'BLOCKED'
                        ? 'text-red-400'
                        : item.status === 'WARN'
                          ? 'text-amber-400'
                          : 'text-blue-400'
                  }`}
                >
                  {item.status === 'PASS'
                    ? 'PASS'
                    : item.status === 'BLOCKED'
                      ? 'BLOCKED'
                      : item.status === 'WARN'
                        ? 'WARN'
                        : 'REVIEW'}
                </span>
                <div>
                  <p className="font-semibold text-gray-200">{item.label}</p>
                  <p className="text-gray-400">{item.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 다음 단계 안내 */}
          <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3 text-xs text-gray-400">
            <p className="mb-1 font-semibold text-gray-300">다음 단계 안내</p>
            <p>
              Live 단일 테스트는 별도 승인 흐름과 단일 테스트 상품 1건 제한 조건이 준비된
              이후에만 진행할 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* ── Live 단일 테스트 승인 준비 ────────────────────────────────────────── */}
      {job.liveSingleTestApproval && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShieldAlert className="h-5 w-5 text-indigo-400" />
            Live 단일 테스트 승인 준비
          </h2>

          {/* 안내 문구 */}
          <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200">
            <p className="mb-1 font-semibold text-indigo-300">승인 준비 단계 안내</p>
            <ul className="space-y-0.5">
              <li>이 단계는 실제 Naver API 호출 전 승인 준비 단계입니다.</li>
              <li>현재 승인해도 실제 네이버 상품은 변경되지 않습니다.</li>
              <li>Live 실행은 별도 승인과 추가 Safety Gate가 준비된 이후에만 진행합니다.</li>
              <li>운영 DB / 운영 Redis / 실제 Naver API 호출은 아직 비활성화되어 있습니다.</li>
            </ul>
          </div>

          {/* 승인 준비 상태 요약 카드 */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">승인 준비 상태</p>
              <p className={`text-xs font-semibold ${job.liveSingleTestApproval.approvalReady ? 'text-emerald-400' : 'text-amber-400'}`}>
                {job.liveSingleTestApproval.approvalReady ? '준비 완료' : '준비 미완료'}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Naver API 호출</p>
              <p className="text-xs font-semibold text-red-400">비활성화 (항상 차단)</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Live 실행 가능 여부</p>
              <p className="text-xs font-semibold text-red-400">비활성화 (항상 차단)</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">점검 현황</p>
              <p className="text-xs">
                <span className={job.liveSingleTestApproval.summary.blockingCount > 0 ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                  차단 {job.liveSingleTestApproval.summary.blockingCount}건
                </span>
                {' · '}
                <span className="text-emerald-400">통과 {job.liveSingleTestApproval.summary.passCount}건</span>
              </p>
            </div>
          </div>

          {/* 대상 정보 카드 */}
          {job.liveSingleTestApproval.targetProductSummary && (
            <div className="mb-4 rounded-md border border-[#262629] bg-[#18181b] p-3 text-xs">
              <p className="mb-2 font-semibold text-gray-300">대상 item 정보</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                {job.liveSingleTestApproval.targetProductSummary.productName && (
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-gray-500">상품명: </span>
                    <span className="text-gray-200">{job.liveSingleTestApproval.targetProductSummary.productName}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.channelProductNo && (
                  <div>
                    <span className="text-gray-500">채널 상품번호: </span>
                    <span className="font-mono text-gray-300">{job.liveSingleTestApproval.targetProductSummary.channelProductNo}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.targetType && (
                  <div>
                    <span className="text-gray-500">대상 유형: </span>
                    <span className="text-gray-300">{job.liveSingleTestApproval.targetProductSummary.targetType}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.changeType && (
                  <div>
                    <span className="text-gray-500">변경 유형: </span>
                    <span className="font-semibold text-emerald-400">{job.liveSingleTestApproval.targetProductSummary.changeType}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.skuCode && (
                  <div>
                    <span className="text-gray-500">SKU: </span>
                    <span className="font-mono text-gray-300">{job.liveSingleTestApproval.targetProductSummary.skuCode}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.priceChange && (
                  <div>
                    <span className="text-gray-500">가격 변경 예정: </span>
                    <span className="text-gray-400 line-through">
                      {String(job.liveSingleTestApproval.targetProductSummary.priceChange.before ?? '-')}
                    </span>
                    {' → '}
                    <span className="font-semibold text-white">
                      {String(job.liveSingleTestApproval.targetProductSummary.priceChange.after ?? '-')}
                    </span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.stockChange && (
                  <div>
                    <span className="text-gray-500">재고 변경 예정: </span>
                    <span className="text-gray-400 line-through">
                      {String(job.liveSingleTestApproval.targetProductSummary.stockChange.before ?? '-')}
                    </span>
                    {' → '}
                    <span className="font-semibold text-white">
                      {String(job.liveSingleTestApproval.targetProductSummary.stockChange.after ?? '-')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 차단 사유 */}
          {job.liveSingleTestApproval.blockingReasons.length > 0 && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
              <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                차단 사유 ({job.liveSingleTestApproval.blockingReasons.length}건)
              </p>
              <ul className="space-y-1">
                {job.liveSingleTestApproval.blockingReasons.map((reason, idx) => (
                  <li key={idx} className="text-red-200">- {reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 항목별 점검 결과 */}
          <div className="mb-4 space-y-1.5">
            <p className="mb-2 text-xs font-semibold text-gray-400">항목별 점검 결과</p>
            {job.liveSingleTestApproval.checklistItems.map(item => (
              <div
                key={item.key}
                className={`flex items-start gap-3 rounded-md border p-2 text-xs ${
                  item.status === 'PASS'
                    ? 'border-emerald-500/20 bg-emerald-500/10'
                    : item.status === 'BLOCKED'
                      ? 'border-red-500/20 bg-red-500/10'
                      : item.status === 'WARN'
                        ? 'border-amber-500/20 bg-amber-500/10'
                        : 'border-blue-500/20 bg-blue-500/10'
                }`}
              >
                <span className={`mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 ${
                  item.status === 'PASS' ? 'text-emerald-400'
                    : item.status === 'BLOCKED' ? 'text-red-400'
                    : item.status === 'WARN' ? 'text-amber-400'
                    : 'text-blue-400'
                }`}>
                  {item.status === 'PASS' ? 'PASS'
                    : item.status === 'BLOCKED' ? 'BLOCKED'
                    : item.status === 'WARN' ? 'WARN'
                    : 'REVIEW'}
                </span>
                <div>
                  <p className="font-semibold text-gray-200">{item.label}</p>
                  <p className="text-gray-400">{item.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 필수 확인 문구 (requiredAcknowledgements) */}
          {job.liveSingleTestApproval.requiredAcknowledgements.length > 0 && (
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
              <p className="mb-2 font-semibold text-amber-300">
                필수 확인 항목 ({job.liveSingleTestApproval.requiredAcknowledgements.length}건 — 실제 Live 테스트 단계 전 확인 필요)
              </p>
              <ul className="space-y-1.5 text-amber-100">
                {job.liveSingleTestApproval.requiredAcknowledgements.map(ack => (
                  <li key={ack} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] text-amber-400">[확인 필요]</span>
                    <span>
                      {ack === 'CONFIRM_SINGLE_ITEM_ONLY' && '실제 Live 테스트는 단일 상품 1건으로만 제한됩니다.'}
                      {ack === 'CONFIRM_TARGET_PRODUCT_REVIEWED' && '대상 상품번호, 스마트스토어, 변경 예정 payload를 직접 확인해야 합니다.'}
                      {ack === 'CONFIRM_PAYLOAD_REVIEWED' && '실제 변경될 가격/재고/키워드 값을 직접 검토했습니다.'}
                      {ack === 'CONFIRM_NAVER_API_STILL_DISABLED' && '운영 DB / 운영 Redis / 실제 Naver API 호출은 아직 비활성화되어 있습니다.'}
                      {ack === 'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER' && '실제 Live 테스트 단계에서는 네이버 스마트스토어 상품 정보가 변경될 수 있습니다.'}
                      {ack === 'CONFIRM_NO_REPLAY_ALLOWED' && 'Live 실행은 별도 승인과 추가 Safety Gate가 준비된 이후에만 진행합니다.'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Live 실행 비활성화 배지 */}
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
              Live 실행 비활성화됨
            </div>
            <div className="inline-flex items-center rounded-md border border-gray-500/30 bg-gray-500/10 px-3 py-1.5 text-xs text-gray-400">
              승인 준비만 가능 — 실제 Naver API 호출 불가
            </div>
          </div>

          {/* 다음 단계 안내 */}
          <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3 text-xs text-gray-400">
            <p className="mb-1 font-semibold text-gray-300">다음 단계 안내</p>
            <p>
              현재 단계에서는 실제 Live 실행이 불가능합니다. 다음 단계에서 별도 승인 흐름과
              단일 테스트 실행 제한을 다시 확인한 뒤 Live Adapter 구현 여부를 결정하세요.
            </p>
          </div>
        </div>
      )}

      {/* ── Live 단일 테스트 승인 기록 저장 ──────────────────────────────────── */}
      {job.liveSingleTestApproval && (() => {
        const guard = job.liveSingleTestApproval!;
        const existingAudit = job.liveSingleTestApprovalAudit ?? null;
        const activeFa = finalApprovals?.find(a => a.status === 'ACTIVE') ?? null;
        const allAcked = LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.every(a =>
          liveAuditCheckedItems.includes(a)
        );
        const canSave =
          !liveAuditSaving &&
          !liveAuditSaveResult &&
          !existingAudit &&
          !!activeFa &&
          guard.summary.blockingCount === 0 &&
          allAcked;

        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-violet-400" />
              Live 단일 테스트 승인 기록 저장
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 rounded-md border border-violet-500/20 bg-violet-500/10 p-3 text-xs text-violet-200">
              <p className="mb-1 font-semibold text-violet-300">승인 기록 저장 안내</p>
              <ul className="space-y-0.5">
                <li>이 버튼은 실제 Naver API를 호출하지 않습니다. 승인 기록만 저장합니다.</li>
                <li>승인 기록을 저장해도 실제 Live 실행은 계속 불가능합니다.</li>
                <li>저장된 승인 기록은 감사 추적(audit trail)용으로만 사용됩니다.</li>
                <li>모든 필수 확인 항목에 체크 후 저장 버튼을 클릭하세요.</li>
              </ul>
            </div>

            {/* 이미 저장된 audit record 표시 */}
            {(existingAudit || liveAuditSaveResult) && (
              <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  승인 기록 저장 완료
                </p>
                {(() => {
                  const audit = existingAudit ?? (liveAuditSaveResult ? {
                    auditCode: liveAuditSaveResult.approvalCode,
                    recordedAt: liveAuditSaveResult.recordedAt,
                    acknowledgedItems: liveAuditSaveResult.acknowledgedItems,
                    actorId: 'UI_USER',
                    naverApiCallAllowed: false as false,
                    liveExecutionEnabled: false as false,
                    maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
                  } : null);
                  if (!audit) return null;
                  return (
                    <div className="space-y-1 text-gray-300">
                      <div>
                        <span className="text-gray-500">승인 코드: </span>
                        <span className="font-mono text-xs text-emerald-300">{audit.auditCode}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">기록 시각: </span>
                        <span>{new Date(audit.recordedAt).toLocaleString()}</span>
                      </div>
                      {audit.actorId && (
                        <div>
                          <span className="text-gray-500">승인자: </span>
                          <span className="font-mono">{audit.actorId}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">확인 항목: </span>
                        <span>{audit.acknowledgedItems.length}건 완료</span>
                      </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                          Naver API 호출 비활성화됨
                        </span>
                        <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                          Live 실행 비활성화됨
                        </span>
                        <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                          승인 기록 전용 — 실행 상태 미전환
                        </span>
                      </div>
                      <p className="mt-2 text-[10px] text-gray-500">
                        이 기록은 Live 단일 테스트 전 확인 항목에 대한 감사 기록입니다. 이 기록만으로 실제 Naver API 호출은 실행되지 않습니다.
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 기록이 없을 때 체크박스 + 저장 버튼 표시 */}
            {!existingAudit && !liveAuditSaveResult && (
              <>
                {/* Guard 차단 경고 */}
                {guard.summary.blockingCount > 0 && (
                  <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                    <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      승인 준비 Guard에서 {guard.summary.blockingCount}건이 차단 중입니다
                    </p>
                    <p className="text-red-200">
                      위의 "Live 단일 테스트 승인 준비" 섹션의 차단 사유를 먼저 해결하세요.
                    </p>
                  </div>
                )}

                {/* 필수 확인 체크박스 */}
                <div className="mb-4 space-y-2">
                  <p className="mb-2 text-xs font-semibold text-gray-300">필수 확인 항목 (전체 체크 필요)</p>
                  {([
                    { key: 'CONFIRM_SINGLE_ITEM_ONLY', label: '실제 Live 테스트는 단일 상품 1건으로만 제한됩니다.' },
                    { key: 'CONFIRM_TARGET_PRODUCT_REVIEWED', label: '대상 상품번호, 스마트스토어, 변경 예정 payload를 직접 확인했습니다.' },
                    { key: 'CONFIRM_PAYLOAD_REVIEWED', label: '실제 변경될 가격/재고/키워드 값을 직접 검토했습니다.' },
                    { key: 'CONFIRM_NAVER_API_STILL_DISABLED', label: '운영 DB / 운영 Redis / 실제 Naver API 호출은 아직 비활성화되어 있습니다.' },
                    { key: 'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER', label: '실제 Live 테스트 단계에서는 네이버 스마트스토어 상품 정보가 변경될 수 있습니다.' },
                    { key: 'CONFIRM_NO_REPLAY_ALLOWED', label: 'Live 실행은 별도 승인과 추가 Safety Gate가 준비된 이후에만 진행합니다.' },
                  ] as const).map(({ key, label }) => {
                    const checked = liveAuditCheckedItems.includes(key);
                    return (
                      <label
                        key={key}
                        className={`flex cursor-pointer items-start gap-3 rounded-md border p-2.5 text-xs transition-colors ${
                          checked
                            ? 'border-violet-500/30 bg-violet-500/10'
                            : 'border-[#262629] bg-[#18181b] hover:border-violet-500/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 shrink-0 accent-violet-500"
                          checked={checked}
                          onChange={() => handleToggleLiveAuditItem(key)}
                        />
                        <span className={checked ? 'text-violet-200' : 'text-gray-400'}>
                          {label}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* 체크 현황 */}
                <div className="mb-4 flex items-center gap-2 text-xs">
                  <span className={liveAuditCheckedItems.length >= 6 ? 'text-violet-300 font-semibold' : 'text-gray-500'}>
                    {liveAuditCheckedItems.length} / {LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.length} 항목 확인됨
                  </span>
                  {!allAcked && (
                    <span className="text-amber-400">— 모든 항목을 체크해야 저장 가능합니다.</span>
                  )}
                </div>

                {/* 저장 오류 */}
                {liveAuditSaveError && (
                  <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                    <span className="font-semibold">오류: </span>{liveAuditSaveError}
                  </div>
                )}

                {/* 저장 버튼 */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleSaveLiveAudit}
                    disabled={!canSave}
                    className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                      canSave
                        ? 'border-violet-500/50 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30'
                        : 'cursor-not-allowed border-gray-700 bg-gray-800 text-gray-600'
                    }`}
                  >
                    {liveAuditSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                    승인 기록 저장 (실제 Naver API 미호출)
                  </button>
                  <span className="text-xs text-gray-500">
                    이 버튼은 승인 기록만 저장합니다 — 실제 네이버 스마트스토어 상품은 변경되지 않습니다.
                  </span>
                </div>

                {/* 비활성 이유 */}
                {!canSave && !liveAuditSaving && (
                  <div className="mt-3 text-xs text-gray-600">
                    {!activeFa && <div>• ACTIVE Final Approval이 없습니다.</div>}
                    {guard.summary.blockingCount > 0 && (
                      <div>• 승인 준비 Guard에서 {guard.summary.blockingCount}건이 차단 중입니다.</div>
                    )}
                    {!allAcked && <div>• 필수 확인 항목 {LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.length - liveAuditCheckedItems.filter(a => LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.includes(a as typeof LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS[number])).length}개가 미확인 상태입니다.</div>}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })()}

      {/* ── 환경 / DB 안전 확인 ─────────────────────────────────────────────── */}
      {job.environmentSafety && (() => {
        const env = job.environmentSafety!;
        const dbEnvColor: Record<string, string> = {
          local: 'text-emerald-400',
          test: 'text-teal-400',
          unknown: 'text-amber-400',
          operating_blocked: 'text-red-400',
        };
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-cyan-400" />
              Live 실행 전 환경 안전 점검
              <span className={`ml-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                env.allowed
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-red-500/30 bg-red-500/10 text-red-300'
              }`}>
                {env.allowed ? '안전 조건 충족' : '차단 항목 있음'}
              </span>
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 rounded-md border border-cyan-500/20 bg-cyan-500/10 p-3 text-xs text-cyan-200">
              <p className="mb-1 font-semibold text-cyan-300">환경 점검 안내</p>
              <p className="mb-1">현재 화면은 Live 실행 전 환경 안전 점검용입니다. 이 단계에서는 실제 Naver API 호출, Queue enqueue, Worker 실행, 운영 DB write가 모두 비활성화되어야 합니다.</p>
              <p className="text-cyan-300/70">환경 정보는 보안상 원문 URL이나 secret을 표시하지 않고 안전한 분류값만 표시합니다.</p>
            </div>

            {/* 환경 상태 요약 */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">DB 환경</p>
                <p className={`font-semibold font-mono ${dbEnvColor[env.databaseEnvironment] ?? 'text-gray-300'}`}>
                  {env.databaseEnvironment}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">Redis 환경</p>
                <p className={`font-semibold font-mono ${dbEnvColor[env.redisEnvironment] ?? 'text-gray-300'}`}>
                  {env.redisEnvironment}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">차단 항목</p>
                <p className={`font-semibold ${env.blockingReasons.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {env.blockingReasons.length}건
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">경고 항목</p>
                <p className={`font-semibold ${env.warnings.length > 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                  {env.warnings.length}건
                </p>
              </div>
            </div>

            {/* 항상 false 강제 배지 */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Naver API 호출 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> 운영 DB write 차단
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Queue 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Worker 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Secret 비노출
              </div>
            </div>

            {/* 차단 사유 */}
            {env.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  차단 사유 ({env.blockingReasons.length}건)
                </p>
                <ul className="space-y-1">
                  {env.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-red-200">- {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경고 */}
            {env.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  경고 ({env.warnings.length}건)
                </p>
                <ul className="space-y-1">
                  {env.warnings.map((w, idx) => (
                    <li key={idx} className="text-amber-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 체크리스트 */}
            <div className="space-y-1.5">
              <p className="mb-2 text-xs font-semibold text-gray-400">환경 안전 체크리스트</p>
              {env.checklistItems.map(item => (
                <div
                  key={item.key}
                  className={`flex items-start gap-3 rounded-md border p-2 text-xs ${
                    item.status === 'PASS'
                      ? 'border-emerald-500/20 bg-emerald-500/10'
                      : item.status === 'BLOCKED'
                        ? 'border-red-500/20 bg-red-500/10'
                        : item.status === 'WARN'
                          ? 'border-amber-500/20 bg-amber-500/10'
                          : 'border-blue-500/20 bg-blue-500/10'
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 ${
                    item.status === 'PASS' ? 'text-emerald-400'
                      : item.status === 'BLOCKED' ? 'text-red-400'
                      : item.status === 'WARN' ? 'text-amber-400'
                      : 'text-blue-400'
                  }`}>
                    {item.status === 'PASS' ? 'PASS'
                      : item.status === 'BLOCKED' ? 'BLOCKED'
                      : item.status === 'WARN' ? 'WARN'
                      : 'REVIEW'}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-200">{item.label}</p>
                    <p className="text-gray-400">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 환경 코드 */}
            <div className="mt-3 rounded-md border border-gray-500/20 bg-gray-500/5 p-2 text-xs text-gray-400">
              <span className="text-gray-500">환경 코드: </span>
              <span className="font-mono text-gray-300">{env.environmentCode}</span>
              <span className="mx-2 text-gray-600">|</span>
              <span>{env.environmentMessage}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Live Adapter Skeleton 상태 ───────────────────────────────────────── */}
      {job.liveAdapterSkeletonStatus && (() => {
        const skel = job.liveAdapterSkeletonStatus!;
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-violet-400" />
              Live Adapter 준비 상태 — 실제 호출 비활성화
              <span className="ml-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                {skel.resultCode}
              </span>
            </h2>

            {/* 안내 */}
            <div className="mb-4 rounded-md border border-violet-500/20 bg-violet-500/10 p-3 text-xs text-violet-200">
              <p>{skel.resultMessage}</p>
            </div>

            {/* 안전 배지 */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold text-violet-300">
                <X className="mr-1 h-3 w-3" /> Live Adapter skeleton만 존재
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> 실제 호출 비활성화
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> HTTP 요청 없음
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Token 요청 없음
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Endpoint 호출 없음
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Live 실행 불가
              </span>
            </div>

            {/* 상태 체크 그리드 */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:grid-cols-4">
              {[
                { label: 'naverApiCalled', value: skel.naverApiCalled },
                { label: 'naverApiCallAllowed', value: skel.naverApiCallAllowed },
                { label: 'liveExecutionEnabled', value: skel.liveExecutionEnabled },
                { label: 'httpRequestCreated', value: skel.httpRequestCreated },
                { label: 'endpointCalled', value: skel.endpointCalled },
                { label: 'accessTokenRequested', value: skel.accessTokenRequested },
                { label: 'credentialsUsed', value: skel.credentialsUsed },
                { label: 'operatingDbWriteAllowed', value: skel.operatingDbWriteAllowed },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-md border border-[#262629] bg-[#18181b] p-2 text-center">
                  <p className="text-[9px] text-gray-500">{label}</p>
                  <p className={`mt-0.5 font-mono text-xs font-bold ${value ? 'text-red-400' : 'text-emerald-400'}`}>
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>

            {/* maxAllowedState */}
            <div className="rounded-md border border-gray-600/20 bg-gray-600/5 p-2 text-xs text-gray-400">
              <span className="text-gray-500">최대 허용 상태: </span>
              <span className="font-mono text-violet-300">{skel.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Live 단일 테스트 승인 감사 이력 ─────────────────────────────────── */}
      {job.liveSingleTestAuditHistory && (() => {
        const hist = job.liveSingleTestAuditHistory!;
        const latest = hist.latestAudit;
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-indigo-400" />
              Live 단일 테스트 승인 감사 이력
              <span className={`ml-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                hist.exists
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                  : 'border-gray-600/30 bg-gray-600/10 text-gray-500'
              }`}>
                {hist.exists ? `기록 ${hist.summary.totalRecords}건` : '기록 없음'}
              </span>
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200">
              <p className="mb-1">이 감사 기록은 승인 확인 이력일 뿐이며 실제 Naver API 호출을 실행하지 않습니다.</p>
              <p className="text-indigo-300/70">Live 실행은 별도 단계에서 추가 Safety Gate와 명시 승인 후에만 검토합니다.</p>
            </div>

            {/* 안전 상태 배지 */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Naver API 호출 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Live 실행 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> 운영 DB write 차단
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Queue 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Worker 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Secret 비노출 (조회 전용)
              </div>
            </div>

            {/* 기록 없음 */}
            {!hist.exists && (
              <div className="rounded-md border border-gray-600/20 bg-gray-600/5 p-3 text-xs text-gray-400">
                <p className="font-semibold text-gray-300">승인 감사 기록이 없습니다.</p>
                <p className="mt-1">Live 단일 테스트 승인 기록 저장 섹션에서 먼저 필수 확인 항목을 체크하고 기록을 저장하세요.</p>
              </div>
            )}

            {/* 최신 감사 기록 */}
            {latest && (
              <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs">
                <p className="mb-3 text-xs font-semibold text-indigo-300">최신 감사 기록</p>

                {/* 기본 정보 */}
                <div className="mb-3 grid grid-cols-1 gap-y-1.5 sm:grid-cols-2">
                  <div>
                    <span className="text-gray-500">승인 코드: </span>
                    <span className="font-mono text-indigo-300">{latest.auditCode}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">상태: </span>
                    <span className={`font-semibold ${
                      latest.status === 'RECORDED_BUT_NOT_EXECUTABLE'
                        ? 'text-emerald-400'
                        : 'text-gray-400'
                    }`}>
                      {latest.status === 'RECORDED_BUT_NOT_EXECUTABLE'
                        ? '기록 완료 (실행 불가)'
                        : latest.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">기록 시각: </span>
                    <span className="text-gray-200">
                      {latest.recordedAt ? new Date(latest.recordedAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">승인자: </span>
                    <span className="font-mono text-gray-200">{latest.actorId ?? '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">BatchJob ID: </span>
                    <span className="font-mono text-gray-400">
                      {latest.batchJobId ? `${latest.batchJobId.substring(0, 16)}…` : '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">FinalApproval ID: </span>
                    <span className="font-mono text-gray-400">
                      {latest.finalApprovalId
                        ? `${latest.finalApprovalId.substring(0, 16)}…`
                        : '-'}
                    </span>
                  </div>
                </div>

                {/* 대상 상품 정보 */}
                {latest.targetProductSummary && (
                  <div className="mb-3 rounded-md border border-gray-600/20 bg-gray-600/5 p-2.5">
                    <p className="mb-1.5 text-[10px] font-semibold text-gray-400">대상 상품 정보</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {Object.entries(latest.targetProductSummary).map(([k, v]) =>
                        v !== null && v !== undefined ? (
                          <div key={k}>
                            <span className="text-gray-500">{k}: </span>
                            <span className="text-gray-200">{String(v)}</span>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                {/* acknowledgement 목록 */}
                <div className="mb-3">
                  <p className="mb-1.5 text-[10px] font-semibold text-gray-400">
                    확인 항목 ({latest.acknowledgedItems.length}건 완료
                    {latest.missingAcknowledgements.length > 0
                      ? ` / ${latest.missingAcknowledgements.length}건 누락`
                      : ''})
                  </p>
                  <ul className="space-y-1">
                    {latest.acknowledgedItems.map(ack => (
                      <li key={ack} className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                        <span className="font-mono text-[10px]">{ack}</span>
                      </li>
                    ))}
                    {latest.missingAcknowledgements.map(ack => (
                      <li key={ack} className="flex items-center gap-1.5 text-amber-400">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        <span className="font-mono text-[10px]">{ack} (누락)</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 실행 불가 배지 */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                    naverApiCallAllowed: false
                  </span>
                  <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                    liveExecutionEnabled: false
                  </span>
                  <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                    operatingDbWriteAllowed: false
                  </span>
                  <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                    queueAllowed: false
                  </span>
                  <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                    workerAllowed: false
                  </span>
                </div>
              </div>
            )}

            {/* 경고 */}
            {hist.warnings.length > 0 && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-2.5 text-xs">
                <p className="mb-1 flex items-center gap-1 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  경고 ({hist.warnings.length}건)
                </p>
                <ul className="space-y-0.5">
                  {hist.warnings.map((w, idx) => (
                    <li key={idx} className="text-amber-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* maxAllowedState */}
            <div className="mt-3 rounded-md border border-gray-600/20 bg-gray-600/5 p-2 text-xs text-gray-400">
              <span className="text-gray-500">최대 허용 상태: </span>
              <span className="font-mono text-gray-300">{hist.maxAllowedState}</span>
            </div>

            {/* 전체 감사 기록 대시보드 링크 */}
            <div className="mt-3 flex items-center justify-end">
              <Link
                href="/dashboard/sku-keyword-final-approval-live-audits"
                className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20"
              >
                <FileJson className="h-3.5 w-3.5" />
                전체 감사 기록 대시보드 →
              </Link>
            </div>
          </div>
        );
      })()}

      {/* ── Naver API 인증정보 안전 확인 ────────────────────────────────────── */}
      <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
          <ShieldAlert className="h-5 w-5 text-slate-400" />
          Naver API 인증정보 안전 확인
        </h2>

        <div className="mb-3 rounded-md border border-slate-500/20 bg-slate-500/10 p-3 text-xs text-slate-300">
          이 섹션은 인증정보의 존재 여부만 안전한 상태값으로 표시합니다. secret, token, authorization header, endpoint URL은 표시하지 않으며, token 발급이나 Naver API 호출도 수행하지 않습니다.
        </div>

        {job.naverAuthConfigSafety ? (
          <div className="space-y-4">
            {/* 인증정보 상태 요약 */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">인증정보 상태:</span>
              <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
                job.naverAuthConfigSafety.authConfigStatus === 'CONFIGURED_BUT_BLOCKED'
                  ? 'border-amber-500/30 bg-amber-500/20 text-amber-300'
                  : job.naverAuthConfigSafety.authConfigStatus === 'MISSING'
                    ? 'border-red-500/30 bg-red-500/20 text-red-300'
                    : job.naverAuthConfigSafety.authConfigStatus === 'PARTIAL'
                      ? 'border-orange-500/30 bg-orange-500/20 text-orange-300'
                      : 'border-slate-500/30 bg-slate-500/20 text-slate-300'
              }`}>
                {job.naverAuthConfigSafety.authConfigStatus}
              </span>
            </div>

            {/* 안전 배지 */}
            <div>
              <p className="mb-2 text-xs font-semibold text-gray-400">안전 배지 (모두 비활성화됨)</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Secret 원문 비노출', ok: !job.naverAuthConfigSafety.secretVisible },
                  { label: 'Token 발급 비활성화', ok: !job.naverAuthConfigSafety.tokenIssued },
                  { label: '인증정보 사용 안 함', ok: !job.naverAuthConfigSafety.credentialsUsed },
                  { label: 'Authorization header 없음', ok: !job.naverAuthConfigSafety.authorizationHeaderCreated },
                  { label: 'Endpoint 호출 없음', ok: !job.naverAuthConfigSafety.endpointCalled },
                  { label: 'Naver API 호출 비활성화', ok: !job.naverAuthConfigSafety.naverApiCallAllowed },
                ].map(({ label, ok }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${
                      ok
                        ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                        : 'border-red-500/30 bg-red-500/20 text-red-300'
                    }`}
                  >
                    {ok ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* 상태 카드 */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: 'credentialConfigured', value: String(job.naverAuthConfigSafety.credentialConfigured) },
                { label: 'authConfigUsable', value: String(job.naverAuthConfigSafety.authConfigUsable) },
                { label: 'clientIdStatus', value: job.naverAuthConfigSafety.clientIdStatus },
                { label: 'clientSecretStatus', value: job.naverAuthConfigSafety.clientSecretStatus },
                { label: 'tokenStatus', value: job.naverAuthConfigSafety.tokenStatus },
                { label: 'accessTokenRequested', value: String(job.naverAuthConfigSafety.accessTokenRequested) },
                { label: 'credentialsUsed', value: String(job.naverAuthConfigSafety.credentialsUsed) },
                { label: 'tokenIssued', value: String(job.naverAuthConfigSafety.tokenIssued) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                  <p className="mb-0.5 text-[10px] text-gray-500">{label}</p>
                  <p className={`font-mono text-xs font-semibold ${
                    value === 'false' || value === 'disabled' || value === 'missing'
                      ? 'text-slate-400'
                      : value === 'true' || value === 'configured'
                        ? 'text-amber-300'
                        : 'text-gray-300'
                  }`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* 차단 사유 */}
            {job.naverAuthConfigSafety.blockingReasons.length > 0 && (
              <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-red-300">차단 사유</p>
                <ul className="space-y-0.5 text-xs text-red-200">
                  {job.naverAuthConfigSafety.blockingReasons.map((reason, i) => (
                    <li key={i}>- {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경고 */}
            {job.naverAuthConfigSafety.warnings.length > 0 && (
              <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-amber-300">경고</p>
                <ul className="space-y-0.5 text-xs text-amber-200">
                  {job.naverAuthConfigSafety.warnings.map((w, i) => (
                    <li key={i}>- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* maxAllowedState */}
            <div className="rounded-md border border-slate-500/20 bg-slate-500/10 p-2">
              <p className="text-[10px] text-gray-500">maxAllowedState</p>
              <p className="font-mono text-xs text-slate-300">{job.naverAuthConfigSafety.maxAllowedState}</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400">인증정보 안전 확인 정보를 불러오는 중입니다...</div>
        )}
      </div>

      {/* ── Naver API Token Provider 상태 ──────────────────────────────────── */}
      {job.naverAuthTokenProviderStatus && (() => {
        const tp = job.naverAuthTokenProviderStatus!;
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-rose-400" />
              Token Provider 준비 상태 — 발급 비활성화
              <span className="ml-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                {tp.resultCode}
              </span>
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 rounded-md border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-200">
              <p>
                이 섹션은 Token Provider 구조가 준비되었지만 token 발급이 비활성화되어 있음을 표시합니다.
                이 단계에서는 access token 발급, refresh token 요청, authorization header 생성, Naver API 호출을 수행하지 않습니다.
              </p>
            </div>

            {/* Token Provider 상태 요약 */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm text-gray-400">Token Provider 상태:</span>
              <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-300">
                {tp.status}
              </span>
              <span className="rounded-full border border-slate-500/30 bg-slate-500/10 px-2 py-0.5 text-xs text-slate-400">
                tokenStatus: {tp.tokenStatus}
              </span>
            </div>

            {/* 안전 배지 */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">안전 배지 (모두 비활성화됨)</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Token 발급 비활성화', ok: !tp.tokenIssued },
                  { label: 'Refresh Token 요청 없음', ok: !tp.refreshTokenRequested },
                  { label: '인증정보 사용 안 함', ok: !tp.credentialsUsed },
                  { label: 'Authorization header 없음', ok: !tp.authorizationHeaderCreated },
                  { label: 'Endpoint 호출 없음', ok: !tp.endpointCalled },
                  { label: 'Naver API 호출 비활성화', ok: !tp.naverApiCallAllowed },
                  { label: 'Token 저장 없음', ok: !tp.tokenStored },
                  { label: 'Secret 비노출', ok: !tp.secretVisible },
                ].map(({ label, ok }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${
                      ok
                        ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                        : 'border-red-500/30 bg-red-500/20 text-red-300'
                    }`}
                  >
                    {ok ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* 상태 카드 */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:grid-cols-4">
              {[
                { label: 'accessTokenRequested', value: String(tp.accessTokenRequested) },
                { label: 'refreshTokenRequested', value: String(tp.refreshTokenRequested) },
                { label: 'tokenIssued', value: String(tp.tokenIssued) },
                { label: 'tokenStored', value: String(tp.tokenStored) },
                { label: 'credentialsUsed', value: String(tp.credentialsUsed) },
                { label: 'authorizationHeaderCreated', value: String(tp.authorizationHeaderCreated) },
                { label: 'endpointCalled', value: String(tp.endpointCalled) },
                { label: 'httpRequestCreated', value: String(tp.httpRequestCreated) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-md border border-[#262629] bg-[#18181b] p-2 text-center">
                  <p className="text-[9px] text-gray-500">{label}</p>
                  <p className={`mt-0.5 font-mono text-xs font-bold ${value === 'false' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* 차단/경고 사유 */}
            {tp.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  차단 사유 ({tp.blockingReasons.length}건)
                </p>
                <ul className="space-y-1">
                  {tp.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-red-200">- {reason}</li>
                  ))}
                </ul>
              </div>
            )}
            {tp.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  경고 ({tp.warnings.length}건)
                </p>
                <ul className="space-y-1">
                  {tp.warnings.map((w, idx) => (
                    <li key={idx} className="text-amber-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* maxAllowedState */}
            <div className="rounded-md border border-slate-500/20 bg-slate-500/10 p-2 text-xs text-gray-400">
              <span className="text-gray-500">최대 허용 상태: </span>
              <span className="font-mono text-rose-300">{tp.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Naver API Token Dry Permission Gate ────────────────────────────── */}
      {job.naverAuthTokenDryPermissionGate && (() => {
        const gate = job.naverAuthTokenDryPermissionGate!;
        const statusColor = gate.dryCheckPassed
          ? 'text-indigo-400'
          : gate.status === 'BLOCKED'
            ? 'text-red-400'
            : 'text-amber-400';
        const borderColor = gate.dryCheckPassed
          ? 'border-indigo-500/30'
          : gate.status === 'BLOCKED'
            ? 'border-red-500/30'
            : 'border-amber-500/30';
        const bgColor = gate.dryCheckPassed
          ? 'bg-indigo-500/10'
          : gate.status === 'BLOCKED'
            ? 'bg-red-500/10'
            : 'bg-amber-500/10';
        const textColor = gate.dryCheckPassed
          ? 'text-indigo-200'
          : gate.status === 'BLOCKED'
            ? 'text-red-200'
            : 'text-amber-200';
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className={`h-5 w-5 ${statusColor}`} />
              Token Dry Permission Gate — 사전 조건 점검
              <span className={`ml-1 rounded-full border ${borderColor} ${bgColor} px-2 py-0.5 text-[10px] font-semibold ${textColor}`}>
                {gate.resultCode}
              </span>
            </h2>

            {/* 안내 문구 */}
            <div className={`mb-4 rounded-md border ${borderColor} ${bgColor} p-3 text-xs ${textColor}`}>
              <p>
                이 섹션은 token 발급 전 dry-run 점검 결과를 표시합니다.
                모든 선행 조건이 충족되어도(dryCheckPassed=true) 이 단계에서는 token을 발급하지 않습니다.
              </p>
            </div>

            {/* 상태 요약 */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-400">Gate 상태:</span>
              <span className={`rounded-full border ${borderColor} ${bgColor} px-2 py-0.5 text-xs font-semibold ${textColor}`}>
                {gate.status}
              </span>
              <span className={`rounded-full border ${gate.dryCheckPassed ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-slate-500/30 bg-slate-500/10 text-slate-400'} px-2 py-0.5 text-xs font-semibold`}>
                dryCheckPassed: {String(gate.dryCheckPassed)}
              </span>
              <span className="rounded-full border border-slate-500/30 bg-slate-500/10 px-2 py-0.5 text-xs text-slate-400">
                tokenStatus: {gate.tokenStatus}
              </span>
            </div>

            {/* 안전 배지 */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">안전 배지 (모두 비활성화됨)</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Token 발급 차단', ok: !gate.tokenIssued },
                  { label: 'Token 요청 차단', ok: !gate.tokenRequestAllowed },
                  { label: 'Refresh Token 없음', ok: !gate.refreshTokenRequested },
                  { label: '인증정보 사용 안 함', ok: !gate.credentialsUsed },
                  { label: 'Authorization header 없음', ok: !gate.authorizationHeaderCreated },
                  { label: 'Endpoint 호출 없음', ok: !gate.endpointCalled },
                  { label: 'Naver API 호출 차단', ok: !gate.naverApiCallAllowed },
                  { label: 'Secret 비노출', ok: !gate.secretVisible },
                ].map(({ label, ok }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${
                      ok
                        ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                        : 'border-red-500/30 bg-red-500/20 text-red-300'
                    }`}
                  >
                    {ok ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* 상태 카드 */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:grid-cols-4">
              {[
                { label: 'allowed', value: String(gate.allowed) },
                { label: 'tokenRequestAllowed', value: String(gate.tokenRequestAllowed) },
                { label: 'accessTokenRequested', value: String(gate.accessTokenRequested) },
                { label: 'tokenIssued', value: String(gate.tokenIssued) },
                { label: 'credentialsUsed', value: String(gate.credentialsUsed) },
                { label: 'authorizationHeaderCreated', value: String(gate.authorizationHeaderCreated) },
                { label: 'endpointCalled', value: String(gate.endpointCalled) },
                { label: 'naverApiCallAllowed', value: String(gate.naverApiCallAllowed) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-md border border-[#262629] bg-[#18181b] p-2 text-center">
                  <p className="text-[9px] text-gray-500">{label}</p>
                  <p className={`mt-0.5 font-mono text-xs font-bold ${value === 'false' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* 차단 사유 */}
            {gate.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  차단 사유 ({gate.blockingReasons.length}건)
                </p>
                <ul className="space-y-1">
                  {gate.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-red-200">- {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 검토 필요 사유 */}
            {gate.needsReviewReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  검토 필요 ({gate.needsReviewReasons.length}건)
                </p>
                <ul className="space-y-1">
                  {gate.needsReviewReasons.map((r, idx) => (
                    <li key={idx} className="text-amber-200">- {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경고 */}
            {gate.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-yellow-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  경고 ({gate.warnings.length}건)
                </p>
                <ul className="space-y-1">
                  {gate.warnings.map((w, idx) => (
                    <li key={idx} className="text-yellow-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 체크리스트 요약 */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">
                점검 항목 ({gate.checklistItems.length}건)
              </p>
              <div className="space-y-1">
                {gate.checklistItems.map((item) => (
                  <div key={item.key} className="flex items-start gap-2 rounded-sm px-2 py-1 text-xs">
                    <span className={`mt-0.5 shrink-0 font-semibold ${
                      item.status === 'PASS' ? 'text-emerald-400'
                      : item.status === 'WARN' ? 'text-amber-400'
                      : item.status === 'BLOCKED' ? 'text-red-400'
                      : 'text-yellow-400'
                    }`}>
                      [{item.status}]
                    </span>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* maxAllowedState */}
            <div className="rounded-md border border-slate-500/20 bg-slate-500/10 p-2 text-xs text-gray-400">
              <span className="text-gray-500">최대 허용 상태: </span>
              <span className="font-mono text-indigo-300">{gate.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Naver API Token Test-Only Skeleton ──────────────────────────────── */}
      {job.naverAuthTokenTestOnlySkeletonStatus && (() => {
        const sk = job.naverAuthTokenTestOnlySkeletonStatus!;
        const statusColor =
          sk.status === 'DISABLED'
            ? 'text-red-400 border-red-500/40 bg-red-500/5'
            : sk.blockingReasons.length > 0
              ? 'text-red-400 border-red-500/40 bg-red-500/5'
              : sk.needsReviewReasons.length > 0
                ? 'text-amber-400 border-amber-500/40 bg-amber-500/5'
                : 'text-violet-400 border-violet-500/40 bg-violet-500/5';
        return (
          <div className={`mb-6 rounded-lg border p-4 ${statusColor}`}>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              Token Test-Only Skeleton — 코드 경로 준비 확인
              <span className="ml-auto rounded-full border px-2 py-0.5 text-xs font-semibold">
                {sk.status}
              </span>
            </h2>

            {/* 안전 배지 */}
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                testOnlyMode=true
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Token 발급 차단
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Endpoint 미해석
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                HTTP Client 없음
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Secret 비노출
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Naver API 호출 차단
              </span>
            </div>

            {/* 결과 메시지 */}
            <div className="mb-4 rounded-md border border-slate-500/20 bg-slate-500/10 p-3 text-xs">
              <span className="text-gray-400">resultCode: </span>
              <span className="font-mono text-indigo-300">{sk.resultCode}</span>
              <div className="mt-1 text-gray-300">{sk.resultMessage}</div>
            </div>

            {/* 상태 카드 */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
              {([
                ['testOnlyMode', String(sk.testOnlyMode)],
                ['tokenRequestPrepared', String(sk.tokenRequestPrepared)],
                ['tokenRequestExecuted', String(sk.tokenRequestExecuted)],
                ['tokenRequestAllowed', String(sk.tokenRequestAllowed)],
                ['tokenIssued', String(sk.tokenIssued)],
                ['dryPermissionPassed', String(sk.dryPermissionPassed)],
                ['endpointResolved', String(sk.endpointResolved)],
                ['httpClientCreated', String(sk.httpClientCreated)],
                ['naverApiCallAllowed', String(sk.naverApiCallAllowed)],
              ] as [string, string][]).map(([k, v]) => (
                <div key={k} className="rounded-sm border border-slate-500/20 bg-slate-500/10 px-2 py-1">
                  <span className="text-gray-400">{k}: </span>
                  <span className={v === 'true' ? (k === 'dryPermissionPassed' ? 'text-violet-300 font-semibold' : 'text-red-300 font-semibold') : 'text-emerald-300 font-semibold'}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* 차단 사유 */}
            {sk.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  차단 사유 ({sk.blockingReasons.length}건)
                </p>
                <ul className="space-y-1">
                  {sk.blockingReasons.map((r, idx) => (
                    <li key={idx} className="text-red-200">- {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 검토 필요 */}
            {sk.needsReviewReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  검토 필요 ({sk.needsReviewReasons.length}건)
                </p>
                <ul className="space-y-1">
                  {sk.needsReviewReasons.map((r, idx) => (
                    <li key={idx} className="text-amber-200">- {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경고 */}
            {sk.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-yellow-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  경고 ({sk.warnings.length}건)
                </p>
                <ul className="space-y-1">
                  {sk.warnings.map((w, idx) => (
                    <li key={idx} className="text-yellow-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 체크리스트 */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">
                점검 항목 ({sk.checklistItems.length}건)
              </p>
              <div className="space-y-1">
                {sk.checklistItems.map((item) => (
                  <div key={item.key} className="flex items-start gap-2 rounded-sm px-2 py-1 text-xs">
                    <span className={`mt-0.5 shrink-0 font-semibold ${
                      item.status === 'PASS' ? 'text-emerald-400'
                      : item.status === 'WARN' ? 'text-amber-400'
                      : item.status === 'BLOCKED' ? 'text-red-400'
                      : 'text-yellow-400'
                    }`}>
                      [{item.status}]
                    </span>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* maxAllowedState */}
            <div className="rounded-md border border-slate-500/20 bg-slate-500/10 p-2 text-xs text-gray-400">
              <span className="text-gray-500">최대 허용 상태: </span>
              <span className="font-mono text-indigo-300">{sk.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ── 최초 Token 발급 테스트 승인 기록 ────────────────────────────────── */}
      {(() => {
        // 기존 저장된 audit 확인
        const savedAudit = job.naverAuthTokenTestApprovalAudit;
        const hasExistingAudit = savedAudit && savedAudit.hasAudit === true;
        const existingAudit = hasExistingAudit ? (savedAudit as NaverAuthTokenTestApprovalAuditRecord) : null;
        const currentActiveFinalApproval = finalApprovals?.find(a => a.status === 'ACTIVE') ?? null;
        const allTokenTestAcksChecked = TOKEN_TEST_APPROVAL_REQUIRED_ACKNOWLEDGEMENTS.every(a =>
          tokenTestApprovalCheckedItems.includes(a)
        );
        const canSaveTokenTestApproval =
          allTokenTestAcksChecked &&
          !!currentActiveFinalApproval &&
          !tokenTestApprovalSaving;

        return (
          <div className="mb-6 rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-indigo-300">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              최초 Token 발급 테스트 전 사용자 승인 기록
              {hasExistingAudit && (
                <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                  기록 완료
                </span>
              )}
            </h2>

            {/* 안전 안내 배너 */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
              <p className="mb-1 font-semibold text-amber-300">⚠ 안전 안내 — 이 섹션은 승인 기록만 저장합니다</p>
              <ul className="space-y-1 text-xs">
                <li>• 이 승인 기록은 실제 token 발급을 실행하지 않습니다.</li>
                <li>• 상품 수정 API 호출과 연결되지 않습니다.</li>
                <li>• 성공해도 Live 실행이 활성화되지 않습니다.</li>
                <li>• Naver API endpoint URL이 이 단계에서 resolve되지 않습니다.</li>
                <li>• HTTP client가 생성되지 않습니다.</li>
                <li>• Authorization header가 생성되지 않습니다.</li>
              </ul>
            </div>

            {/* 필수 acknowledgement 체크박스 */}
            {!hasExistingAudit && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-gray-400">
                  필수 확인 항목 ({tokenTestApprovalCheckedItems.length}/{TOKEN_TEST_APPROVAL_REQUIRED_ACKNOWLEDGEMENTS.length}건 확인됨)
                </p>
                <div className="space-y-2">
                  {TOKEN_TEST_APPROVAL_REQUIRED_ACKNOWLEDGEMENTS.map((ack) => (
                    <label
                      key={ack}
                      className="flex cursor-pointer items-start gap-3 rounded-md border border-[#262629] bg-[#18181b] p-3 text-xs transition hover:border-indigo-500/40 hover:bg-indigo-500/5"
                    >
                      <input
                        type="checkbox"
                        id={`token-test-approval-${ack}`}
                        checked={tokenTestApprovalCheckedItems.includes(ack)}
                        onChange={() => handleToggleTokenTestApprovalItem(ack)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-indigo-500"
                      />
                      <span className="text-gray-300">
                        <span className="block font-mono text-[10px] text-gray-500 mb-0.5">{ack}</span>
                        {TOKEN_TEST_APPROVAL_LABELS[ack] ?? ack}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 저장 버튼 */}
            {!hasExistingAudit && (
              <div className="mb-4">
                {!currentActiveFinalApproval && (
                  <div className="mb-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-2 text-xs text-amber-300">
                    ⚠ ACTIVE Final Approval이 없습니다. 먼저 최종 승인 Artifact를 생성하세요.
                  </div>
                )}
                <button
                  type="button"
                  id="btn-save-token-test-approval-audit"
                  disabled={!canSaveTokenTestApproval}
                  onClick={() => void handleSaveTokenTestApproval()}
                  className={`rounded-md px-5 py-2 text-sm font-semibold transition ${
                    canSaveTokenTestApproval
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                      : 'cursor-not-allowed bg-slate-700 text-slate-400 opacity-60'
                  }`}
                >
                  {tokenTestApprovalSaving ? (
                    <><Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />저장 중...</>
                  ) : (
                    '승인 기록 저장 (Token 발급 미실행)'
                  )}
                </button>
                <p className="mt-1 text-[10px] text-gray-500">
                  이 버튼은 승인 기록만 저장합니다. token 발급 버튼이 아닙니다. 인증 테스트 버튼이 아닙니다. Live 실행 버튼이 아닙니다.
                </p>

                {/* 오류 */}
                {tokenTestApprovalSaveError && (
                  <div className="mt-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                    <span className="font-semibold">저장 오류: </span>{tokenTestApprovalSaveError}
                  </div>
                )}

                {/* 저장 성공 결과 (방금 저장) */}
                {tokenTestApprovalSaveResult && (
                  <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                    <p className="mb-1 font-semibold">✓ 승인 기록 저장 완료</p>
                    <p><span className="text-gray-400">auditCode: </span><span className="font-mono">{tokenTestApprovalSaveResult.auditCode}</span></p>
                    <p><span className="text-gray-400">recordedAt: </span>{tokenTestApprovalSaveResult.recordedAt}</p>
                    <p><span className="text-gray-400">acknowledgedItems: </span>{tokenTestApprovalSaveResult.acknowledgedItems.length}건</p>
                    <p className="mt-1 text-[10px] text-emerald-400">{tokenTestApprovalSaveResult.message}</p>
                  </div>
                )}
              </div>
            )}

            {/* 저장된 audit 표시 */}
            {existingAudit && (
              <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  저장된 승인 기록
                </p>
                <div className="mb-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">auditCode</p>
                    <p className="mt-0.5 font-mono text-indigo-300 break-all">{existingAudit.auditCode}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">recordedAt</p>
                    <p className="mt-0.5 font-mono text-gray-200">{new Date(existingAudit.recordedAt).toLocaleString()}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">recordedBy</p>
                    <p className="mt-0.5 text-gray-200">{existingAudit.recordedBy ?? '-'}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">acknowledgedItems</p>
                    <p className="mt-0.5 text-gray-200">{existingAudit.acknowledgedItems.length}건 확인됨</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">maxAllowedState</p>
                    <p className="mt-0.5 font-mono text-xs text-indigo-300 break-all">{existingAudit.maxAllowedState}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">approvalPurpose</p>
                    <p className="mt-0.5 font-mono text-xs text-gray-300 break-all">{existingAudit.approvalPurpose}</p>
                  </div>
                </div>

                {/* acknowledgedItems 목록 */}
                {existingAudit.acknowledgedItems.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1 text-xs font-semibold text-gray-400">확인된 항목 ({existingAudit.acknowledgedItems.length}건)</p>
                    <div className="space-y-1">
                      {existingAudit.acknowledgedItems.map(item => (
                        <div key={item} className="flex items-center gap-2 rounded-sm px-2 py-1 text-xs">
                          <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400" />
                          <span className="font-mono text-[10px] text-gray-500">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* false safety flags */}
                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold text-gray-400">안전 플래그 (모두 false)</p>
                  <div className="grid grid-cols-2 gap-1 text-xs sm:grid-cols-3">
                    {([
                      ['tokenRequestAllowed', existingAudit.tokenRequestAllowed],
                      ['accessTokenRequested', existingAudit.accessTokenRequested],
                      ['tokenIssued', existingAudit.tokenIssued],
                      ['endpointCalled', existingAudit.endpointCalled],
                      ['httpClientCreated', existingAudit.httpClientCreated],
                      ['naverApiCallAllowed', existingAudit.naverApiCallAllowed],
                      ['liveExecutionEnabled', existingAudit.liveExecutionEnabled],
                    ] as [string, boolean][]).map(([k, v]) => (
                      <div key={k} className="rounded-sm border border-slate-500/20 bg-slate-500/10 px-2 py-1">
                        <span className="text-gray-500">{k}: </span>
                        <span className={v ? 'font-semibold text-red-300' : 'font-semibold text-emerald-300'}>{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 안전 배지 */}
            <div>
              <p className="mb-2 text-xs font-semibold text-gray-400">안전 배지</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Token 발급 미실행',
                  'Endpoint 호출 없음',
                  'HTTP client 없음',
                  'Authorization header 없음',
                  'Token 저장 없음',
                  'Live 실행 비활성화',
                  'Queue/Worker 없음',
                ].map(label => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── 최초 Token 발급 테스트 Safety Boundary ───────────────────────────────── */}
      {(() => {
        const boundary = job.naverAuthTokenFirstTestSafetyBoundary ?? null;
        if (!boundary) return null;

        const statusBadgeClass =
          boundary.status === 'READY_BUT_DISABLED'
            ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
            : boundary.status === 'BLOCKED'
              ? 'border-red-500/30 bg-red-500/20 text-red-300'
              : 'border-amber-500/30 bg-amber-500/20 text-amber-300';

        const checkItemBadge = (status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW') => {
          if (status === 'PASS') return 'text-emerald-400';
          if (status === 'WARN') return 'text-amber-400';
          if (status === 'BLOCKED') return 'text-red-400';
          return 'text-yellow-400';
        };

        const checkItemIcon = (status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW') => {
          if (status === 'PASS') return '✓';
          if (status === 'WARN') return '⚠';
          if (status === 'BLOCKED') return '✗';
          return '…';
        };

        return (
          <div className="mb-6 rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-violet-300">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              최초 Token 발급 테스트 Safety Boundary
              <span className={`ml-auto rounded-full border px-2 py-0.5 text-xs font-semibold ${statusBadgeClass}`}>
                {boundary.status}
              </span>
            </h2>

            {/* 안전 안내 배너 */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
              <p className="mb-1 font-semibold text-amber-300">⚠ 안전 안내 — 이 Boundary는 실제 token 발급을 실행하지 않습니다</p>
              <ul className="space-y-1 text-xs">
                <li>• 이 Boundary는 실제 token 발급을 실행하지 않습니다.</li>
                <li>• ready 상태여도 다음 Task에서 별도 명시 승인이 필요합니다.</li>
                <li>• 상품 수정 API 호출과 연결되지 않습니다.</li>
                <li>• Naver API endpoint URL이 이 단계에서 resolve되지 않습니다.</li>
                <li>• HTTP client가 생성되지 않습니다.</li>
              </ul>
            </div>

            {/* 상태 요약 카드 */}
            <div className="mb-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
                <p className="mb-1 text-gray-500">resultCode</p>
                <p className="font-mono text-violet-300 break-all">{boundary.resultCode}</p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
                <p className="mb-1 text-gray-500">resultMessage</p>
                <p className="text-gray-200 text-[11px]">{boundary.resultMessage}</p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
                <p className="mb-1 text-gray-500">readyForExplicitTokenTestApproval</p>
                <p className={`font-semibold ${boundary.readyForExplicitTokenTestApproval ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {String(boundary.readyForExplicitTokenTestApproval)}
                </p>
                <p className="mt-0.5 text-[10px] text-gray-500">
                  {boundary.readyForExplicitTokenTestApproval
                    ? '다음 Task에서 별도 명시 승인 시 token 발급 테스트 진행 가능'
                    : '조건 미충족 — token 발급 테스트 현재 차단'}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
                <p className="mb-1 text-gray-500">allPreconditionsPassed</p>
                <p className={`font-semibold ${boundary.allPreconditionsPassed ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {String(boundary.allPreconditionsPassed)}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
                <p className="mb-1 text-gray-500">tokenTestApprovalPresent</p>
                <p className={`font-semibold ${boundary.tokenTestApprovalPresent ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {String(boundary.tokenTestApprovalPresent)}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
                <p className="mb-1 text-gray-500">tokenTestApprovalComplete</p>
                <p className={`font-semibold ${boundary.tokenTestApprovalComplete ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {String(boundary.tokenTestApprovalComplete)}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
                <p className="mb-1 text-gray-500">allowed</p>
                <p className="font-semibold text-emerald-300">{String(boundary.allowed)}</p>
                <p className="mt-0.5 text-[10px] text-gray-500">항상 false</p>
              </div>
            </div>

            {/* 안전 배지 */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">안전 배지 (모두 false 기보 보장)</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Token 요청 비활성화',
                  'Access Token 요청 없음',
                  'Endpoint 미해결',
                  'HTTP client 없음',
                  'Authorization header 없음',
                  'Token 저장 없음',
                  'Live 실행 비활성화',
                  'Queue/Worker 없음',
                ].map(label => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* 코어 체크리스트 */}
            {boundary.checklistItems.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-gray-400">코어 체크리스트 ({boundary.checklistItems.length}연)</p>
                <div className="space-y-1">
                  {boundary.checklistItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start gap-2 rounded-sm px-2 py-1.5 text-xs even:bg-white/[0.02]"
                    >
                      <span className={`mt-0.5 shrink-0 font-bold ${checkItemBadge(item.status)}`}>
                        {checkItemIcon(item.status)}
                      </span>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] text-gray-500">{item.key}</span>
                        <p className="text-gray-300 mt-0.5">{item.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 차단 사유 */}
            {boundary.blockingReasons.length > 0 && (
              <div className="mb-3 rounded-md border border-red-500/20 bg-red-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-red-300">토큰 테스트 차단 사유 ({boundary.blockingReasons.length}건)</p>
                <ul className="space-y-1">
                  {boundary.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-red-200">• {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 확인 필요 사유 */}
            {boundary.needsReviewReasons.length > 0 && (
              <div className="mb-3 rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-amber-300">확인 필요 항목 ({boundary.needsReviewReasons.length}건)</p>
                <ul className="space-y-1">
                  {boundary.needsReviewReasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-amber-200">• {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경고 */}
            {boundary.warnings.length > 0 && (
              <div className="mb-3 rounded-md border border-slate-500/20 bg-slate-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-slate-300">경고 ({boundary.warnings.length}건)</p>
                <ul className="space-y-1">
                  {boundary.warnings.map((w, idx) => (
                    <li key={idx} className="text-xs text-slate-200">• {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 안내 문구 */}
            <p className="mt-2 text-[10px] text-gray-500">
              이 섹션은 최초 token 발급 테스트 직전 조건을 최종 점검합니다. 모든 조건이 통과되어도 이 단계에서는 token을 발급하지 않으며, 실제 token 발급 테스트는 다음 Task에서 별도 명시 승인 후에만 진행됩니다.
            </p>
          </div>
        );
      })()}

      {/* ── 최초 Token 발급 테스트 Final Approval Audit ────────────────────────────── */}
      {(() => {
        const audit = job.naverAuthTokenFirstTestFinalApprovalAudit ?? null;
        if (!audit) return null;

        const isRecorded = audit.approvalRecorded;

        return (
          <div className="mb-6 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-fuchsia-300">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              최초 Token 발급 테스트 최종 승인 (Final Approval)
              {isRecorded ? (
                <span className="ml-auto rounded-full border border-fuchsia-500/30 bg-fuchsia-500/20 px-2 py-0.5 text-xs font-semibold text-fuchsia-300">
                  RECORDED
                </span>
              ) : (
                <span className="ml-auto rounded-full border border-gray-500/30 bg-gray-500/20 px-2 py-0.5 text-xs font-semibold text-gray-400">
                  NOT RECORDED
                </span>
              )}
            </h2>

            {isRecorded && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">approvalRecordedAt</p>
                    <p className="mt-0.5 font-mono text-xs text-gray-300 break-all">{audit.approvalRecordedAt || '-'}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">approvalScope</p>
                    <p className="mt-0.5 font-mono text-xs text-gray-300 break-all">{audit.approvalScope}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">approvedByRole</p>
                    <p className="mt-0.5 font-mono text-xs text-gray-300 break-all">{audit.approvedByRole}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">safetyBoundaryStatus</p>
                    <p className="mt-0.5 font-mono text-xs text-gray-300 break-all">{audit.safetyBoundaryStatus}</p>
                  </div>
                  <div className="rounded-md border border-[#262629] bg-[#18181b] p-2">
                    <p className="text-gray-500">executorStatus</p>
                    <p className="mt-0.5 font-mono text-xs text-gray-300 break-all">{audit.executorStatus}</p>
                  </div>
                </div>

                {/* acknowledgedKeys 목록 */}
                {Array.isArray(audit.approvedAcknowledgementKeys) && audit.approvedAcknowledgementKeys.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1 text-xs font-semibold text-gray-400">확인된 동의 항목 ({audit.approvedAcknowledgementKeys.length}건)</p>
                    <div className="space-y-1">
                      {audit.approvedAcknowledgementKeys.map(item => (
                        <div key={item} className="flex items-center gap-2 rounded-sm px-2 py-1 text-xs">
                          <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400" />
                          <span className="font-mono text-[10px] text-gray-500">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* false safety flags */}
                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold text-gray-400">안전 플래그 (모두 false)</p>
                  <div className="grid grid-cols-2 gap-1 text-xs sm:grid-cols-3">
                    {([
                      ['tokenRequestAllowed', audit.tokenRequestAllowed],
                      ['executorArmed', audit.executorArmed],
                      ['tokenRequestPrepared', audit.tokenRequestPrepared],
                      ['tokenRequestExecuted', audit.tokenRequestExecuted],
                      ['accessTokenRequested', audit.accessTokenRequested],
                      ['tokenIssued', audit.tokenIssued],
                      ['endpointCalled', audit.endpointCalled],
                      ['httpClientCreated', audit.httpClientCreated],
                      ['naverApiCallAllowed', audit.naverApiCallAllowed],
                      ['liveExecutionEnabled', audit.liveExecutionEnabled],
                    ] as [string, boolean][]).map(([k, v]) => (
                      <div key={k} className="rounded-sm border border-slate-500/20 bg-slate-500/10 px-2 py-1">
                        <span className="text-gray-500">{k}: </span>
                        <span className={v ? 'font-semibold text-red-300' : 'font-semibold text-emerald-300'}>{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <p className="mt-2 text-[10px] text-gray-500">
              이 섹션은 최초 token 발급 테스트의 최종 승인 기록(Read-only)을 표시합니다. 승인이 기록되어도 실제 발급 로직이 비활성화된 상태임을 보장합니다.
            </p>
          </div>
        );
      })()}

      {/* ── Token First Test Review Hub Navigation ─────────────────────────────── */}
      {(() => {
        const hub = job.naverAuthTokenFirstTestReviewHubNavigationScreen;
        if (!hub) return null;

        return (
          <div className="mb-6 rounded-lg border border-violet-500/20 bg-violet-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-violet-400" />
              {hub.title}
            </h2>

            <p className="mb-4 text-sm text-violet-300">
              {hub.description}
            </p>

            {/* 패널 목차 */}
            <div className="mb-4 rounded-md border border-violet-500/15 bg-[#0d0a14] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-500">
                안전 검토 패널 목차 (총 {hub.totalPanelCount}개)
              </p>
              <div className="space-y-2">
                {hub.navigationEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 rounded border border-violet-800/20 bg-violet-900/10 px-3 py-2"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-violet-600/40 font-mono text-[10px] font-bold text-violet-400">
                      {entry.stepNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-200">{entry.stepName}</span>
                        <span className="rounded bg-green-900/30 px-1.5 py-0.5 text-[9px] font-semibold text-green-400">
                          {entry.currentStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{entry.panelDescription}</p>
                    </div>
                    <span className="shrink-0 rounded border border-gray-700/50 px-1.5 py-0.5 font-mono text-[9px] text-gray-600">
                      실행불가
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 허브 안내 */}
            <div className="rounded-md border border-violet-500/15 bg-violet-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                <p className="text-xs text-violet-300">{hub.hubNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Review Section Layout ─────────────────────────────── */}
      {(() => {
        const layout = job.naverAuthTokenFirstTestReviewSectionLayoutScreen;
        if (!layout) return null;

        return (
          <div className="mb-6 rounded-lg border border-orange-500/20 bg-orange-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-orange-400" />
              {layout.title}
            </h2>

            {/* 검토 전용 영역 경고 배너 */}
            <div className="mb-4 rounded-md border border-orange-500/40 bg-orange-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-orange-300">{layout.sectionAreaLabel}</p>
                  <p className="text-xs text-orange-200">{layout.notExecutionAreaWarning}</p>
                </div>
              </div>
            </div>

            <p className="mb-4 text-sm text-orange-300/80">
              {layout.sectionAreaDescription}
            </p>

            {/* 섹션 구조 맵 */}
            <div className="mb-4 rounded-md border border-orange-500/10 bg-[#100c08] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange-600">
                검토 섹션 구조 (총 {layout.sectionEntries.length}개)
              </p>
              <div className="space-y-1.5">
                {layout.sectionEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 rounded border border-orange-900/20 bg-orange-900/10 px-3 py-2"
                  >
                    <span className="mt-0.5 w-6 shrink-0 font-mono text-[10px] font-bold text-orange-500/70">
                      {String(entry.sectionOrder).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-[11px] font-semibold text-gray-300">{entry.sectionLabel}</p>
                      <p className="text-[10px] text-gray-600">{entry.sectionDescription}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <span className="rounded border border-green-800/30 bg-green-900/20 px-1.5 py-0.5 text-[8px] font-semibold text-green-500">
                        read-only
                      </span>
                      <span className="rounded border border-red-800/30 bg-red-900/10 px-1.5 py-0.5 text-[8px] text-red-600">
                        실행불가
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 레이아웃 안내 */}
            <div className="rounded-md border border-orange-500/15 bg-orange-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                <p className="text-xs text-orange-300/70">{layout.layoutNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Readiness Screen ──────────────────────────────────────────────────────── */}
      {(() => {
        const readiness = job.naverAuthTokenFirstTestReadinessScreen;
        if (!readiness) return null;

        return (
          <div className="mb-6 rounded-lg border border-teal-500/30 bg-teal-500/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-teal-300">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              Naver Token First Test Readiness (Read-only View)
              <span className={`ml-auto rounded-full border px-2 py-0.5 text-xs font-semibold ${
                readiness.overallStatus === 'READY'                  ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300'                  : 'border-red-500/30 bg-red-500/20 text-red-300'
              }`}>
                {readiness.overallStatus}
              </span>
            </h2>

            <p className="mb-4 text-sm text-gray-300">
              {readiness.overallMessage}
            </p>

            {/* Status Cards */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {readiness.statusCards.map((card, idx) => (
                <div key={idx} className={`rounded-md border p-3 text-center ${
                  card.isOk                    ? 'border-emerald-500/20 bg-emerald-500/10'                    : 'border-red-500/20 bg-red-500/10'
                }`}>
                  <p className={`text-xs ${card.isOk ? 'text-emerald-400' : 'text-red-400'}`}>
                    {card.title}
                  </p>
                  <p className={`mt-1 font-mono text-sm font-bold ${card.isOk ? 'text-emerald-300' : 'text-red-300'}`}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Safety Steps */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">안전 계층 평가 결과</p>
              <div className="space-y-2">
                {readiness.safetySteps.map((step) => (
                  <div key={step.key} className="flex flex-col gap-1 rounded-md border border-[#262629] bg-[#18181b] p-3 text-sm sm:flex-row sm:items-start sm:gap-4">
                    <div className="flex w-full items-center gap-2 sm:w-1/3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#262629] text-[10px] font-bold text-gray-400">
                        {step.step}
                      </span>
                      <span className="font-semibold text-gray-300">{step.label}</span>
                    </div>
                    <div className="flex w-full flex-col sm:w-2/3">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                          step.status === 'READY' || step.status === 'REVIEW_ONLY' || step.status === 'DISABLED'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                            : step.status === 'PENDING'
                              ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                              : step.status === 'NOT_STARTED'
                                ? 'border-gray-500/30 bg-gray-500/10 text-gray-400'
                                : 'border-red-500/30 bg-red-500/10 text-red-300'
                        }`}>
                          {step.status}
                        </span>
                        <span className="text-xs text-gray-400">{step.message}</span>
                      </div>
                      {step.reasons.length > 0 && (
                        <div className="mt-1 pl-1">
                          {step.reasons.map((r, i) => (
                            <p key={i} className="text-[10px] text-red-400">• {r}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Flags Review */}
            <div className="mb-3">
              <p className="mb-1 text-xs font-semibold text-gray-400">강제 차단 플래그 검증 (전체 false 보장)</p>
              <div className="grid grid-cols-2 gap-1 text-xs sm:grid-cols-4">
                {([
                  ['screenActionEnabled', readiness.screenActionEnabled],
                  ['dbWriteAllowed', readiness.dbWriteAllowed],
                  ['prismaMutationExecuted', readiness.prismaMutationExecuted],
                  ['liveTokenTestExecutionAllowed', readiness.liveTokenTestExecutionAllowed],
                  ['sandboxInvocationExecuted', readiness.sandboxInvocationExecuted],
                  ['networkExecutionAllowed', readiness.networkExecutionAllowed],
                  ['tokenRequestAllowed', readiness.tokenRequestAllowed],
                  ['tokenIssued', readiness.tokenIssued],
                ] as [string, boolean][]).map(([k, v]) => (
                  <div key={k} className="rounded-sm border border-slate-500/20 bg-slate-500/10 px-2 py-1 flex justify-between items-center">
                    <span className="text-gray-500 truncate mr-1" title={k}>{k}</span>
                    <span className={v ? 'font-semibold text-red-300' : 'font-semibold text-emerald-300'}>{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why execution is blocked */}
            <div className="mb-3 rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-amber-300">왜 현재 실행할 수 없는가?</p>
              <ul className="space-y-1 text-xs text-amber-200">
                <li>• 실제 token 발급은 별도 사용자 승인 후에만 가능합니다.</li>
                <li>• 실제 Naver API 호출은 별도 승인이 필요합니다.</li>
                <li>• 운영 DB write는 별도 승인이 필요합니다.</li>
                <li>• 가격/재고 변경은 별도 승인이 필요합니다.</li>
                <li>• 현재 화면은 상태 확인 전용입니다.</li>
              </ul>
            </div>

            {/* Copyable Safety Report */}
            {readiness.copyableSafetyReport && (
              <div className="mb-3">
                <p className="mb-1 text-xs font-semibold text-gray-400">
                  안전 보고서 (read-only — 텍스트 선택 후 복사 가능)
                </p>
                <pre className="max-h-52 overflow-auto rounded-md border border-[#262629] bg-[#0a0a0c] p-3 text-xs text-gray-300 whitespace-pre-wrap cursor-text select-all leading-relaxed">
                  {readiness.copyableSafetyReport}
                </pre>
              </div>
            )}

            {/* Next Steps */}
            <div className="mb-3 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-indigo-300">다음 단계 안내</p>
              <ul className="space-y-1 text-xs text-indigo-200">
                <li>• 다음 단계는 별도 사용자 승인 후 Test DB 또는 명시된 안전 환경에서만 진행 가능합니다.</li>
                <li>• 현재 화면에서는 실행할 수 없습니다.</li>
                <li>• 실제 token 발급 요청은 아직 구현되어 있지 않습니다.</li>
              </ul>
            </div>

            <p className="mt-2 text-[10px] text-gray-500">
              이 화면은 Read-only View Model을 렌더링하며 실제 API 호출이나 DB 쓰기 동작이 발생하지 않음을 보장합니다.
            </p>
          </div>
        );
      })()}

      {/* ── Token First Test Final Confirmation Gate Screen ─────────────────────────────────────────── */}
      {(() => {
        const gate = job.naverAuthTokenFirstTestFinalConfirmationGateScreen;
        if (!gate) return null;

        return (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-950/20 p-4">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              {gate.title} (Read-only View)
            </h2>
            <p className="mb-4 text-sm text-red-300">
              {gate.description}
            </p>

            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-red-300">요약 카드</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-red-200 md:grid-cols-4">
                <div className="rounded border border-red-500/10 bg-red-950/30 p-2">
                  <div className="text-red-400">Display Only</div>
                  <div className="font-mono text-red-300">TRUE</div>
                </div>
                <div className="rounded border border-red-500/10 bg-red-950/30 p-2">
                  <div className="text-red-400">Execution Action</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-red-500/10 bg-red-950/30 p-2">
                  <div className="text-red-400">DB Write</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-red-500/10 bg-red-950/30 p-2">
                  <div className="text-red-400">Naver API Call</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-red-500/10 bg-red-950/30 p-2">
                  <div className="text-red-400">Token Request</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-red-500/10 bg-red-950/30 p-2">
                  <div className="text-red-400">Token Issued</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-md border border-red-500/20 bg-[#121214] p-3">
              <p className="mb-2 text-sm font-semibold text-gray-300">확인 체크리스트</p>
              <ul className="space-y-2">
                {gate.checklist.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                    <span>{item.message}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 rounded border border-gray-700 bg-gray-800/50 p-3">
              <Info className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-300">{gate.warningMessage}</span>
            </div>
            <p className="mt-3 text-[10px] text-gray-500 text-right">
              이 영역은 컴포넌트 격리를 위한 display-only 영역이며 실행 버튼을 포함하지 않습니다.
            </p>
          </div>
        );
      })()}

      {/* ── Token First Test Action Lock Screen ─────────────────────────────────────────────────── */}
      {(() => {
        const lock = job.naverAuthTokenFirstTestActionLockScreen;
        if (!lock) return null;

        return (
          <div className="mb-6 rounded-lg border border-purple-500/30 bg-purple-950/20 p-4">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-purple-400" />
              {lock.title}
            </h2>
            <p className="mb-4 text-sm text-purple-300">
              {lock.description}
            </p>

            <div className="mb-4 rounded-md border border-purple-500/20 bg-purple-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-purple-300">Action Lock 요약 카드</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-purple-200 md:grid-cols-4">
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">Action Locked</div>
                  <div className="font-mono text-purple-300">TRUE</div>
                </div>
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">Display Only</div>
                  <div className="font-mono text-purple-300">TRUE</div>
                </div>
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">Execution Action</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">Form Submit</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">API POST</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">DB Write</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">Naver API Call</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-purple-500/10 bg-purple-950/30 p-2">
                  <div className="text-purple-400">Token Request</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-md border border-purple-500/20 bg-[#121214] p-3">
              <p className="mb-2 text-sm font-semibold text-gray-300">잠금 사유 목록</p>
              <ul className="space-y-2">
                {lock.lockReasons.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-xs text-gray-400">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                    <span>{item.message}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 rounded border border-gray-700 bg-gray-800/50 p-3">
              <Info className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-300">{lock.warningMessage}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Safety Review Screen ─────────────────────────────────────────────────── */}
      {(() => {
        const review = job.naverAuthTokenFirstTestSafetyReviewScreen;
        if (!review) return null;

        return (
          <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <CheckCircle2 className="h-5 w-5 text-amber-400" />
              {review.title}
            </h2>

            <p className="mb-4 text-sm text-amber-300">
              {review.description}
            </p>

            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-amber-300">Safety Review 요약 카드</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-amber-200 md:grid-cols-4">
                <div className="rounded border border-amber-500/10 bg-amber-950/30 p-2">
                  <div className="text-amber-400">Execution Locked</div>
                  <div className="font-mono text-amber-300">TRUE</div>
                </div>
                <div className="rounded border border-amber-500/10 bg-amber-950/30 p-2">
                  <div className="text-amber-400">Read Only</div>
                  <div className="font-mono text-amber-300">TRUE</div>
                </div>
                <div className="rounded border border-amber-500/10 bg-amber-950/30 p-2">
                  <div className="text-amber-400">Execution Action</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
                <div className="rounded border border-amber-500/10 bg-amber-950/30 p-2">
                  <div className="text-amber-400">Form Submit</div>
                  <div className="font-mono text-emerald-400">FALSE</div>
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-md border border-amber-500/20 bg-[#121214] p-3">
              <p className="mb-2 text-sm font-semibold text-gray-300">안전 상태 리뷰 항목</p>
              <ul className="space-y-2">
                {review.reviewItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500/50" />
                    <span>{item.message}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 rounded border border-gray-700 bg-gray-800/50 p-3">
              <Info className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-300">{review.warningMessage}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Safe Next Step Guide Screen ───────────────────────── */}
      {(() => {
        const guide = job.naverAuthTokenFirstTestSafeNextStepGuideScreen;
        if (!guide) return null;

        return (
          <div className="mb-6 rounded-lg border border-violet-500/30 bg-violet-950/20 p-4">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <Info className="h-5 w-5 text-violet-400" />
              {guide.title}
            </h2>

            <p className="mb-4 text-sm text-violet-300">
              {guide.description}
            </p>

            {/* 현재 단계 상태 배지 */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                현재 단계: {guide.currentPhaseLabel}
              </span>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                Token 발급 테스트 실행: 아직 불가
              </span>
            </div>

            {/* 실행 불가 이유 */}
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/5 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-xs text-red-300">{guide.blockedReason}</p>
              </div>
            </div>

            {/* 완료된 안전 단계 */}
            <div className="mb-4 rounded-md border border-violet-500/20 bg-[#121214] p-3">
              <p className="mb-3 text-sm font-semibold text-gray-300">완료된 안전 단계</p>
              <ol className="space-y-2">
                {guide.completedSteps.map((step) => (
                  <li key={step.step} className="flex items-start gap-2 text-xs">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-400">
                      {step.step}
                    </span>
                    <div>
                      <span className="font-semibold text-gray-200">{step.label}</span>
                      <span className="ml-2 text-violet-400/70">{step.statusLabel}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* 별도 승인 필요 항목 */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-3 text-sm font-semibold text-amber-300">다음 단계로 넘어가기 위한 별도 승인 항목</p>
              <ul className="space-y-2">
                {guide.pendingApprovalItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 text-amber-400">
                      [{item.approvalKey}]
                    </span>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 다음 단계 안내 */}
            <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-gray-300">{guide.nextPhaseLabel}</p>
              <p className="text-xs text-gray-400">{guide.nextPhaseGuide}</p>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Separate Approval Packet Screen ──────────────────── */}
      {(() => {
        const packet = job.naverAuthTokenFirstTestSeparateApprovalPacketScreen;
        if (!packet) return null;

        return (
          <div className="mb-6 rounded-lg border border-rose-500/30 bg-rose-950/20 p-4">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-rose-400" />
              {packet.title}
            </h2>

            <p className="mb-4 text-sm text-rose-300">
              {packet.description}
            </p>

            {/* 현재 실행 잠금 상태 */}
            <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="mb-1 text-xs font-semibold text-red-300">현재 실행 잠금 상태</p>
                  <p className="text-xs text-red-200">{packet.currentLockStatus}</p>
                </div>
              </div>
            </div>

            {/* 실제 token 발급 테스트 불가 이유 */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-amber-300">실제 Token 발급 테스트 불가 이유</p>
              <p className="text-xs text-amber-200">{packet.tokenTestNotAllowedReason}</p>
            </div>

            {/* 위험 범위 */}
            <div className="mb-4 rounded-md border border-rose-500/20 bg-[#121214] p-3">
              <p className="mb-3 text-sm font-semibold text-gray-300">별도 승인 시 확인해야 할 위험 범위</p>
              <ul className="space-y-2">
                {packet.riskScopeItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 text-rose-400">
                      [{item.riskKey}]
                    </span>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 승인자 체크리스트 */}
            <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/5 p-3">
              <p className="mb-3 text-sm font-semibold text-indigo-300">승인자 확인 체크리스트 (read-only)</p>
              <ul className="space-y-2">
                {packet.approverChecklist.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-xs">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 text-indigo-400">
                      [{item.checkKey}]
                    </span>
                    <span className="text-gray-300">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 금지 항목 */}
            <div className="mb-4 rounded-md border border-gray-600/20 bg-gray-900/30 p-3">
              <p className="mb-3 text-xs font-semibold text-gray-400">현재 이 화면에서 여전히 금지된 항목</p>
              <div className="flex flex-wrap gap-2">
                {packet.prohibitedItems.map((item) => (
                  <span
                    key={item.id}
                    className="rounded border border-gray-700 bg-gray-800/60 px-2 py-0.5 font-mono text-[9px] text-gray-500"
                    title={item.description}
                  >
                    {item.prohibitedKey}
                  </span>
                ))}
              </div>
            </div>

            {/* 승인 안내 */}
            <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <p className="text-xs text-gray-400">{packet.approvalNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Approval Evidence Timeline Screen ─────────────────── */}
      {(() => {
        const timeline = job.naverAuthTokenFirstTestApprovalEvidenceTimelineScreen;
        if (!timeline) return null;

        return (
          <div className="mb-6 rounded-lg border border-cyan-500/30 bg-cyan-950/15 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-cyan-400" />
              {timeline.title}
            </h2>

            <p className="mb-4 text-sm text-cyan-300">
              {timeline.description}
            </p>

            {/* 전체 실행 잠금 상태 */}
            <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="mb-1 text-xs font-semibold text-red-300">전체 실행 잠금 상태</p>
                  <p className="text-xs text-red-200">{timeline.overallLockStatus}</p>
                </div>
              </div>
            </div>

            {/* token 발급 테스트 차단 이유 */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-amber-300">실제 Token 발급 테스트 차단 이유</p>
              <p className="text-xs text-amber-200">{timeline.tokenTestBlockedReason}</p>
            </div>

            {/* Evidence Timeline Steps */}
            <div className="mb-4 space-y-3">
              <p className="text-sm font-semibold text-gray-300">안전 검토 단계 Evidence Timeline</p>
              {timeline.timelineSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-md border border-cyan-500/15 bg-[#0a1018] p-3"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded border border-cyan-700/50 bg-cyan-900/30 px-2 py-0.5 font-mono text-[9px] font-bold text-cyan-400">
                      {step.stepKey}
                    </span>
                    <span className="text-xs font-semibold text-gray-200">{step.stepName}</span>
                    <span className="ml-auto rounded bg-green-900/30 px-2 py-0.5 text-[9px] font-semibold text-green-400">
                      {step.currentStatus}
                    </span>
                  </div>

                  <div className="mb-2">
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">확인된 안전 조건</p>
                    <ul className="space-y-0.5">
                      {step.confirmedSafetyConditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                          <span className="mt-0.5 shrink-0 text-green-500">✓</span>
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">여전히 잠긴 실행 조건</p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.stillLockedConditions.map((locked, i) => (
                        <span
                          key={i}
                          className="rounded border border-red-800/30 bg-red-900/20 px-1.5 py-0.5 font-mono text-[9px] text-red-400"
                        >
                          {locked}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 승인 안내 */}
            <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <p className="text-xs text-gray-400">{timeline.approvalNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Approval Console Screen ───────────────────────────── */}
      {(() => {
        const console_ = job.naverAuthTokenFirstTestApprovalConsoleScreen;
        if (!console_) return null;

        return (
          <div className="mb-6 rounded-lg border border-slate-500/30 bg-slate-900/30 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-slate-300" />
              {console_.title}
            </h2>

            <p className="mb-4 text-sm text-slate-400">
              {console_.description}
            </p>

            {/* 전체 상태 요약 배너 */}
            <div className="mb-4 rounded-md border border-slate-600/40 bg-slate-800/40 px-4 py-3">
              <p className="text-xs font-semibold text-slate-300">{console_.overallStatus}</p>
            </div>

            {/* 상태 요약 항목 */}
            <div className="mb-4 rounded-md border border-slate-600/20 bg-[#0d0f12] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">현재 상태 요약</p>
              <div className="space-y-2">
                {console_.summaryItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 text-xs">
                    <span className="w-36 shrink-0 font-mono text-[10px] text-slate-500">[{item.itemKey}]</span>
                    <span className="w-28 shrink-0 text-slate-400">{item.label}</span>
                    <span className="text-slate-300">{item.currentValue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 완료된 안전 검토 흐름 */}
            <div className="mb-4 rounded-md border border-slate-600/20 bg-[#0d0f12] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                완료된 안전 검토 흐름 ({console_.completedFlowSteps.length}개)
              </p>
              <div className="flex flex-wrap gap-2">
                {console_.completedFlowSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-1.5 rounded border border-slate-700/50 bg-slate-800/40 px-2 py-1"
                  >
                    <span className="text-[9px] font-bold text-green-500">✓</span>
                    <span className="font-mono text-[9px] text-slate-400">{step.stepKey}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 다음 필요 행동 */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-amber-300">다음 필요 행동</p>
              <p className="text-xs text-amber-200">{console_.nextRequiredAction}</p>
            </div>

            {/* 콘솔 안내 */}
            <div className="rounded-md border border-slate-500/20 bg-slate-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <p className="text-xs text-slate-400">{console_.approvalNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Separate Approval Request Draft ────────────────────── */}
      {(() => {
        const draft = job.naverAuthTokenFirstTestSeparateApprovalRequestDraftScreen;
        if (!draft) return null;

        return (
          <div className="mb-6 rounded-lg border border-indigo-500/20 bg-indigo-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-indigo-400" />
              {draft.title}
            </h2>

            {/* 초안 경고 배너 */}
            <div className="mb-4 rounded-md border border-indigo-500/40 bg-indigo-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-indigo-300">{draft.draftLabel}</p>
                  <p className="text-xs text-indigo-200">{draft.draftPurpose}</p>
                </div>
              </div>
            </div>

            {/* 현재 상태 요약 */}
            <div className="mb-4 rounded-md border border-indigo-500/15 bg-indigo-900/10 px-3 py-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-500">현재 상태</p>
              <p className="text-xs font-mono text-indigo-300">{draft.currentStatusSummary}</p>
            </div>

            {/* 아직 실행 불가인 이유 */}
            <div className="mb-4 rounded-md border border-indigo-500/15 bg-indigo-900/10 px-3 py-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-500">실행 불가 이유</p>
              <p className="text-xs text-indigo-300/80">{draft.whyNotAllowedYet}</p>
            </div>

            {/* 별도 승인 요청 초안 섹션 6개 */}
            <div className="mb-4 rounded-md border border-indigo-500/10 bg-[#08080f] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                별도 승인 요청 초안 내용 (총 {draft.approvalRequestSections.length}개 섹션)
              </p>
              <div className="space-y-2">
                {draft.approvalRequestSections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded border border-indigo-900/30 bg-indigo-900/10 px-3 py-2.5"
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-indigo-200">{section.sectionTitle}</p>
                      <span className="shrink-0 rounded border border-green-800/30 bg-green-900/20 px-1.5 py-0.5 text-[8px] font-semibold text-green-500">
                        read-only
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-400">{section.sectionContent}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 여전히 금지된 항목 */}
            <div className="mb-4 rounded-md border border-red-500/10 bg-red-900/5 p-3">
              <p className="mb-2 text-xs font-semibold text-red-500/80">
                승인 이후에도 여전히 금지된 항목 ({draft.stillProhibitedItems.length}개)
              </p>
              <ul className="space-y-1">
                {draft.stillProhibitedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-500">
                    <span className="mt-0.5 shrink-0 text-red-600">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 초안 안내 */}
            <div className="rounded-md border border-indigo-500/15 bg-indigo-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <p className="text-xs text-indigo-300/70">{draft.draftNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Approval Readiness Checklist ───────────────────────── */}
      {(() => {
        const checklist = job.naverAuthTokenFirstTestApprovalReadinessChecklistScreen;
        if (!checklist) return null;

        return (
          <div className="mb-6 rounded-lg border border-teal-500/20 bg-teal-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <CheckCircle2 className="h-5 w-5 text-teal-400" />
              {checklist.title}
            </h2>

            {/* 체크리스트 안내 배너 */}
            <div className="mb-4 rounded-md border border-teal-500/40 bg-teal-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-teal-300">{checklist.checklistLabel}</p>
                  <p className="text-xs text-teal-200">{checklist.checklistDescription}</p>
                </div>
              </div>
            </div>

            {/* 체크리스트 항목 */}
            <div className="mb-4 rounded-md border border-teal-500/10 bg-[#040f0f] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-600">
                승인 준비 상태 항목 (총 {checklist.checklistItems.length}개)
              </p>
              <div className="space-y-2">
                {checklist.checklistItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded border px-3 py-2.5 ${
                      item.checkStatus === 'CONFIRMED'
                        ? 'border-green-800/30 bg-green-900/10'
                        : item.checkStatus === 'LOCKED'
                          ? 'border-red-800/20 bg-red-900/5'
                          : 'border-gray-700/20 bg-gray-900/10'
                    }`}
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="shrink-0 text-sm">
                        {item.checkStatus === 'CONFIRMED' ? '✔' : item.checkStatus === 'LOCKED' ? '🔒' : '○'}
                      </span>
                      <p className={`text-[11px] font-semibold ${
                        item.checkStatus === 'CONFIRMED'
                          ? 'text-green-300'
                          : item.checkStatus === 'LOCKED'
                            ? 'text-red-400'
                            : 'text-gray-400'
                      }`}>
                        {item.checkLabel}
                      </p>
                      <span className="ml-auto shrink-0 rounded border border-teal-800/30 bg-teal-900/20 px-1.5 py-0.5 text-[8px] font-semibold text-teal-500">
                        read-only
                      </span>
                    </div>
                    <p className="pl-6 text-[11px] leading-relaxed text-gray-500">{item.checkDetail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 체크리스트 안내 */}
            <div className="rounded-md border border-teal-500/15 bg-teal-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <p className="text-xs text-teal-300/70">{checklist.checklistNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Approval Decision Summary ──────────────────────────── */}
      {(() => {
        const summary = job.naverAuthTokenFirstTestApprovalDecisionSummaryScreen;
        if (!summary) return null;

        return (
          <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
              {summary.title}
            </h2>

            {/* 최종 결론 배너 */}
            <div className="mb-4 rounded-md border border-amber-500/50 bg-amber-500/10 px-4 py-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-amber-300">{summary.summaryLabel}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="rounded border border-red-700/40 bg-red-900/20 px-3 py-1.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-red-500/70 mb-0.5">현재 결론</p>
                      <p className="text-sm font-bold text-red-400">{summary.currentDecision}</p>
                    </div>
                    <div className="rounded border border-amber-700/40 bg-amber-900/20 px-3 py-1.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-500/70 mb-0.5">현재 단계</p>
                      <p className="text-sm font-bold text-amber-400">{summary.currentPhase}</p>
                    </div>
                    <div className="rounded border border-gray-700/40 bg-gray-800/20 px-3 py-1.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500/70 mb-0.5">검토 완료 패널</p>
                      <p className="text-sm font-bold text-gray-300">{summary.reviewedPanelCount}개 (모두 read-only)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 결론 항목 요약 */}
            <div className="mb-4 rounded-md border border-amber-500/10 bg-[#0f0a00] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-600">
                현재 상태 항목 (총 {summary.decisionItems.length}개)
              </p>
              <div className="space-y-1.5">
                {summary.decisionItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded border border-amber-900/20 bg-amber-900/5 px-3 py-2"
                  >
                    <span className="w-4 shrink-0 font-mono text-[10px] font-bold text-amber-600/60">
                      {String(item.id).padStart(2, '0')}
                    </span>
                    <p className="min-w-0 flex-1 text-[11px] font-medium text-gray-400">{item.itemLabel}</p>
                    <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${
                      item.currentState.includes('불가') || item.currentState.includes('차단') || item.currentState.includes('유지')
                        ? 'bg-red-900/20 text-red-400 border border-red-800/30'
                        : item.currentState.includes('완료')
                          ? 'bg-green-900/20 text-green-400 border border-green-800/30'
                          : 'bg-amber-900/20 text-amber-400 border border-amber-800/30'
                    }`}>
                      {item.currentState}
                    </span>
                    <span className="shrink-0 rounded border border-amber-800/20 bg-amber-900/10 px-1.5 py-0.5 text-[8px] text-amber-600">
                      read-only
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 최종 안내 */}
            <div className="rounded-md border border-amber-500/15 bg-amber-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-xs text-amber-300/70">{summary.summaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Separate Approval Boundary ─────────────────────────── */}
      {(() => {
        const boundary = job.naverAuthTokenFirstTestSeparateApprovalBoundaryScreen;
        if (!boundary) return null;

        return (
          <div className="mb-6 rounded-lg border border-zinc-500/20 bg-zinc-950/20 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-zinc-400" />
              {boundary.title}
            </h2>

            {/* 경계 안내 배너 */}
            <div className="mb-4 rounded-md border border-zinc-500/30 bg-zinc-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-zinc-300">{boundary.boundaryLabel}</p>
                  <p className="text-xs text-zinc-300/80">{boundary.currentScreenNote}</p>
                </div>
              </div>
            </div>

            {/* 승인 이후 안내 */}
            <div className="mb-4 rounded-md border border-zinc-600/20 bg-zinc-800/20 px-3 py-2.5">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <p className="text-xs text-zinc-400">{boundary.afterApprovalNote}</p>
              </div>
            </div>

            {/* 2-column layout: 허용 / 금지 */}
            <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* 허용된 작업 */}
              <div className="rounded-md border border-green-700/25 bg-green-950/10 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-green-500">
                  ✔ {boundary.allowedZoneTitle}
                </p>
                <div className="space-y-1.5">
                  {boundary.allowedItems.map((item) => (
                    <div key={item.id} className="rounded border border-green-800/20 bg-green-900/10 px-2.5 py-2">
                      <p className="mb-0.5 text-[11px] font-semibold text-green-300">{item.itemLabel}</p>
                      <p className="text-[10px] leading-relaxed text-gray-500">{item.itemDetail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 금지된 작업 */}
              <div className="rounded-md border border-red-700/25 bg-red-950/10 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-500">
                  ✕ {boundary.prohibitedZoneTitle}
                </p>
                <div className="space-y-1.5">
                  {boundary.prohibitedItems.map((item) => (
                    <div key={item.id} className="rounded border border-red-800/20 bg-red-900/5 px-2.5 py-2">
                      <p className="mb-0.5 text-[11px] font-semibold text-red-400">{item.itemLabel}</p>
                      <p className="text-[10px] leading-relaxed text-gray-500">{item.itemDetail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 경계 안내 */}
            <div className="rounded-md border border-zinc-600/15 bg-zinc-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <p className="text-xs text-zinc-400/70">{boundary.boundaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Approval Handoff Summary ───────────────────────────── */}
      {(() => {
        const handoff = job.naverAuthTokenFirstTestApprovalHandoffSummaryScreen;
        if (!handoff) return null;

        return (
          <div className="mb-6 rounded-lg border border-sky-500/20 bg-sky-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ClipboardList className="h-5 w-5 text-sky-400" />
              {handoff.title}
            </h2>

            {/* 인수인계 안내 배너 */}
            <div className="mb-4 rounded-md border border-sky-500/25 bg-sky-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-sky-300">{handoff.handoffLabel}</p>
                  <p className="text-xs text-sky-300/80">{handoff.handoffNote}</p>
                </div>
              </div>
            </div>

            {/* 현재 상태 요약 카드 */}
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {handoff.summaryItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border border-sky-700/20 bg-sky-900/10 px-3 py-2.5"
                >
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-500">
                    {item.itemLabel}
                  </p>
                  <p className="text-xs text-gray-300">{item.itemValue}</p>
                </div>
              ))}
            </div>

            {/* 다음 작업자 확인 항목 */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                다음 작업자 확인 항목
              </p>
              <div className="space-y-1.5">
                {handoff.nextActionItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded border border-sky-800/20 bg-sky-900/5 px-3 py-2"
                  >
                    <p className="mb-0.5 text-[11px] font-semibold text-sky-300">{item.checkLabel}</p>
                    <p className="text-[10px] leading-relaxed text-gray-500">{item.checkDetail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 절대 금지 항목 */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-500">
                별도 승인 전까지 절대 하지 말아야 할 항목
              </p>
              <div className="space-y-1.5">
                {handoff.absoluteProhibitionItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded border border-red-800/15 bg-red-900/5 px-3 py-2"
                  >
                    <p className="mb-0.5 text-[11px] font-semibold text-red-400">{item.prohibitionLabel}</p>
                    <p className="text-[10px] leading-relaxed text-gray-500">{item.prohibitionDetail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 요약 안내 */}
            <div className="rounded-md border border-sky-600/15 bg-sky-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <p className="text-xs text-sky-400/70">{handoff.handoffSummaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Approval Handoff Verification ──────────────────────── */}
      {(() => {
        const verification = job.naverAuthTokenFirstTestApprovalHandoffVerificationScreen;
        if (!verification) return null;

        return (
          <div className="mb-6 rounded-lg border border-indigo-500/20 bg-indigo-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ClipboardList className="h-5 w-5 text-indigo-400" />
              {verification.title}
            </h2>

            {/* 검증 안내 배너 */}
            <div className="mb-4 rounded-md border border-indigo-500/25 bg-indigo-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-indigo-300">{verification.verificationLabel}</p>
                  <p className="text-xs text-indigo-300/80">{verification.verificationNote}</p>
                </div>
              </div>
            </div>

            {/* 최종 결론 상태 */}
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="rounded border border-indigo-700/40 bg-indigo-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-indigo-500/70 mb-0.5">최종 결론</p>
                <p className="text-sm font-bold text-indigo-300">{verification.currentConclusion}</p>
              </div>
              <div className="rounded border border-indigo-700/40 bg-indigo-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-indigo-500/70 mb-0.5">현재 단계</p>
                <p className="text-sm font-bold text-indigo-300">{verification.currentPhase}</p>
              </div>
            </div>

            {/* 상태 검증 항목 카드 */}
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {verification.verificationItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border border-indigo-700/20 bg-indigo-900/10 px-3 py-2.5"
                >
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-500">
                    {item.verificationLabel}
                  </p>
                  <p className="text-xs text-gray-300">{item.verificationValue}</p>
                </div>
              ))}
            </div>

            {/* 최종 확인 리스트 */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                최종 검증 확인 항목
              </p>
              <div className="space-y-1.5">
                {verification.verificationCheckItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded border border-indigo-800/20 bg-indigo-900/5 px-3 py-2"
                  >
                    <p className="mb-0.5 text-[11px] font-semibold text-indigo-300">{item.checkLabel}</p>
                    <p className="text-[10px] leading-relaxed text-gray-500">{item.checkDetail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 검증 요약 안내 */}
            <div className="rounded-md border border-indigo-600/15 bg-indigo-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <p className="text-xs text-indigo-400/70">{verification.handoffVerificationNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Token First Test Manual Approval Checklist Alignment ────────────────── */}
      {(() => {
        const alignment = job.naverAuthTokenFirstTestManualApprovalChecklistAlignmentScreen;
        if (!alignment) return null;

        return (
          <div className="mb-6 rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ClipboardList className="h-5 w-5 text-fuchsia-400" />
              {alignment.title}
            </h2>

            {/* 안내 배너 */}
            <div className="mb-4 rounded-md border border-fuchsia-500/25 bg-fuchsia-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-fuchsia-300">{alignment.alignmentLabel}</p>
                  <p className="text-xs text-fuchsia-300/80">{alignment.alignmentNote}</p>
                </div>
              </div>
            </div>

            {/* 연결 상태 요약 */}
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="rounded border border-fuchsia-700/40 bg-fuchsia-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-fuchsia-500/70 mb-0.5">현재 단계</p>
                <p className="text-sm font-bold text-fuchsia-300">{alignment.currentPhase}</p>
              </div>
              <div className="rounded border border-fuchsia-700/40 bg-fuchsia-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-fuchsia-500/70 mb-0.5">다음 단계 정보</p>
                <p className="text-sm font-bold text-fuchsia-300">{alignment.nextStepContext}</p>
              </div>
            </div>

            {/* 정렬(Alignment) 검토 항목 */}
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {alignment.alignmentItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border border-fuchsia-700/20 bg-fuchsia-900/10 px-3 py-2.5"
                >
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-fuchsia-500">
                    {item.alignmentLabel}
                  </p>
                  <p className="text-xs font-medium text-gray-300">{item.alignmentValue}</p>
                </div>
              ))}
            </div>

            {/* 체크리스트 명확화 설명 (Clarifications) */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-fuchsia-400">
                하단 체크리스트 명확화 항목
              </p>
              <div className="space-y-1.5">
                {alignment.checklistClarificationItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded border border-fuchsia-800/20 bg-fuchsia-900/5 px-3 py-2"
                  >
                    <p className="mb-0.5 text-[11px] font-semibold text-fuchsia-300">{item.clarificationLabel}</p>
                    <p className="text-[10px] leading-relaxed text-gray-500">{item.clarificationDetail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 요약 안내 */}
            <div className="rounded-md border border-fuchsia-600/15 bg-fuchsia-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-600" />
                <p className="text-xs text-fuchsia-400/70">{alignment.alignmentSummaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Manual Approval Checklist ──────────────────────────────────────────── */}
      <ManualApprovalChecklistPanel jobId={job.id} readinessStatus={job.status} />

      {/* ── Token First Test Manual Approval Final Seal ─────────────────────────── */}
      {(() => {
        const finalSeal = job.naverAuthTokenFirstTestManualApprovalFinalSealScreen;
        if (!finalSeal) return null;

        return (
          <div className="mb-6 rounded-lg border border-rose-500/30 bg-rose-950/20 p-4 shadow-sm shadow-rose-900/10">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-rose-400">
              <ShieldAlert className="h-5 w-5" />
              {finalSeal.title}
            </h2>

            {/* 최종 결론 상태 배너 */}
            <div className="mb-5 flex items-start gap-3 rounded-md border border-rose-600/40 bg-rose-900/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
              <div>
                <p className="mb-1 text-sm font-bold tracking-wide text-rose-300 uppercase">
                  {finalSeal.sealStatusLabel}
                </p>
                <p className="text-xs text-rose-300/80 leading-relaxed">
                  {finalSeal.sealStatusNote}
                </p>
              </div>
            </div>

            {/* 현재 단계 요약 */}
            <div className="mb-5 flex flex-wrap gap-4 border-l-2 border-rose-700/50 pl-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-500/70 mb-0.5">현재 단계</p>
                <p className="text-sm font-bold text-rose-300">{finalSeal.currentPhase}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-500/70 mb-0.5">다음 단계 정보</p>
                <p className="text-sm font-bold text-rose-300">{finalSeal.nextStepContext}</p>
              </div>
            </div>

            {/* 개별 봉인 항목 (Seal Items) */}
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {finalSeal.sealItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-md border border-rose-700/30 bg-rose-950/40 px-4 py-3"
                >
                  <span className="text-xs font-semibold text-rose-400">{item.sealLabel}</span>
                  <span className="rounded bg-rose-900/50 px-2 py-0.5 text-xs font-bold text-rose-200 shadow-inner">
                    {item.sealValue}
                  </span>
                </div>
              ))}
            </div>

            {/* 명확화 항목 (Clarifications) */}
            <div className="mb-5">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                최종 봉인 명확화 항목
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {finalSeal.sealClarificationItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded border border-rose-800/30 bg-rose-900/10 p-3"
                  >
                    <p className="mb-1 text-xs font-bold text-rose-300">{item.clarificationLabel}</p>
                    <p className="text-[11px] leading-relaxed text-gray-400">{item.clarificationDetail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 요약 안내 */}
            <div className="rounded-md border-l-4 border-rose-600 bg-rose-500/10 p-3">
              <p className="text-xs font-medium leading-relaxed text-rose-300/90">
                {finalSeal.sealSummaryNote}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Task 60: Token First Test Read-only Phase Closure Summary */}
      {(() => {
        const phaseClosure = job.naverAuthTokenFirstTestReadOnlyPhaseClosureSummaryScreen;
        if (!phaseClosure || !phaseClosure.readOnlyPhaseClosureSummaryCreated) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-md">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-800/50 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{phaseClosure.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                    <span className="font-medium text-emerald-400/90">{phaseClosure.phaseStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{phaseClosure.phaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-6">

              {/* Top Stats / Audit Info */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded border border-slate-700/60 bg-slate-800/40 p-4">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Audit Info</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex justify-between">
                      <span className="text-slate-500">Reviewed Flows</span>
                      <span className="font-medium">{phaseClosure.reviewedFlowCount} steps</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500">Target Commit</span>
                      <span className="font-mono text-emerald-400/80">{phaseClosure.auditTargetCommit}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500">Result Commit</span>
                      <span className="font-mono text-emerald-400/80">{phaseClosure.auditResultCommit}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500">Bulk Add Audit</span>
                      <span className="font-medium text-emerald-400">{phaseClosure.task58BulkAddAuditCompleted ? 'Completed' : 'Pending'}</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded border border-slate-700/60 bg-slate-800/40 p-4">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Safety Status</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-500/70" />
                      <span>All Screens Read-Only: <strong className="font-medium text-emerald-400">{phaseClosure.allScreensReadOnly ? 'Yes' : 'No'}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-500/70" />
                      <span>Execution: <strong className="font-medium text-emerald-400">{phaseClosure.executionStillForbidden ? 'Forbidden' : 'Allowed'}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-500/70" />
                      <span>API/Token Request: <strong className="font-medium text-emerald-400">{phaseClosure.naverApiCallStillForbidden ? 'Forbidden' : 'Allowed'}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-500/70" />
                      <span>DB Write: <strong className="font-medium text-emerald-400">{phaseClosure.operatingDbWriteStillForbidden ? 'Forbidden' : 'Allowed'}</strong></span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Closure Summary Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-200">Closure Summary</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {phaseClosure.closureSummaryItems.map((item) => (
                    <div key={item.id} className="flex flex-col justify-center rounded border border-slate-700/50 bg-[#161618] p-3">
                      <span className="text-xs text-slate-500">{item.label}</span>
                      <span className="mt-1 text-sm font-medium text-emerald-300/90">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Forbidden Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-200">Execution Safety Locks</h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {phaseClosure.stillForbiddenItems.map((item) => (
                    <div key={item.id} className="flex flex-col items-center justify-center rounded border border-rose-900/30 bg-rose-950/10 py-3 px-2 text-center">
                      <span className="text-[11px] leading-tight text-slate-400">{item.label}</span>
                      <span className="mt-1.5 text-xs font-bold tracking-wider text-rose-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Phase Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-200">Completed Phase Items</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {phaseClosure.completedPhaseItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 rounded bg-[#1a1a1e] p-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500/70" />
                      <span className="truncate" title={item.label}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Step Guidance */}
              <div className="mt-6 flex items-start gap-3 rounded-md border border-blue-900/30 bg-blue-950/20 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-blue-400" />
                <div>
                  <h5 className="text-sm font-medium text-blue-200">Next Step Direction</h5>
                  <p className="mt-1 text-xs leading-relaxed text-blue-300/80">
                    {phaseClosure.nextStepLabel}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Task 62: Token First Test Separate Approval Criteria Review */}
      {(() => {
        const criteriaReview = job.naverAuthTokenFirstTestSeparateApprovalCriteriaReviewScreen;
        if (!criteriaReview || !criteriaReview.criteriaReviewCreated) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-amber-500/20 bg-amber-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-amber-900/30 bg-amber-900/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                  <ClipboardList className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-100">{criteriaReview.screenTitle}</h3>
                  <p className="mt-1 text-sm text-amber-400/80">{criteriaReview.reviewPurpose}</p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-6">

              {/* Safety First Principle */}
              <div className="rounded border border-amber-700/60 bg-amber-800/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-300">
                  <ShieldAlert className="h-4 w-4" />
                  기본 원칙
                </h4>
                <p className="text-sm leading-relaxed text-amber-100/90">{criteriaReview.safetyFirstPrinciple}</p>
              </div>

              {/* Criteria Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-amber-200">{criteriaReview.criteriaLabel}</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {criteriaReview.criteriaItems.map((item) => (
                    <div key={item.id} className="rounded border border-amber-800/40 bg-amber-900/10 p-3">
                      <p className="mb-1 text-[11px] font-bold text-amber-400">{item.criteriaLabel}</p>
                      <p className="text-xs text-slate-300">{item.criteriaDetail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prohibited Action Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-rose-300">{criteriaReview.prohibitedActionsLabel}</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {criteriaReview.prohibitedActionItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 rounded border border-rose-900/40 bg-rose-950/20 p-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <div>
                        <p className="mb-0.5 text-[11px] font-bold text-rose-400">{item.prohibitedLabel}</p>
                        <p className="text-[11px] leading-relaxed text-rose-200/80">{item.prohibitedDetail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Note */}
              <div className="rounded border-l-2 border-amber-600 bg-amber-900/10 p-3">
                <p className="text-xs text-amber-300/80">{criteriaReview.reviewSummaryNote}</p>
              </div>

              {/* Next Step */}
              <div className="mt-6 flex items-start gap-3 rounded-md border border-blue-900/30 bg-blue-950/20 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                <div>
                  <h5 className="text-sm font-medium text-blue-200">{criteriaReview.nextStepLabel}</h5>
                  <p className="mt-1 text-xs leading-relaxed text-blue-300/80">
                    {criteriaReview.nextStepContext}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Task 64: Token First Test Separate Approval Criteria Gap Analysis */}
      {(() => {
        const gapAnalysis = job.naverAuthTokenFirstTestSeparateApprovalCriteriaGapAnalysisScreen;
        if (!gapAnalysis || !gapAnalysis.gapAnalysisCreated) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-indigo-500/20 bg-indigo-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-indigo-900/30 bg-indigo-900/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <ClipboardList className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-100">{gapAnalysis.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-indigo-400/80">
                    <span className="font-medium text-emerald-400/90">{gapAnalysis.gapAnalysisStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{gapAnalysis.gapAnalysisPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-6">

              {/* Satisfied Criteria Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-emerald-300">충족된 조건</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {gapAnalysis.satisfiedCriteriaItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 rounded border border-emerald-900/40 bg-emerald-950/20 p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <div>
                        <p className="mb-0.5 text-[11px] font-bold text-emerald-400">{item.criteriaLabel}</p>
                        <p className="text-[11px] leading-relaxed text-emerald-200/80">{item.criteriaDetail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unsatisfied Criteria Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-amber-300">미충족 조건</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {gapAnalysis.unsatisfiedCriteriaItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 rounded border border-amber-900/40 bg-amber-950/20 p-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <div>
                        <p className="mb-0.5 text-[11px] font-bold text-amber-400">{item.criteriaLabel}</p>
                        <p className="text-[11px] leading-relaxed text-amber-200/80">{item.criteriaDetail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blocking Gap Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-rose-300">현재 승인 불가 사유 (Blocking Gaps)</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {gapAnalysis.blockingGapItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 rounded border border-rose-900/40 bg-rose-950/20 p-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <div>
                        <p className="mb-0.5 text-[11px] font-bold text-rose-400">{item.gapLabel}</p>
                        <p className="text-[11px] leading-relaxed text-rose-200/80">{item.gapDetail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Forbidden Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-300">여전히 제한되는 사항 (Safety Guard)</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {gapAnalysis.stillForbiddenItems.map((item) => (
                    <div key={item.id} className="rounded border border-slate-700/60 bg-slate-800/40 p-3">
                      <p className="mb-1 text-[11px] font-bold text-slate-300">{item.forbiddenLabel}</p>
                      <p className="text-[11px] leading-relaxed text-slate-400/80">{item.forbiddenDetail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Step */}
              <div className="mt-6 flex items-start gap-3 rounded-md border border-blue-900/30 bg-blue-950/20 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                <div>
                  <h5 className="text-sm font-medium text-blue-200">다음 단계 안내 (Next Step)</h5>
                  <p className="mt-1 text-xs leading-relaxed text-blue-300/80">
                    {gapAnalysis.nextStepLabel}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Task 65: Token First Test Separate Approval Risk Matrix */}
      {(() => {
        const riskMatrix = job.naverAuthTokenFirstTestSeparateApprovalRiskMatrixScreen;
        if (!riskMatrix || !riskMatrix.riskMatrixCreated) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-rose-500/30 bg-rose-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-rose-900/40 bg-rose-900/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rose-100">{riskMatrix.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-rose-300/80">
                    <span className="font-medium text-amber-400/90">{riskMatrix.riskMatrixStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{riskMatrix.riskMatrixPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-6">

              {/* High Risk Items */}
              {riskMatrix.highRiskItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-rose-400 flex items-center gap-2">
                    <X className="h-4 w-4" />
                    High Risk (고위험 요인)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {riskMatrix.highRiskItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-2 rounded border border-rose-900/50 bg-rose-950/30 p-4 sm:flex-row sm:items-start sm:gap-4">
                        <div className="flex w-full flex-col gap-1 sm:w-1/3">
                          <p className="text-xs font-bold text-rose-300">{item.riskLabel}</p>
                          <span className="w-fit rounded bg-rose-900/60 px-2 py-0.5 text-[10px] font-medium text-rose-200">
                            {item.riskStatus}
                          </span>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-2/3">
                          <div className="rounded bg-rose-900/20 p-2">
                            <p className="text-[10px] font-semibold text-rose-400/80">차단 사유</p>
                            <p className="text-[11px] leading-relaxed text-rose-100/90">{item.blockingReason}</p>
                          </div>
                          <div className="rounded bg-emerald-900/10 p-2 border border-emerald-900/20">
                            <p className="text-[10px] font-semibold text-emerald-500/80">완화 조건</p>
                            <p className="text-[11px] leading-relaxed text-emerald-200/90">{item.mitigationCondition}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medium Risk Items */}
              {riskMatrix.mediumRiskItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-amber-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Medium Risk (중위험 요인)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {riskMatrix.mediumRiskItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-2 rounded border border-amber-900/40 bg-amber-950/20 p-4 sm:flex-row sm:items-start sm:gap-4">
                        <div className="flex w-full flex-col gap-1 sm:w-1/3">
                          <p className="text-xs font-bold text-amber-300">{item.riskLabel}</p>
                          <span className="w-fit rounded bg-amber-900/40 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                            {item.riskStatus}
                          </span>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-2/3">
                          <div className="rounded bg-amber-900/10 p-2">
                            <p className="text-[10px] font-semibold text-amber-500/80">제한 사유</p>
                            <p className="text-[11px] leading-relaxed text-amber-100/90">{item.blockingReason}</p>
                          </div>
                          <div className="rounded bg-emerald-900/10 p-2 border border-emerald-900/20">
                            <p className="text-[10px] font-semibold text-emerald-500/80">완화 조건</p>
                            <p className="text-[11px] leading-relaxed text-emerald-200/90">{item.mitigationCondition}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Low Risk Items */}
              {riskMatrix.lowRiskItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-blue-400 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Low Risk (저위험 요인)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {riskMatrix.lowRiskItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-2 rounded border border-blue-900/40 bg-blue-950/20 p-4 sm:flex-row sm:items-start sm:gap-4">
                        <div className="flex w-full flex-col gap-1 sm:w-1/3">
                          <p className="text-xs font-bold text-blue-300">{item.riskLabel}</p>
                          <span className="w-fit rounded bg-blue-900/40 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                            {item.riskStatus}
                          </span>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-2/3">
                          <div className="rounded bg-blue-900/10 p-2">
                            <p className="text-[10px] font-semibold text-blue-400/80">주의 사유</p>
                            <p className="text-[11px] leading-relaxed text-blue-100/90">{item.blockingReason}</p>
                          </div>
                          <div className="rounded bg-emerald-900/10 p-2 border border-emerald-900/20">
                            <p className="text-[10px] font-semibold text-emerald-500/80">완화 가이드</p>
                            <p className="text-[11px] leading-relaxed text-emerald-200/90">{item.mitigationCondition}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Still Forbidden Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-300">지속 금지 항목 (Always Forbidden)</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {riskMatrix.stillForbiddenItems.map((item) => (
                    <div key={item.id} className="rounded border border-slate-700/60 bg-slate-800/40 p-3">
                      <p className="mb-1 text-[11px] font-bold text-slate-300">{item.forbiddenLabel}</p>
                      <p className="text-[11px] leading-relaxed text-slate-400/80">{item.forbiddenDetail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Step */}
              <div className="mt-6 flex items-start gap-3 rounded-md border border-indigo-900/30 bg-indigo-950/20 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                <div>
                  <h5 className="text-sm font-medium text-indigo-200">다음 단계 안내 (Next Step)</h5>
                  <p className="mt-1 text-xs leading-relaxed text-indigo-300/80">
                    {riskMatrix.nextStepLabel}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Task 66: Token First Test Separate Approval Risk Mitigation Plan */}
      {(() => {
        const mitigationPlan = job.naverAuthTokenFirstTestSeparateApprovalRiskMitigationPlanScreen;
        if (!mitigationPlan || !mitigationPlan.mitigationPlanCreated) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-indigo-500/30 bg-indigo-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-indigo-900/40 bg-indigo-900/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-100">{mitigationPlan.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-indigo-300/80">
                    <span className="font-medium text-amber-400/90">{mitigationPlan.mitigationPlanStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{mitigationPlan.mitigationPlanPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-6">

              {/* High Risk Mitigation Items */}
              {mitigationPlan.highRiskMitigationItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-rose-400 flex items-center gap-2">
                    <X className="h-4 w-4" />
                    High Risk 완화 조건 (고위험 요인)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {mitigationPlan.highRiskMitigationItems.map((item: any) => (
                      <div key={item.id} className="flex flex-col gap-2 rounded border border-rose-900/50 bg-rose-950/30 p-4 sm:flex-row sm:items-start sm:gap-4">
                        <div className="flex w-full flex-col gap-1 sm:w-1/3">
                          <p className="text-xs font-bold text-rose-300">{item.riskLabel}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-fit rounded bg-rose-900/60 px-2 py-0.5 text-[10px] font-medium text-rose-200">
                              {item.currentRiskLevel}
                            </span>
                            <span className="w-fit rounded bg-rose-900/60 px-2 py-0.5 text-[10px] font-medium text-rose-200">
                              {item.currentBlockingStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-2/3">
                          <div className="rounded bg-emerald-900/10 p-2 border border-emerald-900/20">
                            <p className="text-[10px] font-semibold text-emerald-500/80">필요한 완화 조건</p>
                            <p className="text-[11px] leading-relaxed text-emerald-200/90">{item.mitigationRequirement}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medium Risk Mitigation Items */}
              {mitigationPlan.mediumRiskMitigationItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-amber-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Medium Risk 완화 조건 (중위험 요인)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {mitigationPlan.mediumRiskMitigationItems.map((item: any) => (
                      <div key={item.id} className="flex flex-col gap-2 rounded border border-amber-900/40 bg-amber-950/20 p-4 sm:flex-row sm:items-start sm:gap-4">
                        <div className="flex w-full flex-col gap-1 sm:w-1/3">
                          <p className="text-xs font-bold text-amber-300">{item.riskLabel}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-fit rounded bg-amber-900/40 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                              {item.currentRiskLevel}
                            </span>
                            <span className="w-fit rounded bg-amber-900/40 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                              {item.currentBlockingStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-2/3">
                          <div className="rounded bg-emerald-900/10 p-2 border border-emerald-900/20">
                            <p className="text-[10px] font-semibold text-emerald-500/80">필요한 완화 조건</p>
                            <p className="text-[11px] leading-relaxed text-emerald-200/90">{item.mitigationRequirement}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Low Risk Mitigation Items */}
              {mitigationPlan.lowRiskMitigationItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-blue-400 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Low Risk 완화 조건 (저위험 요인)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {mitigationPlan.lowRiskMitigationItems.map((item: any) => (
                      <div key={item.id} className="flex flex-col gap-2 rounded border border-blue-900/40 bg-blue-950/20 p-4 sm:flex-row sm:items-start sm:gap-4">
                        <div className="flex w-full flex-col gap-1 sm:w-1/3">
                          <p className="text-xs font-bold text-blue-300">{item.riskLabel}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-fit rounded bg-blue-900/40 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                              {item.currentRiskLevel}
                            </span>
                            <span className="w-fit rounded bg-blue-900/40 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                              {item.currentBlockingStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-2/3">
                          <div className="rounded bg-emerald-900/10 p-2 border border-emerald-900/20">
                            <p className="text-[10px] font-semibold text-emerald-500/80">필요한 완화 조건</p>
                            <p className="text-[11px] leading-relaxed text-emerald-200/90">{item.mitigationRequirement}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Post Mitigation Still Forbidden Items */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-300">완화 후에도 지속 금지되는 항목 (Post-Mitigation Still Forbidden)</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {mitigationPlan.postMitigationStillForbiddenItems.map((item: any) => (
                    <div key={item.id} className="rounded border border-slate-700/60 bg-slate-800/40 p-3">
                      <p className="mb-1 text-[11px] font-bold text-slate-300">{item.forbiddenLabel}</p>
                      <p className="text-[11px] leading-relaxed text-slate-400/80">{item.forbiddenDetail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Blocking Items (Status summary) */}
              {mitigationPlan.stillBlockingItems.length > 0 && (
                <div className="mt-4 rounded-md bg-amber-950/30 p-3 border border-amber-900/30">
                  <p className="text-xs font-semibold text-amber-400 mb-2">현재 차단 요약</p>
                  <ul className="list-disc pl-5 text-[11px] text-amber-200/80 space-y-1">
                    {mitigationPlan.stillBlockingItems.map((item: any) => (
                      <li key={item.id}>{item.blockingLabel}: {item.blockingDetail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Step */}
              <div className="mt-6 flex items-start gap-3 rounded-md border border-indigo-900/30 bg-indigo-950/20 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                <div>
                  <h5 className="text-sm font-medium text-indigo-200">다음 단계 안내 (Next Step)</h5>
                  <p className="mt-1 text-xs leading-relaxed text-indigo-300/80">
                    {mitigationPlan.nextStepLabel}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Task 67: Token First Test Separate Approval Final Blocker Summary */}
      {(() => {
        const finalBlocker = job.naverAuthTokenFirstTestSeparateApprovalFinalBlockerSummaryScreen;
        if (!finalBlocker || !finalBlocker.finalBlockerSummaryCreated) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-red-500/30 bg-red-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-red-900/40 bg-red-900/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-100">{finalBlocker.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-red-300/80">
                    <span className="font-medium text-red-400/90">{finalBlocker.finalBlockerStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{finalBlocker.finalBlockerPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-6">

              {/* Final Blocker Items */}
              {finalBlocker.finalBlockerItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-red-400 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    최종 차단 조건 (Final Blockers)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {finalBlocker.finalBlockerItems.map((item: any) => (
                      <div key={item.id} className="flex flex-col gap-2 rounded border border-red-900/50 bg-red-950/30 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1 w-full">
                            <p className="text-sm font-bold text-red-300">{item.blockerLabel}</p>
                            <p className="text-xs text-red-200/70 mt-1">{item.blockerReason}</p>
                          </div>
                          <span className="shrink-0 rounded bg-red-900/60 px-2 py-1 text-[10px] font-bold text-red-200">
                            {item.blockerStatus}
                          </span>
                        </div>
                        <div className="mt-3 rounded bg-red-950/50 p-2 border border-red-900/40">
                          <p className="text-[10px] font-semibold text-red-500/80 mb-1">차단되는 기능</p>
                          <p className="text-[11px] font-medium text-red-200/90">{item.forbiddenFunction}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Unresolved Blocker Items */}
              {finalBlocker.unresolvedBlockerItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-rose-400 flex items-center gap-2">
                    <X className="h-4 w-4" />
                    완화 불가능 영구 차단 항목 (Unresolved Blockers)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {finalBlocker.unresolvedBlockerItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-rose-900/40 bg-rose-950/20 p-3">
                        <p className="mb-1 text-xs font-bold text-rose-300">{item.forbiddenLabel}</p>
                        <p className="text-[11px] leading-relaxed text-rose-200/80">{item.forbiddenDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Still Forbidden Items */}
              {finalBlocker.stillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-amber-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    별도 승인 전까지 지속 차단되는 기능 (Still Forbidden)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {finalBlocker.stillForbiddenItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-amber-900/40 bg-amber-950/20 p-3">
                        <p className="mb-1 text-xs font-bold text-amber-300">{item.forbiddenLabel}</p>
                        <p className="text-[10px] text-amber-200/80">{item.forbiddenDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Release Requirement Items */}
              {finalBlocker.releaseRequirementItems.length > 0 && (
                <div className="mt-4 rounded-md bg-indigo-950/30 p-3 border border-indigo-900/30">
                  <p className="text-xs font-semibold text-indigo-400 mb-2">테스트 실행을 위한 최소 요구 조건</p>
                  <ul className="list-disc pl-5 text-[11px] text-indigo-200/80 space-y-1">
                    {finalBlocker.releaseRequirementItems.map((item: any) => (
                      <li key={item.id}>
                        <span className="font-semibold text-indigo-300">{item.requirementLabel}:</span> {item.requirementDetail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Step */}
              <div className="mt-6 flex items-start gap-3 rounded-md border border-emerald-900/30 bg-emerald-950/20 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <h5 className="text-sm font-medium text-emerald-200">다음 단계 안내 (Next Step)</h5>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-300/80">
                    {finalBlocker.nextStepLabel}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Task 68: Token First Test Separate Approval Request Packet */}
      {(() => {
        const requestPacket = job.naverAuthTokenFirstTestSeparateApprovalRequestPacketScreen;
        if (!requestPacket || !requestPacket.requestPacketCreated) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-indigo-500/30 bg-indigo-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-indigo-900/40 bg-indigo-900/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <FileText className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-100">{requestPacket.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-indigo-300/80">
                    <span className="font-medium text-indigo-400/90">{requestPacket.requestPacketStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{requestPacket.requestPacketPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-6">

              {/* Request Purpose Items */}
              {requestPacket.requestPurposeItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-indigo-300 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    승인 요청 목적 (Request Purpose)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {requestPacket.requestPurposeItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-indigo-900/40 bg-indigo-950/30 p-3">
                        <p className="mb-1 text-xs font-bold text-indigo-200">{item.purposeLabel}</p>
                        <p className="text-[11px] leading-relaxed text-indigo-300/80">{item.purposeDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Request Scope Items */}
              {requestPacket.requestScopeItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-sky-300 flex items-center gap-2">
                    <Maximize className="h-4 w-4" />
                    허가 요청 대상 및 범위 (Request Scope)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {requestPacket.requestScopeItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-sky-900/40 bg-sky-950/20 p-3">
                        <p className="mb-1 text-xs font-bold text-sky-200">{item.scopeLabel}</p>
                        <p className="text-[11px] leading-relaxed text-sky-300/80">{item.scopeDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Packet Items */}
              {requestPacket.evidencePacketItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-teal-300 flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    첨부 증거물 요약 (Evidence Packet)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {requestPacket.evidencePacketItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-teal-900/40 bg-teal-950/20 p-3">
                        <p className="mb-1 text-xs font-bold text-teal-200">{item.evidenceLabel}</p>
                        <p className="text-[11px] leading-relaxed text-teal-300/80">{item.evidenceDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Still Forbidden Items */}
              {requestPacket.stillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    승인 전 유지되는 강력한 제약사항 (Still Forbidden)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {requestPacket.stillForbiddenItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-amber-900/40 bg-amber-950/20 p-3 text-center flex flex-col justify-center items-center h-full">
                        <p className="text-xs font-bold text-amber-300 mb-1">{item.forbiddenLabel}</p>
                        <p className="text-[10px] text-amber-200/80">{item.forbiddenDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pre Submission Check Items */}
              {requestPacket.preSubmissionCheckItems.length > 0 && (
                <div className="mt-4 rounded-md bg-slate-900/50 p-4 border border-slate-700">
                  <h4 className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-slate-400" />
                    제출 전 확인 사항 (Pre-submission Checklist)
                  </h4>
                  <ul className="space-y-2">
                    {requestPacket.preSubmissionCheckItems.map((item: any) => (
                      <li key={item.id} className="flex items-start gap-2 text-[11px] text-slate-400">
                        {item.isConfirmed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-600 mt-0.5 shrink-0" />
                        )}
                        <span>{item.checkLabel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Step */}
              <div className="mt-6 flex items-start gap-3 rounded-md border border-fuchsia-900/30 bg-fuchsia-950/20 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-400" />
                <div>
                  <h5 className="text-sm font-medium text-fuchsia-200">다음 단계 안내 (Next Step)</h5>
                  <p className="mt-1 text-xs leading-relaxed text-fuchsia-300/80">
                    {requestPacket.nextStepLabel}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}


      {/* Task 69: Token First Test Separate Approval Pre-submission Review */}
      {(() => {
        const preReview = job.naverAuthTokenFirstTestSeparateApprovalPreSubmissionReviewScreen;
        if (!preReview || !preReview.preSubmissionReviewOnly) return null;

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-violet-500/30 bg-violet-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-violet-900/40 bg-violet-900/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                  <FileCheck className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-violet-100">{preReview.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-violet-300/80">
                    <span className="font-medium text-violet-400/90">{preReview.preSubmissionStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{preReview.preSubmissionPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* 미제출 상태 배너 */}
              <div className="rounded-md border border-violet-700/30 bg-violet-950/30 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <div>
                    <p className="text-xs font-bold text-violet-300">승인 요청 미제출 상태 (read-only 사전검토 전용)</p>
                    <p className="mt-1 text-[10px] leading-relaxed text-violet-300/70">
                      패킷 참조 커밋: {preReview.requestPacketCommit} | 이 화면은 실행 화면이 아닙니다. 승인 요청 제출 기능이 없습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 패킷 검토 상태 */}
              {preReview.packetReviewItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
                    승인 요청서 패킷 검토 상태
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {preReview.packetReviewItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-violet-800/30 bg-violet-900/10 px-3 py-2 text-center">
                        <CheckCircle2 className="mx-auto mb-1 h-4 w-4 text-emerald-500" />
                        <p className="text-[10px] font-semibold text-violet-200">{item.reviewLabel}</p>
                        <p className="mt-0.5 text-[9px] text-emerald-400">{item.reviewStatus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2-column: 누락 가능 항목 / 오해 방지 항목 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* 제출 전 누락 가능 항목 */}
                {preReview.missingBeforeSubmissionItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      제출 전 누락 가능 항목
                    </h4>
                    <div className="space-y-2">
                      {preReview.missingBeforeSubmissionItems.map((item: any) => (
                        <div key={item.id} className="rounded border border-amber-900/30 bg-amber-950/10 px-3 py-2">
                          <p className="mb-0.5 text-[11px] font-semibold text-amber-300">{item.checkLabel}</p>
                          <p className="text-[10px] leading-relaxed text-gray-500">{item.checkDetail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 오해 방지 항목 */}
                {preReview.misunderstandingPreventionItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                      제출 전 오해 방지 항목
                    </h4>
                    <div className="space-y-2">
                      {preReview.misunderstandingPreventionItems.map((item: any) => (
                        <div key={item.id} className="rounded border border-sky-900/30 bg-sky-950/10 px-3 py-2">
                          <p className="mb-0.5 text-[11px] font-semibold text-sky-300">{item.itemLabel}</p>
                          <p className="text-[10px] leading-relaxed text-gray-500">{item.itemDetail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 위험 재확인 항목 */}
              {preReview.riskRecheckItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">
                    제출 전 위험 재확인 항목
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {preReview.riskRecheckItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-red-900/25 bg-red-950/10 px-3 py-2">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                          <div>
                            <p className="text-[11px] font-semibold text-red-300">{item.recheckLabel}</p>
                            <p className="mt-0.5 text-[10px] leading-relaxed text-gray-500">{item.recheckDetail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 여전히 금지되는 항목 */}
              {preReview.stillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-500">
                    여전히 금지되는 항목 (승인 전·후 공통)
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {preReview.stillForbiddenItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-rose-900/25 bg-rose-950/10 p-3 text-center">
                        <Lock className="mx-auto mb-1 h-4 w-4 text-rose-500" />
                        <p className="text-[10px] font-bold text-rose-300">{item.forbiddenLabel}</p>
                        <p className="mt-0.5 text-[9px] text-rose-200/70">{item.forbiddenDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 다음 단계 */}
              <div className="flex items-start gap-3 rounded-md border border-violet-900/30 bg-violet-950/20 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
                <div>
                  <h5 className="text-sm font-medium text-violet-200">사전검토 안내</h5>
                  <p className="mt-1 text-xs leading-relaxed text-violet-300/80">{preReview.nextStepLabel}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Task 70: Token First Test Separate Approval Submission Readiness Decision */}
      {(() => {
        const decision = job.naverAuthTokenFirstTestSeparateApprovalSubmissionReadinessDecisionScreen;
        if (!decision || !decision.submissionDecisionReviewOnly) return null;

        const statusColor = (status: string) => {
          if (status === 'NOT_READY') return 'text-red-400 bg-red-950/20 border-red-800/30';
          if (status === 'CONDITIONAL') return 'text-amber-400 bg-amber-950/20 border-amber-800/30';
          return 'text-slate-400 bg-slate-900/30 border-slate-700/30';
        };

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-rose-500/25 bg-rose-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-rose-900/40 bg-rose-900/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rose-100">{decision.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-rose-300/80">
                    <span className="font-medium text-rose-400/90">{decision.submissionDecisionStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{decision.submissionDecisionPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* 참조 커밋 배너 */}
              <div className="rounded-md border border-rose-700/25 bg-rose-950/20 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  <p className="text-[10px] leading-relaxed text-rose-300/70">
                    사전검토 참조 커밋: {decision.preSubmissionReviewCommit} | 승인 요청 제출 없음 | 이 화면에 제출 기능 없음
                  </p>
                </div>
              </div>

              {/* 판단 요약 카드 */}
              {decision.readinessDecisionItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
                    제출 준비 판단 요약
                  </h4>
                  <div className="space-y-2">
                    {decision.readinessDecisionItems.map((item: any) => (
                      <div key={item.id} className={`flex items-start gap-3 rounded border px-3 py-2.5 ${statusColor(item.decisionStatus)}`}>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{item.decisionLabel}</p>
                          <p className="mt-0.5 text-xs">{item.decisionValue}</p>
                        </div>
                        <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase opacity-80 border border-current">
                          {item.decisionStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2-column: 제출 보류 사유 / 해소 필요 항목 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* 제출 보류 사유 */}
                {decision.submissionBlockedReasonItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      제출 보류 사유
                    </h4>
                    <div className="space-y-2">
                      {decision.submissionBlockedReasonItems.map((item: any) => (
                        <div key={item.id} className="rounded border border-amber-900/30 bg-amber-950/10 px-3 py-2">
                          <p className="mb-0.5 text-[11px] font-semibold text-amber-300">{item.reasonLabel}</p>
                          <p className="text-[10px] leading-relaxed text-gray-500">{item.reasonDetail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 제출 전 해소 필요 항목 */}
                {decision.unresolvedBeforeSubmissionItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
                      제출 전 해소 필요 항목
                    </h4>
                    <div className="space-y-2">
                      {decision.unresolvedBeforeSubmissionItems.map((item: any) => (
                        <div key={item.id} className="rounded border border-orange-900/25 bg-orange-950/10 px-3 py-2">
                          <p className="mb-0.5 text-[11px] font-semibold text-orange-300">{item.itemLabel}</p>
                          <p className="text-[10px] leading-relaxed text-gray-500">{item.itemDetail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 제출 후에도 여전히 금지되는 항목 */}
              {decision.postSubmissionStillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    제출 이후에도 여전히 금지 (추가 해제 단계 필요)
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {decision.postSubmissionStillForbiddenItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-red-900/25 bg-red-950/10 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.forbiddenLabel}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.forbiddenDetail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 다음 단계 안내 */}
              <div className="flex items-start gap-3 rounded-md border border-rose-900/30 bg-rose-950/15 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <h5 className="text-sm font-medium text-rose-200">제출 준비 판단 안내</h5>
                  <p className="mt-1 text-xs leading-relaxed text-rose-300/80">{decision.nextStepLabel}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 71: Separate Approval Submission Decision Seal ───────────────── */}
      {(() => {
        const seal = job.naverAuthTokenFirstTestSeparateApprovalSubmissionDecisionSealScreen;
        if (!seal || !seal.submissionDecisionSealReviewOnly) return null;

        const sealStatusColor = (status: string) => {
          if (status === 'BLOCKED') return 'text-red-400 bg-red-950/20 border-red-800/30';
          if (status === 'NOT_RELEASED') return 'text-amber-400 bg-amber-950/20 border-amber-800/30';
          return 'text-violet-400 bg-violet-950/20 border-violet-800/30';
        };

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-violet-500/25 bg-violet-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-violet-900/40 bg-violet-900/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                  <ShieldAlert className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-violet-100">{seal.screenTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-violet-300/80">
                    <span className="font-medium text-violet-400/90">{seal.submissionDecisionSealStatus}</span>
                    <span className="text-slate-600">|</span>
                    <span>{seal.submissionDecisionSealPhaseName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* 참조 커밋 배너 */}
              <div className="rounded-md border border-violet-700/25 bg-violet-950/20 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <p className="text-[10px] leading-relaxed text-violet-300/70">
                    제출 준비 판단 참조 커밋: {seal.submissionReadinessDecisionCommit} | 승인 요청 제출 없음 | 실행 해제 없음 | 이 화면에 저장·제출·실행 기능 없음
                  </p>
                </div>
              </div>

              {/* 봉인 판단 카드 */}
              {seal.decisionSealItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
                    제출 판단 봉인 내용
                  </h4>
                  <div className="space-y-2">
                    {seal.decisionSealItems.map((item: any) => (
                      <div key={item.id} className={`flex items-start gap-3 rounded border px-3 py-2.5 ${sealStatusColor(item.sealStatus)}`}>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{item.sealLabel}</p>
                          <p className="mt-0.5 text-xs">{item.sealValue}</p>
                        </div>
                        <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase opacity-80 border border-current">
                          {item.sealStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2-column: 제출 여전히 차단 / 여전히 금지 요약 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* 제출 여전히 차단 */}
                {seal.submissionStillBlockedItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      제출 여전히 차단 사유
                    </h4>
                    <div className="space-y-2">
                      {seal.submissionStillBlockedItems.map((item: any) => (
                        <div key={item.id} className="rounded border border-amber-900/30 bg-amber-950/10 px-3 py-2">
                          <p className="mb-0.5 text-[11px] font-semibold text-amber-300">{item.blockedLabel}</p>
                          <p className="text-[10px] leading-relaxed text-gray-500">{item.blockedDetail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 봉인 이후에도 여전히 금지 요약 */}
                {seal.stillForbiddenItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                      봉인 이후에도 금지 유지
                    </h4>
                    <div className="space-y-2">
                      {seal.stillForbiddenItems.map((item: any) => (
                        <div key={item.id} className="flex items-start gap-2 rounded border border-red-900/25 bg-red-950/10 px-3 py-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.itemLabel}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.itemDetail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 실행 여전히 금지 */}
              {seal.executionStillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    실행 여전히 금지 (추가 해제 단계 필요)
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {seal.executionStillForbiddenItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-red-900/25 bg-red-950/10 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.forbiddenLabel}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.forbiddenDetail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 다음 단계 안내 */}
              {seal.nextStepItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    다음 단계 안내 (실행 불허)
                  </h4>
                  <div className="space-y-2">
                    {seal.nextStepItems.map((item: any) => (
                      <div key={item.id} className="rounded border border-slate-700/30 bg-slate-900/20 px-3 py-2">
                        <p className="mb-0.5 text-[11px] font-semibold text-slate-300">{item.stepLabel}</p>
                        <p className="text-[10px] leading-relaxed text-slate-500">{item.stepDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 봉인 안내 */}
              <div className="flex items-start gap-3 rounded-md border border-violet-900/30 bg-violet-950/15 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
                <div>
                  <h5 className="text-sm font-medium text-violet-200">제출 판단 봉인 안내</h5>
                  <p className="mt-1 text-xs leading-relaxed text-violet-300/80">{seal.nextStepLabel}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 72: Separate Approval Final Closure Gate ─────────────────────── */}
      {(() => {
        const gate = job.tokenFirstTestSeparateApprovalFinalClosureGateView;
        if (!gate) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/10 text-red-300';
          if (tone === 'warning') return 'border-amber-900/30 bg-amber-950/10 text-amber-300';
          if (tone === 'safe') return 'border-emerald-900/30 bg-emerald-950/10 text-emerald-300';
          return 'border-slate-700/30 bg-slate-900/20 text-slate-300';
        };

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-rose-500/25 bg-rose-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-rose-900/40 bg-rose-900/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                  <Lock className="h-5 w-5 text-rose-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-rose-100">
                      Token First Test Separate Approval Final Closure Gate
                    </h3>
                    <span className="rounded-full border border-rose-500/40 bg-rose-900/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                      {gate.statusLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-rose-300/70">{gate.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* 요약 박스 */}
              <div className="rounded-md border border-rose-700/25 bg-rose-950/20 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  <div>
                    <p className="text-[11px] leading-relaxed text-rose-300/80">{gate.summary}</p>
                    <p className="mt-1 text-[10px] text-rose-400/60">Task 71 기준 커밋: {gate.task71Commit} | 승인 요청 제출 없음 | token 발급 없음 | 실행 버튼 없음</p>
                  </div>
                </div>
              </div>

              {/* Final Closure Gate 항목 */}
              {gate.finalClosureGateItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
                    Final Closure Gate — Task 41~71 흐름 요약
                  </h4>
                  <div className="space-y-2">
                    {gate.finalClosureGateItems.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-3 rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <Circle className="mt-0.5 h-3 w-3 shrink-0 opacity-60" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold opacity-80">{item.label}</p>
                          <p className="mt-0.5 text-[10px] leading-relaxed opacity-70">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2-column: Read-only 확인 / Release 차단 사유 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {gate.readOnlyClosureChecks.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Read-only 흐름 확인
                    </h4>
                    <div className="space-y-2">
                      {gate.readOnlyClosureChecks.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 rounded border border-emerald-900/30 bg-emerald-950/10 px-3 py-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          <div>
                            <p className="text-[10px] font-semibold text-emerald-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-emerald-200/60">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {gate.releaseBlockedReasons.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                      Release 차단 사유
                    </h4>
                    <div className="space-y-2">
                      {gate.releaseBlockedReasons.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 rounded border border-red-900/25 bg-red-950/10 px-3 py-2">
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-semibold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 다음 사람 검토 항목 */}
              {gate.nextHumanReviewItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    다음 사람 검토 항목 (실행 불허)
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {gate.nextHumanReviewItems.map((item, idx) => (
                      <div key={idx} className="rounded border border-slate-700/30 bg-slate-900/20 px-3 py-2">
                        <p className="mb-0.5 text-[11px] font-semibold text-slate-300">{item.label}</p>
                        <p className="text-[10px] leading-relaxed text-slate-500">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 여전히 금지 유지 */}
              {gate.stillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    Final Closure Gate 이후에도 금지 유지
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {gate.stillForbiddenItems.map((item, idx) => (
                      <div key={idx} className="rounded border border-red-900/25 bg-red-950/10 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 최종 안내 */}
              <div className="flex items-start gap-3 rounded-md border border-rose-900/30 bg-rose-950/15 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <h5 className="text-sm font-medium text-rose-200">Final Closure Gate 안내</h5>
                  <p className="mt-1 text-xs leading-relaxed text-rose-300/80">
                    이 패널은 실제 제출/실행으로 넘어가기 전 read-only 검토 흐름을 최종 봉인합니다.
                    현재 상태에서는 승인 요청 제출, token 발급, Naver API 호출, Queue/Worker 실행, 운영 DB write가 허용되지 않습니다.
                    다음 단계는 사람의 별도 승인 여부 검토입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 73: Separate Approval Final Closure Handoff Summary ────────────── */}
      {(() => {
        const hs = job.tokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView;
        if (!hs) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/10 text-red-300';
          if (tone === 'warning') return 'border-amber-900/30 bg-amber-950/10 text-amber-300';
          return 'border-slate-700/30 bg-slate-900/20 text-slate-300';
        };

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-amber-500/25 bg-amber-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-amber-900/40 bg-amber-900/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                  <Info className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-amber-100">
                      Final Closure Handoff Summary
                    </h3>
                    <span className="rounded-full border border-amber-500/40 bg-amber-900/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      {hs.statusLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-amber-300/70">{hs.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* 요약 박스 */}
              <div className="rounded-md border border-amber-700/25 bg-amber-950/20 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="text-[11px] leading-relaxed text-amber-300/80">{hs.summary}</p>
                    <p className="mt-1 text-[10px] text-amber-400/60">
                      {hs.taskRangeLabel} | 이전 게이트: {hs.previousGateLabel} ({hs.previousGateCommit})
                    </p>
                  </div>
                </div>
              </div>

              {/* Handoff Summary 항목 */}
              {hs.handoffSummaryItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Handoff Summary
                  </h4>
                  <div className="space-y-2">
                    {hs.handoffSummaryItems.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-3 rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <Circle className="mt-0.5 h-3 w-3 shrink-0 opacity-60" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] font-semibold opacity-80">{item.label}</p>
                            <span className="rounded bg-slate-800/40 px-1.5 py-0.5 text-[9px] opacity-70">{item.value}</span>
                          </div>
                          <p className="mt-0.5 text-[10px] leading-relaxed opacity-70">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2-column: Closure Evidence / Human Review Required */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {hs.closureEvidenceItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Closure Evidence
                    </h4>
                    <div className="space-y-2">
                      {hs.closureEvidenceItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 rounded border border-emerald-900/30 bg-emerald-950/10 px-3 py-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          <div>
                            <p className="text-[10px] font-semibold text-emerald-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-emerald-200/60">{item.description}</p>
                            <p className="mt-0.5 text-[9px] text-emerald-400/50">{item.evidence}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hs.humanReviewRequiredItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                      Human Review Required
                    </h4>
                    <div className="space-y-2">
                      {hs.humanReviewRequiredItems.map((item, idx) => (
                        <div key={idx} className={`flex items-start gap-2 rounded border px-3 py-2 ${toneColor(item.tone)}`}>
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                          <div>
                            <p className="text-[10px] font-semibold">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed opacity-70">{item.reason}</p>
                            <p className="mt-0.5 text-[9px] opacity-50">필요 시점: {item.requiredBefore}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Not Released Yet */}
              {hs.notReleasedItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    Not Released Yet — 실행 미해제 항목
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {hs.notReleasedItems.map((item, idx) => (
                      <div key={idx} className="rounded border border-red-900/25 bg-red-950/10 p-2.5">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.description}</p>
                            <span className="mt-1 inline-block rounded bg-red-900/30 px-1 py-0.5 text-[8px] text-red-400">{item.releaseState}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Handoff Items */}
              {hs.nextHandoffItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Next Handoff Items — 사람 인수인계 항목
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {hs.nextHandoffItems.map((item, idx) => (
                      <div key={idx} className={`rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <p className="mb-0.5 text-[11px] font-semibold">{item.label}</p>
                        <p className="text-[10px] leading-relaxed opacity-70">{item.description}</p>
                        <p className="mt-1 text-[9px] opacity-50">담당: {item.owner}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Still Forbidden */}
              {hs.stillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    Still Forbidden — Handoff Summary 이후에도 금지 유지
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {hs.stillForbiddenItems.map((item, idx) => (
                      <div key={idx} className="rounded border border-red-900/25 bg-red-950/10 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-amber-900/30 bg-amber-950/15 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <h5 className="text-sm font-medium text-amber-200">Final Handoff Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-amber-300/80">{hs.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 74: Human Review Acceptance Checklist ───────────────────────── */}
      {(() => {
        const cl = job.tokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView;
        if (!cl) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/10 text-red-300';
          if (tone === 'warning') return 'border-amber-900/30 bg-amber-950/10 text-amber-300';
          return 'border-slate-700/30 bg-slate-900/20 text-slate-300';
        };

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-cyan-500/25 bg-cyan-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-cyan-900/40 bg-cyan-900/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-cyan-100">
                      Human Review Acceptance Checklist
                    </h3>
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-900/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      {cl.statusLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-cyan-300/70">{cl.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* 요약 박스 */}
              <div className="rounded-md border border-cyan-700/25 bg-cyan-950/20 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-[11px] leading-relaxed text-cyan-300/80">{cl.summary}</p>
                    <p className="mt-1 text-[10px] text-cyan-400/60">
                      {cl.taskRangeLabel} | 이전 인수인계: {cl.previousHandoffLabel} ({cl.previousHandoffCommit})
                    </p>
                  </div>
                </div>
              </div>

              {/* Acceptance Checklist */}
              {cl.acceptanceChecklistItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    Acceptance Checklist — 검토 수락 전 확인 항목
                  </h4>
                  <div className="space-y-2">
                    {cl.acceptanceChecklistItems.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-3 rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <Circle className="mt-0.5 h-3 w-3 shrink-0 opacity-60" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[10px] font-semibold opacity-80">{item.label}</p>
                            <span className="rounded bg-slate-800/40 px-1.5 py-0.5 text-[9px] opacity-70">{item.currentState}</span>
                          </div>
                          <p className="mt-0.5 text-[10px] leading-relaxed opacity-70">{item.description}</p>
                          <p className="mt-0.5 text-[9px] opacity-50">필요 상태: {item.requiredState}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2-column: Reviewer Awareness / Acceptance Blocked */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {cl.reviewerAwarenessItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Reviewer Awareness — 검토자 인지 필요
                    </h4>
                    <div className="space-y-2">
                      {cl.reviewerAwarenessItems.map((item, idx) => (
                        <div key={idx} className={`flex items-start gap-2 rounded border px-3 py-2 ${toneColor(item.tone)}`}>
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                          <div>
                            <p className="text-[10px] font-semibold">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed opacity-70">{item.description}</p>
                            <p className="mt-0.5 text-[9px] font-medium opacity-60">{item.reviewerMustUnderstand}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cl.acceptanceBlockedItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                      Acceptance Blocked — 수락 차단 사유
                    </h4>
                    <div className="space-y-2">
                      {cl.acceptanceBlockedItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 rounded border border-red-900/25 bg-red-950/10 px-3 py-2">
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-semibold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.reason}</p>
                            <span className="mt-0.5 inline-block rounded bg-red-900/30 px-1 py-0.5 text-[8px] text-red-400">{item.unresolvedState}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Evidence Review */}
              {cl.evidenceReviewItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Evidence Review — 근거 검토
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {cl.evidenceReviewItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 rounded border border-emerald-900/30 bg-emerald-950/10 px-3 py-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <div>
                          <p className="text-[10px] font-semibold text-emerald-300">{item.label}</p>
                          <p className="mt-0.5 text-[9px] leading-relaxed text-emerald-200/60">{item.description}</p>
                          <p className="mt-0.5 text-[9px] text-emerald-400/50">{item.evidenceState}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Not Approval */}
              {cl.notApprovalItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    Not Approval — 이 화면은 승인 부여가 아님
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {cl.notApprovalItems.map((item, idx) => (
                      <div key={idx} className="rounded border border-red-900/25 bg-red-950/10 p-2.5">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.description}</p>
                            <span className="mt-1 inline-block rounded bg-red-900/30 px-1 py-0.5 text-[8px] text-red-400">{item.notGrantedState}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Review Preparation */}
              {cl.nextReviewPreparationItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Next Review Preparation — 다음 검토 준비 항목
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {cl.nextReviewPreparationItems.map((item, idx) => (
                      <div key={idx} className={`rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <p className="mb-0.5 text-[11px] font-semibold">{item.label}</p>
                        <p className="text-[10px] leading-relaxed opacity-70">{item.description}</p>
                        <p className="mt-1 text-[9px] opacity-50">담당: {item.nextOwner}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Still Forbidden */}
              {cl.stillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    Still Forbidden — 체크리스트 이후에도 금지 유지
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {cl.stillForbiddenItems.map((item, idx) => (
                      <div key={idx} className="rounded border border-red-900/25 bg-red-950/10 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-cyan-900/30 bg-cyan-950/15 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                <div>
                  <h5 className="text-sm font-medium text-cyan-200">Human Review Checklist — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-cyan-300/80">{cl.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 75: Human Review Acceptance Boundary ───────────────────────── */}
      {(() => {
        const bd = job.tokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView;
        if (!bd) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/10 text-red-300';
          if (tone === 'warning') return 'border-amber-900/30 bg-amber-950/10 text-amber-300';
          return 'border-slate-700/30 bg-slate-900/20 text-slate-300';
        };

        return (
          <div className="mb-6 overflow-hidden rounded-lg border border-indigo-500/25 bg-indigo-950/10 shadow-md">
            {/* Header */}
            <div className="border-b border-indigo-900/40 bg-indigo-900/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <AlertTriangle className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-indigo-100">
                      Human Review Acceptance Boundary
                    </h3>
                    <span className="rounded-full border border-indigo-500/40 bg-indigo-900/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                      {bd.statusLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-indigo-300/70">{bd.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* 요약 박스 */}
              <div className="rounded-md border border-indigo-700/25 bg-indigo-950/20 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  <div>
                    <p className="text-[11px] leading-relaxed text-indigo-300/80">{bd.summary}</p>
                    <p className="mt-1 text-[10px] text-indigo-400/60">
                      {bd.taskRangeLabel} | 이전 체크리스트: {bd.previousChecklistLabel} ({bd.previousChecklistCommit})
                    </p>
                  </div>
                </div>
              </div>

              {/* Boundary Summary */}
              {bd.boundarySummaryItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    Boundary Summary — 검토 수락 경계
                  </h4>
                  <div className="space-y-2">
                    {bd.boundarySummaryItems.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-3 rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <Circle className="mt-0.5 h-3 w-3 shrink-0 opacity-60" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[10px] font-semibold opacity-80">{item.label}</p>
                            <span className="rounded bg-slate-800/40 px-1.5 py-0.5 text-[9px] opacity-70">{item.boundaryState}</span>
                          </div>
                          <p className="mt-0.5 text-[10px] leading-relaxed opacity-70">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2-column: Acceptance Is Not Approval / Non-Execution Boundary */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {bd.acceptanceIsNotApprovalItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                      Acceptance Is Not Approval — 수락 ≠ 승인 부여
                    </h4>
                    <div className="space-y-2">
                      {bd.acceptanceIsNotApprovalItems.map((item, idx) => (
                        <div key={idx} className={`flex items-start gap-2 rounded border px-3 py-2 ${toneColor(item.tone)}`}>
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                          <div>
                            <p className="text-[10px] font-semibold">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed opacity-70">{item.description}</p>
                            <p className="mt-0.5 text-[9px] font-medium opacity-60">{item.notApprovalReason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {bd.nonExecutionBoundaryItems.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                      Non-Execution Boundary — 실행 비실행 경계
                    </h4>
                    <div className="space-y-2">
                      {bd.nonExecutionBoundaryItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 rounded border border-red-900/25 bg-red-950/10 px-3 py-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-semibold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.description}</p>
                            <span className="mt-0.5 inline-block rounded bg-red-900/30 px-1 py-0.5 text-[8px] text-red-400">{item.blockedState}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Required Before Release */}
              {bd.requiredBeforeReleaseItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Required Before Release — 실행 전 필수 조건
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {bd.requiredBeforeReleaseItems.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-2 rounded border px-3 py-2 ${toneColor(item.tone)}`}>
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                        <div>
                          <p className="text-[10px] font-semibold">{item.label}</p>
                          <p className="mt-0.5 text-[9px] leading-relaxed opacity-70">{item.description}</p>
                          <p className="mt-0.5 text-[9px] opacity-50">필요 근거: {item.requiredEvidence}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Misunderstanding Prevention */}
              {bd.reviewerMisunderstandingPreventionItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Misunderstanding Prevention — 오해 방지
                  </h4>
                  <div className="space-y-2">
                    {bd.reviewerMisunderstandingPreventionItems.map((item, idx) => (
                      <div key={idx} className={`rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <p className="mb-0.5 text-[10px] font-semibold">{item.label}</p>
                        <p className="text-[9px] opacity-60">오해: {item.misunderstanding}</p>
                        <p className="mt-0.5 text-[9px] font-medium opacity-80">올바른 해석: {item.correctInterpretation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Human Decision */}
              {bd.nextHumanDecisionItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Next Human Decision — 다음 사람 판단 항목
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {bd.nextHumanDecisionItems.map((item, idx) => (
                      <div key={idx} className={`rounded border px-3 py-2.5 ${toneColor(item.tone)}`}>
                        <p className="mb-0.5 text-[11px] font-semibold">{item.label}</p>
                        <p className="text-[10px] leading-relaxed opacity-70">{item.description}</p>
                        <p className="mt-1 text-[9px] opacity-50">담당: {item.nextOwner}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Still Forbidden */}
              {bd.stillForbiddenItems.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                    Still Forbidden — 경계 표시 이후에도 금지 유지
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {bd.stillForbiddenItems.map((item, idx) => (
                      <div key={idx} className="rounded border border-red-900/25 bg-red-950/10 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          <div>
                            <p className="text-[10px] font-bold text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-[9px] leading-relaxed text-red-200/60">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-indigo-900/30 bg-indigo-950/15 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                <div>
                  <h5 className="text-sm font-medium text-indigo-200">Acceptance Boundary — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-indigo-300/80">{bd.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 76: Human Review Non-Execution Seal ─────────────────────────── */}
      {(() => {
        const ns = job.tokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView;
        if (!ns) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-teal-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-teal-900/30 bg-teal-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-teal-800/40 bg-teal-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-teal-400" />
              <h2 className="text-base font-semibold text-teal-200">{ns.title}</h2>
              <span className="ml-1 rounded-full border border-teal-700/50 bg-teal-900/30 px-2 py-0.5 text-xs font-medium text-teal-300">
                {ns.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-teal-300/80">{ns.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-teal-400/70">
              <span>{ns.taskRangeLabel}</span>
              <span>기준: {ns.previousBoundaryLabel} ({ns.previousBoundaryCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Seal Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-400">Seal Summary</h4>
                <div className="space-y-2">
                  {ns.sealSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-teal-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-teal-400/60">{item.sealState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Execution Seal + Human Review Aftermath (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Non-Execution Seal</h4>
                  <div className="space-y-2">
                    {ns.nonExecutionSealItems.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                          <div>
                            <p className="text-xs font-medium text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-red-400/70">{item.sealedReason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Human Review Aftermath</h4>
                  <div className="space-y-2">
                    {ns.humanReviewAftermathItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-teal-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-teal-400/60">{item.currentMeaning}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Release Not Granted */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Release Not Granted</h4>
                <div className="space-y-2">
                  {ns.releaseNotGrantedItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-red-300">{item.label}</p>
                          <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-red-400/70">{item.notGrantedState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Separate Approval Required */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Separate Approval Required</h4>
                <div className="space-y-2">
                  {ns.separateApprovalRequiredItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-teal-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-teal-400/60">{item.requiredBeforeRelease}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Safe Review */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-400">Next Safe Review</h4>
                <div className="space-y-2">
                  {ns.nextSafeReviewItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-teal-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-teal-400/60">담당: {item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {ns.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-teal-900/30 bg-teal-950/15 p-4">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                <div>
                  <h5 className="text-sm font-medium text-teal-200">Non-Execution Seal — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-teal-300/80">{ns.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 77: Human Review Final Hold Summary ──────────────────────────── */}
      {(() => {
        const fh = job.tokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView;
        if (!fh) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-orange-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-orange-900/30 bg-orange-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-orange-800/40 bg-orange-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <h2 className="text-base font-semibold text-orange-200">{fh.title}</h2>
              <span className="ml-1 rounded-full border border-orange-700/50 bg-orange-900/30 px-2 py-0.5 text-xs font-medium text-orange-300">
                {fh.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-orange-300/80">{fh.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-orange-400/70">
              <span>{fh.taskRangeLabel}</span>
              <span>기준: {fh.previousSealLabel} ({fh.previousSealCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Hold Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-400">Hold Summary</h4>
                <div className="space-y-2">
                  {fh.holdSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-orange-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-orange-400/60">{item.holdState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Hold Reasons + Human Review Still Pending (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Final Hold Reasons</h4>
                  <div className="space-y-2">
                    {fh.finalHoldReasons.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-orange-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-orange-400/60">{item.reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Human Review Still Pending</h4>
                  <div className="space-y-2">
                    {fh.humanReviewStillPendingItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-orange-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-orange-400/60">{item.pendingState}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Release Blocked */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Release Blocked</h4>
                <div className="space-y-2">
                  {fh.releaseBlockedItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                      <div className="flex items-start gap-2">
                        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-red-300">{item.label}</p>
                          <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-red-400/70">{item.blockedState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not Execution Ready */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Not Execution Ready</h4>
                <div className="space-y-2">
                  {fh.notExecutionReadyItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <div>
                          <p className="text-xs font-medium text-red-300">{item.label}</p>
                          <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-red-400/70">{item.notReadyState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Safe Handoff */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-400">Next Safe Handoff</h4>
                <div className="space-y-2">
                  {fh.nextSafeHandoffItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-orange-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-orange-400/60">담당: {item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {fh.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-orange-900/30 bg-orange-950/15 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                <div>
                  <h5 className="text-sm font-medium text-orange-200">Final Hold Summary — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-orange-300/80">{fh.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 78: Final Hold Release Preconditions Review ──────────────────── */}
      {(() => {
        const pr = job.tokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView;
        if (!pr) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-purple-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-purple-900/30 bg-purple-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-purple-800/40 bg-purple-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-purple-400" />
              <h2 className="text-base font-semibold text-purple-200">{pr.title}</h2>
              <span className="ml-1 rounded-full border border-purple-700/50 bg-purple-900/30 px-2 py-0.5 text-xs font-medium text-purple-300">
                {pr.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-purple-300/80">{pr.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-purple-400/70">
              <span>{pr.taskRangeLabel}</span>
              <span>기준: {pr.previousHoldLabel} ({pr.previousHoldCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Precondition Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">Precondition Summary</h4>
                <div className="space-y-2">
                  {pr.preconditionSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.currentState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Release Preconditions + Unresolved Hold Items (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Release Preconditions</h4>
                  <div className="space-y-2">
                    {pr.releasePreconditionItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-purple-400/60">{item.requiredBeforeRelease}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Unresolved Hold Items</h4>
                  <div className="space-y-2">
                    {pr.unresolvedHoldItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-purple-400/60">{item.unresolvedState}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Approval Evidence Required */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Approval Evidence Required</h4>
                <div className="space-y-2">
                  {pr.approvalEvidenceRequiredItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.evidenceRequired}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Release Misunderstanding Prevention */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Release Misunderstanding Prevention</h4>
                <div className="space-y-2">
                  {pr.releaseMisunderstandingPreventionItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <p className={`text-xs font-semibold ${toneColor(item.tone)}`}>{item.label}</p>
                      <p className="mt-1 text-xs text-red-300/70">
                        <span className="font-medium text-red-400">오해: </span>
                        {item.misunderstanding}
                      </p>
                      <p className="mt-0.5 text-xs text-purple-300/70">
                        <span className="font-medium text-purple-400">올바른 해석: </span>
                        {item.correctInterpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Review Gate */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">Next Review Gate</h4>
                <div className="space-y-2">
                  {pr.nextReviewGateItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-purple-400/60">담당: {item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {pr.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-purple-900/30 bg-purple-950/15 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                <div>
                  <h5 className="text-sm font-medium text-purple-200">Release Preconditions Review — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-purple-300/80">{pr.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 79: Final Hold Release Boundary ──────────────────────────────── */}
      {(() => {
        const rb = job.tokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView;
        if (!rb) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-purple-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-purple-900/30 bg-purple-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-purple-800/40 bg-purple-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-purple-400" />
              <h2 className="text-base font-semibold text-purple-200">{rb.title}</h2>
              <span className="ml-1 rounded-full border border-purple-700/50 bg-purple-900/30 px-2 py-0.5 text-xs font-medium text-purple-300">
                {rb.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-purple-300/80">{rb.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-purple-400/70">
              <span>{rb.taskRangeLabel}</span>
              <span>기준: {rb.previousPreconditionsLabel} ({rb.previousPreconditionsCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Boundary Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">Boundary Summary</h4>
                <div className="space-y-2">
                  {rb.boundarySummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <ShieldAlert className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.boundaryState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Release Is Not Granted */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Release Is Not Granted</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {rb.releaseIsNotGrantedItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Ban className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.notGrantedReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preconditions Review Is Not Approval */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Preconditions Review Is Not Approval</h4>
                <div className="space-y-2">
                  {rb.preconditionReviewNotApprovalItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <p className={`text-xs font-semibold ${toneColor(item.tone)}`}>{item.label}</p>
                      <p className="mt-1 text-xs text-purple-300/70">{item.description}</p>
                      <p className="mt-1 text-xs text-purple-300/70">
                        <span className="font-medium text-purple-400">올바른 해석: </span>
                        {item.correctInterpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blocked Release Path */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Blocked Release Path</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {rb.blockedReleasePathItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Lock className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.blockedState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Before Actual Release */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Required Before Actual Release</h4>
                <div className="space-y-2">
                  {rb.requiredBeforeActualReleaseItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.requiredEvidence}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Human Gate */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">Next Human Gate</h4>
                <div className="space-y-2">
                  {rb.nextHumanGateItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-purple-400/60">담당: {item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {rb.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-purple-900/30 bg-purple-950/15 p-4">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                <div>
                  <h5 className="text-sm font-medium text-purple-200">Release Boundary — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-purple-300/80">{rb.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 80: Final Hold Non-Release Seal ─────────────────────────────── */}
      {(() => {
        const ns = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView;
        if (!ns) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-purple-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-purple-900/30 bg-purple-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-purple-800/40 bg-purple-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-400" />
              <h2 className="text-base font-semibold text-purple-200">{ns.title}</h2>
              <span className="ml-1 rounded-full border border-purple-700/50 bg-purple-900/30 px-2 py-0.5 text-xs font-medium text-purple-300">
                {ns.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-purple-300/80">{ns.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-purple-400/70">
              <span>{ns.taskRangeLabel}</span>
              <span>기준: {ns.previousBoundaryLabel} ({ns.previousBoundaryCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Seal Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">Seal Summary</h4>
                <div className="space-y-2">
                  {ns.sealSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <ShieldCheck className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.sealState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Release Seal */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Non-Release Seal</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ns.nonReleaseSealItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Lock className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.sealedState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Release Still Blocked */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Release Still Blocked</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {ns.releaseStillBlockedItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Ban className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.blockedReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boundary Aftermath */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Boundary Aftermath</h4>
                <div className="space-y-2">
                  {ns.boundaryAftermathItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <p className={`text-xs font-semibold ${toneColor(item.tone)}`}>{item.label}</p>
                      <p className="mt-1 text-xs text-purple-300/70">{item.description}</p>
                      <p className="mt-1 text-xs text-purple-300/70">
                        <span className="font-medium text-purple-400">현재 의미: </span>
                        {item.currentMeaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Before Release */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Required Before Release</h4>
                <div className="space-y-2">
                  {ns.requiredBeforeReleaseItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.requiredEvidence}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Safe Review */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">Next Safe Review</h4>
                <div className="space-y-2">
                  {ns.nextSafeReviewItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-purple-400/60">담당: {item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {ns.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-purple-900/30 bg-purple-950/15 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                <div>
                  <h5 className="text-sm font-medium text-purple-200">Non-Release Seal — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-purple-300/80">{ns.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 81: Final Hold Non-Release Handoff Checklist ───────────────── */}
      {(() => {
        const hc = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView;
        if (!hc) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-purple-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-purple-900/30 bg-purple-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-purple-800/40 bg-purple-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-purple-400" />
              <h2 className="text-base font-semibold text-purple-200">{hc.title}</h2>
              <span className="ml-1 rounded-full border border-purple-700/50 bg-purple-900/30 px-2 py-0.5 text-xs font-medium text-purple-300">
                {hc.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-purple-300/80">{hc.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-purple-400/70">
              <span>{hc.taskRangeLabel}</span>
              <span>기준: {hc.previousSealLabel} ({hc.previousSealCommit})</span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                  인수인계 체크리스트 (Handoff Checklist)
                </h4>
                <div className="space-y-2">
                  {hc.handoffChecklistItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <ListChecks className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.requiredCheck}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  보류 미해제 상태 (Non-Release State)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {hc.nonReleaseStateItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Lock className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.currentState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                  검토자 확인 사항 (Reviewer Confirmation)
                </h4>
                <div className="space-y-2">
                  {hc.reviewerConfirmationItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.reviewerMustConfirm}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  보류 해제 미허용 (Release Not Allowed)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {hc.releaseNotAllowedItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Ban className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.notAllowedReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                  인수인계 오해 방지 (Misunderstanding Prevention)
                </h4>
                <div className="space-y-2">
                  {hc.handoffMisunderstandingPreventionItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <p className={`text-xs font-semibold ${toneColor(item.tone)}`}>{item.label}</p>
                      <p className="mt-1 text-xs text-red-300/70">
                        <span className="font-medium text-red-400">오해: </span>
                        {item.misunderstanding}
                      </p>
                      <p className="mt-0.5 text-xs text-purple-300/70">
                        <span className="font-medium text-purple-400">올바른 해석: </span>
                        {item.correctInterpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                  다음 사람 검토 (Next Human Review)
                </h4>
                <div className="space-y-2">
                  {hc.nextHumanReviewItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-purple-400/60">담당: {item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  계속 금지 (Still Forbidden)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {hc.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-md border border-purple-900/30 bg-purple-950/15 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                <div>
                  <h5 className="text-sm font-medium text-purple-200">인수인계 체크리스트 — 최종 안내</h5>
                  <p className="mt-1 text-xs leading-relaxed text-purple-300/80">{hc.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 82: Final Hold Non-Release Handoff Boundary ────────────────── */}
      {(() => {
        const hb = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffBoundaryView;
        if (!hb) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-purple-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-purple-900/30 bg-purple-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-red-800/40 bg-red-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              <h2 className="text-base font-semibold text-red-200">{hb.title}</h2>
              <span className="ml-1 rounded-full border border-red-700/50 bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-300">
                {hb.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-red-200/80">{hb.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-red-300/70">
              <span>{hb.taskRangeLabel}</span>
              <span>기준: {hb.previousChecklistLabel} ({hb.previousChecklistCommit})</span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                  경계 요약 (Boundary Summary)
                </h4>
                <div className="space-y-2">
                  {hb.boundarySummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <ShieldAlert className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.boundaryState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  인수인계는 보류 해제가 아님 (Handoff Is Not Release)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {hb.handoffIsNotReleaseItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Ban className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.notReleaseReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                  체크리스트 검토는 승인이 아님 (Checklist Review Is Not Approval)
                </h4>
                <div className="space-y-2">
                  {hb.checklistReviewNotApprovalItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <p className={`text-xs font-semibold ${toneColor(item.tone)}`}>{item.label}</p>
                      <p className="mt-1 text-xs text-purple-300/70">{item.description}</p>
                      <p className="mt-1 text-xs text-purple-300/70">
                        <span className="font-medium text-purple-400">올바른 해석: </span>
                        {item.correctInterpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  전환 차단 (Blocked Transition)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {hb.blockedTransitionItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Lock className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.blockedState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                  실제 해제 전 필수 조건 (Required Before Release)
                </h4>
                <div className="space-y-2">
                  {hb.requiredBeforeReleaseItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <FileCheck className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.requiredEvidence}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                  다음 사람 검토 관문 (Next Human Review Gate)
                </h4>
                <div className="space-y-2">
                  {hb.nextHumanReviewGateItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-purple-400/60">담당: {item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  계속 금지 (Still Forbidden)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {hb.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-md border border-red-900/40 bg-red-950/20 p-4">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <div>
                  <h5 className="text-sm font-medium text-red-200">인수인계 경계 — 최종 안내 (Final Notice)</h5>
                  <p className="mt-1 text-xs leading-relaxed text-red-200/80">{hb.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 83: Final Hold Non-Release Handoff Non-Release Seal ──────────── */}
      {(() => {
        const hs =
          job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffNonReleaseSealView;
        if (!hs) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-purple-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-purple-900/30 bg-purple-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-red-800/40 bg-red-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              <h2 className="text-base font-semibold text-red-200">{hs.title}</h2>
              <span className="ml-1 rounded-full border border-red-700/50 bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-300">
                {hs.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-red-200/80">{hs.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-red-300/70">
              <span>{hs.taskRangeLabel}</span>
              <span>
                기준: {hs.previousBoundaryLabel} ({hs.previousBoundaryCommit})
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                  봉인 요약 (Seal Summary)
                </h4>
                <div className="space-y-2">
                  {hs.sealSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <ShieldAlert className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.sealState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  인수인계 이후 보류 미해제 봉인 (Handoff Non-Release Seal)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {hs.handoffNonReleaseSealItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Ban className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.sealedState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                  경계 확인 이후 의미 (Boundary Confirmation Aftermath)
                </h4>
                <div className="space-y-2">
                  {hs.boundaryConfirmationAftermathItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <p className={`text-xs font-semibold ${toneColor(item.tone)}`}>{item.label}</p>
                      <p className="mt-1 text-xs text-purple-300/70">{item.description}</p>
                      <p className="mt-1 text-xs text-purple-300/70">
                        <span className="font-medium text-purple-400">현재 의미: </span>
                        {item.currentMeaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  아직 부여되지 않음 (Release Still Not Granted)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {hs.releaseStillNotGrantedItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Lock className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.notGrantedReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                  실제 해제 전 필요 항목 (Required Before Any Release)
                </h4>
                <div className="space-y-2">
                  {hs.requiredBeforeAnyReleaseItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <FileCheck className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs text-purple-300/70">
                            <span className="font-medium text-purple-400">필요 근거: </span>
                            {item.requiredEvidence}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                  다음 안전 검토 (Next Safe Human Review)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {hs.nextSafeHumanReviewItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Users className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-purple-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-purple-400/60">{item.nextOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                  계속 금지됨 (Still Forbidden)
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {hs.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-md border border-purple-900/30 bg-purple-950/15 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                <div>
                  <h5 className="text-sm font-medium text-purple-200">보류 미해제 봉인 — 최종 안내</h5>
                  <p className="mt-1 text-xs leading-relaxed text-purple-300/80">{hs.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 84: Final Hold Non-Release Handoff Final Review Summary ──────── */}
      {(() => {
        const fr = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView;
        if (!fr) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-emerald-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-emerald-900/30 bg-emerald-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-emerald-800/40 bg-emerald-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-emerald-200">{fr.title}</h2>
              <span className="ml-1 rounded-full border border-emerald-700/50 bg-emerald-900/30 px-2 py-0.5 text-xs font-medium text-emerald-300">
                {fr.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-emerald-300/80">{fr.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-emerald-400/70">
              <span>{fr.taskRangeLabel}</span>
              <span>기준: {fr.previousSealLabel} ({fr.previousSealCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Final Review Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">Final Review Summary</h4>
                <div className="space-y-2">
                  {fr.finalReviewSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-emerald-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-emerald-400/60">{item.reviewState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Release Handoff Summary + Reviewer Final Check (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Non-Release Handoff Summary</h4>
                  <div className="space-y-2">
                    {fr.nonReleaseHandoffSummaryItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-emerald-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-emerald-400/60">{item.currentState}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">Reviewer Final Check</h4>
                  <div className="space-y-2">
                    {fr.reviewerFinalCheckItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-emerald-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-emerald-400/60">{item.reviewerMustConfirm}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Not Release Approval */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Not Release Approval</h4>
                <div className="space-y-2">
                  {fr.notReleaseApprovalItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-emerald-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-emerald-400/60">{item.notApprovalReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remaining Hold + Next Safe Handoff (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Remaining Hold</h4>
                  <div className="space-y-2">
                    {fr.remainingHoldItems.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                        <p className="text-xs font-medium text-red-300">{item.label}</p>
                        <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                        <p className="mt-1 text-xs font-mono text-red-400/60">{item.holdState}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">Next Safe Handoff</h4>
                  <div className="space-y-2">
                    {fr.nextSafeHandoffItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-emerald-300/70">{item.description}</p>
                            <p className="mt-1 text-xs text-emerald-400/60">담당: {item.nextOwner}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {fr.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-emerald-900/30 bg-emerald-950/15 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <h5 className="text-sm font-medium text-emerald-200">Final Hold Non-Release Handoff Final Review Summary — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-300/80">{fr.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 85: Final Hold Non-Release Handoff Closure Gate ──────────────── */}
      {(() => {
        const cg = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView;
        if (!cg) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-fuchsia-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-fuchsia-900/30 bg-fuchsia-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-fuchsia-800/40 bg-fuchsia-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-fuchsia-400" />
              <h2 className="text-base font-semibold text-fuchsia-200">{cg.title}</h2>
              <span className="ml-1 rounded-full border border-fuchsia-700/50 bg-fuchsia-900/30 px-2 py-0.5 text-xs font-medium text-fuchsia-300">
                {cg.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-fuchsia-300/80">{cg.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-fuchsia-400/70">
              <span>{cg.taskRangeLabel}</span>
              <span>기준: {cg.previousSummaryLabel} ({cg.previousSummaryCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Closure Gate Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-400">Closure Gate Summary</h4>
                <div className="space-y-2">
                  {cg.closureGateSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-fuchsia-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-fuchsia-400/60">{item.gateState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handoff Closure + Not Release Completion (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Handoff Closure</h4>
                  <div className="space-y-2">
                    {cg.handoffClosureItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-fuchsia-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-fuchsia-400/60">{item.closureState}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Not Release Completion</h4>
                  <div className="space-y-2">
                    {cg.notReleaseCompletionItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-fuchsia-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-fuchsia-400/60">{item.notCompletionReason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remaining Blocked Path */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Remaining Blocked Path</h4>
                <div className="space-y-2">
                  {cg.remainingBlockedPathItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                      <p className="mt-1 text-xs font-mono text-red-400/60">{item.blockedState}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Before Future Transition + Next Safe Review (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Required Before Future Transition</h4>
                  <div className="space-y-2">
                    {cg.requiredBeforeFutureTransitionItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-fuchsia-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-fuchsia-400/60">{item.requiredEvidence}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-400">Next Safe Review</h4>
                  <div className="space-y-2">
                    {cg.nextSafeReviewItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-fuchsia-300/70">{item.description}</p>
                            <p className="mt-1 text-xs text-fuchsia-400/60">담당: {item.nextOwner}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {cg.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-fuchsia-900/30 bg-fuchsia-950/15 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-400" />
                <div>
                  <h5 className="text-sm font-medium text-fuchsia-200">Final Hold Non-Release Handoff Closure Gate — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-fuchsia-300/80">{cg.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 86: Final Hold Non-Release Handoff Closure Non-Release Seal ─────── */}
      {(() => {
        const ns = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureNonReleaseSealView;
        if (!ns) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-lime-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-lime-900/30 bg-lime-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-lime-800/40 bg-lime-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-lime-400" />
              <h2 className="text-base font-semibold text-lime-200">{ns.title}</h2>
              <span className="ml-1 rounded-full border border-lime-700/50 bg-lime-900/30 px-2 py-0.5 text-xs font-medium text-lime-300">
                {ns.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-lime-300/80">{ns.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-lime-400/70">
              <span>{ns.taskRangeLabel}</span>
              <span>기준: {ns.previousClosureGateLabel} ({ns.previousClosureGateCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Seal Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-lime-400">Seal Summary</h4>
                <div className="space-y-2">
                  {ns.sealSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-lime-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-lime-400/60">{item.sealState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closure Non-Release Seal + Closure Gate Aftermath (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Closure Non-Release Seal</h4>
                  <div className="space-y-2">
                    {ns.closureNonReleaseSealItems.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                          <div>
                            <p className="text-xs font-medium text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-red-400/60">{item.sealedState}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Closure Gate Aftermath</h4>
                  <div className="space-y-2">
                    {ns.closureGateAftermathItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-lime-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-lime-400/60">{item.currentMeaning}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Release Still Not Completed */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Release Still Not Completed</h4>
                <div className="space-y-2">
                  {ns.releaseStillNotCompletedItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                      <p className="mt-1 text-xs font-mono text-red-400/60">{item.notCompletedReason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Before Any Future Transition + Next Safe Review (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Required Before Any Future Transition</h4>
                  <div className="space-y-2">
                    {ns.requiredBeforeAnyFutureTransitionItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-lime-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-lime-400/60">{item.requiredEvidence}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-lime-400">Next Safe Review</h4>
                  <div className="space-y-2">
                    {ns.nextSafeReviewItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-lime-300/70">{item.description}</p>
                            <p className="mt-1 text-xs text-lime-400/60">담당: {item.nextOwner}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {ns.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-lime-900/30 bg-lime-950/15 p-4">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" />
                <div>
                  <h5 className="text-sm font-medium text-lime-200">Final Hold Non-Release Handoff Closure Non-Release Seal — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-lime-300/80">{ns.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 87: Final Hold Non-Release Handoff Closure Final Status Summary ── */}
      {(() => {
        const fs = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView;
        if (!fs) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-green-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-green-900/30 bg-green-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-green-800/40 bg-green-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-400" />
              <h2 className="text-base font-semibold text-green-200">{fs.title}</h2>
              <span className="ml-1 rounded-full border border-green-700/50 bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-300">
                {fs.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-green-300/80">{fs.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-green-400/70">
              <span>{fs.taskRangeLabel}</span>
              <span>기준: {fs.previousSealLabel} ({fs.previousSealCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Final Status Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-400">Final Status Summary</h4>
                <div className="space-y-2">
                  {fs.finalStatusSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-green-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-green-400/60">{item.statusState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closure Review State + Non-Release State (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Closure Review State</h4>
                  <div className="space-y-2">
                    {fs.closureReviewStateItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-green-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-green-400/60">{item.currentMeaning}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Non-Release State</h4>
                  <div className="space-y-2">
                    {fs.nonReleaseStateItems.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                        <p className="text-xs font-medium text-red-300">{item.label}</p>
                        <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                        <p className="mt-1 text-xs font-mono text-red-400/60">{item.nonReleaseState}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Not Transition Ready */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Not Transition Ready</h4>
                <div className="space-y-2">
                  {fs.notTransitionReadyItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-green-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-green-400/60">{item.notReadyReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Before Next Transition + Next Safe Review (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Required Before Next Transition</h4>
                  <div className="space-y-2">
                    {fs.requiredBeforeNextTransitionItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-green-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-green-400/60">{item.requiredEvidence}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-400">Next Safe Review</h4>
                  <div className="space-y-2">
                    {fs.nextSafeReviewItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-green-300/70">{item.description}</p>
                            <p className="mt-1 text-xs text-green-400/60">담당: {item.nextOwner}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {fs.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-green-900/30 bg-green-950/15 p-4">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <div>
                  <h5 className="text-sm font-medium text-green-200">Final Hold Non-Release Handoff Closure Final Status Summary — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-green-300/80">{fs.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 88: Final Hold Non-Release Handoff Closure Final Status Boundary ── */}
      {(() => {
        const fb = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView;
        if (!fb) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-rose-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-rose-900/30 bg-rose-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-rose-800/40 bg-rose-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-rose-400" />
              <h2 className="text-base font-semibold text-rose-200">{fb.title}</h2>
              <span className="ml-1 rounded-full border border-rose-700/50 bg-rose-900/30 px-2 py-0.5 text-xs font-medium text-rose-300">
                {fb.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-rose-300/80">{fb.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-rose-400/70">
              <span>{fb.taskRangeLabel}</span>
              <span>기준: {fb.previousSummaryLabel} ({fb.previousSummaryCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Boundary Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">Boundary Summary</h4>
                <div className="space-y-2">
                  {fb.boundarySummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-rose-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-rose-400/60">{item.boundaryState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Status Is Not Release + Summary Review Is Not Approval (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Final Status Is Not Release</h4>
                  <div className="space-y-2">
                    {fb.finalStatusIsNotReleaseItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-rose-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-rose-400/60">{item.notReleaseReason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Summary Review Is Not Approval</h4>
                  <div className="space-y-2">
                    {fb.summaryReviewNotApprovalItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-rose-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-rose-400/60">{item.correctInterpretation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blocked Transition */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Blocked Transition</h4>
                <div className="space-y-2">
                  {fb.blockedTransitionItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                      <p className="mt-1 text-xs font-mono text-red-400/60">{item.blockedState}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Before Release + Next Safe Review (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Required Before Release</h4>
                  <div className="space-y-2">
                    {fb.requiredBeforeReleaseItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-rose-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-rose-400/60">{item.requiredEvidence}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">Next Safe Review</h4>
                  <div className="space-y-2">
                    {fb.nextSafeReviewItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-rose-300/70">{item.description}</p>
                            <p className="mt-1 text-xs text-rose-400/60">담당: {item.nextOwner}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {fb.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-rose-900/30 bg-rose-950/15 p-4">
                <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <h5 className="text-sm font-medium text-rose-200">Final Hold Non-Release Handoff Closure Final Status Boundary — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-rose-300/80">{fb.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Task 89: Final Hold Non-Release Handoff Closure Final Status Non-Release Seal ── */}
      {(() => {
        const nrs = job.tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusNonReleaseSealView;
        if (!nrs) return null;

        const toneColor = (tone: string) => {
          if (tone === 'blocked') return 'text-red-400';
          if (tone === 'warning') return 'text-yellow-400';
          return 'text-violet-300';
        };
        const toneBg = (tone: string) => {
          if (tone === 'blocked') return 'border-red-900/30 bg-red-950/15';
          if (tone === 'warning') return 'border-yellow-900/30 bg-yellow-950/15';
          return 'border-violet-900/30 bg-violet-950/15';
        };

        return (
          <div className="mb-6 rounded-lg border border-violet-800/40 bg-violet-950/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-violet-400" />
              <h2 className="text-base font-semibold text-violet-200">{nrs.title}</h2>
              <span className="ml-1 rounded-full border border-violet-700/50 bg-violet-900/30 px-2 py-0.5 text-xs font-medium text-violet-300">
                {nrs.statusLabel}
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-violet-300/80">{nrs.summary}</p>

            <div className="mb-3 flex flex-wrap gap-4 text-xs text-violet-400/70">
              <span>{nrs.taskRangeLabel}</span>
              <span>기준: {nrs.previousBoundaryLabel} ({nrs.previousBoundaryCommit})</span>
            </div>

            <div className="space-y-4">
              {/* Seal Summary */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-400">Seal Summary</h4>
                <div className="space-y-2">
                  {nrs.sealSummaryItems.map((item, idx) => (
                    <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                        <div>
                          <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                          <p className="mt-0.5 text-xs text-violet-300/70">{item.description}</p>
                          <p className="mt-1 text-xs font-mono text-violet-400/60">{item.sealState}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Status Non-Release Seal + Boundary Aftermath (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Final Status Non-Release Seal</h4>
                  <div className="space-y-2">
                    {nrs.finalStatusNonReleaseSealItems.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                          <div>
                            <p className="text-xs font-medium text-red-300">{item.label}</p>
                            <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-red-400/60">{item.sealedState}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Boundary Aftermath</h4>
                  <div className="space-y-2">
                    {nrs.boundaryAftermathItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-violet-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-violet-400/60">{item.currentMeaning}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Release Still Not Granted + Transition Still Blocked (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Release Still Not Granted</h4>
                  <div className="space-y-2">
                    {nrs.releaseStillNotGrantedItems.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                        <p className="text-xs font-medium text-red-300">{item.label}</p>
                        <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                        <p className="mt-1 text-xs font-mono text-red-400/60">{item.notGrantedReason}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Transition Still Blocked</h4>
                  <div className="space-y-2">
                    {nrs.transitionStillBlockedItems.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-3">
                        <p className="text-xs font-medium text-red-300">{item.label}</p>
                        <p className="mt-0.5 text-xs text-red-300/70">{item.description}</p>
                        <p className="mt-1 text-xs font-mono text-red-400/60">{item.blockedState}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Required Before Any Future Transition + Next Safe Review (2-column) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">Required Before Any Future Transition</h4>
                  <div className="space-y-2">
                    {nrs.requiredBeforeAnyFutureTransitionItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-violet-300/70">{item.description}</p>
                            <p className="mt-1 text-xs font-mono text-violet-400/60">{item.requiredEvidence}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-400">Next Safe Review</h4>
                  <div className="space-y-2">
                    {nrs.nextSafeReviewItems.map((item, idx) => (
                      <div key={idx} className={`rounded-md border p-3 ${toneBg(item.tone)}`}>
                        <div className="flex items-start gap-2">
                          <Circle className={`mt-0.5 h-4 w-4 shrink-0 ${toneColor(item.tone)}`} />
                          <div>
                            <p className={`text-xs font-medium ${toneColor(item.tone)}`}>{item.label}</p>
                            <p className="mt-0.5 text-xs text-violet-300/70">{item.description}</p>
                            <p className="mt-1 text-xs text-violet-400/60">담당: {item.nextOwner}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Still Forbidden */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Still Forbidden</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {nrs.stillForbiddenItems.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-red-900/30 bg-red-950/15 p-2">
                      <p className="text-xs font-medium text-red-300">{item.label}</p>
                      <p className="mt-0.5 text-xs text-red-300/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Notice */}
              <div className="flex items-start gap-3 rounded-md border border-violet-900/30 bg-violet-950/15 p-4">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
                <div>
                  <h5 className="text-sm font-medium text-violet-200">Final Hold Non-Release Handoff Closure Final Status Non-Release Seal — Final Notice</h5>
                  <p className="mt-1 text-xs leading-relaxed text-violet-300/80">{nrs.finalNotice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── BatchJob 실행 결과 ────────────────────────────────────────────────── */}
      {['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'EXECUTING'].includes(job.status) && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <CheckCircle2 className={`h-5 w-5 ${job.status === 'FAILED' ? 'text-red-400' : job.status === 'PARTIAL_SUCCESS' ? 'text-orange-400' : 'text-emerald-400'}`} />
            BatchJob 실행 결과
            <span className={`ml-1 rounded-full border px-2 py-0.5 text-xs ${getStatusBadgeStyle(job.status)}`}>
              {job.status}
            </span>
          </h2>

          {/* 실행 감사 정보 (Audit Trail) */}
          {(() => {
            const execMode = job.executionMetadata?.executionMode ?? null;
            const naverApiCalled = execMode === 'live';
            return (
              <div className="mb-4 rounded-md border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-200">
                <p className="mb-2 font-semibold text-blue-300">실행 감사 정보 (Audit Trail)</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                  <div>
                    <span className="text-blue-400">BatchJob ID: </span>
                    <span className="font-mono text-blue-100">{job.id.substring(0, 12)}…</span>
                  </div>
                  {job.executionMetadata?.finalApprovalId && (
                    <div>
                      <span className="text-blue-400">FinalApproval ID: </span>
                      <span className="font-mono text-blue-100">
                        {job.executionMetadata.finalApprovalId.substring(0, 12)}…
                      </span>
                    </div>
                  )}
                  {job.executionMetadata?.actorId && (
                    <div>
                      <span className="text-blue-400">Actor ID: </span>
                      <span className="font-mono text-blue-100">{job.executionMetadata.actorId}</span>
                    </div>
                  )}
                  {execMode && (
                    <div>
                      <span className="text-blue-400">실행 모드 (adapterMode): </span>
                      <span className="font-mono text-blue-100">{execMode}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-blue-400">Naver API 호출: </span>
                    <span className={`font-semibold ${naverApiCalled ? 'text-red-300' : 'text-emerald-300'}`}>
                      {naverApiCalled ? '예 (실제 호출)' : '아니오 (차단됨)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-400">스마트스토어 변경: </span>
                    <span className={`font-semibold ${naverApiCalled ? 'text-red-300' : 'text-emerald-300'}`}>
                      {naverApiCalled ? '예 (실제 변경)' : '아니오'}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-400">전체 항목 (totalItems): </span>
                    <span className="text-blue-100">{job.itemCount}건</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 기본 실행 정보 */}
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="mb-1 text-xs text-gray-500">실행 완료 시각 (executedAt)</p>
              <p className="text-sm text-gray-200">
                {job.executedAt ? new Date(job.executedAt).toLocaleString() : '-'}
              </p>
            </div>
            {job.executionMetadata?.startedAt && (
              <div>
                <p className="mb-1 text-xs text-gray-500">실행 시작 (startedAt)</p>
                <p className="text-sm text-gray-300">{new Date(job.executionMetadata.startedAt).toLocaleString()}</p>
              </div>
            )}
            {job.executionMetadata?.endedAt && (
              <div>
                <p className="mb-1 text-xs text-gray-500">실행 종료 (finishedAt)</p>
                <p className="text-sm text-gray-300">{new Date(job.executionMetadata.endedAt).toLocaleString()}</p>
              </div>
            )}
            {job.executionMetadata?.durationMs !== undefined && (
              <div>
                <p className="mb-1 text-xs text-gray-500">처리 시간</p>
                <p className="text-sm text-gray-300">{job.executionMetadata.durationMs}ms</p>
              </div>
            )}
          </div>

          {/* 성공/실패/스킵 카운트 */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-emerald-400">{job.successItems}</p>
              <p className="text-xs text-gray-400">성공</p>
            </div>
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-red-400">{job.failedItems}</p>
              <p className="text-xs text-gray-400">실패</p>
            </div>
            <div className="rounded-md border border-gray-500/20 bg-gray-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-gray-400">{job.skippedItems}</p>
              <p className="text-xs text-gray-400">스킵</p>
            </div>
          </div>

          {/* 항목별 상태 분포 */}
          {job.items.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">항목별 상태 분포</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  job.items.reduce<Record<string, number>>((acc, item) => {
                    acc[item.status] = (acc[item.status] ?? 0) + 1;
                    return acc;
                  }, {})
                ).map(([st, count]) => (
                  <span key={st} className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(st)}`}>
                    {st}: {count}건
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 실행 메타데이터 (recordedAt 중심) */}
          {job.executionMetadata && (
            <div className="mb-4 rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-2 text-xs font-semibold text-gray-400">실행 메타데이터 (결과 기록)</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                {job.executionMetadata.recordedAt && (
                  <div>
                    <span className="text-gray-500">기록 시각 (recordedAt): </span>
                    <span className="text-gray-300">{new Date(job.executionMetadata.recordedAt).toLocaleString()}</span>
                  </div>
                )}
                {job.executionMetadata.resultSummary && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">결과 집계 (resultSummary): </span>
                    <span className="text-gray-300">
                      성공 {job.executionMetadata.resultSummary.successCount} /
                      실패 {job.executionMetadata.resultSummary.failedCount} /
                      스킵 {job.executionMetadata.resultSummary.skippedCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 재실행 차단 요약 (실행 결과 섹션 하단) */}
          <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">
            <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              재실행 차단 — 이미 실행 기록이 있는 BatchJob입니다
            </p>
            <p>안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다. Mock 실행 결과라도 재실행은 기본 차단입니다.</p>
            <p className="mt-1 font-mono text-red-300">
              서버 차단 코드: BATCH_JOB_ALREADY_EXECUTED / BATCH_JOB_ALREADY_EXECUTING
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">항목 목록 ({job.items.length}건)</h2>
        {job.items.map((item, index) => (
          <div key={item.id} className="overflow-hidden rounded-lg border border-[#262629] bg-[#121214]">
            <div className="border-b border-[#262629] bg-[#18181b] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500">#{index + 1}</span>
                  <span className="rounded border border-indigo-500/30 bg-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                    {item.targetType}
                  </span>
                  <span className="text-sm font-mono text-gray-300">{item.targetId}</span>
                  <span className={`rounded border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(item.status)}`}>
                    {item.status}
                  </span>
                  {item.calculationType && (
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-300">
                      {item.calculationType}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                >
                  <FileJson className="h-3.5 w-3.5" />
                  {expandedItems.has(item.id) ? 'JSON 닫기' : 'JSON 보기'}
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-4 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="border-b border-[#262629] pb-1 text-sm font-semibold text-gray-300">상품 정보 (Candidate)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">상품명</span>
                  <span className="col-span-2 text-gray-200">{item.candidateSummary?.productName || '-'}</span>
                  <span className="text-gray-500">매칭 키워드</span>
                  <span className="col-span-2 font-semibold text-indigo-300">{item.candidateSummary?.keyword || '-'}</span>
                  <span className="text-gray-500">SKU/식별자</span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.sku || '-'}</span>
                  <span className="text-gray-500">바코드</span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.barcode || '-'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="border-b border-[#262629] pb-1 text-sm font-semibold text-gray-300">변경 예정 (Dry-run)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">변경 항목</span>
                  <span className="col-span-2 font-semibold text-emerald-400">{item.candidateSummary?.changeType || '-'}</span>
                  <span className="text-gray-500">가격 변경</span>
                  <span className="col-span-2 text-gray-200">
                    <span className="text-gray-500 line-through">{item.dryRunSummary?.before?.price?.toLocaleString() || '-'}</span>
                    {' -> '}
                    <span className="font-semibold text-white">{item.dryRunSummary?.after?.price?.toLocaleString() || '-'}</span>
                  </span>
                  <span className="text-gray-500">재고 변경</span>
                  <span className="col-span-2 text-gray-200">
                    <span className="text-gray-500 line-through">{item.dryRunSummary?.before?.stock?.toLocaleString() || '-'}</span>
                    {' -> '}
                    <span className="font-semibold text-white">{item.dryRunSummary?.after?.stock?.toLocaleString() || '-'}</span>
                  </span>
                </div>
              </div>
            </div>

            {((item.dryRunSummary?.warnings?.length ?? 0) > 0
              || item.dryRunSummary?.riskLevel
              || (item.dryRunSummary?.blockedReasons?.length ?? 0) > 0) && (
              <div className="px-4 pb-4">
                <div className="rounded-md bg-[#1e1e24] p-3 text-sm">
                  <div className="flex gap-2">
                    <span className="font-semibold text-amber-400">Risk Level: {item.dryRunSummary?.riskLevel || 'NONE'}</span>
                  </div>
                  {item.dryRunSummary?.warnings?.map((warning) => (
                    <div key={warning} className="mt-1 text-xs text-amber-200/80">• {warning}</div>
                  ))}
                  {item.dryRunSummary?.blockedReasons?.map((blockedReason) => (
                    <div key={blockedReason} className="mt-1 text-xs text-red-400">• BLOCKED: {blockedReason}</div>
                  ))}
                </div>
              </div>
            )}

            {expandedItems.has(item.id) && (
              <div className="overflow-x-auto border-t border-[#262629] bg-black/50 p-4">
                <p className="mb-2 text-xs text-gray-500">requestPayload (Raw JSON)</p>
                <pre className="font-mono text-[10px] text-green-400 sm:text-xs">
                  {JSON.stringify(item.requestPayload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {isFinalApprovalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-lg rounded-xl border border-[#262629] bg-[#121214] p-6 shadow-2xl">
            <button
              onClick={() => setIsFinalApprovalModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-4 text-xl font-semibold text-white">최종 승인 Artifact 생성 전 확인</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                이 단계는 안전한 승인을 위해 다음 제약 사항을 준수합니다.
              </p>
              <ul className="list-inside list-disc space-y-1 text-red-300">
                <li>이 작업은 네이버 API를 호출하지 않습니다.</li>
                <li>이 작업은 EXECUTING으로 전환하지 않습니다.</li>
                <li>이 작업은 Job/Item status를 변경하지 않습니다.</li>
                <li>이 작업은 FinalApproval artifact만 생성하는 단계입니다.</li>
                <li>기존 ACTIVE artifact가 있으면 생성할 수 없습니다.</li>
                <li>validationExpiresAt 이후에는 실행 자격으로 사용하면 안 됩니다.</li>
              </ul>
              <p className="mt-4 text-indigo-300">
                서버에서 <span className="font-mono">candidate</span>, <span className="font-mono">dryRunItem</span>, 수집 문맥, gate 설정을 다시 검증합니다.
              </p>

              {finalApprovalCreateError && (
                <div className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                  <span className="font-semibold text-red-300">오류 발생: </span>
                  {finalApprovalCreateError}
                </div>
              )}
            </div>
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#262629] pt-4">
              <button
                type="button"
                onClick={() => setIsFinalApprovalModalOpen(false)}
                disabled={isCreatingFinalApproval}
                className="rounded-md px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-[#262629] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => void handleCreateFinalApproval()}
                disabled={!canCreateFinalApproval || isCreatingFinalApproval}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  !canCreateFinalApproval || isCreatingFinalApproval
                    ? 'bg-slate-700 text-slate-300 opacity-70 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                {isCreatingFinalApproval ? (
                  <>
                    <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  '최종 승인 Artifact 생성'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
