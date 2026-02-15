#!/usr/bin/env node

/**
 * Generate theme.css dynamically from ideasUIPlugin
 * 100% Data-Driven by the plugin output.
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { ideasUIPlugin } from '../dist/system/plugin/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.join(__dirname, '..', 'dist', 'ideasui-theme.css');
const BYTES_PER_KB = 1024;
const PREFIX = 'ideasui';

/**
 * Extract CSS variables from plugin by executing it with mock Tailwind API
 */
function extractPluginStyles() {
  const captured = { baseStyles: {} };
  const pluginData = ideasUIPlugin({ prefix: PREFIX });
  pluginData.handler({
    addBase: (styles) => {
      Object.assign(captured.baseStyles, styles);
    },
    addUtilities: () => {},
    addVariant: () => {},
  });
  return captured.baseStyles;
}

/**
 * Helper to resolve values from variables or raw components
 */
function resolveValue(value, contextVars) {
  if (typeof value !== 'string') return value;

  if (value.startsWith('var(')) {
    const match = value.match(/var\((--[^)]+)\)/);
    if (match) {
      // Preserve var() references to internal tokens (semantic → palette aliases)
      // e.g. var(--ideasui-primary-500) stays as-is so semantic tokens derive from scale
      if (match[1].startsWith(`--${PREFIX}`)) {
        return value;
      }

      const refValue = contextVars[match[1]];
      if (refValue) return resolveValue(refValue, contextVars);
    }
  }

  // Do NOT wrap raw OKLCH components in oklch() — they are stored as raw
  // components so oklch(var(...) / <alpha>) works for alpha modifier support
  return value;
}

/**
 * Main generation function
 */
function generateThemeCSS() {
  const baseStyles = extractPluginStyles();
  const rootVars = baseStyles[':root'] || {};

  const lightSelector = Object.keys(baseStyles).find((s) => s.includes('light'));
  const darkSelector = Object.keys(baseStyles).find((s) => s.includes('dark'));

  const lightSource = { ...rootVars, ...(baseStyles[lightSelector] || {}) };
  const darkSource = { ...rootVars, ...(baseStyles[darkSelector] || {}) };

  const buildThemedEntries = (source, baseline = {}) => {
    const entries = {};
    Object.entries(source).forEach(([key, value]) => {
      if (!key.startsWith('--')) return;

      const resolved = resolveValue(value, source);
      if (!resolved) return;

      // Handle aliases for semantic tokens
      if (key.startsWith(`--${PREFIX}-`)) {
        if (key.endsWith('-DEFAULT')) {
          const alias = `--${key.replace(`--${PREFIX}-`, '').replace('-DEFAULT', '')}`;
          entries[alias] = resolved;
        } else if (key.endsWith('-on')) {
          const alias = `--${key.replace(`--${PREFIX}-`, '').replace('-on', '')}-foreground`;
          entries[alias] = resolved;
        }
      }

      // Include if it's an alias OR if it differs from baseline
      if (!key.startsWith(`--${PREFIX}`) || resolved !== baseline[key]) {
        entries[key] = resolved;
      }
    });
    return entries;
  };

  const lightThemed = buildThemedEntries(lightSource);
  const darkThemed = buildThemedEntries(darkSource, lightSource);

  const format = (vars) =>
    Object.entries(vars)
      .sort()
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n');

  // Tokens that should NOT be mapped into @theme — they're plain CSS variables only
  const SKIP_PATTERNS = [
    '-interaction-',
    '-accessibility-',
    '-elevation-',
    '-backdrop-',
    '-disabled-opacity',
    '-hover-opacity',
    '-focus-ring-',
    '-divider-weight',
  ];

  // Dynamic @theme block mapping with deduplication
  const themeMappings = new Map();
  Object.keys(lightThemed).forEach((key) => {
    // Skip non-mappable tokens from @theme block
    if (SKIP_PATTERNS.some((p) => key.includes(p))) return;

    let category = null;
    let subName = key.replace('--', '');

    if (key.includes('-spacing-')) {
      category = 'spacing';
      subName = subName.split('-spacing-')[1];
    } else if (key.includes('-duration-')) {
      category = 'transition-duration';
      subName = subName.split('-duration-')[1];
    } else if (key.includes('-easing-')) {
      category = 'transition-timing-function';
      subName = subName.split('-easing-')[1];
    } else if (key.includes('-radius-')) {
      category = 'border-radius';
      subName = subName.split('-radius-')[1];
    } else if (key.includes('-shadow-') || key.includes('-box-shadow-')) {
      category = 'shadow';
      subName = subName.includes('-box-shadow-')
        ? subName.split('-box-shadow-')[1]
        : subName.split('-shadow-')[1];
    } else if (key.includes('-font-size-')) {
      category = 'font-size';
      subName = subName.split('-font-size-')[1];
    } else if (key.includes('-font-')) {
      category = 'font';
      subName = subName.split('-font-')[1];
    } else if (key.includes('-breakpoint-')) {
      category = 'breakpoint';
      subName = subName.split('-breakpoint-')[1];
    } else if (key.includes('-line-height-')) {
      category = 'leading';
      subName = subName.split('-line-height-')[1];
    } else if (key.includes('-tracking-')) {
      category = 'tracking';
      subName = subName.split('-tracking-')[1];
    } else if (key.includes('-opacity-')) {
      category = 'opacity';
      subName = subName.split('-opacity-')[1];
    } else if (key.includes('-z-index-')) {
      category = 'z-index';
      subName = subName.split('-z-index-')[1];
    } else if (key.includes('-blur-')) {
      category = 'blur';
      subName = subName.split('-blur-')[1];
    } else if (key.includes('-border-')) {
      // Only match actual border-width tokens, not semantic border-color tokens
      const borderSuffix = key.split('-border-').pop();
      const BORDER_WIDTH_SUFFIXES = [
        'hairline',
        'thin',
        'medium',
        'thick',
        'heavy',
        'none',
        'widthDefault',
      ];
      if (BORDER_WIDTH_SUFFIXES.includes(borderSuffix)) {
        category = 'border-width';
        subName = borderSuffix;
      } else {
        // Semantic border colors (base, subtle, emphasis, error, focus, success)
        category = 'color';
        subName = `border-${borderSuffix}`;
      }
    } else if (key.startsWith(`--${PREFIX}`)) {
      // Remaining prefixed tokens are color tokens
      category = 'color';
      subName = subName.replace(`${PREFIX}-`, '');
      // Strip 'color-' if it exists in the variable name to avoid duplication
      if (subName.startsWith('color-')) {
        subName = subName.replace('color-', '');
      }
    } else {
      // Non-prefixed aliases
      category = 'color';
    }

    if (!category) return;

    const tailwindKey = `--${category}-${subName}`;

    // Priority: Semantic aliases (shorter names) win over raw prefixed ones
    const isAlias = !key.startsWith(`--${PREFIX}`);
    if (!themeMappings.has(tailwindKey) || isAlias) {
      themeMappings.set(tailwindKey, `  ${tailwindKey}: var(${key});`);
    }
  });

  const themeBlock = Array.from(themeMappings.values()).sort().join('\n');

  return `/**
 * IdeasUI Theme CSS
 * Auto-generated from ideasUIPlugin
 * 100% Data-Driven
 */

:root,
[data-ideasui-theme="light"] {
${format(lightThemed)}
}

.dark,
[data-ideasui-theme="dark"] {
${format(darkThemed)}
}

/* Tailwind v4 Theme Mappings */
@theme {
${themeBlock}
}
`;
}

function writeThemeCSS() {
  try {
    const css = generateThemeCSS();
    const dir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, css, 'utf8');
    console.log(`✅ Generated theme.css (${(css.length / BYTES_PER_KB).toFixed(2)}KB)`);
  } catch (error) {
    console.error('❌ Failed to generate theme.css:', error);
    process.exit(1);
  }
}

writeThemeCSS();
