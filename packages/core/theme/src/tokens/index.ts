import type { squareSizes } from './variants';

/* eslint-disable import/order */
import { animation } from './animation';
import { borderRadius } from './border-radius';
import { lightShadow } from './box-shadow';
import { duration, easing, keyframes } from './motion';
import { spacing } from './spacing';
import { primitives, surface, content } from './colors';
import { disabled, scrollbar } from './classes';
import {
  colorVariants,
  sizeVariants,
  buttonSizes,
  colorsWithVariant,
  spinnerSizes,
} from './variants';

import { blur } from './blur';
import { border } from './border';
import { lightInteraction } from './interaction';
import { opacity } from './opacity';
import { letterSpacing, fontSize, fontFamily, fontWeight } from './typography';
import { zIndex } from './z-index';

const interaction = lightInteraction;

export {
  spacing,
  borderRadius,
  fontSize,
  fontFamily,
  fontWeight,
  animation,
  lightShadow,
  duration,
  easing,
  keyframes,
  colorVariants,
  sizeVariants,
  buttonSizes,
  spinnerSizes,
  disabled,
  scrollbar,
  colorsWithVariant,
  primitives,
  surface,
  content,
  blur,
  border,
  lightInteraction,
  interaction,
  opacity,
  letterSpacing,
  zIndex,
};

// Aliases for backward compatibility
export const lightColorTokens = primitives.light;
export const darkColorTokens = primitives.dark;

// Types
export type ColorVariantProps = keyof typeof colorVariants;
export type SizeVariantProps = keyof typeof sizeVariants;
export type SpacingProps = keyof typeof spacing;
export type BorderRadiusProps = keyof typeof borderRadius;
export type FontSizeProps = keyof typeof fontSize;
export type BoxShadowProps = keyof typeof lightShadow;
export type AnimationProps = keyof typeof animation;
export type KeyframesProps = keyof typeof keyframes;
export type DisabledProps = keyof typeof disabled;
export type ScrollbarProps = keyof typeof scrollbar;
export type ColorsWithVariantProps = keyof typeof colorsWithVariant;
export type ButtonSizesProps = keyof typeof buttonSizes;
export type SpinnerSizesProps = keyof typeof spinnerSizes;
export type SquareSizesProps = keyof typeof squareSizes;
export type DurationProps = keyof typeof duration;
export type EasingProps = keyof typeof easing;
export type FontWeightProps = keyof typeof fontWeight;
export type FontFamilyProps = keyof typeof fontFamily;
export type LetterSpacingProps = keyof typeof letterSpacing;
export type ZIndexProps = keyof typeof zIndex;
export type OpacityProps = keyof typeof opacity;
export type BlurProps = keyof typeof blur;
export type BorderWidthProps = keyof typeof border;
export type SurfaceProps = keyof typeof surface;
export type OnSurfaceProps = Extract<keyof typeof surface, `on-${string}`>;
export type ContentProps = keyof typeof content;

export { darkInteraction } from './interaction';

export { darkShadow, lightShadow as boxShadow } from './box-shadow';

export { transition } from './motion';
export { semantic } from './colors';
export { backdrop } from './blur';
export { borderColor } from './border';
export { textStyles, fontFamily as font } from './typography';
export { componentColors, componentShadows } from './components';
