import type {
  SkuKeywordHydrateIssue,
  SkuKeywordHydratedCandidate,
} from '@/src/types/sku-keyword-draft-hydrate.types';

export type SkuKeywordBulkLikeCandidateType = 'PRODUCT' | 'OPTION' | 'ADDITIONAL';

export type SkuKeywordBulkLikeCandidateStatus = 'READY_FOR_REVIEW' | 'NEEDS_CONTEXT';

export type SkuKeywordBulkLikeRiskType =
  | 'SKU_NOT_FOUND'
  | 'TARGET_NOT_FOUND'
  | 'TARGET_CHANNEL_PRODUCT_MISMATCH'
  | 'STORE_CONTEXT_UNAVAILABLE'
  | 'CHANNEL_ID_UNAVAILABLE'
  | 'CURRENT_PRICE_UNAVAILABLE'
  | 'CURRENT_STOCK_UNAVAILABLE'
  | 'TARGET_PRICE_UNAVAILABLE'
  | 'TARGET_STOCK_UNAVAILABLE'
  | 'LINKED_SKU_PRICE_UNAVAILABLE'
  | 'LINKED_SKU_STOCK_UNAVAILABLE'
  | 'LINKED_SKU_COST_UNAVAILABLE'
  | 'NO_LINKED_SKUS'
  | 'SET_PRODUCT_RULE_NOT_IMPLEMENTED'
  | 'NO_CHANGE_DETECTED';

export type SkuKeywordBulkLikeLinkedSku = {
  skuId: string | null;
  skuCode: string;
  internalSkuCode: string | null;
  legacyStockCode: string | null;
  barcode: string;
  primaryBarcode: string | null;
  productName: string | null;
  purchaseProductName: string | null;
  quantity: number;
  sellingPrice: number | null;
  costPrice: number | null;
  stockQuantity: number | null;
  resolutionSource: string;
};

export type SkuKeywordBulkLikeCandidate = {
  id: string;
  sourceCandidateId: string;
  sourceSeedKey: string;
  storeId: string | null;
  storeName: string | null;
  channelId: string | null;
  channelProductNo: string;
  itemId: string;
  candidateType: SkuKeywordBulkLikeCandidateType;
  sourceMappingType: SkuKeywordBulkLikeCandidateType;
  productName: string | null;
  itemName: string | null;
  serialNo: string | null;
  isSetProduct: boolean;
  linkedSkus: SkuKeywordBulkLikeLinkedSku[];
  bundleSkus: SkuKeywordBulkLikeLinkedSku[];
  currentSmartstorePrice: number | null;
  calculatedTargetPrice: number | null;
  currentSmartstoreStock: number | null;
  calculatedTargetStock: number | null;
  hasPriceChange: boolean;
  hasStockChange: boolean;
  costPrice: number | null;
  expectedMargin: number | null;
  marginRate: number | null;
  status: SkuKeywordBulkLikeCandidateStatus;
  riskTypes: SkuKeywordBulkLikeRiskType[];
  riskMessages: string[];
  recommendedAction: string;
  executable: boolean;
  draftCreatable: boolean;
  issues: SkuKeywordHydrateIssue[];
  source: SkuKeywordHydratedCandidate['source'];
  warningType: string | null;
  warningMessage: string | null;
  memo: string;
  reviewMessage: string;
  currentStateSyncedAt: Date | null;
  currentStateSource: string | null;
};

export type SkuKeywordBulkLikeTransformInput = {
  candidates: SkuKeywordHydratedCandidate[];
};

export type SkuKeywordBulkLikeTransformResult = {
  candidates: SkuKeywordBulkLikeCandidate[];
};
