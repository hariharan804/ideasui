import * as React from "react";
import type {HTMLMotionProps} from "framer-motion";
import {LazyMotion, AnimatePresence, m} from "framer-motion";
import {clamp} from "@ideasui/utils";

const motionFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

export interface RippleItem {
  id: React.Key;
  posX: number;
  posY: number;
  diameter: number;
}

export interface RippleProps {
  ripples: RippleItem[];
  color?: string;
  style?: React.CSSProperties;
  motionProps?: Omit<HTMLMotionProps<"span">, "ref">;
  onClear: (id: React.Key) => void;
}

export const Ripple = React.memo<RippleProps>(({ripples = [], motionProps, color = "currentColor", style, onClear}) => {
  if (!ripples.length) return null;

  return (
    <LazyMotion features={motionFeatures}>
      <AnimatePresence>
        {ripples.map((ripple) => {
          const animDuration = clamp(ripple.diameter * 0.008, 0.15, ripple.diameter > 120 ? 0.8 : 0.6);
          const translateX = ripple.posX - ripple.diameter / 2;
          const translateY = ripple.posY - ripple.diameter / 2;

          return (
            <m.span
              key={ripple.id}
              className="ideasui-ripple-effect"
              initial={{
                scale: 0,
                opacity: 0.4,
                x: translateX,
                y: translateY,
              }}
              animate={{
                scale: 2.2,
                opacity: 0,
                x: translateX,
                y: translateY,
              }}
              exit={{opacity: 0}}
              transition={{
                duration: animDuration,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: "absolute",
                width: ripple.diameter,
                height: ripple.diameter,
                backgroundColor: color,
                borderRadius: "50%",
                pointerEvents: "none",
                transformOrigin: "center",
                zIndex: 1,
                ...style,
              }}
              onAnimationComplete={() => onClear(ripple.id)}
              {...motionProps}
            />
          );
        })}
      </AnimatePresence>
    </LazyMotion>
  );
});

Ripple.displayName = "IdeasUI.Ripple";
