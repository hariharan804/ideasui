import {HTMLMotionProps} from "framer-motion";

export interface RippleProps {
  ripples: RippleType[];
  color?: string;
  motionProps?: Omit<HTMLMotionProps<"span">, "ref">;
  style?: React.CSSProperties;
  onClear: (key: React.Key) => void;
}

export interface RippleType {
  key: React.Key;
  x: number;
  y: number;
  size: number;
}
