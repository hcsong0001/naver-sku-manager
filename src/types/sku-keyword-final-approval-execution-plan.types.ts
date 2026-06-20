export type FinalApprovalExecutionAdapterMode = 'DRY_RUN' | 'LIVE';

export type FinalApprovalExecutionProposedAction = 'UPDATE_KEYWORDS';

export type FinalApprovalExecutionPlanItem = {
  jobItemId: string;
  finalApprovalItemId: string;
  productId: string | null;
  storeId: string | null;
  skuId: string | null;
  proposedAction: FinalApprovalExecutionProposedAction;
  candidateSummary: unknown;
  dryRunSummary: unknown;
  beforeSummary: unknown;
  afterSummary: unknown;
  naverApiPayloadCandidate: unknown;
};

export type FinalApprovalExecutionPlanSummary = {
  totalItems: number;
  transformableItems: number;
  blockedItems: number;
  proposedActionCounts: Record<string, number>;
  affectedProductCount: number;
  hasBlockingFailure: boolean;
};

export type FinalApprovalExecutionPlanValidation = {
  jobStatusValid: boolean;
  itemStatusesValid: boolean;
  activeFinalApprovalValid: boolean;
  validationNotExpired: boolean;
  payloadHashMatched: boolean;
  validationSnapshotHashMatched: boolean;
  itemOwnershipValid: boolean;
  itemCountMatched: boolean;
  generatedFromServerStateAt: string;
};

export type FinalApprovalExecutionPlan = {
  jobId: string;
  finalApprovalId: string;
  finalApprovalVersion: number;
  adapterMode: FinalApprovalExecutionAdapterMode;
  payloadHash: string;
  validationSnapshotHash: string;
  validationExpiresAt: string;
  generatedAt: string;
  itemCount: number;
  items: FinalApprovalExecutionPlanItem[];
  summary: FinalApprovalExecutionPlanSummary;
  validation: FinalApprovalExecutionPlanValidation;
};

export type FinalApprovalExecutionFailureScope = 'JOB' | 'ITEM';

export type FinalApprovalExecutionFailureReasonCode =
  | 'FINAL_APPROVAL_NOT_ACTIVE'
  | 'FINAL_APPROVAL_EXPIRED'
  | 'JOB_STATUS_NOT_APPROVED'
  | 'ITEM_STATUS_NOT_READY'
  | 'PAYLOAD_HASH_MISMATCH'
  | 'VALIDATION_SNAPSHOT_HASH_MISMATCH'
  | 'ITEM_OWNERSHIP_INVALID'
  | 'REQUEST_PAYLOAD_MISSING'
  | 'CANDIDATE_MISSING'
  | 'DRY_RUN_ITEM_MISSING'
  | 'REQUIRED_IDENTIFIER_MISSING'
  | 'UNSUPPORTED_ACTION'
  | 'NO_TRANSFORMABLE_CHANGE';

export type FinalApprovalExecutionPlanFailure = {
  scope: FinalApprovalExecutionFailureScope;
  jobId?: string;
  jobItemId?: string;
  finalApprovalId?: string;
  finalApprovalItemId?: string;
  reasonCode: FinalApprovalExecutionFailureReasonCode;
  message: string;
  blocking: boolean;
};
