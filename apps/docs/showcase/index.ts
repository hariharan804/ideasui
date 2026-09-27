/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';

import * as ButtonDemos from './button';
import * as CheckboxDemos from './checkbox';
import * as InputFieldDemos from './input-field';
import * as RadioDemos from './radio';
import * as SwitchDemos from './switch';
import * as TextareaDemos from './textarea';
import * as TextDemos from './text';
import * as ImageDemos from './image';

export type DemoItem = {
  component: ComponentType<any>;
  file?: string;
};

export const demos: Record<string, DemoItem> = {
  // Radio demos
  'radio-basic': {
    component: RadioDemos.Basic,
    file: 'radio/basic.tsx',
  },
  'radio-variants': {
    component: RadioDemos.Variants,
    file: 'radio/variants.tsx',
  },
  'radio-colors': {
    component: RadioDemos.Colors,
    file: 'radio/colors.tsx',
  },
  'radio-sizes': {
    component: RadioDemos.Sizes,
    file: 'radio/sizes.tsx',
  },
  'radio-radius': {
    component: RadioDemos.Radius,
    file: 'radio/radius.tsx',
  },
  'radio-states': {
    component: RadioDemos.States,
    file: 'radio/states.tsx',
  },
  'radio-controlled': {
    component: RadioDemos.Controlled,
    file: 'radio/controlled.tsx',
  },
  'radio-group': {
    component: RadioDemos.Group,
    file: 'radio/group.tsx',
  },
  'radio-group-horizontal': {
    component: RadioDemos.GroupHorizontal,
    file: 'radio/group-horizontal.tsx',
  },
  'radio-custom-icons': {
    component: RadioDemos.CustomIcons,
    file: 'radio/custom-icons.tsx',
  },

  // Checkbox demos
  'checkbox-basic': {
    component: CheckboxDemos.Basic,
    file: 'checkbox/basic.tsx',
  },
  'checkbox-variants': {
    component: CheckboxDemos.Variants,
    file: 'checkbox/variants.tsx',
  },
  'checkbox-colors': {
    component: CheckboxDemos.Colors,
    file: 'checkbox/colors.tsx',
  },
  'checkbox-sizes': {
    component: CheckboxDemos.Sizes,
    file: 'checkbox/sizes.tsx',
  },
  'checkbox-radius': {
    component: CheckboxDemos.Radius,
    file: 'checkbox/radius.tsx',
  },
  'checkbox-states': {
    component: CheckboxDemos.States,
    file: 'checkbox/states.tsx',
  },
  'checkbox-controlled': {
    component: CheckboxDemos.Controlled,
    file: 'checkbox/controlled.tsx',
  },
  'checkbox-group': {
    component: CheckboxDemos.Group,
    file: 'checkbox/group.tsx',
  },
  'checkbox-indeterminate': {
    component: CheckboxDemos.Indeterminate,
    file: 'checkbox/indeterminate.tsx',
  },
  'checkbox-custom-icons': {
    component: CheckboxDemos.CustomIcons,
    file: 'checkbox/custom-icons.tsx',
  },

  // Switch demos
  'switch-basic': {
    component: SwitchDemos.Basic,
    file: 'switch/basic.tsx',
  },
  'switch-variants': {
    component: SwitchDemos.Variants,
    file: 'switch/variants.tsx',
  },
  'switch-thumb-variants': {
    component: SwitchDemos.ThumbVariants,
    file: 'switch/thumb-variants.tsx',
  },
  'switch-thumb-shapes': {
    component: SwitchDemos.ThumbShapes,
    file: 'switch/thumb-shapes.tsx',
  },
  'switch-thumb-sizes': {
    component: SwitchDemos.ThumbSizes,
    file: 'switch/thumb-sizes.tsx',
  },
  'switch-colors': {
    component: SwitchDemos.Colors,
    file: 'switch/colors.tsx',
  },
  'switch-sizes': {
    component: SwitchDemos.Sizes,
    file: 'switch/sizes.tsx',
  },
  'switch-label-placement': {
    component: SwitchDemos.LabelPlacement,
    file: 'switch/label-placement.tsx',
  },
  'switch-track-labels': {
    component: SwitchDemos.TrackLabels,
    file: 'switch/track-labels.tsx',
  },
  'switch-states': {
    component: SwitchDemos.States,
    file: 'switch/states.tsx',
  },
  'switch-controlled': {
    component: SwitchDemos.Controlled,
    file: 'switch/controlled.tsx',
  },
  'switch-group': {
    component: SwitchDemos.Group,
    file: 'switch/group.tsx',
  },
  'switch-custom-icons': {
    component: SwitchDemos.CustomIcons,
    file: 'switch/custom-icons.tsx',
  },
  'switch-customization': {
    component: SwitchDemos.Customization,
    file: 'switch/customization.tsx',
  },
  // Text demos
  'text-basic': {
    component: TextDemos.TextBasic,
    file: 'text/basic.tsx',
  },
  'text-variants': {
    component: TextDemos.TextVariants,
    file: 'text/variants.tsx',
  },
  'text-colors': {
    component: TextDemos.TextColors,
    file: 'text/colors.tsx',
  },
  'text-sizes': {
    component: TextDemos.TextSizes,
    file: 'text/sizes.tsx',
  },
  'text-weights': {
    component: TextDemos.TextWeights,
    file: 'text/weights.tsx',
  },
  'text-polymorphic': {
    component: TextDemos.TextPolymorphic,
    file: 'text/polymorphic.tsx',
  },
  'text-truncation': {
    component: TextDemos.TextTruncation,
    file: 'text/truncation.tsx',
  },

  // Button demos
  'button-basic': {
    component: ButtonDemos.Basic,
    file: 'button/basic.tsx',
  },
  'button-variants': {
    component: ButtonDemos.Variants,
    file: 'button/variants.tsx',
  },
  'button-colors': {
    component: ButtonDemos.Colors,
    file: 'button/colors.tsx',
  },
  'button-sizes': {
    component: ButtonDemos.Sizes,
    file: 'button/sizes.tsx',
  },
  'button-outline-variant': {
    component: ButtonDemos.OutlineVariant,
    file: 'button/outline-variant.tsx',
  },
  'button-disabled': {
    component: ButtonDemos.Disabled,
    file: 'button/disabled.tsx',
  },
  'button-loading': {
    component: ButtonDemos.Loading,
    file: 'button/loading.tsx',
  },
  'button-loading-state': {
    component: ButtonDemos.LoadingState,
    file: 'button/loading-state.tsx',
  },
  'button-with-icons': {
    component: ButtonDemos.WithIcons,
    file: 'button/with-icons.tsx',
  },
  'button-shortcut': {
    component: ButtonDemos.Shortcut,
    file: 'button/shortcut.tsx',
  },
  'button-icon-only': {
    component: ButtonDemos.IconOnly,
    file: 'button/icon-only.tsx',
  },
  'button-social': {
    component: ButtonDemos.Social,
    file: 'button/social.tsx',
  },
  'button-ripple-effect': {
    component: ButtonDemos.RippleEffect,
    file: 'button/ripple-effect.tsx',
  },
  'button-full-width': {
    component: ButtonDemos.FullWidth,
    file: 'button/full-width.tsx',
  },
  'button-custom-variants': {
    component: ButtonDemos.CustomVariants,
    file: 'button/custom-variants.tsx',
  },
  'button-custom-render-function': {
    component: ButtonDemos.CustomRenderFunction,
    file: 'button/custom-render-function.tsx',
  },

  // Button Group demos
  'button-group-basic': {
    component: ButtonDemos.ButtonGroupBasic,
    file: 'button/button-group-basic.tsx',
  },
  'button-group-detached': {
    component: ButtonDemos.ButtonGroupDetached,
    file: 'button/button-group-detached.tsx',
  },
  'button-group-vertical': {
    component: ButtonDemos.ButtonGroupVertical,
    file: 'button/button-group-vertical.tsx',
  },
  'button-group-with-icons': {
    component: ButtonDemos.ButtonGroupWithIcons,
    file: 'button/button-group-with-icons.tsx',
  },
  'button-group-complex': {
    component: ButtonDemos.ButtonGroupComplex,
    file: 'button/button-group-complex.tsx',
  },
  'button-group-variants': {
    component: ButtonDemos.ButtonGroupVariants,
    file: 'button/button-group-variants.tsx',
  },
  'button-group-sizes': {
    component: ButtonDemos.ButtonGroupSizes,
    file: 'button/button-group-sizes.tsx',
  },
  'button-group-full-width': {
    component: ButtonDemos.ButtonGroupFullWidth,
    file: 'button/button-group-full-width.tsx',
  },
  'button-group-disabled': {
    component: ButtonDemos.ButtonGroupDisabled,
    file: 'button/button-group-disabled.tsx',
  },
  'button-group-dividers': {
    component: ButtonDemos.ButtonGroupDividers,
    file: 'button/button-group-dividers.tsx',
  },

  // InputField demos
  'input-field-basic': {
    component: InputFieldDemos.Basic,
    file: 'input-field/basic.tsx',
  },
  'input-field-shorthand': {
    component: InputFieldDemos.ShorthandVsCompound,
    file: 'input-field/shorthand-vs-compound.tsx',
  },
  'input-field-label-variants': {
    component: InputFieldDemos.LabelVariants,
    file: 'input-field/label-variants.tsx',
  },
  'input-field-variants': {
    component: InputFieldDemos.VisualVariants,
    file: 'input-field/variants.tsx',
  },
  'input-field-sizes': {
    component: InputFieldDemos.Sizes,
    file: 'input-field/sizes.tsx',
  },
  'input-field-states': {
    component: InputFieldDemos.States,
    file: 'input-field/states.tsx',
  },
  'input-field-controlled': {
    component: InputFieldDemos.Controlled,
    file: 'input-field/controlled.tsx',
  },
  'input-field-filter': {
    component: InputFieldDemos.InputFilter,
    file: 'input-field/input-filter.tsx',
  },
  'input-field-types': {
    component: InputFieldDemos.InputTypes,
    file: 'input-field/input-types.tsx',
  },
  'input-field-number-buttons': {
    component: InputFieldDemos.InputNumberButtons,
    file: 'input-field/input-number-buttons.tsx',
  },

  // Textarea demos
  'textarea-basic': {
    component: TextareaDemos.Basic,
    file: 'textarea/basic.tsx',
  },
  'textarea-variants': {
    component: TextareaDemos.Variants,
    file: 'textarea/variants.tsx',
  },
  'textarea-sizes': {
    component: TextareaDemos.Sizes,
    file: 'textarea/sizes.tsx',
  },
  'textarea-label-variants': {
    component: TextareaDemos.LabelVariants,
    file: 'textarea/label-variants.tsx',
  },
  'textarea-auto-resize': {
    component: TextareaDemos.AutoResize,
    file: 'textarea/auto-resize.tsx',
  },
  'textarea-character-counter': {
    component: TextareaDemos.CharacterCounter,
    file: 'textarea/character-counter.tsx',
  },
  'textarea-resize': {
    component: TextareaDemos.Resize,
    file: 'textarea/resize.tsx',
  },
  'textarea-states': {
    component: TextareaDemos.States,
    file: 'textarea/states.tsx',
  },
  'textarea-controlled': {
    component: TextareaDemos.Controlled,
    file: 'textarea/controlled.tsx',
  },
  'textarea-compound': {
    component: TextareaDemos.Compound,
    file: 'textarea/compound.tsx',
  },

  // Image demos
  'image-default': {
    component: ImageDemos.Default,
    file: 'image/default.tsx',
  },
  'image-aspect-ratios': {
    component: ImageDemos.AspectRatios,
    file: 'image/aspect-ratios.tsx',
  },
  'image-object-fit': {
    component: ImageDemos.ObjectFit,
    file: 'image/object-fit.tsx',
  },
  'image-radius': {
    component: ImageDemos.Radius,
    file: 'image/radius.tsx',
  },
  'image-shadow': {
    component: ImageDemos.Shadow,
    file: 'image/shadow.tsx',
  },
  'image-zoomed': {
    component: ImageDemos.Zoomed,
    file: 'image/zoomed.tsx',
  },
  'image-loading-skeleton': {
    component: ImageDemos.LoadingSkeleton,
    file: 'image/loading-skeleton.tsx',
  },
  'image-error-fallback': {
    component: ImageDemos.ErrorFallback,
    file: 'image/error-fallback.tsx',
  },
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
