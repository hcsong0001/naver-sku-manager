import { NextResponse } from 'next/server';
import { getStagingMappingSummary } from '@/src/services/staging-mapping-preview.service';

export const runtime = 'nodejs';

export async function GET() {
  try {
    return NextResponse.json(await getStagingMappingSummary());
  } catch (error) {
    const message = error instanceof Error ? error.message : '전체 매핑 요약 조회에 실패했습니다.';
    console.error('전체 staging 매핑 요약 조회 오류:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
