import fs from 'node:fs';
import path from 'node:path';

import { describe, it, expect, beforeAll } from 'vitest';

const stylesDir = path.resolve(__dirname, '..');
const distDir = path.join(stylesDir, 'dist');

describe('@ideasui/styles compilation outputs', () => {
  beforeAll(() => {
    // Ensure styles were compiled
    expect(fs.existsSync(distDir)).toBe(true);
  });

  it('should compile and output base.css with correct contents', () => {
    const filePath = path.join(distDir, 'base.css');

    expect(fs.existsSync(filePath)).toBe(true);

    const css = fs.readFileSync(filePath, 'utf8');

    // Should have our prepended header
    expect(css.startsWith('/*! IdeasUI CSS - base.css')).toBe(true);
    expect(css.includes('/* Compiled by */')).toBe(true);
    expect(css.includes('/*! tailwindcss')).toBe(true);

    // Should include raw variables
    expect(css.includes('--ideasui-backdrop-blur-lg')).toBe(true);

    // Should include Tailwind Preflight resets
    expect(css.includes('box-sizing:border-box')).toBe(true);
  });

  it('should compile and output styles.css without duplicating variables and resets', () => {
    const filePath = path.join(distDir, 'styles.css');

    expect(fs.existsSync(filePath)).toBe(true);

    const css = fs.readFileSync(filePath, 'utf8');

    // Should have our prepended header
    expect(css.startsWith('/*! IdeasUI CSS - styles.css')).toBe(true);

    // Should NOT include raw variables block
    expect(css.includes('--ideasui-backdrop-blur-lg:blur(')).toBe(false);

    // Should NOT include Preflight resets
    expect(css.includes('box-sizing:border-box')).toBe(false);

    // Should include Tailwind theme mappings and utility classes
    expect(css.includes('--color-primary')).toBe(true);
    expect(css.includes('.flex')).toBe(true);
  });

  it('should compile and output components/button.css without duplicating variables and resets', () => {
    const filePath = path.join(distDir, 'components', 'button.css');

    expect(fs.existsSync(filePath)).toBe(true);

    const css = fs.readFileSync(filePath, 'utf8');

    // Should have our prepended header
    expect(css.startsWith('/*! IdeasUI CSS - button.css')).toBe(true);

    // Should NOT include raw variables block
    expect(css.includes('--ideasui-backdrop-blur-lg:blur(')).toBe(false);

    // Should NOT include Preflight resets
    expect(css.includes('box-sizing:border-box')).toBe(false);

    // Should compile button component utilities
    expect(css.includes('.btn')).toBe(true);
  });

  it('should export the version entry points', () => {
    const mjsPath = path.join(distDir, 'index.mjs');
    const dtsPath = path.join(distDir, 'index.d.mts');

    expect(fs.existsSync(mjsPath)).toBe(true);
    expect(fs.existsSync(dtsPath)).toBe(true);

    const mjsContent = fs.readFileSync(mjsPath, 'utf8');

    expect(mjsContent.includes('@ideasui/styles')).toBe(true);
  });
});
