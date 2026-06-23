import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
      executionMetadata: extractSafeMetadata(job.metadata),
      items,
    };

    return NextResponse.json({ ok: true, job: responseJob });
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
