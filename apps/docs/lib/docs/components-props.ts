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
}

/**
 * Components extracted from TypeScript interfaces:
 * - Button: ButtonBaseProperties, ButtonLabelProperties, ButtonIconProperties, ButtonSpinnerProperties, ButtonShortcutProperties
 * - ButtonGroup: ButtonGroupProperties
 * - Text: TextProps
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
};

export default propsDocumentation;
