import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      "simple-import-sort": simpleImportSort,
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "eol-last": ["error", "always"],
      "max-len": ["error", { code: 120 }],
      indent: ["error", 2],
      semi: ["error", "always"],
      "no-undef": "off",
    },
  },
]);
