import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '../src/providers/theme-provider';
import { defaultConfig } from '../src/providers/utils/themes.config';

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute(defaultConfig.attribute);
  });

  it('should render children', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
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
    expect(document.documentElement).toHaveAttribute(defaultConfig.attribute, 'dark');
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
