import { renderHook } from '@testing-library/react';

import { useButton } from '../src/use-button';

describe('useButton', () => {
  it('should return correct props', () => {
    const { result } = renderHook(() => useButton({ onClick: vi.fn() }));

    expect(result.current.getButtonProps()['data-disabled']).toBeUndefined();
    expect(result.current.getButtonProps()).toHaveProperty('type', 'button');
  });

  it('should handle disabled state', () => {
    const { result } = renderHook(() => useButton({ isDisabled: true }));

    expect(result.current.isDisabled).toBe(true);
    expect(result.current.getButtonProps()).toHaveProperty('disabled', true);
    expect(result.current.getButtonProps()).toHaveProperty('data-disabled', 'true');
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useButton({ isLoading: true }));

    expect(result.current.isDisabled).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.getButtonProps()).toHaveProperty('data-loading', 'true');
  });
});
