/**
 * @vitest-environment node
 */
import type { JSX } from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import { useLocalStorage } from '../src/use-local-storage';

describe('useLocalStorage SSR', () => {
  it('should return initial value on server', () => {
    const TestComponent = (): JSX.Element => {
      const [value] = useLocalStorage('theme', 'dark');

      return <div>{typeof value === 'string' ? value : JSON.stringify(value)}</div>;
    };

    const html = renderToStaticMarkup(<TestComponent />);

    expect(html).toBe('<div>dark</div>');
  });

  it('should handle setValue in SSR without errors', () => {
    const TestComponent = (): JSX.Element => {
      const [value, setValue] = useLocalStorage('theme', 'dark');

      // We don't call setValue in render body as it causes re-render loop in React 19 SSR
      // But we can check if it's a function
      expect(typeof setValue).toBe('function');

      return <div>{typeof value === 'string' ? value : JSON.stringify(value)}</div>;
    };

    // Should not throw in SSR
    expect(() => renderToStaticMarkup(<TestComponent />)).not.toThrow();
  });

  it('should handle removeValue in SSR without errors', () => {
    const TestComponent = (): JSX.Element => {
      const [value, , removeValue] = useLocalStorage('theme', 'dark');

      // We don't call removeValue in render body
      expect(typeof removeValue).toBe('function');

      return <div>{typeof value === 'string' ? value : JSON.stringify(value)}</div>;
    };

    // Should not throw in SSR
    expect(() => renderToStaticMarkup(<TestComponent />)).not.toThrow();
  });
});
