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
      external: ['react', 'react-dom', ...external],
      plugins: [typescript()],
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