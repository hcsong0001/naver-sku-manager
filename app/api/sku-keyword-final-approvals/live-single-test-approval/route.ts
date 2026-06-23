/**
 * POST /api/sku-keyword-final-approvals/live-single-test-approval
 *
 * Live 단일 테스트 승인 기록 저장 API.
 * 승인 기록을 NaverApiBatchJob.metadata.liveSingleTestApprovalAudit 에 저장합니다.
 *
 * Safety invariants (always enforced, never bypassed):
 *   - naverApiCallAllowed is ALWAYS false in every response
 *   - liveExecutionEnabled is ALWAYS false in every response
 *   - No Naver API calls
 *   - No Queue enqueue
 *   - No Worker calls
 *   - No Live adapter interactions
 *   - This is a record-only API — it does NOT trigger execution
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  buildLiveSingleTestApprovalAuditRecord,
} from '@/src/services/sku-keyword-final-approval-execution-live-single-test-approval-audit.service';
import { REQUIRED_ACKNOWLEDGEMENTS } from '@/src/services/sku-keyword-final-approval-execution-live-single-test-approval-guard.service';

const TERMINAL_JOB_STATUSES = new Set(['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED']);

export async function POST(request: Request) {
  // 1. Parse JSON body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const b = body as Record<string, unknown>;

  // 2. confirmApprovalRecordOnly guard
  if (b.confirmApprovalRecordOnly !== true) {
    return NextResponse.json(
      {
        ok: false,
        error: 'confirmApprovalRecordOnly must be true. 이 API는 승인 기록 저장 전용입니다.',
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 400 }
    );
  }

  // 3. Required fields
  const finalApprovalId = typeof b.finalApprovalId === 'string' ? b.finalApprovalId.trim() : null;
  const batchJobId = typeof b.batchJobId === 'string' ? b.batchJobId.trim() : null;
  const acknowledgedItems = Array.isArray(b.acknowledgedItems)
    ? (b.acknowledgedItems as unknown[]).filter((x): x is string => typeof x === 'string')
    : [];
  const actorId =
    typeof b.actorId === 'string' && b.actorId.trim() ? b.actorId.trim() : 'UI_USER';

  if (!finalApprovalId || !batchJobId) {
    return NextResponse.json(
      { ok: false, error: 'finalApprovalId와 batchJobId가 필요합니다.' },
      { status: 400 }
    );
  }

  // 4. Validate acknowledgements
  const requiredAcknowledgements = [...REQUIRED_ACKNOWLEDGEMENTS];
  const missingAcknowledgements = requiredAcknowledgements.filter(
    a => !acknowledgedItems.includes(a)
  );
  if (missingAcknowledgements.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: `필수 확인 항목이 누락되었습니다. 누락: ${missingAcknowledgements.join(', ')}`,
        missingAcknowledgements,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 400 }
    );
  }

  // 5. DB reads — BatchJob + FinalApprovals + Items
  let job;
  try {
    job = await prisma.naverApiBatchJob.findUnique({
      where: { id: batchJobId },
      include: {
        items: { orderBy: { createdAt: 'asc' } },
        finalApprovals: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'DB 조회 오류' },
      { status: 500 }
    );
  }

  if (!job) {
    return NextResponse.json(
      { ok: false, error: 'BatchJob을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  // 6. Final Approval 존재 및 ACTIVE 확인
  const activeFinalApproval =
    job.finalApprovals.find(a => String(a.status) === 'ACTIVE') ?? null;

  if (!activeFinalApproval) {
    return NextResponse.json(
      {
        ok: false,
        error: 'ACTIVE 상태의 Final Approval이 없습니다.',
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  if (activeFinalApproval.id !== finalApprovalId) {
    return NextResponse.json(
      {
        ok: false,
        error: 'finalApprovalId가 현재 ACTIVE Final Approval ID와 일치하지 않습니다.',
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 7. BatchJob 상태 확인
  const jobStatus = String(job.status);

  if (TERMINAL_JOB_STATUSES.has(jobStatus)) {
    return NextResponse.json(
      {
        ok: false,
        error: `BatchJob이 이미 완료 상태입니다 (${jobStatus}). 재실행은 별도 승인 흐름에서만 가능합니다.`,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  if (jobStatus === 'EXECUTING') {
    return NextResponse.json(
      {
        ok: false,
        error: 'BatchJob이 현재 실행 중입니다. 동시 실행은 허용되지 않습니다.',
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  if (jobStatus !== 'APPROVED') {
    return NextResponse.json(
      {
        ok: false,
        error: `BatchJob 상태가 APPROVED가 아닙니다 (현재: ${jobStatus}).`,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 8. item 수 정확히 1건 (Live 단일 테스트 조건)
  if (job.totalItems !== 1) {
    return NextResponse.json(
      {
        ok: false,
        error: `Live 단일 테스트는 item 1건만 허용됩니다 (현재: ${job.totalItems}건).`,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 9. 전체 item READY 확인
  const nonReadyItems = job.items.filter(i => String(i.status) !== 'READY');
  if (nonReadyItems.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: `READY가 아닌 item이 ${nonReadyItems.length}건 있습니다.`,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 10. Replay Guard
  if (job.successItems > 0 || job.failedItems > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: `이미 실행된 항목이 있습니다 (성공: ${job.successItems}건, 실패: ${job.failedItems}건). Replay Guard에 의해 차단됩니다.`,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 11. 안전한 대상 상품 요약 추출
  const firstItem = job.items[0] ?? null;
  const firstPayload = firstItem?.requestPayload as Record<string, unknown> | null;
  const firstCandidate = firstPayload?.candidate as Record<string, unknown> | undefined;
  const firstDryRunItem = firstPayload?.dryRunItem as Record<string, unknown> | undefined;

  const targetProductSummary = firstItem
    ? {
        itemId: firstItem.id,
        targetType: firstItem.targetType,
        targetId: firstItem.targetId,
        channelProductNo: firstItem.channelProductNo ?? null,
        productName:
          typeof firstCandidate?.productName === 'string' ? firstCandidate.productName : null,
        skuCode:
          typeof firstCandidate?.skuCode === 'string' ? firstCandidate.skuCode : null,
        changeType:
          typeof firstDryRunItem?.changeType === 'string' ? firstDryRunItem.changeType : null,
      }
    : null;

  const payloadSummary = firstDryRunItem
    ? {
        changeType: firstDryRunItem.changeType ?? null,
        riskLevel: firstDryRunItem.riskLevel ?? null,
        before: firstDryRunItem.before ?? null,
        after: firstDryRunItem.after ?? null,
      }
    : null;

  // 12. Build audit record (pure function, no side effects)
  const recordedAt = new Date().toISOString();
  const auditRecord = buildLiveSingleTestApprovalAuditRecord({
    finalApprovalId: activeFinalApproval.id,
    batchJobId: job.id,
    actorId,
    acknowledgedItems,
    requiredAcknowledgements,
    targetProductSummary,
    payloadSummary,
    adapterMode: null,
    naverApiCalled: false,
    recordedAt,
  });

  // 13. Save audit record to BatchJob metadata
  const currentMetadata = (job.metadata ?? {}) as Record<string, unknown>;
  // JSON.parse(JSON.stringify(...)) normalizes typed-literal booleans and produces `any`,
  // which Prisma accepts for the Json? field type.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newMetadata = JSON.parse(JSON.stringify({
    ...currentMetadata,
    liveSingleTestApprovalAudit: auditRecord,
  }));
  try {
    await prisma.naverApiBatchJob.update({
      where: { id: batchJobId },
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        metadata: newMetadata,
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : '승인 기록 저장 오류' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    approvalRecordStatus: 'RECORDED_BUT_NOT_EXECUTABLE',
    approvalCode: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
    auditRecord,
    message:
      'Live 단일 테스트 승인 기록이 저장되었습니다. 실제 Naver API 호출은 아직 비활성화되어 있습니다.',
  });
}
