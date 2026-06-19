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
