import { NextResponse } from 'next/server';
import { retryFailedProductCollectionJob } from '@/src/services/naver-product-list.service';

export const runtime = 'nodejs';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const job = await retryFailedProductCollectionJob(id);

    if (!job) {
      return NextResponse.json({ error: '수집 작업을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    const message = error instanceof Error ? error.message : '실패 상품 재시도에 실패했습니다.';
    console.error('실패 상품 재시도 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
