// Main exports
export * from './react';
export * from './hooks';

// Common test utilities
const DEFAULT_TIMEOUT = 5000;
const DEFAULT_INTERVAL = 50;

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const waitFor = (
  callback: () => boolean,
  timeout = DEFAULT_TIMEOUT,
  interval = DEFAULT_INTERVAL,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = (): void => {
      try {
        if (callback()) {
          resolve();

          return;
        }
      } catch (error) {
        reject(error);

        return;
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));

        return;
      }

      setTimeout(check, interval);
    };

    check();
  });

// Test ID helpers
export const testId = (id: string): { 'data-testid': string } => ({ 'data-testid': id });
export const getByTestId = (id: string): string => `[data-testid="${id}"]`;

import type { AxeMatchers } from 'vitest-axe';

import { expect } from 'vitest';
import { axe } from 'vitest-axe';

declare module 'vitest' {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

// Accessibility helpers
export const expectAccessible = async (element: HTMLElement): Promise<void> => {
  const results = await axe(element);

  expect(results).toHaveNoViolations();
};

// Snapshot helpers
// export const createSnapshot = (component: any) => {
//   return expect(component).toMatchSnapshot();
// };
