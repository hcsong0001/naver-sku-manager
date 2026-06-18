import { NextResponse } from 'next/server';
import { createBulkUpdateDraftBatch } from '@/src/services/bulk-update-preview.service';

export const runtime = 'nodejs';

type RequestBody = {
  candidateIds?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    const candidateIds = Array.isArray(body.candidateIds)
      ? body.candidateIds.filter((value): value is string => typeof value === 'string')
      : [];
    return NextResponse.json(await createBulkUpdateDraftBatch({ candidateIds }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'draft batch 생성에 실패했습니다.';
    console.error('가격/재고 수정 Preview draft batch 생성 오류:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
