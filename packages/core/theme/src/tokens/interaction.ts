export const lightInteraction = {
  hoverOverlay: 'oklch(0 0 0 / 0.04)',
  activeOverlay: 'oklch(0 0 0 / 0.08)',
  disabledOpacity: 0.4,
} as const;

export const darkInteraction = {
  hoverOverlay: 'oklch(1 0 0 / 0.06)',
  activeOverlay: 'oklch(1 0 0 / 0.12)',
  disabledOpacity: 0.4,
} as const;
