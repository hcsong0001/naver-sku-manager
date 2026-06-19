import { NextResponse } from 'next/server';
import type { SkuKeywordDraftBatchDryRunPreviewRequest } from '@/src/types/sku-keyword-draft-preview.types';
import { buildSkuKeywordDraftBatchDryRunPreview } from '@/src/services/sku-keyword-draft-batch-dry-run-preview.service';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SkuKeywordDraftBatchDryRunPreviewRequest;

    if (!body || !Array.isArray(body.candidates)) {
      return NextResponse.json(
        { error: '올바른 요청 구조가 아닙니다. (candidates 배열 필수)' },
        { status: 400 },
      );
    }

    const response = buildSkuKeywordDraftBatchDryRunPreview(body.candidates);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Draft Batch Dry-run Preview API Error:', error);
    return NextResponse.json(
      { error: 'Dry-run preview 검증 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
