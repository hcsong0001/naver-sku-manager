import type {
  MatchMethod,
  SkuKeywordManualSkuCandidate,
  SkuKeywordMatchedRow,
  SkuKeywordPreviewResponse,
  SkuKeywordWarningRow,
  SkuMappingType,
} from '@/src/types/sku-keyword-matching.types';

export type SkuKeywordDraftSeedSource = 'MATCHED_ROW' | 'WARNING_MANUAL_SELECTION';

export type SkuKeywordDraftSeedResolutionSource = 'MATCHED_BARCODE' | 'MANUAL_SELECTION';

export type SkuKeywordDraftSeedSelectedSku = Pick<
  SkuKeywordManualSkuCandidate,
  'id' | 'skuCode' | 'skuName' | 'sellerProductCode' | 'barcode'
> & {
  quantity: number;
};

export type SkuKeywordDraftSeedManualSelections = Record<string, SkuKeywordDraftSeedSelectedSku[]>;

export type SkuKeywordDraftSeedSku = {
  skuId: string | null;
  skuCode: string;
  skuName: string | null;
  sellerProductCode: string | null;
  barcode: string;
  quantity: number;
  resolutionSource: SkuKeywordDraftSeedResolutionSource;
};

export type SkuKeywordDraftSeedCandidate = {
  seedKey: string;
  source: SkuKeywordDraftSeedSource;
  mappingType: SkuMappingType;
  channelProductNo: string;
  itemId: string;
  sourceText: string;
  matchedKeyword: string;
  keywordColumn: string;
  productManagementRowNo: number;
  matchMethod: MatchMethod;
  confidence: number;
  memo: string;
  reviewMessage: string;
  warningType: string | null;
  warningMessage: string | null;
  matchedBarcode: string;
  matchedSkuCode: string;
  skus: SkuKeywordDraftSeedSku[];
};

export type SkuKeywordDraftSeedPreviewInput = Pick<
  SkuKeywordPreviewResponse,
  'matchedRows' | 'warningRows'
>;

export type BuildSkuKeywordDraftSeedCandidatesInput = {
  preview: SkuKeywordDraftSeedPreviewInput;
  manualSelections: SkuKeywordDraftSeedManualSelections;
};

export type BuildSkuKeywordMatchedSeedCandidatesInput = {
  matchedRows: SkuKeywordMatchedRow[];
};

export type BuildSkuKeywordManualSelectionSeedCandidatesInput = {
  preview: Pick<SkuKeywordPreviewResponse, 'warningRows'>;
  manualSelections: SkuKeywordDraftSeedManualSelections;
};

export type SkuKeywordDraftSeedWarningRowInput = {
  row: SkuKeywordWarningRow;
  index: number;
};
