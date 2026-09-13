import type { Decorator } from '@storybook/react-vite';

import React, { useEffect, useMemo } from 'react';
import { useGlobals } from 'storybook/preview-api';

import { REACT_SCAN_GLOBAL_TYPE_ID } from './registry';

/**
 * IdeasUI React Scan Decorator
 *
 * Enables or disables React Scan on-demand based on Storybook globals.
 * Uses dynamic import to prevent top-level react-grab fiber crashes during preview load.
 */
export const withReactScan: Decorator = (Story) => {
  const [globals] = useGlobals();
  const isEnabled = useMemo(
    () => globals[REACT_SCAN_GLOBAL_TYPE_ID] === 'true',
    [globals[REACT_SCAN_GLOBAL_TYPE_ID]],
  );

  useEffect(() => {
    if (isEnabled) {
      import('react-scan')
        .then(({ setOptions }) => {
          setOptions({
            enabled: true,
            showToolbar: true,
          });
        })
        .catch((err) => {
          console.warn('[IdeasUI] React Scan disabled due to environment incompatibility:', err);
        });
    }
  }, [isEnabled]);

  return <Story />;
};
