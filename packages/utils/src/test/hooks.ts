import type { RenderHookOptions } from '@testing-library/react';

import { renderHook } from '@testing-library/react';

import { Wrapper } from './wrapper';

// Custom hook testing utilities
export function renderHookWithProviders<Result, Properties>(
  hook: (properties: Properties) => Result,
  options?: RenderHookOptions<Properties>,
): ReturnType<typeof renderHook<Result, Properties>> {
  // Add your providers here
  return renderHook(hook, { wrapper: Wrapper, ...options });
}

// Wait for hook to update
const DEFAULT_TIMEOUT = 1000;

export async function waitForHookUpdate(
  callback: () => void,
  timeout = DEFAULT_TIMEOUT,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), timeout);

    try {
      callback();
      clearTimeout(timer);
      resolve();
    } catch (error) {
      clearTimeout(timer);
      reject(error);
    }
  });
}

// Re-export
export { renderHook } from '@testing-library/react';
