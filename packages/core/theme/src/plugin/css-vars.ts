import type { TokenOverrides, SemanticTokenOverrides } from '../types';

import { kebabCase } from './utils';

/**
 * Generates CSS custom properties from design tokens (CSS variables defined in variables.css)
 * @param {string} _prefix - The CSS variable prefix
 * @returns {Record<string, string>} Empty object as base tokens are loaded directly from variables.css
 */
export function generateDesignTokenCSSVars(_prefix: string): Record<string, string> {
  return {};
}

/**
 * Generates CSS custom properties for dark mode overrides
 * @param {string} _prefix - The CSS variable prefix
 * @returns {Record<string, string>} Empty object as dark mode tokens are loaded directly from variables.css
 */
export function generateDarkDesignTokenCSSVars(_prefix: string): Record<string, string> {
  return {};
}

interface TokenCategoryConfig {
  key: string;
  getName: (key: string, prefix: string) => string;
  getValue?: (value: unknown) => string;
}

const tokenConfigs: TokenCategoryConfig[] = [
  {
    key: 'duration',
    getName: (key, prefix) => `--${prefix}-duration-${kebabCase(key)}`,
  },
  {
    key: 'easing',
    getName: (key, prefix) => `--${prefix}-easing-${kebabCase(key)}`,
  },
  {
    key: 'spacing',
    getName: (key, prefix) => `--${prefix}-spacing-${key.replace('.', '_')}`,
  },
  {
    key: 'fontSize',
    getName: (key, prefix) => `--${prefix}-font-size-${key}`,
    getValue: (value) => (Array.isArray(value) ? value[0] : String(value)),
  },
  {
    key: 'borderRadius',
    getName: (key, prefix) =>
      key === 'DEFAULT' ? `--${prefix}-radius` : `--${prefix}-radius-${key}`,
  },
  {
    key: 'boxShadow',
    getName: (key, prefix) => `--${prefix}-shadow-${key}`,
  },
  {
    key: 'shadow',
    getName: (key, prefix) => `--${prefix}-shadow-${key}`,
  },
  {
    key: 'zIndex',
    getName: (key, prefix) => `--${prefix}-z-index-${key}`,
    getValue: String,
  },
  {
    key: 'opacity',
    getName: (key, prefix) => `--${prefix}-opacity-${kebabCase(key)}`,
    getValue: String,
  },
  {
    key: 'blur',
    getName: (key, prefix) => `--${prefix}-blur-${key}`,
  },
  {
    key: 'letterSpacing',
    getName: (key, prefix) => `--${prefix}-tracking-${key}`,
  },
  {
    key: 'fontFamily',
    getName: (key, prefix) => `--${prefix}-font-${kebabCase(key)}`,
  },
  {
    key: 'fontWeight',
    getName: (key, prefix) => `--${prefix}-font-weight-${key}`,
  },
  {
    key: 'borderWidth',
    getName: (key, prefix) => `--${prefix}-border-${key}`,
  },
  {
    key: 'animation',
    getName: (key, prefix) => `--${prefix}-animation-${key}`,
  },
  {
    key: 'surface',
    getName: (key, prefix) => `--${prefix}-color-${key}`,
  },
  {
    key: 'content',
    getName: (key, prefix) => `--${prefix}-color-content-${key}`,
  },
  {
    key: 'border',
    getName: (key, prefix) => `--${prefix}-border-${key}`,
  },
];

function processTokenCategory(
  t: Record<string, unknown>,
  prefix: string,
  cssVariables: Record<string, string>,
  config: TokenCategoryConfig,
): void {
  const categoryData = t[config.key];

  if (!categoryData || typeof categoryData !== 'object') {
    return;
  }

  for (const [key, value] of Object.entries(categoryData)) {
    if (value !== undefined) {
      const varName = config.getName(key, prefix);
      const varValue = config.getValue ? config.getValue(value) : String(value);

      cssVariables[varName] = varValue;
    }
  }
}

interface FlattenContext {
  prefix: string;
  cssVariables: Record<string, string>;
}

function flattenComponents(
  object: Record<string, unknown>,
  currentPrefix: string,
  context: FlattenContext,
  depth: number = 0,
): void {
  if (depth > 4) {
    return;
  }

  for (const [key, value] of Object.entries(object)) {
    const newPrefix = currentPrefix ? `${currentPrefix}-${key}` : key;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flattenComponents(value as Record<string, unknown>, newPrefix, context, depth + 1);
    } else if (typeof value === 'string' || typeof value === 'number') {
      const kebabKey = newPrefix.replaceAll(/([\da-z]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

      context.cssVariables[`--${context.prefix}-${kebabKey}`] = String(value);
    }
  }
}

export function generateCSSVarsFromTokenOverrides(
  tokens: Partial<TokenOverrides> | SemanticTokenOverrides | Record<string, unknown>,
  prefix: string,
): Record<string, string> {
  const t = tokens as Record<string, unknown> & { components?: unknown };
  const cssVariables: Record<string, string> = {};

  for (const config of tokenConfigs) {
    processTokenCategory(t, prefix, cssVariables, config);
  }

  if (t.components && typeof t.components === 'object') {
    flattenComponents(t.components as Record<string, unknown>, '', { prefix, cssVariables });
  }

  for (const [key, value] of Object.entries(t)) {
    if (key !== 'components' && typeof value === 'string') {
      cssVariables[`--${prefix}-color-${key}`] = value;
    }
  }

  return cssVariables;
}
