#!/usr/bin/env node

/**
 * Generate theme.css dynamically from ideasUIPlugin
 * 100% Data-Driven by the plugin output.
 */

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ideasUIPlugin } from '../dist/plugin/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.join(__dirname, '..', 'dist', 'theme.css');
const BYTES_PER_KB = 1024;
const PREFIX = 'ideasui';

const camelToKebab = (string_) =>
  string_.replaceAll(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

/**
 * Extract CSS variables from plugin by executing it with mock Tailwind API
 * @returns {{ captured: { baseStyles: Record<string, any>, utilities: Record<string, any> }, config: any }}
 */
function extractPluginStyles() {
  const captured = { baseStyles: {}, utilities: {} };
  const pluginData = ideasUIPlugin({ prefix: PREFIX });
  pluginData.handler({
    addBase: (styles) => {
      for (const [selector, rules] of Object.entries(styles)) {
        if (!captured.baseStyles[selector]) {
          captured.baseStyles[selector] = {};
        }
        Object.assign(captured.baseStyles[selector], rules);
      }
    },
    addUtilities: (utilities) => {
      for (const [selector, rules] of Object.entries(utilities)) {
        captured.utilities[selector] = rules;
      }
    },
    addVariant: () => {},
  });
  return { captured, config: pluginData.config };
}

/**
 * Helper to resolve values from variables or raw components
 */
function resolveValue(value, contextVariables) {
  if (typeof value !== 'string') return value;

  if (value.startsWith('var(')) {
    const match = value.match(/var\((--[^)]+)\)/);
    if (match) {
      // Preserve var() references to internal tokens (semantic → palette aliases)
      // e.g. var(--ideasui-primary-500) stays as-is so semantic tokens derive from scale
      if (match[1].startsWith(`--${PREFIX}`)) {
        return value;
      }

      const referenceValue = contextVariables[match[1]];
      if (referenceValue) return resolveValue(referenceValue, contextVariables);
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
  const { captured, config } = extractPluginStyles();
  const themeExtend = config?.theme?.extend || {};
  const animation = themeExtend.animation || {};
  const keyframes = themeExtend.keyframes || {};

  const baseStyles = captured.baseStyles;
  const rawUtilities = captured.utilities;
  const rootVariables = baseStyles[':root'] || {};
  // const lightSelector = Object.keys(baseStyles).find((s) => s.includes('light'));
  // const darkSelector = Object.keys(baseStyles).find((s) => s.includes('dark'));
  const findSelector = (styles, keywords) =>
    Object.keys(styles).find((s) => keywords.some((k) => s.includes(k)));

  const lightSelector = findSelector(baseStyles, ['light', 'data-ideasui-theme="light"']);
  const darkSelector = findSelector(baseStyles, ['dark', 'data-ideasui-theme="dark"']);
  // const lightSource = { ...rootVars, ...(baseStyles[lightSelector] || {}) };
  // const darkSource = { ...rootVars, ...(baseStyles[darkSelector] || {}) };
  const lightSource = { ...rootVariables, ...(lightSelector ? baseStyles[lightSelector] : {}) };
  const darkSource = { ...rootVariables, ...(darkSelector ? baseStyles[darkSelector] : {}) };

  const buildThemedEntries = (source, baseline = {}) => {
    const entries = {};
    for (const [key, value] of Object.entries(source)) {
      if (!key.startsWith('--')) continue;

      const resolved = resolveValue(value, source);
      if (!resolved) continue;

      // Handle aliases for semantic tokens
      const searchString = `--${PREFIX}-`;
      if (key.startsWith(searchString)) {
        if (key.endsWith('-DEFAULT')) {
          const alias = `--${key.replace(searchString, '').replace('-DEFAULT', '')}`;
          entries[alias] = resolved;
        } else if (key.endsWith('-on')) {
          const alias = `--${key.replace(searchString, '').replace('-on', '')}-foreground`;
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
    }
    return entries;
  };

  const lightThemed = buildThemedEntries(lightSource);
  const darkThemed = buildThemedEntries(darkSource, lightSource);

  const format = (variables) =>
    Object.entries(variables)
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
  for (const key of Object.keys(lightThemed)) {
    // Skip non-mappable tokens from @theme block
    if (SKIP_PATTERNS.some((p) => key.includes(p))) continue;

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
    } else if (key.includes('-radius-') || key === `--${PREFIX}-radius`) {
      category = 'radius';
      subName = key === `--${PREFIX}-radius` ? '' : subName.split('-radius-')[1];
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
        continue;
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

    if (!category) continue;

    const tailwindKey = subName ? `--${category}-${subName}` : `--${category}`;

    // Priority: Semantic aliases (shorter names) win over raw prefixed ones
    const isAlias = !key.startsWith(`--${PREFIX}`);
    if (!themeMappings.has(tailwindKey) || isAlias) {
      let value = `var(${key})`;
      if (category === 'color') {
        const resolvedValue = lightThemed[key];

        // Handle specific overlay formatting from user request natively
        switch (key) {
          case `--${PREFIX}-color-active-overlay`: {
            value = `oklch(var(--${PREFIX}-overlay-color) / var(--${PREFIX}-opacity-active-overlay))`;

            break;
          }
          case `--${PREFIX}-color-hover-overlay`: {
            value = `oklch(var(--${PREFIX}-overlay-color) / var(--${PREFIX}-opacity-hover-overlay))`;

            break;
          }
          case `--${PREFIX}-color-surface-muted`: {
            value = `oklch(var(--${PREFIX}-color-surface-muted) / var(--${PREFIX}-opacity-surface-muted))`;

            break;
          }
          case `--${PREFIX}-color-surface-overlay`: {
            value = `oklch(var(--${PREFIX}-color-surface-overlay) / var(--${PREFIX}-opacity-surface-overlay))`;

            break;
          }
          default: {
            value =
              resolvedValue && resolvedValue.includes('var(') && resolvedValue.includes('/')
                ? `var(${key})`
                : `oklch(var(${key}))`;
          }
        }
      }
      themeMappings.set(tailwindKey, `  ${tailwindKey}: ${value};`);
    }
  }

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

  // Inject animations
  for (const [key, value] of Object.entries(animation)) {
    if (key !== 'none') {
      const tailwindKey = `--animate-${key}`;
      themeMappings.set(tailwindKey, `  ${tailwindKey}: ${value};`);
    }
  }

  const themeBlock = [...themeMappings.values()].sort().join('\n');

  // Inject keyframes
  const keyframesBlock = Object.entries(keyframes)
    .map(([name, frames]) => {
      const frameLines = Object.entries(frames)
        .map(([percent, properties]) => {
          const cssProperties = Object.entries(properties)
            .map(([k, v]) => {
              const kebabK = camelToKebab(k);
              return `${kebabK}: ${v};`;
            })
            .join(' ');
          return `    ${percent} { ${cssProperties} }`;
        })
        .join('\n');
      return `  @keyframes ${name} {\n${frameLines}\n  }`;
    })
    .join('\n\n');

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

  return {
    variables: `:root,
[data-ideasui-theme="light"] {
${format(lightThemed)}
}

.dark,
[data-ideasui-theme="dark"] {
${format(darkThemed)}
}

/* Explicit Utilities */
${combinedUtilities}
`,
    config: `/* Tailwind v4 Theme Mappings */
@theme {
${themeBlock}

${keyframesBlock}
}
`,
    full: `/**
 * IdeasUI Theme CSS
 * Auto-generated from ideasUIPlugin
 * 100% Data-Driven
 */
@import "./theme-variables.css";
@import "./theme-config.css";
`,
  };
}

function writeThemeCSS() {
  try {
    const { variables, config, full } = generateThemeCSS();
    const dir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(OUTPUT_PATH, full, 'utf8');
    fs.writeFileSync(path.join(dir, 'theme-variables.css'), variables, 'utf8');
    fs.writeFileSync(path.join(dir, 'theme-config.css'), config, 'utf8');

    console.log(`✅ Generated theme.css (${(full.length / BYTES_PER_KB).toFixed(2)}KB)`);
    console.log(
      `✅ Generated theme-variables.css (${(variables.length / BYTES_PER_KB).toFixed(2)}KB)`,
    );
    console.log(`✅ Generated theme-config.css (${(config.length / BYTES_PER_KB).toFixed(2)}KB)`);
  } catch (error) {
    console.error('❌ Failed to generate theme files:', error);
    process.exit(1);
  }
}

writeThemeCSS();
