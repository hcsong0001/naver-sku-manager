

export type MockExecutionItemResult = {
  jobItemId: string;
  finalApprovalItemId: string;
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED';
  providerResponseCode?: string | null;
  providerErrorMessage?: string | null;
  timestamp: string;
};

export type MockExecutionResult = {
  success: boolean;
  mode: 'MOCK';
  totalItems: number;
  successItems: number;
  failedItems: number;
  skippedItems: number;
  itemResults: MockExecutionItemResult[];
  errors: string[];
  warnings: string[];
};

export type MockExecutionOptions = {
  failRate?: number;
  failItemIds?: string[];
};
