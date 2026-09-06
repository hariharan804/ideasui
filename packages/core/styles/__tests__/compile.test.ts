import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

import { describe, it, expect, beforeAll } from 'vitest';

const stylesDir = path.resolve(__dirname, '..');
const distDir = path.join(stylesDir, 'dist');

describe('@ideasui/styles compilation outputs', () => {
  beforeAll(() => {
    const themeDir = path.resolve(stylesDir, '../theme');
    const themeCssPath = path.join(themeDir, 'dist', 'theme.css');

    // Build theme dynamically if missing
    if (!fs.existsSync(themeCssPath)) {
      try {
        // eslint-disable-next-line no-console
        console.log('Building theme dynamically for styles compilation test...');
        // eslint-disable-next-line sonarjs/no-os-command-from-path
        execSync('pnpm run build', { cwd: themeDir, stdio: 'inherit' });
      } catch (error) {
        console.error('Failed to build theme dynamically during test setup:', error);
      }
    }

    // Ensure styles were compiled, build if missing
    const baseCssPath = path.join(distDir, 'base.css');

    if (!fs.existsSync(distDir) || !fs.existsSync(baseCssPath)) {
      try {
        // eslint-disable-next-line sonarjs/no-os-command-from-path
        execSync('npx tsup --minify --dts', { cwd: stylesDir, stdio: 'inherit' });
        // eslint-disable-next-line sonarjs/no-os-command-from-path
        execSync('node scripts/build-css.js', { cwd: stylesDir, stdio: 'inherit' });
      } catch (error) {
        console.error('Failed to build styles dynamically during test setup:', error);
      }
    }

    expect(fs.existsSync(distDir)).toBe(true);
  });

  it('should compile and output base.css with correct contents', () => {
    const filePath = path.join(distDir, 'base.css');

    expect(fs.existsSync(filePath)).toBe(true);

    const css = fs.readFileSync(filePath, 'utf8');

    // Should have our prepended header
    expect(css.startsWith('/*! IdeasUI CSS - base.css')).toBe(true);
    expect(css).toContain('/* Compiled by */');
    expect(css).toContain('/*! tailwindcss');

    // Should include raw variables
    expect(css).toContain('--ideasui-backdrop-blur-lg');

    // Should include Tailwind Preflight resets
    expect(css).toContain('box-sizing:border-box');
  });

  it('should compile and output styles.css without duplicating variables and resets', () => {
    const filePath = path.join(distDir, 'styles.css');

    expect(fs.existsSync(filePath)).toBe(true);

    const css = fs.readFileSync(filePath, 'utf8');

    // Should have our prepended header
    expect(css.startsWith('/*! IdeasUI CSS - styles.css')).toBe(true);

    // Should NOT include raw variables block
    expect(css).not.toContain('--ideasui-backdrop-blur-lg:blur(');

    // Should NOT include Preflight resets
    expect(css).not.toContain('box-sizing:border-box');

    // Should include Tailwind theme mappings and utility classes
    expect(css).toContain('ideasui-color-primary');
    expect(css).toContain('.flex');
  });

  it('should compile and output components/button.css without duplicating variables and resets', () => {
    const filePath = path.join(distDir, 'components', 'button.css');

    expect(fs.existsSync(filePath)).toBe(true);

    const css = fs.readFileSync(filePath, 'utf8');

    // Should have our prepended header
    expect(css.startsWith('/*! IdeasUI CSS - button.css')).toBe(true);

    // Should NOT include raw variables block
    expect(css).not.toContain('--ideasui-backdrop-blur-lg:blur(');

    // Should NOT include Preflight resets
    expect(css).not.toContain('box-sizing:border-box');

    // Should compile button component utilities
    expect(css).toContain('.btn');
  });

  it('should export the version entry points', () => {
    const mjsPath = path.join(distDir, 'index.mjs');
    const dtsPath = path.join(distDir, 'index.d.mts');

    expect(fs.existsSync(mjsPath)).toBe(true);
    expect(fs.existsSync(dtsPath)).toBe(true);

    const mjsContent = fs.readFileSync(mjsPath, 'utf8');

    expect(mjsContent).toContain('@ideasui/styles');
  });
});
