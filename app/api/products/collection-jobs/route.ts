import { NextResponse } from 'next/server';
import {
  createProductCollectionJob,
  listProductCollectionJobs,
  normalizeProductListSearchCondition,
} from '@/src/services/naver-product-list.service';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const jobs = await listProductCollectionJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    const message = error instanceof Error ? error.message : '수집 작업 목록 조회에 실패했습니다.';
    console.error('수집 작업 목록 조회 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const condition = normalizeProductListSearchCondition(payload);
    const job = await createProductCollectionJob(condition);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : '수집 작업 생성에 실패했습니다.';
    console.error('수집 작업 생성 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
