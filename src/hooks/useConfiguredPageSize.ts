'use client';

import { useCallback, useMemo, useState } from 'react';
import { useUserSettings } from '@/app/components/UserSettingsProvider';
import { DEFAULT_PAGE_SIZE, type CommonPageSize } from '@/src/utils/pagination';

type UseConfiguredPageSizeResult = {
  pageSize: CommonPageSize;
  setPageSize: (value: CommonPageSize) => void;
  resetToConfiguredDefault: () => void;
  configuredDefaultPageSize: CommonPageSize;
};

export function useConfiguredPageSize(): UseConfiguredPageSizeResult {
  const { settings } = useUserSettings();
  const configuredDefaultPageSize = useMemo<CommonPageSize>(
    () => settings.defaultPageSize ?? DEFAULT_PAGE_SIZE,
    [settings.defaultPageSize],
  );
  const [manualPageSize, setManualPageSize] = useState<CommonPageSize>(configuredDefaultPageSize);
  const [hasManualOverride, setHasManualOverride] = useState(false);
  const pageSize = hasManualOverride ? manualPageSize : configuredDefaultPageSize;

  const setPageSize = useCallback((value: CommonPageSize) => {
    setHasManualOverride(true);
    setManualPageSize(value);
  }, []);

  const resetToConfiguredDefault = useCallback(() => {
    setHasManualOverride(false);
    setManualPageSize(configuredDefaultPageSize);
  }, [configuredDefaultPageSize]);

  return {
    pageSize,
    setPageSize,
    resetToConfiguredDefault,
    configuredDefaultPageSize,
  };
}
