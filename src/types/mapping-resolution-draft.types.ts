import type { StagingImportFileType } from '@/src/types/staging-import.types';
import type {
  StagingMappingCandidate,
  StagingMappingRiskType,
  StagingMappingSetComponent,
  StagingMappingSku,
  StagingMappingSummaryResponse,
} from '@/src/types/staging-mapping-preview.types';
import type {
  BulkUpdatePreviewCandidate,
  BulkUpdatePreviewSummaryResponse,
} from '@/src/types/bulk-update-preview.types';

export const MAPPING_RESOLUTION_DRAFT_SCHEMA_VERSION = '2.0.0';
export const MAPPING_RESOLUTION_DRAFT_STORAGE_PREFIX = 'staging_mapping_resolutions';

export type MappingResolutionDraftStatus = 'RESOLVED' | 'UNRESOLVED';
export type MappingResolutionDraftTargetType = 'PRODUCT' | 'OPTION' | 'ADDITIONAL' | 'BUNDLE';

export type MappingResolutionDraftSnapshotMetadata = {
  snapshotKey: string;
  latestAppliedAt: string | null;
  jobIds: Partial<Record<StagingImportFileType, string>>;
};

export type MappingResolutionDraftSelectedSku = {
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

export type MappingResolutionDraftSelectedComponent = {
  sourceName: string;
  quantity: number | null;
  resolved: boolean;
  skuCode: string;
  internalSkuCode: string | null;
  legacyStockCode: string;
  barcode: string;
  productName: string;
  purchaseProductName: string;
  sellingPrice: number | null;
  costPrice: number | null;
  stockQuantity: number | null;
  matchSource: string;
};

export type MappingResolutionDraftEntry = {
  candidateKey: string;
  targetType: MappingResolutionDraftTargetType;
  originalRiskTypes: StagingMappingRiskType[];
  selectedSkuCode?: string;
  selectedSku?: MappingResolutionDraftSelectedSku | null;
  selectedComponents?: MappingResolutionDraftSelectedComponent[];
  quantity?: number | null;
  memo?: string;
  resolvedAt: string;
  status: MappingResolutionDraftStatus;
  adoptedCandidateId?: string;
};

export type MappingResolutionDraft = {
  schemaVersion: string;
  createdAt: string;
  snapshotMetadata: MappingResolutionDraftSnapshotMetadata;
  resolutions: Record<string, MappingResolutionDraftEntry>;
};

export type MappingResolutionDraftLoadResult = {
  draft: MappingResolutionDraft | null;
  exactMatch: boolean;
  snapshotMismatch: boolean;
  matchedStorageKey: string | null;
};

export type DraftAppliedChange<TBefore, TAfter> = {
  before: TBefore;
  after: TAfter;
};

export type DraftAppliedStagingMappingCandidate = StagingMappingCandidate & {
  draftApplied: boolean;
  draftStatus: 'NONE' | 'EXACT' | 'MISMATCH';
  draftEntry?: MappingResolutionDraftEntry;
  draftChange?: {
    sku?: DraftAppliedChange<StagingMappingSku[], StagingMappingSku[]>;
    setComponents?: DraftAppliedChange<StagingMappingSetComponent[], StagingMappingSetComponent[]>;
  };
};

export type DraftAppliedBulkUpdateCandidate = BulkUpdatePreviewCandidate & {
  draftApplied: boolean;
  draftStatus: 'NONE' | 'EXACT' | 'MISMATCH';
  draftEntry?: MappingResolutionDraftEntry;
  draftChange?: {
    linkedSkus?: DraftAppliedChange<BulkUpdatePreviewCandidate['linkedSkus'], BulkUpdatePreviewCandidate['linkedSkus']>;
    bundleSkus?: DraftAppliedChange<BulkUpdatePreviewCandidate['bundleSkus'], BulkUpdatePreviewCandidate['bundleSkus']>;
  };
};

export type MappingDraftPreviewSummary = {
  baseRiskCount: number;
  draftRiskCount: number;
  reducedRiskCount: number;
  draftAppliedCount: number;
  draftExecutableCount: number;
};

export type MappingResolutionDraftClientContext = {
  mappingSummary: StagingMappingSummaryResponse;
  bulkSummary: BulkUpdatePreviewSummaryResponse;
};
