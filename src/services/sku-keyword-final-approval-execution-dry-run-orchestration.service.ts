import {
  buildFinalApprovalExecutionPlan,
  BuildFinalApprovalExecutionPlanInput,
} from './sku-keyword-final-approval-execution-plan-transform.service';
import {
  runFinalApprovalDryRunAdapter,
  DryRunAdapterResult,
  DryRunAdapterFailure,
} from './sku-keyword-final-approval-dry-run-adapter.service';
import type {
  FinalApprovalExecutionPlan,
  FinalApprovalExecutionPlanFailure,
} from '../types/sku-keyword-final-approval-execution-plan.types';

export type RunFinalApprovalExecutionDryRunInput = BuildFinalApprovalExecutionPlanInput;

export type RunFinalApprovalExecutionDryRunResult =
  | {
      ok: true;
      plan: FinalApprovalExecutionPlan;
      dryRunResult: DryRunAdapterResult;
      failures: [];
    }
  | {
      ok: false;
      plan: FinalApprovalExecutionPlan | null;
      dryRunResult: DryRunAdapterResult | null;
      failures: Array<FinalApprovalExecutionPlanFailure | DryRunAdapterFailure>;
    };

export function runFinalApprovalExecutionDryRun(
  input: RunFinalApprovalExecutionDryRunInput,
): RunFinalApprovalExecutionDryRunResult {
  // 1. Build the execution plan from the input state
  const planResult = buildFinalApprovalExecutionPlan(input);

  if (!planResult.ok) {
    return {
      ok: false,
      plan: null,
      dryRunResult: null,
      failures: planResult.failures,
    };
  }

  // 2. Run the execution plan in DRY_RUN mode
  const adapterResult = runFinalApprovalDryRunAdapter({
    now: input.now,
    plan: planResult.plan,
  });

  if (!adapterResult.ok) {
    return {
      ok: false,
      plan: planResult.plan,
      dryRunResult: adapterResult.result,
      failures: adapterResult.failures,
    };
  }

  return {
    ok: true,
    plan: planResult.plan,
    dryRunResult: adapterResult.result,
    failures: [],
  };
}
