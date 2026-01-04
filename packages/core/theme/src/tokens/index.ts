import {animation} from "./animation";
import {borderRadius} from "./border-radius";
import {boxShadow} from "./box-shadow";
import {fontSize} from "./font-size";
import {keyframes} from "./keyframes";
import {spacing} from "./spacing";
import {transitionDuration, transitionTimingFunction} from "./transition";
import {lightColorTokens, darkColorTokens} from "./colors";
import {focus, disabled} from "./classes";
import {
  colorVariants,
  sizeVariants,
  buttonSizes,
  colorsWithVariant,
  spinnerSizes,
  squareSizes,
} from "./variants";

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
};

// Types
export type ColorVariantProps = keyof typeof colorVariants;
export type SizeVariantProps = keyof typeof sizeVariants;
export type SpacingVariantProps = keyof typeof spacing;
export type BorderRadiusVariantProps = keyof typeof borderRadius;
export type FontSizeVariantProps = keyof typeof fontSize;
export type BoxShadowVariantProps = keyof typeof boxShadow;
export type TransitionDurationVariantProps = keyof typeof transitionDuration;
export type TransitionTimingFunctionVariantProps = keyof typeof transitionTimingFunction;
export type AnimationVariantProps = keyof typeof animation;
export type KeyframesVariantProps = keyof typeof keyframes;
export type FocusVariantProps = keyof typeof focus;
export type DisabledVariantProps = keyof typeof disabled;
export type ColorsWithVariantProps = keyof typeof colorsWithVariant;
export type ButtonSizesVariantProps = keyof typeof buttonSizes;
export type SpinnerSizesVariantProps = keyof typeof spinnerSizes;
export type SquareSizesVariantProps = keyof typeof squareSizes;
