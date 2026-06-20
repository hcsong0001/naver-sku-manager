import type { Prisma } from '@/app/generated/prisma';
import { finalApprovalError } from '@/src/services/sku-keyword-final-approval.errors';
import type {
  SkuKeywordFinalApprovalItemValidationResultV1,
} from '@/src/types/sku-keyword-final-approval.types';

const ALLOWED_TARGET_TYPES = new Set(['SINGLE', 'OPTION', 'ADDITIONAL']);
const ALLOWED_OPERATIONS = new Set(['UPDATE_PRICE', 'UPDATE_STOCK', 'UPDATE_PRICE_AND_STOCK']);
const FINAL_APPROVAL_WARNING_CODES = new Set(['CHANNEL_ID_UNAVAILABLE']);
const CURRENT_STATE_SOURCE = 'NAVER_PRODUCT_COLLECTION' as const;
const CURRENT_CONTEXT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

type JsonRecord = Record<string, unknown>;
type FinalApprovalJob = Prisma.NaverApiBatchJobGetPayload<{
  include: { items: true };
}>;
type FinalApprovalJobItem = FinalApprovalJob['items'][number];

export type ValidatedFinalApprovalItem = {
  item: FinalApprovalJobItem;
  candidate: JsonRecord;
  dryRunItem: JsonRecord;
  validationResult: SkuKeywordFinalApprovalItemValidationResultV1;
};

export type ValidateFinalApprovalJobResult = {
  items: ValidatedFinalApprovalItem[];
  warningCodes: string[];
};

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

function asFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const values = value.map(asString);
  if (values.some((entry) => entry === null)) return null;
  return values as string[];
}

function parseDate(value: unknown): Date | null {
  if (!(typeof value === 'string' || value instanceof Date)) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function incomplete(itemId: string, message: string): never {
  return finalApprovalError('INCOMPLETE_BATCH_PAYLOAD', 422, message, { itemId });
}

function validationFailed(itemId: string, message: string): never {
  return finalApprovalError('FINAL_APPROVAL_VALIDATION_FAILED', 422, message, { itemId });
}

function contextUnavailable(itemId: string, message: string): never {
  return finalApprovalError('VALIDATION_CONTEXT_UNAVAILABLE', 422, message, { itemId });
}

function requireSameNumber(
  itemId: string,
  fieldName: string,
  actual: unknown,
  expected: number | null,
): void {
  const parsed = asFiniteNumber(actual);
  if (parsed === null || expected === null || parsed !== expected) {
    validationFailed(itemId, `${fieldName} 값이 최신 DB 문맥과 일치하지 않습니다.`);
  }
}

function validateOperationValues(input: {
  item: FinalApprovalJobItem;
  candidate: JsonRecord;
  dryRunItem: JsonRecord;
  currentPrice: number | null;
  currentStock: number | null;
  targetPrice: number;
  targetStock: number;
}): void {
  const { item, candidate, dryRunItem } = input;
  const itemId = item.id;
  const previewBefore = asRecord(item.previewBefore) ?? incomplete(itemId, 'previewBefore 구조가 올바르지 않습니다.');
  const previewAfter = asRecord(item.previewAfter) ?? incomplete(itemId, 'previewAfter 구조가 올바르지 않습니다.');
  const dryRunBefore = asRecord(dryRunItem.before) ?? incomplete(itemId, 'dryRunItem.before 구조가 올바르지 않습니다.');
  const dryRunAfter = asRecord(dryRunItem.after) ?? incomplete(itemId, 'dryRunItem.after 구조가 올바르지 않습니다.');

  const validatesPrice = item.operation === 'UPDATE_PRICE' || item.operation === 'UPDATE_PRICE_AND_STOCK';
  const validatesStock = item.operation === 'UPDATE_STOCK' || item.operation === 'UPDATE_PRICE_AND_STOCK';

  if (validatesPrice) {
    requireSameNumber(itemId, 'candidate.currentSmartstorePrice', candidate.currentSmartstorePrice, input.currentPrice);
    requireSameNumber(itemId, 'previewBefore.price', previewBefore.price, input.currentPrice);
    requireSameNumber(itemId, 'dryRunItem.before.price', dryRunBefore.price, input.currentPrice);
    requireSameNumber(itemId, 'candidate.calculatedTargetPrice', candidate.calculatedTargetPrice, input.targetPrice);
    requireSameNumber(itemId, 'previewAfter.price', previewAfter.price, input.targetPrice);
    requireSameNumber(itemId, 'dryRunItem.after.price', dryRunAfter.price, input.targetPrice);
    if (asBoolean(candidate.hasPriceChange) !== true || input.currentPrice === input.targetPrice) {
      validationFailed(itemId, '가격 변경 근거가 최신 문맥과 일치하지 않습니다.');
    }
  }

  if (validatesStock) {
    requireSameNumber(itemId, 'candidate.currentSmartstoreStock', candidate.currentSmartstoreStock, input.currentStock);
    requireSameNumber(itemId, 'previewBefore.stock', previewBefore.stock, input.currentStock);
    requireSameNumber(itemId, 'dryRunItem.before.stock', dryRunBefore.stock, input.currentStock);
    requireSameNumber(itemId, 'candidate.calculatedTargetStock', candidate.calculatedTargetStock, input.targetStock);
    requireSameNumber(itemId, 'previewAfter.stock', previewAfter.stock, input.targetStock);
    requireSameNumber(itemId, 'dryRunItem.after.stock', dryRunAfter.stock, input.targetStock);
    if (asBoolean(candidate.hasStockChange) !== true || input.currentStock === input.targetStock) {
      validationFailed(itemId, '재고 변경 근거가 최신 문맥과 일치하지 않습니다.');
    }
  }
}

async function readCurrentTarget(
  tx: Prisma.TransactionClient,
  item: FinalApprovalJobItem,
  candidate: JsonRecord,
): Promise<{
  price: number | null;
  stock: number | null;
  syncedAt: Date;
  source: string;
  channelProductNo: string | null;
  storeId: string;
  channelId: string | null;
}> {
  const candidateItemId = asString(candidate.itemId) ?? incomplete(item.id, 'candidate.itemId가 없습니다.');

  if (item.targetType === 'SINGLE') {
    const product = await tx.naverProduct.findUnique({
      where: { id: candidateItemId },
      include: { smartstore: { select: { id: true, naverChannelId: true } } },
    });
    if (!product) contextUnavailable(item.id, '최신 상품 문맥을 찾을 수 없습니다.');
    if (item.targetId !== product.channelProductNo) {
      validationFailed(item.id, '상품 targetId가 최신 상품 문맥과 일치하지 않습니다.');
    }
    return {
      price: product.currentSalePrice,
      stock: product.currentStockQuantity,
      syncedAt: product.currentStateSyncedAt ?? contextUnavailable(item.id, '상품 동기화 시각이 없습니다.'),
      source: product.currentStateSource ?? '',
      channelProductNo: product.channelProductNo,
      storeId: product.smartstore.id,
      channelId: product.smartstore.naverChannelId,
    };
  }

  if (item.targetType === 'OPTION') {
    const option = await tx.naverProductOption.findUnique({
      where: { id: item.targetId },
      include: {
        naverProduct: {
          include: { smartstore: { select: { id: true, naverChannelId: true } } },
        },
      },
    });
    if (!option) contextUnavailable(item.id, '최신 옵션 문맥을 찾을 수 없습니다.');
    if (candidateItemId !== option.id) {
      validationFailed(item.id, '옵션 candidate 식별자가 최신 문맥과 일치하지 않습니다.');
    }
    return {
      price: option.currentSalePrice,
      stock: option.currentStockQuantity,
      syncedAt: option.currentStateSyncedAt ?? contextUnavailable(item.id, '옵션 동기화 시각이 없습니다.'),
      source: option.currentStateSource ?? '',
      channelProductNo: option.naverProduct.channelProductNo,
      storeId: option.naverProduct.smartstore.id,
      channelId: option.naverProduct.smartstore.naverChannelId,
    };
  }

  const additional = await tx.naverProductAdditional.findUnique({
    where: { id: item.targetId },
    include: {
      naverProduct: {
        include: { smartstore: { select: { id: true, naverChannelId: true } } },
      },
    },
  });
  if (!additional) contextUnavailable(item.id, '최신 추가상품 문맥을 찾을 수 없습니다.');
  if (candidateItemId !== additional.id) {
    validationFailed(item.id, '추가상품 candidate 식별자가 최신 문맥과 일치하지 않습니다.');
  }
  return {
    price: additional.price,
    stock: additional.stockQuantity,
    syncedAt: additional.currentStateSyncedAt ?? contextUnavailable(item.id, '추가상품 동기화 시각이 없습니다.'),
    source: additional.currentStateSource ?? '',
    channelProductNo: additional.naverProduct.channelProductNo,
    storeId: additional.naverProduct.smartstore.id,
    channelId: additional.naverProduct.smartstore.naverChannelId,
  };
}

async function validateLinkedSku(
  tx: Prisma.TransactionClient,
  item: FinalApprovalJobItem,
  candidate: JsonRecord,
): Promise<{ targetPrice: number; targetStock: number }> {
  const linkedSkus = Array.isArray(candidate.linkedSkus) ? candidate.linkedSkus : null;
  if (!linkedSkus || linkedSkus.length !== 1 || asBoolean(candidate.isSetProduct) !== false) {
    finalApprovalError(
      'UNSUPPORTED_BATCH_OPERATION',
      422,
      'v1 최종 승인은 단일 SKU 계산 근거만 지원합니다.',
      { itemId: item.id },
    );
  }

  const linkedSku = asRecord(linkedSkus[0]) ?? incomplete(item.id, 'linkedSkus 구조가 올바르지 않습니다.');
  const skuId = asString(linkedSku.skuId) ?? incomplete(item.id, 'linkedSkus.skuId가 없습니다.');
  const quantity = asFiniteNumber(linkedSku.quantity);
  if (quantity !== 1 || item.calculationType !== 'SINGLE') {
    finalApprovalError(
      'UNSUPPORTED_BATCH_OPERATION',
      422,
      'v1 최종 승인은 수량 1의 SINGLE 계산만 지원합니다.',
      { itemId: item.id },
    );
  }

  const sku = await tx.sku.findUnique({ where: { id: skuId } });
  if (!sku) contextUnavailable(item.id, '최신 SKU 계산 문맥을 찾을 수 없습니다.');

  const targetPrice = Number(sku.sellingPrice);
  const targetStock = sku.stockQuantity;
  if (
    asString(linkedSku.skuCode) !== sku.skuCode
    || asFiniteNumber(linkedSku.sellingPrice) !== targetPrice
    || asFiniteNumber(linkedSku.costPrice) !== Number(sku.costPrice)
    || asFiniteNumber(linkedSku.stockQuantity) !== targetStock
  ) {
    validationFailed(item.id, '저장된 SKU 계산 근거가 최신 DB 문맥과 일치하지 않습니다.');
  }

  return { targetPrice, targetStock };
}

function collectWarningCodes(itemId: string, candidate: JsonRecord): string[] {
  const warnings = new Set<string>();
  const riskTypes = asStringArray(candidate.riskTypes) ?? incomplete(itemId, 'candidate.riskTypes 구조가 올바르지 않습니다.');
  for (const riskType of riskTypes) {
    if (FINAL_APPROVAL_WARNING_CODES.has(riskType)) warnings.add(riskType);
    else validationFailed(itemId, `차단 위험 ${riskType}이 남아 있습니다.`);
  }

  if (!Array.isArray(candidate.issues)) incomplete(itemId, 'candidate.issues 구조가 올바르지 않습니다.');
  for (const issueValue of candidate.issues) {
    const issue = asRecord(issueValue) ?? incomplete(itemId, 'candidate.issues 항목 구조가 올바르지 않습니다.');
    const code = asString(issue.code) ?? incomplete(itemId, 'candidate issue code가 없습니다.');
    if (FINAL_APPROVAL_WARNING_CODES.has(code)) warnings.add(code);
    else validationFailed(itemId, `차단 issue ${code}가 남아 있습니다.`);
  }

  return Array.from(warnings).sort();
}

async function validateItem(input: {
  tx: Prisma.TransactionClient;
  job: FinalApprovalJob;
  item: FinalApprovalJobItem;
  validatedAt: Date;
  expiresAt: Date;
}): Promise<ValidatedFinalApprovalItem> {
  const { tx, job, item, validatedAt, expiresAt } = input;
  if (item.batchJobId !== job.id) {
    finalApprovalError('BATCH_STATE_CONFLICT', 409, '다른 Job의 item이 승인 범위에 포함되었습니다.');
  }
  if (item.status !== 'READY') {
    finalApprovalError('BATCH_STATE_CONFLICT', 409, '모든 item이 READY 상태여야 합니다.', { itemId: item.id });
  }
  if (!ALLOWED_TARGET_TYPES.has(item.targetType) || !asString(item.targetId) || !asString(item.storeId)) {
    incomplete(item.id, 'item 대상 식별자 구조가 올바르지 않습니다.');
  }
  if (!ALLOWED_OPERATIONS.has(item.operation)) {
    finalApprovalError('UNSUPPORTED_BATCH_OPERATION', 422, '지원하지 않는 Batch operation입니다.', { itemId: item.id });
  }

  const requestPayload = asRecord(item.requestPayload) ?? incomplete(item.id, 'requestPayload 구조가 올바르지 않습니다.');
  const candidate = asRecord(requestPayload.candidate) ?? incomplete(item.id, 'requestPayload.candidate가 없습니다.');
  const dryRunItem = asRecord(requestPayload.dryRunItem) ?? incomplete(item.id, 'requestPayload.dryRunItem이 없습니다.');

  if (asBoolean(dryRunItem.executable) !== true) validationFailed(item.id, 'dryRunItem.executable이 true가 아닙니다.');
  const blockedReasons = asStringArray(dryRunItem.blockedReasons)
    ?? incomplete(item.id, 'dryRunItem.blockedReasons 구조가 올바르지 않습니다.');
  if (blockedReasons.length > 0) validationFailed(item.id, 'dry-run 차단 사유가 남아 있습니다.');
  if (asString(dryRunItem.riskLevel) === 'HIGH') validationFailed(item.id, 'HIGH 위험 item은 승인할 수 없습니다.');
  if (
    asString(candidate.status) !== 'READY_FOR_REVIEW'
    || asBoolean(candidate.executable) !== true
    || asBoolean(candidate.draftCreatable) !== true
  ) {
    validationFailed(item.id, 'candidate가 실행 가능한 검토 완료 상태가 아닙니다.');
  }
  if ((asString(candidate.reviewMessage) ?? '').includes('매칭: optionValue')) {
    validationFailed(item.id, 'optionValue fallback 매칭 후보는 승인할 수 없습니다.');
  }

  const expectedCandidateType = item.targetType === 'SINGLE' ? 'PRODUCT' : item.targetType;
  if (asString(candidate.candidateType) !== expectedCandidateType) {
    validationFailed(item.id, 'candidateType과 item targetType이 일치하지 않습니다.');
  }
  if (asString(candidate.storeId) !== item.storeId) {
    validationFailed(item.id, 'candidate storeId와 item storeId가 일치하지 않습니다.');
  }

  const currentTarget = await readCurrentTarget(tx, item, candidate);
  if (currentTarget.storeId !== item.storeId) validationFailed(item.id, '대상의 스토어가 item과 일치하지 않습니다.');
  if (currentTarget.channelProductNo !== item.channelProductNo) {
    validationFailed(item.id, '대상의 상품번호가 item과 일치하지 않습니다.');
  }
  if (asString(candidate.channelProductNo) !== item.channelProductNo) {
    validationFailed(item.id, 'candidate 상품번호가 item과 일치하지 않습니다.');
  }
  const candidateChannelId = asString(candidate.channelId);
  if (candidateChannelId && candidateChannelId !== currentTarget.channelId) {
    validationFailed(item.id, 'candidate channelId가 최신 스토어 문맥과 일치하지 않습니다.');
  }

  if (currentTarget.source !== CURRENT_STATE_SOURCE || asString(candidate.currentStateSource) !== CURRENT_STATE_SOURCE) {
    validationFailed(item.id, 'NAVER_PRODUCT_COLLECTION 문맥만 최종 승인할 수 있습니다.');
  }
  const candidateSyncedAt = parseDate(candidate.currentStateSyncedAt)
    ?? incomplete(item.id, 'candidate.currentStateSyncedAt이 유효하지 않습니다.');
  if (candidateSyncedAt.getTime() !== currentTarget.syncedAt.getTime()) {
    validationFailed(item.id, '저장된 문맥 동기화 시각과 최신 DB 문맥이 일치하지 않습니다.');
  }
  const contextAgeMs = validatedAt.getTime() - currentTarget.syncedAt.getTime();
  if (contextAgeMs < 0 || contextAgeMs > CURRENT_CONTEXT_MAX_AGE_MS) {
    validationFailed(item.id, 'NAVER_PRODUCT_COLLECTION 문맥이 24시간 freshness 기준을 충족하지 않습니다.');
  }

  const { targetPrice, targetStock } = await validateLinkedSku(tx, item, candidate);
  validateOperationValues({
    item,
    candidate,
    dryRunItem,
    currentPrice: currentTarget.price,
    currentStock: currentTarget.stock,
    targetPrice,
    targetStock,
  });

  const warningCodes = collectWarningCodes(item.id, candidate);
  return {
    item,
    candidate,
    dryRunItem,
    validationResult: {
      schemaVersion: '1',
      validatorVersion: 'SKU_KEYWORD_FINAL_APPROVAL_VALIDATOR_V1',
      warningPolicyVersion: 'SKU_KEYWORD_FINAL_APPROVAL_WARNING_V1',
      jobId: job.id,
      jobItemId: item.id,
      validatedAt: validatedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      currentStateSource: CURRENT_STATE_SOURCE,
      currentStateSyncedAt: currentTarget.syncedAt.toISOString(),
      currentState: {
        price: currentTarget.price,
        stock: currentTarget.stock,
      },
      blockerCodes: [],
      stale: false,
      riskLevel: warningCodes.length > 0 ? 'MEDIUM' : 'LOW',
      warningCodes,
      canExecute: true,
    },
  };
}

export async function validateSkuKeywordFinalApprovalJob(input: {
  tx: Prisma.TransactionClient;
  job: FinalApprovalJob;
  validatedAt: Date;
  expiresAt: Date;
  acknowledgedWarnings: string[];
}): Promise<ValidateFinalApprovalJobResult> {
  const { tx, job, validatedAt, expiresAt } = input;
  const validatedItems: ValidatedFinalApprovalItem[] = [];
  const warningCodes = new Set<string>();

  for (const item of [...job.items].sort((left, right) => left.id.localeCompare(right.id))) {
    const result = await validateItem({ tx, job, item, validatedAt, expiresAt });
    validatedItems.push(result);
    result.validationResult.warningCodes.forEach((code) => warningCodes.add(code));
  }

  const actualWarnings = Array.from(warningCodes).sort();
  const acknowledged = [...input.acknowledgedWarnings].sort();
  if (
    actualWarnings.length !== acknowledged.length
    || actualWarnings.some((code, index) => code !== acknowledged[index])
  ) {
    finalApprovalError(
      'FINAL_APPROVAL_VALIDATION_FAILED',
      422,
      '현재 경고 code 전체를 정확히 확인해야 합니다.',
      { warningCodes: actualWarnings },
    );
  }

  return { items: validatedItems, warningCodes: actualWarnings };
}
