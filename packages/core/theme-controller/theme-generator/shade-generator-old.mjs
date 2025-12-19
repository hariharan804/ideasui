import chroma from "chroma-js";

/**
 * Convert color to specified format
 */
function formatColor(color, format = "hex") {
  const c = chroma(color);

  switch (format) {
    case "hex":
      return c.hex();
    case "rgb":
      return c.css("rgb");
    case "rgba":
      return c.css("rgba");
    case "hsl":
      return c.css("hsl");
    case "oklch":
      const [l, c_val, h] = c.oklch();
      return `oklch(${l.toFixed(3)} ${c_val.toFixed(3)} ${h.toFixed(1)})`;
    case "p3":
      const [r, g, b] = c.rgb();
      return `color(display-p3 ${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)})`;
    default:
      return c.hex();
  }
}

/**
 * Generate Tailwind CSS shades (50-950) for brand colors
 *
 * Usage:
 * generateShades('#3b82f6', 'oklch') // Returns shades in OKLCH format
 *
 * Returns: { light: {...}, dark: {...} }
 */
export function generateShades(baseColor, format = "hex") {
  const base = chroma(baseColor);
  const [h, s, l] = base.hsl();

  const lightShades = {
    50: formatColor(chroma.hsl(h, s * 0.1, 0.98), format),
    100: formatColor(chroma.hsl(h, s * 0.2, 0.95), format),
    200: formatColor(chroma.hsl(h, s * 0.4, 0.9), format),
    300: formatColor(chroma.hsl(h, s * 0.6, 0.8), format),
    400: formatColor(chroma.hsl(h, s * 0.8, 0.7), format),
    500: formatColor(baseColor, format),
    600: formatColor(chroma.hsl(h, s, l * 0.8), format),
    700: formatColor(chroma.hsl(h, s, l * 0.65), format),
    800: formatColor(chroma.hsl(h, s, l * 0.5), format),
    900: formatColor(chroma.hsl(h, s, l * 0.35), format),
    950: formatColor(chroma.hsl(h, s, l * 0.2), format),
  };

  const darkShades = {
    50: formatColor(chroma.hsl(h, s, l * 0.2), format),
    100: formatColor(chroma.hsl(h, s, l * 0.35), format),
    200: formatColor(chroma.hsl(h, s, l * 0.5), format),
    300: formatColor(chroma.hsl(h, s, l * 0.65), format),
    400: formatColor(chroma.hsl(h, s, l * 0.8), format),
    500: formatColor(chroma.hsl(h, s * 0.9, Math.min(0.75, l + 0.2)), format),
    600: formatColor(chroma.hsl(h, s * 0.8, 0.7), format),
    700: formatColor(chroma.hsl(h, s * 0.6, 0.8), format),
    800: formatColor(chroma.hsl(h, s * 0.4, 0.9), format),
    900: formatColor(chroma.hsl(h, s * 0.2, 0.95), format),
    950: formatColor(chroma.hsl(h, s * 0.1, 0.98), format),
  };

  return {light: lightShades, dark: darkShades};
}

// Generate multiple brand color shades
export function generateBrandTheme(colors, format = "hex") {
  const theme = {light: {}, dark: {}};

  Object.entries(colors).forEach(([name, color]) => {
    const shades = generateShades(color, format);
    theme.light[name] = shades.light;
    theme.dark[name] = shades.dark;
  });

  return theme;
}

const shades = generateBrandTheme({
  primary: "#3b82f6",
  secondary: "#f43f5e",
  accent: "#4ade80",
});
console.log("👨‍💻 ~ shades:", shades);
