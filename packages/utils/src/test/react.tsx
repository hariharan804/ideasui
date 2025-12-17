import type {RenderOptions} from "@testing-library/react";

import {render} from "@testing-library/react";

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialState?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & CustomRenderOptions,
) {
  const {initialState, ...renderOptions} = options || {};

  // Add your providers here (Redux, Router, Theme, etc.)
  function Wrapper({children}: {children: React.ReactNode}) {
    return <>{children}</>;
  }

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

// Re-export everything from testing library
export * from "@testing-library/react";
export {default as userEvent} from "@testing-library/user-event";
