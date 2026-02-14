export const defaultLayout = {
  // Opacity
  hoverOpacity: '0.8',
  disabledOpacity: '0.5',

  // Divider
  dividerWeight: '1px',

  // Focus ring
  focusRingWidth: '2px',
  focusRingOffset: '2px',
} as const;

export const lightLayout = {
  ...defaultLayout,
} as const;

export const darkLayout = {
  ...defaultLayout,
} as const;

export const lightCommonColors = {
  white: 'oklch(1.000 0.000 0.0)',
  black: 'oklch(0.000 0.000 0.0)',
} as const;

export const darkCommonColors = {
  white: 'oklch(0.000 0.000 0.0)',
  black: 'oklch(1.000 0.000 0.0)',
} as const;
