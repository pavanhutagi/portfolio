import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
    "public/**",
  ]),

  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  // Already registers the `react`, `react-hooks`, `import`, `jsx-a11y` and
  // `@next/next` plugins, including the React Compiler rule set (`react-hooks/purity`,
  // `react-hooks/immutability`, `react-hooks/set-state-in-effect` and friends). Adding
  // `eslint-plugin-react-hooks` separately would double-register the plugin.
  nextCoreWebVitals,

  {
    languageOptions: {
      // `eslint-config-next` installs its Babel-based parser across every file
      // extension to support plain-JavaScript projects. Its bundled scope manager
      // predates ESLint 10's `addGlobals` API and throws on any file with declared
      // globals. This project is TypeScript end to end, so the typescript-eslint
      // parser is both the compatible choice and the faster one — and it is what
      // makes type-aware rules work in `.mjs` config files too.
      parser: tseslint.parser,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      // Pinned rather than "detect": eslint-plugin-react's auto-detection calls
      // `context.getFilename()`, which ESLint 10 removed, and crashes the run.
      react: { version: "19.2" },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true, allowBoolean: true },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-const": ["error", { destructuring: "all" }],
    },
  },

  {
    files: ["**/*.test.ts", "**/*.test.tsx", "vitest.setup.ts", "e2e/**/*.ts"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "no-console": "off",
    },
  },

  {
    files: ["**/*.mjs", "*.config.ts", "scripts/**/*.mjs"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },

  // Must stay last so stylistic rules that conflict with Prettier are switched off.
  prettier
);
