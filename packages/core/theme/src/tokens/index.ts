import type { animation } from './animation';
import type { blur } from './blur';
import type { border } from './border';
import type { borderRadius } from './border-radius';
import type { lightShadow } from './box-shadow';
import type { disabled, scrollbar, interactions, subtleInteractions } from './classes';
import type { content, surface } from './colors';
import type { easing, keyframes, duration } from './motion';
import type { opacity } from './opacity';
import type { spacing } from './spacing';
import type { fontFamily, fontWeight, fontSize, letterSpacing } from './typography';
import type {
  squareSizes,
  colorsWithVariant,
  sizeVariants,
  buttonSizes,
  spinnerSizes,
  colorVariants,
} from './variants';
import type { zIndex } from './z-index';

import { primitives } from './colors';
import { lightInteraction } from './interaction';

const interaction = lightInteraction;

export { interaction };

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
export type InteractionsProps = keyof typeof interactions;
export type SubtleInteractionsProps = keyof typeof subtleInteractions;
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

export { darkInteraction, lightInteraction } from './interaction';

export { darkShadow, lightShadow as boxShadow, lightShadow } from './box-shadow';

export { transition, duration, easing, keyframes } from './motion';
export { semantic, primitives, surface, content } from './colors';
export { backdrop, blur } from './blur';
export { borderColor, border } from './border';
export {
  textStyles,
  fontFamily as font,
  fontSize,
  fontFamily,
  fontWeight,
  letterSpacing,
} from './typography';
export { componentColors, componentShadows } from './components';

export { spacing } from './spacing';

export { borderRadius } from './border-radius';

export { animation } from './animation';

export {
  colorVariants,
  buttonSizes,
  sizeVariants,
  spinnerSizes,
  colorsWithVariant,
} from './variants';
export { scrollbar, disabled, interactions, subtleInteractions } from './classes';

export { opacity } from './opacity';
export { zIndex } from './z-index';
