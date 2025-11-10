import fs from 'fs';
import {
  colors,
  lightColors,
  darkColors,
  lightBg,
  darkBg,
  lightGradients,
  darkGradients,
  lightShadows,
  darkShadows,
  typeface,
  typeScale,
  additionalTheme,
  animations,
  keyframes,
} from './tokens.js';
export function generateThemeCSS() {
  // Add adaptive color scales that change with theme
  const colorScales = ['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning', 'info'];

  const lines = [];
  lines.push('@import "tailwindcss";');

  lines.push('');
  lines.push('@layer base {');

  // Light mode - define light scale mappings =====================================================
  lines.push(':root, :host {');

  colorScales.forEach((colorName) => {
    if (colors[colorName]) {
      const color = colors[colorName];
      lines.push(`  --color-${colorName}-50: ${color[100]};`);
      lines.push(`  --color-${colorName}-100: ${color[90]};`);
      lines.push(`  --color-${colorName}-200: ${color[80]};`);
      lines.push(`  --color-${colorName}-300: ${color[70]};`);
      lines.push(`  --color-${colorName}-400: ${color[60]};`);
      lines.push(`  --color-${colorName}-500: ${color[50]};`);
      lines.push(`  --color-${colorName}-600: ${color[40]};`);
      lines.push(`  --color-${colorName}-700: ${color[30]};`);
      lines.push(`  --color-${colorName}-800: ${color[20]};`);
      lines.push(`  --color-${colorName}-900: ${color[10]};`);
    }
  });
  lines.push('');

  // Background colors for light mode
  Object.entries(lightBg).forEach(([key, value]) => {
    const colorMatch = value.match(/#[0-9A-Fa-f]{6}/);
    if (colorMatch) {
      let tokenRef = value;
      for (const [colorName, shades] of Object.entries(colors)) {
        if (typeof shades === 'object') {
          for (const [shade, hex] of Object.entries(shades)) {
            if (hex === value) {
              tokenRef = `var(--color-${colorName}-${shade})`;
              break;
            }
          }
        }
      }
      lines.push(`  --bg-${key}: ${tokenRef};`);
    } else {
      lines.push(`  --bg-${key}: ${value};`);
    }
  });
  lines.push('');

  // Gradients for light mode
  Object.entries(lightGradients).forEach(([key, value]) => {
    lines.push(`  --gradient-${key}: ${value};`);
  });
  lines.push('');

  // Shadows for light mode
  Object.entries(lightShadows).forEach(([key, value]) => {
    lines.push(`  --shadow-${key}: ${value};`);
  });
  lines.push('');

  // Semantic colors for light mode
  Object.entries(lightColors).forEach(([key, value]) => {
    lines.push(`  --color-${key}: ${value};`);
  });
  lines.push('}');
  lines.push('');

  // Dark mode - define dark scale mappings ===========================================
  lines.push('.dark {');

  colorScales.forEach((colorName) => {
    if (colors[colorName]) {
      const color = colors[colorName];
      lines.push(`  --color-${colorName}-50: ${color[10]};`);
      lines.push(`  --color-${colorName}-100: ${color[20]};`);
      lines.push(`  --color-${colorName}-200: ${color[30]};`);
      lines.push(`  --color-${colorName}-300: ${color[40]};`);
      lines.push(`  --color-${colorName}-400: ${color[50]};`);
      lines.push(`  --color-${colorName}-500: ${color[60]};`);
      lines.push(`  --color-${colorName}-600: ${color[70]};`);
      lines.push(`  --color-${colorName}-700: ${color[80]};`);
      lines.push(`  --color-${colorName}-800: ${color[90]};`);
      lines.push(`  --color-${colorName}-900: ${color[100]};`);
    }
  });
  lines.push('');

  // Background colors for dark mode
  Object.entries(darkBg).forEach(([key, value]) => {
    lines.push(`  --bg-${key}: ${value};`);
  });
  lines.push('');

  // Gradients for dark mode
  Object.entries(darkGradients).forEach(([key, value]) => {
    lines.push(`  --gradient-${key}: ${value};`);
  });
  lines.push('');

  // Shadows for dark mode
  Object.entries(darkShadows).forEach(([key, value]) => {
    lines.push(`  --shadow-${key}: ${value};`);
  });
  lines.push('');

  // Semantic colors for dark mode
  Object.entries(darkColors).forEach(([key, value]) => {
    lines.push(`  --color-${key}: ${value};`);
  });
  lines.push('}');
  lines.push('}');
  lines.push('');

  // ========================== THEME ==========================
  lines.push('@theme {');
  // Typeface
  Object.entries(typeface).forEach(([key, value]) => {
    lines.push(`  --font-${key}: ${value};`);
  });
  lines.push('');

  colorScales.forEach((colorName) => {
    if (colors[colorName]) {
      // Light mode mapping: 50->100, 100->90, ..., 900->10
      lines.push(`  --color-${colorName}-50: var(--color-${colorName}-50);`);
      lines.push(`  --color-${colorName}-100: var(--color-${colorName}-100);`);
      lines.push(`  --color-${colorName}-200: var(--color-${colorName}-200);`);
      lines.push(`  --color-${colorName}-300: var(--color-${colorName}-300);`);
      lines.push(`  --color-${colorName}-400: var(--color-${colorName}-400);`);
      lines.push(`  --color-${colorName}-500: var(--color-${colorName}-500);`);
      lines.push(`  --color-${colorName}-600: var(--color-${colorName}-600);`);
      lines.push(`  --color-${colorName}-700: var(--color-${colorName}-700);`);
      lines.push(`  --color-${colorName}-800: var(--color-${colorName}-800);`);
      lines.push(`  --color-${colorName}-900: var(--color-${colorName}-900);`);
    }
  });

  // Semantic colors for light mode
  Object.entries(lightColors).forEach(([key, value]) => {
    // Check if value is a reference to a color token
    const colorMatch = value.match(/#[0-9A-Fa-f]{6}/);
    if (colorMatch) {
      // Find the color token that matches this hex value
      let tokenRef = value;
      for (const [colorName, shades] of Object.entries(colors)) {
        if (typeof shades === 'object') {
          for (const [shade, hex] of Object.entries(shades)) {
            if (hex === value) {
              tokenRef = `var(--color-${key})`;
              break;
            }
          }
        }
      }
      lines.push(`  --color-${key}: ${tokenRef};`);
    } else {
      lines.push(`  --color-${key}: ${value};`);
    }
  });

  lines.push('');
  // Type scale
  Object.entries(typeScale).forEach(([key, value]) => {
    const [fontSize, config] = value;
    const fontSizeNum = parseFloat(fontSize);
    const lineHeightNum = parseFloat(config.lineHeight);
    lines.push(`  --text-${key}: ${fontSize};`);
    if (config.lineHeight)
      lines.push(`  --text-${key}--line-height: calc(${lineHeightNum} / ${fontSizeNum});`);
  });
  lines.push('');
  // Additional tokens
  Object.entries(additionalTheme).forEach(([key, value]) => {
    lines.push(`  --${key}: ${value};`);
  });
  // Animations
  Object.entries(animations).forEach(([key, value]) => {
    lines.push(`  --${key}: ${value};`);
  });
  lines.push('}');

  // Keyframes
  Object.entries(keyframes).forEach(([name, rules]) => {
    lines.push(`@keyframes ${name} {`);
    lines.push(rules);
    lines.push('}');
  });
  const css = lines.join('\n');
  fs.writeFileSync('./theme.css', css);
  console.log('✅ theme.css generated');
}
