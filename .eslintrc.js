// module.exports = {
//   env: {
//     es6: true,
//     node: true,
//   },
//   extends: [
//     'airbnb-base',
//     'prettier'
//   ],
//   plugins: ['prettier'],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly',
//   },
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//   },
//   rules: {
//     'prettier/prettier': 'error',
//     'class-methods-use-this': 'off',
//     'no-param-reassign': 'off',
//     'camelcase': 'off',
//     'no-underscore-dangle': 'off',
//     'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
//   },
//   overrides: [
//     {
//       files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
//     },
//   ],
// };


import { defineConfig } from 'eslint';

export default defineConfig({
  languageOptions: {
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
  plugins: ['prettier'],
  extends: [
    'airbnb-base',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    },
  ],
});
