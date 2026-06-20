import { NextResponse } from 'next/server';
import {
  createSkuKeywordFinalApproval,
  parseSkuKeywordFinalApprovalCreateRequest,
} from '@/src/services/sku-keyword-final-approval.service';
import { SkuKeywordFinalApprovalError } from '@/src/services/sku-keyword-final-approval.errors';
import type { SkuKeywordFinalApprovalErrorResponse } from '@/src/types/sku-keyword-final-approval.types';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SYSTEM_PRINCIPAL_PATTERN = /^system:[A-Za-z0-9][A-Za-z0-9._-]{2,127}$/;

function errorResponse(error: SkuKeywordFinalApprovalError): NextResponse {
  const body: SkuKeywordFinalApprovalErrorResponse = {
    ok: false,
    code: error.code,
    message: error.message,
    ...(error.details ? { details: error.details } : {}),
  };
  return NextResponse.json(body, { status: error.httpStatus });
}

function readFinalApprovalActor(): string {
  const enabled = process.env.FINAL_APPROVAL_API_ENABLED === 'true';
  const actorId = process.env.FINAL_APPROVAL_ACTOR_ID;
  if (!enabled || !actorId || !SYSTEM_PRINCIPAL_PATTERN.test(actorId)) {
    throw new SkuKeywordFinalApprovalError(
      'FINAL_APPROVAL_NOT_CONFIGURED',
      503,
      '최종 승인 API가 서버에서 활성화되지 않았습니다.',
    );
  }
  return actorId;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ jobId: string }> },
) {
  try {
    const actorId = readFinalApprovalActor();
    const { jobId } = await context.params;
    if (!UUID_PATTERN.test(jobId)) {
      throw new SkuKeywordFinalApprovalError(
        'INVALID_FINAL_APPROVAL_REQUEST',
        400,
        'jobId 형식이 올바르지 않습니다.',
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new SkuKeywordFinalApprovalError(
        'INVALID_FINAL_APPROVAL_REQUEST',
        400,
        '요청 body가 유효한 JSON이 아닙니다.',
      );
    }

    const parsedRequest = parseSkuKeywordFinalApprovalCreateRequest(rawBody);
    const result = await createSkuKeywordFinalApproval({
      jobId,
      request: parsedRequest,
      actorId,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof SkuKeywordFinalApprovalError) {
      return errorResponse(error);
    }

    return NextResponse.json<SkuKeywordFinalApprovalErrorResponse>(
      {
        ok: false,
        code: 'FINAL_APPROVAL_CREATE_FAILED',
        message: '최종 승인 artifact 생성 중 예상하지 못한 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
