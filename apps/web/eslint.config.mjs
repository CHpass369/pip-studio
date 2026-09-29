import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "camelcase": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "no-underscore-dangle": "off",
      "import/prefer-default-export": "off",
      "import/no-unresolved": "off",
      "object-curly-newline": ["error", { "consistent": true }],
      "react/forbid-prop-types": [2, { "forbid": [ "array", "object"] }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "indent": ["error", 2, { "MemberExpression": 0 }]
    }
  },
]);
