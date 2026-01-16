/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { TextEncoder, TextDecoder } = require('util');

const { toHaveNoViolations } = require('jest-axe');

require('@testing-library/jest-dom');

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock for ResizeObserver which is not available in JSDOM
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock for window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock for ResizeObserver
  window.ResizeObserver = ResizeObserverStub;
}

// Polyfills for TextEncoder, TextDecoder, and TransformStream
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof global.TransformStream === 'undefined') {
  const { TransformStream } = require('node:stream/web');

  global.TransformStream = TransformStream;
}
