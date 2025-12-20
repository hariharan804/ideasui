import {createSharedConfig} from "../../../tsup-config.mjs";
import {defineConfig} from "tsup";

const config = createSharedConfig({
  external: ["*.css"],
  bundle: false,
  entry: ["src/**/!(.d|.stories|*.test|*.css).{ts,tsx}"],
});

export default defineConfig(config);
