/**
 * IDEASUI — Opacity Tokens
 * Minimal, semantic
 */

export const opacity = {
  none: 0, // fully transparent
  subtle: 0.04, // hover overlays (light theme)
  light: 0.08, // soft overlays
  medium: 0.16, // emphasis states
  strong: 0.38, // disabled state (Material standard)
  heavy: 0.6, // strong dimming
  surfaceMuted: 0.7,
  surfaceOverlay: 0.9,
  full: 1, // fully visible
} as const;
