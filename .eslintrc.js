module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "@unocss",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prettier/prettier": "error",
    "@unocss/order": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "local",
        args: "none",
        varsIgnorePattern: "usePresenter|reactive|ref|^I",
        caughtErrors: "none",
      },
    ],
    "@typescript-eslint/no-explicit-any": 2,
    eqeqeq: 2,
    "max-lines": ["error", 1200],
    complexity: ["error", 20],
    "require-await": "error",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-empty-function": 1,
    "no-shadow": "error",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
