import { NextResponse } from 'next/server';
import { buildSkuKeywordBulkLikeCandidates } from '@/src/services/sku-keyword-bulk-like-candidate.service';
import { hydrateSkuKeywordDraftSeeds } from '@/src/services/sku-keyword-draft-hydrate.service';
import { buildSkuKeywordDraftSeedCandidates } from '@/src/services/sku-keyword-draft-seed.service';
import type {
  SkuKeywordDraftPreviewRequest,
  SkuKeywordDraftPreviewResponse,
} from '@/src/types/sku-keyword-draft-preview.types';
import type {
  SkuKeywordBulkLikeCandidate,
} from '@/src/types/sku-keyword-bulk-like-candidate.types';
import type {
  SkuKeywordDraftSeedManualSelections,
} from '@/src/types/sku-keyword-draft-seed.types';
import type {
  MatchMethod,
  SkuKeywordMatchedRow,
  SkuKeywordWarningRow,
} from '@/src/types/sku-keyword-matching.types';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isMatchMethod(value: unknown): value is MatchMethod {
  return value === 'EXACT' || value === 'NORMALIZED_EXACT' || value === 'PARTIAL';
}

function isMatchedRow(value: unknown): value is SkuKeywordMatchedRow {
  if (!isRecord(value)) return false;

  return (
    isString(value.mappingType)
    && isString(value.channelProductNo)
    && isString(value.itemId)
    && isString(value.sourceText)
    && isString(value.matchedKeyword)
    && isString(value.keywordColumn)
    && isFiniteNumber(value.productManagementRowNo)
    && isString(value.barcode)
    && isString(value.skuCode)
    && isFiniteNumber(value.quantity)
    && isMatchMethod(value.matchMethod)
    && isFiniteNumber(value.confidence)
    && isString(value.memo)
    && typeof value.applyEligible === 'boolean'
    && isString(value.reviewReason)
  );
}

function isWarningRow(value: unknown): value is SkuKeywordWarningRow {
  if (!isRecord(value)) return false;

  return (
    isString(value.mappingType)
    && isString(value.channelProductNo)
    && isString(value.itemId)
    && isString(value.sourceText)
    && isString(value.matchedKeyword)
    && isString(value.keywordColumn)
    && isFiniteNumber(value.productManagementRowNo)
    && isString(value.barcode)
    && isString(value.skuCode)
    && isString(value.warningType)
    && isString(value.warningMessage)
    && isMatchMethod(value.matchMethod)
    && isFiniteNumber(value.confidence)
    && isString(value.memo)
  );
}

function isManualSelections(value: unknown): value is SkuKeywordDraftSeedManualSelections {
  if (value === undefined) return true;
  if (!isRecord(value)) return false;

  return Object.values(value).every((selectionRows) =>
    Array.isArray(selectionRows)
    && selectionRows.every((selection) =>
      isRecord(selection)
      && isString(selection.id)
      && isString(selection.skuCode)
      && isString(selection.barcode)
      && isFiniteNumber(selection.quantity)
      && (selection.skuName === undefined || selection.skuName === null || isString(selection.skuName))
      && (selection.sellerProductCode === undefined || selection.sellerProductCode === null || isString(selection.sellerProductCode))
    ));
}

function isDraftPreviewRequest(value: unknown): value is SkuKeywordDraftPreviewRequest {
  if (!isRecord(value)) return false;
  if (!isRecord(value.preview)) return false;
  if (!Array.isArray(value.preview.matchedRows) || !Array.isArray(value.preview.warningRows)) return false;
  if (!value.preview.matchedRows.every(isMatchedRow)) return false;
  if (!value.preview.warningRows.every(isWarningRow)) return false;
  if (!isManualSelections(value.manualSelections)) return false;
  return true;
}

function incrementCount<T extends string>(
  target: Partial<Record<T, number>>,
  key: T,
): void {
  target[key] = (target[key] ?? 0) + 1;
}

function buildResponse(
  input: SkuKeywordDraftPreviewRequest,
): Promise<SkuKeywordDraftPreviewResponse> {
  const manualSelections = input.manualSelections ?? {};
  const seeds = buildSkuKeywordDraftSeedCandidates({
    preview: input.preview,
    manualSelections,
  });

  return hydrateSkuKeywordDraftSeeds({ seeds }).then((hydrateResult) => {
    const bulkLikeResult = buildSkuKeywordBulkLikeCandidates({
      candidates: hydrateResult.candidates,
    });

    const hydrateIssueCounts: Partial<Record<string, number>> = {};
    const bulkLikeRiskCounts: Partial<Record<string, number>> = {};
    const statusCounts = {
      READY_FOR_REVIEW: 0,
      NEEDS_CONTEXT: 0,
    } as const satisfies Record<SkuKeywordBulkLikeCandidate['status'], number>;
    const mutableStatusCounts: Record<SkuKeywordBulkLikeCandidate['status'], number> = {
      READY_FOR_REVIEW: statusCounts.READY_FOR_REVIEW,
      NEEDS_CONTEXT: statusCounts.NEEDS_CONTEXT,
    };
    const seedSourceCounts = {
      MATCHED_ROW: 0,
      WARNING_MANUAL_SELECTION: 0,
    };

    for (const seed of seeds) {
      seedSourceCounts[seed.source] += 1;
    }

    for (const candidate of hydrateResult.candidates) {
      for (const issue of candidate.issues) {
        incrementCount(hydrateIssueCounts, issue.code);
      }
    }

    for (const candidate of bulkLikeResult.candidates) {
      mutableStatusCounts[candidate.status] += 1;
      for (const riskType of candidate.riskTypes) {
        incrementCount(bulkLikeRiskCounts, riskType);
      }
    }

    return {
      candidates: bulkLikeResult.candidates,
      summary: {
        matchedRowCount: input.preview.matchedRows.length,
        warningRowCount: input.preview.warningRows.length,
        seedCount: seeds.length,
        matchedSeedCount: seeds.filter((seed) => seed.source === 'MATCHED_ROW').length,
        manualSelectionSeedCount: seeds.filter((seed) => seed.source === 'WARNING_MANUAL_SELECTION').length,
        hydratedCandidateCount: hydrateResult.candidates.length,
        bulkLikeCandidateCount: bulkLikeResult.candidates.length,
        draftCreatableCount: bulkLikeResult.candidates.filter((candidate) => candidate.draftCreatable).length,
        readyForReviewCount: bulkLikeResult.candidates.filter((candidate) => candidate.status === 'READY_FOR_REVIEW').length,
        needsContextCount: bulkLikeResult.candidates.filter((candidate) => candidate.status === 'NEEDS_CONTEXT').length,
        setProductCount: bulkLikeResult.candidates.filter((candidate) => candidate.isSetProduct).length,
        singleProductCount: bulkLikeResult.candidates.filter((candidate) => !candidate.isSetProduct).length,
        priceChangeCandidateCount: bulkLikeResult.candidates.filter((candidate) => candidate.hasPriceChange).length,
        stockChangeCandidateCount: bulkLikeResult.candidates.filter((candidate) => candidate.hasStockChange).length,
        priceAndStockChangeCandidateCount: bulkLikeResult.candidates.filter((candidate) =>
          candidate.hasPriceChange && candidate.hasStockChange).length,
      },
      issueSummary: {
        hydrateIssueCounts,
        bulkLikeRiskCounts,
        statusCounts: mutableStatusCounts,
        seedSourceCounts,
      },
    };
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;

    if (!isDraftPreviewRequest(body)) {
      return NextResponse.json(
        {
          error: 'keyword draft preview 요청 형식이 올바르지 않습니다.',
        },
        { status: 400 },
      );
    }

    const response = await buildResponse(body);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'JSON 본문을 파싱할 수 없습니다.' },
        { status: 400 },
      );
    }

    const message = error instanceof Error ? error.message : '키워드 Draft Preview 생성에 실패했습니다.';
    console.error('키워드 Draft Preview 생성 오류:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
