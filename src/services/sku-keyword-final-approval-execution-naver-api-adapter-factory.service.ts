import type { NaverApiAdapterPort } from '../types/sku-keyword-final-approval-execution-naver-api.types';
import { createNaverApiMockAdapter } from './sku-keyword-final-approval-execution-naver-api-mock-adapter.service';
import { createNaverApiDisabledAdapter } from './sku-keyword-final-approval-execution-naver-api-disabled-adapter.service';
import { createNaverApiLiveAdapterSkeleton } from './sku-keyword-final-approval-execution-naver-api-live-adapter-skeleton.service';

// live/prod/production/operating/bulk/mass are permanently blocked — these modes must never
// route through to a real Naver API adapter.
const BLOCKED_MODES = new Set(['live', 'production', 'prod', 'operating', 'bulk', 'mass']);

// live-skeleton is a safe structural mode: always returns DISABLED/NOT_IMPLEMENTED, never calls
// any real Naver API endpoint.  It is NOT a bypass for the blocked modes above.
const LIVE_SKELETON_MODES = new Set(['live-skeleton', 'disabled-live-skeleton']);

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

  // live-skeleton / disabled-live-skeleton: structure preview only — always disabled
  if (LIVE_SKELETON_MODES.has(rawMode.toLowerCase())) {
    return createNaverApiLiveAdapterSkeleton();
  }

  // Default (undefined / '' / 'disabled' / any unrecognized value): disabled (safe)
  return createNaverApiDisabledAdapter();
}
