import type { Decorator } from '@storybook/react-vite';

import React, { useEffect, useMemo } from 'react';
import { useGlobals } from 'storybook/preview-api';

import { REDUCE_MOTION_GLOBAL_TYPE_ID } from './registry';

/**
 * IdeasUI Reduce Motion Decorator
 *
 * Sets the 'data-reduce-motion' attribute on the document element for CSS-based animations.
 */
export const withReduceMotion: Decorator = (Story) => {
  const [globals] = useGlobals();
  const reduceMotion = useMemo(
    () => globals[REDUCE_MOTION_GLOBAL_TYPE_ID] === 'true',
    [globals[REDUCE_MOTION_GLOBAL_TYPE_ID]],
  );

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.setAttribute('data-reduce-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduce-motion');
    }
  }, [reduceMotion]);

  return <Story />;
};
