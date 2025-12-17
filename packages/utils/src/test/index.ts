// Main exports
export * from './react';
export * from './hooks';
export * from './mocks';

// Common test utilities
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitFor = async (
  callback: () => boolean,
  timeout = 5000,
  interval = 50
): Promise<void> => {
  const startTime = Date.now();
  while (!callback()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await sleep(interval);
  }
};

// Test ID helpers
export const testId = (id: string) => ({ 'data-testid': id });
export const getByTestId = (id: string) => `[data-testid="${id}"]`;

// Accessibility helpers
export const expectAccessible = async (_element: HTMLElement) => {
  // Add axe-core or similar accessibility testing
  // expect(element).toBeInTheDocument();
};

// Snapshot helpers
export const createSnapshot = (component: any) => {
  return expect(component).toMatchSnapshot();
};
