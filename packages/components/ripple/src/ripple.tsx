import * as React from "react";
import type {HTMLMotionProps} from "framer-motion";

import {LazyMotion, AnimatePresence, m} from "framer-motion";
import type {RippleType} from "./ripple-types";
import {clamp} from "@ideasui/utils/shared";

export interface RippleProps {
  ripples: RippleType[];
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
 * Normalize animation duration based on size
 */
// function getDuration(size: number) {
//   if (size < 80) return 0.35;
//   if (size < 160) return 0.45;
//   return 0.6;
// }

// export const Ripple = React.memo(
//   ({ripples, color = "currentColor", style, motionProps, onClear}: RippleProps) => {
//     if (ripples.length === 0) return null;

//     return (
//       <LazyMotion features={loadFeatures}>
//         <AnimatePresence>
//           {ripples.map((ripple) => (
//             <m.span
//               key={ripple.key}
//               aria-hidden
//               initial={{
//                 transform: `translate(${ripple.x}px, ${ripple.y}px) scale(0)`,
//                 opacity: 0.35,
//               }}
//               animate={{
//                 transform: `translate(${ripple.x}px, ${ripple.y}px) scale(2)`,
//                 opacity: 0,
//               }}
//               exit={{opacity: 0}}
//               transition={{
//                 duration: getDuration(ripple.size),
//                 ease: "easeOut",
//               }}
//               style={{
//                 position: "absolute",
//                 width: ripple.size,
//                 height: ripple.size,
//                 borderRadius: "50%",
//                 backgroundColor: color,
//                 pointerEvents: "none",
//                 transformOrigin: "center",
//                 willChange: "transform, opacity",
//                 ...style,
//               }}
//               onAnimationComplete={() => onClear(ripple.key)}
//               {...motionProps}
//             />
//           ))}
//         </AnimatePresence>
//       </LazyMotion>
//     );
//   },
// );

// Ripple.displayName = "IdeasUI.Ripple";

export const Ripple = (props: RippleProps) => {
  const {ripples = [], motionProps, color = "currentColor", style, onClear} = props;

  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);

        return (
          <LazyMotion key={ripple.key} features={loadFeatures}>
            <AnimatePresence mode="popLayout">
              <m.span
                animate={{
                  transform: `translate(${ripple.x}px, ${ripple.y}px) scale(2)`,
                  opacity: 0,
                }}
                className="heroui-ripple"
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
                  overflow: "hidden",
                  inset: 0,
                  zIndex: 0,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  ...style,
                }}
                transition={{duration}}
                onAnimationComplete={() => {
                  onClear(ripple.key);
                }}
                {...motionProps}
              />
            </AnimatePresence>
          </LazyMotion>
        );
      })}
    </>
  );
};

Ripple.displayName = "IdeasUI.Ripple";
