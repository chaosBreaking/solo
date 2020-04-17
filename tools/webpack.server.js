import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import overrideRules from './lib/overrideRules';
import pkg from '../package.json';
import basicConfig from './webpack.base';
import Webpackbar from 'webpackbar';
import { BUILD_DIR, isDebug, reStyle, reImage, happyThreadPool } from './constants';
import HappyPack from 'happypack';
import babelConfig from './babel.config';

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

export default {
    ...basicConfig,

    name: 'server',
    target: 'node',

    entry: {
        server: ['@babel/polyfill', './src/server.js'],
    },

    output: {
        ...basicConfig.output,
        path: BUILD_DIR,
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        libraryTarget: 'commonjs2',
    },

    // Webpack mutates resolve object, so clone it to avoid issues
    // https://github.com/webpack/webpack/issues/4817
    resolve: {
        ...basicConfig.resolve,
    },

    module: {
        ...basicConfig.module,

        rules: overrideRules(basicConfig.module.rules, rule => {
            // Override babel-preset-env configuration for Node.js
            if (rule.loader === 'babel-loader') {
                return {
                    ...rule,
                    options: {
                        ...rule.options,
                        presets: rule.options.presets.map(preset =>
                            preset[0] !== '@babel/preset-env'
                                ? preset
                                : [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: pkg.engines.node.match(/(\d+\.?)+/)[0],
                                        },
                                        modules: false,
                                        useBuiltIns: false,
                                        debug: false,
                                    },
                                ],
                        ),
                    },
                };
            }

            // Override paths to static assets
            if (
                rule.loader === 'file-loader' ||
                rule.loader === 'url-loader' ||
                rule.loader === 'svg-url-loader'
            ) {
                return {
                    ...rule,
                    options: {
                        ...rule.options,
                        emitFile: false,
                    },
                };
            }

            return rule;
        }),
    },

    externals: [
        './chunk-manifest.json',
        './asset-manifest.json',
        nodeExternals({
            whitelist: [reStyle, reImage],
        }),
    ],

    plugins: [
        ...basicConfig.plugins,
        new HappyPack({
            id: 'happyBabel',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                query: babelConfig,
                sideEffects: false
            }],
        }),
        // Define free variables
        // https://webpack.js.org/plugins/define-plugin/
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
            __DEV__: isDebug,
        }),

        // Adds a banner to the top of each generated chunk
        // https://webpack.js.org/plugins/banner-plugin/
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
        new Webpackbar({ name: 'server', color: 'blue' }),
    ],

    // Do not replace node globals with polyfills
    // https://webpack.js.org/configuration/node/
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
};
