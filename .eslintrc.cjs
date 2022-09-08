module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['standard', 'prettier', 'eslint:recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'simple-import-sort'],
    ignorePatterns: [],
    globals: {
        JSX: true,
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        'no-extra-semi': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'simple-import-sort/imports': 'error',
        complexity: ['error', { max: 14 }],

        // To support TS overloads
        // https://github.com/typescript-eslint/typescript-eslint/blob/6fd476c32c4757cb9f4c442f0cd92875671eed30/packages/eslint-plugin/docs/rules/no-redeclare.md
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        'complexity': ['error', { 'max': 16 }],
    },
    overrides: [
        {
            files: ['src/*.test.ts'],
            env: {},
        },
    ],
}
