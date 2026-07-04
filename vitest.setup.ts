import { TextEncoder, TextDecoder } from 'node:util';
import { TransformStream } from 'node:stream/web';

import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import { createElement } from 'react';

expect.extend(matchers);

// Make React available globally in tests to support JSX without explicit imports
// @ts-ignore
globalThis.React = { createElement };

// Polyfills for TextEncoder, TextDecoder, and TransformStream
globalThis.TextEncoder = TextEncoder;
// @ts-ignore
globalThis.TextDecoder = TextDecoder;
// @ts-ignore
globalThis.TransformStream = TransformStream;

// Mock for ResizeObserver which is not available in JSDOM
class ResizeObserverStub {
  observe(): void {
    // Stub implementation: JSDOM does not support layout queries or element resize observation.
  }
  unobserve(): void {
    // Stub implementation: JSDOM does not support layout queries or element resize observation.
  }
  disconnect(): void {
    // Stub implementation: JSDOM does not support layout queries or element resize observation.
  }
}

// Mock for window.matchMedia
if (globalThis.window !== undefined) {
  Object.defineProperty(globalThis, 'matchMedia', {
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
  globalThis.ResizeObserver = ResizeObserverStub;
}

// Mock IntersectionObserver
// @ts-ignore
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
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
        get: (_target, property) => {
          return ({
            children,
            ...properties
          }: {
            children?: React.ReactNode;
            [key: string]: unknown;
          }) => {
            const Component = property as string;

            return createElement(Component, properties, children);
          };
        },
      },
    ),
  };
});
