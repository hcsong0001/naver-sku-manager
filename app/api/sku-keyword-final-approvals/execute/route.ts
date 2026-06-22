import { NextResponse } from 'next/server';
import { runFinalApprovalExecutionApiQueueEnqueueOrchestration } from '../../../../src/services/sku-keyword-final-approval-execution-api-queue-enqueue-orchestration.service';
import { buildFinalApprovalExecutionApiGuardFailureResponse } from '../../../../src/services/sku-keyword-final-approval-execution-api-response.service';
import { parseFinalApprovalExecutionCommand } from '../../../../src/services/sku-keyword-final-approval-execution-command-validation.service';
import { runFinalApprovalExecutionDbReadGuard } from '../../../../src/services/sku-keyword-final-approval-execution-db-read-guard.service';
import { createFinalApprovalExecutionDbReadGuardPrismaAdapter } from '../../../../src/services/sku-keyword-final-approval-execution-db-read-guard-prisma-adapter.service';
import { prisma } from '../../../../lib/prisma';
import { createFinalApprovalExecutionRouteQueuePort } from '../../../../src/services/sku-keyword-final-approval-execution-route-queue-port-factory.service';

export async function POST(request: Request) {
  // 1. ENABLE_FINAL_APPROVAL_EXECUTION 확인
  if (process.env.ENABLE_FINAL_APPROVAL_EXECUTION !== 'true') {
    const guardResponse = buildFinalApprovalExecutionApiGuardFailureResponse(
      'FINAL_APPROVAL_NOT_ACTIVE',
      'FinalApproval execution is currently disabled globally.',
      403
    );
    return NextResponse.json(guardResponse, { status: 403 });
  }

  // 2. JSON parse
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        statusCode: 400,
        message: 'Invalid JSON body format.',
        errors: [{ code: 'INVALID_JSON', message: 'The request body must be valid JSON.' }]
      },
      { status: 400 }
    );
  }

  // 3. Command validation
  const validationResult = parseFinalApprovalExecutionCommand(body);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 400,
        message: 'Invalid execution command payload.',
        errors: validationResult.errors
      },
      { status: 400 }
    );
  }

  // 4. DB Read Guard
  const guardAdapter = createFinalApprovalExecutionDbReadGuardPrismaAdapter(prisma);
  const guardResult = await runFinalApprovalExecutionDbReadGuard(
    {
      finalApprovalId: validationResult.command.finalApprovalId,
      actorId: validationResult.command.actorId,
      idempotencyKey: validationResult.command.idempotencyKey
    },
    guardAdapter
  );

  if (!guardResult.success) {
    return NextResponse.json(
      {
        success: false,
        statusCode: guardResult.statusCode,
        message: guardResult.message,
        guardCode: guardResult.guardCode
      },
      { status: guardResult.statusCode }
    );
  }

  // 5. ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE 확인
  if (process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE !== 'true') {
    return NextResponse.json(
      {
        success: false,
        statusCode: 503,
        message: 'Queue enqueue is currently disabled.'
      },
      { status: 503 }
    );
  }

  // 6. Queue Port 준비
  const queuePort = createFinalApprovalExecutionRouteQueuePort();
  if (!queuePort) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 503,
        message: 'Queue integration is not available in the current environment.'
      },
      { status: 503 }
    );
  }

  // 7. API Queue Enqueue Orchestration 호출
  const result = await runFinalApprovalExecutionApiQueueEnqueueOrchestration(body, queuePort);

  // 8 & 9. 성공/실패 응답
  return NextResponse.json(result, { status: result.statusCode });
}
