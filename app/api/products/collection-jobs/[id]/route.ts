import { NextResponse } from 'next/server';
import { getProductCollectionJob } from '@/src/services/naver-product-list.service';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const job = await getProductCollectionJob(id);

    if (!job) {
      return NextResponse.json({ error: '수집 작업을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    const message = error instanceof Error ? error.message : '수집 작업 상세 조회에 실패했습니다.';
    console.error('수집 작업 상세 조회 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
