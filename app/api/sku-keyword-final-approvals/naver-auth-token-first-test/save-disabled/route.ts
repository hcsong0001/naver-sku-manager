/**
 * Task 47 - Test DB Save Disabled Adapter Route
 *
 * 이 route는 Test DB 저장 기능이 아직 비활성화 상태임을 알려줍니다.
 *
 * - 실제 저장이 아닙니다.
 * - DB read/write 없음.
 * - Naver API 호출 없음.
 * - token 발급 없음.
 * - Prisma import 없음.
 * - 항상 ok=false, rejected=true, saved=false, writeDisabled=true,
 *   requiresExplicitUserApproval=true 를 반환합니다.
 */

import { NextResponse } from 'next/server';
import { buildDisabledAdapterResult } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-disabled-adapter.service';

export const runtime = 'nodejs';

type RequestBody = {
  gateStatus?: unknown;
  [key: string]: unknown;
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;

    const gateStatus = typeof body.gateStatus === 'string' ? body.gateStatus : undefined;

    const result = buildDisabledAdapterResult({ gateStatus });

    return NextResponse.json({
      ok: false,
      rejected: true,
      saved: false,
      writeDisabled: true,
      requiresExplicitUserApproval: true,
      testDbWriteExecuted: false,
      operatingDbWriteExecuted: false,
      dbWriteExecuted: false,
      prismaMutationExecuted: false,
      goTicketIssued: false,
      tokenIssued: false,
      naverApiCallExecuted: false,
      adapterStatus: result.adapterStatus,
      statusMessage: result.statusMessage,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        rejected: true,
        saved: false,
        writeDisabled: true,
        requiresExplicitUserApproval: true,
        testDbWriteExecuted: false,
        operatingDbWriteExecuted: false,
        dbWriteExecuted: false,
        prismaMutationExecuted: false,
        goTicketIssued: false,
        tokenIssued: false,
        naverApiCallExecuted: false,
        statusMessage: '요청 파싱 실패 — 저장은 비활성화 상태입니다',
      },
      { status: 400 },
    );
  }
}
