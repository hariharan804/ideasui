export const buttonProps = [
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'ghost' | 'muted' | 'link' | 'text' | 'elevated' | 'glaze'",
    default: "'solid'",
    description: 'The visual style variant.',
  },
  {
    name: 'color',
    type: "'primary' | 'secondary' | 'tertiary' | 'neutral' | 'error' | 'success' | 'warning' | 'info'",
    default: "'primary'",
    description: 'Semantic color theme.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Size of the button.',
  },
  {
    name: 'radius',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: "'md'",
    description: 'The border radius.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    description: 'Loading state of the button.',
  },
  {
    name: 'loadingIndicator',
    type: 'ReactNode',
    description: 'Custom loading indicator element.',
  },
  {
    name: 'loadingPosition',
    type: "'start' | 'end' | 'center'",
    default: "'start'",
    description: 'Where the loading indicator appears.',
  },
  {
    name: 'isIconOnly',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button only contains an icon.',
  },
  {
    name: 'isDisabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button is disabled.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Takes the full width of the container.',
  },
  {
    name: 'disableAnimation',
    type: 'boolean',
    default: 'false',
    description: 'Disables press and hover animations.',
  },
  {
    name: 'shortcut',
    type: 'ReactNode',
    description: 'Keyboard shortcut to display.',
  },
  {
    name: 'classNames',
    type: 'ButtonClassNames',
    description: 'Custom class names for internal slots.',
  },
  {
    name: 'onPress',
    type: '(e: PressEvent) => void',
    description: 'Click/Press handler.',
  },
  {
    name: 'children',
    type: 'ReactNode | (props: ButtonRenderProps) => ReactNode',
    description: 'Content of the button.',
    required: true,
  },
];

export const buttonGroupProps = [
  {
    name: 'isAttached',
    type: 'boolean',
    default: 'true',
    description: 'Joins the buttons without gaps.',
  },
  {
    name: 'isVertical',
    type: 'boolean',
    default: 'false',
    description: 'Stacks the buttons vertically.',
  },
  {
    name: 'showDivider',
    type: 'boolean',
    default: 'true',
    description: 'Shows dividers between attached buttons.',
  },
  {
    name: 'variant',
    type: 'ButtonVariant',
    description: 'Passed down to all child buttons.',
  },
  {
    name: 'color',
    type: 'ButtonColor',
    description: 'Passed down to all child buttons.',
  },
  {
    name: 'size',
    type: 'ButtonSize',
    description: 'Passed down to all child buttons.',
  },
  {
    name: 'radius',
    type: 'ButtonRadius',
    description: 'Passed down to all child buttons.',
  },
  {
    name: 'isDisabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables all child buttons.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Takes the full width of the container.',
  },
  {
    name: 'disableAnimation',
    type: 'boolean',
    default: 'false',
    description: 'Disables animations for all child buttons.',
  },
];
