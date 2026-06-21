import type { FinalApprovalExecutionPlan } from '../types/sku-keyword-final-approval-execution-plan.types';
import type { 
  MockExecutionResult, 
  MockExecutionItemResult, 
  MockExecutionOptions 
} from '../types/sku-keyword-final-approval-mock-execution.types';

export function runFinalApprovalMockExecution(
  plan: FinalApprovalExecutionPlan,
  options: MockExecutionOptions = {}
): MockExecutionResult {
  const result: MockExecutionResult = {
    success: false,
    mode: 'MOCK',
    totalItems: plan.items.length,
    successItems: 0,
    failedItems: 0,
    skippedItems: 0,
    itemResults: [],
    errors: [],
    warnings: []
  };

  if (plan.items.length === 0) {
    result.errors.push('No items to execute in the plan.');
    return result;
  }

  const { failItemIds = [], failRate = 0 } = options;

  for (const item of plan.items) {
    let status: 'SUCCESS' | 'FAILED' | 'SKIPPED' = 'SUCCESS';
    let errorMessage: string | null = null;
    let errorCode: string | null = null;

    if (failItemIds.includes(item.jobItemId)) {
      status = 'FAILED';
      errorMessage = 'Simulated failure by ID';
      errorCode = 'MOCK_ERROR_ID';
    } else if (failRate > 0 && Math.random() < failRate) {
      status = 'FAILED';
      errorMessage = 'Simulated failure by rate';
      errorCode = 'MOCK_ERROR_RATE';
    }

    if (status === 'SUCCESS') {
      result.successItems += 1;
    } else if (status === 'FAILED') {
      result.failedItems += 1;
    } else {
      result.skippedItems += 1;
    }

    const itemResult: MockExecutionItemResult = {
      jobItemId: item.jobItemId,
      finalApprovalItemId: item.finalApprovalItemId,
      status,
      providerResponseCode: errorCode,
      providerErrorMessage: errorMessage,
      timestamp: new Date().toISOString(),
    };

    result.itemResults.push(itemResult);
  }

  result.success = result.failedItems === 0;

  return result;
}
