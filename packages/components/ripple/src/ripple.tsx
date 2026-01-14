import type { HTMLMotionProps } from 'framer-motion';
import type { Key, CSSProperties } from 'react';
import type { FeatureBundle } from 'framer-motion';

import { LazyMotion, AnimatePresence, m } from 'framer-motion';
import { clamp } from '@ideasui/utils/core';
import { forwardRef as polymorphicForwardRef } from '@ideasui/utils';

const ANIMATION_DURATION_MIN = 0.2;
const ANIMATION_DURATION_MAX_LONG = 0.75;
const ANIMATION_DURATION_MAX_SHORT = 0.5;
const ANIMATION_DURATION_FACTOR = 0.01;
const RIPPLE_SIZE_THRESHOLD = 100;
const INITIAL_OPACITY = 0.35;
const EXIT_OPACITY = 0;

const motionFeatures = async (): Promise<FeatureBundle> =>
  (await import('framer-motion')).domAnimation;

export interface RippleItem {
  key: Key;
  x: number;
  y: number;
  size: number;
}

export interface RippleProps {
  ripples: RippleItem[];
  color?: string;
  style?: CSSProperties;
  motionProps?: Omit<HTMLMotionProps<'span'>, 'ref'>;
  onClear: (id: Key) => void;
}

export const Ripple = polymorphicForwardRef<'span', RippleProps>((props: RippleProps, ref) => {
  const { ripples = [], motionProps, color = 'currentColor', style, onClear } = props;

  return (
    <LazyMotion features={motionFeatures}>
      <AnimatePresence>
        {ripples.map((ripple) => {
          const duration = clamp(
            ANIMATION_DURATION_FACTOR * ripple.size,
            ANIMATION_DURATION_MIN,
            ripple.size > RIPPLE_SIZE_THRESHOLD
              ? ANIMATION_DURATION_MAX_LONG
              : ANIMATION_DURATION_MAX_SHORT,
          );

          return (
            <m.span
              key={ripple.key}
              ref={ref}
              animate={{
                transform: `translate(${ripple.x}px, ${ripple.y}px) scale(2)`,
                opacity: EXIT_OPACITY,
              }}
              className="ideasui-ripple"
              exit={{ opacity: EXIT_OPACITY }}
              initial={{
                transform: `translate(${ripple.x}px, ${ripple.y}px) scale(0)`,
                opacity: INITIAL_OPACITY,
              }}
              style={{
                position: 'absolute',
                backgroundColor: color,
                borderRadius: '100%',
                transformOrigin: 'center',
                pointerEvents: 'none',
                zIndex: 0,
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                left: 0,
                top: 0,
                ...style,
              }}
              transition={{ duration }}
              onAnimationComplete={() => {
                onClear(ripple.key);
              }}
              {...motionProps}
            />
          );
        })}
      </AnimatePresence>
    </LazyMotion>
  );
});
Ripple.displayName = 'IdeasUI.Ripple';
