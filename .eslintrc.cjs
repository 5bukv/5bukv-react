/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error',
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling', 'index'],
        'type',
      ],
      'pathGroups': [
        {
          pattern: 'react',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'internal',
        },
      ],
      'pathGroupsExcludedImportTypes': ['builtin', 'external'],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true,
      },
    }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};