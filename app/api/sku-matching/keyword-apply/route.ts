import { NextResponse } from 'next/server';
import { applyKeywordMatching } from '@/src/services/sku-keyword-matching.service';
import type { SkuKeywordMatchedRow, SkuMappingType, MatchMethod } from '@/src/types/sku-keyword-matching.types';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toStringCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function isMappingType(value: string): value is SkuMappingType {
  return value === 'PRODUCT' || value === 'OPTION' || value === 'ADDITIONAL';
}

function toMatchMethod(value: string): MatchMethod | null {
  if (value === 'EXACT' || value === 'NORMALIZED_EXACT' || value === 'PARTIAL') {
    return value;
  }
  if (value === 'EXACT_NORMALIZED') {
    return 'NORMALIZED_EXACT';
  }
  return null;
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

function toMatchedRows(payload: unknown): SkuKeywordMatchedRow[] | null {
  if (!isRecord(payload) || !Array.isArray(payload.rows)) {
    return null;
  }

  const rows: SkuKeywordMatchedRow[] = [];

  for (const item of payload.rows) {
    if (!isRecord(item)) continue;

    const mappingType = toStringCell(item.mappingType);
    const matchMethod = toMatchMethod(toStringCell(item.matchMethod));

    if (!isMappingType(mappingType)) continue;
    if (!matchMethod) continue;

    const quantity = Number(item.quantity);
    const confidence = Number(item.confidence);

    rows.push({
      mappingType,
      channelProductNo: toStringCell(item.channelProductNo),
      itemId: toStringCell(item.itemId),
      sourceText: toStringCell(item.sourceText),
      matchedKeyword: toStringCell(item.matchedKeyword),
      keywordColumn: toStringCell(item.keywordColumn),
      productManagementRowNo: Number(item.productManagementRowNo) || 0,
      barcode: toStringCell(item.barcode),
      skuCode: toStringCell(item.skuCode),
      quantity: Number.isFinite(quantity) && quantity >= 1 ? quantity : 1,
      matchMethod,
      confidence: Number.isFinite(confidence) ? confidence : 0,
      memo: toStringCell(item.memo),
      applyEligible: toBoolean(item.applyEligible),
      reviewReason: toStringCell(item.reviewReason),
    });
  }

  return rows.length > 0 ? rows : null;
}

function getApplyOptions(payload: unknown): {
  forceApplyWarningRows: boolean;
  forceApplyIneligibleRows: boolean;
} {
  if (!isRecord(payload)) {
    return { forceApplyWarningRows: false, forceApplyIneligibleRows: false };
  }

  return {
    forceApplyWarningRows: toBoolean(payload.forceApplyWarningRows),
    forceApplyIneligibleRows: toBoolean(payload.forceApplyIneligibleRows),
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const rows = toMatchedRows(payload);
    const options = getApplyOptions(payload);

    if (!rows) {
      return NextResponse.json(
        { error: '적용할 매칭 행 데이터가 없습니다.' },
        { status: 400 },
      );
    }

    const result = await applyKeywordMatching(rows, options);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '키워드 매칭 적용에 실패했습니다.';
    console.error('키워드 매칭 apply 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
