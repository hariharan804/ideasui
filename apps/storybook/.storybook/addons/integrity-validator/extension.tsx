import type { Decorator } from '@storybook/react-vite';

import React, { StrictMode, useMemo } from 'react';
import { useGlobals } from 'storybook/preview-api';

import { STRICT_MODE_GLOBAL_TYPE_ID } from './registry';

/**
 * IdeasUI Strict Mode Decorator
 *
 * Conditionally wraps stories in React.StrictMode based on Storybook globals.
 */
export const withReactStrictMode: Decorator = (Story) => {
  const [globals] = useGlobals();
  const isStrict = useMemo(
    () => globals[STRICT_MODE_GLOBAL_TYPE_ID] === 'true',
    [globals[STRICT_MODE_GLOBAL_TYPE_ID]],
  );

  return isStrict ? (
    <StrictMode>
      <Story />
    </StrictMode>
  ) : (
    <Story />
  );
};
