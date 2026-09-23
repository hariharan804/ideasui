import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

/**
 * InputField recipe — maps variant props to BEM class names.
 * All utility and component styles live in input-field.css.
 */
export const inputField = tv({
  slots: {
    root: 'ideasui-input-field',
    label: 'ideasui-input-field__label',
    wrapper: 'ideasui-input-field__wrapper',
    input: 'ideasui-input-field__input',
    textarea: 'ideasui-input-field__textarea',
    counter: 'ideasui-input-field__counter',
    startContent: 'ideasui-input-field__start-content',
    endContent: 'ideasui-input-field__end-content',
    description: 'ideasui-input-field__description',
    errorMessage: 'ideasui-input-field__error',
  },

  variants: {
    variant: {
      outline: {
        wrapper: 'ideasui-input-field__wrapper--outline',
      },
      filled: {
        wrapper: 'ideasui-input-field__wrapper--filled',
      },
      flushed: {
        wrapper: 'ideasui-input-field__wrapper--flushed',
      },
      unstyled: {
        wrapper: 'ideasui-input-field__wrapper--unstyled',
      },
      shadow: {
        wrapper: 'ideasui-input-field__wrapper--shadow',
      },
    },

    labelVariant: {
      default: {
        root: 'ideasui-input-field--label-default',
        label: 'ideasui-input-field__label--default',
      },
      'inside-fixed': {
        root: 'ideasui-input-field--label-inside-fixed',
        label: 'ideasui-input-field__label--inside-fixed',
        wrapper: 'ideasui-input-field__wrapper--label-inside-fixed',
        input: 'ideasui-input-field__input--label-inside-fixed',
        textarea: 'ideasui-input-field__textarea--label-inside-fixed',
      },
      'inside-floating': {
        root: 'ideasui-input-field--label-inside-floating',
        label: 'ideasui-input-field__label--inside-floating',
        wrapper: 'ideasui-input-field__wrapper--label-inside-floating',
        input: 'ideasui-input-field__input--label-inside-floating',
        textarea: 'ideasui-input-field__textarea--label-inside-floating',
      },
      floating: {
        root: 'ideasui-input-field--label-floating',
        label: 'ideasui-input-field__label--floating',
        wrapper: 'ideasui-input-field__wrapper--label-floating',
        input: 'ideasui-input-field__input--label-floating',
        textarea: 'ideasui-input-field__textarea--label-floating',
      },
      inside: {
        root: 'ideasui-input-field--label-inside-fixed',
        label: 'ideasui-input-field__label--inside-fixed',
        wrapper: 'ideasui-input-field__wrapper--label-inside-fixed',
        input: 'ideasui-input-field__input--label-inside-fixed',
        textarea: 'ideasui-input-field__textarea--label-inside-fixed',
      },
    },

    size: {
      sm: {
        root: 'ideasui-input-field--sm',
        wrapper: 'ideasui-input-field__wrapper--sm',
        input: 'ideasui-input-field__input--sm',
        textarea: 'ideasui-input-field__textarea--sm',
        label: 'ideasui-input-field__label--sm',
      },
      md: {
        root: 'ideasui-input-field--md',
        wrapper: 'ideasui-input-field__wrapper--md',
        input: 'ideasui-input-field__input--md',
        textarea: 'ideasui-input-field__textarea--md',
        label: 'ideasui-input-field__label--md',
      },
      lg: {
        root: 'ideasui-input-field--lg',
        wrapper: 'ideasui-input-field__wrapper--lg',
        input: 'ideasui-input-field__input--lg',
        textarea: 'ideasui-input-field__textarea--lg',
        label: 'ideasui-input-field__label--lg',
      },
    },

    shadow: {
      none: {
        wrapper: 'ideasui-input-field__wrapper--shadow-none',
      },
      xs: {
        wrapper: 'ideasui-input-field__wrapper--shadow-xs',
      },
      sm: {
        wrapper: 'ideasui-input-field__wrapper--shadow-sm',
      },
      md: {
        wrapper: 'ideasui-input-field__wrapper--shadow-md',
      },
      lg: {
        wrapper: 'ideasui-input-field__wrapper--shadow-lg',
      },
      xl: {
        wrapper: 'ideasui-input-field__wrapper--shadow-xl',
      },
    },

    resize: {
      none: {
        textarea: 'ideasui-input-field__textarea--resize-none',
      },
      vertical: {
        textarea: 'ideasui-input-field__textarea--resize-vertical',
      },
      horizontal: {
        textarea: 'ideasui-input-field__textarea--resize-horizontal',
      },
      both: {
        textarea: 'ideasui-input-field__textarea--resize-both',
      },
    },

    isFloating: {
      true: {
        root: 'ideasui-input-field--is-floating',
        label: 'ideasui-input-field__label--is-floating',
      },
    },

    isFocused: {
      true: {
        root: 'ideasui-input-field--focused',
        label: 'ideasui-input-field__label--focused',
        wrapper: 'ideasui-input-field__wrapper--focused',
      },
    },

    hasStartContent: {
      true: {
        root: 'ideasui-input-field--has-start-content',
        label: 'ideasui-input-field__label--has-start-content',
      },
    },

    isInvalid: {
      true: {
        root: 'ideasui-input-field--invalid',
        label: 'ideasui-input-field__label--invalid',
        wrapper: 'ideasui-input-field__wrapper--invalid',
        errorMessage: 'ideasui-input-field__error--invalid',
      },
    },

    isDisabled: {
      true: {
        root: 'ideasui-input-field--disabled',
        wrapper: 'ideasui-input-field__wrapper--disabled',
        input: 'ideasui-input-field__input--disabled',
        textarea: 'ideasui-input-field__textarea--disabled',
        label: 'ideasui-input-field__label--disabled',
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
    labelVariant: 'default',
    size: 'md',
    isInvalid: false,
    isDisabled: false,
  },
});

export type InputFieldVariantProps = VariantProps<typeof inputField>;
export type InputFieldSlots = keyof ReturnType<typeof inputField>;
export type InputFieldReturnType = ReturnType<typeof inputField>;
