import { animation } from './animation';
import { borderRadius } from './border-radius';
import { lightShadow, darkShadow, lightElevation, darkElevation } from './box-shadow';
import { duration, easing, keyframes, transition } from './motion';
import { spacing } from './spacing';
import {
  primitives,
  semantic,
  lightSurface,
  darkSurface,
  lightContent,
  darkContent,
  commonColors,
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
import { accessibility } from './accessibility';
import { backdrop, blur } from './blur';
import { border, lightBorder, darkBorder } from './border';
import { lightInteraction, darkInteraction } from './interaction';
import { opacity } from './opacity';
import { textStyles, letterSpacing, fontSize, fontFamily, fontWeight } from './typography';
import { zIndex } from './z-index';
import { componentColors, componentShadows } from './components';

const interaction = lightInteraction;

export {
  spacing,
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
  breakpoints,
  commonColors,
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
  textStyles,
  letterSpacing,
  zIndex,
  componentColors,
  componentShadows,
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
export type BreakpointProps = keyof typeof breakpoints;
export type DurationProps = keyof typeof duration;
export type EasingProps = keyof typeof easing;
export type FontWeightProps = keyof typeof fontWeight;
export type FontFamilyProps = keyof typeof fontFamily;
export type LetterSpacingProps = keyof typeof letterSpacing;
export type ZIndexProps = keyof typeof zIndex;
export type OpacityProps = keyof typeof opacity;
export type BlurProps = keyof typeof blur;
export type BorderWidthProps = keyof typeof border;
export type SurfaceProps = keyof typeof lightSurface;
export type ContentProps = keyof typeof lightContent;
