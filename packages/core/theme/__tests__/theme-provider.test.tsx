import { render } from '@testing-library/react';

import { ThemeProvider } from '../src/system/providers/theme-provider';
import { useThemeController } from '../src/system/providers/use-theme-controller';

// Mock the hook
jest.mock('../src/system/providers/use-theme-controller', () => ({
  useThemeController: jest.fn(),
}));

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render null', () => {
    const { container } = render(<ThemeProvider />);

    expect(container.firstChild).toBeNull();
  });

  it('should call useThemeController with props', () => {
    const props = {
      defaultTheme: 'dark',
      storageKey: 'test-theme',
      attribute: 'class',
    };

    render(<ThemeProvider {...props} />);

    expect(useThemeController).toHaveBeenCalledWith(props);
    expect(useThemeController).toHaveBeenCalledTimes(1);
  });
});
