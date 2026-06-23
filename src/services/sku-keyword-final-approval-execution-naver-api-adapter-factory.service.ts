import type { NaverApiAdapterPort } from '../types/sku-keyword-final-approval-execution-naver-api.types';
import { createNaverApiMockAdapter } from './sku-keyword-final-approval-execution-naver-api-mock-adapter.service';
import { createNaverApiDisabledAdapter } from './sku-keyword-final-approval-execution-naver-api-disabled-adapter.service';

const BLOCKED_MODES = new Set(['live', 'production', 'prod', 'operating', 'bulk', 'mass']);

export interface NaverApiAdapterFactoryOptions {
  adapterModeEnvValue: string | undefined;
}

export function createNaverApiAdapter(options: NaverApiAdapterFactoryOptions): NaverApiAdapterPort {
  const rawMode = options.adapterModeEnvValue?.trim() ?? '';

  if (BLOCKED_MODES.has(rawMode.toLowerCase())) {
    throw new Error(
      `Naver API adapter mode "${rawMode}" is not allowed — ` +
        'live/production/bulk/mass adapters are blocked; configure mock for non-production environments'
    );
  }

  if (rawMode === 'mock') {
    return createNaverApiMockAdapter();
  }

  // Default (undefined / '' / 'disabled' / any unrecognized value): disabled (safe)
  return createNaverApiDisabledAdapter();
}
