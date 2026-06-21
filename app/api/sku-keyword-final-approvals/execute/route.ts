import { NextResponse } from 'next/server';
import { runFinalApprovalExecutionApiOrchestration } from '../../../../src/services/sku-keyword-final-approval-execution-api-orchestration.service';
import { buildFinalApprovalExecutionApiGuardFailureResponse } from '../../../../src/services/sku-keyword-final-approval-execution-api-response.service';

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

  const result = runFinalApprovalExecutionApiOrchestration(body);

  return NextResponse.json(result, { status: result.statusCode });
}
