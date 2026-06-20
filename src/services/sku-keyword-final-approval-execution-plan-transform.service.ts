import type {
  FinalApprovalExecutionPlan,
  FinalApprovalExecutionPlanFailure,
} from '../types/sku-keyword-final-approval-execution-plan.types';

export type BuildFinalApprovalExecutionPlanInput = {
  now: Date;
  adapterMode: 'DRY_RUN' | 'LIVE';
  payloadHashForComparison: string;
  validationSnapshotHashForComparison: string;
  job: {
    id: string;
    status: string;
  };
  finalApproval: {
    id: string;
    jobId: string;
    version: number;
    status: string;
    payloadHash: string;
    validationSnapshotHash: string;
    validationExpiresAt: Date | string;
    items: Array<{
      id: string;
      jobItemId: string;
    }>;
  };
  jobItems: Array<{
    id: string;
    jobId: string;
    status: string;
    requestPayload: unknown;
  }>;
};

export type BuildFinalApprovalExecutionPlanResult =
  | {
      ok: true;
      plan: FinalApprovalExecutionPlan;
      failures: [];
    }
  | {
      ok: false;
      plan: null;
      failures: FinalApprovalExecutionPlanFailure[];
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function buildFinalApprovalExecutionPlan(
  input: BuildFinalApprovalExecutionPlanInput,
): BuildFinalApprovalExecutionPlanResult {
  const failures: FinalApprovalExecutionPlanFailure[] = [];

  const {
    now,
    adapterMode,
    payloadHashForComparison,
    validationSnapshotHashForComparison,
    job,
    finalApproval,
    jobItems,
  } = input;

  if (adapterMode !== 'DRY_RUN') {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      reasonCode: 'UNSUPPORTED_ACTION',
      message: 'Only DRY_RUN adapterMode is supported at this time',
      blocking: true,
    });
  }

  if (job.status !== 'APPROVED') {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      reasonCode: 'JOB_STATUS_NOT_APPROVED',
      message: 'Job status must be APPROVED',
      blocking: true,
    });
  }

  if (finalApproval.jobId !== job.id) {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      finalApprovalId: finalApproval.id,
      reasonCode: 'ITEM_OWNERSHIP_INVALID',
      message: 'FinalApproval does not belong to the provided job',
      blocking: true,
    });
  }

  if (finalApproval.status !== 'ACTIVE') {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      finalApprovalId: finalApproval.id,
      reasonCode: 'FINAL_APPROVAL_NOT_ACTIVE',
      message: 'FinalApproval status must be ACTIVE',
      blocking: true,
    });
  }

  const expiresAt =
    typeof finalApproval.validationExpiresAt === 'string'
      ? new Date(finalApproval.validationExpiresAt)
      : finalApproval.validationExpiresAt;

  if (expiresAt.getTime() <= now.getTime()) {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      finalApprovalId: finalApproval.id,
      reasonCode: 'FINAL_APPROVAL_EXPIRED',
      message: 'FinalApproval validation has expired',
      blocking: true,
    });
  }

  if (payloadHashForComparison !== finalApproval.payloadHash) {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      finalApprovalId: finalApproval.id,
      reasonCode: 'PAYLOAD_HASH_MISMATCH',
      message: 'Calculated payloadHash does not match FinalApproval.payloadHash',
      blocking: true,
    });
  }

  if (validationSnapshotHashForComparison !== finalApproval.validationSnapshotHash) {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      finalApprovalId: finalApproval.id,
      reasonCode: 'VALIDATION_SNAPSHOT_HASH_MISMATCH',
      message: 'Calculated validationSnapshotHash does not match FinalApproval.validationSnapshotHash',
      blocking: true,
    });
  }

  if (finalApproval.items.length !== jobItems.length) {
    failures.push({
      scope: 'JOB',
      jobId: job.id,
      finalApprovalId: finalApproval.id,
      reasonCode: 'ITEM_OWNERSHIP_INVALID',
      message: 'Item count mismatch between FinalApproval and JobItems',
      blocking: true,
    });
  }

  const jobItemsMap = new Map(jobItems.map((ji) => [ji.id, ji]));
  const plannedItems: FinalApprovalExecutionPlan['items'] = [];

  for (const faItem of finalApproval.items) {
    const jobItem = jobItemsMap.get(faItem.jobItemId);

    if (!jobItem) {
      failures.push({
        scope: 'ITEM',
        jobId: job.id,
        finalApprovalId: finalApproval.id,
        finalApprovalItemId: faItem.id,
        reasonCode: 'ITEM_OWNERSHIP_INVALID',
        message: `JobItem ${faItem.jobItemId} not found for FinalApprovalItem ${faItem.id}`,
        blocking: true,
      });
      continue;
    }

    if (jobItem.jobId !== job.id) {
      failures.push({
        scope: 'ITEM',
        jobId: job.id,
        jobItemId: jobItem.id,
        finalApprovalId: finalApproval.id,
        finalApprovalItemId: faItem.id,
        reasonCode: 'ITEM_OWNERSHIP_INVALID',
        message: 'JobItem does not belong to the provided job',
        blocking: true,
      });
    }

    if (jobItem.status !== 'READY') {
      failures.push({
        scope: 'ITEM',
        jobId: job.id,
        jobItemId: jobItem.id,
        finalApprovalId: finalApproval.id,
        finalApprovalItemId: faItem.id,
        reasonCode: 'ITEM_STATUS_NOT_READY',
        message: 'JobItem status must be READY',
        blocking: true,
      });
    }

    if (!isRecord(jobItem.requestPayload)) {
      failures.push({
        scope: 'ITEM',
        jobId: job.id,
        jobItemId: jobItem.id,
        finalApprovalId: finalApproval.id,
        finalApprovalItemId: faItem.id,
        reasonCode: 'REQUEST_PAYLOAD_MISSING',
        message: 'JobItem requestPayload is missing or invalid',
        blocking: true,
      });
      continue;
    }

    if (!('candidate' in jobItem.requestPayload)) {
      failures.push({
        scope: 'ITEM',
        jobId: job.id,
        jobItemId: jobItem.id,
        finalApprovalId: finalApproval.id,
        finalApprovalItemId: faItem.id,
        reasonCode: 'CANDIDATE_MISSING',
        message: 'JobItem requestPayload.candidate is missing',
        blocking: true,
      });
    }

    if (!('dryRunItem' in jobItem.requestPayload)) {
      failures.push({
        scope: 'ITEM',
        jobId: job.id,
        jobItemId: jobItem.id,
        finalApprovalId: finalApproval.id,
        finalApprovalItemId: faItem.id,
        reasonCode: 'DRY_RUN_ITEM_MISSING',
        message: 'JobItem requestPayload.dryRunItem is missing',
        blocking: true,
      });
    }

    let productId: string | null = null;
    let storeId: string | null = null;
    let skuId: string | null = null;

    if (isRecord(jobItem.requestPayload.candidate)) {
      const candidate = jobItem.requestPayload.candidate;
      if (typeof candidate.productId === 'string') productId = candidate.productId;
      if (typeof candidate.storeId === 'string') storeId = candidate.storeId;
      if (typeof candidate.skuId === 'string') skuId = candidate.skuId;
    }

    if (!productId || !storeId) {
      failures.push({
        scope: 'ITEM',
        jobId: job.id,
        jobItemId: jobItem.id,
        finalApprovalId: finalApproval.id,
        finalApprovalItemId: faItem.id,
        reasonCode: 'REQUIRED_IDENTIFIER_MISSING',
        message: 'Required identifiers (productId, storeId) are missing in candidate',
        blocking: true,
      });
    }

    plannedItems.push({
      jobItemId: jobItem.id,
      finalApprovalItemId: faItem.id,
      productId,
      storeId,
      skuId,
      proposedAction: 'UPDATE_KEYWORDS',
      candidateSummary: jobItem.requestPayload.candidate ?? null,
      dryRunSummary: jobItem.requestPayload.dryRunItem ?? null,
      beforeSummary: jobItem.requestPayload.dryRunItem ?? null,
      afterSummary: jobItem.requestPayload.candidate ?? null,
      naverApiPayloadCandidate: {
        productId,
        storeId,
        skuId,
      },
    });
  }

  if (failures.length > 0) {
    return {
      ok: false,
      plan: null,
      failures,
    };
  }

  const generatedAt = now.toISOString();

  const plan: FinalApprovalExecutionPlan = {
    jobId: job.id,
    finalApprovalId: finalApproval.id,
    finalApprovalVersion: finalApproval.version,
    adapterMode: 'DRY_RUN',
    payloadHash: finalApproval.payloadHash,
    validationSnapshotHash: finalApproval.validationSnapshotHash,
    validationExpiresAt: expiresAt.toISOString(),
    generatedAt,
    itemCount: plannedItems.length,
    items: plannedItems,
    summary: {
      totalItems: plannedItems.length,
      transformableItems: plannedItems.length,
      blockedItems: 0,
      proposedActionCounts: { UPDATE_KEYWORDS: plannedItems.length },
      affectedProductCount: new Set(plannedItems.map((pi) => pi.productId).filter(Boolean)).size,
      hasBlockingFailure: false,
    },
    validation: {
      jobStatusValid: true,
      itemStatusesValid: true,
      activeFinalApprovalValid: true,
      validationNotExpired: true,
      payloadHashMatched: true,
      validationSnapshotHashMatched: true,
      itemOwnershipValid: true,
      itemCountMatched: true,
      generatedFromServerStateAt: generatedAt,
    },
  };

  return {
    ok: true,
    plan,
    failures: [],
  };
}
