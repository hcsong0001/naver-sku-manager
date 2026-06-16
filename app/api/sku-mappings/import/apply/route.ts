import { NextResponse } from 'next/server';
import { applySkuMappingRows } from '@/src/services/sku-mapping.service';
import {
  SKU_MAPPING_HEADERS,
  type SkuMappingParsedRow,
} from '@/src/types/sku-mapping.types';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toStringCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function toRows(payload: unknown): SkuMappingParsedRow[] | null {
  if (!isRecord(payload) || !Array.isArray(payload.rows)) {
    return null;
  }

  return payload.rows.map((row, index) => {
    const record = isRecord(row) ? row : {};
    const rowNumberValue = Number(record.rowNumber);
    const parsed = Object.fromEntries(
      SKU_MAPPING_HEADERS.map((header) => [header, toStringCell(record[header])])
    ) as Omit<SkuMappingParsedRow, 'rowNumber'>;

    return {
      ...parsed,
      rowNumber: Number.isFinite(rowNumberValue) ? rowNumberValue : index + 2,
    };
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as unknown;
    const rows = toRows(payload);

    if (!rows) {
      return NextResponse.json(
        { error: '적용할 정상 행 데이터가 없습니다.' },
        { status: 400 }
      );
    }

    const { preview, result } = await applySkuMappingRows(rows);

    if (!result) {
      return NextResponse.json(
        { error: '검증 오류가 있는 행은 적용할 수 없습니다.', preview },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SKU 매핑 적용에 실패했습니다.';
    console.error('SKU 매핑 적용 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
