/**
 * @jest-environment node
 */
import type { JSX } from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import { useWindowSize } from '../src/use-window-size';

describe('useWindowSize SSR', () => {
  it('should return 0,0 on server', () => {
    const TestComponent = (): JSX.Element => {
      const { width, height } = useWindowSize();

      return <div>{`width:${width},height:${height}`}</div>;
    };

    const html = renderToStaticMarkup(<TestComponent />);

    expect(html).toBe('<div>width:0,height:0</div>');
  });
});
