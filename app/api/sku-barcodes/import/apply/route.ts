import { NextResponse } from 'next/server';
import { applySkuBarcodeRows } from '@/src/services/sku-barcode-import.service';
import {
  SKU_BARCODE_IMPORT_HEADERS,
  type SkuBarcodeImportParsedRow,
} from '@/src/types/sku-barcode-import.types';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toStringCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function toRows(payload: unknown): SkuBarcodeImportParsedRow[] | null {
  if (!isRecord(payload) || !Array.isArray(payload.rows)) return null;

  return payload.rows.map((row, index) => {
    const record = isRecord(row) ? row : {};
    const rowNumber = Number(record.rowNumber);
    const parsed = Object.fromEntries(
      SKU_BARCODE_IMPORT_HEADERS.map((header) => [header, toStringCell(record[header])])
    ) as Omit<SkuBarcodeImportParsedRow, 'rowNumber'>;

    return {
      ...parsed,
      rowNumber: Number.isFinite(rowNumber) ? rowNumber : index + 2,
    };
  });
}

export async function POST(request: Request) {
  try {
    const rows = toRows(await request.json());

    if (!rows) {
      return NextResponse.json({ error: '적용할 행 데이터가 없습니다.' }, { status: 400 });
    }

    const { preview, result } = await applySkuBarcodeRows(rows);

    if (!result) {
      return NextResponse.json({ error: '검증 오류가 있는 행은 적용할 수 없습니다.', preview }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SKU 바코드 적용에 실패했습니다.';
    console.error('SKU 바코드 적용 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
