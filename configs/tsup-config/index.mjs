import { defineConfig } from 'tsup';
// Tsup config 
export function createSharedConfig({entry = 'src/index.ts', outDir = 'dist', isWatch = false, external = []}) {
  return defineConfig({
    entry: [entry],
    outDir,
    clean: !isWatch,
    dts: true, // generate dts files
    format: ["esm"],
    bundle: true,
    target: "es2020",
    skipNodeModulesBundle: true,
    sourcemap: isWatch,
    minify: !isWatch,
    external: ['react', 'react-dom', 'react/jsx-runtime', ...external],
    esbuildOptions(options) {
      // modern JSX
      options.jsx = "automatic";
    },
  });
}
