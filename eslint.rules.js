export const eslintRules = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-non-null-assertion': 'warn',

  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],

  'no-console': 'warn',
  'no-debugger': 'error',
  'prefer-const': 'error',
  'no-var': 'error',
  'no-unused-expressions': 'error',
  'no-useless-return': 'error',

  'prettier/prettier': 'error',

  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',

  'prefer-template': 'error',
  'object-shorthand': 'error',
  'prefer-arrow-callback': 'error',

  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-script-url': 'error',
};

export const devRules = {
  'no-console': 'off',
};

export const testRules = {
  'no-console': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
};
