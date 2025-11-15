import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const extensions = ['.js', '.jsx', '.ts', '.tsx']
export function rollupConfig({ 
  external = ['react', 'react-dom', 'react/jsx-runtime'], 
  input = 'src/index.ts', 
  output = [] 
} = {}) {
 
  return {
    input,
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      ...output,
    ],
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      ...external,
    ],
    plugins: [
      // keep peerDepsExternal early
      peerDepsExternal(),

      // resolve node modules
      nodeResolve({ extensions }),

      // convert commonjs -> esm
      commonjs(),

      // compile TS -> JS (without relying on it to produce final d.ts)
      typescript({
        tsconfig: './tsconfig.json',
        // Let tsc/rollup-plugin-dts handle declarations; avoid multiple declaration emitters
        declaration: false,
        sourceMap: true,
        exclude: ['**/*.stories.*', '**/*.test.*'],
      }),

      // Babel for final transpilation (if you need broader target support)
      babel({
        babelHelpers: 'bundled', // or 'runtime' if you use transform-runtime
        extensions,
        exclude: 'node_modules/**',
      }),

      // optional: minify (you can remove for library)
      terser(),
    ],
  }
}
