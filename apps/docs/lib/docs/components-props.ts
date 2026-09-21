// Auto-generated props documentation
// Extracted from actual TypeScript interfaces
// DO NOT EDIT MANUALLY

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
  deprecated: boolean;
  description: string;
}

export interface ComponentDoc {
  componentName: string;
  title: string;
  component: string;
  description: string;
  props: PropInfo[];
}

export interface PropsDocumentation {
  button: ComponentDoc[];
  buttonGroup: ComponentDoc[];
  text: ComponentDoc[];
  inputField: ComponentDoc[];
}

/**
 * Components extracted from TypeScript interfaces:
 * - Button: ButtonBaseProperties, ButtonLabelProperties, ButtonIconProperties, ButtonSpinnerProperties, ButtonShortcutProperties
 * - ButtonGroup: ButtonGroupProperties
 * - Text: TextProps
 * - InputField: InputFieldProps, InputFieldLabelProps, InputFieldInputProps, InputFieldDescriptionProps, InputFieldErrorProps
 */
export const propsDocumentation: PropsDocumentation = {
  button: [
    {
      componentName: 'Button',
      title: 'Button Props',
      component: '<Button />',
      description: 'Primary button component with variants and sizes',
      props: [
        {
          name: 'isLoading',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          deprecated: false,
          description: 'Whether the button is in a loading state.',
        },
        {
          name: 'loadingIndicator',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'The element to display as a loading indicator. If not provided, a default spinner will be used.',
        },
        {
          name: 'loadingPosition',
          type: '"start" | "end" | "center"',
          required: false,
          defaultValue: "'start'",
          deprecated: false,
          description: 'The position of the loading indicator relative to the button content.',
        },
        {
          name: 'startIcon',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Icon to display before the button content.',
        },
        {
          name: 'endIcon',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Icon to display after the button content.',
        },
        {
          name: 'shortcut',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'The shortcut keys to display.',
        },
        {
          name: 'divider',
          type: '"full" | "middle" | "none"',
          required: false,
          defaultValue: "'full' (when isAttached is true)",
          deprecated: false,
          description: 'The type of divider to display between the buttons in a group.',
        },
        {
          name: 'classNames',
          type: 'ButtonClassNames',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom class names for individual button slots.',
        },
        {
          name: 'slotProps',
          type: 'ButtonSlotProps',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom props for individual button slots.',
        },
        {
          name: 'className',
          type: 'string | ((properties: ButtonRenderProps) => string)',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'The CSS class name for the button. Can be a string or a function that receives the button render props.',
        },
        {
          name: 'children',
          type: 'ReactNode | ((properties: ButtonRenderProps) => ReactNode)',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'The content to display inside the button. Can be a ReactNode or a function that receives the button render props.',
        },
        {
          name: 'isIconOnly',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          deprecated: false,
          description:
            'Whether the button should be square and optimized for icons. Note: When true, you MUST provide an `aria-label` or `aria-labelledby` for accessibility.',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Accessibility label for the button. Required if the button has no visible label (e.g., `isIconOnly`).',
        },
        {
          name: 'aria-labelledby',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'ID of an element that serves as the accessible label for the button.',
        },
      ],
    },
    {
      componentName: 'Button.Label',
      title: 'Button Label Props',
      component: '<Button.Label />',
      description: 'Label component inside the button',
      props: [],
    },
    {
      componentName: 'Button.Icon',
      title: 'Button Icon Props',
      component: '<Button.Icon />',
      description: 'Icon component inside the button',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'The icon content.',
        },
        {
          name: 'placement',
          type: '"start" | "end"',
          required: false,
          defaultValue: "'start'",
          deprecated: false,
          description: 'The placement of the icon relative to the label.',
        },
      ],
    },
    {
      componentName: 'Button.Spinner',
      title: 'Button Spinner Props',
      component: '<Button.Spinner />',
      description: 'Spinner component inside the button',
      props: [
        {
          name: 'label',
          type: 'string',
          required: false,
          defaultValue: "'Loading'",
          deprecated: false,
          description: 'Accessibility label for the spinner.',
        },
      ],
    },
    {
      componentName: 'Button.Shortcut',
      title: 'Button Shortcut Props',
      component: '<Button.Shortcut />',
      description: 'Shortcut component inside the button',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'The shortcut keys to display.',
        },
      ],
    },
  ],
  buttonGroup: [
    {
      componentName: 'Button.Group',
      title: 'Button Group Props',
      component: '<Button.Group />',
      description: 'Group component for layout of multiple buttons',
      props: [
        {
          name: 'size',
          type: "NonNullable<ButtonGroupContextType['size']>",
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'The size of the buttons in the group.',
        },
        {
          name: 'color',
          type: "NonNullable<ButtonGroupContextType['color']>",
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'The color scheme of the buttons in the group.',
        },
        {
          name: 'variant',
          type: "NonNullable<ButtonGroupContextType['variant']>",
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'The visual style of the buttons in the group.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Whether the buttons in the group should be disabled.',
        },
        {
          name: 'isAttached',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          deprecated: false,
          description: 'Whether the buttons in the group should be joined together without gaps.',
        },
        {
          name: 'divider',
          type: '"full" | "middle" | "none"',
          required: false,
          defaultValue: "'full' (when isAttached is true)",
          deprecated: false,
          description: 'The type of divider to display between the buttons in the group.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          defaultValue: null,
          deprecated: false,
          description: 'The content of the button group.',
        },
      ],
    },
  ],
  text: [
    {
      componentName: 'Text',
      title: 'Text Props',
      component: '<Text />',
      description:
        'Theme-aware typography primitive supporting semantic tokens, line clamping, and slots',
      props: [
        {
          name: 'as',
          type: 'ElementType',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'The underlying HTML element or React component to render. If omitted, automatically selects the semantic element based on `variant`: - `h1`–`h6` → `<h1>`–`<h6>` - `body`, `lead` → `<p>` - `label`, `caption`, `overline`, `helper` → `<span>` - `code` → `<code>`',
        },
        {
          name: 'variant',
          type: 'TextVariant',
          required: false,
          defaultValue: "'body'",
          deprecated: false,
          description:
            'Typographic intent variant. Sets default font size, font weight, line height, and HTML tag.',
        },
        {
          name: 'size',
          type: 'TextSize',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Font size scale override. When provided, overrides the default font size scale of the active `variant`.',
        },
        {
          name: 'weight',
          type: 'TextWeight',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Font weight setting override. When provided, overrides the default font weight of the active `variant`.',
        },
        {
          name: 'color',
          type: 'TextColor',
          required: false,
          defaultValue: "'primary'",
          deprecated: false,
          description: 'Semantic OKLCH content color token.',
        },
        {
          name: 'align',
          type: 'TextAlign',
          required: false,
          defaultValue: "'start'",
          deprecated: false,
          description: 'Text alignment using logical properties (start/end for RTL compatibility).',
        },
        {
          name: 'truncate',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          deprecated: false,
          description: 'Truncate overflowing text on a single line with ellipsis.',
        },
        {
          name: 'lineClamp',
          type: 'number',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Maximum number of lines to display before truncating.',
        },
        {
          name: 'slot',
          type: 'string | ',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Slot identifier used for composition with React Aria components.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom CSS class names merged via `cn()`.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Children content to render inside the text element.',
        },
      ],
    },
  ],
  inputField: [
    {
      componentName: 'InputField',
      title: 'InputField Props',
      component: '<InputField />',
      description: 'Root wrapper and shorthand single-component interface for input fields',
      props: [
        {
          name: 'variant',
          type: 'InputFieldVariant',
          required: false,
          defaultValue: "'outline'",
          deprecated: false,
          description: 'Visual style variant of the input surface.',
        },
        {
          name: 'labelVariant',
          type: 'InputFieldLabelVariant',
          required: false,
          defaultValue: "'default'",
          deprecated: false,
          description: 'Positioning and behavior variant of the label.',
        },
        {
          name: 'size',
          type: 'InputFieldSize',
          required: false,
          defaultValue: "'md'",
          deprecated: false,
          description: 'Size scale of the input field.',
        },
        {
          name: 'shadow',
          type: 'InputFieldShadow | boolean',
          required: false,
          defaultValue: "'none' (or 'sm' when variant=\"shadow\")",
          deprecated: false,
          description: 'Shadow elevation scale of the input field surface.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          deprecated: false,
          description: 'Marks the field as disabled. Propagated to all sub-components via context.',
        },
        {
          name: 'isReadOnly',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          deprecated: false,
          description: 'Marks the field as read-only.',
        },
        {
          name: 'isRequired',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          deprecated: false,
          description:
            'Marks the field as required. Adds `required` to the input and visual asterisk indicator.',
        },
        {
          name: 'isInvalid',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          deprecated: false,
          description:
            'Marks the field as invalid. Shows `InputFieldError`, hides `InputFieldDescription`.',
        },
        {
          name: 'label',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Label text or node rendered when used as a single component.',
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Native placeholder text rendered when used as a single component.',
        },
        {
          name: 'description',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Helper description text rendered when used as a single component.',
        },
        {
          name: 'errorMessage',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Error message text rendered when `isInvalid` is true in single component usage.',
        },
        {
          name: 'startContent',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Element rendered before the input (e.g. decorative icon).',
        },
        {
          name: 'endContent',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Element rendered after the input (e.g. decorative icon).',
        },
        {
          name: 'value',
          type: 'string | number',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Current value of the input when used as a single component.',
        },
        {
          name: 'defaultValue',
          type: 'string | number',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Initial uncontrolled value of the input when used as a single component.',
        },
        {
          name: 'type',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: "Input element HTML type (e.g. 'text', 'email', 'password').",
        },
        {
          name: 'inputFilter',
          type: 'InputFieldInputFilter',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            "Character input filter restricting allowed entry ('numeric', 'decimal', 'alpha', 'alphanumeric').",
        },
        {
          name: 'classNames',
          type: 'InputFieldClassNames',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Custom CSS class names for individual slots (`root`, `label`, `wrapper`, `input`, `startContent`, `endContent`, `description`, `errorMessage`).',
        },
        {
          name: 'slotProps',
          type: 'InputFieldSlotProps',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Custom props for individual sub-component slots (`root`, `label`, `input`, `description`, `error`).',
        },
        {
          name: 'onChange',
          type: '(event: ChangeEvent<HTMLInputElement>) => void',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Change event handler when used as a single component.',
        },
        {
          name: 'onFocus',
          type: '(event: FocusEvent<HTMLInputElement>) => void',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Focus event handler when used as a single component.',
        },
        {
          name: 'onBlur',
          type: '(event: FocusEvent<HTMLInputElement>) => void',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Blur event handler when used as a single component.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom CSS class names merged via `cn()`.',
        },
        {
          name: 'style',
          type: 'CSSProperties',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Inline styles applied to the root wrapper element.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Sub-components (compound pattern) OR omit for single-component shorthand pattern.',
        },
      ],
    },
    {
      componentName: 'InputField.Label',
      title: 'InputField Label Props',
      component: '<InputField.Label />',
      description: 'Label component for the input field',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom CSS class names merged via `cn()`.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Label content.',
        },
      ],
    },
    {
      componentName: 'InputField.Input',
      title: 'InputField Input Props',
      component: '<InputField.Input />',
      description: 'Native HTML input primitive wrapper',
      props: [
        {
          name: 'startContent',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Element rendered before the input (e.g. decorative icon, currency symbol). Note: Must be non-interactive/decorative only.',
        },
        {
          name: 'endContent',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Element rendered after the input (e.g. decorative icon). Note: Must be non-interactive/decorative only.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            'Custom CSS class names merged via `cn()` on the outer input wrapper `<div>`.',
        },
        {
          name: 'inputClassName',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom CSS class names merged via `cn()` on the native `<input>` element.',
        },
        {
          name: 'inputFilter',
          type: 'InputFieldInputFilter',
          required: false,
          defaultValue: null,
          deprecated: false,
          description:
            "Character input filter restricting allowed entry ('numeric', 'decimal', 'alpha', 'alphanumeric').",
        },
      ],
    },
    {
      componentName: 'InputField.Description',
      title: 'InputField Description Props',
      component: '<InputField.Description />',
      description: 'Helper description text component for the input field',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom CSS class names merged via `cn()`.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Helper description content.',
        },
      ],
    },
    {
      componentName: 'InputField.Error',
      title: 'InputField Error Props',
      component: '<InputField.Error />',
      description: 'Error message text component for validation states',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Custom CSS class names merged via `cn()`.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          defaultValue: null,
          deprecated: false,
          description: 'Error message content.',
        },
      ],
    },
  ],
};

export default propsDocumentation;
