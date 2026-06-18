import { NextResponse } from 'next/server';
import { getStagingMappingCandidates } from '@/src/services/staging-mapping-preview.service';
import {
  STAGING_MAPPING_FILTERS,
  type StagingMappingFilter,
} from '@/src/types/staging-mapping-preview.types';
import type { CommonPageSize } from '@/src/utils/pagination';

export const runtime = 'nodejs';

function parseFilter(value: string | null): StagingMappingFilter {
  return STAGING_MAPPING_FILTERS.includes(value as StagingMappingFilter)
    ? value as StagingMappingFilter
    : 'ALL';
}

function parsePage(value: string | null): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parsePageSize(value: string | null): CommonPageSize {
  if (value === 'ALL') return 'ALL';
  const parsed = Number(value);
  return [10, 20, 50, 100].includes(parsed) ? parsed as Exclude<CommonPageSize, 'ALL'> : 10;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getStagingMappingCandidates({
      filter: parseFilter(searchParams.get('filter')),
      page: parsePage(searchParams.get('page')),
      pageSize: parsePageSize(searchParams.get('pageSize')),
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '전체 매핑 후보 조회에 실패했습니다.';
    console.error('전체 staging 매핑 후보 조회 오류:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
