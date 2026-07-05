import type { RenderOptions, RenderResult } from '@testing-library/react';

import { render } from '@testing-library/react';

import { Wrapper } from './wrapper';

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: unknown;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & CustomRenderOptions,
): RenderResult {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/no-unused-vars
  const { initialState: _initialState, ...renderOptions } = options ?? {};

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

export { default as userEvent } from '@testing-library/user-event';
