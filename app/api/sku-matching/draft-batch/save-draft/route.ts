import { NextResponse } from 'next/server';
import { saveSkuKeywordDraftBatchDraft } from '@/src/services/sku-keyword-draft-batch-save-draft.service';
import type { SkuKeywordDraftBatchSaveDraftRequest } from '@/src/types/sku-keyword-draft-preview.types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SkuKeywordDraftBatchSaveDraftRequest;
    
    const result = await saveSkuKeywordDraftBatchDraft(body);
    
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('saveSkuKeywordDraftBatchDraft error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
