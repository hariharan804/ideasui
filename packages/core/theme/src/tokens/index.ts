import { animation } from './animation';
import { borderRadius } from './border-radius';
import { lightShadow, darkShadow, lightElevation, darkElevation } from './box-shadow';
import { duration, easing, keyframes, transition } from './motion';
import { spacing, space } from './spacing';
import {
  primitives,
  semantic,
  lightSurface,
  darkSurface,
  lightContent,
  darkContent,
} from './colors';
import { focus, disabled, focusParams } from './classes';
import {
  colorVariants,
  sizeVariants,
  buttonSizes,
  colorsWithVariant,
  spinnerSizes,
  squareSizes,
} from './variants';
import { breakpoints } from './breakpoints';
import {
  defaultLayout,
  lightLayout,
  darkLayout,
  lightCommonColors,
  darkCommonColors,
} from './layout';
import { accessibility } from './accessibility';
import { backdrop, blur } from './blur';
import { border, lightBorder, darkBorder } from './border';
import { lightInteraction, darkInteraction } from './interaction';
import { opacity } from './opacity';
import {
  lineHeight,
  textStyles,
  letterSpacing,
  fontSize,
  fontFamily,
  fontWeight,
} from './typography';
import { zIndex } from './z-index';

const interaction = lightInteraction;

export {
  spacing,
  space,
  borderRadius,
  fontSize,
  fontFamily,
  fontWeight,
  animation,
  lightShadow,
  darkShadow,
  lightElevation,
  darkElevation,
  duration,
  easing,
  keyframes,
  transition,
  colorVariants,
  sizeVariants,
  buttonSizes,
  spinnerSizes,
  squareSizes,
  focus,
  focusParams,
  disabled,
  colorsWithVariant,
  primitives,
  semantic,
  lightSurface,
  darkSurface,
  lightContent,
  darkContent,
  // Responsive tokens
  breakpoints,

  // Motion tokens

  // motion,
  // delay,
  // sequences,
  // Layout tokens (Border width, Opacity, etc.)
  defaultLayout,
  lightLayout,
  darkLayout,
  lightCommonColors,
  darkCommonColors,
  // New tokens
  accessibility,
  backdrop,
  blur,
  border,
  lightBorder,
  darkBorder,
  lightInteraction,
  darkInteraction,
  interaction,
  opacity,
  lineHeight,
  textStyles,
  letterSpacing,
  zIndex,
};

// Types
export type ColorVariantProps = keyof typeof colorVariants;
export type SizeVariantProps = keyof typeof sizeVariants;
export type SpacingProps = keyof typeof spacing;
export type BorderRadiusProps = keyof typeof borderRadius;
export type FontSizeProps = keyof typeof fontSize;
export type BoxShadowProps = keyof typeof lightShadow;
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
// Motion types
export type DurationProps = keyof typeof duration;
export type EasingProps = keyof typeof easing;
// export type MotionProps = keyof typeof motion;
// export type DelayProps = keyof typeof delay;
// export type SequenceProps = keyof typeof sequences;
