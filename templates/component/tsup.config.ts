import {createSharedConfig} from "../../tsup-config.mjs";

export default createSharedConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
});
