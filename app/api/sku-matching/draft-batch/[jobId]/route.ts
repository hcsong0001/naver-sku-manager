import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
