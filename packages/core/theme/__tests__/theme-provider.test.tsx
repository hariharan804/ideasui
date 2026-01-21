import { render } from '@testing-library/react';

import { ThemeProvider } from '../src/system/providers/theme-provider';

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-ideasui-theme');
  });

  it('should render children', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('should accept theme configuration props', () => {
    const { container } = render(
      <ThemeProvider defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should apply theme attribute to document element', () => {
    // We render with default settings, which should use data-ideasui-theme
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    // Verify the attribute is set
    // Note: In JSDOM, useEffect runs, so this should update the document
    expect(document.documentElement).toHaveAttribute('data-ideasui-theme', 'dark');
  });

  it('should support system themes', () => {
    const { container } = render(
      <ThemeProvider
        defaultTheme="system"
        systemThemes={{ light: 'custom-light', dark: 'custom-dark' }}
      >
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
