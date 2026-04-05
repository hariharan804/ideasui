import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';
import { TransformStream } from 'node:stream/web';

import { createElement } from 'react';
import { vi, expect } from 'vitest';
import * as axeMatchers from 'jest-axe';

// Add jest-axe matchers (they are compatible with vitest as long as we extend expect)
expect.extend(axeMatchers.toHaveNoViolations);

// Make React available globally in tests to support JSX without explicit imports
// @ts-ignore
global.React = { createElement };

// Polyfills for TextEncoder, TextDecoder, and TransformStream
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
// @ts-ignore
global.TransformStream = TransformStream;

// Mock for ResizeObserver which is not available in JSDOM
class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

// Mock for window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock for ResizeObserver
  // @ts-ignore
  window.ResizeObserver = ResizeObserverStub;
}

// Mock IntersectionObserver
// @ts-ignore
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock framer-motion with Vitest
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');

  return {
    ...actual,
    LazyMotion: ({ children }: { children: React.ReactNode }) => children,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    m: new Proxy(
      {},
      {
        get: (_target, prop) => {
          return ({
            children,
            ...props
          }: {
            children?: React.ReactNode;
            [key: string]: unknown;
          }) => {
            const Component = prop as string;

            return createElement(Component, props, children);
          };
        },
      },
    ),
  };
});
