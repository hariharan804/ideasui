import * as React from "react";
import {LazyMotion, AnimatePresence, m} from "framer-motion";
import type {HTMLMotionProps} from "framer-motion";

import type {TouchableRippleItem} from "./use-touchable-ripple";

export interface TouchableRippleProps {
  ripples: TouchableRippleItem[];
  color?: string;
  style?: React.CSSProperties;
  motionProps?: Omit<HTMLMotionProps<"span">, "ref">;
  onClear: (key: React.Key) => void;
}

/**
 * Load Framer Motion DOM features once
 */
const loadFeatures = () => import("framer-motion").then((res) => res.domAnimation);

/**
 * Normalize animation duration by size
 */
function getDuration(size: number) {
  if (size < 80) return 0.35;
  if (size < 160) return 0.45;
  return 0.6;
}

export const TouchableRipple = React.memo(function TouchableRipple({
  ripples,
  color = "currentColor",
  style,
  motionProps,
  onClear,
}: TouchableRippleProps) {
  if (ripples.length === 0) return null;

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <m.span
            key={ripple.key}
            aria-hidden
            initial={{
              transform: `translate(${ripple.x}px, ${ripple.y}px) scale(0)`,
              opacity: 0.35,
            }}
            animate={{
              transform: `translate(${ripple.x}px, ${ripple.y}px) scale(2)`,
              opacity: 0,
            }}
            exit={{opacity: 0}}
            transition={{
              duration: getDuration(ripple.size),
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: ripple.size,
              height: ripple.size,
              borderRadius: "50%",
              backgroundColor: color,
              pointerEvents: "none",
              transformOrigin: "center",
              willChange: "transform, opacity",
              ...style,
            }}
            onAnimationComplete={() => onClear(ripple.key)}
            {...motionProps}
          />
        ))}
      </AnimatePresence>
    </LazyMotion>
  );
});

TouchableRipple.displayName = "IdeasUI.TouchableRipple";
