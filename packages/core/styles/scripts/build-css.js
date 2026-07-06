/* eslint-disable no-console, @typescript-eslint/explicit-function-return-type, sonarjs/os-command, sonarjs/no-ignored-exceptions, unicorn/no-process-exit, unicorn/no-array-for-each, @typescript-eslint/no-unused-vars, unicorn/prefer-optional-catch-binding */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const rootDir = path.resolve(__dirname, '../../../..');
const componentsDir = path.join(rootDir, 'packages/components');
const stylesDir = path.resolve(__dirname, '..');
const srcDir = path.join(stylesDir, 'src');
const distDir = path.join(stylesDir, 'dist');
const tempDir = path.join(stylesDir, '.temp-css');

const pkg = require('../package.json');

// Ensure directories exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(path.join(distDir, 'components'))) {
  fs.mkdirSync(path.join(distDir, 'components'), { recursive: true });
}
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

console.log('🚀 Starting CSS compilation...');

// Helper to compile CSS using tailwindcss CLI
function compile(inputPath, outputPath, minify = true) {
  const minifyFlag = minify ? '--minify' : '';
  const cmd = `tailwindcss -i "${inputPath}" -o "${outputPath}" ${minifyFlag}`;
  const rootBin = path.resolve(__dirname, '../../../../node_modules/.bin');
  const localBin = path.resolve(__dirname, '../node_modules/.bin');
  const env = {
    ...process.env,
    PATH: `${localBin}${path.delimiter}${rootBin}${path.delimiter}${process.env.PATH}`,
  };

  try {
    execSync(cmd, { cwd: rootDir, env, stdio: 'inherit' });

    // Prepend IdeasUI CSS header
    const filename = path.basename(outputPath);
    const header = `/*! IdeasUI CSS - ${filename} v${pkg.version} | MIT License | https://ideasui.com */\n /* Compiled by */`;
    const content = fs.readFileSync(outputPath, 'utf8');

    fs.writeFileSync(outputPath, header + content, 'utf8');
  } catch (error) {
    console.error(`❌ Failed to compile ${inputPath} -> ${outputPath}`);
    process.exit(1);
  }
}

// 1. Compile Base CSS (resets + theme variables only)
console.log('📦 Compiling base.css...');
compile(path.join(srcDir, 'base.css'), path.join(distDir, 'base.css'));

// 2. Compile Styles CSS (all-in-one styles.css)
console.log('📦 Compiling styles.css (all-in-one)...');
compile(path.join(srcDir, 'styles.css'), path.join(distDir, 'styles.css'));

// 3. Compile Component-wise CSS
const components = fs.readdirSync(componentsDir).filter((file) => {
  const fullPath = path.join(componentsDir, file);

  return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'package.json'));
});

console.log(`🧩 Found components: ${components.join(', ')}`);

components.forEach((component) => {
  console.log(`📦 Compiling component styles for: ${component}...`);

  // 3a. Standard version (utilities-only, no resets, theme + utilities only)
  const standardContent = `@import "tailwindcss/theme.css" layer(theme) source(none);
@import "tailwindcss/utilities.css" layer(utilities) source(none);
@import "../../theme/dist/theme-config.css";

/* Scan component source and its specific recipe files */
@source "../../../components/${component}/src/**/*.{ts,tsx}";
@source "../../theme/src/recipes/${component}.ts";
@source "../../theme/src/recipes/${component}.compound.ts";
`;

  const standardInputPath = path.join(tempDir, `${component}.css`);

  fs.writeFileSync(standardInputPath, standardContent, 'utf8');

  const standardOutputPath = path.join(distDir, 'components', `${component}.css`);

  compile(standardInputPath, standardOutputPath);
});

// Clean up temp directory
console.log('🧹 Cleaning up temporary files...');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('✅ CSS compilation complete!');
