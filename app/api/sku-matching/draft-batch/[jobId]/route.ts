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
    };

    return NextResponse.json({ ok: true, job: responseJob });
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
