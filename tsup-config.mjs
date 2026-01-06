import {defineConfig} from "tsup";
// Tsup config
export function createSharedConfig({
  entry = "src/index.ts",
  outDir = "dist",
  isWatch = false,
  external = [],
  ...rest
}) {
  return defineConfig((options) => ({
    ...options,
    ...rest,
    entry: typeof entry === "string" ? [entry] : entry,
    outDir,
    clean: !isWatch,
    dts: !isWatch, // generate dts files
    // banner: {js: '"use client";'},
    bundle: true,
    target: "es2020",
    format: ["cjs", "esm"],
    skipNodeModulesBundle: true,
    sourcemap: isWatch,
    minify: !isWatch,
    external: ["react", "react-dom", "react/jsx-runtime", ...external],
    esbuildOptions(options) {
      // modern JSX
      options.jsx = "automatic";
    },
  }));
}
