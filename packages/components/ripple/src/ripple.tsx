import * as React from "react";
import type {HTMLMotionProps} from "framer-motion";
import {LazyMotion, AnimatePresence, m} from "framer-motion";
import {clamp} from "@ideasui/utils/core";

const motionFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

export interface RippleItem {
  key: React.Key;
  x: number;
  y: number;
  size: number;
}

export interface RippleProps {
  ripples: RippleItem[];
  color?: string;
  style?: React.CSSProperties;
  motionProps?: Omit<HTMLMotionProps<"span">, "ref">;
  onClear: (id: React.Key) => void;
}

export const Ripple = (props: RippleProps) => {
  const {ripples = [], motionProps, color = "currentColor", style, onClear} = props;

  return (
    <LazyMotion features={motionFeatures}>
      <AnimatePresence>
        {ripples.map((ripple) => {
          const duration = clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);

          return (
            <m.span
              key={ripple.key}
              animate={{
                transform: `translate(${ripple.x}px, ${ripple.y}px) scale(2)`,
                opacity: 0,
              }}
              className="ideasui-ripple"
              exit={{opacity: 0}}
              initial={{
                transform: `translate(${ripple.x}px, ${ripple.y}px) scale(0)`,
                opacity: 0.35,
              }}
              style={{
                position: "absolute",
                backgroundColor: color,
                borderRadius: "100%",
                transformOrigin: "center",
                pointerEvents: "none",
                zIndex: 0,
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                left: 0,
                top: 0,
                ...style,
              }}
              transition={{duration}}
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
};
Ripple.displayName = "IdeasUI.Ripple";
