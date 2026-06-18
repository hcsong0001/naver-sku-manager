import type {
  SkuKeywordMatchedRow,
  SkuKeywordWarningRow,
  SkuMappingType,
} from '@/src/types/sku-keyword-matching.types';
import type {
  BuildSkuKeywordDraftSeedCandidatesInput,
  BuildSkuKeywordManualSelectionSeedCandidatesInput,
  BuildSkuKeywordMatchedSeedCandidatesInput,
  SkuKeywordDraftSeedCandidate,
  SkuKeywordDraftSeedManualSelections,
  SkuKeywordDraftSeedSelectedSku,
  SkuKeywordDraftSeedSku,
  SkuKeywordDraftSeedWarningRowInput,
} from '@/src/types/sku-keyword-draft-seed.types';

function isMappingType(value: string): value is SkuMappingType {
  return value === 'PRODUCT' || value === 'OPTION' || value === 'ADDITIONAL';
}

function toPositiveQuantity(value: number): number {
  return Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1;
}

function buildMatchedSeedKey(row: SkuKeywordMatchedRow): string {
  return `MATCHED_ROW:${row.mappingType}:${row.channelProductNo}:${row.itemId}`;
}

export function buildSkuKeywordWarningSelectionKey(input: SkuKeywordDraftSeedWarningRowInput): string {
  const { row, index } = input;
  return `${row.mappingType}:${row.channelProductNo}:${row.itemId}:${row.warningType}:${index}`;
}

function toMatchedSeedSku(row: SkuKeywordMatchedRow): SkuKeywordDraftSeedSku {
  return {
    skuId: null,
    skuCode: row.skuCode,
    skuName: null,
    sellerProductCode: null,
    barcode: row.barcode,
    quantity: toPositiveQuantity(row.quantity),
    resolutionSource: 'MATCHED_BARCODE',
  };
}

function toManualSelectionSeedSku(selectedSku: SkuKeywordDraftSeedSelectedSku): SkuKeywordDraftSeedSku {
  return {
    skuId: selectedSku.id,
    skuCode: selectedSku.skuCode,
    skuName: selectedSku.skuName || null,
    sellerProductCode: selectedSku.sellerProductCode || null,
    barcode: selectedSku.barcode,
    quantity: toPositiveQuantity(selectedSku.quantity),
    resolutionSource: 'MANUAL_SELECTION',
  };
}

function uniqueSeedSkus(skus: SkuKeywordDraftSeedSku[]): SkuKeywordDraftSeedSku[] {
  const deduped = new Map<string, SkuKeywordDraftSeedSku>();

  for (const sku of skus) {
    const key = sku.skuId ?? `${sku.skuCode}:${sku.barcode}:${sku.quantity}`;
    if (!deduped.has(key)) {
      deduped.set(key, sku);
    }
  }

  return Array.from(deduped.values());
}

export function buildSkuKeywordMatchedSeedCandidates(
  input: BuildSkuKeywordMatchedSeedCandidatesInput,
): SkuKeywordDraftSeedCandidate[] {
  return input.matchedRows
    .filter((row) => row.skuCode.trim().length > 0 || row.barcode.trim().length > 0)
    .map((row) => ({
      seedKey: buildMatchedSeedKey(row),
      source: 'MATCHED_ROW',
      mappingType: row.mappingType,
      channelProductNo: row.channelProductNo,
      itemId: row.itemId,
      sourceText: row.sourceText,
      matchedKeyword: row.matchedKeyword,
      keywordColumn: row.keywordColumn,
      productManagementRowNo: row.productManagementRowNo,
      matchMethod: row.matchMethod,
      confidence: row.confidence,
      memo: row.memo,
      reviewMessage: row.reviewReason,
      warningType: null,
      warningMessage: null,
      matchedBarcode: row.barcode,
      matchedSkuCode: row.skuCode,
      skus: uniqueSeedSkus([toMatchedSeedSku(row)]),
    }));
}

function buildManualSelectionCandidate(
  row: SkuKeywordWarningRow,
  index: number,
  manualSelections: SkuKeywordDraftSeedManualSelections,
): SkuKeywordDraftSeedCandidate | null {
  if (!isMappingType(row.mappingType)) return null;

  const selectionKey = buildSkuKeywordWarningSelectionKey({ row, index });
  const selectedSkus = manualSelections[selectionKey] ?? [];
  if (selectedSkus.length === 0) return null;

  const skus = uniqueSeedSkus(selectedSkus.map(toManualSelectionSeedSku));
  if (skus.length === 0) return null;

  return {
    seedKey: `WARNING_MANUAL_SELECTION:${selectionKey}`,
    source: 'WARNING_MANUAL_SELECTION',
    mappingType: row.mappingType,
    channelProductNo: row.channelProductNo,
    itemId: row.itemId,
    sourceText: row.sourceText,
    matchedKeyword: row.matchedKeyword,
    keywordColumn: row.keywordColumn,
    productManagementRowNo: row.productManagementRowNo,
    matchMethod: row.matchMethod,
    confidence: row.confidence,
    memo: row.memo,
    reviewMessage: row.warningMessage,
    warningType: row.warningType,
    warningMessage: row.warningMessage,
    matchedBarcode: row.barcode,
    matchedSkuCode: row.skuCode,
    skus,
  };
}

export function buildSkuKeywordManualSelectionSeedCandidates(
  input: BuildSkuKeywordManualSelectionSeedCandidatesInput,
): SkuKeywordDraftSeedCandidate[] {
  return input.preview.warningRows
    .map((row, index) => buildManualSelectionCandidate(row, index, input.manualSelections))
    .filter((candidate): candidate is SkuKeywordDraftSeedCandidate => candidate !== null);
}

export function buildSkuKeywordDraftSeedCandidates(
  input: BuildSkuKeywordDraftSeedCandidatesInput,
): SkuKeywordDraftSeedCandidate[] {
  return [
    ...buildSkuKeywordMatchedSeedCandidates({ matchedRows: input.preview.matchedRows }),
    ...buildSkuKeywordManualSelectionSeedCandidates({
      preview: { warningRows: input.preview.warningRows },
      manualSelections: input.manualSelections,
    }),
  ];
}

// TODO: hydrateSkuKeywordDraftSeedsToBulkCandidates(...)는 staging/current smartstore 문맥을 결합하는 다음 단계에서 구현한다.
