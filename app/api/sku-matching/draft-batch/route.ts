import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const ALLOWED_STATUS_FILTERS = ['DRAFT', 'APPROVED', 'ALL'] as const;

type DraftBatchStatusFilter = (typeof ALLOWED_STATUS_FILTERS)[number];

function parseStatusFilter(request: NextRequest): DraftBatchStatusFilter {
  const rawStatus = request.nextUrl.searchParams.get('status');
  if (!rawStatus) return 'DRAFT';

  const normalizedStatus = rawStatus.trim().toUpperCase();
  if (ALLOWED_STATUS_FILTERS.includes(normalizedStatus as DraftBatchStatusFilter)) {
    return normalizedStatus as DraftBatchStatusFilter;
  }

  throw new Error('허용되지 않은 status 값입니다. (DRAFT | APPROVED | ALL)');
}

export async function GET(request: NextRequest) {
  try {
    const statusFilter = parseStatusFilter(request);
    const jobs = await prisma.naverApiBatchJob.findMany({
      where: {
        module: 'SKU_KEYWORD_MATCHING',
        ...(statusFilter === 'ALL' ? {} : { status: statusFilter }),
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        totalItems: true,
        previewSummary: true,
      },
    });

    const responseJobs = jobs.map(job => ({
      id: job.id,
      status: job.status,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
      itemCount: job.totalItems,
      summary: job.previewSummary ?? undefined,
    }));

    return NextResponse.json({
      ok: true,
      status: statusFilter,
      jobs: responseJobs,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('허용되지 않은 status 값')) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
