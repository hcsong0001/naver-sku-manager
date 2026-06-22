import { NextResponse } from 'next/server';
import { runFinalApprovalExecutionApiOrchestration } from '../../../../src/services/sku-keyword-final-approval-execution-api-orchestration.service';
import { buildFinalApprovalExecutionApiGuardFailureResponse } from '../../../../src/services/sku-keyword-final-approval-execution-api-response.service';
import { parseFinalApprovalExecutionCommand } from '../../../../src/services/sku-keyword-final-approval-execution-command-validation.service';
import { runFinalApprovalExecutionDbReadGuard } from '../../../../src/services/sku-keyword-final-approval-execution-db-read-guard.service';
import { createFinalApprovalExecutionDbReadGuardPrismaAdapter } from '../../../../src/services/sku-keyword-final-approval-execution-db-read-guard-prisma-adapter.service';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  if (process.env.ENABLE_FINAL_APPROVAL_EXECUTION !== 'true') {
    const guardResponse = buildFinalApprovalExecutionApiGuardFailureResponse(
      'FINAL_APPROVAL_NOT_ACTIVE',
      'FinalApproval execution is currently disabled globally.',
      403
    );
    return NextResponse.json(guardResponse, { status: 403 });
  }

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

  const result = runFinalApprovalExecutionApiOrchestration(body);

  return NextResponse.json(result, { status: result.statusCode });
}
