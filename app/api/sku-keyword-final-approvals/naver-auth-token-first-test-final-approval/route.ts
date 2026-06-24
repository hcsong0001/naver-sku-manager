import { NextResponse } from 'next/server';
import { evaluateNaverApiTokenFirstTestFinalApprovalAudit } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';

export async function POST(request: Request) {
  // 본 API는 "운영 DB 접근/write 금지" 원칙에 따라,
  // 입력된 값에 기반하여 Final Approval Record Plan만을 생성하여 반환합니다.
  // 실제 DB 저장은 수행하지 않습니다.

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  const acknowledgedKeys = Array.isArray(b.acknowledgedKeys)
    ? b.acknowledgedKeys.filter((k): k is string => typeof k === 'string')
    : [];

  const result = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
    safetyBoundaryResult: b.safetyBoundaryResult as any,
    executorResult: b.executorResult as any,
    task25ApprovalPresent: Boolean(b.task25ApprovalPresent),
    acknowledgedKeys,
    existingFinalApprovalRecord: b.existingFinalApprovalRecord || null,
    queueEnabled: Boolean(b.queueEnabled),
    workerEnabled: Boolean(b.workerEnabled),
    liveExecutionEnabled: Boolean(b.liveExecutionEnabled),
    finalApprovalStatus: typeof b.finalApprovalStatus === 'string' ? b.finalApprovalStatus : null,
    batchJobStatus: typeof b.batchJobStatus === 'string' ? b.batchJobStatus : null,
    itemCount: typeof b.itemCount === 'number' ? b.itemCount : null,
    itemStatuses: Array.isArray(b.itemStatuses) ? b.itemStatuses.filter(s => typeof s === 'string') : null,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: result.status,
        error: '최초 Token 발급 테스트 최종 승인 검증 실패',
        reasons: result.reasons,
        missingKeys: result.missingKeys,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    status: result.status,
    recordPlan: result.recordPlan,
    message: '안전하게 Final Approval Record Plan이 생성되었습니다. (DB 저장은 비활성화됨)',
    // 항상 안전한 값만 반환
    tokenRequestAllowed: false,
    executorArmed: false,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    clientSecretUsed: false,
    clientSecretSignCreated: false,
    naverApiCallAllowed: false,
    endpointResolved: false,
    endpointCalled: false,
    httpRequestCreated: false,
    httpClientCreated: false,
    authorizationHeaderCreated: false,
    tokenIssued: false,
    tokenStored: false,
    queueAllowed: false,
    workerAllowed: false,
    liveExecutionEnabled: false,
  });
}
