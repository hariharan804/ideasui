import React from 'react';
import '@testing-library/jest-dom';

// Make React available globally in tests
global.React = require('react');

// Mock window.matchMedia
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
}

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    LazyMotion: ({ children }: { children: any }) => children,
    AnimatePresence: ({ children }: { children: any }) => children,
    m: new Proxy(
      {},
      {
        get: (_target, prop) => {
          // eslint-disable-next-line react/display-name
          return ({ children, ...props }: any) => {
            const Component = prop as any;
            return React.createElement(Component, props, children);
          };
        },
      },
    ),
  };
});
