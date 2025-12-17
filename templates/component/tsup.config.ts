import {createSharedConfig} from "../../tsup-config.mjs";

const isWatch = process.argv.includes("--watch");

export default createSharedConfig({
  isWatch,
});
