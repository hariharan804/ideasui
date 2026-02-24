#!/usr/bin/env node

/**
 * Generate theme.css dynamically from ideasUIPlugin
 * 100% Data-Driven by the plugin output.
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { ideasUIPlugin } from '../dist/plugin/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.join(__dirname, '..', 'dist', 'theme.css');
const BYTES_PER_KB = 1024;
const PREFIX = 'ideasui';

/**
 * Extract CSS variables from plugin by executing it with mock Tailwind API
 */
export function extractPluginStyles() {
  const captured = { baseStyles: {}, utilities: {} };
  const pluginData = ideasUIPlugin({ prefix: PREFIX });
  pluginData.handler({
    addBase: (styles) => {
      Object.entries(styles).forEach(([selector, rules]) => {
        if (!captured.baseStyles[selector]) {
          captured.baseStyles[selector] = {};
        }
        Object.assign(captured.baseStyles[selector], rules);
      });
    },
    addUtilities: (utils) => {
      Object.entries(utils).forEach(([selector, rules]) => {
        captured.utilities[selector] = rules;
      });
    },
    addVariant: () => {},
  });
  return captured;
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
  const captured = extractPluginStyles();
  const baseStyles = captured.baseStyles;
  const rawUtilities = captured.utilities;
  const rootVars = baseStyles[':root'] || {};
  // const lightSelector = Object.keys(baseStyles).find((s) => s.includes('light'));
  // const darkSelector = Object.keys(baseStyles).find((s) => s.includes('dark'));
  const findSelector = (styles, keywords) =>
    Object.keys(styles).find((s) => keywords.some((k) => s.includes(k)));

  const lightSelector = findSelector(baseStyles, ['light', 'data-ideasui-theme="light"']);
  const darkSelector = findSelector(baseStyles, ['dark', 'data-ideasui-theme="dark"']);
  // const lightSource = { ...rootVars, ...(baseStyles[lightSelector] || {}) };
  // const darkSource = { ...rootVars, ...(baseStyles[darkSelector] || {}) };
  const lightSource = { ...rootVars, ...(lightSelector ? baseStyles[lightSelector] : {}) };
  const darkSource = { ...rootVars, ...(darkSelector ? baseStyles[darkSelector] : {}) };

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
      // Also force include -500 color tokens for completeness as requested
      if (
        !key.startsWith(`--${PREFIX}`) ||
        resolved !== baseline[key] ||
        (key.includes('-color-') && key.endsWith('-500'))
      ) {
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
      category = 'duration';
      subName = subName.split('-duration-')[1];
    } else if (key.includes('-easing-')) {
      category = 'ease';
      subName = subName.split('-easing-')[1];
    } else if (key.includes('-radius-')) {
      category = 'radius';
      subName = subName.split('-radius-')[1];
    } else if (key.includes('-shadow-') || key.includes('-box-shadow-')) {
      category = 'shadow';
      subName = subName.includes('-box-shadow-')
        ? subName.split('-box-shadow-')[1]
        : subName.split('-shadow-')[1];
    } else if (key.includes('-font-size-')) {
      category = 'text';
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
      const BORDER_WIDTH_SUFFIXES = ['hairline', 'thin', 'medium', 'thick', 'heavy', 'none'];
      if (BORDER_WIDTH_SUFFIXES.includes(borderSuffix)) {
        category = 'border-width';
        subName = borderSuffix;
      } else {
        // Semantic border colors (base, subtle, emphasis, error, focus, success)
        // We skip adding them to @theme as a color because it creates .border-border-subtle
        // Instead, we will generate explicit @utility classes for them.
        return;
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
      let value = `var(${key})`;
      if (category === 'color') {
        const resolvedValue = lightThemed[key];

        // Handle specific overlay formatting from user request natively
        if (key === `--${PREFIX}-color-active-overlay`) {
          value = `oklch(var(--${PREFIX}-overlay-color) / var(--${PREFIX}-opacity-active-overlay))`;
        } else if (key === `--${PREFIX}-color-hover-overlay`) {
          value = `oklch(var(--${PREFIX}-overlay-color) / var(--${PREFIX}-opacity-hover-overlay))`;
        } else if (key === `--${PREFIX}-color-surface-muted`) {
          value = `oklch(var(--${PREFIX}-color-surface-muted) / var(--${PREFIX}-opacity-surface-muted))`;
        } else if (key === `--${PREFIX}-color-surface-overlay`) {
          value = `oklch(var(--${PREFIX}-color-surface-overlay) / var(--${PREFIX}-opacity-surface-overlay))`;
        }
        // Fallback checks
        else if (resolvedValue && resolvedValue.includes('var(') && resolvedValue.includes('/')) {
          value = `var(${key})`;
        } else {
          value = `oklch(var(${key}))`;
        }
      }
      themeMappings.set(tailwindKey, `  ${tailwindKey}: ${value};`);
    }
  });

  // Manually add the active and hover composite mappings since they
  // are no longer explicit tokens loopable from `lightThemed`
  themeMappings.set(
    '--color-active-overlay',
    `  --color-active-overlay: oklch(var(--${PREFIX}-overlay-color) / var(--${PREFIX}-opacity-active-overlay));`,
  );
  themeMappings.set(
    '--color-hover-overlay',
    `  --color-hover-overlay: oklch(var(--${PREFIX}-overlay-color) / var(--${PREFIX}-opacity-hover-overlay));`,
  );

  const themeBlock = Array.from(themeMappings.values()).sort().join('\n');

  // Explicitly generate @utility classes for semantic borders
  const borderUtilities = Object.keys(lightThemed)
    .filter((k) => k.startsWith(`--${PREFIX}-color-border-`))
    .map((k) => {
      const name = k.replace(`--${PREFIX}-color-border-`, '');
      return `@utility border-${name} {\n  border-color: oklch(var(${k}));\n}`;
    })
    .join('\n\n');

  // Format explicitly provided classes as Tailwind v4 @utility blocks using @apply
  const classUtilities = Object.entries(rawUtilities)
    .map(([selector, rules]) => {
      // selector is like '.scrollbar-default', remove the dot
      const name = selector.replace('.', '');
      const applyRules = Object.keys(rules).filter((k) => k.startsWith('@apply'));
      if (applyRules.length > 0) {
        return `@utility ${name} {\n  ${applyRules[0]};\n}`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');

  const combinedUtilities = [borderUtilities, classUtilities].filter(Boolean).join('\n\n');

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

/* Explicit Utilities */
${combinedUtilities}
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
