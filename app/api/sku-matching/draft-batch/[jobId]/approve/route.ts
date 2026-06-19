import { NextResponse } from 'next/server';
import {
  approveSkuKeywordDraftBatch,
  SkuKeywordDraftBatchApproveNotFoundError,
} from '@/src/services/sku-keyword-draft-batch-approve.service';
import type {
  SkuKeywordDraftBatchApproveRequest,
} from '@/src/types/sku-keyword-draft-preview.types';

export async function POST(
  request: Request,
  context: { params: Promise<{ jobId: string }> },
) {
  try {
    const { jobId } = await context.params;
    const body = (await request.json()) as Partial<SkuKeywordDraftBatchApproveRequest>;

    const result = await approveSkuKeywordDraftBatch({
      jobId,
      confirmApproveOnly: body.confirmApproveOnly as true,
      acknowledgedWarnings: Array.isArray(body.acknowledgedWarnings)
        ? body.acknowledgedWarnings.filter((value): value is string => typeof value === 'string')
        : [],
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof SkuKeywordDraftBatchApproveNotFoundError) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : '승인 처리 중 알 수 없는 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}

