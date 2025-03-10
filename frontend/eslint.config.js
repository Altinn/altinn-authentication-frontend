import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
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
  },
  {
    ignores: ['dist/**', 'vite.config.ts', 'config.ts'],
  },
  {
    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },
  },
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
      'prefer-const': 'error',
      'object-curly-spacing': ['error', 'always'],
      'no-duplicate-imports': 'error',
      eqeqeq: 'error',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
);
