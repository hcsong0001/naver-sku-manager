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
  rowNumber: number;
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
  riskTypes: string;
  recommendedAction: string;
  qualityStatus: string;
  completionRate: number;
  missingSku: string;
  additionalSku: string;
  quantityDifference: string;
};

type ExportQualityRow = {
  rowNumber: number;
  mappingType: string;
  itemName: string;
  serialNo: string;
  isSetProduct: boolean;
  isMapped: boolean;
  existingSkuText: string;
  candidateSkuText: string;
  existingSkuCount: number;
  candidateSkuCount: number;
  completionRate: number;
  riskTypes: string;
  qualityMessage: string;
  recommendedAction: string;
  missingSkuText: string;
  additionalSkuText: string;
  quantityDifferenceText: string;
};

type ExportQualitySummary = {
  totalCount: number;
  mappedCount: number;
  resolvedCount: number;
  completionRate: number;
  riskCount: number;
  differentFromExistingCount: number;
  setComponentMissingCount: number;
  unresolvedCount: number;
  noCandidateSkuCount: number;
  missingExistingSkuInfoCount: number;
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
    rowNumber: toNumberCell(row.rowNumber),
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
    riskTypes: toStringCell(row.riskTypes),
    recommendedAction: toStringCell(row.recommendedAction),
    qualityStatus: toStringCell(row.qualityStatus),
    completionRate: toNumberCell(row.completionRate),
    missingSku: toStringCell(row.missingSku),
    additionalSku: toStringCell(row.additionalSku),
    quantityDifference: toStringCell(row.quantityDifference),
  }));
}

function parseQualityRows(value: unknown): ExportQualityRow[] {
  if (!Array.isArray(value)) return [];

  return value.filter(isRecord).map((row) => ({
    rowNumber: toNumberCell(row.rowNumber),
    mappingType: toStringCell(row.mappingType),
    itemName: toStringCell(row.itemName),
    serialNo: toStringCell(row.serialNo),
    isSetProduct: toBooleanCell(row.isSetProduct),
    isMapped: toBooleanCell(row.isMapped),
    existingSkuText: toStringCell(row.existingSkuText),
    candidateSkuText: toStringCell(row.candidateSkuText),
    existingSkuCount: toNumberCell(row.existingSkuCount),
    candidateSkuCount: toNumberCell(row.candidateSkuCount),
    completionRate: toNumberCell(row.completionRate),
    riskTypes: toStringCell(row.riskTypes),
    qualityMessage: toStringCell(row.qualityMessage),
    recommendedAction: toStringCell(row.recommendedAction),
    missingSkuText: toStringCell(row.missingSkuText),
    additionalSkuText: toStringCell(row.additionalSkuText),
    quantityDifferenceText: toStringCell(row.quantityDifferenceText),
  }));
}

function parseQualitySummary(value: unknown): ExportQualitySummary {
  if (!isRecord(value)) {
    return {
      totalCount: 0,
      mappedCount: 0,
      resolvedCount: 0,
      completionRate: 0,
      riskCount: 0,
      differentFromExistingCount: 0,
      setComponentMissingCount: 0,
      unresolvedCount: 0,
      noCandidateSkuCount: 0,
      missingExistingSkuInfoCount: 0,
    };
  }

  return {
    totalCount: toNumberCell(value.totalCount),
    mappedCount: toNumberCell(value.mappedCount),
    resolvedCount: toNumberCell(value.resolvedCount),
    completionRate: toNumberCell(value.completionRate),
    riskCount: toNumberCell(value.riskCount),
    differentFromExistingCount: toNumberCell(value.differentFromExistingCount),
    setComponentMissingCount: toNumberCell(value.setComponentMissingCount),
    unresolvedCount: toNumberCell(value.unresolvedCount),
    noCandidateSkuCount: toNumberCell(value.noCandidateSkuCount),
    missingExistingSkuInfoCount: toNumberCell(value.missingExistingSkuInfoCount),
  };
}

function createWorkbookBuffer({
  channelProductNo,
  productName,
  summary,
  rows,
  qualityRows,
  qualitySummary,
}: {
  channelProductNo: string;
  productName: string;
  summary: ExportSummary;
  rows: ExportRow[];
  qualityRows: ExportQualityRow[];
  qualitySummary: ExportQualitySummary;
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
    ['품질 검증 위험 후보 수', qualitySummary.riskCount],
    ['품질 검증 매핑완료율', `${qualitySummary.completionRate}%`],
  ]);
  summarySheet['!cols'] = [{ wch: 24 }, { wch: 80 }];

  const detailRows = rows.map((row) => ({
    일련번호: row.rowNumber,
    mappingType: row.mappingType,
    'option/additional/product 이름': row.itemName,
    원본일련번호: row.serialNo,
    매핑상태: row.mappingStatus,
    '세트상품 여부': row.isSetProduct ? '세트상품' : '단품',
    'SKU 코드': row.skuCode,
    'SKU 상품명': row.skuName,
    수량: row.quantity,
    '기존 연결 SKU': row.existingSku,
    '후보 SKU': row.candidateSku,
    '경고/비고': row.warningMessage,
    '품질 검증 상태': row.qualityStatus,
    위험유형: row.riskTypes,
    '권장 조치': row.recommendedAction,
    '누락 SKU': row.missingSku,
    '추가 SKU': row.additionalSku,
    '수량 차이': row.quantityDifference,
    '후보 완성도(%)': row.completionRate,
  }));
  const detailSheet = XLSX.utils.json_to_sheet(detailRows);
  detailSheet['!cols'] = [
    { wch: 10 },
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
    { wch: 18 },
    { wch: 36 },
    { wch: 20 },
    { wch: 36 },
    { wch: 36 },
    { wch: 32 },
    { wch: 14 },
  ];

  const qualitySummarySheet = XLSX.utils.aoa_to_sheet([
    ['항목', '값'],
    ['품질 검증 대상 수', qualitySummary.totalCount],
    ['매핑완료 후보 수', qualitySummary.mappedCount],
    ['완전 해석 후보 수', qualitySummary.resolvedCount],
    ['매핑완료율', `${qualitySummary.completionRate}%`],
    ['위험 후보 수', qualitySummary.riskCount],
    ['기존 매핑과 후보 SKU 다름', qualitySummary.differentFromExistingCount],
    ['세트상품 구성 누락', qualitySummary.setComponentMissingCount],
    ['SKU 미확정', qualitySummary.unresolvedCount],
    ['후보 SKU 없음', qualitySummary.noCandidateSkuCount],
    ['매핑완료지만 기존 SKU 정보 부족', qualitySummary.missingExistingSkuInfoCount],
  ]);
  qualitySummarySheet['!cols'] = [{ wch: 32 }, { wch: 20 }];

  const qualityDetailSheet = XLSX.utils.json_to_sheet(
    qualityRows.map((row) => ({
      일련번호: row.rowNumber,
      mappingType: row.mappingType,
      'option/additional/product 이름': row.itemName,
      원본일련번호: row.serialNo,
      '세트상품 여부': row.isSetProduct ? '세트상품' : '단품',
      매핑완료: row.isMapped ? '예' : '아니오',
      '기존 연결 SKU 수': row.existingSkuCount,
      '후보 SKU 수': row.candidateSkuCount,
      '후보 완성도(%)': row.completionRate,
      '권장 조치': row.recommendedAction,
      '기존 연결 SKU': row.existingSkuText,
      '후보 SKU': row.candidateSkuText,
      '누락 SKU': row.missingSkuText,
      '추가 SKU': row.additionalSkuText,
      '수량 차이': row.quantityDifferenceText,
      위험유형: row.riskTypes || '정상',
      '검증 결과': row.qualityMessage || '정상',
    })),
  );
  qualityDetailSheet['!cols'] = [
    { wch: 10 },
    { wch: 14 },
    { wch: 48 },
    { wch: 14 },
    { wch: 14 },
    { wch: 10 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 20 },
    { wch: 44 },
    { wch: 44 },
    { wch: 36 },
    { wch: 36 },
    { wch: 32 },
    { wch: 36 },
    { wch: 64 },
  ];

  XLSX.utils.book_append_sheet(workbook, summarySheet, '요약');
  XLSX.utils.book_append_sheet(workbook, detailSheet, '후보상세');
  XLSX.utils.book_append_sheet(workbook, qualitySummarySheet, '품질검증요약');
  XLSX.utils.book_append_sheet(workbook, qualityDetailSheet, '품질검증상세');
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
    const qualityRows = parseQualityRows(payload.qualityRows);
    const qualitySummary = parseQualitySummary(payload.qualitySummary);

    if (rows.length === 0) {
      return NextResponse.json({ error: '엑셀로 내보낼 후보 행이 없습니다.' }, { status: 400 });
    }

    const workbookBuffer = createWorkbookBuffer({
      channelProductNo,
      productName,
      summary,
      rows,
      qualityRows,
      qualitySummary,
    });
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
