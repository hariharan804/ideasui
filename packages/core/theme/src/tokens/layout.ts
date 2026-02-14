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

export const commonColors = {
  white: '#ffffff',
  black: '#000000',
} as const;
