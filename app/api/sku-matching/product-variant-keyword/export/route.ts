import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export const runtime = 'nodejs';

type ExportSummary = {
  totalCount: number;
  mappedCount: number;
  unmappedCount: number;
  unresolvedSkuCount: number;
  setProductCount: number;
  singleProductCount: number;
  selectableCount: number;
};

type ExportRow = {
  mappingType: string;
  itemName: string;
  serialNo: string;
  mappingStatus: string;
  isSetProduct: boolean;
  skuCode: string;
  skuName: string;
  quantity: number;
  existingSku: string;
  candidateSku: string;
  warningMessage: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toStringCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function toNumberCell(value: unknown): number {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return 0;
  return numberValue;
}

function toBooleanCell(value: unknown): boolean {
  return value === true || value === 'true';
}

function parseSummary(value: unknown): ExportSummary {
  if (!isRecord(value)) {
    return {
      totalCount: 0,
      mappedCount: 0,
      unmappedCount: 0,
      unresolvedSkuCount: 0,
      setProductCount: 0,
      singleProductCount: 0,
      selectableCount: 0,
    };
  }

  return {
    totalCount: toNumberCell(value.totalCount),
    mappedCount: toNumberCell(value.mappedCount),
    unmappedCount: toNumberCell(value.unmappedCount),
    unresolvedSkuCount: toNumberCell(value.unresolvedSkuCount),
    setProductCount: toNumberCell(value.setProductCount),
    singleProductCount: toNumberCell(value.singleProductCount),
    selectableCount: toNumberCell(value.selectableCount),
  };
}

function parseRows(value: unknown): ExportRow[] {
  if (!Array.isArray(value)) return [];

  return value.filter(isRecord).map((row) => ({
    mappingType: toStringCell(row.mappingType),
    itemName: toStringCell(row.itemName),
    serialNo: toStringCell(row.serialNo),
    mappingStatus: toStringCell(row.mappingStatus),
    isSetProduct: toBooleanCell(row.isSetProduct),
    skuCode: toStringCell(row.skuCode),
    skuName: toStringCell(row.skuName),
    quantity: toNumberCell(row.quantity),
    existingSku: toStringCell(row.existingSku),
    candidateSku: toStringCell(row.candidateSku),
    warningMessage: toStringCell(row.warningMessage),
  }));
}

function createWorkbookBuffer({
  channelProductNo,
  productName,
  summary,
  rows,
}: {
  channelProductNo: string;
  productName: string;
  summary: ExportSummary;
  rows: ExportRow[];
}): Buffer {
  const workbook = XLSX.utils.book_new();
  const summarySheet = XLSX.utils.aoa_to_sheet([
    ['항목', '값'],
    ['채널상품번호', channelProductNo],
    ['상품명', productName],
    ['전체 후보 수', summary.totalCount],
    ['매핑완료 후보 수', summary.mappedCount],
    ['미매핑 후보 수', summary.unmappedCount],
    ['SKU 미확정 후보 수', summary.unresolvedSkuCount],
    ['세트상품 후보 수', summary.setProductCount],
    ['단품 후보 수', summary.singleProductCount],
    ['선택 가능 후보 수', summary.selectableCount],
  ]);
  summarySheet['!cols'] = [{ wch: 24 }, { wch: 80 }];

  const detailRows = rows.map((row) => ({
    mappingType: row.mappingType,
    'option/additional/product 이름': row.itemName,
    일련번호: row.serialNo,
    매핑상태: row.mappingStatus,
    '세트상품 여부': row.isSetProduct ? '세트상품' : '단품',
    'SKU 코드': row.skuCode,
    'SKU 상품명': row.skuName,
    수량: row.quantity,
    '기존 연결 SKU': row.existingSku,
    '후보 SKU': row.candidateSku,
    '경고/비고': row.warningMessage,
  }));
  const detailSheet = XLSX.utils.json_to_sheet(detailRows);
  detailSheet['!cols'] = [
    { wch: 14 },
    { wch: 64 },
    { wch: 14 },
    { wch: 16 },
    { wch: 14 },
    { wch: 18 },
    { wch: 42 },
    { wch: 10 },
    { wch: 44 },
    { wch: 56 },
    { wch: 60 },
  ];

  XLSX.utils.book_append_sheet(workbook, summarySheet, '요약');
  XLSX.utils.book_append_sheet(workbook, detailSheet, '후보상세');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;

    if (!isRecord(payload)) {
      return NextResponse.json({ error: '엑셀로 내보낼 매핑 현황 데이터가 없습니다.' }, { status: 400 });
    }

    const channelProductNo = toStringCell(payload.channelProductNo);
    const productName = toStringCell(payload.productName);
    const summary = parseSummary(payload.summary);
    const rows = parseRows(payload.rows);

    if (rows.length === 0) {
      return NextResponse.json({ error: '엑셀로 내보낼 후보 행이 없습니다.' }, { status: 400 });
    }

    const workbookBuffer = createWorkbookBuffer({ channelProductNo, productName, summary, rows });
    const fileName = encodeURIComponent(`product-variant-keyword-${channelProductNo || 'report'}.xlsx`);

    return new NextResponse(new Uint8Array(workbookBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename*=UTF-8''${fileName}`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'ProductVariantKeyword 매핑 현황 export에 실패했습니다.';
    console.error('ProductVariantKeyword 매핑 현황 export 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
