import { defineConfig } from 'tsup';
// Tsup config
/**
 * @param {import("tsup").Options} options
 */
export function createSharedConfig({
  entry = 'src/index.ts',
  outDir = 'dist',
  isWatch = false,
  external = [],
  ...rest
}) {
  return defineConfig((options) => ({
    ...options,
    ...rest,
    entry: typeof entry === 'string' ? [entry] : entry,
    outDir,
    clean: !isWatch,
    dts: !isWatch, // generate dts files
    // banner: {js: '"use client";'},
    bundle: true,
    target: 'es2020',
    format: ['esm'], // Drop 'cjs' to instantly cut bundle size in half
    treeshake: true, // Aggressive dead-code elimination
    splitting: true, // Share chunks across entrypoints to avoid duplication
    skipNodeModulesBundle: true,
    sourcemap: isWatch,
    minify: !isWatch,
    external: ['react', 'react-dom', 'react/jsx-runtime', ...external],
    esbuildOptions(options) {
      // modern JSX
      options.jsx = 'automatic';
    },
  }));
}
