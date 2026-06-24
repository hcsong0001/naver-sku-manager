import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  evaluateFinalApprovalLivePreflightCheck,
  summarizeLivePreflightReadiness,
} from '@/src/services/sku-keyword-final-approval-execution-live-preflight-check.service';
import {
  evaluateLiveSingleTestApprovalGuard,
  summarizeLiveSingleTestApprovalReadiness,
} from '@/src/services/sku-keyword-final-approval-execution-live-single-test-approval-guard.service';
import {
  evaluateExecutionEnvironmentSafetyGuard,
} from '@/src/services/sku-keyword-final-approval-execution-environment-safety-guard.service';
import {
  buildLiveSingleTestAuditHistoryItem,
} from '@/src/services/sku-keyword-final-approval-execution-live-single-test-audit-history.service';
import {
  buildLiveAdapterSkeletonDisabledResult,
} from '@/src/services/sku-keyword-final-approval-execution-naver-api-live-adapter-skeleton.service';
import { evaluateNaverApiAuthConfigSafeReader } from '@/src/services/sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';
import { createNaverApiTokenProviderDisabled } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';
import { evaluateNaverApiTokenDryPermissionGate } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service';
import { createNaverApiTokenProviderTestOnlySkeleton } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.service';
import { sanitizeStoredAuditRecord } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-test-approval-audit.service';
import { evaluateNaverApiTokenFirstTestSafetyBoundary } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';

// Compute safe DB environment hint from DATABASE_URL without exposing the original value.
// Returns a classification key, never the actual URL.
function getDatabaseUrlSafeHint(): string | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('localhost') || lower.includes('127.0.0.1') || lower.includes('::1')) return 'local_host';
  if (lower.includes('test') || lower.includes('dev') || lower.includes('staging')) return 'test_or_dev';
  if (lower.includes('prod') || lower.includes('production') || lower.includes('operating') || lower.includes('live')) return 'possible_prod';
  return 'unknown_host';
}

function getRedisUrlSafeHint(): string | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('localhost') || lower.includes('127.0.0.1')) return 'local_host';
  if (lower.includes('test') || lower.includes('dev') || lower.includes('staging')) return 'test_or_dev';
  if (lower.includes('prod') || lower.includes('production') || lower.includes('operating')) return 'possible_prod';
  return 'unknown_host';
}

function extractSafeMetadata(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  if (typeof m.executionMode === 'string') out.executionMode = m.executionMode;
  if (typeof m.actorId === 'string') out.actorId = m.actorId;
  if (typeof m.durationMs === 'number') out.durationMs = m.durationMs;
  if (typeof m.startedAt === 'string') out.startedAt = m.startedAt;
  if (typeof m.endedAt === 'string') out.endedAt = m.endedAt;
  if (typeof m.finalApprovalId === 'string') out.finalApprovalId = m.finalApprovalId;
  if (typeof m.recordedAt === 'string') out.recordedAt = m.recordedAt;
  if (m.resultSummary && typeof m.resultSummary === 'object' && !Array.isArray(m.resultSummary)) {
    const rs = m.resultSummary as Record<string, unknown>;
    out.resultSummary = {
      successCount: typeof rs.successCount === 'number' ? rs.successCount : 0,
      failedCount: typeof rs.failedCount === 'number' ? rs.failedCount : 0,
      skippedCount: typeof rs.skippedCount === 'number' ? rs.skippedCount : 0,
    };
  }
  return Object.keys(out).length > 0 ? out : null;
}

function extractSafeAuditRecord(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  if (typeof m.auditCode === 'string') out.auditCode = m.auditCode;
  if (typeof m.auditStatus === 'string') out.auditStatus = m.auditStatus;
  if (typeof m.auditMessage === 'string') out.auditMessage = m.auditMessage;
  if (typeof m.finalApprovalId === 'string') out.finalApprovalId = m.finalApprovalId;
  if (typeof m.batchJobId === 'string') out.batchJobId = m.batchJobId;
  if (typeof m.actorId === 'string') out.actorId = m.actorId;
  if (typeof m.recordedAt === 'string') out.recordedAt = m.recordedAt;
  if (typeof m.maxAllowedState === 'string') out.maxAllowedState = m.maxAllowedState;
  out.naverApiCallAllowed = false;
  out.liveExecutionEnabled = false;
  if (Array.isArray(m.acknowledgedItems)) {
    out.acknowledgedItems = m.acknowledgedItems.filter((x): x is string => typeof x === 'string');
  }
  if (Array.isArray(m.missingAcknowledgements)) {
    out.missingAcknowledgements = m.missingAcknowledgements.filter((x): x is string => typeof x === 'string');
  }
  if (Array.isArray(m.warnings)) {
    out.warnings = m.warnings.filter((x): x is string => typeof x === 'string');
  }

  // Safe target product summary (explicit safe fields only, no secrets)
  if (m.targetProductSummary && typeof m.targetProductSummary === 'object' && !Array.isArray(m.targetProductSummary)) {
    const tps = m.targetProductSummary as Record<string, unknown>;
    out.targetProductSummary = {
      itemId: typeof tps.itemId === 'string' ? tps.itemId : null,
      targetType: typeof tps.targetType === 'string' ? tps.targetType : null,
      targetId: typeof tps.targetId === 'string' ? tps.targetId : null,
      channelProductNo: typeof tps.channelProductNo === 'string' ? tps.channelProductNo : null,
      productName: typeof tps.productName === 'string' ? tps.productName : null,
      skuCode: typeof tps.skuCode === 'string' ? tps.skuCode : null,
      changeType: typeof tps.changeType === 'string' ? tps.changeType : null,
    };
  }

  // Safe payload summary (only changeType + riskLevel)
  if (m.safePayloadSummary && typeof m.safePayloadSummary === 'object' && !Array.isArray(m.safePayloadSummary)) {
    const sps = m.safePayloadSummary as Record<string, unknown>;
    out.safePayloadSummary = {
      changeType: typeof sps.changeType === 'string' ? sps.changeType : null,
      riskLevel: typeof sps.riskLevel === 'string' ? sps.riskLevel : null,
    };
  }

  return Object.keys(out).length > 0 ? out : null;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;
    const job = await prisma.naverApiBatchJob.findUnique({
      where: { id: jobId },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
        finalApprovals: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!job) {
      return NextResponse.json({ ok: false, error: 'Job not found' }, { status: 404 });
    }

    const items = job.items.map(item => {
      const requestPayload = item.requestPayload as Record<string, unknown> | null;
      const candidate = requestPayload?.candidate as Record<string, unknown> | undefined;
      const dryRunItem = requestPayload?.dryRunItem as Record<string, unknown> | undefined;

      return {
        id: item.id,
        status: item.status,
        calculationType: item.calculationType ?? undefined,
        targetType: item.targetType ?? undefined,
        targetId: item.targetId ?? undefined,
        requestPayload: item.requestPayload,
        candidateSummary: candidate ? {
          sku: candidate.skuCode || candidate.channelProductNo,
          barcode: candidate.barcode,
          productName: candidate.productName,
          keyword: candidate.matchedKeyword,
          targetType: candidate.candidateType,
          changeType: dryRunItem?.changeType,
        } : undefined,
        dryRunSummary: dryRunItem ? {
          riskLevel: dryRunItem.riskLevel,
          warnings: dryRunItem.warnings,
          blockedReasons: dryRunItem.blockedReasons,
          before: dryRunItem.before,
          after: dryRunItem.after,
        } : undefined,
      };
    });

    const safeMetadata = extractSafeMetadata(job.metadata);
    const activeFinalApproval =
      (job.finalApprovals ?? []).find(a => String(a.status) === 'ACTIVE') ?? null;

    const adapterMode =
      typeof safeMetadata?.executionMode === 'string' ? safeMetadata.executionMode : null;
    const naverApiCalled = adapterMode === 'live';

    const preflightInput = {
      finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
      batchJobStatus: String(job.status),
      itemStatuses: job.items.map(item => String(item.status)),
      totalItems: job.totalItems,
      successItems: job.successItems,
      failedItems: job.failedItems,
      skippedItems: job.skippedItems,
      executedAt: job.executedAt?.toISOString() ?? null,
      executionMetadata: safeMetadata
        ? {
            executionMode:
              typeof safeMetadata.executionMode === 'string'
                ? safeMetadata.executionMode
                : null,
            actorId:
              typeof safeMetadata.actorId === 'string' ? safeMetadata.actorId : null,
          }
        : null,
      adapterMode,
      naverApiCalled,
    };

    const preflightResult = evaluateFinalApprovalLivePreflightCheck(preflightInput);
    const preflightSummary = summarizeLivePreflightReadiness(preflightResult);

    // Safe payload summary (no secrets, endpoints, or tokens)
    const firstItem = job.items[0] ?? null;
    const firstItemPayload = firstItem?.requestPayload as Record<string, unknown> | null;
    const firstCandidate = firstItemPayload?.candidate as Record<string, unknown> | undefined;
    const firstDryRunItem = firstItemPayload?.dryRunItem as Record<string, unknown> | undefined;
    const targetProductSummary = firstItem
      ? {
          itemId: firstItem.id,
          targetType: firstItem.targetType,
          targetId: firstItem.targetId,
          channelProductNo: firstItem.channelProductNo ?? null,
          productName: typeof firstCandidate?.productName === 'string'
            ? firstCandidate.productName
            : null,
          skuCode: typeof firstCandidate?.skuCode === 'string'
            ? firstCandidate.skuCode
            : null,
          changeType: typeof firstDryRunItem?.changeType === 'string'
            ? firstDryRunItem.changeType
            : null,
          priceChange: firstDryRunItem?.before && firstDryRunItem?.after
            ? {
                before: (firstDryRunItem.before as Record<string, unknown>).price ?? null,
                after: (firstDryRunItem.after as Record<string, unknown>).price ?? null,
              }
            : null,
          stockChange: firstDryRunItem?.before && firstDryRunItem?.after
            ? {
                before: (firstDryRunItem.before as Record<string, unknown>).stock ?? null,
                after: (firstDryRunItem.after as Record<string, unknown>).stock ?? null,
              }
            : null,
        }
      : null;

    const approvalGuardInput = {
      finalApprovalId: activeFinalApproval?.id ?? null,
      finalApprovalStatus: activeFinalApproval?.status
        ? String(activeFinalApproval.status)
        : null,
      batchJobId: job.id,
      batchJobStatus: String(job.status),
      itemStatuses: job.items.map(item => String(item.status)),
      totalItems: job.totalItems,
      successItems: job.successItems,
      failedItems: job.failedItems,
      executedAt: job.executedAt?.toISOString() ?? null,
      executionMetadata: safeMetadata
        ? {
            executionMode:
              typeof safeMetadata.executionMode === 'string'
                ? safeMetadata.executionMode
                : null,
            actorId:
              typeof safeMetadata.actorId === 'string' ? safeMetadata.actorId : null,
          }
        : null,
      adapterMode,
      naverApiCalled,
      livePreflightResult: {
        ready: preflightResult.ready,
        blockingReasons: preflightResult.blockingReasons,
      },
      acknowledgedItems: [], // No DB storage — acknowledgements are UI-only state
    };

    const approvalGuardResult = evaluateLiveSingleTestApprovalGuard(approvalGuardInput);
    const approvalGuardSummary = summarizeLiveSingleTestApprovalReadiness(approvalGuardResult);

    // Read audit record from metadata (written by POST /live-single-test-approval)
    const rawMetadata = job.metadata as Record<string, unknown> | null;
    const liveSingleTestApprovalAudit = extractSafeAuditRecord(
      rawMetadata?.liveSingleTestApprovalAudit
    );

    // Read token test approval audit from metadata (written by POST /naver-auth-token-test-approval)
    const naverAuthTokenTestApprovalAudit = sanitizeStoredAuditRecord(
      rawMetadata?.naverAuthTokenTestApprovalAudit
    );

    // Build audit history (read-only summary from metadata)
    const auditHistory = buildLiveSingleTestAuditHistoryItem({
      batchJobId: job.id,
      metadata: job.metadata,
    });

    // Evaluate execution environment safety (safe hints only — no raw URLs or secrets exposed)
    const envSafetyResult = evaluateExecutionEnvironmentSafetyGuard({
      nodeEnv: process.env.NODE_ENV ?? null,
      appEnv: process.env.APP_ENV ?? null,
      executionMode: process.env.EXECUTION_MODE ?? null,
      adapterMode,
      databaseUrlPresent: !!process.env.DATABASE_URL,
      databaseUrlSafeHint: getDatabaseUrlSafeHint(),
      redisUrlPresent: !!process.env.REDIS_URL,
      redisUrlSafeHint: getRedisUrlSafeHint(),
      requestedAction: 'approval-audit-record-only',
    });

    // Evaluate Naver API auth config safety (existence check only — no credential values exposed)
    const naverAuthConfigSafety = evaluateNaverApiAuthConfigSafeReader({
      envLike: {
        NAVER_API_CLIENT_ID: process.env.NAVER_API_CLIENT_ID,
        NAVER_API_CLIENT_SECRET: process.env.NAVER_API_CLIENT_SECRET,
      },
      requiredConfigKeys: ['NAVER_API_CLIENT_ID', 'NAVER_API_CLIENT_SECRET'],
      allowCredentialUse: false,
      allowTokenRequest: false,
      allowEndpointCall: false,
      environmentSafetyResult: { ok: envSafetyResult.allowed },
      liveAdapterSkeletonStatus: 'disabled',
    });

    const responseJob = {
      id: job.id,
      status: job.status,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
      itemCount: job.totalItems,
      successItems: job.successItems,
      failedItems: job.failedItems,
      skippedItems: job.skippedItems,
      executedAt: job.executedAt?.toISOString() ?? null,
      executionMetadata: safeMetadata,
      items,
      livePreflight: {
        ready: preflightResult.ready,
        readinessCode: preflightResult.readinessCode,
        readinessMessage: preflightResult.readinessMessage,
        checklistItems: preflightResult.checklistItems,
        blockingReasons: preflightResult.blockingReasons,
        warnings: preflightResult.warnings,
        naverApiCallAllowed: preflightResult.naverApiCallAllowed,
        naverApiCalled: preflightResult.naverApiCalled,
        summary: preflightSummary,
      },
      liveSingleTestApproval: {
        approvalReady: approvalGuardResult.approvalReady,
        approvalCode: approvalGuardResult.approvalCode,
        approvalMessage: approvalGuardResult.approvalMessage,
        checklistItems: approvalGuardResult.checklistItems,
        blockingReasons: approvalGuardResult.blockingReasons,
        warnings: approvalGuardResult.warnings,
        requiredAcknowledgements: approvalGuardResult.requiredAcknowledgements,
        acknowledgedCount: approvalGuardResult.acknowledgedCount,
        missingAcknowledgements: approvalGuardResult.missingAcknowledgements,
        naverApiCallAllowed: approvalGuardResult.naverApiCallAllowed,
        liveExecutionEnabled: approvalGuardResult.liveExecutionEnabled,
        maxAllowedState: approvalGuardResult.maxAllowedState,
        summary: approvalGuardSummary,
        targetProductSummary,
      },
      liveSingleTestApprovalAudit,
      liveSingleTestAuditHistory: {
        exists: auditHistory.exists,
        latestAudit: auditHistory.latestAudit,
        summary: auditHistory.summary,
        blockingReasons: auditHistory.blockingReasons,
        warnings: auditHistory.warnings,
        naverApiCallAllowed: false as const,
        liveExecutionEnabled: false as const,
        operatingDbWriteAllowed: false as const,
        queueAllowed: false as const,
        workerAllowed: false as const,
        sanitized: true as const,
        maxAllowedState: 'LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY' as const,
      },
      environmentSafety: {
        allowed: envSafetyResult.allowed,
        environmentCode: envSafetyResult.environmentCode,
        environmentMessage: envSafetyResult.environmentMessage,
        databaseEnvironment: envSafetyResult.databaseEnvironment,
        redisEnvironment: envSafetyResult.redisEnvironment,
        naverApiCallAllowed: false as const,
        operatingDbWriteAllowed: false as const,
        queueAllowed: false as const,
        workerAllowed: false as const,
        checklistItems: envSafetyResult.checklistItems,
        blockingReasons: envSafetyResult.blockingReasons,
        warnings: envSafetyResult.warnings,
        sanitized: true as const,
      },
      liveAdapterSkeletonStatus: buildLiveAdapterSkeletonDisabledResult({
        batchJobId: job.id,
        finalApprovalId: activeFinalApproval?.id ?? null,
        adapterMode,
      }),
      naverAuthConfigSafety: {
        credentialConfigured: naverAuthConfigSafety.credentialConfigured,
        authConfigUsable: naverAuthConfigSafety.authConfigUsable,
        authConfigStatus: naverAuthConfigSafety.authConfigStatus,
        clientIdStatus: naverAuthConfigSafety.clientIdStatus,
        clientSecretStatus: naverAuthConfigSafety.clientSecretStatus,
        tokenStatus: naverAuthConfigSafety.tokenStatus,
        naverApiCallAllowed: naverAuthConfigSafety.naverApiCallAllowed,
        liveExecutionEnabled: naverAuthConfigSafety.liveExecutionEnabled,
        accessTokenRequested: naverAuthConfigSafety.accessTokenRequested,
        credentialsUsed: naverAuthConfigSafety.credentialsUsed,
        tokenIssued: naverAuthConfigSafety.tokenIssued,
        authorizationHeaderCreated: naverAuthConfigSafety.authorizationHeaderCreated,
        endpointCalled: naverAuthConfigSafety.endpointCalled,
        secretVisible: naverAuthConfigSafety.secretVisible,
        sanitized: naverAuthConfigSafety.sanitized,
        checklistItems: naverAuthConfigSafety.checklistItems,
        blockingReasons: naverAuthConfigSafety.blockingReasons,
        warnings: naverAuthConfigSafety.warnings,
        maxAllowedState: naverAuthConfigSafety.maxAllowedState,
      },
      naverAuthTokenProviderStatus: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        return {
          status: tokenProvider.status,
          resultCode: tokenProvider.resultCode,
          resultMessage: tokenProvider.resultMessage,
          tokenStatus: tokenProvider.tokenStatus,
          authConfigUsable: tokenProvider.authConfigUsable,
          accessTokenRequested: tokenProvider.accessTokenRequested,
          refreshTokenRequested: tokenProvider.refreshTokenRequested,
          credentialsUsed: tokenProvider.credentialsUsed,
          tokenIssued: tokenProvider.tokenIssued,
          tokenStored: tokenProvider.tokenStored,
          authorizationHeaderCreated: tokenProvider.authorizationHeaderCreated,
          httpRequestCreated: tokenProvider.httpRequestCreated,
          endpointCalled: tokenProvider.endpointCalled,
          naverApiCallAllowed: tokenProvider.naverApiCallAllowed,
          liveExecutionEnabled: tokenProvider.liveExecutionEnabled,
          secretVisible: tokenProvider.secretVisible,
          tokenVisible: tokenProvider.tokenVisible,
          sanitized: tokenProvider.sanitized,
          checklistItems: tokenProvider.checklistItems,
          blockingReasons: tokenProvider.blockingReasons,
          warnings: tokenProvider.warnings,
          maxAllowedState: tokenProvider.maxAllowedState,
        };
      })(),
      naverAuthTokenDryPermissionGate: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const gate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        return {
          ok: gate.ok,
          allowed: gate.allowed,
          status: gate.status,
          resultCode: gate.resultCode,
          resultMessage: gate.resultMessage,
          dryCheckPassed: gate.dryCheckPassed,
          tokenRequestAllowed: gate.tokenRequestAllowed,
          tokenStatus: gate.tokenStatus,
          authConfigUsable: gate.authConfigUsable,
          naverApiCallAllowed: gate.naverApiCallAllowed,
          liveExecutionEnabled: gate.liveExecutionEnabled,
          httpRequestCreated: gate.httpRequestCreated,
          endpointCalled: gate.endpointCalled,
          accessTokenRequested: gate.accessTokenRequested,
          refreshTokenRequested: gate.refreshTokenRequested,
          credentialsUsed: gate.credentialsUsed,
          tokenIssued: gate.tokenIssued,
          tokenStored: gate.tokenStored,
          authorizationHeaderCreated: gate.authorizationHeaderCreated,
          operatingDbWriteAllowed: gate.operatingDbWriteAllowed,
          queueAllowed: gate.queueAllowed,
          workerAllowed: gate.workerAllowed,
          secretVisible: gate.secretVisible,
          tokenVisible: gate.tokenVisible,
          sanitized: gate.sanitized,
          checklistItems: gate.checklistItems,
          blockingReasons: gate.blockingReasons,
          warnings: gate.warnings,
          needsReviewReasons: gate.needsReviewReasons,
          maxAllowedState: gate.maxAllowedState,
        };
      })(),
      naverAuthTokenTestOnlySkeletonStatus: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const dryGate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const skeleton = createNaverApiTokenProviderTestOnlySkeleton({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          environmentSafetyResult: envSafetyResult,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        return {
          ok: skeleton.ok,
          success: skeleton.success,
          status: skeleton.status,
          resultCode: skeleton.resultCode,
          resultMessage: skeleton.resultMessage,
          testOnlyMode: skeleton.testOnlyMode,
          tokenRequestPrepared: skeleton.tokenRequestPrepared,
          tokenRequestExecuted: skeleton.tokenRequestExecuted,
          tokenRequestAllowed: skeleton.tokenRequestAllowed,
          tokenStatus: skeleton.tokenStatus,
          authConfigUsable: skeleton.authConfigUsable,
          dryPermissionPassed: skeleton.dryPermissionPassed,
          accessTokenRequested: skeleton.accessTokenRequested,
          refreshTokenRequested: skeleton.refreshTokenRequested,
          credentialsUsed: skeleton.credentialsUsed,
          tokenIssued: skeleton.tokenIssued,
          tokenStored: skeleton.tokenStored,
          authorizationHeaderCreated: skeleton.authorizationHeaderCreated,
          endpointResolved: skeleton.endpointResolved,
          endpointCalled: skeleton.endpointCalled,
          httpRequestCreated: skeleton.httpRequestCreated,
          httpClientCreated: skeleton.httpClientCreated,
          naverApiCallAllowed: skeleton.naverApiCallAllowed,
          liveExecutionEnabled: skeleton.liveExecutionEnabled,
          operatingDbWriteAllowed: skeleton.operatingDbWriteAllowed,
          queueAllowed: skeleton.queueAllowed,
          workerAllowed: skeleton.workerAllowed,
          secretVisible: skeleton.secretVisible,
          tokenVisible: skeleton.tokenVisible,
          endpointVisible: skeleton.endpointVisible,
          sanitized: skeleton.sanitized,
          checklistItems: skeleton.checklistItems,
          blockingReasons: skeleton.blockingReasons,
          warnings: skeleton.warnings,
          needsReviewReasons: skeleton.needsReviewReasons,
          maxAllowedState: skeleton.maxAllowedState,
        };
      })(),
      naverAuthTokenTestApprovalAudit: naverAuthTokenTestApprovalAudit
        ? {
            hasAudit: true,
            auditCode: naverAuthTokenTestApprovalAudit.auditCode,
            recordedAt: naverAuthTokenTestApprovalAudit.recordedAt,
            recordedBy: naverAuthTokenTestApprovalAudit.recordedBy,
            approvalPurpose: naverAuthTokenTestApprovalAudit.approvalPurpose,
            acknowledgedItems: naverAuthTokenTestApprovalAudit.acknowledgedItems,
            maxAllowedState: naverAuthTokenTestApprovalAudit.maxAllowedState,
            tokenRequestAllowed: naverAuthTokenTestApprovalAudit.tokenRequestAllowed,
            accessTokenRequested: naverAuthTokenTestApprovalAudit.accessTokenRequested,
            tokenIssued: naverAuthTokenTestApprovalAudit.tokenIssued,
            endpointCalled: naverAuthTokenTestApprovalAudit.endpointCalled,
            httpClientCreated: naverAuthTokenTestApprovalAudit.httpClientCreated,
            naverApiCallAllowed: naverAuthTokenTestApprovalAudit.naverApiCallAllowed,
            liveExecutionEnabled: naverAuthTokenTestApprovalAudit.liveExecutionEnabled,
            sanitized: naverAuthTokenTestApprovalAudit.sanitized,
          }
        : { hasAudit: false },
      // ── Token 최초 발급 테스트 Safety Boundary (read-only) ──────────────────────
      naverAuthTokenFirstTestSafetyBoundary: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const dryGate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const skeleton = createNaverApiTokenProviderTestOnlySkeleton({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          environmentSafetyResult: envSafetyResult,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        // Token Test Approval Audit — 참조용 ref 구성 (민감 정보 없음)
        const auditRef = naverAuthTokenTestApprovalAudit
          ? {
              hasAudit: true as const,
              auditCode: naverAuthTokenTestApprovalAudit.auditCode,
              acknowledgedCount:
                Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems)
                  ? naverAuthTokenTestApprovalAudit.acknowledgedItems.length
                  : 0,
              requiredCount: 12,
              allAcknowledged:
                Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems) &&
                naverAuthTokenTestApprovalAudit.acknowledgedItems.length >= 12,
            }
          : { hasAudit: false as const };

        const boundary = evaluateNaverApiTokenFirstTestSafetyBoundary({
          environmentSafetyResult: envSafetyResult,
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          tokenTestOnlySkeletonStatus: skeleton,
          tokenTestApprovalAudit: auditRef,
          liveAdapterSkeletonStatus: 'disabled',
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          allowHttpClient: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        return {
          ok: boundary.ok,
          readyForExplicitTokenTestApproval: boundary.readyForExplicitTokenTestApproval,
          allowed: boundary.allowed,
          status: boundary.status,
          resultCode: boundary.resultCode,
          resultMessage: boundary.resultMessage,
          tokenTestApprovalPresent: boundary.tokenTestApprovalPresent,
          tokenTestApprovalComplete: boundary.tokenTestApprovalComplete,
          allPreconditionsPassed: boundary.allPreconditionsPassed,
          tokenRequestAllowed: boundary.tokenRequestAllowed,
          tokenRequestPrepared: boundary.tokenRequestPrepared,
          tokenRequestExecuted: boundary.tokenRequestExecuted,
          accessTokenRequested: boundary.accessTokenRequested,
          refreshTokenRequested: boundary.refreshTokenRequested,
          credentialsUsed: boundary.credentialsUsed,
          tokenIssued: boundary.tokenIssued,
          tokenStored: boundary.tokenStored,
          authorizationHeaderCreated: boundary.authorizationHeaderCreated,
          endpointResolved: boundary.endpointResolved,
          endpointCalled: boundary.endpointCalled,
          httpRequestCreated: boundary.httpRequestCreated,
          httpClientCreated: boundary.httpClientCreated,
          naverApiCallAllowed: boundary.naverApiCallAllowed,
          liveExecutionEnabled: boundary.liveExecutionEnabled,
          queueAllowed: boundary.queueAllowed,
          workerAllowed: boundary.workerAllowed,
          secretVisible: boundary.secretVisible,
          tokenVisible: boundary.tokenVisible,
          endpointVisible: boundary.endpointVisible,
          sanitized: boundary.sanitized,
          checklistItems: boundary.checklistItems,
          blockingReasons: boundary.blockingReasons,
          warnings: boundary.warnings,
          needsReviewReasons: boundary.needsReviewReasons,
          maxAllowedState: boundary.maxAllowedState,
        };
      })(),
    };

    return NextResponse.json({ ok: true, job: responseJob });
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
