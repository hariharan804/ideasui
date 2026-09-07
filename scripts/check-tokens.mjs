#!/usr/bin/env node

/**
 * Token & Design System Verification Script for IdeasUI
 *
 * Scans component packages, core theme packages, and applications for:
 * 1. Forbidden numeric brand shades (e.g. primary-50, primary-500, secondary-600)
 * 2. Raw hardcoded Tailwind palette colors (e.g. gray-500, blue-600, red-500, slate-900)
 * 3. Forbidden `dark:` prefix modifiers in classNames (which bypass automatic ThemeProvider resolution)
 * 4. Arbitrary inline HEX color utilities in classNames (e.g. bg-[#0f172a], text-[#ffffff])
 * 5. Raw bg-white/bg-black/text-white/text-black utility classes (when semantic surface/content tokens should be used)
 */

import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIRS = ['packages', 'apps'];
const EXTENSIONS = ['.ts', '.tsx'];

// Strict design system compliance checks
const CHECKS = [
  {
    name: 'Forbidden Numeric Brand/Intent Shade',
    regex: /\b(primary|secondary|tertiary|success|warning|danger|info|neutral)-[0-9]{2,3}\b/g,
    suggestion:
      'Do not use numeric shades like primary-500. Use semantic aliases: primary, on-primary, primary-subtle, primary-muted',
  },
  {
    name: 'Raw Palette Color',
    regex:
      /\b(gray|slate|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b/g,
    suggestion: 'Use semantic tokens (e.g. bg-primary, text-content-primary, bg-surface)',
  },
  {
    name: 'Forbidden dark: Modifier',
    regex: /\bdark:(bg|text|border|ring|shadow|from|via|to|opacity|content|divide)[\w-[\]#/]+/g,
    suggestion: 'Remove dark: modifier. IdeasUI semantic tokens resolve automatically per theme',
  },
  {
    name: 'Arbitrary Inline HEX Color',
    regex: /(?:bg|text|border|ring|fill|stroke)-\[#(?:[0-9a-fA-F]{3}){1,2}\]/g,
    suggestion: 'Use semantic theme color tokens instead of arbitrary HEX values',
  },
  {
    name: 'Raw White/Black Utility',
    regex: /\b(bg-white|bg-black|text-white|text-black)\b/g,
    suggestion: 'Use bg-surface, text-content-primary, text-content-inverse, or common-white/black',
  },
];

// Paths allowed to have documentation showcases, test mocks, or raw color swatches
const IGNORED_PATHS = [
  'node_modules',
  'dist',
  '.next',
  '.turbo',
  'storybook-static',
  '__tests__',
  'stories/',
  'script.ts',
  'docs-ui/theme-toggle.tsx',
  'landing/cta-section.tsx',
  'landing/features-section.tsx',
  'landing/hero-playground.tsx',
  'landing/install-snippet.tsx',
  'landing/landing-navbar.tsx',
  'docs-layout/navbar.tsx',
  'ui/token-viewer.tsx',
  'showcase/button/custom-variants.tsx',
  'design-system/page.tsx',
  'app/(layout)/docs/page.tsx',
  'tailwind.test.ts',
];

let totalViolations = 0;

function shouldIgnore(filePath) {
  return IGNORED_PATHS.some((ignored) => filePath.includes(ignored));
}

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (shouldIgnore(fullPath)) continue;

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip comments
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return;

    CHECKS.forEach(({ name, regex, suggestion }) => {
      const matches = line.match(regex);
      if (matches) {
        // Exclude internal CSS custom variable definitions like --ideasui-color-*
        const realViolations = matches.filter((m) => !line.includes('ideasui-color'));

        if (realViolations.length > 0) {
          console.error(
            `\x1b[31m[${name} Violation]\x1b[0m ${filePath}:${index + 1}\n` +
              `  Matched: \x1b[33m${realViolations.join(', ')}\x1b[0m\n` +
              `  Hint: ${suggestion}\n`,
          );
          totalViolations += realViolations.length;
        }
      }
    });
  });
}

console.log('🎨 Starting IdeasUI Theme Token & Class Verification...');
TARGET_DIRS.forEach((dir) => scanDirectory(path.resolve(process.cwd(), dir)));

if (totalViolations > 0) {
  console.error(
    `\x1b[31mFAILED:\x1b[0m Found ${totalViolations} non-semantic design token violation(s). Please replace them with IdeasUI semantic tokens.\n`,
  );
  process.exit(1);
} else {
  console.log(
    '\x1b[32mSUCCESS:\x1b[0m All scanned files strictly adhere to IdeasUI semantic tokens!\n',
  );
}
