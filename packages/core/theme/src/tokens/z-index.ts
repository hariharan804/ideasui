/**
 * IDEASUI — Z-Index System
 * Ordered, predictable layering
 */

export const zIndex = {
  hide: -1,

  // Base layout
  base: 0,
  raised: 1,

  // Navigation / sticky
  sticky: 100,
  fixed: 200,

  // Overlays
  dropdown: 1000,
  overlay: 1100,
  modal: 1200,
  popover: 1300,
  toast: 1400,
  tooltip: 1500,
} as const;
