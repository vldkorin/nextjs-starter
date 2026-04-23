import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = defineConfig([
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "dist/**",
    "build/**",
    "public/**",
    "db/**",
    "next-env.d.ts",
    "eslint.config.mjs",
    ".eslintrc.*",
    "postcss.config.*",
    "next.config.*",
    "site.config.*",
    "drizzle.config.*",
    "**/*.json"
  ]),
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  },
  ...nextVitals,
  prettier,
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/globals.css"
      }
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname
      },
      globals: { ...globals.node, ...globals.browser }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "better-tailwindcss": betterTailwindcss
    },
    rules: {
      "prettier/prettier": [
        "error",
        { trailingComma: "none", printWidth: 80, usePrettierrc: true }
      ],
      curly: ["error", "all"],
      "arrow-body-style": ["error", "always"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        {
          blankLine: "always",
          prev: "*",
          next: [
            "multiline-const",
            "multiline-let",
            "multiline-var",
            "multiline-expression"
          ]
        },
        { blankLine: "always", prev: "*", next: "if" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "export" },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        { blankLine: "always", prev: "export", next: "export" },
        { blankLine: "always", prev: "block-like", next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "*", next: "class" }
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:"],
            ["^next", "^@?\\w"],
            ["^~\\/"],
            ["^\\.(?!.*\\.(css|scss|sass|less)$)"],
            ["^\\..*\\.(css|scss|sass|less)$"]
          ]
        }
      ],
      "@typescript-eslint/no-magic-numbers": [
        "warn",
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreEnums: true,
          ignoreReadonlyClassProperties: true
        }
      ],
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" }
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } }
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow"
        },
        {
          selector: "property",
          format: ["camelCase", "snake_case", "UPPER_CASE"]
        }
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            memberTypes: [
              "public-instance-method",
              "private-instance-method",
              "#private-instance-method"
            ]
          }
        }
      ],
      "default-case-last": "error",
      eqeqeq: "warn",
      "func-style": ["error"],
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-extra-boolean-cast": "error",
      "no-implicit-coercion": "error",
      "no-param-reassign": "error",
      "no-unneeded-ternary": "warn",
      "no-useless-concat": "warn",
      "no-useless-rename": "error",
      "prefer-destructuring": "warn",
      "prefer-exponentiation-operator": "error",
      "prefer-object-spread": "error",
      "prefer-promise-reject-errors": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      radix: "error",
      yoda: "error",
      "no-dupe-class-members": "off",
      "lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true }
      ],
      "no-redeclare": "off",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/init-declarations": "warn",
      "@typescript-eslint/no-dupe-class-members": "error",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "better-tailwindcss/enforce-canonical-classes": "error",
      "better-tailwindcss/enforce-shorthand-classes": "error"
    }
  }
]);

export default eslintConfig;
