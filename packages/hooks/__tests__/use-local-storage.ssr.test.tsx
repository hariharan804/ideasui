/**
 * @jest-environment node
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
});
