import type { RippleItem } from './ripple';

import { useCallback, useState } from 'react';
import { getUniqueID } from '@ideasui/utils/core';

export function useRipple() {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const onPress = useCallback((event: any) => {
    const trigger = event.currentTarget || event.target;
    const rect = trigger.getBoundingClientRect();
    const size = Math.max(trigger.clientWidth, trigger.clientHeight);

    // React Aria events have x/y, DOM events have clientX/clientY
    let x, y;

    if (event.x !== undefined && event.y !== undefined) {
      // React Aria events
      x = event.x;
      y = event.y;
    } else if (event.clientX !== undefined && event.clientY !== undefined) {
      // DOM events - calculate relative to element
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      // Fallback to center
      x = rect.width / 2;
      y = rect.height / 2;
    }

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: getUniqueID(prevRipples.length.toString()),
        size,
        x: x - size / 2,
        y: y - size / 2,
      },
    ]);
  }, []);

  const onClear = useCallback((key: React.Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
  }, []);

  return { ripples, onClear, onPress };
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
