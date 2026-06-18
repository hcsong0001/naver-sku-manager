import type { CommonPageSize } from '@/src/utils/pagination';

export const BULK_UPDATE_PREVIEW_FILTERS = [
  'ALL',
  'SAFE',
  'RISK',
  'EXCLUDED',
  'PRICE',
  'STOCK',
  'PRICE_AND_STOCK',
  'SET',
  'SINGLE',
  'PRODUCT',
  'OPTION',
  'ADDITIONAL',
  'BUNDLE',
] as const;

export type BulkUpdatePreviewFilter = (typeof BULK_UPDATE_PREVIEW_FILTERS)[number];
export type BulkUpdateCandidateType = 'PRODUCT' | 'OPTION' | 'ADDITIONAL' | 'BUNDLE';
export type BulkUpdateCandidateStatus = 'SAFE' | 'RISK' | 'EXCLUDED';

export type BulkUpdateRiskType =
  | 'SKU_UNRESOLVED'
  | 'NO_CANDIDATE_SKU'
  | 'DIFFERENT_FROM_EXISTING'
  | 'SET_COMPONENT_MISSING'
  | 'SET_COMPONENT_SKU_UNRESOLVED'
  | 'SET_COMPONENT_QUANTITY_INVALID'
  | 'STOCK_SKU_MISSING'
  | 'DUPLICATE_CANDIDATE'
  | 'SMARTSTORE_WITHOUT_ERP_CANDIDATE'
  | 'PRICE_BASELINE_MISSING'
  | 'CURRENT_PRICE_UNAVAILABLE'
  | 'CURRENT_STOCK_UNAVAILABLE'
  | 'BUNDLE_STOCK_ZERO'
  | 'NO_CHANGE_DETECTED';

export type BulkUpdateLinkedSku = {
  skuCode: string;
  internalSkuCode: string | null;
  legacyStockCode: string;
  barcode: string;
  productName: string;
  purchaseProductName: string;
  quantity: number;
  sellingPrice: number | null;
  costPrice: number | null;
  stockQuantity: number | null;
  matchSource: string;
};

export type BulkUpdatePreviewCandidate = {
  id: string;
  sourceCandidateId: string;
  storeId: string | null;
  storeName: string;
  channelId: string;
  channelProductNo: string;
  itemId: string;
  candidateType: BulkUpdateCandidateType;
  sourceMappingType: 'PRODUCT' | 'OPTION' | 'ADDITIONAL' | null;
  productName: string;
  itemName: string;
  serialNo: string;
  isSetProduct: boolean;
  linkedSkus: BulkUpdateLinkedSku[];
  bundleSkus: BulkUpdateLinkedSku[];
  currentSmartstorePrice: number | null;
  calculatedTargetPrice: number | null;
  currentSmartstoreStock: number | null;
  calculatedTargetStock: number | null;
  hasPriceChange: boolean;
  hasStockChange: boolean;
  costPrice: number | null;
  expectedMargin: number | null;
  marginRate: number | null;
  status: BulkUpdateCandidateStatus;
  riskTypes: BulkUpdateRiskType[];
  riskMessages: string[];
  recommendedAction: string;
  executable: boolean;
  draftCreatable: boolean;
};

export type BulkUpdatePreviewSummary = {
  totalCandidateCount: number;
  priceUpdateCandidateCount: number;
  stockUpdateCandidateCount: number;
  priceAndStockUpdateCandidateCount: number;
  singleCandidateCount: number;
  setCandidateCount: number;
  safeCandidateCount: number;
  riskCandidateCount: number;
  excludedCandidateCount: number;
  expectedApiCallCount: number;
  draftBatchCreatableCount: number;
};

export type BulkUpdatePreviewSummaryResponse = {
  summary: BulkUpdatePreviewSummary;
  generatedAt: string;
};

export type BulkUpdatePreviewCandidatesResponse = {
  rows: BulkUpdatePreviewCandidate[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: CommonPageSize;
  filter: BulkUpdatePreviewFilter;
};

export type BulkUpdateDraftBatchResponse = {
  batchJobId: string;
  status: 'DRAFT' | 'PREVIEW';
  candidateCount: number;
  expectedApiCallCount: number;
  createdAt: string;
};
