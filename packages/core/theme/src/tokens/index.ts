import { animation } from './animation';
import { borderRadius } from './border-radius';
import { boxShadow } from './box-shadow';
import { fontSize } from './font-size';
import { keyframes } from './keyframes';
import { spacing } from './spacing';
import { transitionDuration, transitionTimingFunction } from './transition';
import { lightColorTokens, darkColorTokens } from './colors';
import { focus, disabled } from './classes';
import {
  colorVariants,
  sizeVariants,
  buttonSizes,
  colorsWithVariant,
  spinnerSizes,
  squareSizes,
} from './variants';
import {
  breakpoints,
  containerSizes,
  containerPadding,
  responsiveSpacing,
  responsivePatterns,
} from './breakpoints';
import { duration, easing, motion, delay, sequences } from './motion';

export {
  spacing,
  borderRadius,
  fontSize,
  boxShadow,
  animation,
  keyframes,
  transitionDuration,
  transitionTimingFunction,
  colorVariants,
  sizeVariants,
  buttonSizes,
  spinnerSizes,
  squareSizes,
  focus,
  disabled,
  colorsWithVariant,
  lightColorTokens,
  darkColorTokens,
  // Responsive tokens
  breakpoints,
  containerSizes,
  containerPadding,
  responsiveSpacing,
  responsivePatterns,
  // Motion tokens
  duration,
  easing,
  motion,
  delay,
  sequences,
};

// Types
export type ColorVariantProps = keyof typeof colorVariants;
export type SizeVariantProps = keyof typeof sizeVariants;
export type SpacingProps = keyof typeof spacing;
export type BorderRadiusProps = keyof typeof borderRadius;
export type FontSizeProps = keyof typeof fontSize;
export type BoxShadowProps = keyof typeof boxShadow;
export type TransitionDurationProps = keyof typeof transitionDuration;
export type TransitionTimingFunctionProps = keyof typeof transitionTimingFunction;
export type AnimationProps = keyof typeof animation;
export type KeyframesProps = keyof typeof keyframes;
export type FocusProps = keyof typeof focus;
export type DisabledProps = keyof typeof disabled;
export type ColorsWithVariantProps = keyof typeof colorsWithVariant;
export type ButtonSizesProps = keyof typeof buttonSizes;
export type SpinnerSizesProps = keyof typeof spinnerSizes;
export type SquareSizesProps = keyof typeof squareSizes;
// Responsive types
export type BreakpointProps = keyof typeof breakpoints;
export type ContainerSizeProps = keyof typeof containerSizes;
export type ResponsiveSpacingProps = keyof typeof responsiveSpacing;
// Motion types
export type DurationProps = keyof typeof duration;
export type EasingProps = keyof typeof easing;
export type MotionProps = keyof typeof motion;
export type DelayProps = keyof typeof delay;
export type SequenceProps = keyof typeof sequences;
