'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileJson,
  Loader2,
  ShieldAlert,
  X,
  Info,
  Lock,
  AlertCircle,
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

// Token Test Approval Audit ê¸°ë¡ ?€??
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
  CHANNEL_ID_UNAVAILABLE: 'ì±„ë„ ID ?•ë³´ ?†ìŒ',
  UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW: '?…ë¡œ??Preview ê¸°ì? ?„ì¬ê°??¬ìš©',
  CURRENT_CONTEXT_STALE: '?„ì¬ ë¬¸ë§¥???¤ë˜?˜ì—ˆ?????ˆìŒ',
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
  if (!job) return ['Batch ?•ë³´ë¥??„ì§ ë¶ˆëŸ¬?¤ì? ëª»í–ˆ?µë‹ˆ??'];

  const blockers: string[] = [];

  if (job.status !== 'DRAFT') {
    blockers.push(`?„ì¬ Job ?íƒœê°€ DRAFTê°€ ?„ë‹™?ˆë‹¤. (${job.status})`);
  }

  if (job.itemCount <= 0 || job.items.length === 0) {
    blockers.push('?¹ì¸??item???†ìŠµ?ˆë‹¤.');
  }

  for (const item of job.items) {
    if (item.status !== 'DRAFT') {
      blockers.push(`Item ${item.id} ?íƒœê°€ DRAFTê°€ ?„ë‹™?ˆë‹¤. (${item.status})`);
    }

    if (!item.targetType || !ALLOWED_TARGET_TYPES.has(item.targetType)) {
      blockers.push(`Item ${item.id}??targetType??? íš¨?˜ì? ?ŠìŠµ?ˆë‹¤.`);
    }

    if (!item.targetId) {
      blockers.push(`Item ${item.id}??targetIdê°€ ë¹„ì–´ ?ˆìŠµ?ˆë‹¤.`);
    }

    if (!item.dryRunSummary) {
      blockers.push(`Item ${item.id}??dry-run ?”ì•½???†ìŠµ?ˆë‹¤.`);
    } else {
      if ((item.dryRunSummary.blockedReasons?.length ?? 0) > 0) {
        blockers.push(`Item ${item.id}??dry-run ì°¨ë‹¨ ?¬ìœ ê°€ ?¨ì•„ ?ˆìŠµ?ˆë‹¤.`);
      }

      if (item.dryRunSummary.riskLevel === 'HIGH') {
        blockers.push(`Item ${item.id}???„í—˜?„ê? HIGH?…ë‹ˆ??`);
      }

      const before = item.dryRunSummary.before;
      const after = item.dryRunSummary.after;
      const hasPrice = before?.price !== null && before?.price !== undefined
        && after?.price !== null && after?.price !== undefined;
      const hasStock = before?.stock !== null && before?.stock !== undefined
        && after?.stock !== null && after?.stock !== undefined;
      if (!hasPrice && !hasStock) {
        blockers.push(`Item ${item.id}??before/after ë¹„êµê°’ì´ ë¶€ì¡±í•©?ˆë‹¤.`);
      }
    }

    const requestPayload = asRecord(item.requestPayload);
    const candidate = asRecord(requestPayload?.candidate);
    if (!candidate) {
      blockers.push(`Item ${item.id}??requestPayload.candidateê°€ ?†ìŠµ?ˆë‹¤.`);
      continue;
    }

    if (asString(candidate.status) === 'NEEDS_CONTEXT') {
      blockers.push(`Item ${item.id}ê°€ NEEDS_CONTEXT ?íƒœ?…ë‹ˆ??`);
    }

    const riskTypes = asStringArray(candidate.riskTypes);
    if (riskTypes.includes('CURRENT_PRICE_UNAVAILABLE')) {
      blockers.push(`Item ${item.id}??CURRENT_PRICE_UNAVAILABLE???¨ì•„ ?ˆìŠµ?ˆë‹¤.`);
    }
    if (riskTypes.includes('CURRENT_STOCK_UNAVAILABLE')) {
      blockers.push(`Item ${item.id}??CURRENT_STOCK_UNAVAILABLE???¨ì•„ ?ˆìŠµ?ˆë‹¤.`);
    }

    const reviewMessage = asString(candidate.reviewMessage) ?? '';
    if (reviewMessage.includes('ë§¤ì¹­: optionValue')) {
      blockers.push(`Item ${item.id}??optionValue fallback ë§¤ì¹­ ?„ë³´?…ë‹ˆ??`);
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
        throw new Error(data.ok ? 'Batch ?ì„¸ ì¡°íšŒ???¤íŒ¨?ˆìŠµ?ˆë‹¤.' : data.error || 'Batch ?ì„¸ ì¡°íšŒ???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
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
          throw new Error(data.ok ? 'Batch ?ì„¸ ì¡°íšŒ???¤íŒ¨?ˆìŠµ?ˆë‹¤.' : data.error || 'Batch ?ì„¸ ì¡°íšŒ???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
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
          throw new Error('error' in data && data.error ? data.error : 'FinalApproval ì¡°íšŒ???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
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
          !data.ok && data.error ? data.error : '?¹ì¸ ê¸°ë¡ ?€?¥ì— ?¤íŒ¨?ˆìŠµ?ˆë‹¤.'
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

  // Token Test Approval Audit ?„ìˆ˜ ??ª© ëª©ë¡
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
      '???‘ì—…?€ token ë°œê¸‰ ?ŒìŠ¤??ê¸°ë¡ë§Œì„ ëª©ì ?¼ë¡œ ?©ë‹ˆ?? ?¤ì œ token ë°œê¸‰?€ ???¨ê³„?ì„œ ?¤í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.',
    CONFIRM_NO_PRODUCT_UPDATE:
      '???‘ì—…?€ ?í’ˆ ?˜ì • API?€ ?°ê²°?˜ì? ?ŠìŠµ?ˆë‹¤. ?¤ë§ˆ?¸ìŠ¤? ì–´ ?í’ˆ/ê°€ê²??¤ì›Œ?œëŠ” ë³€ê²½ë˜ì§€ ?ŠìŠµ?ˆë‹¤.',
    CONFIRM_NO_ENDPOINT_CALL_IN_THIS_STEP:
      '???¨ê³„?ì„œ Naver API endpoint ?¸ì¶œ??ë°œìƒ?˜ì? ?ŠìŠµ?ˆë‹¤.',
    CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP:
      '???¨ê³„?ì„œ access token ?ëŠ” refresh token??ë°œê¸‰?˜ì? ?ŠìŠµ?ˆë‹¤.',
    CONFIRM_TOKEN_WILL_NOT_BE_STORED:
      'ë°œê¸‰??token?€ ?€?¥ë˜ì§€ ?ŠìŠµ?ˆë‹¤. (???¨ê³„?ì„œ??token??ë°œê¸‰?˜ì? ?Šìœ¼ë¯€ë¡??€?¥ë„ ?†ìŠµ?ˆë‹¤.)',
    CONFIRM_TOKEN_WILL_NOT_BE_DISPLAYED:
      'access token, refresh token, client secret?€ UI/ë¡œê·¸???œì‹œ?˜ì? ?ŠìŠµ?ˆë‹¤.',
    CONFIRM_NO_AUTHORIZATION_HEADER_CREATED:
      'Authorization headerê°€ ?ì„±?˜ì? ?ŠìŠµ?ˆë‹¤.',
    CONFIRM_NO_QUEUE_OR_WORKER:
      'Queue enqueue ?ëŠ” Worker ?¸ì¶œ???†ìŠµ?ˆë‹¤.',
    CONFIRM_NO_AUTOMATIC_RETRY:
      '?¤íŒ¨ ???ë™ ?¬ì‹œ?„ê? ?†ìŠµ?ˆë‹¤.',
    CONFIRM_SUCCESS_DOES_NOT_ENABLE_LIVE_EXECUTION:
      '???¹ì¸ ê¸°ë¡ ?€???±ê³µ??Live ?¤í–‰???œì„±?”í•˜ì§€ ?ŠìŠµ?ˆë‹¤.',
    CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST:
      '?¤ì œ token ë°œê¸‰ ?ŒìŠ¤?¸ë? ?¤í–‰?˜ë ¤ë©?ë³„ë„??ì¶”ê? ?¬ìš©???¹ì¸???„ìš”?©ë‹ˆ??',
    CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_PRODUCT_UPDATE:
      '?í’ˆ ?˜ì • API ?¸ì¶œ???„í•´?œëŠ” ë³„ë„??ì¶”ê? ?¬ìš©???¹ì¸???„ìš”?©ë‹ˆ??',
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
      setTokenTestApprovalSaveError('ACTIVE ?íƒœ??Final Approval???†ìŠµ?ˆë‹¤.');
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
          !data.ok && data.error ? data.error : '?¹ì¸ ê¸°ë¡ ?€?¥ì— ?¤íŒ¨?ˆìŠµ?ˆë‹¤.'
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
    finalApprovalBlockingReasons.push("Batch ?•ë³´ë¥?ë¶ˆëŸ¬?¤ëŠ” ì¤‘ì…?ˆë‹¤.");
  } else if (TERMINAL_JOB_STATUSES_UI.includes(job.status)) {
    finalApprovalBlockingReasons.push(
      `?´ë? ?¤í–‰ ê¸°ë¡???ˆëŠ” BatchJob?…ë‹ˆ??(?íƒœ: ${job.status}). ?ˆì „???„í•´ ?¬ì‹¤?‰ì? ë³„ë„ ?¹ì¸ ?ë¦„?ì„œë§?ê°€?¥í•©?ˆë‹¤.`
    );
  } else if (job.status === 'EXECUTING') {
    finalApprovalBlockingReasons.push("BatchJob???„ì¬ ?¤í–‰ ì¤‘ì…?ˆë‹¤. ?™ì‹œ ?¤í–‰?€ ?ˆìš©?˜ì? ?ŠìŠµ?ˆë‹¤.");
  } else if (job.status !== 'APPROVED') {
    finalApprovalBlockingReasons.push("Batch ?íƒœê°€ APPROVEDê°€ ?„ë‹™?ˆë‹¤.");
  }
  const allItemsReady = job?.items.every(item => item.status === 'READY') ?? false;
  const isTerminalJobStatus = job ? TERMINAL_JOB_STATUSES_UI.includes(job.status) || job.status === 'EXECUTING' : false;
  if (job && !allItemsReady && !isTerminalJobStatus) {
    finalApprovalBlockingReasons.push("READYê°€ ?„ë‹Œ Item???ˆìŠµ?ˆë‹¤.");
  }
  if (finalApprovalsLoading) {
    finalApprovalBlockingReasons.push("FinalApproval ì¡°íšŒ ì¤‘ì…?ˆë‹¤.");
  }
  if (finalApprovalsError) {
    finalApprovalBlockingReasons.push("FinalApproval ì¡°íšŒ???¤íŒ¨?ˆìŠµ?ˆë‹¤.");
  }
  const activeFinalApproval = finalApprovals?.find(a => a.status === 'ACTIVE');
  if (activeFinalApproval) {
    finalApprovalBlockingReasons.push("?´ë? ACTIVE ìµœì¢… ?¹ì¸ Artifactê°€ ?ˆìŠµ?ˆë‹¤.");
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
        throw new Error('error' in data ? data.error || '?¹ì¸ ì²˜ë¦¬???¤íŒ¨?ˆìŠµ?ˆë‹¤.' : '?¹ì¸ ì²˜ë¦¬???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
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
        throw new Error(`ìµœì¢… ?¹ì¸ ?ì„±???¤íŒ¨?ˆìŠµ?ˆë‹¤. (${response.status})`);
      }

      setFinalApprovalCreateSuccess(
        'FinalApproval artifactê°€ ?ì„±?˜ì—ˆ?µë‹ˆ?? ???‘ì—…?€ ?¤ì´ë²?API ?¸ì¶œ?´ë‚˜ ?¤í–‰ ?„í™˜???˜í–‰?˜ì? ?Šì•˜?µë‹ˆ??'
      );
      setIsFinalApprovalModalOpen(false);

      // ?±ê³µ ??ìµœì¢… ?¹ì¸ ëª©ë¡ ?¬ì¡°??
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
        <span>Batch ?ì„¸ë¥?ë¶ˆëŸ¬?¤ëŠ” ì¤‘ì…?ˆë‹¤...</span>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="p-6">
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>{error || 'Batchë¥?ì°¾ì„ ???†ìŠµ?ˆë‹¤.'}</div>
        </div>
        <Link
          href="/dashboard/sku-keyword-draft-batches"
          className="mt-4 inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> ëª©ë¡?¼ë¡œ ?Œì•„ê°€ê¸?
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
          <ArrowLeft className="mr-1 h-4 w-4" /> DRAFT Batch ëª©ë¡
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white">Batch ?ì„¸ ê²€??/h1>
        {job.status === 'DRAFT' ? (
          <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            ???”ë©´?ì„œ??DRAFT Batchë¥?APPROVED ?íƒœë¡œë§Œ ?„í™˜?????ˆìŠµ?ˆë‹¤. ?¤ì´ë²?API ?¸ì¶œ?´ë‚˜ ?¤ë§ˆ?¸ìŠ¤? ì–´ ê°€ê²??¬ê³  ë³€ê²½ì? ?˜í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.
          </div>
        ) : job.status === 'APPROVED' ? (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            ??Batch??APPROVED ?íƒœ?…ë‹ˆ?? ê°?item?€ READY ?íƒœë¡??¹ì¸?˜ì—ˆ?µë‹ˆ?? ?„ì§ ?¤ì´ë²?API ?¸ì¶œ?´ë‚˜ ?¤ë§ˆ?¸ìŠ¤? ì–´ ê°€ê²??¬ê³  ë³€ê²½ì? ?˜í–‰?˜ì? ?Šì•˜?µë‹ˆ?? ?¤ì œ ?¤í–‰ ê¸°ëŠ¥?€ ë³„ë„ ?¨ê³„?ì„œë§?êµ¬í˜„?©ë‹ˆ??
          </div>
        ) : job.status === 'EXECUTED' ? (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            ??Batch??<strong className="text-white">EXECUTED</strong> ?íƒœ?…ë‹ˆ?? Worker ?¤í–‰???„ë£Œ?ìŠµ?ˆë‹¤. ?¤ì œ Naver API???¸ì¶œ?˜ì? ?Šì•˜?µë‹ˆ??
          </div>
        ) : job.status === 'PARTIAL_SUCCESS' ? (
          <div className="mt-2 rounded-md border border-orange-500/20 bg-orange-500/10 p-3 text-sm text-orange-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            ??Batch??<strong className="text-white">PARTIAL_SUCCESS</strong> ?íƒœ?…ë‹ˆ?? ?¼ë? ??ª©ë§??±ê³µ?ˆìŠµ?ˆë‹¤. ?˜ë‹¨ ?¤í–‰ ê²°ê³¼ë¥??•ì¸?˜ì„¸??
          </div>
        ) : job.status === 'FAILED' ? (
          <div className="mt-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            ??Batch??<strong className="text-white">FAILED</strong> ?íƒœ?…ë‹ˆ?? ?˜ë‹¨ ?¤í–‰ ê²°ê³¼ë¥??•ì¸?˜ì„¸??
          </div>
        ) : job.status === 'EXECUTING' ? (
          <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
            <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />
            ??Batch??<strong className="text-white">EXECUTING</strong> ?íƒœ?…ë‹ˆ?? Workerê°€ ?¤í–‰ ì¤‘ì…?ˆë‹¤.
          </div>
        ) : (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            ??Batch???´ë? {job.status} ?íƒœ?…ë‹ˆ?? ???”ë©´?ì„œ???¤í–‰ ë²„íŠ¼?´ë‚˜ ?¤ì´ë²?ë°˜ì˜ ë²„íŠ¼???œê³µ?˜ì? ?ŠìŠµ?ˆë‹¤.
          </div>
        )}
      </div>

      <div className="mb-6 grid gap-4 rounded-lg border border-[#262629] bg-[#121214] p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mb-1 text-xs text-gray-500">Batch ID</p>
          <p className="font-mono text-sm text-gray-300">{job.id}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">?íƒœ</p>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(job.status)}`}>
            {job.status}
          </span>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">??ª© ??/p>
          <p className="text-sm font-semibold text-white">{job.itemCount}ê±?/p>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">?ì„±?¼ì‹œ</p>
          <p className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {job.status === 'DRAFT' && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
            <div className="space-y-3">
              <div>
                <h2 className="text-base font-semibold text-white">?¹ì¸ ?ì—­</h2>
                <p className="mt-1 text-sm text-gray-300">
                  ???‘ì—…?€ Batchë¥?<strong className="text-white">APPROVED</strong> ?íƒœë¡œë§Œ ë³€ê²½í•©?ˆë‹¤.
                  ê°?item?€ <strong className="text-white">READY</strong> ?íƒœë¡??„í™˜?©ë‹ˆ??
                  ?¤ì´ë²?API ?¸ì¶œ?´ë‚˜ ?¤ë§ˆ?¸ìŠ¤? ì–´ ê°€ê²??¬ê³  ë³€ê²½ì? ?˜í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.
                  ?¤ì œ ?¤í–‰?€ ë³„ë„ ?¨ê³„?ì„œë§?ê°€?¥í•©?ˆë‹¤.
                </p>
              </div>

              {visibleWarnings.length > 0 && (
                <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                  <p className="font-semibold text-amber-300">?¹ì¸ ???•ì¸??ê²½ê³ </p>
                  <ul className="mt-2 space-y-1">
                    {visibleWarnings.map((warningCode) => (
                      <li key={warningCode}>- {formatWarningCode(warningCode)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasVisibleHardBlockers && (
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                  <p className="font-semibold text-red-300">?”ë©´?ì„œ ?•ì¸???¹ì¸ ì°¨ë‹¨ ?¬ìœ </p>
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
                <span>???‘ì—…?€ ?¹ì¸ ?íƒœ ?„í™˜ë§??˜í–‰?˜ë©°, ?¤ì´ë²?API ?¸ì¶œ???†ìŒ???•ì¸?ˆìŠµ?ˆë‹¤.</span>
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
                      APPROVED ?íƒœë¡??¹ì¸ ì¤?..
                    </>
                  ) : (
                    'ê²€???„ë£Œ ???¹ì¸'
                  )}
                </button>
                <span className="text-xs text-gray-400">
                  ?¹ì¸ ??DRAFT ?„ìš© ëª©ë¡?ì„œ????Batchê°€ ë³´ì´ì§€ ?Šì„ ???ˆìŠµ?ˆë‹¤.
                </span>
              </div>

              {approveError && (
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                  {approveError}
                </div>
              )}

              {approveResult?.ok && (
                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                  <p className="font-semibold text-emerald-300">?¹ì¸ ?„ë£Œ</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <p>jobId: <span className="font-mono">{approveResult.jobId}</span></p>
                    <p>previousJobStatus: {approveResult.previousJobStatus}</p>
                    <p>nextJobStatus: {approveResult.nextJobStatus}</p>
                    <p>nextItemStatus: {approveResult.nextItemStatus}</p>
                    <p>itemCount: {approveResult.itemCount}</p>
                    <p>?¤ì´ë²?API ?¸ì¶œ ?†ìŒ</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FinalApproval ?”ì•½ ?œì‹œ ?ì—­ */}
      <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
          <FileJson className="h-5 w-5 text-indigo-400" />
          ìµœì¢… ?¹ì¸ Artifact
        </h2>

        <div className="mb-4 rounded-md border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-200">
          <p className="mb-1 font-semibold text-blue-300">?¤í–‰ ëª¨ë“œ ?ˆë‚´</p>
          <ul className="space-y-0.5">
            <li>?„ì¬ ?¤í–‰?€ Mock ëª¨ë“œ?…ë‹ˆ??</li>
            <li>?¤ì œ Naver API???¸ì¶œ?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
            <li>ê°€ê²??¬ê³ /?í’ˆ ?•ë³´???¤ì œë¡?ë³€ê²½ë˜ì§€ ?ŠìŠµ?ˆë‹¤.</li>
          </ul>
        </div>

        {/* ?¬ì‹¤??ì°¨ë‹¨ ?ˆë‚´ */}
        {job && TERMINAL_JOB_STATUSES_UI.includes(job.status) && (
          <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
            <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              ?¬ì‹¤??ì°¨ë‹¨??
            </p>
            <p className="text-xs text-red-200">
              ??BatchJob?€ ?´ë? ?¤í–‰ ê¸°ë¡???ˆìŠµ?ˆë‹¤. ?ˆì „???„í•´ ?¬ì‹¤?‰ì? ë³„ë„ ?¹ì¸ ?ë¦„?ì„œë§?ê°€?¥í•©?ˆë‹¤.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-red-300">
              <div>
                <span className="text-red-400">?¤í–‰ ?íƒœ: </span>
                <span className={`rounded-full border px-1.5 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(job.status)}`}>
                  {job.status}
                </span>
              </div>
              {job.executedAt && (
                <div>
                  <span className="text-red-400">?¤í–‰ ?„ë£Œ ?œê°: </span>
                  <span>{new Date(job.executedAt).toLocaleString()}</span>
                </div>
              )}
              {job.executionMetadata?.actorId && (
                <div className="col-span-2">
                  <span className="text-red-400">?¤í–‰ Actor: </span>
                  <span className="font-mono">{job.executionMetadata.actorId}</span>
                </div>
              )}
              {job.executionMetadata?.executionMode && (
                <div>
                  <span className="text-red-400">?¤í–‰ ëª¨ë“œ: </span>
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
              ?¤í–‰ ì¤????™ì‹œ ?¤í–‰ ì°¨ë‹¨??
            </p>
            <p className="mt-1 text-xs">
              ?„ì¬ Workerê°€ ??BatchJob???¤í–‰ ì¤‘ì…?ˆë‹¤. ?„ë£Œ ??ê²°ê³¼ë¥??•ì¸?˜ì„¸??
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
            <span>ìµœì¢… ?¹ì¸ ?´ë ¥ ì¡°íšŒ ì¤?..</span>
          </div>
        ) : finalApprovalsError ? (
          <div className="text-sm text-red-400">
            ì¡°íšŒ ?ëŸ¬: {finalApprovalsError}
          </div>
        ) : !finalApprovals || finalApprovals.length === 0 ? (
          <div className="space-y-4">
            <div className="text-sm text-gray-400">ìµœì¢… ?¹ì¸ Artifactê°€ ?„ì§ ?†ìŠµ?ˆë‹¤.</div>
            <div className="rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-sm text-indigo-200">
              <p className="font-semibold text-indigo-300">ìµœì¢… ?¹ì¸ ?ì„± ì¤€ë¹??íƒœ</p>

              {finalApprovalBlockingReasons.length > 0 ? (
                <div className="mt-2 text-red-300">
                  <p className="mb-1 text-xs">ë²„íŠ¼??ë¹„í™œ?±í™”???¬ìœ :</p>
                  <ul className="list-inside list-disc text-sm">
                    {finalApprovalBlockingReasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2 text-sm text-emerald-300">
                  ëª¨ë“  ì¡°ê±´??ì¶©ì¡±?˜ì—ˆ?µë‹ˆ?? ?„ë˜ ë²„íŠ¼???ŒëŸ¬ ?¹ì¸ ?•ì¸ ?¨ê³„ë¥?ì§„í–‰?????ˆìŠµ?ˆë‹¤.
                  <br />
                  <span className="text-xs text-gray-400">
                    (?œë²„?ì„œ candidate, dryRunItem, ?˜ì§‘ ë¬¸ë§¥ ?±ì„ ?¤ì‹œ ê²€ì¦í•©?ˆë‹¤.)
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
                  {canCreateFinalApproval ? 'ìµœì¢… ?¹ì¸ Artifact ?ì„± ì¤€ë¹? : 'ìµœì¢… ?¹ì¸ Artifact ?ì„± ë¶ˆê?'}
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
                  <p className="mb-1 text-xs text-gray-500">?íƒœ</p>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${targetApproval.status === 'ACTIVE' ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300' : 'border-slate-500/30 bg-slate-500/20 text-slate-300'}`}>
                    {targetApproval.status}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">ìµœì¢… ?¹ì¸ ?œê°</p>
                  <p className="text-sm text-gray-200">{new Date(targetApproval.finalApprovedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">ê²€ì¦?ë§Œë£Œ ?œê°</p>
                  <p className="text-sm text-gray-200">{new Date(targetApproval.validationExpiresAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">ë§Œë£Œ ?¬ë?</p>
                  <span className={`text-sm font-semibold ${isExpired ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isExpired ? 'ë§Œë£Œ?? : '? íš¨'}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">?¹ì¸??/p>
                  <p className="text-sm text-gray-200">{targetApproval.finalApprovedBy}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">?€??item ??/p>
                  <p className="text-sm text-gray-200">{targetApproval.itemCount}ê°?/p>
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <p className="mb-1 text-xs text-gray-500">?´ì‹œ ê²€ì¦?(?”ì•½)</p>
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
                    <p className="font-semibold text-amber-300">ìµœì¢… ?¹ì¸ ?ì„± ì¤€ë¹??íƒœ</p>

                    {finalApprovalBlockingReasons.length > 0 ? (
                      <div className="mt-2 text-red-300">
                        <p className="mb-1 text-xs">ë²„íŠ¼??ë¹„í™œ?±í™”???¬ìœ :</p>
                        <ul className="list-inside list-disc text-sm">
                          {finalApprovalBlockingReasons.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-emerald-300">
                        ëª¨ë“  ì¡°ê±´??ì¶©ì¡±?˜ì—ˆ?µë‹ˆ?? ?„ë˜ ë²„íŠ¼???ŒëŸ¬ ?¹ì¸ ?•ì¸ ?¨ê³„ë¥?ì§„í–‰?????ˆìŠµ?ˆë‹¤.
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
                        {canCreateFinalApproval ? 'ìµœì¢… ?¹ì¸ Artifact ?ì„± ì¤€ë¹? : 'ìµœì¢… ?¹ì¸ Artifact ?ì„± ë¶ˆê?'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* ?€?€ Live ?¨ì¼ ?ŒìŠ¤?????ê????€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {job.livePreflight && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            Live ?¨ì¼ ?ŒìŠ¤?????ê???
          </h2>

          <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-200">
            <p>
              ?„ì¬ ?”ë©´?€ ?¤ì œ Naver API ?¸ì¶œ ???ê??©ì…?ˆë‹¤.
              ???¨ê³„?ì„œ???í’ˆ ?•ë³´ê°€ ë³€ê²½ë˜ì§€ ?Šìœ¼ë©? Live ?¸ì¶œ?€ Safety Gate???˜í•´ ì°¨ë‹¨?©ë‹ˆ??
            </p>
          </div>

          {/* ?ê? ?”ì•½ */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">?ê? ?íƒœ</p>
              <p className={`text-xs font-semibold ${job.livePreflight.ready ? 'text-emerald-400' : 'text-red-400'}`}>
                {job.livePreflight.ready ? '?ê? ì¡°ê±´ ì¶©ì¡±' : '?ê? ë¯¸ì™„ë£?}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Naver API ?¸ì¶œ</p>
              <p className={`text-xs font-semibold ${job.livePreflight.naverApiCalled ? 'text-red-400' : 'text-emerald-400'}`}>
                {job.livePreflight.naverApiCalled ? '?¸ì¶œ??(?•ì¸ ?„ìš”)' : '?„ì§ ?¸ì¶œ?˜ì? ?ŠìŒ'}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Live ?¤í–‰ ê°€???¬ë?</p>
              <p className="text-xs font-semibold text-red-400">?„ì¬??ì°¨ë‹¨??/p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">?ê? ?„í™©</p>
              <p className="text-xs">
                <span className={job.livePreflight.summary.blockingCount > 0 ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                  ì°¨ë‹¨ {job.livePreflight.summary.blockingCount}ê±?
                </span>
                {' Â· '}
                <span className={job.livePreflight.summary.warningCount > 0 ? 'text-amber-400' : 'text-gray-400'}>
                  ?•ì¸ {job.livePreflight.summary.warningCount}ê±?
                </span>
                {' Â· '}
                <span className="text-emerald-400">?µê³¼ {job.livePreflight.summary.passCount}ê±?/span>
              </p>
            </div>
          </div>

          {/* ì°¨ë‹¨ ?¬ìœ  */}
          {job.livePreflight.blockingReasons.length > 0 && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
              <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                ì°¨ë‹¨ ?¬ìœ  ({job.livePreflight.blockingReasons.length}ê±?
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

          {/* ??ª©ë³??ê? ê²°ê³¼ */}
          <div className="mb-4 space-y-1.5">
            <p className="mb-2 text-xs font-semibold text-gray-400">??ª©ë³??ê? ê²°ê³¼</p>
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

          {/* ?¤ìŒ ?¨ê³„ ?ˆë‚´ */}
          <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3 text-xs text-gray-400">
            <p className="mb-1 font-semibold text-gray-300">?¤ìŒ ?¨ê³„ ?ˆë‚´</p>
            <p>
              Live ?¨ì¼ ?ŒìŠ¤?¸ëŠ” ë³„ë„ ?¹ì¸ ?ë¦„ê³??¨ì¼ ?ŒìŠ¤???í’ˆ 1ê±??œí•œ ì¡°ê±´??ì¤€ë¹„ëœ
              ?´í›„?ë§Œ ì§„í–‰?????ˆìŠµ?ˆë‹¤.
            </p>
          </div>
        </div>
      )}

      {/* ?€?€ Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ì¤€ë¹??€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {job.liveSingleTestApproval && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShieldAlert className="h-5 w-5 text-indigo-400" />
            Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ì¤€ë¹?
          </h2>

          {/* ?ˆë‚´ ë¬¸êµ¬ */}
          <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200">
            <p className="mb-1 font-semibold text-indigo-300">?¹ì¸ ì¤€ë¹??¨ê³„ ?ˆë‚´</p>
            <ul className="space-y-0.5">
              <li>???¨ê³„???¤ì œ Naver API ?¸ì¶œ ???¹ì¸ ì¤€ë¹??¨ê³„?…ë‹ˆ??</li>
              <li>?„ì¬ ?¹ì¸?´ë„ ?¤ì œ ?¤ì´ë²??í’ˆ?€ ë³€ê²½ë˜ì§€ ?ŠìŠµ?ˆë‹¤.</li>
              <li>Live ?¤í–‰?€ ë³„ë„ ?¹ì¸ê³?ì¶”ê? Safety Gateê°€ ì¤€ë¹„ëœ ?´í›„?ë§Œ ì§„í–‰?©ë‹ˆ??</li>
              <li>?´ì˜ DB / ?´ì˜ Redis / ?¤ì œ Naver API ?¸ì¶œ?€ ?„ì§ ë¹„í™œ?±í™”?˜ì–´ ?ˆìŠµ?ˆë‹¤.</li>
            </ul>
          </div>

          {/* ?¹ì¸ ì¤€ë¹??íƒœ ?”ì•½ ì¹´ë“œ */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">?¹ì¸ ì¤€ë¹??íƒœ</p>
              <p className={`text-xs font-semibold ${job.liveSingleTestApproval.approvalReady ? 'text-emerald-400' : 'text-amber-400'}`}>
                {job.liveSingleTestApproval.approvalReady ? 'ì¤€ë¹??„ë£Œ' : 'ì¤€ë¹?ë¯¸ì™„ë£?}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Naver API ?¸ì¶œ</p>
              <p className="text-xs font-semibold text-red-400">ë¹„í™œ?±í™” (??ƒ ì°¨ë‹¨)</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Live ?¤í–‰ ê°€???¬ë?</p>
              <p className="text-xs font-semibold text-red-400">ë¹„í™œ?±í™” (??ƒ ì°¨ë‹¨)</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">?ê? ?„í™©</p>
              <p className="text-xs">
                <span className={job.liveSingleTestApproval.summary.blockingCount > 0 ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                  ì°¨ë‹¨ {job.liveSingleTestApproval.summary.blockingCount}ê±?
                </span>
                {' Â· '}
                <span className="text-emerald-400">?µê³¼ {job.liveSingleTestApproval.summary.passCount}ê±?/span>
              </p>
            </div>
          </div>

          {/* ?€???•ë³´ ì¹´ë“œ */}
          {job.liveSingleTestApproval.targetProductSummary && (
            <div className="mb-4 rounded-md border border-[#262629] bg-[#18181b] p-3 text-xs">
              <p className="mb-2 font-semibold text-gray-300">?€??item ?•ë³´</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                {job.liveSingleTestApproval.targetProductSummary.productName && (
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-gray-500">?í’ˆëª? </span>
                    <span className="text-gray-200">{job.liveSingleTestApproval.targetProductSummary.productName}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.channelProductNo && (
                  <div>
                    <span className="text-gray-500">ì±„ë„ ?í’ˆë²ˆí˜¸: </span>
                    <span className="font-mono text-gray-300">{job.liveSingleTestApproval.targetProductSummary.channelProductNo}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.targetType && (
                  <div>
                    <span className="text-gray-500">?€??? í˜•: </span>
                    <span className="text-gray-300">{job.liveSingleTestApproval.targetProductSummary.targetType}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.changeType && (
                  <div>
                    <span className="text-gray-500">ë³€ê²?? í˜•: </span>
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
                    <span className="text-gray-500">ê°€ê²?ë³€ê²??ˆì •: </span>
                    <span className="text-gray-400 line-through">
                      {String(job.liveSingleTestApproval.targetProductSummary.priceChange.before ?? '-')}
                    </span>
                    {' ??'}
                    <span className="font-semibold text-white">
                      {String(job.liveSingleTestApproval.targetProductSummary.priceChange.after ?? '-')}
                    </span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.stockChange && (
                  <div>
                    <span className="text-gray-500">?¬ê³  ë³€ê²??ˆì •: </span>
                    <span className="text-gray-400 line-through">
                      {String(job.liveSingleTestApproval.targetProductSummary.stockChange.before ?? '-')}
                    </span>
                    {' ??'}
                    <span className="font-semibold text-white">
                      {String(job.liveSingleTestApproval.targetProductSummary.stockChange.after ?? '-')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ì°¨ë‹¨ ?¬ìœ  */}
          {job.liveSingleTestApproval.blockingReasons.length > 0 && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
              <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                ì°¨ë‹¨ ?¬ìœ  ({job.liveSingleTestApproval.blockingReasons.length}ê±?
              </p>
              <ul className="space-y-1">
                {job.liveSingleTestApproval.blockingReasons.map((reason, idx) => (
                  <li key={idx} className="text-red-200">- {reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ??ª©ë³??ê? ê²°ê³¼ */}
          <div className="mb-4 space-y-1.5">
            <p className="mb-2 text-xs font-semibold text-gray-400">??ª©ë³??ê? ê²°ê³¼</p>
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

          {/* ?„ìˆ˜ ?•ì¸ ë¬¸êµ¬ (requiredAcknowledgements) */}
          {job.liveSingleTestApproval.requiredAcknowledgements.length > 0 && (
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
              <p className="mb-2 font-semibold text-amber-300">
                ?„ìˆ˜ ?•ì¸ ??ª© ({job.liveSingleTestApproval.requiredAcknowledgements.length}ê±????¤ì œ Live ?ŒìŠ¤???¨ê³„ ???•ì¸ ?„ìš”)
              </p>
              <ul className="space-y-1.5 text-amber-100">
                {job.liveSingleTestApproval.requiredAcknowledgements.map(ack => (
                  <li key={ack} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] text-amber-400">[?•ì¸ ?„ìš”]</span>
                    <span>
                      {ack === 'CONFIRM_SINGLE_ITEM_ONLY' && '?¤ì œ Live ?ŒìŠ¤?¸ëŠ” ?¨ì¼ ?í’ˆ 1ê±´ìœ¼ë¡œë§Œ ?œí•œ?©ë‹ˆ??'}
                      {ack === 'CONFIRM_TARGET_PRODUCT_REVIEWED' && '?€???í’ˆë²ˆí˜¸, ?¤ë§ˆ?¸ìŠ¤? ì–´, ë³€ê²??ˆì • payloadë¥?ì§ì ‘ ?•ì¸?´ì•¼ ?©ë‹ˆ??'}
                      {ack === 'CONFIRM_PAYLOAD_REVIEWED' && '?¤ì œ ë³€ê²½ë  ê°€ê²??¬ê³ /?¤ì›Œ??ê°’ì„ ì§ì ‘ ê²€? í–ˆ?µë‹ˆ??'}
                      {ack === 'CONFIRM_NAVER_API_STILL_DISABLED' && '?´ì˜ DB / ?´ì˜ Redis / ?¤ì œ Naver API ?¸ì¶œ?€ ?„ì§ ë¹„í™œ?±í™”?˜ì–´ ?ˆìŠµ?ˆë‹¤.'}
                      {ack === 'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER' && '?¤ì œ Live ?ŒìŠ¤???¨ê³„?ì„œ???¤ì´ë²??¤ë§ˆ?¸ìŠ¤? ì–´ ?í’ˆ ?•ë³´ê°€ ë³€ê²½ë  ???ˆìŠµ?ˆë‹¤.'}
                      {ack === 'CONFIRM_NO_REPLAY_ALLOWED' && 'Live ?¤í–‰?€ ë³„ë„ ?¹ì¸ê³?ì¶”ê? Safety Gateê°€ ì¤€ë¹„ëœ ?´í›„?ë§Œ ì§„í–‰?©ë‹ˆ??'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Live ?¤í–‰ ë¹„í™œ?±í™” ë°°ì? */}
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
              Live ?¤í–‰ ë¹„í™œ?±í™”??
            </div>
            <div className="inline-flex items-center rounded-md border border-gray-500/30 bg-gray-500/10 px-3 py-1.5 text-xs text-gray-400">
              ?¹ì¸ ì¤€ë¹„ë§Œ ê°€?????¤ì œ Naver API ?¸ì¶œ ë¶ˆê?
            </div>
          </div>

          {/* ?¤ìŒ ?¨ê³„ ?ˆë‚´ */}
          <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3 text-xs text-gray-400">
            <p className="mb-1 font-semibold text-gray-300">?¤ìŒ ?¨ê³„ ?ˆë‚´</p>
            <p>
              ?„ì¬ ?¨ê³„?ì„œ???¤ì œ Live ?¤í–‰??ë¶ˆê??¥í•©?ˆë‹¤. ?¤ìŒ ?¨ê³„?ì„œ ë³„ë„ ?¹ì¸ ?ë¦„ê³?
              ?¨ì¼ ?ŒìŠ¤???¤í–‰ ?œí•œ???¤ì‹œ ?•ì¸????Live Adapter êµ¬í˜„ ?¬ë?ë¥?ê²°ì •?˜ì„¸??
            </p>
          </div>
        </div>
      )}

      {/* ?€?€ Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ê¸°ë¡ ?€???€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ê¸°ë¡ ?€??
            </h2>

            {/* ?ˆë‚´ ë¬¸êµ¬ */}
            <div className="mb-4 rounded-md border border-violet-500/20 bg-violet-500/10 p-3 text-xs text-violet-200">
              <p className="mb-1 font-semibold text-violet-300">?¹ì¸ ê¸°ë¡ ?€???ˆë‚´</p>
              <ul className="space-y-0.5">
                <li>??ë²„íŠ¼?€ ?¤ì œ Naver APIë¥??¸ì¶œ?˜ì? ?ŠìŠµ?ˆë‹¤. ?¹ì¸ ê¸°ë¡ë§??€?¥í•©?ˆë‹¤.</li>
                <li>?¹ì¸ ê¸°ë¡???€?¥í•´???¤ì œ Live ?¤í–‰?€ ê³„ì† ë¶ˆê??¥í•©?ˆë‹¤.</li>
                <li>?€?¥ëœ ?¹ì¸ ê¸°ë¡?€ ê°ì‚¬ ì¶”ì (audit trail)?©ìœ¼ë¡œë§Œ ?¬ìš©?©ë‹ˆ??</li>
                <li>ëª¨ë“  ?„ìˆ˜ ?•ì¸ ??ª©??ì²´í¬ ???€??ë²„íŠ¼???´ë¦­?˜ì„¸??</li>
              </ul>
            </div>

            {/* ?´ë? ?€?¥ëœ audit record ?œì‹œ */}
            {(existingAudit || liveAuditSaveResult) && (
              <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  ?¹ì¸ ê¸°ë¡ ?€???„ë£Œ
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
                        <span className="text-gray-500">?¹ì¸ ì½”ë“œ: </span>
                        <span className="font-mono text-xs text-emerald-300">{audit.auditCode}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">ê¸°ë¡ ?œê°: </span>
                        <span>{new Date(audit.recordedAt).toLocaleString()}</span>
                      </div>
                      {audit.actorId && (
                        <div>
                          <span className="text-gray-500">?¹ì¸?? </span>
                          <span className="font-mono">{audit.actorId}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">?•ì¸ ??ª©: </span>
                        <span>{audit.acknowledgedItems.length}ê±??„ë£Œ</span>
                      </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                          Naver API ?¸ì¶œ ë¹„í™œ?±í™”??
                        </span>
                        <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                          Live ?¤í–‰ ë¹„í™œ?±í™”??
                        </span>
                        <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                          ?¹ì¸ ê¸°ë¡ ?„ìš© ???¤í–‰ ?íƒœ ë¯¸ì „??
                        </span>
                      </div>
                      <p className="mt-2 text-[10px] text-gray-500">
                        ??ê¸°ë¡?€ Live ?¨ì¼ ?ŒìŠ¤?????•ì¸ ??ª©???€??ê°ì‚¬ ê¸°ë¡?…ë‹ˆ?? ??ê¸°ë¡ë§Œìœ¼ë¡??¤ì œ Naver API ?¸ì¶œ?€ ?¤í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ê¸°ë¡???†ì„ ??ì²´í¬ë°•ìŠ¤ + ?€??ë²„íŠ¼ ?œì‹œ */}
            {!existingAudit && !liveAuditSaveResult && (
              <>
                {/* Guard ì°¨ë‹¨ ê²½ê³  */}
                {guard.summary.blockingCount > 0 && (
                  <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                    <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      ?¹ì¸ ì¤€ë¹?Guard?ì„œ {guard.summary.blockingCount}ê±´ì´ ì°¨ë‹¨ ì¤‘ì…?ˆë‹¤
                    </p>
                    <p className="text-red-200">
                      ?„ì˜ "Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ì¤€ë¹? ?¹ì…˜??ì°¨ë‹¨ ?¬ìœ ë¥?ë¨¼ì? ?´ê²°?˜ì„¸??
                    </p>
                  </div>
                )}

                {/* ?„ìˆ˜ ?•ì¸ ì²´í¬ë°•ìŠ¤ */}
                <div className="mb-4 space-y-2">
                  <p className="mb-2 text-xs font-semibold text-gray-300">?„ìˆ˜ ?•ì¸ ??ª© (?„ì²´ ì²´í¬ ?„ìš”)</p>
                  {([
                    { key: 'CONFIRM_SINGLE_ITEM_ONLY', label: '?¤ì œ Live ?ŒìŠ¤?¸ëŠ” ?¨ì¼ ?í’ˆ 1ê±´ìœ¼ë¡œë§Œ ?œí•œ?©ë‹ˆ??' },
                    { key: 'CONFIRM_TARGET_PRODUCT_REVIEWED', label: '?€???í’ˆë²ˆí˜¸, ?¤ë§ˆ?¸ìŠ¤? ì–´, ë³€ê²??ˆì • payloadë¥?ì§ì ‘ ?•ì¸?ˆìŠµ?ˆë‹¤.' },
                    { key: 'CONFIRM_PAYLOAD_REVIEWED', label: '?¤ì œ ë³€ê²½ë  ê°€ê²??¬ê³ /?¤ì›Œ??ê°’ì„ ì§ì ‘ ê²€? í–ˆ?µë‹ˆ??' },
                    { key: 'CONFIRM_NAVER_API_STILL_DISABLED', label: '?´ì˜ DB / ?´ì˜ Redis / ?¤ì œ Naver API ?¸ì¶œ?€ ?„ì§ ë¹„í™œ?±í™”?˜ì–´ ?ˆìŠµ?ˆë‹¤.' },
                    { key: 'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER', label: '?¤ì œ Live ?ŒìŠ¤???¨ê³„?ì„œ???¤ì´ë²??¤ë§ˆ?¸ìŠ¤? ì–´ ?í’ˆ ?•ë³´ê°€ ë³€ê²½ë  ???ˆìŠµ?ˆë‹¤.' },
                    { key: 'CONFIRM_NO_REPLAY_ALLOWED', label: 'Live ?¤í–‰?€ ë³„ë„ ?¹ì¸ê³?ì¶”ê? Safety Gateê°€ ì¤€ë¹„ëœ ?´í›„?ë§Œ ì§„í–‰?©ë‹ˆ??' },
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

                {/* ì²´í¬ ?„í™© */}
                <div className="mb-4 flex items-center gap-2 text-xs">
                  <span className={liveAuditCheckedItems.length >= 6 ? 'text-violet-300 font-semibold' : 'text-gray-500'}>
                    {liveAuditCheckedItems.length} / {LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.length} ??ª© ?•ì¸??
                  </span>
                  {!allAcked && (
                    <span className="text-amber-400">??ëª¨ë“  ??ª©??ì²´í¬?´ì•¼ ?€??ê°€?¥í•©?ˆë‹¤.</span>
                  )}
                </div>

                {/* ?€???¤ë¥˜ */}
                {liveAuditSaveError && (
                  <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                    <span className="font-semibold">?¤ë¥˜: </span>{liveAuditSaveError}
                  </div>
                )}

                {/* ?€??ë²„íŠ¼ */}
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
                    ?¹ì¸ ê¸°ë¡ ?€??(?¤ì œ Naver API ë¯¸í˜¸ì¶?
                  </button>
                  <span className="text-xs text-gray-500">
                    ??ë²„íŠ¼?€ ?¹ì¸ ê¸°ë¡ë§??€?¥í•©?ˆë‹¤ ???¤ì œ ?¤ì´ë²??¤ë§ˆ?¸ìŠ¤? ì–´ ?í’ˆ?€ ë³€ê²½ë˜ì§€ ?ŠìŠµ?ˆë‹¤.
                  </span>
                </div>

                {/* ë¹„í™œ???´ìœ  */}
                {!canSave && !liveAuditSaving && (
                  <div className="mt-3 text-xs text-gray-600">
                    {!activeFa && <div>??ACTIVE Final Approval???†ìŠµ?ˆë‹¤.</div>}
                    {guard.summary.blockingCount > 0 && (
                      <div>???¹ì¸ ì¤€ë¹?Guard?ì„œ {guard.summary.blockingCount}ê±´ì´ ì°¨ë‹¨ ì¤‘ì…?ˆë‹¤.</div>
                    )}
                    {!allAcked && <div>???„ìˆ˜ ?•ì¸ ??ª© {LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.length - liveAuditCheckedItems.filter(a => LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.includes(a as typeof LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS[number])).length}ê°œê? ë¯¸í™•???íƒœ?…ë‹ˆ??</div>}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })()}

      {/* ?€?€ ?˜ê²½ / DB ?ˆì „ ?•ì¸ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              Live ?¤í–‰ ???˜ê²½ ?ˆì „ ?ê?
              <span className={`ml-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                env.allowed
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-red-500/30 bg-red-500/10 text-red-300'
              }`}>
                {env.allowed ? '?ˆì „ ì¡°ê±´ ì¶©ì¡±' : 'ì°¨ë‹¨ ??ª© ?ˆìŒ'}
              </span>
            </h2>

            {/* ?ˆë‚´ ë¬¸êµ¬ */}
            <div className="mb-4 rounded-md border border-cyan-500/20 bg-cyan-500/10 p-3 text-xs text-cyan-200">
              <p className="mb-1 font-semibold text-cyan-300">?˜ê²½ ?ê? ?ˆë‚´</p>
              <p className="mb-1">?„ì¬ ?”ë©´?€ Live ?¤í–‰ ???˜ê²½ ?ˆì „ ?ê??©ì…?ˆë‹¤. ???¨ê³„?ì„œ???¤ì œ Naver API ?¸ì¶œ, Queue enqueue, Worker ?¤í–‰, ?´ì˜ DB writeê°€ ëª¨ë‘ ë¹„í™œ?±í™”?˜ì–´???©ë‹ˆ??</p>
              <p className="text-cyan-300/70">?˜ê²½ ?•ë³´??ë³´ì•ˆ???ë¬¸ URL?´ë‚˜ secret???œì‹œ?˜ì? ?Šê³  ?ˆì „??ë¶„ë¥˜ê°’ë§Œ ?œì‹œ?©ë‹ˆ??</p>
            </div>

            {/* ?˜ê²½ ?íƒœ ?”ì•½ */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">DB ?˜ê²½</p>
                <p className={`font-semibold font-mono ${dbEnvColor[env.databaseEnvironment] ?? 'text-gray-300'}`}>
                  {env.databaseEnvironment}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">Redis ?˜ê²½</p>
                <p className={`font-semibold font-mono ${dbEnvColor[env.redisEnvironment] ?? 'text-gray-300'}`}>
                  {env.redisEnvironment}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">ì°¨ë‹¨ ??ª©</p>
                <p className={`font-semibold ${env.blockingReasons.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {env.blockingReasons.length}ê±?
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">ê²½ê³  ??ª©</p>
                <p className={`font-semibold ${env.warnings.length > 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                  {env.warnings.length}ê±?
                </p>
              </div>
            </div>

            {/* ??ƒ false ê°•ì œ ë°°ì? */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Naver API ?¸ì¶œ ë¹„í™œ?±í™”
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> ?´ì˜ DB write ì°¨ë‹¨
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Queue ë¹„í™œ?±í™”
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Worker ë¹„í™œ?±í™”
              </div>
              <div className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Secret ë¹„ë…¸ì¶?
              </div>
            </div>

            {/* ì°¨ë‹¨ ?¬ìœ  */}
            {env.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ì°¨ë‹¨ ?¬ìœ  ({env.blockingReasons.length}ê±?
                </p>
                <ul className="space-y-1">
                  {env.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-red-200">- {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ê²½ê³  */}
            {env.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ê²½ê³  ({env.warnings.length}ê±?
                </p>
                <ul className="space-y-1">
                  {env.warnings.map((w, idx) => (
                    <li key={idx} className="text-amber-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ì²´í¬ë¦¬ìŠ¤??*/}
            <div className="space-y-1.5">
              <p className="mb-2 text-xs font-semibold text-gray-400">?˜ê²½ ?ˆì „ ì²´í¬ë¦¬ìŠ¤??/p>
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

            {/* ?˜ê²½ ì½”ë“œ */}
            <div className="mt-3 rounded-md border border-gray-500/20 bg-gray-500/5 p-2 text-xs text-gray-400">
              <span className="text-gray-500">?˜ê²½ ì½”ë“œ: </span>
              <span className="font-mono text-gray-300">{env.environmentCode}</span>
              <span className="mx-2 text-gray-600">|</span>
              <span>{env.environmentMessage}</span>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Live Adapter Skeleton ?íƒœ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {job.liveAdapterSkeletonStatus && (() => {
        const skel = job.liveAdapterSkeletonStatus!;
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-violet-400" />
              Live Adapter ì¤€ë¹??íƒœ ???¤ì œ ?¸ì¶œ ë¹„í™œ?±í™”
              <span className="ml-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                {skel.resultCode}
              </span>
            </h2>

            {/* ?ˆë‚´ */}
            <div className="mb-4 rounded-md border border-violet-500/20 bg-violet-500/10 p-3 text-xs text-violet-200">
              <p>{skel.resultMessage}</p>
            </div>

            {/* ?ˆì „ ë°°ì? */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold text-violet-300">
                <X className="mr-1 h-3 w-3" /> Live Adapter skeletonë§?ì¡´ì¬
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> ?¤ì œ ?¸ì¶œ ë¹„í™œ?±í™”
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> HTTP ?”ì²­ ?†ìŒ
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Token ?”ì²­ ?†ìŒ
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Endpoint ?¸ì¶œ ?†ìŒ
              </span>
              <span className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Live ?¤í–‰ ë¶ˆê?
              </span>
            </div>

            {/* ?íƒœ ì²´í¬ ê·¸ë¦¬??*/}
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
              <span className="text-gray-500">ìµœë? ?ˆìš© ?íƒœ: </span>
              <span className="font-mono text-violet-300">{skel.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ê°ì‚¬ ?´ë ¥ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {job.liveSingleTestAuditHistory && (() => {
        const hist = job.liveSingleTestAuditHistory!;
        const latest = hist.latestAudit;
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-indigo-400" />
              Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ê°ì‚¬ ?´ë ¥
              <span className={`ml-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                hist.exists
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                  : 'border-gray-600/30 bg-gray-600/10 text-gray-500'
              }`}>
                {hist.exists ? `ê¸°ë¡ ${hist.summary.totalRecords}ê±? : 'ê¸°ë¡ ?†ìŒ'}
              </span>
            </h2>

            {/* ?ˆë‚´ ë¬¸êµ¬ */}
            <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200">
              <p className="mb-1">??ê°ì‚¬ ê¸°ë¡?€ ?¹ì¸ ?•ì¸ ?´ë ¥??ë¿ì´ë©??¤ì œ Naver API ?¸ì¶œ???¤í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.</p>
              <p className="text-indigo-300/70">Live ?¤í–‰?€ ë³„ë„ ?¨ê³„?ì„œ ì¶”ê? Safety Gate?€ ëª…ì‹œ ?¹ì¸ ?„ì—ë§?ê²€? í•©?ˆë‹¤.</p>
            </div>

            {/* ?ˆì „ ?íƒœ ë°°ì? */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Naver API ?¸ì¶œ ë¹„í™œ?±í™”
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Live ?¤í–‰ ë¹„í™œ?±í™”
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> ?´ì˜ DB write ì°¨ë‹¨
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Queue ë¹„í™œ?±í™”
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Worker ë¹„í™œ?±í™”
              </div>
              <div className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Secret ë¹„ë…¸ì¶?(ì¡°íšŒ ?„ìš©)
              </div>
            </div>

            {/* ê¸°ë¡ ?†ìŒ */}
            {!hist.exists && (
              <div className="rounded-md border border-gray-600/20 bg-gray-600/5 p-3 text-xs text-gray-400">
                <p className="font-semibold text-gray-300">?¹ì¸ ê°ì‚¬ ê¸°ë¡???†ìŠµ?ˆë‹¤.</p>
                <p className="mt-1">Live ?¨ì¼ ?ŒìŠ¤???¹ì¸ ê¸°ë¡ ?€???¹ì…˜?ì„œ ë¨¼ì? ?„ìˆ˜ ?•ì¸ ??ª©??ì²´í¬?˜ê³  ê¸°ë¡???€?¥í•˜?¸ìš”.</p>
              </div>
            )}

            {/* ìµœì‹  ê°ì‚¬ ê¸°ë¡ */}
            {latest && (
              <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs">
                <p className="mb-3 text-xs font-semibold text-indigo-300">ìµœì‹  ê°ì‚¬ ê¸°ë¡</p>

                {/* ê¸°ë³¸ ?•ë³´ */}
                <div className="mb-3 grid grid-cols-1 gap-y-1.5 sm:grid-cols-2">
                  <div>
                    <span className="text-gray-500">?¹ì¸ ì½”ë“œ: </span>
                    <span className="font-mono text-indigo-300">{latest.auditCode}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">?íƒœ: </span>
                    <span className={`font-semibold ${
                      latest.status === 'RECORDED_BUT_NOT_EXECUTABLE'
                        ? 'text-emerald-400'
                        : 'text-gray-400'
                    }`}>
                      {latest.status === 'RECORDED_BUT_NOT_EXECUTABLE'
                        ? 'ê¸°ë¡ ?„ë£Œ (?¤í–‰ ë¶ˆê?)'
                        : latest.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">ê¸°ë¡ ?œê°: </span>
                    <span className="text-gray-200">
                      {latest.recordedAt ? new Date(latest.recordedAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">?¹ì¸?? </span>
                    <span className="font-mono text-gray-200">{latest.actorId ?? '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">BatchJob ID: </span>
                    <span className="font-mono text-gray-400">
                      {latest.batchJobId ? `${latest.batchJobId.substring(0, 16)}?? : '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">FinalApproval ID: </span>
                    <span className="font-mono text-gray-400">
                      {latest.finalApprovalId
                        ? `${latest.finalApprovalId.substring(0, 16)}??
                        : '-'}
                    </span>
                  </div>
                </div>

                {/* ?€???í’ˆ ?•ë³´ */}
                {latest.targetProductSummary && (
                  <div className="mb-3 rounded-md border border-gray-600/20 bg-gray-600/5 p-2.5">
                    <p className="mb-1.5 text-[10px] font-semibold text-gray-400">?€???í’ˆ ?•ë³´</p>
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

                {/* acknowledgement ëª©ë¡ */}
                <div className="mb-3">
                  <p className="mb-1.5 text-[10px] font-semibold text-gray-400">
                    ?•ì¸ ??ª© ({latest.acknowledgedItems.length}ê±??„ë£Œ
                    {latest.missingAcknowledgements.length > 0
                      ? ` / ${latest.missingAcknowledgements.length}ê±??„ë½`
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
                        <span className="font-mono text-[10px]">{ack} (?„ë½)</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ?¤í–‰ ë¶ˆê? ë°°ì? */}
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

            {/* ê²½ê³  */}
            {hist.warnings.length > 0 && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-2.5 text-xs">
                <p className="mb-1 flex items-center gap-1 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ê²½ê³  ({hist.warnings.length}ê±?
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
              <span className="text-gray-500">ìµœë? ?ˆìš© ?íƒœ: </span>
              <span className="font-mono text-gray-300">{hist.maxAllowedState}</span>
            </div>

            {/* ?„ì²´ ê°ì‚¬ ê¸°ë¡ ?€?œë³´??ë§í¬ */}
            <div className="mt-3 flex items-center justify-end">
              <Link
                href="/dashboard/sku-keyword-final-approval-live-audits"
                className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20"
              >
                <FileJson className="h-3.5 w-3.5" />
                ?„ì²´ ê°ì‚¬ ê¸°ë¡ ?€?œë³´????
              </Link>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Naver API ?¸ì¦?•ë³´ ?ˆì „ ?•ì¸ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
          <ShieldAlert className="h-5 w-5 text-slate-400" />
          Naver API ?¸ì¦?•ë³´ ?ˆì „ ?•ì¸
        </h2>

        <div className="mb-3 rounded-md border border-slate-500/20 bg-slate-500/10 p-3 text-xs text-slate-300">
          ???¹ì…˜?€ ?¸ì¦?•ë³´??ì¡´ì¬ ?¬ë?ë§??ˆì „???íƒœê°’ìœ¼ë¡??œì‹œ?©ë‹ˆ?? secret, token, authorization header, endpoint URL?€ ?œì‹œ?˜ì? ?Šìœ¼ë©? token ë°œê¸‰?´ë‚˜ Naver API ?¸ì¶œ???˜í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.
        </div>

        {job.naverAuthConfigSafety ? (
          <div className="space-y-4">
            {/* ?¸ì¦?•ë³´ ?íƒœ ?”ì•½ */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">?¸ì¦?•ë³´ ?íƒœ:</span>
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

            {/* ?ˆì „ ë°°ì? */}
            <div>
              <p className="mb-2 text-xs font-semibold text-gray-400">?ˆì „ ë°°ì? (ëª¨ë‘ ë¹„í™œ?±í™”??</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Secret ?ë¬¸ ë¹„ë…¸ì¶?, ok: !job.naverAuthConfigSafety.secretVisible },
                  { label: 'Token ë°œê¸‰ ë¹„í™œ?±í™”', ok: !job.naverAuthConfigSafety.tokenIssued },
                  { label: '?¸ì¦?•ë³´ ?¬ìš© ????, ok: !job.naverAuthConfigSafety.credentialsUsed },
                  { label: 'Authorization header ?†ìŒ', ok: !job.naverAuthConfigSafety.authorizationHeaderCreated },
                  { label: 'Endpoint ?¸ì¶œ ?†ìŒ', ok: !job.naverAuthConfigSafety.endpointCalled },
                  { label: 'Naver API ?¸ì¶œ ë¹„í™œ?±í™”', ok: !job.naverAuthConfigSafety.naverApiCallAllowed },
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

            {/* ?íƒœ ì¹´ë“œ */}
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

            {/* ì°¨ë‹¨ ?¬ìœ  */}
            {job.naverAuthConfigSafety.blockingReasons.length > 0 && (
              <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-red-300">ì°¨ë‹¨ ?¬ìœ </p>
                <ul className="space-y-0.5 text-xs text-red-200">
                  {job.naverAuthConfigSafety.blockingReasons.map((reason, i) => (
                    <li key={i}>- {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ê²½ê³  */}
            {job.naverAuthConfigSafety.warnings.length > 0 && (
              <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-amber-300">ê²½ê³ </p>
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
          <div className="text-sm text-gray-400">?¸ì¦?•ë³´ ?ˆì „ ?•ì¸ ?•ë³´ë¥?ë¶ˆëŸ¬?¤ëŠ” ì¤‘ì…?ˆë‹¤...</div>
        )}
      </div>

      {/* ?€?€ Naver API Token Provider ?íƒœ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {job.naverAuthTokenProviderStatus && (() => {
        const tp = job.naverAuthTokenProviderStatus!;
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-rose-400" />
              Token Provider ì¤€ë¹??íƒœ ??ë°œê¸‰ ë¹„í™œ?±í™”
              <span className="ml-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                {tp.resultCode}
              </span>
            </h2>

            {/* ?ˆë‚´ ë¬¸êµ¬ */}
            <div className="mb-4 rounded-md border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-200">
              <p>
                ???¹ì…˜?€ Token Provider êµ¬ì¡°ê°€ ì¤€ë¹„ë˜?ˆì?ë§?token ë°œê¸‰??ë¹„í™œ?±í™”?˜ì–´ ?ˆìŒ???œì‹œ?©ë‹ˆ??
                ???¨ê³„?ì„œ??access token ë°œê¸‰, refresh token ?”ì²­, authorization header ?ì„±, Naver API ?¸ì¶œ???˜í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.
              </p>
            </div>

            {/* Token Provider ?íƒœ ?”ì•½ */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm text-gray-400">Token Provider ?íƒœ:</span>
              <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-300">
                {tp.status}
              </span>
              <span className="rounded-full border border-slate-500/30 bg-slate-500/10 px-2 py-0.5 text-xs text-slate-400">
                tokenStatus: {tp.tokenStatus}
              </span>
            </div>

            {/* ?ˆì „ ë°°ì? */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">?ˆì „ ë°°ì? (ëª¨ë‘ ë¹„í™œ?±í™”??</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Token ë°œê¸‰ ë¹„í™œ?±í™”', ok: !tp.tokenIssued },
                  { label: 'Refresh Token ?”ì²­ ?†ìŒ', ok: !tp.refreshTokenRequested },
                  { label: '?¸ì¦?•ë³´ ?¬ìš© ????, ok: !tp.credentialsUsed },
                  { label: 'Authorization header ?†ìŒ', ok: !tp.authorizationHeaderCreated },
                  { label: 'Endpoint ?¸ì¶œ ?†ìŒ', ok: !tp.endpointCalled },
                  { label: 'Naver API ?¸ì¶œ ë¹„í™œ?±í™”', ok: !tp.naverApiCallAllowed },
                  { label: 'Token ?€???†ìŒ', ok: !tp.tokenStored },
                  { label: 'Secret ë¹„ë…¸ì¶?, ok: !tp.secretVisible },
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

            {/* ?íƒœ ì¹´ë“œ */}
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

            {/* ì°¨ë‹¨/ê²½ê³  ?¬ìœ  */}
            {tp.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ì°¨ë‹¨ ?¬ìœ  ({tp.blockingReasons.length}ê±?
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
                  ê²½ê³  ({tp.warnings.length}ê±?
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
              <span className="text-gray-500">ìµœë? ?ˆìš© ?íƒœ: </span>
              <span className="font-mono text-rose-300">{tp.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Naver API Token Dry Permission Gate ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              Token Dry Permission Gate ???¬ì „ ì¡°ê±´ ?ê?
              <span className={`ml-1 rounded-full border ${borderColor} ${bgColor} px-2 py-0.5 text-[10px] font-semibold ${textColor}`}>
                {gate.resultCode}
              </span>
            </h2>

            {/* ?ˆë‚´ ë¬¸êµ¬ */}
            <div className={`mb-4 rounded-md border ${borderColor} ${bgColor} p-3 text-xs ${textColor}`}>
              <p>
                ???¹ì…˜?€ token ë°œê¸‰ ??dry-run ?ê? ê²°ê³¼ë¥??œì‹œ?©ë‹ˆ??
                ëª¨ë“  ? í–‰ ì¡°ê±´??ì¶©ì¡±?˜ì–´??dryCheckPassed=true) ???¨ê³„?ì„œ??token??ë°œê¸‰?˜ì? ?ŠìŠµ?ˆë‹¤.
              </p>
            </div>

            {/* ?íƒœ ?”ì•½ */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-400">Gate ?íƒœ:</span>
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

            {/* ?ˆì „ ë°°ì? */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">?ˆì „ ë°°ì? (ëª¨ë‘ ë¹„í™œ?±í™”??</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Token ë°œê¸‰ ì°¨ë‹¨', ok: !gate.tokenIssued },
                  { label: 'Token ?”ì²­ ì°¨ë‹¨', ok: !gate.tokenRequestAllowed },
                  { label: 'Refresh Token ?†ìŒ', ok: !gate.refreshTokenRequested },
                  { label: '?¸ì¦?•ë³´ ?¬ìš© ????, ok: !gate.credentialsUsed },
                  { label: 'Authorization header ?†ìŒ', ok: !gate.authorizationHeaderCreated },
                  { label: 'Endpoint ?¸ì¶œ ?†ìŒ', ok: !gate.endpointCalled },
                  { label: 'Naver API ?¸ì¶œ ì°¨ë‹¨', ok: !gate.naverApiCallAllowed },
                  { label: 'Secret ë¹„ë…¸ì¶?, ok: !gate.secretVisible },
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

            {/* ?íƒœ ì¹´ë“œ */}
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

            {/* ì°¨ë‹¨ ?¬ìœ  */}
            {gate.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ì°¨ë‹¨ ?¬ìœ  ({gate.blockingReasons.length}ê±?
                </p>
                <ul className="space-y-1">
                  {gate.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-red-200">- {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ê²€???„ìš” ?¬ìœ  */}
            {gate.needsReviewReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ê²€???„ìš” ({gate.needsReviewReasons.length}ê±?
                </p>
                <ul className="space-y-1">
                  {gate.needsReviewReasons.map((r, idx) => (
                    <li key={idx} className="text-amber-200">- {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ê²½ê³  */}
            {gate.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-yellow-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ê²½ê³  ({gate.warnings.length}ê±?
                </p>
                <ul className="space-y-1">
                  {gate.warnings.map((w, idx) => (
                    <li key={idx} className="text-yellow-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ì²´í¬ë¦¬ìŠ¤???”ì•½ */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">
                ?ê? ??ª© ({gate.checklistItems.length}ê±?
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
              <span className="text-gray-500">ìµœë? ?ˆìš© ?íƒœ: </span>
              <span className="font-mono text-indigo-300">{gate.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Naver API Token Test-Only Skeleton ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              Token Test-Only Skeleton ??ì½”ë“œ ê²½ë¡œ ì¤€ë¹??•ì¸
              <span className="ml-auto rounded-full border px-2 py-0.5 text-xs font-semibold">
                {sk.status}
              </span>
            </h2>

            {/* ?ˆì „ ë°°ì? */}
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                testOnlyMode=true
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Token ë°œê¸‰ ì°¨ë‹¨
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Endpoint ë¯¸í•´??
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                HTTP Client ?†ìŒ
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Secret ë¹„ë…¸ì¶?
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                Naver API ?¸ì¶œ ì°¨ë‹¨
              </span>
            </div>

            {/* ê²°ê³¼ ë©”ì‹œì§€ */}
            <div className="mb-4 rounded-md border border-slate-500/20 bg-slate-500/10 p-3 text-xs">
              <span className="text-gray-400">resultCode: </span>
              <span className="font-mono text-indigo-300">{sk.resultCode}</span>
              <div className="mt-1 text-gray-300">{sk.resultMessage}</div>
            </div>

            {/* ?íƒœ ì¹´ë“œ */}
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

            {/* ì°¨ë‹¨ ?¬ìœ  */}
            {sk.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ì°¨ë‹¨ ?¬ìœ  ({sk.blockingReasons.length}ê±?
                </p>
                <ul className="space-y-1">
                  {sk.blockingReasons.map((r, idx) => (
                    <li key={idx} className="text-red-200">- {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ê²€???„ìš” */}
            {sk.needsReviewReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ê²€???„ìš” ({sk.needsReviewReasons.length}ê±?
                </p>
                <ul className="space-y-1">
                  {sk.needsReviewReasons.map((r, idx) => (
                    <li key={idx} className="text-amber-200">- {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ê²½ê³  */}
            {sk.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-yellow-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  ê²½ê³  ({sk.warnings.length}ê±?
                </p>
                <ul className="space-y-1">
                  {sk.warnings.map((w, idx) => (
                    <li key={idx} className="text-yellow-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ì²´í¬ë¦¬ìŠ¤??*/}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">
                ?ê? ??ª© ({sk.checklistItems.length}ê±?
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
              <span className="text-gray-500">ìµœë? ?ˆìš© ?íƒœ: </span>
              <span className="font-mono text-indigo-300">{sk.maxAllowedState}</span>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ ìµœì´ˆ Token ë°œê¸‰ ?ŒìŠ¤???¹ì¸ ê¸°ë¡ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        // ê¸°ì¡´ ?€?¥ëœ audit ?•ì¸
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
              ìµœì´ˆ Token ë°œê¸‰ ?ŒìŠ¤?????¬ìš©???¹ì¸ ê¸°ë¡
              {hasExistingAudit && (
                <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                  ê¸°ë¡ ?„ë£Œ
                </span>
              )}
            </h2>

            {/* ?ˆì „ ?ˆë‚´ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
              <p className="mb-1 font-semibold text-amber-300">???ˆì „ ?ˆë‚´ ?????¹ì…˜?€ ?¹ì¸ ê¸°ë¡ë§??€?¥í•©?ˆë‹¤</p>
              <ul className="space-y-1 text-xs">
                <li>?????¹ì¸ ê¸°ë¡?€ ?¤ì œ token ë°œê¸‰???¤í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>???í’ˆ ?˜ì • API ?¸ì¶œê³??°ê²°?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>???±ê³µ?´ë„ Live ?¤í–‰???œì„±?”ë˜ì§€ ?ŠìŠµ?ˆë‹¤.</li>
                <li>??Naver API endpoint URL?????¨ê³„?ì„œ resolve?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>??HTTP clientê°€ ?ì„±?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>??Authorization headerê°€ ?ì„±?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
              </ul>
            </div>

            {/* ?„ìˆ˜ acknowledgement ì²´í¬ë°•ìŠ¤ */}
            {!hasExistingAudit && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-gray-400">
                  ?„ìˆ˜ ?•ì¸ ??ª© ({tokenTestApprovalCheckedItems.length}/{TOKEN_TEST_APPROVAL_REQUIRED_ACKNOWLEDGEMENTS.length}ê±??•ì¸??
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

            {/* ?€??ë²„íŠ¼ */}
            {!hasExistingAudit && (
              <div className="mb-4">
                {!currentActiveFinalApproval && (
                  <div className="mb-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-2 text-xs text-amber-300">
                    ??ACTIVE Final Approval???†ìŠµ?ˆë‹¤. ë¨¼ì? ìµœì¢… ?¹ì¸ Artifactë¥??ì„±?˜ì„¸??
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
                    <><Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />?€??ì¤?..</>
                  ) : (
                    '?¹ì¸ ê¸°ë¡ ?€??(Token ë°œê¸‰ ë¯¸ì‹¤??'
                  )}
                </button>
                <p className="mt-1 text-[10px] text-gray-500">
                  ??ë²„íŠ¼?€ ?¹ì¸ ê¸°ë¡ë§??€?¥í•©?ˆë‹¤. token ë°œê¸‰ ë²„íŠ¼???„ë‹™?ˆë‹¤. ?¸ì¦ ?ŒìŠ¤??ë²„íŠ¼???„ë‹™?ˆë‹¤. Live ?¤í–‰ ë²„íŠ¼???„ë‹™?ˆë‹¤.
                </p>

                {/* ?¤ë¥˜ */}
                {tokenTestApprovalSaveError && (
                  <div className="mt-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                    <span className="font-semibold">?€???¤ë¥˜: </span>{tokenTestApprovalSaveError}
                  </div>
                )}

                {/* ?€???±ê³µ ê²°ê³¼ (ë°©ê¸ˆ ?€?? */}
                {tokenTestApprovalSaveResult && (
                  <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                    <p className="mb-1 font-semibold">???¹ì¸ ê¸°ë¡ ?€???„ë£Œ</p>
                    <p><span className="text-gray-400">auditCode: </span><span className="font-mono">{tokenTestApprovalSaveResult.auditCode}</span></p>
                    <p><span className="text-gray-400">recordedAt: </span>{tokenTestApprovalSaveResult.recordedAt}</p>
                    <p><span className="text-gray-400">acknowledgedItems: </span>{tokenTestApprovalSaveResult.acknowledgedItems.length}ê±?/p>
                    <p className="mt-1 text-[10px] text-emerald-400">{tokenTestApprovalSaveResult.message}</p>
                  </div>
                )}
              </div>
            )}

            {/* ?€?¥ëœ audit ?œì‹œ */}
            {existingAudit && (
              <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ?€?¥ëœ ?¹ì¸ ê¸°ë¡
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
                    <p className="mt-0.5 text-gray-200">{existingAudit.acknowledgedItems.length}ê±??•ì¸??/p>
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

                {/* acknowledgedItems ëª©ë¡ */}
                {existingAudit.acknowledgedItems.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1 text-xs font-semibold text-gray-400">?•ì¸????ª© ({existingAudit.acknowledgedItems.length}ê±?</p>
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
                  <p className="mb-1 text-xs font-semibold text-gray-400">?ˆì „ ?Œë˜ê·?(ëª¨ë‘ false)</p>
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

            {/* ?ˆì „ ë°°ì? */}
            <div>
              <p className="mb-2 text-xs font-semibold text-gray-400">?ˆì „ ë°°ì?</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Token ë°œê¸‰ ë¯¸ì‹¤??,
                  'Endpoint ?¸ì¶œ ?†ìŒ',
                  'HTTP client ?†ìŒ',
                  'Authorization header ?†ìŒ',
                  'Token ?€???†ìŒ',
                  'Live ?¤í–‰ ë¹„í™œ?±í™”',
                  'Queue/Worker ?†ìŒ',
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

      {/* ?€?€ ìµœì´ˆ Token ë°œê¸‰ ?ŒìŠ¤??Safety Boundary ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
          if (status === 'PASS') return '??;
          if (status === 'WARN') return '??;
          if (status === 'BLOCKED') return '??;
          return '??;
        };

        return (
          <div className="mb-6 rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-violet-300">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              ìµœì´ˆ Token ë°œê¸‰ ?ŒìŠ¤??Safety Boundary
              <span className={`ml-auto rounded-full border px-2 py-0.5 text-xs font-semibold ${statusBadgeClass}`}>
                {boundary.status}
              </span>
            </h2>

            {/* ?ˆì „ ?ˆë‚´ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
              <p className="mb-1 font-semibold text-amber-300">???ˆì „ ?ˆë‚´ ????Boundary???¤ì œ token ë°œê¸‰???¤í–‰?˜ì? ?ŠìŠµ?ˆë‹¤</p>
              <ul className="space-y-1 text-xs">
                <li>????Boundary???¤ì œ token ë°œê¸‰???¤í–‰?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>??ready ?íƒœ?¬ë„ ?¤ìŒ Task?ì„œ ë³„ë„ ëª…ì‹œ ?¹ì¸???„ìš”?©ë‹ˆ??</li>
                <li>???í’ˆ ?˜ì • API ?¸ì¶œê³??°ê²°?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>??Naver API endpoint URL?????¨ê³„?ì„œ resolve?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>??HTTP clientê°€ ?ì„±?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
              </ul>
            </div>

            {/* ?íƒœ ?”ì•½ ì¹´ë“œ */}
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
                    ? '?¤ìŒ Task?ì„œ ë³„ë„ ëª…ì‹œ ?¹ì¸ ??token ë°œê¸‰ ?ŒìŠ¤??ì§„í–‰ ê°€??
                    : 'ì¡°ê±´ ë¯¸ì¶©ì¡???token ë°œê¸‰ ?ŒìŠ¤???„ì¬ ì°¨ë‹¨'}
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
                <p className="mt-0.5 text-[10px] text-gray-500">??ƒ false</p>
              </div>
            </div>

            {/* ?ˆì „ ë°°ì? */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">?ˆì „ ë°°ì? (ëª¨ë‘ false ê¸°ë³´ ë³´ì¥)</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Token ?”ì²­ ë¹„í™œ?±í™”',
                  'Access Token ?”ì²­ ?†ìŒ',
                  'Endpoint ë¯¸í•´ê²?,
                  'HTTP client ?†ìŒ',
                  'Authorization header ?†ìŒ',
                  'Token ?€???†ìŒ',
                  'Live ?¤í–‰ ë¹„í™œ?±í™”',
                  'Queue/Worker ?†ìŒ',
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

            {/* ì½”ì–´ ì²´í¬ë¦¬ìŠ¤??*/}
            {boundary.checklistItems.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-gray-400">ì½”ì–´ ì²´í¬ë¦¬ìŠ¤??({boundary.checklistItems.length}??</p>
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

            {/* ì°¨ë‹¨ ?¬ìœ  */}
            {boundary.blockingReasons.length > 0 && (
              <div className="mb-3 rounded-md border border-red-500/20 bg-red-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-red-300">? í° ?ŒìŠ¤??ì°¨ë‹¨ ?¬ìœ  ({boundary.blockingReasons.length}ê±?</p>
                <ul className="space-y-1">
                  {boundary.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-red-200">??{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ?•ì¸ ?„ìš” ?¬ìœ  */}
            {boundary.needsReviewReasons.length > 0 && (
              <div className="mb-3 rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-amber-300">?•ì¸ ?„ìš” ??ª© ({boundary.needsReviewReasons.length}ê±?</p>
                <ul className="space-y-1">
                  {boundary.needsReviewReasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-amber-200">??{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ê²½ê³  */}
            {boundary.warnings.length > 0 && (
              <div className="mb-3 rounded-md border border-slate-500/20 bg-slate-500/10 p-3">
                <p className="mb-1 text-xs font-semibold text-slate-300">ê²½ê³  ({boundary.warnings.length}ê±?</p>
                <ul className="space-y-1">
                  {boundary.warnings.map((w, idx) => (
                    <li key={idx} className="text-xs text-slate-200">??{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ?ˆë‚´ ë¬¸êµ¬ */}
            <p className="mt-2 text-[10px] text-gray-500">
              ???¹ì…˜?€ ìµœì´ˆ token ë°œê¸‰ ?ŒìŠ¤??ì§ì „ ì¡°ê±´??ìµœì¢… ?ê??©ë‹ˆ?? ëª¨ë“  ì¡°ê±´???µê³¼?˜ì–´?????¨ê³„?ì„œ??token??ë°œê¸‰?˜ì? ?Šìœ¼ë©? ?¤ì œ token ë°œê¸‰ ?ŒìŠ¤?¸ëŠ” ?¤ìŒ Task?ì„œ ë³„ë„ ëª…ì‹œ ?¹ì¸ ?„ì—ë§?ì§„í–‰?©ë‹ˆ??
            </p>
          </div>
        );
      })()}

      {/* ?€?€ ìµœì´ˆ Token ë°œê¸‰ ?ŒìŠ¤??Final Approval Audit ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const audit = job.naverAuthTokenFirstTestFinalApprovalAudit ?? null;
        if (!audit) return null;

        const isRecorded = audit.approvalRecorded;

        return (
          <div className="mb-6 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-fuchsia-300">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              ìµœì´ˆ Token ë°œê¸‰ ?ŒìŠ¤??ìµœì¢… ?¹ì¸ (Final Approval)
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

                {/* acknowledgedKeys ëª©ë¡ */}
                {Array.isArray(audit.approvedAcknowledgementKeys) && audit.approvedAcknowledgementKeys.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1 text-xs font-semibold text-gray-400">?•ì¸???™ì˜ ??ª© ({audit.approvedAcknowledgementKeys.length}ê±?</p>
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
                  <p className="mb-1 text-xs font-semibold text-gray-400">?ˆì „ ?Œë˜ê·?(ëª¨ë‘ false)</p>
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
              ???¹ì…˜?€ ìµœì´ˆ token ë°œê¸‰ ?ŒìŠ¤?¸ì˜ ìµœì¢… ?¹ì¸ ê¸°ë¡(Read-only)???œì‹œ?©ë‹ˆ?? ?¹ì¸??ê¸°ë¡?˜ì–´???¤ì œ ë°œê¸‰ ë¡œì§??ë¹„í™œ?±í™”???íƒœ?„ì„ ë³´ì¥?©ë‹ˆ??
            </p>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Review Hub Navigation ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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

            {/* ?¨ë„ ëª©ì°¨ */}
            <div className="mb-4 rounded-md border border-violet-500/15 bg-[#0d0a14] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-500">
                ?ˆì „ ê²€???¨ë„ ëª©ì°¨ (ì´?{hub.totalPanelCount}ê°?
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
                      ?¤í–‰ë¶ˆê?
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ?ˆë¸Œ ?ˆë‚´ */}
            <div className="rounded-md border border-violet-500/15 bg-violet-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                <p className="text-xs text-violet-300">{hub.hubNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Review Section Layout ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const layout = job.naverAuthTokenFirstTestReviewSectionLayoutScreen;
        if (!layout) return null;

        return (
          <div className="mb-6 rounded-lg border border-orange-500/20 bg-orange-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-orange-400" />
              {layout.title}
            </h2>

            {/* ê²€???„ìš© ?ì—­ ê²½ê³  ë°°ë„ˆ */}
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

            {/* ?¹ì…˜ êµ¬ì¡° ë§?*/}
            <div className="mb-4 rounded-md border border-orange-500/10 bg-[#100c08] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange-600">
                ê²€???¹ì…˜ êµ¬ì¡° (ì´?{layout.sectionEntries.length}ê°?
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
                        ?¤í–‰ë¶ˆê?
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ?ˆì´?„ì›ƒ ?ˆë‚´ */}
            <div className="rounded-md border border-orange-500/15 bg-orange-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                <p className="text-xs text-orange-300/70">{layout.layoutNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Readiness Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              <p className="mb-2 text-xs font-semibold text-gray-400">?ˆì „ ê³„ì¸µ ?‰ê? ê²°ê³¼</p>
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
                            <p key={i} className="text-[10px] text-red-400">??{r}</p>
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
              <p className="mb-1 text-xs font-semibold text-gray-400">ê°•ì œ ì°¨ë‹¨ ?Œë˜ê·?ê²€ì¦?(?„ì²´ false ë³´ì¥)</p>
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
              <p className="mb-2 text-xs font-semibold text-amber-300">???„ì¬ ?¤í–‰?????†ëŠ”ê°€?</p>
              <ul className="space-y-1 text-xs text-amber-200">
                <li>???¤ì œ token ë°œê¸‰?€ ë³„ë„ ?¬ìš©???¹ì¸ ?„ì—ë§?ê°€?¥í•©?ˆë‹¤.</li>
                <li>???¤ì œ Naver API ?¸ì¶œ?€ ë³„ë„ ?¹ì¸???„ìš”?©ë‹ˆ??</li>
                <li>???´ì˜ DB write??ë³„ë„ ?¹ì¸???„ìš”?©ë‹ˆ??</li>
                <li>??ê°€ê²??¬ê³  ë³€ê²½ì? ë³„ë„ ?¹ì¸???„ìš”?©ë‹ˆ??</li>
                <li>???„ì¬ ?”ë©´?€ ?íƒœ ?•ì¸ ?„ìš©?…ë‹ˆ??</li>
              </ul>
            </div>

            {/* Copyable Safety Report */}
            {readiness.copyableSafetyReport && (
              <div className="mb-3">
                <p className="mb-1 text-xs font-semibold text-gray-400">
                  ?ˆì „ ë³´ê³ ??(read-only ???ìŠ¤??? íƒ ??ë³µì‚¬ ê°€??
                </p>
                <pre className="max-h-52 overflow-auto rounded-md border border-[#262629] bg-[#0a0a0c] p-3 text-xs text-gray-300 whitespace-pre-wrap cursor-text select-all leading-relaxed">
                  {readiness.copyableSafetyReport}
                </pre>
              </div>
            )}

            {/* Next Steps */}
            <div className="mb-3 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-indigo-300">?¤ìŒ ?¨ê³„ ?ˆë‚´</p>
              <ul className="space-y-1 text-xs text-indigo-200">
                <li>???¤ìŒ ?¨ê³„??ë³„ë„ ?¬ìš©???¹ì¸ ??Test DB ?ëŠ” ëª…ì‹œ???ˆì „ ?˜ê²½?ì„œë§?ì§„í–‰ ê°€?¥í•©?ˆë‹¤.</li>
                <li>???„ì¬ ?”ë©´?ì„œ???¤í–‰?????†ìŠµ?ˆë‹¤.</li>
                <li>???¤ì œ token ë°œê¸‰ ?”ì²­?€ ?„ì§ êµ¬í˜„?˜ì–´ ?ˆì? ?ŠìŠµ?ˆë‹¤.</li>
              </ul>
            </div>

            <p className="mt-2 text-[10px] text-gray-500">
              ???”ë©´?€ Read-only View Model???Œë”ë§í•˜ë©??¤ì œ API ?¸ì¶œ?´ë‚˜ DB ?°ê¸° ?™ì‘??ë°œìƒ?˜ì? ?ŠìŒ??ë³´ì¥?©ë‹ˆ??
            </p>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Final Confirmation Gate Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              <p className="mb-2 text-xs font-semibold text-red-300">?”ì•½ ì¹´ë“œ</p>
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
              <p className="mb-2 text-sm font-semibold text-gray-300">?•ì¸ ì²´í¬ë¦¬ìŠ¤??/p>
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
              ???ì—­?€ ì»´í¬?ŒíŠ¸ ê²©ë¦¬ë¥??„í•œ display-only ?ì—­?´ë©° ?¤í–‰ ë²„íŠ¼???¬í•¨?˜ì? ?ŠìŠµ?ˆë‹¤.
            </p>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Action Lock Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              <p className="mb-2 text-xs font-semibold text-purple-300">Action Lock ?”ì•½ ì¹´ë“œ</p>
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
              <p className="mb-2 text-sm font-semibold text-gray-300">? ê¸ˆ ?¬ìœ  ëª©ë¡</p>
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

      {/* ?€?€ Token First Test Safety Review Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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
              <p className="mb-2 text-xs font-semibold text-amber-300">Safety Review ?”ì•½ ì¹´ë“œ</p>
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
              <p className="mb-2 text-sm font-semibold text-gray-300">?ˆì „ ?íƒœ ë¦¬ë·° ??ª©</p>
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

      {/* ?€?€ Token First Test Safe Next Step Guide Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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

            {/* ?„ì¬ ?¨ê³„ ?íƒœ ë°°ì? */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                ?„ì¬ ?¨ê³„: {guide.currentPhaseLabel}
              </span>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                Token ë°œê¸‰ ?ŒìŠ¤???¤í–‰: ?„ì§ ë¶ˆê?
              </span>
            </div>

            {/* ?¤í–‰ ë¶ˆê? ?´ìœ  */}
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/5 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-xs text-red-300">{guide.blockedReason}</p>
              </div>
            </div>

            {/* ?„ë£Œ???ˆì „ ?¨ê³„ */}
            <div className="mb-4 rounded-md border border-violet-500/20 bg-[#121214] p-3">
              <p className="mb-3 text-sm font-semibold text-gray-300">?„ë£Œ???ˆì „ ?¨ê³„</p>
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

            {/* ë³„ë„ ?¹ì¸ ?„ìš” ??ª© */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-3 text-sm font-semibold text-amber-300">?¤ìŒ ?¨ê³„ë¡??˜ì–´ê°€ê¸??„í•œ ë³„ë„ ?¹ì¸ ??ª©</p>
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

            {/* ?¤ìŒ ?¨ê³„ ?ˆë‚´ */}
            <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-gray-300">{guide.nextPhaseLabel}</p>
              <p className="text-xs text-gray-400">{guide.nextPhaseGuide}</p>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Separate Approval Packet Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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

            {/* ?„ì¬ ?¤í–‰ ? ê¸ˆ ?íƒœ */}
            <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="mb-1 text-xs font-semibold text-red-300">?„ì¬ ?¤í–‰ ? ê¸ˆ ?íƒœ</p>
                  <p className="text-xs text-red-200">{packet.currentLockStatus}</p>
                </div>
              </div>
            </div>

            {/* ?¤ì œ token ë°œê¸‰ ?ŒìŠ¤??ë¶ˆê? ?´ìœ  */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-amber-300">?¤ì œ Token ë°œê¸‰ ?ŒìŠ¤??ë¶ˆê? ?´ìœ </p>
              <p className="text-xs text-amber-200">{packet.tokenTestNotAllowedReason}</p>
            </div>

            {/* ?„í—˜ ë²”ìœ„ */}
            <div className="mb-4 rounded-md border border-rose-500/20 bg-[#121214] p-3">
              <p className="mb-3 text-sm font-semibold text-gray-300">ë³„ë„ ?¹ì¸ ???•ì¸?´ì•¼ ???„í—˜ ë²”ìœ„</p>
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

            {/* ?¹ì¸??ì²´í¬ë¦¬ìŠ¤??*/}
            <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/5 p-3">
              <p className="mb-3 text-sm font-semibold text-indigo-300">?¹ì¸???•ì¸ ì²´í¬ë¦¬ìŠ¤??(read-only)</p>
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

            {/* ê¸ˆì? ??ª© */}
            <div className="mb-4 rounded-md border border-gray-600/20 bg-gray-900/30 p-3">
              <p className="mb-3 text-xs font-semibold text-gray-400">?„ì¬ ???”ë©´?ì„œ ?¬ì „??ê¸ˆì?????ª©</p>
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

            {/* ?¹ì¸ ?ˆë‚´ */}
            <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <p className="text-xs text-gray-400">{packet.approvalNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Approval Evidence Timeline Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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

            {/* ?„ì²´ ?¤í–‰ ? ê¸ˆ ?íƒœ */}
            <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="mb-1 text-xs font-semibold text-red-300">?„ì²´ ?¤í–‰ ? ê¸ˆ ?íƒœ</p>
                  <p className="text-xs text-red-200">{timeline.overallLockStatus}</p>
                </div>
              </div>
            </div>

            {/* token ë°œê¸‰ ?ŒìŠ¤??ì°¨ë‹¨ ?´ìœ  */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-amber-300">?¤ì œ Token ë°œê¸‰ ?ŒìŠ¤??ì°¨ë‹¨ ?´ìœ </p>
              <p className="text-xs text-amber-200">{timeline.tokenTestBlockedReason}</p>
            </div>

            {/* Evidence Timeline Steps */}
            <div className="mb-4 space-y-3">
              <p className="text-sm font-semibold text-gray-300">?ˆì „ ê²€???¨ê³„ Evidence Timeline</p>
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
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">?•ì¸???ˆì „ ì¡°ê±´</p>
                    <ul className="space-y-0.5">
                      {step.confirmedSafetyConditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                          <span className="mt-0.5 shrink-0 text-green-500">??/span>
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">?¬ì „??? ê¸´ ?¤í–‰ ì¡°ê±´</p>
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

            {/* ?¹ì¸ ?ˆë‚´ */}
            <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <p className="text-xs text-gray-400">{timeline.approvalNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Approval Console Screen ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
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

            {/* ?„ì²´ ?íƒœ ?”ì•½ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-slate-600/40 bg-slate-800/40 px-4 py-3">
              <p className="text-xs font-semibold text-slate-300">{console_.overallStatus}</p>
            </div>

            {/* ?íƒœ ?”ì•½ ??ª© */}
            <div className="mb-4 rounded-md border border-slate-600/20 bg-[#0d0f12] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">?„ì¬ ?íƒœ ?”ì•½</p>
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

            {/* ?„ë£Œ???ˆì „ ê²€???ë¦„ */}
            <div className="mb-4 rounded-md border border-slate-600/20 bg-[#0d0f12] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                ?„ë£Œ???ˆì „ ê²€???ë¦„ ({console_.completedFlowSteps.length}ê°?
              </p>
              <div className="flex flex-wrap gap-2">
                {console_.completedFlowSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-1.5 rounded border border-slate-700/50 bg-slate-800/40 px-2 py-1"
                  >
                    <span className="text-[9px] font-bold text-green-500">??/span>
                    <span className="font-mono text-[9px] text-slate-400">{step.stepKey}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ?¤ìŒ ?„ìš” ?‰ë™ */}
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="mb-1 text-xs font-semibold text-amber-300">?¤ìŒ ?„ìš” ?‰ë™</p>
              <p className="text-xs text-amber-200">{console_.nextRequiredAction}</p>
            </div>

            {/* ì½˜ì†” ?ˆë‚´ */}
            <div className="rounded-md border border-slate-500/20 bg-slate-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <p className="text-xs text-slate-400">{console_.approvalNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Separate Approval Request Draft ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const draft = job.naverAuthTokenFirstTestSeparateApprovalRequestDraftScreen;
        if (!draft) return null;

        return (
          <div className="mb-6 rounded-lg border border-indigo-500/20 bg-indigo-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-indigo-400" />
              {draft.title}
            </h2>

            {/* ì´ˆì•ˆ ê²½ê³  ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-indigo-500/40 bg-indigo-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-indigo-300">{draft.draftLabel}</p>
                  <p className="text-xs text-indigo-200">{draft.draftPurpose}</p>
                </div>
              </div>
            </div>

            {/* ?„ì¬ ?íƒœ ?”ì•½ */}
            <div className="mb-4 rounded-md border border-indigo-500/15 bg-indigo-900/10 px-3 py-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-500">?„ì¬ ?íƒœ</p>
              <p className="text-xs font-mono text-indigo-300">{draft.currentStatusSummary}</p>
            </div>

            {/* ?„ì§ ?¤í–‰ ë¶ˆê????´ìœ  */}
            <div className="mb-4 rounded-md border border-indigo-500/15 bg-indigo-900/10 px-3 py-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-500">?¤í–‰ ë¶ˆê? ?´ìœ </p>
              <p className="text-xs text-indigo-300/80">{draft.whyNotAllowedYet}</p>
            </div>

            {/* ë³„ë„ ?¹ì¸ ?”ì²­ ì´ˆì•ˆ ?¹ì…˜ 6ê°?*/}
            <div className="mb-4 rounded-md border border-indigo-500/10 bg-[#08080f] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                ë³„ë„ ?¹ì¸ ?”ì²­ ì´ˆì•ˆ ?´ìš© (ì´?{draft.approvalRequestSections.length}ê°??¹ì…˜)
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

            {/* ?¬ì „??ê¸ˆì?????ª© */}
            <div className="mb-4 rounded-md border border-red-500/10 bg-red-900/5 p-3">
              <p className="mb-2 text-xs font-semibold text-red-500/80">
                ?¹ì¸ ?´í›„?ë„ ?¬ì „??ê¸ˆì?????ª© ({draft.stillProhibitedItems.length}ê°?
              </p>
              <ul className="space-y-1">
                {draft.stillProhibitedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-500">
                    <span className="mt-0.5 shrink-0 text-red-600">??/span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ì´ˆì•ˆ ?ˆë‚´ */}
            <div className="rounded-md border border-indigo-500/15 bg-indigo-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <p className="text-xs text-indigo-300/70">{draft.draftNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Approval Readiness Checklist ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const checklist = job.naverAuthTokenFirstTestApprovalReadinessChecklistScreen;
        if (!checklist) return null;

        return (
          <div className="mb-6 rounded-lg border border-teal-500/20 bg-teal-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <CheckCircle2 className="h-5 w-5 text-teal-400" />
              {checklist.title}
            </h2>

            {/* ì²´í¬ë¦¬ìŠ¤???ˆë‚´ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-teal-500/40 bg-teal-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-teal-300">{checklist.checklistLabel}</p>
                  <p className="text-xs text-teal-200">{checklist.checklistDescription}</p>
                </div>
              </div>
            </div>

            {/* ì²´í¬ë¦¬ìŠ¤????ª© */}
            <div className="mb-4 rounded-md border border-teal-500/10 bg-[#040f0f] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-600">
                ?¹ì¸ ì¤€ë¹??íƒœ ??ª© (ì´?{checklist.checklistItems.length}ê°?
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
                        {item.checkStatus === 'CONFIRMED' ? '?? : item.checkStatus === 'LOCKED' ? '?”’' : '??}
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

            {/* ì²´í¬ë¦¬ìŠ¤???ˆë‚´ */}
            <div className="rounded-md border border-teal-500/15 bg-teal-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <p className="text-xs text-teal-300/70">{checklist.checklistNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Approval Decision Summary ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const summary = job.naverAuthTokenFirstTestApprovalDecisionSummaryScreen;
        if (!summary) return null;

        return (
          <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
              {summary.title}
            </h2>

            {/* ìµœì¢… ê²°ë¡  ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-amber-500/50 bg-amber-500/10 px-4 py-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-amber-300">{summary.summaryLabel}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="rounded border border-red-700/40 bg-red-900/20 px-3 py-1.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-red-500/70 mb-0.5">?„ì¬ ê²°ë¡ </p>
                      <p className="text-sm font-bold text-red-400">{summary.currentDecision}</p>
                    </div>
                    <div className="rounded border border-amber-700/40 bg-amber-900/20 px-3 py-1.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-500/70 mb-0.5">?„ì¬ ?¨ê³„</p>
                      <p className="text-sm font-bold text-amber-400">{summary.currentPhase}</p>
                    </div>
                    <div className="rounded border border-gray-700/40 bg-gray-800/20 px-3 py-1.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500/70 mb-0.5">ê²€???„ë£Œ ?¨ë„</p>
                      <p className="text-sm font-bold text-gray-300">{summary.reviewedPanelCount}ê°?(ëª¨ë‘ read-only)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ê²°ë¡  ??ª© ?”ì•½ */}
            <div className="mb-4 rounded-md border border-amber-500/10 bg-[#0f0a00] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-600">
                ?„ì¬ ?íƒœ ??ª© (ì´?{summary.decisionItems.length}ê°?
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
                      item.currentState.includes('ë¶ˆê?') || item.currentState.includes('ì°¨ë‹¨') || item.currentState.includes('? ì?')
                        ? 'bg-red-900/20 text-red-400 border border-red-800/30'
                        : item.currentState.includes('?„ë£Œ')
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

            {/* ìµœì¢… ?ˆë‚´ */}
            <div className="rounded-md border border-amber-500/15 bg-amber-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-xs text-amber-300/70">{summary.summaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Separate Approval Boundary ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const boundary = job.naverAuthTokenFirstTestSeparateApprovalBoundaryScreen;
        if (!boundary) return null;

        return (
          <div className="mb-6 rounded-lg border border-zinc-500/20 bg-zinc-950/20 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-zinc-400" />
              {boundary.title}
            </h2>

            {/* ê²½ê³„ ?ˆë‚´ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-zinc-500/30 bg-zinc-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-zinc-300">{boundary.boundaryLabel}</p>
                  <p className="text-xs text-zinc-300/80">{boundary.currentScreenNote}</p>
                </div>
              </div>
            </div>

            {/* ?¹ì¸ ?´í›„ ?ˆë‚´ */}
            <div className="mb-4 rounded-md border border-zinc-600/20 bg-zinc-800/20 px-3 py-2.5">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <p className="text-xs text-zinc-400">{boundary.afterApprovalNote}</p>
              </div>
            </div>

            {/* 2-column layout: ?ˆìš© / ê¸ˆì? */}
            <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* ?ˆìš©???‘ì—… */}
              <div className="rounded-md border border-green-700/25 bg-green-950/10 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-green-500">
                  ??{boundary.allowedZoneTitle}
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

              {/* ê¸ˆì????‘ì—… */}
              <div className="rounded-md border border-red-700/25 bg-red-950/10 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-500">
                  ??{boundary.prohibitedZoneTitle}
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

            {/* ê²½ê³„ ?ˆë‚´ */}
            <div className="rounded-md border border-zinc-600/15 bg-zinc-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <p className="text-xs text-zinc-400/70">{boundary.boundaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Approval Handoff Summary ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const handoff = job.naverAuthTokenFirstTestApprovalHandoffSummaryScreen;
        if (!handoff) return null;

        return (
          <div className="mb-6 rounded-lg border border-sky-500/20 bg-sky-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ClipboardList className="h-5 w-5 text-sky-400" />
              {handoff.title}
            </h2>

            {/* ?¸ìˆ˜?¸ê³„ ?ˆë‚´ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-sky-500/25 bg-sky-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-sky-300">{handoff.handoffLabel}</p>
                  <p className="text-xs text-sky-300/80">{handoff.handoffNote}</p>
                </div>
              </div>
            </div>

            {/* ?„ì¬ ?íƒœ ?”ì•½ ì¹´ë“œ */}
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

            {/* ?¤ìŒ ?‘ì—…???•ì¸ ??ª© */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                ?¤ìŒ ?‘ì—…???•ì¸ ??ª©
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

            {/* ?ˆë? ê¸ˆì? ??ª© */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-500">
                ë³„ë„ ?¹ì¸ ?„ê¹Œì§€ ?ˆë? ?˜ì? ë§ì•„??????ª©
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

            {/* ?”ì•½ ?ˆë‚´ */}
            <div className="rounded-md border border-sky-600/15 bg-sky-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <p className="text-xs text-sky-400/70">{handoff.handoffSummaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Approval Handoff Verification ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const verification = job.naverAuthTokenFirstTestApprovalHandoffVerificationScreen;
        if (!verification) return null;

        return (
          <div className="mb-6 rounded-lg border border-indigo-500/20 bg-indigo-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ClipboardList className="h-5 w-5 text-indigo-400" />
              {verification.title}
            </h2>

            {/* ê²€ì¦??ˆë‚´ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-indigo-500/25 bg-indigo-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-indigo-300">{verification.verificationLabel}</p>
                  <p className="text-xs text-indigo-300/80">{verification.verificationNote}</p>
                </div>
              </div>
            </div>

            {/* ìµœì¢… ê²°ë¡  ?íƒœ */}
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="rounded border border-indigo-700/40 bg-indigo-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-indigo-500/70 mb-0.5">ìµœì¢… ê²°ë¡ </p>
                <p className="text-sm font-bold text-indigo-300">{verification.currentConclusion}</p>
              </div>
              <div className="rounded border border-indigo-700/40 bg-indigo-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-indigo-500/70 mb-0.5">?„ì¬ ?¨ê³„</p>
                <p className="text-sm font-bold text-indigo-300">{verification.currentPhase}</p>
              </div>
            </div>

            {/* ?íƒœ ê²€ì¦???ª© ì¹´ë“œ */}
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

            {/* ìµœì¢… ?•ì¸ ë¦¬ìŠ¤??*/}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                ìµœì¢… ê²€ì¦??•ì¸ ??ª©
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

            {/* ê²€ì¦??”ì•½ ?ˆë‚´ */}
            <div className="rounded-md border border-indigo-600/15 bg-indigo-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <p className="text-xs text-indigo-400/70">{verification.handoffVerificationNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Token First Test Manual Approval Checklist Alignment ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const alignment = job.naverAuthTokenFirstTestManualApprovalChecklistAlignmentScreen;
        if (!alignment) return null;

        return (
          <div className="mb-6 rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/10 p-4">
            <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
              <ClipboardList className="h-5 w-5 text-fuchsia-400" />
              {alignment.title}
            </h2>

            {/* ?ˆë‚´ ë°°ë„ˆ */}
            <div className="mb-4 rounded-md border border-fuchsia-500/25 bg-fuchsia-500/10 px-4 py-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-400" />
                <div>
                  <p className="mb-1 text-xs font-bold text-fuchsia-300">{alignment.alignmentLabel}</p>
                  <p className="text-xs text-fuchsia-300/80">{alignment.alignmentNote}</p>
                </div>
              </div>
            </div>

            {/* ?°ê²° ?íƒœ ?”ì•½ */}
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="rounded border border-fuchsia-700/40 bg-fuchsia-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-fuchsia-500/70 mb-0.5">?„ì¬ ?¨ê³„</p>
                <p className="text-sm font-bold text-fuchsia-300">{alignment.currentPhase}</p>
              </div>
              <div className="rounded border border-fuchsia-700/40 bg-fuchsia-900/20 px-3 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-fuchsia-500/70 mb-0.5">?¤ìŒ ?¨ê³„ ?•ë³´</p>
                <p className="text-sm font-bold text-fuchsia-300">{alignment.nextStepContext}</p>
              </div>
            </div>

            {/* ?•ë ¬(Alignment) ê²€????ª© */}
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

            {/* ì²´í¬ë¦¬ìŠ¤??ëª…í™•???¤ëª… (Clarifications) */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-fuchsia-400">
                ?˜ë‹¨ ì²´í¬ë¦¬ìŠ¤??ëª…í™•????ª©
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

            {/* ?”ì•½ ?ˆë‚´ */}
            <div className="rounded-md border border-fuchsia-600/15 bg-fuchsia-500/5 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-600" />
                <p className="text-xs text-fuchsia-400/70">{alignment.alignmentSummaryNote}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ?€?€ Manual Approval Checklist ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      <ManualApprovalChecklistPanel jobId={job.id} readinessStatus={job.status} />

      {/* ?€?€ Token First Test Manual Approval Final Seal ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {(() => {
        const finalSeal = job.naverAuthTokenFirstTestManualApprovalFinalSealScreen;
        if (!finalSeal) return null;

        return (
          <div className="mb-6 rounded-lg border border-rose-500/30 bg-rose-950/20 p-4 shadow-sm shadow-rose-900/10">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-rose-400">
              <ShieldAlert className="h-5 w-5" />
              {finalSeal.title}
            </h2>

            {/* ìµœì¢… ê²°ë¡  ?íƒœ ë°°ë„ˆ */}
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

            {/* ?„ì¬ ?¨ê³„ ?”ì•½ */}
            <div className="mb-5 flex flex-wrap gap-4 border-l-2 border-rose-700/50 pl-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-500/70 mb-0.5">?„ì¬ ?¨ê³„</p>
                <p className="text-sm font-bold text-rose-300">{finalSeal.currentPhase}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-500/70 mb-0.5">?¤ìŒ ?¨ê³„ ?•ë³´</p>
                <p className="text-sm font-bold text-rose-300">{finalSeal.nextStepContext}</p>
              </div>
            </div>

            {/* ê°œë³„ ë´‰ì¸ ??ª© (Seal Items) */}
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

            {/* ëª…í™•????ª© (Clarifications) */}
            <div className="mb-5">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                ìµœì¢… ë´‰ì¸ ëª…í™•????ª©
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

            {/* ?”ì•½ ?ˆë‚´ */}
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
                  ê¸°ë³¸ ?ì¹™
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

      {/* ?€?€ BatchJob ?¤í–‰ ê²°ê³¼ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€ */}
      {['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'EXECUTING'].includes(job.status) && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <CheckCircle2 className={`h-5 w-5 ${job.status === 'FAILED' ? 'text-red-400' : job.status === 'PARTIAL_SUCCESS' ? 'text-orange-400' : 'text-emerald-400'}`} />
            BatchJob ?¤í–‰ ê²°ê³¼
            <span className={`ml-1 rounded-full border px-2 py-0.5 text-xs ${getStatusBadgeStyle(job.status)}`}>
              {job.status}
            </span>
          </h2>

          {/* ?¤í–‰ ê°ì‚¬ ?•ë³´ (Audit Trail) */}
          {(() => {
            const execMode = job.executionMetadata?.executionMode ?? null;
            const naverApiCalled = execMode === 'live';
            return (
              <div className="mb-4 rounded-md border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-200">
                <p className="mb-2 font-semibold text-blue-300">?¤í–‰ ê°ì‚¬ ?•ë³´ (Audit Trail)</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                  <div>
                    <span className="text-blue-400">BatchJob ID: </span>
                    <span className="font-mono text-blue-100">{job.id.substring(0, 12)}??/span>
                  </div>
                  {job.executionMetadata?.finalApprovalId && (
                    <div>
                      <span className="text-blue-400">FinalApproval ID: </span>
                      <span className="font-mono text-blue-100">
                        {job.executionMetadata.finalApprovalId.substring(0, 12)}??
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
                      <span className="text-blue-400">?¤í–‰ ëª¨ë“œ (adapterMode): </span>
                      <span className="font-mono text-blue-100">{execMode}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-blue-400">Naver API ?¸ì¶œ: </span>
                    <span className={`font-semibold ${naverApiCalled ? 'text-red-300' : 'text-emerald-300'}`}>
                      {naverApiCalled ? '??(?¤ì œ ?¸ì¶œ)' : '?„ë‹ˆ??(ì°¨ë‹¨??'}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-400">?¤ë§ˆ?¸ìŠ¤? ì–´ ë³€ê²? </span>
                    <span className={`font-semibold ${naverApiCalled ? 'text-red-300' : 'text-emerald-300'}`}>
                      {naverApiCalled ? '??(?¤ì œ ë³€ê²?' : '?„ë‹ˆ??}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-400">?„ì²´ ??ª© (totalItems): </span>
                    <span className="text-blue-100">{job.itemCount}ê±?/span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ê¸°ë³¸ ?¤í–‰ ?•ë³´ */}
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="mb-1 text-xs text-gray-500">?¤í–‰ ?„ë£Œ ?œê° (executedAt)</p>
              <p className="text-sm text-gray-200">
                {job.executedAt ? new Date(job.executedAt).toLocaleString() : '-'}
              </p>
            </div>
            {job.executionMetadata?.startedAt && (
              <div>
                <p className="mb-1 text-xs text-gray-500">?¤í–‰ ?œì‘ (startedAt)</p>
                <p className="text-sm text-gray-300">{new Date(job.executionMetadata.startedAt).toLocaleString()}</p>
              </div>
            )}
            {job.executionMetadata?.endedAt && (
              <div>
                <p className="mb-1 text-xs text-gray-500">?¤í–‰ ì¢…ë£Œ (finishedAt)</p>
                <p className="text-sm text-gray-300">{new Date(job.executionMetadata.endedAt).toLocaleString()}</p>
              </div>
            )}
            {job.executionMetadata?.durationMs !== undefined && (
              <div>
                <p className="mb-1 text-xs text-gray-500">ì²˜ë¦¬ ?œê°„</p>
                <p className="text-sm text-gray-300">{job.executionMetadata.durationMs}ms</p>
              </div>
            )}
          </div>

          {/* ?±ê³µ/?¤íŒ¨/?¤í‚µ ì¹´ìš´??*/}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-emerald-400">{job.successItems}</p>
              <p className="text-xs text-gray-400">?±ê³µ</p>
            </div>
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-red-400">{job.failedItems}</p>
              <p className="text-xs text-gray-400">?¤íŒ¨</p>
            </div>
            <div className="rounded-md border border-gray-500/20 bg-gray-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-gray-400">{job.skippedItems}</p>
              <p className="text-xs text-gray-400">?¤í‚µ</p>
            </div>
          </div>

          {/* ??ª©ë³??íƒœ ë¶„í¬ */}
          {job.items.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">??ª©ë³??íƒœ ë¶„í¬</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  job.items.reduce<Record<string, number>>((acc, item) => {
                    acc[item.status] = (acc[item.status] ?? 0) + 1;
                    return acc;
                  }, {})
                ).map(([st, count]) => (
                  <span key={st} className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(st)}`}>
                    {st}: {count}ê±?
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ?¤í–‰ ë©”í??°ì´??(recordedAt ì¤‘ì‹¬) */}
          {job.executionMetadata && (
            <div className="mb-4 rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-2 text-xs font-semibold text-gray-400">?¤í–‰ ë©”í??°ì´??(ê²°ê³¼ ê¸°ë¡)</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                {job.executionMetadata.recordedAt && (
                  <div>
                    <span className="text-gray-500">ê¸°ë¡ ?œê° (recordedAt): </span>
                    <span className="text-gray-300">{new Date(job.executionMetadata.recordedAt).toLocaleString()}</span>
                  </div>
                )}
                {job.executionMetadata.resultSummary && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">ê²°ê³¼ ì§‘ê³„ (resultSummary): </span>
                    <span className="text-gray-300">
                      ?±ê³µ {job.executionMetadata.resultSummary.successCount} /
                      ?¤íŒ¨ {job.executionMetadata.resultSummary.failedCount} /
                      ?¤í‚µ {job.executionMetadata.resultSummary.skippedCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ?¬ì‹¤??ì°¨ë‹¨ ?”ì•½ (?¤í–‰ ê²°ê³¼ ?¹ì…˜ ?˜ë‹¨) */}
          <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">
            <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              ?¬ì‹¤??ì°¨ë‹¨ ???´ë? ?¤í–‰ ê¸°ë¡???ˆëŠ” BatchJob?…ë‹ˆ??
            </p>
            <p>?ˆì „???„í•´ ?¬ì‹¤?‰ì? ë³„ë„ ?¹ì¸ ?ë¦„?ì„œë§?ê°€?¥í•©?ˆë‹¤. Mock ?¤í–‰ ê²°ê³¼?¼ë„ ?¬ì‹¤?‰ì? ê¸°ë³¸ ì°¨ë‹¨?…ë‹ˆ??</p>
            <p className="mt-1 font-mono text-red-300">
              ?œë²„ ì°¨ë‹¨ ì½”ë“œ: BATCH_JOB_ALREADY_EXECUTED / BATCH_JOB_ALREADY_EXECUTING
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">??ª© ëª©ë¡ ({job.items.length}ê±?</h2>
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
                  {expandedItems.has(item.id) ? 'JSON ?«ê¸°' : 'JSON ë³´ê¸°'}
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-4 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="border-b border-[#262629] pb-1 text-sm font-semibold text-gray-300">?í’ˆ ?•ë³´ (Candidate)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">?í’ˆëª?/span>
                  <span className="col-span-2 text-gray-200">{item.candidateSummary?.productName || '-'}</span>
                  <span className="text-gray-500">ë§¤ì¹­ ?¤ì›Œ??/span>
                  <span className="col-span-2 font-semibold text-indigo-300">{item.candidateSummary?.keyword || '-'}</span>
                  <span className="text-gray-500">SKU/?ë³„??/span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.sku || '-'}</span>
                  <span className="text-gray-500">ë°”ì½”??/span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.barcode || '-'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="border-b border-[#262629] pb-1 text-sm font-semibold text-gray-300">ë³€ê²??ˆì • (Dry-run)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">ë³€ê²???ª©</span>
                  <span className="col-span-2 font-semibold text-emerald-400">{item.candidateSummary?.changeType || '-'}</span>
                  <span className="text-gray-500">ê°€ê²?ë³€ê²?/span>
                  <span className="col-span-2 text-gray-200">
                    <span className="text-gray-500 line-through">{item.dryRunSummary?.before?.price?.toLocaleString() || '-'}</span>
                    {' -> '}
                    <span className="font-semibold text-white">{item.dryRunSummary?.after?.price?.toLocaleString() || '-'}</span>
                  </span>
                  <span className="text-gray-500">?¬ê³  ë³€ê²?/span>
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
                    <div key={warning} className="mt-1 text-xs text-amber-200/80">??{warning}</div>
                  ))}
                  {item.dryRunSummary?.blockedReasons?.map((blockedReason) => (
                    <div key={blockedReason} className="mt-1 text-xs text-red-400">??BLOCKED: {blockedReason}</div>
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
            <h3 className="mb-4 text-xl font-semibold text-white">ìµœì¢… ?¹ì¸ Artifact ?ì„± ???•ì¸</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                ???¨ê³„???ˆì „???¹ì¸???„í•´ ?¤ìŒ ?œì•½ ?¬í•­??ì¤€?˜í•©?ˆë‹¤.
              </p>
              <ul className="list-inside list-disc space-y-1 text-red-300">
                <li>???‘ì—…?€ ?¤ì´ë²?APIë¥??¸ì¶œ?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>???‘ì—…?€ EXECUTING?¼ë¡œ ?„í™˜?˜ì? ?ŠìŠµ?ˆë‹¤.</li>
                <li>???‘ì—…?€ Job/Item statusë¥?ë³€ê²½í•˜ì§€ ?ŠìŠµ?ˆë‹¤.</li>
                <li>???‘ì—…?€ FinalApproval artifactë§??ì„±?˜ëŠ” ?¨ê³„?…ë‹ˆ??</li>
                <li>ê¸°ì¡´ ACTIVE artifactê°€ ?ˆìœ¼ë©??ì„±?????†ìŠµ?ˆë‹¤.</li>
                <li>validationExpiresAt ?´í›„?ëŠ” ?¤í–‰ ?ê²©?¼ë¡œ ?¬ìš©?˜ë©´ ???©ë‹ˆ??</li>
              </ul>
              <p className="mt-4 text-indigo-300">
                ?œë²„?ì„œ <span className="font-mono">candidate</span>, <span className="font-mono">dryRunItem</span>, ?˜ì§‘ ë¬¸ë§¥, gate ?¤ì •???¤ì‹œ ê²€ì¦í•©?ˆë‹¤.
              </p>

              {finalApprovalCreateError && (
                <div className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                  <span className="font-semibold text-red-300">?¤ë¥˜ ë°œìƒ: </span>
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
                ì·¨ì†Œ
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
                    ?ì„± ì¤?..
                  </>
                ) : (
                  'ìµœì¢… ?¹ì¸ Artifact ?ì„±'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
