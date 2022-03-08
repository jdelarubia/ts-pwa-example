/**
 * rollup.config.js
 */

export default [
  // App JavaScript
  {
    input: "./src/js/main.js",
    watch: {
      include: "./src/js/**",
    },
    output: {
      file: "./dist/js/bundle.js",
      format: "iife",
      sourcemap: "inline",
    },
  },
  // Service Worker
  {
    input: "./src/ts/sw/sw.js",
    output: {
      file: "./dist/sw.js",
      format: "iife",
      sourcemap: "inline",
    },
  },
];
