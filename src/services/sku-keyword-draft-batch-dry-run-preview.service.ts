import type { SkuKeywordBulkLikeCandidate } from '@/src/types/sku-keyword-bulk-like-candidate.types';
import type { SkuKeywordDraftBatchDryRunPreviewResponse } from '@/src/types/sku-keyword-draft-preview.types';

export function buildSkuKeywordDraftBatchDryRunPreview(
  candidates: SkuKeywordBulkLikeCandidate[],
): SkuKeywordDraftBatchDryRunPreviewResponse {
  const summary = {
    receivedCount: candidates.length,
    selectedCount: candidates.length,
    executableCount: 0,
    blockedCount: 0,
    riskCount: 0,
    priceChangeCount: 0,
    stockChangeCount: 0,
    priceAndStockChangeCount: 0,
    optionCount: 0,
    additionalCount: 0,
    singleCount: 0,
    uploadContextCount: 0,
    dbContextCount: 0,
  };

  const issueSummary: Record<string, number> = {};

  const items: SkuKeywordDraftBatchDryRunPreviewResponse['items'] = candidates.map((candidate) => {
    let targetType: 'SINGLE' | 'OPTION' | 'ADDITIONAL' | 'UNKNOWN' = 'UNKNOWN';
    if (candidate.candidateType === 'PRODUCT') targetType = 'SINGLE';
    else if (candidate.candidateType === 'OPTION') targetType = 'OPTION';
    else if (candidate.candidateType === 'ADDITIONAL') targetType = 'ADDITIONAL';

    let changeType: 'PRICE' | 'STOCK' | 'PRICE_AND_STOCK' | 'UNKNOWN' = 'UNKNOWN';
    if (candidate.hasPriceChange && candidate.hasStockChange) changeType = 'PRICE_AND_STOCK';
    else if (candidate.hasPriceChange) changeType = 'PRICE';
    else if (candidate.hasStockChange) changeType = 'STOCK';

    const blockedReasons: string[] = [];
    if (!candidate.draftCreatable) {
      blockedReasons.push('draftCreatable=false (시스템 차단)');
    }
    if (candidate.status === 'NEEDS_CONTEXT') {
      blockedReasons.push('문맥 부족 (NEEDS_CONTEXT)');
    }
    if (candidate.issues.some((i) => i.code === 'CURRENT_PRICE_UNAVAILABLE')) {
      blockedReasons.push('현재 가격 문맥 없음 (CURRENT_PRICE_UNAVAILABLE)');
    }
    if (candidate.issues.some((i) => i.code === 'CURRENT_STOCK_UNAVAILABLE')) {
      blockedReasons.push('현재 재고 문맥 없음 (CURRENT_STOCK_UNAVAILABLE)');
    }

    const warnings: string[] = [];
    if (candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW') {
      warnings.push('업로드 파일 기준 현재값 보강 (실제 스토어값 다를 수 있음)');
    }
    candidate.riskMessages.forEach((msg) => warnings.push(`위험: ${msg}`));
    candidate.issues.forEach((i) => {
      if (i.code === 'CHANNEL_ID_UNAVAILABLE') {
        warnings.push('채널 ID 정보 없음 (CHANNEL_ID_UNAVAILABLE)');
      }
    });

    const executable = blockedReasons.length === 0;

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (blockedReasons.length > 0) riskLevel = 'HIGH';
    else if (warnings.length > 0) riskLevel = 'MEDIUM';

    if (executable) summary.executableCount++;
    else summary.blockedCount++;

    if (riskLevel === 'HIGH' || riskLevel === 'MEDIUM') summary.riskCount++;

    if (changeType === 'PRICE') summary.priceChangeCount++;
    else if (changeType === 'STOCK') summary.stockChangeCount++;
    else if (changeType === 'PRICE_AND_STOCK') {
      summary.priceChangeCount++;
      summary.stockChangeCount++;
      summary.priceAndStockChangeCount++;
    }

    if (targetType === 'OPTION') summary.optionCount++;
    else if (targetType === 'ADDITIONAL') summary.additionalCount++;
    else if (targetType === 'SINGLE') summary.singleCount++;

    if (candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW') summary.uploadContextCount++;
    else summary.dbContextCount++;

    candidate.issues.forEach((i) => {
      issueSummary[i.code] = (issueSummary[i.code] || 0) + 1;
    });

    return {
      candidateId: candidate.id,
      targetType,
      changeType,
      executable,
      blockedReasons,
      warnings,
      riskLevel,
      sourceSummary: candidate.currentStateSource || 'UNKNOWN',
      before: {
        price: candidate.currentSmartstorePrice,
        stock: candidate.currentSmartstoreStock,
      },
      after: {
        price: candidate.calculatedTargetPrice,
        stock: candidate.calculatedTargetStock,
      },
    };
  });

  return {
    ok: true,
    summary,
    items,
    issueSummary,
  };
}
