import { render } from '@testing-library/react';

import { ThemeScript } from '../src/system/providers/theme-script';

describe('ThemeScript', () => {
  it('should render script tag', () => {
    const { container } = render(<ThemeScript />);
    const script = container.querySelector('script');

    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toContain('try{');
  });

  it('should include nonce if provided', () => {
    const { container } = render(<ThemeScript nonce="test-nonce" />);
    const script = container.querySelector('script');

    expect(script).toHaveAttribute('nonce', 'test-nonce');
  });

  it('should respect default theme prop', () => {
    const { container } = render(<ThemeScript defaultTheme="dark" />);
    const script = container.querySelector('script');

    expect(script?.innerHTML).toContain('def="dark"');
  });
});
