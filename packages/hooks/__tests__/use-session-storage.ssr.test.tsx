/**
 * @jest-environment node
 */
import type { JSX } from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import { useSessionStorage } from '../src/use-session-storage';

describe('useSessionStorage SSR', () => {
  it('should return initial value on server', () => {
    const TestComponent = (): JSX.Element => {
      const [value] = useSessionStorage('key', 'initial');

      return <div>{value}</div>;
    };

    const html = renderToStaticMarkup(<TestComponent />);

    expect(html).toBe('<div>initial</div>');
  });
});
