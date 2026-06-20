export type SkuKeywordFinalApprovalScopeConfirmation = {
  mode: 'ALL_ITEMS';
  expectedItemCount?: number;
  expectedScopeHash?: string;
};

export type SkuKeywordFinalApprovalCreateRequest = {
  confirmFinalApproval: true;
  approvalMemo: string | null;
  acknowledgedWarnings: string[];
  scopeConfirmation?: SkuKeywordFinalApprovalScopeConfirmation;
};

export type SkuKeywordFinalApprovalErrorCode =
  | 'FINAL_APPROVAL_CONFIRMATION_REQUIRED'
  | 'INVALID_FINAL_APPROVAL_REQUEST'
  | 'FINAL_APPROVAL_NOT_CONFIGURED'
  | 'BATCH_JOB_NOT_FOUND'
  | 'ACTIVE_FINAL_APPROVAL_EXISTS'
  | 'BATCH_STATE_CONFLICT'
  | 'FINAL_APPROVAL_VERSION_CONFLICT'
  | 'FINAL_APPROVAL_VALIDATION_FAILED'
  | 'INCOMPLETE_BATCH_PAYLOAD'
  | 'UNSUPPORTED_BATCH_OPERATION'
  | 'VALIDATION_CONTEXT_UNAVAILABLE'
  | 'FINAL_APPROVAL_CREATE_FAILED';

export type SkuKeywordFinalApprovalHashSpecV1 = {
  schemaVersion: '1';
  algorithm: 'SHA-256';
  encoding: 'lowercase-hex';
  canonicalization: 'TMS_CANONICAL_JSON_V1';
  payloadDomain: 'NAVER_API_BATCH_FINAL_APPROVAL_PAYLOAD_V1';
  validationDomain: 'NAVER_API_BATCH_FINAL_APPROVAL_VALIDATION_V1';
  itemPayloadDomain: 'NAVER_API_BATCH_FINAL_APPROVAL_ITEM_PAYLOAD_V1';
  itemValidationDomain: 'NAVER_API_BATCH_FINAL_APPROVAL_ITEM_VALIDATION_V1';
  scopeDomain: 'NAVER_API_BATCH_FINAL_APPROVAL_SCOPE_V1';
};

export type SkuKeywordFinalApprovalItemValidationResultV1 = {
  schemaVersion: '1';
  validatorVersion: 'SKU_KEYWORD_FINAL_APPROVAL_VALIDATOR_V1';
  warningPolicyVersion: 'SKU_KEYWORD_FINAL_APPROVAL_WARNING_V1';
  jobId: string;
  jobItemId: string;
  validatedAt: string;
  expiresAt: string;
  currentStateSource: 'NAVER_PRODUCT_COLLECTION';
  currentStateSyncedAt: string;
  currentState: {
    price: number | null;
    stock: number | null;
  };
  blockerCodes: string[];
  stale: false;
  riskLevel: 'LOW' | 'MEDIUM';
  warningCodes: string[];
  canExecute: true;
};

export type SkuKeywordFinalApprovalValidationSnapshotV1 = {
  schemaVersion: '1';
  validatorVersion: 'SKU_KEYWORD_FINAL_APPROVAL_VALIDATOR_V1';
  payloadContractVersion: 'SKU_KEYWORD_FINAL_APPROVAL_PAYLOAD_V1';
  warningPolicyVersion: 'SKU_KEYWORD_FINAL_APPROVAL_WARNING_V1';
  validatedAt: string;
  expiresAt: string;
  jobId: string;
  jobUpdatedAt: string;
  summary: {
    canExecute: true;
    totalItemCount: number;
    blockedCount: 0;
    staleCount: 0;
    highRiskCount: 0;
  };
  acknowledgedWarnings: string[];
  itemResults: SkuKeywordFinalApprovalItemValidationResultV1[];
};

export type SkuKeywordFinalApprovalExecutionScopeV1 = {
  schemaVersion: '1';
  mode: 'ALL_ITEMS';
  totalItemCount: number;
  includedItemCount: number;
  excludedItemCount: 0;
  scopeHash: string;
};

export type SkuKeywordFinalApprovalCreateResponse = {
  ok: true;
  jobId: string;
  finalApproval: {
    id: string;
    jobId: string;
    version: number;
    status: 'ACTIVE';
    finalApprovedAt: string;
    finalApprovedBy: string;
    validationExpiresAt: string;
    itemCount: number;
    includedItemCount: number;
    validationSnapshotHash: string;
    payloadHash: string;
    scopeHash: string;
  };
  executionStarted: false;
};

export type SkuKeywordFinalApprovalErrorResponse = {
  ok: false;
  code: SkuKeywordFinalApprovalErrorCode;
  message: string;
  details?: Record<string, unknown>;
};
