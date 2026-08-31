// .agent/hooks.mjs
//
// AI agent lifecycle hooks for IdeasUI.
// Runs automatically before/after file edits to enforce code quality,
// type safety, and the IdeasUI design-token contract.

import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Resolve the monorepo root (two levels up from .agent/hooks.mjs). */
function repoRoot() {
  return path.resolve(new URL(import.meta.url).pathname, '..', '..');
}

/**
 * Run a shell command from the repo root.
 * Returns true on success, false (warnOnly) or throws on failure.
 */
function run(cmd, { label = cmd, warnOnly = false } = {}) {
  try {
    // eslint-disable-next-line sonarjs/os-command
    execSync(cmd, { stdio: 'pipe', cwd: repoRoot() });
    return true;
  } catch (error) {
    // execSync error: stderr/stdout are Buffers
    const stderr = Buffer.isBuffer(error.stderr)
      ? error.stderr.toString().trim()
      : (error.stderr ?? '');
    const stdout = Buffer.isBuffer(error.stdout)
      ? error.stdout.toString().trim()
      : (error.stdout ?? '');
    const msg = stderr || stdout || error.message;
    if (warnOnly) {
      console.warn(`⚠️  ${label}:\n${msg}`);
      return false;
    }
    throw new Error(`❌ ${label} failed:\n${msg}`);
  }
}

/**
 * Make a file path absolute. Hook callers may pass relative paths.
 */
function abs(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.resolve(repoRoot(), filePath);
}

/**
 * Return a repo-relative display path (e.g. "packages/components/button/src/button.tsx").
 */
function rel(filePath) {
  return path.relative(repoRoot(), abs(filePath));
}

/**
 * Walk up from filePath and find the nearest package.json directory.
 * Used to scope typecheck to a single package instead of the whole turbo graph.
 */
function nearestPackageDir(filePath) {
  let dir = path.dirname(abs(filePath));
  const root = repoRoot();
  while (dir !== root && dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return root; // fallback: repo root
}

// ─── Protected files ──────────────────────────────────────────────────────────

/**
 * Basenames the AI must never edit directly.
 * Lock files, generated outputs, and sensitive configs.
 */
const PROTECTED = new Set([
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  '.env.production',
  '.env.local',
  'turbo.json',
  '.npmrc',
  '.nvmrc',
  'chromatic.config.json',
]);

// ─── Pattern matchers ─────────────────────────────────────────────────────────

const isTS = (f) => /\.(ts|tsx)$/.test(f);
const isJS = (f) => /\.(js|mjs|cjs|jsx)$/.test(f);
const isStyle = (f) => /\.(ts|tsx|js|jsx|css)$/.test(f);
const isRecipe = (f) => f.includes('theme/src/recipes/') || f.includes('theme/src/tokens/');
const isComponent = (f) => f.includes('packages/components/') && isTS(f);
const isTest = (f) => /\.(test|spec)\.(ts|tsx)$/.test(f);

// Raw Tailwind palette colors forbidden in consumer files.
// Also catches numeric shades on semantic names (e.g. primary-500, secondary-200).
const FORBIDDEN_COLOR_PATTERN = String.raw`(gray|slate|zinc|stone|neutral|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary|secondary|tertiary|success|warning|error|info)-\d+`;

// ─── Pre-edit hook ────────────────────────────────────────────────────────────

/**
 * Runs BEFORE the AI edits a file.
 *
 * Checks:
 *  1. Block edits to protected lock / config files.
 *  2. Warn about existing formatting drift (non-blocking).
 */
export async function preEdit({ filePath }) {
  const fileName = path.basename(filePath);

  // 1. Hard block on protected files
  if (PROTECTED.has(fileName)) {
    throw new Error(
      `❌ "${fileName}" is a protected file and must not be edited by the AI agent.\n` +
        `   Make this change manually and commit it separately.`,
    );
  }

  // 2. Warn about formatting drift — postEdit will auto-fix it
  //    Use `pnpm exec prettier` because prettier is a devDep, not a pnpm script alias.
  if (isTS(filePath) || isJS(filePath)) {
    run(`pnpm exec prettier --check "${abs(filePath)}"`, {
      label: 'Pre-edit prettier check',
      warnOnly: true,
    });
  }

  return { proceed: true };
}

// ─── Post-edit helpers ────────────────────────────────────────────────────────

/** Formats TypeScript/JavaScript files using Prettier. */
function formatWithPrettier(absPath, relPath) {
  run(`pnpm exec prettier --write "${absPath}"`, { label: 'Prettier format' });
  console.log(`✅ Formatted: ${relPath}`);
}

/** Runs ESLint auto-fix on TypeScript/JavaScript files. */
function runEslint(absPath, relPath) {
  const fixed = run(`pnpm exec eslint --max-warnings=0 --fix "${absPath}"`, {
    label: 'ESLint auto-fix',
    warnOnly: true,
  });
  console.log(
    fixed
      ? `✅ Lint clean: ${relPath}`
      : `⚠️  Lint warnings remain in ${relPath} — review before committing`,
  );
}

/** Scoped TypeScript type-check against nearest package. */
function checkTypeScript(absPath) {
  const pkgDir = nearestPackageDir(absPath);
  const tsconfig = path.join(pkgDir, 'tsconfig.json');
  if (fs.existsSync(tsconfig)) {
    run(`pnpm exec tsc --noEmit --skipLibCheck --project "${tsconfig}"`, {
      label: `TypeScript check (${path.relative(repoRoot(), pkgDir)})`,
      warnOnly: true,
    });
  }
}

/** Checks component naming conventions. */
function checkNamingConvention(absPath) {
  run(`node scripts/check-naming.js "${absPath}"`, {
    label: 'Naming convention check',
    warnOnly: true,
  });
}

/** Checks design-token usage in style files using native JS regex. */
function checkDesignTokens(absPath, relPath) {
  const content = fs.readFileSync(absPath, 'utf8');
  const lines = content.split('\n');
  const forbiddenRegex = new RegExp(FORBIDDEN_COLOR_PATTERN);
  const matches = [];

  for (const [index, line] of lines.entries()) {
    if (forbiddenRegex.test(line)) {
      matches.push(`${index + 1}:${line}`);
    }
  }

  if (matches.length > 0) {
    console.warn(
      `⚠️  Forbidden color classes detected in ${relPath}:\n` +
        matches.map((l) => `   ${l}`).join('\n') +
        '\n' +
        `   → Use IdeasUI semantic tokens only (see rules/design-tokens.md).\n` +
        `   → Allowed: bg-primary, text-on-primary, bg-primary-subtle, bg-surface, etc.`,
    );
  }
}

/** Displays reminder when recipe or token files are modified. */
function checkRecipeChange(relPath) {
  console.log(
    `ℹ️  Recipe or token file changed: ${relPath}\n` +
      `   → Run tests: pnpm test packages/core/theme\n` +
      `   → Rebuild:   pnpm build --filter=@ideasui/theme`,
  );
}

// ─── Post-edit hook ───────────────────────────────────────────────────────────

/**
 * Runs AFTER the AI edits a file.
 *
 * Checks (in order):
 *  1. Auto-format with Prettier.
 *  2. ESLint auto-fix (tailwindcss token plugin, boundaries, unicorn).
 *  3. TypeScript check scoped to the nearest package (fast).
 *  4. Naming-convention check for component files.
 *  5. Design-token guard — catches raw palette colors & numeric shades.
 *  6. Recipe-change reminder.
 */
export async function postEdit({ filePath, success }) {
  if (!success) return;

  const absPath = abs(filePath);
  const relPath = rel(filePath);

  if (isTS(absPath) || isJS(absPath)) {
    formatWithPrettier(absPath, relPath);
    runEslint(absPath, relPath);
  }

  if (isTS(absPath)) {
    checkTypeScript(absPath);
  }

  if (isComponent(absPath) && !isTest(absPath)) {
    checkNamingConvention(absPath);
  }

  if (isStyle(absPath) && !isRecipe(absPath) && !isTest(absPath)) {
    checkDesignTokens(absPath, relPath);
  }

  if (isRecipe(absPath)) {
    checkRecipeChange(relPath);
  }
}
