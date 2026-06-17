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
  appliedAt: string | null;
};

export type StagingImportSummaryResponse = {
  latestJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>>;
  summary: {
    totalProducts: number;
    totalOptions: number;
    totalAdditionals: number;
    mappedCount: number;
    unmappedCount: number;
    riskCount: number;
    setProductCount: number;
  };
};
