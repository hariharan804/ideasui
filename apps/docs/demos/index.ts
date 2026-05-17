/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';

import * as ButtonDemos from './button';

export type DemoItem = {
  component: ComponentType<any>;
  file?: string;
};

export const demos: Record<string, DemoItem> = {
  // Button demos
  'button-basic': {
    component: ButtonDemos.Basic,
    file: 'button/basic.tsx',
  },
  'button-variants': {
    component: ButtonDemos.Variants,
    file: 'button/variants.tsx',
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
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
