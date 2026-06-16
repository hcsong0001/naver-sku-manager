import { NextResponse } from 'next/server';
import { runProductCollectionJob } from '@/src/services/naver-product-list.service';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function readOptionalJson(request: Request): Promise<unknown> {
  const text = await request.text();
  if (!text.trim()) return {};
  return JSON.parse(text) as unknown;
}

function toPositiveInt(value: unknown): number | undefined {
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 1) return undefined;
  return Math.floor(numberValue);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await readOptionalJson(request);
    const maxPages = isRecord(payload) ? toPositiveInt(payload.maxPages) : undefined;
    const collectDetails = isRecord(payload) && typeof payload.collectDetails === 'boolean'
      ? payload.collectDetails
      : undefined;
    const job = await runProductCollectionJob(id, { maxPages, collectDetails });

    if (!job) {
      return NextResponse.json({ error: '수집 작업을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    const message = error instanceof Error ? error.message : '수집 작업 실행에 실패했습니다.';
    console.error('수집 작업 실행 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
