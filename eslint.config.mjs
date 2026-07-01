import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const eslintConfig = defineConfig([
  {
    ignores: ["node_modules/**", "build/**", ".react-router/**", "dist/**"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "eol-last": ["error", "always"],
      "max-len": ["error", { code: 120 }],
      indent: ["error", 2],
      semi: ["error", "always"],
    },
  },
]);

export default eslintConfig;
