import { parseFinalApprovalExecutionCommand } from './sku-keyword-final-approval-execution-command-validation.service';
import { buildFinalApprovalExecutionEnqueueCommand } from './sku-keyword-final-approval-execution-enqueue-command.service';
import { 
  buildFinalApprovalExecutionApiAcceptedResponse,
  buildFinalApprovalExecutionApiValidationErrorResponse
} from './sku-keyword-final-approval-execution-api-response.service';
import type { 
  FinalApprovalExecutionApiOrchestrationOptions,
  FinalApprovalExecutionApiOrchestrationResult
} from '../types/sku-keyword-final-approval-execution-api-orchestration.types';

export function runFinalApprovalExecutionApiOrchestration(
  requestBody: unknown,
  options: FinalApprovalExecutionApiOrchestrationOptions = {}
): FinalApprovalExecutionApiOrchestrationResult {
  const validationResult = parseFinalApprovalExecutionCommand(requestBody);

  if (!validationResult.success) {
    return buildFinalApprovalExecutionApiValidationErrorResponse(validationResult);
  }

  const enqueueCommand = buildFinalApprovalExecutionEnqueueCommand(
    validationResult.command,
    {
      requestedAt: options.requestedAt,
      mode: options.mode
    }
  );

  return buildFinalApprovalExecutionApiAcceptedResponse(enqueueCommand);
}
