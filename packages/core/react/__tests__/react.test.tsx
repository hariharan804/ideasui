import { render, screen } from '@testing-library/react';

import { Button, ThemeProvider } from '../src';

describe('@ideasui/react smoke tests', () => {
  it('should export and render Button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should export and render ThemeProvider', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
