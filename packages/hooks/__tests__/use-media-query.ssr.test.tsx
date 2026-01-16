/**
 * @jest-environment node
 */
import type { JSX } from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import { useMediaQuery } from '../src/use-media-query';

describe('useMediaQuery SSR', () => {
  it('should return false on server', () => {
    const TestComponent = (): JSX.Element => {
      const matches = useMediaQuery('(min-width: 1024px)');

      return <div>{matches.toString()}</div>;
    };

    const html = renderToStaticMarkup(<TestComponent />);

    expect(html).toBe('<div>false</div>');
  });
});
