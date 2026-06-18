import { NextResponse } from 'next/server';
import { getBulkUpdatePreviewSummary } from '@/src/services/bulk-update-preview.service';

export const runtime = 'nodejs';

export async function GET() {
  try {
    return NextResponse.json(await getBulkUpdatePreviewSummary());
  } catch (error) {
    const message = error instanceof Error ? error.message : '가격/재고 수정 Preview 요약 조회에 실패했습니다.';
    console.error('가격/재고 수정 Preview 요약 조회 오류:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
