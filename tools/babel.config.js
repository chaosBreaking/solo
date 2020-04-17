
// Babel configuration
// https://babeljs.io/docs/usage/api/
export default {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-flow',
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-decorators', {
            legacy: true
        }],
        '@babel/plugin-proposal-object-rest-spread',
    ],
    ignore: ['node_modules', 'build'],
};
