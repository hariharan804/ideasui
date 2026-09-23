/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';

import * as ButtonDemos from './button';
import * as CheckboxDemos from './checkbox';
import * as InputFieldDemos from './input-field';
import * as TextDemos from './text';

export type DemoItem = {
  component: ComponentType<any>;
  file?: string;
};

export const demos: Record<string, DemoItem> = {
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
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
