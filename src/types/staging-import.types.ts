export const STAGING_IMPORT_FILE_TYPES = [
  'ERP_STOCK',
  'SMARTSTORE_PRODUCT',
  'SKU_MAPPING',
  'PRODUCT_VARIANT_KEYWORD',
] as const;

export type StagingImportFileType = (typeof STAGING_IMPORT_FILE_TYPES)[number];

export type StagingImportJobStatus = 'PENDING' | 'PREVIEWED' | 'APPLIED' | 'FAILED' | 'CANCELLED';

export type StagingImportPreviewSummary = {
  totalProducts: number;
  totalOptions: number;
  totalAdditionals: number;
  mappedCount: number;
  unmappedCount: number;
  riskCount: number;
  setProductCount: number;
  validRowCount: number;
  errorRowCount: number;
};

export type StagingImportPreviewRow = Record<string, string | number | boolean | null>;

export type StagingImportPreviewResponse = {
  fileType: StagingImportFileType;
  fileName: string;
  totalRows: number;
  successRows: number;
  errorRows: number;
  summary: StagingImportPreviewSummary;
  validRowsSample: StagingImportPreviewRow[];
  errorRowsSample: StagingImportPreviewRow[];
};

export type StagingImportApplyResponse = {
  jobId: string;
  fileId: string;
  fileType: StagingImportFileType;
  fileName: string;
  status: StagingImportJobStatus;
  totalRows: number;
  successRows: number;
  errorRows: number;
  summary: StagingImportPreviewSummary;
};

export type StagingImportLatestJob = {
  jobId: string;
  fileName: string;
  status: StagingImportJobStatus;
  totalRows: number;
  successRows: number;
  errorRows: number;
  createdAt?: string | null;
  appliedAt: string | null;
};

export type StagingImportHistoryRow = {
  jobId: string;
  fileType: StagingImportFileType;
  fileName: string;
  status: StagingImportJobStatus;
  totalRows: number;
  successRows: number;
  errorRows: number;
  createdAt: string;
  completedAt: string | null;
};

export type StagingSnapshotInfo = {
  hasAppliedData: boolean;
  missingAppliedFileTypes: StagingImportFileType[];
  latestAppliedJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>>;
  latestAppliedAt: string | null;
  counts: {
    stagingStockCount: number;
    stagingProductCount: number;
    stagingOptionCount: number;
    stagingAdditionalCount: number;
    stagingSkuMappingCount: number;
    stagingProductVariantKeywordCount: number;
  };
};

export type StagingImportSummaryResponse = {
  latestJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>>;
  latestAppliedJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>>;
  jobHistory: StagingImportHistoryRow[];
  snapshot: StagingSnapshotInfo;
  summary: {
    importJobCount: number;
    stagingStockCount: number;
    stagingProductCount: number;
    stagingOptionCount: number;
    stagingAdditionalCount: number;
    stagingSkuMappingCount: number;
    stagingProductVariantKeywordCount: number;
    totalProducts: number;
    totalOptions: number;
    totalAdditionals: number;
    mappedCount: number;
    unmappedCount: number;
    riskCount: number;
    setProductCount: number;
  };
};
