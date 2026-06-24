/**
 * Task 44 - Test DB Save Dry-Run Validation Route
 *
 * 이 route는 Test DB 저장 가능 조건을 서버에서 Dry-run으로만 검증합니다.
 *
 * - 실제 저장이 아닙니다.
 * - DB read/write 없음.
 * - Naver API 호출 없음.
 * - token 발급 없음.
 * - Prisma import 없음.
 * - 요청 body 검증만 수행합니다.
 */

import { NextResponse } from 'next/server';
import { executeDryRunValidation } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-dry-run-validation.service';

export const runtime = 'nodejs';

type RequestBody = {
  jobId?: unknown;
  readinessStatus?: unknown;
  checklistTotalCount?: unknown;
  checklistCheckedCount?: unknown;
  allChecklistChecked?: unknown;
  previewMode?: unknown;
  saveTarget?: unknown;
  acknowledgementKeys?: unknown;
  requestedByUserAction?: unknown;
  dryRunOnly?: unknown;
  [key: string]: unknown;
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;

    const validationResult = executeDryRunValidation({
      jobId: typeof body.jobId === 'string' ? body.jobId : undefined,
      readinessStatus: typeof body.readinessStatus === 'string' ? body.readinessStatus : undefined,
      checklistTotalCount: typeof body.checklistTotalCount === 'number' ? body.checklistTotalCount : undefined,
      checklistCheckedCount: typeof body.checklistCheckedCount === 'number' ? body.checklistCheckedCount : undefined,
      allChecklistChecked: typeof body.allChecklistChecked === 'boolean' ? body.allChecklistChecked : undefined,
      previewMode: typeof body.previewMode === 'boolean' ? body.previewMode : undefined,
      saveTarget: typeof body.saveTarget === 'string' ? body.saveTarget : undefined,
      acknowledgementKeys: Array.isArray(body.acknowledgementKeys)
        ? body.acknowledgementKeys.filter((k): k is string => typeof k === 'string')
        : [],
      requestedByUserAction: typeof body.requestedByUserAction === 'boolean' ? body.requestedByUserAction : undefined,
      dryRunOnly: typeof body.dryRunOnly === 'boolean' ? body.dryRunOnly : undefined,
    });

    return NextResponse.json(validationResult);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        rejected: true,
        rejectionReasons: ['요청 파싱 실패 — 유효한 JSON을 전송하세요'],
        dryRunOnly: true,
        saved: false,
        dbWriteExecuted: false,
        prismaMutationExecuted: false,
        goTicketIssued: false,
        tokenIssued: false,
        nextRequiredAction: '요청 형식을 확인하고 다시 시도하세요',
      },
      { status: 400 },
    );
  }
}
