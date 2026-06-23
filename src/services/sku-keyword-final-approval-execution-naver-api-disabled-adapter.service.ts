import type {
  NaverApiAdapterPort,
  NaverApiExecutionItemResult,
} from '../types/sku-keyword-final-approval-execution-naver-api.types';

/**
 * Safe default when no Naver API adapter is configured.
 * Always returns SKIPPED — never makes a live HTTP call.
 * Prevents accidental live API calls in environments that do not provide
 * an explicit adapter mode.
 */
export function createNaverApiDisabledAdapter(): NaverApiAdapterPort {
  return {
    executeItem: async (command): Promise<NaverApiExecutionItemResult> => ({
      itemId: command.itemId,
      status: 'SKIPPED',
      errorCode: 'ADAPTER_DISABLED',
      errorMessage: 'Naver API adapter is disabled — live calls are blocked in this mode',
      naverApiCalled: false,
    }),
  };
}
