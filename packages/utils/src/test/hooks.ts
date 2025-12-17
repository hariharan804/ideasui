import React from 'react';
import { renderHook, RenderHookOptions } from '@testing-library/react';

// Custom hook testing utilities
export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result,
  options?: RenderHookOptions<Props>
) {
  // Add your providers here
  const Wrapper = ({ children }: { children: React.ReactNode }) => children;

  return renderHook(hook, { wrapper: Wrapper, ...options });
}

// Wait for hook to update
export async function waitForHookUpdate(callback: () => void, timeout = 1000) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), timeout);
    callback();
    clearTimeout(timer);
    resolve();
  });
}

// Re-export
export { renderHook } from '@testing-library/react';
