import type { FinalApprovalExecutionEnqueueMode } from './sku-keyword-final-approval-execution-enqueue.types';
import type { 
  FinalApprovalExecutionApiAcceptedResponse,
  FinalApprovalExecutionApiValidationErrorResponse 
} from './sku-keyword-final-approval-execution-api-response.types';

export type FinalApprovalExecutionApiOrchestrationOptions = {
  requestedAt?: string;
  mode?: FinalApprovalExecutionEnqueueMode;
};

export type FinalApprovalExecutionApiOrchestrationResult = 
  | FinalApprovalExecutionApiAcceptedResponse
  | FinalApprovalExecutionApiValidationErrorResponse;
