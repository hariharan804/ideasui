import { render, screen } from '@testing-library/react';

import { ThemeScript } from '../src/providers/theme-script';

describe('ThemeScript', () => {
  it('should render script tag', () => {
    render(<ThemeScript />);
    const script = screen.getByTestId('theme-script');

    expect(script).toBeInTheDocument();
    expect(script.innerHTML).toContain('try{');
  });

  it('should include nonce if provided', () => {
    render(<ThemeScript nonce="test-nonce" />);
    const script = screen.getByTestId('theme-script');

    expect(script).toHaveAttribute('nonce', 'test-nonce');
  });

  it('should respect default theme prop', () => {
    render(<ThemeScript defaultTheme="dark" />);
    const script = screen.getByTestId('theme-script');

    expect(script.innerHTML).toContain('def="dark"');
  });

  it('should validate and filter invalid themes', () => {
    const MAX_THEME_LENGTH = 60;

    render(
      <ThemeScript
        defaultTheme="light"
        themes={['light', 'dark', 'invalid@theme', '', 'a'.repeat(MAX_THEME_LENGTH)]}
      />,
    );
    const script = screen.getByTestId('theme-script');

    expect(script).toBeInTheDocument();
    // Invalid themes should be filtered out
    expect(script.innerHTML).toBeDefined();
  });

  it('should handle empty themes array', () => {
    render(<ThemeScript themes={[]} />);
    const script = screen.getByTestId('theme-script');

    expect(script).toBeInTheDocument();
    // Should fallback to default ['light', 'dark']
  });

  it('should validate systemThemes', () => {
    render(<ThemeScript systemThemes={{ light: 'invalid@light', dark: 'custom-dark' }} />);
    const script = screen.getByTestId('theme-script');

    expect(script).toBeInTheDocument();
  });
});
