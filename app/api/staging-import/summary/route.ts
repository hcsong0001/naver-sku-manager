import { NextResponse } from 'next/server';
import { getStagingImportSummary } from '@/src/services/staging-import.service';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId')?.trim() || undefined;
    const result = await getStagingImportSummary(storeId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'staging import 요약 조회에 실패했습니다.';
    console.error('Staging import summary error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
