import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactRecommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['src/**.ts*'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    rules: {
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
      'prefer-const': 'error',
      'object-curly-spacing': ['error', 'always'],
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'vite.config.ts', 'config.ts'],
  },
);
