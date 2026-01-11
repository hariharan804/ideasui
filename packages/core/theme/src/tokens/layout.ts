export const defaultLayout = {
  // Border radius
  radiusSmall: '0.25rem',
  radiusMedium: '0.5rem',
  radiusLarge: '0.75rem',

  // Border width
  borderWidthSmall: '1px',
  borderWidthMedium: '2px',
  borderWidthLarge: '3px',

  // Box shadows
  boxShadowSmall: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  boxShadowMedium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  boxShadowLarge: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

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
