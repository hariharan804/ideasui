const typescript = require('@rollup/plugin-typescript')
const dts = require('rollup-plugin-dts').default

function createConfig(external = []) {
  return [
    {
      input: 'src/index.ts',
      output: [
        {
          file: 'dist/index.js',
          format: 'cjs',
          sourcemap: true,
        },
        {
          file: 'dist/index.esm.js',
          format: 'esm',
          sourcemap: true,
        },
      ],
      external: ['react', 'react-dom', 'react/jsx-runtime', ...external],
      plugins: [typescript({ 
        include: ['src/**/*'],
        exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/**/__tests__/**', 'src/**/*.stories.*'],
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist',
          target: 'es2015',
          module: 'esnext',
          moduleResolution: 'node'
        }
      })],
    },
    {
      input: 'src/index.ts',
      output: {
        file: 'dist/index.d.ts',
        format: 'esm',
      },
      plugins: [dts()],
    },
  ]
}

module.exports = { createConfig }