/**
 * POST /api/sku-keyword-final-approvals/naver-auth-token-test-approval
 *
 * 최초 Naver API token 발급 테스트 전 사용자 승인 기록 저장 API.
 * 승인 기록을 NaverApiBatchJob.metadata.naverAuthTokenTestApprovalAudit 에 저장합니다.
 *
 * Safety invariants (always enforced, never bypassed):
 *   - tokenRequestAllowed is ALWAYS false
 *   - accessTokenRequested is ALWAYS false
 *   - tokenIssued is ALWAYS false
 *   - endpointCalled is ALWAYS false
 *   - httpClientCreated is ALWAYS false
 *   - naverApiCallAllowed is ALWAYS false
 *   - liveExecutionEnabled is ALWAYS false
 *   - No Naver API calls
 *   - No endpoint URL resolution
 *   - No fetch/axios/HTTP client
 *   - No authorization header
 *   - No token issuance
 *   - No Queue enqueue
 *   - No Worker calls
 *   - This is a record-only API — it does NOT trigger token issuance
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  buildNaverApiTokenTestApprovalAuditRecord,
  validateNaverApiTokenTestApprovalAcknowledgements,
  REQUIRED_ACKNOWLEDGEMENTS,
} from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-test-approval-audit.service';

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

  // 2. confirmApprovalRecordOnly guard — record-only 모드 필수
  if (b.confirmApprovalRecordOnly !== true) {
    return NextResponse.json(
      {
        ok: false,
        error: 'confirmApprovalRecordOnly must be true. 이 API는 승인 기록 저장 전용입니다. token 발급은 이 API에서 실행되지 않습니다.',
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
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
      {
        ok: false,
        error: 'finalApprovalId와 batchJobId가 필요합니다.',
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 400 }
    );
  }

  // 4. 필수 acknowledgement 검증
  const { valid: ackValid, missing: missingAcknowledgements } =
    validateNaverApiTokenTestApprovalAcknowledgements(acknowledgedItems);

  if (!ackValid) {
    return NextResponse.json(
      {
        ok: false,
        error: `필수 확인 항목이 누락되었습니다. 누락: ${missingAcknowledgements.join(', ')}`,
        missingAcknowledgements,
        requiredCount: REQUIRED_ACKNOWLEDGEMENTS.length,
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 400 }
    );
  }

  // 5. DB reads — BatchJob + FinalApprovals
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

  // 6. FinalApproval ACTIVE 확인
  const activeFinalApproval =
    job.finalApprovals.find(a => String(a.status) === 'ACTIVE') ?? null;

  if (!activeFinalApproval) {
    return NextResponse.json(
      {
        ok: false,
        error: 'ACTIVE 상태의 Final Approval이 없습니다.',
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
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
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 7. BatchJob 상태 확인 (APPROVED 필수)
  const jobStatus = String(job.status);

  if (TERMINAL_JOB_STATUSES.has(jobStatus)) {
    return NextResponse.json(
      {
        ok: false,
        error: `BatchJob이 이미 완료 상태입니다 (${jobStatus}).`,
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
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
        error: 'BatchJob이 현재 실행 중입니다.',
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
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
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 8. item 수 확인 (1건 권장)
  if (job.totalItems !== 1) {
    return NextResponse.json(
      {
        ok: false,
        error: `token 발급 테스트 전 승인 기록은 item 1건만 허용됩니다 (현재: ${job.totalItems}건).`,
        tokenRequestAllowed: false,
        accessTokenRequested: false,
        tokenIssued: false,
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
      },
      { status: 409 }
    );
  }

  // 9. 승인 기록 생성 (pure function — 부작용 없음, token 발급 없음)
  const auditRecord = buildNaverApiTokenTestApprovalAuditRecord({
    batchJobId: job.id,
    finalApprovalId: activeFinalApproval.id,
    actorId,
    acknowledgedItems,
  });

  // 10. 승인 기록을 BatchJob metadata에 저장
  const currentMetadata = (job.metadata ?? {}) as Record<string, unknown>;
  // JSON.parse(JSON.stringify(...)) normalizes typed-literal booleans
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newMetadata = JSON.parse(JSON.stringify({
    ...currentMetadata,
    naverAuthTokenTestApprovalAudit: auditRecord,
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
    audit: auditRecord,
    tokenRequestAllowed: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    tokenIssued: false,
    endpointCalled: false,
    httpClientCreated: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    sanitized: true,
    maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
    message:
      'token 발급 테스트 전 사용자 승인 기록이 저장되었습니다. 이 기록은 실제 token 발급을 실행하지 않습니다.',
  });
}
