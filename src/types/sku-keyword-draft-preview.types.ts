import type {
  SkuKeywordBulkLikeCandidate,
  SkuKeywordBulkLikeCandidateStatus,
  SkuKeywordBulkLikeRiskType,
} from '@/src/types/sku-keyword-bulk-like-candidate.types';
import type {
  SkuKeywordDraftSeedManualSelections,
  SkuKeywordDraftSeedPreviewInput,
  SkuKeywordDraftSeedSource,
} from '@/src/types/sku-keyword-draft-seed.types';
import type {
  SkuKeywordHydrateIssueCode,
} from '@/src/types/sku-keyword-draft-hydrate.types';
import type {
  OptionCurrentContextPreviewRow,
} from '@/src/types/option-current-context.types';

export type SkuKeywordDraftPreviewRequest = {
  preview: SkuKeywordDraftSeedPreviewInput;
  manualSelections?: SkuKeywordDraftSeedManualSelections;
  optionCurrentContextRows?: OptionCurrentContextPreviewRow[];
};

export type SkuKeywordDraftPreviewSummary = {
  matchedRowCount: number;
  warningRowCount: number;
  seedCount: number;
  matchedSeedCount: number;
  manualSelectionSeedCount: number;
  hydratedCandidateCount: number;
  bulkLikeCandidateCount: number;
  draftCreatableCount: number;
  readyForReviewCount: number;
  needsContextCount: number;
  setProductCount: number;
  singleProductCount: number;
  priceChangeCandidateCount: number;
  stockChangeCandidateCount: number;
  priceAndStockChangeCandidateCount: number;
};

export type SkuKeywordDraftPreviewIssueSummary = {
  hydrateIssueCounts: Partial<Record<SkuKeywordHydrateIssueCode, number>>;
  bulkLikeRiskCounts: Partial<Record<SkuKeywordBulkLikeRiskType, number>>;
  statusCounts: Record<SkuKeywordBulkLikeCandidateStatus, number>;
  seedSourceCounts: Record<SkuKeywordDraftSeedSource, number>;
};

export type SkuKeywordDraftPreviewResponse = {
  candidates: SkuKeywordBulkLikeCandidate[];
  summary: SkuKeywordDraftPreviewSummary;
  issueSummary: SkuKeywordDraftPreviewIssueSummary;
};

export type SkuKeywordDraftBatchPreviewSummary = {
  selectedCount: number;
  executableCount: number;
  blockedCount: number;
  riskCount: number;
  priceChangeCount: number;
  stockChangeCount: number;
  optionCount: number;
  additionalCount: number;
  singleCount: number;
  uploadContextCount: number;
  dbContextCount: number;
};

export type SkuKeywordDraftBatchPreviewItem = {
  candidateId: string;
  targetType: 'SINGLE' | 'OPTION' | 'ADDITIONAL' | 'UNKNOWN';
  changeType: 'PRICE' | 'STOCK' | 'PRICE_AND_STOCK' | 'UNKNOWN';
  executable: boolean;
  blockedReasons: string[];
  warnings: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  sourceSummary: string;
  before?: {
    price?: number | null;
    stock?: number | null;
  };
  after?: {
    price?: number | null;
    stock?: number | null;
  };
};

export type SkuKeywordDraftBatchPreview = {
  summary: SkuKeywordDraftBatchPreviewSummary;
  items: SkuKeywordDraftBatchPreviewItem[];
};

export type SkuKeywordDraftBatchDryRunPreviewRequest = {
  candidates: SkuKeywordBulkLikeCandidate[];
};

export type SkuKeywordDraftBatchDryRunPreviewResponse = {
  ok: boolean;
  summary: {
    receivedCount: number;
    selectedCount: number;
    executableCount: number;
    blockedCount: number;
    riskCount: number;
    priceChangeCount: number;
    stockChangeCount: number;
    priceAndStockChangeCount: number;
    optionCount: number;
    additionalCount: number;
    singleCount: number;
    uploadContextCount: number;
    dbContextCount: number;
  };
  items: Array<{
    candidateId: string;
    targetType: 'SINGLE' | 'OPTION' | 'ADDITIONAL' | 'UNKNOWN';
    changeType: 'PRICE' | 'STOCK' | 'PRICE_AND_STOCK' | 'UNKNOWN';
    executable: boolean;
    blockedReasons: string[];
    warnings: string[];
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    sourceSummary: string;
    before?: {
      price?: number | null;
      stock?: number | null;
    };
    after?: {
      price?: number | null;
      stock?: number | null;
    };
  }>;
  issueSummary: Record<string, number>;
};

export type SkuKeywordDraftBatchSaveDraftRequest = {
  candidates: SkuKeywordBulkLikeCandidate[];
  selectedCandidateIds: string[];
  confirmSaveDraftOnly: true;
};

export type SkuKeywordDraftBatchSaveDraftResponse = {
  ok: boolean;
  jobId?: string;
  status: 'DRAFT';
  receivedCount: number;
  selectedCount: number;
  savedItemCount: number;
  blockedItemCount: number;
  warnings: string[];
  blockedReasons: string[];
};
