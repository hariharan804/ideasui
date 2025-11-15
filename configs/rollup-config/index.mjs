// packages/rollup-config/src/index.mjs
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/**
 * createConfig(optionsOrExternal)
 *
 * Usage:
 *   createConfig(['react', ...])                     // simple: pass externals array
 *   createConfig({ external: [...], extraExternals: [...] }) // object form
 */
export function createConfig(opts = {}) {
  // backward-compatible: allow passing array directly
  const externalFromArg = Array.isArray(opts) ? opts : (opts.external || []);
  const extraExternals = (opts.extraExternals || []).concat([
    // add any common type-only subpath you want treated external by default
    'class-variance-authority/types',
  ]);

  const external = [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...externalFromArg,
    ...extraExternals,
  ];

  // core config factory returned so consumer can call createConfig(...) or default export.
  return [
    {
      input: 'src/index.ts',
      output: [
        { file: 'dist/index.js', format: 'cjs', sourcemap: true, exports: 'named' },
        { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
      ],
      external,
      plugins: [
        // alias so '@' -> src inside consumer packages
        alias({ entries: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }] }),

        // IMPORTANT: compile TypeScript BEFORE Rollup's parser sees code
        // Use supported options for @rollup/plugin-typescript (no tsconfigOverride)
        typescript({
          tsconfig: './tsconfig.json',
          compilerOptions: {
            // we rely on rollup-plugin-dts to produce types
            declaration: false,
            declarationMap: false,
            sourceMap: true,
            // keep module/es target in tsconfig; overrides kept minimal
          },
          include: ['src/**/*'],
          exclude: ['node_modules/**', 'dist/**'],
        }),

        // resolve node modules AFTER TS step (ts plugin strips TS syntax)
        nodeResolve({
          extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
          browser: true,
        }),

        // convert CJS -> ESM (run after typescript transform)
        commonjs({ include: /node_modules/ }),
      ],
    },

    // produce a single .d.ts bundle using rollup-plugin-dts
    {
      input: 'src/index.ts',
      output: { file: 'dist/index.d.ts', format: 'esm' },
      plugins: [dts()],
    },
  ];
}

// default export (helps `import createConfig from '@i2l/rollup-config'` style)
export default createConfig;
