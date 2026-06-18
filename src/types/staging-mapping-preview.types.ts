import type { StagingImportFileType } from '@/src/types/staging-import.types';
import type { CommonPageSize } from '@/src/utils/pagination';

export const STAGING_MAPPING_FILTERS = [
  'ALL',
  'MAPPED',
  'UNMAPPED',
  'RISK',
  'SKU_UNRESOLVED',
  'SET',
  'SINGLE',
  'OPTION',
  'ADDITIONAL',
  'PRODUCT',
] as const;

export type StagingMappingFilter = (typeof STAGING_MAPPING_FILTERS)[number];
export type StagingMappingCandidateType = 'PRODUCT' | 'OPTION' | 'ADDITIONAL' | 'BUNDLE';
export type StagingMappingStatus = 'MAPPED' | 'UNMAPPED' | 'RISK';

export type StagingMappingRiskType =
  | 'SKU_UNRESOLVED'
  | 'NO_CANDIDATE_SKU'
  | 'DIFFERENT_FROM_EXISTING'
  | 'SET_COMPONENT_MISSING'
  | 'SET_COMPONENT_SKU_UNRESOLVED'
  | 'SET_COMPONENT_QUANTITY_INVALID'
  | 'STOCK_SKU_MISSING'
  | 'DUPLICATE_CANDIDATE'
  | 'SMARTSTORE_WITHOUT_ERP_CANDIDATE';

export type StagingMappingSku = {
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

export type StagingMappingSetComponent = {
  sourceName: string;
  quantity: number | null;
  resolved: boolean;
  skuCode: string;
  internalSkuCode: string | null;
  legacyStockCode: string;
  barcode: string;
  productName: string;
  sellingPrice: number | null;
  costPrice: number | null;
  stockQuantity: number | null;
  candidateSkuCodes: string[];
};

export type StagingMappingCandidate = {
  id: string;
  storeId: string | null;
  storeName: string;
  channelId: string;
  channelProductNo: string;
  itemId: string;
  candidateType: StagingMappingCandidateType;
  sourceMappingType: 'PRODUCT' | 'OPTION' | 'ADDITIONAL' | null;
  productName: string;
  itemName: string;
  serialNo: string;
  mappingStatus: StagingMappingStatus;
  isSetProduct: boolean;
  candidateSkus: StagingMappingSku[];
  existingSkus: StagingMappingSku[];
  setComponents: StagingMappingSetComponent[];
  setTotalQuantity: number | null;
  setCostCalculable: boolean | null;
  setCostPrice: number | null;
  setStockCalculable: boolean | null;
  sellableSetStock: number | null;
  riskTypes: StagingMappingRiskType[];
  riskMessages: string[];
  recommendedAction: string;
};

export type StagingMappingPreviewSummary = {
  stagingProductCount: number;
  stagingOptionCount: number;
  stagingAdditionalCount: number;
  stagingStockSkuCount: number;
  stagingExistingMappingCount: number;
  productVariantKeywordCandidateCount: number;
  mappedCandidateCount: number;
  unmappedCandidateCount: number;
  riskCandidateCount: number;
  setProductCandidateCount: number;
  singleProductCandidateCount: number;
  unresolvedSkuCandidateCount: number;
};

export type StagingMappingSourceJob = {
  jobId: string;
  fileType: StagingImportFileType;
  fileName: string;
  storeName: string;
  channelId: string;
  appliedAt: string | null;
};

export type StagingMappingSummaryResponse = {
  summary: StagingMappingPreviewSummary;
  sourceJobs: StagingMappingSourceJob[];
  generatedAt: string;
};

export type StagingMappingCandidatesResponse = {
  rows: StagingMappingCandidate[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: CommonPageSize;
  filter: StagingMappingFilter;
};
