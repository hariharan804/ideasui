export const fontSize = {
  xs: ["0.75rem", {lineHeight: "1rem"}], // 12px / 16px
  sm: ["0.875rem", {lineHeight: "1.25rem"}], // 14px / 20px
  base: ["1rem", {lineHeight: "1.5rem"}], // 16px / 24px
  lg: ["1.125rem", {lineHeight: "1.75rem"}], // 18px / 28px
  xl: ["1.25rem", {lineHeight: "1.75rem"}], // 20px / 28px
  "2xl": ["1.5rem", {lineHeight: "2rem"}], // 24px / 32px
  "3xl": ["1.875rem", {lineHeight: "2.25rem"}], // 30px / 36px
  "4xl": ["2.25rem", {lineHeight: "2.5rem"}], // 36px / 40px
  "5xl": ["3rem", {lineHeight: "1"}], // 48px / 48px
  "6xl": ["3.75rem", {lineHeight: "1"}], // 60px / 60px
  "7xl": ["4.5rem", {lineHeight: "1"}], // 72px / 72px
  "8xl": ["6rem", {lineHeight: "1"}], // 96px / 96px
  "9xl": ["8rem", {lineHeight: "1"}], // 128px / 128px
} as const;

export const fontFamily = {
  sans: "Inter, sans-serif",
  serif: "Roboto Slab, serif",
  mono: "Roboto Mono, monospace",
} as const;
