import type { Decorator } from '@storybook/react-vite';

import React, { useEffect, useMemo } from 'react';
import { setOptions } from 'react-scan';
import { useGlobals } from 'storybook/preview-api';

import { REACT_SCAN_GLOBAL_TYPE_ID } from './registry';

/**
 * IdeasUI React Scan Decorator
 *
 * Enables or disables React Scan based on Storybook globals.
 */
export const withReactScan: Decorator = (Story) => {
  const [globals] = useGlobals();
  const isEnabled = useMemo(
    () => globals[REACT_SCAN_GLOBAL_TYPE_ID] === 'true',
    [globals[REACT_SCAN_GLOBAL_TYPE_ID]],
  );

  useEffect(() => {
    setOptions({
      enabled: isEnabled,
      showToolbar: isEnabled,
    });
  }, [isEnabled]);

  return <Story />;
};
