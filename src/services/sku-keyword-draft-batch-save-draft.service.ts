import prisma from '@/lib/prisma';
import { Prisma } from '@/app/generated/prisma';
import type {
  SkuKeywordDraftBatchSaveDraftRequest,
  SkuKeywordDraftBatchSaveDraftResponse,
} from '@/src/types/sku-keyword-draft-preview.types';
import { buildSkuKeywordDraftBatchDryRunPreview } from './sku-keyword-draft-batch-dry-run-preview.service';

export async function saveSkuKeywordDraftBatchDraft(
  input: SkuKeywordDraftBatchSaveDraftRequest
): Promise<SkuKeywordDraftBatchSaveDraftResponse> {
  const { candidates, selectedCandidateIds, confirmSaveDraftOnly } = input;

  if (!confirmSaveDraftOnly) {
    throw new Error('confirmSaveDraftOnly 값이 true가 아닙니다.');
  }

  if (!selectedCandidateIds || selectedCandidateIds.length === 0) {
    throw new Error('선택된 후보가 없습니다.');
  }

  const selectedCandidates = candidates.filter((c) =>
    selectedCandidateIds.includes(c.id)
  );

  if (selectedCandidates.length === 0) {
    throw new Error('전달된 후보 중 선택된 후보가 존재하지 않습니다.');
  }

  // 서버 dry-run 재검증
  const dryRunResult = buildSkuKeywordDraftBatchDryRunPreview(selectedCandidates);

  if (dryRunResult.summary.blockedCount > 0) {
    const blockedItems = dryRunResult.items.filter((i) => !i.executable);
    const blockedReasons = Array.from(new Set(blockedItems.flatMap((i) => i.blockedReasons)));
    return {
      ok: false,
      status: 'DRAFT',
      receivedCount: candidates.length,
      selectedCount: selectedCandidates.length,
      savedItemCount: 0,
      blockedItemCount: dryRunResult.summary.blockedCount,
      warnings: [],
      blockedReasons,
    };
  }

  const hasRiskHigh = dryRunResult.items.some((i) => i.riskLevel === 'HIGH');
  if (hasRiskHigh) {
    throw new Error('HIGH 위험도의 후보가 포함되어 있어 저장할 수 없습니다.');
  }

  // 통과, DB 트랜잭션으로 DRAFT 저장
  const warnings = Array.from(new Set(dryRunResult.items.flatMap((i) => i.warnings)));

  const jobId = await prisma.$transaction(async (tx) => {
    // Job 생성
    const job = await tx.naverApiBatchJob.create({
      data: {
        jobType: 'PRICE_STOCK_UPDATE',
        module: 'SKU_KEYWORD_MATCHING',
        status: 'DRAFT',
        dryRun: true,
        description: 'SKU Keyword Matching - 수동 검토 및 반영 후보 DRAFT',
        totalItems: dryRunResult.summary.executableCount,
        successItems: 0,
        failedItems: 0,
        skippedItems: 0,
        previewSummary: dryRunResult.summary,
      },
    });

    // Item 생성
    for (const item of dryRunResult.items) {
      const originalCandidate = selectedCandidates.find((c) => c.id === item.candidateId);
      if (!originalCandidate) continue;

      let operation = 'UNKNOWN';
      if (item.changeType === 'PRICE') operation = 'UPDATE_PRICE';
      else if (item.changeType === 'STOCK') operation = 'UPDATE_STOCK';
      else if (item.changeType === 'PRICE_AND_STOCK') operation = 'UPDATE_PRICE_AND_STOCK';

      // targetId는 상품/옵션/추가상품 식별자를 넣습니다.
      let targetId = originalCandidate.channelProductNo || 'UNKNOWN';
      if (originalCandidate.candidateType === 'OPTION' && originalCandidate.itemId) {
        targetId = originalCandidate.itemId;
      } else if (originalCandidate.candidateType === 'ADDITIONAL' && originalCandidate.itemId) {
        targetId = originalCandidate.itemId;
      }

      await tx.naverApiBatchJobItem.create({
        data: {
          batchJobId: job.id,
          storeId: originalCandidate.storeId || 'UNKNOWN_STORE',
          channelProductNo: originalCandidate.channelProductNo,
          targetType: item.targetType,
          targetId: targetId,
          operation,
          previewBefore: item.before as Prisma.InputJsonValue,
          previewAfter: item.after as Prisma.InputJsonValue,
          requestPayload: {
            candidate: originalCandidate,
            dryRunItem: item,
          } as unknown as Prisma.InputJsonValue,
          status: 'DRAFT',
          calculationType: originalCandidate.isSetProduct ? 'BUNDLE' : 'SINGLE',
        },
      });
    }

    return job.id;
  });

  return {
    ok: true,
    jobId,
    status: 'DRAFT',
    receivedCount: candidates.length,
    selectedCount: selectedCandidates.length,
    savedItemCount: dryRunResult.summary.executableCount,
    blockedItemCount: 0,
    warnings,
    blockedReasons: [],
  };
}
