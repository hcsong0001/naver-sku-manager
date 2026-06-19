import prisma from '@/lib/prisma';
import type {
  NaverApiBatchJobStatus,
} from '@/app/generated/prisma';
import type {
  SkuKeywordDraftBatchApproveBlockedItem,
  SkuKeywordDraftBatchApproveRequest,
  SkuKeywordDraftBatchApproveResponse,
} from '@/src/types/sku-keyword-draft-preview.types';

const ALLOWED_TARGET_TYPES = new Set(['SINGLE', 'OPTION', 'ADDITIONAL']);
const INFO_WARNING_CODES = new Set([
  'CHANNEL_ID_UNAVAILABLE',
  'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW',
  'CURRENT_CONTEXT_STALE',
]);
const STALE_CONTEXT_HOURS = 24;

type JsonRecord = Record<string, unknown>;

export class SkuKeywordDraftBatchApproveNotFoundError extends Error {
  constructor(jobId: string) {
    super(`승인 대상 Batch를 찾을 수 없습니다. (${jobId})`);
    this.name = 'SkuKeywordDraftBatchApproveNotFoundError';
  }
}

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as JsonRecord;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === 'string')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function hasOwn(record: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function hasComparableBeforeAfter(dryRunItem: JsonRecord): boolean {
  const before = asRecord(dryRunItem.before);
  const after = asRecord(dryRunItem.after);
  if (!before || !after) return false;

  const changeType = asString(dryRunItem.changeType);
  const hasPrice = hasOwn(before, 'price') && hasOwn(after, 'price')
    && before.price !== null && after.price !== null;
  const hasStock = hasOwn(before, 'stock') && hasOwn(after, 'stock')
    && before.stock !== null && after.stock !== null;

  if (changeType === 'PRICE') return hasPrice;
  if (changeType === 'STOCK') return hasStock;
  if (changeType === 'PRICE_AND_STOCK') return hasPrice && hasStock;

  return hasPrice || hasStock;
}

function extractIssueCodes(candidate: JsonRecord): string[] {
  const issues = Array.isArray(candidate.issues) ? candidate.issues : [];
  return issues
    .map((issue) => asRecord(issue)?.code)
    .filter((code): code is string => typeof code === 'string' && code.length > 0);
}

function extractIssueMessages(candidate: JsonRecord, code: string): string[] {
  const issues = Array.isArray(candidate.issues) ? candidate.issues : [];
  return issues
    .map((issue) => asRecord(issue))
    .filter((issue): issue is JsonRecord => issue !== null && issue.code === code)
    .map((issue) => asString(issue.message))
    .filter((message): message is string => Boolean(message));
}

function buildWarningCodes(candidate: JsonRecord): string[] {
  const warnings = new Set<string>();
  const issueCodes = extractIssueCodes(candidate);

  if (issueCodes.includes('CHANNEL_ID_UNAVAILABLE')) {
    warnings.add('CHANNEL_ID_UNAVAILABLE');
  }

  const currentStateSource = asString(candidate.currentStateSource);
  if (currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW') {
    warnings.add('UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW');
  }

  const syncedAtRaw = candidate.currentStateSyncedAt;
  if (typeof syncedAtRaw === 'string' || syncedAtRaw instanceof Date) {
    const syncedAt = new Date(syncedAtRaw);
    if (!Number.isNaN(syncedAt.getTime())) {
      const staleThresholdMs = STALE_CONTEXT_HOURS * 60 * 60 * 1000;
      if (Date.now() - syncedAt.getTime() > staleThresholdMs) {
        warnings.add('CURRENT_CONTEXT_STALE');
      }
    }
  }

  return Array.from(warnings);
}

function detectOptionValueFallback(candidate: JsonRecord): boolean {
  const reviewMessage = asString(candidate.reviewMessage) ?? '';
  if (reviewMessage.includes('매칭: optionValue')) return true;

  const currentPriceMessages = extractIssueMessages(candidate, 'CURRENT_PRICE_UNAVAILABLE');
  return currentPriceMessages.some((message) => message.includes('optionValue'));
}

function buildBlockedItem(
  itemId: string,
  targetType: string | undefined,
  targetId: string | undefined,
  reasons: string[],
): SkuKeywordDraftBatchApproveBlockedItem {
  return {
    itemId,
    targetType,
    targetId,
    reasons: Array.from(new Set(reasons)),
  };
}

export async function approveSkuKeywordDraftBatch(
  input: {
    jobId: string;
  } & SkuKeywordDraftBatchApproveRequest,
): Promise<SkuKeywordDraftBatchApproveResponse> {
  const { jobId, confirmApproveOnly } = input;
  const acknowledgedWarnings = Array.isArray(input.acknowledgedWarnings)
    ? Array.from(new Set(input.acknowledgedWarnings.filter(Boolean)))
    : [];

  const job = await prisma.naverApiBatchJob.findUnique({
    where: { id: jobId },
    include: {
      items: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!job) {
    throw new SkuKeywordDraftBatchApproveNotFoundError(jobId);
  }

  const blockedReasons: string[] = [];
  const blockedItems: SkuKeywordDraftBatchApproveBlockedItem[] = [];
  const warnings = new Set<string>();

  if (confirmApproveOnly !== true) {
    blockedReasons.push('confirmApproveOnly 값이 true가 아닙니다.');
  }

  if (job.status !== 'DRAFT') {
    blockedReasons.push(`현재 Job 상태가 DRAFT가 아닙니다. (${job.status})`);
  }

  if (job.items.length === 0) {
    blockedReasons.push('승인할 item이 없습니다.');
  }

  for (const item of job.items) {
    const itemReasons: string[] = [];
    const requestPayload = asRecord(item.requestPayload);
    const candidate = asRecord(requestPayload?.candidate);
    const dryRunItem = asRecord(requestPayload?.dryRunItem);
    const targetType = asString(item.targetType) ?? undefined;
    const targetId = asString(item.targetId) ?? undefined;

    if (item.status !== 'DRAFT') {
      itemReasons.push(`item 상태가 DRAFT가 아닙니다. (${item.status})`);
    }

    if (!requestPayload) {
      itemReasons.push('requestPayload가 없습니다.');
    }

    if (!candidate) {
      itemReasons.push('requestPayload.candidate가 없습니다.');
    }

    if (!dryRunItem) {
      itemReasons.push('requestPayload.dryRunItem이 없습니다.');
    }

    if (dryRunItem) {
      if (asBoolean(dryRunItem.executable) !== true) {
        itemReasons.push('dryRunItem.executable이 true가 아닙니다.');
      }

      const dryRunBlockedReasons = asStringArray(dryRunItem.blockedReasons);
      if (dryRunBlockedReasons.length > 0) {
        itemReasons.push(...dryRunBlockedReasons.map((reason) => `dryRun 차단 사유: ${reason}`));
      }

      if (asString(dryRunItem.riskLevel) === 'HIGH') {
        itemReasons.push('dryRunItem.riskLevel이 HIGH입니다.');
      }

      if (!hasComparableBeforeAfter(dryRunItem)) {
        itemReasons.push('before/after 변경값 비교 문맥이 불완전합니다.');
      }
    }

    if (!targetType) {
      itemReasons.push('targetType이 없습니다.');
    } else if (!ALLOWED_TARGET_TYPES.has(targetType)) {
      itemReasons.push(`허용되지 않은 targetType입니다. (${targetType})`);
    }

    if (!targetId) {
      itemReasons.push('targetId가 없습니다.');
    }

    if (candidate) {
      if (asString(candidate.status) === 'NEEDS_CONTEXT') {
        itemReasons.push('candidate.status가 NEEDS_CONTEXT입니다.');
      }

      const riskTypes = asStringArray(candidate.riskTypes);
      if (riskTypes.includes('CURRENT_PRICE_UNAVAILABLE')) {
        itemReasons.push('CURRENT_PRICE_UNAVAILABLE이 남아 있습니다.');
      }
      if (riskTypes.includes('CURRENT_STOCK_UNAVAILABLE')) {
        itemReasons.push('CURRENT_STOCK_UNAVAILABLE이 남아 있습니다.');
      }

      const issueCodes = extractIssueCodes(candidate);
      if (issueCodes.includes('CURRENT_PRICE_UNAVAILABLE')) {
        itemReasons.push('CURRENT_PRICE_UNAVAILABLE hydrate issue가 남아 있습니다.');
      }
      if (issueCodes.includes('CURRENT_STOCK_UNAVAILABLE')) {
        itemReasons.push('CURRENT_STOCK_UNAVAILABLE hydrate issue가 남아 있습니다.');
      }

      if (detectOptionValueFallback(candidate)) {
        itemReasons.push('optionValue fallback 매칭 후보는 승인할 수 없습니다.');
      }

      buildWarningCodes(candidate)
        .filter((warningCode) => INFO_WARNING_CODES.has(warningCode))
        .forEach((warningCode) => warnings.add(warningCode));
    }

    if (itemReasons.length > 0) {
      blockedItems.push(buildBlockedItem(item.id, targetType, targetId, itemReasons));
    }
  }

  if (blockedItems.length > 0) {
    blockedReasons.push(...blockedItems.flatMap((item) => item.reasons));
  }

  const dedupedBlockedReasons = Array.from(new Set(blockedReasons));
  const warningList = Array.from(warnings);
  const unacknowledgedWarnings = warningList.filter((warningCode) => !acknowledgedWarnings.includes(warningCode));

  const responseBase = {
    jobId: job.id,
    previousJobStatus: job.status as NaverApiBatchJobStatus,
    itemCount: job.items.length,
    warnings: warningList,
    blockedItems,
  };

  if (dedupedBlockedReasons.length > 0) {
    return {
      ok: false,
      ...responseBase,
      nextJobStatus: null,
      nextItemStatus: null,
      blockedReasons: dedupedBlockedReasons,
    };
  }

  if (unacknowledgedWarnings.length > 0) {
    return {
      ok: false,
      ...responseBase,
      nextJobStatus: null,
      nextItemStatus: null,
      blockedReasons: unacknowledgedWarnings.map((warningCode) => `${warningCode} 경고 확인이 필요합니다.`),
      blockedItems: [],
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.naverApiBatchJob.update({
      where: { id: job.id },
      data: {
        status: 'APPROVED',
      },
    });

    await tx.naverApiBatchJobItem.updateMany({
      where: {
        batchJobId: job.id,
        status: 'DRAFT',
      },
      data: {
        status: 'READY',
      },
    });
  });

  return {
    ok: true,
    ...responseBase,
    previousJobStatus: 'DRAFT',
    nextJobStatus: 'APPROVED',
    nextItemStatus: 'READY',
    blockedReasons: [],
    blockedItems: [],
  };
}
