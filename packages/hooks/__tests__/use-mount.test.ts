import { renderHook } from '@testing-library/react';

import { useMount } from '../src/use-mount';

describe('useMount', () => {
  it('should return false initially and true after mount', () => {
    const { result } = renderHook(() => useMount());

    expect(result.current).toBe(true);
  });
});
