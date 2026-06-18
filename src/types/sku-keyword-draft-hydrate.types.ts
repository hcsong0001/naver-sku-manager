import type {
  SkuMappingType,
} from '@/src/types/sku-keyword-matching.types';
import type {
  SkuKeywordDraftSeedCandidate,
  SkuKeywordDraftSeedResolutionSource,
  SkuKeywordDraftSeedSource,
} from '@/src/types/sku-keyword-draft-seed.types';

export type SkuKeywordHydrateIssueCode =
  | 'SKU_NOT_FOUND'
  | 'TARGET_NOT_FOUND'
  | 'TARGET_CHANNEL_PRODUCT_MISMATCH'
  | 'STORE_CONTEXT_UNAVAILABLE'
  | 'CHANNEL_ID_UNAVAILABLE'
  | 'CURRENT_PRICE_UNAVAILABLE'
  | 'CURRENT_STOCK_UNAVAILABLE';

export type SkuKeywordHydrateIssueSeverity = 'error' | 'warning' | 'info';

export type SkuKeywordHydrateIssue = {
  code: SkuKeywordHydrateIssueCode;
  severity: SkuKeywordHydrateIssueSeverity;
  message: string;
  skuId: string | null;
  skuCode: string | null;
};

export type SkuKeywordHydrateSkuRecord = {
  id: string;
  skuCode: string;
  sellerProductCode: string | null;
  barcode: string | null;
  sellingPrice: number | null;
  costPrice: number | null;
  stockQuantity: number | null;
  productName: string | null;
  purchaseProductName: string | null;
  primaryBarcode: string | null;
};

export type SkuKeywordHydrateProductRecord = {
  id: string;
  channelProductNo: string | null;
  smartstoreId: string;
  storeName: string;
  productName: string;
};

export type SkuKeywordHydrateOptionRecord = {
  id: string;
  channelProductNo: string | null;
  smartstoreId: string;
  storeName: string;
  productName: string;
  optionName: string;
  optionValue: string;
  optionCode: string | null;
};

export type SkuKeywordHydrateAdditionalRecord = {
  id: string;
  channelProductNo: string | null;
  smartstoreId: string;
  storeName: string;
  productName: string;
  additionalName: string;
  additionalValue: string;
  sellerManagementCode: string | null;
  price: number | null;
  stockQuantity: number | null;
};

export type SkuKeywordHydrateContext = {
  seeds: SkuKeywordDraftSeedCandidate[];
  skuById: Map<string, SkuKeywordHydrateSkuRecord>;
  skuByCode: Map<string, SkuKeywordHydrateSkuRecord>;
  skuByBarcode: Map<string, SkuKeywordHydrateSkuRecord>;
  productById: Map<string, SkuKeywordHydrateProductRecord>;
  optionById: Map<string, SkuKeywordHydrateOptionRecord>;
  additionalById: Map<string, SkuKeywordHydrateAdditionalRecord>;
};

export type SkuKeywordHydratedLinkedSku = {
  skuId: string | null;
  skuCode: string;
  skuName: string | null;
  sellerProductCode: string | null;
  barcode: string;
  primaryBarcode: string | null;
  quantity: number;
  resolutionSource: SkuKeywordDraftSeedResolutionSource;
  sellingPrice: number | null;
  costPrice: number | null;
  stockQuantity: number | null;
  productName: string | null;
  purchaseProductName: string | null;
  legacyStockCode: string | null;
};

export type SkuKeywordHydratedCandidate = {
  seedKey: string;
  source: SkuKeywordDraftSeedSource;
  mappingType: SkuMappingType;
  candidateType: SkuMappingType;
  sourceMappingType: SkuMappingType;
  channelProductNo: string;
  itemId: string;
  productName: string | null;
  itemName: string | null;
  serialNo: string | null;
  storeId: string | null;
  storeName: string | null;
  channelId: string | null;
  sourceText: string;
  matchedKeyword: string;
  keywordColumn: string;
  productManagementRowNo: number;
  confidence: number;
  memo: string;
  reviewMessage: string;
  warningType: string | null;
  warningMessage: string | null;
  matchMethod: SkuKeywordDraftSeedCandidate['matchMethod'];
  matchedBarcode: string;
  matchedSkuCode: string;
  linkedSkus: SkuKeywordHydratedLinkedSku[];
  currentSmartstorePrice: number | null;
  currentSmartstoreStock: number | null;
  issues: SkuKeywordHydrateIssue[];
};

export type SkuKeywordHydrateInput = {
  seeds: SkuKeywordDraftSeedCandidate[];
};

export type SkuKeywordHydrateResult = {
  candidates: SkuKeywordHydratedCandidate[];
  context: SkuKeywordHydrateContext;
};
