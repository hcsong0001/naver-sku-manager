import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.naverApiBatchJob.findMany({
      where: {
        status: 'DRAFT',
        module: 'SKU_KEYWORD_MATCHING',
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

    return NextResponse.json({ ok: true, jobs: responseJobs });
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
