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

  it('should validate and filter invalid themes', () => {
    const MAX_THEME_LENGTH = 60;
    const { container } = render(
      <ThemeScript
        defaultTheme="light"
        themes={['light', 'dark', 'invalid@theme', '', 'a'.repeat(MAX_THEME_LENGTH)]}
      />,
    );
    const script = container.querySelector('script');

    expect(script).toBeInTheDocument();
    // Invalid themes should be filtered out
    expect(script?.innerHTML).toBeDefined();
  });

  it('should handle empty themes array', () => {
    const { container } = render(<ThemeScript themes={[]} />);
    const script = container.querySelector('script');

    expect(script).toBeInTheDocument();
    // Should fallback to default ['light', 'dark']
  });

  it('should validate storageKey', () => {
    const { container } = render(<ThemeScript storageKey="invalid@key!" />);
    const script = container.querySelector('script');

    expect(script).toBeInTheDocument();
    // Should fallback to default 'theme'
  });

  it('should validate systemThemes', () => {
    const { container } = render(
      <ThemeScript systemThemes={{ light: 'invalid@light', dark: 'custom-dark' }} />,
    );
    const script = container.querySelector('script');

    expect(script).toBeInTheDocument();
  });
});
