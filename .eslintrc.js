module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'standard',
        'plugin:react/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        __DEV__: true,
        __webpack_require__: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            legacyDecorators: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'comma-dangle': 0,
        'react/prop-types': 0,
        'no-unused-vars': ['warn']
    }
};
