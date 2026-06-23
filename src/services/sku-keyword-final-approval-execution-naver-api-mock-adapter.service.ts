import type {
  NaverApiAdapterPort,
  NaverApiExecutionCommand,
  NaverApiExecutionItemResult,
} from '../types/sku-keyword-final-approval-execution-naver-api.types';

export interface NaverApiMockAdapterConfig {
  /** Item IDs that should return FAILED status */
  failItemIds?: string[];
  /** Item IDs that should return SKIPPED status */
  skipItemIds?: string[];
}

export function createNaverApiMockAdapter(config?: NaverApiMockAdapterConfig): NaverApiAdapterPort {
  const failIds = new Set(config?.failItemIds ?? []);
  const skipIds = new Set(config?.skipItemIds ?? []);

  return {
    executeItem: async (command: NaverApiExecutionCommand): Promise<NaverApiExecutionItemResult> => {
      if (skipIds.has(command.itemId)) {
        return {
          itemId: command.itemId,
          status: 'SKIPPED',
          naverApiCalled: false,
          mock: true,
        };
      }
      if (failIds.has(command.itemId)) {
        return {
          itemId: command.itemId,
          status: 'FAILED',
          errorCode: 'MOCK_FAILURE',
          errorMessage: 'Mock Naver API failure injected for testing',
          naverApiCalled: false,
          mock: true,
        };
      }
      return {
        itemId: command.itemId,
        status: 'SUCCESS',
        naverApiCalled: false,
        mock: true,
      };
    },
  };
}
