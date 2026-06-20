import type {
  FinalApprovalExecutionPlan,
} from '../types/sku-keyword-final-approval-execution-plan.types';

export type DryRunAdapterItemResult = {
  jobItemId: string;
  finalApprovalItemId: string;
  productId: string | null;
  storeId: string | null;
  skuId: string | null;
  proposedAction: 'UPDATE_KEYWORDS';
  result: 'SUCCESS' | 'FAILED' | 'SKIPPED';
  reasonCode?: string;
  message?: string;
  beforeSummary?: unknown;
  afterSummary?: unknown;
  payloadCandidateSummary?: unknown;
};

export type DryRunAdapterResult = {
  adapterMode: 'DRY_RUN';
  jobId: string;
  finalApprovalId: string;
  finalApprovalVersion: number;
  payloadHash: string;
  validationSnapshotHash: string;
  startedAt: string;
  finishedAt: string;
  itemCount: number;
  successCount: number;
  failureCount: number;
  skippedCount: number;
  items: DryRunAdapterItemResult[];
};

export type DryRunAdapterFailure = {
  scope: 'JOB' | 'ITEM';
  jobId?: string;
  jobItemId?: string;
  finalApprovalId?: string;
  finalApprovalItemId?: string;
  reasonCode: string;
  message: string;
  blocking: boolean;
};

export type RunFinalApprovalDryRunAdapterInput = {
  now: Date;
  plan: FinalApprovalExecutionPlan;
};

export type RunFinalApprovalDryRunAdapterResult =
  | {
      ok: true;
      result: DryRunAdapterResult;
      failures: [];
    }
  | {
      ok: false;
      result: DryRunAdapterResult | null;
      failures: DryRunAdapterFailure[];
    };

export function runFinalApprovalDryRunAdapter(
  input: RunFinalApprovalDryRunAdapterInput,
): RunFinalApprovalDryRunAdapterResult {
  const failures: DryRunAdapterFailure[] = [];
  const { now, plan } = input;

  // Job-level validation
  if (!plan) {
    failures.push({
      scope: 'JOB',
      reasonCode: 'PLAN_MISSING',
      message: 'Execution plan is missing',
      blocking: true,
    });
    return {
      ok: false,
      result: null,
      failures,
    };
  }

  if (plan.adapterMode !== 'DRY_RUN') {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'ADAPTER_MODE_NOT_DRY_RUN',
      message: 'Adapter mode must be DRY_RUN',
      blocking: true,
    });
  }

  if (!plan.jobId) {
    failures.push({
      scope: 'JOB',
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'JOB_ID_MISSING',
      message: 'Job ID is missing',
      blocking: true,
    });
  }

  if (!plan.finalApprovalId) {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      reasonCode: 'FINAL_APPROVAL_ID_MISSING',
      message: 'Final approval ID is missing',
      blocking: true,
    });
  }

  if (typeof plan.finalApprovalVersion !== 'number' || Number.isNaN(plan.finalApprovalVersion)) {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'FINAL_APPROVAL_VERSION_INVALID',
      message: 'Final approval version is invalid',
      blocking: true,
    });
  }

  if (!plan.payloadHash) {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'PAYLOAD_HASH_MISSING',
      message: 'Payload hash is missing',
      blocking: true,
    });
  }

  if (!plan.validationSnapshotHash) {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'VALIDATION_SNAPSHOT_HASH_MISSING',
      message: 'Validation snapshot hash is missing',
      blocking: true,
    });
  }

  if (plan.itemCount !== plan.items.length) {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'ITEM_COUNT_MISMATCH',
      message: 'Item count does not match items list length',
      blocking: true,
    });
  }

  if (plan.summary?.hasBlockingFailure) {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'PLAN_HAS_BLOCKING_FAILURE',
      message: 'Execution plan has blocking failures',
      blocking: true,
    });
  }

  const validation = plan.validation;
  const requiredValidationKeys: Array<keyof typeof validation> = [
    'jobStatusValid',
    'itemStatusesValid',
    'activeFinalApprovalValid',
    'validationNotExpired',
    'payloadHashMatched',
    'validationSnapshotHashMatched',
    'itemOwnershipValid',
    'itemCountMatched',
  ];

  const hasValidationFailed = !validation || requiredValidationKeys.some(key => validation[key] !== true);
  if (hasValidationFailed) {
    failures.push({
      scope: 'JOB',
      jobId: plan.jobId,
      finalApprovalId: plan.finalApprovalId,
      reasonCode: 'PLAN_VALIDATION_FAILED',
      message: 'Execution plan validation flags are not all true',
      blocking: true,
    });
  }

  if (failures.some(f => f.scope === 'JOB' && f.blocking)) {
    return {
      ok: false,
      result: null,
      failures,
    };
  }

  let successCount = 0;
  let failureCount = 0;
  const skippedCount = 0; // skipped items are not supported in the initial version
  const itemResults: DryRunAdapterItemResult[] = [];

  for (const item of plan.items) {
    let itemResultStatus: 'SUCCESS' | 'FAILED' | 'SKIPPED' = 'SUCCESS';
    let itemReasonCode: string | undefined;
    let itemMessage: string | undefined;

    if (!item.jobItemId) {
      itemResultStatus = 'FAILED';
      itemReasonCode = 'JOB_ITEM_ID_MISSING';
      itemMessage = 'jobItemId is missing in plan item';
    } else if (!item.finalApprovalItemId) {
      itemResultStatus = 'FAILED';
      itemReasonCode = 'FINAL_APPROVAL_ITEM_ID_MISSING';
      itemMessage = 'finalApprovalItemId is missing in plan item';
    } else if (item.proposedAction !== 'UPDATE_KEYWORDS') {
      itemResultStatus = 'FAILED';
      itemReasonCode = 'UNSUPPORTED_ACTION';
      itemMessage = `Unsupported proposed action: ${item.proposedAction}`;
    } else if (item.naverApiPayloadCandidate === undefined || item.naverApiPayloadCandidate === null) {
      itemResultStatus = 'FAILED';
      itemReasonCode = 'PAYLOAD_CANDIDATE_MISSING';
      itemMessage = 'naverApiPayloadCandidate is missing in plan item';
    } else if (item.candidateSummary === undefined || item.candidateSummary === null) {
      itemResultStatus = 'FAILED';
      itemReasonCode = 'CANDIDATE_SUMMARY_MISSING';
      itemMessage = 'candidateSummary is missing in plan item';
    } else if (item.dryRunSummary === undefined || item.dryRunSummary === null) {
      itemResultStatus = 'FAILED';
      itemReasonCode = 'DRY_RUN_SUMMARY_MISSING';
      itemMessage = 'dryRunSummary is missing in plan item';
    } else if (!item.productId || !item.storeId) {
      itemResultStatus = 'FAILED';
      itemReasonCode = 'REQUIRED_IDENTIFIER_MISSING';
      itemMessage = 'Required identifiers (productId, storeId) are missing';
    }

    if (itemResultStatus === 'SUCCESS') {
      successCount++;
    } else {
      failureCount++;
      failures.push({
        scope: 'ITEM',
        jobId: plan.jobId,
        jobItemId: item.jobItemId || undefined,
        finalApprovalId: plan.finalApprovalId,
        finalApprovalItemId: item.finalApprovalItemId || undefined,
        reasonCode: itemReasonCode!,
        message: itemMessage!,
        blocking: false,
      });
    }

    const payloadCandidateSummary = item.naverApiPayloadCandidate
      ? {
          productId: item.productId,
          storeId: item.storeId,
          skuId: item.skuId,
        }
      : null;

    itemResults.push({
      jobItemId: item.jobItemId,
      finalApprovalItemId: item.finalApprovalItemId,
      productId: item.productId,
      storeId: item.storeId,
      skuId: item.skuId,
      proposedAction: 'UPDATE_KEYWORDS',
      result: itemResultStatus,
      reasonCode: itemReasonCode,
      message: itemMessage,
      beforeSummary: item.dryRunSummary ?? null,
      afterSummary: item.candidateSummary ?? null,
      payloadCandidateSummary,
    });
  }

  const finishedAt = now.toISOString();

  const result: DryRunAdapterResult = {
    adapterMode: 'DRY_RUN',
    jobId: plan.jobId,
    finalApprovalId: plan.finalApprovalId,
    finalApprovalVersion: plan.finalApprovalVersion,
    payloadHash: plan.payloadHash,
    validationSnapshotHash: plan.validationSnapshotHash,
    startedAt: now.toISOString(),
    finishedAt,
    itemCount: plan.items.length,
    successCount,
    failureCount,
    skippedCount,
    items: itemResults,
  };

  if (failures.length > 0) {
    return {
      ok: false,
      result,
      failures,
    };
  }

  return {
    ok: true,
    result,
    failures: [],
  };
}
