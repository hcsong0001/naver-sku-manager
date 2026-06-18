import { Prisma } from '@/app/generated/prisma';
import prisma from '@/lib/prisma';
import { sanitizeNaverApiPayload } from '@/src/services/naver-api/naver-api.logger';
import type {
  NaverApiApprovalVerifier,
  NaverApiBatchPreviewInput,
  NaverApiBundleCalculation,
  NaverApiBundleComponent,
  NaverApiCallContext,
  NaverApiOperation,
} from '@/src/services/naver-api/naver-api.types';

function toJsonValue(value: unknown): Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.JsonNull;
  return sanitizeNaverApiPayload(value) as Prisma.InputJsonValue;
}

export function calculateNaverApiBundle(
  components: NaverApiBundleComponent[],
): NaverApiBundleCalculation {
  const errors: string[] = [];
  if (components.length < 2) errors.push('세트상품은 구성 SKU가 2개 이상이어야 합니다.');

  for (const component of components) {
    if (!component.skuCode && !component.internalSkuCode && !component.legacyStockCode && !component.barcode) {
      errors.push('식별 가능한 코드가 없는 구성 SKU가 있습니다.');
    }
    if (!Number.isInteger(component.quantity) || component.quantity < 1) {
      errors.push(`${component.skuCode || component.productName || '구성 SKU'}의 수량이 올바르지 않습니다.`);
    }
  }

  const quantitiesValid = components.every(
    (component) => Number.isInteger(component.quantity) && component.quantity > 0,
  );
  const costCalculable = quantitiesValid && components.every((component) => component.costPrice !== null);
  const stockCalculable = quantitiesValid && components.every((component) => component.stockQuantity !== null);
  if (!costCalculable) errors.push('일부 구성 SKU의 원가를 확인할 수 없습니다.');
  if (!stockCalculable) errors.push('일부 구성 SKU의 재고를 확인할 수 없습니다.');

  return {
    valid: errors.length === 0,
    totalCost: costCalculable
      ? components.reduce((sum, component) => sum + (component.costPrice ?? 0) * component.quantity, 0)
      : null,
    sellableStock: stockCalculable
      ? Math.min(...components.map((component) => Math.floor((component.stockQuantity ?? 0) / component.quantity)))
      : null,
    errors: Array.from(new Set(errors)),
  };
}

function buildBatchPreviewItemCreateInput(item: NaverApiBatchPreviewInput['items'][number], draft: boolean) {
  const isBundle = item.targetType === 'BUNDLE' || (item.bundleComponents?.length ?? 0) > 0;
  const bundleCalculation = isBundle
    ? calculateNaverApiBundle(item.bundleComponents ?? [])
    : null;

  return {
    storeId: item.storeId,
    channelId: item.channelId ?? null,
    productNo: item.productNo ?? null,
    channelProductNo: item.channelProductNo ?? null,
    targetType: item.targetType,
    targetId: item.targetId,
    operation: item.operation,
    internalSkuCode: item.internalSkuCode ?? null,
    legacyStockCode: item.legacyStockCode ?? null,
    barcode: item.barcode ?? null,
    skuLookupKeys: toJsonValue(item.skuLookupKeys),
    calculationType: isBundle ? 'BUNDLE' : 'SINGLE',
    bundleComponents: toJsonValue(item.bundleComponents),
    calculatedCost: bundleCalculation?.totalCost ?? null,
    calculatedStock: bundleCalculation?.sellableStock ?? null,
    previewBefore: toJsonValue(item.previewBefore),
    previewAfter: toJsonValue(item.previewAfter),
    requestPayload: toJsonValue(item.requestPayload),
    status: draft ? 'DRAFT' as const : 'PREVIEWED' as const,
    errorMessage: bundleCalculation && !bundleCalculation.valid
      ? bundleCalculation.errors.join(' / ')
      : null,
  };
}

export async function createNaverApiDraftBatch(input: NaverApiBatchPreviewInput) {
  if (input.items.length === 0) {
    throw new Error('네이버 API draft batch 항목이 없습니다.');
  }

  return prisma.naverApiBatchJob.create({
    data: {
      jobType: input.jobType,
      module: input.module,
      status: 'DRAFT',
      dryRun: true,
      description: input.description ?? null,
      totalItems: input.items.length,
      previewSummary: toJsonValue(input.previewSummary),
      metadata: toJsonValue(input.metadata),
      items: {
        create: input.items.map((item) => buildBatchPreviewItemCreateInput(item, true)),
      },
    },
    include: { items: { orderBy: { createdAt: 'asc' } } },
  });
}

export async function createNaverApiBatchPreview(input: NaverApiBatchPreviewInput) {
  if (input.items.length === 0) {
    throw new Error('네이버 API batch preview 항목이 없습니다.');
  }

  return prisma.naverApiBatchJob.create({
    data: {
      jobType: input.jobType,
      module: input.module,
      status: 'PREVIEW',
      dryRun: true,
      description: input.description ?? null,
      totalItems: input.items.length,
      previewSummary: toJsonValue(input.previewSummary),
      metadata: toJsonValue(input.metadata),
      items: {
        create: input.items.map((item) => buildBatchPreviewItemCreateInput(item, false)),
      },
    },
    include: { items: { orderBy: { createdAt: 'asc' } } },
  });
}

export async function requestNaverApiBatchApproval(batchJobId: string) {
  const result = await prisma.naverApiBatchJob.updateMany({
    where: {
      id: batchJobId,
      status: { in: ['DRAFT', 'PREVIEW'] },
      dryRun: true,
    },
    data: { status: 'APPROVAL_PENDING' },
  });
  if (result.count !== 1) {
    throw new Error('승인 요청 가능한 네이버 API batch job이 아닙니다.');
  }
  return prisma.naverApiBatchJob.findUniqueOrThrow({ where: { id: batchJobId } });
}

export async function approveNaverApiBatchJob(batchJobId: string, approvedBy: string) {
  if (!approvedBy.trim()) throw new Error('승인자 정보가 필요합니다.');
  const batch = await prisma.naverApiBatchJob.findUnique({
    where: { id: batchJobId },
    include: { items: { select: { status: true, errorMessage: true } } },
  });
  if (!batch || batch.status !== 'APPROVAL_PENDING' || !batch.dryRun) {
    throw new Error('사용자 승인 대기 상태의 batch job만 승인할 수 있습니다.');
  }
  if (batch.items.some((item) => item.status !== 'PREVIEWED')) {
    throw new Error('preview가 완료되지 않은 batch 항목이 있습니다.');
  }
  if (batch.items.some((item) => item.errorMessage)) {
    throw new Error('위험 또는 오류가 있는 batch 항목을 먼저 검토해야 합니다.');
  }

  return prisma.$transaction(async (tx) => {
    await tx.naverApiBatchJobItem.updateMany({
      where: { batchJobId, status: 'PREVIEWED' },
      data: { status: 'READY' },
    });
    return tx.naverApiBatchJob.update({
      where: { id: batchJobId },
      data: {
        status: 'APPROVED',
        dryRun: false,
        approvedAt: new Date(),
        approvedBy: approvedBy.trim(),
      },
    });
  });
}

export async function assertNaverApiBatchExecutionReady(batchJobId: string) {
  const batch = await prisma.naverApiBatchJob.findUnique({
    where: { id: batchJobId },
    include: { items: { orderBy: { createdAt: 'asc' } } },
  });
  if (!batch) throw new Error('네이버 API batch job을 찾을 수 없습니다.');
  if (batch.status !== 'APPROVED' || batch.dryRun || !batch.approvedAt || !batch.approvedBy) {
    throw new Error('사용자 승인이 완료되지 않아 실제 실행할 수 없습니다.');
  }
  if (batch.items.length === 0) throw new Error('실행할 batch 항목이 없습니다.');
  if (batch.items.some((item) => item.status !== 'READY' && item.status !== 'RETRY_PENDING')) {
    throw new Error('실행 준비가 되지 않은 batch 항목이 있습니다.');
  }
  return batch;
}

export class PrismaNaverApiApprovalVerifier implements NaverApiApprovalVerifier {
  async verify(
    context: NaverApiCallContext,
    operation: NaverApiOperation<unknown, unknown>,
  ): Promise<boolean> {
    if (!context.approval) return false;
    const item = await prisma.naverApiBatchJobItem.findFirst({
      where: {
        id: context.approval.batchJobItemId,
        batchJobId: context.approval.batchJobId,
        storeId: context.storeId,
        operation: operation.name,
        status: { in: ['READY', 'EXECUTING', 'RETRY_PENDING'] },
        batchJob: {
          status: { in: ['APPROVED', 'EXECUTING'] },
          dryRun: false,
          approvedAt: { not: null },
          approvedBy: context.approval.approvedBy,
        },
      },
      select: { id: true },
    });
    return Boolean(item);
  }
}

export async function markFailedNaverApiBatchItemsForRetry(
  batchJobId: string,
  itemIds: string[],
) {
  if (itemIds.length === 0) throw new Error('재처리할 실패 항목을 선택하세요.');
  const batch = await prisma.naverApiBatchJob.findUnique({ where: { id: batchJobId } });
  if (!batch || !batch.approvedAt) {
    throw new Error('승인 이력이 없는 batch job은 재처리할 수 없습니다.');
  }
  return prisma.naverApiBatchJobItem.updateMany({
    where: {
      id: { in: itemIds },
      batchJobId,
      status: 'FAILED',
    },
    data: {
      status: 'RETRY_PENDING',
      errorCode: null,
      errorMessage: null,
    },
  });
}

export async function recordNaverApiBatchItemResult(input: {
  itemId: string;
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED';
  responsePayload?: unknown;
  errorCode?: string;
  errorMessage?: string;
}) {
  const item = await prisma.naverApiBatchJobItem.findUnique({
    where: { id: input.itemId },
    include: { batchJob: true },
  });
  if (!item || !item.batchJob.approvedAt || item.batchJob.dryRun) {
    throw new Error('승인된 실제 실행 batch 항목만 결과를 기록할 수 있습니다.');
  }

  return prisma.$transaction(async (tx) => {
    const updatedItem = await tx.naverApiBatchJobItem.update({
      where: { id: input.itemId },
      data: {
        status: input.status,
        responsePayload: toJsonValue(input.responsePayload),
        errorCode: input.errorCode ?? null,
        errorMessage: input.errorMessage ?? null,
        attemptCount: { increment: 1 },
      },
    });
    const [successItems, failedItems, skippedItems, pendingItems] = await Promise.all([
      tx.naverApiBatchJobItem.count({ where: { batchJobId: item.batchJobId, status: 'SUCCESS' } }),
      tx.naverApiBatchJobItem.count({ where: { batchJobId: item.batchJobId, status: 'FAILED' } }),
      tx.naverApiBatchJobItem.count({ where: { batchJobId: item.batchJobId, status: 'SKIPPED' } }),
      tx.naverApiBatchJobItem.count({
        where: {
          batchJobId: item.batchJobId,
          status: { in: ['READY', 'EXECUTING', 'RETRY_PENDING'] },
        },
      }),
    ]);
    const completed = pendingItems === 0;
    const batchStatus = !completed
      ? 'EXECUTING'
      : failedItems === 0 && skippedItems === 0
        ? 'EXECUTED'
        : successItems > 0
          ? 'PARTIAL_SUCCESS'
          : 'FAILED';
    await tx.naverApiBatchJob.update({
      where: { id: item.batchJobId },
      data: {
        status: batchStatus,
        successItems,
        failedItems,
        skippedItems,
        executedAt: completed ? new Date() : null,
      },
    });
    return updatedItem;
  });
}
