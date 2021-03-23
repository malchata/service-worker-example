/* eslint-env node */
import pkg from "./package.json";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";

export default {
  input: pkg.main,
  output: {
    file: "dist/sw.js",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    replace({
      "__cache_name__": `v${+new Date()}`,
      "preventAssignment": true
    }),
    json()
  ]
};
